import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";
import { hoerenAudio } from "./hoeren-audio";
import type { HoerenLine, HoerenTask, SdsLevel } from "./types";

// Listening tasks play a bundled recording (scripts/generate-sds-audio.cjs), so the test works offline.
// A task without a recording, or one whose recording fails to load, is read by the device's German voice.
const rates: Record<SdsLevel, number> = { preA1: 0.7, A1: 0.75, A2: 0.85, B1: 0.95, B2: 1 };
const pitches = [1, 0.8, 1.2, 0.9, 1.1];

let run = 0;
let germanVoices: Promise<string[]> | null = null;
function voices(): Promise<string[]> {
  // On the web the list can stay pending forever when the browser has no voices, so do not wait long for it.
  const listed = Promise.race([Speech.getAvailableVoicesAsync(), new Promise<Speech.Voice[]>(resolve => setTimeout(() => resolve([]), 2000))]);
  germanVoices ??= listed
    .then(all => {
      if (!all.length) germanVoices = null;
      const german = all.filter(voice => voice.language?.toLowerCase().startsWith("de"));
      const swiss = german.filter(voice => voice.language.toLowerCase().includes("ch"));
      return [...swiss, ...german.filter(voice => !swiss.includes(voice))].map(voice => voice.identifier);
    })
    .catch(() => { germanVoices = null; return []; });
  return germanVoices;
}

function sayLine(text: string, options: Speech.SpeechOptions): Promise<boolean> {
  return new Promise(resolve => {
    Speech.speak(text, { ...options, onDone: () => resolve(true), onStopped: () => resolve(false), onError: () => resolve(false) });
  });
}

/** Reads a script line by line, one voice (or pitch) per speaker. Resolves false if stopped or if no voice could speak. */
export async function playScript(lines: HoerenLine[], level: SdsLevel): Promise<boolean> {
  const id = ++run;
  Speech.stop();
  const available = await voices();
  const speakers = [...new Set(lines.map(line => line.speaker ?? ""))];
  for (const line of lines) {
    if (id !== run) return false;
    const index = speakers.indexOf(line.speaker ?? "");
    const distinct = available.length >= speakers.length && speakers.length > 1;
    const ok = await sayLine(line.text, {
      language: "de-CH", rate: rates[level],
      ...(available.length ? { voice: available[distinct ? index : 0] } : {}),
      pitch: distinct ? 1 : pitches[index % pitches.length],
    });
    if (!ok) return false;
    if (speakers.length === 1 && lines.length > 1) await new Promise(resolve => setTimeout(resolve, 900));
  }
  return id === run;
}
let player: AudioPlayer | null = null;
function release(): void {
  const current = player;
  player = null;
  if (!current) return;
  try { current.pause(); current.remove(); } catch { /* already released */ }
}

/** Plays a bundled recording. "failed" means it never started, so the caller can fall back to the device voice. */
function playRecording(source: number): Promise<"done" | "stopped" | "failed"> {
  const id = ++run;
  Speech.stop();
  release();
  return new Promise(resolve => {
    let started = false;
    let settled = false;
    let current: AudioPlayer;
    const finish = (outcome: "done" | "stopped" | "failed") => {
      if (settled) return;
      settled = true;
      clearInterval(watch);
      clearTimeout(giveUp);
      if (player === current) release();
      resolve(outcome);
    };
    // stopScript() or another recording taking over ends this one.
    const watch = setInterval(() => { if (id !== run) finish("stopped"); }, 200);
    const giveUp = setTimeout(() => { if (!started) finish("failed"); }, 8000);
    try {
      current = createAudioPlayer(source);
      player = current;
      current.addListener("playbackStatusUpdate", status => {
        if (status.playing) started = true;
        if (status.didJustFinish) finish("done");
      });
      current.play();
    } catch { finish("failed"); }
  });
}

/** Plays a listening task. Resolves false if it was stopped or could not be played at all. */
export async function playTask(task: HoerenTask): Promise<boolean> {
  const source = hoerenAudio[task.id];
  if (source === undefined) return playScript(task.script, task.level);
  const outcome = await playRecording(source);
  return outcome === "failed" ? playScript(task.script, task.level) : outcome === "done";
}
export function stopScript(): void { run++; Speech.stop(); release(); }
