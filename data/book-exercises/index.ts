import type { OverallExercise } from "../../lib/overall-types";
import present from "./01-present";
import perfekt from "./02-perfekt";
import past from "./03-past";
import verbs from "./04-more-verbs";
import complements from "./05-complements";
import nouns from "./06-nouns";
import articles from "./07-cases-articles";
import pronouns from "./08-pronouns";
import adjectives from "./09-adjectives";
import prepositions from "./10-prepositions";
import wordOrder from "./11-word-order";
import negation from "./12-negation";
import connectors from "./13-connectors";
import complex from "./14-complex-sentences";
import speaking from "./15-speaking-prompts";
import visual from "./16-visual-prompts";
import guided from "./17-guided-conversations";
import { auditBookExercises } from "./audit";

export const importedBookItems = auditBookExercises([...present,...perfekt,...past,...verbs,...complements,...nouns,...articles,...pronouns,...adjectives,...prepositions,...wordOrder,...negation,...connectors,...complex,...speaking,...visual,...guided]);

// Keep all source references while presenting repeated workbook questions once.
// Including the prompt and answers avoids collapsing different questions that
// happen to have the same completed sentence.
const unique = new Map<string, OverallExercise>();
for (const exercise of importedBookItems) {
  const key = JSON.stringify([exercise.level,exercise.kind,
    exercise.kind === "order" ? exercise.chunks : exercise.sentence,
    exercise.kind === "choice" ? exercise.answer : exercise.kind === "order" ? exercise.orders : exercise.blanks.map(b=>b.answers)]);
  const previous = unique.get(key);
  if (previous && exercise.source) {
    previous.additionalSources = [...(previous.additionalSources || []),exercise.source];
    previous.focusedModes = [...new Set([...(previous.focusedModes ?? []), ...(exercise.focusedModes ?? [])])];
  }
  else unique.set(key,{...exercise});
}
export const bookExercises = [...unique.values()];
export const bookA1 = bookExercises.filter(e=>e.level==="A1");
export const bookA2 = bookExercises.filter(e=>e.level==="A2");
