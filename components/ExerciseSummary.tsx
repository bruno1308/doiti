import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors, spacing } from "../constants/theme";

const celebrationOwl = require("../assets/images/celebration.webp") as ImageSourcePropType;

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
  const barColor = percentage >= 70 ? colors.success : colors.warning;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
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
});
