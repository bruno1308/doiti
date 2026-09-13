import a1 from "./overall-a1";
import a2 from "./overall-a2";
import { legacyPractice, type LegacyMode } from "./legacy-practice";
import { comparisonMatches, wordMatches } from "./matching-exercises";
import { connectorPractice, connectorPuzzles } from "./connector-practice";
import { practiceModes, type FocusedMode } from "./practice-modes";
import type { OverallExercise, PracticeExercise } from "../lib/overall-types";

const bank = [...a1, ...a2];
const topics: Record<FocusedMode, string[]> = {
  gender: ["Noun gender and compounds"],
  adjectives: ["Adjective endings", "Adjectives in three cases", "Adjectives"],
  cases: [],
  possessives: ["Possessives", "Possessive articles", "Possessive and indefinite pronouns"],
  articles: ["Articles", "Articles in context", "Noun cases", "Demonstrative and question articles"],
  pronouns: ["Personal pronouns", "Question pronouns", "Someone, nothing, everyone", "Impersonal es"],
  praeteritum: ["Präteritum", "Past modal verbs", "Present and past forms"],
  perfekt: ["Perfekt", "Perfekt with prefixes", "Perfekt word order"],
  plurals: ["Plurals", "Plural nouns", "Dative plural"],
  prepositions: ["Prepositions", "Dative", "Dative and accusative prepositions", "Two-way prepositions", "Verbs with prepositions", "Questions with prepositions", "Wo(r)- questions", "Location and direction", "Position and movement", "Describing a room", "Directions"],
  modals: ["Modal verbs", "Past modal verbs"],
  conditionals: ["Polite requests and wishes", "Polite requests"],
  connectors: ["Connecting main clauses", "Connecting ideas", "Subordinate clauses", "Dass clauses", "Correcting a statement"],
  separable: ["Separable verbs", "Perfekt with prefixes"],
  clauses: ["Relative clauses", "Relative pronouns", "Indirect questions", "Infinitive with zu", "Infinitives with zu"],
  reflexive: ["Reflexive verbs", "Reflexive pronouns", "Reflexive pronouns: accusative or dative"],
  passive: ["Passive voice"],
  comparisons: ["Comparison", "Comparisons and superlatives"],
  "word-pairs": [],
};
function include(mode: FocusedMode, e: OverallExercise) {
  if (topics[mode].includes(e.topic)) return true;
  if (mode === "cases") return e.kind === "choice" && ["Nominativ", "Akkusativ", "Dativ", "Genitiv"].includes(e.answer);
  if (mode === "gender") return e.kind === "choice" && e.optionGroup === "article:nom";
  return false;
}
export interface PracticeConfig {
  mode: FocusedMode;
  title: string;
  subtitle: string;
  accent: string;
  pool: PracticeExercise[];
}
export const focusedPractice = Object.fromEntries(practiceModes.map(mode => {
  const extra: PracticeExercise[] = mode.id === "comparisons" ? comparisonMatches : mode.id === "word-pairs" ? wordMatches
    : mode.id === "connectors" ? [...connectorPractice, ...connectorPuzzles]
    : mode.id === "conditionals" ? connectorPuzzles.filter(e => e.topic === "Conditional sentences") : [];
  return [mode.id, { mode: mode.id, title: mode.title, subtitle: mode.subtitle, accent: mode.accent,
    pool: [...(legacyPractice[mode.id as LegacyMode] ?? []), ...bank.filter(e => include(mode.id, e)), ...extra] }];
})) as Record<FocusedMode, PracticeConfig>;
