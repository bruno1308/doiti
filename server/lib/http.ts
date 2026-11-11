import { timingSafeEqual } from "node:crypto";

const cors = {
  "access-control-allow-origin": process.env.ALLOWED_ORIGIN?.trim() || "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type, x-doiti-access-code",
  "access-control-max-age": "86400",
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...cors } });
export const preflight = () => new Response(null, { status: 204, headers: cors });

export class HttpError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

/** Every endpoint spends the owner's API credit, so nothing runs without the shared access code. */
export function authorize(request: Request): void {
  const expected = process.env.DOITI_ACCESS_CODE?.trim();
  if (!expected) throw new HttpError(503, "The server has no DOITI_ACCESS_CODE configured.");
  const given = Buffer.from(request.headers.get("x-doiti-access-code")?.trim() ?? "");
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) throw new HttpError(401, "Wrong access code.");
}

export async function readJson(request: Request, maxBytes: number): Promise<unknown> {
  const text = await request.text();
  if (Buffer.byteLength(text) > maxBytes) throw new HttpError(413, "Request too large.");
  try { return JSON.parse(text); } catch { throw new HttpError(400, "Body must be JSON."); }
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new HttpError(503, `The server has no ${name} configured.`);
  return value;
}

/** Wraps a handler: access check, error mapping, CORS. Internal details stay in the server log. */
export function endpoint(handler: (request: Request) => Promise<unknown>) {
  return async (request: Request): Promise<Response> => {
    try {
      authorize(request);
      return json(await handler(request));
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error(error);
      return json({ error: "The server could not complete the request." }, 502);
    }
  };
}
