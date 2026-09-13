import { workbookChapter } from "./builder";
const q=workbookChapter("6.1 · 9","Guided conversations","A1","Use the question word that matches the supplied answer. These short dialogues give fixed context to otherwise open speaking prompts.");
q.gaps(131,"2",`question|{Wann} fahren Sie in den Urlaub? — Im August.
question|{Wohin} fahren Sie in den Urlaub? — Nach Italien.
question|{Wo} arbeiten Sie? — In einer Schule.
question|{Wie lange} arbeiten Sie schon dort? — Seit fünf Jahren.
question|{Wie viel} kostet die Reise? — Fünfhundert Euro.
question|{Wie oft} spielen Sie Tennis? — Zweimal pro Woche.
question|{Was} machen Sie gern? — Ich lese gern.
question|{Warum} lernen Sie Deutsch? — Weil ich in Berlin arbeiten möchte.`,"fill");
q.gaps(170,"8b",`part:machen|Am Montag habe ich das Essen {gemacht}.
part:sehen|Am Dienstag habe ich fern{gesehen}.
part:gehen|Am Abend bin ich ins Bett {gegangen}.
gelernt/gelernen/lernte/gelernte|Ich habe Deutsch {gelernt}.
part:hören|Ich habe Musik {gehört}.
part:einkaufen|Ich habe Gemüse {eingekauft}.
gewaschen/gewascht/gewäscht/wusch|Ich habe Wäsche {gewaschen}.
geduscht/geduschen/duschte/geduschte|Ich habe {geduscht}.
beantwortet/gebeantwortet/beantworten/beantwortete|Ich habe E-Mails {beantwortet}.
part:essen|Ich habe zu Mittag {gegessen}.
gespült/gespülen/spülte/gespülte|Ich habe das Geschirr {gespült}.`);
q.gaps(173,"17",["Stuhl","Tisch","Sofa","Fernseher","Foto","Gemälde","Bücherregal","Teppich","Schrank","Klavier","Sessel"].map(noun=>`indefinite|In meinem Zimmer steht {ein} ${noun}.`).concat(["Lampe","Pflanze","Vase"].map(noun=>`indefinite|In meinem Zimmer steht {eine} ${noun}.`)).join("\n"),"fill");
q.gaps(174,"23",`article|Die Tafel hängt an {der@article:dat} Wand.
article|Der Lehrertisch steht vor {der@article:dat} Tafel.
article|Mein Stuhl steht hinter {dem@article:dat} Tisch.
article|Das Regal steht neben {der@article:dat} Tür.
article|Meine Tasche liegt unter {dem@article:dat} Tisch.
article|Das Wörterbuch liegt auf {dem@article:dat} Tisch.
article|Das Plakat hängt an {der@article:dat} Wand.
article|Der Beamer hängt an {der@article:dat} Decke.
article|Der Computer steht auf {dem@article:dat} Lehrertisch.
article|Der CD-Spieler steht in {dem@article:dat} Regal.
article|Der Overheadprojektor steht neben {dem@article:dat} Tisch.
article|Das Smartboard steht vor {der@article:dat} Wand.`,"fill");
const p=workbookChapter("9 · Sprechübungen","Polite and reported conversations","A2","Use Konjunktiv II for a polite request. In reported questions and infinitive clauses, keep the verb at the end.");
p.gaps(170,"9",`subjkönnen|{Könnten} wir einen Termin für eine Wohnungsbesichtigung vereinbaren?
subjkönnen|{Könnte} ich dich morgen besuchen?
subjwerden|Ich {würde} Ihnen gerne ein Produkt vorstellen.
subjhaben|{Hätten} Sie einen Termin beim Zahnarzt für mich?
subjkönnen|{Könnten} wir über eine Gehaltserhöhung sprechen?
subjkönnen|{Könntest} du mit mir über das neue Projekt sprechen?`);
p.order(175,"27",`Ich habe keine Zeit,|meine Hausaufgaben|zu machen.
Meine Nachbarin hat keine Zeit,|zum Zahnarzt|zu gehen.`);
p.order(175,"28",`Ich habe meinen Nachbarn gefragt,|wie alt|er|ist.
Ich habe meinen Nachbarn gefragt,|was|er von Beruf|ist.
Ich habe meinen Nachbarn gefragt,|wo|er|geboren wurde.
Ich habe meinen Nachbarn gefragt,|wann|er|geboren wurde.
Ich habe meinen Nachbarn gefragt,|was|er|studiert hat.
Ich habe meinen Nachbarn gefragt,|wo|er|wohnt.
Ich habe meinen Nachbarn gefragt,|ob|er Kinder|hat.
Ich habe meinen Nachbarn gefragt,|wohin|er in den Urlaub|fährt.
Ich habe meinen Nachbarn gefragt,|welche Sprachen|er|spricht.
Ich habe meinen Nachbarn gefragt,|welche Hobbys|er|hat.
Ich habe meinen Nachbarn gefragt,|was|er gern|isst.
Ich habe meinen Nachbarn gefragt,|wovon|er|träumt.`);
export default [...q.exercises,...p.exercises];
