// PCM helpers shared by the audio layer; pure so they can be unit tested.

/** Averages blocks of samples down to the target rate (input rate must not be lower). */
export function downsample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate <= toRate) return input;
  const ratio = fromRate / toRate;
  const output = new Float32Array(Math.floor(input.length / ratio));
  for (let i = 0; i < output.length; i++) {
    const start = Math.floor(i * ratio), end = Math.min(input.length, Math.floor((i + 1) * ratio));
    let sum = 0;
    for (let j = start; j < end; j++) sum += input[j];
    output[i] = sum / Math.max(1, end - start);
  }
  return output;
}

export function floatToPcm16(input: Float32Array): Uint8Array {
  const bytes = new Uint8Array(input.length * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < input.length; i++) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, Math.round(sample < 0 ? sample * 0x8000 : sample * 0x7fff), true);
  }
  return bytes;
}

export function pcm16ToFloat(bytes: Uint8Array): Float32Array {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength - (bytes.byteLength % 2));
  const output = new Float32Array(view.byteLength / 2);
  for (let i = 0; i < output.length; i++) output[i] = view.getInt16(i * 2, true) / 0x8000;
  return output;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export function toBase64(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
    out += alphabet[a >> 2] + alphabet[((a & 3) << 4) | ((b ?? 0) >> 4)]
      + (i + 1 < bytes.length ? alphabet[((b & 15) << 2) | ((c ?? 0) >> 6)] : "=")
      + (i + 2 < bytes.length ? alphabet[c & 63] : "=");
  }
  return out;
}
export function fromBase64(text: string): Uint8Array {
  const clean = text.replace(/[^A-Za-z0-9+/]/g, "");
  const bytes = new Uint8Array(Math.floor(clean.length * 3 / 4));
  let buffer = 0, bits = 0, index = 0;
  for (const char of clean) {
    buffer = (buffer << 6) | alphabet.indexOf(char); bits += 6;
    if (bits >= 8) { bits -= 8; bytes[index++] = (buffer >> bits) & 0xff; }
  }
  return bytes.subarray(0, index);
}
