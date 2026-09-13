import { workbookChapter } from "./builder";
const c = workbookChapter("1.6", "Verb complements", "A1", "The verb determines the case: helfen, danken, gehören and gefallen take dative; besuchen, sehen and bezahlen take accusative. With two nouns, dative usually precedes accusative.");
c.gaps(61, "1", `
case|Otto kauft seiner Freundin einen Ring. „seiner Freundin“ steht im {Dativ}.
case|Das Essen schmeckt meinem Mann nicht. „meinem Mann“ steht im {Dativ}.
case|Das Fahrrad gehört meinem Freund. „meinem Freund“ steht im {Dativ}.
case|Angela ist Politikerin. „Politikerin“ steht im {Nominativ}.
case|Der Ingenieur zeigt den Gästen die Maschine. „die Maschine“ steht im {Akkusativ}.
case|Herr Klein präsentiert neue Möbel. „neue Möbel“ steht im {Akkusativ}.
case|Paul liebt Marie. „Marie“ steht im {Akkusativ}.
case|Ich kenne den Kollegen noch nicht. „den Kollegen“ steht im {Akkusativ}.
case|Andreas isst am liebsten Spaghetti. „Spaghetti“ steht im {Akkusativ}.
case|Monika wird später Ärztin. „Ärztin“ steht im {Nominativ}.
case|Frau Müller schreibt dem Chef eine E-Mail. „dem Chef“ steht im {Dativ}.
case|Die Schuhe passen mir gut. „mir“ steht im {Dativ}.
`, "fill");
c.gaps(61, "2", `
indefinite|Ich sehe gerade {einen} Film.
article|Wir bezahlen {die@article:acc} Rechnung sofort.
article|Wir besuchen {das@article:acc} Pergamonmuseum.
ending:mein|Das Kleid gefällt {meinem} Freund nicht.
article|Ich schicke {dem@article:dat} Kunden eine Bestätigung.
indefinite|Herr Klein vereinbart {einen} Termin.
ending:sein|Bruno schenkt {seiner} Freundin einen Ring.
article|Der Arzt hilft {dem@article:dat} Patienten.
article|Frau Krüger beantwortet {die@article:acc} E-Mail sofort.
indefinite|Ich möchte bitte noch {eine} Tasse Kaffee.
lesen|Ich {lese} jeden Tag Zeitung.
ending:sein|Martin gratuliert {seiner} Kollegin zum Geburtstag.
sein|Mein Nachbar {ist} Polizist.
negative|Franz trinkt {keinen} Alkohol.
`, "fill");
c.order(62, "3", `
Habt|ihr|das Bild|schon gekauft?
Hast|du|den Deutschkurs|schon bezahlt?
Habt|ihr|die Hausaufgaben|schon gemacht?
Hast|du|die CD|schon gehört?
Hast|du|die Zeitung|schon gelesen?
Hast|du|die Besprechung|schon vorbereitet?
Habt|ihr|die Ware|schon bestellt?
Hast|du|die Gäste|schon begrüßt?
Hast|du|den Termin|schon notiert?
Hast|du|die Nachricht|schon weitergeleitet?
`);
c.gaps(62, "4", `
article|Hast du {dem@article:dat} Chef schon gratuliert?
article|Hast du {den@article:acc} Techniker schon bestellt?
article|Hast du {dem@article:dat} Professor überhaupt zugehört?
article|Hast du {der@article:dat} Praktikantin schon geholfen?
article|Hast du {dem@article:dat} Direktor schon geantwortet?
ending:dein|Hast du {deinem} Freund widersprochen?
article|Hast du {den@article:acc} Film schon gesehen?
article|Hast du {die@article:acc} Ausstellung schon besucht?
article|Hast du {der@article:dat} Kollegin schon gedankt?
ending:dein|Hast du {deinen} Kaffee schon getrunken?
`, "fill");
c.order(62, "5", `
Wir|helfen|den Kunden|schnell.
Das Auto|gehört|der Firma.
Otto|schenkt|seiner Mutter|ein Kochbuch.
Zeigst|du|dem Chef|das Dokument?
Bringst|du|mir|ein Andenken mit?
Kannst|du|mir|deinen Stift leihen?
Schreibst|du|deinen Eltern|Postkarten aus dem Urlaub?
Hast|du|dir|schon wieder neue Schuhe gekauft?
Wann|hast|du|ihm|das Fachbuch gegeben?
Der Direktor|muss|den Kollegen|diese Entscheidung erklären.
Alle Teilnehmer|müssen|die Rechnung für den Kurs|bezahlen.
Wir|empfehlen|Kollegen aus dem Ausland|immer das Restaurant „La Cachette“.
`);
const p = workbookChapter("1.6", "Verbs with prepositions", "A2", "Learn the preposition with its verb. Questions about people use a preposition plus wen/wem; questions about things use wo(r)- plus the preposition.");
p.gaps(64, "1", `
preposition|Erkundige dich doch mal {nach} den Preisen!
preposition|Rede doch mal {mit} dem Chef!
preposition|Frag den Polizisten doch mal {nach} dem Weg!
preposition|Beschwer dich doch {beim@beim/zum/vom/ins} Direktor!
preposition|Bewirb dich doch {um} diese Stelle!
preposition|Diskutiere doch nicht immer {über} Politik!
preposition|Freu dich doch {auf~über} den Urlaub!
`, "fill");
p.gaps(64, "2", `
preposition|Nach dem Konzert freute sich Bruno {über} seinen Erfolg.
preposition|Bruno bedankte sich {bei} seinen Fans.
preposition|Einige Fans warteten am Ausgang {auf} Bruno.
preposition|Sie interessierten sich vor allem {für} Brunos Privatleben.
preposition|Bruno hat sich {in} die Sängerin Sandra verliebt.
preposition|Er hat sich {mit} seiner Exfreundin Yvonne gestritten.
preposition|Sein Manager wollte {mit} Bruno {über} die Beziehung zu Sandra reden.
`, "fill");
p.order(65, "3", `
Wir|warten|schon lange|auf das Protokoll.
Marion|telefoniert|täglich|mit ihrem Freund in Kanada.
Georg|denkt|nur noch|an das Projekt.
Max|interessiert sich|nur|für Fußball.
Der Informatiker|denkt|über das Softwareproblem|nach.
Bei der Sitzung|sprechen|wir|über die Arbeitszeiten.
Die Verwaltungsleiterin|beschäftigt sich|heute|mit der Jahresendabrechnung.
Wir|achten|besonders|auf die Sicherheit.
`);
p.gaps(65, "4", `
preposition|Maria beschwert sich ständig {bei} {dem@article:dat} Chef {über} {ihre@ending:ihr} Kollegen.
preposition|Gustav freut sich nie {über~auf} {die@article:acc} neuen Projekte.
preposition|Bert spricht selten {mit} {seinen@ending:sein} Kollegen.
preposition|Karla nimmt {an} {keiner@negative} Besprechung teil.
preposition|Paul denkt immer nur {an} {das@article:acc} Wochenende.
preposition|Rudi erinnert sich nie {an} {sein@ending:sein} Passwort.
preposition|Ida bedankt sich nie {für} {die@article:acc} Hilfe.
preposition|Gertrud diskutiert den ganzen Tag {mit} {ihren@ending:ihr} Freundinnen am Telefon.
preposition|Frank bereitet sich nie {auf} {die@article:acc} Sitzungen vor.
preposition|Gudrun interessiert sich nicht {für} {ihre@ending:ihr} Arbeit.
`, "fill");
p.gaps(65, "5", `
fragen|An der Rezeption {fragt} Herr Schreiner nach einem Stadtplan.
bitten|Er {bittet} den Portier um Rat.
bedanken|Herr Schreiner {bedankt} sich für die Informationen.
interessieren|Er geht in eine Galerie, denn er {interessiert} sich für moderne Kunst.
nehmen|Er {nimmt} an einer Führung teil.
freuen|Er {freut} sich über die vielen kulturellen Programme in der Stadt.
denken|Er {denkt} nur selten an seine Arbeit.
ärgern|Er {ärgert} sich oft über die Kellner.
warten|Manchmal muss er eine halbe Stunde auf sein Abendessen {warten}.
beschweren|Er will sich beim Hoteldirektor über die langsame Bedienung {beschweren}.
`);
p.gaps(66, "6", `
Wovon/Von wem/Woran/An wen|{Wovon} träumst du? — Von einer Reise nach Afrika.
Wovon/Von wem/Woran/An wen|{Von wem} träumst du? — Nicht von dir.
Woran/An wen/Worüber/Über wen|{Woran} denkst du? — An gestern Abend.
Woran/An wen/Worüber/Über wen|{An wen} denkst du? — An Martin.
Worüber/Über wen/Woran/An wen|{Worüber} habt ihr gelacht? — Über die E-Mail.
Worüber/Über wen/Woran/An wen|{Über wen} habt ihr gelacht? — Über den Chef.
Worüber/Über wen/Womit/Mit wem|{Worüber} hast du dich geärgert? — Über das Computerprogramm.
Worüber/Über wen/Womit/Mit wem|{Über wen} hast du dich geärgert? — Über Frau Müller.
Womit/Mit wem/Worüber/Über wen|{Mit wem} hast du dich gestritten? — Mit meinem Bruder.
Womit/Mit wem/Worüber/Über wen|{Worüber} habt ihr euch gestritten? — Über alte Comics.
`, "fill");
p.gaps(66, "7", `
Mit wem/Womit/Über wen/Worüber|{Mit wem} hast du gesprochen? — Mit dem Chef.
Wofür/Für wen/Bei wem/Wobei|{Wofür} habt ihr euch bedankt? — Für die schönen Geschenke.
Worüber/Über wen/Woran/An wen|{Worüber} denkst du nach? — Über ein Problem.
Wofür/Für wen/Worauf/Auf wen|{Wofür} hast du dich entschieden? — Für diese Jacke.
Mit wem/Womit/Über wen/Worüber|{Mit wem} hat er sich gestritten? — Mit seinem Bruder.
Worüber/Über wen/Woran/An wen|{Worüber} hast du gelacht? — Über deinen Witz.
In wen/Worin/An wen/Woran|{In wen} hast du dich verliebt? — In meinen Nachbarn.
Worauf/Auf wen/Woran/An wen|{Worauf} wartet ihr? — Auf den Bus.
Woran/An wen/Worüber/Über wen|{Woran} denkst du? — An meinen nächsten Urlaub.
Worum/Um wen/Wofür/Für wen|{Worum} hast du ihn gebeten? — Um Hilfe.
`, "fill");
p.gaps(67, "8", `
Mit wem/Womit/Über wen/Worüber|Ich habe mit Wilhelm telefoniert. — {Mit wem} hast du telefoniert?
Worauf/Auf wen/Woran/An wen|Ich warte auf Andrea. — {Auf wen} wartest du?
Mit wem/Womit/Über wen/Worüber|Ich will mit Joseph sprechen. — {Mit wem} willst du sprechen?
Worüber/Über wen/Woran/An wen|Ich freue mich über die Geschenke. — {Worüber} freust du dich?
Worüber/Über wen/Woran/An wen|Wir müssen über deine Pläne diskutieren. — {Worüber} müssen wir diskutieren?
Wofür/Für wen/Worauf/Auf wen|Ich interessiere mich für Jazzmusik. — {Wofür} interessieren Sie sich?
Womit/Mit wem/Worüber/Über wen|Ich beschäftige mich mit einem neuen Projekt. — {Womit} beschäftigen Sie sich?
Woran/An wen/Worauf/Auf wen|Wir möchten an einem Kurs teilnehmen. — {Woran} möchtet ihr teilnehmen?
Mit wem/Womit/Über wen/Worüber|Ich möchte mit Karla tanzen. — {Mit wem} möchtest du tanzen?
Mit wem/Womit/Über wen/Worüber|Ich kann nicht mit dir reden. — {Mit wem} kannst du nicht reden?
`, "fill");
const l = workbookChapter("1.6", "Position and movement", "A1", "A position takes dative after a two-way preposition. A change of position takes accusative. Distinguish liegen/legen, stehen/stellen and sitzen/setzen.");
l.gaps(69, "1", `
article|Das neue Bild hängt über {dem@article:dat} Bett.
article|Der Sessel steht in {dem@article:dat} Wohnzimmer.
article|Die grüne Vase steht auf {dem@article:dat} Tisch.
article|Die Dokumente liegen in {der@article:dat} Schreibtischschublade.
article|Das Handtuch hängt in {dem@article:dat} Bad.
article|Das schmutzige Geschirr steht in {der@article:dat} Geschirrspülmaschine.
article|Meine Brille liegt auf {dem@article:dat} Fernseher.
article|Mein Laptop liegt unter {dem@article:dat} Sessel.
`, "fill");
l.gaps(69, "2", `
Hängen/Liegen/Stehen/Sitzen|{Hängen} Sie Ihre Jacke bitte an den Kleiderständer.
location|Das Denkmal {steht} auf dem Mozartplatz.
Stellt/Steht/Liegt/Sitzt|{Stellt} ihr bitte die Milch in den Kühlschrank?
Liegst/Legst/Stellst/Setzt|{Liegst} du noch immer im Bett?
hängen/legen/stellen/setzen|Bei mir {hängen} viele Bilder an der Wand.
stehen/stellen/legen/setzen|Wo {stehen} die drei alten Windmühlen?
location|Die Mutter {setzt} ihre Tochter in den Kinderwagen.
setzen/sitzen/liegen/stehen|Bitte {setzen} Sie sich!
stellen/stehen/liegen/sitzen|Wohin willst du dieses Regal {stellen}?
location|Oma {sitzt} in ihrem Sessel.
`);
export default [...c.exercises, ...p.exercises, ...l.exercises];
