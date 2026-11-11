import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { hoerenTasks } from "../../data/sds/hoeren";
import { lesenTasks } from "../../data/sds/lesen";
import { schreibenTasks } from "../../data/sds/schreiben";
import { closeTablet, countWords, moduleMinutes, newTablet, nextStep, pickTask, recordReceptive, recordWriting, scoreReceptive, type TabletState } from "../../lib/sds/engine";
import { playScript, stopScript } from "../../lib/sds/speech";
import { levelLabels, skillLabels, type HoerenTask, type ReceptiveTask, type SdsItem, type SdsLevel, type SdsModule, type WritingTask } from "../../lib/sds/types";
import { Button, ui } from "./ui";

export interface TaskReview { task: ReceptiveTask; answers: (number | null)[]; correct: number; total: number }
export interface TabletResult { state: TabletState; reviews: TaskReview[] }

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function Options({ item, selected, onSelect }: { item: SdsItem; selected: number | null; onSelect: (index: number) => void }) {
  const pictures = item.options.every(option => option.emoji);
  return <View style={pictures ? styles.pictures : styles.choices}>{item.options.map((option, index) => {
    const active = selected === index;
    return <Pressable key={index} accessibilityRole="radio" accessibilityState={{ selected: active }}
      accessibilityLabel={pictures ? `Bild ${index + 1}` : option.label} onPress={() => onSelect(index)}
      style={({ pressed }) => [pictures ? styles.picture : styles.choice, active && styles.selected, pressed && ui.pressed]}>
      {pictures ? <Text style={styles.emoji}>{option.emoji}</Text> : <>
        <Ionicons name={active ? "radio-button-on" : "radio-button-off"} size={20} color={active ? colors.success : colors.textSecondary} />
        <Text style={styles.choiceText}>{option.label}</Text>
      </>}
    </Pressable>;
  })}</View>;
}

function Player({ task }: { task: HoerenTask }) {
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => () => stopScript(), [task.id]);
  const play = async () => {
    setPlaying(true); setFailed(false);
    const ok = await playScript(task.script, task.level);
    setPlaying(false);
    // A recording that could not be played does not use up a turn.
    if (ok) setPlayed(count => count + 1); else setFailed(true);
  };
  const left = task.plays - played;
  return <View style={styles.player}>
    <Button icon={playing ? "volume-high" : "play"} title={playing ? "Läuft …" : left > 0 ? `Anhören (${played + 1} von ${task.plays})` : "Nicht mehr verfügbar"} disabled={playing || left <= 0} onPress={play} />
    <Text style={ui.help}>{task.plays === 1 ? "Sie hören den Text nur einmal." : "Sie können den Text zweimal hören."}</Text>
    {failed && <Text accessibilityRole="alert" style={ui.error}>The recording could not be played. Check that your device has a German voice installed and that the sound is on, then try again.</Text>}
  </View>;
}

function Receptive({ task, onDone }: { task: ReceptiveTask; onDone: (answers: (number | null)[]) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => task.items.map(() => null));
  const open = answers.filter(answer => answer === null).length;
  return <>
    <Text style={ui.german}>{task.instruction}</Text>
    {task.skill === "hoeren" ? <Player task={task} /> : task.text ? <View style={styles.passage}>
      {task.title && <Text style={styles.passageTitle}>{task.title}</Text>}
      <Text style={styles.passageText}>{task.text}</Text>
    </View> : null}
    {task.items.map((item, index) => <View key={index} style={ui.card} accessibilityRole="radiogroup">
      <Text style={styles.prompt}>{item.prompt}</Text>
      <Options item={item} selected={answers[index]} onSelect={choice => setAnswers(current => current.map((value, i) => i === index ? choice : value))} />
    </View>)}
    {open > 0 && <Text style={ui.help}>{open} ohne Antwort. Offene Fragen zählen als falsch.</Text>}
    <Button title="Weiter" icon="arrow-forward" onPress={() => onDone(answers)} />
  </>;
}

function Writing({ task, onDone, onDraft }: { task: WritingTask; onDone: (text: string | null) => void; onDraft: (text: string) => void }) {
  const [text, setText] = useState("");
  const [fields, setFields] = useState<string[]>(() => (task.fields ?? []).map(() => ""));
  const form = task.kind === "form";
  const answer = form ? task.fields!.map((label, i) => `${label}: ${fields[i].trim()}`).join("\n") : text.trim();
  const words = countWords(text);
  const empty = form ? fields.every(value => !value.trim()) : !text.trim();
  // The parent keeps the draft so that running out of time does not lose it.
  useEffect(() => { onDraft(empty ? "" : answer); }, [answer, empty, onDraft]);
  return <>
    <Text style={ui.german}>{task.situation}</Text>
    {task.incoming && <View style={styles.incoming}><Text style={ui.label}>{task.incoming.from}</Text><Text style={ui.german}>{task.incoming.text}</Text></View>}
    {!form && <View style={ui.card}>{task.points.map(point => <View key={point} style={styles.point}><Text style={styles.bullet}>•</Text><Text style={[ui.body, { flex: 1 }]}>{point}</Text></View>)}</View>}
    {form ? <View style={ui.card}>{task.fields!.map((label, i) => <View key={label} style={{ gap: 4 }}>
      <Text style={ui.label}>{label}</Text>
      <TextInput accessibilityLabel={label} value={fields[i]} onChangeText={value => setFields(current => current.map((old, j) => j === i ? value : old))}
        autoCorrect={false} style={styles.input} placeholderTextColor={colors.textMuted} />
    </View>)}</View> : <>
      <TextInput accessibilityLabel="Ihr Text" multiline value={text} onChangeText={setText} textAlignVertical="top" autoCorrect={false} spellCheck
        placeholder="Schreiben Sie hier …" placeholderTextColor={colors.textMuted} style={[styles.input, styles.textArea, task.level === "B2" && { minHeight: 320 }]} />
      <Text style={ui.help}>{words} {words === 1 ? "Wort" : "Wörter"}{task.minWords ? ` · verlangt: etwa ${task.minWords}` : ""}</Text>
    </>}
    <Button title="Abgeben" icon="checkmark" disabled={empty} onPress={() => onDone(answer)} />
    <Button secondary title="Stop writing here – this level is beyond me" onPress={() => onDone(null)} />
  </>;
}

export default function Tablet({ module, onFinish, onQuit }: { module: SdsModule; onFinish: (result: TabletResult) => void; onQuit: () => void }) {
  const [state, setState] = useState(() => newTablet(module));
  const [remaining, setRemaining] = useState(moduleMinutes[module] * 60);
  const reviews = useRef<TaskReview[]>([]);
  const finished = useRef(false);
  const draft = useRef<{ task: WritingTask; text: string } | null>(null);
  const [quitting, setQuitting] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const step = useMemo(() => nextStep(state), [state]);
  // The task for a step is chosen once and kept while the candidate works on it.
  const current = useMemo(() => {
    if (step.kind === "receptive") return pickTask<ReceptiveTask>(step.skill === "lesen" ? lesenTasks : hoerenTasks, step.level, state.usedTasks);
    if (step.kind === "writing") return pickTask(schreibenTasks, step.level, state.usedTasks);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.kind, step.kind === "finished" ? "" : step.level, step.kind === "receptive" ? step.skill : "", state.usedTasks.length]);

  const finish = useCallback((final: TabletState) => {
    if (finished.current) return;
    finished.current = true;
    stopScript();
    onFinish({ state: final, reviews: reviews.current });
  }, [onFinish]);
  const latest = useRef(state);
  latest.current = state;
  useEffect(() => {
    const timer = setInterval(() => setRemaining(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (remaining !== 0) return;
    // Time is up: whatever has been written so far is handed in.
    const open = draft.current;
    finish(closeTablet(open?.text ? recordWriting(latest.current, open.task, open.text) : latest.current));
  }, [remaining, finish]);
  useEffect(() => { if (step.kind === "finished") finish(state); }, [step.kind, state, finish]);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [current?.id]);

  if (step.kind === "finished" || !current) return null;
  const level: SdsLevel = step.level;
  return <ScrollView ref={scroll} style={ui.screen} contentContainerStyle={ui.content} keyboardShouldPersistTaps="handled">
    <View style={styles.bar}>
      <View style={{ flex: 1 }}>
        <Text style={ui.label}>{step.kind === "writing" ? skillLabels.schreiben : skillLabels[step.skill]} · {levelLabels[level]}</Text>
        <Text style={ui.help}>{current.domain}</Text>
      </View>
      <View style={[styles.clock, remaining < 300 && { borderColor: colors.error }]} accessibilityLabel={`${Math.ceil(remaining / 60)} Minuten übrig`}>
        <Ionicons name="time-outline" size={15} color={remaining < 300 ? colors.error : colors.textSecondary} />
        <Text style={[styles.clockText, remaining < 300 && { color: colors.error }]}>{clock(remaining)}</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Test beenden" onPress={() => setQuitting(true)} style={styles.quit}><Ionicons name="close" size={22} color={colors.text} /></Pressable>
    </View>
    {quitting && <View style={ui.card}>
      <Text style={ui.body}>Quit this test? Your answers so far will not be saved.</Text>
      <View style={ui.row}><Button secondary title="Quit" onPress={onQuit} style={{ flex: 1 }} /><Button title="Keep going" onPress={() => setQuitting(false)} style={{ flex: 1 }} /></View>
    </View>}
    {step.kind === "receptive" ? <Receptive key={current.id} task={current as ReceptiveTask} onDone={answers => {
      const task = current as ReceptiveTask;
      const score = scoreReceptive(task, answers);
      reviews.current.push({ task, answers, correct: score.correct, total: score.total });
      setState(value => recordReceptive(value, task.skill, task.id, score.outcome));
    }} /> : <Writing key={current.id} task={current as WritingTask} onDraft={text => { draft.current = { task: current as WritingTask, text }; }}
      onDone={text => { draft.current = null; setState(value => recordWriting(value, current as WritingTask, text)); }} />}
  </ScrollView>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", gap: 10 },
  clock: { flexDirection: "row", alignItems: "center", gap: 5, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 9, paddingVertical: 6, backgroundColor: colors.surface },
  clockText: { fontSize: 14, fontWeight: "700", color: colors.text, fontVariant: ["tabular-nums"] },
  quit: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  passage: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, gap: 8 },
  passageTitle: { fontSize: 17, lineHeight: 23, fontWeight: "800", color: colors.text },
  passageText: { fontSize: 16, lineHeight: 25, color: colors.text },
  prompt: { fontSize: 16, lineHeight: 23, fontWeight: "600", color: colors.text },
  choices: { gap: 8 },
  choice: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 48, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.background },
  choiceText: { flex: 1, fontSize: 15, lineHeight: 21, color: colors.text },
  pictures: { flexDirection: "row", gap: 10 },
  picture: { flex: 1, minHeight: 84, alignItems: "center", justifyContent: "center", borderWidth: 1, borderBottomWidth: 4, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.background },
  emoji: { fontSize: 44, lineHeight: 56 },
  selected: { backgroundColor: colors.green, borderColor: colors.success },
  player: { gap: 8 },
  incoming: { backgroundColor: colors.blue, borderRadius: 14, borderTopLeftRadius: 4, padding: 12, gap: 4, borderWidth: 1, borderColor: colors.border },
  point: { flexDirection: "row", gap: 8 },
  bullet: { fontSize: 15, lineHeight: 22, color: colors.textSecondary },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, lineHeight: 23, color: colors.text, minHeight: 46 },
  textArea: { minHeight: 180 },
});
