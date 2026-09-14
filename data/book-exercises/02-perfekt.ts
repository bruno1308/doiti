import { workbookChapter } from "./builder";
const c = workbookChapter("1.1.3", "Perfekt", "A2", "The Perfekt uses a conjugated auxiliary and a past participle. Use sein for a change of place or state and for bleiben/sein; most other verbs use haben. The participle closes the main clause.");
c.gaps(27, "1", `
part:sehen|sehen → {gesehen}
part:nehmen|nehmen → {genommen}
part:wohnen|wohnen → {gewohnt}
part:arbeiten|arbeiten → {gearbeitet}
part:helfen|helfen → {geholfen}
part:schneiden|schneiden → {geschnitten}
part:finden|finden → {gefunden}
part:trinken|trinken → {getrunken}
part:essen|essen → {gegessen}
part:schlafen|schlafen → {geschlafen}
part:lösen|lösen → {gelöst}
part:kaufen|kaufen → {gekauft}
part:schreiben|schreiben → {geschrieben}
part:singen|singen → {gesungen}
`);
c.order(27, "2", `
Habt|ihr|schon einmal Musik von Wolfgang Amadeus Mozart|gehört?
Haben|Sie|schon einmal Schokolade aus der Schweiz|gegessen?
Habt|ihr|schon einmal warmes Bier|getrunken?
Haben|Sie|schon einmal im Urlaub|gearbeitet?
Hast|du|schon einmal die Mona Lisa im Original|gesehen?
Habt|ihr|schon einmal in New York|gewohnt?
Hast|du|schon einmal ein Liebesgedicht|geschrieben?
Hast|du|schon einmal über dich selbst|gelacht?
Haben|Sie|schon einmal einen Science-Fiction-Roman|gelesen?
Haben|Sie|schon einmal einen Fehler|gemacht?
Hast|du|schon einmal einem Mitschüler|geholfen?
Hast|du|schon einmal eine fremde Sprache|gelernt?
`);
c.order(28, "2", `
Haben|Sie|schon einmal ein Portemonnaie auf der Straße|gefunden?
Hast|du|schon einmal ein Fünf-Gänge-Menü|gekocht?
Habt|ihr|schon einmal ein Computerproblem|gelöst?
Hast|du|schon einmal ein wichtiges Dokument|gelöscht?
Habt|ihr|schon einmal in einem Chor|gesungen?
Haben|Sie|schon einmal Schach|gespielt?
`);
c.gaps(28, "3", `
part:essen|Ich war in Berlin. Ich habe eine Currywurst {gegessen}.
part:schlafen|Ich habe im Hotel Albertin {geschlafen}.
part:besuchen|Ich habe das Neue Museum {besucht}.
part:besichtigen|Rudi war in Köln. Er hat den Kölner Dom {besichtigt}.
part:trinken|Er hat ein Kölsch {getrunken}.
part:sehen|Er hat im Rhein-Energie-Stadion ein Fußballspiel {gesehen}.
part:treffen|Wir waren in München. Wir haben Freunde {getroffen}.
part:sitzen|Wir haben im Englischen Garten {gesessen}.
part:bewundern|Wir haben technische Erfindungen im Deutschen Museum {bewundert}.
part:baden|Carola und Susanne waren in Rostock. Sie haben im Meer {gebadet}.
part:machen|Sie haben eine Hafenrundfahrt {gemacht}.
part:singen|Sie haben Seemannslieder {gesungen}.
part:fotografieren|Ihr wart in Leipzig. Ihr habt Tiere im Zoo {fotografiert}.
part:hören|Ihr habt in der Thomaskirche ein Konzert {gehört}.
part:kaufen|Ihr habt auf dem Marktplatz alte Gläser {gekauft}.
`);
c.gaps(28, "4", `
aux|Die Tickets {habe} ich im Internet {gebucht@part:buchen}.
aux|Die Reise {hat} fünf Stunden {gedauert@part:dauern}.
aux|In Paris {haben} wir bei einer deutschen Freundin {gewohnt@part:wohnen}.
aux|Am ersten Tag {hat} es {geregnet@part:regnen}.
aux|Da {haben} wir Geschenke {gekauft@part:kaufen}.
aux|Am Abend {haben} wir unsere französischen Freunde {getroffen@part:treffen}.
aux|Wir {haben} sie seit fünf Jahren nicht {gesehen@part:sehen}.
aux|Wir {haben} zusammen {gegessen@part:essen}, lange {diskutiert@part:diskutieren} und ziemlich viel Rotwein {getrunken@part:trinken}.
aux|Am nächsten Tag {haben} wir bis 12.00 Uhr {geschlafen@part:schlafen}.
`);
c.order(30, "1", `
Was|ist|passiert?
Wohin|ist|er|gelaufen?
Warum|bist|du|so schnell|geschwommen?
Wo|sind|die Akten|gewesen?
Wann|ist|er|krank|geworden?
Wohin|ist|er|gefahren?
Wie lange|bist|du|in London|geblieben?
Wann|seid|ihr|das letzte Mal ins Kino|gegangen?
Wohin|ist|der Chef|gereist?
Woher|ist|der Zug|gekommen?
Wie oft|bist|du|schon|geflogen?
Wann|bist|du|das letzte Mal beim Zahnarzt|gewesen?
Wann|ist|Frau Müller|nach Hause|gegangen?
`);
c.gaps(31, "2", `
aux|Ich {habe} interessante Neuigkeiten gehört.
aux|Mein Cousin Alex {hat} 50 000 Euro im Lotto gewonnen!
aux|Er {hat} sich von dem Geld ein neues Auto gekauft.
aux|Er {ist} damit sofort nach Italien gefahren.
aux|In Italien {hat} er dann seine Traumfrau getroffen.
aux|Sie {ist} vorgestern mit Alex nach Ottobrunn gekommen.
aux|Gestern {haben} wir alle zusammen in einem tollen Restaurant gegessen.
aux|Otto {hat} uns gesagt, dass er heiraten will.
`);
c.order(31, "3", `
Er|ist|zu spät zur Arbeit|gekommen.
Alle|haben|auf Frank|gewartet.
Beate|hat|keinen Parkplatz|gefunden.
Peter|ist|mit dem Fahrrad|gefahren.
Die Besprechung|hat|nicht pünktlich|begonnen.
Martha|hat|alle E-Mails|gelöscht.
Martin|hat|das Computerproblem nicht|gelöst.
Herr Müller|ist|nach Madrid|geflogen.
Das Flugzeug|ist|mit Verspätung in Madrid|gelandet.
Michael|hat|neue Produkte für einen Katalog|fotografiert.
Ich|habe|den ganzen Tag hart|gearbeitet.
Margit|hat|Dokumente|kopiert.
Joachim und Manfred|haben|über einen Auftrag|diskutiert.
Steffi|hat|mal wieder im Internet|gesurft.
Der Chef|hat|einen wichtigen Termin|vergessen.
`);
c.order(31, "4", `
Um 9.30 Uhr|hat|Gabi|Kaffee|getrunken.
Von 10.00 bis 10.30 Uhr|hat|Gabi|Gymnastik|gemacht.
Von 11.00 bis 12.30 Uhr|ist|Gabi|beim Friseur|gewesen.
Um 13.00 Uhr|hat|Gabi|im Restaurant einen Salat|gegessen.
Von 14.00 bis 16.30 Uhr|hat|Gabi|Golf|gespielt.
Um 17.00 Uhr|hat|Gabi|neue Schuhe|gekauft.
Um 18.00 Uhr|hat|Gabi|mit einer Freundin|telefoniert.
Ab 20.00 Uhr|hat|Gabi|auf einer Party mit Herrn Wichtig|getanzt.
Um 23.30 Uhr|ist|Gabi|ins Bett|gegangen.
Danach|hat|Gabi|im Bett einen Krimi|gelesen.
`);
const p = workbookChapter("1.1.3", "Perfekt", "A2", "The Perfekt uses a conjugated auxiliary and a past participle. Inseparable prefixes such as be- and ver-, and verbs ending in -ieren, form participles without ge-.");
p.gaps(33, "1", `
räumen|{Räumst} du das Zimmer bald auf? — Ich habe das Zimmer schon {aufgeräumt@part:aufräumen}.
räumen|{Räumst} du die Teller bald in den Küchenschrank ein? — Ich habe die Teller schon {eingeräumt@part:einräumen}.
holen|{Holst} du das Paket bald von der Post ab? — Ich habe das Paket schon {abgeholt@part:abholen}.
bezahlen|{Bezahlst} du die Stromrechnung bald? — Ich habe die Stromrechnung schon {bezahlt@part:bezahlen}.
bauen|{Baust} du das Waschbecken bald an? — Ich habe das Waschbecken schon {angebaut@part:anbauen}.
verkaufen|{Verkaufst} du den alten Kühlschrank bald? — Ich habe den alten Kühlschrank schon {verkauft@part:verkaufen}.
`);
p.gaps(34, "1", `
bestellen|{Bestellst} du bald einen neuen Kühlschrank? — Ich habe schon einen neuen Kühlschrank {bestellt@part:bestellen}.
hängen|{Hängst} du das Bild bald auf? — Ich habe das Bild schon {aufgehängt@part:aufhängen}.
trocknen|{Trocknest} du die Gläser bald ab? — Ich habe die Gläser schon {abgetrocknet@part:abtrocknen}.
kaufen|{Kaufst} du bald frisches Obst ein? — Ich habe schon frisches Obst {eingekauft@part:einkaufen}.
machen|{Machst} du die Musik im Wohnzimmer bald aus? — Ich habe die Musik schon {ausgemacht@part:ausmachen}.
schalten|{Schaltest} du den Fernseher bald ein? — Ich habe den Fernseher schon {eingeschaltet@part:einschalten}.
schalten|{Schaltest} du das Licht im Arbeitszimmer bald aus? — Ich habe das Licht schon {ausgeschaltet@part:ausschalten}.
`);
p.gaps(34, "2", `
aux|Wann {bist} du heute {aufgestanden@part:aufstehen}? — Ich {bin} um 9.00 Uhr aufgestanden.
aux|Wann {hat} der Sprachkurs {angefangen@part:anfangen}? — Er {hat} am Montag angefangen.
aux|Wann {hast} du Tante Annelies {angerufen@part:anrufen}? — Ich {habe} sie gestern angerufen.
aux|Wann {ist} der Zug {angekommen@part:ankommen}? — Er {ist} um 17.00 Uhr angekommen.
`);
p.gaps(34, "3", `
part:eingeben|Otto hat verschiedene Passwörter {eingegeben}.
part:kontrollieren|Otto hat alle Computerfunktionen {kontrolliert}.
part:lösen|Otto hat einige Probleme {gelöst}.
part:ausdrucken|Otto hat viele Dokumente {ausgedruckt}.
part:informieren|Otto hat die Kollegen über Veränderungen {informiert}.
part:vorstellen|Otto hat neue Mitarbeiter {vorgestellt}.
part:diskutieren|Otto hat über schwierige Probleme {diskutiert}.
part:anrufen|Otto hat zwei Softwarefirmen {angerufen}.
part:vereinbaren|Otto hat viele Termine {vereinbart}.
part:vorbereiten|Otto hat eine Präsentation {vorbereitet}.
part:abholen|Otto hat einen Vertreter vom Bahnhof {abgeholt}.
part:teilnehmen|Otto hat an einer Besprechung {teilgenommen}.
part:führen|Otto hat Gespräche mit Mitarbeitern {geführt}.
part:unterschreiben|Otto hat einen Vertrag {unterschrieben}.
`);
export default [...c.exercises, ...p.exercises];
