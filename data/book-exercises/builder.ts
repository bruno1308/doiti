import type { OverallExercise, OverallLevel } from "../../lib/overall-types";
import { normalizeAnswer } from "../../lib/overall-logic";
import { participleDistractors } from "./participles";
import { contextualGroups, relatedForms } from "./option-priorities";

const lower = normalizeAnswer;
const present: Record<string, string[]> = {
  sein: ["bin", "bist", "ist", "sind", "seid"], haben: ["habe", "hast", "hat", "haben", "habt"],
  werden: ["werde", "wirst", "wird", "werden", "werdet"], wissen: ["weiß", "weißt", "wissen", "wisst"],
  können: ["kann", "kannst", "können", "könnt"], müssen: ["muss", "musst", "müssen", "müsst"],
  dürfen: ["darf", "darfst", "dürfen", "dürft"], sollen: ["soll", "sollst", "sollen", "sollt"],
  wollen: ["will", "willst", "wollen", "wollt"], mögen: ["mag", "magst", "mögen", "mögt"],
  möchten: ["möchte", "möchtest", "möchten", "möchtet"], nehmen: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt"],
  geben: ["gebe", "gibst", "gibt", "geben", "gebt"], lesen: ["lese", "liest", "lesen", "lest"],
  essen: ["esse", "isst", "essen", "esst"], fahren: ["fahre", "fährst", "fährt", "fahren", "fahrt"],
  schlafen: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft"], laufen: ["laufe", "läufst", "läuft", "laufen", "lauft"],
  sprechen: ["spreche", "sprichst", "spricht", "sprechen", "sprecht"], tragen: ["trage", "trägst", "trägt", "tragen", "tragt"],
  sehen: ["sehe", "siehst", "sieht", "sehen", "seht"], vergessen: ["vergesse", "vergisst", "vergessen", "vergesst"],
  waschen: ["wasche", "wäschst", "wäscht", "waschen", "wascht"], halten: ["halte", "hältst", "hält", "halten", "haltet"],
  lassen: ["lasse", "lässt", "lassen", "lasst"], treffen: ["treffe", "triffst", "trifft", "treffen", "trefft"],
  helfen: ["helfe", "hilfst", "hilft", "helfen", "helft"], empfehlen: ["empfehle", "empfiehlst", "empfiehlt", "empfehlen", "empfehlt"],
  gefallen: ["gefalle", "gefällst", "gefällt", "gefallen", "gefallt"], empfangen: ["empfange", "empfängst", "empfängt", "empfangen", "empfangt"],
};

export const groups: Record<string, string[]> = {
  ...contextualGroups,
  article: ["der", "die", "das", "den", "dem", "des"], indefinite: ["ein", "eine", "einen", "einem", "einer", "eines"],
  negative: ["kein", "keine", "keinen", "keinem", "keiner", "keines"],
  pronoun: ["ich", "mich", "mir", "du", "dich", "dir", "er", "ihn", "ihm", "sie", "ihr", "es", "wir", "uns", "euch", "ihnen"],
  reflexive: ["mich", "mir", "dich", "dir", "sich", "uns", "euch"],
  preposition: ["an", "auf", "in", "mit", "von", "für", "zu", "bei", "nach", "aus", "über", "um", "vor", "seit", "ohne", "gegen", "durch", "zwischen", "unter", "hinter", "neben"],
  conjunction: ["weil", "wenn", "als", "dass", "ob", "denn", "und", "oder", "aber", "sondern", "deshalb", "trotzdem"],
  question: ["wer", "wen", "wem", "wessen", "was", "wo", "wohin", "woher", "wann", "warum", "wie", "wie lange", "wie oft", "wie viel"],
  case: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
  aux: ["habe", "bin", "hast", "bist", "hat", "ist", "haben", "sind", "habt", "seid"],
  pastsein: ["war", "warst", "waren", "wart"], pasthaben: ["hatte", "hattest", "hatten", "hattet"],
  pastwerden: ["wurde", "wurdest", "wurden", "wurdet"],
  subjsein: ["wäre", "wärst", "wären", "wärt"], subjhaben: ["hätte", "hättest", "hätten", "hättet"],
  subjwerden: ["würde", "würdest", "würden", "würdet"], subjkönnen: ["könnte", "könntest", "könnten", "könntet"],
  location: ["liegt", "legt", "steht", "stellt", "sitzt", "setzt", "hängt"],
  indefinitepronoun: ["jemand", "niemand", "etwas", "nichts", "alle", "alles"],
  negation: ["nicht", "kein", "keine", "keinen", "keinem", "keiner", "keines"],
};

function verbForms(lemma: string): string[] {
  if (present[lemma]) return present[lemma];
  const stem = lemma.replace(/en$/, "").replace(/(?<=l|r)n$/, "");
  const extra = /[td]$|[^rl][mn]$/.test(stem) ? "e" : "";
  const du = /[sßxz]$/.test(stem) ? stem + "t" : stem + extra + "st";
  return [...new Set([stem + "e", du, stem + extra + "t", lemma,
    stem + "est", stem + "et"])];
}

function options(answer: string, group: string): string[] {
  const accepted = answer.split("~");
  const correct = accepted[0];
  if (group === "article") throw new Error("Specify the article case per gap (article:nom/acc/dat/gen), or the relative-pronoun family.");
  if (contextualGroups[group] && !contextualGroups[group].some(form => lower(form) === lower(correct))) {
    throw new Error(`Answer ${correct} is outside the grammatical family ${group}`);
  }
  let pool: string[];
  if (group.includes("/")) pool = group.split("/");
  else if (groups[group]) pool = groups[group];
  else if (group.startsWith("ending:")) {
    const stem = group.slice(7); pool = ["", "e", "en", "er", "es", "em"].map(end => stem + end);
  } else if (group.startsWith("past:")) {
    const stem = group.slice(5);
    pool = (stem.endsWith("e") ? ["", "st", "n", "t"] : /[td]$/.test(stem) ? ["", "est", "en", "et"] : ["", "st", "en", "t", "est", "et"]).map(end => stem + end);
  } else if (group.startsWith("part:")) {
    const lemma = group.slice(5);
    if (!participleDistractors[lemma]) throw new Error(`Curate participle distractors for ${lemma}`);
    pool = participleDistractors[lemma];
  } else pool = verbForms(group);
  // Grammatical families and author-curated lists take priority over spelling.
  // Prefix similarity is useful only inside a morphological family (one verb
  // or adjective stem), never for choosing between articles or other words.
  pool = [...relatedForms(group, correct), ...pool];
  const seen = new Set(accepted.map(lower));
  const wrong = pool.filter(value => { if (!value || seen.has(lower(value))) return false; seen.add(lower(value)); return true; });
  const common = (value: string) => { let n = 0; while (n < value.length && n < correct.length && lower(value[n]) === lower(correct[n])) n++; return n; };
  if (!groups[group] && !group.includes("/")) wrong.sort((a, b) => common(b) - common(a));
  if (wrong.length < 3) throw new Error(`Not enough distractors for ${correct} (${group})`);
  const capital = correct[0] === correct[0].toUpperCase();
  return [correct, ...wrong.slice(0, 3).map(s => capital ? s[0].toUpperCase() + s.slice(1) : s)];
}

export function workbookChapter(section: string, topic: string, level: OverallLevel, explanation: string) {
  const exercises: OverallExercise[] = [];
  /** One source item per line: lemma|Sentence with {answer} or {answer@other-group}. */
  const gaps = (page: number, exercise: string, rows: string, kind: "fill" | "conjugation" = "conjugation") => {
    rows.trim().split("\n").map(s => s.trim()).filter(Boolean).forEach((row, i) => {
      const pipe = row.indexOf("|");
      if (pipe < 0) throw new Error(`Missing group: ${row}`);
      const group = row.slice(0, pipe); const text = row.slice(pipe + 1);
      const blanks: { answers: string[]; hint: string; options: string[]; optionGroup: string }[] = [];
      const sentence = text.replace(/\{([^{}]+)\}/g, (_, token: string) => {
        const [answer, override] = token.split("@");
        const actual = override || group;
        const hint = actual.startsWith("part:") ? `${actual.slice(5)} · Partizip II` : actual.startsWith("past:") || actual.startsWith("past") ? "Präteritum" : actual.startsWith("subj") ? "Konjunktiv II" : actual === "aux" ? "Perfekt · auxiliary" : actual.includes("/") || groups[actual] || actual.startsWith("ending:") ? topic : actual;
        blanks.push({ answers: answer.split("~"), hint: kind === "conjugation" ? hint : topic,
          options: options(answer, actual), optionGroup: actual });
        return "___";
      });
      if (!blanks.length) throw new Error(`Missing answer: ${row}`);
      exercises.push({ id: `book-p${page}-e${exercise}-i${i + 1}`, level, kind, topic, bookSection: section,
        instruction: kind === "conjugation" ? "Choose the correct verb form." : "Choose the correct answer for each gap.",
        sentence, blanks, explanation, source: { pdfPage: page, printedPage: page - 1, exercise, item: String(i + 1) } });
    });
  };
  const order = (page: number, exercise: string, rows: string) => {
    rows.trim().split("\n").map(s => s.trim()).filter(Boolean).forEach((row, i) => {
      const chunks = row.split("|").map(s => s.trim());
      exercises.push({ id: `book-p${page}-e${exercise}-i${i + 1}`, level, kind: "order", topic, bookSection: section,
        instruction: `Build the sentence. Start with “${chunks[0]}”.`, chunks, orders: [chunks.map((_, j) => j)], explanation,
        source: { pdfPage: page, printedPage: page - 1, exercise, item: String(i + 1) } });
    });
  };
  const choices = (page: number, exercise: string, rows: string) => {
    const start = exercises.length;
    gaps(page, exercise, rows, "fill");
    for (let n = start; n < exercises.length; n++) {
      const e = exercises[n];
      if (e.kind !== "fill" || e.blanks.length !== 1) throw new Error(`Single choice needs one gap: ${e.id}`);
      const { blanks, ...base } = e;
      exercises[n] = { ...base, kind: "choice", answer: blanks[0].answers[0], options: blanks[0].options, optionGroup: blanks[0].optionGroup };
    }
  };
  return { exercises, gaps, order, choices };
}
