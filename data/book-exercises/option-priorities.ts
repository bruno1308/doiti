// Priority means inclusion in the four-choice set, never screen position.
// Authors specify the grammatical target per gap; the answer alone cannot
// distinguish, for example, nominative der from feminine dative der.
export const contextualGroups: Record<string, string[]> = {
  "article:nom": ["der", "die", "das", "den"],
  "article:acc": ["den", "die", "das", "dem"],
  "article:dat": ["dem", "der", "den", "das"],
  "article:gen": ["des", "der", "dem", "den"],
  // Relative pronouns refer to a given antecedent: prioritize its case forms.
  "relative:m": ["der", "den", "dem", "dessen"],
  "relative:f": ["die", "der", "deren", "dem"],
  "relative:n": ["das", "dem", "dessen", "der"],
  "relative:pl": ["die", "denen", "deren", "den"],
  "pronoun:nom": ["er", "sie", "es", "wir", "ich", "du", "ihr"],
  "pronoun:acc": ["ihn", "sie", "es", "mich", "dich", "uns", "euch"],
  "pronoun:dat": ["ihm", "ihr", "ihnen", "mir", "dir", "uns", "euch"],
};

export function relatedForms(group: string, answer: string): string[] {
  const correct = answer.toLowerCase();
  if (group === "indefinite" || group === "negative") {
    const stem = group === "negative" ? "kein" : "ein";
    const endings = [stem, stem + "e", stem + "en"].includes(correct)
      ? ["", "e", "en", "em"] : ["em", "er", "es", "en"];
    return endings.map(ending => stem + ending);
  }
  const families = group === "aux" ? [
    ["habe", "bin"], ["hast", "bist"], ["hat", "ist"], ["haben", "sind"], ["habt", "seid"],
  ] : group === "pronoun" ? [
    ["ich", "mich", "mir"], ["du", "dich", "dir"],
    ["er", "sie", "es"], ["ihn", "sie", "es"], ["ihm", "ihr", "ihnen"],
    ["wir", "uns"], ["ihr", "euch"],
  ] : group === "reflexive" ? [
    ["mich", "mir", "dich", "dir"], ["dich", "dir", "mich", "mir"],
    ["sich", "uns", "euch"],
  ] : group === "question" ? [
    ["wo", "wohin", "woher"], ["wer", "wen", "wem", "wessen"],
    ["wann", "wie lange", "wie oft"],
  ] : [];
  return families.find(family => family.includes(correct)) ?? [];
}
