/** Session-local, first-attempt outcomes. Corrections do not extend a combo. */
export function comboStats(attempts: readonly { correct: boolean }[]) {
  let current = 0, best = 0;
  for (const attempt of attempts) {
    current = attempt.correct ? current + 1 : 0;
    best = Math.max(best, current);
  }
  return { current, best };
}
export function isComboMilestone(streak: number): boolean {
  return Number.isInteger(streak) && (streak === 3 || (streak >= 5 && streak % 5 === 0));
}
export function comboMessage(streak: number): string {
  return streak >= 10 ? "What a run!" : streak >= 5 ? "In your element." : "Finding your rhythm.";
}
export function completionKind(correct: number, total: number, finished: boolean): "saved" | "complete" | "perfect" {
  if (!finished || total === 0) return "saved";
  return correct === total ? "perfect" : "complete";
}
