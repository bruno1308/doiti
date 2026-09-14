import { focusedPractice } from "./focused-practice";
import { allPracticeModes } from "./practice-modes";
import { conversations } from "./conversations";
import a1 from "./overall-a1";
import a2 from "./overall-a2";
import { overallQuestionId } from "../lib/overall-logic";
import { conversationKey } from "../lib/conversation";
import type { PracticeKind } from "../lib/overall-types";
import type { ExerciseMode } from "../lib/types";

export type SkillDefinition = { id: ExerciseMode; title: string; icon: string; questions: { id: string; kind?: PracticeKind }[] };
export const skillDefinitions: SkillDefinition[] = allPracticeModes.map(mode => ({
  id: mode.id, title: mode.title, icon: mode.icon,
  questions: mode.id === "conversation"
    ? conversations.flatMap(scenario => scenario.turns.map(turn => ({ id: conversationKey(scenario, turn) })))
    : focusedPractice[mode.id].pool.map(e => ({ id: overallQuestionId(e), kind: e.kind })),
}));
// Shared workbook questions are counted once in the overall collection.
export const progressQuestions = [...new Map([
  ...[...a1, ...a2].map(e => ({ id: overallQuestionId(e), kind: e.kind as PracticeKind | undefined })),
  ...skillDefinitions.flatMap(skill => skill.questions),
].map(question => [question.id, question])).values()];
