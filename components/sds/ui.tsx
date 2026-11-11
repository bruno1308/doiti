import React from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cardEdge, colors } from "../../constants/theme";
import { levelLabels, type SdsLevel } from "../../lib/sds/types";

export function Button({ title, onPress, disabled = false, secondary = false, icon, style }: {
  title: string; onPress: () => void; disabled?: boolean; secondary?: boolean; icon?: React.ComponentProps<typeof Ionicons>["name"]; style?: StyleProp<ViewStyle>;
}) {
  const ink = secondary ? colors.text : colors.onPrimary;
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [ui.button, { backgroundColor: secondary ? colors.surface : colors.primary }, disabled && { opacity: 0.4 }, pressed && ui.pressed, style]}>
    {icon && <Ionicons name={icon} size={19} color={ink} />}
    <Text style={[ui.buttonText, { color: ink }]}>{title}</Text>
  </Pressable>;
}

export function LevelBadge({ level, large = false }: { level: SdsLevel | null | undefined; large?: boolean }) {
  const text = level === undefined ? "–" : level === null ? "< vor A1" : levelLabels[level];
  return <View style={[ui.badge, large && ui.badgeLarge, level == null && { backgroundColor: colors.surfaceLight }]}>
    <Text style={[ui.badgeText, large && { fontSize: level === null ? 17 : 26, lineHeight: 32 }]}>{text}</Text>
  </View>;
}

export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32, gap: 14, width: "100%", maxWidth: 720, alignSelf: "center" },
  card: { ...cardEdge, backgroundColor: colors.surface, borderRadius: 18, padding: 14, gap: 10 },
  title: { fontSize: 24, lineHeight: 30, fontWeight: "800", color: colors.text },
  heading: { fontSize: 17, lineHeight: 23, fontWeight: "800", color: colors.text },
  body: { fontSize: 15, lineHeight: 22, color: colors.text },
  german: { fontSize: 16, lineHeight: 24, color: colors.text },
  help: { fontSize: 13, lineHeight: 19, color: colors.textSecondary },
  label: { fontSize: 11, letterSpacing: 1, fontWeight: "800", color: colors.textSecondary, textTransform: "uppercase" },
  error: { fontSize: 14, lineHeight: 20, color: colors.error },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  button: { ...cardEdge, minHeight: 50, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" },
  buttonText: { fontSize: 16, fontWeight: "700", textAlign: "center", flexShrink: 1 },
  pressed: { transform: [{ translateY: 2 }], opacity: 0.85 },
  badge: { minWidth: 46, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 10, backgroundColor: colors.green, borderWidth: 1, borderColor: colors.border, alignItems: "center" },
  badgeLarge: { minWidth: 76, paddingVertical: 10, borderRadius: 14, borderBottomWidth: 4 },
  badgeText: { fontSize: 14, fontWeight: "900", color: colors.primary },
});
