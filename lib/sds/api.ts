import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ExaminerNotes, FeedbackLanguage, SdsResult, SpeakingReport, TranscriptTurn, WritingReport } from "./report";
import type { SdsLevel } from "./types";

const SERVER_KEY = "doiti_sds_server";
const RESULTS_KEY = "doiti_sds_results";

export interface SdsServer { url: string; code: string }
const envUrl = (process.env.EXPO_PUBLIC_SDS_API_URL ?? "").trim();

export function normalizeServer(value: unknown): SdsServer {
  const raw = (value && typeof value === "object" ? value : {}) as Partial<SdsServer>;
  const url = typeof raw.url === "string" && raw.url.trim() ? raw.url.trim().replace(/\/+$/, "") : envUrl.replace(/\/+$/, "");
  return { url, code: typeof raw.code === "string" ? raw.code.trim() : "" };
}
// The access code travels in a header, so plain http is only accepted for a server on this machine.
export const serverReady = (server: SdsServer) => /^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:|\/|$))/.test(server.url) && server.code.length > 0;

export async function getSdsServer(): Promise<SdsServer> {
  try { return normalizeServer(JSON.parse((await AsyncStorage.getItem(SERVER_KEY)) ?? "{}")); }
  catch { return normalizeServer({}); }
}
export async function saveSdsServer(server: SdsServer): Promise<void> {
  await AsyncStorage.setItem(SERVER_KEY, JSON.stringify(normalizeServer(server)));
}

export class SdsApiError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}
async function post<T>(server: SdsServer, path: string, body: unknown, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${server.url}/api/${path}`, {
      method: "POST", signal: controller.signal,
      headers: { "content-type": "application/json", "x-doiti-access-code": server.code },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) throw new SdsApiError(data?.error ?? `Server answered ${response.status}`, response.status);
    return data as T;
  } catch (error) {
    if (error instanceof SdsApiError) throw error;
    throw new SdsApiError(controller.signal.aborted ? "The server took too long to answer." : "Could not reach the server.", 0);
  } finally { clearTimeout(timer); }
}

export interface LiveToken { provider: "openai" | "gemini"; token: string; model: string }
export const fetchLiveToken = (server: SdsServer) => post<LiveToken>(server, "token", {}, 20_000);

export interface SpeakingGradeRequest {
  feedbackLanguage: FeedbackLanguage;
  transcript: TranscriptTurn[];
  examinerNotes: ExaminerNotes | null;
  tasks: { level: SdsLevel; prompt: string }[];
}
export const gradeSpeaking = (server: SdsServer, body: SpeakingGradeRequest) => post<SpeakingReport>(server, "grade-speaking", body, 280_000);

export interface WritingGradeRequest {
  feedbackLanguage: FeedbackLanguage;
  answers: { taskId: string; level: SdsLevel; kind: string; situation: string; incoming?: string; points: string[]; minWords: number; text: string }[];
}
export const gradeWriting = (server: SdsServer, body: WritingGradeRequest) => post<WritingReport>(server, "grade-writing", body, 280_000);

export async function getSdsResults(): Promise<SdsResult[]> {
  try {
    const parsed = JSON.parse((await AsyncStorage.getItem(RESULTS_KEY)) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
export async function saveSdsResult(result: SdsResult): Promise<void> {
  const rest = (await getSdsResults()).filter(item => item.id !== result.id);
  await AsyncStorage.setItem(RESULTS_KEY, JSON.stringify([result, ...rest].slice(0, 15)));
}
