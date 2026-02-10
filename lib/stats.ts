import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllStats, ExerciseMode, ModeStats, SessionStats } from "./types";

const STATS_KEY = "doiti_stats";

const defaultStats: AllStats = {
  gender: { totalAttempted: 0, totalCorrect: 0 },
  adjectives: { totalAttempted: 0, totalCorrect: 0 },
  cases: { totalAttempted: 0, totalCorrect: 0 },
  possessives: { totalAttempted: 0, totalCorrect: 0 },
  articles: { totalAttempted: 0, totalCorrect: 0 },
  pronouns: { totalAttempted: 0, totalCorrect: 0 },
  praeteritum: { totalAttempted: 0, totalCorrect: 0 },
  perfekt: { totalAttempted: 0, totalCorrect: 0 },
  sessions: [],
};

export async function getStats(): Promise<AllStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  if (!raw) return JSON.parse(JSON.stringify(defaultStats));
  try {
    const parsed = JSON.parse(raw);
    return { ...JSON.parse(JSON.stringify(defaultStats)), ...parsed };
  } catch {
    return JSON.parse(JSON.stringify(defaultStats));
  }
}

export async function recordAnswer(
  mode: ExerciseMode,
  correct: boolean
): Promise<void> {
  const stats = await getStats();
  stats[mode].totalAttempted += 1;
  if (correct) stats[mode].totalCorrect += 1;
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export async function recordSession(session: SessionStats): Promise<void> {
  const stats = await getStats();
  stats.sessions.unshift(session);
  if (stats.sessions.length > 20) {
    stats.sessions = stats.sessions.slice(0, 20);
  }
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export async function resetStats(): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
}

export function getAccuracy(mode: ModeStats): number {
  if (mode.totalAttempted === 0) return 0;
  return Math.round((mode.totalCorrect / mode.totalAttempted) * 100);
}
