import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getStats } from "../../lib/stats";
import { AllStats, ExerciseMode } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

const modeNames: Record<ExerciseMode, string> = {
  gender: "Der/Die/Das",
  adjectives: "Adjective Endings",
  cases: "Case Identification",
  possessives: "Possessive Pronouns",
  articles: "Articles",
  pronouns: "Personal Pronouns",
  praeteritum: "Präteritum",
  perfekt: "Perfekt",
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

export default function HistoryScreen() {
  const [stats, setStats] = useState<AllStats | null>(null);

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

  const sessions = stats?.sessions ?? [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {sessions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No sessions yet</Text>
          <Text style={styles.emptySubtext}>
            Complete an exercise to see your history here.
          </Text>
        </View>
      ) : (
        sessions.map((session, index) => {
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
        })
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
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: "center",
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
