import type { workbookChapter } from "./builder";

/** Adapt a sentence task into actual preposition/case decisions. Meaning stays
 * visible because several prepositions can otherwise make a valid sentence. */
export function prepositionGaps(
  chapter: ReturnType<typeof workbookChapter>,
  page: number,
  task: string,
  rows: readonly (readonly [text: string, meaning: string, explanation: string])[],
) {
  const start = chapter.exercises.length;
  chapter.gaps(page, task, rows.map(([text]) => text).join("\n"), "fill");
  rows.forEach(([, meaning, explanation], index) => {
    const exercise = chapter.exercises[start + index];
    exercise.instruction = `Choose the missing preposition or ending: “${meaning}”`;
    exercise.translation = meaning;
    exercise.explanation = explanation;
  });
}
