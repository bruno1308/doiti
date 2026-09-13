import { workbookChapter } from "./builder";
const r = workbookChapter("1.2", "Reflexive verbs", "A1", "The reflexive pronoun must agree with the subject: ich–mich, du–dich, er/sie–sich, wir–uns, ihr–euch, sie/Sie–sich.");
r.gaps(47, "1", `
reflexive|Emil duscht sich und föhnt {sich}.
reflexive|Nach dem Frühstück zieht Emil {sich} an.
reflexive|In der Pause unterhält Emil {sich} gerne mit Julia.
reflexive|Emil und Julia ärgern {sich} über die vielen Besprechungen.
reflexive|Julia bewirbt {sich} bei einer anderen Firma.
reflexive|Sie interessiert {sich} für die Arbeit mit anderen Menschen.
reflexive|Abends treffen {sich} Julia und Emil oft in einem kleinen Restaurant.
`, "fill");
r.gaps(47, "2", `
reflexive|Franz hat {sich} in Irene verliebt. Hast du {dich} auch schon mal verliebt?
reflexive|Warum streitet ihr {euch} immer?
reflexive|Wir treffen {uns} direkt vor dem Restaurant.
reflexive|Du musst {dich} beeilen. Der Zug fährt gleich.
reflexive|Die Schauspieler schminken {sich} vor dem Auftritt.
reflexive|Kathrin kann nicht kommen. Sie hat {sich} erkältet.
reflexive|Hast du {dich} schon umgezogen?
reflexive|Ich bin noch nicht fertig. Ich habe {mich} noch nicht geföhnt.
`, "fill");
r.gaps(48, "3", `
unterhalten|Ich {unterhalte@unterhalte/unterhält/unterhaltet/unterhalten} {mich@reflexive} gerade mit dem Chef.
unterhalten|Wir {unterhalten} {uns@reflexive} gerade mit dem Chef.
interessieren|Franz {interessiert} {sich@reflexive} für Fußball.
interessieren|Du {interessierst} {dich@reflexive} für Fußball.
interessieren|Ihr {interessiert} {euch@reflexive} für Fußball.
bedanken|{Bedankst} du {dich@reflexive} noch für das schöne Geschenk?
bedanken|{Bedankt} ihr {euch@reflexive} noch für das schöne Geschenk?
bedanken|{Bedankt} er {sich@reflexive} noch für das schöne Geschenk?
erinnern|Wir {erinnern} {uns@reflexive} gern an den fantastischen Urlaub.
erinnern|Ich {erinnere} {mich@reflexive} gern an den fantastischen Urlaub.
erinnern|Meine Eltern {erinnern} {sich@reflexive} gern an den fantastischen Urlaub.
ärgern|{Ärgert} ihr {euch@reflexive} immer noch über den Chef?
ärgern|{Ärgerst} du {dich@reflexive} immer noch über den Chef?
ärgern|{Ärgern} Sie {sich@reflexive} immer noch über den Chef?
befinden|Die Firma {befindet} {sich@reflexive} in einer schlechten finanziellen Lage.
befinden|Ich {befinde} {mich@reflexive} in einer schlechten finanziellen Lage.
befinden|Mein Bruder {befindet} {sich@reflexive} in einer schlechten finanziellen Lage.
verabschieden|Der Chef {verabschiedet} {sich@reflexive} von den Gästen.
verabschieden|Ihr {verabschiedet} {euch@reflexive} von den Gästen.
verabschieden|Wir {verabschieden} {uns@reflexive} von den Gästen.
streiten|{Streitest} du {dich@reflexive} schon wieder mit der Nachbarin?
streiten|{Streitet} ihr {euch@reflexive} schon wieder mit der Nachbarin?
streiten|{Streiten} Sie {sich@reflexive} schon wieder mit der Nachbarin?
`);
r.gaps(48, "4", `
reflexive|Hast du {dich} über das Stellenangebot gefreut? — Ja, ich habe {mich} darüber gefreut.
reflexive|Haben die Kollegen {sich} über die neuen Arbeitszeiten unterhalten? — Ja, sie haben {sich} darüber unterhalten.
reflexive|Habt ihr {euch} über das Hotelzimmer geärgert? — Ja, wir haben {uns} darüber geärgert.
reflexive|Hat Herr Kümmel {sich} über die hohen Preise beschwert? — Ja, er hat {sich} darüber beschwert.
reflexive|Hat Marianne {sich} um die Stelle als Managerin beworben? — Ja, sie hat {sich} darum beworben.
reflexive|Haben alle Mitarbeiter {sich} für das Seminar angemeldet? — Ja, sie haben {sich} dafür angemeldet.
reflexive|Hat Otto {sich} schon verabschiedet? — Ja, er hat {sich} schon verabschiedet.
reflexive|Hast du {dich} auch für das Projekt interessiert? — Ja, ich habe {mich} dafür interessiert.
reflexive|Habt ihr {euch} über den Erfolg gefreut? — Ja, wir haben {uns} darüber gefreut.
reflexive|Hast du {dich} auf dem Balkon gesonnt? — Ja, ich habe {mich} dort gesonnt.
`, "fill");
const i = workbookChapter("1.3", "Imperatives", "A1", "For Sie, use the infinitive followed by Sie. For ihr, use the present ihr form without the pronoun. The du imperative usually uses the stem; strong verbs may change e to i/ie.");
i.gaps(50, "1", `
rufen|{Rufen} Sie uns an!
sprechen|{Sprechen} Sie mit uns!
besuchen|{Besuchen} Sie uns im Internet!
informieren|{Informieren} Sie sich über gesunde und einfache Gerichte!
füllen|{Füllen} Sie zuerst Wasser in den Behälter!
geben|{Geben} Sie anschließend Kaffee in den Filter!
drücken|{Drücken} Sie auf den roten Knopf!
schalten|{Schalten} Sie das Gerät ein!
vergessen|{Vergessen} Sie nicht, das Gerät auszuschalten!
räumen|Kinder, {räumt} nach dem Essen das Geschirr weg!
sprechen|Kinder, {sprecht} beim Essen leise!
achten|Kinder, {achtet} auf Sauberkeit im Zimmer!
halten|Kinder, {haltet} die Nachtruhe ein!
laufen|Kinder, {lauft} im Gebäude langsam!
nehmen|{Nehmen} Sie die Tabletten nach Anweisung!
trinken|{Trinken} Sie Wasser!
gehen|{Gehen} Sie zum Arzt!
`);
const commands = [
  ["vereinbaren", "Vereinbar~Vereinbare", "Vereinbart", "Vereinbaren", "einen Termin mit Frau Kuhn"],
  ["füllen", "Füll~Fülle", "Füllt", "Füllen", "die Formulare sorgfältig", "aus"],
  ["kontrollieren", "Kontrollier~Kontrolliere", "Kontrolliert", "Kontrollieren", "die Rechnung noch mal"],
  ["lesen", "Lies", "Lest", "Lesen", "den Bericht bitte bis morgen"],
  ["präsentieren", "Präsentier~Präsentiere", "Präsentiert", "Präsentieren", "die Arbeitsergebnisse bitte"],
  ["bereiten", "Bereit~Bereite", "Bereitet", "Bereiten", "die Präsentation gut", "vor"],
  ["machen", "Mach~Mache", "Macht", "Machen", "Werbung für die Firma"],
  ["informieren", "Informier~Informiere", "Informiert", "Informieren", "mich bitte über die Ergebnisse"],
  ["fahren", "Fahr~Fahre", "Fahrt", "Fahren", "vorsichtig"],
];
for (const [n, [verb, du, ihr, sie, rest, prefix]] of commands.entries()) {
  i.gaps(50, `2-${n + 1}`, `${verb}|(du) {${du}} ${rest}${prefix ? " " + prefix : ""}!
${verb}|(ihr) {${ihr}} ${rest}${prefix ? " " + prefix : ""}!
${verb}|{${sie}} Sie ${rest}${prefix ? " " + prefix : ""}!`);
}
i.gaps(51, "3", `
schalten|{Schalten} Sie bitte die Computer im Besprechungszimmer ein!
korrigieren|{Korrigieren} Sie bitte die Fehler in dem Dokument!
kopieren|{Kopieren} Sie bitte die Tagesordnung!
kochen|{Kochen} Sie bitte zwei Kannen Kaffee!
rufen|{Rufen} Sie bitte vor der Besprechung noch die Firma Prinz an!
erkundigen|{Erkundigen} Sie sich bitte bei Frau Kümmel nach den Preisen!
schreiben|{Schreiben} Sie bitte das Protokoll!
`);
i.gaps(51, "4", `
fragen|(du) {Frag~Frage} nach den genauen Reisezeiten!
suchen|(du) {Such~Suche} im Internet nach Informationen über das Hotel!
kaufen|(du) {Kauf~Kaufe} in der Apotheke noch Aspirin!
fahren|(du) {Fahr~Fahre} das Auto in die Garage!
lernen|(du) {Lern~Lerne} die wichtigsten spanischen Wörter!
packen|(du) {Pack~Packe} endlich den Koffer!
nehmen|(du) {Nimm} den Führerschein mit!
lassen|(du) {Lass~Lasse} den Laptop zu Hause!
packen|(du) {Pack~Packe} den Fotoapparat ein!
vergessen|(du) {Vergiss} die Sonnencreme nicht!
bestellen|(du) {Bestell~Bestelle} ein Taxi zum Flughafen!
`);
const k = workbookChapter("1.4", "Polite requests and wishes", "A2", "Konjunktiv II makes requests polite and describes wishes or unreal conditions. Conjugate the supplied verb for the subject; with würde, the main verb stays in the infinitive.");
k.gaps(53, "1", `
subjwerden|{Würden} Sie von uns ein Foto machen?
subjhaben|{Hätten} Sie zwei Euro für mich?
subjkönnen|{Könnten} Sie mir die Speisekarte bringen?
subjkönnen|Welches Gericht {könnten} Sie mir empfehlen?
subjhaben|Ich {hätte} gern die Tagessuppe.
subjwerden|Ich {würde} gern zahlen.
subjkönnen|{Könntest} du langsamer sprechen?
subjsein|{Wären} Sie so nett, den Satz zu wiederholen?
subjhaben|{Hättet} ihr eine Fotokopie für mich?
subjkönnen|{Könnten} Sie das Wort an die Tafel schreiben?
subjkönnen|{Könnten} Sie mir den Katalog zeigen?
subjhaben|{Hätten} Sie Kleingeld?
subjkönnen|{Könnte} ich mit Kreditkarte zahlen?
subjwerden|Ich {würde} das Kleid gerne anprobieren.
`);
k.gaps(53, "2", `
subjkönnen|Beate und Rudi, {könntet} ihr die Getränke kaufen?
subjkönnen|{Könnten} Sie den Kuchen bestellen?
subjkönnen|Laura, {könntest} du CDs mitbringen?
subjkönnen|Joseph und Katja, {könntet} ihr Brötchen machen?
subjkönnen|{Könnten} Sie die Gläser auf den Tisch stellen?
subjkönnen|Mama, {könntest} du uns beim Saubermachen helfen?
subjkönnen|Bruno, {könntest} du den Teppich aufrollen?
subjkönnen|Olga und Paula, {könntet} ihr die Stühle auf die Terrasse bringen?
`);
k.gaps(54, "3", `
subjkönnen|{Könnte} ich Frau Kaiser sprechen?
subjwerden|Ich {würde} gern mit Ihnen einen Termin vereinbaren.
subjwerden|Ich {würde} Ihnen gern unsere neuen Wohnzimmermöbel vorstellen.
subjsein|Wie {wäre} es nächste Woche?
subjhaben|{Hätten} Sie am Dienstag Zeit?
subjsein|Mittwoch {wäre} mir lieber.
subjsein|Mittwoch {wäre} prima.
subjkönnen|{Könnten} Sie um zehn Uhr hier sein?
`);
k.order(54, "4", `
Könnten|Sie|mir helfen?
Hättet|ihr|vielleicht Geld für mich?
Könnten|Sie|mir den Weg zeigen?
Könntest|du|die Gebrauchsanweisung ins Deutsche übersetzen?
Könnten|Sie|mich um sieben Uhr wecken?
Könntest|du|mein Fahrrad reparieren?
Könnten|Sie|meinen Koffer tragen?
Könntest|du|Otto abholen?
Könntet|ihr|mir euer Auto leihen?
Könntest|du|einkaufen gehen?
`);
k.gaps(56, "1", `
subjwerden|Wenn Oskar doch endlich anrufen {würde}!
subjsein|Wenn Oskar doch immer pünktlich {wäre}!
subjwerden|Wenn Oskar doch öfter nachdenken {würde}!
subjhaben|Wenn Oskar doch mehr Zeit für mich {hätte}!
subjwerden|Wenn Oskar doch mehr Sport treiben {würde}!
subjwerden|Wenn Oskar doch eine große Erfindung machen {würde}!
subjwerden|Wenn Oskar doch für mich ein Liebesgedicht schreiben {würde}!
subjwerden|Wenn Oskar doch nicht mehr nach anderen Frauen gucken {würde}!
subjwerden|Wenn Oskar doch fünf Kilo abnehmen {würde}!
subjkönnen|Wenn Oskar doch kochen {könnte}!
subjwerden|Wenn Oskar doch mal aufräumen {würde}!
subjwerden|Wenn Oskar doch selbst seine Sachen waschen {würde}!
subjwerden|Wenn Oskar doch vorsichtiger fahren {würde}!
subjwerden|Wenn Oskar doch ein bisschen Geld sparen {würde}!
`);
k.order(56, "2", `
Wenn ich reich wäre,|würde|ich|nicht mehr arbeiten.
Wenn ich mehr Fantasie hätte,|würde|ich|einen Roman schreiben.
Wenn ich mehr Mut hätte,|würde|ich|meinem Chef die Meinung sagen.
Wenn ich einen Hund hätte,|würde|ich|jeden Tag spazieren gehen.
Wenn ich besser kochen könnte,|würde|ich|kein Fastfood mehr essen.
Wenn ich einen deutschen Freund hätte,|würde|ich|besser Deutsch sprechen.
Wenn ich ein Auto hätte,|würde|ich|immer im Stau stehen.
Wenn ich jetzt im Urlaub wäre,|würde|ich|mich erholen.
`);
k.gaps(56, "3", `
subjkönnen|Wenn ich Japanisch {könnte}, {würde@subjwerden} ich dir den Brief übersetzen.
subjhaben|Wenn ich Zeit {hätte}, {würde@subjwerden} ich heute mit dir in die Oper kommen.
subjsein|Wenn ich reich {wäre}, {würde@subjwerden} ich dich zu einer Kreuzfahrt in die Karibik einladen.
subjkönnen|Wenn ich kochen {könnte}, {würde@subjwerden} ich heute Abend etwas Leckeres für dich kochen.
subjhaben|Wenn ich einen Drucker {hätte}, {würde@subjwerden} ich die Dokumente für dich ausdrucken.
subjhaben|Wenn ich Zeit {hätte}, {würde@subjwerden} ich heute auf die Kinder aufpassen.
subjhaben|Wenn ich Zeit {hätte}, {würde@subjwerden} ich die Arbeit von Frau Krause zusätzlich erledigen.
`);
const p = workbookChapter("1.5", "Passive voice", "A2", "The passive uses werden plus a past participle. Match wird/werden or wurde/wurden to the subject; the participle goes at the end.");
p.gaps(58, "1", `
werden|Wann {wird} der Brief endlich beantwortet?
werden|Wann {wird} das Paket endlich abgeholt?
werden|Wann {wird} das Zimmer vom Chef endlich aufgeräumt?
werden|Wann {werden} die neuen Drucker endlich geliefert?
werden|Wann {wird} das Kollegium endlich informiert?
werden|Wann {wird} der Artikel endlich veröffentlicht?
werden|Wann {werden} die Preise endlich gesenkt?
werden|Wann {wird} das Gehalt endlich erhöht?
`);
p.gaps(58, "2", `
part:reparieren|Der Computer wird sofort {repariert}.
part:lösen|Das Problem wird sofort {gelöst}.
part:kopieren|Die Unterlagen werden sofort {kopiert}.
part:verschicken|Die E-Mail wird sofort {verschickt}.
part:bestellen|Die Tickets werden sofort {bestellt}.
part:bezahlen|Die Rechnung wird sofort {bezahlt}.
part:einbauen|Das Ersatzteil wird sofort {eingebaut}.
part:ändern|Das Datum wird sofort {geändert}.
part:bestätigen|Der Termin wird sofort {bestätigt}.
`);
p.gaps(58, "3", `
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Sie studierte Physik.“ → {Aktiv Präteritum}
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Später wurde sie Politikerin.“ → {Aktiv Präteritum}
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Sie wurde zur ersten Bundeskanzlerin gewählt.“ → {Passiv Präteritum}
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Letzte Woche besuchte sie Frankreich.“ → {Aktiv Präteritum}
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Sie wurde vom französischen Staatspräsidenten empfangen.“ → {Passiv Präteritum}
Aktiv Präsens/Aktiv Präteritum/Passiv Präsens/Passiv Präteritum|„Nach dem Empfang wurde sie zum Essen eingeladen.“ → {Passiv Präteritum}
`, "fill");
p.gaps(58, "4", `
werden|Seine Erfindung {wird} anerkannt.
pastwerden|Die ersten erfolgreichen Flugversuche {wurden} von den Brüdern Wright durchgeführt.
pastwerden|Motorisierte Flugversuche {wurden} auch von Gustav Weißkopf gestartet.
pastwerden|Das Patent {wurde} von den Brüdern Wright beantragt.
pastwerden|Vielleicht {wurde} das Telefon von einem anderen erfunden.
`);
p.gaps(59, "5", `
pastwerden|Wann {wurde} die Bundesrepublik gegründet?
pastwerden|Wann {wurde} der Euro als Zahlungsmittel eingeführt?
pastwerden|Wann {wurde} Amerika entdeckt?
pastwerden|Wann {wurde} der Fernseher erfunden?
pastwerden|Wann {wurde} John F. Kennedy ermordet?
`);
p.gaps(59, "6", `
pastwerden|Ein großes Hilfsprogramm {wurde} entwickelt.
pastwerden|Viele Mitarbeiter {wurden} entlassen.
pastwerden|Eine neue Regierung {wurde} gewählt.
pastwerden|Der Regierungsvertrag {wurde} unterschrieben.
pastwerden|Das Jubiläum des Mauerfalls {wurde} gefeiert.
pastwerden|Die Staatschefs {wurden} von den Berlinern freudig empfangen.
pastwerden|Die Menschen in Deutschland {wurden} über die Grippe informiert.
pastwerden|Sechs Millionen Menschen {wurden} geimpft.
`);
p.order(59, "7", `
Der Bundespräsident|wurde|interviewt.
Nach dem Unfall|wurden|die Verletzten|sofort versorgt.
Die Automobilmesse|wurde|eröffnet.
Im letzten halben Jahr|wurden|zwanzig Prozent mehr Neuwagen|verkauft.
Einige Eintrittskarten zum Endspiel der WM|wurden|verschenkt.
Die Eröffnungsveranstaltung|wurde|live im Fernsehen|übertragen.
Im Museum|wurde|eingebrochen.
Ein Bild von Picasso|wurde|gestohlen.
`);
export default [...r.exercises, ...i.exercises, ...k.exercises, ...p.exercises];
