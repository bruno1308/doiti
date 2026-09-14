import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, cardEdge } from "../constants/theme";
import { completionKind } from "../lib/celebrations";
import useReducedMotion from "../lib/useReducedMotion";
import { PaperBurst, useNativeDriver } from "./CelebrationBits";

export default function ExerciseSummary({ correct, total, finished, bestStreak, conversation = false }: {
  correct: number; total: number; finished: boolean; bestStreak: number; conversation?: boolean;
}) {
  const kind = completionKind(correct, total, finished);
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduced || kind === "saved") return;
    progress.setValue(0);
    const animation = Animated.spring(progress, { toValue: 1, friction: 7, tension: 55, useNativeDriver });
    animation.start();
    return () => animation.stop();
  }, [kind, progress, reduced]);
  const perfect = kind === "perfect";
  const animate = !reduced && kind !== "saved";
  const title = kind === "saved" ? "A few cards further." : perfect ? "A perfect run." : conversation ? "Conversation complete!" : "Deck complete!";
  const reward = perfect ? colors.green : colors.purple;
  return <View testID="session-reward" style={styles.summary}>
    <View style={styles.art} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {kind !== "saved" && <PaperBurst />}
      {[-1, 1].map((side, i) => <Animated.View key={side} style={[styles.miniCard, { backgroundColor: i ? colors.peach : colors.blue }, {
        transform: [{ translateX: animate ? progress.interpolate({ inputRange: [0, 1], outputRange: [0, side * 43] }) : side * 43 },
          { rotate: animate ? progress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${side * 20}deg`] }) : `${side * 20}deg` }],
      }]}><Ionicons name={i ? "checkmark" : "sparkles-outline"} size={24} color={colors.primary} /><View style={styles.cardLine} /><View style={[styles.cardLine, { width: 18 }]} /></Animated.View>)}
      <Animated.View style={[styles.medal, { backgroundColor: kind === "saved" ? colors.surfaceLight : reward }, animate && {
        transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] }) }, { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ["-18deg", "-6deg"] }) }],
      }]}><Ionicons name={kind === "saved" ? "leaf-outline" : perfect ? "ribbon" : "checkmark-done"} size={43} color={colors.primary} /></Animated.View>
      <View style={[styles.ribbon, { backgroundColor: kind === "saved" ? colors.surfaceLight : reward }]}><Text style={styles.ribbonText}>{kind === "saved" ? "PRACTICE SAVED" : perfect ? "EVERY CARD. NAILED." : "ONE DECK STRONGER"}</Text></View>
    </View>
    <Text accessibilityRole="header" style={styles.title}>{title}</Text>
    <Text style={styles.score}>{correct}<Text style={styles.total}> / {total}</Text></Text>
    <Text style={styles.caption}>{conversation ? "replies right on the first try" : "cards answered correctly"}</Text>
    <View style={styles.stats}>
      <View style={styles.stat}><Ionicons name="checkmark-circle-outline" size={17} color={colors.success} /><Text style={styles.statText}>{total ? Math.round(correct / total * 100) : 0}% accuracy</Text></View>
      <View style={styles.stat}><Ionicons name="flash-outline" size={17} color={colors.success} /><Text style={styles.statText}>Best combo · {bestStreak}</Text></View>
    </View>
    <Text style={styles.note}>{kind === "saved" ? "Your progress is tucked away. Come back whenever." : perfect ? "Take that good feeling into your next deck." : "Every card counts. The tricky ones are a chance to grow."}</Text>
  </View>;
}
const styles = StyleSheet.create({
  summary: { ...cardEdge, backgroundColor: colors.surface, borderRadius: 24, padding: 18, gap: 7, alignItems: "center", overflow: "hidden" },
  art: { width: "100%", height: 156, alignItems: "center", justifyContent: "center" },
  miniCard: { position: "absolute", width: 65, height: 85, borderRadius: 12, borderWidth: 1, borderBottomWidth: 3, borderColor: colors.border, justifyContent: "center", alignItems: "center", gap: 8, top: 27 },
  cardLine: { width: 30, height: 3, backgroundColor: "#81917c", borderRadius: 3, opacity: 0.5 },
  medal: { width: 88, height: 88, borderRadius: 30, borderWidth: 2, borderBottomWidth: 6, borderColor: "#a7b692", alignItems: "center", justifyContent: "center", top: -5 },
  ribbon: { position: "absolute", bottom: 12, paddingVertical: 7, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderBottomWidth: 3, borderColor: "#a7b692", transform: [{ rotate: "-3deg" }] },
  ribbonText: { color: colors.primary, fontSize: 10, letterSpacing: 1.2, fontWeight: "900" },
  title: { color: colors.text, fontSize: 25, lineHeight: 31, fontWeight: "900", textAlign: "center" },
  score: { color: colors.primary, fontSize: 53, lineHeight: 61, fontWeight: "900", marginTop: 2 },
  total: { color: colors.textSecondary, fontSize: 28, fontWeight: "600" },
  caption: { color: colors.textSecondary, fontSize: 13, textAlign: "center" },
  stats: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 9 },
  stat: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.surfaceLight, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 20 },
  statText: { fontSize: 12, color: colors.primary, fontWeight: "700" },
  note: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 5 },
});
