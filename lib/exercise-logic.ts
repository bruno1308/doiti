import nouns from "../data/nouns";
import extraNouns from "../data/nouns-extra";
import caseSentences from "../data/cases";
import caseExercises from "../data/case-exercises";
import possessiveExercises from "../data/possessives-exercises";
import articleExercises from "../data/article-exercises";
import adjectiveExercises from "../data/adjective-exercises";
import { getQuestionStats } from "./stats";
import type {
  Noun,
  CaseSentence,
  Gender,
  Person,
  ArticleType,
  GrammaticalCase,
  QuestionStatsMap,
  ExerciseMode,
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
import prepositionExercises from "../data/preposition-exercises";
import type { PrepositionExerciseData } from "../data/preposition-exercises";
import modalExercises from "../data/modal-exercises";
import type { ModalExerciseData, ModalVerb, ModalPerson } from "../data/modal-exercises";
import modalConjugations from "../data/modal-conjugations";

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
 * Map a gender code to its nominative definite article.
 */
export function getArticleForGender(gender: "m" | "f" | "n"): string {
  const map: Record<Gender, string> = { m: "der", f: "die", n: "das" };
  return map[gender];
}

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

export function getAllNouns(): Noun[] {
  return allNouns;
}

export function getAllAdjectiveExercises(): AdjectiveExerciseData[] {
  return adjectiveExercises;
}

export function getAllCaseSentences(): CaseSentence[] {
  return allCaseSentences;
}

export function getAllArticleExercises(): ArticleExerciseData[] {
  return articleExercises;
}

export function getAllPossessiveExercises(): PossessiveExerciseData[] {
  return possessiveExercises;
}

export function getAllPronounExercises(): PronounExerciseData[] {
  return pronounExercises;
}

export function getAllPraeteritumExercises(): PraeteritumExerciseData[] {
  return praeteritumExercises;
}

export function getAllPerfektExercises(): PerfektExerciseData[] {
  return perfektExercises;
}

export function getAllPrepositionExercises(): PrepositionExerciseData[] {
  return prepositionExercises;
}

export function getAllModalExercises(): ModalExerciseData[] {
  return modalExercises;
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

/**
 * Generate 3 wrong Perfekt options that visually resemble the correct answer.
 * - Regular verbs: prefix "ge" to same-verb alternatives (e.g. gesprechen, gesprach)
 * - Inseparable-prefix verbs (ver-, be-, er-, zer-, ent-): use same-verb
 *   alternatives as-is since they already share the prefix (e.g. verspricht, versprach)
 */
const INSEPARABLE_PREFIXES = ["ver", "be", "er", "zer", "ent"];

export function getPerfektOptions(infinitive: string, correctForm: string): string[] {
  const correctLower = correctForm.toLowerCase();
  const isInseparable = INSEPARABLE_PREFIXES.some(p => infinitive.startsWith(p));
  const forms = perfektAlternatives[infinitive] || [];

  let candidates: string[];

  if (isInseparable) {
    // Alternatives already share the verb prefix — use as-is
    candidates = forms.filter(f => f.toLowerCase() !== correctLower);
  } else {
    // Prefix "ge" to each alternative so distractors look like past participles
    candidates = forms
      .map(f => f.startsWith("ge") ? f : "ge" + f)
      .filter(f => f.toLowerCase() !== correctLower);
  }

  // Deduplicate (case-insensitive)
  const seen = new Set<string>();
  const unique = candidates.filter(f => {
    const lower = f.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });

  let wrong = shuffle(unique).slice(0, 3);

  // Fallback: fill from global pool of real past participles
  if (wrong.length < 3) {
    const allForms = perfektExercises.map(e => e.pastParticiple);
    const usedLower = new Set([correctLower, ...wrong.map(w => w.toLowerCase())]);
    const extra = shuffle(allForms.filter(f => !usedLower.has(f.toLowerCase())));
    wrong = wrong.concat(extra.slice(0, 3 - wrong.length));
  }

  return shuffle([correctForm, ...wrong]);
}

/**
 * Replace the last umlautifiable vowel (a→ä, o→ö, u→ü, au→äu).
 */
function applyUmlaut(word: string): string | null {
  for (let i = word.length - 1; i >= 0; i--) {
    const ch = word[i];
    if (ch === "u" && i > 0 && word[i - 1].toLowerCase() === "a") {
      const isUpper = word[i - 1] === "A";
      return word.slice(0, i - 1) + (isUpper ? "Ä" : "ä") + "u" + word.slice(i + 1);
    }
    if (ch === "a") return word.slice(0, i) + "ä" + word.slice(i + 1);
    if (ch === "A") return word.slice(0, i) + "Ä" + word.slice(i + 1);
    if (ch === "o") return word.slice(0, i) + "ö" + word.slice(i + 1);
    if (ch === "O") return word.slice(0, i) + "Ö" + word.slice(i + 1);
    if (ch === "u") return word.slice(0, i) + "ü" + word.slice(i + 1);
    if (ch === "U") return word.slice(0, i) + "Ü" + word.slice(i + 1);
  }
  return null;
}

/**
 * Generate 3 wrong plural options by applying different endings to the same word.
 * e.g. Stunde → Stundes, Stunde, Stundeln (correct: Stunden)
 */
export function getPluralOptions(singular: string, correctPlural: string): string[] {
  const correctLower = correctPlural.toLowerCase();
  const candidates = new Set<string>();

  // Add common plural suffixes to the full singular
  for (const suffix of ["e", "en", "er", "n", "s", "se"]) {
    candidates.add(singular + suffix);
  }
  // No-change plural
  candidates.add(singular);

  // If word ends in -e, replace -e with other endings
  if (singular.endsWith("e")) {
    const stem = singular.slice(0, -1);
    for (const ending of ["en", "er", "eln", "el", "es"]) {
      candidates.add(stem + ending);
    }
  }

  // If word ends in -er/-el/-en, try swapping the suffix
  if (/e[rln]$/.test(singular)) {
    const stem = singular.slice(0, -2);
    for (const ending of ["ern", "eln", "en", "el", "er"]) {
      candidates.add(stem + ending);
    }
  }

  // Umlaut variations (Haus→Häuser, Mutter→Mütter)
  const umlauted = applyUmlaut(singular);
  if (umlauted) {
    candidates.add(umlauted);
    candidates.add(umlauted + "e");
    candidates.add(umlauted + "er");
  }

  // Remove the correct answer
  const filtered = [...candidates].filter(c => c.toLowerCase() !== correctLower);
  const wrong = shuffle(filtered).slice(0, 3);
  return shuffle([correctPlural, ...wrong]);
}

/**
 * All prepositions grouped by case for distractor selection.
 */
const ALL_PREPOSITIONS: Record<string, string[]> = {
  akkusativ: ["bis", "durch", "für", "gegen", "ohne", "um"],
  dativ: ["aus", "bei", "gegenüber", "mit", "nach", "seit", "von", "zu"],
  genitiv: ["trotz", "wegen", "während", "statt"],
  wechsel: ["an", "auf", "hinter", "in", "neben", "über", "unter", "vor", "zwischen"],
};
const FLAT_PREPOSITIONS = Object.values(ALL_PREPOSITIONS).flat();

/**
 * Generate 3 wrong preposition options, preferring prepositions from different case groups.
 */
export function getPrepositionOptions(correctPreposition: string): string[] {
  const correctLower = correctPreposition.toLowerCase();
  const wrong = shuffle(FLAT_PREPOSITIONS.filter(p => p.toLowerCase() !== correctLower)).slice(0, 3);
  return shuffle([correctPreposition, ...wrong]);
}

/**
 * Generate 3 wrong modal verb options using the same person conjugation
 * of OTHER commonly confused modal verbs (können/müssen/dürfen/sollen/wollen/mögen).
 */
export function getModalOptions(modalVerb: ModalVerb, person: ModalPerson, correctForm: string): string[] {
  const correctLower = correctForm.toLowerCase();
  const allVerbs: ModalVerb[] = ["können", "müssen", "dürfen", "sollen", "wollen", "mögen"];
  const otherVerbs = allVerbs.filter(v => v !== modalVerb);

  // Get same-person conjugation of other modal verbs
  const candidates = otherVerbs
    .map(v => modalConjugations[v][person])
    .filter(f => f.toLowerCase() !== correctLower);

  // Deduplicate
  const unique = [...new Set(candidates)];
  let wrong = shuffle(unique).slice(0, 3);

  // Fallback: fill from other person forms of same verb
  if (wrong.length < 3) {
    const sameForms = Object.values(modalConjugations[modalVerb])
      .filter(f => f.toLowerCase() !== correctLower && !wrong.some(w => w.toLowerCase() === f.toLowerCase()));
    wrong = wrong.concat(shuffle([...new Set(sameForms)]).slice(0, 3 - wrong.length));
  }

  return shuffle([correctForm, ...wrong]);
}

/**
 * Score a question for selection priority.
 * Higher score = more likely to be selected.
 */
function scoreQuestion(
  questionId: string,
  stats: QuestionStatsMap
): number {
  const record = stats[questionId];

  // Never seen -> highest priority
  if (!record || record.attempts === 0) {
    return 1.0;
  }

  const accuracy = record.correct / record.attempts;

  // Tiered scoring based on accuracy
  let score: number;
  if (accuracy <= 0.5) {
    score = 0.8;
  } else if (accuracy <= 0.8) {
    score = 0.5;
  } else {
    score = 0.2;
  }

  // Recency bonus: +0.1 if not seen in 7+ days
  const lastSeen = new Date(record.lastSeen);
  const daysSince = (Date.now() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSince >= 7) {
    score += 0.1;
  }

  return score;
}

/**
 * Select `count` exercises from `pool` using smart prioritization.
 * Returns exercises in shuffled order with their question IDs.
 */
export async function selectExercises<T>(
  mode: ExerciseMode,
  pool: T[],
  count: number
): Promise<{ exercises: T[]; questionIds: string[] }> {
  const stats = await getQuestionStats();

  // Score each exercise in the pool
  const scored = pool.map((item, index) => {
    const questionId = `${mode}:${index}`;
    const priority = scoreQuestion(questionId, stats);
    // Add random jitter (0.8-1.2) to avoid determinism
    const jitter = 0.8 + Math.random() * 0.4;
    return { item, questionId, score: priority * jitter, index };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top `count` (capped at pool size)
  const selected = scored.slice(0, Math.min(count, pool.length));

  // Shuffle for presentation order
  const shuffled = shuffle(selected);

  return {
    exercises: shuffled.map((s) => s.item),
    questionIds: shuffled.map((s) => s.questionId),
  };
}
