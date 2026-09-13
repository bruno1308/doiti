export interface ConversationSlot { answer: string; options: string[] }
export interface ConversationTurn {
  id: string;
  speaker: string;
  objective: string;
  slots: ConversationSlot[];
  punctuation: "." | "?";
  hint: string;
  explanation: string;
}
export interface ConversationScenario {
  id: string;
  title: string;
  setting: string;
  partner: string;
  level: "A1" | "A2";
  icon: string;
  turns: ConversationTurn[];
  closing: string;
}
export function conversationKey(scenario: ConversationScenario, turn: ConversationTurn) {
  return `conversation:${scenario.id}:${turn.id}`;
}
export function replyText(turn: ConversationTurn, answers: string[]) {
  return answers.join(" ") + turn.punctuation;
}
export function checkReply(turn: ConversationTurn, answers: string[]) {
  return answers.length === turn.slots.length && turn.slots.every((slot, i) => answers[i] === slot.answer);
}
export function nextEmptySlot(answers: string[], current: number) {
  for (let offset = 1; offset <= answers.length; offset++) {
    const index = (current + offset) % answers.length;
    if (!answers[index]) return index;
  }
  return current;
}
