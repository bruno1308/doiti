// SDS (Schweizerischer Digitaler Sprachtest) simulation types.
// Structure follows the public Testhandbuch (06.10.2023); every item is original.

export const sdsLevels = ["preA1", "A1", "A2", "B1", "B2"] as const;
export type SdsLevel = (typeof sdsLevels)[number];
export const levelLabels: Record<SdsLevel, string> = { preA1: "vor A1", A1: "A1", A2: "A2", B1: "B1", B2: "B2" };

export type ReceptiveSkill = "lesen" | "hoeren";
export type SdsSkill = ReceptiveSkill | "schreiben" | "sprechen";
export const skillLabels: Record<SdsSkill, string> = { lesen: "Lesen", hoeren: "Hören", schreiben: "Schreiben", sprechen: "Sprechen" };

export const sdsDomains = ["Arbeit", "Arbeitssuche", "Behörden", "Einkäufe", "Gesundheit", "Kinder", "Medien und Freizeit", "Post, Bank und Versicherungen", "Verkehr", "Wohnumgebung"] as const;
export type SdsDomain = (typeof sdsDomains)[number];

/** A tappable answer. `emoji` stands in for the pictograms of the real test. */
export interface SdsOption { label: string; emoji?: string }
export interface SdsItem {
  /** Statement, question or word the options belong to. For Hören picture items this may be just "Linie 1". */
  prompt: string;
  options: SdsOption[];
  /** Index into `options`. */
  answer: number;
}

interface ReceptiveBase {
  id: string;
  level: SdsLevel;
  domain: SdsDomain;
  /** German instruction, as shown in the test. */
  instruction: string;
  items: SdsItem[];
}
export interface LesenTask extends ReceptiveBase {
  skill: "lesen";
  /** Reading passage; absent for word-picture matching. */
  title?: string;
  text?: string;
}
export interface HoerenLine { speaker?: string; text: string }
export interface HoerenTask extends ReceptiveBase {
  skill: "hoeren";
  /** Spoken by the device's German voice; never shown before the task is finished. */
  script: HoerenLine[];
  /** How often the recording may be played. */
  plays: 1 | 2;
}
export type ReceptiveTask = LesenTask | HoerenTask;

export type WritingKind = "form" | "sms" | "email" | "essay";
export interface WritingTask {
  id: string;
  level: SdsLevel;
  domain: SdsDomain;
  kind: WritingKind;
  /** Situation in German. */
  situation: string;
  /** Message the candidate replies to (SMS / email tasks). */
  incoming?: { from: string; text: string };
  /** Points that must be covered; all of them count for task fulfilment. */
  points: string[];
  /** Field labels for the pre-A1 form. */
  fields?: string[];
  minWords: number;
  modelAnswer: string;
}

export interface SpeakingTask {
  id: string;
  level: SdsLevel;
  /** What the examiner says. */
  prompt: string;
  /** Typical follow-up questions. */
  followUps: string[];
  /** B2 only: seconds of silent preparation. */
  prepSeconds?: number;
}

export type SdsModule = "full" | "written" | "oral" | "speaking" | "writing";
