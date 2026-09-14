import { workbookChapter } from "./builder";

const c = workbookChapter("1.1.2", "Present tense", "A1", "Match the present-tense ending to the subject. Some verbs change their vowel with du and er/sie/es; the conjugated verb occupies second position in a statement.");
c.gaps(12, "1", `
studieren|Er {studiert} Informatik.
bezahlen|{Bezahlst} du meinen Kaffee?
lernen|{Lernen} Sie Deutsch?
machen|{Macht} ihr einen Sprachkurs?
bleiben|Wir {bleiben} zwei Nächte in München.
trinken|{Trinkst} du noch eine Cola?
stehen|Wo {steht} das Auto?
leben|Der Künstler {lebt} in Frankfurt.
`);
c.gaps(12, "3", `
gehen|Wohin {gehst} du?
gehen|Meine Freundin {geht} ins Theater.
machen|Was {macht} ihr am Wochenende?
machen|{Machst} du viele Fotos?
machen|{Machen} Sie Ihre Hausaufgaben?
reservieren|Conrad {reserviert} einen Tisch.
reservieren|Ich {reserviere} eine Theaterkarte.
reservieren|Paula und Peter {reservieren} Flugtickets.
kommen|Woher {kommt} ihr?
kommen|Ich {komme} aus Australien.
kommen|Mein Freund {kommt} aus Japan.
bestellen|Ich {bestelle} eine Suppe.
bestellen|Die Gäste {bestellen} Rotwein.
bestellen|Wir {bestellen} alles im Internet.
schreiben|{Schreibst} du eine E-Mail an Vera?
schreiben|Das Kind {schreibt} diese Postkarte.
schreiben|{Schreibt} ihr oft Briefe?
`);
c.gaps(13, "4", `
spielen|Ich {spiele} gern Gitarre, {höre@hören} gern Musik und {gehe@gehen} gern ins Konzert.
surfen|Du {surfst} gern im Internet, {schreibst@schreiben} gern Computerprogramme und {spielst@spielen} gern am Computer.
lernen|Vera {lernt} gern Sprachen, {besucht@besuchen} gern Sprachkurse und {kauft@kaufen} gern CDs.
fotografieren|Wir {fotografieren} gern, {gehen@gehen} gern ins Museum und {besichtigen@besichtigen} gern Ausstellungen.
kaufen|Ihr {kauft} gern Kochbücher, {kocht@kochen} gern und {organisiert@organisieren} gern eine Party.
wandern|Sie {wandern} gern, {schwimmen@schwimmen} gern und {spielen@spielen} gern Tennis. (sie: Plural)
`);
c.gaps(13, "5", `
bleiben|Ich {bleibe} zu Hause.
gehen|Du {gehst} ins Kino.
kochen|Otto {kocht} das Abendessen.
besuchen|Wir {besuchen} Freunde.
hören|Ihr {hört} Musik.
schreiben|Klaus und Eva {schreiben} einen Bericht.
`);
c.gaps(14, "6", `
heißen|Wie heißen Sie? — Ich {heiße} Frank.
studieren|Was {studiert} Marie? — Sie {studiert} Medizin.
tanzen|{Tanzt} du gern? — Ja, ich {tanze} gern Tango.
wohnen|Wo {wohnt} ihr? — Wir {wohnen} in München.
spielen|{Spielen} Sie ein Instrument? — Nein, aber mein Bruder {spielt} sehr gut Klavier.
reisen|{Reist} ihr oft nach Italien? — Ja, wir {reisen} oft nach Italien.
sammeln|{Sammeln} Sie etwas? — Ja, ich {sammle~sammele} alte Gläser.
singen|{Singst} du im Chor? — Nein, aber meine Freunde {singen} im Chor.
arbeiten|{Arbeitest} du am Wochenende? — Nein, aber mein Mann {arbeitet} am Wochenende.
reden|{Redest} du mit deinem Hund? — Ja, ich {rede} manchmal mit meinem Hund.
`);
c.gaps(14, "7", `
arbeiten|Otto {arbeitet} bis 17.00 Uhr.
telefonieren|Die Sekretärin {telefoniert} mit dem Chef.
buchen|Sie {bucht} ein Hotelzimmer.
schreiben|Ich {schreibe} 30 E-Mails.
bezahlen|Die Verwaltungsleiterin {bezahlt} die Rechnungen.
begrüßen|Der Chef {begrüßt} die Gäste.
reden|Frau Fischer {redet} mit Kunden.
reparieren|Der Informatiker {repariert} den Computer.
speichern|Ich {speichere} einen Text.
lösen|Der Hausmeister {löst} technische Probleme.
`);
c.gaps(15, "1", `
nehmen|ich {nehme}
nehmen|ihr {nehmt}
fahren|wir {fahren}
fahren|Gudrun {fährt}
laufen|ihr {lauft}
laufen|der Film {läuft}
laufen|die Kinder {laufen}
geben|du {gibst}
geben|Manfred {gibt}
geben|wir {geben}
sprechen|ich {spreche}
sprechen|der Lehrer {spricht}
sprechen|ihr {sprecht}
`);
c.gaps(16, "1", `
lesen|er {liest}
lesen|ich {lese}
lesen|Sie {lesen} (formell)
essen|ich {esse}
essen|du {isst}
essen|wir {essen}
schlafen|das Kind {schläft}
schlafen|die Gäste {schlafen}
schlafen|du {schläfst}
tragen|er {trägt}
tragen|ihr {tragt}
tragen|wir {tragen}
sehen|ich {sehe}
sehen|du {siehst}
sehen|die Besucher {sehen}
`);
c.gaps(16, "2", `
fliegen|Was macht Claudia im Flugzeug? — Sie {fliegt} nach Rom.
fahren|Was macht Claudia im Auto? — Sie {fährt} zum Bahnhof.
hören|Was macht Claudia im Konzert? — Sie {hört} Musik.
tanzen|Was macht Claudia in der Disko? — Sie {tanzt}.
lesen|Was macht Claudia in der Bibliothek? — Sie {liest} Fachbücher.
duschen|Was macht Claudia in der Dusche? — Sie {duscht}.
kochen|Was macht Claudia in der Küche? — Sie {kocht} das Abendessen.
essen|Was macht Claudia im Restaurant? — Sie {isst} ihr Lieblingsgericht.
sehen|Was macht Claudia auf dem Fußballplatz? — Sie {sieht} ein Fußballspiel.
arbeiten|Was macht Claudia im Büro? — Sie {arbeitet}.
waschen|Was macht Claudia im Bad? — Sie {wäscht} ihre Sachen.
`);
c.gaps(16, "3", `
lesen|Bruno {liest} keine Bücher.
schlafen|Bruno {schläft} nicht gern allein.
vergessen|Bruno {vergisst} oft seine Termine.
tragen|Bruno {trägt} gern altmodische Kleidung.
sprechen|Bruno {spricht} oft mit seinen Fans.
fahren|Bruno {fährt} gern Motorrad.
essen|Bruno {isst} gern Pommesfrites.
sehen|Bruno {sieht} gern alte Filme.
wissen|Bruno {weiß} viel über Elvis.
laufen|Bruno {läuft} oft durch den Wald.
`);
c.gaps(16, "4", `
schweigen|Carla {schweigt}. Otto {spricht@sprechen}.
schreiben|Carla {schreibt} Gedichte. Otto {liest@lesen} Zeitung.
hören|Carla {hört} gern Musik auf CD. Otto {sieht@sehen} gern Musikvideos.
gehen|Carla {geht} zu Fuß zur Arbeit. Otto {fährt@fahren} mit dem Auto.
kochen|Carla {kocht} gern. Otto {isst@essen} gern.
trinken|Carla {trinkt} ein Glas Mineralwasser. Otto {nimmt@nehmen} ein Bier.
waschen|Carla {wäscht} die Wäsche. Otto {schläft@schlafen}.
`);
c.gaps(16, "5", `
essen|{Isst} du gern Schokolade?
kaufen|{Kaufst} du oft neue Schuhe?
fahren|{Fährst} du im Winter in die Berge?
nehmen|{Nimmst} du heute den Bus?
gehen|{Gehst} du gerne ins Kino?
laufen|{Läufst} du viel?
wissen|{Weißt} du viel über Albert Einstein?
`);
c.gaps(18, "1", `
sein|Was sind Sie von Beruf? — Ich {bin} Krankenschwester.
sein|Wo {seid} ihr? — Wir {sind} hier, im Nachbarzimmer!
haben|{Hast} du heute Zeit? — Nein, ich {habe} leider keine Zeit.
sein|Du {bist} so blass. {Wirst@werden} du krank?
sein|Ich {bin} schon krank, ich {habe@haben} eine Erkältung.
sein|Wie alt {ist} der Junge? — Er {ist} zwölf Jahre alt und {wird@werden} später vielleicht ein guter Fußballer.
sein|Es {ist} kalt. {Hast@haben} du keine warme Jacke? — Doch, ich {habe@haben} eine warme Jacke.
sein|Wie {ist} das Wetter in Italien? — Schlecht, aber morgen {wird@werden} es besser.
haben|Wann {hast} du Geburtstag? — Ich {habe} am 6. März Geburtstag. Ich {werde@werden} dieses Jahr 30!
`);
c.gaps(18, "2", `
arbeiten|Frau Müller {arbeitet} als Sekretärin bei einer großen Firma.
beginnen|Ihre Arbeit {beginnt} um 9.00 Uhr.
fahren|Sie {fährt} morgens mit der Straßenbahn zur Arbeit.
sein|Der Tagesablauf von Frau Müller {ist} immer gleich.
begrüßen|Zuerst {begrüßt} sie ihre Kollegen.
lesen|Dann {liest} sie viele E-Mails und {kocht@kochen} Kaffee.
haben|Um 10.00 Uhr {haben} alle Mitarbeiter eine kurze Besprechung.
haben|Von 12.30 bis 13.00 Uhr {hat} Frau Müller Mittagspause.
gehen|Oft {geht} sie in der Pause in ein kleines Restaurant.
beantworten|Nachmittags {beantwortet} sie die elektronische Post.
schreiben|Sie {schreibt} Rechnungen und {vereinbart@vereinbaren} Termine für ihren Chef.
haben|Um 17.30 Uhr {hat} sie Feierabend.
`);
c.gaps(18, "3", `
wohnen|Wir {wohnen} in einem schönen Hotel direkt am Augustusplatz in der achten Etage.
haben|Wir {haben} einen schönen Ausblick über die Stadt.
haben|Unser Zimmer {hat} einen großen Fernseher und eine Sitzecke.
sein|Es {ist} sehr gemütlich.
sein|Ich {bin} von der langen Reise ein bisschen müde.
liegen|Maximilian auch, er {liegt} im Bett und {schläft@schlafen}.
haben|Morgen {haben} wir ein volles Ausflugsprogramm.
besichtigen|Zuerst {besichtigen} wir das Völkerschlachtdenkmal.
gehen|Danach {gehen} wir ins Museum für moderne Kunst.
hängen|Dort {hängen} viele Bilder aus dem 20. Jahrhundert.
geben|Abends {gibt} der Thomanerchor in der Thomaskirche ein Konzert.
hören|Wir {hören} Musik von Johann Sebastian Bach.
wissen|Du {weißt} doch: Ich {liebe@lieben} die Musik von Bach.
`);

const m = workbookChapter("1.1.2", "Modal verbs", "A1", "Conjugate the modal verb to match the subject. The main verb remains in the infinitive at the end. Singular modal forms often differ from their plural stem.");
m.gaps(20, "1", `
können|Klaus {kann} dich am Wochenende nicht besuchen.
können|Wir {können} dich am Wochenende nicht besuchen.
müssen|Die Sekretärin {muss} die Rechnung noch bezahlen.
müssen|Ihr {müsst} die Rechnung noch bezahlen.
müssen|Ich {muss} die Rechnung noch bezahlen.
sollen|Der Arzt sagt: Ihr {sollt} viel Obst essen.
sollen|Der Arzt sagt: Frau Krüger {soll} viel Obst essen.
sollen|Der Arzt sagt: Wir {sollen} viel Obst essen.
dürfen|Du {darfst} hier nicht rauchen.
dürfen|Man {darf} hier nicht rauchen.
dürfen|Sie {dürfen} hier nicht rauchen. (formell)
wollen|Der Sportler {will} mehr trainieren.
wollen|Ich {will} mehr trainieren.
wollen|Die Fußballer {wollen} mehr trainieren.
möchten|Wir {möchten} einen Platz in der ersten Reihe.
möchten|Ich {möchte} einen Platz in der ersten Reihe.
möchten|Mein Kollege {möchte} einen Platz in der ersten Reihe.
mögen|Du {magst} die Nachbarin nicht.
mögen|Ich {mag} die Nachbarin nicht.
mögen|Mein Hund {mag} die Nachbarin nicht.
`);
m.gaps(20, "2", `
dürfen|{Darf} ich mal Ihren Kopierer benutzen?
wollen|Wann {wollen} Sie Urlaub nehmen?
mögen|{Magst} du keine Schokolade?
müssen|Alle Kollegen {müssen} an der Besprechung teilnehmen.
möchten|{Möchten} Sie noch etwas trinken?
können|{Kannst} du mich vom Bahnhof abholen?
können|Peter {kann} dieses Problem nicht alleine lösen.
sollen|{Soll} ich dir das mal erklären?
möchten|{Möchtest} du wirklich kein neues Handy?
wollen|Fritzchen {will} heute nicht in die Schule gehen.
können|Was {kann} ich für Sie tun?
`);
m.order(21, "3", `
Rainer|muss|das Protokoll|schreiben.
Der Chef|mag|keine langen Besprechungen.
Du|sollst|für den Chef|einen Flug|buchen.
Wir|müssen|die Rechnung noch|bezahlen.
Der neue Kollege|will|eine Dienstreise|machen.
Martina|darf|heute zu Hause|arbeiten.
Ich|kann|den Drucker nicht|reparieren.
`);
m.gaps(21, "4", `
möchten|Ich {möchte} bitte ein Doppelzimmer.
wollen|Wann {wollen} Sie anreisen?
sollen|Für wie lange {soll} ich das Zimmer für Sie reservieren?
möchten|{Möchten} Sie ein Zimmer mit Seeblick oder mit Gartenblick?
können|Sie {können} den ganzen Tag in der Sonne liegen.
dürfen|{Darf} man in Ihrem Hotel rauchen?
dürfen|Sie {dürfen} im Haus nicht rauchen.
dürfen|{Darf} ich dann auf dem Balkon rauchen?
dürfen|Sie {dürfen} nur auf dem Balkon oder im Garten rauchen.
können|Sie {können} gerne unser Schwimmbad benutzen.
mögen|Ich {mag} deutsches Essen nicht.
mögen|Vielleicht {mögen} Sie ja italienisches Essen.
können|Dann {kann} ich Ihnen das Restaurant Milano empfehlen.
sollen|Wie {soll} ich bezahlen?
können|{Kann} ich mit Kreditkarte bezahlen?
müssen|{Muss} ich bar bezahlen?
können|Sie {können} bezahlen, wie Sie {wollen@wollen}.
können|{Können} Sie das Zimmer für mich bitte reservieren?
`);

// This workbook section mixes separable verbs with ordinary present-tense
// practice. Classify the actual task below, rather than inheriting its heading.
const p = workbookChapter("1.1.2", "Present tense", "A1", "Match the present-tense verb form to the subject. In a statement, the conjugated verb takes second position.");
p.gaps(23, "1", `
bestellen|ich {bestelle}
sehen|ich {sehe} fern
rufen|ich {rufe} an
stehen|ich {stehe} auf
verlieren|ich {verliere}
sehen|ich {sehe} zu
steigen|ich {steige} aus
empfangen|ich {empfange}
arbeiten|ich {arbeite} weiter
erfinden|ich {erfinde}
zerstören|ich {zerstöre}
stellen|ich {stelle} vor
leihen|ich {leihe} aus
`);
p.order(23, "2", `
Um 8.30 Uhr|frühstückt|Tom.
Um 9.00 Uhr|geht|Tom|zur Arbeit.
Um 9.30 Uhr|beginnt|Tom|mit der Arbeit.
Zuerst|liest|Tom|seine E-Mails|und beantwortet sie.
Danach|hat|Tom|eine Besprechung mit seinen Kollegen.
Um 12.00 Uhr|holt|Tom|die Gäste vom Flughafen|ab.
Dann|erklärt|Tom|den Gästen das Programm.
Um 14.00 Uhr|spricht|Tom|mit den Gästen über neue Projekte.
Nachmittags|schreibt|Tom|ein paar E-Mails|und vereinbart Termine mit Kunden.
Um 16.00 Uhr|ruft|Tom|Frau Schröder|an|und diskutiert über ein Problem.
Um 17.30 Uhr|hat|Tom|Feierabend.
Danach|kauft|Tom|im Supermarkt etwas zum Abendessen|ein.
`);
p.order(24, "2", `
Zu Hause|bereitet|Tom|das Abendessen|vor.
Um 19.00 Uhr|isst|Tom|ganz alleine|und trinkt ein Glas Wein.
Ab 20.00 Uhr|sieht|Tom|fern.
Um 23.00 Uhr|schläft|Tom|ein|und träumt etwas Schönes.
`);
p.order(24, "3", `
Sie|gibt|ein Passwort|ein.
Sie|ruft|ihre E-Mails|ab.
Sie|löscht|unwichtige E-Mails.
Sie|druckt|wichtige E-Mails|aus.
Sie|leitet|Dokumente|weiter.
Sie|bearbeitet|Texte.
Sie|schneidet|Sätze|aus|und fügt sie ein.
Sie|surft|im Internet.
Sie|bezahlt|Rechnungen.
Sie|lädt|Videoclips|herunter.
`);
p.gaps(24, "4", `
haben|Ich {habe} ein Problem.
sein|Meine Waschmaschine {ist} kaputt.
verbinden|Ich {verbinde} Sie mal mit meinem Kollegen.
funktionieren|Meine Waschmaschine {funktioniert} nicht mehr.
können|{Können} Sie heute oder morgen vorbeikommen und die Waschmaschine reparieren?
brauchen|Ich {brauche} die Maschine dringend.
verstehen|Das {verstehe} ich.
wollen|Sie {wollen} wirklich keine neue Waschmaschine kaufen?
haben|Dafür {habe} ich kein Geld.
kommen|Ich {komme} am Donnerstag vorbei und {sehe@sehen} mir die Maschine mal an.
versprechen|Aber ich {verspreche} keine Wunder.
erwarten|Dann {erwarte} ich Sie am Donnerstag.
wohnen|Wo {wohnen} Sie, Herr Beier?
`);
// Source item numbers are stable progress IDs. Only these reviewed tasks ask
// learners to conjugate a separable verb or arrange its separated prefix.
const separableItems: Record<string, number[]> = {
  "23:1": [2, 3, 4, 6, 7, 9, 12, 13],
  "23:2": [6, 10, 12],
  "24:2": [1, 3, 4],
  "24:3": [1, 2, 4, 5, 7, 10],
  "24:4": [10],
};
for (const exercise of p.exercises) {
  const source = exercise.source!;
  if (separableItems[`${source.pdfPage}:${source.exercise}`]?.includes(Number(source.item))) {
    exercise.topic = "Separable verbs";
    exercise.explanation = "Conjugate the separable verb to match the subject. Its prefix separates in a main clause and follows the verb's complements.";
  } else if (source.pdfPage === 24 && source.exercise === "4" && [5, 8].includes(Number(source.item))) {
    // Vorbeikommen occurs in item 5, but the gap tests können, not separation.
    exercise.topic = "Modal verbs";
    exercise.explanation = "Conjugate the modal verb to match the subject. The other verb stays in the infinitive at the end of the main clause.";
  }
}
export default [...c.exercises, ...m.exercises, ...p.exercises];
