import type { Gender } from "../lib/types";

export interface AdjectiveNounPair {
  adjective: string;
  adjectiveTranslation: string;
  noun: string;
  nounTranslation: string;
  gender: Gender;
}

export interface SentenceTemplate {
  case: "nominativ" | "akkusativ" | "dativ" | "genitiv";
  template: string;
}

/**
 * 30 adjective-noun pairs for generating adjective ending exercises.
 */
export const adjectiveNounPairs: AdjectiveNounPair[] = [
  { adjective: "groß", adjectiveTranslation: "tall/big", noun: "Mann", nounTranslation: "man", gender: "m" },
  { adjective: "klein", adjectiveTranslation: "small", noun: "Kind", nounTranslation: "child", gender: "n" },
  { adjective: "alt", adjectiveTranslation: "old", noun: "Frau", nounTranslation: "woman", gender: "f" },
  { adjective: "jung", adjectiveTranslation: "young", noun: "Mädchen", nounTranslation: "girl", gender: "n" },
  { adjective: "schön", adjectiveTranslation: "beautiful", noun: "Blume", nounTranslation: "flower", gender: "f" },
  { adjective: "rot", adjectiveTranslation: "red", noun: "Auto", nounTranslation: "car", gender: "n" },
  { adjective: "neu", adjectiveTranslation: "new", noun: "Haus", nounTranslation: "house", gender: "n" },
  { adjective: "lang", adjectiveTranslation: "long", noun: "Straße", nounTranslation: "street", gender: "f" },
  { adjective: "kalt", adjectiveTranslation: "cold", noun: "Winter", nounTranslation: "winter", gender: "m" },
  { adjective: "warm", adjectiveTranslation: "warm", noun: "Sommer", nounTranslation: "summer", gender: "m" },
  { adjective: "gut", adjectiveTranslation: "good", noun: "Buch", nounTranslation: "book", gender: "n" },
  { adjective: "schlecht", adjectiveTranslation: "bad", noun: "Wetter", nounTranslation: "weather", gender: "n" },
  { adjective: "schnell", adjectiveTranslation: "fast", noun: "Zug", nounTranslation: "train", gender: "m" },
  { adjective: "langsam", adjectiveTranslation: "slow", noun: "Bus", nounTranslation: "bus", gender: "m" },
  { adjective: "teuer", adjectiveTranslation: "expensive", noun: "Restaurant", nounTranslation: "restaurant", gender: "n" },
  { adjective: "billig", adjectiveTranslation: "cheap", noun: "Hotel", nounTranslation: "hotel", gender: "n" },
  { adjective: "interessant", adjectiveTranslation: "interesting", noun: "Film", nounTranslation: "film", gender: "m" },
  { adjective: "langweilig", adjectiveTranslation: "boring", noun: "Vorlesung", nounTranslation: "lecture", gender: "f" },
  { adjective: "lecker", adjectiveTranslation: "delicious", noun: "Kuchen", nounTranslation: "cake", gender: "m" },
  { adjective: "frisch", adjectiveTranslation: "fresh", noun: "Brot", nounTranslation: "bread", gender: "n" },
  { adjective: "dunkel", adjectiveTranslation: "dark", noun: "Nacht", nounTranslation: "night", gender: "f" },
  { adjective: "hell", adjectiveTranslation: "bright", noun: "Zimmer", nounTranslation: "room", gender: "n" },
  { adjective: "schwer", adjectiveTranslation: "heavy", noun: "Koffer", nounTranslation: "suitcase", gender: "m" },
  { adjective: "leicht", adjectiveTranslation: "light", noun: "Tasche", nounTranslation: "bag", gender: "f" },
  { adjective: "stark", adjectiveTranslation: "strong", noun: "Kaffee", nounTranslation: "coffee", gender: "m" },
  { adjective: "süß", adjectiveTranslation: "sweet", noun: "Schokolade", nounTranslation: "chocolate", gender: "f" },
  { adjective: "hoch", adjectiveTranslation: "high/tall", noun: "Berg", nounTranslation: "mountain", gender: "m" },
  { adjective: "tief", adjectiveTranslation: "deep", noun: "See", nounTranslation: "lake", gender: "m" },
  { adjective: "breit", adjectiveTranslation: "wide", noun: "Fluss", nounTranslation: "river", gender: "m" },
  { adjective: "eng", adjectiveTranslation: "narrow", noun: "Gasse", nounTranslation: "alley", gender: "f" },
];

/**
 * 20 sentence templates (5 per case) for generating adjective exercises.
 * [NP] is replaced with the noun phrase (article + adjective + noun).
 */
export const sentenceTemplates: SentenceTemplate[] = [
  // Nominativ (5)
  { case: "nominativ", template: "[NP] ist hier." },
  { case: "nominativ", template: "[NP] kommt morgen." },
  { case: "nominativ", template: "[NP] gefällt mir." },
  { case: "nominativ", template: "Wo ist [NP]?" },
  { case: "nominativ", template: "[NP] ist sehr schön." },
  // Akkusativ (5)
  { case: "akkusativ", template: "Ich sehe [NP]." },
  { case: "akkusativ", template: "Er kauft [NP]." },
  { case: "akkusativ", template: "Wir brauchen [NP]." },
  { case: "akkusativ", template: "Sie hat [NP] gefunden." },
  { case: "akkusativ", template: "Ich möchte [NP] bitte." },
  // Dativ (5)
  { case: "dativ", template: "Ich gebe [NP] ein Geschenk." },
  { case: "dativ", template: "Er hilft [NP]." },
  { case: "dativ", template: "Sie kommt mit [NP]." },
  { case: "dativ", template: "Wir wohnen neben [NP]." },
  { case: "dativ", template: "Das gehört [NP]." },
  // Genitiv (5)
  { case: "genitiv", template: "Das ist das Haus [NP]." },
  { case: "genitiv", template: "Die Farbe [NP] ist schön." },
  { case: "genitiv", template: "Wegen [NP] bleibe ich zu Hause." },
  { case: "genitiv", template: "Trotz [NP] gehen wir raus." },
  { case: "genitiv", template: "Das Ende [NP] war überraschend." },
];
