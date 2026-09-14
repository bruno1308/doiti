import type { SkillDefinition } from "../data/progress-catalog";
import type { PracticePreferences } from "./practice-preferences";
import type { QuestionStatsMap } from "./types";
import { isFamiliar, needsReview } from "./question-progress";

export type SkillStatus = "New" | "Building" | "Comfortable" | "Needs another look";
export function describeSkill(skill: SkillDefinition, stats: QuestionStatsMap) {
  const seen = skill.questions.filter(q => stats[q.id]?.attempts > 0);
  const familiar = seen.filter(q => isFamiliar(stats[q.id])).length;
  const review = seen.filter(q => needsReview(stats[q.id])).length;
  const attempts = seen.reduce((sum, q) => sum + stats[q.id].attempts, 0);
  const status: SkillStatus = !seen.length ? "New" : review >= 2 ? "Needs another look"
    : seen.length >= 5 && attempts >= 15 && familiar / seen.length >= 0.6 && !review ? "Comfortable" : "Building";
  return { ...skill, seen: seen.length, familiar, review, status };
}

export function recommendPractice(skills: SkillDefinition[], stats: QuestionStatsMap, preferences: PracticePreferences, now = new Date()) {
  const candidates = skills.filter(skill => skill.id !== "conversation").map(skill => {
    const eligible = skill.questions.filter(q => q.kind && preferences.kinds.includes(q.kind));
    const review = eligible.filter(q => needsReview(stats[q.id]));
    const seen = eligible.filter(q => stats[q.id]?.attempts > 0);
    const latest = seen.reduce((time, q) => Math.max(time, Date.parse(stats[q.id].lastSeen) || 0), 0);
    return { skill, eligible, review, seen, latest };
  }).filter(item => item.eligible.length);
  const revisit = [...candidates].filter(item => item.review.length).sort((a, b) => b.review.length - a.review.length || b.latest - a.latest)[0];
  if (revisit) return {
    mode: revisit.skill.id, title: revisit.skill.title, focus: "review" as const,
    label: "A LITTLE COMEBACK", reason: `${revisit.review.length} ${revisit.review.length === 1 ? "card is" : "cards are"} ready for another try. Revisit those first, then keep exploring.`,
    count: Math.min(preferences.count, revisit.eligible.length),
  };
  const refresh = [...candidates].filter(item => item.seen.length >= 5 && now.getTime() - item.latest >= 7 * 86400000).sort((a, b) => a.latest - b.latest)[0];
  if (refresh) return { mode: refresh.skill.id, title: refresh.skill.title, focus: "mixed" as const, label: "KEEP IT FRESH", reason: "It’s been a little while. A short round will help keep these cards familiar.", count: Math.min(preferences.count, refresh.eligible.length) };
  const next = [...candidates].filter(item => item.seen.length > 0 && item.seen.length < item.eligible.length).sort((a, b) => b.latest - a.latest)[0]
    ?? candidates.find(item => !item.seen.length) ?? candidates[0];
  if (!next) return null;
  return { mode: next.skill.id, title: next.skill.title, focus: "mixed" as const, label: next.seen.length ? "KEEP THE MOMENTUM" : "YOUR NEXT DISCOVERY", reason: next.seen.length ? "Build on what you’ve started. Your deck will favour cards you haven’t seen yet." : "A fresh skill to explore. Your first answers will help us pick your next challenge.", count: Math.min(preferences.count, next.eligible.length) };
}
