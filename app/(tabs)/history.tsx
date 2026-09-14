import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, cardEdge } from "../../constants/theme";
import { getQuestionStats, getStats, subscribeToProgress } from "../../lib/stats";
import { getPracticePreferences } from "../../lib/settings";
import { activityFromSessions, weekTrail } from "../../lib/activity";
import { describeSkill, recommendPractice, type SkillStatus } from "../../lib/progress";
import { isFamiliar } from "../../lib/question-progress";
import { progressQuestions, skillDefinitions } from "../../data/progress-catalog";
import { modeNames } from "../../data/practice-modes";
import type { ExerciseMode } from "../../lib/types";

const statusLooks: Record<SkillStatus, { color: string; ink: string; icon: React.ComponentProps<typeof Ionicons>["name"] }> = {
  New: { color: colors.blue, ink: "#34576b", icon: "planet-outline" },
  Building: { color: colors.purple, ink: "#654b79", icon: "leaf-outline" },
  Comfortable: { color: colors.green, ink: colors.success, icon: "ribbon-outline" },
  "Needs another look": { color: colors.peach, ink: "#855432", icon: "refresh-outline" },
};
const statusOrder: Record<SkillStatus, number> = { "Needs another look": 0, Building: 1, Comfortable: 2, New: 3 };
async function loadProgress() {
  const [stats, questions, preferences] = await Promise.all([getStats(), getQuestionStats(), getPracticePreferences()]);
  return { stats, questions, preferences };
}
const filters = ["All", "To revisit", "Started", "New"] as const;

export default function ProgressScreen() {
  const router = useRouter();
  const [data, setData] = useState<Awaited<ReturnType<typeof loadProgress>> | null>(null);
  const [error, setError] = useState(false);
  const request = useRef(0);
  const [filter, setFilter] = useState<typeof filters[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const refresh = useCallback(() => {
    const version = ++request.current;
    setError(false);
    loadProgress().then(value => { if (version === request.current) setData(value); }).catch(() => { if (version === request.current) setError(true); });
  }, []);
  useFocusEffect(useCallback(() => {
    const unsubscribe = subscribeToProgress(refresh);
    refresh();
    return () => { request.current++; unsubscribe(); };
  }, [refresh]));

  if (error) return <View style={styles.fallback}><Text accessibilityRole="alert" style={styles.help}>Could not load your progress. Your saved practice is still on this device.</Text><Pressable accessibilityRole="button" onPress={refresh} style={styles.cta}><Text style={styles.ctaText}>Try again</Text></Pressable></View>;
  if (!data) return <View style={styles.fallback}><ActivityIndicator accessibilityLabel="Loading progress" color={colors.primary} /></View>;

  const { stats, questions, preferences } = data;
  const skills = skillDefinitions.map(skill => describeSkill(skill, questions));
  const known = progressQuestions.filter(q => questions[q.id]?.attempts > 0);
  const familiar = known.filter(q => isFamiliar(questions[q.id])).length;
  const formats = new Set(known.flatMap(q => q.kind ? [q.kind] : []));
  const played = (Object.keys(modeNames) as ExerciseMode[]).reduce((sum, mode) => sum + (stats[mode]?.totalAttempted ?? 0), 0);
  const trail = weekTrail(stats.activity ?? activityFromSessions(stats.sessions));
  const activeDays = trail.filter(day => day.attempts > 0).length;
  const recommendation = recommendPractice(skillDefinitions, questions, preferences);
  const filtered = skills.filter(skill => filter === "All" || (filter === "To revisit" ? skill.review > 0 : filter === "Started" ? skill.seen > 0 : !skill.seen))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.review - a.review);
  const visible = showAll ? filtered : filtered.slice(0, 6);
  const milestones = [
    { title: "First steps", icon: "footsteps-outline" as const, value: Math.min(20, played), target: 20, detail: "cards played", color: colors.peach },
    { title: "Mix it up", icon: "shapes-outline" as const, value: formats.size, target: 5, detail: "card styles", color: colors.purple },
    { title: "Taking root", icon: "leaf-outline" as const, value: Math.min(10, familiar), target: 10, detail: "familiar cards", color: colors.green },
  ];

  return <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <View style={styles.intro}>
      <View style={styles.introText}><Text accessibilityRole="header" style={styles.title}>{played ? "Look at you grow." : "Your story starts here."}</Text><Text style={styles.help}>{played ? "A little practice adds up." : "One card is a good beginning."}</Text></View>
      <View style={styles.mascotCircle}><Image source={require("../../assets/images/owl-mascot.png")} style={styles.mascot} /></View>
    </View>
    <View style={styles.statsRow}>
      {[{ value: played, label: "cards played" }, { value: known.length, label: "explored" }, { value: familiar, label: "familiar" }].map(item => <View key={item.label} style={styles.stat}><Text style={styles.statValue}>{item.value.toLocaleString()}</Text><Text style={styles.small}>{item.label}</Text></View>)}
    </View>
    <View style={styles.week}>
      <View style={styles.sectionRow}><Text accessibilityRole="header" style={styles.heading}>Your weekly trail</Text><Text style={styles.weekCount}>{activeDays} / 7 days</Text></View>
      <View style={styles.trail}>
        <View pointerEvents="none" style={styles.trailLine} />
        {trail.map(day => <View key={day.key} accessible accessibilityLabel={`${day.date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}: ${day.future ? "upcoming" : `${day.attempts} cards played`}${day.today ? ", today" : ""}`} style={styles.day}>
          <Text style={[styles.small, day.today && styles.todayLabel]}>{day.label}</Text>
          <View style={[styles.dot, day.attempts > 0 && styles.dotDone, day.today && styles.dotToday, day.future && { opacity: 0.5 }]}>
            {day.attempts > 0 ? <Ionicons name="checkmark" size={20} color={colors.success} /> : <View style={styles.seed} />}
          </View>
          <Text style={styles.dayCaption}>{day.today ? "today" : day.attempts ? String(day.attempts) : " "}</Text>
        </View>)}
      </View>
      <Text style={styles.small}>{activeDays === 7 ? "A whole week of showing up. Nicely done!" : activeDays ? "Every filled dot is a day you showed up." : "Play a card to light up your first dot."}</Text>
    </View>

    {recommendation && <View style={styles.challengeWrap}>
      <View pointerEvents="none" style={styles.challengeBack} />
      <View style={styles.challenge}>
        <View style={styles.sectionRow}><Text style={styles.eyebrow}>{recommendation.label}</Text><View style={styles.star}><Ionicons name="sparkles" size={22} color="#654b79" /></View></View>
        <Text accessibilityRole="header" style={styles.challengeTitle}>{recommendation.title}</Text>
        <Text style={styles.challengeReason}>{recommendation.reason}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`${recommendation.focus === "review" ? "Review" : "Practice"} ${recommendation.count} cards: ${recommendation.title}`} onPress={() => router.push({ pathname: `/${recommendation.mode}`, params: { focus: recommendation.focus } })}
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}><Text style={styles.ctaText}>{recommendation.focus === "review" ? "Review" : "Practice"} {recommendation.count} cards</Text><Ionicons name="arrow-forward" size={20} color={colors.onPrimary} /></Pressable>
      </View>
    </View>}

    <View style={styles.sectionRow}><Text accessibilityRole="header" style={styles.heading}>Little wins</Text><Text style={styles.small}>{milestones.filter(m => m.value === m.target).length} / 3 collected</Text></View>
    <View style={styles.milestones}>{milestones.map(m => <View key={m.title} accessible accessibilityLabel={`${m.title}: ${m.value} of ${m.target} ${m.detail}${m.value === m.target ? ", collected" : ""}`} style={styles.milestone}>
      <View style={[styles.medal, { backgroundColor: m.color }]}><Ionicons name={m.value === m.target ? "ribbon" : m.icon} size={24} color={colors.primary} /></View>
      <Text style={styles.milestoneTitle}>{m.title}</Text><Text style={styles.small}>{m.value} / {m.target}</Text><Text style={styles.tiny}>{m.detail}</Text>
    </View>)}</View>

    <View style={styles.sectionRow}><Text accessibilityRole="header" style={styles.heading}>Your skill collection</Text><Text style={styles.small}>{skills.filter(s => s.seen > 0).length} / {skills.length} started</Text></View>
    <View style={styles.filters}>{filters.map(name => <Pressable key={name} accessibilityRole="button" accessibilityLabel={`Skills: ${name}`} accessibilityState={{ selected: filter === name }} onPress={() => { setFilter(name); setShowAll(false); }} style={[styles.filter, filter === name && styles.filterSelected]}><Text style={styles.filterText}>{name}</Text></Pressable>)}</View>
    <View style={styles.skills}>{visible.map(skill => {
      const look = statusLooks[skill.status];
      return <Pressable key={skill.id} accessibilityRole="button" accessibilityLabel={`Practice ${skill.title}`} accessibilityHint={`${skill.status}. ${skill.seen} cards explored, ${skill.familiar} familiar.`} onPress={() => router.push(`/${skill.id}`)} style={({ pressed }) => [styles.skill, pressed && styles.pressed]}>
        <View style={styles.sectionRow}><View style={[styles.skillIcon, { backgroundColor: look.color }]}><Ionicons name={skill.icon as React.ComponentProps<typeof Ionicons>["name"]} size={22} color={look.ink} /></View><Ionicons name="arrow-forward" size={16} color={colors.textSecondary} /></View>
        <Text style={styles.skillTitle}>{skill.title}</Text>
        <View style={[styles.status, { backgroundColor: look.color }]}><Ionicons name={look.icon} size={13} color={look.ink} /><Text style={[styles.statusText, { color: look.ink }]}>{skill.status}</Text></View>
        <Text style={styles.small}>{skill.seen ? `${skill.seen} explored · ${skill.familiar} familiar` : "A new skill to discover"}</Text>
        <View style={styles.meter}><View style={[styles.meterFill, { width: `${skill.seen ? skill.familiar / skill.seen * 100 : 0}%` }]} /></View>
      </Pressable>;
    })}</View>
    {!filtered.length && <Text style={styles.help}>{filter === "To revisit" ? "Nothing waiting for a retry. Pick a new skill to keep exploring." : "Your collection will grow as you practise."}</Text>}
    {filtered.length > 6 && <Pressable accessibilityRole="button" accessibilityLabel={showAll ? "Show fewer skills" : `Show all ${filtered.length} skills`} onPress={() => setShowAll(!showAll)} style={styles.link}><Text style={styles.linkText}>{showAll ? "Show fewer skills" : `Show all ${filtered.length} skills`}</Text><Ionicons name={showAll ? "chevron-up" : "chevron-down"} size={16} color={colors.primary} /></Pressable>}
    <Pressable accessibilityRole="button" accessibilityLabel="How progress works" accessibilityState={{ expanded: showGuide }} onPress={() => setShowGuide(!showGuide)} style={styles.link}><Ionicons name="information-circle-outline" size={18} color={colors.textSecondary} /><Text style={styles.small}>How progress works</Text></Pressable>
    {showGuide && <View style={styles.guide}><Text style={styles.help}>Explored means you have answered that card. Familiar means your last three recorded attempts were correct. Older saves use at least three attempts and 80% accuracy until three new outcomes are available; a new mistake removes that familiar status.</Text><Text style={styles.help}>Comfortable needs at least five explored cards, 15 attempts, and 60% familiar, with none awaiting a retry. These are practice signals, not language-level grades.</Text><Text style={styles.help}>Shared questions contribute to each relevant skill; the explored and familiar totals count each card once. Earlier weekly activity comes from your saved sessions. New activity is recorded per answer.</Text></View>}
    <Pressable accessibilityRole="button" accessibilityLabel="Recent sessions" accessibilityState={{ expanded: showSessions }} onPress={() => setShowSessions(!showSessions)} style={styles.sessionsToggle}><View style={styles.sectionRow}><Ionicons name="time-outline" size={20} color={colors.textSecondary} /><Text style={styles.linkText}>Recent sessions</Text></View><Ionicons name={showSessions ? "chevron-up" : "chevron-down"} size={18} color={colors.textSecondary} /></Pressable>
    {showSessions && (stats.sessions.length ? stats.sessions.map((session, i) => <View key={`${session.date}-${i}`} style={styles.session}><View style={{ flex: 1, gap: 3 }}><Text style={styles.sessionTitle}>{modeNames[session.mode]}</Text><Text style={styles.small}>{new Date(session.date).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Text></View><Text style={styles.sessionScore}>{session.correct} / {session.total}</Text></View>) : <Text style={styles.help}>Your finished and partial sessions will appear here.</Text>)}
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 28, gap: 14 }, fallback: { flex: 1, backgroundColor: colors.background, padding: 24, gap: 16, justifyContent: "center" },
  intro: { flexDirection: "row", gap: 8, alignItems: "center" }, introText: { flex: 1, gap: 4 }, title: { color: colors.text, fontSize: 26, lineHeight: 31, fontWeight: "800", letterSpacing: -0.5 },
  mascotCircle: { backgroundColor: colors.green, borderRadius: 30, padding: 5, transform: [{ rotate: "8deg" }] }, mascot: { width: 43, height: 43, borderRadius: 22 },
  help: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 }, small: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, tiny: { color: colors.textSecondary, fontSize: 10, textAlign: "center" },
  statsRow: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: 15, padding: 12, borderWidth: 1, borderColor: colors.border }, stat: { flex: 1, alignItems: "center", gap: 2 }, statValue: { color: colors.primary, fontSize: 25, fontWeight: "800" },
  sectionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }, heading: { color: colors.text, fontSize: 17, fontWeight: "800", flexShrink: 1 },
  week: { ...cardEdge, borderRadius: 18, backgroundColor: colors.surface, padding: 12, gap: 10 }, weekCount: { color: colors.success, fontSize: 13, fontWeight: "700" },
  trail: { flexDirection: "row", justifyContent: "space-between", position: "relative" }, trailLine: { position: "absolute", left: 15, right: 15, top: 38, height: 2, backgroundColor: colors.border }, day: { alignItems: "center", flex: 1, gap: 5 },
  dot: { width: 31, height: 31, borderWidth: 1, borderColor: colors.border, borderRadius: 16, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }, dotDone: { backgroundColor: colors.green, borderColor: "#9ab473", borderBottomWidth: 3 }, dotToday: { borderColor: colors.primary, borderWidth: 2 }, seed: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.border }, todayLabel: { color: colors.primary, fontWeight: "800" }, dayCaption: { color: colors.textSecondary, fontSize: 9, minHeight: 12 },
  challengeWrap: { position: "relative", marginVertical: 3 }, challengeBack: { ...StyleSheet.absoluteFillObject, backgroundColor: "#c4b3d3", borderRadius: 20, transform: [{ rotate: "1.5deg" }] }, challenge: { ...cardEdge, borderColor: "#b6a7c3", borderRadius: 20, backgroundColor: colors.purple, padding: 16, gap: 10 },
  eyebrow: { color: "#654b79", fontSize: 10, fontWeight: "800", letterSpacing: 1, flexShrink: 1 }, star: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", transform: [{ rotate: "10deg" }] }, challengeTitle: { color: "#45324f", fontSize: 25, lineHeight: 30, fontWeight: "800" }, challengeReason: { color: "#594565", fontSize: 14, lineHeight: 21 },
  cta: { ...cardEdge, backgroundColor: colors.primary, borderColor: "#1d291c", borderRadius: 13, padding: 13, minHeight: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }, ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "800" }, pressed: { opacity: 0.8, transform: [{ translateY: 2 }] },
  milestones: { flexDirection: "row", gap: 8 }, milestone: { ...cardEdge, flex: 1, backgroundColor: colors.surface, borderRadius: 15, alignItems: "center", padding: 10, gap: 4 }, medal: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 3, transform: [{ rotate: "-6deg" }] }, milestoneTitle: { color: colors.text, fontSize: 12, fontWeight: "800", textAlign: "center" },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 6 }, filter: { minHeight: 44, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, borderRadius: 12, justifyContent: "center", backgroundColor: colors.surface }, filterSelected: { backgroundColor: colors.green, borderColor: colors.success }, filterText: { color: colors.text, fontSize: 12, fontWeight: "600" },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, skill: { ...cardEdge, flexBasis: "46%", flexGrow: 1, borderRadius: 16, backgroundColor: colors.surface, padding: 12, gap: 10 }, skillIcon: { width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center" }, skillTitle: { color: colors.text, fontSize: 16, lineHeight: 21, fontWeight: "700" }, status: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 4, padding: 6, borderRadius: 8 }, statusText: { fontSize: 10, fontWeight: "700", flexShrink: 1 }, meter: { height: 4, backgroundColor: colors.surfaceLight, borderRadius: 3, overflow: "hidden", marginTop: "auto" }, meterFill: { height: 4, backgroundColor: colors.success, borderRadius: 3 },
  link: { minHeight: 44, flexDirection: "row", gap: 6, justifyContent: "center", alignItems: "center" }, linkText: { color: colors.primary, fontSize: 14, fontWeight: "700" }, guide: { padding: 14, borderWidth: 1, borderColor: colors.border, borderRadius: 14, gap: 10, backgroundColor: colors.surface }, sessionsToggle: { minHeight: 50, borderTopWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, session: { backgroundColor: colors.surface, padding: 12, borderRadius: 12, flexDirection: "row", alignItems: "center", gap: 12 }, sessionTitle: { color: colors.text, fontSize: 14, fontWeight: "600" }, sessionScore: { color: colors.primary, fontWeight: "700", fontSize: 16 },
});
