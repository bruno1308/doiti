import type { Microphone, Speaker, VoiceAudio } from "./audio-types";
import { createDownsampler, floatToPcm16, fromBase64, pcm16ToFloat, toBase64 } from "./pcm";

const TARGET_RATE = 16_000;
const OUTPUT_RATE = 24_000;
const CHUNK_SAMPLES = 1600; // 100 ms at 16 kHz

const workletSource = `class DoitiMic extends AudioWorkletProcessor {
  process(inputs) { const channel = inputs[0] && inputs[0][0]; if (channel) this.port.postMessage(channel.slice(0)); return true; }
}
registerProcessor("doiti-mic", DoitiMic);`;

type AudioContextClass = typeof AudioContext;
const contextClass = (): AudioContextClass | undefined =>
  typeof window === "undefined" ? undefined : window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextClass }).webkitAudioContext;

async function openMicrophone(onChunk: (base64: string) => void): Promise<Microphone> {
  const Context = contextClass();
  if (!Context || !navigator.mediaDevices?.getUserMedia) throw new Error("This browser cannot record audio.");
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  const context = new Context();
  let moduleUrl: string | null = null;
  const release = () => {
    stream.getTracks().forEach(track => track.stop());
    if (moduleUrl) URL.revokeObjectURL(moduleUrl);
    void context.close().catch(() => {});
  };
  // Anything failing after the microphone opened must switch it off again.
  try { return await wire(stream, context, onChunk, url => { moduleUrl = url; }, release); }
  catch (error) { release(); throw error; }
}

async function wire(stream: MediaStream, context: AudioContext, onChunk: (base64: string) => void, keepUrl: (url: string) => void, release: () => void): Promise<Microphone> {
  await context.resume();
  const source = context.createMediaStreamSource(stream);
  const resample = createDownsampler(context.sampleRate, TARGET_RATE);
  let muted = false;
  let pending = new Float32Array(0);
  const accept = (frame: Float32Array) => {
    if (muted) return;
    const samples = resample(frame);
    const joined = new Float32Array(pending.length + samples.length);
    joined.set(pending); joined.set(samples, pending.length);
    let offset = 0;
    for (; joined.length - offset >= CHUNK_SAMPLES; offset += CHUNK_SAMPLES) onChunk(toBase64(floatToPcm16(joined.subarray(offset, offset + CHUNK_SAMPLES))));
    pending = joined.slice(offset);
  };
  let node: AudioNode;
  if (context.audioWorklet) {
    const moduleUrl = URL.createObjectURL(new Blob([workletSource], { type: "application/javascript" }));
    keepUrl(moduleUrl);
    await context.audioWorklet.addModule(moduleUrl);
    const worklet = new AudioWorkletNode(context, "doiti-mic");
    worklet.port.onmessage = event => accept(event.data as Float32Array);
    node = worklet;
  } else {
    const processor = context.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = event => accept(new Float32Array(event.inputBuffer.getChannelData(0)));
    node = processor;
  }
  // Route through a silent gain so the graph runs without echoing the microphone.
  const silence = context.createGain();
  silence.gain.value = 0;
  source.connect(node); node.connect(silence); silence.connect(context.destination);
  return {
    setMuted(value) { muted = value; if (value) pending = new Float32Array(0); },
    stop() { source.disconnect(); node.disconnect(); silence.disconnect(); release(); },
  };
}

function openSpeaker(): Speaker {
  const Context = contextClass();
  if (!Context) return { play() {}, flush() {}, drained: () => Promise.resolve(), stop() {} };
  const context = new Context({ sampleRate: OUTPUT_RATE });
  void context.resume().catch(() => {});
  let nextStart = 0;
  const playing = new Set<AudioBufferSourceNode>();
  let waiters: (() => void)[] = [];
  const settle = () => { if (!playing.size) { waiters.forEach(resolve => resolve()); waiters = []; } };
  return {
    play(base64) {
      const samples = pcm16ToFloat(fromBase64(base64));
      if (!samples.length || context.state === "closed") return;
      const buffer = context.createBuffer(1, samples.length, OUTPUT_RATE);
      buffer.getChannelData(0).set(samples);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      // A small lead keeps consecutive chunks gapless without building up delay.
      nextStart = Math.max(nextStart, context.currentTime + 0.04);
      source.start(nextStart);
      nextStart += buffer.duration;
      playing.add(source);
      source.onended = () => { playing.delete(source); settle(); };
    },
    flush() {
      playing.forEach(source => { source.onended = null; try { source.stop(); } catch {} });
      playing.clear(); nextStart = 0; settle();
    },
    drained: () => playing.size ? new Promise<void>(resolve => { waiters.push(resolve); }) : Promise.resolve(),
    stop() { this.flush(); void context.close().catch(() => {}); },
  };
}

export const voiceAudio: VoiceAudio = {
  supported: typeof window !== "undefined" && !!contextClass() && !!navigator.mediaDevices?.getUserMedia && typeof WebSocket !== "undefined",
  openMicrophone, openSpeaker,
};
