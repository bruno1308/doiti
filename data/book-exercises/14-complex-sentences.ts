import { workbookChapter } from "./builder";
const d=workbookChapter("8.3","Dass clauses","A2","Dass introduces a subordinate statement. Move the conjugated verb to the end; a participle or infinitive comes immediately before it.");
d.order(159,"1",`Wussten Sie schon,|dass|der Hausmeister|zwei Wochen krank war?
Wussten Sie schon,|dass|die Sekretärin|Ärger mit dem Verwaltungsleiter hat?
Wussten Sie schon,|dass|wir|den großen Auftrag nicht bekommen haben?
Wussten Sie schon,|dass|die Einnahmen|zurückgegangen sind?
Wussten Sie schon,|dass|die Firma|sparen muss?
Wussten Sie schon,|dass|die Weihnachtsfeier|dieses Jahr ausfällt?
Wussten Sie schon,|dass|wir|einen neuen Direktor bekommen?
Wussten Sie schon,|dass|der neue Direktor|in London studiert hat?`);
d.order(159,"2",`Der Text berichtet,|dass|Flugzeuge|die sichersten Verkehrsmittel sind.
Der Text berichtet,|dass|die meisten Menschen|an die Liebe auf den ersten Blick glauben.
Der Text berichtet,|dass|Mäuse|singen können.
Der Text berichtet,|dass|kreative Berufe|glücklich machen.
Der Text berichtet,|dass|die Deutschen|jeden Tag durchschnittlich 8,22 Stunden schlafen.
Der Text berichtet,|dass|der Mensch|sieben bis acht Stunden Schlaf braucht.
Der Text behauptet,|dass|Akademiker|oft keine Sozialkompetenz haben.
Der Text berichtet,|dass|Eltern und Kinder|sich am häufigsten über Ordnung und Sauberkeit streiten.`);
d.order(159,"3",`Ich glaube,|dass|der Verkehr|zunimmt.
Ich finde,|dass|Windenergie|eine gute Alternative ist.
Ich glaube,|dass|es|immer weniger Tierarten gibt.
Ich finde,|dass|die Menschen|zu viel Abfall produzieren.
Ich bin der Meinung,|dass|wir|etwas gegen die Luftverschmutzung tun müssen.`);
const z=workbookChapter("8.4","Infinitives with zu","A2","Use zu with infinitive clauses after expressions such as keine Zeit haben, versprechen and vorhaben. Modal verbs use a bare infinitive. With separable verbs, insert zu between prefix and stem.");
z.gaps(161,"1",`zu telefonieren/telefonieren/telefoniert/telefoniert zu|Hier ist es nicht erlaubt, mit dem Handy {zu telefonieren}.
abzuholen/zu abholen/abholen/abgeholt|Ich verspreche, dich vom Bahnhof {abzuholen}.
anzurufen/zu anrufen/anrufen/angerufen|Hör auf, mich zwanzigmal am Tag {anzurufen}!
aufzuräumen/zu aufräumen/aufräumen/aufgeräumt|Ich habe keine Zeit, immer mein Zimmer {aufzuräumen}.
zu lösen/lösen/gelöst/löst|Es ist schwer, alle Aufgaben richtig {zu lösen}.
fernzusehen/zu fernsehen/fernsehen/ferngesehen|Ich empfehle dir, weniger {fernzusehen} und mehr {zu lesen@zu lesen/lesen/gelesen/liest}.`,"fill");
z.gaps(161,"2",`zu machen/machen/gemacht/macht|Frau Müller hat keine Zeit, die Fahrtkostenabrechnung {zu machen}.
abzuholen/zu abholen/abholen/abgeholt|Sie hat keine Zeit, die Gäste {abzuholen}.
zu beantworten/beantworten/beantwortet/beantworten zu|Sie hat keine Zeit, alle E-Mails {zu beantworten}.
zu buchen/buchen/gebucht/bucht|Sie hat keine Zeit, ein Flugticket {zu buchen}.
zu kopieren/kopieren/kopiert/kopiere|Sie hat keine Zeit, die Unterlagen {zu kopieren}.
zu kochen/kochen/gekocht/kocht|Sie hat keine Zeit, Kaffee {zu kochen}.
zu schreiben/schreiben/geschrieben/schreibt|Sie hat keine Zeit, Einladungen {zu schreiben}.
essen zu gehen/zu essen gehen/essen gehen/gegessen gehen|Sie hat keine Zeit, in die Kantine {essen zu gehen}.
zu begrüßen/begrüßen/begrüßt/begrüße|Sie hat keine Zeit, die neue Kollegin {zu begrüßen}.`,"fill");
z.gaps(161,"3",`fahren/zu fahren/gefahren/fährt|Martin will nach Österreich {fahren}. Er hat vor, nach Österreich {zu fahren}.
übernachten/zu übernachten/übernachtet/übernachte|Martin will im Hotel {übernachten}. Er hat vor, dort {zu übernachten}.
fahren/zu fahren/gefahren/fährt|Martin will Ski {fahren}. Er hat vor, Ski {zu fahren}.
essen/zu essen/gegessen/isst|Martin will im Restaurant {essen}. Er hat vor, dort {zu essen}.
teilnehmen/teilzunehmen/zu teilnehmen/teilgenommen|Martin will am Wettkampf {teilnehmen}. Er hat vor, daran {teilzunehmen}.
gewinnen/zu gewinnen/gewonnen/gewinnt|Martin will den Wettkampf {gewinnen}. Er hat vor, ihn {zu gewinnen}.`,"fill");
z.gaps(162,"4",`auszugehen/zu ausgehen/ausgehen/ausgegangen|Carla hat Lust, heute Abend {auszugehen}.
fernsehen/fernzusehen/zu fernsehen/ferngesehen|Otto möchte lieber {fernsehen}.
zu fahren/fahren/gefahren/fährt|Carla hat den Auftrag, zu einer Konferenz {zu fahren}.
schreiben/zu schreiben/geschrieben/schreibt|Otto soll einen Bericht {schreiben}.
zu verbringen/verbringen/verbracht/verbringt|Carla hat vor, den Urlaub im Ausland {zu verbringen}.
bleiben/zu bleiben/geblieben/bleibt|Otto möchte in Deutschland {bleiben}.
umzuräumen/zu umräumen/umräumen/umgeräumt|Carla hat den Wunsch, die Wohnung {umzuräumen}.
verändern/zu verändern/verändert/verändere|Otto will nichts {verändern}.
zu lernen/lernen/gelernt/lernt|Carla macht es Spaß, Englisch {zu lernen}.
lernen/zu lernen/gelernt/lernt|Otto muss Englisch {lernen}.`,"fill");
z.gaps(162,"5",`zu helfen/helfen/geholfen/hilft|Ich verspreche, dir im Haushalt {zu helfen}.
zu kochen/kochen/gekocht/kocht|Ich verspreche, dreimal pro Woche {zu kochen}.
anzurufen/zu anrufen/anrufen/angerufen|Ich verspreche, dich jeden Tag {anzurufen}.
zu verbringen/verbringen/verbracht/verbringt|Ich verspreche, weniger Zeit mit Freunden {zu verbringen}.
zuzuhören/zu zuhören/zuhören/zugehört|Ich verspreche, dir immer {zuzuhören}.
zu schenken/schenken/geschenkt/schenkt|Ich verspreche, dir Blumen {zu schenken}.
zu sein/sein/gewesen/ist|Ich verspreche, zu deiner Mutter nett {zu sein}.
zu fahren/fahren/gefahren/fährt|Ich verspreche, vorsichtiger {zu fahren}.`,"fill");
z.gaps(162,"6",`nehmen/zu nehmen/genommen/nimmt|Benno darf Saxofon-Stunden {nehmen}. Seine Eltern erlauben ihm, Stunden {zu nehmen}.
spielen/zu spielen/gespielt/spielt|Benno darf abends nicht Saxofon {spielen}. Die Eltern erlauben ihm nicht, abends {zu spielen}.
kaufen/zu kaufen/gekauft/kauft|Benno darf kein Handy {kaufen}. Die Eltern erlauben ihm nicht, ein Handy {zu kaufen}.
gehen/zu gehen/gegangen/geht|Benno darf zu seinem Freund {gehen}. Die Eltern erlauben ihm, dorthin {zu gehen}.
übernachten/zu übernachten/übernachtet/übernachte|Benno darf dort nicht {übernachten}. Die Eltern erlauben ihm nicht, dort {zu übernachten}.
teilnehmen/teilzunehmen/zu teilnehmen/teilgenommen|Benno darf am Musikkurs {teilnehmen}. Die Eltern erlauben ihm, daran {teilzunehmen}.`,"fill");
const i=workbookChapter("8.5","Indirect questions","A2","An indirect question keeps its question word and sends the verb to the end. A yes/no question becomes an ob clause.");
i.order(164,"1",`Ich weiß nicht,|wo|die Unterlagen für die Besprechung|sind.
Ich weiß nicht,|ob|Frau Müller die Unterlagen|gestern kopiert hat.
Ich weiß nicht,|wann|die Besprechung|anfängt.
Ich weiß nicht,|ob|Herr Klein die Präsentation|vorbereitet hat.
Ich weiß nicht,|ob|die Praktikantin die Brötchen|bestellt hat.
Ich weiß nicht,|ob|es in der Kantine|belegte Brötchen gibt.
Ich weiß nicht,|ob|die Gäste|schon angekommen sind.
Ich weiß nicht,|warum|der Fotokopierer|nicht geht.
Ich weiß nicht,|wo|die Kaffeemaschine|steht.
Ich weiß nicht,|in welchem Büro|die Besprechung|stattfindet.`);
i.order(164,"2",`Können Sie mir sagen,|wie viel Verspätung|der Zug aus Köln|hat?
Können Sie mir sagen,|wann|der Zug aus Köln|ankommt?
Können Sie mir sagen,|wie lange|die Fahrt nach Dortmund|dauert?
Können Sie mir sagen,|ob|der Zug|auch in Wuppertal hält?
Können Sie mir sagen,|wo|ich Fahrkarten für internationale Züge|bekomme?
Können Sie mir sagen,|ob|ich im Zug etwas Warmes|essen kann?
Können Sie mir sagen,|von welchem Gleis|der Zug nach Essen|fährt?
Können Sie mir sagen,|wie spät|es|jetzt ist?
Können Sie mir sagen,|ob|ich mein Fahrrad kostenlos|mitnehmen darf?
Können Sie mir sagen,|ob|ich eine Platzkarte|bestellen muss?`);
i.order(164,"3",`Der Polizist wollte wissen,|ob|ich|allein zu Hause war.
Der Polizist wollte wissen,|wann|ich Frau Krüger|zum letzten Mal gesehen habe.
Der Polizist wollte wissen,|was für ein Mensch|Frau Krüger|ist.
Der Polizist wollte wissen,|ob|Frau Krüger|mit jemandem Ärger hatte.
Der Polizist wollte wissen,|wie|mein Verhältnis zu Frau Krüger|ist.
Der Polizist wollte wissen,|ob|Frau Krüger|oft verreist ist.
Der Polizist wollte wissen,|ob|Frau Krüger|einen Liebhaber hatte.
Der Polizist wollte wissen,|ob|mir sonst etwas Besonderes|aufgefallen ist.`);
i.order(165,"4",`Wissen Sie,|in welchem Jahr|die deutsche Nationalelf die Weltmeisterschaft|gewonnen hat?
Wissen Sie,|was|die Abkürzung SPD|bedeutet?
Wissen Sie,|welche Stadt|damals Hauptstadt der Bundesrepublik|war?
Wissen Sie,|welcher Fluss|durch Deutschland und Österreich|fließt?
Wissen Sie,|wie|das deutsche Parlament|heißt?
Wissen Sie,|wann|Werner von Siemens den Dynamo|erfand?
Wissen Sie,|was|das Lieblingsgetränk der Deutschen|ist?
Wissen Sie,|wie viele Menschen|Deutsch als Muttersprache|haben?`);
const r=workbookChapter("8.6","Relative clauses","A2","A relative clause describes a noun. Choose its pronoun according to gender and number, then use the case required inside the clause. The conjugated verb goes last.");
r.gaps(166,"1",`relative:n|Übernachtest du in dem Hotel, {das} einen großen Swimmingpool hat?
die/denen/dem/der|Sind dort die weichen Betten, in {denen} man so gut schlafen kann?
relative:m|Hat das Hotel einen Koch, {der} sehr berühmt ist?
relative:m|Kann man dort den Wein kaufen, {den} du mir geschenkt hast?
relative:m|War da nicht der Kellner, in {den} du dich verliebt hast?
relative:n|Gab es dort ein Badezimmer, in {dem} ein Whirlpool war?`,"fill");
r.choices(167,"2",`relative:f|Ein Geschenk ist eine Sache, über {die} sich jeder freut.
relative:m|Ein Ball ist ein runder Gegenstand, mit {dem} Kinder gerne spielen.
relative:f|Ein Schauspieler ist eine Person, {die} im Theater arbeitet.
relative:m|Neujahr ist ein Tag, {den} man in vielen Ländern feiert.
relative:m|Ein Lebenslauf ist ein Text, in {dem} wir über unsere Ausbildung berichten.
relative:n|Ein Lehrbuch ist ein Buch, mit {dem} man eine Fremdsprache lernen kann.
relative:pl|Nachbarn sind Menschen, {die} neben uns wohnen.
relative:n|Das Wetter ist ein Thema, über {das} man sich manchmal unterhält.`);
r.order(167,"3",`Hast du den Porsche gesehen,|der|uns|gerade überholt hat?
Hast du die Weinflasche gesehen,|die|ich gestern in den Kühlschrank|gestellt habe?
Hast du die Dokumente gesehen,|die|ich auf den Kopierer|gelegt habe?
Hast du den Kollegen gesehen,|mit dem|ich vor einer Stunde|gesprochen habe?
Hast du den Kuchen gegessen,|den|Frau Müller|mitgebracht hat?
Hast du die E-Mail gelesen,|die|der Chef gestern an alle|geschickt hat?`);
r.order(167,"4",`Martha hat ein Kleid bekommen,|das|ihr|nicht passt.
Paul hat einen Papagei bekommen,|der|sprechen|kann.
Ingrid hat Stiefel bekommen,|die|viel zu hohe Absätze|haben.
Sarah hat eine Opernkarte bekommen,|die|sie in Geld|umtauschen will.
Opa hat ein Buch bekommen,|in dem|viele Informationen über Obstbäume|stehen.
Paul hat einen Fernseher bekommen,|für den|er in seinem Zimmer|keinen Platz hat.
Inge hat einen Fotoapparat bekommen,|mit dem|sie professionelle Fotos|machen kann.
Oma hat ein Telefon bekommen,|auf dem|man die Zahlen besser|erkennen kann.`);
export default [...d.exercises,...z.exercises,...i.exercises,...r.exercises];
