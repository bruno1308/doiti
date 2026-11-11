import { gradeSpeaking, speakingRequest } from "../lib/grade.js";
import { endpoint, HttpError, preflight, readJson } from "../lib/http.js";

export const OPTIONS = preflight;
export const POST = endpoint(async request => {
  const parsed = speakingRequest.safeParse(await readJson(request, 400_000));
  if (!parsed.success) throw new HttpError(400, "The request is not in the expected format.");
  return gradeSpeaking(parsed.data);
});
