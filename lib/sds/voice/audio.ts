import type { VoiceAudio } from "./audio-types";

// Native builds: live microphone streaming needs a native audio module that is not
// part of this app yet. The voice examiner runs in the web app (also when installed
// to the home screen); see audio.web.ts.
export const voiceAudio: VoiceAudio = {
  supported: false,
  openMicrophone: () => Promise.reject(new Error("The voice examiner is not available in this build.")),
  openSpeaker: () => ({ play() {}, flush() {}, drained: () => Promise.resolve(), stop() {} }),
};
