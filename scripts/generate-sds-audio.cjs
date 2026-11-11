/* global __dirname, Buffer */
// Generates the recordings for the SDS listening tasks with ElevenLabs.
//   node scripts/generate-sds-audio.cjs            only tasks whose script or voices changed
//   node scripts/generate-sds-audio.cjs --force    everything
//   node scripts/generate-sds-audio.cjs H-B1-1     only the named tasks
// Needs ELEVENLABS_API_KEY (environment or .env) and ffmpeg on the PATH.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "assets", "sds", "hoeren");
const manifestPath = path.join(outDir, "manifest.json");
const mapPath = path.join(root, "lib", "sds", "hoeren-audio.ts");

const MODEL = "eleven_v4";
const FORMAT = "mp3_44100_128";
// Native Standard German voices from the ElevenLabs voice library: two women and two men, plus a third woman
// for the one task that has three female speakers.
const voices = {
  lea: { id: "7eVMgwCnXydb3CikjV7a", gender: "f" }, // Lea – clear, mature
  ava: { id: "AnvlJBAqSLDzEevYr9Ap", gender: "f" }, // Ava – youthful, friendly
  otto: { id: "FTNCalFNG5bRnkkaP5Ug", gender: "m" }, // Otto – calm, middle-aged
  ben: { id: "aTTiK3YzK3dXETpuDE2h", gender: "m" }, // Ben – young, casual
  annika: { id: "ViKqgJNeCiWZlYgHiAOO", gender: "f" }, // Annika – calm, confident
};
const byGender = { f: ["lea", "ava"], m: ["otto", "ben"] };
/** Used only when a task has more speakers of one gender than the two main voices. */
const extra = { f: ["annika"], m: [] };
const narrators = ["lea", "otto", "ava", "ben"];
// Slower at the lower levels, as in the real test. Applied without changing the pitch.
const tempo = { preA1: 0.85, A1: 0.9, A2: 0.95, B1: 1, B2: 1 };
/** Seconds of silence between the lines of a text read by one voice. */
const LIST_GAP = 0.9;

function genderOf(speaker) {
  if (/^(Frau|Moderatorin|Passantin|Sandra|Ursula)\b/.test(speaker)) return "f";
  if (/^(Herr|Moderator|Passant|Daniel|Milan|Durchsage)\b/.test(speaker)) return "m";
  throw new Error(`No gender known for speaker "${speaker}". Add it to genderOf().`);
}

/** One voice per speaker; no two speakers in a task share a voice. */
function cast(task, index) {
  const speakers = [...new Set(task.script.map(line => line.speaker ?? ""))];
  if (speakers.length === 1) {
    const only = speakers[0];
    return { [only]: only ? byGender[genderOf(only)][index % 2] : narrators[index % narrators.length] };
  }
  const used = { f: 0, m: 0 };
  const roles = {};
  for (const speaker of speakers) {
    const gender = genderOf(speaker);
    // The task number decides who gets which voice first, so every voice is heard across the test.
    const nth = used[gender]++;
    const voice = nth < 2 ? byGender[gender][(nth + index) % 2] : extra[gender][nth - 2];
    if (!voice) throw new Error(`${task.id} has too many ${gender === "f" ? "female" : "male"} speakers for the available voices.`);
    roles[speaker] = voice;
  }
  return roles;
}

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const env = fs.existsSync(path.join(root, ".env")) ? fs.readFileSync(path.join(root, ".env"), "utf8") : "";
  const match = env.match(/^ELEVENLABS_API_KEY=(.*)$/m);
  if (!match) throw new Error("ELEVENLABS_API_KEY is not set.");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function loadTasks() {
  const source = fs.readFileSync(path.join(root, "data", "sds", "hoeren.ts"), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", "require", js)(module, module.exports, require);
  return module.exports.hoerenTasks;
}

async function request(url, body, key) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(`${url}?output_format=${FORMAT}`, {
      method: "POST", headers: { "xi-api-key": key, "content-type": "application/json" }, body: JSON.stringify(body),
    });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    const detail = await response.text();
    if ((response.status === 429 || response.status >= 500) && attempt < 4) { await new Promise(resolve => setTimeout(resolve, attempt * 5000)); continue; }
    throw new Error(`ElevenLabs answered ${response.status}: ${detail.slice(0, 300)}`);
  }
}

const ffmpeg = args => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });

async function record(task, roles, key, work) {
  const speakers = Object.keys(roles);
  const raw = path.join(work, `${task.id}.raw.mp3`);
  if (speakers.length > 1) {
    // A conversation is generated in one piece, so the voices answer each other naturally.
    const inputs = task.script.map(line => ({ text: line.text, voice_id: voices[roles[line.speaker ?? ""]].id }));
    fs.writeFileSync(raw, await request("https://api.elevenlabs.io/v1/text-to-dialogue", { model_id: MODEL, language_code: "de", inputs }, key));
  } else {
    // One voice reading separate items: each line on its own, with a pause in between.
    const voice = voices[roles[speakers[0]]].id;
    const parts = [];
    for (const [number, line] of task.script.entries()) {
      const part = path.join(work, `${task.id}.${number}.mp3`);
      fs.writeFileSync(part, await request(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, { model_id: MODEL, language_code: "de", text: line.text }, key));
      parts.push(part);
    }
    if (parts.length === 1) fs.copyFileSync(parts[0], raw);
    else {
      const inputs = parts.flatMap(part => ["-i", part]);
      const padded = parts.map((_, number) => `[${number}:a]aresample=44100,aformat=channel_layouts=mono,apad=pad_dur=${number < parts.length - 1 ? LIST_GAP : 0}[p${number}]`).join(";");
      const joined = `${parts.map((_, number) => `[p${number}]`).join("")}concat=n=${parts.length}:v=0:a=1[out]`;
      ffmpeg([...inputs, "-filter_complex", `${padded};${joined}`, "-map", "[out]", "-c:a", "libmp3lame", "-b:a", "128k", raw]);
    }
  }
  const filters = [...(tempo[task.level] === 1 ? [] : [`atempo=${tempo[task.level]}`]), "loudnorm=I=-16:TP=-1.5:LRA=11"].join(",");
  ffmpeg(["-i", raw, "-af", filters, "-ac", "1", "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "96k", path.join(outDir, `${task.id}.mp3`)]);
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const only = args.filter(arg => !arg.startsWith("--"));
  const tasks = loadTasks();
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  fs.mkdirSync(outDir, { recursive: true });
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "doiti-sds-audio-"));
  const key = apiKey();
  let characters = 0;
  for (const [index, task] of tasks.entries()) {
    const roles = cast(task, index);
    const hash = crypto.createHash("sha256").update(JSON.stringify([MODEL, tempo[task.level], task.script, Object.values(roles).map(name => voices[name].id)])).digest("hex").slice(0, 16);
    const file = path.join(outDir, `${task.id}.mp3`);
    const wanted = only.length ? only.includes(task.id) : force || manifest[task.id]?.hash !== hash || !fs.existsSync(file);
    if (!wanted) continue;
    console.log(`${task.id}: ${Object.entries(roles).map(([speaker, voice]) => `${speaker || "Sprecher/in"} = ${voice}`).join(", ")}`);
    await record(task, roles, key, work);
    characters += task.script.reduce((sum, line) => sum + line.text.length, 0);
    manifest[task.id] = { hash, voices: roles };
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  fs.rmSync(work, { recursive: true, force: true });
  const ids = tasks.map(task => task.id).filter(id => fs.existsSync(path.join(outDir, `${id}.mp3`)));
  fs.writeFileSync(mapPath, `// Generated by scripts/generate-sds-audio.cjs. Do not edit by hand.\n/** Recorded audio for the listening tasks, by task id. A task without a recording is read by the device voice. */\nexport const hoerenAudio: Record<string, number> = {\n${ids.map(id => `  "${id}": require("../../assets/sds/hoeren/${id}.mp3"),`).join("\n")}\n};\n`);
  console.log(`Done. ${characters} characters sent, ${ids.length} of ${tasks.length} tasks have a recording.`);
}

main().catch(error => { console.error(error.message); process.exit(1); });
