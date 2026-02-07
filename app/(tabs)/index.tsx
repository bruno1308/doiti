import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getStats } from "../../lib/stats";
import { AllStats, ExerciseMode, ModeStats } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

const owlMascot = require("../../assets/images/owl-mascot.png") as ImageSourcePropType;
const genderCard = require("../../assets/images/gender-card.webp") as ImageSourcePropType;
const adjectivesCard = require("../../assets/images/adjectives-card.webp") as ImageSourcePropType;
const casesCard = require("../../assets/images/cases-card.webp") as ImageSourcePropType;
const possessivesCard = require("../../assets/images/possessives-card.png") as ImageSourcePropType;
const articlesCard = require("../../assets/images/articles-card.png") as ImageSourcePropType;

interface ModeCardProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  accentColor: string;
  modeStats: ModeStats;
  onPress: () => void;
}

function ModeCard({
  title,
  subtitle,
  image,
  accentColor,
  modeStats,
  onPress,
}: ModeCardProps) {
  const practiced = modeStats.totalAttempted;

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{title}</Text>
            {practiced > 0 && (
              <Text style={[styles.practicedText, { color: accentColor }]}>
                {practiced} practiced
              </Text>
            )}
          </View>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const modeNames: Record<ExerciseMode, string> = {
  gender: "Der/Die/Das",
  adjectives: "Adjective Endings",
  cases: "Case Identification",
  possessives: "Possessive Pronouns",
  articles: "Articles",
};

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export default function HomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<AllStats>({
    gender: { totalAttempted: 0, totalCorrect: 0 },
    adjectives: { totalAttempted: 0, totalCorrect: 0 },
    cases: { totalAttempted: 0, totalCorrect: 0 },
    possessives: { totalAttempted: 0, totalCorrect: 0 },
    articles: { totalAttempted: 0, totalCorrect: 0 },
    sessions: [],
  });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getStats().then((data) => {
        if (active) setStats(data);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const recentSessions = stats.sessions.slice(0, 5);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header with mascot */}
      <View style={styles.header}>
        <Image source={owlMascot} style={styles.mascot} />
        <Text style={styles.title}>Doiti</Text>
        <Text style={styles.subtitle}>German Grammar Practice</Text>
      </View>

      {/* Mode Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Modes</Text>

        <ModeCard
          title="Der/Die/Das"
          subtitle="Learn noun genders"
          image={genderCard}
          accentColor={colors.primary}
          modeStats={stats.gender}
          onPress={() => router.push("/gender")}
        />

        <ModeCard
          title="Adjective Endings"
          subtitle="Master adjective declension"
          image={adjectivesCard}
          accentColor={colors.warning}
          modeStats={stats.adjectives}
          onPress={() => router.push("/adjectives")}
        />

        <ModeCard
          title="Case Identification"
          subtitle="Identify grammatical cases"
          image={casesCard}
          accentColor={colors.success}
          modeStats={stats.cases}
          onPress={() => router.push("/cases")}
        />

        <ModeCard
          title="Possessive Pronouns"
          subtitle="Conjugate mein, dein, sein..."
          image={possessivesCard}
          accentColor={colors.possessive}
          modeStats={stats.possessives}
          onPress={() => router.push("/possessives")}
        />

        <ModeCard
          title="Articles"
          subtitle="Practice definite & indefinite articles"
          image={articlesCard}
          accentColor={colors.articles}
          modeStats={stats.articles}
          onPress={() => router.push("/articles")}
        />
      </View>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {recentSessions.map((session, index) => {
            const pct =
              session.total > 0
                ? Math.round((session.correct / session.total) * 100)
                : 0;
            return (
              <View key={index} style={styles.sessionRow}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionMode}>
                    {modeNames[session.mode] || session.mode}
                  </Text>
                  <Text style={styles.sessionDate}>
                    {formatDate(session.date)}
                  </Text>
                </View>
                <View style={styles.sessionScore}>
                  <Text style={styles.sessionScoreText}>
                    {session.correct}/{session.total}
                  </Text>
                  <Text
                    style={[
                      styles.sessionPct,
                      { color: pct >= 70 ? colors.success : colors.error },
                    ]}
                  >
                    {pct}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  mascot: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: spacing.sm,
    borderRadius: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    resizeMode: "cover",
  },
  cardTitleContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  practicedText: {
    fontSize: 13,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sessionRow: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionInfo: {
    flex: 1,
  },
  sessionMode: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  sessionDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  sessionScore: {
    alignItems: "flex-end",
  },
  sessionScoreText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  sessionPct: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },
});
