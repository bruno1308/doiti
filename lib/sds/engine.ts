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

/** Quick practice: one task per level decides. Cut score reached → next level, otherwise the skill closes. */
export function advanceQuick(state: SkillState, outcome: TaskOutcome): SkillState {
  if (state.done) return state;
  if (outcome === "fail") return { ...state, first: null, done: true };
  const last = state.level === sdsLevels.length - 1;
  return { level: last ? state.level : state.level + 1, first: null, done: last, achieved: sdsLevels[state.level] };
}

export interface ModuleSkills { lesen: boolean; hoeren: boolean; schreiben: boolean; sprechen: boolean }
const whole: ModuleSkills = { lesen: true, hoeren: true, schreiben: true, sprechen: true };
const writtenPart: ModuleSkills = { lesen: true, hoeren: false, schreiben: true, sprechen: false };
const oralPart: ModuleSkills = { lesen: false, hoeren: true, schreiben: false, sprechen: true };
export const moduleSkills: Record<SdsModule, ModuleSkills> = {
  full: whole, written: writtenPart, oral: oralPart, "full-quick": whole, "written-quick": writtenPart, "oral-quick": oralPart,
};
/** Results saved before the single-skill modules were removed still name them. */
const retiredSkills: Record<string, ModuleSkills> = {
  speaking: { lesen: false, hoeren: false, schreiben: false, sprechen: true },
  writing: { lesen: false, hoeren: false, schreiben: true, sprechen: false },
};
export const skillsOf = (module: string): ModuleSkills => (moduleSkills as Record<string, ModuleSkills>)[module] ?? retiredSkills[module] ?? whole;
export const isQuick = (module: SdsModule): boolean => module.endsWith("-quick");
/** Minutes on the tablet, without the interview (Testhandbuch 7.6). The quick variants get a quarter of that. */
export const moduleMinutes: Record<SdsModule, number> = { full: 150, written: 105, oral: 45, "full-quick": 38, "written-quick": 26, "oral-quick": 11 };

export interface WritingAnswer { taskId: string; level: SdsLevel; text: string }
export interface TabletState {
  module: SdsModule;
  lesen: SkillState;
  hoeren: SkillState;
  /** Level index of the round in progress: Lesen, then one Schreiben task, then Hören. Unused in the quick variants. */
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

/**
 * Quick variants: every reading level in a row, then a single writing task at the level where reading stopped,
 * then every listening level in a row.
 */
function nextQuickStep(s: TabletState): TabletStep {
  if (!s.lesen.done) return { kind: "receptive", skill: "lesen", level: sdsLevels[s.lesen.level] };
  if (!s.writingClosed) return { kind: "writing", level: sdsLevels[s.lesen.level] };
  if (!s.hoeren.done) return { kind: "receptive", skill: "hoeren", level: sdsLevels[s.hoeren.level] };
  return { kind: "finished" };
}

/** What the tablet shows next. Pure: call `skipEmptyRounds` first when a round may be exhausted. */
export function nextStep(state: TabletState): TabletStep {
  if (isQuick(state.module)) return nextQuickStep(state);
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
  if (isQuick(state.module)) return state;
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
  const advance = isQuick(s.module) ? advanceQuick : advanceSkill;
  return skipEmptyRounds({ ...s, [skill]: advance(s[skill], outcome), usedTasks: [...s.usedTasks, taskId] });
}
/** `text === null` means the candidate stops writing here ("an die eigene Leistungsgrenze"). */
export function recordWriting(state: TabletState, task: WritingTask, text: string | null): TabletState {
  const s = skipEmptyRounds(state);
  if (s.usedTasks.includes(task.id) || s.writingClosed) return s;
  // The quick variants have a single writing task, so writing closes whether or not it was answered.
  const next = text === null
    ? { ...s, writingClosed: true }
    : isQuick(s.module)
    ? { ...s, writingClosed: true, writing: [...s.writing, { taskId: task.id, level: task.level, text }], usedTasks: [...s.usedTasks, task.id] }
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
