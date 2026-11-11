// Minimal Gemini Live API client over a raw WebSocket (v1beta, camelCase JSON frames).
// The browser never sees the API key: it connects with a short-lived token from the app's server.

const LIVE_URL = process.env.EXPO_PUBLIC_SDS_LIVE_URL?.trim()
  || "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained";

import type { ToolCall } from "./link";

export type LiveToolCall = ToolCall;
export interface LiveHandlers {
  onReady(): void;
  /** Base64 16-bit little-endian PCM at 24 kHz. */
  onAudio(base64: string): void;
  /** The candidate started speaking over the model: stop playback at once. */
  onInterrupted(): void;
  onInputText(text: string): void;
  onOutputText(text: string): void;
  onTurnComplete(): void;
  onToolCall(call: LiveToolCall): void;
  /** Fatal: the session cannot continue. */
  onError(message: string): void;
}
export interface LiveConfig {
  token: string;
  model: string;
  systemInstruction: string;
  tools?: unknown[];
  voice?: string;
}

const MAX_RECONNECTS = 4;

export class LiveSession {
  private socket: WebSocket | null = null;
  private handle: string | null = null;
  private ready = false;
  private closed = false;
  private reconnects = 0;
  private started = false;
  private rollover: ReturnType<typeof setTimeout> | null = null;
  /** Text and tool responses that must not be lost while the connection is being replaced. */
  private pending: unknown[] = [];

  constructor(private readonly config: LiveConfig, private readonly handlers: LiveHandlers) {}

  connect(): void {
    if (this.closed) return;
    this.ready = false;
    const socket = new WebSocket(`${LIVE_URL}?access_token=${encodeURIComponent(this.config.token)}`);
    this.socket = socket;
    socket.onopen = () => socket.send(JSON.stringify({ setup: this.setup() }));
    socket.onmessage = event => { void this.receive(socket, event.data); };
    socket.onerror = () => {};
    socket.onclose = () => {
      if (this.socket !== socket || this.closed) return;
      // Connections last about ten minutes; the session carries on with its resumption handle.
      if (this.handle && this.reconnects < MAX_RECONNECTS) { this.reconnects++; this.connect(); }
      else { this.closed = true; this.handlers.onError(this.started ? "The connection to the examiner was lost." : "Could not connect to the voice service."); }
    };
  }

  private setup() {
    const { model, systemInstruction, tools, voice } = this.config;
    return {
      model: model.startsWith("models/") ? model : `models/${model}`,
      generationConfig: {
        responseModalities: ["AUDIO"],
        ...(voice ? { speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } } : {}),
      },
      systemInstruction: { parts: [{ text: systemInstruction }] },
      ...(tools?.length ? { tools } : {}),
      // A candidate who is thinking must not be cut off: wait longer than the default before ending their turn.
      realtimeInputConfig: { automaticActivityDetection: { endOfSpeechSensitivity: "END_SENSITIVITY_LOW", silenceDurationMs: 1500 } },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      contextWindowCompression: { slidingWindow: {} },
      sessionResumption: this.handle ? { handle: this.handle } : {},
    };
  }

  private async receive(socket: WebSocket, data: unknown): Promise<void> {
    let message: any;
    try {
      const text = typeof data === "string" ? data : data instanceof ArrayBuffer ? new TextDecoder().decode(data) : await (data as Blob).text();
      message = JSON.parse(text);
    } catch { return; }
    if (this.socket !== socket || this.closed) return;
    if (message.setupComplete) {
      this.ready = true;
      for (const queued of this.pending.splice(0)) socket.send(JSON.stringify(queued));
      if (!this.started) { this.started = true; this.handlers.onReady(); }
      return;
    }
    const update = message.sessionResumptionUpdate;
    if (update?.resumable && update.newHandle) this.handle = update.newHandle;
    // goAway is an advance warning: switch connections at the next pause, or shortly, whichever comes first.
    if (message.goAway && this.handle && !this.rollover) this.rollover = setTimeout(() => this.replace(socket), 4000);
    if (message.toolCall?.functionCalls) {
      for (const call of message.toolCall.functionCalls) this.handlers.onToolCall({ id: call.id, name: call.name, args: call.args ?? {} });
    }
    const content = message.serverContent;
    if (!content) return;
    if (content.interrupted) this.handlers.onInterrupted();
    if (content.inputTranscription?.text) this.handlers.onInputText(content.inputTranscription.text);
    if (content.outputTranscription?.text) this.handlers.onOutputText(content.outputTranscription.text);
    for (const part of content.modelTurn?.parts ?? []) {
      if (part.inlineData?.data && String(part.inlineData.mimeType ?? "audio/pcm").startsWith("audio/")) this.handlers.onAudio(part.inlineData.data);
    }
    if (content.turnComplete) { this.handlers.onTurnComplete(); if (this.rollover) this.replace(socket); }
  }

  private replace(socket: WebSocket) {
    if (this.rollover) { clearTimeout(this.rollover); this.rollover = null; }
    if (this.socket !== socket || this.closed) return;
    this.reconnects = 0; this.ready = false;
    socket.close();
  }

  private send(message: unknown, keep = false): boolean {
    if (this.closed) return false;
    if (!this.ready || this.socket?.readyState !== 1) { if (keep) this.pending.push(message); return keep; }
    this.socket.send(JSON.stringify(message));
    return true;
  }
  /** Base64 16-bit PCM, 16 kHz mono. Dropped while reconnecting. */
  sendAudio(base64: string): void { this.send({ realtimeInput: { audio: { data: base64, mimeType: "audio/pcm;rate=16000" } } }); }
  /** Tells the server the microphone is paused so it does not wait for more speech. */
  pauseAudio(): void { this.send({ realtimeInput: { audioStreamEnd: true } }); }
  sendText(text: string): boolean { return this.send({ clientContent: { turns: [{ role: "user", parts: [{ text }] }], turnComplete: true } }, true); }
  respondToTool(call: LiveToolCall, response: Record<string, unknown>): boolean {
    return this.send({ toolResponse: { functionResponses: [{ id: call.id, name: call.name, response }] } }, true);
  }
  close(): void {
    this.closed = true;
    if (this.rollover) clearTimeout(this.rollover);
    const socket = this.socket;
    this.socket = null;
    try { socket?.close(); } catch {}
  }
}
