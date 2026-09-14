import { workbookChapter } from "./builder";
import { prepositionGaps } from "./preposition-gaps";
const d=workbookChapter("5.1–5.2","Dative and accusative prepositions","A1","Aus, bei, mit, nach, seit, von and zu take dative. Durch, für, gegen, ohne and um take accusative. Nach is used for most cities and countries; zu is used for people and many institutions.");
const route=(page:number,task:string,prefix:string,rows:string)=>d.gaps(page,task,rows.split(";").map(row=>{const [answer,rest]=row.split("|");return `nach/zu/zum/zur/aus/von/vom/bei/beim/in/im|${prefix} {${answer}} ${rest}.`;}).join("\n"),"fill");
route(119,"1a","Wir fahren","nach|München;zum~zu dem|Bahnhof;nach|Portugal;nach|rechts;zur~zu der|Polizei;zum~zu dem|Zahnarzt;nach|Hause;zu|Otto und Frieda;zur~zu der|Post;nach|Deutschland;zum~zu dem|Unterricht");
route(119,"1b","Ich komme","aus~von|Frankreich;vom~von dem|Bahnhof;aus~von|Leipzig;von der|Buchmesse;von der|Polizei;vom~von dem|Augenarzt;vom~von dem|Unterricht;von|Tante Else;aus der~von der|Sauna;von einer|Party;von|links");
route(120,"1c","Ich war","beim~bei dem|Chef;beim~bei dem|Golfspielen;beim~bei dem|Anwalt;bei der|Polizei;beim~bei dem|Englischunterricht;beim~bei dem|Friseur;beim~bei dem|Einstufungstest");
d.gaps(120,"2",`article|Oma fährt mit {dem@article:dat} Taxi zu {ihren@ending:ihr} Enkelkindern.
article|Max und Moritz fahren mit {dem@article:dat} Schiff über den Rhein {nach@preposition} Köln.
article|Familie Feuerstein fährt mit {dem@article:dat} Zug {nach@preposition} Frankreich.
article|Susi fährt mit {dem@article:dat} Motorrad {zur@zur/zum/ins/im} Party von Oskar.
article|Mein Nachbar fährt mit {dem@article:dat} Fahrrad {zum@zum/zur/ins/im} Deutschunterricht.
article|Die Kollegen fliegen mit {dem@article:dat} Flugzeug {nach@preposition} London.
article|Herr Krümel fährt mit {der@article:dat} U-Bahn {zum@zum/zur/ins/im} Alexanderplatz.`,"fill");
d.gaps(120,"3",`vom/zum/mit/nach|Ich komme gerade {vom} Zahnarzt.
zum/vom/nach/mit|Ich muss wieder {zum} Zahnarzt {zu@preposition} einer Kontrolle.
preposition|Ich gehe nicht mehr so oft {zu} den Vorlesungen.
preposition|Ich fahre {zu} einem Vorstellungsgespräch {nach} Frankfurt.
preposition|Ein Freund {von} mir wohnt dort.
preposition|Ich lebe {seit} vier Jahren in München.
preposition|Ich bin {mit} meinem Mann {nach} München gezogen.
zum/vom/nach/mit|Ich muss noch {zum} Bäcker.
zum/vom/nach/mit|Alles Gute {zum} Geburtstag!`,"fill");
d.gaps(121,"1",`preposition|Helfen diese Tabletten auch {gegen~bei} Halsschmerzen?
preposition|Diesmal fahren wir {ohne} die Kinder in Urlaub: nur du und ich.
preposition|Ich bin {gegen} diesen Plan. Er wird nicht funktionieren.
preposition|Wie viel hast du {für} diese Jacke bezahlt?
preposition|Die Vorlesung endet heute {um~gegen} zwölf Uhr.
preposition|Ich will einen Spaziergang {durch} den Park machen.
preposition|Herr Schmidt kommt erst {um~gegen} vierzehn Uhr zurück.
preposition|{Ohne} deine Hilfe kann ich diese Aufgabe nicht lösen.`,"fill");
prepositionGaps(d, 121, "2", [
  ["bis/seit/ab/vor|Herr Müller hat {bis} nächste Woche Urlaub.", "Mr Müller is on holiday until next week.", "Distinguish the end of a time period from its starting point."],
  ["gegen/an/über/durch|Herr Müller ist {gegen} {ein@ein/einen/einem/eines} Verkehrsschild gefahren.", "Mr Müller drove into a traffic sign, hitting it.", "A collision uses a preposition with accusative. Verkehrsschild is neuter."],
  ["ohne/mit/für/gegen|Herr Müller kann {ohne} Computer nicht leben.", "Mr Müller cannot live without a computer.", "Choose the preposition expressing absence, rather than accompaniment or opposition."],
  ["für/mit/von/bei|Herr Müller hat {für} {seinen@seinen/seinem/sein/seiner} Sohn einen Fußball gekauft.", "Mr Müller bought a football for his son.", "The intended recipient uses a preposition with accusative. Sohn is masculine; the owner is Mr Müller."],
  ["durch/um/in/aus|Herr Müller ist {durch} {die@article:acc} ganze Stadt gelaufen.", "Mr Müller walked through the whole city.", "Distinguish movement through an area from movement around it. Stadt is feminine and the path preposition takes accusative."],
  ["um/gegen/seit/bis|Herr Müller ist {um} siebzehn Uhr {in@in/nach/zu/aus} Frankfurt angekommen.", "Mr Müller arrived in Frankfurt at exactly five p.m.", "Distinguish an exact clock time from an approximate time. Ankommen describes arrival at a place, not a destination with fahren."],
  ["gegen/für/mit/ohne|Herr Müller kann {gegen} {seine@seine/seinen/seinem/seiner} Kopfschmerzen nichts tun.", "Mr Müller can do nothing to counter his headaches.", "Counteracting a problem uses an accusative preposition. Kopfschmerzen is plural; choose the ending for his."],
]);
const t=workbookChapter("5.3","Two-way prepositions","A2","For location (wo), use dative. For a destination or changed position (wohin), use accusative. Time expressions with an, in, vor and zwischen take dative.");
t.gaps(123,"1a",`article|Mizi ist in {dem@article:dat} Garten.
article|Mizi ist hinter {der@article:dat} Gardine.
article|Mizi ist unter {dem@article:dat} Sofa.
article|Mizi ist zwischen {den@article:dat} Kissen.
article|Mizi ist vor {der@article:dat} Haustür.
article|Mizi ist auf {dem@article:dat} Schrank.`,"fill");
t.gaps(123,"1b",`article|Das Geld ist in {dem@article:dat} Keller, in {einer@indefinite} Plastiktüte hinter {dem@article:dat} Weinregal.
indefinite|Das Geld ist in {einem} Schließfach auf {dem@article:dat} Bahnhof.
article|Das Geld ist in {dem@article:dat} Geheimfach eines Koffers auf {dem@article:dat} Dachboden.
indefinite|Das Geld ist unter {einem} Grabstein auf {dem@article:dat} Friedhof.`,"fill");
t.gaps(123,"2",`article|Stell den Karton in {den@article:acc} Keller!
article|Stell die Kaffeemaschine und die Mikrowelle in {die@article:acc} Küche!
article|Stell den Fernseher auf {die@article:acc} Kommode!
article|Häng die Sachen in {den@article:acc} Kleiderschrank!
article|Stell den Computer auf {den@article:acc} Schreibtisch!
article|Leg die Socken in {die@article:acc} Schublade!`,"fill");
t.gaps(124,"3",`article|Ich warte in {dem@article:dat} Schuhgeschäft in {der@article:dat} Friedrichstraße.
ending:welch|In {welches} Restaurant möchtest du gehen?
article|Ich kenne ein Restaurant neben {dem@article:dat} Theater.
article|Ich hole dich an {der@article:dat} Bushaltestelle ab.
article|Auf {dem@article:dat} Marktplatz findet ein Konzert statt.
article|Kommst du mit in {die@article:acc} neue Schwimmhalle?
article|Ich gehe noch mal in {die@article:acc} Firma.
article|Was willst du abends in {der@article:dat} Firma machen?
ending:mein|Ich muss in {meinem} Büro suchen. Das Dokument liegt hoffentlich auf {meinem} Schreibtisch.
article|Vielleicht hat die Sekretärin es in {den@article:acc} Tresor gelegt.`,"fill");
t.gaps(124,"4",`am/im/vor/zwischen|Herr Schmidt ist {am} Freitag auf Geschäftsreise.
preposition|Geben Sie uns noch {vor} {diesem@ending:dies} Wochenende Bescheid.
im/am/vor/zwischen|{Im} letzten Monat waren zwölf Mitarbeiter krank.
preposition|{In~Bei} {der@article:dat} nächsten Besprechung müssen wir darüber diskutieren.
preposition|Das Protokoll wurde {vor} {einer@indefinite} Woche geschickt.
am/im/vor/zwischen|{Am} Montagvormittag empfängt der Chef eine Delegation.
preposition|{In} {diesem@ending:dies} Sommer nimmt die Firma an zwei Messen teil.
preposition|{Zwischen} {dem@article:dat} vierten und {dem@article:dat} sechsten November ist die Kantine geschlossen.`,"fill");
t.gaps(124,"5",`im/am/in/an|Die Kirche wurde {im} achtzehnten Jahrhundert gebaut.
preposition|{In} {der@article:dat} Kirche haben sich viele Menschen getroffen.
preposition|{Auf} {der@article:dat} rechten Seite sehen Sie eine Burg.
im/am/in/an|Die Burg wurde {im} Krieg zerstört.
preposition|{In} {der@article:dat} Burg befindet sich das Grab des Fürsten.
preposition|{An} {den@article:dat} Wänden gibt es Gemälde.
preposition|Sie wurden {in} {den@article:dat} letzten Jahren restauriert.
preposition|Kommen Sie mit {in} {die@article:acc} Johanneskirche.
preposition|Oder gehen Sie {in} {der@article:dat} Stadt bummeln.
preposition|Wir treffen uns hier {auf} {dem@article:dat} Parkplatz.`,"fill");
t.gaps(125,"6a",`zum/zur/ins/nach|Wenn meine Haare zu lang sind, gehe ich {zum} Friseur.
ins/im/zur/nach|Wenn ich Fotos sehen möchte, gehe ich {ins~zum} Fotomuseum.
nach/zu/in/im|Für das Guggenheim-Museum fahre ich {nach} New York.
in den/im/zur/nach|Für einen Spaziergang gehe ich {in den~zum} Park.
preposition|Für ein nettes Gespräch gehe ich {zu} meiner Freundin.
ins/im/zur/nach|Wenn ich einen Film sehen möchte, gehe ich {ins~zum} Kino.
zur/zum/im/nach|Wenn mein Auto kaputt ist, gehe ich {zur~in die} Autowerkstatt.
zum/zur/ins/nach|Wenn ich krank bin, gehe ich {zum} Arzt.
nach/in die/in der/zu|Ich fahre {nach} Deutschland, {nach} Österreich oder {in die} Schweiz.
ins/im/zur/nach|Für ein neues Hemd gehe ich {ins~zum} Modegeschäft.
an den/am/in der/nach|Wenn ich mich sonnen möchte, gehe ich {an den~zum} Strand.
in die/in der/zum/nach|Nach der Arbeit gehe ich {in die~zur} Kneipe.`,"fill");
t.gaps(126,"6b",`ins/im/zum/beim/zur|Otto geht {ins} Bett. Er ist {im} Bett.
ins/im/zum/beim/zur|Otto geht {ins~zum} Büro. Er ist {im} Büro.
nach/in/zu/bei|Otto fährt {nach} Berlin. Er ist {in} Berlin.
in den/im/zur/nach|Otto geht {in den~zum} Supermarkt. Er ist {im} Supermarkt.
zum/beim/ins/nach|Otto geht {zum~in den} Deutschunterricht. Er ist {beim~im} Deutschunterricht.
zur/bei der/zum/im|Otto geht {zur} Polizei. Er ist {bei der} Polizei.
zu/bei/nach/in|Otto fährt {zu} Oma Jutta. Er ist {bei} Oma Jutta.
nach/in/zu/bei|Otto fliegt {nach} Griechenland. Er ist {in} Griechenland.
nach/zu/in/bei|Otto geht {nach} Hause. Er ist {zu} Hause.
auf den/auf dem/in der/nach|Otto geht {auf den~zum} Aussichtsturm. Er ist {auf dem} Aussichtsturm.
an die/an der/in dem/nach|Otto fährt {an die~zur} Nordsee. Er ist {an der} Nordsee.
ins/im/zur/nach|Otto geht {ins~zum} Restaurant. Er ist {im} Restaurant.
in die/in den/in der/nach|Otto fährt {in die} Niederlande. Er ist {in den} Niederlanden.`,"fill");
t.gaps(126,"7a",`im/am/beim/zum|Eva hat sich {im} Urlaub verliebt.
am/im/beim/zum|Eva hat sich {am} Wochenende verliebt.
beim/am/im/zum|Eva hat sich {beim} Skifahren verliebt.
preposition|Eva hat sich {vor} wenigen Minuten verliebt.
beim/am/im/zum|Eva hat sich {beim} Weihnachtsessen verliebt.`,"fill");
t.gaps(127,"7a",`in der/am/im/bei dem|Wir sprechen {in der~bei der} nächsten Sitzung darüber.
am/im/beim/zum|Wir sprechen {am} fünfzehnten Juli darüber.
in der/am/im/bei dem|Wir sprechen {in der} Mittagspause darüber.
preposition|Wir sprechen {in} zwei Wochen darüber.
im/am/zum/ins|Wir sprechen {im~beim} Gespräch mit dem Direktor darüber.
beim/am/im/zum|Wir sprechen {beim} Golfspielen darüber.`,"fill");
t.gaps(127,"7b",`preposition|Ich habe {vor} zwanzig Jahren mit dem Malen begonnen.
preposition|Ich habe {von} 1999 {bis@bis/seit/vor/in} 2004 studiert.
im/am/beim/zum|Ich habe mein erstes Bild {im} Mai 2005 verkauft.
preposition|Ich arbeite {seit} August 2007 in diesem Atelier.
preposition|Ich habe Leo Qualm {vor} einigen Wochen kennengelernt.
am/im/beim/zum|Die Eröffnung ist {am} vierzehnten Mai {um@preposition} siebzehn Uhr.
vom/zum/im/am|Man kann die Ausstellung {vom} vierzehnten Mai {bis zum@bis zum/bis am/seit dem/vor dem} siebten Juni besuchen.
bei der/am/im/zu dem|Ich treffe den Galeristen {bei der~nach der~vor der} Ausstellungseröffnung.
im/am/beim/zum|Ich fahre {im} Winter nach New York.`,"fill");
t.gaps(127,"8",`am/im/zum/beim|Salzburg liegt {am} Nordrand der Alpen.
preposition|{Durch} Salzburg fließt die Salzach.
preposition|{In} den Namen von Stadt und Fluss kommt „Salz“ vor.
preposition|{In} der Region gab es große Salzvorkommen.
preposition|Schon früh wurde {in} der Umgebung Salz gewonnen.
im/am/beim/zum|{Im} späten Mittelalter wurde Salzburg als Handelsplatz wichtiger.
im/am/beim/zum|{Im} sechzehnten Jahrhundert wurde Gold wichtig.
preposition|Das Gold wurde {in} der Nähe gefunden.
preposition|Mozart wurde {in} Salzburg geboren.
preposition|{Nach} dem Tod des Erzbischofs erhielt Mozart weniger Hilfe.
preposition|Mozart ging {nach} Wien.
preposition|{Nach} dem Napoleonkrieg gewann die Stadt {gegen} Ende des neunzehnten Jahrhunderts wieder an Wohlstand.
ab/bis/seit/vor|Zur Kulturmetropole wurde Salzburg {ab} 1920 durch die Festspiele, die {bis} heute Publikum anziehen.`,"fill");
t.gaps(128,"9",`preposition|{Seit} Februar arbeite ich {bei~in} {einer@indefinite} Möbelfirma.
preposition|Ich bin {aus~von} Berlin weggezogen.
preposition|Ich habe zwei Karten {für} ein Jazzkonzert.
preposition|Ich muss {zu} {meinem@ending:mein} Schwedischkurs.
preposition|Unsere Firma arbeitet {mit} {einem@indefinite} schwedischen Unternehmen zusammen.
preposition|Ich muss öfter {nach} Stockholm fliegen.
preposition|{Um~Gegen} drei Uhr habe ich eine Besprechung.
am/im/beim/zum|Wir könnten uns {am} Wochenende treffen, {am} Samstag oder {am} Sonntag.
preposition|Ich möchte einen Ausflug {mit} {einem@indefinite} Schiff {auf} {dem@article:dat} Rhein machen.
preposition|Ich wollte auch {aus} der Stadt raus.
am/im/beim/zum|Ich rufe dich {am} Freitag an.`,"fill");
prepositionGaps(t, 129, "10", [
  ["aus/von/mit/bei|Die Schränke sind {aus} Holz.", "The cupboards are made of wood.", "Choose the preposition for the material something is made of."],
  ["mit/bei/von/aus|Tante Jutta kommt {mit} {dem@article:dat} Auto {ohne@ohne/mit/für/gegen} {ihren@ihren/ihrem/ihr/ihrer} Hund.", "Aunt Jutta is coming by car without her dog.", "The means of transport takes dative; absence takes accusative. Auto is neuter, Hund masculine."],
  ["für/von/mit/bei|Martha kauft {für} {ihren@ihren/ihrem/ihr/ihrer} Sohn eine Gitarre.", "Martha is buying a guitar for her son.", "The intended recipient uses an accusative preposition. Sohn is masculine; the owner is Martha."],
  ["nach/bei/mit/für|Meiner Meinung {nach} ist der Abgabetermin {für@für/von/mit/bei} {den@article:acc} Abschlussbericht zu früh.", "In my opinion, the deadline for the final report is too early.", "The opinion expression places its preposition after the dative noun phrase. The report takes accusative after the preposition expressing purpose."],
  ["Ohne/Mit/Durch/Für|{Ohne} Fleiß können wir den Wettkampf nicht gewinnen.", "Without hard work we cannot win the competition.", "Choose the preposition expressing the absence of something necessary."],
  ["unter/über/zwischen/gegen|Das Fußballspiel findet {unter} {schlechten@schlechten/schlechte/schlechtem/schlechter} Wetterbedingungen statt.", "The football match takes place under bad weather conditions.", "The expression for conditions uses dative here. Wetterbedingungen is plural and has no article."],
  ["Aus/Von/Mit/Bei|{Aus} Angst {vor@vor/gegen/über/auf} {einer@einer/eine/einen/einem} Verletzung spielt der Stürmer Franz Kaiser nicht mit.", "Out of fear of an injury, the striker Franz Kaiser is not playing.", "Distinguish the motive from the thing feared. The complement of Angst uses a preposition with dative; Verletzung is feminine."],
  ["aus/von/mit/bei|Das ganze Gebäude ist {aus} Stahl und Glas.", "The whole building is made of steel and glass.", "Use the preposition expressing what material something is made of."],
  ["von/bei/mit/für|Ich nehme die alten Pfannen {von} {meiner@meiner/meine/meinen/meinem} Oma gerne {zum@zum/beim/vom/im} Kochen.", "I like using the old pans from my grandma for cooking.", "Origin takes dative. Oma is feminine. Distinguish purpose from an activity happening at the same time."],
  ["Bei/Seit/Aus/Zu|{Bei} {heftigem@heftigem/heftigen/heftiger/heftiges} Schnee kann man die Bergstraße nicht befahren.", "In heavy snow, you cannot drive on the mountain road.", "The preposition for these circumstances takes dative. Schnee is masculine, with no article before its adjective."],
  ["aus/von/mit/bei|Er hilft dir nur {aus} Mitleid.", "He helps you only out of pity.", "Choose the preposition expressing an emotional motive."],
  ["gegen/für/mit/um|Die Regierung kämpft jetzt {gegen} {das@article:acc} Rauchen.", "The government is now fighting against smoking.", "Distinguish fighting against something from fighting for it. Opposition takes accusative; Rauchen is a neuter nominalized infinitive."],
]);
t.gaps(129,"11",`preposition|{In} Deutschland würden viele Mitarbeiter gerne {am@am/im/zum/beim} Arbeitsplatz einen Mittagsschlaf machen.
preposition|Man kann die Konzentration {mit} einem kurzen Mittagsschlaf erhöhen.
preposition|{Nach} einer Siesta erwacht man frisch.
preposition|Andere bekämpfen die Müdigkeit {mit} Koffein.
im/am/zum/beim|Man kann zehn Stunden {im} Büro verbringen, ohne effizient zu arbeiten.
preposition|{Für} unsere Leistung ist es besser, Aufgaben {zwischen} zehn und elf Uhr zu erledigen.
am/im/zum/beim|Manche arbeiten {am} späteren Nachmittag statt {am} frühen Morgen oder {um@preposition} dreizehn Uhr.`,"fill");
export default [...d.exercises,...t.exercises];
