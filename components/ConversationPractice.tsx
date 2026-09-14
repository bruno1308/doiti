import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { conversations } from "../data/conversations";
import { checkReply, conversationKey, nextEmptySlot, replyText, type ConversationScenario } from "../lib/conversation";
import { shuffled } from "../lib/overall-logic";
import { getQuestionStats, recordAnswer, recordQuestionAnswer, recordSession } from "../lib/stats";
import type { QuestionStatsMap } from "../lib/types";
import { colors, cardEdge } from "../constants/theme";

const accent = colors.primary;
type Attempt = { index: number; correct: boolean; answer: string };
function DialogueMessage({ speaker, message, outgoing = false }: { speaker: string; message: string; outgoing?: boolean }) {
  return <View style={[styles.dialogue, outgoing && styles.outgoingDialogue]}>
    {!outgoing && <View style={styles.avatar}><Ionicons name="person" size={18} color="#34576b" accessible={false} /></View>}
    <View style={[styles.messageBody, outgoing && styles.outgoingBody]}>
      <Text style={[styles.personName, outgoing && styles.outgoingName]}>{speaker}</Text>
      <View style={[styles.bubble, outgoing && styles.yourBubble]}><Text style={styles.dialogueText}>{message}</Text></View>
    </View>
  </View>;
}
function Action({ title, onPress, disabled = false, secondary = false }: { title: string; onPress: () => void; disabled?: boolean; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={[styles.action, { backgroundColor: secondary ? colors.surface : accent }, disabled && { opacity: 0.4 }]}>
    <Text style={{ color: secondary ? colors.text : colors.onPrimary, fontSize: 16, fontWeight: "700" }}>{title}</Text>
  </Pressable>;
}
export default function ConversationPractice() {
  const [scenario, setScenario] = useState<ConversationScenario | null>(null);
  const [phase, setPhase] = useState<"menu" | "playing" | "summary">("menu");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [choices, setChoices] = useState<string[][]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [hint, setHint] = useState(false);
  const [history, setHistory] = useState(false);
  const [stats, setStats] = useState<QuestionStatsMap>({});
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [storageError, setStorageError] = useState(false);
  const [busy, setBusy] = useState(false);
  const records = useRef<Attempt[]>([]);
  const recorded = useRef(false);
  const writes = useRef(Promise.resolve());
  const leaving = useRef(false);
  const scroll = useRef<ScrollView>(null);
  const enqueue = useCallback((operation: () => Promise<void>) => {
    writes.current = writes.current.then(operation).catch(() => setStorageError(true));
  }, []);
  const saveSession = useCallback(() => {
    const completed = records.current;
    if (!completed.length) return;
    records.current = [];
    enqueue(() => recordSession({ mode: "conversation", date: new Date().toISOString(), total: completed.length, correct: completed.filter(a => a.correct).length }));
  }, [enqueue]);
  useFocusEffect(useCallback(() => {
    let mounted = true;
    setPhase("menu");
    getQuestionStats().then(value => { if (mounted) setStats(value); }).catch(() => { if (mounted) setStorageError(true); });
    return () => { mounted = false; saveSession(); };
  }, [saveSession]));

  const prepare = (selected: ConversationScenario, next: number) => {
    const turn = selected.turns[next];
    setIndex(next); setAnswers(turn.slots.map(() => "")); setChoices(turn.slots.map(slot => shuffled(slot.options)));
    setActive(0); setFeedback(null); setHint(false); setHistory(false); recorded.current = false;
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const start = (selected: ConversationScenario) => {
    setScenario(selected); records.current = []; setAttempts([]);
    prepare(selected, 0); setPhase("playing");
  };
  const turn = scenario?.turns[index];
  const record = (correct: boolean) => {
    if (recorded.current || !scenario || !turn) return;
    recorded.current = true;
    const attempt = { index, correct, answer: replyText(turn, answers) };
    records.current.push(attempt); setAttempts([...records.current]);
    enqueue(async () => { await recordAnswer("conversation", correct); await recordQuestionAnswer(conversationKey(scenario, turn), correct); });
  };
  const send = () => {
    if (!turn || answers.some(answer => !answer) || feedback === "correct") return;
    const correct = checkReply(turn, answers);
    record(correct); setFeedback(correct ? "correct" : "wrong");
    if (!correct) setActive(turn.slots.findIndex((slot, i) => slot.answer !== answers[i]));
  };
  const finish = async () => {
    if (leaving.current) return;
    leaving.current = true; setBusy(true); saveSession(); await writes.current;
    setPhase("summary"); setBusy(false); leaving.current = false; scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const backToMenu = async () => {
    if (leaving.current) return;
    leaving.current = true; setBusy(true); saveSession(); await writes.current;
    try { setStats(await getQuestionStats()); } catch { setStorageError(true); }
    setPhase("menu"); setScenario(null); setBusy(false); leaving.current = false;
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const completed = phase === "summary" ? (feedback === "correct" ? index + 1 : index) : index;
  return <ScrollView ref={scroll} showsVerticalScrollIndicator={false} style={styles.screen} contentContainerStyle={styles.content}>
    {storageError && <Text accessibilityRole="alert" style={styles.error}>Progress could not be saved on this device. You can continue practising.</Text>}
    {phase === "menu" ? <>
      <Text style={styles.title}>Conversation</Text>
      <Text style={styles.description}>Choose a scene. Build your reply, one word at a time.</Text>
      <Text style={styles.help}>10 scenarios · 5 objectives each · no typing</Text>
      <View style={styles.scenarioGrid}>{conversations.map(item => {
        const tried = item.turns.filter(t => stats[conversationKey(item, t)]?.attempts).length;
        return <Pressable accessibilityRole="button" accessibilityLabel={`Start ${item.title}`} key={item.id} onPress={() => start(item)} style={styles.scenario}>
          <Ionicons name={item.icon as React.ComponentProps<typeof Ionicons>["name"]} size={27} color={accent} />
          <View style={{ gap: 5 }}><Text style={styles.scenarioTitle}>{item.title}</Text>
            <Text style={styles.eyebrow}>{item.level} · 5 objectives{tried ? ` · ${tried}/5 tried` : ""}</Text></View>

        </Pressable>;
      })}</View>
    </> : scenario && phase === "summary" ? <>
      <Text style={styles.eyebrow}>{scenario.title.toUpperCase()}</Text>
      <Text style={styles.title}>{completed === scenario.turns.length ? "Conversation complete!" : "Practice saved"}</Text>
      {completed === scenario.turns.length && <DialogueMessage speaker={scenario.partner} message={scenario.closing} />}
      <Text style={styles.description}>{completed} of {scenario.turns.length} objectives completed.</Text>
      <Text style={styles.score}>{attempts.filter(a => a.correct).length} / {attempts.length}</Text>
      <Text style={styles.help}>replies correct on the first try · corrections help you learn</Text>
      <Action title="Try this scenario again" onPress={() => start(scenario)} />
      <Action title="Choose another scenario" onPress={backToMenu} disabled={busy} secondary />
      {attempts.filter(a => !a.correct).map(attempt => <View key={attempt.index} style={styles.feedback}>
        <Text style={styles.help}>{scenario.turns[attempt.index].objective}</Text>
        <Text style={styles.german}>{replyText(scenario.turns[attempt.index], scenario.turns[attempt.index].slots.map(s => s.answer))}</Text>
        <Text style={styles.help}>{scenario.turns[attempt.index].explanation}</Text>
      </View>)}
    </> : scenario && turn && <>
      <View style={styles.row}><Text style={styles.eyebrow}>{scenario.title.toUpperCase()}</Text><Text style={styles.help}>Objective {index + 1} of {scenario.turns.length}</Text></View>
      <View style={styles.track}><View style={[styles.progress, { width: `${index / scenario.turns.length * 100}%` }]} /></View>
      <Text style={styles.help}>{scenario.setting}</Text>
      {index > 0 && <Pressable accessibilityRole="button" onPress={() => setHistory(!history)} style={styles.link}><Text style={styles.help}>{history ? "Hide earlier replies" : `Earlier replies (${index})`}</Text></Pressable>}
      {history && scenario.turns.slice(0, index).map(previous => <View key={previous.id} style={{ gap: 10 }}>
        <DialogueMessage speaker={scenario.partner} message={previous.speaker} />
        <DialogueMessage speaker="You" message={replyText(previous, previous.slots.map(s => s.answer))} outgoing />
      </View>)}
      <DialogueMessage speaker={scenario.partner} message={turn.speaker} />
      <View style={styles.replySection}>
        <View style={styles.objective}>
          <View style={styles.objectiveHeading}><Ionicons name="flag-outline" size={16} color={colors.goalText} accessible={false} /><Text accessibilityRole="header" style={styles.objectiveLabel}>YOUR OBJECTIVE</Text></View>
          <Text style={styles.objectiveText}>{turn.objective}</Text>
        </View>
        <View style={styles.composer}>
        <Text style={styles.speaker}>YOUR REPLY</Text>
        <View style={styles.slots}>{turn.slots.map((slot, i) => <Pressable key={i} accessibilityRole="button" accessibilityLabel={`Reply slot ${i + 1}: ${answers[i] || "empty"}`}
          accessibilityState={{ selected: active === i, disabled: feedback === "correct" }} disabled={feedback === "correct"} onPress={() => setActive(i)}
          style={[styles.slot, active === i && { borderColor: accent, backgroundColor: colors.surfaceLight }, feedback === "wrong" && answers[i] !== slot.answer && { borderColor: colors.error }]}>
          <Text style={styles.slotNumber}>{i + 1}</Text><Text style={styles.word}>{answers[i] || "…"}</Text>
        </Pressable>)}<Text style={styles.german}>{turn.punctuation}</Text></View>
        {feedback !== "correct" && <>
          <Text accessibilityLiveRegion="polite" style={styles.help}>Choose word {active + 1} of {turn.slots.length} · tap a slot to change it</Text>
          <View style={styles.options}>{choices[active]?.map(option => <Pressable key={option} accessibilityRole="button" accessibilityLabel={`Choose ${option}`}
            accessibilityState={{ selected: answers[active] === option }} onPress={() => {
              const next = [...answers]; next[active] = option; setAnswers(next); setFeedback(null); setActive(nextEmptySlot(next, active));
            }} style={[styles.option, answers[active] === option && { borderColor: accent }]}><Text style={styles.word}>{option}</Text></Pressable>)}</View>
        </>}
        </View>
      </View>
      {feedback === "wrong" && <View accessibilityLiveRegion="polite" style={styles.feedback}><Text style={styles.error}>Check the highlighted words.</Text><Text style={styles.help}>{turn.hint}</Text>
        <Action title="Show the correct reply" secondary onPress={() => { setAnswers(turn.slots.map(s => s.answer)); setFeedback("correct"); }} />
      </View>}
      {feedback === "correct" ? <>
        <View accessibilityLiveRegion="polite" style={styles.feedback}><Text style={styles.success}>{attempts.find(a => a.index === index)?.correct ? "Reply sent!" : "Reply corrected — ready to continue"}</Text>
          <Text style={styles.german}>{replyText(turn, answers)}</Text><Text style={styles.help}>{turn.explanation}</Text></View>
        <Action title={index === scenario.turns.length - 1 ? "Finish conversation" : "Continue conversation"} disabled={busy} onPress={() => index === scenario.turns.length - 1 ? finish() : prepare(scenario, index + 1)} />
      </> : <>
        <Action title="Send reply" onPress={send} disabled={answers.some(a => !a)} />
        <Pressable accessibilityRole="button" onPress={() => setHint(!hint)} style={styles.link}><Text style={styles.help}>{hint ? "Hide hint" : "Show a hint"}</Text></Pressable>
        {hint && <Text style={styles.help}>{turn.hint}</Text>}
      </>}
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} onPress={attempts.length ? finish : backToMenu} disabled={busy} style={styles.endLink}><Text style={styles.help}>End conversation</Text></Pressable>
    </>}
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 24, gap: 12 },
  title: { color: colors.text, fontSize: 26, fontWeight: "800" }, description: { color: colors.text, fontSize: 17, lineHeight: 25 },
  eyebrow: { color: colors.textSecondary, fontSize: 11, fontWeight: "700", letterSpacing: 1 }, help: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  scenarioGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  scenario: { ...cardEdge, flexBasis: "46%", flexGrow: 1, gap: 10, backgroundColor: colors.surface, padding: 12, borderRadius: 16 },
  scenarioTitle: { color: colors.text, fontSize: 16, fontWeight: "700" }, row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 8 },
  track: { height: 5, backgroundColor: colors.surfaceLight, borderRadius: 4 }, progress: { height: 5, backgroundColor: accent, borderRadius: 4 },
  dialogue: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginVertical: 2 },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center" },
  messageBody: { flex: 1, minWidth: 0, gap: 5 }, personName: { color: "#34576b", fontSize: 13, fontWeight: "500", paddingTop: 7, paddingLeft: 2 },
  bubble: { backgroundColor: colors.blue, borderWidth: 1, borderColor: "#a9c1ce", borderRadius: 20, borderTopLeftRadius: 4, padding: 13 },
  dialogueText: { color: "#2b4352", fontSize: 21, lineHeight: 29, fontWeight: "400" },
  outgoingDialogue: { justifyContent: "flex-end" }, outgoingBody: { flex: 0, flexShrink: 1, maxWidth: "88%" }, outgoingName: { color: accent, textAlign: "right" },
  yourBubble: { backgroundColor: colors.green, borderColor: "#aabf85", borderTopLeftRadius: 20, borderTopRightRadius: 4 },
  speaker: { fontSize: 12, color: accent, fontWeight: "700" }, german: { color: colors.text, fontSize: 19, lineHeight: 28 },
  replySection: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, gap: 12 },
  objective: { borderLeftWidth: 3, borderLeftColor: "#b28c38", borderRadius: 8, padding: 12, backgroundColor: colors.goal, gap: 6 },
  objectiveHeading: { flexDirection: "row", alignItems: "center", gap: 8 }, objectiveLabel: { color: colors.goalText, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  objectiveText: { color: colors.goalText, fontSize: 15, lineHeight: 22, fontWeight: "500" },
  composer: { gap: 10 }, slots: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  slot: { ...cardEdge, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 10, minWidth: 48, minHeight: 52, maxWidth: "100%" },
  slotNumber: { color: colors.textSecondary, fontSize: 10, marginBottom: 4 }, word: { color: colors.text, fontSize: 18, flexShrink: 1 },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, option: { ...cardEdge, flexBasis: "45%", flexGrow: 1, minHeight: 54, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 12, padding: 12, justifyContent: "center", alignItems: "center" },
  action: { ...cardEdge, minHeight: 50, padding: 14, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  endLink: { minHeight: 44, alignItems: "center", justifyContent: "center" },
  link: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" }, feedback: { ...cardEdge, padding: 14, borderRadius: 14, backgroundColor: colors.surface, gap: 10 },
  error: { color: colors.error, fontSize: 15, lineHeight: 22 }, success: { color: colors.success, fontWeight: "700", fontSize: 17 }, score: { color: accent, fontSize: 46, fontWeight: "800" },
});
