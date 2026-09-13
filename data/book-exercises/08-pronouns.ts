import { workbookChapter } from "./builder";
const p = workbookChapter("3.1", "Personal pronouns", "A1", "Choose the pronoun for the person, gender, number and case. With two object pronouns, accusative precedes dative: sie ihm, es ihr.");
p.gaps(93,"1a",`pronoun:nom|Das Dokument liegt auf dem Tisch. → {Es} liegt auf dem Tisch.
pronoun:nom|Meine Kollegin und ich waren auf Dienstreise. → {Wir} waren auf Dienstreise.
pronoun:nom|Das Haus gehört meinem Freund. → {Es} gehört meinem Freund.
pronoun:nom|Das Mädchen hat geweint. → {Es} hat geweint.
pronoun:nom|Meine Mutter und meine Tante haben mich besucht. → {Sie} haben mich besucht.
pronoun:nom|Der Chef hat schlechte Laune. → {Er} hat schlechte Laune.`,"fill");
p.gaps(93,"1b",`pronoun:acc|Marie mag den neuen Kollegen. → Marie mag {ihn}.
pronoun:acc|Gustav singt nur für seine Fans. → Gustav singt nur für {sie}.
pronoun:acc|Der Kunstsammler kaufte das Bild. → Er kaufte {es}.
pronoun:acc|Ich habe den Termin abgesagt. → Ich habe {ihn} abgesagt.
pronoun:acc|Wir konnten das Hotel nicht finden. → Wir konnten {es} nicht finden.
pronoun:acc|Frau Müller hat die Rechnungen bezahlt. → Sie hat {sie} bezahlt.`,"fill");
p.gaps(93,"1c",`pronoun:dat|Das Auto gehört meinem Freund. → Es gehört {ihm}.
pronoun:dat|Ich gehe mit meinen Kollegen ins Restaurant. → Ich gehe mit {ihnen} ins Restaurant.
pronoun:dat|Max hat seiner Nachbarin geholfen. → Max hat {ihr} geholfen.
pronoun:dat|Was hast du dem Mädchen geschenkt? → Was hast du {ihm} geschenkt?
pronoun:dat|Der Direktor dankte der Praktikantin. → Er dankte {ihr}.
pronoun:dat|Hast du deinen Eltern die Wahrheit gesagt? → Hast du {ihnen} die Wahrheit gesagt?`,"fill");
p.gaps(93,"1d",`pronoun|Hast du ihr die Rechnung gezeigt? — Ja, ich habe {sie@pronoun:acc} {ihr@pronoun:dat} gezeigt.
pronoun|Hast du ihnen die Maschine erklärt? — Ja, ich habe {sie@pronoun:acc} {ihnen@pronoun:dat} erklärt.
pronoun|Hast du ihr den Ring gekauft? — Ja, ich habe {ihn@pronoun:acc} {ihr@pronoun:dat} gekauft.
pronoun|Hast du ihm das Fahrrad geschenkt? — Ja, ich habe {es@pronoun:acc} {ihm@pronoun:dat} geschenkt.
pronoun|Hast du ihr die Fahrkarte gegeben? — Ja, ich habe {sie@pronoun:acc} {ihr@pronoun:dat} gegeben.
pronoun|Hast du ihr das Geld gestohlen? — Nein, ich habe {es@pronoun:acc} {ihr@pronoun:dat} nicht gestohlen.`,"fill");
p.gaps(94,"2",`Sie/Ihnen/mich/mir|Danke, gut, und {Ihnen}? Haben {Sie} meine E-Mail bekommen?
Sie/Ihnen/mich/mir|Möchten {Sie} erst mal einen Kaffee?
Sie/Ihnen/mich/mir|Tee schmeckt {mir} besser.
Sie/Ihnen/mich/mir|Dann macht {Ihnen} Frau Müller einen Tee.
Sie/Ihnen/mich/mir|Sind {Sie} zum ersten Mal in unserer Firma? Haben {Sie} den Weg leicht gefunden?
Sie/Ihnen/mich/mir|Mein Navigationssystem hat {mich} sicher hierher gebracht.
Sie/Ihnen/mich/mir|Darf ich {Ihnen} unseren Katalog geben?
Sie/Ihnen/mich/mir|Ich danke {Ihnen}.`,"fill");
p.gaps(94,"3",`Sie/Ihnen/Ihre/Ihrer|Könnten {Sie} mich mit Frau Ebershagen verbinden?
Sie/Ihnen/Ihre/Ihrer|Könnte ich mit {Ihnen} einen Termin vereinbaren?
Sie/Ihnen/Ihre/Ihrer|Wann hätten {Sie} Zeit?
Sie/Ihnen/Ihre/Ihrer|Passt es {Ihnen} am Donnerstag?
Sie/Ihnen/Ihre/Ihrer|Kommen {Sie} bei uns vorbei oder soll ich bei {Ihnen} vorbeikommen?
Sie/Ihnen/Ihre/Ihrer|Habe ich {Ihnen} das neue Angebot geschickt?
Sie/Ihnen/Ihre/Ihrer|Soll ich {Ihnen} eine Bestätigung senden?
Sie/Ihnen/Ihre/Ihrer|Soll ich {Sie} am Bahnhof abholen?`,"fill");
p.gaps(94,"4",`pronoun|Liebe Julia, wie geht es {dir}?
pronoun|Ich habe {mich} lange nicht mehr gemeldet.
pronoun|Bei {mir} gibt es nicht viel Neues.
pronoun|Nun bin {ich} schon im vierten Semester.
pronoun|{Mir} gefällt das Studium jetzt besser.
pronoun|Ich habe {mich} an die Dozenten gewöhnt.
pronoun|Am Wochenende arbeite {ich} als Kellner.
pronoun|So kann {ich} ein bisschen Geld verdienen.
pronoun|Vielleicht komme {ich} in den Sommerferien nach München und besuche {dich}.
pronoun|{Ich} war schon lange nicht mehr im Deutschen Museum.
pronoun|Über das neue Kunstmuseum habe {ich} viel gehört.
pronoun|Was machst {du} eigentlich so? Schreib {mir} mal. Ich würde {mich} freuen.`,"fill");
const r = workbookChapter("3.2", "Reflexive pronouns: accusative or dative", "A2", "Use mich/dich when the reflexive pronoun is the direct object. With another accusative object, use mir/dir: Ich wasche mir die Hände. Other reflexive forms do not change between these cases.");
r.gaps(95,"1",`reflexive|Wir haben {uns} gestern in der Kneipe getroffen.
reflexive|Martina hat {sich} noch nicht geschminkt.
reflexive|Hast du {dich} gestern geärgert?
reflexive|Ich habe {mich} verliebt.
reflexive|Habt ihr {euch} den neuen Film schon angesehen?
reflexive|Bitte beeilt {euch} doch ein bisschen!
reflexive|Max und Moritz haben {sich} über Fußball gestritten.`,"fill");
r.gaps(95,"2",`reflexive|Habt ihr {euch} über das Urlaubsland informiert? — Ja, wir haben {uns} informiert.
reflexive|Haben Sie {sich} nach dem Weg erkundigt? — Ja, ich habe {mich} erkundigt.`,"fill");
r.gaps(96,"2",`reflexive|Hast du {dich} beim Reisebüro beschwert? — Ja, ich habe {mich} beschwert.
reflexive|Hast du {dir} eine neue Badehose gekauft? — Ja, ich habe {mir} eine gekauft.
reflexive|Habt ihr {euch} für den Golfkurs angemeldet? — Ja, wir haben {uns} angemeldet.
reflexive|Haben Sie {sich} mit dem Reiseleiter unterhalten? — Ja, ich habe {mich} mit ihm unterhalten.`,"fill");
r.gaps(96,"3",`reflexive|Ich bestelle {mir} einen Kaffee.
reflexive|Ich schminke {mich}.
reflexive|Ich streite {mich} mit dem Nachbarn.
reflexive|Ich kaufe {mir} ein neues Sommerkleid.
reflexive|Ich koche {mir} eine Suppe.
reflexive|Ich freue {mich} über das Fußballergebnis.
reflexive|Ich wasche {mir} die Hände.`,"fill");
r.gaps(96,"4",`reflexive|Ich habe {mich} schnell gewaschen und {mir} meinen schönsten Anzug angezogen.
reflexive|Ich konnte {mich} nicht mehr rasieren.
reflexive|Der Chef hat {sich} darüber geärgert.
reflexive|Wir haben {uns} mit koreanischen Geschäftspartnern getroffen.
reflexive|Wir mussten {uns} mit Händen und Füßen unterhalten.
reflexive|Kannst du {dir} das vorstellen?
reflexive|Am Abend habe ich {mich} mit Katja getroffen.
reflexive|Wir wollten {uns} eine Komödie anschauen.
reflexive|Wir haben {uns} in ein nettes Café gesetzt.
reflexive|Ich habe {mich} erst um ein Uhr ins Bett gelegt.
reflexive|Ich freue {mich} auf das Wochenende. Dann kann ich {mich} erholen.`,"fill");
const s = workbookChapter("3.3–3.4", "Possessive and indefinite pronouns", "A2", "A pronoun replaces the noun and keeps its gender and case: mein Haus → meins; ein Stift → einer. In the accusative masculine, use meinen/einen/keinen.");
s.gaps(97,"1",`meins/meine/meiner/meinen|Ist das dein Haus? — Ja, das ist {meins~meines}.
unsere/unserer/unseres/unseren|Ist das eure Wohnung? — Ja, das ist {unsere}.
meine/meiner/meins/meinen|Sind das deine Bilder? — Ja, das sind {meine}.
ihrer/ihre/ihres/ihren|Ist das der Artikel von Claudia? — Ja, das ist {ihrer}.
unseres/unsere/unserer/unseren|Ist das euer Auto? — Ja, das ist {unseres~unsers}.
meiner/meine/meins/meinen|Ist das dein Laptop? — Ja, das ist {meiner}.
meiner/meine/meins/meinen|Ist das dein Autoschlüssel? — Ja, das ist {meiner}.`,"fill");
s.gaps(97,"2",`deins/deine/deiner/deinen|Hier liegt ein Wörterbuch. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier liegt ein Handy. Ist das {deins~deines}?
deiner/deine/deins/deinen|Hier liegt ein Terminkalender. Ist das {deiner}?
eure/eurer/eures/euren|Hier liegen Prospekte. Sind das {eure}?
deine/deiner/deins/deinen|Hier steht eine Tasse. Ist das {deine}?
eurer/eure/eures/euren|Hier liegt ein Projektbericht. Ist das {eurer}?
meine/meiner/meins/meinen|Hier liegt eine Praline. Ist das {meine}?`,"fill");
const j = workbookChapter("3.4", "Someone, nothing, everyone", "A1", "Jemand/niemand refer to people; etwas/nichts refer to things. Alle means everyone or all of them; alles means everything.");
j.gaps(100,"1",`indefinitepronoun|Haben Sie etwas gesehen? — Nein, ich habe {nichts} gesehen.
indefinitepronoun|Weißt du {etwas} über die Pläne? — Keine Ahnung, ich weiß {nichts}.
indefinitepronoun|Meine Dokumente sind durcheinander. {Jemand} war in meinem Büro!
indefinitepronoun|Das Büro war abgeschlossen. Da war {niemand}.
indefinitepronoun|Ist {etwas} passiert? — Nein, es ist {nichts}. Es ist {alles} in Ordnung.
indefinitepronoun|Ich schaffe das nicht alleine. Da muss mir {jemand} helfen.
indefinitepronoun|{Jemand} muss das Protokoll schreiben. Das will freiwillig {niemand} machen.
indefinitepronoun|Wer war bei der Sitzung? — {Alle} waren da.
indefinitepronoun|Kennst du hier keinen Menschen? — Nein, ich kenne {niemand~niemanden}.
indefinitepronoun|Ich weiß absolut {nichts} mehr. Ich habe {alles} vergessen.`,"fill");
j.gaps(100,"2",`indefinitepronoun|Dazu kann ich konkret noch {nichts} sagen.
indefinitepronoun|Dazu sagen wir {etwas~alles} nach der Wahl.
indefinitepronoun|Wir {alle} müssen sparen.
indefinitepronoun|{Jemand}, der viel Geld hat, kann viel Geld ausgeben.
indefinitepronoun|{Jemand}, der kein Geld hat, kann {nichts} ausgeben.
indefinitepronoun|Es gibt Leute, die immer {alles} besser wissen.`,"fill");
j.order(100,"3",`Die Diebe|sind nachts gekommen|und|haben alles mitgenommen.
Die Polizei|hat|im Haus alle|befragt.
Die Frau im ersten Stock|hat|nichts|gehört.
Der Herr im zweiten Stock|hat|niemanden|gesehen.
Der Hausmeister|hat|jemanden|beobachtet.`);
const q = workbookChapter("3.5", "Question pronouns", "A1", "Wer asks for a subject, wen for an accusative person, wem for a dative person and wessen for a possessor. Was asks about a thing or action.");
q.gaps(102,"1",`question|{Was} habt ihr gegessen? — Spaghetti.
question|{Wer} hat angerufen? — Deine Mutter.
question|Mit {wem} triffst du dich? — Mit Karl.
question|{Wessen} Büro ist das? — Ottos Büro.
question|{Was} habt ihr gemacht? — Schach gespielt.
question|{Wem} hast du den Schlüssel gegeben? — Gustav.
question|{Wer} ist zu deiner Party gekommen? — Alle Kollegen.
question|{Was} hast du im Urlaub gelesen? — Einen Krimi.
question|{Wen} möchten Sie sprechen? — Herrn Müller.
question|{Wer} hat die Fenster geöffnet? — Otto.
question|{Was} haben die Einbrecher gestohlen? — Ein wertvolles Bild.
question|{Wen} hat die Polizei verhaftet? — Den Hausmeister.`,"fill");
q.gaps(102,"2",`ending:welch|Gibst du mir den Mantel? — {Welchen} meinst du? Den blauen oder den roten?
eins/eine/einer/einen|Bringst du mir ein Brötchen mit? — Was für {eins~eines}? Ein normales oder ein Vollkornbrötchen?
ending:welch|Diese Schuhe sind schön. — {Welche} meinst du? Die grünen Stiefel?
ending:welch|Siehst du den Mann? — {Welchen} meinst du?
indefinite|Ich möchte einen Pullover. — Was für {einen} hätten Sie gern?
ending:welch|Kaufst du mir diese Handtasche? — {Welche}? Die teure?`,"fill");
q.choices(102,"3",`ending:welch|Ich habe zwei T-Shirts. {Welches} findest du schöner?
question|{Wer} war zuletzt am Kopierer?
question|Mit {wem} hast du so lange telefoniert?
ending:welch|Ich habe verschiedene Stückchen Kuchen gekauft. {Welches} möchtest du?
question|{Was} habt ihr am Wochenende gemacht?
question|{Was} hast du gesagt?
Wen/Wem/Wessen/Was|{Wen} hat Eduard zum Essen eingeladen?
Wer/Wen/Wem/Wessen|{Wer} hat diese Rechnung geschrieben?
ending:welch|Es fahren vier Züge nach Frankfurt. {Welchen} nimmst du?
wen/wem/wer/wessen|In {wen} hat sich Kerstin verliebt?
Was/Wer/Wen/Wem|Du bist aufgeregt! {Was} war denn los?
Wem/Wen/Wer/Wessen|{Wem} hat das Essen geschmeckt?`);
const rel = workbookChapter("3.6", "Relative pronouns", "A2", "The relative pronoun agrees with the noun it refers to. Its case comes from its role inside the relative clause, including any preposition.");
rel.gaps(104,"1",`relative:m|Anna träumt von einem Mann, {den} ihre Eltern mögen.
relative:m|Anna träumt von einem Mann, mit {dem} sie über Kunst reden kann.
relative:m|Anna träumt von einem Mann, {der} Karriere macht.
relative:m|Anna träumt von einem Mann, {der} ihr jeden Wunsch erfüllt.
relative:f|Paul träumt von einer Frau, {die} lange Beine hat.
relative:f|Paul träumt von einer Frau, {die} sich für Autos interessiert.
relative:f|Paul träumt von einer Frau, mit {der} er ins Stadion gehen kann.
relative:f|Paul träumt von einer Frau, {die} ihre Schuhe selbst bezahlt.
relative:f|Paul träumt von einer Frau, {die} ihm jeden Wunsch erfüllt.`,"fill");
rel.gaps(104,"2",`relative:m|Wo ist der Brief, {den} ich auf deinen Schreibtisch gelegt habe?
relative:pl|Wo sind die Dokumente, {die} ich kopiert habe?
relative:pl|Wo sind die Gäste, {die} gerade gekommen sind?
relative:m|Wo ist der Chef, bei {dem} die ganze Zeit das Telefon klingelt?
relative:m|Wo ist der Hausmeister, {der} das Licht reparieren soll?
relative:pl|Wo sind meine Schlüssel, {die} ich in meine Handtasche gesteckt habe?
relative:n|Wo ist mein Auto, {das} ich gestern hier geparkt habe?
relative:f|Wo ist die Rechnung, {die} ich heute bezahlen muss?`,"fill");
rel.choices(104,"3",`relative:f|Esperanto sollte die internationale Kommunikation, {die} manchmal schwierig ist, verbessern.
relative:m|Ludwig Zamenhof, {der} sein Projekt 1887 vorstellte, begründete die Sprache.
relative:pl|Es gibt viele Menschen, {die} diese Sprache sprechen.
denen/die/der/dem|Das sind Länder, in {denen} besonders viele Menschen Esperanto lernen.
relative:m|Es gibt einen Weltkongress, {der} einmal im Jahr stattfindet.
denen/die/der/dem|Das ist ein Festival mit Veranstaltungen, an {denen} viele Menschen teilnehmen.
relative:pl|Es gibt viele Bücher, {die} in Esperanto übersetzt wurden.
relative:f|Die Zeit, {die} man zum Lernen braucht, ist geringer.
die/denen/dem/der/den|Es gibt Kurse, in {die~denen} man sich einschreiben kann.
relative:n|Man kann ein Lehrbuch kaufen, mit {dem} man die Sprache alleine lernt.`);
const es = workbookChapter("3.7", "Impersonal es", "A1", "Weather and impersonal expressions need es: Es regnet; es gibt; es geht um. An ordinary subject such as die Experten does not need an additional es.");
es.gaps(105,"1",`sein|Es {ist} heiß.
sein|Es {ist} kalt.
sein|Es {ist} sonnig.
sein|Es {ist} neblig.
sein|Es {ist} stürmisch.
sein|Es {ist} windig.
regnen|Es {regnet}.
schneien|Es {schneit}.
stürmen|Es {stürmt}.
donnern|Es {donnert}.
blitzen|Es {blitzt}.`);
es.choices(105,"2",`es/sie/ihn/–|Hier sind {–} die Nachrichten.
es/sie/ihn/–|Heute gab {es} auf der Autobahn kilometerlange Staus.
es/sie/ihn/–|In den Morgenstunden hatte {es} geschneit.
es/sie/ihn/–|Viele Autofahrer waren {–} auf den Schnee nicht vorbereitet.
es/sie/ihn/–|{Es} kam zu vielen Unfällen.
es/sie/ihn/–|In den nächsten Tagen erwarten {–} die Experten noch mehr Schnee.
es/sie/ihn/–|Sicher kommt {es} wieder zu langen Staus.
es/sie/ihn/–|In den Gesprächen geht {es} um Sicherheitspolitik.
es/sie/ihn/–|Morgen sind Gespräche {–} mit dem Innenminister geplant.`);
export default [...p.exercises,...r.exercises,...s.exercises,...j.exercises,...q.exercises,...rel.exercises,...es.exercises];
