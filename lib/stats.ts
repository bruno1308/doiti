import { modeNames } from "../data/practice-modes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllStats, ExerciseMode, ModeStats, QuestionStatsMap, SessionStats } from "./types";

const STATS_KEY = "doiti_stats";

// Keep read-modify-write operations ordered, including when leaving a practice
// screen while its last answer is still being saved.
let pendingWrite: Promise<void> = Promise.resolve();
function writeInOrder(operation: () => Promise<void>): Promise<void> {
  const result = pendingWrite.then(operation);
  pendingWrite = result.catch(() => {});
  return result;
}

export function emptyStats(): AllStats {
  const modes = Object.fromEntries(Object.keys(modeNames).map(mode => [mode, { totalAttempted: 0, totalCorrect: 0 }])) as Record<ExerciseMode, ModeStats>;
  return { ...modes, sessions: [] };
}
const defaultStats = emptyStats();

async function readStats(): Promise<AllStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  if (!raw) return JSON.parse(JSON.stringify(defaultStats));
  try {
    const parsed = JSON.parse(raw);
    return { ...JSON.parse(JSON.stringify(defaultStats)), ...parsed };
  } catch {
    return JSON.parse(JSON.stringify(defaultStats));
  }
}

export async function getStats(): Promise<AllStats> {
  await pendingWrite;
  return readStats();
}

export async function recordAnswer(
  mode: ExerciseMode,
  correct: boolean
): Promise<void> {
  return writeInOrder(async () => {
    const stats = await readStats();
    stats[mode].totalAttempted += 1;
    if (correct) stats[mode].totalCorrect += 1;
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  });
}

export async function recordSession(session: SessionStats): Promise<void> {
  return writeInOrder(async () => {
    const stats = await readStats();
    stats.sessions.unshift(session);
    if (stats.sessions.length > 20) {
      stats.sessions = stats.sessions.slice(0, 20);
    }
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  });
}

const QUESTION_STATS_KEY = "doiti_question_stats";

export async function resetStats(): Promise<void> {
  return writeInOrder(async () => {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
    await AsyncStorage.removeItem(QUESTION_STATS_KEY);
  });
}

export function getAccuracy(mode: ModeStats): number {
  if (mode.totalAttempted === 0) return 0;
  return Math.round((mode.totalCorrect / mode.totalAttempted) * 100);
}

async function readQuestionStats(): Promise<QuestionStatsMap> {
  const raw = await AsyncStorage.getItem(QUESTION_STATS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function getQuestionStats(): Promise<QuestionStatsMap> {
  await pendingWrite;
  return readQuestionStats();
}

export async function recordQuestionAnswer(
  questionId: string,
  correct: boolean
): Promise<void> {
  return writeInOrder(async () => {
    const stats = await readQuestionStats();
    const existing = stats[questionId] || { attempts: 0, correct: 0, lastSeen: "" };
    existing.attempts += 1;
    if (correct) existing.correct += 1;
    existing.lastSeen = new Date().toISOString();
    stats[questionId] = existing;
    await AsyncStorage.setItem(QUESTION_STATS_KEY, JSON.stringify(stats));
  });
}
