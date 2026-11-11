import type { SpeakingTask } from "../../lib/sds/types";

// The interview always opens with this question; the examiner uses it to choose the starting level.
export const openingQuestion = "Stellen Sie sich bitte vor.";

// Original question sets modelled on the public SDS speaking formats and on the
// topics candidates report: personal details, self-introduction, describing a
// routine, hypotheses and plans with reasons, and a short pros-and-cons talk.
export const sprechenTasks: SpeakingTask[] = [
  { id: "P-preA1-1", level: "preA1", prompt: "Wie heissen Sie? Woher kommen Sie?", followUps: ["Wo wohnen Sie?", "Wie alt sind Sie?", "Haben Sie Kinder?"] },
  { id: "P-preA1-2", level: "preA1", prompt: "Wie ist Ihr Name? Welche Sprache sprechen Sie?", followUps: ["Wie ist Ihre Adresse?", "Sind Sie verheiratet?", "Was ist Ihre Nationalität?"] },

  { id: "P-A1-1", level: "A1", prompt: "Erzählen Sie bitte etwas über sich: Woher kommen Sie, was arbeiten Sie, was machen Sie gern?", followUps: ["Seit wann leben Sie in der Schweiz?", "Wo arbeiten Sie?", "Was ist Ihre Muttersprache?", "Warum machen Sie diesen Test?"] },
  { id: "P-A1-2", level: "A1", prompt: "Erzählen Sie bitte von Ihrer Familie und Ihrer Wohnung.", followUps: ["Mit wem wohnen Sie zusammen?", "Wie lange wohnen Sie schon dort?", "Was machen Sie in Ihrer Freizeit?", "Wie ist Ihre Adresse?"] },
  { id: "P-A1-3", level: "A1", prompt: "Was sind Sie von Beruf, und welche Hobbys haben Sie?", followUps: ["Wie oft machen Sie das?", "Welche Sprachen sprechen Sie?", "Was gefällt Ihnen an der Schweiz?"] },

  { id: "P-A2-1", level: "A2", prompt: "Beschreiben Sie bitte Ihren Arbeitstag: Was machen Sie vom Morgen bis zum Abend?", followUps: ["Um wie viel Uhr stehen Sie auf?", "Was machen Sie in der Mittagspause?", "Was machen Sie nach der Arbeit?"] },
  { id: "P-A2-2", level: "A2", prompt: "Beschreiben Sie bitte einen Tag an Ihrem Wochenende, wenn Sie nicht arbeiten müssen.", followUps: ["Was machen Sie am Vormittag?", "Mit wem verbringen Sie den Tag?", "Was machen Sie am Abend?"] },
  { id: "P-A2-3", level: "A2", prompt: "Beschreiben Sie bitte, wie Sie sich auf die Ferien vorbereiten.", followUps: ["Was machen Sie zuerst?", "Was packen Sie ein?", "Wie reisen Sie?"] },
  { id: "P-A2-4", level: "A2", prompt: "Beschreiben Sie bitte den Ort, wo Sie wohnen. Was gefällt Ihnen dort, und was gefällt Ihnen nicht?", followUps: ["Was gibt es in der Nähe?", "Wie kommen Sie zur Arbeit?", "Was machen Sie dort gern?"] },
  { id: "P-A2-5", level: "A2", prompt: "Beschreiben Sie bitte Ihr Lieblingsfest. Was machen Sie an diesem Tag?", followUps: ["Mit wem feiern Sie?", "Was essen Sie?", "Wie bereiten Sie das Fest vor?"] },
  { id: "P-A2-6", level: "A2", prompt: "Beschreiben Sie bitte, wie Sie für die Woche einkaufen.", followUps: ["Wo kaufen Sie ein?", "Was kaufen Sie immer?", "Wann gehen Sie einkaufen?"] },

  { id: "P-B1-1", level: "B1", prompt: "Stellen Sie sich vor, Sie gewinnen viel Geld im Lotto. Was würden Sie damit machen? Nennen Sie mindestens drei Beispiele und erklären Sie, warum.", followUps: ["Warum ist Ihnen das wichtig?", "Würden Sie weiter arbeiten? Warum?", "Was würden Sie auf keinen Fall kaufen?"] },
  { id: "P-B1-2", level: "B1", prompt: "Wo sehen Sie sich in zwei Jahren? Nennen Sie mindestens drei Beispiele aus Beruf und Privatleben und erklären Sie, warum.", followUps: ["Was müssen Sie tun, damit das klappt?", "Was wäre, wenn das nicht möglich ist?", "Warum ist Ihnen das wichtig?"] },
  { id: "P-B1-3", level: "B1", prompt: "Wohin würden Sie gern reisen, wenn Sie Zeit und Geld hätten? Nennen Sie drei Reiseziele und erklären Sie, warum.", followUps: ["Mit wem würden Sie reisen?", "Was würden Sie dort machen?", "Welches Ziel ist Ihnen am wichtigsten? Warum?"] },
  { id: "P-B1-4", level: "B1", prompt: "Erzählen Sie von einer Person, die für Sie interessant oder wichtig ist. Nennen Sie mindestens drei Gründe, warum.", followUps: ["Wie haben Sie diese Person kennengelernt?", "Was haben Sie von ihr gelernt?", "Was würden Sie diese Person gern fragen?"] },
  { id: "P-B1-5", level: "B1", prompt: "Wie werden wir Ihrer Meinung nach in zwanzig Jahren unterwegs sein? Nennen Sie mindestens drei Veränderungen im Verkehr und begründen Sie Ihre Meinung.", followUps: ["Warum denken Sie das?", "Was wäre die Alternative?", "Wie würde das Ihren Alltag verändern?"] },
  { id: "P-B1-6", level: "B1", prompt: "Wie wird sich die Arbeitszeit in Zukunft verändern? Stellen Sie sich vor, alle arbeiten nur noch vier Tage pro Woche. Nennen Sie mindestens drei Folgen und begründen Sie sie.", followUps: ["Was würden Sie am freien Tag machen?", "Gibt es noch andere Gründe?", "Für wen wäre das schwierig? Warum?"] },
  { id: "P-B1-7", level: "B1", prompt: "Was gefällt Ihnen an Ihrer Arbeit und was nicht? Was würden Sie ändern, wenn Sie die Chefin oder der Chef wären? Nennen Sie mindestens drei Dinge und erklären Sie, warum.", followUps: ["Können Sie das genauer erklären?", "Was wäre dann besser?", "Warum haben Sie diesen Beruf gewählt?"] },

  ...([
    ["Homeoffice", "Arbeiten von zu Hause: Welche Vor- und Nachteile hat das Homeoffice?"],
    ["Kontaktlos bezahlen oder Bargeld", "Kontaktloses Bezahlen statt Bargeld: Welche Vor- und Nachteile hat das?"],
    ["Zensur in sozialen Netzwerken", "Sollen soziale Netzwerke Beiträge löschen dürfen? Welche Vor- und Nachteile hat das?"],
    ["Onlineshopping oder Laden", "Einkaufen im Internet oder im Geschäft: Welche Vor- und Nachteile hat das Onlineshopping?"],
    ["Fahrtauglichkeit im Alter", "Sollen Autofahrerinnen und Autofahrer ab 75 regelmässig zum medizinischen Check? Welche Vor- und Nachteile hat das?"],
    ["Ladenöffnungszeiten", "Sollen Supermärkte auch am Sonntag und an Feiertagen offen sein? Welche Vor- und Nachteile hat das?"],
    ["Längere Arbeitszeiten", "Länger arbeiten bis zur Pensionierung: Welche Vor- und Nachteile hat ein höheres Rentenalter?"],
  ] as const).map(([short, question], i): SpeakingTask => ({
    id: `P-B2-${i + 1}`, level: "B2", prepSeconds: 90,
    prompt: `Thema «${short}». ${question} Halten Sie eine kurze Präsentation: Erläutern Sie Vor- und Nachteile, schildern Sie Ihre eigene Meinung und begründen Sie sie.`,
    followUps: ["Warum denken Sie das?", "Was wäre die Alternative?", "Was sagen Sie zu Leuten, die das anders sehen?"],
  })),
];
