import type { TranscriptTurn } from "../report";
import type { Microphone, Speaker, VoiceAudio } from "./audio-types";
import { LiveSession, type LiveConfig, type LiveToolCall } from "./liveClient";

export type VoiceStatus = "connecting" | "speaking" | "listening" | "paused" | "ended";
export interface ConversationEvents {
  onStatus(status: VoiceStatus): void;
  onTranscript(turns: TranscriptTurn[]): void;
  /** Return the tool response; the conversation stays paused until the promise settles. */
  onTool(call: LiveToolCall): Promise<Record<string, unknown>>;
  onError(message: string): void;
}

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

/** One live spoken conversation: microphone in, model voice out, transcript kept. */
export class VoiceConversation {
  private session: LiveSession | null = null;
  private mic: Microphone | null = null;
  private speaker: Speaker | null = null;
  private turns: TranscriptTurn[] = [];
  private startedAt = 0;
  private status: VoiceStatus = "connecting";
  private ended = false;
  private pauses = 0;

  constructor(private readonly audio: VoiceAudio, private readonly events: ConversationEvents) {}

  get transcript(): TranscriptTurn[] { return this.turns; }
  get elapsedMs(): number { return this.startedAt ? Date.now() - this.startedAt : 0; }

  /** Call from a tap. Opens the microphone first so a refused permission fails before any cost. */
  async start(config: Omit<LiveConfig, "token" | "model">, getToken: () => Promise<{ token: string; model: string }>, firstMessage: string): Promise<void> {
    this.speaker = this.audio.openSpeaker();
    this.mic = await this.audio.openMicrophone(chunk => { if (this.status !== "paused") this.session?.sendAudio(chunk); });
    if (this.ended) { this.release(); return; }
    const { token, model } = await getToken();
    if (this.ended) { this.release(); return; }
    this.session = new LiveSession({ ...config, token, model }, {
      onReady: () => { this.startedAt = Date.now(); this.session?.sendText(firstMessage); this.setStatus("listening"); },
      onAudio: base64 => { if (this.status === "paused") return; this.speaker?.play(base64); this.setStatus("speaking"); },
      onInterrupted: () => { this.speaker?.flush(); if (this.status === "speaking") this.setStatus("listening"); },
      onInputText: text => this.add("candidate", text),
      onOutputText: text => this.add("examiner", text),
      onTurnComplete: () => { void this.speaker?.drained().then(() => { if (this.status === "speaking") this.setStatus("listening"); }); },
      onToolCall: call => { void this.handleTool(call); },
      onError: message => { if (!this.ended) { this.end(); this.events.onError(message); } },
    });
    this.session.connect();
  }

  private add(role: TranscriptTurn["role"], text: string) {
    if (this.ended) return;
    this.turns = appendFragment(this.turns, role, text, this.elapsedMs);
    this.events.onTranscript(this.turns);
  }
  private setStatus(status: VoiceStatus) {
    if (this.ended || this.status === status) return;
    this.status = status;
    this.events.onStatus(status);
  }

  private async handleTool(call: LiveToolCall) {
    // Let the model finish what it was saying, then hold the microphone while the app handles the call.
    await this.speaker?.drained();
    if (this.ended) return;
    this.pauses++;
    this.mic?.setMuted(true); this.session?.pauseAudio(); this.setStatus("paused");
    let response: Record<string, unknown>;
    try { response = await this.events.onTool(call); } catch { response = { result: "ok" }; }
    if (this.ended) return;
    if (--this.pauses === 0) { this.mic?.setMuted(false); this.setStatus("listening"); }
    this.session?.respondToTool(call, response);
  }

  /** Sends an instruction from the app (for example that time is up). */
  notify(text: string): void { this.session?.sendText(text); }

  private release() {
    this.session?.close(); this.mic?.stop(); this.speaker?.stop();
    this.session = null; this.mic = null; this.speaker = null;
  }
  end(): void {
    if (this.ended) return;
    this.ended = true; this.status = "ended";
    this.release();
    this.events.onStatus("ended");
  }
}
