import { workbookChapter } from "./builder";
const g = workbookChapter("2.1", "Noun gender and compounds", "A1", "Learn the noun with its article. In a compound, the final noun determines gender. Nouns ending in -ung, -heit, -keit and -ion are feminine; nominalized infinitives are neuter.");
const nouns = (page: number, task: string, rows: string) => g.choices(page, task, rows.trim().split("\n").map(row => { const [article, ...words] = row.split(" "); return `article:nom|Nominativ Singular: {${article}} ${words.join(" ")}`; }).join("\n"));
nouns(71,"2",`der Drucker
das Essen
die Bäckerei
das Studium
das Fotografieren
das Lotto
das Hotel
die Adresse
die Wohnung
die Information
die Kellnerin
der Mittwoch
der Informatiker
die Universität
der Frühling`);
nouns(71,"3",`die Besprechung
die Universität
das Gymnasium
die Vorlesung
die Kollegin
die Kultur
die Faulheit
das Internet
das Hobby
die Liebe
das Telefon
das Kino
der Außenminister
der Organisator
der Fernseher
die Ehrlichkeit
das Mädchen
das Essen
die Torte
das Restaurant
die Schönheit
der Arzt
die Operation
die Krankenschwester
das Lernen
die Übung
die Unterrichtsstunde
die Hausaufgabe`);
nouns(72,"4",`der Schrank
die Kommode
der Stuhl
der Spiegel
das Bücherregal
das Glas
die Tasse
die Flasche
der Teller
der Löffel
die Gabel
das Messer
die Serviette
die Zeitung
das Magazin
das Kochbuch
das Lexikon
das Wörterbuch
der Reiseführer
der Pullover
das Hemd
die Hose
der Rock
das Brot
die Suppe
das Fleisch
der Fisch
das Gemüse
das Obst
der Salat
der Apfel
die Birne
die Tomate
die Schule
die Universität
das Theater
die Post
die Bibliothek
das Polizeirevier
der Bahnhof
das Museum
das Kino
das Geschäft
das Auto
der Zug
die Straßenbahn
das Fahrrad
das Flugzeug
der Motorroller
der Bus
das Schiff
die Fähre`);
nouns(72,"5",`das Zimmer
das Bad
das Dach
die Toilette
die Treppe
die Küche
der Flur
die Dusche
das Bett
die Tür
der Tisch
der Schrank
die Lampe
die Blume
die Vase
das Spielzeug
der Sessel
das Bild
das Regal
der Teppich
die Gardine
das Fenster
die Kommode
die Schüssel
der Balkon
das Foto
der Computer
der Stuhl
die Badewanne`);
nouns(73,"6",`der Zimmerschlüssel
das Hotelrestaurant
das Computerproblem
die Kreditkarte
das Stadtzentrum
der Terminkalender
das Musikinstrument
der Lottogewinn
die Arztpraxis
der Sommerurlaub`);
nouns(73,"7",`der Schreibtisch
die Lampe
die Schreibtischlampe
der Kaffee
die Tasse
die Kaffeetasse
das Bier
die Flasche
die Bierflasche
das Buch
der Laden
der Buchladen
das Foto
das Museum
das Fotomuseum
die Stadt
das Theater
das Stadttheater
das Geschäft
das Lebensmittelgeschäft
das Regal
das Bücherregal
das Büro
die Arbeit
die Büroarbeit
der Lehrer
das Zimmer
das Lehrerzimmer
die Verarbeitung
die Datenverarbeitung
der Computer
das Zeitalter
das Computerzeitalter`);
nouns(74,"8",`die Abteilung
der Leiter
der Abteilungsleiter
der Geburtstag
die Feier
die Geburtstagsfeier
die Wohnung
die Suche
die Wohnungssuche
die Liebe
das Lied
das Liebeslied
die Sicherheit
das Training
das Sicherheitstraining
die Vorlesung
der Saal
der Vorlesungssaal
die Besprechung
das Protokoll
das Besprechungsprotokoll
die Datenverarbeitung
die Maschine
die Datenverarbeitungsmaschine
der Beruf
die Bezeichnung
die Berufsbezeichnung
der Unterricht
die Vorbereitung
die Unterrichtsvorbereitung`);
g.gaps(74,"9",`article|Computer bedeutet: {die@article:nom} Rechenmaschine oder {der@article:nom} Rechenapparat.
article|Früher war {das@article:nom} Wort Computer {die@article:nom} Berufsbezeichnung für Menschen, die Kalkulationen machten.
article|Computer waren Leute, die für einen Astronomen {die@article:acc} Berechnung durchführten.
article|Heute steht {das@article:nom} Wort für eine Maschine, die Daten verarbeitet.
article|{Der@article:nom} deutsche Gelehrte Wilhelm Schickard und {der@article:nom} Franzose Blaise Pascal haben unabhängig voneinander {die@article:acc} erste Rechenmaschine entwickelt.
article|Mit der Industrialisierung machte {die@article:nom} Entwicklung und {die@article:nom} Produktion von Rechenmaschinen weitere Fortschritte.
article|{Das@article:nom} Einsatzgebiet dieser Maschinen war hauptsächlich {die@article:nom} Büroarbeit.
article|{Der@article:nom} Computer als elektronische Datenverarbeitungsmaschine ist eine Erfindung des zwanzigsten Jahrhunderts.
article|{Der@article:nom} erste Großrechner war eine herausragende Ingenieurleistung.
article|{Der@article:nom} deutsche Forscher Konrad Zuse hat den Grundstein für das moderne Computerzeitalter gelegt.`, "fill");
g.order(74,"10",`Der Computer|beeinflusste|auch die Entwicklung des Buches.
In den 1990er-Jahren|wurde|das elektronische Buch|entwickelt.
Das Gerät|war am Anfang sehr groß|und|die Batterie hielt nicht lange.
Auch die Lesbarkeit und der Schwarz-Weiß-Kontrast|waren|früher|nicht optimal.`);
const n = workbookChapter("2.2", "Plural nouns", "A1", "German plurals may take -e, -(e)n, -er, -s or no ending, sometimes with an umlaut. Learn the plural together with the singular noun.");
const plurals = (page: number, task: string, rows: string) => n.choices(page, task, rows.trim().split("\n").map(row => {const [singular, correct, ...wrong] = row.split("|");return `${[correct,...wrong].join("/")}|${singular} → Plural: {${correct}}`;}).join("\n"));
plurals(76,"2",`das Haar|Haare|Haaren|Haarer|Haars
das Auge|Augen|Auge|Auger|Auges
das Ohr|Ohren|Ohre|Öhren|Öhrer
der Finger|Finger|Fingern|Fingers|Fingere
das Knie|Knie|Knien|Knier|Knies
der Zahn|Zähne|Zahne|Zähnen|Zahnen
der Arm|Arme|Armen|Ärme|Armer
die Hand|Hände|Hande|Handen|Händen
das Bein|Beine|Beinen|Beiner|Beins
der Fuß|Füße|Fuße|Füßen|Fußen`);
plurals(76,"3",`die Tomate|Tomaten|Tomate|Tomater|Tomates
die Zwiebel|Zwiebeln|Zwiebel|Zwiebelen|Zwiebels
der Apfel|Äpfel|Apfel|Äpfeln|Apfeln
die Birne|Birnen|Birne|Birner|Birnes
die Orange|Orangen|Orange|Oranger|Oranges
die Gurke|Gurken|Gurke|Gurker|Gurkes`);
n.choices(76,"4",`-s/-e/-er/-en|Foto, Auto, Radio, Mango, Kino, Baby, Kiwi: Die Pluralendung ist {‑s@‑s/‑e/‑er/‑en}.
‑n/‑s/‑e/‑er|Zeitung, Meinung, Universität, Bibliothek: Die Pluralendung ist {‑en@‑en/‑s/‑e/‑er}.
keine Endung/‑n/‑e/‑s|Computer, Ausländer, Maler, Zimmer: {keine Endung}.
‑n/‑s/‑e/‑er|Suppe, Tomate, Auge, Lampe, Familie: Die Pluralendung ist {‑n}.
nur Umlaut/Umlaut und ‑e/Umlaut und ‑er/‑s|Vater, Mutter, Tochter, Apfel: Im Plural ändert sich {nur Umlaut}.`);
plurals(77,"5",`der Kollege|Kollegen|Kollege|Kolleges|Kolleger
die Kollegin|Kolleginnen|Kolleginen|Kolleginne|Kollegins
der Computer|Computer|Computern|Computers|Computere
der Drucker|Drucker|Druckern|Druckers|Drücker
das Büro|Büros|Büro|Büroen|Büroe
der Schlüssel|Schlüssel|Schlüsseln|Schlüssels|Schlüssele
die Besprechung|Besprechungen|Besprechunge|Besprechungs|Besprechung
die Arbeitszeit|Arbeitszeiten|Arbeitszeite|Arbeitszeits|Arbeitszeit
das Angebot|Angebote|Angeboten|Angebots|Angeböte
das Passwort|Passwörter|Passworts|Passworten|Passwörte
der Preis|Preise|Preisen|Preiser|Preiss`);
plurals(77,"6",`der Gast|Gäste|Gaste|Gasten|Gästen
die Kaffeetasse|Kaffeetassen|Kaffeetasse|Kaffeetasser|Kaffeetasses
das Brötchen|Brötchen|Brötchens|Brötchene|Brötcheren
das Glas|Gläser|Glase|Glasen|Gläsern
das Dokument|Dokumente|Dokumenten|Dokuments|Dokumenter
die Unterlage|Unterlagen|Unterlage|Unterlager|Unterlages
die Mappe|Mappen|Mappe|Mapper|Mappes
das Fenster|Fenster|Fenstern|Fensters|Fenstere
der Praktikant|Praktikanten|Praktikante|Praktikants|Praktikant
der Herr|Herren|Herrn|Herre|Herrs`);
n.gaps(77,"7",`Prospekt/Prospekte/Prospekten/Prospekts|Im {Prospekt} stand, dass Ihr Hotel vier {Sterne@Sterne/Stern/Sternen/Sterns} hat.
Urlaubstage/Urlaubstag/Urlaubstagen/Urlaubstages|Ich habe mich auf die {Urlaubstage} an der Nordsee sehr gefreut.
Erwartungen/Erwartung/Erwartunge/Erwartungs|Leider wurden meine {Erwartungen} nicht erfüllt.
Zimmer/Zimmern/Zimmers/Zimmere|Die {Zimmer} waren klein und dunkel.
Getränke/Getränk/Getränken/Getränkes|Es gab keine {Getränke} in der Minibar.
Fernseher/Fernsehern/Fernsehers/Fernsehere|Der {Fernseher} war kaputt.
Betten/Bett/Bette/Betts|Ich konnte nicht schlafen, weil die {Betten} so hart waren.
Probleme/Problem/Problemen/Problems|Auch in anderen Bereichen gab es {Probleme}.
Stunden/Stunde/Stundes/Stunder|Wir mussten manchmal zwei {Stunden} auf das Essen warten.
Liegestühle/Liegestuhl/Liegestühlen/Liegestuhle|Am Swimmingpool standen nur zehn {Liegestühle}.
Gäste/Gast/Gästen/Gasten|Im Hotel wohnten über hundert {Gäste}.
Hotelpersonal/Hotelpersonale/Hotelpersonalen/Hotelpersonals|Das {Hotelpersonal} war unfreundlich.
Service/Services/Servicen/Servicer|Das ist für den schlechten {Service} viel zu viel.
Hälfte/Hälften/Hälftes/Hälfter|Ich erwarte, dass Sie mir die {Hälfte} des Geldes zurückzahlen.`, "fill");
export default [...g.exercises, ...n.exercises];
