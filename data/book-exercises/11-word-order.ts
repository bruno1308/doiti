import { workbookChapter } from "./builder";
const q=workbookChapter("6.1","Question words","A1","Wann asks when; wie lange asks duration; wie oft asks frequency; wie viel asks quantity. Wo describes a location, wohin a destination and woher an origin.");
q.gaps(130,"1",`question|{Wann} fährt der Zug ab? — Um 9.44 Uhr.
question|{Wie oft} muss ich umsteigen? — Zweimal.`,"fill");
q.gaps(131,"1",`question|{Wie viel} Zeit habe ich zum Umsteigen? — Dreizehn Minuten.
question|{Wie viel} kostet die Fahrkarte? — 104 Euro.
question|{Wie} möchten Sie fahren? — In der zweiten Klasse.
question|{Wie} kann ich bezahlen? — Nur bar.
question|{Wo} ist der nächste Geldautomat? — Am Eingang.`,"fill");
q.gaps(132,"3",`Wie alt/Wie lange/Wie oft/Wann|{Wie alt} sind Sie? — Ich bin 33 Jahre alt.
question|{Wo} wohnen Sie? — In Berlin.
question|{Wann} sind Sie nach Berlin gezogen? — 1995.
question|{Warum} sind Sie nach Berlin gezogen? — Ich fand die Stadt toll und habe dort studiert.
question|{Was} haben Sie studiert? — Germanistik und Romanistik.
question|{Wo} arbeiten Sie? — Als Lehrerin an einem Gymnasium.
question|{Wie lange} arbeiten Sie dort schon? — Acht Jahre.
question|{Wie} gefällt Ihnen die Arbeit? — Sehr gut.
Wie viele/Wie viel/Wie oft/Wie lange|{Wie viele} Kinder sind in Ihrer Klasse? — 25.
question|{Was} machen Sie in Ihrer Freizeit? — Ich spiele Volleyball.
question|{Wie oft} spielen Sie Volleyball? — Zweimal in der Woche.
question|{Warum} spielen Sie Volleyball? — Weil es eine Mannschaftssportart ist.`,"fill");
q.order(132,"4",`Wie viele Mitarbeiter|brauchen|wir?
Wo|können|wir|weitere Informationen finden?
Woher|bekommen|wir|finanzielle Unterstützung?
Wie oft|treffen|wir uns|in der Woche?
Wann|können|wir|mit ersten Ergebnissen rechnen?
Wie viel|kostet|das Projekt|insgesamt?`);
q.gaps(132,"5",`question|{Wo~Wie} kann ich mich für ein Zimmer anmelden?
question|{Wie viel} kostet ein Zimmer dort?
Wie groß/Wie weit/Wie lange/Wie viel|{Wie groß} sind die Zimmer? — Zwanzig Quadratmeter.
Wie weit/Wie groß/Wie viel/Wie oft|{Wie weit} ist das Wohnheim von der Universität entfernt?
question|Ab {wann} kann man einziehen?
question|{Wie viel} muss man für ein privates Zimmer bezahlen?
question|{Wo~Wie} kann ich weitere Informationen bekommen?`,"fill");
const r=workbookChapter("6.1.2","Wo(r)- questions","A2","For things, combine wo(r)- with the preposition required by the verb. For people, use the preposition with wen or wem.");
r.gaps(133,"1",`Worüber/Woran/Wofür/Womit|{Worüber} freust du dich? — Über das gute Ergebnis.
Womit/Woran/Wofür/Worüber|{Womit} arbeitet ihr? — Mit Word.
Worüber/Woran/Wofür/Womit|{Worüber} ärgert sich Herr Klein? — Über den Stau.
Woran/Worüber/Wofür/Womit|{Woran} denkt der Chef? — An die Einnahmen.
Worüber/Woran/Wofür/Womit|{Worüber} habt ihr geredet? — Über die Fußballergebnisse.
Wofür/Woran/Worüber/Womit|{Wofür} interessierst du dich? — Für Politik.
Womit/Woran/Wofür/Worüber|{Womit} hat der Koch gewürzt? — Mit Chili.
Worauf/Woran/Wofür/Womit|{Worauf} wartet ihr? — Auf den Beginn des Feuerwerks.`,"fill");
r.gaps(133,"2",`Womit/Mit wem/Wovon/Von wem|Ich bin mit dem Bus gefahren. — {Womit} bist du gefahren?
Wovon/Von wem/Womit/Mit wem|Ich habe nichts von Onkel Rudi gehört. — {Von wem} hast du nichts gehört?
Worauf/Auf wen/Woran/An wen|Ich freue mich auf das Wochenende. — {Worauf} freust du dich?
Worum/Um wen/Wofür/Für wen|Ich bewerbe mich um eine Stelle. — {Worum} bewirbst du dich?
Womit/Mit wem/Wovon/Von wem|Ich bin mit meinem Job unzufrieden. — {Womit} bist du unzufrieden?
Womit/Mit wem/Wovon/Von wem|Ich muss mit Petra sprechen. — {Mit wem} musst du sprechen?`,"fill");
const a=workbookChapter("6.2–6.3","Adverbs and particles","A1","Adverbs describe when, where or how. In a statement the conjugated verb stays in second position. Particles such as denn, doch and ja add attitude and emphasis.");
a.order(135,"1",`Herr Klein|ruft|Sie|später zurück.
Schreiben|Sie|die E-Mail|bitte gleich.
Kollege Klein|ist|meistens um 12.30 Uhr|zum Mittagessen.
Frau Müller|ist|nie|krank.
Momentan|haben|wir|viele Aufträge.
Herr Krümel|stellt|morgen das neue Projekt|vor.
Ich|finde|den neuen Projektleiter|besonders sympathisch.
Die Sekretärin|muss|täglich fünfzig E-Mails|beantworten.
Wir|bleiben|heute Abend ein bisschen länger|im Büro.`);
a.choices(135,"2",`vormittags/vormittag/vormittagen/vormittägig|Jeden Vormittag → {vormittags}
mittags/mittag/mittagen/mittäglich|Am Mittag → {mittags}
nachmittags/nachmittag/nachmittagen/nachmittäglich|Am Nachmittag → {nachmittags}
abends/abend/abenden/abendlichst|Am Abend → {abends}
samstags und sonntags/samstag und sonntag/samstagen und sonntagen/samstäglich und sonntäglich|Jeden Samstag und Sonntag → {samstags und sonntags}`);
a.order(135,"3",`Zuerst|öffne ich die Tür|und lege die Wäsche hinein.
Dann|fülle ich Waschpulver ein|und schließe die Tür.
Danach|wähle ich das Programm|und drücke den Einschaltknopf.
Anschließend|schalte ich die Maschine aus|und öffne die Tür.
Zuletzt|nehme ich die Wäsche heraus|und hänge sie auf.`);
a.choices(136,"4",`unten/oben/hinten/vorne|Martha ist oben, Gregor ist {unten} im Keller.
abends/morgens/vormittags/mittags|Martha liest lieber morgens Zeitung, Gregor lieber {abends}. (Gegenteil von morgens)
selten/oft/immer/meistens|Martha geht oft spazieren, Gregor {selten}. (Gegenteil von oft)
wenig/sehr/viel/besonders|Martha mag den Garten sehr, Gregor nur {wenig}.
später/früher/gleich/zuerst|Martha kommt früher, Gregor etwas {später}.`);
a.order(137,"1",`Was|machst|du denn|da?
Das|sieht|doch schön|aus, oder?
Das|ist|ja der Kaffee|von gestern.
Das|ist|ja|ein wunderschöner Ring.
Das|kann|doch nicht wahr|sein!
Schau mal,|das|ist|ja das Auto vom Chef!
Wie|siehst|du denn|aus? Ganz blass.`);
a.order(137,"2",`Wann|kommt|denn|der neue Mitarbeiter?
Wann|beginnt|denn|die Sitzung?
Wo|warst|du|denn?
Warum|ist|der Chef|denn nicht da?`);
const o=workbookChapter("7.1–7.2","Sentence structure","A1","The conjugated verb comes second in statements and first in yes/no questions. Participles, infinitives and separable prefixes complete the bracket at the end. Keep the supplied phrases together.");
o.order(139,"1",`Heute|kocht|Michael|das Abendessen.
Heute|kauft|Renate im Supermarkt|ein.
Gestern|hat|Renate die Kinder zur Klavierstunde|begleitet.
Heute|hilft|Michael den Kindern|bei den Hausaufgaben.
Gestern|sind|Renates Eltern zum Abendessen|gekommen.
Heute|liest|Renate den Kindern ein Märchen|vor.
Heute|arbeitet|Michael|abends noch lange.`);
o.order(139,"2",`Hier|sind|wir|gestern angekommen.
Es|regnete|in Strömen.
Zuerst|sind|wir|ins Hotel gefahren.
Das Hotel|ist|in der Nähe der Museumsinsel.
Am Nachmittag|haben|wir|das Neue Museum besucht.
In diesem Museum|befindet sich|die weltberühmte Nofretete.
Sie|ist|wirklich sehr schön.
Neben unserem Hotel|ist|ein italienisches Restaurant.
Dort|haben|wir|gestern Abend Pizza gegessen.
Heute|steht|das Brandenburger Tor|auf unserem Besuchsplan.
Ich|melde|mich|später wieder.`);
o.order(140,"3",`Warum|hast|du dich mit Gertrud|gestritten?
Ich|kann|dich|mitnehmen.
Sonntags|ist|das Geschäft|geschlossen.
Musst|du|heute länger im Büro|bleiben?
Das Auto|wird|morgen|repariert.
Wir|sind|ins Stadion|gegangen.
Wann|hast|du das Paket zur Post|gebracht?
Ich|habe|dich|angerufen.`);
o.gaps(140,"4",`question|{Woher} kommen Sie? — Aus Leipzig.
sein|{Sind} Sie mit dem Zug gefahren? — Nein, mit dem Auto.
question|{Wie lange} hat die Fahrt gedauert? — Vier Stunden.
kennen|{Kennen} Sie unser Firmengebäude? — Nein, noch nicht.
question|{Was} möchten Sie trinken? — Eine Tasse Kaffee.
question|{Wie} trinken Sie Ihren Kaffee? — Mit Milch.
question|Seit {wann} arbeiten Sie bei IPROTEX? — Seit drei Jahren.
ending:welch|In {welcher} Abteilung arbeiten Sie? — Im Marketing.
Woran/Worüber/Womit/Wofür|{Woran} arbeitet Herr Klein? — An einem anderen Projekt.
kennen|{Kennen} Sie Herrn Klein? — Ja, natürlich.`,"fill");
o.order(140,"5",`Haltet|Abstand|zu den Bildern!
Macht|keine|Fotos!
Fasst|die Kunstwerke|nicht an!
Redet|nicht|so laut!
Rennt|nicht|durch die Räume!
Schaut|euch die Bilder|genau an!
Hört|dem Museumsführer|gut zu!
Schreibt|bis morgen|einen Aufsatz über das schönste Bild!`);
o.order(142,"1",`Meine Cousine|schenkt|ihrer Tochter|ein Fahrrad.
Ich|zeige|meinen Freunden|unsere Urlaubsfotos.
Frau Müller|kocht|dem Gast|einen Kaffee.
Sie|gibt|ihm|die Dokumente.
Maria|bittet|ihren Bruder|um Hilfe.
Wir|senden|dem Kunden|die Rechnung.
Konrad|bespricht|das Problem|mit dem Chef.
Viele Kursteilnehmer|interessieren sich|für Informationen|über Deutschland.`);
o.order(142,"2",`Robert|macht|einmal in der Woche|Yoga.
Andreas|liest|abends oft|einen Krimi.
Jörg|geht|morgens in den Park|joggen.
Anna|trifft sich|samstags mit ihren Freundinnen|in einer Bar.
Anke|geht|nach der Arbeit|in die Sauna.
Bertus|kocht|am Abend|etwas Leckeres mit scharfen Gewürzen.
Maike|geht|freitags|in einen Schönheitssalon.
Regine|nimmt|zur Entspannung|ein heißes Bad.`);
o.order(143,"3a",`Wir|haben|geschäftliche Beziehungen|zu einer Firma in Dresden.
Ungefähr zehn Mitarbeiter unserer Firma|müssen|mehrmals im Monat nach Dresden|reisen.
Wir|suchen|nun|ein geeignetes Hotel für unsere Mitarbeiter.
Senden|Sie uns|bitte|einen Prospekt einschließlich Preisliste.`);
o.order(143,"3b",`Wir|danken|Ihnen|für Ihre Anfrage vom zwölften April.
Beiliegend|finden|Sie|unseren neuen Prospekt und die Preisliste.
Wir|gewähren|unseren festen Kunden|einen Rabatt von zehn Prozent.
Ihre Firma|muss|allerdings eine Minimalzahl von zwanzig Übernachtungen im Monat|garantieren.
Unsere Kunden|sind|bisher|mit unseren Leistungen sehr zufrieden.
Wir|bieten|ein reichhaltiges Frühstück.
Außerdem|verfügt|das Hotel|über einen Swimmingpool und einen Fitnessraum.
Wir|erwarten gerne Ihre Reservierungen|und|freuen uns auf Ihren Besuch.`);
o.gaps(144,"1",`als/wie/so/denn|Im Januar ist es kälter {als} im März.
als/wie/so/denn|Der neue Roman hat sich genauso gut verkauft {wie} das letzte Buch.
als/wie/so/denn|Mein Bürostuhl ist unbequemer {als} der Stuhl von Frau Müller.
als/wie/so/denn|Fotos können mehr kosten {als} eine Million Euro.
als/wie/so/denn|Dieser Virus ist nicht so gefährlich {wie} erwartet.`,"fill");
o.order(144,"2",`Heute|geht es|mir|besser als gestern.
Otto|fährt|das gleiche Auto|wie Gustav.
Lehrbücher für Deutsch|sind|in den Niederlanden|teurer als in Deutschland.
Im Winter|sind|die Nächte|länger als im Sommer.
Ein Gepard|kann|schneller laufen|als ein Pferd.
Giftschlangen|töten|mehr Menschen|als andere Tiere.
Max|ist|genauso intelligent|wie Moritz.
Schalke 04|hat|mehr Tore geschossen|als der FC Bayern München.
Das Buch|finde|ich|spannender als den Film.
Die Preise für Lebensmittel|sind|in diesem Jahr|höher als im letzten Jahr.`);
export default [...q.exercises,...r.exercises,...a.exercises,...o.exercises];
