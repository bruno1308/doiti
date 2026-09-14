import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { practiceModes, type FocusedMode } from "../../data/practice-modes";
import { colors, cardEdge } from "../../constants/theme";
const groups: Record<string, FocusedMode[]> = {
  All: [],
  "Nouns & cases": ["gender", "adjectives", "cases", "possessives", "articles", "pronouns", "plurals", "prepositions"],
  Verbs: ["praeteritum", "perfekt", "modals", "separable", "reflexive", "passive", "conditionals"],
  Sentences: ["connectors", "clauses", "conditionals", "separable", "passive"],
  "Word pairs": ["comparisons", "word-pairs"],
};
export default function Topics() {
  const router = useRouter();
  const [group, setGroup] = useState("All");
  return <ScrollView showsVerticalScrollIndicator={false} style={styles.screen} contentContainerStyle={styles.content}>
    <Text accessibilityRole="header" style={styles.title}>Find your focus.</Text>
    <View style={styles.filters}>{Object.keys(groups).map(name => <Pressable key={name} accessibilityRole="button" accessibilityState={{ selected: group === name }}
      onPress={() => setGroup(name)} style={[styles.filter, group === name && { backgroundColor: colors.green, borderColor: colors.primary }]}><Text style={styles.label}>{name}</Text></Pressable>)}</View>
    {practiceModes.filter(mode => group === "All" || groups[group].includes(mode.id)).map(mode => <Pressable key={mode.id} accessibilityRole="button" accessibilityLabel={mode.title} onPress={() => router.push(`/${mode.id}`)} style={styles.row}>
      <View style={styles.icon}><Ionicons name={mode.icon as React.ComponentProps<typeof Ionicons>["name"]} size={23} color={mode.accent} /></View>
      <View style={styles.body}><Text style={styles.name}>{mode.title}</Text><Text style={styles.description}>{mode.subtitle}</Text></View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>)}
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 24, gap: 10 },
  title: { fontSize: 24, fontWeight: "800", color: colors.text, marginBottom: 4 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 4 }, filter: { minHeight: 44, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 11, backgroundColor: colors.surface, justifyContent: "center" }, label: { color: colors.text, fontSize: 13, fontWeight: "600" },
  row: { ...cardEdge, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.surface, padding: 12, borderRadius: 14 },
  icon: { width: 38, height: 38, borderRadius: 10, backgroundColor: colors.surfaceLight, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, gap: 3 }, name: { fontSize: 16, fontWeight: "700", color: colors.text }, description: { fontSize: 12, lineHeight: 17, color: colors.textSecondary },
});
