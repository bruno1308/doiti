import { endpoint, HttpError, preflight, requireEnv } from "../lib/http.js";

// Mints a single-use, short-lived Gemini Live token so the API key never reaches the app.
const MODEL = process.env.GEMINI_LIVE_MODEL?.trim() || "gemini-3.8-live";
const TOKEN_URL = "https://generativelanguage.googleapis.com/v1beta/auth_tokens";

export const OPTIONS = preflight;
export const POST = endpoint(async () => {
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
  return { token: data.name, model: MODEL };
});
