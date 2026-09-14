import type { QuestionRecord } from "./types";

export function needsReview(record?: QuestionRecord): boolean {
  if (!record?.attempts) return false;
  if (record.recent?.length) return record.recent[record.recent.length - 1] === false;
  return record.attempts >= 2 && record.correct / record.attempts < 0.6;
}

export function isFamiliar(record?: QuestionRecord): boolean {
  if (!record || record.attempts < 3) return false;
  if (record.recent?.length) {
    if (record.recent.length >= 3) return record.recent.slice(-3).every(Boolean);
    // Older records keep their established signal until three new outcomes
    // exist; a real new mistake immediately removes the familiar status.
    return record.recent.every(Boolean) && record.correct / record.attempts >= 0.8;
  }
  return record.correct / record.attempts >= 0.8;
}
