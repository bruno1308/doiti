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
  PronounExercise,
  PraeteritumExercise,
  PerfektExercise,
  Gender,
  Person,
  ArticleType,
  GrammaticalCase,
} from "./types";
import type { AdjectiveExerciseData } from "../data/adjective-exercises";
import type { PossessiveExerciseData } from "../data/possessives-exercises";
import type { ArticleExerciseData } from "../data/article-exercises";
import type { CaseExerciseData } from "../data/case-exercises";
import type { PronounExerciseData } from "../data/pronoun-exercises";

import pronounExercises from "../data/pronoun-exercises";
import praeteritumExercises from "../data/praeteritum-exercises";
import perfektExercises from "../data/perfekt-exercises";
import praeteritumConjugations from "../data/praeteritum-conjugations";
import perfektAlternatives from "../data/perfekt-alternatives";
import type { PraeteritumExerciseData } from "../data/praeteritum-exercises";
import type { PerfektExerciseData } from "../data/perfekt-exercises";

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

// --- Personal Pronouns (pre-baked) ---

let pronounExerciseId = 0;

export function generatePronounExercise(): PronounExercise {
  const data = pronounExercises[Math.floor(Math.random() * pronounExercises.length)];

  pronounExerciseId += 1;

  return {
    id: pronounExerciseId,
    person: data.person,
    case: data.case,
    correctForm: data.correctForm,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
    translation: data.translation,
  };
}

const PRONOUN_FORMS: Record<Person, Record<string, string>> = {
  ich: { nominativ: "ich", akkusativ: "mich", dativ: "mir" },
  du: { nominativ: "du", akkusativ: "dich", dativ: "dir" },
  er: { nominativ: "er", akkusativ: "ihn", dativ: "ihm" },
  sie_sg: { nominativ: "sie", akkusativ: "sie", dativ: "ihr" },
  es: { nominativ: "es", akkusativ: "es", dativ: "ihm" },
  wir: { nominativ: "wir", akkusativ: "uns", dativ: "uns" },
  ihr: { nominativ: "ihr", akkusativ: "euch", dativ: "euch" },
  sie_pl: { nominativ: "sie", akkusativ: "sie", dativ: "ihnen" },
  Sie: { nominativ: "Sie", akkusativ: "Sie", dativ: "Ihnen" },
};

const ALL_PRONOUN_FORMS_BY_CASE: Record<string, string[]> = {
  nominativ: ["ich", "du", "er", "sie", "es", "wir", "ihr", "Sie"],
  akkusativ: ["mich", "dich", "ihn", "sie", "es", "uns", "euch", "Sie"],
  dativ: ["mir", "dir", "ihm", "ihr", "uns", "euch", "ihnen", "Ihnen"],
};

export function getPronounOptions(person: Person, grammaticalCase: GrammaticalCase, correctForm: string): string[] {
  const correctLower = correctForm.toLowerCase();
  const cases = ["nominativ", "akkusativ", "dativ"];

  // Get other case forms of the same person as distractors
  const personForms = PRONOUN_FORMS[person];
  const uniqueOtherPersonForms: string[] = [];
  for (const c of cases) {
    const form = personForms[c];
    if (form.toLowerCase() !== correctLower && uniqueOtherPersonForms.indexOf(form) === -1) {
      uniqueOtherPersonForms.push(form);
    }
  }

  // Get forms from other persons in the same case as additional distractors
  const sameCaseForms = ALL_PRONOUN_FORMS_BY_CASE[grammaticalCase] || [];
  const otherSameCaseForms = sameCaseForms.filter(f => f.toLowerCase() !== correctLower);

  // Build wrong answers: prefer same-person other-case forms, then fill with same-case other-person
  let wrong = uniqueOtherPersonForms.slice();
  if (wrong.length < 3) {
    const additional = shuffle(otherSameCaseForms.filter(f => {
      for (const w of wrong) {
        if (w.toLowerCase() === f.toLowerCase()) return false;
      }
      return true;
    }));
    wrong = wrong.concat(additional);
  }
  wrong = shuffle(wrong).slice(0, 3);

  return shuffle([correctForm].concat(wrong));
}

// --- Prateritum (pre-baked) ---

let praeteritumExerciseId = 0;

export function generatePraeteritumExercise(): PraeteritumExercise {
  const data = praeteritumExercises[Math.floor(Math.random() * praeteritumExercises.length)];

  praeteritumExerciseId += 1;

  return {
    id: praeteritumExerciseId,
    infinitive: data.infinitive,
    correctForm: data.correctForm,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
    particle: data.particle,
    translation: data.translation,
  };
}

/**
 * Generate 3 wrong Präteritum options using other conjugations of the SAME verb.
 * Falls back to the global pool if not enough same-verb forms exist.
 */
export function getPraeteritumOptions(infinitive: string, correctForm: string): string[] {
  const correctLower = correctForm.toLowerCase();
  const forms = praeteritumConjugations[infinitive] || [];
  let wrong = forms.filter(f => f.toLowerCase() !== correctLower);
  wrong = shuffle(wrong).slice(0, 3);

  // Fallback: fill from global pool if not enough same-verb distractors
  if (wrong.length < 3) {
    const allForms = praeteritumExercises.map(e => e.correctForm);
    const usedLower = new Set([correctLower, ...wrong.map(w => w.toLowerCase())]);
    const extra = shuffle(allForms.filter(f => !usedLower.has(f.toLowerCase())));
    wrong = wrong.concat(extra.slice(0, 3 - wrong.length));
  }

  return shuffle([correctForm, ...wrong]);
}

// --- Perfekt (pre-baked) ---

let perfektExerciseId = 0;

export function generatePerfektExercise(): PerfektExercise {
  const data = perfektExercises[Math.floor(Math.random() * perfektExercises.length)];

  perfektExerciseId += 1;

  return {
    id: perfektExerciseId,
    infinitive: data.infinitive,
    auxiliary: data.auxiliary,
    pastParticiple: data.pastParticiple,
    sentenceBefore: data.sentenceBefore,
    sentenceAfter: data.sentenceAfter,
    translation: data.translation,
  };
}

/**
 * Generate 3 wrong Perfekt options using other tense forms of the SAME verb
 * with "ge" prefixed so they visually resemble real past participles.
 * For inseparable-prefix verbs (ver-, be-, er-, zer-, ent-) the "ge" trick
 * doesn't work, so we skip it and fall back to the global participle pool.
 */
const INSEPARABLE_PREFIXES = ["ver", "be", "er", "zer", "ent"];

export function getPerfektOptions(infinitive: string, correctForm: string): string[] {
  const correctLower = correctForm.toLowerCase();
  const isInseparable = INSEPARABLE_PREFIXES.some(p => infinitive.startsWith(p));
  const forms = perfektAlternatives[infinitive] || [];

  let wrong: string[] = [];

  if (!isInseparable) {
    // Prefix "ge" to each alternative so distractors look like past participles
    const geWrong = forms
      .map(f => f.startsWith("ge") ? f : "ge" + f)
      .filter(f => f.toLowerCase() !== correctLower);

    // Deduplicate (case-insensitive)
    const seen = new Set<string>();
    wrong = geWrong.filter(f => {
      const lower = f.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });

    wrong = shuffle(wrong).slice(0, 3);
  }

  // Fallback: fill from global pool of real past participles
  if (wrong.length < 3) {
    const allForms = perfektExercises.map(e => e.pastParticiple);
    const usedLower = new Set([correctLower, ...wrong.map(w => w.toLowerCase())]);
    const extra = shuffle(allForms.filter(f => !usedLower.has(f.toLowerCase())));
    wrong = wrong.concat(extra.slice(0, 3 - wrong.length));
  }

  return shuffle([correctForm, ...wrong]);
}
