const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { importedBookItems, bookExercises } = require('../data/book-exercises/index.ts');
const { reviewedTasks } = require('../data/book-exercises/reviewed-tasks.ts');
const { auditBookExercises } = require('../data/book-exercises/audit.ts');
const { focusedPractice } = require('../data/focused-practice.ts');
const { overallQuestionId } = require('../lib/overall-logic.ts');
const { checkOverallAnswer } = require('../lib/overall-logic.ts');

const item = id => {
  const exercise = bookExercises.find(e => e.id === `book-${id}`);
  assert.ok(exercise, id);
  return exercise;
};
const modes = id => Object.entries(focusedPractice).filter(([, config]) => config.pool.includes(item(id))).map(([mode]) => mode).sort();

test('all workbook source tasks are explicitly audited and new or changed task sizes require review', () => {
  assert.equal(importedBookItems.length, 2947);
  assert.equal(bookExercises.length, 2917);
  assert.equal(Object.keys(reviewedTasks).length, 354);
  const first = importedBookItems[0];
  const newTask = { ...first, id: 'unreviewed', source: { ...first.source, exercise: 'new-task' } };
  assert.throws(() => auditBookExercises([...importedBookItems, newTask]), /Review workbook task/);
  const newItem = { ...first, id: 'extra-item', source: { ...first.source, item: '999' } };
  assert.throws(() => auditBookExercises([...importedBookItems, newItem]), /Review workbook task/);
  assert.throws(() => auditBookExercises(importedBookItems.slice(1)), /task changed/);
  assert.throws(() => auditBookExercises([...importedBookItems, first]), /Duplicate workbook source/);
  for (const e of importedBookItems) assert.ok(Array.isArray(e.focusedModes), e.id);
});

test('misplaced answer skills are removed while mixed cards retain genuinely tested skills', () => {
  assert.deepEqual(modes('p105-e1-i1'), []); // es IS supplied; the blank asks for ist.
  assert.deepEqual(modes('p105-e1-i7'), []); // regnet, not a pronoun.
  assert.deepEqual(modes('p105-e2-i2'), ['pronouns']); // choose es itself.
  assert.deepEqual(modes('p100-e1-i1'), []); // indefinite, not personal pronouns.
  assert.deepEqual(modes('p102-e1-i1'), []); // question word, not personal pronoun.
  assert.deepEqual(modes('p94-e4-i2'), ['reflexive']);
  assert.deepEqual(modes('p94-e4-i12'), ['pronouns', 'reflexive']);
  assert.deepEqual(modes('p80-e7-i1'), ['cases']); // naming the case, not supplying an article.
  assert.deepEqual(modes('p61-e1-i1'), ['cases']); // same task was encoded as fill instead of choice.
  assert.deepEqual(modes('p109-e4b-i3'), ['articles']);
  assert.deepEqual(modes('p110-e8-i4'), ['possessives']);
  for (const n of [6,12,13,14]) assert.deepEqual(modes(`p77-e7-i${n}`), []); // singular-only targets.
  assert.deepEqual(modes('p77-e7-i1'), ['plurals']); // one singular AND one plural blank.
  assert.deepEqual(modes('p65-e5-i1'), []); // fragt, with nach already supplied.
  assert.deepEqual(modes('p65-e5-i5'), ['separable']); // nimmt … teil, not the supplied an.
  assert.deepEqual(modes('p65-e4-i1'), ['prepositions']); // actual preposition and case blanks.
  assert.deepEqual(modes('p69-e2-i2'), []); // choosing steht, not a preposition.
  assert.deepEqual(modes('p161-e1-i1'), []); // zu-infinitive, not a relative/indirect question.
  assert.deepEqual(modes('p164-e1-i1'), ['clauses']);
  assert.deepEqual(modes('p74-e10-i2'), ['passive']);
  assert.deepEqual(modes('p58-e3-i2'), ['passive']); // legitimate active/passive discrimination.
  assert.equal(item('p58-e3-i2').topic, 'Active or passive');
  assert.match(item('p58-e3-i2').instruction, /voice and tense/);
});

test('recovered and speaking tasks reach the deck for the answer being practised', () => {
  const expected = {
    'p71-e1-i1': ['gender'], 'p76-e1-i1': ['plurals'], 'p84-e1-i1': ['articles'],
    'p168-e2a-i1': ['modals'], 'p169-e5a-i1': ['perfekt'],
    'p169-e6-i1': ['perfekt', 'separable'], 'p170-e9-i1': ['conditionals'],
    'p171-e10-i1': ['reflexive'], 'p171-e11b-i1': ['plurals'],
    'p171-e11b-i2': ['adjectives'], 'p171-e11b-i7': ['articles'],
    'p172-e13-1-i1': ['possessives'], 'p172-e14-i1': ['possessives'],
    'p173-e15-i1': ['adjectives'], 'p173-e18-i1': ['comparisons'],
    'p174-e23-i1': ['prepositions'], 'p175-e26-i1': ['connectors'],
    'p175-e28-i1': ['clauses'], 'p37-e1-i1': ['modals','praeteritum'],
    'p144-e1-i1': ['comparisons'],
    'p136-e4-i1': ['word-pairs'], 'p80-e8b-i1': ['articles','prepositions'],
  };
  for (const [id, decks] of Object.entries(expected)) assert.deepEqual(modes(id), decks, id);
});

test('book deck membership never falls back to topic labels and shared cards keep stable identity', () => {
  for (const [mode, config] of Object.entries(focusedPractice)) {
    for (const e of config.pool.filter(e => e.source)) {
      assert.ok(e.focusedModes.includes(mode), `${mode}: ${e.id}`);
      assert.ok(bookExercises.includes(e), `${mode}: copied progress identity`);
    }
  }
  for (const e of bookExercises) {
    assert.equal(overallQuestionId(e), `overall-${e.level.toLowerCase()}:${e.id}`);
    for (const mode of e.focusedModes) assert.ok(focusedPractice[mode].pool.includes(e), `${mode}: missing ${e.id}`);
    const sources = [e.source, ...(e.additionalSources ?? [])];
    const sourceModes = importedBookItems.filter(raw => sources.some(s => raw.source.pdfPage === s.pdfPage && raw.source.exercise === s.exercise && raw.source.item === s.item)).flatMap(raw => raw.focusedModes);
    assert.deepEqual([...e.focusedModes].sort(), [...new Set(sourceModes)].sort(), e.id);
  }
});

test('all former preposition puzzles require preposition or case decisions with visible meaning', () => {
  for (const [page, task, count] of [[65, '3', 8], [121, '2', 7], [129, '10', 12]]) {
    for (let n = 1; n <= count; n++) {
      const e = item(`p${page}-e${task}-i${n}`);
      assert.equal(e.kind, 'fill', e.id);
      assert.ok(focusedPractice.prepositions.pool.includes(e), e.id);
      assert.ok(e.translation && e.instruction.includes(e.translation), `${e.id}: meaning must not require opening the translation`);
      assert.ok(e.blanks.some(b => b.options.every(o => /^(an|auf|aus|bei|bis|durch|für|gegen|in|mit|nach|ohne|seit|über|um|unter|von|vor|zu|ab|zwischen)$/i.test(o))), `${e.id}: choose an actual preposition`);
      assert.ok(checkOverallAnswer(e, e.blanks.map(b => b.answers[0]), []), e.id);
    }
  }
  const reported = item('p121-e2-i7');
  assert.equal(reported.sentence, 'Herr Müller kann ___ ___ Kopfschmerzen nichts tun.');
  assert.deepEqual(reported.blanks.map(b => b.answers[0]), ['gegen', 'seine']);
  assert.ok(!checkOverallAnswer(reported, ['für', 'seine'], []));
  assert.ok(!checkOverallAnswer(reported, ['gegen', 'seinen'], []));
  assert.equal(item('p129-e10-i1').topic, 'Prepositions in context');
});

test('every Prepositions card tests the preposition, its question form, or an ending it governs', () => {
  const preposition = /^(?:an|auf|aus|bei|bis|durch|für|gegen|in|mit|nach|ohne|seit|über|um|unter|von|vor|zu|ab|zwischen|hinter|neben|gegenüber|trotz|wegen|während|statt|am|im|ins|zum|zur|beim|vom)(?:\s|$)/i;
  const question = /^wo(?:ran|rauf|raus|bei|durch|für|gegen|rin|mit|nach|rüber|rum|runter|von|vor|zu|zwischen)$/i;
  for (const e of focusedPractice.prepositions.pool) {
    assert.ok(e.kind === 'fill' || e.kind === 'choice', e.id);
    const blanks = e.kind === 'choice' ? [{ answers: [e.answer] }] : e.blanks;
    const parts = e.sentence.split('___');
    let before = parts[0];
    let testsTarget = false;
    for (let i = 0; i < blanks.length; i++) {
      const answer = blanks[i].answers[0];
      const precedingWord = before.trim().split(/\s+/).at(-1) ?? '';
      const ending = /^(?:der|die|das|den|dem|des|ein(?:e|en|em|er|es)?|kein(?:e|en|em|er|es)?|(?:mein|dein|sein|ihr|unser|euer|dies|welch)(?:e|en|em|er|es)?|schlechten|heftigem)$/i;
      testsTarget ||= preposition.test(answer) || question.test(answer) || (preposition.test(precedingWord) && ending.test(answer));
      before += answer + parts[i + 1];
    }
    assert.ok(testsTarget, `${e.id}: a sentence containing a preposition is insufficient`);
  }
});

test('a chapter label cannot reintroduce supplied-phrase puzzles into Prepositions', () => {
  const original = importedBookItems.find(e => e.id === 'book-p121-e2-i7');
  const puzzle = { ...original, kind: 'order', chunks: ['Herr Müller', 'kann', 'gegen seine Kopfschmerzen', 'nichts tun.'], orders: [[0, 1, 2, 3]] };
  const audited = auditBookExercises(importedBookItems.map(e => e === original ? puzzle : e));
  assert.ok(!audited.find(e => e.id === puzzle.id).focusedModes.includes('prepositions'));
});
