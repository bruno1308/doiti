import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  ImageSourcePropType,
} from "react-native";

const useNativeDriver = Platform.OS !== "web";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { selectExercises, getAllNouns, getPluralOptions, getArticleForGender } from "../../lib/exercise-logic";
import { recordAnswer, recordSession, recordQuestionAnswer } from "../../lib/stats";
import { ExercisePhase } from "../../lib/types";
import type { Noun } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";
import CelebrationOverlay, { CelebrationVariant } from "../../components/CelebrationOverlay";
import ExerciseSetup from "../../components/ExerciseSetup";
import ExerciseSummary from "../../components/ExerciseSummary";

const exerciseImage = require("../../assets/images/plurals-card.png") as ImageSourcePropType;

export default function PluralsScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<ExercisePhase>("setup");
  const [targetCount, setTargetCount] = useState(10);
  const [exercise, setExercise] = useState<Noun>(
    () => getAllNouns()[0]
  );
  const [options, setOptions] = useState<string[]>(() =>
    getPluralOptions(exercise.plural)
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationVariant, setCelebrationVariant] = useState<CelebrationVariant>("combo3");
  const [combo, setCombo] = useState(0);

  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const comboRef = useRef(0);

  const exercisesRef = useRef<Noun[]>([]);
  const questionIdsRef = useRef<string[]>([]);
  const exerciseIndexRef = useRef(0);

  useFocusEffect(
    useCallback(() => {
      setPhase("setup");
      return () => {
        if (totalRef.current > 0) {
          recordSession({
            mode: "plurals",
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

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnimRef = useRef<Animated.CompositeAnimation | null>(null);

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

  const handleStart = useCallback(async (count: number) => {
    setTargetCount(count);
    setTotal(0);
    setCorrect(0);
    totalRef.current = 0;
    correctRef.current = 0;
    const { exercises, questionIds } = await selectExercises("plurals", getAllNouns(), count);
    exercisesRef.current = exercises;
    questionIdsRef.current = questionIds;
    exerciseIndexRef.current = 0;
    setExercise(exercises[0]);
    setOptions(getPluralOptions(exercises[0].plural));
    setSelected(null);
    setIsCorrect(null);
    setShowCelebration(false);
    setCombo(0);
    comboRef.current = 0;
    setPhase("playing");
  }, []);

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const handleSelect = useCallback((option: string) => {
    if (selected !== null) return;

    const result = option === exercise.plural;

    setSelected(option);
    setIsCorrect(result);
    setTotal((prev) => {
      totalRef.current = prev + 1;
      return prev + 1;
    });
    if (result) {
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
    recordAnswer("plurals", result);
    recordQuestionAnswer(questionIdsRef.current[exerciseIndexRef.current], result);
  }, [selected, exercise.plural, triggerShake]);

  const handleNext = useCallback(() => {
    if (totalRef.current >= targetCount) {
      recordSession({
        mode: "plurals",
        date: new Date().toISOString(),
        total: totalRef.current,
        correct: correctRef.current,
      });
      totalRef.current = 0;
      correctRef.current = 0;
      setPhase("summary");
      return;
    }

    shakeAnimRef.current?.stop();
    shakeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver,
    }).start(() => {
      const nextIndex = exerciseIndexRef.current + 1;
      exerciseIndexRef.current = nextIndex;
      const ex = exercisesRef.current[nextIndex];
      setExercise(ex);
      setOptions(getPluralOptions(ex.plural));
      setSelected(null);
      setIsCorrect(null);
      setShowCelebration(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver,
      }).start();
    });
  }, [fadeAnim, shakeAnim, targetCount]);

  if (phase === "setup") {
    return (
      <ExerciseSetup
        title="Plurals"
        subtitle="Practice German noun plural forms"
        image={exerciseImage}
        accentColor={colors.plurals}
        onStart={handleStart}
      />
    );
  }

  if (phase === "summary") {
    return (
      <ExerciseSummary
        correct={correct}
        total={total}
        accentColor={colors.plurals}
        onDone={() => router.navigate("/")}
      />
    );
  }

  const getOptionStyle = (option: string) => {
    if (selected === null) return styles.optionDefault;
    if (option === selected && isCorrect) return styles.optionCorrect;
    if (option === selected && !isCorrect) return styles.optionWrong;
    if (option === exercise.plural) return styles.optionReveal;
    return styles.optionDimmed;
  };

  const getOptionTextStyle = (option: string) => {
    if (selected === null) return styles.optionTextDefault;
    if (option === selected && isCorrect) return styles.optionTextCorrect;
    if (option === selected && !isCorrect) return styles.optionTextWrong;
    if (option === exercise.plural) return styles.optionTextReveal;
    return styles.optionTextDimmed;
  };

  const article = getArticleForGender(exercise.gender);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <CelebrationOverlay visible={showCelebration} variant={celebrationVariant} onFinish={() => setShowCelebration(false)} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Score + Progress */}
        <View style={styles.scoreRow}>
          <Text style={styles.progressText}>
            {total}/{targetCount}
          </Text>
          <Text style={styles.scoreText}>
            {correct}/{total}
            {total > 0 ? ` (${percentage}%)` : ""}
          </Text>
        </View>

        {/* Noun display */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Singular: {article} {exercise.word}
            </Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.sentenceCard}>
          <Text style={styles.sentenceText}>
            What is the plural of{" "}
            <Text style={styles.nounPhrase}>{exercise.word}</Text>?
          </Text>
          <Text style={styles.translationHint}>{exercise.translation}</Text>
        </View>

        {/* Multiple choice options */}
        <Animated.View
          style={[styles.optionsGrid, { transform: [{ translateX: shakeAnim }] }]}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, getOptionStyle(option)]}
              onPress={() => handleSelect(option)}
              disabled={selected !== null}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, getOptionTextStyle(option)]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Feedback */}
        {selected !== null && (
          <View style={styles.feedbackRow}>
            {isCorrect ? (
              <Text style={styles.correctText}>Richtig!</Text>
            ) : (
              <Text style={styles.wrongText}>
                Richtig: <Text style={styles.endingHighlight}>die {exercise.plural}</Text>
              </Text>
            )}
          </View>
        )}

        {/* Next button */}
        {selected !== null && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={handleNext}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  scoreRow: {
    alignSelf: "flex-end",
    marginBottom: spacing.md,
    alignItems: "flex-end",
  },
  progressText: {
    color: colors.plurals,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  scoreText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  badge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  sentenceCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    width: "100%",
    marginBottom: spacing.xl,
  },
  sentenceText: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
  translationHint: {
    color: colors.textMuted,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: spacing.sm,
  },
  nounPhrase: {
    color: colors.plurals,
    fontWeight: "700",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
    width: "100%",
  },
  optionButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: "45%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "700",
  },
  optionDefault: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceLight,
  },
  optionCorrect: {
    backgroundColor: "#16a34a22",
    borderColor: colors.success,
  },
  optionWrong: {
    backgroundColor: "#ef444422",
    borderColor: colors.error,
  },
  optionReveal: {
    backgroundColor: "#16a34a22",
    borderColor: colors.success,
  },
  optionDimmed: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceLight,
    opacity: 0.4,
  },
  optionTextDefault: {
    color: colors.text,
  },
  optionTextCorrect: {
    color: colors.success,
  },
  optionTextWrong: {
    color: colors.error,
  },
  optionTextReveal: {
    color: colors.success,
  },
  optionTextDimmed: {
    color: colors.textMuted,
  },
  feedbackRow: {
    marginBottom: spacing.lg,
    minHeight: 30,
    alignItems: "center",
  },
  correctText: {
    color: colors.success,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  wrongText: {
    color: colors.error,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  endingHighlight: {
    color: colors.plurals,
    fontWeight: "900",
    textDecorationLine: "underline",
  },
  buttonRow: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: colors.success,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
});
