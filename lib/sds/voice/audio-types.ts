export interface Microphone {
  /** Muted microphones keep the device open but send nothing. */
  setMuted(muted: boolean): void;
  stop(): void;
}
export interface Speaker {
  /** Base64 16-bit little-endian PCM at 24 kHz. */
  play(base64: string): void;
  /** Drops everything queued (the candidate interrupted). */
  flush(): void;
  /** Resolves when the queue has finished playing. */
  drained(): Promise<void>;
  stop(): void;
}
export interface VoiceAudio {
  /** False where live audio is not implemented (native builds for now). */
  supported: boolean;
  /** Must be called from a tap so the browser allows audio and asks for the microphone. */
  openMicrophone(onChunk: (base64Pcm16k: string) => void): Promise<Microphone>;
  openSpeaker(): Speaker;
}
