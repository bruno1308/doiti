import React, { useState, useRef, useEffect, useCallback } from "react";
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
} from "react-native";
import { generateAdjectiveExercise } from "../../lib/exercise-logic";
import { recordAnswer } from "../../lib/stats";
import { AdjectiveTemplate } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

import type { ArticleType, GrammaticalCase } from "../../lib/types";

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
  const [exercise, setExercise] = useState<AdjectiveTemplate>(
    () => generateAdjectiveExercise()
  );
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const handleCheck = useCallback(() => {
    const trimmed = input.trim().toLowerCase();
    const answer = exercise.correctEnding.toLowerCase();
    const result = trimmed === answer;

    setIsCorrect(result);
    setSubmitted(true);
    setTotal((prev) => prev + 1);
    if (result) {
      setCorrect((prev) => prev + 1);
    }
    recordAnswer("adjectives", result);
  }, [input, exercise.correctEnding]);

  const handleNext = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setExercise(generateAdjectiveExercise());
      setInput("");
      setSubmitted(false);
      setIsCorrect(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        inputRef.current?.focus();
      });
    });
  }, [fadeAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Score */}
          <View style={styles.scoreRow}>
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
          <View style={styles.inputArea}>
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
          </View>

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
