import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { openingQuestion, sprechenTasks } from "../../data/sds/sprechen";
import { fetchLiveToken, gradeSpeaking, serverReady, type SdsServer } from "../../lib/sds/api";
import { pickTask } from "../../lib/sds/engine";
import type { ExaminerNotes, FeedbackLanguage, SpeakingReport, TranscriptTurn } from "../../lib/sds/report";
import { levelLabels, sdsLevels } from "../../lib/sds/types";
import { voiceAudio } from "../../lib/sds/voice/audio";
import { VoiceConversation, type VoiceStatus } from "../../lib/sds/voice/conversation";
import { examinerInstruction, examinerTools, INTERVIEW_HARD_LIMIT_MS, INTERVIEW_SOFT_LIMIT_MS, startMessage, teacherInstruction, teacherStartMessage, timeUpMessage, type InterviewPlan } from "../../lib/sds/voice/prompts";
import useReducedMotion from "../../lib/useReducedMotion";
import { SpeakingReportView } from "./Reports";
import { Button, ui } from "./ui";

type Phase = "intro" | "exam" | "grading" | "report" | "teacher";
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;
const statusText: Record<VoiceStatus, string> = { connecting: "Connecting …", speaking: "Speaking", listening: "Listening – take your time", paused: "Paused", ended: "Ended" };

function Orb({ status }: { status: VoiceStatus }) {
  const reduced = useReducedMotion();
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduced || (status !== "speaking" && status !== "listening")) { pulse.setValue(0); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: status === "speaking" ? 450 : 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      Animated.timing(pulse, { toValue: 0, duration: status === "speaking" ? 450 : 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [status, pulse, reduced]);
  const color = status === "speaking" ? colors.peach : status === "listening" ? colors.green : colors.surfaceLight;
  return <View style={styles.orbWrap} accessibilityLiveRegion="polite" accessibilityLabel={statusText[status]}>
    <Animated.View style={[styles.orb, { backgroundColor: color, transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) }] }]}>
      {status === "connecting" ? <ActivityIndicator color={colors.primary} /> : <Ionicons name={status === "speaking" ? "volume-high" : status === "listening" ? "mic" : "pause"} size={44} color={colors.primary} />}
    </Animated.View>
    <Text style={styles.status}>{statusText[status]}</Text>
  </View>;
}

/** Without the voice service the prompts are still worth practising aloud; nothing is rated. */
function SoloPractice({ reason, onDone }: { reason: string; onDone: () => void }) {
  return <ScrollView style={ui.screen} contentContainerStyle={ui.content}>
    <Text accessibilityRole="header" style={ui.title}>Speaking practice</Text>
    <View style={ui.card}><Text style={ui.body}>{reason}</Text><Text style={ui.help}>Until then, answer these aloud. The interview always opens with the first question; the examiner then picks one task per level until you reach your limit. Speaking is not rated in this mode.</Text></View>
    <View style={ui.card}><Text style={ui.label}>Einstieg</Text><Text style={ui.german}>{openingQuestion}</Text></View>
    {sdsLevels.filter(level => level !== "preA1").map(level => <View key={level} style={ui.card}>
      <Text style={ui.label}>{levelLabels[level]}</Text>
      {sprechenTasks.filter(task => task.level === level).map(task => <Text key={task.id} style={ui.german}>• {task.prompt}</Text>)}
    </View>)}
    <Button title="Continue" onPress={onDone} />
  </ScrollView>;
}

const clip = (value: unknown, max: number) => String(value ?? "").slice(0, max);

export default function Interview({ server, onDone, onReport }: {
  server: SdsServer; onDone: (report: SpeakingReport | null) => void;
  /** Called as soon as an assessment exists, so it survives leaving the screen. */
  onReport?: (report: SpeakingReport) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [language, setLanguage] = useState<FeedbackLanguage>("en");
  const [status, setStatus] = useState<VoiceStatus>("connecting");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [prep, setPrep] = useState<{ topic: string; left: number } | null>(null);
  const [captions, setCaptions] = useState<TranscriptTurn[]>([]);
  const [report, setReport] = useState<SpeakingReport | null>(null);
  const conversation = useRef<VoiceConversation | null>(null);
  const transcript = useRef<TranscriptTurn[]>([]);
  const notes = useRef<ExaminerNotes | null>(null);
  const logged = useRef<ExaminerNotes["tasks"]>([]);
  const prepDone = useRef<(() => void) | null>(null);
  const warned = useRef(false);
  const alive = useRef(true);
  const plan = useMemo(() => Object.fromEntries(sdsLevels.map(level => [level, pickTask(sprechenTasks, level, [])!])) as InterviewPlan, []);
  useEffect(() => { alive.current = true; return () => { alive.current = false; conversation.current?.end(); prepDone.current?.(); }; }, []);

  const grade = useCallback(async () => {
    setPhase("grading"); setError(null);
    try {
      const result = await gradeSpeaking(server, {
        feedbackLanguage: language,
        // Kept within the limits the server accepts.
        transcript: transcript.current.slice(-400).map(turn => ({ ...turn, text: turn.text.slice(0, 6000) })),
        // Ended early: the examiner's notes are missing, but the logged tasks still say which levels were tested.
        examinerNotes: notes.current ?? (logged.current.length ? { level: "", tasks: logged.current.slice(0, 12), heardErrors: [], fluency: "", notes: "The interview was ended before the examiner closed it." } : null),
        tasks: sdsLevels.map(level => ({ level, prompt: plan[level].prompt })),
      });
      if (!alive.current) return;
      setReport(result); onReport?.(result); setPhase("report");
    } catch (failure) {
      if (alive.current) setError(failure instanceof Error ? failure.message : "The assessment failed.");
    }
  }, [language, onReport, plan, server]);

  const endExam = useCallback(() => {
    const live = conversation.current;
    if (!live) return;
    transcript.current = live.transcript;
    conversation.current = null;
    live.end();
    prepDone.current?.();
    if (transcript.current.some(turn => turn.role === "candidate" && turn.text.trim())) void grade();
    else { setPhase("intro"); setError("The interview ended before you said anything, so there is nothing to assess."); }
  }, [grade]);

  const begin = async (mode: "exam" | "teacher") => {
    setError(null); setStatus("connecting"); setElapsed(0); setCaptions([]); setPhase(mode);
    warned.current = false; notes.current = mode === "exam" ? null : notes.current; logged.current = mode === "exam" ? [] : logged.current;
    const live = new VoiceConversation({
      onStatus: value => { if (alive.current && conversation.current === live) setStatus(value); },
      onTranscript: turns => { if (alive.current && conversation.current === live && mode === "teacher") setCaptions(turns.slice(-4)); },
      onError: message => {
        if (!alive.current || conversation.current !== live) return;
        if (mode === "exam" && live.transcript.some(turn => turn.role === "candidate")) { endExam(); return; }
        conversation.current = null; setError(message); setPhase(mode === "exam" ? "intro" : "report");
      },
      onTool: async call => {
        if (call.name === "start_preparation") {
          const seconds = Math.min(180, Math.max(30, Number(call.args.seconds) || 90));
          setPrep({ topic: String(call.args.topic ?? plan.B2.prompt), left: seconds });
          await new Promise<void>(resolve => {
            let left = seconds;
            const finish = () => { clearInterval(timer); prepDone.current = null; setPrep(null); resolve(); };
            const timer = setInterval(() => {
              if (--left <= 0) finish(); else setPrep(value => value && { ...value, left });
            }, 1000);
            prepDone.current = finish;
          });
          return { result: "Die Vorbereitungszeit ist um. Bitten Sie die Person zu beginnen." };
        }
        if (call.name === "log_task") {
          logged.current.push({ level: clip(call.args.level, 40), fulfilled: call.args.fulfilled === true, note: clip(call.args.note, 1000) });
          return { result: "ok" };
        }
        if (call.name === "finish_interview") {
          notes.current = {
            level: clip(call.args.level, 40), tasks: logged.current.slice(0, 12),
            heardErrors: Array.isArray(call.args.heard_errors) ? call.args.heard_errors.slice(0, 60).map(item => clip(item, 400)) : [],
            fluency: clip(call.args.fluency, 1500), notes: clip(call.args.notes, 3000),
          };
          if (conversation.current === live) endExam();
          return { result: "ok" };
        }
        return { error: "unknown tool" };
      },
    });
    conversation.current = live;
    try {
      await live.start(mode === "exam"
        ? { systemInstruction: examinerInstruction(plan), tools: examinerTools, voices: { openai: "marin", gemini: "Kore" }, language: "de" }
        : { systemInstruction: teacherInstruction(report!, transcript.current, language), tools: [], voices: { openai: "cedar", gemini: "Aoede" } },
      () => fetchLiveToken(server), mode === "exam" ? startMessage : teacherStartMessage);
    } catch (failure) {
      if (conversation.current !== live) return;
      conversation.current = null; live.end();
      const denied = failure instanceof Error && /denied|NotAllowed|Permission/i.test(`${failure.name} ${failure.message}`);
      setError(denied ? "Microphone access was refused. Allow the microphone for this site and try again." : failure instanceof Error ? failure.message : "Could not start the conversation.");
      setPhase(mode === "exam" ? "intro" : "report");
    }
  };

  // Clock and time limits of the interview.
  useEffect(() => {
    if (phase !== "exam" && phase !== "teacher") return;
    const timer = setInterval(() => {
      const live = conversation.current;
      if (!live) return;
      const ms = live.elapsedMs;
      setElapsed(ms);
      if (phase !== "exam") return;
      if (ms > INTERVIEW_HARD_LIMIT_MS) endExam();
      else if (ms > INTERVIEW_SOFT_LIMIT_MS && !warned.current) { warned.current = true; live.notify(timeUpMessage); }
    }, 500);
    return () => clearInterval(timer);
  }, [phase, endExam]);

  if (!serverReady(server)) return <SoloPractice reason="The voice examiner needs the Doiti server. Add its address and access code under Settings → SDS voice examiner." onDone={() => onDone(null)} />;
  if (!voiceAudio.supported) return <SoloPractice reason="The voice examiner runs in the web app for now (also when installed to your home screen). This build cannot stream the microphone yet." onDone={() => onDone(null)} />;

  if (phase === "intro") return <ScrollView style={ui.screen} contentContainerStyle={ui.content}>
    <Text accessibilityRole="header" style={ui.title}>Interview</Text>
    <View style={ui.card}>
      <Text style={ui.body}>You will talk with an examiner for about 10 to 15 minutes, in German only. It starts with «{openingQuestion}» and then moves up through the levels until you reach your limit.</Text>
      <Text style={ui.body}>The examiner will not help or correct you. Afterwards you get a written assessment against the official criteria, and a teacher will talk it through with you.</Text>
      <Text style={ui.help}>Find a quiet place. Headphones give the best result. Your voice is sent to the voice service during the conversation; the app keeps only the transcript.</Text>
    </View>
    <View style={ui.card}>
      <Text style={ui.heading}>Feedback language</Text>
      <View style={ui.row}>{(["en", "de"] as const).map(value => <Button key={value} secondary title={value === "en" ? "English" : "Deutsch"} onPress={() => setLanguage(value)}
        style={[{ flex: 1 }, language === value && styles.chosen]} />)}</View>
    </View>
    {error && <Text accessibilityRole="alert" style={ui.error}>{error}</Text>}
    <Button title="Start the interview" icon="mic" onPress={() => begin("exam")} />
    <Button secondary title="Skip speaking" onPress={() => onDone(null)} />
  </ScrollView>;

  if (phase === "exam") return <View style={[ui.screen, styles.live]}>
    <Text style={styles.timer}>{clock(elapsed)}</Text>
    {prep ? <View style={[ui.card, styles.prep]}>
      <Text style={ui.label}>Vorbereitung · {clock(prep.left * 1000)}</Text>
      <Text style={ui.german}>{prep.topic}</Text>
      <Text style={ui.help}>Prepare in silence. The microphone is off.</Text>
      <Button title="Ich bin bereit" onPress={() => prepDone.current?.()} />
    </View> : <Orb status={status} />}
    <Button secondary title="End interview" icon="stop-circle-outline" onPress={endExam} />
  </View>;

  if (phase === "grading") return <View style={[ui.screen, styles.live]}>
    {error ? <>
      <Text accessibilityRole="alert" style={[ui.error, { textAlign: "center" }]}>{error}</Text>
      <Button title="Try again" onPress={grade} />
      <Button secondary title="Continue without assessment" onPress={() => onDone(null)} />
    </> : <>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[ui.heading, { textAlign: "center" }]}>Writing your assessment …</Text>
      <Text style={[ui.help, { textAlign: "center" }]}>This usually takes under a minute.</Text>
    </>}
  </View>;

  if (phase === "teacher") return <View style={[ui.screen, styles.live]}>
    <Text style={styles.timer}>Teacher · {clock(elapsed)}</Text>
    <Orb status={status} />
    <View style={styles.captions}>{captions.map((turn, i) => <Text key={i} numberOfLines={4} style={[styles.caption, turn.role === "candidate" && styles.own]}>{turn.text.trim()}</Text>)}</View>
    <Button secondary title="End conversation" icon="stop-circle-outline" onPress={() => { conversation.current?.end(); conversation.current = null; setPhase("report"); }} />
  </View>;

  return <ScrollView style={ui.screen} contentContainerStyle={ui.content}>
    <Text accessibilityRole="header" style={ui.title}>Your interview</Text>
    {report && <SpeakingReportView report={report} />}
    {error && <Text accessibilityRole="alert" style={ui.error}>{error}</Text>}
    <Button title="Talk it through with your teacher" icon="chatbubbles-outline" onPress={() => begin("teacher")} />
    <Button secondary title="Continue" onPress={() => onDone(report)} />
  </ScrollView>;
}

const styles = StyleSheet.create({
  live: { alignItems: "center", justifyContent: "center", padding: 24, gap: 24 },
  timer: { fontSize: 15, fontWeight: "700", color: colors.textSecondary, fontVariant: ["tabular-nums"] },
  orbWrap: { alignItems: "center", gap: 18 },
  orb: { width: 150, height: 150, borderRadius: 75, borderWidth: 2, borderBottomWidth: 6, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  status: { fontSize: 17, fontWeight: "700", color: colors.text },
  prep: { width: "100%", maxWidth: 520 },
  chosen: { backgroundColor: colors.green, borderColor: colors.success },
  captions: { width: "100%", maxWidth: 520, gap: 6, minHeight: 90 },
  caption: { fontSize: 14, lineHeight: 20, color: colors.text, backgroundColor: colors.surface, borderRadius: 10, padding: 8, alignSelf: "flex-start", maxWidth: "92%" },
  own: { alignSelf: "flex-end", backgroundColor: colors.blue },
});
