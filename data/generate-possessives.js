// Generator script for possessive pronoun exercises
// Run with: node data/generate-possessives.js > data/possessives-exercises.ts

const persons = [
  { key: "ich", stem: "mein", english: "my", engSubj: "I", deSubj: "Ich" },
  { key: "du", stem: "dein", english: "your", engSubj: "You", deSubj: "Du" },
  { key: "er", stem: "sein", english: "his", engSubj: "He", deSubj: "Er" },
  { key: "sie_sg", stem: "ihr", english: "her", engSubj: "She", deSubj: "Sie" },
  { key: "es", stem: "sein", english: "its", engSubj: "It", deSubj: "Es" },
  { key: "wir", stem: "unser", english: "our", engSubj: "We", deSubj: "Wir" },
  { key: "ihr", stem: "euer", english: "your", engSubj: "You", deSubj: "Ihr" },
  { key: "sie_pl", stem: "ihr", english: "their", engSubj: "They", deSubj: "Sie" },
  { key: "Sie", stem: "Ihr", english: "your", engSubj: "You", deSubj: "Sie" },
];

function getForm(stem, cas, gender) {
  const isEuer = (stem.toLowerCase() === "euer");
  const base = stem.toLowerCase();

  if (cas === "nominativ") {
    if (gender === "m") return base;
    if (gender === "n") return base;
    if (gender === "f") {
      if (isEuer) return "eure";
      return base + "e";
    }
  }
  if (cas === "akkusativ") {
    if (gender === "m") {
      if (isEuer) return "euren";
      return base + "en";
    }
    if (gender === "n") return base;
    if (gender === "f") {
      if (isEuer) return "eure";
      return base + "e";
    }
  }
  if (cas === "dativ") {
    if (gender === "m" || gender === "n") {
      if (isEuer) return "eurem";
      return base + "em";
    }
    if (gender === "f") {
      if (isEuer) return "eurer";
      return base + "er";
    }
  }
  if (cas === "genitiv") {
    if (gender === "m" || gender === "n") {
      if (isEuer) return "eures";
      return base + "es";
    }
    if (gender === "f") {
      if (isEuer) return "eurer";
      return base + "er";
    }
  }
}

function getFormForPerson(person, cas, gender) {
  const p = persons.find(x => x.key === person);
  let form = getForm(p.stem, cas, gender);
  if (person === "Sie") {
    form = "I" + form.slice(1);
  }
  return form;
}

// Verb conjugation helper
// Returns conjugated German verb for each person
function conjugate(personKey, verb) {
  // Map of verb -> conjugations per person
  const conjugations = {
    "suchen": { ich: "suche", du: "suchst", er: "sucht", sie_sg: "sucht", es: "sucht", wir: "suchen", ihr: "sucht", sie_pl: "suchen", Sie: "suchen" },
    "brauchen": { ich: "brauche", du: "brauchst", er: "braucht", sie_sg: "braucht", es: "braucht", wir: "brauchen", ihr: "braucht", sie_pl: "brauchen", Sie: "brauchen" },
    "sehen": { ich: "sehe", du: "siehst", er: "sieht", sie_sg: "sieht", es: "sieht", wir: "sehen", ihr: "seht", sie_pl: "sehen", Sie: "sehen" },
    "anrufen": { ich: "rufe", du: "rufst", er: "ruft", sie_sg: "ruft", es: "ruft", wir: "rufen", ihr: "ruft", sie_pl: "rufen", Sie: "rufen" },
    "kennen": { ich: "kenne", du: "kennst", er: "kennt", sie_sg: "kennt", es: "kennt", wir: "kennen", ihr: "kennt", sie_pl: "kennen", Sie: "kennen" },
    "finden": { ich: "finde", du: "findest", er: "findet", sie_sg: "findet", es: "findet", wir: "finden", ihr: "findet", sie_pl: "finden", Sie: "finden" },
    "besuchen": { ich: "besuche", du: "besuchst", er: "besucht", sie_sg: "besucht", es: "besucht", wir: "besuchen", ihr: "besucht", sie_pl: "besuchen", Sie: "besuchen" },
    "vermissen": { ich: "vermisse", du: "vermisst", er: "vermisst", sie_sg: "vermisst", es: "vermisst", wir: "vermissen", ihr: "vermisst", sie_pl: "vermissen", Sie: "vermissen" },
    "lieben": { ich: "liebe", du: "liebst", er: "liebt", sie_sg: "liebt", es: "liebt", wir: "lieben", ihr: "liebt", sie_pl: "lieben", Sie: "lieben" },
    "haben": { ich: "habe", du: "hast", er: "hat", sie_sg: "hat", es: "hat", wir: "haben", ihr: "habt", sie_pl: "haben", Sie: "haben" },
    "nehmen": { ich: "nehme", du: "nimmst", er: "nimmt", sie_sg: "nimmt", es: "nimmt", wir: "nehmen", ihr: "nehmt", sie_pl: "nehmen", Sie: "nehmen" },
    "lesen": { ich: "lese", du: "liest", er: "liest", sie_sg: "liest", es: "liest", wir: "lesen", ihr: "lest", sie_pl: "lesen", Sie: "lesen" },
    "mögen": { ich: "mag", du: "magst", er: "mag", sie_sg: "mag", es: "mag", wir: "mögen", ihr: "mögt", sie_pl: "mögen", Sie: "mögen" },
    "verkaufen": { ich: "verkaufe", du: "verkaufst", er: "verkauft", sie_sg: "verkauft", es: "verkauft", wir: "verkaufen", ihr: "verkauft", sie_pl: "verkaufen", Sie: "verkaufen" },
    "putzen": { ich: "putze", du: "putzt", er: "putzt", sie_sg: "putzt", es: "putzt", wir: "putzen", ihr: "putzt", sie_pl: "putzen", Sie: "putzen" },
    "reparieren": { ich: "repariere", du: "reparierst", er: "repariert", sie_sg: "repariert", es: "repariert", wir: "reparieren", ihr: "repariert", sie_pl: "reparieren", Sie: "reparieren" },
    "helfen": { ich: "helfe", du: "hilfst", er: "hilft", sie_sg: "hilft", es: "hilft", wir: "helfen", ihr: "helft", sie_pl: "helfen", Sie: "helfen" },
    "danken": { ich: "danke", du: "dankst", er: "dankt", sie_sg: "dankt", es: "dankt", wir: "danken", ihr: "dankt", sie_pl: "danken", Sie: "danken" },
    "geben": { ich: "gebe", du: "gibst", er: "gibt", sie_sg: "gibt", es: "gibt", wir: "geben", ihr: "gebt", sie_pl: "geben", Sie: "geben" },
    "schreiben": { ich: "schreibe", du: "schreibst", er: "schreibt", sie_sg: "schreibt", es: "schreibt", wir: "schreiben", ihr: "schreibt", sie_pl: "schreiben", Sie: "schreiben" },
    "erzählen": { ich: "erzähle", du: "erzählst", er: "erzählt", sie_sg: "erzählt", es: "erzählt", wir: "erzählen", ihr: "erzählt", sie_pl: "erzählen", Sie: "erzählen" },
    "sprechen": { ich: "spreche", du: "sprichst", er: "spricht", sie_sg: "spricht", es: "spricht", wir: "sprechen", ihr: "sprecht", sie_pl: "sprechen", Sie: "sprechen" },
    "kaufen": { ich: "kaufe", du: "kaufst", er: "kauft", sie_sg: "kauft", es: "kauft", wir: "kaufen", ihr: "kauft", sie_pl: "kaufen", Sie: "kaufen" },
    "zeigen": { ich: "zeige", du: "zeigst", er: "zeigt", sie_sg: "zeigt", es: "zeigt", wir: "zeigen", ihr: "zeigt", sie_pl: "zeigen", Sie: "zeigen" },
    "antworten": { ich: "antworte", du: "antwortest", er: "antwortet", sie_sg: "antwortet", es: "antwortet", wir: "antworten", ihr: "antwortet", sie_pl: "antworten", Sie: "antworten" },
    "erklären": { ich: "erkläre", du: "erklärst", er: "erklärt", sie_sg: "erklärt", es: "erklärt", wir: "erklären", ihr: "erklärt", sie_pl: "erklären", Sie: "erklären" },
    "bringen": { ich: "bringe", du: "bringst", er: "bringt", sie_sg: "bringt", es: "bringt", wir: "bringen", ihr: "bringt", sie_pl: "bringen", Sie: "bringen" },
    "spielen": { ich: "spiele", du: "spielst", er: "spielt", sie_sg: "spielt", es: "spielt", wir: "spielen", ihr: "spielt", sie_pl: "spielen", Sie: "spielen" },
    "sein": { ich: "bin", du: "bist", er: "ist", sie_sg: "ist", es: "ist", wir: "sind", ihr: "seid", sie_pl: "sind", Sie: "sind" },
    "sitzen": { ich: "sitze", du: "sitzt", er: "sitzt", sie_sg: "sitzt", es: "sitzt", wir: "sitzen", ihr: "sitzt", sie_pl: "sitzen", Sie: "sitzen" },
    "arbeiten": { ich: "arbeite", du: "arbeitest", er: "arbeitet", sie_sg: "arbeitet", es: "arbeitet", wir: "arbeiten", ihr: "arbeitet", sie_pl: "arbeiten", Sie: "arbeiten" },
    "fahren": { ich: "fahre", du: "fährst", er: "fährt", sie_sg: "fährt", es: "fährt", wir: "fahren", ihr: "fahrt", sie_pl: "fahren", Sie: "fahren" },
    "stehen": { ich: "stehe", du: "stehst", er: "steht", sie_sg: "steht", es: "steht", wir: "stehen", ihr: "steht", sie_pl: "stehen", Sie: "stehen" },
    "wohnen": { ich: "wohne", du: "wohnst", er: "wohnt", sie_sg: "wohnt", es: "wohnt", wir: "wohnen", ihr: "wohnt", sie_pl: "wohnen", Sie: "wohnen" },
    "kommen": { ich: "komme", du: "kommst", er: "kommt", sie_sg: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", sie_pl: "kommen", Sie: "kommen" },
  };

  if (!conjugations[verb]) {
    console.error(`Missing conjugation for: ${verb}`);
    return verb;
  }
  return conjugations[verb][personKey];
}

// English verb forms: first person singular, third person singular, other
// firstPerson is for "ich" (I), thirdPerson is for er/sie_sg/es, base is for all others
function engVerb(personKey, base, thirdPerson, firstPerson) {
  if (personKey === "ich" && firstPerson) return firstPerson;
  if (["er", "sie_sg", "es"].includes(personKey)) return thirdPerson;
  return base;
}

// Nouns organized by gender with translations and semantic tags
const nounsM = [
  { noun: "Hund", tr: "dog", animate: true },
  { noun: "Bruder", tr: "brother", animate: true },
  { noun: "Vater", tr: "father", animate: true },
  { noun: "Freund", tr: "friend", animate: true },
  { noun: "Lehrer", tr: "teacher", animate: true },
  { noun: "Arzt", tr: "doctor", animate: true },
  { noun: "Sohn", tr: "son", animate: true },
  { noun: "Chef", tr: "boss", animate: true },
  { noun: "Nachbar", tr: "neighbor", animate: true },
  { noun: "Kollege", tr: "colleague", animate: true },
  { noun: "Onkel", tr: "uncle", animate: true },
  { noun: "Computer", tr: "computer", animate: false },
  { noun: "Wagen", tr: "car", animate: false },
  { noun: "Garten", tr: "garden", animate: false },
  { noun: "Schlüssel", tr: "key", animate: false },
  { noun: "Koffer", tr: "suitcase", animate: false },
  { noun: "Mantel", tr: "coat", animate: false },
  { noun: "Tisch", tr: "table", animate: false },
  { noun: "Stuhl", tr: "chair", animate: false },
  { noun: "Kuchen", tr: "cake", animate: false },
];

const nounsF = [
  { noun: "Mutter", tr: "mother", animate: true },
  { noun: "Schwester", tr: "sister", animate: true },
  { noun: "Tochter", tr: "daughter", animate: true },
  { noun: "Frau", tr: "wife", animate: true },
  { noun: "Freundin", tr: "girlfriend", animate: true },
  { noun: "Lehrerin", tr: "teacher", animate: true },
  { noun: "Katze", tr: "cat", animate: true },
  { noun: "Tante", tr: "aunt", animate: true },
  { noun: "Tasche", tr: "bag", animate: false },
  { noun: "Wohnung", tr: "apartment", animate: false },
  { noun: "Arbeit", tr: "work", animate: false },
  { noun: "Schule", tr: "school", animate: false },
  { noun: "Jacke", tr: "jacket", animate: false },
  { noun: "Brille", tr: "glasses", animate: false },
  { noun: "Idee", tr: "idea", animate: false },
  { noun: "Stadt", tr: "city", animate: false },
  { noun: "Küche", tr: "kitchen", animate: false },
  { noun: "Musik", tr: "music", animate: false },
  { noun: "Familie", tr: "family", animate: false },
  { noun: "Hilfe", tr: "help", animate: false },
];

const nounsN = [
  { noun: "Auto", tr: "car", animate: false },
  { noun: "Kind", tr: "child", animate: true },
  { noun: "Haus", tr: "house", animate: false },
  { noun: "Buch", tr: "book", animate: false },
  { noun: "Handy", tr: "phone", animate: false },
  { noun: "Zimmer", tr: "room", animate: false },
  { noun: "Fahrrad", tr: "bicycle", animate: false },
  { noun: "Büro", tr: "office", animate: false },
  { noun: "Geld", tr: "money", animate: false },
  { noun: "Geschenk", tr: "gift", animate: false },
  { noun: "Kleid", tr: "dress", animate: false },
  { noun: "Haustier", tr: "pet", animate: true },
  { noun: "Hobby", tr: "hobby", animate: false },
  { noun: "Frühstück", tr: "breakfast", animate: false },
  { noun: "Spiel", tr: "game", animate: false },
  { noun: "Hemd", tr: "shirt", animate: false },
  { noun: "Foto", tr: "photo", animate: false },
  { noun: "Passwort", tr: "password", animate: false },
  { noun: "Ergebnis", tr: "result", animate: false },
  { noun: "Problem", tr: "problem", animate: false },
];

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getEngSubj(personKey) {
  return persons.find(x => x.key === personKey).engSubj;
}

function getDeSubj(personKey) {
  return persons.find(x => x.key === personKey).deSubj;
}

function getEngPoss(personKey) {
  return persons.find(x => x.key === personKey).english;
}

// ============== TEMPLATES ==============
// Each template is a function(personKey, noun, nounTr) returning:
// { before, after, trans, startsWithPoss }
// Templates use conjugate() for proper verb forms and getEngSubj() for translations

// ---- NOMINATIVE templates ----

// For animate nouns (people, animals)
const nomAnimateTemplates = [
  // masculine
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr nett.`, trans: `${getEngPoss(pk)} ${ntr} is very nice.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} kommt morgen.`, trans: `${getEngPoss(pk)} ${ntr} is coming tomorrow.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} wartet draußen.`, trans: `${getEngPoss(pk)} ${ntr} is waiting outside.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist heute nicht da.`, trans: `${getEngPoss(pk)} ${ntr} is not here today.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist wirklich toll.`, trans: `${getEngPoss(pk)} ${ntr} is really great.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Hier ist", after: `${n}.`, trans: `Here is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr freundlich.`, trans: `${getEngPoss(pk)} ${ntr} is very friendly.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist krank.`, trans: `${getEngPoss(pk)} ${ntr} is sick.`, starts: true }) },
  // feminine
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr nett.`, trans: `${getEngPoss(pk)} ${ntr} is very nice.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} kommt aus Berlin.`, trans: `${getEngPoss(pk)} ${ntr} comes from Berlin.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr freundlich.`, trans: `${getEngPoss(pk)} ${ntr} is very friendly.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} wartet draußen.`, trans: `${getEngPoss(pk)} ${ntr} is waiting outside.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist heute nicht da.`, trans: `${getEngPoss(pk)} ${ntr} is not here today.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Hier ist", after: `${n}.`, trans: `Here is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist wunderschön.`, trans: `${getEngPoss(pk)} ${ntr} is beautiful.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist krank.`, trans: `${getEngPoss(pk)} ${ntr} is sick.`, starts: true }) },
  // neuter (Kind, Haustier)
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr lieb.`, trans: `${getEngPoss(pk)} ${ntr} is very sweet.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} spielt draußen.`, trans: `${getEngPoss(pk)} ${ntr} is playing outside.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist heute nicht da.`, trans: `${getEngPoss(pk)} ${ntr} is not here today.`, starts: true }) },
];

// For inanimate nouns
const nomInanimateTemplates = [
  // masculine
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist kaputt.`, trans: `${getEngPoss(pk)} ${ntr} is broken.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr alt.`, trans: `${getEngPoss(pk)} ${ntr} is very old.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist neu.`, trans: `${getEngPoss(pk)} ${ntr} is new.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} funktioniert nicht.`, trans: `${getEngPoss(pk)} ${ntr} doesn't work.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "Hier ist", after: `${n}.`, trans: `Here is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist wirklich toll.`, trans: `${getEngPoss(pk)} ${ntr} is really great.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr groß.`, trans: `${getEngPoss(pk)} ${ntr} is very big.`, starts: true }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist teuer.`, trans: `${getEngPoss(pk)} ${ntr} is expensive.`, starts: true }) },
  // feminine
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr groß.`, trans: `${getEngPoss(pk)} ${ntr} is very big.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist schön.`, trans: `${getEngPoss(pk)} ${ntr} is beautiful.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist toll.`, trans: `${getEngPoss(pk)} ${ntr} is great.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist nicht hier.`, trans: `${getEngPoss(pk)} ${ntr} is not here.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "Hier ist", after: `${n}.`, trans: `Here is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist neu.`, trans: `${getEngPoss(pk)} ${ntr} is new.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} gefällt mir.`, trans: `I like ${getEngPoss(pk)} ${ntr}.`, starts: true }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr wichtig.`, trans: `${getEngPoss(pk)} ${ntr} is very important.`, starts: true }) },
  // neuter
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist kaputt.`, trans: `${getEngPoss(pk)} ${ntr} is broken.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist sehr schön.`, trans: `${getEngPoss(pk)} ${ntr} is very beautiful.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "Wo ist", after: `${n}?`, trans: `Where is ${getEngPoss(pk)} ${ntr}?`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "Das ist", after: `${n}.`, trans: `That is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist neu.`, trans: `${getEngPoss(pk)} ${ntr} is new.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist wirklich groß.`, trans: `${getEngPoss(pk)} ${ntr} is really big.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "Hier ist", after: `${n}.`, trans: `Here is ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} gefällt mir.`, trans: `I like ${getEngPoss(pk)} ${ntr}.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist teuer.`, trans: `${getEngPoss(pk)} ${ntr} is expensive.`, starts: true }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: "", after: `${n} ist alt.`, trans: `${getEngPoss(pk)} ${ntr} is old.`, starts: true }) },
];

// ---- AKKUSATIV templates ----
const akkTemplates = [
  // M
  { gender: "m", verb: "suchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "suchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are looking for", "is looking for", "am looking for")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "brauchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "brauchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "need", "needs")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "sehen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sehen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "see", "sees")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "kennen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "kennen")}`, after: `${n} gut.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "know", "knows")} ${getEngPoss(pk)} ${ntr} well.`, starts: false }) },
  { gender: "m", verb: "finden", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "finden")}`, after: `${n} nett.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "find", "finds")} ${getEngPoss(pk)} ${ntr} nice.`, starts: false }) },
  { gender: "m", verb: "besuchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "besuchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "visit", "visits")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "vermissen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "vermissen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "miss", "misses")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "lieben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "lieben")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "love", "loves")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "haben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "haben")}`, after: `${n} vergessen.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "forgot", "forgot")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "nehmen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "nehmen")}`, after: `${n} mit.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "take", "takes")} ${getEngPoss(pk)} ${ntr} along.`, starts: false }) },
  // F
  { gender: "f", verb: "suchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "suchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are looking for", "is looking for", "am looking for")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "brauchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "brauchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "need", "needs")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "sehen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sehen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "see", "sees")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "kennen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "kennen")}`, after: `${n} gut.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "know", "knows")} ${getEngPoss(pk)} ${ntr} well.`, starts: false }) },
  { gender: "f", verb: "finden", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "finden")}`, after: `${n} schön.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "find", "finds")} ${getEngPoss(pk)} ${ntr} beautiful.`, starts: false }) },
  { gender: "f", verb: "haben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "haben")}`, after: `${n} verloren.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "lost", "lost")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "mögen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "mögen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "like", "likes")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "besuchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "besuchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "visit", "visits")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "vermissen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "vermissen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "miss", "misses")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "nehmen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "nehmen")}`, after: `${n} mit.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "take", "takes")} ${getEngPoss(pk)} ${ntr} along.`, starts: false }) },
  // N
  { gender: "n", verb: "suchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "suchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are looking for", "is looking for", "am looking for")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "brauchen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "brauchen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "need", "needs")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "lesen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "lesen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are reading", "is reading", "am reading")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "haben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "haben")}`, after: `${n} vergessen.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "forgot", "forgot")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "finden", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "finden")}`, after: `${n} toll.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "think", "thinks")} ${getEngPoss(pk)} ${ntr} is great.`, starts: false }) },
  { gender: "n", verb: "nehmen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "nehmen")}`, after: `${n} mit.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "take", "takes")} ${getEngPoss(pk)} ${ntr} along.`, starts: false }) },
  { gender: "n", verb: "mögen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "mögen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "like", "likes")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "verkaufen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "verkaufen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are selling", "is selling", "am selling")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "putzen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "putzen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are cleaning", "is cleaning", "am cleaning")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "reparieren", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "reparieren")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are repairing", "is repairing", "am repairing")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
];

// ---- DATIV templates ----
// For animate nouns (dative person receiving)
const datAnimateTemplates = [
  // M
  { gender: "m", verb: "helfen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "helfen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "help", "helps")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "danken", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "danken")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "thank", "thanks")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "geben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "geben")}`, after: `${n} ein Geschenk.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "give", "gives")} ${getEngPoss(pk)} ${ntr} a gift.`, starts: false }) },
  { gender: "m", verb: "schreiben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "schreiben")}`, after: `${n} einen Brief.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "write", "writes")} ${getEngPoss(pk)} ${ntr} a letter.`, starts: false }) },
  { gender: "m", verb: "erzählen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "erzählen")}`, after: `${n} eine Geschichte.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "tell", "tells")} ${getEngPoss(pk)} ${ntr} a story.`, starts: false }) },
  { gender: "m", verb: "zeigen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "zeigen")}`, after: `${n} das Foto.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "show", "shows")} ${getEngPoss(pk)} ${ntr} the photo.`, starts: false }) },
  { gender: "m", verb: "antworten", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "antworten")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "answer", "answers")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "erklären", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "erklären")}`, after: `${n} die Aufgabe.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "explain", "explains")} the task to ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Das Buch gehört`, after: `${n}.`, trans: `The book belongs to ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "bringen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "bringen")}`, after: `${n} das Essen.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "bring", "brings")} ${getEngPoss(pk)} ${ntr} the food.`, starts: false }) },
  // F
  { gender: "f", verb: "helfen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "helfen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "help", "helps")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "danken", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "danken")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "thank", "thanks")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "geben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "geben")}`, after: `${n} ein Geschenk.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "give", "gives")} ${getEngPoss(pk)} ${ntr} a gift.`, starts: false }) },
  { gender: "f", verb: "schreiben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "schreiben")}`, after: `${n} eine Nachricht.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "write", "writes")} ${getEngPoss(pk)} ${ntr} a message.`, starts: false }) },
  { gender: "f", verb: "erzählen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "erzählen")}`, after: `${n} alles.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "tell", "tells")} ${getEngPoss(pk)} ${ntr} everything.`, starts: false }) },
  { gender: "f", verb: "zeigen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "zeigen")}`, after: `${n} den Weg.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "show", "shows")} ${getEngPoss(pk)} ${ntr} the way.`, starts: false }) },
  { gender: "f", verb: "kaufen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "kaufen")}`, after: `${n} Blumen.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "buy", "buys")} ${getEngPoss(pk)} ${ntr} flowers.`, starts: false }) },
  { gender: "f", verb: "antworten", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "antworten")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "answer", "answers")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Das Auto gehört`, after: `${n}.`, trans: `The car belongs to ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "bringen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "bringen")}`, after: `${n} Kaffee.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "bring", "brings")} ${getEngPoss(pk)} ${ntr} coffee.`, starts: false }) },
  // N (animate: Kind, Haustier)
  { gender: "n", verb: "helfen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "helfen")}`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "help", "helps")} ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "geben", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "geben")}`, after: `${n} Wasser.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "give", "gives")} ${getEngPoss(pk)} ${ntr} water.`, starts: false }) },
  { gender: "n", verb: "zeigen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "zeigen")}`, after: `${n} das Spielzeug.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "show", "shows")} ${getEngPoss(pk)} ${ntr} the toy.`, starts: false }) },
  { gender: "n", verb: "erzählen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "erzählen")}`, after: `${n} eine Geschichte.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "tell", "tells")} ${getEngPoss(pk)} ${ntr} a story.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Das Spielzeug gehört`, after: `${n}.`, trans: `The toy belongs to ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
];

// For inanimate nouns (dativ with prepositions)
const datInanimateTemplates = [
  // M
  { gender: "m", verb: "spielen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "spielen")} mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "play", "plays")} with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "sein", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sein")} zufrieden mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are", "is", "am")} satisfied with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "sitzen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sitzen")} an`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "sit", "sits")} at ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "arbeiten", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "arbeiten")} mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "work", "works")} with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "m", verb: "fahren", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "fahren")} mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "drive", "drives")} with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  // F
  { gender: "f", verb: "sein", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sein")} zufrieden mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are", "is", "am")} satisfied with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "sein", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sein")} in`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are", "is", "am")} in ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "arbeiten", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "arbeiten")} in`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "work", "works")} in ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "kommen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "kommen")} aus`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "come", "comes")} from ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "f", verb: "stehen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "stehen")} in`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "stand", "stands")} in ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  // N
  { gender: "n", verb: "spielen", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "spielen")} mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "play", "plays")} with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "sein", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sein")} zufrieden mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are", "is", "am")} satisfied with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "sein", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "sein")} in`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "are", "is", "am")} in ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "fahren", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "fahren")} mit`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "drive", "drives")} with ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
  { gender: "n", verb: "arbeiten", fn: (pk, n, ntr) => ({ before: `${getDeSubj(pk)} ${conjugate(pk, "arbeiten")} in`, after: `${n}.`, trans: `${getEngSubj(pk)} ${engVerb(pk, "work", "works")} in ${getEngPoss(pk)} ${ntr}.`, starts: false }) },
];

// ---- GENITIV templates (no conjugation needed, fixed structures) ----
const genTemplates = [
  // M
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Das Auto`, after: `${n}s ist rot.`, trans: `The car of ${getEngPoss(pk)} ${ntr} is red.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Der Name`, after: `${n}s ist lang.`, trans: `The name of ${getEngPoss(pk)} ${ntr} is long.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Die Meinung`, after: `${n}s ist wichtig.`, trans: `The opinion of ${getEngPoss(pk)} ${ntr} is important.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Das Büro`, after: `${n}s ist groß.`, trans: `The office of ${getEngPoss(pk)} ${ntr} is big.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Die Hilfe`, after: `${n}s war nötig.`, trans: `The help of ${getEngPoss(pk)} ${ntr} was necessary.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Wegen`, after: `${n}s bin ich hier.`, trans: `Because of ${getEngPoss(pk)} ${ntr} I am here.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Trotz`, after: `${n}s gehe ich.`, trans: `Despite ${getEngPoss(pk)} ${ntr} I am going.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Die Stimme`, after: `${n}s ist laut.`, trans: `The voice of ${getEngPoss(pk)} ${ntr} is loud.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Das Haus`, after: `${n}s ist alt.`, trans: `The house of ${getEngPoss(pk)} ${ntr} is old.`, starts: false }) },
  { gender: "m", fn: (pk, n, ntr) => ({ before: `Die Arbeit`, after: `${n}s ist fertig.`, trans: `The work of ${getEngPoss(pk)} ${ntr} is done.`, starts: false }) },
  // F
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Das Haus`, after: `${n} ist schön.`, trans: `The house of ${getEngPoss(pk)} ${ntr} is beautiful.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Der Name`, after: `${n} ist kurz.`, trans: `The name of ${getEngPoss(pk)} ${ntr} is short.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Die Meinung`, after: `${n} zählt.`, trans: `The opinion of ${getEngPoss(pk)} ${ntr} counts.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Das Auto`, after: `${n} ist neu.`, trans: `The car of ${getEngPoss(pk)} ${ntr} is new.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Die Hilfe`, after: `${n} war wichtig.`, trans: `The help of ${getEngPoss(pk)} ${ntr} was important.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Wegen`, after: `${n} bleibe ich hier.`, trans: `Because of ${getEngPoss(pk)} ${ntr} I stay here.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Trotz`, after: `${n} gehe ich.`, trans: `Despite ${getEngPoss(pk)} ${ntr} I am going.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Die Farbe`, after: `${n} ist rot.`, trans: `The color of ${getEngPoss(pk)} ${ntr} is red.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Die Größe`, after: `${n} ist perfekt.`, trans: `The size of ${getEngPoss(pk)} ${ntr} is perfect.`, starts: false }) },
  { gender: "f", fn: (pk, n, ntr) => ({ before: `Das Ergebnis`, after: `${n} ist gut.`, trans: `The result of ${getEngPoss(pk)} ${ntr} is good.`, starts: false }) },
  // N
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Die Farbe`, after: `${n}s ist blau.`, trans: `The color of ${getEngPoss(pk)} ${ntr} is blue.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Der Preis`, after: `${n}s ist hoch.`, trans: `The price of ${getEngPoss(pk)} ${ntr} is high.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Die Größe`, after: `${n}s ist perfekt.`, trans: `The size of ${getEngPoss(pk)} ${ntr} is perfect.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Der Name`, after: `${n}s ist schön.`, trans: `The name of ${getEngPoss(pk)} ${ntr} is beautiful.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Das Ergebnis`, after: `${n}s war gut.`, trans: `The result of ${getEngPoss(pk)} ${ntr} was good.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Wegen`, after: `${n}s bin ich müde.`, trans: `Because of ${getEngPoss(pk)} ${ntr} I am tired.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Trotz`, after: `${n}s bin ich glücklich.`, trans: `Despite ${getEngPoss(pk)} ${ntr} I am happy.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Die Qualität`, after: `${n}s ist gut.`, trans: `The quality of ${getEngPoss(pk)} ${ntr} is good.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Der Zustand`, after: `${n}s ist schlecht.`, trans: `The condition of ${getEngPoss(pk)} ${ntr} is bad.`, starts: false }) },
  { gender: "n", fn: (pk, n, ntr) => ({ before: `Die Tür`, after: `${n}s ist offen.`, trans: `The door of ${getEngPoss(pk)} ${ntr} is open.`, starts: false }) },
];

// Semantic compatibility for akkusativ
// Some verbs only make sense with animate nouns, some with inanimate
const akkAnimateOnlyVerbs = new Set(["anrufen", "besuchen", "vermissen", "lieben", "kennen"]);
const akkInanimateOnlyVerbs = new Set(["lesen", "verkaufen", "putzen", "reparieren"]);

// Nouns that work with "lesen" (n)
const readableNouns = new Set(["Buch"]);
// Nouns that work with "verkaufen" (n)
const sellableNouns = new Set(["Auto", "Haus", "Fahrrad", "Handy", "Kleid", "Hemd"]);
// Nouns that work with "reparieren"
const repairableNouns = new Set(["Auto", "Fahrrad", "Handy", "Computer"]);
// Nouns that work with "putzen"
const cleanableNouns = new Set(["Auto", "Haus", "Zimmer", "Büro", "Küche", "Wohnung"]);

// Dativ inanimate: nouns that work with specific prepositions
const sittableM = new Set(["Tisch", "Stuhl", "Computer"]); // sitzen an
const drivableM = new Set(["Wagen", "Computer"]); // fahren mit (Wagen), arbeiten mit (Computer)
const playableM = new Set(["Computer", "Hund"]); // spielen mit
const workableF = new Set(["Küche", "Wohnung", "Schule"]); // arbeiten in, sein in
const comefromF = new Set(["Stadt", "Küche", "Wohnung", "Schule"]); // kommen aus
const inN = new Set(["Haus", "Zimmer", "Büro"]); // sein in, arbeiten in

// Seeded RNG
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}
const rng = seededRandom(42);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr) {
  return arr[Math.floor(rng() * arr.length)];
}

// Build all 108 combos (9 persons x 4 cases x 3 genders)
const allCombos = [];
for (const p of persons) {
  for (const c of ["nominativ", "akkusativ", "dativ", "genitiv"]) {
    for (const g of ["m", "f", "n"]) {
      allCombos.push({ personKey: p.key, cas: c, gender: g });
    }
  }
}

// Create enough combos for 500 exercises
let combos = [];
for (let round = 0; round < 5; round++) {
  combos = combos.concat(shuffle(allCombos));
}
combos = combos.slice(0, 500);

const exercises = [];
const templateCounters = {};

for (let i = 0; i < 500; i++) {
  const { personKey, cas, gender } = combos[i];
  const ep = getEngPoss(personKey);

  // Pick noun
  let nounList;
  if (gender === "m") nounList = nounsM;
  else if (gender === "f") nounList = nounsF;
  else nounList = nounsN;

  let nounObj;
  let attempts = 0;
  let template;
  let result;

  // Find a valid noun+template combination
  while (attempts < 50) {
    attempts++;
    nounObj = pickRandom(nounList);

    if (cas === "nominativ") {
      const pool = nounObj.animate
        ? nomAnimateTemplates.filter(t => t.gender === gender)
        : nomInanimateTemplates.filter(t => t.gender === gender);
      const tKey = `nom_${gender}_${nounObj.animate ? "a" : "i"}`;
      if (!templateCounters[tKey]) templateCounters[tKey] = 0;
      const tIdx = templateCounters[tKey] % pool.length;
      templateCounters[tKey]++;
      template = pool[tIdx];
      result = template.fn(personKey, nounObj.noun, nounObj.tr);
      break;
    }

    if (cas === "akkusativ") {
      const pool = akkTemplates.filter(t => t.gender === gender);
      const tKey = `akk_${gender}`;
      if (!templateCounters[tKey]) templateCounters[tKey] = 0;
      const tIdx = templateCounters[tKey] % pool.length;
      templateCounters[tKey]++;
      template = pool[tIdx];

      // Check semantic compatibility
      const verb = template.verb;
      if (akkAnimateOnlyVerbs.has(verb) && !nounObj.animate) continue;
      if (verb === "lesen" && !readableNouns.has(nounObj.noun)) continue;
      if (verb === "verkaufen" && !sellableNouns.has(nounObj.noun)) continue;
      if (verb === "reparieren" && !repairableNouns.has(nounObj.noun)) continue;
      if (verb === "putzen" && !cleanableNouns.has(nounObj.noun)) continue;

      result = template.fn(personKey, nounObj.noun, nounObj.tr);
      break;
    }

    if (cas === "dativ") {
      if (nounObj.animate) {
        const pool = datAnimateTemplates.filter(t => t.gender === gender);
        const tKey = `dat_${gender}_a`;
        if (!templateCounters[tKey]) templateCounters[tKey] = 0;
        const tIdx = templateCounters[tKey] % pool.length;
        templateCounters[tKey]++;
        template = pool[tIdx];
        result = template.fn(personKey, nounObj.noun, nounObj.tr);
        break;
      } else {
        const pool = datInanimateTemplates.filter(t => t.gender === gender);
        if (pool.length === 0) continue;
        const tKey = `dat_${gender}_i`;
        if (!templateCounters[tKey]) templateCounters[tKey] = 0;
        const tIdx = templateCounters[tKey] % pool.length;
        templateCounters[tKey]++;
        template = pool[tIdx];

        // Check semantic compatibility for preposition templates
        const verb = template.verb;
        if (gender === "m" && verb === "sitzen" && !sittableM.has(nounObj.noun)) continue;
        if (gender === "f" && verb === "kommen" && !comefromF.has(nounObj.noun)) continue;
        if (gender === "n" && (verb === "sein" || verb === "arbeiten") && nounObj.noun !== "Haus" && nounObj.noun !== "Zimmer" && nounObj.noun !== "Büro") continue;

        result = template.fn(personKey, nounObj.noun, nounObj.tr);
        break;
      }
    }

    if (cas === "genitiv") {
      const pool = genTemplates.filter(t => t.gender === gender);
      const tKey = `gen_${gender}`;
      if (!templateCounters[tKey]) templateCounters[tKey] = 0;
      const tIdx = templateCounters[tKey] % pool.length;
      templateCounters[tKey]++;
      template = pool[tIdx];
      result = template.fn(personKey, nounObj.noun, nounObj.tr);
      break;
    }
  }

  if (!result) {
    // Fallback: use a simple template
    nounObj = nounList[0];
    result = { before: "Das ist", after: `${nounObj.noun}.`, trans: `That is ${ep} ${nounObj.tr}.`, starts: false };
  }

  // Get the correct possessive form
  let form = getFormForPerson(personKey, cas, gender);

  // Capitalize if at sentence start
  if (result.starts) {
    form = capitalize(form);
  }

  // Capitalize English possessive in translation when at start
  let trans = result.trans;
  // Capitalize "my", "your" etc at start of English sentence
  if (trans.startsWith(ep)) {
    trans = capitalize(ep) + trans.slice(ep.length);
  }

  exercises.push({
    person: personKey,
    case: cas,
    gender: gender,
    noun: nounObj.noun,
    nounTranslation: nounObj.tr,
    correctForm: form,
    sentenceBefore: result.before,
    sentenceAfter: result.after,
    translation: trans,
  });
}

// Output TypeScript file
let output = `export interface PossessiveExerciseData {
  person: "ich" | "du" | "er" | "sie_sg" | "es" | "wir" | "ihr" | "sie_pl" | "Sie";
  case: "nominativ" | "akkusativ" | "dativ" | "genitiv";
  gender: "m" | "f" | "n";
  noun: string;
  nounTranslation: string;
  correctForm: string;
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}

const possessiveExercises: PossessiveExerciseData[] = [\n`;

for (let i = 0; i < exercises.length; i++) {
  const e = exercises[i];
  output += `  {\n`;
  output += `    person: "${e.person}",\n`;
  output += `    case: "${e.case}",\n`;
  output += `    gender: "${e.gender}",\n`;
  output += `    noun: "${e.noun}",\n`;
  output += `    nounTranslation: "${e.nounTranslation}",\n`;
  output += `    correctForm: "${e.correctForm}",\n`;
  output += `    sentenceBefore: "${e.sentenceBefore}",\n`;
  output += `    sentenceAfter: "${e.sentenceAfter}",\n`;
  output += `    translation: "${e.translation}",\n`;
  output += `  }`;
  if (i < exercises.length - 1) output += `,`;
  output += `\n`;
}

output += `];\n\nexport default possessiveExercises;\n`;

process.stdout.write(output);

// Stats to stderr
const personCounts = {};
const caseCounts = {};
const genderCounts = {};
const nounSet = new Set();

for (const e of exercises) {
  personCounts[e.person] = (personCounts[e.person] || 0) + 1;
  caseCounts[e.case] = (caseCounts[e.case] || 0) + 1;
  genderCounts[e.gender] = (genderCounts[e.gender] || 0) + 1;
  nounSet.add(e.noun);
}

console.error(`\nTotal exercises: ${exercises.length}`);
console.error(`\nPerson distribution:`, personCounts);
console.error(`Case distribution:`, caseCounts);
console.error(`Gender distribution:`, genderCounts);
console.error(`Unique nouns: ${nounSet.size}`);
