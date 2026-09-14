import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import a1Exercises from "../data/overall-a1";
import a2Exercises from "../data/overall-a2";
import { colors, spacing, cardEdge } from "../constants/theme";
import type { PracticeExercise, OverallLevel } from "../lib/overall-types";
import type { PracticeConfig } from "../data/focused-practice";
import { checkOverallAnswer, kindLabels, overallQuestionId, shuffled, solutionText } from "../lib/overall-logic";
import { getQuestionStats, recordPracticeAnswer, recordSession } from "../lib/stats";
import { getPracticePreferences } from "../lib/settings";
import { selectPracticeSession } from "../lib/practice-preferences";
import SentencePuzzle from "./SentencePuzzle";
import MatchingPairs from "./MatchingPairs";

type Attempt = { exercise: PracticeExercise; answer: string; correct: boolean };

function Button({ title, onPress, accent, disabled = false, secondary = false }: { title: string; onPress: () => void; accent: string; disabled?: boolean; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.surface : colors.primary, borderColor: accent }, (disabled || pressed) && { opacity: 0.45 }]}>
    <Text style={[styles.buttonText, { color: secondary ? colors.text : colors.onPrimary }]}>{title}</Text>
  </Pressable>;
}

export default function OverallPractice({ level = "A1", config }: { level?: OverallLevel; config?: PracticeConfig }) {
  const router = useRouter();
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  const mode = config?.mode ?? (level === "A1" ? "overall-a1" : "overall-a2");
  const allExercises: PracticeExercise[] = config?.pool ?? (level === "A1" ? a1Exercises : a2Exercises);
  const title = config?.title ?? `Overall ${level}`;
  const accent = config?.accent ?? (level === "A1" ? colors.success : colors.possessive);
  const [phase, setPhase] = useState<"loading" | "playing" | "summary" | "empty" | "error">("loading");
  const [sessionTarget, setSessionTarget] = useState(20);
  const [session, setSession] = useState<PracticeExercise[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [activeGap, setActiveGap] = useState(0);
  const [gapOptions, setGapOptions] = useState<string[][]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const attemptRef = useRef<Attempt[]>([]);
  const answered = useRef(false);
  const busyRef = useRef(false);
  const focusGeneration = useRef(0);
  const writes = useRef(Promise.resolve());

  const enqueue = useCallback((write: () => Promise<void>) => {
    // The storage layer serializes writes. Register now so a newly focused
    // Progress screen can wait for this operation, including session saves.
    writes.current = Promise.all([writes.current, write()]).then(() => {}).catch(() => { setStorageError(true); });
  }, []);
  const saveSession = useCallback(() => {
    const completed = attemptRef.current;
    if (!completed.length) return;
    attemptRef.current = [];
    enqueue(() => recordSession({ mode, date: new Date().toISOString(), total: completed.length, correct: completed.filter(a => a.correct).length }));
  }, [enqueue, mode]);

  const prepare = useCallback((exercise: PracticeExercise) => {
    setAnswers(exercise.kind === "fill" || exercise.kind === "conjugation" ? exercise.blanks.map(() => "") : []);
    setSlots(exercise.kind === "match" ? exercise.pairs.map(() => null) : exercise.kind === "order" ? exercise.chunks.map((_, i) => i === 0 ? 0 : null) : []);
    setOptions(exercise.kind === "choice" ? shuffled(exercise.options) : []);
    setGapOptions(exercise.kind === "fill" || exercise.kind === "conjugation" ? exercise.blanks.map(blank => shuffled(blank.options)) : []);
    setActiveGap(0);
    setResult(null);
    setShowTranslation(false);
    setDragging(false);
    answered.current = false;
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, []);
  const start = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setPhase("loading");
    setSession([]);
    const generation = focusGeneration.current;
    try {
      await writes.current;
      const [stats, preferences] = await Promise.all([getQuestionStats(), getPracticePreferences()]);
      if (generation !== focusGeneration.current) return;
      const next = selectPracticeSession(allExercises, preferences, stats, focus === "review");
      setSessionTarget(preferences.count);
      if (!next.length) { setPhase("empty"); return; }
      setSession(next);
      setIndex(0);
      setAttempts([]);
      attemptRef.current = [];
      prepare(next[0]);
      setPhase("playing");
    } catch {
      if (generation === focusGeneration.current) setPhase("error");
    } finally {
      if (generation === focusGeneration.current) { setBusy(false); busyRef.current = false; }
    }
  }, [allExercises, prepare, focus]);

  useFocusEffect(useCallback(() => {
    focusGeneration.current++;
    busyRef.current = false;
    void start();
    return () => {
      focusGeneration.current++;
      saveSession();
    };
  }, [saveSession, start]));

  const exercise = session[index];
  const canCheck = exercise && (exercise.kind === "order" || exercise.kind === "match" ? slots.every(s => s !== null) : exercise.kind === "choice" ? !!answers[0] : answers.every(a => a.trim().length > 0));
  const check = () => {
    if (phase !== "playing" || answered.current || !canCheck) return;
    answered.current = true;
    const correct = checkOverallAnswer(exercise, answers, slots);
    const answer = exercise.kind === "match" ? exercise.pairs.map((pair, left) => `${pair.left} → ${exercise.pairs[slots[left]!].right}`).join("; ")
      : exercise.kind === "order" ? slots.map(i => exercise.chunks[i!]).join(" ") : answers.join(" / ");
    const attempt = { exercise, answer, correct };
    attemptRef.current.push(attempt);
    setAttempts([...attemptRef.current]);
    setResult(correct);
    enqueue(() => recordPracticeAnswer(mode, overallQuestionId(exercise), correct));
  };
  const next = async () => {
    if (busyRef.current || !answered.current) return;
    const generation = focusGeneration.current;
    if (index === session.length - 1) {
      busyRef.current = true;
      setBusy(true);
      saveSession();
      await writes.current;
      if (generation !== focusGeneration.current) return;
      setPhase("summary");
      setBusy(false);
      busyRef.current = false;
      scroll.current?.scrollTo({ y: 0, animated: false });
    } else {
      prepare(session[index + 1]);
      setIndex(index + 1);
    }
  };
  const finish = async () => {
    if (busyRef.current) return;
    if (!attempts.length) { router.navigate("/"); return; }
    const generation = focusGeneration.current;
    busyRef.current = true;
    setBusy(true);
    saveSession();
    await writes.current;
    if (generation !== focusGeneration.current) return;
    setBusy(false);
    busyRef.current = false;
    setPhase("summary");
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const correctCount = attempts.filter(a => a.correct).length;

  return (
    <View style={styles.container}>
      <ScrollView ref={scroll} showsVerticalScrollIndicator={false} scrollEnabled={!dragging} contentContainerStyle={styles.content}>
        {storageError && <Text accessibilityRole="alert" style={styles.error}>Progress could not be saved on this device. Your answers are still available in this session.</Text>}
        {phase === "loading" ? <View style={styles.loading}>
          <ActivityIndicator color={accent} accessibilityLabel="Preparing your cards" />
          <Text style={styles.help}>Getting your cards ready…</Text>
        </View> : phase === "empty" ? <>
          <Text style={styles.title}>No matching card types</Text>
          <Text style={styles.description}>{title} does not include your selected exercise types. Choose one of this deck’s types in Settings.</Text>
          <Text style={styles.help}>Available here: {[...new Set(allExercises.map(e => kindLabels[e.kind]))].join(", ")}</Text>
          <Button title="Open Settings" onPress={() => router.navigate("/settings")} accent={accent} />
          <Button title="Back to decks" onPress={() => router.navigate("/")} accent={accent} secondary />
        </> : phase === "error" ? <>
          <Text accessibilityRole="alert" style={styles.error}>Could not load your practice or saved settings. Please try again.</Text>
          <Button title="Try again" onPress={start} accent={accent} disabled={busy} />
          <Button title="Back to decks" onPress={() => router.navigate("/")} accent={accent} secondary />
        </> : phase === "summary" ? <>
          <Text style={styles.eyebrow}>{title.toUpperCase()} · SESSION COMPLETE</Text>
          <Text style={styles.title}>{correctCount === attempts.length ? "Beautifully done!" : "A little better every time."}</Text>
          <Text style={[styles.score, { color: accent }]}>{correctCount}<Text style={styles.scoreTotal}> / {attempts.length}</Text></Text>
          <Text style={styles.subtitle}>correct answers · {Math.round(correctCount / Math.max(attempts.length, 1) * 100)}%</Text>
          <Button title="Practice again" onPress={start} disabled={busy} accent={accent} />
          <Button title="Back to home" onPress={() => router.navigate("/")} accent={accent} secondary />
          {attempts.some(a => !a.correct) && <Text style={styles.sectionTitle}>Take another look</Text>}
          {attempts.filter(a => !a.correct).map(a => <View key={a.exercise.id} style={styles.review}>
            <Text style={[styles.eyebrow, { color: accent }]}>{a.exercise.topic}</Text>
            <Text style={styles.help}>Your answer: {a.answer}</Text>
            <Text style={styles.solution}>{solutionText(a.exercise)}</Text>
            <Text style={styles.description}>{a.exercise.explanation}</Text>
          </View>)}
        </> : exercise && <>
          <View style={styles.progressRow}><Text style={styles.eyebrow}>CARD {index + 1} / {session.length}</Text><Text style={styles.help}>{correctCount} correct</Text></View>
          {index === 0 && session.length < sessionTarget && <Text style={styles.help}>{session.length} matching cards available · no repeats</Text>}
          <View style={styles.track}><View style={[styles.progress, { backgroundColor: accent, width: `${(attempts.length / session.length) * 100}%` }]} /></View>
          <View style={styles.progressRow}><Text style={[styles.topic, { color: accent }]}>{exercise.topic}</Text><Text style={styles.format}>{kindLabels[exercise.kind]}</Text></View>
          <Text accessibilityRole="header" style={styles.prompt}>{exercise.instruction}</Text>
          {exercise.kind === "match" ? <MatchingPairs key={exercise.id} exercise={exercise} slots={slots} onChange={setSlots} disabled={result !== null} checked={result !== null} />
            : exercise.kind === "order" ? <SentencePuzzle key={exercise.id} chunks={exercise.chunks} slots={slots} onChange={setSlots} disabled={result !== null} accent={accent} onDragStateChange={setDragging} /> : <View style={styles.questionCard}>
            <Text style={styles.sentence}>{exercise.sentence.split("___").map((part, i, parts) => <React.Fragment key={i}>
              {part}{i < parts.length - 1 && <Text style={{ color: accent }}>{answers[i] || (parts.length > 2 ? `___ (${i + 1})` : "___")}</Text>}
            </React.Fragment>)}</Text>
            {exercise.kind === "choice" ? <View style={styles.optionList}>{options.map(option => <Pressable key={option} accessibilityRole="button" accessibilityLabel={option} accessibilityState={{ selected: answers[0] === option, disabled: result !== null }} disabled={result !== null}
              onPress={() => setAnswers([option])} style={[styles.option, answers[0] === option && { borderColor: accent, backgroundColor: colors.surfaceLight }, result !== null && option === exercise.answer && { borderColor: colors.success }]}>
              <Text style={styles.optionText}>{option}</Text><Ionicons name={answers[0] === option ? "radio-button-on" : "radio-button-off"} size={21} color={answers[0] === option ? accent : colors.textSecondary} />
            </Pressable>)}</View> : <>
              {exercise.blanks.length > 1 && <View style={styles.gapTabs}>{exercise.blanks.map((_, i) => <Pressable key={i} accessibilityRole="button" accessibilityLabel={`Select gap ${i + 1}`} accessibilityState={{ selected: activeGap === i }} onPress={() => setActiveGap(i)} style={[styles.gapTab, activeGap === i && { borderColor: accent, backgroundColor: colors.surfaceLight }]}><Text style={styles.filterText}>{i + 1}{answers[i] ? " •" : ""}</Text></Pressable>)}</View>}
              {exercise.blanks.map((blank, i) => i === activeGap && <View key={`${exercise.id}-${i}`} style={styles.gapGroup}>
                <Text style={styles.help}>{exercise.blanks.length > 1 ? `Gap ${i + 1} · ` : ""}{blank.hint}</Text>
                <View style={styles.optionGrid}>{gapOptions[i]?.map(option => {
                  const selected = answers[i] === option;
                  const correctOption = blank.answers.includes(option);
                  return <Pressable key={option} accessibilityRole="button" accessibilityLabel={`Gap ${i + 1}: ${option}`}
                    accessibilityState={{ selected, disabled: result !== null }} disabled={result !== null}
                    onPress={() => {
                      const updated = answers.map((answer, j) => i === j ? option : answer);
                      setAnswers(updated);
                      const nextGap = updated.findIndex((answer, j) => j > i && !answer);
                      const firstEmpty = updated.findIndex(answer => !answer);
                      if (nextGap >= 0 || firstEmpty >= 0) setActiveGap(nextGap >= 0 ? nextGap : firstEmpty);
                    }}
                    style={[styles.gapOption, selected && { borderColor: accent, backgroundColor: colors.surfaceLight },
                      result !== null && correctOption && { borderColor: colors.success },
                      result !== null && selected && !correctOption && { borderColor: colors.error }]}>
                    <Text style={styles.optionText}>{option}</Text>
                    <Ionicons name={selected ? "radio-button-on" : "radio-button-off"} size={20} color={selected ? accent : colors.textSecondary} />
                  </Pressable>;
                })}</View>
              </View>)}
            </>}
          </View>}
          {exercise.translation && <Pressable accessibilityRole="button" onPress={() => setShowTranslation(!showTranslation)} style={styles.translationButton}><Text style={{ color: colors.textSecondary }}>{showTranslation ? "Hide translation" : "Show English translation"}</Text></Pressable>}
          {showTranslation && exercise.translation && <Text style={styles.translation}>{exercise.translation}</Text>}
          {result === null ? <Button title="Check answer" onPress={check} accent={accent} disabled={!canCheck || dragging} /> : <>
            <View accessibilityLiveRegion="polite" style={[styles.feedback, { borderColor: result ? colors.success : colors.error }]}>
              <Text style={[styles.feedbackTitle, { color: result ? colors.success : colors.error }]}>{result ? "Correct!" : "Not quite — here’s the answer"}</Text>
              <Text style={styles.solution}>{solutionText(exercise)}</Text>
              <Text style={styles.description}>{exercise.explanation}</Text>
              {exercise.source && <Text style={styles.footer}>A-Grammatik · page {exercise.source.printedPage} · exercise {exercise.source.exercise.split("-")[0]} · adapted for practice</Text>}
            </View>
            <Button title={busy ? "Saving…" : index === session.length - 1 ? "Finish session" : "Next exercise"} onPress={next} accent={accent} disabled={busy} />
          </>}
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} onPress={finish} disabled={busy} style={styles.endLink}><Text style={styles.help}>End session</Text></Pressable>
        </>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { paddingVertical: 32, alignItems: "center", gap: 12 },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: 12, paddingBottom: 24 },
  eyebrow: { color: colors.textSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.text, fontSize: 16, lineHeight: 23 },
  description: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700", marginTop: 4 },
  filterText: { color: colors.textSecondary, fontSize: 14, fontWeight: "600" },
  help: { color: colors.textSecondary, fontSize: 13, lineHeight: 20 },
  footer: { color: colors.textSecondary, fontSize: 12, lineHeight: 19, marginTop: 8 },
  button: { ...cardEdge, minHeight: 50, padding: 12, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  buttonText: { fontSize: 16, fontWeight: "800" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" },
  track: { backgroundColor: colors.surfaceLight, height: 5, borderRadius: 4, overflow: "hidden" },
  progress: { height: 5, borderRadius: 4 },
  topic: { fontSize: 14, fontWeight: "700" },
  format: { color: colors.textSecondary, fontSize: 12 },
  prompt: { color: colors.text, fontSize: 19, lineHeight: 25, fontWeight: "700", marginVertical: 2 },
  questionCard: { ...cardEdge, padding: 16, borderRadius: 21, backgroundColor: colors.surface, gap: 16 },
  sentence: { color: colors.text, fontSize: 25, lineHeight: 35, fontWeight: "600" },
  optionList: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  option: { ...cardEdge, flexBasis: "45%", flexGrow: 1, minHeight: 56, backgroundColor: colors.background, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: colors.border, padding: 12, borderRadius: 14, gap: 8 },
  optionText: { color: colors.text, fontSize: 18, flexShrink: 1 },
  gapTabs: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  gapTab: { minWidth: 44, minHeight: 44, borderWidth: 1, borderColor: colors.border, borderRadius: 10, alignItems: "center", justifyContent: "center", padding: 8 },
  gapGroup: { gap: 10 },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  gapOption: { ...cardEdge, backgroundColor: colors.background, flexBasis: "45%", flexGrow: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, minHeight: 54, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  endLink: { minHeight: 44, alignItems: "center", justifyContent: "center" },
  translationButton: { minHeight: 44, justifyContent: "center", paddingVertical: 8, alignSelf: "flex-start" },
  translation: { color: colors.textSecondary, fontStyle: "italic", fontSize: 16, lineHeight: 24 },
  feedback: { ...cardEdge, padding: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, gap: 9 },
  feedbackTitle: { fontSize: 17, fontWeight: "700" },
  solution: { color: colors.text, fontSize: 19, lineHeight: 28, fontWeight: "600" },
  score: { fontSize: 72, fontWeight: "800", marginTop: 12 },
  scoreTotal: { fontSize: 32, color: colors.textSecondary },
  review: { ...cardEdge, backgroundColor: colors.surface, padding: 18, borderRadius: 14, gap: 10 },
  error: { color: colors.error, lineHeight: 22 },
});
