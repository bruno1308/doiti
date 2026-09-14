const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { defaultPracticePreferences, normalizePracticePreferences, practiceKinds, selectPracticeSession } = require('../lib/practice-preferences.ts');
const { focusedPractice } = require('../data/focused-practice.ts');
const a1 = require('../data/overall-a1.ts').default;
const { overallQuestionId } = require('../lib/overall-logic.ts');

test('new learners start with twenty balanced cards across the deck’s available formats', () => {
  const preferences = defaultPracticePreferences();
  assert.equal(preferences.count, 20);
  assert.deepEqual(preferences.kinds, ['choice', 'fill', 'conjugation', 'order', 'match']);
  const session = selectPracticeSession(a1, preferences, {});
  assert.equal(session.length, 20);
  assert.equal(new Set(session.map(overallQuestionId)).size, 20);
  for (const kind of ['choice', 'fill', 'conjugation', 'order']) assert.equal(session.filter(e => e.kind === kind).length, 5);
  assert.ok(selectPracticeSession(focusedPractice.gender.pool, preferences, {}).every(e => e.kind === 'choice'));
});

test('preferences include multiple selected types, preserve progress priority and never substitute excluded types', () => {
  const preferences = { count: 10, kinds: ['fill', 'order'] };
  const selected = selectPracticeSession(a1, preferences, {});
  assert.equal(selected.length, 10);
  assert.equal(selected.filter(e => e.kind === 'fill').length, 5);
  assert.equal(selected.filter(e => e.kind === 'order').length, 5);
  const onlyPuzzles = { count: 20, kinds: ['order'] };
  assert.deepEqual(selectPracticeSession(focusedPractice.gender.pool, onlyPuzzles, {}), []);
  const tiny = a1.filter(e => e.kind === 'order').slice(0, 3);
  assert.equal(selectPracticeSession(tiny, onlyPuzzles, {}).length, 3);
  const stats = Object.fromEntries(a1.map(e => [overallQuestionId(e), { attempts: 10, correct: 10, lastSeen: new Date().toISOString() }]));
  const unseen = a1.find(e => e.kind === 'fill');
  delete stats[overallQuestionId(unseen)];
  assert.equal(selectPracticeSession(a1, { count: 5, kinds: ['fill'] }, stats).filter(e => e.id === unseen.id).length, 1);
});

test('saved preferences normalize unsupported values without producing an empty selection', () => {
  for (const value of [null, [], 'old', { count: -3, kinds: [] }, { count: 999, kinds: ['retired'] }]) {
    assert.deepEqual(normalizePracticePreferences(value), defaultPracticePreferences());
  }
  assert.deepEqual(normalizePracticePreferences({ count: 30, kinds: ['order', 'order', 'retired', 'fill'] }), { count: 30, kinds: ['fill', 'order'] });
  const one = defaultPracticePreferences();
  one.kinds.pop();
  assert.equal(defaultPracticePreferences().kinds.length, practiceKinds.length);
});

function loadSettings(raw) {
  const store = new Map(raw === undefined ? [] : [['doiti_practice_preferences', raw]]);
  let fail = false;
  const storage = {
    async getItem(key) { return store.get(key) ?? null; },
    async setItem(key, value) {
      if (fail) { fail = false; throw Error('Storage unavailable'); }
      await new Promise(resolve => setTimeout(resolve, 5));
      store.set(key, value);
    },
  };
  const source = ts.transpileModule(fs.readFileSync(require.resolve('../lib/settings.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => {
    if (name === './practice-preferences') return require('../lib/practice-preferences.ts');
    assert.equal(name, '@react-native-async-storage/async-storage'); return storage;
  } });
  return { settings: exports, store, failNext: () => { fail = true; } };
}

test('preferences persist independently of scores; new sessions wait for rapid changes to finish saving', async () => {
  const { settings, store, failNext } = loadSettings();
  store.set('doiti_stats', 'existing scores');
  assert.deepEqual(await settings.getPracticePreferences(), defaultPracticePreferences());
  const first = settings.savePracticePreferences({ count: 10, kinds: ['choice'] });
  const last = settings.savePracticePreferences({ count: 30, kinds: ['fill', 'order'] });
  assert.deepEqual(await settings.getPracticePreferences(), { count: 30, kinds: ['fill', 'order'] });
  await Promise.all([first, last]);
  assert.equal(store.get('doiti_stats'), 'existing scores');
  const reloaded = loadSettings(store.get('doiti_practice_preferences')).settings;
  assert.deepEqual(await reloaded.getPracticePreferences(), { count: 30, kinds: ['fill', 'order'] });
  failNext();
  await assert.rejects(settings.savePracticePreferences(defaultPracticePreferences()));
  await settings.savePracticePreferences({ count: 5, kinds: ['match'] });
  assert.deepEqual(await settings.getPracticePreferences(), { count: 5, kinds: ['match'] });
  assert.deepEqual(await loadSettings('{broken').settings.getPracticePreferences(), defaultPracticePreferences());
});
