const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');

// Use the project's TypeScript compiler without adding a test runtime dependency.
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
};
const a1 = require('../data/overall-a1.ts').default;
const a2 = require('../data/overall-a2.ts').default;
const { checkOverallAnswer, normalizeAnswer, placeChunk, overallQuestionId, selectOverallExercises, solutionText } = require('../lib/overall-logic.ts');

test('the complete A1/A2 banks have unique stable IDs, metadata and four valid choices', () => {
  const all = [...a1, ...a2];
  assert.equal(new Set(all.map(overallQuestionId)).size, all.length);
  assert.ok(all.length > 2900);
  for (const [pool, level] of [[a1, 'A1'], [a2, 'A2']]) {
    assert.ok(pool.length > 1000);
    assert.equal(pool.filter(e => !e.source).length, 60, 'original questions and progress IDs preserved');
    for (const kind of ['choice', 'fill', 'conjugation', 'order']) assert.ok(pool.filter(e => e.kind === kind).length >= 15);
    for (const e of pool) {
      assert.equal(e.level, level);
      for (const key of ['topic', 'instruction', 'explanation', 'bookSection']) assert.ok(e[key], `${e.id}: ${key}`);
      if (!e.source) assert.ok(e.translation);
      else { assert.ok(e.source.pdfPage >= 12 && e.source.pdfPage <= 176); assert.equal(e.source.printedPage, e.source.pdfPage - 1); }
      assert.ok(!/[{}]/.test(solutionText(e)), `${e.id}: unparsed source token`);
      assert.ok(!solutionText(e).includes('___'), e.id);
      if (e.kind === 'choice') {
        assert.equal(e.options.length, 4, e.id);
        assert.ok(e.options.every(option => typeof option === 'string' && option.trim()), e.id);
        assert.equal(new Set(e.options).size, e.options.length);
        assert.equal(e.options.filter(o => o === e.answer).length, 1);
        assert.equal((e.sentence.match(/___/g) || []).length, 1);
        assert.ok(checkOverallAnswer(e, [e.answer], []));
        for (const wrong of e.options.filter(o => o !== e.answer)) assert.ok(!checkOverallAnswer(e, [wrong], []));
      } else if (e.kind === 'order') {
        for (const order of e.orders) {
          assert.equal(order[0], 0);
          assert.deepEqual([...order].sort((a, b) => a - b), e.chunks.map((_, i) => i));
          assert.ok(checkOverallAnswer(e, [], order));
        }
        assert.ok(!checkOverallAnswer(e, [], e.chunks.map(() => null)));
        assert.ok(!checkOverallAnswer(e, [], e.chunks.map(() => 0)));
      } else {
        assert.equal((e.sentence.match(/___/g) || []).length, e.blanks.length, e.id);
        assert.ok(e.blanks.every(b => b.hint && b.answers.length && b.answers.every(a => a.trim())));
        for (const [i, blank] of e.blanks.entries()) {
          assert.equal(blank.options.length, 4, `${e.id} gap ${i + 1}`);
          assert.equal(new Set(blank.options.map(normalizeAnswer)).size, 4, e.id);
          const accepted = blank.options.filter(option => blank.answers.some(answer => normalizeAnswer(answer) === normalizeAnswer(option)));
          assert.equal(accepted.length, 1, e.id);
          for (const wrong of blank.options.filter(option => !accepted.includes(option))) {
            const answers = e.blanks.map(b => b.answers[0]);
            answers[i] = wrong;
            assert.ok(!checkOverallAnswer(e, answers, []), `${e.id}: ${wrong}`);
          }
        }
        assert.ok(checkOverallAnswer(e, e.blanks.map(b => b.answers[0]), []));
        assert.ok(!checkOverallAnswer(e, e.blanks.map(() => ''), []));
        assert.ok(!checkOverallAnswer(e, e.blanks.map(() => 'wrong'), []));
      }
    }
  }
});

test('choice inclusion prioritizes grammatical context throughout the book bank', () => {
  const all = [...a1, ...a2];
  const expected = {
    'article:nom': ['der', 'die', 'das'],
    'article:acc': ['den', 'die', 'das'],
    'article:dat': ['dem', 'der', 'den'],
    'article:gen': ['des', 'der'],
    'pronoun:nom': ['er', 'sie', 'es'],
    'pronoun:acc': ['ihn', 'sie', 'es'],
    'pronoun:dat': ['ihm', 'ihr', 'ihnen'],
    'relative:m': ['der', 'den', 'dem', 'dessen'],
    'relative:f': ['die', 'der', 'deren'],
    'relative:n': ['das', 'dem', 'dessen'],
    'relative:pl': ['die', 'denen', 'deren'],
  };
  const checked = new Set();
  for (const e of all) {
    const selections = e.kind === 'choice' ? [e] : e.blanks ?? [];
    for (const selection of selections) {
      assert.notEqual(selection.optionGroup, 'article', e.id);
      const options = selection.options.map(normalizeAnswer);
      for (const required of expected[selection.optionGroup] ?? []) {
        assert.ok(options.includes(required), `${e.id} ${selection.optionGroup} missing ${required}`);
        checked.add(selection.optionGroup);
      }
      if (selection.optionGroup === 'aux') {
        const answer = normalizeAnswer(selection.answers[0]);
        const pair = [['habe','bin'],['hast','bist'],['hat','ist'],['haben','sind'],['habt','seid']].find(pair => pair.includes(answer));
        assert.ok(pair, `${e.id}: unknown auxiliary`);
        for (const form of pair) assert.ok(options.includes(form), `${e.id}: missing competing auxiliary ${form}`);
      }
    }
  }
  assert.deepEqual([...checked].sort(), Object.keys(expected).sort());
  const genderQuestions = all.filter(e => e.sentence?.startsWith('Nominativ Singular:'));
  assert.ok(genderQuestions.length > 100);
  for (const e of genderQuestions) assert.equal(e.optionGroup, 'article:nom', e.id);
  assert.equal(genderQuestions.find(e => e.sentence.endsWith('Unterricht')).answer, 'der');
  // Dative plural den must retain dem and der; it cannot be inferred from den alone.
  const plural = all.find(e => e.id === 'book-p79-e4-i1');
  assert.equal(plural.blanks[0].optionGroup, 'article:dat');
  assert.equal(plural.blanks[0].answers[0], 'den');
  const mixed = all.find(e => e.id === 'book-p136-e5-i1');
  assert.deepEqual(mixed.blanks.map(b => b.optionGroup), ['article:dat', 'article:acc']);
});

test('builder rejects unspecified article context and preserves explicitly ranked alternatives', () => {
  const { workbookChapter } = require('../data/book-exercises/builder.ts');
  const chapter = workbookChapter('test', 'Test', 'A1', 'Test');
  assert.throws(() => chapter.choices(71, 'bad', 'article|{der} Unterricht'), /Specify the article case/);
  assert.throws(() => chapter.choices(71, 'bad', 'article:nom|{dem} Unterricht'), /outside the grammatical family/);
  chapter.choices(71, 'ranked', 'wo/wohin/woher/wann/wer|{woher} kommst du?');
  assert.deepEqual(new Set(chapter.exercises[0].options), new Set(['woher','wo','wohin','wann']));
});

test('answer comparison preserves verb distinctions and accepts supported spelling variants', () => {
  assert.equal(normalizeAnswer('  FÄHRST  '), normalizeAnswer('faehrst'));
  assert.equal(normalizeAnswer('A\u0308pfel'), normalizeAnswer('Äpfel'));
  assert.equal(normalizeAnswer('groß'), normalizeAnswer('gross'));
  assert.equal(normalizeAnswer('zu   sprechen'), normalizeAnswer('zu sprechen'));
  assert.notEqual(normalizeAnswer('konnten'), normalizeAnswer('könnten'));
  assert.notEqual(normalizeAnswer('hat'), normalizeAnswer('hatte'));
  const e = a2.find(e => e.id === 'a2-verb-02');
  assert.ok(!checkOverallAnswer(e, ['haben', 'gefahren'], []));
  assert.ok(!checkOverallAnswer(e, ['sind'], []));
});

test('dragging fills slots, swaps placed pieces, returns displaced pieces, and protects the first phrase', () => {
  const empty = [0, null, null, null];
  const placed = placeChunk(empty, 2, 1);
  assert.deepEqual(placed, [0, 2, null, null]);
  assert.deepEqual(empty, [0, null, null, null]);
  assert.deepEqual(placeChunk([0, 2, 1, 3], 2, 2), [0, 1, 2, 3]);
  assert.deepEqual(placeChunk([0, 1, null, null], 2, 1), [0, 2, null, null]);
  assert.deepEqual(placeChunk([0, 2, 1, 3], 2, 'bank'), [0, null, 1, 3]);
  assert.deepEqual(placeChunk(empty, 1, 0), empty);
  assert.deepEqual(placeChunk(empty, 0, 2), empty);
  assert.deepEqual(placeChunk(empty, 1, -1), empty);
  assert.deepEqual(placeChunk(empty, 1, 4), empty);
});

test('mixed sessions balance formats without repeats; focused sessions cap to the pool', () => {
  for (const pool of [a1, a2]) for (const count of [5, 10, 15, 20, 30, 50]) {
    const session = selectOverallExercises(pool, count, {});
    assert.equal(session.length, count);
    assert.equal(new Set(session.map(e => e.id)).size, count);
    const counts = ['choice', 'fill', 'conjugation', 'order'].map(kind => session.filter(e => e.kind === kind).length);
    assert.ok(Math.min(...counts) >= 1);
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1);
  }
  const focused = selectOverallExercises(a1, 20, {}, 'order');
  assert.equal(focused.length, 20);
  assert.ok(focused.every(e => e.kind === 'order'));
  assert.deepEqual(selectOverallExercises([], 5, {}), []);
  const limited = a1.filter(e => e.kind === 'order').slice(0,3);
  assert.equal(selectOverallExercises(limited,50,{},'order').length,3);
});

test('book coverage survives deduplication and spans every grammar chapter', () => {
  const { importedBookItems, bookExercises } = require('../data/book-exercises');
  const allSources = bookExercises.flatMap(e => [e.source,...(e.additionalSources || [])]);
  assert.equal(allSources.length, importedBookItems.length);
  const key = e => JSON.stringify([e.level,e.kind,e.sentence,e.chunks,e.answer,e.blanks?.map(b=>b.answers)]);
  assert.equal(new Set(bookExercises.map(key)).size,bookExercises.length);
  for(const page of [12,24,34,45,47,50,56,59,69,71,77,82,89,91,94,96,97,98,99,100,102,104,105,110,114,117,120,121,129,133,136,137,140,144,149,153,157,159,162,165,167,168,175]) {
    assert.ok(allSources.some(s => s.pdfPage===page), `Missing source page ${page}`);
  }
  const going = bookExercises.find(e => e.id==='book-p126-e6b-i1');
  assert.ok(checkOverallAnswer(going,['ins','im'],[]));
  assert.ok(!checkOverallAnswer(going,['im','ins'],[]));
  const reflexive = bookExercises.find(e => e.id==='book-p96-e2-i2');
  assert.ok(checkOverallAnswer(reflexive,['dir','mir'],[]));
  assert.ok(!checkOverallAnswer(reflexive,['dich','mich'],[]));
});

test('selection prioritizes unseen questions over mastered questions using stable IDs', () => {
  const stats = Object.fromEntries(a1.map(e => [overallQuestionId(e), { attempts: 10, correct: 10, lastSeen: new Date().toISOString() }]));
  const unseen = a1.find(e => e.kind === 'fill');
  delete stats[overallQuestionId(unseen)];
  for (let i = 0; i < 20; i++) assert.equal(selectOverallExercises(a1, 1, stats, 'fill')[0].id, unseen.id);
});

function loadStats(seed = {}) {
  const store = new Map(Object.entries(seed));
  let fail = false;
  const storage = {
    async getItem(key) { await new Promise(resolve => setTimeout(resolve, 1)); return store.get(key) ?? null; },
    async setItem(key, value) { if (fail) { fail = false; throw Error('Storage unavailable'); } await new Promise(resolve => setTimeout(resolve, 1)); store.set(key, value); },
    async removeItem(key) { store.delete(key); },
  };
  const source = ts.transpileModule(fs.readFileSync(require.resolve('../lib/stats.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => {
    if (name === '../data/practice-modes') return require('../data/practice-modes.ts');
    if (name === './activity') return require('../lib/activity.ts');
    assert.equal(name, '@react-native-async-storage/async-storage'); return storage;
  } });
  return { stats: exports, failNext: () => { fail = true; } };
}

test('older saved progress gains A1/A2 defaults without losing existing scores or history', async () => {
  const { stats } = loadStats({ doiti_stats: JSON.stringify({ gender: { totalAttempted: 25, totalCorrect: 20 }, sessions: [{ mode: 'gender', date: '2026-01-01', total: 5, correct: 4 }] }) });
  const migrated = await stats.getStats();
  assert.equal(migrated.gender.totalCorrect, 20);
  assert.equal(migrated.sessions.length, 1);
  assert.equal(migrated['overall-a1'].totalAttempted, 0);
  assert.equal(migrated['overall-a2'].totalAttempted, 0);
  assert.equal(migrated.conversation.totalAttempted, 0);
  for (const mode of ['conditionals', 'connectors', 'separable', 'clauses', 'reflexive', 'passive', 'comparisons', 'word-pairs']) assert.equal(migrated[mode].totalAttempted, 0);
});

test('overlapping answer and session writes retain all scores; history remains capped and reset works', async () => {
  const { stats } = loadStats();
  await Promise.all([
    ...Array.from({ length: 20 }, (_, i) => stats.recordAnswer('overall-a1', i % 2 === 0)),
    ...Array.from({ length: 25 }, () => stats.recordSession({ mode: 'overall-a1', date: '2026-09-12', total: 5, correct: 3 })),
    ...Array.from({ length: 10 }, () => stats.recordQuestionAnswer('overall-a1:a1-fill-01', true)),
  ]);
  const result = await stats.getStats();
  assert.equal(result['overall-a1'].totalAttempted, 20);
  assert.equal(result['overall-a1'].totalCorrect, 10);
  assert.equal(result.sessions.length, 20);
  assert.equal((await stats.getQuestionStats())['overall-a1:a1-fill-01'].attempts, 10);
  await stats.resetStats();
  assert.equal((await stats.getStats())['overall-a1'].totalAttempted, 0);
  assert.equal(Object.keys(await stats.getQuestionStats()).length, 0);
});

test('a failed storage write does not block later saves', async () => {
  const { stats, failNext } = loadStats();
  failNext();
  await assert.rejects(stats.recordAnswer('overall-a2', true));
  await stats.recordAnswer('overall-a2', true);
  assert.equal((await stats.getStats())['overall-a2'].totalCorrect, 1);
});

test('daily activity survives session-log rollover and new outcomes do not invent older answer history', async () => {
  const date = new Date(2026, 0, 1, 12).toISOString();
  const { stats } = loadStats({
    doiti_stats: JSON.stringify({ gender: { totalAttempted: 5, totalCorrect: 4 }, sessions: [{ mode: 'gender', date, total: 5, correct: 4 }] }),
    doiti_question_stats: JSON.stringify({ 'gender:0': { attempts: 10, correct: 9, lastSeen: date } }),
  });
  await stats.recordAnswer('gender', false);
  for (let i = 0; i < 25; i++) await stats.recordSession({ mode: 'gender', date: new Date().toISOString(), total: 1, correct: 0 });
  const saved = await stats.getStats();
  const { localDay } = require('../lib/activity.ts');
  assert.equal(saved.activity['2026-01-01'].attempts, 5);
  assert.equal(saved.activity[localDay(new Date())].attempts, 1);
  assert.equal(saved.sessions.length, 20);
  await stats.recordQuestionAnswer('gender:0', false);
  assert.deepEqual(Array.from((await stats.getQuestionStats())['gender:0'].recent), [false]);
  for (const correct of [false, true, true, true, true]) await stats.recordQuestionAnswer('gender:0', correct);
  assert.deepEqual(Array.from((await stats.getQuestionStats())['gender:0'].recent), [false, true, true, true, true]);
  await stats.resetStats();
  assert.equal(Object.keys((await stats.getStats()).activity).length, 0);
});

test('immediate progress reads wait for the whole answer and queued session', async () => {
  const { stats } = loadStats();
  let updates = 0;
  const unsubscribe = stats.subscribeToProgress(() => updates++);
  const answer = stats.recordPracticeAnswer('gender', 'gender:0', false);
  const session = stats.recordSession({ mode: 'gender', date: new Date().toISOString(), total: 1, correct: 0 });
  const [totals, questions] = await Promise.all([stats.getStats(), stats.getQuestionStats()]);
  assert.equal(totals.gender.totalAttempted, 1);
  assert.equal(totals.sessions[0].total, 1);
  assert.equal(questions['gender:0'].recent[0], false);
  await Promise.all([answer, session]);
  assert.equal(updates, 2, 'visible progress is notified even when a session is saved after focus');
  unsubscribe();
  await stats.recordPracticeAnswer('gender', 'gender:1', true);
  assert.equal(updates, 2);
});
