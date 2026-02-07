import type { Gender, GrammaticalCase, Person } from "../lib/types";

/**
 * Possessive pronoun stems by person.
 */
const possessiveStems: Record<Person, string> = {
  ich: "mein",
  du: "dein",
  er: "sein",
  sie_sg: "ihr",
  es: "sein",
  wir: "unser",
  ihr: "euer",
  sie_pl: "ihr",
  Sie: "Ihr",
};

/**
 * Endings for possessive pronouns (same pattern as indefinite articles).
 */
const possessiveEndings: Record<GrammaticalCase, Record<Gender, string>> = {
  nominativ: { m: "", f: "e", n: "" },
  akkusativ: { m: "en", f: "e", n: "" },
  dativ: { m: "em", f: "er", n: "em" },
  genitiv: { m: "es", f: "er", n: "es" },
};

/**
 * Get the full possessive pronoun form for a given person, case, and gender.
 * Handles special "euer" contraction (euer -> eure, eurem, etc.)
 */
export function getPossessiveForm(
  person: Person,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  const stem = possessiveStems[person];
  const ending = possessiveEndings[grammaticalCase][gender];

  // Special case: "euer" drops the inner "e" when an ending is added
  if (person === "ihr" && ending) {
    return "eur" + ending;
  }

  return stem + ending;
}

export const personLabels: Record<Person, string> = {
  ich: "ich (I)",
  du: "du (you)",
  er: "er (he)",
  sie_sg: "sie (she)",
  es: "es (it)",
  wir: "wir (we)",
  ihr: "ihr (you pl.)",
  sie_pl: "sie (they)",
  Sie: "Sie (you formal)",
};

export interface PossessiveNoun {
  noun: string;
  gender: Gender;
  translation: string;
}

export const possessiveNouns: PossessiveNoun[] = [
  { noun: "Hund", gender: "m", translation: "dog" },
  { noun: "Katze", gender: "f", translation: "cat" },
  { noun: "Buch", gender: "n", translation: "book" },
  { noun: "Bruder", gender: "m", translation: "brother" },
  { noun: "Schwester", gender: "f", translation: "sister" },
  { noun: "Auto", gender: "n", translation: "car" },
  { noun: "Lehrer", gender: "m", translation: "teacher" },
  { noun: "Mutter", gender: "f", translation: "mother" },
  { noun: "Haus", gender: "n", translation: "house" },
  { noun: "Freund", gender: "m", translation: "friend" },
  { noun: "Tasche", gender: "f", translation: "bag" },
  { noun: "Handy", gender: "n", translation: "phone" },
  { noun: "Vater", gender: "m", translation: "father" },
  { noun: "Arbeit", gender: "f", translation: "work" },
  { noun: "Fahrrad", gender: "n", translation: "bicycle" },
];

export interface PossessiveTemplate {
  case: GrammaticalCase;
  template: string;
  translation: string;
}

/**
 * 24 sentence templates (6 per case) with [PP] placeholder for the possessive + noun.
 */
export const possessiveTemplates: PossessiveTemplate[] = [
  // Nominativ (6)
  { case: "nominativ", template: "[PP] ist sehr groß.", translation: "[PP] is very big." },
  { case: "nominativ", template: "[PP] kommt morgen.", translation: "[PP] is coming tomorrow." },
  { case: "nominativ", template: "[PP] ist kaputt.", translation: "[PP] is broken." },
  { case: "nominativ", template: "Wo ist [PP]?", translation: "Where is [PP]?" },
  { case: "nominativ", template: "[PP] gefällt mir.", translation: "I like [PP]." },
  { case: "nominativ", template: "[PP] ist hier.", translation: "[PP] is here." },
  // Akkusativ (6)
  { case: "akkusativ", template: "Ich sehe [PP].", translation: "I see [PP]." },
  { case: "akkusativ", template: "Er sucht [PP].", translation: "He is looking for [PP]." },
  { case: "akkusativ", template: "Wir brauchen [PP].", translation: "We need [PP]." },
  { case: "akkusativ", template: "Sie findet [PP].", translation: "She finds [PP]." },
  { case: "akkusativ", template: "Hast du [PP] gesehen?", translation: "Have you seen [PP]?" },
  { case: "akkusativ", template: "Ich rufe [PP] an.", translation: "I am calling [PP]." },
  // Dativ (6)
  { case: "dativ", template: "Ich helfe [PP].", translation: "I help [PP]." },
  { case: "dativ", template: "Er spricht mit [PP].", translation: "He talks to [PP]." },
  { case: "dativ", template: "Sie gibt [PP] etwas.", translation: "She gives [PP] something." },
  { case: "dativ", template: "Wir fahren zu [PP].", translation: "We drive to [PP]." },
  { case: "dativ", template: "Das gehört [PP].", translation: "That belongs to [PP]." },
  { case: "dativ", template: "Ich danke [PP].", translation: "I thank [PP]." },
  // Genitiv (6)
  { case: "genitiv", template: "Das ist das Zimmer [PP].", translation: "That is the room of [PP]." },
  { case: "genitiv", template: "Die Farbe [PP] ist schön.", translation: "The color of [PP] is nice." },
  { case: "genitiv", template: "Wegen [PP] komme ich zu spät.", translation: "Because of [PP], I am late." },
  { case: "genitiv", template: "Trotz [PP] bin ich glücklich.", translation: "Despite [PP], I am happy." },
  { case: "genitiv", template: "Der Name [PP] ist lang.", translation: "The name of [PP] is long." },
  { case: "genitiv", template: "Die Größe [PP] überrascht mich.", translation: "The size of [PP] surprises me." },
];
