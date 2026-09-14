import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultPracticePreferences, normalizePracticePreferences, type PracticePreferences } from "./practice-preferences";

const SETTINGS_KEY = "doiti_practice_preferences";
let pendingWrite: Promise<void> = Promise.resolve();

export async function getPracticePreferences(): Promise<PracticePreferences> {
  await pendingWrite;
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultPracticePreferences();
  try { return normalizePracticePreferences(JSON.parse(raw)); }
  catch { return defaultPracticePreferences(); }
}

export function savePracticePreferences(preferences: PracticePreferences): Promise<void> {
  const snapshot = JSON.stringify(normalizePracticePreferences(preferences));
  const write = pendingWrite.then(() => AsyncStorage.setItem(SETTINGS_KEY, snapshot));
  pendingWrite = write.catch(() => {});
  return write;
}
