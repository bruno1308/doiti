import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { colors, spacing } from "../../constants/theme";
import { getRandomNoun, getArticleForGender } from "../../lib/exercise-logic";
import { recordAnswer } from "../../lib/stats";
import type { Noun } from "../../lib/types";

type GenderChoice = "m" | "f" | "n";

interface AnswerState {
  selected: GenderChoice | null;
  isCorrect: boolean | null;
}

function getNextNoun(): Noun {
  return getRandomNoun();
}

export default function GenderScreen() {
  const [currentNoun, setCurrentNoun] = useState<Noun>(getNextNoun);
  const [answer, setAnswer] = useState<AnswerState>({
    selected: null,
    isCorrect: null,
  });
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);

  // Fade animation for the feedback / next section
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (answer.selected !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [answer.selected, fadeAnim]);

  const handleChoice = useCallback(
    (choice: GenderChoice) => {
      // Prevent double-tap
      if (answer.selected !== null) return;

      const isCorrect = choice === currentNoun.gender;
      setAnswer({ selected: choice, isCorrect });
      setTotal((prev) => prev + 1);
      if (isCorrect) {
        setCorrect((prev) => prev + 1);
      }

      // Record to persistent stats
      recordAnswer("gender", isCorrect);
    },
    [answer.selected, currentNoun.gender]
  );

  const handleNext = useCallback(() => {
    fadeAnim.setValue(0);
    setCurrentNoun(getNextNoun());
    setAnswer({ selected: null, isCorrect: null });
  }, [fadeAnim]);

  /**
   * Determine the background color for each gender button.
   *
   * Before any selection: use the default gender color.
   * After selection:
   *   - The correct answer button always turns green (success).
   *   - The incorrectly-selected button turns red (error).
   *   - Remaining buttons stay at their default gender color.
   */
  const getButtonColor = (gender: GenderChoice): string => {
    const defaultColors: Record<GenderChoice, string> = {
      m: colors.masculine,
      f: colors.feminine,
      n: colors.neuter,
    };

    if (answer.selected === null) {
      return defaultColors[gender];
    }

    // Always highlight the correct answer green
    if (gender === currentNoun.gender) {
      return colors.success;
    }

    // The wrong button the user tapped turns red
    if (gender === answer.selected) {
      return colors.error;
    }

    // All other buttons dim out
    return defaultColors[gender] + "44"; // 27% opacity hex
  };

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const correctArticle = getArticleForGender(currentNoun.gender);

  return (
    <View style={styles.container}>
      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {correct}/{total} ({percentage}%)
        </Text>
      </View>

      {/* Noun display */}
      <View style={styles.nounContainer}>
        <Text style={styles.nounText}>{currentNoun.word}</Text>
      </View>

      {/* Gender buttons */}
      <View style={styles.buttonRow}>
        {(["m", "f", "n"] as GenderChoice[]).map((g) => {
          const label = getArticleForGender(g);
          return (
            <TouchableOpacity
              key={g}
              style={[styles.genderButton, { backgroundColor: getButtonColor(g) }]}
              onPress={() => handleChoice(g)}
              activeOpacity={0.7}
              disabled={answer.selected !== null}
            >
              <Text style={styles.genderButtonText}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback + Next */}
      {answer.selected !== null && (
        <Animated.View style={[styles.feedbackContainer, { opacity: fadeAnim }]}>
          <Text
            style={[
              styles.feedbackText,
              { color: answer.isCorrect ? colors.success : colors.error },
            ]}
          >
            {answer.isCorrect ? "Correct!" : "Wrong!"}
          </Text>
          <Text style={styles.translationText}>
            {correctArticle} {currentNoun.word} = {currentNoun.translation}
          </Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  scoreContainer: {
    position: "absolute",
    top: spacing.xl,
    right: spacing.md,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  nounContainer: {
    marginBottom: spacing.xl,
  },
  nounText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.text,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  genderButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  genderButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  feedbackContainer: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
  translationText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  nextButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xl,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
});
