// Rating rules of the SDS as published in the Testhandbuch (06.10.2023), sections 7.4 and 7.5.
// The level descriptors are the CEFR descriptors the handbook uses.

export const levels = ["preA1", "A1", "A2", "B1", "B2"] as const;

export const speakingRubric = `Bewertung Sprechen (SDS-Testhandbuch 7.4)
Voraussetzung: Die kommunikative Aufgabe des Niveaus muss mit inhaltlich relevanten Antworten bewältigt sein. Wer mit irrelevanten Äusserungen antwortet, bekommt das Niveau nicht.
Danach zählen vier Kriterien. Ein Niveau gilt als erreicht, wenn mindestens 3 von 4 Kriterien auf diesem Niveau erfüllt sind. Die Aussprache ist kein Kriterium, solange die Person verständlich ist. Schweizerdeutsch ist erlaubt und kein Fehler.

Aufgaben pro Niveau: vor A1 Fragen zu persönlichen Angaben beantworten | A1 sich vorstellen | A2 einen Ablauf beschreiben | B1 eine Hypothese oder Pläne begründen (drei Beispiele mit Begründung) | B2 eine kurze Präsentation über Vor- und Nachteile eines Themas halten, die eigene Meinung schildern und begründen.

Wortschatz
- vor A1: sehr einfacher Wortschatz und Wendungen zur eigenen Person.
- A1: elementarer Vorrat an einzelnen Wörtern und Wendungen für bestimmte konkrete Situationen.
- A2: begrenzter Wortschatz für konkrete Alltagsbedürfnisse.
- B1: ausreichend grosser Wortschatz, um sich mit einigen Umschreibungen über die meisten Themen des eigenen Alltags zu äussern (Familie, Hobbys, Arbeit, Reisen, aktuelle Ereignisse).
- B2: grosser Wortschatz im eigenen Sachgebiet und in den meisten allgemeinen Themenbereichen; kann Formulierungen variieren; Lücken können zu Zögern und Umschreibungen führen.

Korrektheit
- vor A1: sehr einfache Wortstellung in kurzen Aussagesätzen.
- A1: begrenzte Beherrschung weniger einfacher Strukturen und Satzmuster aus einem gelernten Repertoire.
- A2: einige einfache Strukturen korrekt, aber noch systematisch elementare Fehler (Zeitformen vermischt, Subjekt-Verb-Kongruenz); trotzdem wird in der Regel klar, was gemeint ist.
- B1: verwendet ein Repertoire häufiger Wendungen für vorhersehbare Situationen ausreichend korrekt.
- B2: gute Beherrschung der Grammatik; keine Fehler, die zu Missverständnissen führen; einfache Strukturen sicher, einige komplexe Formen, diese teils unflexibel oder ungenau.

Flüssigkeit
- vor A1: sehr kurze, isolierte, eingeübte Äusserungen.
- A1: sehr kurze, isolierte, meist vorgefertigte Äusserungen mit vielen Pausen.
- A2: kann kurze Gespräche über Vertrautes meistern, stockt aber offensichtlich häufig und setzt neu an.
- B1: drückt sich ohne viel Stocken verständlich aus, mit deutlichen Pausen zum Planen und Korrigieren, vor allem bei längeren freien Beiträgen.
- B2: recht gleichmässiges Tempo; zögert gelegentlich, aber kaum auffällig lange Pausen.

Kohärenz und Kohäsion
- vor A1: isolierte Wörter und sehr einfache vorgefertigte Äusserungen.
- A1: verbindet Wörter oder Wortgruppen mit sehr einfachen Konnektoren wie «und», «dann».
- A2: verknüpft Wortgruppen mit einfachen Konnektoren wie «und», «aber», «weil».
- B1: bildet längere Sätze und verbindet sie mit einer begrenzten Zahl von Kohäsionsmitteln, z. B. in einer Erzählung.
- B2: klar zusammenhängender Diskurs mit verschiedenen Verknüpfungsmitteln; längere Beiträge eventuell etwas sprunghaft.`;

export const writingRubric = `Bewertung Schreiben (SDS-Testhandbuch 7.5)
Bewertet wird von oben nach unten: zuerst die Aufgabe auf dem höchsten Niveau. Erreicht sie den Grenzwert, gilt dieses Niveau; sonst wird die nächsttiefere Aufgabe bewertet. Das Ergebnis ist das höchste Niveau, dessen Aufgabe den Grenzwert erreicht.

vor A1 (Formular) und A1 (Textnachricht): Es zählen nur die Erfüllung der kommunikativen Aufgabe und die Verständlichkeit. Fehler in Rechtschreibung, Grammatik und Wortwahl spielen keine Rolle, solange eine lesende Person versteht, was gemeint ist.

A2 bis B2: Voraussetzung ist, dass die kommunikative Aufgabe erfüllt ist: Alle verlangten Punkte sind mit inhaltlich relevanten Aussagen behandelt, und die verlangte Länge ist ungefähr erreicht. Ist sie nicht erfüllt, ist das Niveau nicht erreicht. Danach zählen drei Kriterien; mindestens 2 von 3 müssen auf dem Niveau erfüllt sein.

Kohärenz und Kohäsion
- A2: listenhaft; einzelne Wendungen und Sätze, verknüpft mit einfachen Konnektoren (und, aber, weil, dass).
- B1: linear strukturiert; Argumente mit gängigen Verbindungsmitteln verbunden (deswegen, deshalb, sondern, obwohl).
- B2: klar nachvollziehbar strukturiert; Argumente mit korrekt genutzten Verbindungsmitteln zueinander in Beziehung gesetzt (weshalb, dagegen, dennoch, trotz, obschon).

Grammatische Korrektheit
- A2: systematisch elementare Fehler (z. B. Zeitformen); in der Regel versteht man aber, was gemeint ist.
- B1: einige Fehler in Grammatik, Rechtschreibung und Zeichensetzung; der Text bleibt verständlich und man kann ihm folgen.
- B2: vereinzelt Fehler, vor allem bei komplexen Strukturen; das Verständnis ist nicht beeinträchtigt.

Wortschatz
- A2: reicht, um einzelne relevante Informationen einfach und direkt mitzuteilen.
- B1: reicht für Beschreibungen, Meinungen und Begründungen auf unkomplizierte Weise; einige Umschreibungen und Wiederholungen.
- B2: breit genug, um Argumente, Meinungen und Begründungen mit einigen Details auszudrücken und abzuwägen; Formulierungen werden variiert.

Schweizer Rechtschreibung (ss statt ß) und Schweizer Wortschatz sind korrekt, ß ebenfalls.`;
