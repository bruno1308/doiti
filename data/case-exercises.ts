export interface CaseExerciseData {
  sentence: string;
  nounPhrases: {
    text: string;
    case: "nominativ" | "akkusativ" | "dativ" | "genitiv";
  }[];
  translation: string;
}

const caseExercises: CaseExerciseData[] = [
  // =============================================
  // 1 NOUN PHRASE SENTENCES (~60)
  // =============================================
  {
    sentence: "Der Hund schläft.",
    nounPhrases: [{ text: "Der Hund", case: "nominativ" }],
    translation: "The dog is sleeping.",
  },
  {
    sentence: "Die Katze spielt.",
    nounPhrases: [{ text: "Die Katze", case: "nominativ" }],
    translation: "The cat is playing.",
  },
  {
    sentence: "Das Kind lacht.",
    nounPhrases: [{ text: "Das Kind", case: "nominativ" }],
    translation: "The child is laughing.",
  },
  {
    sentence: "Ein Mann wartet.",
    nounPhrases: [{ text: "Ein Mann", case: "nominativ" }],
    translation: "A man is waiting.",
  },
  {
    sentence: "Eine Frau singt.",
    nounPhrases: [{ text: "Eine Frau", case: "nominativ" }],
    translation: "A woman is singing.",
  },
  {
    sentence: "Der Lehrer spricht.",
    nounPhrases: [{ text: "Der Lehrer", case: "nominativ" }],
    translation: "The teacher is speaking.",
  },
  {
    sentence: "Die Blume blüht.",
    nounPhrases: [{ text: "Die Blume", case: "nominativ" }],
    translation: "The flower is blooming.",
  },
  {
    sentence: "Das Baby weint.",
    nounPhrases: [{ text: "Das Baby", case: "nominativ" }],
    translation: "The baby is crying.",
  },
  {
    sentence: "Der Vogel fliegt.",
    nounPhrases: [{ text: "Der Vogel", case: "nominativ" }],
    translation: "The bird is flying.",
  },
  {
    sentence: "Ein Mädchen tanzt.",
    nounPhrases: [{ text: "Ein Mädchen", case: "nominativ" }],
    translation: "A girl is dancing.",
  },
  {
    sentence: "Die Sonne scheint.",
    nounPhrases: [{ text: "Die Sonne", case: "nominativ" }],
    translation: "The sun is shining.",
  },
  {
    sentence: "Der Zug kommt.",
    nounPhrases: [{ text: "Der Zug", case: "nominativ" }],
    translation: "The train is coming.",
  },
  {
    sentence: "Das Telefon klingelt.",
    nounPhrases: [{ text: "Das Telefon", case: "nominativ" }],
    translation: "The phone is ringing.",
  },
  {
    sentence: "Die Musik spielt.",
    nounPhrases: [{ text: "Die Musik", case: "nominativ" }],
    translation: "The music is playing.",
  },
  {
    sentence: "Der Regen fällt.",
    nounPhrases: [{ text: "Der Regen", case: "nominativ" }],
    translation: "The rain is falling.",
  },
  {
    sentence: "Ich sehe den Mann.",
    nounPhrases: [{ text: "den Mann", case: "akkusativ" }],
    translation: "I see the man.",
  },
  {
    sentence: "Sie kauft einen Rock.",
    nounPhrases: [{ text: "einen Rock", case: "akkusativ" }],
    translation: "She buys a skirt.",
  },
  {
    sentence: "Wir trinken den Kaffee.",
    nounPhrases: [{ text: "den Kaffee", case: "akkusativ" }],
    translation: "We drink the coffee.",
  },
  {
    sentence: "Er liest das Buch.",
    nounPhrases: [{ text: "das Buch", case: "akkusativ" }],
    translation: "He reads the book.",
  },
  {
    sentence: "Ich brauche eine Pause.",
    nounPhrases: [{ text: "eine Pause", case: "akkusativ" }],
    translation: "I need a break.",
  },
  {
    sentence: "Sie hat einen Bruder.",
    nounPhrases: [{ text: "einen Bruder", case: "akkusativ" }],
    translation: "She has a brother.",
  },
  {
    sentence: "Wir besuchen die Stadt.",
    nounPhrases: [{ text: "die Stadt", case: "akkusativ" }],
    translation: "We visit the city.",
  },
  {
    sentence: "Er kennt den Weg.",
    nounPhrases: [{ text: "den Weg", case: "akkusativ" }],
    translation: "He knows the way.",
  },
  {
    sentence: "Ich esse einen Apfel.",
    nounPhrases: [{ text: "einen Apfel", case: "akkusativ" }],
    translation: "I eat an apple.",
  },
  {
    sentence: "Sie sucht die Brille.",
    nounPhrases: [{ text: "die Brille", case: "akkusativ" }],
    translation: "She is looking for the glasses.",
  },
  {
    sentence: "Ich helfe dem Nachbarn.",
    nounPhrases: [{ text: "dem Nachbarn", case: "dativ" }],
    translation: "I help the neighbor.",
  },
  {
    sentence: "Er dankt der Ärztin.",
    nounPhrases: [{ text: "der Ärztin", case: "dativ" }],
    translation: "He thanks the doctor.",
  },
  {
    sentence: "Das Buch gehört dem Schüler.",
    nounPhrases: [{ text: "dem Schüler", case: "dativ" }],
    translation: "The book belongs to the student.",
  },
  {
    sentence: "Wir folgen dem Pfad.",
    nounPhrases: [{ text: "dem Pfad", case: "dativ" }],
    translation: "We follow the path.",
  },
  {
    sentence: "Sie antwortet dem Lehrer.",
    nounPhrases: [{ text: "dem Lehrer", case: "dativ" }],
    translation: "She answers the teacher.",
  },
  {
    sentence: "Er gratuliert der Freundin.",
    nounPhrases: [{ text: "der Freundin", case: "dativ" }],
    translation: "He congratulates the friend.",
  },
  {
    sentence: "Das Kleid steht der Frau.",
    nounPhrases: [{ text: "der Frau", case: "dativ" }],
    translation: "The dress suits the woman.",
  },
  {
    sentence: "Ich glaube dem Kind.",
    nounPhrases: [{ text: "dem Kind", case: "dativ" }],
    translation: "I believe the child.",
  },
  {
    sentence: "Sie wohnt bei einer Freundin.",
    nounPhrases: [{ text: "einer Freundin", case: "dativ" }],
    translation: "She lives with a friend.",
  },
  {
    sentence: "Er kommt aus dem Haus.",
    nounPhrases: [{ text: "dem Haus", case: "dativ" }],
    translation: "He comes out of the house.",
  },
  {
    sentence: "Ich fahre mit dem Bus.",
    nounPhrases: [{ text: "dem Bus", case: "dativ" }],
    translation: "I travel by bus.",
  },
  {
    sentence: "Sie geht nach dem Unterricht.",
    nounPhrases: [{ text: "dem Unterricht", case: "dativ" }],
    translation: "She goes after the lesson.",
  },
  {
    sentence: "Er spricht von einem Problem.",
    nounPhrases: [{ text: "einem Problem", case: "dativ" }],
    translation: "He speaks about a problem.",
  },
  {
    sentence: "Ich sitze auf dem Stuhl.",
    nounPhrases: [{ text: "dem Stuhl", case: "dativ" }],
    translation: "I am sitting on the chair.",
  },
  {
    sentence: "Wir gehen zu dem Park.",
    nounPhrases: [{ text: "dem Park", case: "dativ" }],
    translation: "We go to the park.",
  },
  {
    sentence: "Er arbeitet seit einem Jahr.",
    nounPhrases: [{ text: "einem Jahr", case: "dativ" }],
    translation: "He has been working for a year.",
  },
  {
    sentence: "Ich spiele für die Mannschaft.",
    nounPhrases: [{ text: "die Mannschaft", case: "akkusativ" }],
    translation: "I play for the team.",
  },
  {
    sentence: "Sie läuft durch den Park.",
    nounPhrases: [{ text: "den Park", case: "akkusativ" }],
    translation: "She runs through the park.",
  },
  {
    sentence: "Er kämpft gegen den Wind.",
    nounPhrases: [{ text: "den Wind", case: "akkusativ" }],
    translation: "He fights against the wind.",
  },
  {
    sentence: "Wir gehen ohne den Hund.",
    nounPhrases: [{ text: "den Hund", case: "akkusativ" }],
    translation: "We go without the dog.",
  },
  {
    sentence: "Sie singt um die Wette.",
    nounPhrases: [{ text: "die Wette", case: "akkusativ" }],
    translation: "She sings competitively.",
  },
  {
    sentence: "Das ist trotz des Regens schön.",
    nounPhrases: [{ text: "des Regens", case: "genitiv" }],
    translation: "That is beautiful despite the rain.",
  },
  {
    sentence: "Wegen des Staus komme ich spät.",
    nounPhrases: [{ text: "des Staus", case: "genitiv" }],
    translation: "Because of the traffic jam, I am late.",
  },
  {
    sentence: "Er kommt während des Sommers.",
    nounPhrases: [{ text: "des Sommers", case: "genitiv" }],
    translation: "He comes during the summer.",
  },
  {
    sentence: "Ich lese anstatt des Buches die Zeitung.",
    nounPhrases: [{ text: "des Buches", case: "genitiv" }],
    translation: "I read the newspaper instead of the book.",
  },
  {
    sentence: "Er arbeitet innerhalb des Gebäudes.",
    nounPhrases: [{ text: "des Gebäudes", case: "genitiv" }],
    translation: "He works inside the building.",
  },
  {
    sentence: "Sie steht außerhalb des Hauses.",
    nounPhrases: [{ text: "des Hauses", case: "genitiv" }],
    translation: "She stands outside the house.",
  },
  {
    sentence: "Der Preis des Autos ist hoch.",
    nounPhrases: [{ text: "des Autos", case: "genitiv" }],
    translation: "The price of the car is high.",
  },
  {
    sentence: "Die Tür des Zimmers ist offen.",
    nounPhrases: [{ text: "des Zimmers", case: "genitiv" }],
    translation: "The door of the room is open.",
  },
  {
    sentence: "Die Stimme der Sängerin ist schön.",
    nounPhrases: [{ text: "der Sängerin", case: "genitiv" }],
    translation: "The voice of the singer is beautiful.",
  },
  {
    sentence: "Das Ende des Films war traurig.",
    nounPhrases: [{ text: "des Films", case: "genitiv" }],
    translation: "The end of the film was sad.",
  },
  {
    sentence: "Der Anfang der Reise war aufregend.",
    nounPhrases: [{ text: "der Reise", case: "genitiv" }],
    translation: "The beginning of the trip was exciting.",
  },
  {
    sentence: "Ein Freund kommt heute.",
    nounPhrases: [{ text: "Ein Freund", case: "nominativ" }],
    translation: "A friend is coming today.",
  },
  {
    sentence: "Das Wetter ist schön.",
    nounPhrases: [{ text: "Das Wetter", case: "nominativ" }],
    translation: "The weather is nice.",
  },
  {
    sentence: "Die Kinder spielen draußen.",
    nounPhrases: [{ text: "Die Kinder", case: "nominativ" }],
    translation: "The children are playing outside.",
  },
  // =============================================
  // 2 NOUN PHRASE SENTENCES (~100)
  // =============================================
  {
    sentence: "Der Hund frisst den Knochen.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "den Knochen", case: "akkusativ" },
    ],
    translation: "The dog eats the bone.",
  },
  {
    sentence: "Die Lehrerin erklärt das Problem.",
    nounPhrases: [
      { text: "Die Lehrerin", case: "nominativ" },
      { text: "das Problem", case: "akkusativ" },
    ],
    translation: "The teacher explains the problem.",
  },
  {
    sentence: "Der Vater liest die Zeitung.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "die Zeitung", case: "akkusativ" },
    ],
    translation: "The father reads the newspaper.",
  },
  {
    sentence: "Das Mädchen trinkt den Saft.",
    nounPhrases: [
      { text: "Das Mädchen", case: "nominativ" },
      { text: "den Saft", case: "akkusativ" },
    ],
    translation: "The girl drinks the juice.",
  },
  {
    sentence: "Die Mutter kocht das Essen.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "das Essen", case: "akkusativ" },
    ],
    translation: "The mother cooks the food.",
  },
  {
    sentence: "Ein Student schreibt einen Brief.",
    nounPhrases: [
      { text: "Ein Student", case: "nominativ" },
      { text: "einen Brief", case: "akkusativ" },
    ],
    translation: "A student writes a letter.",
  },
  {
    sentence: "Der Arzt untersucht den Patienten.",
    nounPhrases: [
      { text: "Der Arzt", case: "nominativ" },
      { text: "den Patienten", case: "akkusativ" },
    ],
    translation: "The doctor examines the patient.",
  },
  {
    sentence: "Die Frau kauft einen Mantel.",
    nounPhrases: [
      { text: "Die Frau", case: "nominativ" },
      { text: "einen Mantel", case: "akkusativ" },
    ],
    translation: "The woman buys a coat.",
  },
  {
    sentence: "Der Junge wirft den Ball.",
    nounPhrases: [
      { text: "Der Junge", case: "nominativ" },
      { text: "den Ball", case: "akkusativ" },
    ],
    translation: "The boy throws the ball.",
  },
  {
    sentence: "Die Schülerin macht die Hausaufgabe.",
    nounPhrases: [
      { text: "Die Schülerin", case: "nominativ" },
      { text: "die Hausaufgabe", case: "akkusativ" },
    ],
    translation: "The student does the homework.",
  },
  {
    sentence: "Der Koch bereitet das Abendessen vor.",
    nounPhrases: [
      { text: "Der Koch", case: "nominativ" },
      { text: "das Abendessen", case: "akkusativ" },
    ],
    translation: "The cook prepares dinner.",
  },
  {
    sentence: "Eine Katze fängt eine Maus.",
    nounPhrases: [
      { text: "Eine Katze", case: "nominativ" },
      { text: "eine Maus", case: "akkusativ" },
    ],
    translation: "A cat catches a mouse.",
  },
  {
    sentence: "Der Polizist stoppt das Auto.",
    nounPhrases: [
      { text: "Der Polizist", case: "nominativ" },
      { text: "das Auto", case: "akkusativ" },
    ],
    translation: "The police officer stops the car.",
  },
  {
    sentence: "Die Großmutter erzählt eine Geschichte.",
    nounPhrases: [
      { text: "Die Großmutter", case: "nominativ" },
      { text: "eine Geschichte", case: "akkusativ" },
    ],
    translation: "The grandmother tells a story.",
  },
  {
    sentence: "Das Kind malt ein Bild.",
    nounPhrases: [
      { text: "Das Kind", case: "nominativ" },
      { text: "ein Bild", case: "akkusativ" },
    ],
    translation: "The child paints a picture.",
  },
  {
    sentence: "Der Hund gehört dem Jungen.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "dem Jungen", case: "dativ" },
    ],
    translation: "The dog belongs to the boy.",
  },
  {
    sentence: "Die Tasche gehört der Lehrerin.",
    nounPhrases: [
      { text: "Die Tasche", case: "nominativ" },
      { text: "der Lehrerin", case: "dativ" },
    ],
    translation: "The bag belongs to the teacher.",
  },
  {
    sentence: "Der Schüler hilft dem Freund.",
    nounPhrases: [
      { text: "Der Schüler", case: "nominativ" },
      { text: "dem Freund", case: "dativ" },
    ],
    translation: "The student helps the friend.",
  },
  {
    sentence: "Die Tochter dankt der Mutter.",
    nounPhrases: [
      { text: "Die Tochter", case: "nominativ" },
      { text: "der Mutter", case: "dativ" },
    ],
    translation: "The daughter thanks the mother.",
  },
  {
    sentence: "Das Geschenk gefällt dem Mädchen.",
    nounPhrases: [
      { text: "Das Geschenk", case: "nominativ" },
      { text: "dem Mädchen", case: "dativ" },
    ],
    translation: "The girl likes the gift.",
  },
  {
    sentence: "Der Kuchen schmeckt dem Kind.",
    nounPhrases: [
      { text: "Der Kuchen", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
    ],
    translation: "The cake tastes good to the child.",
  },
  {
    sentence: "Die Jacke passt dem Mann.",
    nounPhrases: [
      { text: "Die Jacke", case: "nominativ" },
      { text: "dem Mann", case: "dativ" },
    ],
    translation: "The jacket fits the man.",
  },
  {
    sentence: "Ein Fehler passiert dem Schüler.",
    nounPhrases: [
      { text: "Ein Fehler", case: "nominativ" },
      { text: "dem Schüler", case: "dativ" },
    ],
    translation: "A mistake happens to the student.",
  },
  {
    sentence: "Die Farbe des Himmels ist wunderschön.",
    nounPhrases: [
      { text: "Die Farbe", case: "nominativ" },
      { text: "des Himmels", case: "genitiv" },
    ],
    translation: "The color of the sky is beautiful.",
  },
  {
    sentence: "Der Name des Hundes ist Max.",
    nounPhrases: [
      { text: "Der Name", case: "nominativ" },
      { text: "des Hundes", case: "genitiv" },
    ],
    translation: "The name of the dog is Max.",
  },
  {
    sentence: "Die Größe des Hauses überrascht mich.",
    nounPhrases: [
      { text: "Die Größe", case: "nominativ" },
      { text: "des Hauses", case: "genitiv" },
    ],
    translation: "The size of the house surprises me.",
  },
  {
    sentence: "Der Geschmack des Kuchens ist perfekt.",
    nounPhrases: [
      { text: "Der Geschmack", case: "nominativ" },
      { text: "des Kuchens", case: "genitiv" },
    ],
    translation: "The taste of the cake is perfect.",
  },
  {
    sentence: "Die Qualität der Arbeit ist gut.",
    nounPhrases: [
      { text: "Die Qualität", case: "nominativ" },
      { text: "der Arbeit", case: "genitiv" },
    ],
    translation: "The quality of the work is good.",
  },
  {
    sentence: "Das Dach des Gebäudes ist rot.",
    nounPhrases: [
      { text: "Das Dach", case: "nominativ" },
      { text: "des Gebäudes", case: "genitiv" },
    ],
    translation: "The roof of the building is red.",
  },
  {
    sentence: "Er spielt mit dem Hund.",
    nounPhrases: [
      { text: "Er", case: "nominativ" },
      { text: "dem Hund", case: "dativ" },
    ],
    translation: "He plays with the dog.",
  },
  {
    sentence: "Sie fährt mit dem Fahrrad.",
    nounPhrases: [
      { text: "Sie", case: "nominativ" },
      { text: "dem Fahrrad", case: "dativ" },
    ],
    translation: "She rides the bicycle.",
  },
  {
    sentence: "Der Vater spricht mit dem Sohn.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "dem Sohn", case: "dativ" },
    ],
    translation: "The father speaks with the son.",
  },
  {
    sentence: "Die Katze sitzt auf dem Tisch.",
    nounPhrases: [
      { text: "Die Katze", case: "nominativ" },
      { text: "dem Tisch", case: "dativ" },
    ],
    translation: "The cat sits on the table.",
  },
  {
    sentence: "Der Brief kommt von der Großmutter.",
    nounPhrases: [
      { text: "Der Brief", case: "nominativ" },
      { text: "der Großmutter", case: "dativ" },
    ],
    translation: "The letter comes from the grandmother.",
  },
  {
    sentence: "Das Bild hängt an der Wand.",
    nounPhrases: [
      { text: "Das Bild", case: "nominativ" },
      { text: "der Wand", case: "dativ" },
    ],
    translation: "The picture hangs on the wall.",
  },
  {
    sentence: "Der Schlüssel liegt unter dem Bett.",
    nounPhrases: [
      { text: "Der Schlüssel", case: "nominativ" },
      { text: "dem Bett", case: "dativ" },
    ],
    translation: "The key is under the bed.",
  },
  {
    sentence: "Die Lampe steht neben dem Sofa.",
    nounPhrases: [
      { text: "Die Lampe", case: "nominativ" },
      { text: "dem Sofa", case: "dativ" },
    ],
    translation: "The lamp stands next to the sofa.",
  },
  {
    sentence: "Ich gehe durch den Wald.",
    nounPhrases: [
      { text: "Ich", case: "nominativ" },
      { text: "den Wald", case: "akkusativ" },
    ],
    translation: "I walk through the forest.",
  },
  {
    sentence: "Sie arbeitet für das Unternehmen.",
    nounPhrases: [
      { text: "Sie", case: "nominativ" },
      { text: "das Unternehmen", case: "akkusativ" },
    ],
    translation: "She works for the company.",
  },
  {
    sentence: "Er läuft gegen die Tür.",
    nounPhrases: [
      { text: "Er", case: "nominativ" },
      { text: "die Tür", case: "akkusativ" },
    ],
    translation: "He runs into the door.",
  },
  {
    sentence: "Wir spazieren um den See.",
    nounPhrases: [
      { text: "Wir", case: "nominativ" },
      { text: "den See", case: "akkusativ" },
    ],
    translation: "We walk around the lake.",
  },
  {
    sentence: "Der Sohn ähnelt dem Vater.",
    nounPhrases: [
      { text: "Der Sohn", case: "nominativ" },
      { text: "dem Vater", case: "dativ" },
    ],
    translation: "The son resembles the father.",
  },
  {
    sentence: "Die Nachricht gefällt der Chefin.",
    nounPhrases: [
      { text: "Die Nachricht", case: "nominativ" },
      { text: "der Chefin", case: "dativ" },
    ],
    translation: "The boss likes the message.",
  },
  {
    sentence: "Das Essen fehlt dem Gast.",
    nounPhrases: [
      { text: "Das Essen", case: "nominativ" },
      { text: "dem Gast", case: "dativ" },
    ],
    translation: "The guest misses the food.",
  },
  {
    sentence: "Der Mantel gehört einer Kollegin.",
    nounPhrases: [
      { text: "Der Mantel", case: "nominativ" },
      { text: "einer Kollegin", case: "dativ" },
    ],
    translation: "The coat belongs to a colleague.",
  },
  {
    sentence: "Die Musik stört den Nachbarn.",
    nounPhrases: [
      { text: "Die Musik", case: "nominativ" },
      { text: "den Nachbarn", case: "akkusativ" },
    ],
    translation: "The music disturbs the neighbor.",
  },
  {
    sentence: "Der Wind bewegt die Blätter.",
    nounPhrases: [
      { text: "Der Wind", case: "nominativ" },
      { text: "die Blätter", case: "akkusativ" },
    ],
    translation: "The wind moves the leaves.",
  },
  {
    sentence: "Die Kellnerin bringt das Getränk.",
    nounPhrases: [
      { text: "Die Kellnerin", case: "nominativ" },
      { text: "das Getränk", case: "akkusativ" },
    ],
    translation: "The waitress brings the drink.",
  },
  {
    sentence: "Der Gärtner gießt die Pflanzen.",
    nounPhrases: [
      { text: "Der Gärtner", case: "nominativ" },
      { text: "die Pflanzen", case: "akkusativ" },
    ],
    translation: "The gardener waters the plants.",
  },
  {
    sentence: "Das Mädchen öffnet die Tür.",
    nounPhrases: [
      { text: "Das Mädchen", case: "nominativ" },
      { text: "die Tür", case: "akkusativ" },
    ],
    translation: "The girl opens the door.",
  },
  {
    sentence: "Der Mechaniker repariert das Fahrrad.",
    nounPhrases: [
      { text: "Der Mechaniker", case: "nominativ" },
      { text: "das Fahrrad", case: "akkusativ" },
    ],
    translation: "The mechanic repairs the bicycle.",
  },
  {
    sentence: "Die Ärztin behandelt den Patienten.",
    nounPhrases: [
      { text: "Die Ärztin", case: "nominativ" },
      { text: "den Patienten", case: "akkusativ" },
    ],
    translation: "The doctor treats the patient.",
  },
  {
    sentence: "Ein Vogel baut ein Nest.",
    nounPhrases: [
      { text: "Ein Vogel", case: "nominativ" },
      { text: "ein Nest", case: "akkusativ" },
    ],
    translation: "A bird builds a nest.",
  },
  {
    sentence: "Der Hund folgt dem Kind.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
    ],
    translation: "The dog follows the child.",
  },
  {
    sentence: "Die Farbe der Blume ist gelb.",
    nounPhrases: [
      { text: "Die Farbe", case: "nominativ" },
      { text: "der Blume", case: "genitiv" },
    ],
    translation: "The color of the flower is yellow.",
  },
  {
    sentence: "Der Titel des Buches klingt interessant.",
    nounPhrases: [
      { text: "Der Titel", case: "nominativ" },
      { text: "des Buches", case: "genitiv" },
    ],
    translation: "The title of the book sounds interesting.",
  },
  {
    sentence: "Die Meinung der Eltern ist wichtig.",
    nounPhrases: [
      { text: "Die Meinung", case: "nominativ" },
      { text: "der Eltern", case: "genitiv" },
    ],
    translation: "The opinion of the parents is important.",
  },
  {
    sentence: "Das Spielzeug des Kindes ist kaputt.",
    nounPhrases: [
      { text: "Das Spielzeug", case: "nominativ" },
      { text: "des Kindes", case: "genitiv" },
    ],
    translation: "The toy of the child is broken.",
  },
  {
    sentence: "Der Geruch der Blumen ist angenehm.",
    nounPhrases: [
      { text: "Der Geruch", case: "nominativ" },
      { text: "der Blumen", case: "genitiv" },
    ],
    translation: "The smell of the flowers is pleasant.",
  },
  {
    sentence: "Die Mutter wäscht das Geschirr.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "das Geschirr", case: "akkusativ" },
    ],
    translation: "The mother washes the dishes.",
  },
  {
    sentence: "Der Lehrer korrigiert die Prüfung.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "die Prüfung", case: "akkusativ" },
    ],
    translation: "The teacher corrects the exam.",
  },
  {
    sentence: "Das Kind sammelt die Steine.",
    nounPhrases: [
      { text: "Das Kind", case: "nominativ" },
      { text: "die Steine", case: "akkusativ" },
    ],
    translation: "The child collects the stones.",
  },
  {
    sentence: "Die Schwester tröstet den Bruder.",
    nounPhrases: [
      { text: "Die Schwester", case: "nominativ" },
      { text: "den Bruder", case: "akkusativ" },
    ],
    translation: "The sister comforts the brother.",
  },
  {
    sentence: "Der Chef lobt die Mitarbeiterin.",
    nounPhrases: [
      { text: "Der Chef", case: "nominativ" },
      { text: "die Mitarbeiterin", case: "akkusativ" },
    ],
    translation: "The boss praises the employee.",
  },
  {
    sentence: "Der Hund bellt den Briefträger an.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "den Briefträger", case: "akkusativ" },
    ],
    translation: "The dog barks at the mailman.",
  },
  {
    sentence: "Die Lage des Restaurants ist zentral.",
    nounPhrases: [
      { text: "Die Lage", case: "nominativ" },
      { text: "des Restaurants", case: "genitiv" },
    ],
    translation: "The location of the restaurant is central.",
  },
  {
    sentence: "Das Ergebnis der Prüfung war gut.",
    nounPhrases: [
      { text: "Das Ergebnis", case: "nominativ" },
      { text: "der Prüfung", case: "genitiv" },
    ],
    translation: "The result of the exam was good.",
  },
  {
    sentence: "Der Besitzer des Ladens ist nett.",
    nounPhrases: [
      { text: "Der Besitzer", case: "nominativ" },
      { text: "des Ladens", case: "genitiv" },
    ],
    translation: "The owner of the shop is nice.",
  },
  {
    sentence: "Die Lehrerin widerspricht dem Direktor.",
    nounPhrases: [
      { text: "Die Lehrerin", case: "nominativ" },
      { text: "dem Direktor", case: "dativ" },
    ],
    translation: "The teacher contradicts the principal.",
  },
  {
    sentence: "Das Wetter schadet der Ernte.",
    nounPhrases: [
      { text: "Das Wetter", case: "nominativ" },
      { text: "der Ernte", case: "dativ" },
    ],
    translation: "The weather damages the harvest.",
  },
  {
    sentence: "Der Film gefällt dem Publikum.",
    nounPhrases: [
      { text: "Der Film", case: "nominativ" },
      { text: "dem Publikum", case: "dativ" },
    ],
    translation: "The audience likes the film.",
  },
  {
    sentence: "Die Bluse steht der Kollegin.",
    nounPhrases: [
      { text: "Die Bluse", case: "nominativ" },
      { text: "der Kollegin", case: "dativ" },
    ],
    translation: "The blouse suits the colleague.",
  },
  {
    sentence: "Trotz des Wetters gehen wir spazieren.",
    nounPhrases: [
      { text: "des Wetters", case: "genitiv" },
      { text: "wir", case: "nominativ" },
    ],
    translation: "Despite the weather, we go for a walk.",
  },
  {
    sentence: "Wegen der Hitze bleiben wir drinnen.",
    nounPhrases: [
      { text: "der Hitze", case: "genitiv" },
      { text: "wir", case: "nominativ" },
    ],
    translation: "Because of the heat, we stay indoors.",
  },
  {
    sentence: "Während des Konzerts schläft das Baby.",
    nounPhrases: [
      { text: "des Konzerts", case: "genitiv" },
      { text: "das Baby", case: "nominativ" },
    ],
    translation: "During the concert, the baby sleeps.",
  },
  {
    sentence: "Der Bruder gratuliert der Schwester.",
    nounPhrases: [
      { text: "Der Bruder", case: "nominativ" },
      { text: "der Schwester", case: "dativ" },
    ],
    translation: "The brother congratulates the sister.",
  },
  {
    sentence: "Die Nachbarin begegnet dem Briefträger.",
    nounPhrases: [
      { text: "Die Nachbarin", case: "nominativ" },
      { text: "dem Briefträger", case: "dativ" },
    ],
    translation: "The neighbor meets the mailman.",
  },
  {
    sentence: "Der Kellner empfiehlt den Wein.",
    nounPhrases: [
      { text: "Der Kellner", case: "nominativ" },
      { text: "den Wein", case: "akkusativ" },
    ],
    translation: "The waiter recommends the wine.",
  },
  {
    sentence: "Die Studentin versteht die Frage.",
    nounPhrases: [
      { text: "Die Studentin", case: "nominativ" },
      { text: "die Frage", case: "akkusativ" },
    ],
    translation: "The student understands the question.",
  },
  {
    sentence: "Ein Kind findet einen Schatz.",
    nounPhrases: [
      { text: "Ein Kind", case: "nominativ" },
      { text: "einen Schatz", case: "akkusativ" },
    ],
    translation: "A child finds a treasure.",
  },
  {
    sentence: "Der Bäcker verkauft das Brot.",
    nounPhrases: [
      { text: "Der Bäcker", case: "nominativ" },
      { text: "das Brot", case: "akkusativ" },
    ],
    translation: "The baker sells the bread.",
  },
  {
    sentence: "Die Tante besucht die Nichte.",
    nounPhrases: [
      { text: "Die Tante", case: "nominativ" },
      { text: "die Nichte", case: "akkusativ" },
    ],
    translation: "The aunt visits the niece.",
  },
  {
    sentence: "Der Pilot fliegt das Flugzeug.",
    nounPhrases: [
      { text: "Der Pilot", case: "nominativ" },
      { text: "das Flugzeug", case: "akkusativ" },
    ],
    translation: "The pilot flies the airplane.",
  },
  {
    sentence: "Die Mutter vertraut der Erzieherin.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "der Erzieherin", case: "dativ" },
    ],
    translation: "The mother trusts the caretaker.",
  },
  {
    sentence: "Der Lehrer droht dem Schüler.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "dem Schüler", case: "dativ" },
    ],
    translation: "The teacher threatens the student.",
  },
  {
    sentence: "Die Schuhe passen dem Kind.",
    nounPhrases: [
      { text: "Die Schuhe", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
    ],
    translation: "The shoes fit the child.",
  },
  {
    sentence: "Der Rucksack steht neben dem Schrank.",
    nounPhrases: [
      { text: "Der Rucksack", case: "nominativ" },
      { text: "dem Schrank", case: "dativ" },
    ],
    translation: "The backpack is next to the wardrobe.",
  },
  {
    sentence: "Die Katze liegt auf dem Kissen.",
    nounPhrases: [
      { text: "Die Katze", case: "nominativ" },
      { text: "dem Kissen", case: "dativ" },
    ],
    translation: "The cat is lying on the cushion.",
  },
  {
    sentence: "Der Fisch schwimmt in dem Teich.",
    nounPhrases: [
      { text: "Der Fisch", case: "nominativ" },
      { text: "dem Teich", case: "dativ" },
    ],
    translation: "The fish swims in the pond.",
  },
  {
    sentence: "Die Vase steht auf dem Regal.",
    nounPhrases: [
      { text: "Die Vase", case: "nominativ" },
      { text: "dem Regal", case: "dativ" },
    ],
    translation: "The vase is on the shelf.",
  },
  {
    sentence: "Das Buch liegt unter dem Tisch.",
    nounPhrases: [
      { text: "Das Buch", case: "nominativ" },
      { text: "dem Tisch", case: "dativ" },
    ],
    translation: "The book is under the table.",
  },
  {
    sentence: "Ich sehe den Sonnenuntergang.",
    nounPhrases: [
      { text: "Ich", case: "nominativ" },
      { text: "den Sonnenuntergang", case: "akkusativ" },
    ],
    translation: "I see the sunset.",
  },
  {
    sentence: "Sie beobachtet die Sterne.",
    nounPhrases: [
      { text: "Sie", case: "nominativ" },
      { text: "die Sterne", case: "akkusativ" },
    ],
    translation: "She watches the stars.",
  },
  {
    sentence: "Er vergisst den Termin.",
    nounPhrases: [
      { text: "Er", case: "nominativ" },
      { text: "den Termin", case: "akkusativ" },
    ],
    translation: "He forgets the appointment.",
  },
  {
    sentence: "Die Höhe des Berges beeindruckt mich.",
    nounPhrases: [
      { text: "Die Höhe", case: "nominativ" },
      { text: "des Berges", case: "genitiv" },
    ],
    translation: "The height of the mountain impresses me.",
  },
  {
    sentence: "Der Autor des Romans ist berühmt.",
    nounPhrases: [
      { text: "Der Autor", case: "nominativ" },
      { text: "des Romans", case: "genitiv" },
    ],
    translation: "The author of the novel is famous.",
  },
  {
    sentence: "Die Länge des Flusses ist beachtlich.",
    nounPhrases: [
      { text: "Die Länge", case: "nominativ" },
      { text: "des Flusses", case: "genitiv" },
    ],
    translation: "The length of the river is considerable.",
  },
  {
    sentence: "Der Großvater erzählt von dem Krieg.",
    nounPhrases: [
      { text: "Der Großvater", case: "nominativ" },
      { text: "dem Krieg", case: "dativ" },
    ],
    translation: "The grandfather talks about the war.",
  },
  {
    sentence: "Die Schönheit der Landschaft ist atemberaubend.",
    nounPhrases: [
      { text: "Die Schönheit", case: "nominativ" },
      { text: "der Landschaft", case: "genitiv" },
    ],
    translation: "The beauty of the landscape is breathtaking.",
  },
  {
    sentence: "Der Fahrer parkt das Auto vor dem Hotel.",
    nounPhrases: [
      { text: "Der Fahrer", case: "nominativ" },
      { text: "das Auto", case: "akkusativ" },
      { text: "dem Hotel", case: "dativ" },
    ],
    translation: "The driver parks the car in front of the hotel.",
  },
  // =============================================
  // 3 NOUN PHRASE SENTENCES (~40)
  // =============================================
  {
    sentence: "Die Mutter kauft der Tochter ein Kleid.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "der Tochter", case: "dativ" },
      { text: "ein Kleid", case: "akkusativ" },
    ],
    translation: "The mother buys the daughter a dress.",
  },
  {
    sentence: "Der Vater gibt dem Sohn das Geld.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "dem Sohn", case: "dativ" },
      { text: "das Geld", case: "akkusativ" },
    ],
    translation: "The father gives the son the money.",
  },
  {
    sentence: "Die Lehrerin zeigt dem Schüler das Buch.",
    nounPhrases: [
      { text: "Die Lehrerin", case: "nominativ" },
      { text: "dem Schüler", case: "dativ" },
      { text: "das Buch", case: "akkusativ" },
    ],
    translation: "The teacher shows the student the book.",
  },
  {
    sentence: "Der Kellner bringt dem Gast die Speisekarte.",
    nounPhrases: [
      { text: "Der Kellner", case: "nominativ" },
      { text: "dem Gast", case: "dativ" },
      { text: "die Speisekarte", case: "akkusativ" },
    ],
    translation: "The waiter brings the guest the menu.",
  },
  {
    sentence: "Die Großmutter schenkt dem Enkel ein Spielzeug.",
    nounPhrases: [
      { text: "Die Großmutter", case: "nominativ" },
      { text: "dem Enkel", case: "dativ" },
      { text: "ein Spielzeug", case: "akkusativ" },
    ],
    translation: "The grandmother gives the grandson a toy.",
  },
  {
    sentence: "Der Arzt erklärt dem Patienten die Diagnose.",
    nounPhrases: [
      { text: "Der Arzt", case: "nominativ" },
      { text: "dem Patienten", case: "dativ" },
      { text: "die Diagnose", case: "akkusativ" },
    ],
    translation: "The doctor explains the diagnosis to the patient.",
  },
  {
    sentence: "Die Mutter liest dem Kind eine Geschichte vor.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
      { text: "eine Geschichte", case: "akkusativ" },
    ],
    translation: "The mother reads the child a story.",
  },
  {
    sentence: "Der Postbote übergibt der Frau das Paket.",
    nounPhrases: [
      { text: "Der Postbote", case: "nominativ" },
      { text: "der Frau", case: "dativ" },
      { text: "das Paket", case: "akkusativ" },
    ],
    translation: "The mailman hands the woman the package.",
  },
  {
    sentence: "Der Lehrer gibt der Klasse die Aufgaben.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "der Klasse", case: "dativ" },
      { text: "die Aufgaben", case: "akkusativ" },
    ],
    translation: "The teacher gives the class the assignments.",
  },
  {
    sentence: "Die Sekretärin reicht dem Chef den Kaffee.",
    nounPhrases: [
      { text: "Die Sekretärin", case: "nominativ" },
      { text: "dem Chef", case: "dativ" },
      { text: "den Kaffee", case: "akkusativ" },
    ],
    translation: "The secretary hands the boss the coffee.",
  },
  {
    sentence: "Der Onkel erzählt den Kindern eine Geschichte.",
    nounPhrases: [
      { text: "Der Onkel", case: "nominativ" },
      { text: "den Kindern", case: "dativ" },
      { text: "eine Geschichte", case: "akkusativ" },
    ],
    translation: "The uncle tells the children a story.",
  },
  {
    sentence: "Die Verkäuferin empfiehlt der Kundin einen Mantel.",
    nounPhrases: [
      { text: "Die Verkäuferin", case: "nominativ" },
      { text: "der Kundin", case: "dativ" },
      { text: "einen Mantel", case: "akkusativ" },
    ],
    translation: "The saleswoman recommends a coat to the customer.",
  },
  {
    sentence: "Der Koch serviert den Gästen das Dessert.",
    nounPhrases: [
      { text: "Der Koch", case: "nominativ" },
      { text: "den Gästen", case: "dativ" },
      { text: "das Dessert", case: "akkusativ" },
    ],
    translation: "The cook serves the guests the dessert.",
  },
  {
    sentence: "Die Ärztin verschreibt dem Patienten ein Medikament.",
    nounPhrases: [
      { text: "Die Ärztin", case: "nominativ" },
      { text: "dem Patienten", case: "dativ" },
      { text: "ein Medikament", case: "akkusativ" },
    ],
    translation: "The doctor prescribes the patient a medication.",
  },
  {
    sentence: "Der Trainer erklärt der Mannschaft die Strategie.",
    nounPhrases: [
      { text: "Der Trainer", case: "nominativ" },
      { text: "der Mannschaft", case: "dativ" },
      { text: "die Strategie", case: "akkusativ" },
    ],
    translation: "The coach explains the strategy to the team.",
  },
  {
    sentence: "Die Mutter backt dem Sohn einen Kuchen.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "dem Sohn", case: "dativ" },
      { text: "einen Kuchen", case: "akkusativ" },
    ],
    translation: "The mother bakes the son a cake.",
  },
  {
    sentence: "Der Freund leiht dem Nachbarn das Werkzeug.",
    nounPhrases: [
      { text: "Der Freund", case: "nominativ" },
      { text: "dem Nachbarn", case: "dativ" },
      { text: "das Werkzeug", case: "akkusativ" },
    ],
    translation: "The friend lends the neighbor the tool.",
  },
  {
    sentence: "Die Tante schickt der Nichte ein Geschenk.",
    nounPhrases: [
      { text: "Die Tante", case: "nominativ" },
      { text: "der Nichte", case: "dativ" },
      { text: "ein Geschenk", case: "akkusativ" },
    ],
    translation: "The aunt sends the niece a gift.",
  },
  {
    sentence: "Der Direktor überreicht der Schülerin das Zeugnis.",
    nounPhrases: [
      { text: "Der Direktor", case: "nominativ" },
      { text: "der Schülerin", case: "dativ" },
      { text: "das Zeugnis", case: "akkusativ" },
    ],
    translation: "The principal hands the student the report card.",
  },
  {
    sentence: "Die Schwester bringt dem Bruder das Frühstück.",
    nounPhrases: [
      { text: "Die Schwester", case: "nominativ" },
      { text: "dem Bruder", case: "dativ" },
      { text: "das Frühstück", case: "akkusativ" },
    ],
    translation: "The sister brings the brother breakfast.",
  },
  {
    sentence: "Der Vater erklärt dem Kind den Weg.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
      { text: "den Weg", case: "akkusativ" },
    ],
    translation: "The father explains the way to the child.",
  },
  {
    sentence: "Die Bibliothekarin empfiehlt dem Studenten ein Buch.",
    nounPhrases: [
      { text: "Die Bibliothekarin", case: "nominativ" },
      { text: "dem Studenten", case: "dativ" },
      { text: "ein Buch", case: "akkusativ" },
    ],
    translation: "The librarian recommends a book to the student.",
  },
  {
    sentence: "Der Friseur schneidet der Kundin die Haare.",
    nounPhrases: [
      { text: "Der Friseur", case: "nominativ" },
      { text: "der Kundin", case: "dativ" },
      { text: "die Haare", case: "akkusativ" },
    ],
    translation: "The hairdresser cuts the customer's hair.",
  },
  {
    sentence: "Die Lehrerin gibt dem Schüler eine Chance.",
    nounPhrases: [
      { text: "Die Lehrerin", case: "nominativ" },
      { text: "dem Schüler", case: "dativ" },
      { text: "eine Chance", case: "akkusativ" },
    ],
    translation: "The teacher gives the student a chance.",
  },
  {
    sentence: "Der Vater zeigt dem Sohn die Stadt.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "dem Sohn", case: "dativ" },
      { text: "die Stadt", case: "akkusativ" },
    ],
    translation: "The father shows the son the city.",
  },
  {
    sentence: "Die Mutter näht der Tochter ein Kostüm.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "der Tochter", case: "dativ" },
      { text: "ein Kostüm", case: "akkusativ" },
    ],
    translation: "The mother sews the daughter a costume.",
  },
  {
    sentence: "Der Großvater baut dem Enkel ein Vogelhaus.",
    nounPhrases: [
      { text: "Der Großvater", case: "nominativ" },
      { text: "dem Enkel", case: "dativ" },
      { text: "ein Vogelhaus", case: "akkusativ" },
    ],
    translation: "The grandfather builds the grandson a birdhouse.",
  },
  {
    sentence: "Die Kollegin bringt dem Team den Bericht.",
    nounPhrases: [
      { text: "Die Kollegin", case: "nominativ" },
      { text: "dem Team", case: "dativ" },
      { text: "den Bericht", case: "akkusativ" },
    ],
    translation: "The colleague brings the team the report.",
  },
  {
    sentence: "Der Ober serviert der Dame den Tee.",
    nounPhrases: [
      { text: "Der Ober", case: "nominativ" },
      { text: "der Dame", case: "dativ" },
      { text: "den Tee", case: "akkusativ" },
    ],
    translation: "The waiter serves the lady the tea.",
  },
  {
    sentence: "Die Nachbarin gibt dem Hund einen Knochen.",
    nounPhrases: [
      { text: "Die Nachbarin", case: "nominativ" },
      { text: "dem Hund", case: "dativ" },
      { text: "einen Knochen", case: "akkusativ" },
    ],
    translation: "The neighbor gives the dog a bone.",
  },
  {
    sentence: "Der Lehrer stellt der Klasse eine Frage.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "der Klasse", case: "dativ" },
      { text: "eine Frage", case: "akkusativ" },
    ],
    translation: "The teacher asks the class a question.",
  },
  {
    sentence: "Die Chefin gibt dem Mitarbeiter den Schlüssel.",
    nounPhrases: [
      { text: "Die Chefin", case: "nominativ" },
      { text: "dem Mitarbeiter", case: "dativ" },
      { text: "den Schlüssel", case: "akkusativ" },
    ],
    translation: "The boss gives the employee the key.",
  },
  {
    sentence: "Der Briefträger bringt der Familie die Post.",
    nounPhrases: [
      { text: "Der Briefträger", case: "nominativ" },
      { text: "der Familie", case: "dativ" },
      { text: "die Post", case: "akkusativ" },
    ],
    translation: "The mailman brings the family the mail.",
  },
  {
    sentence: "Die Mutter reicht dem Baby die Flasche.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "dem Baby", case: "dativ" },
      { text: "die Flasche", case: "akkusativ" },
    ],
    translation: "The mother hands the baby the bottle.",
  },
  {
    sentence: "Der Apotheker verkauft der Frau das Medikament.",
    nounPhrases: [
      { text: "Der Apotheker", case: "nominativ" },
      { text: "der Frau", case: "dativ" },
      { text: "das Medikament", case: "akkusativ" },
    ],
    translation: "The pharmacist sells the woman the medication.",
  },
  {
    sentence: "Die Erzieherin liest den Kindern ein Märchen vor.",
    nounPhrases: [
      { text: "Die Erzieherin", case: "nominativ" },
      { text: "den Kindern", case: "dativ" },
      { text: "ein Märchen", case: "akkusativ" },
    ],
    translation: "The caretaker reads the children a fairy tale.",
  },
  {
    sentence: "Der Vater kauft der Familie ein Haus.",
    nounPhrases: [
      { text: "Der Vater", case: "nominativ" },
      { text: "der Familie", case: "dativ" },
      { text: "ein Haus", case: "akkusativ" },
    ],
    translation: "The father buys the family a house.",
  },
  {
    sentence: "Die Schwester schreibt dem Bruder einen Brief.",
    nounPhrases: [
      { text: "Die Schwester", case: "nominativ" },
      { text: "dem Bruder", case: "dativ" },
      { text: "einen Brief", case: "akkusativ" },
    ],
    translation: "The sister writes the brother a letter.",
  },
  {
    sentence: "Der Bäcker verkauft dem Mann das Brot.",
    nounPhrases: [
      { text: "Der Bäcker", case: "nominativ" },
      { text: "dem Mann", case: "dativ" },
      { text: "das Brot", case: "akkusativ" },
    ],
    translation: "The baker sells the man the bread.",
  },
  {
    sentence: "Die Mutter kocht dem Vater das Mittagessen.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "dem Vater", case: "dativ" },
      { text: "das Mittagessen", case: "akkusativ" },
    ],
    translation: "The mother cooks the father lunch.",
  },
];

export default caseExercises;
