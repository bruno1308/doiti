import nouns from "../data/nouns";
import extraNouns from "../data/nouns-extra";
import caseSentences from "../data/cases";
import caseExercises from "../data/case-exercises";
import possessiveExercises from "../data/possessives-exercises";
import articleExercises from "../data/article-exercises";
import adjectiveExercises from "../data/adjective-exercises";
import type {
  Noun,
  AdjectiveTemplate,
  CaseSentence,
  PossessiveExercise,
  ArticleExercise,
  Gender,
  Person,
  ArticleType,
} from "./types";
import type { AdjectiveExerciseData } from "../data/adjective-exercises";
import type { PossessiveExerciseData } from "../data/possessives-exercises";
import type { ArticleExerciseData } from "../data/article-exercises";
import type { CaseExerciseData } from "../data/case-exercises";

// Merge original + extra nouns for the gender quiz
const allNouns: Noun[] = [...nouns, ...extraNouns.map(n => ({
  word: n.word,
  gender: n.gender,
  plural: n.plural,
  translation: n.translation,
}))];

/**
 * Fisher-Yates shuffle. Returns a new array; does not mutate the input.
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Pick a single random noun from the full noun list (original + extra).
 */
export function getRandomNoun(): Noun {
  const index = Math.floor(Math.random() * allNouns.length);
  return allNouns[index];
}

/**
 * Return `count` randomly-selected nouns (no duplicates when count <= allNouns.length).
 */
export function getRandomNouns(count: number): Noun[] {
  return shuffle(allNouns).slice(0, count);
}

/**
 * Map a gender code to its nominative definite article.
 */
export function getArticleForGender(gender: "m" | "f" | "n"): string {
  const map: Record<Gender, string> = { m: "der", f: "die", n: "das" };
  return map[gender];
}

// --- Adjective Endings (pre-baked) ---

let adjectiveExerciseId = 0;

export function generateAdjectiveExercise(): AdjectiveTemplate {
  const data = adjectiveExercises[Math.floor(Math.random() * adjectiveExercises.length)];

  adjectiveExerciseId += 1;

  return {
    id: adjectiveExerciseId,
    articleType: data.articleType,
    case: data.case,
    gender: data.gender,
    article: data.article,
    noun: data.noun,
    nounTranslation: data.nounTranslation,
    adjective: data.adjective,
    adjectiveTranslation: data.adjectiveTranslation,
    correctEnding: data.correctEnding,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
  };
}

// --- Case Identification (pre-baked) ---

// Merge old + new case sentences
const allCaseSentences: CaseSentence[] = [
  ...caseSentences,
  ...caseExercises.map((d: CaseExerciseData, i: number) => ({
    id: caseSentences.length + i + 1,
    sentence: d.sentence,
    nounPhrases: d.nounPhrases,
    translation: d.translation,
  })),
];

export function getRandomCaseSentence(): CaseSentence {
  const index = Math.floor(Math.random() * allCaseSentences.length);
  return allCaseSentences[index];
}

export function getShuffledCaseSentences(): CaseSentence[] {
  return shuffle(allCaseSentences);
}

// --- Possessive Pronouns (pre-baked) ---

let possessiveExerciseId = 0;

export function generatePossessiveExercise(): PossessiveExercise {
  const data = possessiveExercises[Math.floor(Math.random() * possessiveExercises.length)];

  possessiveExerciseId += 1;

  return {
    id: possessiveExerciseId,
    person: data.person,
    case: data.case,
    gender: data.gender,
    noun: data.noun,
    nounTranslation: data.nounTranslation,
    correctForm: data.correctForm,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
    translation: data.translation,
  };
}

// --- Article Drills (pre-baked) ---

let articleExerciseId = 0;

export function generateArticleExercise(): ArticleExercise {
  const data = articleExercises[Math.floor(Math.random() * articleExercises.length)];

  articleExerciseId += 1;

  return {
    id: articleExerciseId,
    articleType: data.articleType,
    case: data.case,
    gender: data.gender,
    noun: data.noun,
    nounTranslation: data.nounTranslation,
    correctForm: data.correctForm,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
    translation: data.translation,
  };
}

// --- Multiple Choice Option Generators ---

const ALL_ADJECTIVE_ENDINGS = ["-e", "-en", "-em", "-er", "-es"];

export function getAdjectiveEndingOptions(): string[] {
  return shuffle(ALL_ADJECTIVE_ENDINGS);
}

const POSSESSIVE_STEMS: Record<Person, string> = {
  ich: "mein",
  du: "dein",
  er: "sein",
  sie_sg: "ihr",
  es: "sein",
  wir: "unser",
  ihr: "euer",
  sie_pl: "ihr",
  Sie: "Ihr",
};

const POSSESSIVE_ENDINGS = ["", "e", "en", "em", "er", "es"];

function buildPossessiveForms(person: Person): string[] {
  const stem = POSSESSIVE_STEMS[person];
  if (person === "ihr" && stem === "euer") {
    // Special: euer → eure, euren, eurem, eurer, eures (drop inner e)
    return ["euer", "eure", "euren", "eurem", "eurer", "eures"];
  }
  return POSSESSIVE_ENDINGS.map(e => stem + e);
}

export function getPossessiveOptions(person: Person, correctForm: string): string[] {
  const allForms = buildPossessiveForms(person);
  const wrong = shuffle(allForms.filter(f => f !== correctForm)).slice(0, 3);
  return shuffle([correctForm, ...wrong]);
}

const DEFINITE_FORMS = ["der", "die", "das", "den", "dem", "des"];
const INDEFINITE_FORMS = ["ein", "eine", "einen", "einem", "einer", "eines"];

export function getArticleOptions(articleType: ArticleType, correctForm: string): string[] {
  const pool = articleType === "definite" ? DEFINITE_FORMS : INDEFINITE_FORMS;
  const wrong = shuffle(pool.filter(f => f !== correctForm)).slice(0, 3);
  return shuffle([correctForm, ...wrong]);
}
