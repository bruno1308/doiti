// One live voice connection to a speech-to-speech model. Two providers implement it:
// OpenAI Realtime over WebRTC (default) and Gemini Live over a WebSocket.

export type VoiceProvider = "openai" | "gemini";
export interface VoiceTool { name: string; description: string; parameters: Record<string, unknown> }
export interface ToolCall { id: string; name: string; args: Record<string, unknown> }

export interface LinkConfig {
  token: string;
  model: string;
  systemInstruction: string;
  tools: VoiceTool[];
  voice: string;
  /** ISO 639-1 hint for transcribing the learner; omit when they may speak more than one language. */
  language?: string;
}
export interface LinkHandlers {
  onReady(): void;
  onSpeaking(speaking: boolean): void;
  /** Transcript of the model's speech, in fragments. `fresh` marks the first fragment of a new reply. */
  onOutputText(text: string, fresh?: boolean): void;
  /** Transcript of the learner's speech, in fragments as they are heard (Gemini). */
  onInputText(text: string): void;
  /** Transcript of one whole learner turn with its wall-clock start and end (OpenAI). */
  onInputTurn(text: string, startedAt: number, endedAt: number): void;
  onToolCall(call: ToolCall): void;
  /** Fatal: the conversation cannot continue. */
  onError(message: string): void;
}
export interface VoiceLink {
  /** Opens the microphone and connects. Rejects if the microphone is refused. */
  start(): Promise<void>;
  /** An instruction from the app, answered by the model. */
  notify(text: string): void;
  respondToTool(call: ToolCall, response: Record<string, unknown>): void;
  setMuted(muted: boolean): void;
  /** Resolves when the model has finished speaking what it has generated. */
  drained(): Promise<void>;
  close(): void;
}
