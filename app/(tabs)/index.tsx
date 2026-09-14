import React, { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, cardEdge } from "../../constants/theme";
import { emptyStats, getStats } from "../../lib/stats";

const decks = [
  { title: "Overall A1", face: "A1", detail: "Everyday foundations", route: "/overall-a1", color: colors.green, ink: "#2e4526", mode: "overall-a1" },
  { title: "Overall A2", face: "A2", detail: "Connect your ideas", route: "/overall-a2", color: colors.blue, ink: "#2b4352", mode: "overall-a2" },
  { title: "Conversation", face: "Hallo!", detail: "10 everyday scenarios", route: "/conversation", color: colors.peach, ink: "#653e2b", mode: "conversation" },
  { title: "Grammar", face: "der · die · das", detail: "19 focused decks", route: "/topics", color: colors.purple, ink: "#55405f", mode: null },
] as const;
const shortcuts = [
  { label: "Articles", route: "/articles", icon: "text-outline" },
  { label: "Perfekt", route: "/perfekt", icon: "checkmark-done-outline" },
  { label: "Conditionals", route: "/conditionals", icon: "sparkles-outline" },
  { label: "Separable verbs", route: "/separable", icon: "cut-outline" },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState(emptyStats);
  useFocusEffect(useCallback(() => {
    let active = true;
    getStats().then(value => { if (active) setStats(value); }).catch(() => {});
    return () => { active = false; };
  }, []));
  return <ScrollView showsVerticalScrollIndicator={false} style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 12) }]}>
    <View style={styles.brand}>
      <Image source={require("../../assets/images/owl-mascot.png")} style={styles.owl} />
      <View><Text style={styles.logo}>doiti</Text><Text style={styles.caption}>German practice</Text></View>
    </View>
    <Text accessibilityRole="header" style={styles.heading}>Pick a deck.</Text>
    <View style={styles.grid}>{decks.map(deck => <View key={deck.title} style={styles.deckWrap}>
      <View pointerEvents="none" style={[styles.backCard, { backgroundColor: deck.color }]} />
      <Pressable accessibilityRole="button" accessibilityLabel={deck.title} onPress={() => router.push(deck.route)}
        style={({ pressed }) => [styles.deck, { backgroundColor: deck.color }, pressed && styles.pressed]}>
        <View style={styles.deckTop}><Text style={[styles.deckName, { color: deck.ink }]}>{deck.title}</Text><Ionicons name="arrow-forward" size={16} color={deck.ink} /></View>
        <Text style={[styles.face, { color: deck.ink }, deck.title === "Conversation" && { fontSize: 25 }, deck.title === "Grammar" && { fontSize: 17 }]}>{deck.face}</Text>
        <Text style={[styles.caption, { color: deck.ink }]}>{deck.mode && stats[deck.mode].totalAttempted > 0 ? `${stats[deck.mode].totalAttempted} practiced` : deck.detail}</Text>
      </Pressable>
    </View>)}</View>
    <View style={styles.sectionRow}><Text accessibilityRole="header" style={styles.sectionTitle}>Quick focus</Text>
      <Pressable accessibilityRole="button" onPress={() => router.push("/topics")} style={styles.link}><Text style={styles.linkText}>All topics →</Text></Pressable>
    </View>
    <View style={styles.shortcuts}>{shortcuts.map(item => <Pressable key={item.route} accessibilityRole="button" onPress={() => router.push(item.route as Href)}
      style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
      <Ionicons name={item.icon} size={19} color={colors.primary} /><Text style={styles.shortcutText}>{item.label}</Text>
    </Pressable>)}</View>
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 18, paddingBottom: 24 },
  brand: { flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 19 }, owl: { width: 38, height: 38, borderRadius: 19 },
  logo: { fontSize: 22, fontWeight: "900", color: colors.text }, caption: { fontSize: 11, color: colors.textSecondary },
  heading: { color: colors.text, fontSize: 23, fontWeight: "800", marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 14 }, deckWrap: { width: "47%", flexGrow: 1, minWidth: 0 },
  backCard: { position: "absolute", top: 3, bottom: -3, left: 2, right: 2, borderRadius: 16, borderWidth: 1, borderColor: colors.border, transform: [{ rotate: "3deg" }] },
  deck: { ...cardEdge, minHeight: 116, padding: 12, borderRadius: 16, justifyContent: "space-between", gap: 8 },
  deckTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 4 }, deckName: { fontSize: 12, fontWeight: "800", flexShrink: 1 },
  face: { fontSize: 35, fontWeight: "900", letterSpacing: -1 }, pressed: { transform: [{ translateY: 2 }], opacity: 0.8 },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 17 }, sectionTitle: { fontSize: 16, fontWeight: "800", color: colors.text },
  link: { minHeight: 44, justifyContent: "center" }, linkText: { color: colors.primary, fontSize: 13, fontWeight: "700" },
  shortcuts: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, shortcut: { ...cardEdge, flexBasis: "46%", flexGrow: 1, minHeight: 50, padding: 10, borderRadius: 12, backgroundColor: colors.surface, flexDirection: "row", alignItems: "center", gap: 8 },
  shortcutText: { color: colors.text, fontSize: 13, fontWeight: "700", flexShrink: 1 },
});
