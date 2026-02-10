export interface PronounExerciseData {
  person: "ich" | "du" | "er" | "sie_sg" | "es" | "wir" | "ihr" | "sie_pl" | "Sie";
  case: "nominativ" | "akkusativ" | "dativ";
  correctForm: string;
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}

const pronounExercises: PronounExerciseData[] = [
  // =============================================
  // NOMINATIV (20 exercises)
  // =============================================

  // ich (3)
  {
    person: "ich",
    case: "nominativ",
    correctForm: "Ich",
    sentenceBefore: "",
    sentenceAfter: "gehe heute ins Kino.",
    translation: "I'm going to the cinema today.",
  },
  {
    person: "ich",
    case: "nominativ",
    correctForm: "ich",
    sentenceBefore: "Morgen komme",
    sentenceAfter: "zu dir.",
    translation: "Tomorrow I'll come to your place.",
  },
  {
    person: "ich",
    case: "nominativ",
    correctForm: "ich",
    sentenceBefore: "Am Wochenende bin",
    sentenceAfter: "zu Hause.",
    translation: "On the weekend I'm at home.",
  },
  // du (2)
  {
    person: "du",
    case: "nominativ",
    correctForm: "Du",
    sentenceBefore: "",
    sentenceAfter: "bist mein bester Freund.",
    translation: "You are my best friend.",
  },
  {
    person: "du",
    case: "nominativ",
    correctForm: "du",
    sentenceBefore: "Wann kommst",
    sentenceAfter: "nach Hause?",
    translation: "When are you coming home?",
  },
  // er (2)
  {
    person: "er",
    case: "nominativ",
    correctForm: "Er",
    sentenceBefore: "",
    sentenceAfter: "spielt jeden Tag Fußball.",
    translation: "He plays football every day.",
  },
  {
    person: "er",
    case: "nominativ",
    correctForm: "er",
    sentenceBefore: "Gestern hat",
    sentenceAfter: "einen Kuchen gebacken.",
    translation: "Yesterday he baked a cake.",
  },
  // sie_sg (2)
  {
    person: "sie_sg",
    case: "nominativ",
    correctForm: "Sie",
    sentenceBefore: "",
    sentenceAfter: "liest gern Bücher.",
    translation: "She likes reading books.",
  },
  {
    person: "sie_sg",
    case: "nominativ",
    correctForm: "sie",
    sentenceBefore: "Heute hat",
    sentenceAfter: "ein neues Kleid gekauft.",
    translation: "Today she bought a new dress.",
  },
  // es (2)
  {
    person: "es",
    case: "nominativ",
    correctForm: "Es",
    sentenceBefore: "",
    sentenceAfter: "regnet seit gestern.",
    translation: "It has been raining since yesterday.",
  },
  {
    person: "es",
    case: "nominativ",
    correctForm: "Es",
    sentenceBefore: "",
    sentenceAfter: "ist schon spät.",
    translation: "It's already late.",
  },
  // wir (2)
  {
    person: "wir",
    case: "nominativ",
    correctForm: "Wir",
    sentenceBefore: "",
    sentenceAfter: "fahren im Sommer nach Italien.",
    translation: "We're going to Italy in summer.",
  },
  {
    person: "wir",
    case: "nominativ",
    correctForm: "wir",
    sentenceBefore: "Nächste Woche haben",
    sentenceAfter: "Ferien.",
    translation: "Next week we have vacation.",
  },
  // ihr (2)
  {
    person: "ihr",
    case: "nominativ",
    correctForm: "Ihr",
    sentenceBefore: "",
    sentenceAfter: "müsst jetzt aufräumen.",
    translation: "You all must clean up now.",
  },
  {
    person: "ihr",
    case: "nominativ",
    correctForm: "ihr",
    sentenceBefore: "Wann kommt",
    sentenceAfter: "zum Abendessen?",
    translation: "When are you all coming for dinner?",
  },
  // sie_pl (2)
  {
    person: "sie_pl",
    case: "nominativ",
    correctForm: "Sie",
    sentenceBefore: "",
    sentenceAfter: "wohnen in Berlin.",
    translation: "They live in Berlin.",
  },
  {
    person: "sie_pl",
    case: "nominativ",
    correctForm: "sie",
    sentenceBefore: "Am Wochenende gehen",
    sentenceAfter: "ins Theater.",
    translation: "On the weekend they go to the theater.",
  },
  // Sie (3)
  {
    person: "Sie",
    case: "nominativ",
    correctForm: "Sie",
    sentenceBefore: "",
    sentenceAfter: "haben eine schöne Wohnung.",
    translation: "You (formal) have a beautiful apartment.",
  },
  {
    person: "Sie",
    case: "nominativ",
    correctForm: "Sie",
    sentenceBefore: "Können",
    sentenceAfter: "mir bitte helfen?",
    translation: "Could you (formal) please help me?",
  },
  {
    person: "Sie",
    case: "nominativ",
    correctForm: "Sie",
    sentenceBefore: "Wann kommen",
    sentenceAfter: "zurück?",
    translation: "When are you (formal) coming back?",
  },

  // =============================================
  // AKKUSATIV (20 exercises)
  // =============================================

  // ich → mich (2)
  {
    person: "ich",
    case: "akkusativ",
    correctForm: "mich",
    sentenceBefore: "Er hat",
    sentenceAfter: "gestern angerufen.",
    translation: "He called me yesterday.",
  },
  {
    person: "ich",
    case: "akkusativ",
    correctForm: "mich",
    sentenceBefore: "Kannst du",
    sentenceAfter: "bitte abholen?",
    translation: "Can you pick me up please?",
  },
  // du → dich (2)
  {
    person: "du",
    case: "akkusativ",
    correctForm: "dich",
    sentenceBefore: "Ich vermisse",
    sentenceAfter: "sehr.",
    translation: "I miss you a lot.",
  },
  {
    person: "du",
    case: "akkusativ",
    correctForm: "dich",
    sentenceBefore: "Sie hat",
    sentenceAfter: "zum Essen eingeladen.",
    translation: "She invited you to dinner.",
  },
  // er → ihn (2)
  {
    person: "er",
    case: "akkusativ",
    correctForm: "ihn",
    sentenceBefore: "Ich kenne",
    sentenceAfter: "seit der Schule.",
    translation: "I've known him since school.",
  },
  {
    person: "er",
    case: "akkusativ",
    correctForm: "ihn",
    sentenceBefore: "Wir besuchen",
    sentenceAfter: "morgen im Krankenhaus.",
    translation: "We'll visit him in the hospital tomorrow.",
  },
  // sie_sg → sie (2)
  {
    person: "sie_sg",
    case: "akkusativ",
    correctForm: "sie",
    sentenceBefore: "Ich sehe",
    sentenceAfter: "jeden Tag im Bus.",
    translation: "I see her every day on the bus.",
  },
  {
    person: "sie_sg",
    case: "akkusativ",
    correctForm: "sie",
    sentenceBefore: "Er liebt",
    sentenceAfter: "sehr.",
    translation: "He loves her very much.",
  },
  // es → es (2)
  {
    person: "es",
    case: "akkusativ",
    correctForm: "es",
    sentenceBefore: "Ich finde",
    sentenceAfter: "sehr lustig.",
    translation: "I find it very funny.",
  },
  {
    person: "es",
    case: "akkusativ",
    correctForm: "es",
    sentenceBefore: "Hast du",
    sentenceAfter: "schon gelesen?",
    translation: "Have you already read it?",
  },
  // wir → uns (2)
  {
    person: "wir",
    case: "akkusativ",
    correctForm: "uns",
    sentenceBefore: "Der Lehrer fragt",
    sentenceAfter: "oft im Unterricht.",
    translation: "The teacher often asks us in class.",
  },
  {
    person: "wir",
    case: "akkusativ",
    correctForm: "uns",
    sentenceBefore: "Sie hat",
    sentenceAfter: "zum Geburtstag eingeladen.",
    translation: "She invited us to the birthday party.",
  },
  // ihr → euch (2)
  {
    person: "ihr",
    case: "akkusativ",
    correctForm: "euch",
    sentenceBefore: "Ich besuche",
    sentenceAfter: "nächste Woche.",
    translation: "I'll visit you all next week.",
  },
  {
    person: "ihr",
    case: "akkusativ",
    correctForm: "euch",
    sentenceBefore: "Wer hat",
    sentenceAfter: "das gesagt?",
    translation: "Who told you all that?",
  },
  // sie_pl → sie (2)
  {
    person: "sie_pl",
    case: "akkusativ",
    correctForm: "sie",
    sentenceBefore: "Ich habe",
    sentenceAfter: "am Bahnhof getroffen.",
    translation: "I met them at the train station.",
  },
  {
    person: "sie_pl",
    case: "akkusativ",
    correctForm: "sie",
    sentenceBefore: "Wir laden",
    sentenceAfter: "zur Party ein.",
    translation: "We're inviting them to the party.",
  },
  // Sie → Sie (2)
  {
    person: "Sie",
    case: "akkusativ",
    correctForm: "Sie",
    sentenceBefore: "Darf ich",
    sentenceAfter: "etwas fragen?",
    translation: "May I ask you (formal) something?",
  },
  {
    person: "Sie",
    case: "akkusativ",
    correctForm: "Sie",
    sentenceBefore: "Ich möchte",
    sentenceAfter: "herzlich einladen.",
    translation: "I'd like to cordially invite you (formal).",
  },

  // =============================================
  // DATIV (20 exercises)
  // =============================================

  // ich → mir (3)
  {
    person: "ich",
    case: "dativ",
    correctForm: "mir",
    sentenceBefore: "Kannst du",
    sentenceAfter: "bitte das Salz geben?",
    translation: "Can you pass me the salt please?",
  },
  {
    person: "ich",
    case: "dativ",
    correctForm: "mir",
    sentenceBefore: "Er hat",
    sentenceAfter: "ein Geschenk mitgebracht.",
    translation: "He brought me a gift.",
  },
  {
    person: "ich",
    case: "dativ",
    correctForm: "mir",
    sentenceBefore: "Das Buch gehört",
    sentenceAfter: ".",
    translation: "The book belongs to me.",
  },
  // du → dir (2)
  {
    person: "du",
    case: "dativ",
    correctForm: "dir",
    sentenceBefore: "Ich helfe",
    sentenceAfter: "gern bei den Hausaufgaben.",
    translation: "I'll gladly help you with homework.",
  },
  {
    person: "du",
    case: "dativ",
    correctForm: "dir",
    sentenceBefore: "Was hat er",
    sentenceAfter: "gesagt?",
    translation: "What did he say to you?",
  },
  // er → ihm (2)
  {
    person: "er",
    case: "dativ",
    correctForm: "ihm",
    sentenceBefore: "Ich gebe",
    sentenceAfter: "morgen das Geld zurück.",
    translation: "I'll give him the money back tomorrow.",
  },
  {
    person: "er",
    case: "dativ",
    correctForm: "ihm",
    sentenceBefore: "Wir danken",
    sentenceAfter: "für die Hilfe.",
    translation: "We thank him for the help.",
  },
  // sie_sg → ihr (2)
  {
    person: "sie_sg",
    case: "dativ",
    correctForm: "ihr",
    sentenceBefore: "Er schenkt",
    sentenceAfter: "Blumen zum Geburtstag.",
    translation: "He gives her flowers for her birthday.",
  },
  {
    person: "sie_sg",
    case: "dativ",
    correctForm: "ihr",
    sentenceBefore: "Ich erkläre",
    sentenceAfter: "die Aufgabe.",
    translation: "I explain the task to her.",
  },
  // es → ihm (2)
  {
    person: "es",
    case: "dativ",
    correctForm: "ihm",
    sentenceBefore: "Gib",
    sentenceAfter: "etwas Wasser.",
    translation: "Give it some water.",
  },
  {
    person: "es",
    case: "dativ",
    correctForm: "ihm",
    sentenceBefore: "Ich bringe",
    sentenceAfter: "das Futter.",
    translation: "I bring it the food.",
  },
  // wir → uns (2)
  {
    person: "wir",
    case: "dativ",
    correctForm: "uns",
    sentenceBefore: "Er erzählt",
    sentenceAfter: "eine Geschichte.",
    translation: "He tells us a story.",
  },
  {
    person: "wir",
    case: "dativ",
    correctForm: "uns",
    sentenceBefore: "Sie hat",
    sentenceAfter: "den Weg gezeigt.",
    translation: "She showed us the way.",
  },
  // ihr → euch (2)
  {
    person: "ihr",
    case: "dativ",
    correctForm: "euch",
    sentenceBefore: "Ich schicke",
    sentenceAfter: "die Fotos.",
    translation: "I'll send you all the photos.",
  },
  {
    person: "ihr",
    case: "dativ",
    correctForm: "euch",
    sentenceBefore: "Hat er",
    sentenceAfter: "schon geantwortet?",
    translation: "Has he already answered you all?",
  },
  // sie_pl → ihnen (2)
  {
    person: "sie_pl",
    case: "dativ",
    correctForm: "ihnen",
    sentenceBefore: "Wir bringen",
    sentenceAfter: "die Bücher.",
    translation: "We'll bring them the books.",
  },
  {
    person: "sie_pl",
    case: "dativ",
    correctForm: "ihnen",
    sentenceBefore: "Er hat",
    sentenceAfter: "gestern geholfen.",
    translation: "He helped them yesterday.",
  },
  // Sie → Ihnen (3)
  {
    person: "Sie",
    case: "dativ",
    correctForm: "Ihnen",
    sentenceBefore: "Kann ich",
    sentenceAfter: "behilflich sein?",
    translation: "Can I be of help to you (formal)?",
  },
  {
    person: "Sie",
    case: "dativ",
    correctForm: "Ihnen",
    sentenceBefore: "Ich empfehle",
    sentenceAfter: "das Restaurant.",
    translation: "I recommend the restaurant to you (formal).",
  },
  {
    person: "Sie",
    case: "dativ",
    correctForm: "Ihnen",
    sentenceBefore: "Darf ich",
    sentenceAfter: "etwas anbieten?",
    translation: "May I offer you (formal) something?",
  },
];

export default pronounExercises;
