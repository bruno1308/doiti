import type { TranscriptTurn } from "../report";
import { createGeminiLink } from "./geminiLink";
import type { LinkHandlers, ToolCall, VoiceLink, VoiceProvider, VoiceTool } from "./link";
import { createOpenAiLink } from "./openaiLink";

export type VoiceStatus = "connecting" | "speaking" | "listening" | "paused" | "ended";
export interface ConversationEvents {
  onStatus(status: VoiceStatus): void;
  onTranscript(turns: TranscriptTurn[]): void;
  /** Return the tool response; the conversation stays paused until the promise settles. */
  onTool(call: ToolCall): Promise<Record<string, unknown>>;
  onError(message: string): void;
}
export interface ConversationConfig {
  systemInstruction: string;
  tools: VoiceTool[];
  /** Voice name per provider. */
  voices: Record<VoiceProvider, string>;
  language?: string;
}
export interface VoiceToken { provider: VoiceProvider; token: string; model: string }

/** Appends a transcription fragment, starting a new turn when the speaker changes. */
export function appendFragment(turns: TranscriptTurn[], role: TranscriptTurn["role"], text: string, now: number): TranscriptTurn[] {
  const last = turns[turns.length - 1];
  const previous = turns[turns.length - 2];
  // Transcriptions can trail the audio: a late fragment belongs to the turn before a reply that has only just begun.
  const late = last && last.role !== role && previous?.role === role && now - last.startMs < 1500;
  const target = last?.role === role ? last : late ? previous : null;
  if (!target) return [...turns, { role, text: text.trimStart(), startMs: now, endMs: now }];
  return turns.map(turn => turn === target ? { ...turn, text: turn.text + text, endMs: now } : turn);
}

/** Inserts a whole turn where it was spoken: its transcript can arrive after the reply to it has begun. */
export function insertTurn(turns: TranscriptTurn[], turn: TranscriptTurn): TranscriptTurn[] {
  let index = turns.length;
  while (index > 0 && turns[index - 1].startMs > turn.startMs) index--;
  return [...turns.slice(0, index), turn, ...turns.slice(index)];
}

type LinkFactory = (provider: VoiceProvider) => typeof createOpenAiLink;
const defaultFactory: LinkFactory = provider => provider === "gemini" ? createGeminiLink : createOpenAiLink;

/** One live spoken conversation: microphone in, model voice out, transcript kept. */
export class VoiceConversation {
  private link: VoiceLink | null = null;
  private turns: TranscriptTurn[] = [];
  private startedAt = 0;
  private status: VoiceStatus = "connecting";
  private ended = false;
  private pauses = 0;

  constructor(private readonly events: ConversationEvents, private readonly factory: LinkFactory = defaultFactory) {}

  get transcript(): TranscriptTurn[] { return this.turns; }
  get elapsedMs(): number { return this.startedAt ? Date.now() - this.startedAt : 0; }

  /** Call from a tap, so the browser allows audio and asks for the microphone. */
  async start(config: ConversationConfig, getToken: () => Promise<VoiceToken>, firstMessage: string): Promise<void> {
    const { provider, token, model } = await getToken();
    if (this.ended) return;
    const handlers: LinkHandlers = {
      onReady: () => { if (this.ended) return; this.startedAt = Date.now(); this.link?.notify(firstMessage); this.setStatus("listening"); },
      onSpeaking: speaking => { if (this.status !== "paused") this.setStatus(speaking ? "speaking" : "listening"); },
      onOutputText: (text, fresh) => this.update(fresh
        ? [...this.turns, { role: "examiner", text: text.trimStart(), startMs: this.elapsedMs, endMs: this.elapsedMs }]
        : appendFragment(this.turns, "examiner", text, this.elapsedMs)),
      onInputText: text => this.update(appendFragment(this.turns, "candidate", text, this.elapsedMs)),
      onInputTurn: (text, startedAt, endedAt) => this.update(insertTurn(this.turns, { role: "candidate", text, startMs: Math.max(0, startedAt - this.startedAt), endMs: Math.max(0, endedAt - this.startedAt) })),
      onToolCall: call => { void this.handleTool(call); },
      onError: message => { if (!this.ended) { this.end(); this.events.onError(message); } },
    };
    const link = this.factory(provider)({ token, model, systemInstruction: config.systemInstruction, tools: config.tools, voice: config.voices[provider], language: config.language }, handlers);
    this.link = link;
    try { await link.start(); }
    catch (error) { link.close(); if (this.link === link) this.link = null; throw error; }
    if (this.ended) link.close();
  }

  private update(turns: TranscriptTurn[]) {
    if (this.ended || !this.startedAt) return;
    this.turns = turns;
    this.events.onTranscript(turns);
  }
  private setStatus(status: VoiceStatus) {
    if (this.ended || this.status === status) return;
    this.status = status;
    this.events.onStatus(status);
  }

  private async handleTool(call: ToolCall) {
    // Let the model finish what it was saying, then hold the microphone while the app handles the call.
    await this.link?.drained();
    if (this.ended) return;
    this.pauses++;
    this.link?.setMuted(true); this.setStatus("paused");
    let response: Record<string, unknown>;
    try { response = await this.events.onTool(call); } catch { response = { result: "ok" }; }
    if (this.ended) return;
    if (--this.pauses === 0) { this.link?.setMuted(false); this.setStatus("listening"); }
    this.link?.respondToTool(call, response);
  }

  /** Sends an instruction from the app (for example that time is up). */
  notify(text: string): void { this.link?.notify(text); }

  end(): void {
    if (this.ended) return;
    this.ended = true; this.status = "ended";
    this.link?.close(); this.link = null;
    this.events.onStatus("ended");
  }
}
