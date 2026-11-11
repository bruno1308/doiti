# Doiti SDS server

Three small functions that keep the API keys out of the app:

| Endpoint | Does |
|---|---|
| `POST /api/token` | Mints a short-lived credential for one live voice session (OpenAI Realtime by default, or Gemini Live) |
| `POST /api/grade-speaking` | Rates an interview transcript against the SDS speaking criteria |
| `POST /api/grade-writing` | Rates the writing tasks against the SDS writing criteria |

Every request must carry the shared access code in the `x-doiti-access-code` header.
Without `DOITI_ACCESS_CODE` set, the server refuses all requests.

## Deploy (Vercel)

1. Create a Vercel project from this repository with **Root Directory** `server`.
2. Set the environment variables:
   - `DOITI_ACCESS_CODE` – any long random string; you type it once into the app
   - `OPENAI_API_KEY` – OpenAI key (voice examiner and teacher, and the assessment of speaking and writing)
   - optional: `ALLOWED_ORIGIN` (e.g. `https://bruno1308.github.io`), `OPENAI_REALTIME_MODEL` (default `gpt-realtime-2.1`), `GRADING_MODEL` (default `gpt-6.1-sol`)
   - to use Gemini for the voice instead: `VOICE_PROVIDER=gemini` and `GEMINI_API_KEY` (optional `GEMINI_LIVE_MODEL`, default `gemini-3.8-live`)
3. In the app: Settings → SDS voice examiner → enter the project URL and the access code.
   To prefill the URL in a build, set `EXPO_PUBLIC_SDS_API_URL`.

The grading functions are allowed up to 300 seconds (`vercel.json`).

## Local check

```
npm install
npm run typecheck
```
