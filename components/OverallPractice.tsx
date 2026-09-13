import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import a1Exercises from "../data/overall-a1";
import a2Exercises from "../data/overall-a2";
import { colors, spacing } from "../constants/theme";
import type { PracticeExercise, PracticeKind, OverallLevel } from "../lib/overall-types";
import type { PracticeConfig } from "../data/focused-practice";
import { checkOverallAnswer, kindLabels, overallQuestionId, selectOverallExercises, shuffled, solutionText } from "../lib/overall-logic";
import { getQuestionStats, recordAnswer, recordQuestionAnswer, recordSession } from "../lib/stats";
import SentencePuzzle from "./SentencePuzzle";
import MatchingPairs from "./MatchingPairs";

type Attempt = { exercise: PracticeExercise; answer: string; correct: boolean };

function Button({ title, onPress, accent, disabled = false, secondary = false }: { title: string; onPress: () => void; accent: string; disabled?: boolean; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.surface : accent, borderColor: accent }, (disabled || pressed) && { opacity: 0.45 }]}>
    <Text style={[styles.buttonText, { color: secondary ? colors.text : "#0f172a" }]}>{title}</Text>
  </Pressable>;
}

export default function OverallPractice({ level = "A1", config }: { level?: OverallLevel; config?: PracticeConfig }) {
  const router = useRouter();
  const mode = config?.mode ?? (level === "A1" ? "overall-a1" : "overall-a2");
  const allExercises: PracticeExercise[] = config?.pool ?? (level === "A1" ? a1Exercises : a2Exercises);
  const title = config?.title ?? `Overall ${level}`;
  const accent = config?.accent ?? (level === "A1" ? "#5ee0b2" : "#c4a5ff");
  const [phase, setPhase] = useState<"setup" | "playing" | "summary">("setup");
  const [filter, setFilter] = useState<PracticeKind | "mixed">("mixed");
  const [levelFilter, setLevelFilter] = useState<OverallLevel | "all">("all");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const levelPool = allExercises.filter(e => !config || levelFilter === "all" || e.level === levelFilter);
  const pool = levelPool.filter(e => topicFilter === "All topics" || e.topic === topicFilter);
  const formats = (Object.keys(kindLabels) as PracticeKind[]).filter(kind => pool.some(e => e.kind === kind));
  const [count, setCount] = useState(10);
  const [session, setSession] = useState<PracticeExercise[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [gapOptions, setGapOptions] = useState<string[][]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [startError, setStartError] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const attemptRef = useRef<Attempt[]>([]);
  const answered = useRef(false);
  const busyRef = useRef(false);
  const focusGeneration = useRef(0);
  const writes = useRef(Promise.resolve());

  const enqueue = useCallback((write: () => Promise<void>) => {
    writes.current = writes.current.then(write).catch(() => { setStorageError(true); });
  }, []);
  const saveSession = useCallback(() => {
    const completed = attemptRef.current;
    if (!completed.length) return;
    attemptRef.current = [];
    enqueue(() => recordSession({ mode, date: new Date().toISOString(), total: completed.length, correct: completed.filter(a => a.correct).length }));
  }, [enqueue, mode]);

  useFocusEffect(useCallback(() => {
    focusGeneration.current++;
    setPhase("setup");
    setBusy(false);
    busyRef.current = false;
    return () => {
      focusGeneration.current++;
      saveSession();
    };
  }, [saveSession]));

  const prepare = (exercise: PracticeExercise) => {
    setAnswers(exercise.kind === "fill" || exercise.kind === "conjugation" ? exercise.blanks.map(() => "") : []);
    setSlots(exercise.kind === "match" ? exercise.pairs.map(() => null) : exercise.kind === "order" ? exercise.chunks.map((_, i) => i === 0 ? 0 : null) : []);
    setOptions(exercise.kind === "choice" ? shuffled(exercise.options) : []);
    setGapOptions(exercise.kind === "fill" || exercise.kind === "conjugation" ? exercise.blanks.map(blank => shuffled(blank.options)) : []);
    setResult(null);
    setShowTranslation(false);
    setDragging(false);
    answered.current = false;
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const start = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setStartError(false);
    const generation = focusGeneration.current;
    try {
      await writes.current;
      const stats = await getQuestionStats();
      if (generation !== focusGeneration.current) return;
      const next = selectOverallExercises(pool, count, stats, filter);
      if (!next.length) throw new Error("No exercises available");
      setSession(next);
      setIndex(0);
      setAttempts([]);
      attemptRef.current = [];
      prepare(next[0]);
      setPhase("playing");
    } catch {
      setStartError(true);
    } finally {
      if (generation === focusGeneration.current) { setBusy(false); busyRef.current = false; }
    }
  };
  const exercise = session[index];
  const canCheck = exercise && (exercise.kind === "order" || exercise.kind === "match" ? slots.every(s => s !== null) : exercise.kind === "choice" ? !!answers[0] : answers.every(a => a.trim().length > 0));
  const check = () => {
    if (answered.current || !canCheck) return;
    answered.current = true;
    const correct = checkOverallAnswer(exercise, answers, slots);
    const answer = exercise.kind === "match" ? exercise.pairs.map((pair, left) => `${pair.left} → ${exercise.pairs[slots[left]!].right}`).join("; ")
      : exercise.kind === "order" ? slots.map(i => exercise.chunks[i!]).join(" ") : answers.join(" / ");
    const attempt = { exercise, answer, correct };
    attemptRef.current.push(attempt);
    setAttempts([...attemptRef.current]);
    setResult(correct);
    enqueue(async () => { await recordAnswer(mode, correct); await recordQuestionAnswer(overallQuestionId(exercise), correct); });
  };
  const next = async () => {
    if (busyRef.current || !answered.current) return;
    if (index === session.length - 1) {
      busyRef.current = true;
      setBusy(true);
      saveSession();
      await writes.current;
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
    busyRef.current = true;
    setBusy(true);
    saveSession();
    await writes.current;
    setBusy(false);
    busyRef.current = false;
    setPhase(attempts.length ? "summary" : "setup");
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const available = pool.filter(e => filter === "mixed" || e.kind === filter).length;
  const correctCount = attempts.filter(a => a.correct).length;

  return (
    <View style={styles.container}>
      <ScrollView ref={scroll} scrollEnabled={!dragging} contentContainerStyle={styles.content}>
        {storageError && <Text accessibilityRole="alert" style={styles.error}>Progress could not be saved on this device. Your answers are still available in this session.</Text>}
        {phase === "setup" ? <>
          <View style={[styles.levelBadge, { borderColor: accent }]}><Ionicons name="extension-puzzle-outline" size={34} color={accent} /><Text style={[styles.levelText, { color: accent }]}>{config ? "Practice" : level}</Text></View>
          <Text style={styles.eyebrow}>A LITTLE PRACTICE, EVERY DAY</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{config?.subtitle ?? (level === "A1" ? "Build confidence with everyday German." : "Connect your ideas and tell your story.")}</Text>
          <Text style={styles.description}>{allExercises.length.toLocaleString()} exercises. Tap answers, move sentence pieces, and connect pairs where available. No typing needed.</Text>
          {config && <>
            <Text style={styles.sectionTitle}>Choose your focus</Text>
            <View style={styles.filters}>{(["all", "A1", "A2"] as const).filter(value => value === "all" || allExercises.some(e => e.level === value)).map(value => <Pressable key={value} accessibilityRole="button" accessibilityLabel={value === "all" ? "All levels" : `Level ${value}`} accessibilityState={{ selected: levelFilter === value }}
              onPress={() => { setLevelFilter(value); setTopicFilter("All topics"); setFilter("mixed"); }} style={[styles.filter, levelFilter === value && { borderColor: accent }]}><Text style={styles.filterText}>{value === "all" ? "All levels" : value}</Text></Pressable>)}</View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{["All topics", ...new Set(levelPool.map(e => e.topic))].map(topic => <Pressable key={topic} accessibilityRole="button" accessibilityLabel={`Topic: ${topic}`} accessibilityState={{ selected: topicFilter === topic }}
              onPress={() => { setTopicFilter(topic); setFilter("mixed"); }} style={[styles.filter, topicFilter === topic && { borderColor: accent }]}><Text style={styles.filterText}>{topic}</Text></Pressable>)}</ScrollView>
          </>}
          <Text style={styles.sectionTitle}>What would you like to practice?</Text>
          <View style={styles.filters}>{(["mixed", ...formats] as const).map(kind => <Pressable key={kind} accessibilityRole="button" accessibilityState={{ selected: filter === kind }}
            onPress={() => setFilter(kind)} style={[styles.filter, filter === kind && { borderColor: accent, backgroundColor: "#26364b" }]}>
            <Text style={[styles.filterText, filter === kind && { color: accent }]}>{kind === "mixed" ? "A little of everything" : kindLabels[kind]}</Text>
          </Pressable>)}</View>
          <Text style={styles.sectionTitle}>Session length</Text>
          <View style={styles.counts}>{[...new Set([Math.min(5, available), Math.min(count, available), ...[5, 10, 15, 20, 30, 50].filter(n => n <= available)])].filter(n => n > 0).sort((a, b) => a - b).map(n => <Pressable key={n} accessibilityRole="button" accessibilityLabel={`${n} exercises`} accessibilityState={{ selected: Math.min(count, available) === n }} onPress={() => setCount(n)} style={[styles.count, Math.min(count, available) === n && { borderColor: accent }]}><Text style={[styles.countText, Math.min(count, available) === n && { color: accent }]}>{n}</Text></Pressable>)}</View>
          <Text style={styles.help}>{available} available · {filter === "mixed" ? "A mix of the available activities" : "Focus on one skill"}</Text>
          {startError && <Text accessibilityRole="alert" style={styles.error}>Could not load your practice. Please try again.</Text>}
          <Button title={busy ? "Getting ready…" : "Start practice"} onPress={start} accent={accent} disabled={busy || !available} />
          <Text style={styles.footer}>{config ? (allExercises.some(e => e.source) ? "Includes original practice and relevant A-Grammatik exercises. Progress on a book question is shared with Overall practice." : "Connect four pairs per exercise. You can change your connections before checking.") : "Based on the exercise formats in A-Grammatik by Anne Buscha and Szilvia Szita. Adapted into short, interactive practice."}</Text>
        </> : phase === "summary" ? <>
          <Text style={styles.eyebrow}>{title.toUpperCase()} · SESSION COMPLETE</Text>
          <Text style={styles.title}>{correctCount === attempts.length ? "Beautifully done!" : "A little better every time."}</Text>
          <Text style={[styles.score, { color: accent }]}>{correctCount}<Text style={styles.scoreTotal}> / {attempts.length}</Text></Text>
          <Text style={styles.subtitle}>correct answers · {Math.round(correctCount / Math.max(attempts.length, 1) * 100)}%</Text>
          <Button title="Practice again" onPress={() => setPhase("setup")} accent={accent} />
          <Button title="Back to home" onPress={() => router.navigate("/")} accent={accent} secondary />
          {attempts.some(a => !a.correct) && <Text style={styles.sectionTitle}>Take another look</Text>}
          {attempts.filter(a => !a.correct).map(a => <View key={a.exercise.id} style={styles.review}>
            <Text style={[styles.eyebrow, { color: accent }]}>{a.exercise.topic}</Text>
            <Text style={styles.help}>Your answer: {a.answer}</Text>
            <Text style={styles.solution}>{solutionText(a.exercise)}</Text>
            <Text style={styles.description}>{a.exercise.explanation}</Text>
          </View>)}
        </> : exercise && <>
          <View style={styles.progressRow}><Text style={styles.eyebrow}>{title.toUpperCase()}</Text><Text style={styles.help}>{index + 1} of {session.length} · {correctCount} correct</Text></View>
          <View style={styles.track}><View style={[styles.progress, { backgroundColor: accent, width: `${(attempts.length / session.length) * 100}%` }]} /></View>
          <View style={styles.progressRow}><Text style={[styles.topic, { color: accent }]}>{exercise.topic}</Text><Text style={styles.format}>{kindLabels[exercise.kind]}</Text></View>
          <Text accessibilityRole="header" style={styles.prompt}>{exercise.instruction}</Text>
          {exercise.kind === "match" ? <MatchingPairs key={exercise.id} exercise={exercise} slots={slots} onChange={setSlots} disabled={result !== null} checked={result !== null} />
            : exercise.kind === "order" ? <SentencePuzzle key={exercise.id} chunks={exercise.chunks} slots={slots} onChange={setSlots} disabled={result !== null} accent={accent} onDragStateChange={setDragging} /> : <View style={styles.questionCard}>
            <Text style={styles.sentence}>{exercise.sentence.split("___").map((part, i, parts) => <React.Fragment key={i}>
              {part}{i < parts.length - 1 && <Text style={{ color: accent }}>{answers[i] || (parts.length > 2 ? `___ (${i + 1})` : "___")}</Text>}
            </React.Fragment>)}</Text>
            {exercise.kind === "choice" ? <View style={styles.optionList}>{options.map(option => <Pressable key={option} accessibilityRole="button" accessibilityLabel={option} accessibilityState={{ selected: answers[0] === option, disabled: result !== null }} disabled={result !== null}
              onPress={() => setAnswers([option])} style={[styles.option, answers[0] === option && { borderColor: accent, backgroundColor: "#26364b" }, result !== null && option === exercise.answer && { borderColor: colors.success }]}>
              <Text style={styles.optionText}>{option}</Text><Ionicons name={answers[0] === option ? "radio-button-on" : "radio-button-off"} size={21} color={answers[0] === option ? accent : colors.textSecondary} />
            </Pressable>)}</View> : <>
              {exercise.blanks.map((blank, i) => <View key={`${exercise.id}-${i}`} style={styles.gapGroup}>
                <Text style={styles.help}>{exercise.blanks.length > 1 ? `Gap ${i + 1} · ` : ""}{blank.hint}</Text>
                <View style={styles.optionGrid}>{gapOptions[i]?.map(option => {
                  const selected = answers[i] === option;
                  const correctOption = blank.answers.includes(option);
                  return <Pressable key={option} accessibilityRole="button" accessibilityLabel={`Gap ${i + 1}: ${option}`}
                    accessibilityState={{ selected, disabled: result !== null }} disabled={result !== null}
                    onPress={() => setAnswers(old => old.map((answer, j) => i === j ? option : answer))}
                    style={[styles.gapOption, selected && { borderColor: accent, backgroundColor: "#26364b" },
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
              <Text style={[styles.feedbackTitle, { color: result ? colors.success : "#fca5a5" }]}>{result ? "Correct!" : "Not quite — here’s the answer"}</Text>
              <Text style={styles.solution}>{solutionText(exercise)}</Text>
              <Text style={styles.description}>{exercise.explanation}</Text>
              {exercise.source && <Text style={styles.footer}>A-Grammatik · page {exercise.source.printedPage} · exercise {exercise.source.exercise.split("-")[0]} · adapted for practice</Text>}
            </View>
            <Button title={busy ? "Saving…" : index === session.length - 1 ? "Finish session" : "Next exercise"} onPress={next} accent={accent} disabled={busy} />
          </>}
          <Button title="End session" onPress={finish} accent={accent} secondary disabled={busy} />
        </>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 48 },
  levelBadge: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 20, padding: 16, alignSelf: "flex-start", marginTop: 12 },
  levelText: { fontSize: 26, fontWeight: "800" },
  eyebrow: { color: colors.textSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  title: { fontSize: 32, lineHeight: 39, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.text, fontSize: 18, lineHeight: 26 },
  description: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700", marginTop: 12 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filter: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 24, paddingHorizontal: 15, paddingVertical: 13 },
  filterText: { color: colors.textSecondary, fontSize: 14, fontWeight: "600" },
  counts: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  count: { minWidth: 60, minHeight: 60, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.surface },
  countText: { color: colors.textSecondary, fontSize: 22, fontWeight: "700" },
  help: { color: colors.textSecondary, fontSize: 13, lineHeight: 20 },
  footer: { color: colors.textSecondary, fontSize: 12, lineHeight: 19, marginTop: 8 },
  button: { minHeight: 52, padding: 15, borderRadius: 13, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  buttonText: { fontSize: 16, fontWeight: "800" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" },
  track: { backgroundColor: colors.surfaceLight, height: 5, borderRadius: 4, overflow: "hidden" },
  progress: { height: 5, borderRadius: 4 },
  topic: { fontSize: 14, fontWeight: "700" },
  format: { color: colors.textSecondary, fontSize: 12 },
  prompt: { color: colors.text, fontSize: 23, lineHeight: 31, fontWeight: "700", marginVertical: 4 },
  questionCard: { padding: 20, borderRadius: 18, backgroundColor: colors.surface, gap: 18 },
  sentence: { color: colors.text, fontSize: 24, lineHeight: 37, fontWeight: "500" },
  optionList: { gap: 10 },
  option: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: colors.border, padding: 15, borderRadius: 12, gap: 8 },
  optionText: { color: colors.text, fontSize: 18, flexShrink: 1 },
  gapGroup: { gap: 10 },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  gapOption: { flexBasis: "45%", flexGrow: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, minHeight: 54, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  translationButton: { paddingVertical: 10, alignSelf: "flex-start" },
  translation: { color: colors.textSecondary, fontStyle: "italic", fontSize: 16, lineHeight: 24 },
  feedback: { padding: 18, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, gap: 9 },
  feedbackTitle: { fontSize: 17, fontWeight: "700" },
  solution: { color: colors.text, fontSize: 19, lineHeight: 28, fontWeight: "600" },
  score: { fontSize: 72, fontWeight: "800", marginTop: 12 },
  scoreTotal: { fontSize: 32, color: colors.textSecondary },
  review: { backgroundColor: colors.surface, padding: 18, borderRadius: 14, gap: 10 },
  error: { color: "#fca5a5", lineHeight: 22 },
});
