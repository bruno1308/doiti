import type { OverallExercise } from "../lib/overall-types";

const rows = [
  ["denn", "Ich nehme den Bus, ___ mein Fahrrad ist kaputt.", "Denn connects main clauses. The verb keeps its normal position."],
  ["denn", "Wir bleiben drinnen, ___ es regnet stark.", "After denn: es regnet, with normal main-clause word order."],
  ["denn", "Sie lernt viel, ___ morgen hat sie eine Prüfung.", "Denn does not occupy the first position inside the next main clause: morgen hat sie …"],
  ["denn", "Ich gehe schlafen, ___ ich bin müde.", "Denn gives a reason without moving the verb to the end."],
  ["dann", "Zuerst frühstücke ich. ___ gehe ich zur Arbeit.", "Dann means then. At the beginning of a statement, it is followed by the verb."],
  ["dann", "Zuerst waschen wir das Gemüse. ___ schneiden wir es klein.", "Dann links steps in a sequence: dann schneiden wir …"],
  ["dann", "Erst machen wir die Hausaufgaben. ___ spielen wir draußen.", "Dann occupies the first position, so spielen comes before wir."],
  ["dann", "Zuerst kaufe ich eine Fahrkarte. ___ steige ich in den Zug.", "Use dann for the next step: dann steige ich …"],
  ["wenn", "___ du morgen Zeit hast, komm bitte vorbei.", "Wenn introduces a condition. Hast goes to the end of that clause."],
  ["wenn", "___ es morgen regnet, bleiben wir zu Hause.", "Wenn means if here. The conditional clause ends with regnet."],
  ["wenn", "Ruf mich bitte an, ___ du angekommen bist.", "Wenn means when here; in the Perfekt clause, the auxiliary bist goes last."],
  ["wenn", "___ ich reich wäre, würde ich weniger arbeiten.", "Wenn introduces an unreal condition; wäre closes that clause."],
] as const;
export const connectorPractice: OverallExercise[] = rows.map(([answer, sentence, explanation], i) => ({
  id: `connector-contrast-${i + 1}`, level: "A2" as const, topic: "Dann, denn or wenn", bookSection: "Additional practice",
  kind: "choice" as const, instruction: "Choose the word that fits the meaning and word order.", sentence, answer,
  options: ["dann", "denn", "wenn", "ob"].map(word => sentence.startsWith("___") ? word[0].toUpperCase() + word.slice(1) : word),
  explanation,
})).map(e => ({ ...e, answer: e.sentence.startsWith("___") ? e.answer[0].toUpperCase() + e.answer.slice(1) : e.answer }));

const puzzles = [
  "Zuerst frühstücke ich.|Dann|gehe|ich|zur Arbeit.",
  "Zuerst lesen wir den Text.|Dann|beantworten|wir|die Fragen.",
  "Ich bleibe zu Hause,|denn|ich|bin|krank.",
  "Ich bleibe zu Hause,|weil|ich|krank|bin.",
  "Wenn ich Zeit habe,|komme|ich|vorbei.",
  "Wenn ich mehr Geld hätte,|würde|ich|ein Fahrrad|kaufen.",
  "Wenn wir im Urlaub wären,|würden|wir|jeden Tag|schwimmen.",
  "Ich habe viel gelernt.|Deshalb|bestehe|ich|die Prüfung.",
  "Es regnet.|Trotzdem|gehen|wir|spazieren.",
  "Ich weiß,|dass|du|morgen|kommst.",
  "Ich frage mich,|ob|er|heute|arbeitet.",
  "Obwohl ich müde bin,|mache|ich|meine Hausaufgaben.",
];
export const connectorPuzzles: OverallExercise[] = puzzles.map((row, i) => {
  const chunks = row.split("|");
  return { id: `connector-puzzle-${i + 1}`, level: "A2", topic: i === 5 || i === 6 ? "Conditional sentences" : "Connecting sentences", bookSection: "Additional practice",
    kind: "order", instruction: `Build the sentence. Start with “${chunks[0]}”.`, chunks, orders: [chunks.map((_, j) => j)],
    explanation: "Main clauses keep the conjugated verb in second position. A subordinate clause introduced by weil, wenn, dass, ob or obwohl places it at the end. An opening subordinate clause occupies the first position of the following main clause.",
  };
});
