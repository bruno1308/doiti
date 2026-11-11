import { gradeWriting, writingRequest } from "../lib/grade.js";
import { endpoint, HttpError, preflight, readJson } from "../lib/http.js";

export const OPTIONS = preflight;
export const POST = endpoint(async request => {
  const parsed = writingRequest.safeParse(await readJson(request, 400_000));
  if (!parsed.success) throw new HttpError(400, "The request is not in the expected format.");
  return gradeWriting(parsed.data);
});
