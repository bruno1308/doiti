import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
  Platform,
} from "react-native";

const useNativeDriver = Platform.OS !== "web";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { colors, spacing } from "../../constants/theme";
import { getRandomNoun, getArticleForGender } from "../../lib/exercise-logic";
import { recordAnswer, recordSession } from "../../lib/stats";
import CelebrationOverlay, { CelebrationVariant } from "../../components/CelebrationOverlay";
import ExerciseSetup from "../../components/ExerciseSetup";
import ExerciseSummary from "../../components/ExerciseSummary";
import type { Noun, ExercisePhase } from "../../lib/types";

const genderCard = require("../../assets/images/gender-card.webp") as ImageSourcePropType;

type GenderChoice = "m" | "f" | "n";

interface AnswerState {
  selected: GenderChoice | null;
  isCorrect: boolean | null;
}

function getNextNoun(): Noun {
  return getRandomNoun();
}

export default function GenderScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<ExercisePhase>("setup");
  const [targetCount, setTargetCount] = useState(10);
  const [currentNoun, setCurrentNoun] = useState<Noun>(getNextNoun);
  const [answer, setAnswer] = useState<AnswerState>({
    selected: null,
    isCorrect: null,
  });
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationVariant, setCelebrationVariant] = useState<CelebrationVariant>("combo3");
  const [combo, setCombo] = useState(0);

  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const comboRef = useRef(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (answer.selected !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver,
      }).start();
    }
  }, [answer.selected, fadeAnim]);

  const triggerShake = useCallback(() => {
    shakeAnim.setValue(0);
    const anim = Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver }),
    ]);
    shakeAnimRef.current = anim;
    anim.start(() => {
      shakeAnimRef.current = null;
    });
  }, [shakeAnim]);

  const handleStart = useCallback((count: number) => {
    setTargetCount(count);
    setTotal(0);
    setCorrect(0);
    totalRef.current = 0;
    correctRef.current = 0;
    setCurrentNoun(getNextNoun());
    setAnswer({ selected: null, isCorrect: null });
    setShowCelebration(false);
    setCombo(0);
    comboRef.current = 0;
    setPhase("playing");
  }, []);

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
        comboRef.current += 1;
        setCombo(comboRef.current);
        if (comboRef.current === 3) {
          setCelebrationVariant("combo3");
          setShowCelebration(true);
        } else if (comboRef.current >= 5 && comboRef.current % 5 === 0) {
          setCelebrationVariant("combo5");
          setShowCelebration(true);
        }
      } else {
        comboRef.current = 0;
        setCombo(0);
        triggerShake();
      }

      recordAnswer("gender", isCorrect);
    },
    [answer.selected, currentNoun.gender, triggerShake]
  );

  // Record partial session on blur, reset to setup on focus
  useFocusEffect(
    useCallback(() => {
      setPhase("setup");
      return () => {
        if (totalRef.current > 0) {
          recordSession({
            mode: "gender",
            date: new Date().toISOString(),
            total: totalRef.current,
            correct: correctRef.current,
          });
          totalRef.current = 0;
          correctRef.current = 0;
        }
      };
    }, [])
  );

  const handleNext = useCallback(() => {
    // Check if we've reached the target
    if (totalRef.current >= targetCount) {
      recordSession({
        mode: "gender",
        date: new Date().toISOString(),
        total: totalRef.current,
        correct: correctRef.current,
      });
      // Keep correct/total state for summary, reset refs to prevent double-recording
      totalRef.current = 0;
      correctRef.current = 0;
      setPhase("summary");
      return;
    }

    // Stop any in-flight shake animation
    shakeAnimRef.current?.stop();
    shakeAnim.setValue(0);

    fadeAnim.setValue(0);
    setCurrentNoun(getNextNoun());
    setAnswer({ selected: null, isCorrect: null });
    setShowCelebration(false);
  }, [fadeAnim, shakeAnim, targetCount]);

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

  if (phase === "setup") {
    return (
      <ExerciseSetup
        title="Der/Die/Das"
        subtitle="Learn noun genders"
        image={genderCard}
        accentColor={colors.primary}
        onStart={handleStart}
      />
    );
  }

  if (phase === "summary") {
    return (
      <ExerciseSummary
        correct={correct}
        total={total}
        accentColor={colors.primary}
        onDone={() => router.navigate("/")}
      />
    );
  }

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const correctArticle = getArticleForGender(currentNoun.gender);

  return (
    <View style={styles.container}>
      <CelebrationOverlay
        visible={showCelebration}
        variant={celebrationVariant}
        onFinish={() => setShowCelebration(false)}
      />

      {/* Score + Progress */}
      <View style={styles.scoreContainer}>
        <Text style={styles.progressText}>
          {total}/{targetCount}
        </Text>
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
    alignItems: "flex-end",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 2,
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
