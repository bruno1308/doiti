import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors, cardEdge } from "../../constants/theme";
import { kindLabels } from "../../lib/overall-logic";
import { defaultPracticePreferences, practiceKinds, sessionLengths, type PracticePreferences } from "../../lib/practice-preferences";
import { getPracticePreferences, savePracticePreferences } from "../../lib/settings";

const descriptions = {
  choice: "Pick an answer from four options.",
  fill: "Complete gaps, one set of choices at a time.",
  conjugation: "Choose the correct verb forms.",
  order: "Drag or tap pieces into sentence order.",
  match: "Connect words with their partners.",
};

export default function SettingsScreen() {
  const [preferences, setPreferences] = useState(defaultPracticePreferences);
  const [status, setStatus] = useState<"loading" | "saved" | "saving" | "load-error" | "save-error">("loading");
  const current = useRef(preferences);
  const revision = useRef(0);
  const load = useCallback(async () => {
    const version = ++revision.current;
    setStatus("loading");
    try {
      const saved = await getPracticePreferences();
      if (version !== revision.current) return;
      current.current = saved; setPreferences(saved); setStatus("saved");
    } catch { if (version === revision.current) setStatus("load-error"); }
  }, []);
  useFocusEffect(useCallback(() => {
    void load();
    return () => { revision.current++; };
  }, [load]));

  const update = (next: PracticePreferences) => {
    const version = ++revision.current;
    current.current = next; setPreferences(next); setStatus("saving");
    savePracticePreferences(next).then(() => {
      if (version === revision.current) setStatus("saved");
    }).catch(() => { if (version === revision.current) setStatus("save-error"); });
  };
  const allStyles = preferences.kinds.length === practiceKinds.length;
  return <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <Text accessibilityRole="header" style={styles.title}>Make it your practice.</Text>
    <Text style={styles.help}>Tap a deck and jump straight in. These preferences apply to your next session.</Text>
    {status === "loading" ? <ActivityIndicator accessibilityLabel="Loading settings" color={colors.primary} /> : status === "load-error" ? <View style={styles.card}>
      <Text accessibilityRole="alert" style={styles.error}>Could not load your settings.</Text>
      <Pressable accessibilityRole="button" onPress={load} style={styles.action}><Text style={styles.actionText}>Try again</Text></Pressable>
    </View> : <>
      <View style={styles.card}>
        <Text accessibilityRole="header" style={styles.heading}>Cards per session</Text>
        <View style={styles.lengths}>{sessionLengths.map(count => <Pressable key={count} accessibilityRole="button" accessibilityLabel={`${count} cards`} accessibilityState={{ selected: preferences.count === count }}
          onPress={() => update({ ...current.current, count })} style={[styles.length, preferences.count === count && styles.selected]}><Text style={styles.number}>{count}</Text></Pressable>)}</View>
        <Text style={styles.help}>Default: 20. Smaller decks use all available cards without repeats.</Text>
      </View>
      <View style={styles.card}>
        <Text accessibilityRole="header" style={styles.heading}>Exercise types</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="All styles" accessibilityState={{ selected: allStyles }} onPress={() => update({ ...current.current, kinds: [...practiceKinds] })} style={[styles.all, allStyles && styles.selected]}>
          <Ionicons name="layers-outline" size={20} color={colors.primary} /><Text style={styles.label}>All styles</Text><Text style={styles.help}>{allStyles ? "Selected" : "Select all"}</Text>
        </Pressable>
        <Text style={styles.help}>Or include only the types you enjoy. Keep at least one selected.</Text>
        {practiceKinds.map(kind => {
          const checked = preferences.kinds.includes(kind);
          const last = checked && preferences.kinds.length === 1;
          return <Pressable key={kind} accessibilityRole="checkbox" accessibilityLabel={kindLabels[kind]} accessibilityState={{ checked, disabled: last }} disabled={last}
            onPress={() => update({ ...current.current, kinds: checked ? current.current.kinds.filter(value => value !== kind) : [...current.current.kinds, kind] })} style={styles.type}>
            <Ionicons name={checked ? "checkbox" : "square-outline"} size={25} color={checked ? colors.success : colors.textSecondary} />
            <View style={styles.typeBody}><Text style={styles.label}>{kindLabels[kind]}</Text><Text style={styles.help}>{descriptions[kind]}</Text></View>
          </Pressable>;
        })}
      </View>
      <Text style={styles.help}>Each deck uses the selected types it supports. Conversation keeps its five objectives per scenario.</Text>
      <Text accessibilityLiveRegion="polite" style={status === "save-error" ? styles.error : styles.help}>{status === "saving" ? "Saving…" : status === "save-error" ? "Could not save your changes. Please retry." : "Saved on this device"}</Text>
      {status === "save-error" && <Pressable accessibilityRole="button" onPress={() => update(current.current)} style={styles.action}><Text style={styles.actionText}>Retry saving</Text></Pressable>}
      <Pressable accessibilityRole="button" onPress={() => update(defaultPracticePreferences())} style={styles.reset}><Text style={styles.label}>Restore defaults</Text></Pressable>
    </>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 24, gap: 14 },
  title: { fontSize: 25, fontWeight: "800", color: colors.text }, heading: { fontSize: 18, fontWeight: "700", color: colors.text },
  help: { fontSize: 13, lineHeight: 19, color: colors.textSecondary }, card: { ...cardEdge, padding: 14, backgroundColor: colors.surface, borderRadius: 18, gap: 12 },
  lengths: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, length: { minWidth: 48, minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  number: { fontSize: 18, fontWeight: "700", color: colors.text }, selected: { backgroundColor: colors.green, borderColor: colors.success },
  all: { minHeight: 48, borderWidth: 1, borderColor: colors.border, padding: 10, borderRadius: 12, flexDirection: "row", gap: 8, alignItems: "center" },
  label: { color: colors.text, fontSize: 15, fontWeight: "600", flexShrink: 1 }, type: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 54 }, typeBody: { flex: 1, gap: 3 },
  error: { color: colors.error, fontSize: 14, lineHeight: 21 }, action: { ...cardEdge, padding: 12, minHeight: 48, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, borderRadius: 12 }, actionText: { color: colors.onPrimary, fontWeight: "700" },
  reset: { minHeight: 44, alignItems: "center", justifyContent: "center" },
});
