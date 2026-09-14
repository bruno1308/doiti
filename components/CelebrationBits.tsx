import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import useReducedMotion from "../lib/useReducedMotion";

export const useNativeDriver = Platform.OS !== "web";
const inks = [colors.green, colors.purple, colors.peach, colors.blue, colors.goal];

/** A short, bounded burst of paper shapes; never intercepts a tap. */
export function PaperBurst({ small = false }: { small?: boolean }) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduced) return;
    progress.setValue(0);
    const animation = Animated.timing(progress, { toValue: 1, duration: small ? 620 : 1300, easing: Easing.out(Easing.quad), useNativeDriver });
    animation.start();
    return () => animation.stop();
  }, [progress, reduced, small]);
  if (reduced) return null;
  return <View testID="celebration-particles" pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={StyleSheet.absoluteFill}>
    {Array.from({ length: small ? 6 : 18 }, (_, i) => {
      const angle = (i * 137.5 - 100) * Math.PI / 180;
      const distance = small ? 26 : 72 + i % 4 * 18;
      return <Animated.View key={i} style={[styles.particle, {
        width: small ? 5 : i % 3 === 0 ? 10 : 6, height: small ? 5 : i % 3 === 0 ? 10 : 14,
        borderRadius: i % 3 === 0 ? 8 : 2, backgroundColor: inks[i % inks.length],
        opacity: progress.interpolate({ inputRange: [0, 0.08, 0.65, 1], outputRange: [0, 1, 1, 0] }),
        transform: [
          { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(angle) * distance] }) },
          { translateY: progress.interpolate({ inputRange: [0, 0.55, 1], outputRange: [0, Math.sin(angle) * distance - (small ? 6 : 30), Math.sin(angle) * distance + (small ? 8 : 34)] }) },
          { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${i % 2 ? -220 : 220}deg`] }) },
          { scale: progress.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0.4, 1, 0.65] }) },
        ],
      }]} />;
    })}
  </View>;
}
export function CorrectStamp({ label = "Correct!" }: { label?: string }) {
  const reduced = useReducedMotion();
  const scale = useRef(new Animated.Value(0.65)).current;
  useEffect(() => {
    if (reduced) return;
    scale.setValue(0.65);
    const animation = Animated.spring(scale, { toValue: 1, friction: 5, tension: 160, useNativeDriver });
    animation.start();
    return () => animation.stop();
  }, [reduced, scale]);
  return <View style={styles.correctRow}>
    <View style={styles.stampArea}><PaperBurst small /><Animated.View testID="correct-stamp" style={[styles.stamp, !reduced && { transform: [{ scale }, { rotate: "-8deg" }] }]}>
      <Ionicons name="checkmark" size={23} color={colors.success} accessible={false} />
    </Animated.View></View>
    <Text style={styles.correctText}>{label}</Text>
  </View>;
}
export function ComboMeter({ streak }: { streak: number }) {
  if (!streak) return null;
  return <View accessible accessibilityLabel={`${streak} correct answers in a row`} style={[styles.combo, streak >= 3 && styles.comboReady]}>
    <Ionicons name={streak >= 5 ? "sparkles" : "flash-outline"} size={14} color={colors.success} accessible={false} />
    <Text style={styles.comboText}>{streak} in a row</Text>
  </View>;
}
const styles = StyleSheet.create({
  particle: { position: "absolute", left: "50%", top: "50%", marginLeft: -4, marginTop: -4 },
  correctRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  stampArea: { width: 34, height: 34 },
  stamp: { width: 34, height: 34, borderRadius: 12, borderWidth: 1, borderBottomWidth: 3, borderColor: "#a6be80", backgroundColor: colors.green, alignItems: "center", justifyContent: "center" },
  correctText: { color: colors.success, fontWeight: "800", fontSize: 17, flexShrink: 1 },
  combo: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20, backgroundColor: colors.surfaceLight },
  comboReady: { backgroundColor: colors.green },
  comboText: { color: colors.success, fontSize: 12, fontWeight: "800" },
});
