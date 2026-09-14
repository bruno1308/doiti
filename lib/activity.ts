import type { DailyActivity, SessionStats } from "./types";

export function localDay(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Recover only dates supported by the old session log. Future activity is
// recorded per answer, independently of the rolling 20-session list.
export function activityFromSessions(sessions: SessionStats[]): DailyActivity {
  const activity: DailyActivity = {};
  for (const session of sessions) {
    const date = new Date(session.date);
    if (!Number.isFinite(date.getTime()) || session.total <= 0) continue;
    const key = localDay(date);
    const day = activity[key] ?? { attempts: 0, correct: 0 };
    day.attempts += session.total;
    day.correct += session.correct;
    activity[key] = day;
  }
  return activity;
}

export function weekTrail(activity: DailyActivity, now = new Date()) {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  const today = localDay(now);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + i);
    const key = localDay(date);
    return { key, label: ["M", "T", "W", "T", "F", "S", "S"][i], date, today: key === today, future: key > today, attempts: key > today ? 0 : activity[key]?.attempts ?? 0 };
  });
}
