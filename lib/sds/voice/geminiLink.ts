import { voiceAudio } from "./audio";
import type { Microphone, Speaker } from "./audio-types";
import type { LinkConfig, LinkHandlers, ToolCall, VoiceLink } from "./link";
import { LiveSession } from "./liveClient";

/** Gemini declares parameter types in upper case. */
function geminiSchema(schema: unknown): unknown {
  if (Array.isArray(schema)) return schema.map(geminiSchema);
  if (!schema || typeof schema !== "object") return schema;
  return Object.fromEntries(Object.entries(schema).map(([key, value]) => [key, key === "type" && typeof value === "string" ? value.toUpperCase() : geminiSchema(value)]));
}

export function createGeminiLink(config: LinkConfig, handlers: LinkHandlers): VoiceLink {
  let mic: Microphone | null = null;
  let speaker: Speaker | null = null;
  let session: LiveSession | null = null;
  let muted = false;
  let closed = false;
  const link: VoiceLink = {
    async start() {
      speaker = voiceAudio.openSpeaker();
      mic = await voiceAudio.openMicrophone(chunk => { if (!muted) session?.sendAudio(chunk); });
      if (closed) { link.close(); return; }
      session = new LiveSession({
        token: config.token, model: config.model, systemInstruction: config.systemInstruction, voice: config.voice,
        tools: config.tools.length ? [{ functionDeclarations: config.tools.map(tool => ({ ...tool, parameters: geminiSchema(tool.parameters) })) }] : undefined,
      }, {
        onReady: handlers.onReady,
        onAudio: base64 => { if (muted) return; speaker?.play(base64); handlers.onSpeaking(true); },
        onInterrupted: () => { speaker?.flush(); handlers.onSpeaking(false); },
        onInputText: handlers.onInputText,
        onOutputText: handlers.onOutputText,
        onTurnComplete: () => { void speaker?.drained().then(() => handlers.onSpeaking(false)); },
        onToolCall: (call: ToolCall) => handlers.onToolCall(call),
        onError: handlers.onError,
      });
      session.connect();
    },
    notify: text => { session?.sendText(text); },
    respondToTool: (call, response) => { session?.respondToTool(call, response); },
    setMuted(value) { muted = value; mic?.setMuted(value); if (value) session?.pauseAudio(); },
    drained: () => speaker?.drained() ?? Promise.resolve(),
    close() {
      closed = true;
      session?.close(); mic?.stop(); speaker?.stop();
      session = null; mic = null; speaker = null;
    },
  };
  return link;
}
