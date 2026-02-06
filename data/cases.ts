import type { CaseSentence } from "../lib/types";

const caseSentences: CaseSentence[] = [
  {
    id: 1,
    sentence: "Der Hund frisst den Knochen.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "den Knochen", case: "akkusativ" },
    ],
    translation: "The dog eats the bone.",
  },
  {
    id: 2,
    sentence: "Die Frau gibt dem Kind ein Buch.",
    nounPhrases: [
      { text: "Die Frau", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
      { text: "ein Buch", case: "akkusativ" },
    ],
    translation: "The woman gives the child a book.",
  },
  {
    id: 3,
    sentence: "Das Auto des Mannes ist rot.",
    nounPhrases: [
      { text: "Das Auto", case: "nominativ" },
      { text: "des Mannes", case: "genitiv" },
    ],
    translation: "The man's car is red.",
  },
  {
    id: 4,
    sentence: "Ich helfe dem alten Mann.",
    nounPhrases: [
      { text: "dem alten Mann", case: "dativ" },
    ],
    translation: "I help the old man.",
  },
  {
    id: 5,
    sentence: "Der Lehrer erklärt den Schülern die Aufgabe.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "den Schülern", case: "dativ" },
      { text: "die Aufgabe", case: "akkusativ" },
    ],
    translation: "The teacher explains the assignment to the students.",
  },
  {
    id: 6,
    sentence: "Wegen des Regens bleiben wir zu Hause.",
    nounPhrases: [
      { text: "des Regens", case: "genitiv" },
    ],
    translation: "Because of the rain, we stay at home.",
  },
  {
    id: 7,
    sentence: "Die Mutter kauft der Tochter ein Kleid.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "der Tochter", case: "dativ" },
      { text: "ein Kleid", case: "akkusativ" },
    ],
    translation: "The mother buys the daughter a dress.",
  },
  {
    id: 8,
    sentence: "Der Junge wirft den Ball über den Zaun.",
    nounPhrases: [
      { text: "Der Junge", case: "nominativ" },
      { text: "den Ball", case: "akkusativ" },
      { text: "den Zaun", case: "akkusativ" },
    ],
    translation: "The boy throws the ball over the fence.",
  },
  {
    id: 9,
    sentence: "Das Buch des Professors liegt auf dem Tisch.",
    nounPhrases: [
      { text: "Das Buch", case: "nominativ" },
      { text: "des Professors", case: "genitiv" },
      { text: "dem Tisch", case: "dativ" },
    ],
    translation: "The professor's book is on the table.",
  },
  {
    id: 10,
    sentence: "Er schenkt seiner Freundin einen Ring.",
    nounPhrases: [
      { text: "seiner Freundin", case: "dativ" },
      { text: "einen Ring", case: "akkusativ" },
    ],
    translation: "He gives his girlfriend a ring.",
  },
  {
    id: 11,
    sentence: "Die Kinder spielen in dem großen Garten.",
    nounPhrases: [
      { text: "Die Kinder", case: "nominativ" },
      { text: "dem großen Garten", case: "dativ" },
    ],
    translation: "The children play in the big garden.",
  },
  {
    id: 12,
    sentence: "Trotz des schlechten Wetters gehen wir spazieren.",
    nounPhrases: [
      { text: "des schlechten Wetters", case: "genitiv" },
    ],
    translation: "Despite the bad weather, we go for a walk.",
  },
  {
    id: 13,
    sentence: "Der Arzt untersucht den Patienten.",
    nounPhrases: [
      { text: "Der Arzt", case: "nominativ" },
      { text: "den Patienten", case: "akkusativ" },
    ],
    translation: "The doctor examines the patient.",
  },
  {
    id: 14,
    sentence: "Sie zeigt dem Touristen den Weg.",
    nounPhrases: [
      { text: "dem Touristen", case: "dativ" },
      { text: "den Weg", case: "akkusativ" },
    ],
    translation: "She shows the tourist the way.",
  },
  {
    id: 15,
    sentence: "Die Farbe des Himmels ist wunderschön.",
    nounPhrases: [
      { text: "Die Farbe", case: "nominativ" },
      { text: "des Himmels", case: "genitiv" },
    ],
    translation: "The color of the sky is beautiful.",
  },
  {
    id: 16,
    sentence: "Der Koch bereitet dem Gast ein besonderes Menü zu.",
    nounPhrases: [
      { text: "Der Koch", case: "nominativ" },
      { text: "dem Gast", case: "dativ" },
      { text: "ein besonderes Menü", case: "akkusativ" },
    ],
    translation: "The cook prepares a special menu for the guest.",
  },
  {
    id: 17,
    sentence: "Während der Pause trinke ich einen Kaffee.",
    nounPhrases: [
      { text: "der Pause", case: "genitiv" },
      { text: "einen Kaffee", case: "akkusativ" },
    ],
    translation: "During the break, I drink a coffee.",
  },
  {
    id: 18,
    sentence: "Das Mädchen schreibt dem Freund einen Brief.",
    nounPhrases: [
      { text: "Das Mädchen", case: "nominativ" },
      { text: "dem Freund", case: "dativ" },
      { text: "einen Brief", case: "akkusativ" },
    ],
    translation: "The girl writes the friend a letter.",
  },
  {
    id: 19,
    sentence: "Der Polizist folgt dem Verdächtigen durch die Stadt.",
    nounPhrases: [
      { text: "Der Polizist", case: "nominativ" },
      { text: "dem Verdächtigen", case: "dativ" },
      { text: "die Stadt", case: "akkusativ" },
    ],
    translation: "The police officer follows the suspect through the city.",
  },
  {
    id: 20,
    sentence: "Innerhalb des Gebäudes ist das Rauchen verboten.",
    nounPhrases: [
      { text: "des Gebäudes", case: "genitiv" },
      { text: "das Rauchen", case: "nominativ" },
    ],
    translation: "Smoking is prohibited inside the building.",
  },
  {
    id: 21,
    sentence: "Die Studentin leiht sich das Buch aus der Bibliothek.",
    nounPhrases: [
      { text: "Die Studentin", case: "nominativ" },
      { text: "das Buch", case: "akkusativ" },
      { text: "der Bibliothek", case: "dativ" },
    ],
    translation: "The student borrows the book from the library.",
  },
  {
    id: 22,
    sentence: "Er erzählt den Kindern eine Geschichte.",
    nounPhrases: [
      { text: "den Kindern", case: "dativ" },
      { text: "eine Geschichte", case: "akkusativ" },
    ],
    translation: "He tells the children a story.",
  },
  {
    id: 23,
    sentence: "Der Hund des Nachbarn bellt die ganze Nacht.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "des Nachbarn", case: "genitiv" },
      { text: "die ganze Nacht", case: "akkusativ" },
    ],
    translation: "The neighbor's dog barks all night.",
  },
  {
    id: 24,
    sentence: "Sie bringt dem Kranken eine Suppe.",
    nounPhrases: [
      { text: "dem Kranken", case: "dativ" },
      { text: "eine Suppe", case: "akkusativ" },
    ],
    translation: "She brings the sick person a soup.",
  },
  {
    id: 25,
    sentence: "Anstelle des Direktors leitet die Sekretärin das Meeting.",
    nounPhrases: [
      { text: "des Direktors", case: "genitiv" },
      { text: "die Sekretärin", case: "nominativ" },
      { text: "das Meeting", case: "akkusativ" },
    ],
    translation: "Instead of the director, the secretary leads the meeting.",
  },
];

export default caseSentences;
