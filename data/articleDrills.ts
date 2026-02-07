import type { Gender, GrammaticalCase } from "../lib/types";

export interface ArticleDrillNoun {
  noun: string;
  gender: Gender;
  translation: string;
}

export const articleDrillNouns: ArticleDrillNoun[] = [
  { noun: "Mann", gender: "m", translation: "man" },
  { noun: "Frau", gender: "f", translation: "woman" },
  { noun: "Kind", gender: "n", translation: "child" },
  { noun: "Tisch", gender: "m", translation: "table" },
  { noun: "Lampe", gender: "f", translation: "lamp" },
  { noun: "Fenster", gender: "n", translation: "window" },
  { noun: "Stuhl", gender: "m", translation: "chair" },
  { noun: "Tür", gender: "f", translation: "door" },
  { noun: "Bild", gender: "n", translation: "picture" },
  { noun: "Garten", gender: "m", translation: "garden" },
  { noun: "Straße", gender: "f", translation: "street" },
  { noun: "Zimmer", gender: "n", translation: "room" },
  { noun: "Arzt", gender: "m", translation: "doctor" },
  { noun: "Schule", gender: "f", translation: "school" },
  { noun: "Restaurant", gender: "n", translation: "restaurant" },
];

export interface ArticleDrillTemplate {
  case: GrammaticalCase;
  template: string;
  translation: string;
}

/**
 * 24 sentence templates (6 per case) with [ART] placeholder for article + noun.
 */
export const articleDrillTemplates: ArticleDrillTemplate[] = [
  // Nominativ (6)
  { case: "nominativ", template: "[ART] ist hier.", translation: "[ART] is here." },
  { case: "nominativ", template: "[ART] ist sehr alt.", translation: "[ART] is very old." },
  { case: "nominativ", template: "Wo ist [ART]?", translation: "Where is [ART]?" },
  { case: "nominativ", template: "[ART] gefällt mir.", translation: "I like [ART]." },
  { case: "nominativ", template: "[ART] kommt bald.", translation: "[ART] is coming soon." },
  { case: "nominativ", template: "[ART] ist neu.", translation: "[ART] is new." },
  // Akkusativ (6)
  { case: "akkusativ", template: "Ich sehe [ART].", translation: "I see [ART]." },
  { case: "akkusativ", template: "Er kauft [ART].", translation: "He buys [ART]." },
  { case: "akkusativ", template: "Wir brauchen [ART].", translation: "We need [ART]." },
  { case: "akkusativ", template: "Sie findet [ART].", translation: "She finds [ART]." },
  { case: "akkusativ", template: "Ich nehme [ART].", translation: "I take [ART]." },
  { case: "akkusativ", template: "Kennst du [ART]?", translation: "Do you know [ART]?" },
  // Dativ (6)
  { case: "dativ", template: "Ich helfe [ART].", translation: "I help [ART]." },
  { case: "dativ", template: "Er spricht mit [ART].", translation: "He speaks with [ART]." },
  { case: "dativ", template: "Sie gibt [ART] etwas.", translation: "She gives [ART] something." },
  { case: "dativ", template: "Wir wohnen neben [ART].", translation: "We live next to [ART]." },
  { case: "dativ", template: "Das gehört [ART].", translation: "That belongs to [ART]." },
  { case: "dativ", template: "Ich komme aus [ART].", translation: "I come from [ART]." },
  // Genitiv (6)
  { case: "genitiv", template: "Das ist das Haus [ART].", translation: "That is the house of [ART]." },
  { case: "genitiv", template: "Die Farbe [ART] ist schön.", translation: "The color of [ART] is nice." },
  { case: "genitiv", template: "Wegen [ART] bleibe ich.", translation: "Because of [ART], I stay." },
  { case: "genitiv", template: "Trotz [ART] gehen wir.", translation: "Despite [ART], we go." },
  { case: "genitiv", template: "Der Preis [ART] ist hoch.", translation: "The price of [ART] is high." },
  { case: "genitiv", template: "Die Qualität [ART] ist gut.", translation: "The quality of [ART] is good." },
];
