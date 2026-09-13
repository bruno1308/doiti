import { builders } from "./overall-builders";
import { bookA1 } from "./book-exercises";
import type { OverallExercise } from "../lib/overall-types";

const { choice: c, text: t, order: o } = builders("A1");

// Newly authored practice following the topics and task formats in A-Grammatik.
const exercises: OverallExercise[] = [
  c("choice-01", "Articles", "2.1 / 2.4", "___ Lampe ist neu.", "Die", ["Der", "Das"], "The lamp is new.", "Lampe is feminine: die Lampe."),
  c("choice-02", "Articles", "2.3 / 2.4", "Ich brauche ___ Stift.", "einen", ["ein", "einem"], "I need a pen.", "Stift is masculine. The direct object takes accusative: einen Stift."),
  c("choice-03", "Negation", "2.4 / 7.3", "Das ist ___ Hotel, sondern ein Krankenhaus.", "kein", ["nicht", "keine"], "That is not a hotel but a hospital.", "Negate an indefinite noun with kein. Hotel is neuter."),
  c("choice-04", "Personal pronouns", "3.1", "Mia ist meine Schwester. ___ wohnt in Bonn.", "Sie", ["Er", "Es"], "Mia is my sister. She lives in Bonn.", "Use sie for a female person."),
  c("choice-05", "Possessives", "2.5", "Ich habe einen Bruder. ___ Bruder heißt Jonas.", "Mein", ["Meine", "Meinen"], "I have a brother. My brother is called Jonas.", "The subject Bruder is masculine nominative: mein Bruder."),
  c("choice-06", "Questions", "6.1.1", "___ kommst du? — Aus Italien.", "Woher", ["Wohin", "Wann"], "Where are you from? — Italy.", "Woher asks about origin; wohin asks about a destination."),
  c("choice-07", "Time", "5.2", "Der Kurs beginnt ___ 18 Uhr.", "um", ["am", "im"], "The course starts at 6 p.m.", "Use um with a clock time."),
  c("choice-08", "Time", "5.3", "___ Montag habe ich frei.", "Am", ["Um", "Im"], "I have Monday off.", "Use am with days of the week."),
  c("choice-09", "Places", "5.1", "Wir fahren morgen ___ Österreich.", "nach", ["zu", "bei"], "We are going to Austria tomorrow.", "Use nach for a destination country without an article."),
  c("choice-10", "Modal verbs", "1.1.2", "Hier ist Rauchen verboten. Du ___ hier nicht rauchen.", "darfst", ["darf", "dürft"], "Smoking is forbidden here. You are not allowed to smoke here.", "Nicht dürfen expresses a prohibition. The present-tense form with du is darfst."),
  c("choice-11", "Plurals", "2.2", "Ein Kind spielt hier. Dort spielen drei ___.", "Kinder", ["Kindern", "Kind"], "One child is playing here. Three children are playing there.", "The plural of das Kind is die Kinder."),
  c("choice-12", "Questions", "6.1.1", "___ kostet das Brot? — Drei Euro.", "Wie viel", ["Wie viele", "Wie alt"], "How much does the bread cost? — Three euros.", "Wie viel asks about a price. Wie viele asks about a count."),
  c("choice-13", "Negation", "7.3.1", "Der Kaffee ist ___ heiß.", "nicht", ["kein", "keine"], "The coffee is not hot.", "Use nicht to negate the adjective heiß."),
  c("choice-14", "Dative", "5.1", "Ich fahre mit ___ Bus.", "dem", ["den", "der"], "I am going by bus.", "Mit always takes dative. Der Bus becomes dem Bus."),
  c("choice-15", "Connecting ideas", "8.1.1", "Möchtest du Tee ___ Kaffee? — Tee, bitte.", "oder", ["denn", "sondern"], "Would you like tea or coffee? — Tea, please.", "Oder offers a choice between alternatives."),

  t("fill-01", "fill", "Articles", "2.4", "Das ist ___ Tasche.", ["eine"], ["indefinite article"], "That is a bag.", "Tasche is feminine: eine Tasche."),
  t("fill-02", "fill", "Articles", "2.3 / 2.4", "Ich sehe ___ Hund.", ["den"], ["der → accusative"], "I see the dog.", "The direct object of sehen is accusative: den Hund."),
  t("fill-03", "fill", "Negation", "2.4", "Wir haben ___ Auto.", ["kein"], ["negative article"], "We do not have a car.", "Auto is neuter. Kein stays kein in neuter accusative."),
  t("fill-04", "fill", "Possessives", "2.5", "Du hast eine Katze. Wie heißt ___ Katze?", ["deine"], ["your, informal singular"], "You have a cat. What is your cat called?", "Use deine for a feminine nominative noun belonging to du."),
  t("fill-05", "fill", "Personal pronouns", "3.1", "Das ist Ben. Ich kenne ___ gut.", ["ihn"], ["er → accusative"], "That is Ben. I know him well.", "Kennen takes an accusative object: er becomes ihn."),
  t("fill-06", "fill", "Personal pronouns", "3.1", "Das Geschenk ist für ___.", ["dich"], ["du → accusative"], "The present is for you.", "Für takes accusative: du becomes dich."),
  t("fill-07", "fill", "Plurals", "2.2", "In der Küche stehen zwei ___.", ["Tische"], ["der Tisch → plural"], "There are two tables in the kitchen.", "The plural of Tisch is Tische."),
  t("fill-08", "fill", "Plurals", "2.2", "Ich kaufe drei ___.", ["Äpfel"], ["der Apfel → plural"], "I am buying three apples.", "Apfel forms its plural with an umlaut: Äpfel."),
  t("fill-09", "fill", "Questions", "6.1.1", "___ heißt du?", ["Wie"], ["How"], "What is your name?", "German asks Wie heißt du?, literally How are you called?"),
  t("fill-10", "fill", "Time", "5.2 / 5.3", "Wir treffen uns ___ Freitag ___ neun Uhr.", ["am", "um"], ["on + day", "at + clock time"], "We are meeting on Friday at nine o'clock.", "Use am for a day and um for a clock time."),
  t("fill-11", "fill", "Places", "5.1", "Sie kommt ___ Spanien.", ["aus"], ["from, origin"], "She comes from Spain.", "Aus describes someone's country of origin."),
  t("fill-12", "fill", "Dative", "5.1", "Ich wohne bei ___ Eltern.", ["meinen"], ["mein → dative plural"], "I live with my parents.", "Bei takes dative. The possessive before plural Eltern is meinen."),
  t("fill-13", "fill", "Adjectives", "4.1", "Das ist ein ___ Zimmer.", ["kleines"], ["klein"], "That is a small room.", "After ein, a neuter nominative adjective ends in -es: ein kleines Zimmer."),
  t("fill-14", "fill", "Negation", "7.3.3", "Hast du keinen Hunger? — ___, ich möchte etwas essen.", ["Doch"], ["Contradict the negative question"], "Aren't you hungry? — Yes, I would like something to eat.", "Doch contradicts a negative question or statement."),
  t("fill-15", "fill", "Questions", "6.1.1", "___ wohnst du? — In Zürich.", ["Wo"], ["Where, location"], "Where do you live? — In Zurich.", "Wo asks about a location."),

  t("verb-01", "conjugation", "Present tense", "1.1.2", "Ich ___ jeden Abend Deutsch.", ["lerne"], ["lernen · Präsens"], "I study German every evening.", "For ich, regular present-tense verbs end in -e."),
  t("verb-02", "conjugation", "Present tense", "1.1.2", "Wo ___ du?", ["wohnst"], ["wohnen · Präsens"], "Where do you live?", "For du, add -st to the stem wohn-."),
  t("verb-03", "conjugation", "Present tense", "1.1.2", "Meine Mutter ___ im Krankenhaus.", ["arbeitet"], ["arbeiten · Präsens"], "My mother works in the hospital.", "Arbeiten adds an extra e before -t: arbeitet."),
  t("verb-04", "conjugation", "Present tense", "1.1.2", "___ ihr heute nach Hause?", ["Kommt"], ["kommen · Präsens"], "Are you coming home today?", "The ihr form is kommt; in a yes/no question it comes first."),
  t("verb-05", "conjugation", "Sein and haben", "1.1.2", "Ich ___ müde, aber wir ___ noch Zeit.", ["bin", "haben"], ["sein · Präsens", "haben · Präsens"], "I am tired, but we still have time.", "The forms are ich bin and wir haben."),
  t("verb-06", "conjugation", "Sein and haben", "1.1.2", "___ du Geschwister?", ["Hast"], ["haben · Präsens"], "Do you have siblings?", "Haben is irregular: du hast."),
  t("verb-07", "conjugation", "Vowel changes", "1.1.2", "Leo ___ gern Bücher.", ["liest"], ["lesen · Präsens"], "Leo likes reading books.", "Lesen changes e to ie for du and er/sie/es: liest."),
  t("verb-08", "conjugation", "Vowel changes", "1.1.2", "Du ___ mit dem Fahrrad.", ["fährst"], ["fahren · Präsens"], "You are riding your bike.", "Fahren changes a to ä in the du form: fährst."),
  t("verb-09", "conjugation", "Vowel changes", "1.1.2", "Das Baby ___ lange.", ["schläft"], ["schlafen · Präsens"], "The baby sleeps for a long time.", "Schlafen changes a to ä in the er/sie/es form."),
  t("verb-10", "conjugation", "Modal verbs", "1.1.2", "Ich ___ gut schwimmen.", ["kann"], ["können · Präsens"], "I can swim well.", "Können has the singular form ich kann. The infinitive goes at the end."),
  t("verb-11", "conjugation", "Modal verbs", "1.1.2", "Du ___ heute arbeiten.", ["musst"], ["müssen · Präsens"], "You have to work today.", "The du form of müssen is musst, without an umlaut."),
  t("verb-12", "conjugation", "Separable verbs", "1.1.2", "Ich ___ jeden Morgen um sieben Uhr ___.", ["stehe", "auf"], ["aufstehen · Präsens: verb", "separable prefix"], "I get up at seven every morning.", "Aufstehen separates: ich stehe … auf."),
  t("verb-13", "conjugation", "Separable verbs", "1.1.2", "Nora ___ heute im Supermarkt ___.", ["kauft", "ein"], ["einkaufen · Präsens: verb", "separable prefix"], "Nora is shopping at the supermarket today.", "Einkaufen separates: Nora kauft … ein."),
  t("verb-14", "conjugation", "Imperative", "1.3", "___ Sie bitte langsam!", ["Sprechen"], ["sprechen · formal imperative"], "Please speak slowly!", "The formal imperative uses the verb followed by Sie: Sprechen Sie!"),
  t("verb-15", "conjugation", "Sein and haben", "1.1.2", "Ihr ___ sehr freundlich.", ["seid"], ["sein · Präsens"], "You are very friendly.", "The present-tense form with ihr is seid."),

  o("order-01", "Word order", "7.1", ["Ich", "trinke", "gern Tee."], "I like drinking tea.", "The conjugated verb takes second position: Ich trinke …"),
  o("order-02", "Word order", "7.1", ["Heute", "lernt", "Sara", "Deutsch."], "Sara is studying German today.", "When Heute comes first, the verb still comes second, before the subject."),
  o("order-03", "Questions", "7.1", ["Wo", "wohnst", "du?"], "Where do you live?", "In a W-question, the question word comes first and the verb second."),
  o("order-04", "Questions", "7.1", ["Hast", "du", "einen Moment Zeit?"], "Do you have a moment?", "Yes/no questions start with the conjugated verb."),
  o("order-05", "Modal verbs", "7.1", ["Wir", "möchten", "eine Pizza", "bestellen."], "We would like to order a pizza.", "Möchten is conjugated; the infinitive bestellen closes the sentence."),
  o("order-06", "Separable verbs", "7.1", ["Der Zug", "kommt", "um acht Uhr", "an."], "The train arrives at eight o'clock.", "The prefix an separates from ankommen and goes at the end."),
  o("order-07", "Separable verbs", "7.1", ["Ich", "rufe", "dich", "an."], "I am calling you.", "Anrufen separates: ich rufe dich an."),
  o("order-08", "Negation", "7.3.1", ["Das Essen", "ist", "nicht", "teuer."], "The food is not expensive.", "Nicht comes immediately before the adjective being negated."),
  o("order-09", "Negation", "2.4 / 7.1", ["Wir", "haben", "keine Kinder."], "We do not have children.", "Use keine before a plural noun without a definite article."),
  o("order-10", "Imperative", "1.3 / 7.1", ["Öffnen", "Sie", "bitte das Fenster!"], "Please open the window!", "The formal imperative begins with the verb followed by Sie."),
  o("order-11", "Questions", "7.1", ["Wie viel", "kostet", "die Fahrkarte?"], "How much does the ticket cost?", "Wie viel is one question phrase; kostet follows it."),
  o("order-12", "Modal verbs", "7.1", ["Am Samstag", "muss", "ich", "arbeiten."], "I have to work on Saturday.", "The time phrase is first, muss second, and the infinitive last."),
  o("order-13", "Connecting ideas", "8.1.1", ["Ich trinke Tee", "und", "mein Bruder trinkt Wasser."], "I drink tea and my brother drinks water.", "Und connects two main clauses without changing their word order."),
  o("order-14", "Word order", "7.1", ["Im Garten", "spielen", "zwei Kinder."], "Two children are playing in the garden.", "A place phrase can come first. The verb remains in second position."),
  o("order-15", "Questions", "7.1", ["Wann", "fängt", "der Film", "an?"], "When does the film start?", "The verb follows Wann; the separable prefix an ends the question."),
];

export default [...exercises, ...bookA1];
