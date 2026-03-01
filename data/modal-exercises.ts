export type ModalVerb = "können" | "müssen" | "dürfen" | "sollen" | "wollen" | "mögen";
export type ModalPerson = "ich" | "du" | "er/sie/es" | "wir" | "ihr" | "sie/Sie";

export interface ModalExerciseData {
  modalVerb: ModalVerb;
  person: ModalPerson;
  correctForm: string;
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}

const modalExercises: ModalExerciseData[] = [
  // ============================================================
  // KÖNNEN (ability / possibility)
  // ============================================================
  { modalVerb: "können", person: "ich", correctForm: "kann", sentenceBefore: "Ich", sentenceAfter: "gut Klavier spielen.", translation: "I can play piano well." },
  { modalVerb: "können", person: "du", correctForm: "kannst", sentenceBefore: "Du", sentenceAfter: "sehr gut kochen.", translation: "You can cook very well." },
  { modalVerb: "können", person: "er/sie/es", correctForm: "kann", sentenceBefore: "Sie", sentenceAfter: "fünf Sprachen sprechen.", translation: "She can speak five languages." },
  { modalVerb: "können", person: "wir", correctForm: "können", sentenceBefore: "Wir", sentenceAfter: "morgen ins Kino gehen.", translation: "We can go to the cinema tomorrow." },
  { modalVerb: "können", person: "ihr", correctForm: "könnt", sentenceBefore: "Ihr", sentenceAfter: "euch hier hinsetzen.", translation: "You all can sit down here." },
  { modalVerb: "können", person: "sie/Sie", correctForm: "können", sentenceBefore: "Sie", sentenceAfter: "mich jederzeit anrufen.", translation: "You can call me anytime." },
  { modalVerb: "können", person: "ich", correctForm: "kann", sentenceBefore: "Ich", sentenceAfter: "leider nicht kommen.", translation: "Unfortunately, I cannot come." },
  { modalVerb: "können", person: "er/sie/es", correctForm: "kann", sentenceBefore: "Er", sentenceAfter: "sehr schnell laufen.", translation: "He can run very fast." },
  { modalVerb: "können", person: "du", correctForm: "kannst", sentenceBefore: "Du", sentenceAfter: "das Fenster aufmachen.", translation: "You can open the window." },
  { modalVerb: "können", person: "wir", correctForm: "können", sentenceBefore: "Wir", sentenceAfter: "das Problem gemeinsam lösen.", translation: "We can solve the problem together." },

  // ============================================================
  // MÜSSEN (necessity / obligation)
  // ============================================================
  { modalVerb: "müssen", person: "ich", correctForm: "muss", sentenceBefore: "Ich", sentenceAfter: "morgen früh aufstehen.", translation: "I have to get up early tomorrow." },
  { modalVerb: "müssen", person: "du", correctForm: "musst", sentenceBefore: "Du", sentenceAfter: "deine Hausaufgaben machen.", translation: "You have to do your homework." },
  { modalVerb: "müssen", person: "er/sie/es", correctForm: "muss", sentenceBefore: "Er", sentenceAfter: "zum Arzt gehen.", translation: "He has to go to the doctor." },
  { modalVerb: "müssen", person: "wir", correctForm: "müssen", sentenceBefore: "Wir", sentenceAfter: "den Zug um neun Uhr nehmen.", translation: "We have to take the train at nine o'clock." },
  { modalVerb: "müssen", person: "ihr", correctForm: "müsst", sentenceBefore: "Ihr", sentenceAfter: "euch beeilen.", translation: "You all have to hurry." },
  { modalVerb: "müssen", person: "sie/Sie", correctForm: "müssen", sentenceBefore: "Sie", sentenceAfter: "dieses Formular ausfüllen.", translation: "You have to fill out this form." },
  { modalVerb: "müssen", person: "ich", correctForm: "muss", sentenceBefore: "Ich", sentenceAfter: "noch einkaufen gehen.", translation: "I still have to go shopping." },
  { modalVerb: "müssen", person: "er/sie/es", correctForm: "muss", sentenceBefore: "Das Kind", sentenceAfter: "um acht Uhr ins Bett gehen.", translation: "The child has to go to bed at eight o'clock." },
  { modalVerb: "müssen", person: "du", correctForm: "musst", sentenceBefore: "Du", sentenceAfter: "mehr Wasser trinken.", translation: "You have to drink more water." },
  { modalVerb: "müssen", person: "wir", correctForm: "müssen", sentenceBefore: "Wir", sentenceAfter: "die Wohnung putzen.", translation: "We have to clean the apartment." },

  // ============================================================
  // DÜRFEN (permission)
  // ============================================================
  { modalVerb: "dürfen", person: "ich", correctForm: "darf", sentenceBefore: "Ich", sentenceAfter: "hier nicht rauchen.", translation: "I am not allowed to smoke here." },
  { modalVerb: "dürfen", person: "du", correctForm: "darfst", sentenceBefore: "Du", sentenceAfter: "heute länger aufbleiben.", translation: "You are allowed to stay up longer today." },
  { modalVerb: "dürfen", person: "er/sie/es", correctForm: "darf", sentenceBefore: "Man", sentenceAfter: "hier nicht parken.", translation: "One is not allowed to park here." },
  { modalVerb: "dürfen", person: "wir", correctForm: "dürfen", sentenceBefore: "Wir", sentenceAfter: "am Wochenende ins Schwimmbad gehen.", translation: "We are allowed to go to the pool on the weekend." },
  { modalVerb: "dürfen", person: "ihr", correctForm: "dürft", sentenceBefore: "Ihr", sentenceAfter: "jetzt nach Hause gehen.", translation: "You all are allowed to go home now." },
  { modalVerb: "dürfen", person: "sie/Sie", correctForm: "dürfen", sentenceBefore: "Die Kinder", sentenceAfter: "im Garten spielen.", translation: "The children are allowed to play in the garden." },
  { modalVerb: "dürfen", person: "ich", correctForm: "darf", sentenceBefore: "Ich", sentenceAfter: "Sie etwas fragen?", translation: "May I ask you something?" },
  { modalVerb: "dürfen", person: "er/sie/es", correctForm: "darf", sentenceBefore: "Er", sentenceAfter: "keinen Alkohol trinken.", translation: "He is not allowed to drink alcohol." },
  { modalVerb: "dürfen", person: "du", correctForm: "darfst", sentenceBefore: "Du", sentenceAfter: "mein Fahrrad benutzen.", translation: "You are allowed to use my bicycle." },
  { modalVerb: "dürfen", person: "wir", correctForm: "dürfen", sentenceBefore: "Wir", sentenceAfter: "den Rasen nicht betreten.", translation: "We are not allowed to walk on the grass." },

  // ============================================================
  // SOLLEN (suggestion / expectation)
  // ============================================================
  { modalVerb: "sollen", person: "ich", correctForm: "soll", sentenceBefore: "Ich", sentenceAfter: "dir von Anna grüßen.", translation: "I am supposed to give you regards from Anna." },
  { modalVerb: "sollen", person: "du", correctForm: "sollst", sentenceBefore: "Du", sentenceAfter: "den Chef sofort anrufen.", translation: "You are supposed to call the boss immediately." },
  { modalVerb: "sollen", person: "er/sie/es", correctForm: "soll", sentenceBefore: "Er", sentenceAfter: "mehr Sport treiben, sagt der Arzt.", translation: "He is supposed to exercise more, the doctor says." },
  { modalVerb: "sollen", person: "wir", correctForm: "sollen", sentenceBefore: "Wir", sentenceAfter: "bis morgen den Bericht fertig schreiben.", translation: "We are supposed to finish the report by tomorrow." },
  { modalVerb: "sollen", person: "ihr", correctForm: "sollt", sentenceBefore: "Ihr", sentenceAfter: "leise sein, die Nachbarn schlafen.", translation: "You all should be quiet, the neighbors are sleeping." },
  { modalVerb: "sollen", person: "sie/Sie", correctForm: "sollen", sentenceBefore: "Was", sentenceAfter: "wir zum Essen mitbringen?", translation: "What should we bring to the dinner?" },
  { modalVerb: "sollen", person: "ich", correctForm: "soll", sentenceBefore: "Was", sentenceAfter: "ich tun?", translation: "What should I do?" },
  { modalVerb: "sollen", person: "er/sie/es", correctForm: "soll", sentenceBefore: "Sie", sentenceAfter: "um zehn Uhr da sein.", translation: "She is supposed to be there at ten o'clock." },
  { modalVerb: "sollen", person: "du", correctForm: "sollst", sentenceBefore: "Du", sentenceAfter: "nicht so viel Süßes essen.", translation: "You should not eat so many sweets." },
  { modalVerb: "sollen", person: "wir", correctForm: "sollen", sentenceBefore: "Wir", sentenceAfter: "laut Plan um acht Uhr anfangen.", translation: "We are supposed to start at eight o'clock according to the plan." },

  // ============================================================
  // WOLLEN (desire / intention)
  // ============================================================
  { modalVerb: "wollen", person: "ich", correctForm: "will", sentenceBefore: "Ich", sentenceAfter: "nächstes Jahr nach Japan reisen.", translation: "I want to travel to Japan next year." },
  { modalVerb: "wollen", person: "du", correctForm: "willst", sentenceBefore: "Du", sentenceAfter: "doch nicht den ganzen Tag schlafen!", translation: "You don't want to sleep all day, do you!" },
  { modalVerb: "wollen", person: "er/sie/es", correctForm: "will", sentenceBefore: "Er", sentenceAfter: "Arzt werden.", translation: "He wants to become a doctor." },
  { modalVerb: "wollen", person: "wir", correctForm: "wollen", sentenceBefore: "Wir", sentenceAfter: "am Samstag eine Party machen.", translation: "We want to have a party on Saturday." },
  { modalVerb: "wollen", person: "ihr", correctForm: "wollt", sentenceBefore: "Ihr", sentenceAfter: "wirklich so früh gehen?", translation: "Do you all really want to leave so early?" },
  { modalVerb: "wollen", person: "sie/Sie", correctForm: "wollen", sentenceBefore: "Die Kinder", sentenceAfter: "unbedingt Eis essen.", translation: "The children really want to eat ice cream." },
  { modalVerb: "wollen", person: "ich", correctForm: "will", sentenceBefore: "Ich", sentenceAfter: "heute Abend zu Hause bleiben.", translation: "I want to stay home tonight." },
  { modalVerb: "wollen", person: "er/sie/es", correctForm: "will", sentenceBefore: "Sie", sentenceAfter: "ein neues Auto kaufen.", translation: "She wants to buy a new car." },
  { modalVerb: "wollen", person: "du", correctForm: "willst", sentenceBefore: "Was", sentenceAfter: "du zum Geburtstag?", translation: "What do you want for your birthday?" },
  { modalVerb: "wollen", person: "wir", correctForm: "wollen", sentenceBefore: "Wir", sentenceAfter: "dieses Wochenende wandern gehen.", translation: "We want to go hiking this weekend." },

  // ============================================================
  // MÖGEN (liking / möchte forms)
  // ============================================================
  { modalVerb: "mögen", person: "ich", correctForm: "mag", sentenceBefore: "Ich", sentenceAfter: "Schokolade sehr gern.", translation: "I like chocolate very much." },
  { modalVerb: "mögen", person: "du", correctForm: "magst", sentenceBefore: "Du", sentenceAfter: "doch italienisches Essen, oder?", translation: "You like Italian food, right?" },
  { modalVerb: "mögen", person: "er/sie/es", correctForm: "mag", sentenceBefore: "Er", sentenceAfter: "keine Tomaten.", translation: "He doesn't like tomatoes." },
  { modalVerb: "mögen", person: "wir", correctForm: "mögen", sentenceBefore: "Wir", sentenceAfter: "die neue Lehrerin.", translation: "We like the new teacher." },
  { modalVerb: "mögen", person: "ihr", correctForm: "mögt", sentenceBefore: "Ihr", sentenceAfter: "doch Hunde, oder?", translation: "You all like dogs, right?" },
  { modalVerb: "mögen", person: "sie/Sie", correctForm: "mögen", sentenceBefore: "Meine Eltern", sentenceAfter: "klassische Musik.", translation: "My parents like classical music." },
  { modalVerb: "mögen", person: "ich", correctForm: "möchte", sentenceBefore: "Ich", sentenceAfter: "einen Kaffee bestellen.", translation: "I would like to order a coffee." },
  { modalVerb: "mögen", person: "du", correctForm: "möchtest", sentenceBefore: "Was", sentenceAfter: "du trinken?", translation: "What would you like to drink?" },
  { modalVerb: "mögen", person: "er/sie/es", correctForm: "möchte", sentenceBefore: "Er", sentenceAfter: "einen Termin vereinbaren.", translation: "He would like to make an appointment." },
  { modalVerb: "mögen", person: "wir", correctForm: "möchten", sentenceBefore: "Wir", sentenceAfter: "gern einen Tisch für vier Personen.", translation: "We would like a table for four, please." },
];

export default modalExercises;
