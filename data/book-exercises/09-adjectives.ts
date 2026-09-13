import { workbookChapter } from "./builder";
const a = workbookChapter("4.1", "Adjective endings", "A2", "An adjective before a noun needs an ending. After a definite article it usually takes -e or -en; without an article it carries the case ending. Ein-words leave some endings to the adjective.");
a.gaps(108,"1",`ending:neu|Vielleicht ist ein {neuer} Fernseher im Paket. Es ist der {neue} Fernseher für Oma.
ending:modern|Vielleicht ist ein {moderner} Computer im Paket. Es ist der {moderne} Computer für Oma.
ending:schön|Vielleicht ist eine {schöne} Wanduhr im Paket. Es ist die {schöne} Wanduhr für Oma.
ending:alt|Vielleicht ist ein {altes} Gemälde im Paket. Es ist das {alte} Gemälde für Oma.
ending:neu|Vielleicht ist eine {neue} Waschmaschine im Paket. Es ist die {neue} Waschmaschine für Oma.`,"fill");
a.gaps(108,"2",`ending:neu|Peter hat sich über das {neue} Fahrrad gefreut.
ending:bunt|Cornelia bekam ein {buntes} Kleid. Sie fand das {bunte} Kleid schrecklich.
ending:spanisch|Konrad bekam ein {spanisches} Kochbuch. Er findet das {spanische} Kochbuch interessant.
ending:gelb|Fiona bekam einen {gelben} Pullover. Sie fand den {gelben} Pullover toll.
ending:klein|Laura bekam eine {kleine} Katze. Sie liebt die {kleine} Katze.
ending:neu|Richard bekam eine {neue} Uhr. Er mag die {neue} Uhr nicht.
ending:elegant|Gabi bekam eine {elegante} Hose. Sie hat sich über die {elegante} Hose gefreut.`,"fill");
a.gaps(108,"3",`ending:frei|Haben Sie noch einen {freien} Tisch?
indefinite|Ich möchte {einen} {guten@ending:gut} Rotwein und {ein} Glas Mineralwasser.
indefinite|Ich nehme {ein} {kühles@ending:kühl} Bier.
indefinite|Ich hätte gern {eine} {französische@ending:französisch} Zwiebelsuppe.
indefinite|Ich hätte gern {ein} {saftiges@ending:saftig} Steak mit Kartoffeln.
indefinite|Ich nehme {eine} {kleine@ending:klein} Käseplatte und {einen} {großen@ending:groß} Obstsalat.`,"fill");
a.gaps(109,"4b",`indefinite|Ich suche {eine} {neue@ending:neu} Handtasche für {meine@ending:mein} Freundin.
ending:ihr|{Ihre} {alte@ending:alt} Tasche ist kaputt.
indefinite|Was für {eine} Tasche möchten Sie?
ending:mein|{Meine} Freundin mag {keine@negative} {modischen@ending:modisch} Sachen.
ending:klassisch|Haben Sie auch ein {klassisches} Modell?
indefinite|Das ist {ein} sehr {schönes@ending:schön} und {praktisches@ending:praktisch} Modell.
indefinite|Die Tasche hat {ein} {kleines@ending:klein} Fach für das Handy.`,"fill");
a.gaps(109,"5",`ending:grün|Man trägt {grüne} T-Shirts.
ending:groß|Man trägt {große} Sonnenbrillen.
ending:kurz|Man trägt {kurze} Röcke.
ending:bunt|Man trägt {bunte} Hüte.
ending:eng|Man trägt {enge} Hosen.
ending:golden|Man trägt {goldene} Sportschuhe.
ending:weiß|Mit {weißen} Blusen liegt man richtig.
ending:weit|Mit {weiten} Hosen liegt man richtig.
ending:lang|Mit {langen} Röcken liegt man richtig.
ending:schwarz|Mit {schwarzen} Pullovern liegt man richtig.`,"fill");
a.gaps(110,"6",`ending:weiß|Essen Sie gern {weiße} Schokolade?
ending:frisch|Essen Sie gern {frisches} Gemüse?
ending:saur|Essen Sie gern {saure} Äpfel?
ending:einheimisch|Essen Sie gern {einheimische} Kräuter?
ending:roh|Essen Sie gern {rohen} Schinken?
ending:reif|Essen Sie gern {reife} Pflaumen?
ending:stark|Trinken Sie gern {starken} Kaffee?
ending:grün|Trinken Sie gern {grünen} Tee?
ending:hell|Trinken Sie gern {helles} Bier?
ending:kalt|Trinken Sie gern {kalte} Limonade?
ending:gut|Trinken Sie gern {guten} Rotwein?
ending:gesund|Trinken Sie gern {gesunden} Obstsaft?`,"fill");
a.gaps(110,"7",`ending:schlecht|Wir haben seit einigen Tagen {schlechtes} Wetter.
ending:kalt|Wir sitzen in unserem {kalten} Hotelzimmer.
ending:heftig|Gestern gab es einen {heftigen} Sturm.
ending:interessant|Das war eine sehr {interessante} Erfahrung.
ending:hoh|Die Ostsee hatte ganz {hohe} Wellen.
ending:schön|Ich habe ein paar {schöne} Fotos davon gemacht.
ending:weiß|An dem {weißen} Sandstrand haben wir uns noch nicht gesonnt.
ending:lang|Wir haben {lange} Spaziergänge gemacht.
ending:teur|Susanne war in den {teuren} Geschäften.
ending:alt|Für einen {alten} Whisky und ein {kühles@ending:kühl} Bier reicht das Geld noch.`,"fill");
a.gaps(110,"8",`indefinite|Ich arbeite bei {einer} {kleinen@ending:klein} Firma.
indefinite|Ich habe {ein} {normales@ending:normal} Gehalt.
negative|Ich habe noch {kein} {eigenes@ending:eigen} Büro und {keinen} {eigenen@ending:eigen} Computer.
ending:mein|{Meine} Kollegen sind nett.
article|Wir trinken {den@article:acc} {dünnen@ending:dünn} Kaffee aus dem Automaten.
indefinite|Wir gehen in {eine} {gemütliche@ending:gemütlich} Kneipe.
ending:mein|{Mein} {neuer@ending:neu} Chef ist auch okay.`,"fill");
a.gaps(110,"9",`indefinite|Wir bitten um {eine} {schnelle@ending:schnell} Bearbeitung.
ending:Ihr|Wir bitten um {Ihren} {neuen@ending:neu} Katalog.
article|Wir bitten um {die@article:acc} {aktuelle@ending:aktuell} Preisliste.
indefinite|Wir bitten um {eine} {sofortige@ending:sofortig} Reparatur.
indefinite|Wir bitten um {einen} {baldigen@ending:baldig} Termin.
indefinite|Wir bitten um {eine} {pünktliche@ending:pünktlich} Lieferung.`,"fill");
const c = workbookChapter("4.2", "Comparisons and superlatives", "A2", "Use the comparative with als and the base form with so/genauso … wie. Superlatives use am …sten or a declined form before a noun. Common irregular forms include gut–besser–best and viel–mehr–meist.");
for (const [n,word] of ["höflich","fleißig","ordentlich","freundlich","geduldig","schnell","hilfsbereit"].entries()) c.choices(112,`1-${n+1}`,`${word}/${word}er/am ${word}sten/${word}ere|Ich bin nicht ${word} genug. Ab morgen bin ich {${word}er}.`);
c.gaps(112,"2",`ending:abwechslungsreicher|Anna hat eine monotone Arbeit. Sie möchte eine {abwechslungsreichere} Arbeit.
ending:netter|Anna hat einen unfreundlichen Chef. Sie möchte einen {netteren} Chef.
ending:zuverlässiger|Anna hat eine unzuverlässige Sekretärin. Sie möchte eine {zuverlässigere} Sekretärin.
ending:heller|Annas Büro ist dunkel. Sie möchte ein {helleres} Büro.
ending:größer|Annas Bildschirm ist klein. Sie möchte einen {größeren} Bildschirm.`,"fill");
const comparisons = `hoch|höher|höchsten
billig|billiger|billigsten
teuer|teurer|teuersten
viel|mehr|meisten
gut|besser|besten
scharf|schärfer|schärfsten
lang|länger|längsten
kurz|kürzer|kürzesten`;
c.choices(112,"3",comparisons.split("\n").flatMap(row=>{const [base,comp,sup]=row.split("|");return [`${base}/${comp}/am ${sup}/${comp}e|${base} → Komparativ: {${comp}}`,`${base}/${comp}/am ${sup}/am ${comp}sten|${base} → Superlativ: {am ${sup}}`];}).join("\n"));
c.gaps(112,"4",`ending:längst|Welches Tier ist am {längsten}? Das {längste} Tier ist der Blauwal.
ending:schnellst|Welches Tier ist am {schnellsten}? Das {schnellste} Tier ist der Gepard.
ending:größt|Welches Tier ist am {größten}? Das {größte} Tier ist die Giraffe.
ending:giftigst|Welches Tier ist am {giftigsten}? Das Buch nennt die {giftigste} Art.
ending:gefährlichst|Welches Tier ist am {gefährlichsten}? Das Buch beschreibt das {gefährlichste} Tier für Menschen.
ending:kleinst|Welches Säugetier ist am {kleinsten}? Das {kleinste} Säugetier ist eine Fledermaus.
ending:schwerst|Welches Insekt ist am {schwersten}? Das {schwerste} Insekt im Text ist ein Käfer.`,"fill");
c.gaps(113,"5",`ending:härtest|Die {härtesten} Teile des menschlichen Körpers sind die Zähne.
ending:längst|Die Autos warteten in dem {längsten} Stau des Jahrhunderts.
ending:ältest|Das {älteste} bekannte gedruckte Buch stammt aus China.
ending:kleinst|Das {kleinste} Buch im Text erschien in einem Leipziger Verlag.
ending:schnellst|Der Text beschreibt die {schnellsten} Aufzüge.`,"fill");
c.gaps(113,"6",`als/wie/so/denn|Zitronen sind saurer {als} Äpfel.
als/wie/so/denn|Ich sehe Krimis genauso gern {wie} romantische Filme.
als/wie/so/denn|Berlin hat mehr Einwohner {als} Hamburg.
als/wie/so/denn|Otto hat genauso hart trainiert {wie} im letzten Jahr.
als/wie/so/denn|Otto ist langsamer gelaufen {als} im letzten Jahr.
als/wie/so/denn|Selbst gekochtes Essen schmeckt besser {als} Fertignahrung.`,"fill");
c.order(114,"7",`In Hamburg|gibt es|mehr Brücken|als in München.
Dresden|hat|weniger Einwohner|als Berlin.
Die Universität Heidelberg|ist|älter|als die Universität Jena.
Die Zugspitze|ist|höher|als der Watzmann.
Der Bodensee|ist|tiefer|als der Königssee.`);
c.gaps(114,"8",`ending:sicherst|In der Statistik im Buch steht Kopenhagen auf Platz eins: die {sicherste} Großstadt.
sicher/sicherer/sicherste/sichersten|München ist laut Buchstatistik genauso {sicher} {wie@als/wie/so/denn} Helsinki.
sicher/sicherer/sicherste/sichersten|Helsinki ist laut Buchstatistik {sicherer} {als@als/wie/so/denn} Wien und Rennes.
gefährlich/gefährlicher/gefährlichste/gefährlichsten|Rennes ist laut Buchstatistik {gefährlicher} {als@als/wie/so/denn} Kopenhagen.
gefährlich/gefährlicher/am gefährlichsten/gefährlichste|Von diesen fünf Städten ist Wien laut Buchstatistik {am gefährlichsten}.
sicher/sicherer/sicherste/sichersten|Diese Städte sind laut Buchstatistik {sicherer} {als@als/wie/so/denn} Berlin.`,"fill");
c.gaps(114,"9",`warm/wärmer/am wärmsten/warmere|In Afrika ist es {wärmer} als in Europa.
teuer/teurer/am teuersten/teurere|Eine Flasche Champagner ist {teurer} als eine Flasche Wasser.
viel/mehr/am meisten/meiste|Eine Fahrkarte für die erste Klasse kostet {mehr} als eine für die zweite Klasse.
langweilig/langweiliger/am langweiligsten/langweiligere|Das neue Buch finde ich {langweiliger} als seine alten Bücher.
gut/besser/am besten/best|Deutsch spreche ich {besser} als Koreanisch.
gern/lieber/am liebsten/liebste|Otto isst Fisch {lieber} als Fleisch.
scharf/schärfer/am schärfsten/scharfer|Indisches Essen ist normalerweise {schärfer} als deutsches Essen.`,"fill");
c.order(114,"9b",`In Europa|ist es|nicht so warm|wie in Afrika.
Eine Flasche Wasser|ist|nicht so teuer|wie eine Flasche Champagner.
Eine Fahrkarte für die zweite Klasse|kostet|nicht so viel|wie eine für die erste Klasse.
Die alten Bücher von Dan Brown|finde ich|nicht so langweilig|wie sein neues Buch.
Koreanisch|spreche ich|nicht so gut|wie Deutsch.
Otto|isst Fleisch|nicht so gern|wie Fisch.
Deutsches Essen|ist|normalerweise nicht so scharf|wie indisches Essen.`);
const n = workbookChapter("4.3", "Numbers and dates", "A1", "German numbers put units before tens: sechsundvierzig. Ordinals usually use -te up to nineteen and -ste from twenty onward. After am/vom/bis zum they end in -en.");
n.choices(116,"1",`fünfundfünfzig/fünfzehn/fünfhundertfünf/fünfundvierzig|Unsere Firma hat {fünfundfünfzig} (55) Mitarbeiter.
elf/eins/zwölf/zehn|Wir haben {elf} (11) Sekretärinnen.
indefinite|Wir haben {eine} (1) Praktikantin.
indefinite|Wir haben {einen} (1) Hauptdirektor.
zwanzig/zwölf/zwei/zweihundert|Wir haben {zwanzig} (20) kleine Büroräume.
drei/dreizehn/dreißig/dreihundert|Wir haben {drei} (3) Großraumbüros.
fünf/fünfzehn/fünfzig/fünfhundert|Wir haben {fünf} (5) Firmenwagen.
sechsundvierzig/vierundsechzig/sechsundvierzehn/sechsundfünfzig|Wir haben {sechsundvierzig} (46) Computer.
neununddreißig/dreiundneunzig/neunzehn/neununddreizehn|Wir haben {neununddreißig} (39) Drucker.
vier/vierzehn/vierzig/vierhundert|Wir haben {vier} (4) Kopierer.
sieben/siebzehn/siebzig/siebenhundert|Wir haben {sieben} (7) Kaffeemaschinen.
zweihundertneunundfünfzigtausendachthundertsechsundsiebzig/zweihundertfünfundneunzigtausendachthundertsechsundsiebzig/zweihundertneunundfünfzigtausendachthundertsiebenundsechzig/zweihundertneunundfünfzigtausendsechshundertachtundsiebzig|259876 → {zweihundertneunundfünfzigtausendachthundertsechsundsiebzig}`);
const dates = `29|neunundzwanzigst|Februar
27|siebenundzwanzigst|März
17|siebzehnt|April
8|acht|Mai
3|dritt|Juni
15|fünfzehnt|Juli
18|achtzehnt|August
1|erst|September
7|siebt|Oktober
11|elft|November
24|vierundzwanzigst|Dezember`;
n.gaps(116,"2",dates.split("\n").map(row=>{const [digit,stem,month]=row.split("|");return `ending:${stem}|Heute ist der {${stem}e} (${digit}.) ${month}.`;}).join("\n"),"fill");
n.gaps(116,"3",`ending:sechst|Thomas Mann wurde am {sechsten} (6.) Juni 1875 geboren.
ending:fünft|Werner Herzog wurde am {fünften} (5.) September 1942 geboren.
ending:vierundzwanzigst|Kaiserin Elisabeth wurde am {vierundzwanzigsten} (24.) Dezember 1837 geboren.
ending:sechst|Sigmund Freud wurde am {sechsten} (6.) Mai 1856 geboren.
ending:einundzwanzigst|Albrecht Dürer wurde am {einundzwanzigsten} (21.) Mai 1471 geboren.
ending:achtzehnt|Rudolf Diesel wurde am {achtzehnten} (18.) März 1858 geboren.`,"fill");
for (const [index,[course,from,to,first,last]] of [
["Deutsch","zweiten Mai","zweiundzwanzigsten November","2.5.","22.11."],
["Italienisch","einundzwanzigsten April","zehnten Juli","21.4.","10.7."],
["Spanisch","neunten Mai","dritten September","9.5.","3.9."],
["Polnisch","ersten Juni","zehnten Oktober","1.6.","10.10."],
["Englisch","dreißigsten Mai","zwölften November","30.5.","12.11."],
["Japanisch","vierundzwanzigsten April","einunddreißigsten August","24.4.","31.8."],
].entries()) { const row=(date:string)=>{const [ordinal,month]=date.split(" ");const stem=ordinal.slice(0,-2);return `{${ordinal}@ending:${stem}} ${month}`;}; n.gaps(117,`4-${index+1}`,`article|Der ${course}kurs beginnt am ${row(from)} (${first}) und endet am ${row(to)} (${last}).
article|Der ${course}kurs läuft vom ${row(from)} (${first}) bis zum ${row(to)} (${last}).`,"fill"); }
n.gaps(117,"5",`ending:neunt|Am {neunten} (9.) Oktober erreichte Phileas Fogg Ägypten.
ending:zwanzigst|Am {zwanzigsten} (20.) Oktober erreichte er Indien.
ending:einunddreißigst|Am {einunddreißigsten} (31.) Oktober erreichte er Indonesien.
ending:sechst|Am {sechsten} (6.) November erreichte er Hongkong.
ending:elft|Am {elften} (11.) November erreichte er China.
ending:vierzehnt|Am {vierzehnten} (14.) November erreichte er Japan.
ending:dritt|Am {dritten} (3.) Dezember erreichte er Amerika.
ending:zweiundzwanzigst|Am {zweiundzwanzigsten} (22.) Dezember war er wieder in England.`,"fill");
n.gaps(117,"6",`ending:fünft|Anton geht in die {fünfte} (5.) Klasse.
ending:viert|Martin studiert im {vierten} (4.) Semester. Vielleicht schafft er die Prüfung beim {zweiten@ending:zweit} Versuch.
ending:erst|Das ist das {erste} (1.) Mal, dass ich Austern esse.
ending:acht|Das ist unsere {achte} (8.) Reise nach Paris.`,"fill");
export default [...a.exercises,...c.exercises,...n.exercises];
