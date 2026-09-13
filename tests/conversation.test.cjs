const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { conversations } = require('../data/conversations.ts');
const { checkReply, conversationKey, nextEmptySlot, replyText } = require('../lib/conversation.ts');
const { allPracticeModes, modeNames } = require('../data/practice-modes.ts');

test('ten scenarios contain fifty complete objectives, with four distinct choices per word', () => {
  assert.equal(conversations.length, 10);
  assert.equal(new Set(conversations.map(s => s.id)).size, 10);
  const keys = new Set();
  for (const scenario of conversations) {
    assert.equal(scenario.turns.length, 5, scenario.id);
    assert.ok(scenario.setting && scenario.partner && scenario.closing);
    for (const turn of scenario.turns) {
      const key = conversationKey(scenario, turn);
      assert.ok(!keys.has(key)); keys.add(key);
      assert.ok(turn.speaker && turn.objective && turn.explanation, key);
      assert.ok(turn.hint?.trim() && turn.hint !== turn.explanation, `${key}: separate retry clue required`);
      assert.ok(turn.slots.length >= 3 && turn.slots.length <= 10, key);
      const answers = turn.slots.map(slot => slot.answer);
      assert.ok(checkReply(turn, answers), key);
      assert.ok(!checkReply(turn, answers.slice(1)), key);
      assert.ok(!checkReply(turn, answers.map(() => '')), key);
      for (const [i, slot] of turn.slots.entries()) {
        assert.equal(slot.options.length, 4, `${key} slot ${i}`);
        assert.equal(new Set(slot.options).size, 4, key);
        assert.ok(slot.options.every(option => option.trim() && !/[\s/.?]/.test(option)), key);
        assert.equal(slot.options.filter(option => option === slot.answer).length, 1, key);
        for (const wrong of slot.options.filter(option => option !== slot.answer)) {
          const attempt = [...answers]; attempt[i] = wrong;
          assert.ok(!checkReply(turn, attempt), key);
        }
      }
      assert.ok(!replyText(turn, answers).includes('undefined'));
    }
  }
  assert.equal(keys.size, 50);
});
test('slot advance skips filled words and wraps back to unfinished words', () => {
  assert.equal(nextEmptySlot(['Ich','','',''], 0), 1);
  assert.equal(nextEmptySlot(['Ich','hätte','','ein'], 0), 2);
  assert.equal(nextEmptySlot(['','hätte','gern','ein'], 3), 0);
  assert.equal(nextEmptySlot(['Ich','hätte','gern','ein'], 1), 1);
});
test('Conversation is reachable through the catalogue and has a history label', () => {
  assert.equal(allPracticeModes.filter(mode => mode.id === 'conversation').length, 1);
  assert.equal(modeNames.conversation, 'Conversation');
  assert.ok(fs.existsSync('app/(tabs)/conversation.tsx'));
});
