import { sdsLevels, type ReceptiveSkill, type ReceptiveTask, type SdsLevel, type SdsModule, type WritingTask } from "./types";

// The handbook publishes the adaptive rules but not the cut scores ("Grenzwert").
// 60 % is this app's own estimate.
export const CUT_SCORE = 0.6;

export type TaskOutcome = "perfect" | "pass" | "fail";
export function outcomeOf(correct: number, total: number): TaskOutcome {
  if (total > 0 && correct === total) return "perfect";
  return total > 0 && correct / total >= CUT_SCORE ? "pass" : "fail";
}

/** Progress of one receptive skill (Testhandbuch 7.3). */
export interface SkillState {
  /** Index into sdsLevels of the level currently being tested. */
  level: number;
  /** Outcome of the first task at this level, once a second task is due. */
  first: TaskOutcome | null;
  done: boolean;
  /** Highest confirmed level, or null while nothing is confirmed. */
  achieved: SdsLevel | null;
}
export const newSkill = (): SkillState => ({ level: 0, first: null, done: false, achieved: null });

/**
 * 100 % → next level. Cut score reached → second task, which must reach the cut score again.
 * Cut score missed → second task, which must be 100 %. Otherwise the skill closes at the last confirmed level.
 */
export function advanceSkill(state: SkillState, outcome: TaskOutcome): SkillState {
  if (state.done) return state;
  const confirmed = state.first === null ? outcome === "perfect"
    : state.first === "pass" ? outcome !== "fail" : outcome === "perfect";
  if (confirmed) {
    const achieved = sdsLevels[state.level];
    const last = state.level === sdsLevels.length - 1;
    return { level: last ? state.level : state.level + 1, first: null, done: last, achieved };
  }
  if (state.first === null) return { ...state, first: outcome };
  return { ...state, first: null, done: true };
}

export const moduleSkills: Record<SdsModule, { lesen: boolean; hoeren: boolean; schreiben: boolean; sprechen: boolean }> = {
  full: { lesen: true, hoeren: true, schreiben: true, sprechen: true },
  written: { lesen: true, hoeren: false, schreiben: true, sprechen: false },
  oral: { lesen: false, hoeren: true, schreiben: false, sprechen: true },
  speaking: { lesen: false, hoeren: false, schreiben: false, sprechen: true },
  writing: { lesen: false, hoeren: false, schreiben: true, sprechen: false },
};
/** Minutes on the tablet, without the interview (Testhandbuch 7.6). */
export const moduleMinutes: Record<SdsModule, number> = { full: 150, written: 105, oral: 45, speaking: 0, writing: 60 };

export interface WritingAnswer { taskId: string; level: SdsLevel; text: string }
export interface TabletState {
  module: SdsModule;
  lesen: SkillState;
  hoeren: SkillState;
  /** Level index of the round in progress: Lesen, then one Schreiben task, then Hören. */
  round: number;
  /** Whether this round's writing task has been handed out. */
  wroteThisRound: boolean;
  writingClosed: boolean;
  writing: WritingAnswer[];
  usedTasks: string[];
}
export function newTablet(module: SdsModule): TabletState {
  const skills = moduleSkills[module];
  const closed = (): SkillState => ({ ...newSkill(), done: true });
  return {
    module, round: 0, wroteThisRound: false, writingClosed: !skills.schreiben, writing: [], usedTasks: [],
    lesen: skills.lesen ? newSkill() : closed(), hoeren: skills.hoeren ? newSkill() : closed(),
  };
}

export type TabletStep =
  | { kind: "receptive"; skill: ReceptiveSkill; level: SdsLevel }
  | { kind: "writing"; level: SdsLevel }
  | { kind: "finished" };

const active = (skill: SkillState, round: number) => !skill.done && skill.level === round;

/** What the tablet shows next. Pure: call `skipEmptyRounds` first when a round may be exhausted. */
export function nextStep(state: TabletState): TabletStep {
  const s = skipEmptyRounds(state);
  if (s.round >= sdsLevels.length) return { kind: "finished" };
  const level = sdsLevels[s.round];
  if (active(s.lesen, s.round)) return { kind: "receptive", skill: "lesen", level };
  if (!s.writingClosed && !s.wroteThisRound) return { kind: "writing", level };
  if (active(s.hoeren, s.round)) return { kind: "receptive", skill: "hoeren", level };
  return { kind: "finished" };
}

/** Moves to the next level once nothing is left to do at the current one. */
export function skipEmptyRounds(state: TabletState): TabletState {
  let s = state;
  while (s.round < sdsLevels.length) {
    const writingDue = !s.writingClosed && !s.wroteThisRound;
    if (active(s.lesen, s.round) || active(s.hoeren, s.round) || writingDue) return s;
    const receptiveAhead = [s.lesen, s.hoeren].some(skill => !skill.done && skill.level > s.round);
    // Writing has one task per level and is never stopped automatically: only the candidate closes it.
    const writingAhead = !s.writingClosed && moduleSkills[s.module].schreiben;
    if (!receptiveAhead && !writingAhead) return { ...s, round: sdsLevels.length };
    s = { ...s, round: s.round + 1, wroteThisRound: false };
  }
  return s;
}

export function recordReceptive(state: TabletState, skill: ReceptiveSkill, taskId: string, outcome: TaskOutcome): TabletState {
  const s = skipEmptyRounds(state);
  // A task counts once, however often its answer is submitted.
  if (s.usedTasks.includes(taskId)) return s;
  return skipEmptyRounds({ ...s, [skill]: advanceSkill(s[skill], outcome), usedTasks: [...s.usedTasks, taskId] });
}
/** `text === null` means the candidate stops writing here ("an die eigene Leistungsgrenze"). */
export function recordWriting(state: TabletState, task: WritingTask, text: string | null): TabletState {
  const s = skipEmptyRounds(state);
  if (s.usedTasks.includes(task.id) || s.writingClosed) return s;
  const next = text === null
    ? { ...s, writingClosed: true }
    : { ...s, wroteThisRound: true, writing: [...s.writing, { taskId: task.id, level: task.level, text }], usedTasks: [...s.usedTasks, task.id] };
  return skipEmptyRounds(next);
}
/** Time is up: everything closes at what has been confirmed so far. */
export function closeTablet(state: TabletState): TabletState {
  return { ...state, round: sdsLevels.length, writingClosed: true, lesen: { ...state.lesen, done: true }, hoeren: { ...state.hoeren, done: true } };
}

/** Picks an unused task for a skill and level; `random` is injectable for tests. */
export function pickTask<T extends { id: string; level: SdsLevel }>(pool: T[], level: SdsLevel, used: string[], random: () => number = Math.random): T | null {
  const atLevel = pool.filter(task => task.level === level);
  const fresh = atLevel.filter(task => !used.includes(task.id));
  const from = fresh.length ? fresh : atLevel;
  return from.length ? from[Math.floor(random() * from.length)] : null;
}

export function scoreReceptive(task: ReceptiveTask, answers: (number | null)[]): { correct: number; total: number; outcome: TaskOutcome } {
  const correct = task.items.filter((item, i) => answers[i] === item.answer).length;
  return { correct, total: task.items.length, outcome: outcomeOf(correct, task.items.length) };
}

/** Writing is rated top-down: the highest level whose task reached the mark counts (Testhandbuch 7.5). */
export function writingLevel(ratings: { level: SdsLevel; reached: boolean }[]): SdsLevel | null {
  const reached = ratings.filter(r => r.reached).map(r => sdsLevels.indexOf(r.level));
  return reached.length ? sdsLevels[Math.max(...reached)] : null;
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
