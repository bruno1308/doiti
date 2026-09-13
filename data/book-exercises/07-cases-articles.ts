import { workbookChapter } from "./builder";
const c = workbookChapter("2.3", "Noun cases", "A1", "Choose the article for the noun's gender, number and role. Accusative marks many direct objects; dative follows mit and verbs such as helfen; genitive expresses possession.");
const articles = (page: number, task: string, grammaticalCase: "acc" | "dat" | "gen", pattern: string, words: string) => c.gaps(page,task,words.split(";").map(row => {const [a,...noun]=row.trim().split(" ");return `article:${grammaticalCase}|${pattern.replace("#",`{${a}} ${noun.join(" ")}`)}`;}).join("\n"),"fill");
articles(79,"1a","acc","Ich suche #.","das Dokument;das Wörterbuch;den Chef;den Kopierer;die Personalabteilung;den Schlüssel;den Bleistift");
articles(79,"1b","acc","Ich lese #.","den Krimi von Donna Leon;den Artikel über das Leben auf dem Mond;das Fernsehprogramm;die Leipziger Volkszeitung");
articles(79,"2","acc","Siehst du #?","die Blumen;die Kinder;die Verkehrsschilder;die Taxis;die Kaufhäuser");
articles(79,"3a","dat","Das Auto gehört #.","dem Fußballspieler;der Firma;dem Finanzminister;dem Filmstar;dem Mädchen");
articles(79,"3b","dat","Wir sind mit # gekommen.","dem Taxi;dem Zug;der U-Bahn;dem Fahrrad");
articles(79,"4","dat","Die neuen Gesetze helfen #.","den Politikern;den Kindern;den Frauen;den Künstlern;den Hausbesitzern;den Managern;den Bauern");
articles(80,"5","gen","Hast du die Adresse #?","des Restaurants;des Detektivs;der Sprachschule;des Hotels;der Autowerkstatt");
c.choices(80,"6",`der Sekretärin/die Kollegin/den Projektmitarbeitern/dem Chef|Welcher Ausdruck passt grammatisch NICHT? „Hast du … schon geantwortet?“ → {die Kollegin}
das Essen/die Rechnung/der Reise/die Fahrtkosten|Welcher Ausdruck passt grammatisch NICHT? „Hast du … schon bezahlt?“ → {der Reise}
die E-Mail/den Dokumenten/die Fotos/die Excel-Tabelle|Welcher Ausdruck passt grammatisch NICHT? „Hast du … schon gespeichert?“ → {den Dokumenten}
die Tomatensuppe/der Pudding/die Spaghetti/das Schnitzel|Welcher Ausdruck passt grammatisch NICHT? „Ich möchte gerne … essen.“ → {der Pudding}
der Direktor/dem Kunden/der Nachbarin/der Lehrerin|Welcher Ausdruck passt grammatisch NICHT? „Gratulierst du … zum Geburtstag?“ → {der Direktor}`);
c.choices(80,"7",`case|Leihst du mir das Wörterbuch? „das Wörterbuch“ → {Akkusativ}
case|Der Rezeptionist gibt den Hotelgästen den Schlüssel. „den Hotelgästen“ → {Dativ}
case|Die Eltern von Ulrike wohnen in Hamburg. „Die Eltern“ → {Nominativ}
case|Siehst du das Gebäude dort? „das Gebäude“ → {Akkusativ}
case|Das ist das Rathaus. „das Rathaus“ → {Nominativ}
case|Dem Kind schmeckt das Essen nicht. „Dem Kind“ → {Dativ}
case|Ich nehme den blauen Rock. „den blauen Rock“ → {Akkusativ}
case|Kennst du das Passwort für diesen Computer? „das Passwort“ → {Akkusativ}
case|Darf ich das Telefon des Chefs benutzen? „des Chefs“ → {Genitiv}
case|Ich muss den Kindern helfen. „den Kindern“ → {Dativ}`);
articles(80,"8a","dat","Ich fahre mit # zur Arbeit.","dem Zug;dem Fahrrad;dem Auto;der U-Bahn");
articles(80,"8b","acc","Ich denke an #.","den Urlaub;das Konzert von gestern;die Probleme im Büro;die Arbeit");
articles(80,"8c","dat","Ich habe mit # gesprochen.","dem Chef;der Sekretärin;dem Mädchen dort");
articles(80,"8d","acc","Ich ärgere mich über #.","die E-Mail von Sabine;den Fotokopierer;das Wochenendprogramm;die Besprechungen");
articles(80,"8e","acc","Ich gebe viel Geld für # aus.","das Studium;die Kinder;den Management-Kurs;die Miete");
articles(80,"8f","acc","Ich freue mich auf #.","die Ferien;die Geburtstagsparty;den Theaterbesuch;das Wochenende");
const w = workbookChapter("2.3", "Weak masculine nouns", "A2", "Weak masculine nouns take -(e)n outside the nominative singular: der Kollege, den/dem/des Kollegen. Herr has Herrn in the singular and Herren in the plural.");
const weak = (page:number,task:string,pattern:string,words:string) => w.choices(page,task,words.split(";").map(row=>{const [base,answer]=row.split(":");return `${base}/${base}n/${base}en/${base}s/${base}es|${pattern.replace("#",`{${answer}}`)}`;}).join("\n"));
weak(81,"9","Ich sehe den #.","Hund:Hund;Affe:Affen;Elefant:Elefanten;Kater:Kater;Tiger:Tiger;Fisch:Fisch;Hase:Hasen;Vogel:Vogel;Belgier:Belgier;Chinese:Chinesen;Norweger:Norweger;Franzose:Franzosen;Engländer:Engländer;Spanier:Spanier;Russe:Russen;Amerikaner:Amerikaner;Japaner:Japaner;Inder:Inder;Biologe:Biologen;Jurist:Juristen;Sekretär:Sekretär;Journalist:Journalisten;Informatiker:Informatiker;Politiker:Politiker;Assistent:Assistenten;Lehrer:Lehrer;Herr:Herrn;Junge:Jungen;Mann:Mann;Kollege:Kollegen;Kunde:Kunden;Vater:Vater;Sohn:Sohn");
w.gaps(82,"10",`Diamant/Diamanten/Diamants/Diamante|Der {Diamant} ist das Symbol der ewigen Liebe.
Experten/Experte/Expertes/Experter|Weltweit beurteilen {Experten} Diamanten nach Schliff, Gewicht, Farbe und Reinheit.
Diamant/Diamanten/Diamants/Diamante|Der perfekte Schliff verleiht dem {Diamanten} seine Brillanz.
Menschen/Mensch/Mensches/Menschs|Der Schliff wird von {Menschen} gemacht.
Diamant/Diamanten/Diamants/Diamante|Der Mensch kann den {Diamanten} direkt beeinflussen.
Diamant/Diamanten/Diamants/Diamante|Erst der Schliff bringt den {Diamanten} zum Leuchten.
Diamant/Diamanten/Diamants/Diamante|Die Farbe eines {Diamanten} spielt eine große Rolle.
Diamant/Diamanten/Diamants/Diamante|Je weißer ein {Diamant} ist, desto seltener ist er.
Diamant/Diamanten/Diamants/Diamante|{Diamanten} werden in fast allen Farben gefunden.
Diamant/Diamanten/Diamants/Diamante|Die Reinheit eines {Diamanten} kann man an seinen Einschlüssen erkennen.
Diamant/Diamanten/Diamants/Diamante|Ein {Diamant} gilt dann als rein, wenn keine Einschlüsse sichtbar sind.
Diamant/Diamanten/Diamants/Diamante|Das Gewicht eines {Diamanten} wird in Karat gemessen.
Diamant/Diamanten/Diamants/Diamante|Ein {Diamant} von fünf Karat wiegt ein Gramm.`,"fill");
w.gaps(82,"11",`Kunde/Kunden/Kundes/Kundens|Hast du die Telefonnummer des {Kunden}?
Kunde/Kunden/Kundes/Kundens|Nein, der {Kunde} hat mir die Nummer nicht gegeben.
Patient/Patienten/Patients/Patiente|Der Arzt sprach mit dem {Patienten}.
Kollege/Kollegen/Kolleges/Kollegens|Was ist mit dem neuen {Kollegen}?
Chinese/Chinesen/Chineses/Chineser|An dem Wettkampf nahmen auch {Chinesen} und {Griechen@Grieche/Griechen/Grieches/Griecher} teil.
Journalist/Journalisten/Journalists/Journaliste|Über die Reise berichteten viele {Journalisten}.
Polizist/Polizisten/Polizists/Poliziste|Es gab Auseinandersetzungen zwischen {Polizisten} und {Demonstranten@Demonstrant/Demonstranten/Demonstrants/Demonstrante}.
Polizist/Polizisten/Polizists/Poliziste|Ein {Polizist} wurde verletzt.`,"fill");
w.gaps(82,"12",`Kollege/Kollegen/Kolleges/Kollegens|Liebe {Kollegen}, wir möchten alle männlichen {Kollegen} zu einer Kutschenfahrt einladen.
Kollege/Kollegen/Kolleges/Kollegens|{Kollege} Müller bringt zwei Fässer Bier mit.
Kollege/Kollegen/Kolleges/Kollegens|Wir suchen einen hilfsbereiten {Kollegen}, der etwas zu essen vorbereitet.
Kollege/Kollegen/Kolleges/Kollegens|Wir sind gespannt, ob ein {Kollege} aus einer anderen Abteilung gewinnt.
Kollege/Kollegen/Kolleges/Kollegens|Ich bitte alle {Kollegen}, sich bis zum fünften Mai zu melden.`,"fill");
const a = workbookChapter("2.4", "Articles in context", "A1", "Use ein/eine to introduce something and der/die/das when it is known. Kein negates a noun. The ending depends on gender, case and number.");
a.gaps(85,"2",`indefinite|Hast du {einen} Kugelschreiber für mich? — Nein, ich habe nur {einen} Bleistift.
negative|{Kein} Problem. Ich schreibe auch mit {einem@indefinite} Bleistift.
indefinite|Ich brauche noch {eine} Lampe, {einen} Bürostuhl und {ein} Telefon.
indefinite|Möchten Sie {ein} Einzelzimmer oder {ein} Doppelzimmer?
indefinite|{Ein} Einzelzimmer, bitte. Hat das Zimmer {einen} Internetanschluss?
negative|Leider haben wir im Haus {keinen} Internetzugang.
indefinite|Ich möchte {eine} Eintrittskarte für die Ausstellung.
indefinite|Haben Sie auch {einen} Katalog zur Ausstellung?
negative|Wir haben {keinen} Katalog, aber {einen@indefinite} Bildband.`,"fill");
a.gaps(85,"3",`article|Wir haben einen Termin vereinbart. Leider muss ich {den@article:acc} Termin verschieben.
indefinite|Ich habe {einen} neuen Drucker bekommen. {Der@article:nom} Drucker funktioniert nicht mehr.
article|{Der@article:nom} Chef hat für morgen {eine@indefinite} Besprechung geplant. {Die@article:nom} Besprechung fällt aus, {der@article:nom} Chef muss nach Paris fliegen.
indefinite|Wir haben Ihnen {ein} Angebot geschickt. Haben Sie {das@article:acc} Angebot schon gelesen?
indefinite|Du wolltest Klaus {eine} E-Mail schreiben. Hast du {die@article:acc} E-Mail schon abgeschickt?
indefinite|Es gibt nur noch {eine} freie Stelle in der Verwaltung. {Die@article:nom} freie Stelle in der Personalabteilung ist schon besetzt.`,"fill");
a.gaps(85,"4",`article|Das beliebteste deutsche Haustier ist {die@article:nom} Katze.
article|An zweiter Stelle folgen {die@article:nom} Nagetiere, auf dem dritten Platz kommen {die@article:nom} Hunde.
article|Der Grund für {die@article:acc} Beliebtheit liegt im Verhalten {der@article:gen} Katzen.
indefinite|{Eine} Zeitung berichtete von {einem} besonderen Kater.
indefinite|Der Kater wartete an {einer} Bushaltestelle auf {den@article:acc} Bus.
article|Er stieg in {den@article:acc} Bus ein und fuhr eine Runde.`,"fill");
a.gaps(86,"4",`negative|Im Buch steht: „Mäuse mögen {keinen} Käse: Sie mögen Süßspeisen.“
article|Mäuse reagieren auf {den@article:acc} Geruch von Käse, weil {der@article:nom} Geruch in ihrer natürlichen Umgebung nicht vorkommt.`,"fill");
a.gaps(86,"5",`article|In Österreich benutzt man {das@article:acc} Neutrum: {das@article:acc} SMS.
negative|Haben Sie {kein} Geld und brauchen Sie {einen@indefinite} Kredit?
indefinite|Dann müssen Sie zu {einer} Bank gehen.
indefinite|Banken wollen {eine} Sicherheit, wenn sie Geld verleihen.
indefinite|Normalerweise akzeptieren Banken {eine} Wohnung oder {ein} Auto.
article|Bei einigen Banken im Norden {des@article:gen} Landes kann man Geld gegen Parmesan leihen.
article|In {der@article:dat} Region Emilia Romagna akzeptieren vier Geldinstitute {den@article:acc} beliebten Hartkäse als Sicherheit.
article|{Die@article:nom} Bank hat für {den@article:acc} Käse ein Lagerhaus.
article|Experten überwachen {den@article:acc} Reifeprozess.
article|In {den@article:dat} guten Hotels findet man auch {einen@indefinite} Wasser-Sommelier.
article|Er arbeitet in {den@article:dat} Hotel-Restaurants.
article|Er empfiehlt {den@article:dat} Gästen nicht {den@article:acc} besten Wein, sondern {das@article:acc} beste Wasser.
indefinite|{Ein} Experiment zeigte: {Eine} heiße Tasse Kaffee spielt {eine} positive Rolle.
indefinite|Wer {eine} warme Tasse Kaffee in der Hand hatte, reagierte positiv.
indefinite|Menschen mit {einem} Eiskaffee in den Händen waren nicht so freundlich.`,"fill");
a.gaps(86,"6",`negative|Ich habe im Moment {keine} Zeit.
negative|Ich habe {keine} Ahnung.
negative|Es war {kein} Mensch da.
negative|Ich habe zurzeit {kein} Auto.
negative|Ich habe noch gar {keinen} Hunger.
negative|Ich habe im Moment {kein} Geld.
negative|Ich habe noch {keinen} Job gefunden.
negative|Daran habe ich {kein} Interesse.
negative|Ich habe leider {keinen} Nagel.
negative|Ich habe {keinen} Durst.
negative|Ich habe leider {kein} Wörterbuch.
negative|Ich habe leider {keine} Waschmaschine.`,"fill");
const p = workbookChapter("2.5", "Possessive articles", "A1", "The owner determines mein/dein/sein/ihr/unser/euer/Ihr. The ending agrees with the noun's gender, case and number. Euer becomes eure/eurem/euren before most endings.");
p.choices(88,"1",`mein/dein/sein/unser|du → {dein} Haus
mein/dein/sein/unser|er → {sein} Haus
mein/dein/sein/ihr|sie (Singular) → {ihr} Haus
mein/dein/sein/unser|das Kind → {sein} Ball
mein/dein/sein/unser|wir → {unser} Haus
mein/dein/sein/euer|ihr → {euer} Haus
mein/dein/sein/Ihr|Sie (höfliche Anrede) → {Ihr} Haus
mein/dein/sein/ihr|Otto und Marie → {ihr} Haus
mein/dein/sein/unser|der Chef → {sein} Büro`);
p.gaps(88,"2a",`ending:dein|(du) {Dein} Auto wurde gestohlen!
ending:sein|(er) {Sein} Fahrrad wurde gestohlen!
ending:ihr|(sie) {Ihre} Handtasche wurde gestohlen!
ending:unser|(wir) {Unser} Koffer wurde gestohlen!
euer/eure/eurem/euren|(ihr) {Euer} Fotoapparat wurde gestohlen!`,"fill");
p.gaps(88,"2b",`ending:mein|Ich habe {mein} Handy und {meinen} Lippenstift vergessen.
ending:sein|Otto hat {sein} Portemonnaie, {seinen} Autoschlüssel und {seine} Badehose vergessen.
ending:unser|Wir haben {unsere} Reiseunterlagen, {unsere} Bademäntel und {unsere} Sonnencreme vergessen.
euer/eure/eurem/euren|Habt ihr {eure} Reservierungsbestätigung, {eure} Eintrittskarten und {euer} Geld vergessen?
ending:ihr|Kathrin hat {ihre} Sonnenbrille, {ihren} Krimi und {ihren} Wecker vergessen.
ending:ihr|Die Kinder haben {ihre} Gameboys, {ihren} Fußball und {ihre} Sportschuhe vergessen.
ending:dein|Hast du wieder {deinen} Laptop vergessen?`,"fill");
p.gaps(88,"3",`ending:ihr|Die Kinder haben keine Mützen getragen. {Ihre} Ohren tun weh.
ending:mein|Ich kann kaum sprechen. {Mein} Hals tut weh.
euer/eure/eurem/euren|Ihr habt lange vor dem Computer gesessen. Tut {euer} Rücken weh?
ending:unser|Wir haben eine Wanderung gemacht. Jetzt tun {unsere} Füße weh.
ending:dein|Du hast viel gegessen. {Dein} Bauch tut bestimmt weh.
ending:sein|Ingo isst viel Schokolade. Deshalb tun {seine} Zähne weh.
ending:ihr|Laura hat fünf Briefe geschrieben. {Ihre} Hand tut weh.
ending:mein|Ich habe viele Dokumente gelesen. {Meine} Augen tun weh.`,"fill");
for (const [label,group,forms] of [
  ["du","ending:dein",["deinem","deine","deiner","deinem","deine","deiner"]],
  ["Sie","ending:Ihr",["Ihrem","Ihre","Ihrer","Ihrem","Ihre","Ihrer"]],
  ["ihr","euer/eure/eurem/euren/eurer",["eurem","eure","eurer","eurem","eure","eurer"]],
] as const) p.gaps(89,`4-${label}`,` ${group}|(${label}) Was isst man in {${forms[0]}} Heimatland zum Frühstück?
${group}|(${label}) Was machen {${forms[1]}} Kinder?
${group}|(${label}) Was ${label==="du"?"machst du":label==="Sie"?"machen Sie":"macht ihr"} in {${forms[2]}} Freizeit?
${group}|(${label}) ${label==="du"?"Arbeitest du":label==="Sie"?"Arbeiten Sie":"Arbeitet ihr"} oft in {${forms[3]}} Garten?
${group}|(${label}) ${label==="du"?"Schreibst du":label==="Sie"?"Schreiben Sie":"Schreibt ihr"} oft an {${forms[4]}} Freunde?
${group}|(${label}) Wo ${label==="du"?"hast du":label==="Sie"?"haben Sie":"habt ihr"} in {${forms[5]}} Kindheit gewohnt?`,"fill");
p.gaps(89,"5",`ending:Ihr|Herzlichen Dank für {Ihre} Zimmerbestellung.
ending:Ihr|Wir bestätigen {Ihre} Reservierung in {unserem@ending:unser} Hotel.
ending:unser|{Unsere} Zimmer sind mit Balkon ausgestattet.
ending:unser|Eine Besonderheit ist {unser} Gourmet-Restaurant.
ending:unser|{Unser} Beauty-Team nimmt {Ihre@ending:Ihr} Buchungswünsche gerne entgegen.
ending:unser|Reservieren Sie einen Platz in {unserer} Tiefgarage.
ending:Ihr|Wir freuen uns auf {Ihren} Besuch.`,"fill");
p.gaps(89,"6",`ending:ihr|Gudrun kam mit {ihrem} Freund. Sie trug {ihr} rotes Kleid.
ending:sein|Bruno kam mit {seiner} Kollegin Sandra. Findet {seine} Freundin Yvonne das gut?
ending:sein|Bruno berichtete über {seine} neue CD. {Seine} Fans wollten Autogramme.
ending:sein|Friedrich Grün sprach über {seine} Bilder, {seine} Farben, {seinen} Hund und {seine} Ansicht über Kunst.
ending:ihr|Marie und Otto sind bekannt für {ihre} Gemäldesammlung.
ending:sein|Otto kaufte ein Bild von {seinem} Lieblingsmaler.
ending:sein|Karl stritt sich mit Bruno. {Seine} Aggressionen sind bekannt. {Seine} Kunstwerke verkaufen sich schlecht.
ending:ihr|Junge Maler können {ihre} Werke in Galerien ausstellen.`,"fill");
const d = workbookChapter("2.6", "Demonstrative and question articles", "A1", "Welcher asks which one; was für ein asks what kind. Dieser points to a particular thing. Their endings depend on the noun's gender and case.");
d.gaps(91,"1",`indefinite|Was für {ein} Auto haben Sie gesehen? — Ein grünes mit einem roten Dach.
ending:welch|{Welche} Schuhe meinten Sie? — Die blauen mit der roten Schleife.
ending:welch|{Welches} Buch kannst du empfehlen? — Lies dieses mal.
indefinite|Was für {ein} Haustier hat Oma? — Wieder eine Katze.
indefinite|Was für {ein} Typ ist der neue Kollege? — Ein sehr netter.
ending:welch|{Welche} Zeitung hast du gelesen? — Die Süddeutsche.`,"fill");
d.gaps(91,"2",`ending:welch|{Welche} Tasche meinen Sie? — Die blaue Tasche.
ending:dies|Meinen Sie {diese} Tasche? — Nein, die linke. Ja, genau {diese} Tasche meine ich.
indefinite|Was für {einen} Mann haben Sie gesehen? — Einen großen Mann.
indefinite|Was für {einen} Mantel trug er? — Einen langen schwarzen Mantel.
ending:welch|{Welche} Haarfarbe hatte der Mann?
ending:dies|Schauen Sie sich {diese} Fotos an.
ending:dies|{Dieser} Mann hier könnte es sein. {Diesen} Mann habe ich gesehen.
ending:welch|{Welches} Bild meinst du?
ending:dies|Ich finde gerade {dieses} Bild nicht so toll.`,"fill");
d.gaps(91,"3",`indefinite|Was für {ein} Zimmer möchten Sie? — Ein Doppelzimmer.
ending:welch|In {welchem} Stock befindet sich mein Zimmer? — Im ersten.
ending:welch|{Welcher} Schlüssel ist für den Tresor? — Der gelbe.
ending:welch|In {welchem} Bett willst du schlafen? — Im rechten.
ending:welch|An {welchen} Tagen ist der Garten geschlossen? — Nur am Montag.
ending:welch|{Welche} Tür führt zur Tiefgarage? — Die erste links.
indefinite|Mit was für {einer} Karte möchten Sie zahlen? — Mit einer Kreditkarte.
ending:welch|Unter {welcher} Telefonnummer erreiche ich die Hotelbar?
indefinite|Was für {ein} Museum können Sie empfehlen? — Ein Puppenmuseum.`,"fill");
export default [...c.exercises,...w.exercises,...a.exercises,...p.exercises,...d.exercises];
