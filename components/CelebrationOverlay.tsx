import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { comboMessage } from "../lib/celebrations";
import useReducedMotion from "../lib/useReducedMotion";
import { PaperBurst, useNativeDriver } from "./CelebrationBits";

/** Mount once per milestone. Navigation unmounts and cancels all effects. */
export default function CelebrationOverlay({ streak }: { streak: number }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const enter = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    enter.setValue(0); opacity.setValue(1);
    const animation = reduced ? null : Animated.sequence([
      Animated.spring(enter, { toValue: 1, friction: 7, tension: 100, useNativeDriver }),
      Animated.delay(700),
      Animated.timing(opacity, { toValue: 0, duration: 260, useNativeDriver }),
    ]);
    animation?.start();
    return () => animation?.stop();
  }, [enter, opacity, reduced]);
  if (!visible) return null;
  return <View pointerEvents="none" style={styles.overlay}>
    <View style={styles.burst}><PaperBurst /></View>
    <Animated.View accessibilityLiveRegion="polite" accessible accessibilityLabel={`${streak} correct in a row. ${comboMessage(streak)}`} style={[styles.sticker,
      { backgroundColor: streak >= 10 ? colors.goal : streak >= 5 ? colors.purple : colors.green },
      !reduced && { opacity, transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [-24, 0] }) }, { scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] },
    ]}>
      <View style={styles.seal}><Ionicons name={streak >= 10 ? "ribbon" : "sparkles"} size={26} color={colors.primary} accessible={false} /></View>
      <View style={styles.words}><Text style={styles.number}>{streak} in a row!</Text><Text style={styles.caption}>{comboMessage(streak)}</Text></View>
      <Ionicons name="star-outline" size={18} color={colors.primary} accessible={false} />
    </Animated.View>
  </View>;
}
const styles = StyleSheet.create({
  overlay: { position: "absolute", top: 12, left: 12, right: 12, height: 140, alignItems: "center", zIndex: 20 },
  burst: { position: "absolute", top: -18, width: 280, height: 140 },
  sticker: { flexDirection: "row", alignItems: "center", gap: 11, padding: 13, borderRadius: 22, borderWidth: 1, borderBottomWidth: 4, borderColor: "#a6b595", maxWidth: 320, width: "100%" },
  seal: { width: 43, height: 43, borderRadius: 15, backgroundColor: colors.surface, justifyContent: "center", alignItems: "center", transform: [{ rotate: "-10deg" }] },
  words: { flex: 1, gap: 2 }, number: { fontSize: 19, fontWeight: "900", color: colors.primary },
  caption: { fontSize: 12, color: colors.primary },
});
