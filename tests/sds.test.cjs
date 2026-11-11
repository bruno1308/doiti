const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { sdsLevels, sdsDomains } = require('../lib/sds/types.ts');
const engine = require('../lib/sds/engine.ts');
const { lesenTasks } = require('../data/sds/lesen.ts');
const { hoerenTasks } = require('../data/sds/hoeren.ts');
const { schreibenTasks } = require('../data/sds/schreiben.ts');
const { sprechenTasks } = require('../data/sds/sprechen.ts');
const pcm = require('../lib/sds/voice/pcm.ts');
const { modeNames } = require('../data/practice-modes.ts');

const run = (outcomes) => outcomes.reduce(engine.advanceSkill, engine.newSkill());

test('task outcomes use the 60 % cut score', () => {
  assert.equal(engine.outcomeOf(5, 5), 'perfect');
  assert.equal(engine.outcomeOf(3, 5), 'pass');
  assert.equal(engine.outcomeOf(2, 5), 'fail');
  assert.equal(engine.outcomeOf(0, 0), 'fail');
});

test('a receptive skill follows the handbook rules', () => {
  // 100 % moves straight up.
  assert.deepEqual(run(['perfect', 'perfect']), { level: 2, first: null, done: false, achieved: 'A1' });
  // Cut score twice confirms the level; cut score then a miss closes at the last confirmed level.
  assert.equal(run(['perfect', 'pass', 'pass']).achieved, 'A1');
  assert.deepEqual(run(['perfect', 'pass', 'fail']), { level: 1, first: null, done: true, achieved: 'preA1' });
  assert.equal(run(['perfect', 'pass', 'perfect']).achieved, 'A1');
  // After a miss the second task must be 100 %.
  assert.equal(run(['fail', 'perfect']).achieved, 'preA1');
  assert.deepEqual(run(['fail', 'pass']), { level: 0, first: null, done: true, achieved: null });
  // B2 confirmed ends the skill; later outcomes change nothing.
  const top = run(['perfect', 'perfect', 'perfect', 'perfect', 'perfect']);
  assert.deepEqual(top, { level: 4, first: null, done: true, achieved: 'B2' });
  assert.equal(engine.advanceSkill(top, 'fail'), top);
});

test('the full test runs Lesen, one Schreiben task, then Hören at each level', () => {
  let state = engine.newTablet('full');
  const seen = [];
  const writing = level => schreibenTasks.find(task => task.level === level);
  for (let guard = 0; guard < 40; guard++) {
    const step = engine.nextStep(state);
    if (step.kind === 'finished') break;
    seen.push(step.kind === 'writing' ? `S-${step.level}` : `${step.skill[0].toUpperCase()}-${step.level}`);
    state = step.kind === 'writing' ? engine.recordWriting(state, writing(step.level), 'text')
      : engine.recordReceptive(state, step.skill, `${step.skill}-${guard}`, 'perfect');
  }
  assert.deepEqual(seen, sdsLevels.flatMap(level => [`L-${level}`, `S-${level}`, `H-${level}`]));
  assert.equal(state.lesen.achieved, 'B2');
  assert.equal(state.hoeren.achieved, 'B2');
  assert.equal(state.writing.length, 5);
});

test('skills stop independently and the test ends when nothing is left', () => {
  let state = engine.newTablet('full');
  const writing = level => schreibenTasks.find(task => task.level === level);
  const answer = (outcome) => { const step = engine.nextStep(state); state = engine.recordReceptive(state, step.skill, `t${state.usedTasks.length}`, outcome); };
  answer('perfect');                                                  // Lesen vor A1
  state = engine.recordWriting(state, writing('preA1'), 'x');
  answer('fail'); answer('fail');                                    // Hören closes below vor A1
  assert.deepEqual(engine.nextStep(state), { kind: 'receptive', skill: 'lesen', level: 'A1' });
  answer('fail'); answer('pass');                                    // Lesen closes at vor A1
  assert.deepEqual(engine.nextStep(state), { kind: 'writing', level: 'A1' });
  state = engine.recordWriting(state, writing('A1'), null);          // candidate stops writing
  assert.deepEqual(engine.nextStep(state), { kind: 'finished' });
  assert.equal(state.lesen.achieved, 'preA1');
  assert.equal(state.hoeren.achieved, null);
  assert.equal(state.writing.length, 1);
});

test('writing carries on after reading and listening have closed, until the candidate stops', () => {
  let state = engine.newTablet('written');
  state = engine.recordReceptive(state, 'lesen', 'a', 'fail');
  state = engine.recordReceptive(state, 'lesen', 'b', 'fail');
  const levels = [];
  for (let step = engine.nextStep(state); step.kind !== 'finished'; step = engine.nextStep(state)) {
    assert.equal(step.kind, 'writing'); levels.push(step.level);
    const task = schreibenTasks.find(item => item.level === step.level);
    state = engine.recordWriting(state, task, 'x');
    assert.equal(engine.recordWriting(state, task, 'again'), state, 'a task counts once');
  }
  assert.deepEqual(levels, [...sdsLevels]);
  const once = engine.recordReceptive(engine.newTablet('oral'), 'hoeren', 'h', 'pass');
  assert.equal(engine.recordReceptive(once, 'hoeren', 'h', 'pass'), once, 'a double submit does not confirm a level');
});

test('the streaming downsampler drops nothing across frames', () => {
  for (const rate of [48000, 44100, 16000]) {
    const resample = pcm.createDownsampler(rate, 16000);
    let out = 0;
    for (let i = 0; i < 375; i++) out += resample(new Float32Array(128).fill(0.25)).length;   // 48 000 input samples
    const expected = 48000 * 16000 / rate;
    assert.ok(Math.abs(out - expected) <= 1, `${rate}: ${out} of ${expected}`);
  }
  const resample = pcm.createDownsampler(32000, 16000);
  assert.deepEqual([...resample(Float32Array.from([1, 3, 5])), ...resample(Float32Array.from([7]))], [2, 6]);
});

test('modules test only their own skills; writing alone covers every level', () => {
  let oral = engine.newTablet('oral');
  assert.deepEqual(engine.nextStep(oral), { kind: 'receptive', skill: 'hoeren', level: 'preA1' });
  oral = engine.recordReceptive(oral, 'hoeren', 'a', 'perfect');
  assert.deepEqual(engine.nextStep(oral), { kind: 'receptive', skill: 'hoeren', level: 'A1' });
  let writing = engine.newTablet('writing');
  const levels = [];
  for (let step = engine.nextStep(writing); step.kind !== 'finished'; step = engine.nextStep(writing)) {
    assert.equal(step.kind, 'writing'); levels.push(step.level);
    writing = engine.recordWriting(writing, schreibenTasks.find(task => task.level === step.level), 'x');
  }
  assert.deepEqual(levels, [...sdsLevels]);
  assert.equal(engine.nextStep(engine.closeTablet(engine.newTablet('full'))).kind, 'finished');
});

test('tasks are picked at the level, unused first', () => {
  const pool = lesenTasks.filter(task => task.level === 'A2');
  const used = pool.slice(0, 2).map(task => task.id);
  assert.equal(engine.pickTask(lesenTasks, 'A2', used, () => 0).id, pool[2].id);
  assert.equal(engine.pickTask(lesenTasks, 'A2', pool.map(task => task.id), () => 0).id, pool[0].id);
  assert.equal(engine.pickTask([], 'A2', []), null);
});

test('scoring, writing level and word count', () => {
  const task = lesenTasks[0];
  const right = task.items.map(item => item.answer);
  assert.deepEqual(engine.scoreReceptive(task, right), { correct: task.items.length, total: task.items.length, outcome: 'perfect' });
  assert.equal(engine.scoreReceptive(task, right.map(() => null)).correct, 0);
  assert.equal(engine.writingLevel([{ level: 'A1', reached: true }, { level: 'B1', reached: true }, { level: 'B2', reached: false }]), 'B1');
  assert.equal(engine.writingLevel([{ level: 'A1', reached: false }]), null);
  assert.equal(engine.countWords('  Guten  Tag,\nFrau Huber '), 4);
  assert.equal(engine.countWords('   '), 0);
});

test('reading and listening banks are complete and well formed', () => {
  const options = { lesen: { preA1: 3, A1: 2, A2: 2, B1: 2, B2: 3 }, hoeren: { preA1: 2, A1: 2, A2: 3, B1: 2, B2: 3 } };
  const ids = new Set();
  for (const task of [...lesenTasks, ...hoerenTasks]) {
    assert.ok(!ids.has(task.id), task.id); ids.add(task.id);
    assert.ok(sdsLevels.includes(task.level) && sdsDomains.includes(task.domain), task.id);
    assert.ok(task.instruction.trim(), task.id);
    assert.ok(task.items.length >= 5, task.id);
    for (const [i, item] of task.items.entries()) {
      assert.equal(item.options.length, options[task.skill][task.level], `${task.id} item ${i}`);
      assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length, `${task.id} item ${i}`);
      assert.equal(new Set(item.options.map(option => option.emoji ?? option.label)).size, item.options.length, `${task.id} item ${i}: distinct options`);
      const pictures = item.options.filter(option => option.emoji).length;
      assert.ok(pictures === 0 || pictures === item.options.length, `${task.id} item ${i}: all pictures or none`);
    }
    assert.ok(!JSON.stringify(task).includes('ß'), `${task.id}: Swiss spelling`);
    if (task.skill === 'hoeren') { assert.ok(task.script.length && task.script.every(line => line.text.trim()), task.id); assert.equal(task.plays, task.level === 'B2' ? 1 : 2, task.id); }
    else if (task.level !== 'preA1') assert.ok(task.text.trim().length > 150, task.id);
  }
  for (const bank of [lesenTasks, hoerenTasks]) for (const level of sdsLevels) {
    // A second task at the same level must always be available.
    assert.ok(bank.filter(task => task.level === level).length >= 2, level);
  }
});

test('writing and speaking banks cover every level', () => {
  for (const level of sdsLevels) {
    assert.ok(schreibenTasks.some(task => task.level === level), `writing ${level}`);
    assert.ok(sprechenTasks.some(task => task.level === level), `speaking ${level}`);
  }
  for (const task of schreibenTasks) {
    assert.ok(task.situation && task.points.length && task.modelAnswer, task.id);
    assert.ok(!JSON.stringify(task).includes('ß'), task.id);
    if (task.kind === 'form') assert.ok(task.fields.length >= 4, task.id);
    else assert.ok(engine.countWords(task.modelAnswer) >= task.minWords, `${task.id}: model answer meets its own length`);
  }
  assert.equal(new Set([...schreibenTasks, ...sprechenTasks].map(task => task.id)).size, schreibenTasks.length + sprechenTasks.length);
  assert.ok(sprechenTasks.filter(task => task.level === 'B2').every(task => task.prepSeconds > 0));
});

test('PCM helpers round-trip', () => {
  const samples = Float32Array.from([0, 0.5, -0.5, 1, -1]);
  const bytes = pcm.floatToPcm16(samples);
  assert.equal(bytes.length, 10);
  const back = pcm.pcm16ToFloat(pcm.fromBase64(pcm.toBase64(bytes)));
  samples.forEach((value, i) => assert.ok(Math.abs(back[i] - value) < 0.001, `sample ${i}`));
  for (const text of ['', 'a', 'ab', 'abc', 'abcd']) {
    const raw = Uint8Array.from(Buffer.from(text));
    assert.equal(pcm.toBase64(raw), Buffer.from(text).toString('base64'));
    assert.deepEqual([...pcm.fromBase64(pcm.toBase64(raw))], [...raw]);
  }
  assert.equal(pcm.downsample(new Float32Array(480), 48000, 16000).length, 160);
  assert.deepEqual([...pcm.downsample(Float32Array.from([1, 3, 5, 7]), 32000, 16000)], [2, 6]);
});

test('the SDS mode is named for the progress hub', () => {
  assert.equal(modeNames.sds, 'SDS test');
});
