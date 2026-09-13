import { workbookChapter } from "./builder";
// The appendix is intended for speaking partners. These are guided solo
// adaptations of its supplied word banks, not invented personal answers.
const a=workbookChapter("9 · Sprechübungen","Everyday conversations","A1","Match the verb to the speaker and use the case required by the sentence. These guided prompts adapt the book's partner activities for solo practice.");
a.gaps(168,"1",`singen|{Singst} du gerne? — Ja, ich {singe} gern.
tanzen|{Tanzt} du gerne? — Ja, ich {tanze} gern.
reisen|{Reist} du gerne? — Ja, ich {reise} gern.
arbeiten|{Arbeitest} du gerne? — Ja, ich {arbeite} gern.
reden|{Redest} du gerne? — Ja, ich {rede} gern.
telefonieren|{Telefonierst} du gerne? — Ja, ich {telefoniere} gern.
lesen|{Liest} du gerne? — Ja, ich {lese} gern.`);
a.gaps(168,"2a",["ein Instrument spielen","singen","Deutsch sprechen","Auto fahren","tauchen","schnell rennen"].map(action=>`können|{Kannst} du ${action}? — Ja, ich {kann} ${action}.`).join("\n"));
a.gaps(168,"2b",["den Tag","Horrorfilme","Krimis","alte Autos","Bier","Hunde","rote Rosen","Schwarz-Weiß-Fotos"].map(thing=>`mögen|{Magst} du ${thing}?`).join("\n"));
a.order(168,"3",`Ich|möchte|die Konjugation|wiederholen.
Wir|können|viel|sprechen.
Ich|möchte|einen interessanten Text|lesen.
Wir|wollen|keinen Test|schreiben.
Ich|möchte|ein Lied|lernen.
Wir|können|Grammatikübungen|machen.
Ich|möchte|spielen.
Wir|können|Alltagssituationen|üben.`);
a.gaps(169,"5a",`part:singen|Hast du schon mal ein Weihnachtslied {gesungen}?
part:trinken|Hast du schon mal fünfzig Jahre alten Whisky {getrunken}?
part:schneiden|Hast du schon mal Zwiebeln {geschnitten}?
part:lesen|Hast du schon mal eine Patentanmeldung {gelesen}?
part:helfen|Hast du schon mal einem Freund {geholfen}?
part:schlafen|Hast du schon mal in einem Zelt {geschlafen}?
part:finden|Hast du schon mal Geld auf der Straße {gefunden}?
part:treffen|Hast du schon mal einen berühmten Menschen {getroffen}?
part:sehen|Hast du schon mal einen Horrorfilm {gesehen}?`);
a.gaps(169,"5b",`part:fliegen|Bist du schon mal nach New York {geflogen}?
part:kommen|Bist du schon mal zu spät zu einer Prüfung {gekommen}?
part:laufen|Bist du schon mal zehn Kilometer {gelaufen}?
part:bleiben|Bist du schon mal drei Tage im Bett {geblieben}?
part:fahren|Bist du schon mal mit einem Motorrad {gefahren}?
part:gehen|Bist du schon mal zu Fuß zur Arbeit {gegangen}?`);
a.gaps(169,"6",`part:einschalten|Hast du den Computer schon {eingeschaltet}?
part:eingeben|Hast du das Passwort schon {eingegeben}?
part:einlegen|Hast du das Firmenpapier schon {eingelegt}?
part:anrufen|Hast du Frau Müller schon {angerufen}?
part:ausdrucken|Hast du die Dokumente schon {ausgedruckt}?
part:zurückrufen|Hast du Herrn Klein schon {zurückgerufen}?
part:abholen|Hast du die Gäste schon {abgeholt}?
part:weiterleiten|Hast du die E-Mail schon {weitergeleitet}?
part:ausfüllen|Hast du das Formular schon {ausgefüllt}?
part:aufräumen|Hast du deinen Schreibtisch schon {aufgeräumt}?
part:absagen|Hast du den Termin schon {abgesagt}?
part:ausschalten|Hast du den Kopierer schon {ausgeschaltet}?`);
a.gaps(169,"7",`aux|Wann {bist} du gestern aufgestanden?
aux|Wann {hast} du gefrühstückt?
aux|Wann {hast} du mit der Arbeit angefangen?
aux|{Hast} du einen Termin vereinbart?
aux|{Hast} du deine Mutter angerufen?
aux|{Hast} du frisches Gemüse eingekauft?
aux|{Hast} du das Abendessen vorbereitet?
aux|{Hast} du ferngesehen?
aux|Wann {bist} du eingeschlafen?`);
a.gaps(170,"8a",`kochen|Am Montag {kocht} Peter.
sehen|Am Dienstag {sieht} Peter fern.
gehen|Peter {geht} ins Bett.
lernen|Peter {lernt} Deutsch.
hören|Peter {hört} Musik.
kaufen|Peter {kauft} ein.
waschen|Peter {wäscht} Wäsche.
duschen|Peter {duscht}.
beantworten|Peter {beantwortet} E-Mails.
essen|Peter {isst}.
spülen|Peter {spült} das Geschirr.`);
a.gaps(171,"10",`reflexive|Wofür interessierst du {dich}?
reflexive|Worüber ärgerst du {dich}?
reflexive|Worauf freust du {dich}?
reflexive|Wovor fürchtest du {dich}?`,"fill");
a.gaps(171,"11b",`Gurken/Gurke/Gurker/Gurkes|Bring mir zwei {Gurken} mit.
ending:frisch|Bring mir {frisches} Obst mit.
Kartoffeln/Kartoffel/Kartoffels/Kartoffele|Bring mir ein Kilo {Kartoffeln} mit.
Zwiebeln/Zwiebel/Zwiebels/Zwiebele|Bring mir drei {Zwiebeln} mit.
Flaschen/Flasche/Flasches/Flascher|Bring mir zwei {Flaschen} Wein mit.
ending:ungarisch|Bring mir zweihundert Gramm {ungarische} Salami mit.
indefinite|Bring mir {eine} Flasche Bier mit.`,"fill");
const items="Fernseher|einen|keinen;Auto|ein|kein;Regenschirm|einen|keinen;Kugelschreiber|einen|keinen;Villa|eine|keine;Hund|einen|keinen;Katze|eine|keine;Fahrrad|ein|kein;Garten|einen|keinen;Mikrowelle|eine|keine";
a.gaps(172,"12",items.split(";").map(row=>{const [noun,yes,no]=row.split("|");return `indefinite|Hast du {${yes}} ${noun}? — Nein, ich habe {${no}@negative} ${noun}.`;}).join("\n"),"fill");
const belongings="Wörterbuch|das;Kugelschreiber|der;Heft|das;Taschenrechner|der;Handy|das;Laptop|der;Buch|das;Fotoapparat|der";
for(const [index,row] of belongings.split(";").entries()) {const [noun,gender]=row.split("|");a.gaps(172,`13-${index+1}`,`ending:mein|Das ist {mein} ${noun}.
ending:mein|Ich brauche {${gender==="der"?"meinen":"mein"}} ${noun} oft.
ending:mein|Ich arbeite mit {meinem} ${noun}.`,"fill");}
a.gaps(174,"20",`article|Zur Uni fahre ich mit {der@article:dat} Straßenbahn.
article|Zur Arbeit fahre ich mit {dem@article:dat} Bus.
article|Zur Sprachschule fahre ich mit {dem@article:dat} Zug.
article|Zum Bahnhof fahre ich mit {dem@article:dat} Fahrrad.
article|Zur Bäckerei fahre ich mit {dem@article:dat} Motorrad.`,"fill");
const b=workbookChapter("9 · Sprechübungen","Conversation grammar","A2","Apply the same grammar in a short conversation: adjective and pronoun endings, comparative forms, and the case after a preposition.");
b.gaps(172,"14",`deins/deine/deiner/deinen|Hier steht ein Fahrrad. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier liegen Socken. Sind das {deine}?
deins/deine/deiner/deinen|Hier stehen Blumen. Sind das {deine}?
deins/deine/deiner/deinen|Hier liegt eine Pizza. Ist das {deine}?
deins/deine/deiner/deinen|Hier liegt ein Heft. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier steht ein Radio. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier liegt ein Buch. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier steht eine Tasse. Ist das {deine}?
deins/deine/deiner/deinen|Hier stehen Rollschuhe. Sind das {deine}?
deins/deine/deiner/deinen|Hier liegt ein Zettel. Ist das {deiner}?
deins/deine/deiner/deinen|Hier liegt ein Wörterbuch. Ist das {deins~deines}?
deins/deine/deiner/deinen|Hier liegt ein Reiseführer. Ist das {deiner}?
deins/deine/deiner/deinen|Hier liegt ein Kugelschreiber. Ist das {deiner}?`,"fill");
b.gaps(173,"15",`ending:lang|Ich trage einen {langen} Rock.
ending:kurz|Ich trage eine {kurze} Hose.
ending:alt|Ich trage {alte} Schuhe.
ending:hell|Ich trage ein {helles} Hemd.
ending:kariert|Ich trage eine {karierte} Hose.
ending:schwarz|Ich trage eine {schwarze} Bluse.
ending:weich|Ich trage einen {weichen} Kaschmirpullover.
ending:blau|Ich trage {blaue} Jeans.`,"fill");
b.gaps(173,"16",`ending:rund|Er hatte ein {rundes} Gesicht.
ending:groß|Er hatte eine {große} Nase.
ending:kurz|Er hatte {kurze}, {blonde@ending:blond} Haare.
ending:gelb|Er hatte {gelbe} Zähne.
ending:klein|Er hatte {kleine} Ohren.
ending:dick|Er hatte einen {dicken} Bauch.
ending:schwarz|Er trug eine {schwarze} Jacke.
ending:weiß|Er trug ein {weißes} Hemd.
ending:braun|Er trug {braune} Schuhe.
ending:lang|Er trug eine {lange} Hose.
ending:bunt|Er trug eine {bunte} Krawatte.
ending:schwarz|Er trug eine {schwarze} Fliege.
ending:alt|Er trug {alte} Arbeitskleidung.`,"fill");
b.choices(173,"18",`schneller/schnell/am schnellsten/schnellere|Ich arbeite langsam. Ich möchte {schneller} arbeiten.
ruhiger/ruhig/am ruhigsten/ruhigere|Ich bin nervös. Ich möchte {ruhiger} sein.
pünktlicher/pünktlich/am pünktlichsten/pünktlichere|Ich bin oft unpünktlich. Ich möchte {pünktlicher} sein.
besser/gut/am besten/beste|Ich spreche noch nicht so gut Deutsch. Ich möchte {besser} sprechen.
mehr/viel/am meisten/meiste|Ich bleibe oft zu Hause. Ich möchte {mehr} reisen.
fleißiger/fleißig/am fleißigsten/fleißigere|Ich bin faul. Ich möchte {fleißiger} sein.`);
b.gaps(174,"21",`vom/zum/zur/aus der|Ich komme {vom} Bäcker und gehe {zum} Metzger.
vom/zum/zur/aus der|Ich komme {vom} Masseur und gehe {zu@preposition} meiner Tante.
von/zu/nach/in|Ich komme {von} meinem Cousin und gehe {ins@ins/im/zur/nach} Museum.
vom/zum/zur/aus der|Ich komme {aus dem~vom} Supermarkt und gehe {zu@preposition} meinem Schulfreund.
aus der/vom/zum/zur|Ich komme {aus der~von der} Bibliothek und gehe {zum} Gemüsehändler.
vom/zum/zur/aus der|Ich komme {vom} Bahnhof und gehe {zu@preposition} einer Ausstellung.
aus der/vom/zum/zur|Ich komme {aus der~von der} Apotheke und gehe {zur} Autowerkstatt.
zum/vom/zur/aus der|Ich gehe {zum} Schwimmkurs.`,"fill");
b.gaps(174,"22",`indefinite|Ich war schon in {einer} Sauna.
indefinite|Ich war schon in {einem} Fünf-Sterne-Hotel.
article|Ich war schon in {den@article:dat} USA.
article|Ich war schon in {der@article:dat} Schweiz.
article|Ich war schon in {den@article:dat} Alpen.
preposition|Ich war schon {in} Asien.
preposition|Ich war schon {in} Wien.
preposition|Ich war schon {in} Südamerika.
indefinite|Ich war schon in {einem} Zoo.
indefinite|Ich war schon bei {einem} Boxkampf.
preposition|Ich war schon {in} Nordeuropa.
indefinite|Ich war schon bei {einem} Yogakurs.
indefinite|Ich war schon bei {einer} Modenschau.
indefinite|Ich war schon bei {einer} Ausstellungseröffnung.
indefinite|Ich war schon bei {einem} Weihnachtskonzert.`,"fill");
b.order(175,"26",`Als ich klein war,|habe|ich|am liebsten mit Autos gespielt.
Als ich klein war,|habe|ich|gern Schokolade gegessen.
Als ich klein war,|habe|ich|in meiner Freizeit gern gesungen.
Als ich klein war,|habe|ich|gern Zeichentrickfilme gesehen.
Als ich klein war,|habe|ich|gern Märchen gelesen.
Als ich klein war,|habe|ich|mich über Hausaufgaben geärgert.`);
export default [...a.exercises,...b.exercises];
