import type { OverallExercise, OverallLevel } from "../lib/overall-types";
import type { ExerciseMode } from "../lib/types";
import { normalizeAnswer } from "../lib/overall-logic";
import { contextualGroups } from "./book-exercises/option-priorities";
import {
  getAllNouns, getAllAdjectiveExercises, getAllArticleExercises, getAllCaseSentences,
  getAllPossessiveExercises, getAllPronounExercises, getAllPraeteritumExercises,
  getAllPerfektExercises, getAllPrepositionExercises, getAllModalExercises,
  getArticleForGender, getPluralOptions, getPossessiveOptions, getPronounOptions,
  getPraeteritumOptions, getPerfektOptions, getPrepositionOptions, getModalOptions,
} from "../lib/exercise-logic";

export const legacyModes = ["gender", "adjectives", "cases", "possessives", "articles", "pronouns", "praeteritum", "perfekt", "plurals", "prepositions", "modals"] as const;
export type LegacyMode = typeof legacyModes[number];
const caseNames = { nominativ: "Nominative", akkusativ: "Accusative", dativ: "Dative", genitiv: "Genitive" };
const caseGroups = { nominativ: "nom", akkusativ: "acc", dativ: "dat", genitiv: "gen" };
const sentence = (before: string, after: string) => [before, "___", after].filter(Boolean).join(" ").replace(/\s+([.,!?;:])/g, "$1");
function four(answer: string, candidates: string[]) {
  const upper = /^[A-ZÄÖÜ]/.test(answer);
  const seen = new Set([normalizeAnswer(answer)]);
  return [answer, ...candidates.filter(value => {
    const key = normalizeAnswer(value);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0, 3).map(value => upper ? value[0].toUpperCase() + value.slice(1) : value)];
}
function base(mode: ExerciseMode, index: number, topic: string, translation: string, explanation: string, level: OverallLevel = "A1") {
  return { id: `legacy-${mode}-${index}`, progressKey: `${mode}:${index}`, level, topic, translation, explanation, bookSection: "Original practice" };
}
function choice(mode: ExerciseMode, index: number, topic: string, text: string, answer: string, options: string[], translation: string, explanation: string, level: OverallLevel = "A1"): OverallExercise {
  return { ...base(mode, index, topic, translation, explanation, level), kind: "choice", instruction: "Choose the correct answer.", sentence: text, answer, options: four(answer, options) };
}
const nouns = getAllNouns();

// Preserve each old question and its index-based progress key. Workbook entries
// are appended separately with their existing shared Overall keys.
export const legacyPractice: Record<LegacyMode, OverallExercise[]> = {
  gender: nouns.map((n, i) => ({ ...choice("gender", i, "Noun gender", `___ ${n.word}`, getArticleForGender(n.gender), contextualGroups["article:nom"], n.translation,
    `${getArticleForGender(n.gender)} ${n.word} — ${n.translation}. Learn the article with the noun.`), instruction: `Choose the article for “${n.translation}”.` })),
  plurals: nouns.map((n, i) => choice("plurals", i, "Plural nouns", `${getArticleForGender(n.gender)} ${n.word} → ___`, n.plural, getPluralOptions(n.word, n.plural), n.translation,
    `The plural of ${n.word} is ${n.plural}.`)),
  articles: getAllArticleExercises().map((e, i) => {
    const options = e.articleType === "definite" ? contextualGroups[`article:${caseGroups[e.case]}`]
      : e.case === "dativ" || e.case === "genitiv" ? ["einem", "einer", "eines", "einen"] : ["ein", "eine", "einen", "einem"];
    return choice("articles", i, `${caseNames[e.case]} articles`, sentence(e.sentenceBefore, e.sentenceAfter), e.correctForm, options, e.translation,
      `${caseNames[e.case]} · ${e.articleType} article: ${e.correctForm} ${e.noun}.`);
  }),
  adjectives: getAllAdjectiveExercises().map((e, i) => choice("adjectives", i, `${caseNames[e.case]} adjective endings`,
    [e.sentenceBefore, e.article, "___", e.noun, e.sentenceAfter].filter(Boolean).join(" "), e.adjective + e.correctEnding,
    ["e", "en", "em", "er", "es"].map(ending => e.adjective + ending), e.translation,
    `${caseNames[e.case]} with ${e.articleType === "none" ? "no article" : `a ${e.articleType} article`}: ${e.adjective}${e.correctEnding} ${e.noun}.`, "A2")),
  possessives: getAllPossessiveExercises().map((e, i) => ({ ...choice("possessives", i, "Possessive articles", sentence(e.sentenceBefore, e.sentenceAfter), e.correctForm,
    getPossessiveOptions(e.person, e.correctForm, e.case), e.translation, `${caseNames[e.case]}: ${e.correctForm} ${e.noun}. The owner determines the stem; the noun determines the ending.`),
    instruction: `Choose the possessive for ${e.person.replace("sie_sg", "sie (singular)").replace("sie_pl", "sie (plural)")}.` })),
  pronouns: getAllPronounExercises().map((e, i) => ({ ...choice("pronouns", i, "Personal pronouns", sentence(e.sentenceBefore, e.sentenceAfter), e.correctForm,
    getPronounOptions(e.person, e.case, e.correctForm), e.translation, `${caseNames[e.case]}: ${e.person} becomes ${e.correctForm}.`),
    instruction: `Choose the pronoun for ${e.person.replace("sie_sg", "sie (singular)").replace("sie_pl", "sie (plural)")}.` })),
  praeteritum: getAllPraeteritumExercises().map((e, i) => ({ ...choice("praeteritum", i, "Präteritum", sentence(e.sentenceBefore, e.sentenceAfter), e.correctForm,
    getPraeteritumOptions(e.infinitive, e.correctForm), e.translation, `${e.infinitive} → ${e.correctForm} in this past-tense sentence.`, "A2"), instruction: `Choose the Präteritum form of ${e.infinitive}.` })),
  perfekt: getAllPerfektExercises().map((e, i) => ({ ...choice("perfekt", i, "Perfekt", sentence(e.sentenceBefore, e.sentenceAfter), e.pastParticiple,
    getPerfektOptions(e.infinitive, e.pastParticiple), e.translation, `${e.infinitive} → ${e.auxiliary} + ${e.pastParticiple}.`, "A2"), instruction: `Choose the past participle of ${e.infinitive}.` })),
  prepositions: getAllPrepositionExercises().map((e, i) => ({ ...choice("prepositions", i, "Prepositions", sentence(e.sentenceBefore, e.sentenceAfter), e.preposition,
    getPrepositionOptions(e.preposition), e.translation, `${e.preposition} takes ${caseNames[e.case].toLowerCase()} here.`), instruction: `Complete the German sentence: “${e.translation}”` })),
  modals: getAllModalExercises().map((e, i) => ({ ...choice("modals", i, "Modal verbs", sentence(e.sentenceBefore, e.sentenceAfter), e.correctForm,
    getModalOptions(e.modalVerb, e.person, e.correctForm), e.translation, `${e.modalVerb}: ${e.person} → ${e.correctForm}. The other verb stays in the infinitive.`), instruction: `Complete the German sentence: “${e.translation}”` })),
  cases: getAllCaseSentences().map((e, i) => ({ ...base("cases", i, "Case identification", e.translation, "Subjects use nominative; direct objects usually use accusative; recipients and certain verbs/prepositions take dative; possession can use genitive."),
    kind: "fill", instruction: "Choose the case of each quoted phrase.",
    sentence: `${e.sentence}\n\n${e.nounPhrases.map(p => `“${p.text}” → ___`).join("\n")}`,
    blanks: e.nounPhrases.map(p => ({ answers: [caseNames[p.case]], hint: p.text, options: Object.values(caseNames) })),
  })),
};

for (const mode of ["praeteritum", "perfekt", "modals"] as const) {
  legacyPractice[mode] = legacyPractice[mode].map(exercise => {
    if (exercise.kind !== "choice") return exercise;
    const { answer, options, ...rest } = exercise;
    return { ...rest, kind: "conjugation", blanks: [{ answers: [answer], options, hint: exercise.topic }] };
  });
}
