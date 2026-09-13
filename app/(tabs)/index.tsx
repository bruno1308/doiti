import { Ionicons } from "@expo/vector-icons";
import { allPracticeModes as practiceModes, type PracticeMode } from "../../data/practice-modes";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getStats, emptyStats } from "../../lib/stats";
import { AllStats, ModeStats } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

const owlMascot = require("../../assets/images/owl-mascot.png") as ImageSourcePropType;
const genderCard = require("../../assets/images/gender-card.webp") as ImageSourcePropType;
const adjectivesCard = require("../../assets/images/adjectives-card.webp") as ImageSourcePropType;
const casesCard = require("../../assets/images/cases-card.webp") as ImageSourcePropType;
const possessivesCard = require("../../assets/images/possessives-card.png") as ImageSourcePropType;
const articlesCard = require("../../assets/images/articles-card.png") as ImageSourcePropType;
const pronounsCard = require("../../assets/images/pronouns-card.png") as ImageSourcePropType;
const praeteritumCard = require("../../assets/images/praeteritum-card.png") as ImageSourcePropType;
const perfektCard = require("../../assets/images/perfekt-card.png") as ImageSourcePropType;
const pluralsCard = require("../../assets/images/plurals-card.png") as ImageSourcePropType;
const prepositionsCard = require("../../assets/images/prepositions-card.png") as ImageSourcePropType;
const modalsCard = require("../../assets/images/modals-card.png") as ImageSourcePropType;

const modeImages: Partial<Record<PracticeMode, ImageSourcePropType>> = {
  gender: genderCard, adjectives: adjectivesCard, cases: casesCard, possessives: possessivesCard,
  articles: articlesCard, pronouns: pronounsCard, praeteritum: praeteritumCard, perfekt: perfektCard,
  plurals: pluralsCard, prepositions: prepositionsCard, modals: modalsCard,
};
const categories: Record<string, PracticeMode[]> = {
  All: [],
  "Nouns & cases": ["gender", "adjectives", "cases", "possessives", "articles", "pronouns", "plurals", "prepositions"],
  Verbs: ["praeteritum", "perfekt", "modals", "separable", "reflexive", "passive", "conditionals"],
  Sentences: ["connectors", "clauses", "conditionals", "separable", "passive", "conversation"],
  "Word pairs": ["comparisons", "word-pairs"],
};

interface ModeCardProps {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  accentColor: string;
  modeStats: ModeStats;
  onPress: () => void;
}

function ModeCard({
  title,
  subtitle,
  image,
  icon,
  accentColor,
  modeStats,
  onPress,
}: ModeCardProps) {
  const practiced = modeStats.totalAttempted;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.card, { borderLeftColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        {image ? <Image source={image} style={styles.cardImage} /> : <View style={[styles.cardImage, { alignItems: "center", justifyContent: "center", backgroundColor: colors.background }]}><Ionicons name={icon ?? "extension-puzzle-outline"} size={30} color={accentColor} /></View>}
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

export default function HomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<AllStats>(emptyStats);
  const [category, setCategory] = useState("All");

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
        <Text style={styles.sectionTitle}>Overall Practice</Text>
        <ModeCard
          title="Overall A1"
          subtitle="Everyday basics · gaps, verbs & sentence building"
          image={owlMascot}
          accentColor={colors.success}
          modeStats={stats["overall-a1"]}
          onPress={() => router.push("/overall-a1")}
        />
        <ModeCard
          title="Overall A2"
          subtitle="Build on the basics · past tense & connected ideas"
          image={owlMascot}
          accentColor={colors.possessive}
          modeStats={stats["overall-a2"]}
          onPress={() => router.push("/overall-a2")}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Modes</Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {Object.keys(categories).map(name => <Pressable key={name} accessibilityRole="button" accessibilityState={{ selected: category === name }} onPress={() => setCategory(name)}
            style={{ padding: 12, borderRadius: 20, borderWidth: 1, borderColor: category === name ? colors.success : colors.border, backgroundColor: colors.surface }}><Text style={{ color: colors.text }}>{name}</Text></Pressable>)}
        </View>
        {practiceModes.filter(mode => category === "All" || categories[category].includes(mode.id)).map(mode => <ModeCard
          key={mode.id} title={mode.title} subtitle={mode.subtitle} image={modeImages[mode.id]}
          icon={mode.icon as React.ComponentProps<typeof Ionicons>["name"]} accentColor={mode.accent}
          modeStats={stats[mode.id]} onPress={() => router.push(`/${mode.id}`)}
        />)}

      </View>

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
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  practicedText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
