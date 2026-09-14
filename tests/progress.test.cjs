const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, f);
const { activityFromSessions, localDay, weekTrail } = require('../lib/activity.ts');
const { needsReview, isFamiliar } = require('../lib/question-progress.ts');
const { describeSkill, recommendPractice } = require('../lib/progress.ts');
const { skillDefinitions, progressQuestions } = require('../data/progress-catalog.ts');
const { focusedPractice } = require('../data/focused-practice.ts');
const { defaultPracticePreferences, selectPracticeSession } = require('../lib/practice-preferences.ts');
const { overallQuestionId } = require('../lib/overall-logic.ts');

const now = new Date(2026, 8, 16, 12);
function record(attempts, correct, recent, lastSeen = now.toISOString()) { return { attempts, correct, recent, lastSeen }; }

test('weekly trail uses local calendar days, rolls Monday to Sunday and leaves future days empty', () => {
  const activity = activityFromSessions([
    { date: new Date(2026, 8, 14, 23, 59).toISOString(), total: 5, correct: 3 },
    { date: new Date(2026, 8, 15, 0, 1).toISOString(), total: 8, correct: 7 },
    { date: 'invalid', total: 100, correct: 100 },
  ]);
  assert.equal(activity['2026-09-14'].attempts, 5);
  assert.equal(activity['2026-09-15'].attempts, 8);
  const trail = weekTrail({ ...activity, '2026-09-20': { attempts: 99, correct: 99 } }, now);
  assert.equal(trail[0].key, '2026-09-14');
  assert.equal(trail[6].key, '2026-09-20');
  assert.equal(trail.find(d => d.today).key, localDay(now));
  assert.equal(trail.filter(d => d.attempts).length, 2);
  assert.ok(trail.slice(3).every(d => d.future && !d.attempts));
  assert.equal(weekTrail(activity, new Date(2026, 8, 21))[0].key, '2026-09-21');
});

test('skill signals distinguish unseen, repeated success, recent mistakes and recovery', () => {
  assert.equal(needsReview(undefined), false);
  assert.equal(isFamiliar(record(1, 1, [true])), false);
  assert.equal(needsReview(record(10, 9, [true, true, false])), true);
  assert.equal(isFamiliar(record(10, 9, [true, true, false])), false);
  assert.equal(isFamiliar(record(13, 12, [true, false, true, true, true])), true);
  assert.equal(needsReview(record(3, 1)), true);
  assert.equal(isFamiliar(record(10, 9)), true);
  assert.equal(isFamiliar(record(11, 10, [true])), true);
  const skill = { id: 'gender', title: 'Gender', icon: 'book-outline', questions: Array.from({ length: 5 }, (_, i) => ({ id: String(i), kind: 'choice' })) };
  assert.equal(describeSkill(skill, {}).status, 'New');
  assert.equal(describeSkill(skill, { 0: record(1, 1, [true]) }).status, 'Building');
  const stats = Object.fromEntries(skill.questions.map(q => [q.id, record(3, 3, [true, true, true])]));
  assert.equal(describeSkill(skill, stats).status, 'Comfortable');
  stats[0] = stats[1] = record(4, 3, [true, true, true, false]);
  assert.equal(describeSkill(skill, stats).status, 'Needs another look');
});

test('recommendations use real missed questions, respect selected types and do not call unseen skills weak', () => {
  const prefs = defaultPracticePreferences();
  assert.equal(recommendPractice(skillDefinitions, {}, prefs, now).focus, 'mixed');
  const e = focusedPractice.prepositions.pool.find(e => e.kind === 'choice');
  const stats = { [overallQuestionId(e)]: record(10, 9, [true, true, false]) };
  const recommendation = recommendPractice(skillDefinitions, stats, prefs, now);
  assert.equal(recommendation.mode, 'prepositions');
  assert.equal(recommendation.focus, 'review');
  const selected = selectPracticeSession(focusedPractice.prepositions.pool, prefs, stats, true);
  assert.equal(selected[0].id, e.id, 'recent mistake comes before unseen cards even with high lifetime accuracy');
  assert.equal(new Set(selected.map(overallQuestionId)).size, selected.length);
  const matching = recommendPractice(skillDefinitions, stats, { count: 5, kinds: ['match'] }, now);
  assert.notEqual(matching.mode, 'prepositions');
  assert.ok(focusedPractice[matching.mode].pool.some(e => e.kind === 'match'));
  assert.ok(selectPracticeSession(focusedPractice.prepositions.pool, { count: 5, kinds: ['fill'] }, stats, true).every(e => e.kind === 'fill'));
});

test('unique collection totals deduplicate shared workbook questions and include conversation objectives', () => {
  assert.equal(progressQuestions.length, new Set(progressQuestions.map(q => q.id)).size);
  assert.equal(progressQuestions.filter(q => q.id.startsWith('conversation:')).length, 50);
  for (const skill of skillDefinitions) assert.equal(skill.questions.length, new Set(skill.questions.map(q => q.id)).size);
  const shared = skillDefinitions.flatMap(s => s.questions).find(q => skillDefinitions.filter(s => s.questions.some(p => p.id === q.id)).length > 1);
  assert.ok(shared);
  assert.equal(progressQuestions.filter(q => q.id === shared.id).length, 1);
});
