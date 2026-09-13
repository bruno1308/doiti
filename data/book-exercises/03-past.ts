import { workbookChapter } from "./builder";
const c = workbookChapter("1.1.4", "Präteritum", "A2", "The Präteritum is the simple past. Match the past-tense form to the subject: ich/er war, du warst, wir/sie waren, ihr wart. Weak verbs add -te; strong verbs change their stem.");
c.gaps(36, "1", `
pastsein|Ihr {wart} im Urlaub.
pastsein|Christine {war} im Urlaub.
pastwerden|Ich {wurde} im Urlaub krank.
pastwerden|Franz {wurde} im Urlaub krank.
pastwerden|Meine Eltern {wurden} im Urlaub krank.
pasthaben|Meine Oma {hatte} großes Glück.
pasthaben|Wir {hatten} großes Glück.
pasthaben|Ihr {hattet} großes Glück.
pastsein|Das Hotel {war} traumhaft.
pastsein|Die Landschaft {war} traumhaft.
pastsein|Die Bademöglichkeiten {waren} traumhaft.
pasthaben|Meine Tante {hatte} im Urlaub schönes Wetter.
pasthaben|Ich {hatte} im Urlaub schönes Wetter.
pasthaben|Klaus und Karin {hatten} im Urlaub schönes Wetter.
`);
c.order(36, "2", `
Wir|waren|auf einer Party.
War|Kerstin|auch da?
Kerstin und Sabine|waren|krank.
War|es|schön auf der Party?
Nein,|es|war|schrecklich.
Otto|war|wieder mal betrunken.
Marie|hatte|Kopfschmerzen.
Die Musik|war|viel zu laut.
Karl|hatte|Ärger mit Susanne.
Um 22.00 Uhr|hatte|ich|keine Lust mehr.
`);
c.gaps(37, "1", `
past:konnte|Klaus {konnte} dich gestern nicht besuchen.
past:konnte|Wir {konnten} dich gestern nicht besuchen.
past:musste|Die Sekretärin {musste} länger arbeiten.
past:musste|Wir {mussten} länger arbeiten.
past:musste|Ich {musste} länger arbeiten.
`);
c.gaps(38, "1", `
past:sollte|Ich {sollte} das Dokument noch fertigstellen.
past:sollte|Frau Krüger {sollte} das Dokument noch fertigstellen.
past:sollte|Wir {sollten} das Dokument noch fertigstellen.
past:durfte|Du {durftest} hier früher noch rauchen.
past:durfte|Man {durfte} hier früher noch rauchen.
past:durfte|Sie {durften} hier früher noch rauchen. (formell)
past:wollte|Der Betriebsrat {wollte} keine Kompromisse mehr machen.
past:wollte|Ich {wollte} keine Kompromisse mehr machen.
past:wollte|Die Mitarbeiter {wollten} keine Kompromisse mehr machen.
past:mochte|Du {mochtest} den Hausmeister sehr.
past:mochte|Ich {mochte} den Hausmeister sehr.
past:mochte|Meine Kollegen {mochten} den Hausmeister sehr.
`);
c.gaps(38, "2", `
past:mochte|Heute mag Herr Grünwald seine Arbeit. Früher {mochte} er sie nicht.
wollen|Heute {will} er jedes Jahr nach Spanien fahren. Früher {wollte@past:wollte} er immer nach Frankreich.
können|Herr Grünwald {kann} heute perfekt Spanisch sprechen. Früher {konnte@past:konnte} er kein Spanisch.
dürfen|Herr Grünwald {darf} heute im Büro nicht mehr rauchen. Früher {durfte@past:durfte} er das noch.
müssen|Heute {muss} Herr Grünwald keine Überstunden mehr machen. Früher {musste@past:musste} er oft bis Mitternacht arbeiten.
past:sollte|Früher {sollte} Herr Grünwald immer pünktlich zu Hause sein. Heute {soll@sollen} er das immer noch.
`);
c.gaps(38, "3", `
past:musste|Warum {musstest} du so lange im Büro bleiben?
past:sollte|{Solltet} ihr nicht die Projektbeschreibung fertig machen?
past:durfte|{Durftet} ihr mit den Gästen essen gehen?
past:konnte|{Konnten} Sie die Firma nicht finden?
past:wollte|{Wolltest} du mich nicht gestern anrufen?
past:mochte|{Mochtest} du den Kunden nicht?
`);
c.gaps(38, "4", `
pastwerden|Oma {wurde} gestern 80! Aber sie {wollte@past:wollte} kein Geschenk haben.
pastsein|{Wart} ihr schon mal im Guggenheim-Museum in New York? {Musstet@past:musste} ihr auch so lange in der Schlange stehen?
pastsein|Das Hotelzimmer {war} schrecklich. Es {hatte@pasthaben} keine Badewanne und keinen Fernseher.
pastsein|Außerdem {war} die Dusche kaputt, man {konnte@past:konnte} nicht duschen.
pastsein|Wo {warst} du gestern? — Ich {war} zu Hause.
pasthaben|Ich {hatte} Kopfschmerzen und {musste@past:musste} im Bett bleiben.
pastsein|Das {war} ein tolles Fußballspiel! Alle Spieler {waren} fit und der Torschütze {hatte@pasthaben} zweimal richtiges Glück.
past:konnte|Leider {konnte} Rudi Ratlos nicht mitspielen. Er {musste@past:musste} auf der Ersatzbank sitzen.
pastwerden|Herr Müller {wurde} der neue Direktor, deshalb {hatte@pasthaben} die Abteilung gestern Abend eine Party.
past:konnte|Viele Mitarbeiter {konnten} aber nicht kommen, sie {mussten@past:musste} länger arbeiten.
`);
c.gaps(40, "1a", `
arbeiten|Präsens: er {arbeitet}. Präteritum: er {arbeitete@past:arbeitete}.
begrüßen|Präsens: wir {begrüßen}. Präteritum: wir {begrüßten@past:begrüßte}.
telefonieren|Präsens: sie {telefoniert}. Präteritum: sie {telefonierte@past:telefonierte}. (Singular)
bezahlen|Präsens: du {bezahlst}. Präteritum: du {bezahltest@past:bezahlte}.
sammeln|Präsens: ich {sammle~sammele}. Präteritum: ich {sammelte@past:sammelte}.
öffnen|Präsens: sie {öffnen}. Präteritum: sie {öffneten@past:öffnete}. (Plural)
tanzen|Präsens: ihr {tanzt}. Präteritum: ihr {tanztet@past:tanzte}.
präsentieren|Präsens: du {präsentierst}. Präteritum: du {präsentiertest@past:präsentierte}.
`);
c.gaps(41, "1b", `
beginnen|Präsens: es {beginnt}. Präteritum: es {begann@past:begann}.
gehen|Präsens: er {geht}. Präteritum: er {ging@past:ging}.
gewinnen|Präsens: wir {gewinnen}. Präteritum: wir {gewannen@past:gewann}.
fahren|Präsens: du {fährst}. Präteritum: du {fuhrst@past:fuhr}.
verlassen|Präsens: er {verlässt@verlasse/verlässt/verlassen/verlasst}. Präteritum: er {verließ@past:verließ}.
schießen|Präsens: sie {schießt}. Präteritum: sie {schoss@past:schoss}. (Singular)
kommen|Präsens: wir {kommen}. Präteritum: wir {kamen@past:kam}.
geben|Präsens: sie {geben}. Präteritum: sie {gaben@past:gab}. (Plural)
finden|Präsens: wir {finden}. Präteritum: wir {fanden@past:fand}.
sprechen|Präsens: sie {spricht}. Präteritum: sie {sprach@past:sprach}. (Singular)
lesen|Präsens: du {liest}. Präteritum: du {lasest~last@past:las}.
fliegen|Präsens: wir {fliegen}. Präteritum: wir {flogen@past:flog}.
`);
c.gaps(41, "2", `
pastwerden|Franz Beckenbauer {wurde} 1945 in München geboren.
past:interessierte|Schon früh {interessierte} er sich für Fußball und {spielte@past:spielte} als Jugendlicher beim Sportklub 1906 München.
past:plante|1958 {plante} der 13-jährige Franz den Wechsel zum TSV 1860.
past:bekam|Bei einem Spiel {bekam} er von einem TSV-Spieler eine Ohrfeige.
past:änderte|Deshalb {änderte} Franz seine Pläne und {wechselte@past:wechselte} zum FC Bayern München.
past:machte|Mit 19 Jahren {machte} er sein erstes Spiel und {schoss@past:schoss} sein erstes Tor für den FC Bayern.
past:gewann|Franz Beckenbauer {gewann} mit seinem Klub viele Pokale und {wurde@pastwerden} mehrmals Deutscher Meister.
pastsein|1974 {war} sein erfolgreichstes Jahr.
past:holte|Der FC Bayern {holte} den deutschen Meistertitel und den Europapokal der Landesmeister.
past:feierte|Mit der Nationalmannschaft {feierte} er 1974 den Gewinn der Weltmeisterschaft.
past:beendete|1982 {beendete} er seine Fußballerkarriere.
past:absolvierte|Franz Beckenbauer {absolvierte} insgesamt 424 Spiele für die Bundesliga.
past:arbeitete|Von 1984 bis 1990 {arbeitete} er als Trainer und Teamchef für Deutschland.
past:führte|Er {führte} die deutsche Nationalmannschaft 1990 zum Weltmeistertitel.
`);
c.order(41, "3", `
Er|machte|mit 20 Jahren|sein erstes Länderspiel.
Er|holte|mit seinem Hamburger Klub|viele Pokale und Meistertitel.
Vor vier Jahren|beendete|er|seine sportliche Karriere.
`);
c.order(42, "3", `
Martine|absolvierte|ein Praktikum in Hamburg.
Dort|lernte|sie|Deutsch.
Sie|arbeitete|danach drei Jahre|bei einer Bank.
Sie|leitete|eine kleine Abteilung.
Im letzten Jahr|heirateten|Martin und Martine.
`);
c.gaps(42, "4", `
past:konstruierte|1668 {konstruierte} Ferdinand Verbiest das erste Auto.
past:lief|Das etwa 60 Zentimeter lange Modell {lief} mit Dampf.
past:fuhr|Niemand weiß, ob dieses Auto überhaupt {fuhr}.
past:baute|Den ersten Dampf-Straßenwagen {baute} 1769 Nicolas Joseph Cugnot.
past:transportierte|Er {transportierte} mit dem Auto Kanonen für das französische Militär.
past:erreichte|Das Fahrzeug {erreichte} eine Geschwindigkeit von vier Kilometern pro Stunde.
past:brauchte|Es {brauchte} aber alle 15 Minuten eine Pause.
past:nutzte|Ab 1780 {nutzte} man in England Dampf-Traktoren zur Feldarbeit.
past:funktionierte|Im Straßenverkehr {funktionierten} die Traktoren nicht.
pastsein|Sie {waren} zu groß und zu schwer.
past:entwickelte|Um 1825 {entwickelte} Samuel Brown die ersten mobilen Gasverbrennungsmotoren.
past:bekam|Er {bekam} 1826 für ein Fahrzeug mit einem vier PS starken Motor ein Patent.
past:experimentierte|Ab 1900 {experimentierten} die Konstrukteure mit verschiedenen Antriebssystemen.
past:kam|Der große Erfolg {kam} mit der Nutzung der Elektrizität.
past:erreichte|1899 {erreichte} ein Renn-Elektromobil bereits 100 Kilometer pro Stunde.
past:kam|Das Elektromobil {kam} aber nur 30 Kilometer weit.
`);
c.gaps(43, "5", `
pasthaben|Das Flugzeug {hatte} keinen Treibstoff mehr.
past:verließ|Die Passagiere {verließen} die Maschine über die Notausgänge.
pastsein|Schon zehn Minuten nach der Landung {waren} Polizei und Feuerwehr an der Landestelle.
past:entdeckte|Deutsche Wissenschaftler {entdeckten} auf der Insel Madagaskar zahlreiche neue Tierarten.
past:fand|Die Biologen der Universität Hamburg {fanden} elf neue Insekten.
past:lebte|Einige Insektenarten {lebten} bereits zur Zeit der Dinosaurier.
pastsein|Das {war} ein gutes Jahr für die Kultur in Deutschland!
past:gab|Es {gab} einige große Erfolge.
past:erhielt|Herta Müller {erhielt} den Literatur-Nobelpreis.
past:kam|Die Nofretete {kam} nach 70 Jahren in das Neue Museum zurück.
past:bewunderte|In Wuppertal {bewunderten} viele Besucher die Gemälde in der Monet-Ausstellung.
pastsein|Wie {war} die Preisentwicklung im letzten Jahr?
past:beantwortete|Diese Frage {beantworteten} heute Mitarbeiter des Statistischen Bundesamtes.
pastsein|Insgesamt {war} die Inflationsrate sehr niedrig.
pastwerden|Öl und Lebensmittel {wurden} deutlich billiger.
past:konnte|Besonders preiswert {konnte} man Milch und Eier kaufen.
past:geriet|Der Autokonzern {geriet} im letzten Jahr in eine Krise.
past:sprach|Die Konzernleitung {sprach} heute mit der Regierung über finanzielle Hilfe.
past:trat|Am Abend {trat} der Finanzminister vor die Presse und {gab@past:gab} das positive Resultat der Verhandlungen bekannt.
past:spielte|Gestern Abend {spielte} Manchester United gegen den FC Barcelona.
past:gewann|Die Spanier {gewannen} das Spiel mit 2:0.
past:feierte|Hunderttausende Fans {feierten} in Barcelona den Sieg.
past:wollte|Forscher {wollten} es genau wissen und {überprüften@past:überprüfte} diese These.
past:musste|65 Männer und Frauen {mussten} ein großes Auto in eine Parklücke fahren.
past:brauchte|In diesem Versuch {brauchten} die Frauen 20 Sekunden länger als die Männer.
past:stand|Ihre Autos {standen} danach schiefer in der Parklücke.
past:fiel|Heute {fiel} in Deutschland der erste Schnee.
past:kam|Auf den Autobahnen {kam} es zu einigen Unfällen.
past:stand|Viele Autofahrer {standen} im Stau.
past:gab|Auch im Zugverkehr {gab} es Verspätungen.
past:musste|Reisende {mussten} mehr als eine Stunde auf ihre Züge warten.
`);
c.gaps(43, "6", `
past:stand|Fritz {stand} im Stau.
past:fuhr|Erikas Motorrad {fuhr} nicht.
pasthaben|Klaus {hatte} Bauchschmerzen.
pastsein|Tante Frieda {war} im Krankenhaus.
past:spielte|Gregor und Karl {spielten} noch Golf.
past:musste|Franzi {musste} noch arbeiten.
past:feierte|Gustav {feierte} auf einer anderen Party.
past:bekam|Frau Krüger {bekam} keine Einladung.
past:wollte|Die Nachbarin {wollte} nicht kommen.
past:ging|Karin {ging} ins Kino.
past:flog|Der Chef {flog} nach Rom.
past:konnte|Oskar {konnte} nicht laufen.
pastwerden|Petra {wurde} plötzlich krank.
past:besuchte|Nina {besuchte} ihren Freund.
past:lernte|Oskar {lernte} für eine Prüfung.
`);
c.order(45, "1", `
Petra|schloss|ihr Büro nicht|ab.
Kerstin|holte|die Gäste nicht vom Flughafen|ab.
Matthias|rief|die Kunden nicht|an.
Wolfgang|druckte|die Zugfahrkarte nicht|aus.
Michaela|gab|die Dokumente nicht|ab.
Klaus|füllte|die Formulare nicht|aus.
Christine|rechnete|die Reisekosten nicht|ab.
Joachim|leitete|die E-Mail nicht|weiter.
Rainer|schaltete|die Alarmanlage nicht|ein.
`);
c.gaps(45, "2", `
past:verband|Die Straßen {verbanden} Metropolen, Kultstätten und Festungen.
past:transportierte|Das erste Frachtgut, das eine Eisenbahn in Deutschland {transportierte}, {waren@pastsein} zwei Fässer Bier.
past:kam|Der Auftrag aus dem Jahr 1836 {kam} von der Brauerei Lederer in Nürnberg.
past:musste|Bei einem Versuch {mussten} Studenten einen Viertelliter Wein trinken.
past:fand|Danach {fanden} sie ihre Mitstudentinnen viel attraktiver.
past:kaufte|In einem englischen Supermarkt {kauften} zwei Drittel der Kunden deutsche Weine, wenn deutsche Volkslieder {liefen@past:lief}.
past:entschied|Bei französischen Chansons {entschieden} sich 80 Prozent der Kunden für Wein aus Frankreich.
pastsein|Babylon {war} 775 vor Christus mit etwa 200 000 Einwohnern die erste Großstadt in der Geschichte der Menschheit.
past:galt|Kaffee und Tee {galten} früher als giftig.
pastsein|Wie stark das Gift wirklich {war}, {wollte@past:wollte} der schwedische König Gustav III. herausfinden.
past:musste|In einem Experiment {mussten} zwei Kriminelle jahrelang trinken.
past:durfte|Der eine {durfte} nur Tee trinken, der andere nur Kaffee.
past:überlebte|Beide {überlebten} den König.
past:starb|Der Teetrinker {starb} mit 83 Jahren vor dem Kaffeetrinker.
past:entwickelte|Adolf Gaston Eugen Fick {entwickelte} 1887 die ersten Kontaktlinsen.
pastsein|Die Linsen {waren} aus braunem Glas und {hatten@pasthaben} einen Durchmesser von etwa 21 Millimetern.
past:testete|Fick {testete} die Linsen erst in den Augen von Kaninchen.
past:trug|Dann {trug} er sie selbst.
past:stammte|Die Tomate {stammte} ursprünglich aus Mittel- und Südamerika.
past:brachte|Christoph Kolumbus {brachte} 1498 die ersten Exemplare nach Spanien und Portugal mit.
past:galt|Zuerst {galt} die Tomate in Europa als giftig.
past:kam|Erst Ende des 18. Jahrhunderts {kamen} Italiener und Spanier auf die Idee, Tomaten zu essen.
past:aß|Erst ab 1900 {aßen} auch die Deutschen Tomaten.
`);
export default c.exercises;
