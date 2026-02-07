import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  ImageSourcePropType,
} from "react-native";

const useNativeDriver = Platform.OS !== "web";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { generateAdjectiveExercise } from "../../lib/exercise-logic";
import { recordAnswer, recordSession } from "../../lib/stats";
import { AdjectiveTemplate, ExercisePhase } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";
import CelebrationOverlay from "../../components/CelebrationOverlay";
import ExerciseSetup from "../../components/ExerciseSetup";
import ExerciseSummary from "../../components/ExerciseSummary";

import type { ArticleType, GrammaticalCase } from "../../lib/types";

const adjectivesCard = require("../../assets/images/adjectives-card.webp") as ImageSourcePropType;

const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  definite: "Definite article",
  indefinite: "Indefinite article",
  none: "No article",
};

const CASE_LABELS: Record<GrammaticalCase, string> = {
  nominativ: "Nominativ",
  akkusativ: "Akkusativ",
  dativ: "Dativ",
  genitiv: "Genitiv",
};

export default function AdjectivesScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<ExercisePhase>("setup");
  const [targetCount, setTargetCount] = useState(10);
  const [exercise, setExercise] = useState<AdjectiveTemplate>(
    () => generateAdjectiveExercise()
  );
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const totalRef = useRef(0);
  const correctRef = useRef(0);

  // Record partial session on blur, reset to setup on focus
  useFocusEffect(
    useCallback(() => {
      setPhase("setup");
      return () => {
        if (totalRef.current > 0) {
          recordSession({
            mode: "adjectives",
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
  const inputRef = useRef<TextInput>(null);

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
    setExercise(generateAdjectiveExercise());
    setInput("");
    setSubmitted(false);
    setIsCorrect(false);
    setShowCelebration(false);
    setPhase("playing");
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const handleCheck = useCallback(() => {
    const trimmed = input.trim().toLowerCase();
    const answer = exercise.correctEnding.toLowerCase();
    const result = trimmed === answer;

    setIsCorrect(result);
    setSubmitted(true);
    setTotal((prev) => {
      totalRef.current = prev + 1;
      return prev + 1;
    });
    if (result) {
      setCorrect((prev) => {
        correctRef.current = prev + 1;
        return prev + 1;
      });
      setShowCelebration(true);
    } else {
      triggerShake();
    }
    recordAnswer("adjectives", result);
  }, [input, exercise.correctEnding, triggerShake]);

  const handleNext = useCallback(() => {
    // Check if we've reached the target
    if (totalRef.current >= targetCount) {
      recordSession({
        mode: "adjectives",
        date: new Date().toISOString(),
        total: totalRef.current,
        correct: correctRef.current,
      });
      totalRef.current = 0;
      correctRef.current = 0;
      setPhase("summary");
      return;
    }

    // Stop any in-flight shake animation
    shakeAnimRef.current?.stop();
    shakeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver,
    }).start(() => {
      setExercise(generateAdjectiveExercise());
      setInput("");
      setSubmitted(false);
      setIsCorrect(false);
      setShowCelebration(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver,
      }).start(() => {
        inputRef.current?.focus();
      });
    });
  }, [fadeAnim, shakeAnim, targetCount]);

  if (phase === "setup") {
    return (
      <ExerciseSetup
        title="Adjective Endings"
        subtitle="Master adjective declension"
        image={adjectivesCard}
        accentColor={colors.warning}
        onStart={handleStart}
      />
    );
  }

  if (phase === "summary") {
    return (
      <ExerciseSummary
        correct={correct}
        total={total}
        accentColor={colors.warning}
        onDone={() => router.navigate("/")}
      />
    );
  }

  const inputBorderColor = submitted
    ? isCorrect
      ? colors.success
      : colors.error
    : colors.primary;

  // Build the sentence display
  const articlePart = exercise.article ? exercise.article + " " : "";
  const nounPhrase = `${articlePart}${exercise.adjective}___  ${exercise.noun}`;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <CelebrationOverlay visible={showCelebration} onFinish={() => setShowCelebration(false)} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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

          {/* Info badges */}
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {ARTICLE_TYPE_LABELS[exercise.articleType]}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {CASE_LABELS[exercise.case]}
              </Text>
            </View>
          </View>

          {/* Sentence display */}
          <View style={styles.sentenceCard}>
            <Text style={styles.sentenceText}>
              {exercise.sentenceBefore ? exercise.sentenceBefore + " " : ""}
              <Text style={styles.nounPhrase}>{nounPhrase}</Text>
              {exercise.sentenceAfter ? " " + exercise.sentenceAfter : ""}
            </Text>
          </View>

          {/* Hint text */}
          <View style={styles.hintRow}>
            <Text style={styles.hintText}>
              <Text style={styles.hintWord}>{exercise.adjective}</Text>
              <Text style={styles.hintTranslation}>
                {" "}
                ({exercise.adjectiveTranslation})
              </Text>
              {"  +  "}
              <Text style={styles.hintWord}>{exercise.noun}</Text>
              <Text style={styles.hintTranslation}>
                {" "}
                ({exercise.nounTranslation})
              </Text>
            </Text>
          </View>

          {/* Input area */}
          <Animated.View
            style={[styles.inputArea, { transform: [{ translateX: shakeAnim }] }]}
          >
            <Text style={styles.adjectiveBase}>{exercise.adjective}</Text>
            <TextInput
              ref={inputRef}
              style={[styles.textInput, { borderColor: inputBorderColor }]}
              value={input}
              onChangeText={setInput}
              placeholder="..."
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!submitted}
              onSubmitEditing={!submitted && input.trim() ? handleCheck : undefined}
            />
          </Animated.View>

          {/* Feedback */}
          {submitted && (
            <View style={styles.feedbackRow}>
              {isCorrect ? (
                <Text style={styles.correctText}>Correct!</Text>
              ) : (
                <Text style={styles.wrongText}>
                  Correct: {exercise.adjective}
                  <Text style={styles.endingHighlight}>
                    {exercise.correctEnding}
                  </Text>
                </Text>
              )}
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {!submitted ? (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.checkButton,
                  !input.trim() && styles.buttonDisabled,
                ]}
                onPress={handleCheck}
                disabled={!input.trim()}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Check</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.nextButton]}
                onPress={handleNext}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  // Score
  scoreRow: {
    alignSelf: "flex-end",
    marginBottom: spacing.md,
    alignItems: "flex-end",
  },
  progressText: {
    color: colors.warning,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  scoreText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },

  // Badges
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

  // Sentence
  sentenceCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    width: "100%",
    marginBottom: spacing.lg,
  },
  sentenceText: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
  },
  nounPhrase: {
    color: colors.warning,
    fontWeight: "700",
  },

  // Hints
  hintRow: {
    marginBottom: spacing.xl,
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
  },
  hintWord: {
    color: colors.text,
    fontWeight: "600",
  },
  hintTranslation: {
    color: colors.textMuted,
    fontStyle: "italic",
  },

  // Input
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  adjectiveBase: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
    marginRight: 2,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
    minWidth: 80,
    textAlign: "center",
    backgroundColor: colors.surface,
  },

  // Feedback
  feedbackRow: {
    marginBottom: spacing.lg,
    minHeight: 30,
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
    color: colors.warning,
    fontWeight: "900",
    textDecorationLine: "underline",
  },

  // Buttons
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
  checkButton: {
    backgroundColor: colors.primary,
  },
  nextButton: {
    backgroundColor: colors.success,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
});
