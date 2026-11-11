// Original content, modelled on the public SDS task formats (Lesen).
import type { LesenTask } from "../../lib/sds/types";

const PIC = "Welches Bild passt zum Wort? Tippen Sie auf das richtige Bild.";
const RF = "Lesen Sie den Text. Ist die Aussage richtig oder falsch?";
const MC = "Lesen Sie den Text und wählen Sie die richtige Antwort.";
const rf = () => [{ label: "Richtig" }, { label: "Falsch" }];

export const lesenTasks: LesenTask[] = [
  {
    id: "L-preA1-1",
    level: "preA1",
    skill: "lesen",
    domain: "Einkäufe",
    instruction: PIC,
    items: [
      {
        prompt: "der Apfel",
        options: [
          { emoji: "🍌", label: "die Banane" },
          { emoji: "🍎", label: "der Apfel" },
          { emoji: "🍞", label: "das Brot" },
        ],
        answer: 1,
      },
      {
        prompt: "die Milch",
        options: [
          { emoji: "🥛", label: "die Milch" },
          { emoji: "🥚", label: "das Ei" },
          { emoji: "🍅", label: "die Tomate" },
        ],
        answer: 0,
      },
      {
        prompt: "das Brot",
        options: [
          { emoji: "🐟", label: "der Fisch" },
          { emoji: "🥕", label: "die Karotte" },
          { emoji: "🍞", label: "das Brot" },
        ],
        answer: 2,
      },
      {
        prompt: "der Käse",
        options: [
          { emoji: "🍋", label: "die Zitrone" },
          { emoji: "🧀", label: "der Käse" },
          { emoji: "🥛", label: "die Milch" },
        ],
        answer: 1,
      },
      {
        prompt: "das Ei",
        options: [
          { emoji: "🥚", label: "das Ei" },
          { emoji: "🥔", label: "die Kartoffel" },
          { emoji: "🍓", label: "die Erdbeere" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "L-preA1-2",
    level: "preA1",
    skill: "lesen",
    domain: "Verkehr",
    instruction: PIC,
    items: [
      {
        prompt: "der Bus",
        options: [
          { emoji: "🚲", label: "das Velo" },
          { emoji: "✈️", label: "das Flugzeug" },
          { emoji: "🚌", label: "der Bus" },
        ],
        answer: 2,
      },
      {
        prompt: "das Auto",
        options: [
          { emoji: "🚗", label: "das Auto" },
          { emoji: "🚆", label: "der Zug" },
          { emoji: "🚢", label: "das Schiff" },
        ],
        answer: 0,
      },
      {
        prompt: "das Velo",
        options: [
          { emoji: "🚕", label: "das Taxi" },
          { emoji: "🚲", label: "das Velo" },
          { emoji: "🚚", label: "der Lastwagen" },
        ],
        answer: 1,
      },
      {
        prompt: "das Flugzeug",
        options: [
          { emoji: "🚋", label: "das Tram" },
          { emoji: "🚗", label: "das Auto" },
          { emoji: "✈️", label: "das Flugzeug" },
        ],
        answer: 2,
      },
      {
        prompt: "das Schiff",
        options: [
          { emoji: "🚁", label: "der Helikopter" },
          { emoji: "🚢", label: "das Schiff" },
          { emoji: "🚌", label: "der Bus" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "L-preA1-3",
    level: "preA1",
    skill: "lesen",
    domain: "Wohnumgebung",
    instruction: PIC,
    items: [
      {
        prompt: "das Bett",
        options: [
          { emoji: "🛏️", label: "das Bett" },
          { emoji: "🪑", label: "der Stuhl" },
          { emoji: "🚪", label: "die Tür" },
        ],
        answer: 0,
      },
      {
        prompt: "der Schlüssel",
        options: [
          { emoji: "📺", label: "der Fernseher" },
          { emoji: "🚿", label: "die Dusche" },
          { emoji: "🔑", label: "der Schlüssel" },
        ],
        answer: 2,
      },
      {
        prompt: "die Tür",
        options: [
          { emoji: "🛋️", label: "das Sofa" },
          { emoji: "🚪", label: "die Tür" },
          { emoji: "⏰", label: "der Wecker" },
        ],
        answer: 1,
      },
      {
        prompt: "der Stuhl",
        options: [
          { emoji: "🪑", label: "der Stuhl" },
          { emoji: "🛁", label: "die Badewanne" },
          { emoji: "🔑", label: "der Schlüssel" },
        ],
        answer: 0,
      },
      {
        prompt: "die Dusche",
        options: [
          { emoji: "🛏️", label: "das Bett" },
          { emoji: "📺", label: "der Fernseher" },
          { emoji: "🚿", label: "die Dusche" },
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "L-A1-1",
    level: "A1",
    skill: "lesen",
    domain: "Arbeitssuche",
    instruction: RF,
    title: "Wir suchen Hilfe!",
    text: `Das Café Lindenhof in Wiesenbach sucht eine Kellnerin oder einen Kellner.

Arbeitszeit: Samstag und Sonntag, 9 bis 15 Uhr
Lohn: 24 Franken pro Stunde
Beginn: 1. Mai

Sie sprechen ein wenig Deutsch und sind freundlich. Erfahrung brauchen Sie nicht.

Rufen Sie uns an: 055 555 01 23. Fragen Sie bitte nach Frau Keller.`,
    items: [
      { prompt: "Das Café sucht einen Koch oder eine Köchin.", options: rf(), answer: 1 },
      { prompt: "Die Arbeit ist am Wochenende.", options: rf(), answer: 0 },
      { prompt: "Für eine Stunde Arbeit bekommt man 24 Franken.", options: rf(), answer: 0 },
      { prompt: "Man muss schon in einem Café gearbeitet haben.", options: rf(), answer: 1 },
      { prompt: "Man soll dem Café eine E-Mail schreiben.", options: rf(), answer: 1 },
    ],
  },
  {
    id: "L-A1-2",
    level: "A1",
    skill: "lesen",
    domain: "Kinder",
    instruction: RF,
    text: `Liebe Frau Meier

Mein Sohn Luca wird am Mittwoch, 12. Juni, sechs Jahre alt. Wir machen ein kleines Fest bei uns im Garten. Es beginnt um 14 Uhr und ist um 17 Uhr fertig. Ihre Tochter Nina ist herzlich eingeladen. Es gibt Kuchen und Sirup. Bei Regen feiern wir in der Wohnung.

Bitte antworten Sie bis Freitag.

Freundliche Grüsse
Elena Rossi`,
    items: [
      { prompt: "Luca hat am Mittwoch Geburtstag.", options: rf(), answer: 0 },
      { prompt: "Das Fest dauert zwei Stunden.", options: rf(), answer: 1 },
      { prompt: "Frau Meier ist die Mutter von Nina.", options: rf(), answer: 0 },
      { prompt: "Die Kinder bekommen etwas zu essen.", options: rf(), answer: 0 },
      { prompt: "Bei schlechtem Wetter gibt es kein Fest.", options: rf(), answer: 1 },
    ],
  },
  {
    id: "L-A1-3",
    level: "A1",
    skill: "lesen",
    domain: "Medien und Freizeit",
    instruction: RF,
    title: "Quartierfest Brunnmatt",
    text: `Samstag, 24. August, auf dem Schulhausplatz

11 Uhr: Musik von der Jugendband
12 Uhr: Mittagessen – Suppe und Würste vom Grill
14 Uhr: Spiele für Kinder
16 Uhr: Flohmarkt
20 Uhr: Film im Freien

Der Eintritt ist frei. Das Essen kostet 8 Franken, Kinder essen gratis.

Bitte kommen Sie zu Fuss oder mit dem Velo. Es gibt keine Parkplätze.`,
    items: [
      { prompt: "Das Fest ist am Wochenende.", options: rf(), answer: 0 },
      { prompt: "Der Flohmarkt beginnt am Mittag.", options: rf(), answer: 1 },
      { prompt: "Das Programm beginnt mit Musik.", options: rf(), answer: 0 },
      { prompt: "Alle Personen müssen für das Essen bezahlen.", options: rf(), answer: 1 },
      { prompt: "Man kann beim Fest das Auto parkieren.", options: rf(), answer: 1 },
    ],
  },
  {
    id: "L-A2-1",
    level: "A2",
    skill: "lesen",
    domain: "Behörden",
    instruction: MC,
    text: `Gemeinde Wiesenbach
Einwohnerdienste

Sehr geehrte Frau Petrovic

Sie sind am 1. März nach Wiesenbach gezogen. Herzlich willkommen in unserer Gemeinde!

Bitte melden Sie sich innerhalb von 14 Tagen persönlich am Schalter der Einwohnerdienste an. Bringen Sie Ihren Ausländerausweis, Ihren Mietvertrag und Ihre Krankenkassenkarte mit. Die Anmeldung kostet 30 Franken.

Unser Schalter ist von Montag bis Freitag von 8 bis 12 Uhr geöffnet, am Donnerstag zusätzlich von 14 bis 18 Uhr. Einen Termin brauchen Sie nicht.

Am 5. April laden wir alle neuen Einwohnerinnen und Einwohner zu einem Apéro im Gemeindehaus ein. Die Einladung erhalten Sie später per Post.

Freundliche Grüsse
Marco Baumann
Einwohnerdienste Wiesenbach`,
    items: [
      {
        prompt: "Warum bekommt Frau Petrovic diesen Brief?",
        options: [{ label: "Sie wohnt neu in der Gemeinde." }, { label: "Sie zieht bald aus der Gemeinde weg." }],
        answer: 0,
      },
      {
        prompt: "Wie meldet sich Frau Petrovic an?",
        options: [{ label: "Sie schickt ein Formular per Post." }, { label: "Sie geht selbst zum Schalter." }],
        answer: 1,
      },
      {
        prompt: "Frau Petrovic muss …",
        options: [{ label: "ihren Arbeitsvertrag mitbringen." }, { label: "ihren Mietvertrag mitbringen." }],
        answer: 1,
      },
      {
        prompt: "Am Donnerstagnachmittag ist der Schalter …",
        options: [{ label: "offen." }, { label: "geschlossen." }],
        answer: 0,
      },
      {
        prompt: "Die Einladung zum Apéro …",
        options: [{ label: "liegt bei diesem Brief." }, { label: "kommt in einem anderen Brief." }],
        answer: 1,
      },
    ],
  },
  {
    id: "L-A2-2",
    level: "A2",
    skill: "lesen",
    domain: "Post, Bank und Versicherungen",
    instruction: MC,
    text: `Krankenkasse Lindengut
Kundendienst

Sehr geehrter Herr Oliveira

Ab dem 1. Januar ändert sich Ihre Prämie. Sie bezahlen neu 362 Franken pro Monat. Das sind 18 Franken mehr als bisher. Der Grund sind die höheren Kosten für Arztbesuche und Medikamente.

Möchten Sie sparen? Mit einer höheren Franchise bezahlen Sie jeden Monat weniger Prämie. Auch mit dem Hausarzt-Modell wird es günstiger: Sie gehen dann immer zuerst zu Ihrem Hausarzt.

Wenn Sie etwas ändern möchten, schreiben Sie uns bitte bis zum 30. November. Sie können auch anrufen: Unser Kundendienst berät Sie gratis unter der Nummer 0800 555 014.

Ihre neue Versicherungskarte schicken wir Ihnen im Dezember.

Freundliche Grüsse
Sandra Hofer
Kundendienst`,
    items: [
      {
        prompt: "Was ändert sich im Januar?",
        options: [{ label: "Die Prämie wird teurer." }, { label: "Die Prämie wird günstiger." }],
        answer: 0,
      },
      {
        prompt: "Wie viel hat Herr Oliveira bisher pro Monat bezahlt?",
        options: [{ label: "362 Franken" }, { label: "344 Franken" }],
        answer: 1,
      },
      {
        prompt: "Warum ändert sich die Prämie?",
        options: [
          { label: "Weil Herr Oliveira oft beim Arzt war." },
          { label: "Weil Arztbesuche und Medikamente mehr kosten." },
        ],
        answer: 1,
      },
      {
        prompt: "Was gilt im Hausarzt-Modell?",
        options: [
          { label: "Man kann direkt zu jedem Spezialisten gehen." },
          { label: "Man besucht zuerst immer den gleichen Arzt." },
        ],
        answer: 1,
      },
      {
        prompt: "Herr Oliveira möchte etwas ändern. Bis wann muss er sich melden?",
        options: [{ label: "Bis Ende November" }, { label: "Bis Ende Dezember" }],
        answer: 0,
      },
    ],
  },
  {
    id: "L-A2-3",
    level: "A2",
    skill: "lesen",
    domain: "Gesundheit",
    instruction: MC,
    text: `Liebe Samira

Danke für deine Nachricht! Leider kann ich am Samstag nicht mit dir wandern gehen. Ich bin letzte Woche mit dem Velo gestürzt und habe mir den linken Arm gebrochen. Zwei Tage war ich im Spital, jetzt bin ich wieder zu Hause.

Der Arm tut nicht mehr so weh, aber ich muss den Gips noch fünf Wochen tragen. Kochen und Duschen sind schwierig. Zum Glück kommt meine Schwester jeden Abend vorbei und macht das Abendessen. Arbeiten darf ich erst wieder in zwei Wochen.

Hast du Lust, mich am Sonntag zu besuchen? Wir könnten zusammen Kaffee trinken. Ein Geschenk brauche ich nicht, aber vielleicht hast du ein gutes Buch für mich – mir ist oft langweilig.

Liebe Grüsse
Jonas`,
    items: [
      {
        prompt: "Warum schreibt Jonas?",
        options: [{ label: "Er sagt einen Ausflug ab." }, { label: "Er lädt Samira zu einer Wanderung ein." }],
        answer: 0,
      },
      {
        prompt: "Was ist letzte Woche passiert?",
        options: [
          { label: "Jonas hatte einen Unfall beim Wandern." },
          { label: "Jonas hatte einen Unfall mit dem Velo." },
        ],
        answer: 1,
      },
      {
        prompt: "Wo ist Jonas jetzt?",
        options: [{ label: "Im Spital" }, { label: "In seiner Wohnung" }],
        answer: 1,
      },
      {
        prompt: "Wer kocht im Moment für Jonas?",
        options: [{ label: "Seine Schwester" }, { label: "Seine Freundin Samira" }],
        answer: 0,
      },
      {
        prompt: "Was soll Samira am Sonntag mitbringen?",
        options: [{ label: "Etwas zum Lesen" }, { label: "Einen Kuchen zum Kaffee" }],
        answer: 0,
      },
    ],
  },
  {
    id: "L-B1-1",
    level: "B1",
    skill: "lesen",
    domain: "Arbeitssuche",
    instruction: MC,
    title: "Mitarbeiter/in Reinigung und Hauswartung (60 %)",
    text: `Die Wohnbaugenossenschaft Sonnenhalde in Altenried verwaltet rund 220 Wohnungen in vier Siedlungen. Für unser Team suchen wir per 1. September oder nach Vereinbarung eine zuverlässige Person für die Reinigung und Hauswartung.

Ihre Aufgaben
Sie reinigen Treppenhäuser, Waschküchen und Gemeinschaftsräume. Im Sommer helfen Sie bei der Gartenpflege, im Winter beim Schneeräumen. Kleine Reparaturen, zum Beispiel das Auswechseln von Lampen, erledigen Sie selbstständig. Grössere Schäden melden Sie dem Leiter Hauswartung, der dann eine Fachfirma beauftragt.

Das bringen Sie mit
Eine Berufslehre ist nicht nötig, Sie sollten aber schon einmal in der Reinigung gearbeitet haben. Sie verstehen Deutsch gut und können einfache Rapporte schreiben. Weil die Siedlungen in verschiedenen Quartieren liegen, brauchen Sie den Führerausweis für Personenwagen; ein Geschäftsauto steht zur Verfügung. Sie arbeiten gern draussen, auch bei schlechtem Wetter, und gehen freundlich mit den Bewohnerinnen und Bewohnern um.

Das bieten wir
Sie arbeiten von Montag bis Mittwoch, in der Regel von 7 bis 16 Uhr. Etwa einmal pro Monat haben Sie am Wochenende Pikettdienst; diese Stunden können Sie in der folgenden Woche kompensieren. Wir bieten fünf Wochen Ferien, einen fairen Lohn und bezahlen Weiterbildungskurse.

Interessiert?
Senden Sie Ihren Lebenslauf und Ihre Arbeitszeugnisse bis am 15. Juli per E-Mail an Frau Daniela Wyss. Ein Motivationsschreiben ist nicht nötig. Fragen beantwortet Frau Wyss gern am Telefon, jeweils vormittags.`,
    items: [
      {
        prompt: "Was tut die neue Person, wenn etwas Grösseres kaputt ist?",
        options: [{ label: "Sie informiert ihren Vorgesetzten." }, { label: "Sie bestellt selbst eine Fachfirma." }],
        answer: 0,
      },
      {
        prompt: "Was verlangt die Genossenschaft von den Bewerberinnen und Bewerbern?",
        options: [{ label: "Eine abgeschlossene Lehre" }, { label: "Erfahrung im Putzen" }],
        answer: 1,
      },
      {
        prompt: "Wozu braucht man bei dieser Stelle den Führerausweis?",
        options: [
          { label: "Um von einer Siedlung zur anderen zu kommen." },
          { label: "Um mit dem eigenen Auto zur Arbeit zu fahren." },
        ],
        answer: 0,
      },
      {
        prompt: "Was gilt für die Einsätze am Wochenende?",
        options: [
          { label: "Sie werden als Weiterbildung angerechnet." },
          { label: "Man bekommt dafür später frei." },
        ],
        answer: 1,
      },
      {
        prompt: "Wie bewirbt man sich richtig?",
        options: [
          { label: "Man ruft Frau Wyss am Vormittag an und stellt sich vor." },
          { label: "Man schickt die Unterlagen elektronisch, ohne Begleitbrief." },
        ],
        answer: 1,
      },
      {
        prompt: "Wie sieht die Arbeitswoche normalerweise aus?",
        options: [
          { label: "Man arbeitet an drei Tagen am Anfang der Woche." },
          { label: "Man arbeitet an fünf Tagen jeweils am Vormittag." },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "L-B1-2",
    level: "B1",
    skill: "lesen",
    domain: "Wohnumgebung",
    instruction: MC,
    title: "Hausordnung Birkenweg 12–16",
    text: `Liebe Mieterinnen und Mieter

Damit das Zusammenleben in unserem Haus gut funktioniert, bitten wir Sie, die folgenden Regeln zu beachten.

Ruhezeiten
Von 22 bis 7 Uhr gilt Nachtruhe, von 12 bis 13 Uhr Mittagsruhe. In dieser Zeit stellen Sie Musik und Fernseher bitte auf Zimmerlautstärke. An Sonn- und Feiertagen sind laute Arbeiten wie Bohren oder Hämmern den ganzen Tag verboten. Wer ein Fest plant, informiert die Nachbarn einige Tage vorher.

Waschküche
Jede Wohnung hat einen festen Waschtag pro Woche; den Plan finden Sie an der Tür der Waschküche. Wenn Sie Ihren Tag nicht brauchen, dürfen andere Mieter die Maschinen benutzen, müssen aber vorher bei Ihnen nachfragen. Nach dem Waschen reinigen Sie das Sieb des Tumblers und wischen den Boden.

Treppenhaus
Das Treppenhaus ist ein Fluchtweg. Schuhe, Kinderwagen und Möbel dürfen dort deshalb nicht stehen. Kinderwagen gehören in den Raum neben dem Eingang, Velos in den Velokeller.

Abfall
Kehrichtsäcke stellen Sie frühestens am Abend vor der Abfuhr vor das Haus, sonst reissen Füchse und Katzen sie auf. Glas und Altpapier bringen Sie selbst zur Sammelstelle der Gemeinde.

Balkon
Grillieren ist nur mit einem Elektro- oder Gasgrill erlaubt, weil Holzkohle zu viel Rauch macht.

Bei Fragen wenden Sie sich an den Hauswart, Herrn Gashi. Er ist werktags von 17 bis 18 Uhr telefonisch erreichbar.

Ihre Verwaltung
Immobilien Seeblick AG`,
    items: [
      {
        prompt: "Was gilt am Sonntag für Arbeiten mit der Bohrmaschine?",
        options: [
          { label: "Sie sind nur über Mittag und in der Nacht verboten." },
          { label: "Sie sind zu keiner Tageszeit erlaubt." },
        ],
        answer: 1,
      },
      {
        prompt: "Was erwartet die Verwaltung von Mietern, die Gäste zu einer Party einladen?",
        options: [
          { label: "Sie sagen den anderen Hausbewohnern rechtzeitig Bescheid." },
          { label: "Sie holen beim Hauswart eine Erlaubnis." },
        ],
        answer: 0,
      },
      {
        prompt: "Unter welcher Bedingung darf man am Waschtag einer anderen Wohnung waschen?",
        options: [
          { label: "Wenn die Maschinen gerade nicht laufen." },
          { label: "Wenn die betreffenden Mieter einverstanden sind." },
        ],
        answer: 1,
      },
      {
        prompt: "Warum muss das Treppenhaus leer bleiben?",
        options: [
          { label: "Damit im Notfall alle schnell hinauskommen." },
          { label: "Damit der Hauswart besser putzen kann." },
        ],
        answer: 0,
      },
      {
        prompt: "Weshalb sollen die Abfallsäcke nicht zu früh draussen stehen?",
        options: [
          { label: "Weil die Gemeinde sie sonst nicht mitnimmt." },
          { label: "Weil Tiere sie sonst kaputt machen." },
        ],
        answer: 1,
      },
      {
        prompt: "Was ist auf dem Balkon nicht erlaubt?",
        options: [{ label: "Ein Grill, der mit Gas funktioniert." }, { label: "Ein Grill, der mit Kohle funktioniert." }],
        answer: 1,
      },
    ],
  },
  {
    id: "L-B1-3",
    level: "B1",
    skill: "lesen",
    domain: "Kinder",
    instruction: MC,
    title: "Kita Sternschnuppe – Informationen für Eltern",
    text: `Liebe Eltern

Herzlich willkommen in der Kita Sternschnuppe! Hier finden Sie die wichtigsten Regeln für den Alltag.

Bringen und Abholen
Die Kita ist von Montag bis Freitag von 6.45 bis 18.30 Uhr geöffnet. Bitte bringen Sie Ihr Kind bis spätestens 9 Uhr, denn danach beginnt das gemeinsame Morgenprogramm, und Unterbrechungen sind für die Gruppe unangenehm. Abholen können Sie Ihr Kind ab 16 Uhr. Wenn eine andere Person das Kind abholt, müssen Sie uns das am Morgen mitteilen. Ohne Ihre Information geben wir das Kind niemandem mit – auch nicht den Grosseltern.

Krankheit
Kinder mit Fieber oder einer ansteckenden Krankheit bleiben zu Hause. Erst wenn Ihr Kind einen ganzen Tag ohne Fieber war, darf es wieder kommen. Wird ein Kind bei uns krank, rufen wir Sie an, und Sie holen es möglichst bald ab. Medikamente geben wir nur, wenn Sie ein Formular des Arztes mitbringen.

Essen
Znüni, Mittagessen und Zvieri bereitet unsere Köchin frisch zu. Süssigkeiten von zu Hause sind nicht erwünscht. Eine Ausnahme machen wir beim Geburtstag: Dann darf Ihr Kind einen Kuchen für die Gruppe mitbringen.

Abmeldung und Ferien
Kann Ihr Kind nicht kommen, melden Sie es bitte bis 8 Uhr telefonisch ab. Die Kosten für den Tag müssen Sie trotzdem bezahlen. Zwischen Weihnachten und Neujahr sowie in den letzten zwei Juliwochen bleibt die Kita geschlossen.

Ihr Kita-Team`,
    items: [
      {
        prompt: "Warum sollen die Kinder nicht nach 9 Uhr gebracht werden?",
        options: [
          { label: "Weil die Kita dann die Tür abschliesst." },
          { label: "Weil spätes Ankommen die anderen Kinder stört." },
        ],
        answer: 1,
      },
      {
        prompt: "Die Grossmutter soll das Kind heute abholen. Was ist nötig?",
        options: [
          { label: "Die Eltern müssen die Kita am selben Tag vorher informieren." },
          { label: "Bei den Grosseltern ist keine Meldung nötig." },
        ],
        answer: 0,
      },
      {
        prompt: "Ein Kind hatte Fieber. Wann darf es wieder in die Kita?",
        options: [
          { label: "Sobald der Arzt ein Formular ausgefüllt hat." },
          { label: "Wenn es 24 Stunden fieberfrei geblieben ist." },
        ],
        answer: 1,
      },
      {
        prompt: "Was gilt für Süsses von zu Hause?",
        options: [
          { label: "Es ist nur zu einem besonderen Anlass willkommen." },
          { label: "Es ist nur als Zvieri willkommen." },
        ],
        answer: 0,
      },
      {
        prompt: "Die Eltern melden ihr Kind am Morgen rechtzeitig ab. Was bedeutet das für die Kosten?",
        options: [
          { label: "Der Tag wird ihnen trotzdem verrechnet." },
          { label: "Der Tag wird ihnen nicht verrechnet." },
        ],
        answer: 0,
      },
      {
        prompt: "Wann macht die Kita im Sommer Pause?",
        options: [{ label: "In der ersten Julihälfte" }, { label: "In der zweiten Julihälfte" }],
        answer: 1,
      },
    ],
  },
  {
    id: "L-B2-1",
    level: "B2",
    skill: "lesen",
    domain: "Einkäufe",
    instruction: MC,
    title: "Selber scannen – Fortschritt oder Sparübung?",
    text: `In der Filiale des Detailhändlers Marktfrisch in Oberfeld piepst es seit dem Frühling fast überall. Von den acht bedienten Kassen sind nur noch zwei übrig geblieben; an der Stelle der anderen stehen zwölf Selbstbedienungsstationen. Die Kundschaft scannt ihre Einkäufe selbst, bezahlt mit Karte oder Handy und verlässt den Laden durch eine Schranke.

Filialleiterin Regula Amstutz ist zufrieden. «Über Mittag standen die Leute früher bis zum Brotregal an. Heute ist man in drei Minuten draussen», sagt sie. Stellen seien keine gestrichen worden: Die ehemaligen Kassiererinnen füllten nun Regale auf oder unterstützten die Kundschaft an den Stationen. Dass das Unternehmen mit den Automaten langfristig Lohnkosten senken will, bestreitet sie allerdings nicht.

Genau das stört Beat Zurbuchen von der Gewerkschaft Handel und Verkauf. «Die Arbeit verschwindet nicht, sie wird einfach an die Kundinnen und Kunden weitergegeben – gratis», kritisiert er. Zudem würden Stellen oft nicht neu besetzt, wenn jemand kündige oder in Pension gehe. So baue man Personal ab, ohne dass es jemand merke.

Unter den Kundinnen und Kunden gehen die Meinungen auseinander. Die 34-jährige Pendlerin Aylin Demir schätzt das Tempo: «Für ein Sandwich und ein Getränk will ich nicht anstehen.» Der 78-jährige Hansruedi Lüthi dagegen fährt inzwischen ins Nachbardorf, wo es noch einen kleinen Laden mit Bedienung gibt. Ihm fehle nicht die Geduld für die Technik, sondern das kurze Gespräch an der Kasse. «Für manche von uns war das der einzige Schwatz am Tag», sagt er.

Auch finanziell geht die Rechnung nicht immer auf. Eine Untersuchung der Fachhochschule Seeland zeigt, dass an Selbstbedienungskassen deutlich mehr Waren unbezahlt bleiben – teils aus Absicht, teils aus Versehen. Mehrere Händler haben deshalb die Kontrollen verstärkt, was wiederum Personal bindet und ehrliche Kundinnen und Kunden verärgert.

Ganz zurück zur alten Kasse will kaum jemand. Sinnvoll wäre aber, den Menschen die Wahl zu lassen. Ein Laden, der nur noch auf Automaten setzt, mag effizient sein; ein Treffpunkt im Quartier ist er nicht mehr. Wer beides anbietet, verliert vielleicht ein paar Sekunden – gewinnt aber Kundschaft, die gerne wiederkommt.`,
    items: [
      {
        prompt: "Was hat sich in der Filiale in Oberfeld verändert?",
        options: [
          { label: "Der grösste Teil der Kassen mit Personal wurde durch Automaten ersetzt." },
          { label: "Es gibt gar keine Kassen mit Personal mehr." },
          { label: "Man kann nur noch mit dem Handy bezahlen." },
        ],
        answer: 0,
      },
      {
        prompt: "Wie äussert sich die Filialleiterin zum Thema Lohnkosten?",
        options: [
          { label: "Sie versichert, dass Sparen für das Unternehmen kein Ziel sei." },
          { label: "Sie widerspricht nicht, dass das Unternehmen auf Dauer sparen möchte." },
          { label: "Sie erklärt, die Automaten seien teurer als das Personal." },
        ],
        answer: 1,
      },
      {
        prompt: "Was befürchtet der Gewerkschafter Beat Zurbuchen?",
        options: [
          { label: "Dass Angestellte sofort entlassen werden." },
          { label: "Dass die Kundschaft für das Scannen bezahlen muss." },
          { label: "Dass Arbeitsplätze nach und nach unbemerkt verloren gehen." },
        ],
        answer: 2,
      },
      {
        prompt: "Weshalb kauft Hansruedi Lüthi nicht mehr in der Filiale ein?",
        options: [
          { label: "Er kommt mit den Geräten nicht zurecht." },
          { label: "Er vermisst den persönlichen Kontakt." },
          { label: "Er muss dort zu lange warten." },
        ],
        answer: 1,
      },
      {
        prompt: "Was lässt sich aus der erwähnten Untersuchung schliessen?",
        options: [
          { label: "Selbstbedienungskassen bringen den Händlern auch neue Kosten." },
          { label: "Die meisten Kundinnen und Kunden stehlen mit Absicht." },
          { label: "Kontrollen sind an Selbstbedienungskassen überflüssig geworden." },
        ],
        answer: 0,
      },
      {
        prompt: "Welche Meinung vertritt der Text am Schluss?",
        options: [
          { label: "Selbstbedienungskassen sollten wieder abgeschafft werden." },
          { label: "Geschwindigkeit ist für einen Laden das Wichtigste." },
          { label: "Läden sollten beide Arten von Kassen anbieten." },
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "L-B2-2",
    level: "B2",
    skill: "lesen",
    domain: "Verkehr",
    instruction: MC,
    title: "E-Trottinette: praktisch für die einen, ein Ärgernis für die anderen",
    text: `Seit zwei Jahren kann man in Seewil elektrische Trottinette per App mieten. Rund 400 Fahrzeuge von zwei Anbietern stehen in der Stadt verteilt – oder liegen, wie Kritiker sagen, im Weg. Nun läuft die Bewilligung aus, und der Stadtrat muss entscheiden, wie es weitergeht.

Für Stadträtin Corinne Aebischer, die für den Verkehr zuständig ist, haben die Trottinette ihren Platz in der Stadt. «Sie schliessen die Lücke zwischen Bahnhof und Arbeitsplatz. Wer das letzte Stück schnell zurücklegen kann, lässt eher das Auto stehen», argumentiert sie. Ein Verbot lehnt sie ab; stattdessen möchte sie feste Abstellzonen einführen und die Zahl der Fahrzeuge begrenzen.

Am Nutzen für die Umwelt zweifelt der Verkehrsplaner Lukas Brändli. Er hat im Auftrag der Stadt 600 Nutzerinnen und Nutzer befragt. Das Ergebnis: Nur jede zehnte Fahrt ersetzt eine Autofahrt. Die meisten Befragten wären sonst zu Fuss gegangen oder hätten den Bus genommen. «Ökologisch bringt das wenig, zumal die Geräte jede Nacht mit Lieferwagen eingesammelt und aufgeladen werden», sagt Brändli. Abschaffen würde er sie trotzdem nicht – in Randquartieren mit schlechtem Busangebot seien sie durchaus nützlich.

Deutlicher wird Margrit Stalder vom Verband der Sehbehinderten. Für Menschen, die schlecht sehen oder im Rollstuhl sitzen, seien quer auf dem Trottoir abgestellte Fahrzeuge eine echte Gefahr. «Wir verlangen nicht, dass sie verschwinden. Aber wer ein Trottinett falsch parkiert, soll dafür bezahlen – und zwar der Nutzer, nicht bloss die Firma.»

Die Anbieter zeigen sich gesprächsbereit. Abstellzonen seien technisch kein Problem, erklärt Firmensprecher Dario Monti: Die App könne die Miete erst beenden, wenn das Fahrzeug in einer markierten Zone stehe. Eine Obergrenze von 200 Trottinetten, wie sie im Stadtparlament gefordert wird, hält er hingegen für wirtschaftlich nicht tragbar.

Auch das Spital meldet sich zu Wort. Die Notfallstation behandelt in den Sommermonaten fast jede Woche Verletzte nach Stürzen, häufig spätabends und oft ohne Helm. Eine Helmpflicht steht dennoch nicht zur Diskussion, da die Stadt eine solche gar nicht selbst einführen könnte.

Der Stadtrat will im Herbst entscheiden. Vieles deutet auf einen Kompromiss hin: weniger Fahrzeuge, klare Parkregeln und Bussen für jene, die sich nicht daran halten.`,
    items: [
      {
        prompt: "Warum befasst sich der Stadtrat gerade jetzt mit den Trottinetten?",
        options: [
          { label: "Weil es im Sommer besonders viele Unfälle gab." },
          { label: "Weil die bisherige Erlaubnis für die Anbieter endet." },
          { label: "Weil ein Anbieter die Stadt verlassen will." },
        ],
        answer: 1,
      },
      {
        prompt: "Welche Haltung vertritt Stadträtin Aebischer?",
        options: [
          { label: "Sie möchte die Trottinette aus der Stadt entfernen." },
          { label: "Sie möchte, dass alles so bleibt wie bisher." },
          { label: "Sie möchte das Angebot behalten, aber strenger regeln." },
        ],
        answer: 2,
      },
      {
        prompt: "Was hat die Befragung von Lukas Brändli ergeben?",
        options: [
          { label: "Die Trottinette ersetzen vor allem Wege zu Fuss oder mit dem Bus." },
          { label: "Dank den Trottinetten verzichten die meisten Befragten auf das Auto." },
          { label: "In den Randquartieren werden die Trottinette kaum benutzt." },
        ],
        answer: 0,
      },
      {
        prompt: "Was fordert Margrit Stalder?",
        options: [
          { label: "Ein Verbot der Trottinette auf allen Trottoirs." },
          { label: "Bussen für Personen, die ihr Trottinett falsch abstellen." },
          { label: "Dass allein die Firmen für falsch abgestellte Fahrzeuge bezahlen." },
        ],
        answer: 1,
      },
      {
        prompt: "Wie stehen die Anbieter zu den Vorschlägen?",
        options: [
          { label: "Sie akzeptieren feste Parkzonen, wehren sich aber gegen eine Halbierung der Flotte." },
          { label: "Sie lehnen sowohl Parkzonen als auch eine Obergrenze ab." },
          { label: "Sie akzeptieren eine Obergrenze, halten Parkzonen aber für technisch unmöglich." },
        ],
        answer: 0,
      },
      {
        prompt: "Womit ist nach dem Text im Herbst am ehesten zu rechnen?",
        options: [
          { label: "Mit einem Verbot der Leih-Trottinette." },
          { label: "Mit einer Helmpflicht in der Stadt." },
          { label: "Mit strengeren Regeln für Anbieter und Nutzer." },
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "L-B2-3",
    level: "B2",
    skill: "lesen",
    domain: "Arbeit",
    instruction: MC,
    title: "Zurück ins Büro? Streit ums Homeoffice",
    text: `Drei Tage zu Hause, zwei im Büro: So arbeiteten die 180 Angestellten der Nordlicht Versicherung in Brunnwil in den letzten Jahren. Damit ist ab Januar Schluss. Die Geschäftsleitung verlangt künftig vier Präsenztage pro Woche – und hat damit im Betrieb eine heftige Diskussion ausgelöst.

Geschäftsführer Thomas Riedweg begründet den Schritt mit der Zusammenarbeit. «Die Leute erledigen ihre Aufgaben zu Hause tadellos, darum geht es nicht», betont er. Was fehle, seien die zufälligen Gespräche auf dem Gang, aus denen neue Ideen entstünden. Vor allem Lernende und neue Mitarbeitende kämen zu kurz, wenn erfahrene Kolleginnen und Kollegen nur noch auf dem Bildschirm zu sehen seien.

Die Personalkommission widerspricht. Ihre Präsidentin Nadia Scherrer verweist auf eine interne Umfrage, in der sich drei Viertel der Belegschaft für die bisherige Regelung aussprachen. «Viele haben ihr Leben danach eingerichtet: Sie sind aufs Land gezogen oder haben die Kinderbetreuung reduziert», sagt sie. Wer nun fast täglich eine Stunde pro Weg pendeln müsse, verliere Zeit und Geld. Scherrer befürchtet, dass gerade gut ausgebildete Fachkräfte zu Konkurrenten wechseln, die grosszügiger sind.

Dass es auch andere Stimmen gibt, zeigt das Beispiel von Kundenberater Fabio Catalano. Der 29-Jährige wohnt in einer Einzimmerwohnung und arbeitete bisher am Küchentisch. «Mir ist zu Hause die Decke auf den Kopf gefallen. Ich bin froh, wenn wieder Leben im Büro ist», sagt er. Er versteht aber, dass Eltern das anders sehen.

Die Arbeitspsychologin Ursina Caduff hält die Debatte für falsch geführt. Entscheidend sei nicht die Zahl der Tage, sondern wofür man sie nutze. «Wer ins Büro fährt, um dort allein Videokonferenzen abzuhalten, ärgert sich zu Recht», sagt sie. Sie rät Firmen, gemeinsame Präsenztage für die Teamarbeit festzulegen und konzentriertes Arbeiten weiterhin zu Hause zu ermöglichen. Starre Vorschriften von oben führten erfahrungsgemäss zu stillem Widerstand.

Bei der Nordlicht Versicherung ist das letzte Wort noch nicht gesprochen. Nach den Protesten hat die Geschäftsleitung Gespräche mit der Personalkommission zugesagt. Riedweg schliesst Ausnahmen für Angestellte mit langem Arbeitsweg nicht mehr aus. An seinem Grundsatz will er jedoch festhalten: Das Büro soll wieder der Normalfall sein.`,
    items: [
      {
        prompt: "Was ändert sich für die Angestellten ab Januar?",
        options: [
          { label: "Sie dürfen gar nicht mehr zu Hause arbeiten." },
          { label: "Sie müssen doppelt so oft im Büro sein wie bisher." },
          { label: "Sie dürfen ihre Bürotage frei wählen." },
        ],
        answer: 1,
      },
      {
        prompt: "Womit rechtfertigt der Geschäftsführer die neue Regel?",
        options: [
          { label: "Zu Hause werde weniger gut gearbeitet." },
          { label: "Die Lernenden seien zu oft im Homeoffice." },
          { label: "Der spontane Austausch unter den Angestellten leide." },
        ],
        answer: 2,
      },
      {
        prompt: "Was belegt Nadia Scherrer mit der Umfrage?",
        options: [
          { label: "Eine deutliche Mehrheit möchte beim heutigen Modell bleiben." },
          { label: "Die meisten Angestellten sind aufs Land gezogen." },
          { label: "Viele Fachkräfte haben bereits gekündigt." },
        ],
        answer: 0,
      },
      {
        prompt: "Wie steht Fabio Catalano zur Rückkehr ins Büro?",
        options: [
          { label: "Er lehnt sie wegen des langen Arbeitswegs ab." },
          { label: "Sie ist ihm gleichgültig, weil er keine Kinder hat." },
          { label: "Er freut sich darauf, kann die Kritik anderer aber nachvollziehen." },
        ],
        answer: 2,
      },
      {
        prompt: "Was empfiehlt die Arbeitspsychologin?",
        options: [
          { label: "Möglichst viele Präsenztage vorzuschreiben." },
          { label: "Die Tage im Büro gezielt für gemeinsame Arbeit zu nutzen." },
          { label: "Videokonferenzen nur noch im Büro abzuhalten." },
        ],
        answer: 1,
      },
      {
        prompt: "Wie ist der Stand am Ende des Artikels?",
        options: [
          { label: "Die Regel bleibt im Kern bestehen, Sonderlösungen sind aber denkbar." },
          { label: "Die Geschäftsleitung hat die Regel zurückgezogen." },
          { label: "Die Personalkommission hat der Regel zugestimmt." },
        ],
        answer: 0,
      },
    ],
  },
];
