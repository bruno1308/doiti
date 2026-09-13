import { workbookChapter } from "./builder";
const n=workbookChapter("7.3","Negation","A1","Kein negates an indefinite noun; nicht negates a verb, adjective or other phrase. Place nicht directly before a contrasted phrase, or near the end for whole-sentence negation.");
n.order(145,"1",`Ich|fahre|nicht|mit dem Bus.
Der Hausmeister|kommt|heute|nicht.
Ich|kann|das Dokument|nicht bearbeiten.
Ich|möchte|die E-Mail|nicht sofort beantworten.
Klaus|besucht|uns|am Wochenende nicht.
Tante Anneliese|liegt|nicht|im Krankenhaus.
Ich|habe|das Buch|nicht gelesen.
Das|mache|ich|nicht.`);
n.order(146,"1",`Der Diamantring|ist|nicht|sehr teuer.
Er|kann|dich|nicht hören.
Wir|arbeiten|sonntags|nicht.
Ich|kann|nicht|Golf spielen.`);
n.gaps(146,"2",`negation|Ich gehe {nicht} ans Telefon.
negation|Ich kann die Briefe {nicht} abschicken. Ich habe {keine} Briefmarken.
negation|Heute findet {keine} Besprechung statt.
negation|Ab morgen ist der Chef {nicht} im Büro.
negation|Die Sekretärin kann morgen {nicht} kommen.
negation|Sie hat {keine} richtige Grippe, nur eine Erkältung.
negation|Sie hat {kein} Fieber.
negation|Ich habe die Unterlagen noch {nicht} kopiert.
negation|Die Kaffeemaschine funktioniert {nicht}. Wir können {keinen} Kaffee trinken.`,"fill");
n.gaps(146,"3",`negation|Olaf mag Haustiere. Thomas mag {keine} Haustiere.
negation|Olaf tanzt gern. Thomas tanzt {nicht} gern.
negation|Olaf ist oft unterwegs. Thomas ist {nicht} oft unterwegs.
negation|Olaf ist freundlich. Thomas ist {nicht} freundlich.
negation|Olaf hat viele Freunde. Thomas hat {nicht} viele Freunde.
negation|Olaf möchte einen Garten. Thomas möchte {keinen} Garten.
negation|Olaf kann gut kochen. Thomas kann {nicht} gut kochen.
negation|Olaf ist zufrieden. Thomas ist {nicht} zufrieden.`,"fill");
n.gaps(146,"4",`negation|Das Zimmer hat {keinen} Fernseher, {kein} Radio und {keinen} Internetanschluss.
negation|In der Minibar gibt es {keine} Getränke und im Bad liegen {keine} Handtücher.
negation|Das Zimmer wird {nicht} regelmäßig sauber gemacht.
negation|Du weißt, dass ich abstrakte Kunstwerke {nicht} mag.
negation|Es gab leider {keine} Karten mehr.
negation|Die Sonne scheint und es regnet {nicht}.
negation|Im Technikmuseum hängen {keine} supermodernen Gemälde.
negation|Elisabeth kommt {nicht} mit. Sie interessiert sich {nicht} für Technik.`,"fill");
n.gaps(147,"5",`negation|Man darf das Auto {nicht} direkt vor dem Haus waschen.
negation|Man darf {nicht} auf dem Balkon grillen.
negation|Man darf {keine} Haustiere halten.
negation|Man darf die Wände {nicht} beschmutzen.
negation|Man darf {nicht} im Treppenhaus schreien.
negation|Man darf an Arbeitstagen {keine} Partys veranstalten.
negation|Man darf {nicht} auf das Dach steigen.
negation|Man darf den Hausmeister {nicht} unnötig stören.
negation|Man darf nachts {nicht} Klavier spielen.
negation|Man darf {keine} Fahrräder in den Hausflur stellen.
negation|Man darf {keine} Werbung in die Briefkästen stecken.`,"fill");
n.order(147,"partial-1",`Lassen|Sie die Gebrauchsanweisung|nicht ins Dänische|übersetzen!
Organisieren|Sie die Werbekampagne|nicht|selbst!
Sie|dürfen|die Erfindung nicht erst im nächsten Jahr|zum Patent anmelden!
Ich|bekomme|nicht fünf Prozent,|sondern zehn Prozent!`);
const contrast=workbookChapter("7.3.2","Correcting a statement","A2","Use nicht before the incorrect detail and sondern before the correction. Sondern requires a preceding negative statement.");
contrast.order(148,"2a",`Mozart|spielte|nicht Trompete,|sondern Klavier.
Goethe|wurde|nicht in Köln geboren,|sondern in Frankfurt am Main.
Herta Müller|wurde 2009|nicht mit dem Friedensnobelpreis ausgezeichnet,|sondern mit dem Literaturnobelpreis.
Beckenbauer|spielte|nicht in der österreichischen Nationalmannschaft,|sondern in der deutschen.
Nicht Franz Schubert,|sondern Richard Wagner|komponierte|den „Ring der Nibelungen“.
„Das Leben der anderen“|hat|nicht den afrikanischen Filmpreis gewonnen,|sondern den Oscar.
Rudolf Steiner|hat|nicht die erste Sportschule gegründet,|sondern die erste Waldorf-Schule.
Sigmund Freud|beschäftigte sich|nicht mit dem Körper,|sondern mit der Psyche.
André Lange|ist|nicht als Skispringer bekannt,|sondern als Bobfahrer.
Einstein|erhielt den Nobelpreis|nicht für die Relativitätstheorie,|sondern für die Deutung des fotoelektrischen Effekts.
Martin Luther|übersetzte|nicht griechische Gedichte,|sondern die Bibel ins Deutsche.
Nicht Richard Strauss,|sondern Johann Strauss|schrieb|viele berühmte Walzermelodien.
Johann Sebastian Bach|lebte und arbeitete|nicht in Köln,|sondern in Leipzig.`);
contrast.order(148,"2b",`Tobias|hat gestern Abend|nicht ein Bier getrunken,|sondern sechs.
Tobias|hat seine Ferien|nicht in Italien verbracht,|sondern an der Ostsee.
Tobias|hat|nicht in Nizza ein Haus gekauft,|sondern in Warnemünde ein Eis.
Tobias|hat abends|nicht Kaviar gegessen,|sondern Gemüseeintopf.
Tobias|hat|nicht zehn Millionen Euro auf dem Konto,|sondern zehn Euro.
Tobias|fährt nächstes Wochenende|nicht nach Paris,|sondern nach Bad Tölz.
Sein Bruder|arbeitet in München|nicht als Modedesigner,|sondern als Verkäufer.`);
const q=workbookChapter("7.3.3","Answering negative questions","A1","Doch contradicts a negative question with a positive answer. Nein confirms the negative. Follow the answer sentence to choose the response.");
q.choices(149,"1",`Doch/Nein/Ja/Nicht|Hast du keinen Laptop? — {Doch}, ich habe einen Laptop.
Doch/Nein/Ja/Nicht|Hast du keinen Laptop? — {Nein}, ich habe keinen Laptop.
Doch/Nein/Ja/Nicht|Treibst du keinen Sport mehr? — {Doch}, ich treibe noch Sport.
Doch/Nein/Ja/Nicht|Treibst du keinen Sport mehr? — {Nein}, ich treibe keinen Sport mehr.
Doch/Nein/Ja/Nicht|Gehst du nicht zur Weihnachtsfeier? — {Doch}, ich gehe hin.
Doch/Nein/Ja/Nicht|Gehst du nicht zur Weihnachtsfeier? — {Nein}, ich gehe nicht hin.
Doch/Nein/Ja/Nicht|Isst du nicht gern Gemüse? — {Doch}, ich esse gern Gemüse.
Doch/Nein/Ja/Nicht|Isst du nicht gern Gemüse? — {Nein}, ich esse nicht gern Gemüse.
Doch/Nein/Ja/Nicht|Liebst du ihn nicht mehr? — {Doch}, ich liebe ihn noch.
Doch/Nein/Ja/Nicht|Liebst du ihn nicht mehr? — {Nein}, ich liebe ihn nicht mehr.
Doch/Nein/Ja/Nicht|Gefällt dir das Foto nicht? — {Doch}, es gefällt mir.
Doch/Nein/Ja/Nicht|Gefällt dir das Foto nicht? — {Nein}, es gefällt mir nicht.
Doch/Nein/Ja/Nicht|Ist der Zug nicht pünktlich? — {Doch}, er ist pünktlich.
Doch/Nein/Ja/Nicht|Ist der Zug nicht pünktlich? — {Nein}, er ist nicht pünktlich.
Doch/Nein/Ja/Nicht|Hast du kein Wörterbuch? — {Doch}, ich habe eins.
Doch/Nein/Ja/Nicht|Hast du kein Wörterbuch? — {Nein}, ich habe keins.`);
q.order(149,"2",`Hast|du|nicht mit dem Chef|gesprochen?
Hast|du|den Film|nicht gesehen?
Habt|ihr|das Deutsche Museum|nicht besucht?
Hast|du|die E-Mail|noch nicht geschrieben?
Haben|Sie|die Rechnung|noch nicht bezahlt?`);
export default [...n.exercises,...contrast.exercises,...q.exercises];
