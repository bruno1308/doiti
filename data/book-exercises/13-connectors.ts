import { workbookChapter } from "./builder";
const c=workbookChapter("8.1","Connecting main clauses","A2","Denn, aber, sondern, und and oder connect main clauses without changing their word order. Deshalb and trotzdem take a sentence position, so the verb follows immediately when they start the clause.");
c.gaps(151,"1",`denn/weil/deshalb/trotzdem|Ich muss absagen, {denn} ich bin krank.
und/weil/deshalb/dass|Ich muss Peter anrufen {und} du musst Karl schreiben.
aber/weil/deshalb/dass|Ich kann dir Geld leihen, {aber} du musst es morgen zurückgeben.
oder/weil/deshalb/dass|Ihr könnt zu uns kommen {oder} wir können uns im Restaurant treffen.
denn/weil/deshalb/trotzdem|Ich kann nicht mitkommen, {denn} ich muss meine Tante besuchen.
sondern/weil/deshalb/dass|Ich organisiere die Reise nicht selbst, {sondern} ich buche im Reisebüro.
aber/weil/deshalb/dass|Ich wollte mit dir sprechen, {aber} du warst nicht im Büro.`,"fill");
c.gaps(151,"2",`sondern/weil/deshalb/dass|Ich bin nicht mit dem Fahrrad gekommen, {sondern} ich habe das Auto genommen.
aber/weil/deshalb/dass|Ich wollte anrufen, {aber} ich habe mein Handy vergessen.
denn/weil/deshalb/trotzdem|Ich komme später, {denn} ich stehe im Stau.
aber/weil/deshalb/dass|Ich habe lange gewartet, {aber} der Bus ist nicht gekommen.
denn/weil/deshalb/trotzdem|Ich musste laufen, {denn} alle Busfahrer streiken.
sondern/weil/deshalb/dass|Ich bin nicht zu spät, {sondern} du bist zu früh.`,"fill");
c.gaps(151,"3",`sondern/weil/deshalb/dass|Wir gehen nicht zusammen essen, {sondern} wir treffen uns erst um sechzehn Uhr.
sondern/weil/deshalb/dass|Ich studiere nicht mehr, {sondern} ich arbeite seit zwei Jahren.
aber/weil/deshalb/dass|Mein Chef ist nett, {aber} seine Sekretärin ist unfreundlich.
aber/weil/deshalb/dass|Ich komme gern, {aber} ich muss um elf zu Hause sein.
sondern/weil/deshalb/dass|Wir treffen uns nicht heute, {sondern} wir sehen uns morgen.`,"fill");
c.order(152,"1",`Gerda mag Krimis,|deshalb|verpasst|sie keine Krimiserie.
Mathildes Hobby ist Gartenarbeit,|deshalb|findet|sie Sendungen über Landschaftsgestaltung interessant.
Georg interessiert sich für Biologie,|deshalb|läuft|bei ihm immer Discovery Channel.
Karl mag Zeichentrickfilme,|deshalb|schaltet|er den Fernseher vormittags ein.
Paula informiert sich über die Welt,|deshalb|sieht|sie sich jeden Abend die Tagesschau an.
Kathrin ist Romantikerin,|deshalb|sieht|sie gern Liebesfilme.
Laura mag alle Fernsehsendungen,|deshalb|sitzt|sie immer vor dem Fernseher.`);
c.gaps(153,"2",`deshalb/trotzdem/denn/weil|Herta mag ihre Ruhe, {deshalb} wohnt sie alleine.
deshalb/trotzdem/denn/weil|Felix ist schon dreißig, {trotzdem} wohnt er noch bei seinen Eltern.
deshalb/trotzdem/denn/weil|Sie bekommen ein Kind, {deshalb} suchen sie eine größere Wohnung.
deshalb/trotzdem/denn/weil|Konrad wohnt weit weg, {trotzdem} will er nicht umziehen.
deshalb/trotzdem/denn/weil|Carla hat viel Geld, {trotzdem} wohnt sie in einer Einzimmerwohnung.
deshalb/trotzdem/denn/weil|Robert wohnt gern mit anderen zusammen, {deshalb} mietet er ein WG-Zimmer.
deshalb/trotzdem/denn/weil|Casper hat eine französische Freundin, {deshalb} möchte er nach Frankreich ziehen.`,"fill");
c.order(153,"3",`Ich habe wenig Geld,|deshalb|mache|ich nur einen kurzen Urlaub.
Gerda verdient gut,|trotzdem|ist|sie sehr sparsam.
Rita mag Kinder,|deshalb|möchte|sie Kindergärtnerin werden.
Olga hat ein schlechtes Abiturzeugnis,|trotzdem|möchte|sie Medizin studieren.
Ich habe Halsschmerzen,|deshalb|bleibe|ich zu Hause.
Tante Käthe interessiert sich für Tiere,|deshalb|geht|sie jeden Mittwoch in den Zoo.
Jenny will nicht gestört werden,|deshalb|schaltet|sie ihr Handy aus.`);
c.gaps(153,"4",`deshalb/trotzdem/denn/weil|Ich wohne jetzt in Frankfurt, {deshalb} habe ich mich so lange nicht gemeldet.
und/weil/deshalb/dass|Ich habe einen neuen Job {und} eine neue Freundin habe ich auch.
sondern/weil/deshalb/dass|Ich arbeite nicht bei einer Bank, {sondern} ich gebe Italienischunterricht.
trotzdem/deshalb/denn/weil|Einige Teilnehmer sind fleißig, {trotzdem} machen sie nur langsam Fortschritte.
denn/weil/deshalb/trotzdem|Ich verstehe das, {denn} ich kenne die Probleme beim Sprachenlernen.
aber/weil/deshalb/dass|Mein Deutsch ist besser geworden, {aber} es ist noch nicht gut genug.
deshalb/trotzdem/denn/weil|Ich muss mehr sprechen, {deshalb} rede ich mit meiner Freundin Deutsch.
denn/weil/deshalb/trotzdem|Das ist seltsam, {denn} wir haben früher Italienisch gesprochen.
und/weil/deshalb/dass|Wir gehen in eine Kneipe {und} wir trinken ein Glas Apfelwein.`,"fill");
const s=workbookChapter("8.2","Subordinate clauses","A2","The conjugated verb goes to the end after weil, obwohl, wenn and als. Weil gives a reason, obwohl a contrast, wenn a condition or repeated event, and als a single past event or period.");
s.order(155,"1",`Ich habe gute Laune,|weil|ich|heute nicht arbeiten muss.
Ich habe gute Laune,|weil|mein Chef|heute nicht da ist.
Ich habe gute Laune,|weil|der Deutschkurs|heute ausfällt.
Ich habe gute Laune,|weil|das Semester|zu Ende ist.
Ich habe gute Laune,|weil|ich|im Lotto gewonnen habe.
Ich habe gute Laune,|weil|ich|eine neue Stelle gefunden habe.
Ich habe gute Laune,|weil|ich|meine Sprachprüfung bestanden habe.
Ich habe gute Laune,|weil|ich|mich verliebt habe.`);
s.gaps(155,"2a",`weil/obwohl/denn/deshalb|Joachim ist gestresst, {weil} er heute seine Ergebnisse präsentieren muss.
weil/obwohl/denn/deshalb|Peter lernt nicht, {obwohl} er morgen eine wichtige Prüfung hat.
weil/obwohl/denn/deshalb|Karl hat Paul nicht eingeladen, {obwohl} sie gute Freunde sind.
weil/obwohl/denn/deshalb|Petra darf nicht Auto fahren, {weil} sie erst sechzehn ist.
weil/obwohl/denn/deshalb|Klaus spricht kein Italienisch, {obwohl} er seit zwei Jahren in Rom wohnt.
weil/obwohl/denn/deshalb|Kathrin hat nicht angerufen, {obwohl} sie es versprochen hat.
weil/obwohl/denn/deshalb|Ilona isst viel Schokolade, {obwohl} sie abnehmen möchte.
weil/obwohl/denn/deshalb|Dagmar nimmt Nachhilfe, {weil} sie schlechte Noten hat.`,"fill");
s.order(155,"2b",`Weil er heute seine Ergebnisse präsentieren muss,|ist|Joachim|gestresst.
Obwohl er morgen eine wichtige Prüfung hat,|lernt|Peter|nicht.
Obwohl sie gute Freunde sind,|hat|Karl|Paul nicht eingeladen.
Weil sie erst sechzehn ist,|darf|Petra|nicht Auto fahren.
Obwohl er seit zwei Jahren in Rom wohnt,|spricht|Klaus|kein Italienisch.
Obwohl sie es versprochen hat,|hat|Kathrin|nicht angerufen.
Obwohl sie abnehmen möchte,|isst|Ilona|viel Schokolade.
Weil sie schlechte Noten hat,|nimmt|Dagmar|Nachhilfe.`);
s.order(156,"3a",`Ich finde es toll,|wenn|die Geschichte|spannend ist.
Ich finde es toll,|wenn|der Film|nicht zu lange dauert.
Ich finde es toll,|wenn|die Hauptfigur|sympathisch ist.
Ich finde es toll,|wenn|der Film|eine wahre Geschichte erzählt.
Ich finde es toll,|wenn|der Film|ein Happy End hat.`);
s.order(156,"3b",`Ich mag es nicht,|wenn|der Film|nicht synchronisiert ist.
Ich mag es nicht,|wenn|der Film|nur aus Actionszenen besteht.
Ich mag es nicht,|wenn|der Held|am Ende stirbt.
Ich mag es nicht,|wenn|die Dialoge|nicht witzig sind.
Ich mag es nicht,|wenn|die Leute im Kino|ihr Handy nicht ausschalten.`);
s.order(156,"4",`Als Otto noch klein war,|hat|er|am liebsten mit Matchboxautos gespielt.
Als Max und Moritz noch klein waren,|haben|sie|sich immer gestritten.
Als Anna fünf Jahre alt war,|hat|sie|zum ersten Mal im Chor gesungen.
Als ich acht Monate alt war,|habe|ich|meinen ersten Schritt gemacht.
Als Boris ein Jahr alt war,|hat|er|sein erstes Wort gesagt.
Als Martin drei Jahre alt war,|ist|er|zum ersten Mal ins Puppentheater gegangen.`);
s.gaps(156,"5",`als/wenn/denn/deshalb|Sie hat sich nie gelangweilt, {wenn} sie alleine war.
als/wenn/denn/deshalb|{Als} sie sechs wurde, bekam sie ihr erstes Fahrrad.
als/wenn/denn/deshalb|{Als} ihr Bruder geboren wurde, freute sie sich.
als/wenn/denn/deshalb|{Wenn} sie mit ihrem Bruder spielte, gab es oft Streit.
als/wenn/denn/deshalb|Es war nicht leicht, {als} wir 2002 umgezogen sind.
als/wenn/denn/deshalb|Wir waren stolz, {als} sie einmal einen Wettbewerb gewann.
als/wenn/denn/deshalb|Es war komisch, {als} sie sich zum ersten Mal verliebte.
als/wenn/denn/deshalb|Wir freuen uns immer, {wenn} sie uns besucht.`,"fill");
s.gaps(157,"6",`wenn/als/denn/deshalb|Das passiert mir auch, {wenn} ich so spät ins Bett gehe.
als/wenn/denn/deshalb|{Als} ich im ersten Studienjahr war, verpasste ich oft die Vorlesung.
weil/wenn/als/denn|Ich habe nichts mitgeschrieben, {weil} ich darüber schon viel weiß.
wenn/als/denn/deshalb|{Wenn} du so schlau bist, kannst du mir helfen.
wenn/als/denn/deshalb|{Wenn} ich Zeit habe, mache ich das gerne.`,"fill");
s.choices(157,"7",`als/wenn/weil/obwohl|{Als} ich achtzehn wurde, durfte ich mit Freunden Urlaub machen.
weil/als/obwohl/denn|Wir fuhren in den Schwarzwald, {weil} die Eltern dort eine Ferienwohnung hatten.
obwohl/weil/wenn/denn|{Obwohl} einiges schiefging, fanden wir den Urlaub schön.
weil/obwohl/denn/deshalb|Wir haben den Zug verpasst, {weil} wir zu spät aufgestanden sind.
weil/obwohl/denn/deshalb|Wir gingen ohne Abendessen ins Bett, {weil} Otto zu viel Salz verwendet hatte.
obwohl/weil/denn/deshalb|Wir sind viel gewandert, {obwohl} es geregnet hat.
wenn/als/denn/deshalb|Ich muss immer lachen, {wenn} ich an die Reise denke.`);
s.gaps(157,"8",`wenn/als/denn/deshalb|{Wenn} man das Wort Dönerkebab hört, denkt man an die Türkei.
weil/obwohl/denn/deshalb|Der Text widerspricht, {weil} er die Erfindung Deutschland zuschreibt.
als/wenn/denn/deshalb|{Als} Mahmut sechzehn war, zog er nach Deutschland.
obwohl/weil/denn/deshalb|{Obwohl} er gründlich recherchiert hat, fand er kein geeignetes Gericht.
als/wenn/denn/deshalb|Es war 1971, {als} er seinen ersten Döner verkaufte.
weil/obwohl/denn/deshalb|Fastfood-Ketten könnten neidisch sein, {weil} die Döner-Industrie viel Geld verdient.
obwohl/weil/denn/deshalb|{Obwohl} Döner großen Erfolg hat, wurde Mahmut nicht Millionär.
wenn/als/denn/deshalb|{Wenn} er ein Patent angemeldet hätte, wäre er reich geworden.`,"fill");
export default [...c.exercises,...s.exercises];
