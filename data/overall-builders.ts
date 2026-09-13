import type { OverallExercise, OverallLevel } from "../lib/overall-types";
import { extraChoiceDistractor, gapDistractors } from "./overall-distractors";

// Small authoring helpers keep every answer, alternative and explanation explicit.
export function builders(level: OverallLevel) {
  const base = (id: string, topic: string, bookSection: string, translation: string, explanation: string) =>
    ({ id: `${level.toLowerCase()}-${id}`, level, topic, bookSection, translation, explanation });
  return {
    choice(id: string, topic: string, section: string, sentence: string, answer: string, wrong: string[], translation: string, explanation: string): OverallExercise {
      return { ...base(id, topic, section, translation, explanation), kind: "choice", instruction: "Choose the correct answer.", sentence, answer, options: [answer, ...wrong, extraChoiceDistractor[`${level.toLowerCase()}-${id}`]] };
    },
    text(id: string, kind: "fill" | "conjugation", topic: string, section: string, sentence: string, answers: string[], hints: string[], translation: string, explanation: string): OverallExercise {
      return { ...base(id, topic, section, translation, explanation), kind,
        instruction: kind === "conjugation" ? "Choose the correct verb form." : "Choose the correct answer for each gap.",
        sentence, blanks: answers.map((answer, i) => ({ answers: answer.split("|"), hint: hints[i],
          options: [answer.split("|")[0], ...gapDistractors[`${level.toLowerCase()}-${id}`][i]] })) };
    },
    order(id: string, topic: string, section: string, chunks: string[], translation: string, explanation: string, alternatives: number[][] = []): OverallExercise {
      return { ...base(id, topic, section, translation, explanation), kind: "order",
        instruction: `Build the sentence. Start with “${chunks[0]}”.`, chunks,
        orders: [chunks.map((_, i) => i), ...alternatives] };
    },
  };
}
