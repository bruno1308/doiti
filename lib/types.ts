export interface Noun {
  word: string;
  gender: "m" | "f" | "n";
  plural: string;
  translation: string;
}

export type ArticleType = "definite" | "indefinite" | "none";
export type GrammaticalCase = "nominativ" | "akkusativ" | "dativ" | "genitiv";
export type Gender = "m" | "f" | "n";

export interface AdjectiveTemplate {
  id: number;
  articleType: ArticleType;
  case: GrammaticalCase;
  gender: Gender;
  article: string;
  noun: string;
  nounTranslation: string;
  adjective: string;
  adjectiveTranslation: string;
  correctEnding: string;
  sentenceBefore: string;
  sentenceAfter: string;
}

export interface NounPhrase {
  text: string;
  case: GrammaticalCase;
}

export interface CaseSentence {
  id: number;
  sentence: string;
  nounPhrases: NounPhrase[];
  translation: string;
}

export type ExerciseMode = "gender" | "adjectives" | "cases";

export interface SessionStats {
  mode: ExerciseMode;
  date: string;
  total: number;
  correct: number;
}

export interface ModeStats {
  totalAttempted: number;
  totalCorrect: number;
}

export interface AllStats {
  gender: ModeStats;
  adjectives: ModeStats;
  cases: ModeStats;
  sessions: SessionStats[];
}
