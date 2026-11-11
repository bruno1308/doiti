import type { SdsLevel, SdsModule } from "./types";

export type FeedbackLanguage = "en" | "de";
export interface Criterion { met: boolean; comment: string }
export interface Correction { said: string; better: string; why: string }

/** Speaking is rated on four criteria; a level needs the task fulfilled and 3 of 4 met (Testhandbuch 7.4). */
export interface SpeakingReport {
  level: SdsLevel | null;
  summary: string;
  taskFulfilment: { level: SdsLevel; task: string; fulfilled: boolean; comment: string }[];
  criteria: { wortschatz: Criterion; korrektheit: Criterion; fluessigkeit: Criterion; kohaerenz: Criterion };
  strengths: string[];
  corrections: Correction[];
  priorities: { title: string; advice: string; example: string }[];
  nextLevel: string;
}

/** Writing from A2 up needs the task fulfilled and 2 of 3 criteria met (Testhandbuch 7.5). */
export interface WritingTaskReport {
  taskId: string;
  level: SdsLevel;
  reached: boolean;
  taskFulfilled: boolean;
  missingPoints: string[];
  criteria: { kohaerenz: Criterion; wortschatz: Criterion; korrektheit: Criterion };
  corrections: Correction[];
  comment: string;
}
export interface WritingReport { level: SdsLevel | null; summary: string; tasks: WritingTaskReport[]; priorities: string[] }

export interface TranscriptTurn { role: "examiner" | "candidate"; text: string; startMs: number; endMs: number }
/** What the examiner model noted from the audio when it closed the interview. */
export interface ExaminerNotes {
  level: string;
  tasks: { level: string; fulfilled: boolean; note: string }[];
  heardErrors: string[];
  fluency: string;
  notes: string;
}

export interface SdsResult {
  id: string;
  date: string;
  module: SdsModule;
  lesen?: SdsLevel | null;
  hoeren?: SdsLevel | null;
  schreiben?: SdsLevel | null;
  sprechen?: SdsLevel | null;
  /** How the productive skills were rated. */
  schreibenBy?: "ai" | "self";
  receptive?: { correct: number; total: number };
  speaking?: SpeakingReport;
  writing?: WritingReport;
}
