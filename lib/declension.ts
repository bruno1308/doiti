import type { ArticleType, GrammaticalCase, Gender } from "./types";

/**
 * Adjective ending tables for German declension.
 *
 * Three patterns:
 * - definite (weak declension): after der/die/das
 * - indefinite (mixed declension): after ein/eine/ein
 * - none (strong declension): no article
 */
const adjectiveEndings: Record<
  ArticleType,
  Record<GrammaticalCase, Record<Gender, string>>
> = {
  definite: {
    nominativ: { m: "e", f: "e", n: "e" },
    akkusativ: { m: "en", f: "e", n: "e" },
    dativ: { m: "en", f: "en", n: "en" },
    genitiv: { m: "en", f: "en", n: "en" },
  },
  indefinite: {
    nominativ: { m: "er", f: "e", n: "es" },
    akkusativ: { m: "en", f: "e", n: "es" },
    dativ: { m: "en", f: "en", n: "en" },
    genitiv: { m: "en", f: "en", n: "en" },
  },
  none: {
    nominativ: { m: "er", f: "e", n: "es" },
    akkusativ: { m: "en", f: "e", n: "es" },
    dativ: { m: "em", f: "er", n: "em" },
    genitiv: { m: "en", f: "er", n: "en" },
  },
};

/**
 * Article lookup tables for German definite, indefinite, and no-article forms.
 */
const articles: Record<
  ArticleType,
  Record<GrammaticalCase, Record<Gender, string>>
> = {
  definite: {
    nominativ: { m: "der", f: "die", n: "das" },
    akkusativ: { m: "den", f: "die", n: "das" },
    dativ: { m: "dem", f: "der", n: "dem" },
    genitiv: { m: "des", f: "der", n: "des" },
  },
  indefinite: {
    nominativ: { m: "ein", f: "eine", n: "ein" },
    akkusativ: { m: "einen", f: "eine", n: "ein" },
    dativ: { m: "einem", f: "einer", n: "einem" },
    genitiv: { m: "eines", f: "einer", n: "eines" },
  },
  none: {
    nominativ: { m: "", f: "", n: "" },
    akkusativ: { m: "", f: "", n: "" },
    dativ: { m: "", f: "", n: "" },
    genitiv: { m: "", f: "", n: "" },
  },
};

/**
 * Get the correct adjective ending for the given article type, case, and gender.
 */
export function getAdjectiveEnding(
  articleType: ArticleType,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  return adjectiveEndings[articleType][grammaticalCase][gender];
}

/**
 * Get the article for the given article type, case, and gender.
 * Returns an empty string for "none" article type.
 */
export function getArticle(
  articleType: ArticleType,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  return articles[articleType][grammaticalCase][gender];
}
