import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { colors, spacing } from "../constants/theme";

const useNativeDriver = Platform.OS !== "web";

const celebrationOwl = require("../assets/images/celebration.webp") as ImageSourcePropType;
const sprinklesImage = require("../assets/images/perfect-sprinkles.png") as ImageSourcePropType;

interface ExerciseSummaryProps {
  correct: number;
  total: number;
  accentColor: string;
  onDone: () => void;
}

export default function ExerciseSummary({
  correct,
  total,
  accentColor,
  onDone,
}: ExerciseSummaryProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = correct === total && total > 0;
  const barColor = percentage >= 70 ? colors.success : colors.warning;

  if (isPerfect) {
    return (
      <PerfectSummary
        correct={correct}
        total={total}
        accentColor={accentColor}
        onDone={onDone}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={celebrationOwl} style={styles.image} />
      <Text style={styles.heading}>Session Complete!</Text>

      <Text style={[styles.percentage, { color: accentColor }]}>
        {percentage}%
      </Text>
      <Text style={styles.score}>
        {correct} / {total} correct
      </Text>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: accentColor }]}
        onPress={onDone}
        activeOpacity={0.7}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- PERFECT summary with sprinkles ---

function PerfectSummary({
  correct,
  total,
  accentColor,
  onDone,
}: ExerciseSummaryProps) {
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const sprinklesOpacity = useRef(new Animated.Value(0)).current;
  const sprinklesScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.sequence([
      // Sprinkles fade in first
      Animated.parallel([
        Animated.timing(sprinklesOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver,
        }),
        Animated.spring(sprinklesScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver,
        }),
      ]),
      // Then PERFECT text bounces in
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          tension: 80,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver,
        }),
      ]),
    ]).start();
  }, [scale, opacity, sprinklesOpacity, sprinklesScale]);

  return (
    <View style={styles.container}>
      {/* Sprinkles background */}
      <Animated.View
        style={[
          styles.sprinklesContainer,
          {
            opacity: sprinklesOpacity,
            transform: [{ scale: sprinklesScale }],
          },
        ]}
      >
        <Image source={sprinklesImage} style={styles.sprinklesImage} />
      </Animated.View>

      {/* PERFECT text */}
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
          alignItems: "center",
        }}
      >
        <Text style={styles.perfectText}>PERFECT!</Text>
        <Text style={styles.perfectScore}>
          {correct} / {total}
        </Text>
      </Animated.View>

      {/* Progress bar (full green) */}
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: "100%",
              backgroundColor: "#fbbf24",
            },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: accentColor }]}
        onPress={onDone}
        activeOpacity={0.7}
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    paddingBottom: 80,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 24,
    resizeMode: "cover",
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
  },
  percentage: {
    fontSize: 56,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  score: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  barTrack: {
    width: "80%",
    height: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: spacing.xl,
  },
  barFill: {
    height: "100%",
    borderRadius: 6,
  },
  doneButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: 12,
  },
  doneText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  // Perfect styles
  sprinklesContainer: {
    position: "absolute",
    width: 500,
    height: 500,
  },
  sprinklesImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  perfectText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#fbbf24",
    marginBottom: spacing.sm,
    textShadowColor: "#f59e0b",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  perfectScore: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
});
