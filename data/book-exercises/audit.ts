import type { OverallExercise } from "../../lib/overall-types";
import { reviewedTasks, topicModes } from "./reviewed-tasks";

// Explanations follow the task, including items extracted from mixed dialogues.
// Book section/page metadata stays untouched for provenance and saved progress.
const explanations: Record<string, string> = {
  "Present tense": "Match the present-tense verb form to the subject. The conjugated verb is second in a statement and first in a yes/no question.",
  "Separable verbs": "Conjugate the separable verb to match the subject. Its prefix separates in a main clause and follows the verb's complements.",
  "Perfekt with separable prefixes": "Use a conjugated auxiliary and a past participle. A separable prefix usually precedes ge-. If the base verb already has an inseparable prefix, no ge- is added.",
  "Past modal verbs": "Use the past modal form for a past event and the present form for an explicit present/past contrast. Other verbs in the same sentence may also need a past form.",
  "Case identification": "Identify the quoted phrase's role: subject or predicate noun (nominative), direct object (accusative), dative complement, or possessor (genitive). Verbs and prepositions can require a particular case.",
  "Article case contrasts": "Check the case required by the verb. Choose the noun phrase whose article has the wrong case for that role.",
  "Articles after prepositions": "Choose the article's case from the preposition, then match its gender and number to the noun. Learn fixed prepositions together with their verbs.",
  "Contrasting adverbs": "Choose the adverb that contrasts with the one in the first statement, such as a different time, location, frequency or degree.",
  "Articles in context": "Choose a definite, indefinite or negative article to fit the noun's gender, number and case, and whether it is already known.",
  "Prepositional case": "The preposition determines the case. With two-way prepositions, a location takes dative and a destination takes accusative. Match the ending to the noun's gender and number.",
  "Position and movement": "Distinguish a position from putting something into a position: liegen/legen, stehen/stellen and sitzen/setzen. Choose the verb that describes the action and matches the subject.",
  "Noun forms": "Use the noun's singular or plural form according to its meaning and the surrounding article, quantity and verb. A plural ending is not needed for a singular noun.",
  "Noun declension": "Some masculine nouns are weak and take -(e)n outside the nominative singular. Others keep their base form. Check the noun's declension, number and case.",
  "Possessive pronouns": "The possessive pronoun replaces the noun. Choose the owner, then match the pronoun to the replaced noun's gender, number and case.",
  "Personal and reflexive pronouns": "Use a personal pronoun for the speaker or other person. When the object refers back to the subject, use the appropriate reflexive form.",
  "Weather verbs": "Weather expressions use es with a third-person singular verb. Choose the correct verb form; the subject es is already supplied.",
  "Active or passive": "In the passive, werden combines with a past participle. Werden followed by a noun or adjective can instead mean becoming something. Identify the voice and tense from the whole sentence.",
};

export function auditBookExercises(exercises: OverallExercise[]): OverallExercise[] {
  const topicExplanations = new Map<string, string>();
  for (const exercise of exercises) {
    if (!topicExplanations.has(exercise.topic)) topicExplanations.set(exercise.topic, exercise.explanation);
  }
  const seen = new Map<string, Set<number>>();
  const result = exercises.map(exercise => {
    const source = exercise.source;
    if (!source) throw new Error(`Missing workbook source: ${exercise.id}`);
    const key = `${source.pdfPage}:${source.exercise}`;
    const rule = reviewedTasks[key];
    const item = Number(source.item);
    if (!rule || !Number.isInteger(item) || item < 1 || item > rule[0]) {
      throw new Error(`Review workbook task before importing it: ${key}, item ${source.item}`);
    }
    const items = seen.get(key) ?? new Set<number>();
    if (items.has(item)) throw new Error(`Duplicate workbook source: ${key}, item ${item}`);
    items.add(item); seen.set(key, items);
    const topic = rule[2]?.[item] ?? rule[1];
    const modes = topicModes[topic];
    if (!modes) throw new Error(`Unreviewed learning target: ${topic}`);
    const updated = { ...exercise, topic, focusedModes: [...modes], explanation: explanations[topic] ?? (topic !== exercise.topic ? topicExplanations.get(topic) : undefined) ?? exercise.explanation };
    if (topic === "Case identification") updated.instruction = "Choose the case of the quoted phrase.";
    if (topic === "Article case contrasts") updated.instruction = "Choose the phrase that does not fit the required case.";
    if (topic === "Active or passive") updated.instruction = "Identify the voice and tense of the sentence.";
    if (updated.kind === "fill" || updated.kind === "conjugation") {
      updated.blanks = updated.blanks.map(blank => ({ ...blank, hint: blank.hint === exercise.topic ? topic : blank.hint }));
    }
    return updated;
  });
  for (const [key, [count, , overrides]] of Object.entries(reviewedTasks)) {
    if (seen.get(key)?.size !== count) throw new Error(`Workbook task changed; review its classification: ${key}`);
    for (const item of Object.keys(overrides ?? {})) {
      if (!seen.get(key)?.has(Number(item))) throw new Error(`Stale workbook classification: ${key}, item ${item}`);
    }
  }
  return result;
}
