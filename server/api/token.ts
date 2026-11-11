import { endpoint, HttpError, preflight, requireEnv } from "../lib/http.js";

// Mints a short-lived credential for one live voice session so no API key ever reaches the app.
// VOICE_PROVIDER chooses the voice model: "openai" (default) or "gemini".
const PROVIDER = process.env.VOICE_PROVIDER?.trim().toLowerCase() === "gemini" ? "gemini" : "openai";
const OPENAI_MODEL = process.env.OPENAI_REALTIME_MODEL?.trim() || "gpt-realtime-2.1";
const MODEL = process.env.GEMINI_LIVE_MODEL?.trim() || "gemini-3.8-live";
const TOKEN_URL = "https://generativelanguage.googleapis.com/v1beta/auth_tokens";

async function openaiSecret() {
  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}` },
    // Valid for five minutes to start the call; a call that has started runs on (up to 60 minutes).
    body: JSON.stringify({ expires_after: { anchor: "created_at", seconds: 300 }, session: { type: "realtime", model: OPENAI_MODEL } }),
  });
  if (!response.ok) {
    console.error("client_secrets failed", response.status, await response.text().catch(() => ""));
    throw new HttpError(502, "The voice service refused to start a session.");
  }
  const data = (await response.json()) as { value?: string };
  if (!data.value) throw new HttpError(502, "The voice service returned no token.");
  return { provider: "openai", token: data.value, model: OPENAI_MODEL };
}

export const OPTIONS = preflight;
export const POST = endpoint(async () => {
  if (PROVIDER === "openai") return openaiSecret();
  const now = Date.now();
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": requireEnv("GEMINI_API_KEY") },
    body: JSON.stringify({
      uses: 1,
      // One interview or debrief, including reconnects; a new session must start within two minutes.
      expireTime: new Date(now + 30 * 60_000).toISOString(),
      newSessionExpireTime: new Date(now + 2 * 60_000).toISOString(),
    }),
  });
  if (!response.ok) {
    console.error("auth_tokens failed", response.status, await response.text().catch(() => ""));
    throw new HttpError(502, "The voice service refused to start a session.");
  }
  const data = (await response.json()) as { name?: string };
  if (!data.name) throw new HttpError(502, "The voice service returned no token.");
  return { provider: "gemini", token: data.name, model: MODEL };
});
