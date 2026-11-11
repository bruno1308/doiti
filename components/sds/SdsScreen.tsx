import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { schreibenTasks } from "../../data/sds/schreiben";
import { getSdsResults, getSdsServer, gradeWriting, normalizeServer, saveSdsResult, serverReady, type SdsServer } from "../../lib/sds/api";
import { moduleMinutes, moduleSkills, writingLevel, type WritingAnswer } from "../../lib/sds/engine";
import type { SdsResult, SpeakingReport, WritingReport } from "../../lib/sds/report";
import { levelLabels, skillLabels, type SdsLevel, type SdsModule, type SdsSkill } from "../../lib/sds/types";
import { recordSession } from "../../lib/stats";
import Interview from "./Interview";
import { WritingReportView } from "./Reports";
import Tablet, { type TabletResult, type TaskReview } from "./Tablet";
import { Button, LevelBadge, ui } from "./ui";

const modules: { id: SdsModule; title: string; detail: string; icon: React.ComponentProps<typeof Ionicons>["name"] }[] = [
  { id: "full", title: "Full test", detail: "Lesen, Schreiben, Hören, then the interview · up to 2 h 30 + 15 min", icon: "school-outline" },
  { id: "speaking", title: "Interview only", detail: "Voice examiner, assessment and teacher debrief · about 15 min", icon: "mic-outline" },
  { id: "written", title: "Written module", detail: "Lesen and Schreiben · up to 1 h 45", icon: "create-outline" },
  { id: "oral", title: "Oral module", detail: "Hören, then the interview · up to 45 + 15 min", icon: "ear-outline" },
  { id: "writing", title: "Writing only", detail: "One task per level, from the form to the 200-word text", icon: "document-text-outline" },
];
const skills: SdsSkill[] = ["lesen", "hoeren", "schreiben", "sprechen"];
const moduleTitle = (id: SdsModule) => modules.find(item => item.id === id)!.title;

function Review({ reviews }: { reviews: TaskReview[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!reviews.length) return null;
  return <View style={ui.card}>
    <Text style={ui.heading}>Review your answers</Text>
    {reviews.map(({ task, answers, correct, total }) => <View key={task.id} style={styles.reviewTask}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: open === task.id }} onPress={() => setOpen(open === task.id ? null : task.id)} style={[ui.row, { minHeight: 44 }]}>
        <LevelBadge level={task.level} />
        <Text style={[ui.body, { flex: 1 }]}>{skillLabels[task.skill]} · {task.domain}</Text>
        <Text style={styles.score}>{correct}/{total}</Text>
        <Ionicons name={open === task.id ? "chevron-up" : "chevron-down"} size={18} color={colors.textSecondary} />
      </Pressable>
      {open === task.id && <View style={{ gap: 8 }}>
        {task.skill === "hoeren" ? <Text style={styles.source}>{task.script.map(line => line.speaker ? `${line.speaker}: ${line.text}` : line.text).join("\n")}</Text>
          : task.text ? <Text style={styles.source}>{task.title ? `${task.title}\n\n` : ""}{task.text}</Text> : null}
        {task.items.map((item, i) => {
          const right = answers[i] === item.answer;
          const name = (index: number | null) => index === null ? "no answer" : `${item.options[index].emoji ?? ""} ${item.options[index].label}`.trim();
          return <View key={i} style={styles.reviewItem}>
            <Ionicons name={right ? "checkmark-circle" : "close-circle"} size={18} color={right ? colors.success : colors.error} />
            <View style={{ flex: 1 }}><Text style={ui.body}>{item.prompt}</Text>
              <Text style={ui.help}>{right ? name(item.answer) : `You: ${name(answers[i])} · Correct: ${name(item.answer)}`}</Text></View>
          </View>;
        })}
      </View>}
    </View>)}
  </View>;
}

/** Without the server the candidate compares each text with a model answer and decides. */
function SelfRating({ answers, onRated }: { answers: WritingAnswer[]; onRated: (level: SdsLevel | null) => void }) {
  const [reached, setReached] = useState<Record<string, boolean>>({});
  const complete = answers.every(answer => answer.taskId in reached);
  return <>
    <View style={ui.card}><Text style={ui.heading}>Rate your writing</Text>
      <Text style={ui.help}>Compare each text with the model answer. A level counts when every required point is covered and a reader can follow the text; from A2 up, two of three must also hold: linked sentences, enough vocabulary, mostly correct grammar.</Text></View>
    {answers.map(answer => {
      const task = schreibenTasks.find(item => item.id === answer.taskId);
      if (!task) return null;
      return <View key={answer.taskId} style={ui.card}>
        <View style={ui.row}><LevelBadge level={answer.level} /><Text style={[ui.help, { flex: 1 }]}>{task.situation}</Text></View>
        {task.kind !== "form" && task.points.map(point => <Text key={point} style={ui.help}>• {point}</Text>)}
        <Text style={ui.label}>Your text</Text><Text style={styles.source}>{answer.text}</Text>
        <Text style={ui.label}>Model answer</Text><Text style={styles.source}>{task.modelAnswer}</Text>
        <View style={ui.row}>{[true, false].map(value => <Button key={String(value)} secondary title={value ? "Reached" : "Not yet"} onPress={() => setReached(current => ({ ...current, [answer.taskId]: value }))}
          style={[{ flex: 1 }, reached[answer.taskId] === value && styles.chosen]} />)}</View>
      </View>;
    })}
    <Button title="Save my rating" disabled={!complete} onPress={() => onRated(writingLevel(answers.map(answer => ({ level: answer.level, reached: reached[answer.taskId] }))))} />
  </>;
}

function Results({ result, reviews, answers, server, onChange, onClose }: {
  result: SdsResult; reviews: TaskReview[]; answers: WritingAnswer[]; server: SdsServer; onChange: (result: SdsResult) => void; onClose: () => void;
}) {
  const [grading, setGrading] = useState<"idle" | "running" | "failed" | "self">("idle");
  const [problem, setProblem] = useState("");
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const pending = answers.length > 0 && result.schreiben === undefined;
  const grade = useCallback(async () => {
    setGrading("running");
    try {
      const report: WritingReport = await gradeWriting(server, {
        feedbackLanguage: "en",
        answers: answers.map(answer => {
          const task = schreibenTasks.find(item => item.id === answer.taskId)!;
          return { taskId: task.id, level: task.level, kind: task.kind, situation: task.situation, incoming: task.incoming?.text, points: task.points, minWords: task.minWords, text: answer.text };
        }),
      });
      // The level shown is derived from the per-task verdicts, so the badge and the task cards cannot disagree.
      const level = writingLevel(report.tasks);
      if (alive.current) { onChange({ ...result, schreiben: level, schreibenBy: "ai", writing: { ...report, level } }); setGrading("idle"); }
    } catch (failure) {
      if (alive.current) { setProblem(failure instanceof Error ? failure.message : "The assessment failed."); setGrading("failed"); }
    }
  }, [answers, onChange, result, server]);
  const started = useRef(false);
  useEffect(() => {
    if (!pending || started.current) return;
    started.current = true;
    if (serverReady(server)) void grade(); else setGrading("self");
  }, [pending, server, grade]);

  const tested = skills.filter(skill => moduleSkills[result.module][skill]);
  return <ScrollView style={ui.screen} contentContainerStyle={ui.content}>
    <Text accessibilityRole="header" style={ui.title}>Your result</Text>
    <View style={[ui.card, styles.levels]}>{tested.map(skill => <View key={skill} style={styles.level}>
      <Text style={ui.label}>{skillLabels[skill]}</Text>
      {skill === "schreiben" && pending ? <ActivityIndicator color={colors.primary} style={{ height: 52 }} /> : <LevelBadge large level={result[skill]} />}
      {skill === "schreiben" && result.schreibenBy === "self" && <Text style={ui.help}>self-rated</Text>}
      {skill === "sprechen" && result.sprechen === undefined && <Text style={ui.help}>not rated</Text>}
    </View>)}</View>
    <Text style={ui.help}>A practice estimate, not a certificate: the items are original, the cut score (60 %) is this app&apos;s own, and speaking and writing are rated by AI against the published criteria. “&lt; vor A1” means the lowest level was not confirmed.</Text>
    {grading === "running" && <View style={ui.card}><Text style={ui.body}>Rating your writing … this usually takes under a minute.</Text></View>}
    {grading === "failed" && <View style={ui.card}>
      <Text accessibilityRole="alert" style={ui.error}>{problem}</Text>
      <Button title="Try again" onPress={grade} /><Button secondary title="Rate it myself" onPress={() => setGrading("self")} />
    </View>}
    {grading === "self" && pending && <SelfRating answers={answers} onRated={level => { onChange({ ...result, schreiben: level, schreibenBy: "self" }); setGrading("idle"); }} />}
    {result.writing && <><Text style={ui.heading}>Schreiben</Text><WritingReportView report={result.writing} /></>}
    <Review reviews={reviews} />
    <Button title="Done" onPress={onClose} />
  </ScrollView>;
}

export default function SdsScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<"home" | "tablet" | "interview" | "results">("home");
  const [module, setModule] = useState<SdsModule>("full");
  const [server, setServer] = useState<SdsServer>(() => normalizeServer({}));
  const [history, setHistory] = useState<SdsResult[]>([]);
  const [result, setResult] = useState<SdsResult | null>(null);
  const tablet = useRef<TabletResult | null>(null);
  const spoken = useRef<SpeakingReport | null>(null);

  const refresh = useCallback(() => { getSdsResults().then(setHistory).catch(() => {}); getSdsServer().then(setServer).catch(() => {}); }, []);

  const store = useCallback((next: SdsResult) => { setResult(next); saveSdsResult(next).then(refresh).catch(() => {}); }, [refresh]);
  const start = (id: SdsModule) => {
    tablet.current = null; spoken.current = null; setResult(null); setModule(id);
    setPhase(moduleMinutes[id] > 0 ? "tablet" : "interview");
  };
  const conclude = useCallback((id: SdsModule, speaking: SdsResult["speaking"] | null) => {
    const done = tablet.current;
    const use = moduleSkills[id];
    const correct = done?.reviews.reduce((sum, review) => sum + review.correct, 0) ?? 0;
    const total = done?.reviews.reduce((sum, review) => sum + review.total, 0) ?? 0;
    const next: SdsResult = {
      id: `${Date.now()}`, date: new Date().toISOString(), module: id,
      ...(use.lesen && done ? { lesen: done.state.lesen.achieved } : {}),
      ...(use.hoeren && done ? { hoeren: done.state.hoeren.achieved } : {}),
      // Writing stays open until it is rated; with nothing written there is nothing to confirm.
      ...(use.schreiben && done && !done.state.writing.length ? { schreiben: null } : {}),
      ...(speaking ? { sprechen: speaking.level, speaking } : {}),
      ...(total ? { receptive: { correct, total } } : {}),
    };
    store(next);
    if (total) recordSession({ mode: "sds", date: next.date, total, correct }).catch(() => {});
    setPhase("results");
  }, [store]);

  // Leaving the screen ends a running test: a hidden screen must not keep the microphone or the audio going.
  // Whatever is already finished (the tablet part, an assessed interview) is kept as a result.
  const leave = useRef(() => {});
  leave.current = () => {
    if (phase === "interview" && (tablet.current || spoken.current)) conclude(module, spoken.current);
    else if (phase !== "results") setPhase("home");
  };
  useFocusEffect(useCallback(() => { refresh(); return () => leave.current(); }, [refresh]));

  if (phase === "tablet") return <Tablet key={module} module={module} onQuit={() => setPhase("home")}
    onFinish={done => { tablet.current = done; if (moduleSkills[module].sprechen) setPhase("interview"); else conclude(module, null); }} />;
  if (phase === "interview") return <Interview server={server} onReport={report => { spoken.current = report; }} onDone={report => conclude(module, report)} />;
  if (phase === "results" && result) return <Results result={result} reviews={tablet.current?.reviews ?? []} answers={tablet.current?.state.writing ?? []} server={server}
    onChange={store} onClose={() => setPhase("home")} />;

  return <ScrollView style={ui.screen} contentContainerStyle={ui.content}>
    <Text accessibilityRole="header" style={ui.title}>SDS test simulation</Text>
    <Text style={ui.help}>Practise the Schweizerischer Digitaler Sprachtest: adaptive from vor A1 to B2, in the order of the real test. Tasks get harder while you solve them and each skill stops at your limit.</Text>
    {modules.map(item => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={item.title} onPress={() => start(item.id)}
      style={({ pressed }) => [ui.card, styles.module, item.id === "full" && { backgroundColor: colors.goal }, pressed && ui.pressed]}>
      <Ionicons name={item.icon} size={26} color={colors.primary} />
      <View style={{ flex: 1, gap: 2 }}><Text style={ui.heading}>{item.title}</Text><Text style={ui.help}>{item.detail}</Text></View>
      <Ionicons name="arrow-forward" size={18} color={colors.primary} />
    </Pressable>)}
    {!serverReady(server) && <View style={ui.card}>
      <Text style={ui.heading}>Voice examiner not set up</Text>
      <Text style={ui.help}>Reading and listening work offline. The interview and the AI rating of your writing need the Doiti server address and access code.</Text>
      <Button secondary title="Open settings" icon="options-outline" onPress={() => router.navigate("/settings")} />
    </View>}
    {history.length > 0 && <View style={ui.card}>
      <Text style={ui.heading}>Past results</Text>
      {history.map(item => <View key={item.id} style={styles.past}>
        <Text style={ui.help}>{new Date(item.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} · {moduleTitle(item.module)}</Text>
        <View style={styles.pastLevels}>{skills.filter(skill => item[skill] !== undefined).map(skill => <Text key={skill} style={styles.pastLevel}>{skillLabels[skill]} <Text style={{ fontWeight: "800" }}>{item[skill] ? levelLabels[item[skill]!] : "< vor A1"}</Text></Text>)}</View>
      </View>)}
    </View>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  module: { flexDirection: "row", alignItems: "center", gap: 12 },
  levels: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", gap: 12 },
  level: { alignItems: "center", gap: 6, minWidth: 96 },
  chosen: { backgroundColor: colors.green, borderColor: colors.success },
  reviewTask: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 4, gap: 6 },
  reviewItem: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  score: { fontSize: 14, fontWeight: "800", color: colors.text },
  source: { fontSize: 14, lineHeight: 21, color: colors.text, backgroundColor: colors.background, borderRadius: 10, padding: 10 },
  past: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, gap: 4 },
  pastLevels: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  pastLevel: { fontSize: 14, color: colors.text },
});
