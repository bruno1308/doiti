export interface PrepositionExerciseData {
  preposition: string;
  case: "akkusativ" | "dativ" | "genitiv";
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}

const prepositionExercises: PrepositionExerciseData[] = [
  // ============================================================
  // AKKUSATIV PREPOSITIONS (bis, durch, für, gegen, ohne, um)
  // ============================================================

  // bis
  { preposition: "bis", case: "akkusativ", sentenceBefore: "Wir fahren", sentenceAfter: "München.", translation: "We are driving to Munich." },
  { preposition: "bis", case: "akkusativ", sentenceBefore: "Der Laden ist", sentenceAfter: "20 Uhr geöffnet.", translation: "The store is open until 8 PM." },
  { preposition: "bis", case: "akkusativ", sentenceBefore: "Ich warte", sentenceAfter: "nächsten Montag.", translation: "I will wait until next Monday." },

  // durch
  { preposition: "durch", case: "akkusativ", sentenceBefore: "Wir gehen", sentenceAfter: "den Park.", translation: "We walk through the park." },
  { preposition: "durch", case: "akkusativ", sentenceBefore: "Die Katze springt", sentenceAfter: "das offene Fenster.", translation: "The cat jumps through the open window." },
  { preposition: "durch", case: "akkusativ", sentenceBefore: "Ich habe das", sentenceAfter: "Zufall erfahren.", translation: "I found out about it by chance." },

  // für
  { preposition: "für", case: "akkusativ", sentenceBefore: "Das Geschenk ist", sentenceAfter: "meine Mutter.", translation: "The gift is for my mother." },
  { preposition: "für", case: "akkusativ", sentenceBefore: "Ich brauche das Geld", sentenceAfter: "die Miete.", translation: "I need the money for the rent." },
  { preposition: "für", case: "akkusativ", sentenceBefore: "Er arbeitet", sentenceAfter: "eine große Firma.", translation: "He works for a large company." },

  // gegen
  { preposition: "gegen", case: "akkusativ", sentenceBefore: "Wir spielen morgen", sentenceAfter: "die andere Mannschaft.", translation: "We play against the other team tomorrow." },
  { preposition: "gegen", case: "akkusativ", sentenceBefore: "Er ist", sentenceAfter: "den Plan.", translation: "He is against the plan." },
  { preposition: "gegen", case: "akkusativ", sentenceBefore: "Ich nehme Tabletten", sentenceAfter: "die Kopfschmerzen.", translation: "I take pills for the headache." },

  // ohne
  { preposition: "ohne", case: "akkusativ", sentenceBefore: "Ich trinke Kaffee", sentenceAfter: "Zucker.", translation: "I drink coffee without sugar." },
  { preposition: "ohne", case: "akkusativ", sentenceBefore: "Er ist", sentenceAfter: "seinen Schlüssel weggegangen.", translation: "He left without his key." },
  { preposition: "ohne", case: "akkusativ", sentenceBefore: "Sie geht nie", sentenceAfter: "ihr Handy aus dem Haus.", translation: "She never leaves the house without her phone." },

  // um
  { preposition: "um", case: "akkusativ", sentenceBefore: "Der Unterricht beginnt", sentenceAfter: "acht Uhr.", translation: "The class starts at eight o'clock." },
  { preposition: "um", case: "akkusativ", sentenceBefore: "Wir sitzen", sentenceAfter: "den Tisch.", translation: "We are sitting around the table." },
  { preposition: "um", case: "akkusativ", sentenceBefore: "Er läuft jeden Morgen", sentenceAfter: "den See.", translation: "He runs around the lake every morning." },

  // ============================================================
  // DATIV PREPOSITIONS (aus, bei, gegenüber, mit, nach, seit, von, zu)
  // ============================================================

  // aus
  { preposition: "aus", case: "dativ", sentenceBefore: "Ich komme", sentenceAfter: "Deutschland.", translation: "I come from Germany." },
  { preposition: "aus", case: "dativ", sentenceBefore: "Sie trinkt Wasser", sentenceAfter: "der Flasche.", translation: "She drinks water from the bottle." },
  { preposition: "aus", case: "dativ", sentenceBefore: "Der Tisch ist", sentenceAfter: "Holz.", translation: "The table is made of wood." },

  // bei
  { preposition: "bei", case: "dativ", sentenceBefore: "Ich wohne", sentenceAfter: "meinen Eltern.", translation: "I live with my parents." },
  { preposition: "bei", case: "dativ", sentenceBefore: "Er arbeitet", sentenceAfter: "Siemens.", translation: "He works at Siemens." },
  { preposition: "bei", case: "dativ", sentenceBefore: "Wir treffen uns", sentenceAfter: "schönem Wetter im Park.", translation: "We meet in the park in nice weather." },

  // gegenüber
  { preposition: "gegenüber", case: "dativ", sentenceBefore: "Die Apotheke liegt", sentenceAfter: "dem Bahnhof.", translation: "The pharmacy is across from the train station." },
  { preposition: "gegenüber", case: "dativ", sentenceBefore: "Er sitzt mir", sentenceAfter: ".", translation: "He is sitting across from me." },
  { preposition: "gegenüber", case: "dativ", sentenceBefore: "Sie ist immer freundlich", sentenceAfter: "ihren Kollegen.", translation: "She is always friendly toward her colleagues." },

  // mit
  { preposition: "mit", case: "dativ", sentenceBefore: "Ich fahre", sentenceAfter: "dem Bus zur Arbeit.", translation: "I go to work by bus." },
  { preposition: "mit", case: "dativ", sentenceBefore: "Kommst du", sentenceAfter: "uns ins Kino?", translation: "Are you coming to the cinema with us?" },
  { preposition: "mit", case: "dativ", sentenceBefore: "Sie schreibt", sentenceAfter: "einem Bleistift.", translation: "She writes with a pencil." },

  // nach
  { preposition: "nach", case: "dativ", sentenceBefore: "Wir fliegen", sentenceAfter: "Spanien.", translation: "We are flying to Spain." },
  { preposition: "nach", case: "dativ", sentenceBefore: "Ich gehe", sentenceAfter: "dem Essen spazieren.", translation: "I go for a walk after the meal." },
  { preposition: "nach", case: "dativ", sentenceBefore: "Biegen Sie", sentenceAfter: "rechts ab.", translation: "Turn right." },

  // seit
  { preposition: "seit", case: "dativ", sentenceBefore: "Ich lerne Deutsch", sentenceAfter: "zwei Jahren.", translation: "I have been learning German for two years." },
  { preposition: "seit", case: "dativ", sentenceBefore: "Sie wohnt hier", sentenceAfter: "letztem Sommer.", translation: "She has been living here since last summer." },
  { preposition: "seit", case: "dativ", sentenceBefore: "Er ist", sentenceAfter: "einer Woche krank.", translation: "He has been sick for a week." },

  // von
  { preposition: "von", case: "dativ", sentenceBefore: "Das ist das Auto", sentenceAfter: "meinem Bruder.", translation: "That is my brother's car." },
  { preposition: "von", case: "dativ", sentenceBefore: "Ich komme gerade", sentenceAfter: "der Arbeit.", translation: "I just came from work." },
  { preposition: "von", case: "dativ", sentenceBefore: "Der Film handelt", sentenceAfter: "einer wahren Geschichte.", translation: "The movie is about a true story." },

  // zu
  { preposition: "zu", case: "dativ", sentenceBefore: "Ich gehe", sentenceAfter: "meiner Freundin.", translation: "I am going to my friend's place." },
  { preposition: "zu", case: "dativ", sentenceBefore: "Wir gehen morgen", sentenceAfter: "dem Arzt.", translation: "We are going to the doctor tomorrow." },
  { preposition: "zu", case: "dativ", sentenceBefore: "Was gibt es", sentenceAfter: "Abendessen?", translation: "What is there for dinner?" },

  // ============================================================
  // GENITIV PREPOSITIONS (trotz, wegen, während, statt)
  // ============================================================

  // trotz
  { preposition: "trotz", case: "genitiv", sentenceBefore: "Wir gehen spazieren", sentenceAfter: "des Regens.", translation: "We go for a walk despite the rain." },
  { preposition: "trotz", case: "genitiv", sentenceBefore: "Er hat die Prüfung bestanden", sentenceAfter: "der schlechten Vorbereitung.", translation: "He passed the exam despite the poor preparation." },
  { preposition: "trotz", case: "genitiv", sentenceBefore: "Sie kam zur Arbeit", sentenceAfter: "ihrer Erkältung.", translation: "She came to work despite her cold." },

  // wegen
  { preposition: "wegen", case: "genitiv", sentenceBefore: "Das Spiel fällt aus", sentenceAfter: "des schlechten Wetters.", translation: "The game is canceled because of the bad weather." },
  { preposition: "wegen", case: "genitiv", sentenceBefore: "Er konnte nicht kommen", sentenceAfter: "seiner Arbeit.", translation: "He could not come because of his work." },
  { preposition: "wegen", case: "genitiv", sentenceBefore: "Die Straße ist gesperrt", sentenceAfter: "eines Unfalls.", translation: "The road is closed because of an accident." },

  // während
  { preposition: "während", case: "genitiv", sentenceBefore: "Er hat", sentenceAfter: "des Unterrichts geschlafen.", translation: "He slept during the class." },
  { preposition: "während", case: "genitiv", sentenceBefore: "Bitte schalten Sie Ihr Handy aus", sentenceAfter: "der Vorstellung.", translation: "Please turn off your phone during the performance." },
  { preposition: "während", case: "genitiv", sentenceBefore: "Wir haben viel gelernt", sentenceAfter: "des Kurses.", translation: "We learned a lot during the course." },

  // statt
  { preposition: "statt", case: "genitiv", sentenceBefore: "Er trinkt Tee", sentenceAfter: "des Kaffees.", translation: "He drinks tea instead of coffee." },
  { preposition: "statt", case: "genitiv", sentenceBefore: "Wir nehmen den Zug", sentenceAfter: "des Autos.", translation: "We take the train instead of the car." },
  { preposition: "statt", case: "genitiv", sentenceBefore: "Sie liest ein Buch", sentenceAfter: "des Films.", translation: "She reads a book instead of the movie." },

  // ============================================================
  // WECHSELPRÄPOSITIONEN (an, auf, hinter, in, neben, über, unter, vor, zwischen)
  // Each has one Akkusativ (motion) and one Dativ (location) exercise
  // ============================================================

  // an
  { preposition: "an", case: "akkusativ", sentenceBefore: "Er hängt das Bild", sentenceAfter: "die Wand.", translation: "He hangs the picture on the wall." },
  { preposition: "an", case: "dativ", sentenceBefore: "Das Bild hängt", sentenceAfter: "der Wand.", translation: "The picture hangs on the wall." },

  // auf
  { preposition: "auf", case: "akkusativ", sentenceBefore: "Sie legt das Buch", sentenceAfter: "den Tisch.", translation: "She puts the book on the table." },
  { preposition: "auf", case: "dativ", sentenceBefore: "Das Buch liegt", sentenceAfter: "dem Tisch.", translation: "The book is lying on the table." },

  // hinter
  { preposition: "hinter", case: "akkusativ", sentenceBefore: "Der Hund läuft", sentenceAfter: "das Haus.", translation: "The dog runs behind the house." },
  { preposition: "hinter", case: "dativ", sentenceBefore: "Der Garten ist", sentenceAfter: "dem Haus.", translation: "The garden is behind the house." },

  // in
  { preposition: "in", case: "akkusativ", sentenceBefore: "Ich gehe", sentenceAfter: "die Schule.", translation: "I go to school." },
  { preposition: "in", case: "dativ", sentenceBefore: "Ich bin", sentenceAfter: "der Schule.", translation: "I am at school." },

  // neben
  { preposition: "neben", case: "akkusativ", sentenceBefore: "Er setzt sich", sentenceAfter: "seine Freundin.", translation: "He sits down next to his girlfriend." },
  { preposition: "neben", case: "dativ", sentenceBefore: "Er sitzt", sentenceAfter: "seiner Freundin.", translation: "He is sitting next to his girlfriend." },

  // über
  { preposition: "über", case: "akkusativ", sentenceBefore: "Die Katze springt", sentenceAfter: "den Zaun.", translation: "The cat jumps over the fence." },
  { preposition: "über", case: "dativ", sentenceBefore: "Die Lampe hängt", sentenceAfter: "dem Tisch.", translation: "The lamp hangs above the table." },

  // unter
  { preposition: "unter", case: "akkusativ", sentenceBefore: "Die Katze kriecht", sentenceAfter: "das Bett.", translation: "The cat crawls under the bed." },
  { preposition: "unter", case: "dativ", sentenceBefore: "Die Katze schläft", sentenceAfter: "dem Bett.", translation: "The cat sleeps under the bed." },

  // vor
  { preposition: "vor", case: "akkusativ", sentenceBefore: "Er stellt das Auto", sentenceAfter: "die Garage.", translation: "He parks the car in front of the garage." },
  { preposition: "vor", case: "dativ", sentenceBefore: "Das Auto steht", sentenceAfter: "der Garage.", translation: "The car is parked in front of the garage." },

  // zwischen
  { preposition: "zwischen", case: "akkusativ", sentenceBefore: "Sie stellt die Vase", sentenceAfter: "die beiden Bücher.", translation: "She places the vase between the two books." },
  { preposition: "zwischen", case: "dativ", sentenceBefore: "Die Vase steht", sentenceAfter: "den beiden Büchern.", translation: "The vase is standing between the two books." },
];

export default prepositionExercises;
