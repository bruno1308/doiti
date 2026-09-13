import type { ExerciseMode } from "../lib/types";

export type PracticeMode = Exclude<ExerciseMode, "overall-a1" | "overall-a2">;
export type FocusedMode = Exclude<PracticeMode, "conversation">;
export const practiceModes: { id: FocusedMode; title: string; subtitle: string; accent: string; icon: string }[] = [
  { id: "gender", title: "Der/Die/Das", subtitle: "Noun genders and compounds", accent: "#70aaff", icon: "book-outline" },
  { id: "adjectives", title: "Adjective Endings", subtitle: "Choose endings in real sentences", accent: "#fbbf24", icon: "pencil-outline" },
  { id: "cases", title: "Case Identification", subtitle: "Find the role of each noun phrase", accent: "#5ee0b2", icon: "scan-outline" },
  { id: "possessives", title: "Possessive Pronouns", subtitle: "Mein, dein, sein and their endings", accent: "#c4a5ff", icon: "people-outline" },
  { id: "articles", title: "Articles", subtitle: "Definite and indefinite articles in context", accent: "#fda4af", icon: "text-outline" },
  { id: "pronouns", title: "Personal Pronouns", subtitle: "Ich, mich, mir and more", accent: "#67e8f9", icon: "person-outline" },
  { id: "praeteritum", title: "Präteritum", subtitle: "Simple past forms and sentence puzzles", accent: "#fdba74", icon: "time-outline" },
  { id: "perfekt", title: "Perfekt", subtitle: "Haben or sein, participles and word order", accent: "#a5b4fc", icon: "checkmark-done-outline" },
  { id: "plurals", title: "Plurals", subtitle: "From one to many", accent: "#86efac", icon: "copy-outline" },
  { id: "prepositions", title: "Prepositions", subtitle: "Location, direction and verb partners", accent: "#f9a8d4", icon: "navigate-outline" },
  { id: "modals", title: "Modal Verbs", subtitle: "Können, müssen, dürfen and sentence building", accent: "#fde68a", icon: "chatbubble-outline" },
  { id: "conditionals", title: "Conditionals & Wishes", subtitle: "Wenn, hätte, wäre, würde and polite requests", accent: "#c4a5ff", icon: "sparkles-outline" },
  { id: "connectors", title: "Connecting Sentences", subtitle: "Weil, denn, dann, wenn and verb placement", accent: "#5ee0b2", icon: "git-branch-outline" },
  { id: "separable", title: "Separable Verbs", subtitle: "Prefixes, participles and sentence puzzles", accent: "#fbbf24", icon: "cut-outline" },
  { id: "clauses", title: "Relative Clauses & Questions", subtitle: "Der Mann, der … and ich weiß nicht, ob …", accent: "#67e8f9", icon: "help-circle-outline" },
  { id: "reflexive", title: "Reflexive Verbs", subtitle: "Sich freuen, mich or mir, dich or dir", accent: "#fda4af", icon: "return-down-back-outline" },
  { id: "passive", title: "Passive Voice", subtitle: "Wird gemacht and wurde gebaut", accent: "#a5b4fc", icon: "swap-horizontal-outline" },
  { id: "comparisons", title: "Comparisons & Superlatives", subtitle: "Besser, am besten: connect pairs and build sentences", accent: "#fdba74", icon: "podium-outline" },
  { id: "word-pairs", title: "Word Pairs", subtitle: "Connect opposites and similar meanings", accent: "#86efac", icon: "link-outline" },
];

export const allPracticeModes = [...practiceModes, { id: "conversation" as const, title: "Conversation", subtitle: "10 everyday scenarios · build your replies word by word", accent: "#67e8f9", icon: "chatbubbles-outline" }];

export const modeNames: Record<ExerciseMode, string> = {
  ...Object.fromEntries(allPracticeModes.map(mode => [mode.id, mode.title])),
  "overall-a1": "Overall A1", "overall-a2": "Overall A2",
} as Record<ExerciseMode, string>;
