import type { PracticeExercise, PracticeKind } from "./overall-types";
import type { QuestionStatsMap } from "./types";

export const kindLabels: Record<PracticeKind, string> = {
  choice: "Choose an answer", fill: "Fill the gaps", conjugation: "Conjugate verbs", order: "Sentence puzzle",
  match: "Connect pairs",
};

export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function normalizeAnswer(value: string): string {
  return value.normalize("NFC").trim().toLocaleLowerCase("de")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/ß/g, "ss").replace(/\s+/g, " ");
}

export function checkOverallAnswer(exercise: PracticeExercise, answers: string[], slots: (number | null)[]): boolean {
  if (exercise.kind === "match") return slots.length === exercise.pairs.length && slots.every((value, i) => value === i);
  if (exercise.kind === "choice") return answers[0] === exercise.answer;
  if (exercise.kind === "order") {
    if (slots.length !== exercise.chunks.length || slots.some(x => x === null) || new Set(slots).size !== slots.length) return false;
    return exercise.orders.some(order => order.every((chunk, i) => chunk === slots[i]));
  }
  return answers.length === exercise.blanks.length && exercise.blanks.every((blank, i) =>
    blank.answers.some(answer => normalizeAnswer(answer) === normalizeAnswer(answers[i])));
}

export function solutionText(exercise: PracticeExercise): string {
  if (exercise.kind === "match") return exercise.pairs.map(pair => `${pair.left} → ${pair.right}`).join("\n");
  if (exercise.kind === "order") return exercise.orders[0].map(i => exercise.chunks[i]).join(" ");
  if (exercise.kind === "choice") return exercise.sentence.replace("___", exercise.answer);
  let index = 0;
  return exercise.sentence.replace(/___/g, () => exercise.blanks[index++].answers[0]);
}

/** Dropping onto an occupied slot swaps placed pieces; a displaced bank piece returns to the bank. */
export function placeChunk(slots: (number | null)[], chunk: number, target: number | "bank"): (number | null)[] {
  if (chunk === 0 || (target !== "bank" && (target <= 0 || target >= slots.length))) return slots;
  const next = [...slots];
  const source = next.indexOf(chunk);
  if (target === "bank") {
    if (source > 0) next[source] = null;
  } else {
    const displaced = next[target];
    if (source > 0) next[source] = displaced;
    next[target] = chunk;
  }
  return next;
}

export function overallQuestionId(exercise: PracticeExercise): string {
  return exercise.progressKey ?? `overall-${exercise.level.toLowerCase()}:${exercise.id}`;
}

/** Connecting an already-used partner swaps it, so every partner stays unique. */
export function connectPair(slots: (number | null)[], left: number, right: number | null): (number | null)[] {
  if (!Number.isInteger(left) || left < 0 || left >= slots.length ||
    (right !== null && (!Number.isInteger(right) || right < 0 || right >= slots.length))) return slots;
  const next = [...slots];
  const previous = right === null ? -1 : next.indexOf(right);
  if (previous >= 0 && previous !== left) next[previous] = next[left];
  next[left] = right;
  return next;
}

/** Balance formats in mixed sessions, then prioritize unseen and weaker questions within each format. */
export function selectOverallExercises<T extends PracticeExercise>(pool: T[], count: number, stats: QuestionStatsMap, filter: PracticeKind | "mixed" = "mixed"): T[] {
  const kinds = filter === "mixed" ? shuffled((Object.keys(kindLabels) as PracticeKind[]).filter(kind => pool.some(e => e.kind === kind))) : [filter];
  const groups = kinds.map(kind => pool.filter(e => e.kind === kind).map(exercise => {
    const record = stats[overallQuestionId(exercise)];
    const accuracy = record?.attempts ? record.correct / record.attempts : 0;
    const priority = !record?.attempts ? 1 : accuracy <= 0.5 ? 0.8 : accuracy <= 0.8 ? 0.5 : 0.2;
    const old = record?.lastSeen && Date.now() - Date.parse(record.lastSeen) >= 7 * 86400000 ? 0.1 : 0;
    return { exercise, score: (priority + old) * (0.8 + Math.random() * 0.4) };
  }).sort((a, b) => b.score - a.score).map(e => e.exercise));
  const result: T[] = [];
  while (result.length < count && groups.some(group => group.length)) {
    for (const group of groups) {
      if (result.length >= count) break;
      const exercise = group.shift();
      if (exercise) result.push(exercise);
    }
  }
  return shuffled(result);
}
