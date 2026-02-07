import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getShuffledCaseSentences } from "../../lib/exercise-logic";
import { recordAnswer, recordSession } from "../../lib/stats";
import { CaseSentence, GrammaticalCase } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";
import CelebrationOverlay from "../../components/CelebrationOverlay";

const CASES: GrammaticalCase[] = ["nominativ", "akkusativ", "dativ", "genitiv"];

const CASE_LABELS: Record<GrammaticalCase, string> = {
  nominativ: "NOM",
  akkusativ: "AKK",
  dativ: "DAT",
  genitiv: "GEN",
};

const CASE_FULL_LABELS: Record<GrammaticalCase, string> = {
  nominativ: "Nominativ",
  akkusativ: "Akkusativ",
  dativ: "Dativ",
  genitiv: "Genitiv",
};

const CASE_COLORS: Record<GrammaticalCase, string> = {
  nominativ: "#3b82f6",
  akkusativ: "#ef4444",
  dativ: "#22c55e",
  genitiv: "#f59e0b",
};

export default function CasesScreen() {
  const [sentences] = useState<CaseSentence[]>(() => getShuffledCaseSentences());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, GrammaticalCase>>({});
  const [checked, setChecked] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const totalRef = useRef(0);
  const correctRef = useRef(0);

  // Record session only when user actually leaves this tab
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (totalRef.current > 0) {
          recordSession({
            mode: "cases",
            date: new Date().toISOString(),
            total: totalRef.current,
            correct: correctRef.current,
          });
        }
      };
    }, [])
  );

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const sentence = useMemo(
    () => sentences.length > 0 ? sentences[currentIndex % sentences.length] : null,
    [sentences, currentIndex]
  );

  const allSelected = useMemo(
    () => sentence ? sentence.nounPhrases.every((_, i) => selections[i] !== undefined) : false,
    [sentence, selections]
  );

  const accuracy = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);

  const handleSelect = useCallback(
    (phraseIndex: number, caseValue: GrammaticalCase) => {
      if (checked) return;
      setSelections((prev) => ({ ...prev, [phraseIndex]: caseValue }));
    },
    [checked]
  );

  const handleCheck = useCallback(async () => {
    if (!sentence || !allSelected || checked) return;
    setChecked(true);

    let correctCount = 0;
    for (let i = 0; i < sentence.nounPhrases.length; i++) {
      const isCorrect = selections[i] === sentence.nounPhrases[i].case;
      if (isCorrect) correctCount++;
      await recordAnswer("cases", isCorrect);
    }

    setTotalAnswered((prev) => {
      totalRef.current = prev + sentence.nounPhrases.length;
      return prev + sentence.nounPhrases.length;
    });
    setTotalCorrect((prev) => {
      correctRef.current = prev + correctCount;
      return prev + correctCount;
    });

    // Show celebration if all correct
    if (correctCount === sentence.nounPhrases.length) {
      setShowCelebration(true);
    }
  }, [allSelected, checked, sentence, selections]);

  const handleNext = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelections({});
      setChecked(false);
      setShowCelebration(false);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  if (!sentence) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 40 }}>Loading...</Text>
      </View>
    );
  }

  const renderPhraseRow = (phraseIndex: number) => {
    const phrase = sentence.nounPhrases[phraseIndex];
    const selected = selections[phraseIndex];
    const isCorrect = checked ? selected === phrase.case : undefined;

    return (
      <View key={phraseIndex} style={styles.phraseBlock}>
        <View style={styles.phraseHeader}>
          <Text style={styles.phraseText}>"{phrase.text}"</Text>
          {checked && !isCorrect && (
            <Text style={[styles.correctionLabel, { color: CASE_COLORS[phrase.case] }]}>
              = {CASE_FULL_LABELS[phrase.case]}
            </Text>
          )}
        </View>
        <View style={styles.buttonRow}>
          {CASES.map((c) => {
            const isSelected = selected === c;
            const isAnswer = phrase.case === c;

            let bgColor = colors.surfaceLight;
            let textColor = colors.text;
            let borderColor = "transparent";

            if (!checked && isSelected) {
              bgColor = CASE_COLORS[c];
              textColor = "#ffffff";
            }

            if (checked) {
              if (isAnswer) {
                bgColor = colors.success;
                textColor = "#ffffff";
              } else if (isSelected && !isAnswer) {
                bgColor = colors.error;
                textColor = "#ffffff";
              } else {
                bgColor = colors.surfaceLight;
                textColor = colors.textMuted;
              }
            }

            return (
              <Pressable
                key={c}
                onPress={() => handleSelect(phraseIndex, c)}
                style={[
                  styles.caseButton,
                  { backgroundColor: bgColor, borderColor },
                ]}
                disabled={checked}
              >
                <Text style={[styles.caseButtonText, { color: textColor }]}>
                  {CASE_LABELS[c]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CelebrationOverlay visible={showCelebration} onFinish={() => setShowCelebration(false)} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Score header */}
        <Text style={styles.scoreText}>
          {totalCorrect}/{totalAnswered} ({accuracy}%)
        </Text>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Sentence card */}
          <View style={styles.sentenceCard}>
            <Text style={styles.sentenceText}>{sentence.sentence}</Text>
            {checked && (
              <Text style={styles.translationText}>{sentence.translation}</Text>
            )}
          </View>

          {/* Instruction */}
          <Text style={styles.instructionText}>
            {checked
              ? "Results:"
              : "Identify the case of each noun phrase:"}
          </Text>

          {/* Noun phrase rows */}
          {sentence.nounPhrases.map((_, i) => renderPhraseRow(i))}
        </Animated.View>

        {/* Action button */}
        {!checked ? (
          <Pressable
            onPress={handleCheck}
            style={[
              styles.actionButton,
              {
                backgroundColor: allSelected
                  ? colors.primary
                  : colors.surfaceLight,
              },
            ]}
            disabled={!allSelected}
          >
            <Text
              style={[
                styles.actionButtonText,
                { color: allSelected ? "#ffffff" : colors.textMuted },
              ]}
            >
              Check
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleNext} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Next</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  scoreText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  sentenceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sentenceText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 32,
  },
  translationText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: spacing.sm,
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  phraseBlock: {
    marginBottom: spacing.lg,
  },
  phraseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  phraseText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  correctionLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  caseButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
  },
  caseButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: spacing.md,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
