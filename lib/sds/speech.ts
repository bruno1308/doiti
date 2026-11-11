import * as Speech from "expo-speech";
import type { HoerenLine, SdsLevel } from "./types";

// Listening tasks are read by the device's German voice, so the test works offline.
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
export function stopScript(): void { run++; Speech.stop(); }
