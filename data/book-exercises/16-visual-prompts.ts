import { workbookChapter } from "./builder";
// Recovered by inspecting the page images: these items are absent from the PDF text layer.
const v=workbookChapter("1.1","Everyday verb forms","A1","Conjugate the supplied verb for the subject. In a statement the verb takes second position.");
v.gaps(12,"2",`fotografieren|Norbert {fotografiert} Blumen.
suchen|Isolde {sucht} im Internet nach Informationen.
spielen|Frank und Andreas {spielen} Fußball.
trinken|Karl und Bertus {trinken} Bier.
machen|Petra und Klemens {machen} eine Wanderung.
hören|Eduard {hört} Musik.
lernen|Martha {lernt} Deutsch.`);
const past=workbookChapter("1.1","Present and past forms","A2","A regular verb adds -te for the preterite, then the appropriate personal ending.");
past.gaps(40,"1a-recovered",`lösen|Präsens: er {löst}. Präteritum: er {löste@past:löste}.`);
const q=workbookChapter("1.6","Questions with prepositions","A2","Ask about people with a preposition and wen/wem, and about things with wo(r)- plus the preposition.");
q.gaps(67,"9",`In wen/Worin/An wen/Woran|Peter hat sich verliebt. — {In wen} denn?
Bei wem/Wobei/Womit/An wen|Klaus hat sich bei einem Kollegen entschuldigt. — {Bei wem} denn?
Worüber/Woran/Womit/Wofür|Georg hat sich über etwas geärgert. — {Worüber} denn?
Wofür/Für wen/Womit/Mit wem|Christa hat sich beim Nachbarn bedankt. — {Wofür} denn?
Mit wem/Womit/Bei wem/Wobei|Luise hat sich mit jemandem gestritten. — {Mit wem} denn?
Worüber/Womit/Woran/Wofür|Meine Nachbarin hat sich über etwas gefreut. — {Worüber} denn?
Worüber/Woran/Womit/Wofür|Maria hat mit Hugo gesprochen. — {Worüber} denn?
Auf wen/Worauf/An wen/Woran|Daniel hat auf jemanden gewartet. — {Auf wen} denn?
Mit wem/Womit/Bei wem/Wobei|Johanna hat zwei Stunden telefoniert. — {Mit wem} denn?`,"fill");
const l=workbookChapter("1.6","Describing a room","A1","Use dative after a two-way preposition when describing where something is. These sentences describe objects in Otto's room in the book.");
l.gaps(69,"3",`article|Die Pflanze steht auf {der@article:dat} Fensterbank.
article|Die CDs liegen auf {dem@article:dat} Fernseher.
article|Eine Tasse steht auf {dem@article:dat} Fernseher.
article|Der Fußball liegt auf {dem@article:dat} Sofa.
article|Der Teller steht auf {dem@article:dat} Sofa.
article|Die Bücher liegen auf {dem@article:dat} kleinen Tisch.
article|Der Rucksack steht vor {dem@article:dat} Sofa.
article|Das Hemd hängt über {dem@article:dat} Stuhl.
article|Die Zeitschriften liegen auf {dem@article:dat} Boden.
article|Das Handy steht auf {der@article:dat} Fensterbank.`,"fill");
const n=workbookChapter("2.1–2.4","Nouns from the picture exercises","A1","Choose the noun's article or plural form. A new object is introduced with ein/eine; the next mention uses the definite article.");
n.choices(71,"1",`article|Nominativ Singular: {die@article:nom} Brille
article|Nominativ Singular: {die@article:nom} Banane
article|Nominativ Singular: {die@article:nom} Gitarre
article|Nominativ Singular: {die@article:nom} Schokolade
article|Nominativ Singular: {der@article:nom} Computer
article|Nominativ Singular: {der@article:nom} Pullover
article|Nominativ Singular: {der@article:nom} Koffer
article|Nominativ Singular: {der@article:nom} Fernseher
article|Nominativ Singular: {das@article:nom} Auto
article|Nominativ Singular: {das@article:nom} Telefon
article|Nominativ Singular: {das@article:nom} Radio
article|Nominativ Singular: {das@article:nom} Taxi`);
n.choices(76,"1",`Tassen/Tasse/Tasser/Tasses|Ich sehe zwei {Tassen}. (die Tasse)
Autos/Auto/Autoen/Autoe|Ich sehe zwei {Autos}. (das Auto)
Polizisten/Polizist/Poliziste/Polizists|Ich sehe zwei {Polizisten}. (der Polizist)
Telefone/Telefon/Telefonen/Telefons|Ich sehe zwei {Telefone}. (das Telefon)
Terminkalender/Terminkalendern/Terminkalenders/Terminkalendere|Ich sehe zwei {Terminkalender}. (der Terminkalender)
Messer/Messern/Messers/Messere|Ich sehe zwei {Messer}. (das Messer)
Bäume/Baume/Bäumen/Baumen|Ich sehe zwei {Bäume}. (der Baum)
Wörterbücher/Wörterbuch/Wörterbüchern/Wörterbuche|Ich sehe zwei {Wörterbücher}. (das Wörterbuch)
Katzen/Katze/Katzer/Katzes|Ich sehe zwei {Katzen}. (die Katze)`);
n.gaps(84,"1",`indefinite|Das ist {ein} Terminkalender. {Der@article:nom} Terminkalender liegt auf meinem Schreibtisch.
indefinite|Das ist {ein} Telefon. {Das@article:nom} Telefon gehört Frau Müller.
indefinite|Das ist {eine} Lampe. {Die@article:nom} Lampe steht auf dem Schreibtisch.
indefinite|Das ist {ein} Schneemann. Leider ist {der@article:nom} Schneemann schon geschmolzen.
indefinite|Das ist {ein} Globus. {Der@article:nom} Globus steht im Klassenzimmer.
indefinite|Das ist {ein} Wörterbuch. {Das@article:nom} Wörterbuch benutzt man zum Nachschlagen.
indefinite|Das ist {ein} Schwein. {Das@article:nom} Schwein lebt im Stall.`,"fill");
const p=workbookChapter("3.4","Indefinite pronouns","A2","When a pronoun replaces a noun, keep its gender and case: einen Kalender → einen, ein Messer → eins. A nominative masculine pronoun is einer.");
p.gaps(98,"1a",`indefinite|Hast du {eine} Waschmaschine? — Ja, ich habe {eine@eine/einer/eins/einen}.
indefinite|Hast du {ein} Messer? — Ja, ich habe {eins~eines@eins/eine/einer/einen}.
indefinite|Hast du {einen} Koffer? — Nein, ich habe {keinen@keine/keiner/keins/keinen}.
indefinite|Hast du {eine} Gitarre? — Nein, ich habe {keine@keine/keiner/keins/keinen}.
indefinite|Hast du {einen} Fotoapparat? — Nein, ich habe {keinen@keine/keiner/keins/keinen}.
indefinite|Hast du {einen} Terminkalender? — Nein, ich habe {keinen@keine/keiner/keins/keinen}.
indefinite|Hast du {ein} Telefon? — Ja, ich habe {eins~eines@eins/eine/einer/einen}.`,"fill");
p.gaps(99,"1b",`indefinite|Hast du {einen} Laptop? — Ja, in meinem Büro steht {einer@einer/eine/eins/einen}.
indefinite|Hast du {ein} Fahrrad? — Ja, vor dem Haus steht {eins~eines@eins/eine/einer/einen}.
indefinite|Hast du {einen} Kamm? — Ja, im Bad liegt {einer@einer/eine/eins/einen}.
indefinite|Hast du {ein} Wörterbuch? — Ja, im Regal steht {eins~eines@eins/eine/einer/einen}.
indefinite|Hast du {einen} Drucker? — Ja, neben dem Computer steht {einer@einer/eine/eins/einen}.
indefinite|Hast du {eine} Brille? — Ja, im Wohnzimmer liegt {eine@eine/einer/eins/einen}.`,"fill");
const a=workbookChapter("4.1","Adjectives in three cases","A2","Change the adjective ending as the noun moves from nominative to accusative to dative. Masculine ein großer becomes einen großen and einem großen.");
for (const [i,[stem,noun,gender]] of [["elegant","Handtasche","f"],["rot","Lippenstift","m"],["schön","Kugelschreiber","m"],["modern","Fotoapparat","m"],["warm","Pullover","m"]].entries()) a.gaps(109,`4a-${i+1}`,`ending:${stem}|Da ist ${gender==="f"?"eine":"ein"} {${stem+(gender==="f"?"e":"er")}} ${noun}.
ending:${stem}|Er kann ${gender==="f"?"eine":"einen"} {${stem+(gender==="f"?"e":"en")}} ${noun} kaufen.
ending:${stem}|Er kann sie mit ${gender==="f"?"einer":"einem"} {${stem}en} ${noun} überraschen.`,"fill");
a.gaps(109,"5-recovered",`ending:weiß|Mit {weißen} Schuhen sollte man laut Text nicht auf die Straße gehen.
ending:rot|Mit {roten} Handtaschen sollte man laut Text nicht auf die Straße gehen.`,"fill");
const way=workbookChapter("6.2","Directions","A1","After aus and zu, use dative. For movement into a building, use in plus accusative. These pairs are the routes requested on the book's campus map.");
way.gaps(136,"5",`article|Von {der@article:dat} Mensa gehen wir in {die@article:acc} Bibliothek.
article|Von {der@article:dat} Bibliothek gehen wir zu {der@article:dat} Verwaltung.
article|Von {der@article:dat} Verwaltung gehen wir in {die@article:acc} Sporthalle.
article|Von {der@article:dat} Sporthalle gehen wir in {die@article:acc} Kantine.
article|Von {der@article:dat} Kantine gehen wir zu {der@article:dat} Cafeteria.
article|Von {der@article:dat} Cafeteria gehen wir zu {dem@article:dat} Sekretariat.
article|Von {dem@article:dat} Sekretariat gehen wir zu {dem@article:dat} Sportplatz.`,"fill");
export default [...v.exercises,...past.exercises,...q.exercises,...l.exercises,...n.exercises,...p.exercises,...a.exercises,...way.exercises];
