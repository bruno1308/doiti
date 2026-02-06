import nouns from "../data/nouns";
import { adjectiveNounPairs, sentenceTemplates } from "../data/adjectives";
import caseSentences from "../data/cases";
import { getAdjectiveEnding, getArticle } from "./declension";
import type {
  Noun,
  AdjectiveTemplate,
  CaseSentence,
  ArticleType,
  Gender,
} from "./types";

let adjectiveExerciseId = 0;

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
 * Pick a single random noun from the noun list.
 */
export function getRandomNoun(): Noun {
  const index = Math.floor(Math.random() * nouns.length);
  return nouns[index];
}

/**
 * Return `count` randomly-selected nouns (no duplicates when count <= nouns.length).
 */
export function getRandomNouns(count: number): Noun[] {
  return shuffle(nouns).slice(0, count);
}

/**
 * Map a gender code to its nominative definite article.
 */
export function getArticleForGender(gender: "m" | "f" | "n"): string {
  const map: Record<Gender, string> = { m: "der", f: "die", n: "das" };
  return map[gender];
}

/**
 * Generate a random adjective-ending exercise.
 *
 * Picks a random adjective-noun pair, a random sentence template, and a random
 * article type, then computes the correct article + adjective ending using the
 * declension helpers.  The template's `[NP]` placeholder is split into
 * sentenceBefore / sentenceAfter parts.
 */
export function generateAdjectiveExercise(): AdjectiveTemplate {
  const pair =
    adjectiveNounPairs[
      Math.floor(Math.random() * adjectiveNounPairs.length)
    ];

  const template =
    sentenceTemplates[
      Math.floor(Math.random() * sentenceTemplates.length)
    ];

  const articleTypes: ArticleType[] = ["definite", "indefinite", "none"];
  const articleType =
    articleTypes[Math.floor(Math.random() * articleTypes.length)];

  const article = getArticle(articleType, template.case, pair.gender);
  const correctEnding = getAdjectiveEnding(
    articleType,
    template.case,
    pair.gender
  );

  const [sentenceBefore, sentenceAfter] = template.template.split("[NP]");

  adjectiveExerciseId += 1;

  return {
    id: adjectiveExerciseId,
    articleType,
    case: template.case,
    gender: pair.gender,
    article,
    noun: pair.noun,
    nounTranslation: pair.nounTranslation,
    adjective: pair.adjective,
    adjectiveTranslation: pair.adjectiveTranslation,
    correctEnding,
    sentenceBefore: sentenceBefore ?? "",
    sentenceAfter: sentenceAfter ?? "",
  };
}

/**
 * Pick a single random case sentence.
 */
export function getRandomCaseSentence(): CaseSentence {
  const index = Math.floor(Math.random() * caseSentences.length);
  return caseSentences[index];
}

/**
 * Return all case sentences in a shuffled order.
 */
export function getShuffledCaseSentences(): CaseSentence[] {
  return shuffle(caseSentences);
}
