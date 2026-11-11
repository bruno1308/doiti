import type { LinkConfig, LinkHandlers, VoiceLink } from "./link";

// OpenAI Realtime API over WebRTC. The browser carries the audio both ways (with its own
// echo cancellation); events travel on the "oai-events" data channel. The API key stays on
// the app's server: the connection uses a short-lived client secret.
const CALLS_URL = process.env.EXPO_PUBLIC_SDS_OPENAI_URL?.trim() || "https://api.openai.com/v1/realtime/calls";
// The docs do not say which event marks the end of playback, so never wait on it for long.
const DRAIN_LIMIT_MS = 8000;

export const openaiSupported = () => typeof RTCPeerConnection !== "undefined" && typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

export function createOpenAiLink(config: LinkConfig, handlers: LinkHandlers): VoiceLink {
  let peer: RTCPeerConnection | null = null;
  let channel: RTCDataChannel | null = null;
  let stream: MediaStream | null = null;
  let player: HTMLAudioElement | null = null;
  let closed = false;
  let ready = false;
  let speaking = false;
  let reply = "";
  let waiters: (() => void)[] = [];
  const speech = new Map<string, number>();
  const queue: unknown[] = [];

  const send = (event: unknown) => {
    if (channel?.readyState === "open") channel.send(JSON.stringify(event)); else if (!closed) queue.push(event);
  };
  const setSpeaking = (value: boolean) => {
    if (speaking === value) return;
    speaking = value;
    handlers.onSpeaking(value);
    if (!value) { waiters.forEach(resolve => resolve()); waiters = []; }
  };
  const fail = (message: string) => { if (!closed) { link.close(); handlers.onError(message); } };

  const receive = (raw: unknown) => {
    let event: any;
    try { event = JSON.parse(String(raw)); } catch { return; }
    switch (event.type) {
      case "session.updated":
        if (!ready) { ready = true; handlers.onReady(); }
        break;
      case "output_audio_buffer.started": setSpeaking(true); break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared": setSpeaking(false); break;
      case "response.output_audio_transcript.delta":
        if (event.delta) {
          setSpeaking(true);
          // Each reply is its own turn, so a learner turn transcribed late can be placed before it.
          const id = String(event.response_id ?? event.item_id ?? "");
          handlers.onOutputText(event.delta, id !== reply);
          reply = id;
        }
        break;
      case "input_audio_buffer.speech_started": speech.set(event.item_id, Date.now()); break;
      case "conversation.item.input_audio_transcription.completed": {
        const text = String(event.transcript ?? "").trim();
        const started = speech.get(event.item_id) ?? Date.now();
        speech.delete(event.item_id);
        if (text) handlers.onInputTurn(text, started, Date.now());
        break;
      }
      case "response.done":
        for (const item of event.response?.output ?? []) {
          if (item.type !== "function_call" || !item.call_id) continue;
          let args: Record<string, unknown> = {};
          try { args = JSON.parse(item.arguments || "{}"); } catch {}
          handlers.onToolCall({ id: item.call_id, name: item.name, args });
        }
        break;
      case "error":
        // Most errors are harmless (for example asking for a response while one is running).
        if (!ready) fail("The voice service rejected the session settings.");
        break;
    }
  };

  const link: VoiceLink = {
    async start() {
      if (!openaiSupported()) throw new Error("This browser cannot hold a live voice call.");
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      if (closed) { link.close(); return; }
      try {
        const connection = new RTCPeerConnection();
        peer = connection;
        player = document.createElement("audio");
        player.autoplay = true;
        connection.ontrack = event => { if (player) player.srcObject = event.streams[0]; };
        connection.onconnectionstatechange = () => {
          if (connection.connectionState === "failed" || connection.connectionState === "disconnected") fail("The connection to the examiner was lost.");
        };
        stream.getAudioTracks().forEach(track => connection.addTrack(track, stream!));
        channel = connection.createDataChannel("oai-events");
        channel.onmessage = event => receive(event.data);
        channel.onopen = () => {
          channel?.send(JSON.stringify({
            type: "session.update",
            session: {
              type: "realtime",
              instructions: config.systemInstruction,
              output_modalities: ["audio"],
              audio: {
                input: {
                  transcription: { model: "gpt-4o-transcribe", ...(config.language ? { language: config.language } : {}) },
                  noise_reduction: { type: "near_field" },
                  // Low eagerness waits for a speaker who pauses to think instead of taking the turn.
                  turn_detection: { type: "semantic_vad", eagerness: "low", create_response: true, interrupt_response: true },
                },
                output: { voice: config.voice },
              },
              tools: config.tools.map(tool => ({ type: "function", ...tool })),
              tool_choice: "auto",
            },
          }));
          for (const event of queue.splice(0)) channel?.send(JSON.stringify(event));
        };
        await connection.setLocalDescription(await connection.createOffer());
        const response = await fetch(CALLS_URL, { method: "POST", headers: { authorization: `Bearer ${config.token}`, "content-type": "application/sdp" }, body: connection.localDescription?.sdp ?? "" });
        if (!response.ok) throw new Error("Could not connect to the voice service.");
        const answer = await response.text();
        if (closed) return;
        await connection.setRemoteDescription({ type: "answer", sdp: answer });
      } catch (error) {
        link.close();
        throw error instanceof Error && error.message.startsWith("Could not") ? error : new Error("Could not connect to the voice service.");
      }
    },
    notify(text) {
      send({ type: "conversation.item.create", item: { type: "message", role: "user", content: [{ type: "input_text", text }] } });
      send({ type: "response.create" });
    },
    respondToTool(call, response) {
      send({ type: "conversation.item.create", item: { type: "function_call_output", call_id: call.id, output: JSON.stringify(response) } });
      send({ type: "response.create" });
    },
    setMuted(muted) { stream?.getAudioTracks().forEach(track => { track.enabled = !muted; }); },
    drained: () => !speaking ? Promise.resolve() : new Promise<void>(resolve => {
      const done = () => { clearTimeout(timer); resolve(); };
      const timer = setTimeout(() => { waiters = waiters.filter(item => item !== done); setSpeaking(false); resolve(); }, DRAIN_LIMIT_MS);
      waiters.push(done);
    }),
    close() {
      closed = true;
      waiters.forEach(resolve => resolve()); waiters = [];
      stream?.getTracks().forEach(track => track.stop());
      try { channel?.close(); } catch {}
      try { peer?.close(); } catch {}
      if (player) { player.srcObject = null; player = null; }
      peer = null; channel = null; stream = null;
    },
  };
  return link;
}
