import type { MatchExercise, OverallLevel } from "../lib/overall-types";

function sets(prefix: string, level: OverallLevel, topic: string, leftLabel: string, rightLabel: string, rows: string[]): MatchExercise[] {
  return rows.map((row, i) => ({
    id: `${prefix}-${i + 1}`, level, topic, bookSection: "Additional practice",
    kind: "match", instruction: `Connect each ${leftLabel.toLowerCase()} to its ${rightLabel.toLowerCase()}.`, leftLabel, rightLabel,
    pairs: row.split(";").map(pair => { const [left, right] = pair.split("|"); return { left, right }; }),
    explanation: "Read each pair together. You can change any connection before checking your answer.",
  }));
}

export const comparisonMatches = [
  ...sets("match-comparative", "A2", "Comparatives", "Base form", "Comparative", [
    "gut|besser;viel|mehr;gern|lieber;hoch|höher",
    "groß|größer;klein|kleiner;alt|älter;jung|jünger",
    "warm|wärmer;kalt|kälter;lang|länger;kurz|kürzer",
    "teuer|teurer;billig|billiger;dunkel|dunkler;hell|heller",
    "schnell|schneller;langsam|langsamer;nah|näher;stark|stärker",
  ]),
  ...sets("match-superlative", "A2", "Superlatives", "Comparative", "Superlative", [
    "besser|am besten;mehr|am meisten;lieber|am liebsten;höher|am höchsten",
    "größer|am größten;kleiner|am kleinsten;älter|am ältesten;jünger|am jüngsten",
    "wärmer|am wärmsten;kälter|am kältesten;länger|am längsten;kürzer|am kürzesten",
    "teurer|am teuersten;billiger|am billigsten;dunkler|am dunkelsten;heller|am hellsten",
    "schneller|am schnellsten;langsamer|am langsamsten;näher|am nächsten;stärker|am stärksten",
  ]),
];
export const wordMatches = [
  ...sets("match-opposite", "A1", "Opposites", "Word", "Opposite", [
    "groß|klein;alt|jung;lang|kurz;breit|schmal",
    "heiß|kalt;hell|dunkel;laut|leise;schnell|langsam",
    "teuer|billig;reich|arm;voll|leer;sauber|schmutzig",
    "früh|spät;offen|geschlossen;richtig|falsch;einfach|schwierig",
    "oben|unten;links|rechts;vorne|hinten;innen|außen",
    "kaufen|verkaufen;kommen|gehen;geben|nehmen;öffnen|schließen",
  ]),
  ...sets("match-synonym", "A2", "Similar meanings", "Word or phrase", "Similar meaning", [
    "beginnen|anfangen;beenden|zu Ende bringen;bekommen|erhalten;sprechen|reden",
    "das Auto|der Wagen;das Fahrrad|das Rad;der Urlaub|die Ferien;das Geschäft|der Laden",
    "oft|häufig;manchmal|ab und zu;sofort|gleich jetzt;fast|beinahe",
    "preiswert|günstig;schön|hübsch;klug|intelligent;erschöpft|sehr müde",
    "telefonieren|anrufen und sprechen;spazieren gehen|einen Spaziergang machen;putzen|sauber machen;warten|sich gedulden",
  ]),
];
