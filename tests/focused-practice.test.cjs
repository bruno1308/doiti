const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { focusedPractice } = require('../data/focused-practice.ts');
const { legacyPractice, legacyModes } = require('../data/legacy-practice.ts');
const { practiceModes } = require('../data/practice-modes.ts');
const { checkOverallAnswer, connectPair, overallQuestionId, selectOverallExercises, solutionText, normalizeAnswer } = require('../lib/overall-logic.ts');
const a1 = require('../data/overall-a1.ts').default;
const a2 = require('../data/overall-a2.ts').default;

test('Der/Die/Das tests noun gender instead of importing every activity from a noun chapter', () => {
  const pool = focusedPractice.gender.pool;
  const misplacedPuzzle = [...a1, ...a2].find(e => e.id === 'book-p74-e10-i2');
  assert.ok(misplacedPuzzle, 'the reported puzzle remains available in Overall practice');
  assert.ok(!pool.includes(misplacedPuzzle), 'the electronic-book sentence puzzle is not a gender question');
  assert.ok(pool.some(e => e.id === 'book-p71-e2-i1'), 'workbook noun-gender questions are retained');
  assert.ok(pool.length >= legacyPractice.gender.length);
  for (const e of pool) {
    assert.equal(e.kind, 'choice', e.id);
    assert.ok(['der', 'die', 'das'].includes(normalizeAnswer(e.answer)), e.id);
    for (const article of ['der', 'die', 'das']) assert.ok(e.options.map(normalizeAnswer).includes(article), `${e.id}: missing ${article}`);
    if (e.source) assert.equal(e.optionGroup, 'article:nom', e.id);
  }
});

test('all nineteen focused modes retain valid, complete activities with no duplicate progress keys', () => {
  assert.equal(practiceModes.length, 19);
  for (const mode of practiceModes) {
    const { pool } = focusedPractice[mode.id];
    assert.ok(pool.length >= 5, mode.id);
    assert.equal(new Set(pool.map(overallQuestionId)).size, pool.length, mode.id);
    assert.ok(fs.existsSync(`app/(tabs)/${mode.id}.tsx`), mode.id);
    for (const exercise of pool) {
      assert.ok(exercise.instruction && exercise.explanation && solutionText(exercise).trim(), exercise.id);
      if (exercise.kind === 'match') {
        assert.equal(exercise.pairs.length, 4);
        for (const key of ['left', 'right']) assert.equal(new Set(exercise.pairs.map(pair => pair[key])).size, 4, exercise.id);
        assert.ok(checkOverallAnswer(exercise, [], [0,1,2,3]));
        assert.ok(!checkOverallAnswer(exercise, [], [1,0,2,3]));
        assert.ok(!checkOverallAnswer(exercise, [], [0,1,2,null]));
      } else if (exercise.kind === 'order') {
        assert.ok(exercise.chunks.length >= 3, exercise.id);
        for (const order of exercise.orders) assert.ok(checkOverallAnswer(exercise, [], order), exercise.id);
      } else {
        const selections = exercise.kind === 'choice' ? [{ options: exercise.options, answers: [exercise.answer] }] : exercise.blanks;
        assert.equal((exercise.sentence.match(/___/g) ?? []).length, selections.length, exercise.id);
        for (const selection of selections) {
          assert.equal(selection.options.length, 4, exercise.id);
          assert.equal(new Set(selection.options.map(normalizeAnswer)).size, 4, exercise.id);
          assert.ok(selection.options.every(option => option.trim()), exercise.id);
          assert.equal(selection.options.filter(option => selection.answers.some(answer => normalizeAnswer(answer) === normalizeAnswer(option))).length, 1, exercise.id);
        }
        assert.ok(checkOverallAnswer(exercise, selections.map(s => s.answers[0]), []), exercise.id);
      }
    }
  }
});

test('legacy questions keep their keys and shared workbook questions keep the same objects and progress across modes', () => {
  for (const mode of legacyModes) for (const [i, e] of legacyPractice[mode].entries()) {
    assert.equal(overallQuestionId(e), `${mode}:${i}`);
    assert.ok(focusedPractice[mode].pool.includes(e));
  }
  const overall = [...a1, ...a2];
  for (const mode of practiceModes) for (const e of focusedPractice[mode.id].pool.filter(e => e.source)) {
    assert.ok(overall.includes(e), `${mode.id}: workbook question was copied`);
  }
  const shared = focusedPractice.perfekt.pool.find(e => e.source);
  const stats = { [overallQuestionId(shared)]: { attempts: 12, correct: 12, lastSeen: new Date().toISOString() } };
  assert.equal(stats[overallQuestionId(overall.find(e => e.id === shared.id))].attempts, 12);
});

test('new modes offer puzzles and matching, and filtering respects small pools', () => {
  for (const mode of ['conditionals', 'connectors', 'separable', 'clauses', 'reflexive', 'passive', 'perfekt', 'praeteritum', 'modals']) {
    assert.ok(focusedPractice[mode].pool.some(e => e.kind === 'order'), mode);
  }
  for (const mode of ['comparisons','word-pairs']) assert.ok(focusedPractice[mode].pool.some(e => e.kind === 'match'));
  const contrasts = focusedPractice.connectors.pool.filter(e => e.topic === 'Dann, denn or wenn');
  assert.equal(contrasts.length, 12);
  for (const answer of ['dann','denn','wenn']) assert.equal(contrasts.filter(e => e.answer.toLowerCase() === answer).length, 4);
  const tiny = focusedPractice.reflexive.pool.filter(e => e.kind === 'order');
  assert.equal(selectOverallExercises(tiny, 50, {}, 'order').length, tiny.length);
  const matching = selectOverallExercises(focusedPractice.comparisons.pool, 5, {}, 'match');
  assert.equal(matching.length, 5);
  assert.ok(matching.every(e => e.kind === 'match'));
});

test('matching supports filling, swapping, disconnecting, and resetting without duplicate partners', () => {
  const original = [null,null,null,null];
  assert.deepEqual(connectPair(original, 0, 2), [2,null,null,null]);
  assert.deepEqual(original, [null,null,null,null]);
  assert.deepEqual(connectPair([2,1,null,null], 1, 2), [1,2,null,null]);
  assert.deepEqual(connectPair([2,null,null,null], 1, 2), [null,2,null,null]);
  assert.deepEqual(connectPair([0,1,2,3], 2, null), [0,1,null,3]);
  for (const [left,right] of [[-1,0],[0,4],[0,1.5],[4,0]]) assert.deepEqual(connectPair(original,left,right),original);
});

test('pronoun distractors never count sie and Sie as two distinct alternatives', () => {
  const { getAllPronounExercises, getPronounOptions } = require('../lib/exercise-logic.ts');
  for (const exercise of getAllPronounExercises()) for (let i = 0; i < 20; i++) {
    const options = getPronounOptions(exercise.person, exercise.case, exercise.correctForm);
    assert.equal(new Set(options.map(normalizeAnswer)).size, 4);
  }
});

test('plural choices stay distinct under the same spelling rules as answer checking', () => {
  const { getAllNouns, getPluralOptions } = require('../lib/exercise-logic.ts');
  for (const noun of getAllNouns()) for (let i = 0; i < 20; i++) {
    const options = getPluralOptions(noun.word, noun.plural);
    assert.equal(new Set(options.map(normalizeAnswer)).size, 4, noun.word);
    assert.equal(options.filter(option => normalizeAnswer(option) === normalizeAnswer(noun.plural)).length, 1, noun.word);
  }
});
