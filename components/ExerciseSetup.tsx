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

const COUNTS = [5, 10, 15, 20];

interface ExerciseSetupProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  accentColor: string;
  onStart: (count: number) => void;
}

export default function ExerciseSetup({
  title,
  subtitle,
  image,
  accentColor,
  onStart,
}: ExerciseSetupProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <Text style={styles.prompt}>How many exercises?</Text>
      <View style={styles.countRow}>
        {COUNTS.map((count) => (
          <TouchableOpacity
            key={count}
            style={[styles.countButton, { borderColor: accentColor }]}
            onPress={() => onStart(count)}
            activeOpacity={0.7}
          >
            <Text style={[styles.countText, { color: accentColor }]}>
              {count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  prompt: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  countRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  countButton: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
