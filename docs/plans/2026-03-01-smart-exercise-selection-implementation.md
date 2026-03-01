# Smart Exercise Selection Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace random exercise selection with a smart system that tracks per-question stats, avoids repeats within sessions, and prioritizes unseen/frequently-wrong questions.

**Architecture:** New per-question stats stored in AsyncStorage alongside existing mode-level stats. A central `selectExercises()` function scores all questions in a pool by priority (unseen > low-accuracy > high-accuracy), adds jitter, and returns a batch of N distinct exercises. Each screen switches from one-at-a-time random generation to batch selection at session start.

**Tech Stack:** TypeScript, AsyncStorage, existing exercise-logic module

---

### Task 1: Add per-question stats types

**Files:**
- Modify: `lib/types.ts`

**Step 1: Add types to types.ts**

Add at the end of the file:

```typescript
export interface QuestionRecord {
  attempts: number;
  correct: number;
  lastSeen: string; // ISO date
}

export type QuestionStatsMap = Record<string, QuestionRecord>;
```

**Step 2: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add QuestionRecord and QuestionStatsMap types"
```

---

### Task 2: Add per-question stats storage functions

**Files:**
- Modify: `lib/stats.ts`

**Step 1: Add question stats functions**

Add to `lib/stats.ts` after the existing exports:

```typescript
const QUESTION_STATS_KEY = "doiti_question_stats";

export async function getQuestionStats(): Promise<QuestionStatsMap> {
  const raw = await AsyncStorage.getItem(QUESTION_STATS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function recordQuestionAnswer(
  questionId: string,
  correct: boolean
): Promise<void> {
  const stats = await getQuestionStats();
  const existing = stats[questionId] || { attempts: 0, correct: 0, lastSeen: "" };
  existing.attempts += 1;
  if (correct) existing.correct += 1;
  existing.lastSeen = new Date().toISOString();
  stats[questionId] = existing;
  await AsyncStorage.setItem(QUESTION_STATS_KEY, JSON.stringify(stats));
}
```

Also update the `resetStats` function to clear question stats too:

```typescript
export async function resetStats(): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
  await AsyncStorage.removeItem(QUESTION_STATS_KEY);
}
```

Update the import at top to include `QuestionStatsMap` from types.

**Step 2: Commit**

```bash
git add lib/stats.ts
git commit -m "feat: add per-question stats tracking with AsyncStorage"
```

---

### Task 3: Add central selectExercises function

**Files:**
- Modify: `lib/exercise-logic.ts`

**Step 1: Add the selection function**

Add a new exported async function to `lib/exercise-logic.ts`. Import `getQuestionStats` from `./stats` and `QuestionStatsMap` from `./types`.

```typescript
import { getQuestionStats } from "./stats";
import type { QuestionStatsMap } from "./types";

/**
 * Score a question for selection priority.
 * Higher score = more likely to be selected.
 */
function scoreQuestion(
  questionId: string,
  stats: QuestionStatsMap
): number {
  const record = stats[questionId];

  // Never seen → highest priority
  if (!record || record.attempts === 0) {
    return 1.0;
  }

  const accuracy = record.correct / record.attempts;

  // Tiered scoring based on accuracy
  let score: number;
  if (accuracy <= 0.5) {
    score = 0.8;
  } else if (accuracy <= 0.8) {
    score = 0.5;
  } else {
    score = 0.2;
  }

  // Recency bonus: +0.1 if not seen in 7+ days
  const lastSeen = new Date(record.lastSeen);
  const daysSince = (Date.now() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSince >= 7) {
    score += 0.1;
  }

  return score;
}

/**
 * Select `count` exercises from `pool` using smart prioritization.
 * Returns exercises in shuffled order with their question IDs.
 */
export async function selectExercises<T>(
  mode: ExerciseMode,
  pool: T[],
  count: number
): Promise<{ exercises: T[]; questionIds: string[] }> {
  const stats = await getQuestionStats();

  // Score each exercise in the pool
  const scored = pool.map((item, index) => {
    const questionId = `${mode}:${index}`;
    const priority = scoreQuestion(questionId, stats);
    // Add random jitter (0.8–1.2) to avoid determinism
    const jitter = 0.8 + Math.random() * 0.4;
    return { item, questionId, score: priority * jitter, index };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top `count` (capped at pool size)
  const selected = scored.slice(0, Math.min(count, pool.length));

  // Shuffle for presentation order
  const shuffled = shuffle(selected);

  return {
    exercises: shuffled.map((s) => s.item),
    questionIds: shuffled.map((s) => s.questionId),
  };
}
```

**Step 2: Export pool accessors**

Add exported functions that expose the raw exercise pools so screens can pass them to `selectExercises`. Add these near the top of the file, after the existing pool definitions:

```typescript
export function getAllNouns(): Noun[] {
  return allNouns;
}

export function getAllAdjectiveExercises(): AdjectiveExerciseData[] {
  return adjectiveExercises;
}

export function getAllCaseSentences(): CaseSentence[] {
  return allCaseSentences;
}

export function getAllArticleExercises(): ArticleExerciseData[] {
  return articleExercises;
}

export function getAllPossessiveExercises(): PossessiveExerciseData[] {
  return possessiveExercises;
}

export function getAllPronounExercises(): PronounExerciseData[] {
  return pronounExercises;
}

export function getAllPraeteritumExercises(): PraeteritumExerciseData[] {
  return praeteritumExercises;
}

export function getAllPerfektExercises(): PerfektExerciseData[] {
  return perfektExercises;
}
```

**Step 3: Commit**

```bash
git add lib/exercise-logic.ts
git commit -m "feat: add selectExercises with smart prioritization and pool accessors"
```

---

### Task 4: Update Gender screen to use batch selection

**Files:**
- Modify: `app/(tabs)/gender.tsx`

**Step 1: Update imports**

Replace `getRandomNoun` import with `selectExercises, getAllNouns`.
Add `recordQuestionAnswer` to the stats import.

**Step 2: Change handleStart to batch-select**

In `handleStart`, replace `setCurrentNoun(getNextNoun())` with:

```typescript
const handleStart = useCallback(async (count: number) => {
  setTargetCount(count);
  setTotal(0);
  setCorrect(0);
  totalRef.current = 0;
  correctRef.current = 0;
  const { exercises, questionIds } = await selectExercises("gender", getAllNouns(), count);
  exercisesRef.current = exercises;
  questionIdsRef.current = questionIds;
  exerciseIndexRef.current = 0;
  setCurrentNoun(exercises[0]);
  setAnswer({ selected: null, isCorrect: null });
  setShowCelebration(false);
  setCombo(0);
  comboRef.current = 0;
  setPhase("playing");
}, []);
```

Add refs for the batch:

```typescript
const exercisesRef = useRef<Noun[]>([]);
const questionIdsRef = useRef<string[]>([]);
const exerciseIndexRef = useRef(0);
```

**Step 3: Update handleChoice to record per-question stats**

After the existing `recordAnswer("gender", isCorrect)` line, add:

```typescript
recordQuestionAnswer(questionIdsRef.current[exerciseIndexRef.current], isCorrect);
```

**Step 4: Update handleNext to iterate through batch**

Replace `setCurrentNoun(getNextNoun())` with:

```typescript
const nextIndex = exerciseIndexRef.current + 1;
exerciseIndexRef.current = nextIndex;
setCurrentNoun(exercisesRef.current[nextIndex]);
```

**Step 5: Remove the `getNextNoun` helper and `getRandomNoun` import**

The `getNextNoun()` function at top of file is no longer needed.

**Step 6: Commit**

```bash
git add app/(tabs)/gender.tsx
git commit -m "feat: gender screen uses smart batch selection"
```

---

### Task 5: Update Adjectives screen to use batch selection

**Files:**
- Modify: `app/(tabs)/adjectives.tsx`

**Step 1: Update imports**

Replace `generateAdjectiveExercise` with `selectExercises, getAllAdjectiveExercises`.
Add `recordQuestionAnswer` to stats import.
Import `AdjectiveExerciseData` from data file.

**Step 2: Add batch refs and convert handleStart**

Same pattern as gender: add `exercisesRef`, `questionIdsRef`, `exerciseIndexRef`.

In `handleStart`, call `selectExercises("adjectives", getAllAdjectiveExercises(), count)`.

Map each `AdjectiveExerciseData` to `AdjectiveTemplate` using the same mapping as the current `generateAdjectiveExercise()` (just copy the field mapping, use the batch index as `id`).

**Step 3: Update handleSelect to record per-question stats**

After `recordAnswer("adjectives", result)`, add `recordQuestionAnswer(...)`.

**Step 4: Update handleNext to iterate through batch**

Replace `generateAdjectiveExercise()` call with next item from `exercisesRef.current`.

**Step 5: Commit**

```bash
git add app/(tabs)/adjectives.tsx
git commit -m "feat: adjectives screen uses smart batch selection"
```

---

### Task 6: Update Cases screen to use batch selection

**Files:**
- Modify: `app/(tabs)/cases.tsx`

Cases already does batch generation via `getShuffledCaseSentences()`. Replace with `selectExercises("cases", getAllCaseSentences(), count)`.

**Step 1: Update imports and handleStart**

Replace `getShuffledCaseSentences` with `selectExercises, getAllCaseSentences`.
Add `recordQuestionAnswer`.

Store `questionIds` alongside the sentences.

**Step 2: Record per-question stats on each sentence completion**

When all noun phrases in a sentence are answered correctly, call `recordQuestionAnswer(questionIds[currentIndex], allCorrect)`.

**Step 3: Commit**

```bash
git add app/(tabs)/cases.tsx
git commit -m "feat: cases screen uses smart batch selection"
```

---

### Task 7: Update Articles screen to use batch selection

**Files:**
- Modify: `app/(tabs)/articles.tsx`

Same pattern as adjectives. Replace `generateArticleExercise()` with batch from `selectExercises("articles", getAllArticleExercises(), count)`. Map `ArticleExerciseData` → `ArticleExercise`. Add per-question recording.

**Step 1-4:** Follow same steps as Task 5 (adjectives pattern).

**Step 5: Commit**

```bash
git add app/(tabs)/articles.tsx
git commit -m "feat: articles screen uses smart batch selection"
```

---

### Task 8: Update Possessives screen to use batch selection

**Files:**
- Modify: `app/(tabs)/possessives.tsx`

Same pattern. Replace `generatePossessiveExercise()` with batch from `selectExercises("possessives", getAllPossessiveExercises(), count)`. Map data → exercise type. Add per-question recording.

**Step 1-4:** Follow same steps as Task 5 pattern.

**Step 5: Commit**

```bash
git add app/(tabs)/possessives.tsx
git commit -m "feat: possessives screen uses smart batch selection"
```

---

### Task 9: Update Pronouns screen to use batch selection

**Files:**
- Modify: `app/(tabs)/pronouns.tsx`

Same pattern. Replace `generatePronounExercise()` with batch from `selectExercises("pronouns", getAllPronounExercises(), count)`. Add per-question recording.

**Step 1-4:** Follow same steps as Task 5 pattern.

**Step 5: Commit**

```bash
git add app/(tabs)/pronouns.tsx
git commit -m "feat: pronouns screen uses smart batch selection"
```

---

### Task 10: Update Praeteritum screen to use batch selection

**Files:**
- Modify: `app/(tabs)/praeteritum.tsx`

Same pattern. Replace `generatePraeteritumExercise()` with batch from `selectExercises("praeteritum", getAllPraeteritumExercises(), count)`. Add per-question recording.

**Step 1-4:** Follow same steps as Task 5 pattern.

**Step 5: Commit**

```bash
git add app/(tabs)/praeteritum.tsx
git commit -m "feat: praeteritum screen uses smart batch selection"
```

---

### Task 11: Update Perfekt screen to use batch selection

**Files:**
- Modify: `app/(tabs)/perfekt.tsx`

Same pattern. Replace `generatePerfektExercise()` with batch from `selectExercises("perfekt", getAllPerfektExercises(), count)`. Add per-question recording.

**Step 1-4:** Follow same steps as Task 5 pattern.

**Step 5: Commit**

```bash
git add app/(tabs)/perfekt.tsx
git commit -m "feat: perfekt screen uses smart batch selection"
```

---

### Task 12: Clean up unused generate functions

**Files:**
- Modify: `lib/exercise-logic.ts`

**Step 1: Remove unused one-at-a-time generators**

After all screens are updated, the following functions are no longer called:
- `getRandomNoun()`
- `getRandomNouns()`
- `generateAdjectiveExercise()` (and its `adjectiveExerciseId` counter)
- `getRandomCaseSentence()`
- `getShuffledCaseSentences()`
- `generateArticleExercise()` (and its `articleExerciseId` counter)
- `generatePossessiveExercise()` (and its `possessiveExerciseId` counter)
- `generatePronounExercise()` (and its `pronounExerciseId` counter)
- `generatePraeteritumExercise()` (and its `praeteritumExerciseId` counter)
- `generatePerfektExercise()` (and its `perfektExerciseId` counter)

Keep: `shuffle()`, `getArticleForGender()`, all option-generating functions (`getAdjectiveEndingOptions`, `getPossessiveOptions`, `getArticleOptions`, `getPronounOptions`, `getPraeteritumOptions`, `getPerfektOptions`), all pool accessors, and `selectExercises`.

**Step 2: Commit**

```bash
git add lib/exercise-logic.ts
git commit -m "refactor: remove unused one-at-a-time exercise generators"
```

---

### Task 13: Verify the app builds and test manually

**Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 2: Run Expo**

```bash
npx expo start
```

Test each exercise mode: start a session, verify no repeats, verify exercises prioritize correctly after a few sessions.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: smart exercise selection with per-question tracking

Exercises now track per-question accuracy and last-seen dates.
Session selection prioritizes unseen and frequently-wrong questions.
No repeats within a single session."
```
