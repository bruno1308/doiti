const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { comboStats, isComboMilestone, completionKind } = require('../lib/celebrations.ts');

test('combos count first attempts, reset on mistakes, and retain the best run', () => {
  const attempts = [true,true,true,false,true,true].map(correct=>({correct}));
  assert.deepEqual(comboStats(attempts), {current:2,best:3});
  assert.deepEqual(comboStats([...attempts,{correct:false}]), {current:0,best:3});
  assert.deepEqual(comboStats([]), {current:0,best:0});
  assert.deepEqual(comboStats(attempts), {current:2,best:3}, 'reading the same answers never increments a combo');
  assert.deepEqual(Array.from({length:21},(_,i)=>i).filter(isComboMilestone),[3,5,10,15,20]);
});
test('perfect rewards require a fully finished nonempty session, not an early exit', () => {
  assert.equal(completionKind(5,5,true),'perfect');
  assert.equal(completionKind(4,5,true),'complete');
  assert.equal(completionKind(0,5,true),'complete');
  assert.equal(completionKind(3,3,false),'saved');
  assert.equal(completionKind(0,0,true),'saved');
});
