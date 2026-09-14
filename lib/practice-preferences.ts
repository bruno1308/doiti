import { kindLabels, overallQuestionId, selectOverallExercises } from "./overall-logic";
import { needsReview } from "./question-progress";
import type { PracticeExercise, PracticeKind } from "./overall-types";
import type { QuestionStatsMap } from "./types";

export const sessionLengths = [5, 10, 15, 20, 30, 50] as const;
export const practiceKinds = Object.keys(kindLabels) as PracticeKind[];
export type PracticePreferences = { count: number; kinds: PracticeKind[] };

export function defaultPracticePreferences(): PracticePreferences {
  return { count: 20, kinds: [...practiceKinds] };
}

/** Recover safely from older, malformed or unsupported saved preferences. */
export function normalizePracticePreferences(value: unknown): PracticePreferences {
  if (!value || typeof value !== "object") return defaultPracticePreferences();
  const saved = value as Partial<PracticePreferences>;
  const kinds = practiceKinds.filter(kind => Array.isArray(saved.kinds) && saved.kinds.includes(kind));
  return {
    count: sessionLengths.some(count => count === saved.count) ? saved.count! : 20,
    kinds: kinds.length ? kinds : [...practiceKinds],
  };
}

export function selectPracticeSession(pool: PracticeExercise[], preferences: PracticePreferences, stats: QuestionStatsMap, reviewFirst = false): PracticeExercise[] {
  // Filter first, then balance the eligible formats. Never add unrelated cards
  // or silently ignore a learner's excluded formats to reach the target length.
  const eligible = pool.filter(e => preferences.kinds.includes(e.kind));
  const review = reviewFirst ? eligible.filter(e => needsReview(stats[overallQuestionId(e)]))
    .sort((a, b) => (Date.parse(stats[overallQuestionId(b)].lastSeen) || 0) - (Date.parse(stats[overallQuestionId(a)].lastSeen) || 0))
    .slice(0, preferences.count) : [];
  const chosen = new Set(review.map(overallQuestionId));
  return [...review, ...selectOverallExercises(eligible.filter(e => !chosen.has(overallQuestionId(e))), preferences.count - review.length, stats)];
}
