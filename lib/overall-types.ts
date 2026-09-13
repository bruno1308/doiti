export type OverallLevel = "A1" | "A2";
export type OverallKind = "choice" | "fill" | "conjugation" | "order";
export type BookSource = { pdfPage: number; printedPage: number; exercise: string; item: string };

export interface OverallBase {
  /** Stable identifier: independent of array position and session filters. */
  id: string;
  /** Existing specialized questions retain their original progress keys. */
  progressKey?: string;
  level: OverallLevel;
  topic: string;
  instruction: string;
  translation?: string;
  explanation: string;
  /** Topic reference in A-Grammatik, not a claim of verbatim transcription. */
  bookSection: string;
  source?: BookSource;
  additionalSources?: BookSource[];
}

export type OverallExercise = OverallBase & (
  | { kind: "choice"; sentence: string; options: string[]; answer: string; optionGroup?: string }
  | { kind: "fill" | "conjugation"; sentence: string; blanks: { answers: string[]; hint: string; options: string[]; optionGroup?: string }[] }
  | { kind: "order"; chunks: string[]; orders: number[][] }
);

export type MatchExercise = OverallBase & {
  kind: "match";
  leftLabel: string;
  rightLabel: string;
  pairs: { left: string; right: string }[];
};
export type PracticeExercise = OverallExercise | MatchExercise;
export type PracticeKind = OverallKind | "match";
