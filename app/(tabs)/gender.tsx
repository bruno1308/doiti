import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { colors, spacing } from "../../constants/theme";
import { getRandomNoun, getArticleForGender } from "../../lib/exercise-logic";
import { recordAnswer, recordSession } from "../../lib/stats";
import CelebrationOverlay from "../../components/CelebrationOverlay";
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
  const [showCelebration, setShowCelebration] = useState(false);

  const totalRef = useRef(0);
  const correctRef = useRef(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (answer.selected !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [answer.selected, fadeAnim]);

  const triggerShake = useCallback(() => {
    shakeAnim.setValue(0);
    const anim = Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]);
    shakeAnimRef.current = anim;
    anim.start(() => {
      shakeAnimRef.current = null;
    });
  }, [shakeAnim]);

  const handleChoice = useCallback(
    (choice: GenderChoice) => {
      if (answer.selected !== null) return;

      const isCorrect = choice === currentNoun.gender;
      setAnswer({ selected: choice, isCorrect });
      setTotal((prev) => {
        totalRef.current = prev + 1;
        return prev + 1;
      });
      if (isCorrect) {
        setCorrect((prev) => {
          correctRef.current = prev + 1;
          return prev + 1;
        });
        setShowCelebration(true);
      } else {
        triggerShake();
      }

      recordAnswer("gender", isCorrect);
    },
    [answer.selected, currentNoun.gender, triggerShake]
  );

  // Record session only when user actually leaves this tab
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (totalRef.current > 0) {
          recordSession({
            mode: "gender",
            date: new Date().toISOString(),
            total: totalRef.current,
            correct: correctRef.current,
          });
        }
      };
    }, [])
  );

  const handleNext = useCallback(() => {
    // Stop any in-flight shake animation
    shakeAnimRef.current?.stop();
    shakeAnim.setValue(0);

    fadeAnim.setValue(0);
    setCurrentNoun(getNextNoun());
    setAnswer({ selected: null, isCorrect: null });
    setShowCelebration(false);
  }, [fadeAnim, shakeAnim]);

  const getButtonColor = (gender: GenderChoice): string => {
    const defaultColors: Record<GenderChoice, string> = {
      m: colors.masculine,
      f: colors.feminine,
      n: colors.neuter,
    };

    if (answer.selected === null) {
      return defaultColors[gender];
    }

    if (gender === currentNoun.gender) {
      return colors.success;
    }

    if (gender === answer.selected) {
      return colors.error;
    }

    return defaultColors[gender] + "44";
  };

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const correctArticle = getArticleForGender(currentNoun.gender);

  return (
    <View style={styles.container}>
      <CelebrationOverlay
        visible={showCelebration}
        onFinish={() => setShowCelebration(false)}
      />

      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {correct}/{total} ({percentage}%)
        </Text>
      </View>

      {/* Noun display with shake on wrong */}
      <Animated.View
        style={[
          styles.nounContainer,
          { transform: [{ translateX: shakeAnim }] },
        ]}
      >
        <Text style={styles.nounText}>{currentNoun.word}</Text>
      </Animated.View>

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
