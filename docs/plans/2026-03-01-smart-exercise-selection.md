# Smart Exercise Selection

## Problem

Exercises are selected randomly with no dedup and no memory. When a student selects many exercises, they may see repeats within the same session. There's no tracking of which questions the student has seen or how well they performed on each one.

## Design

### Per-Question Tracking

Each question gets a stable ID: `{exerciseType}:{arrayIndex}` (e.g., `gender:42`).

New AsyncStorage key `doiti_question_stats` stores:

```typescript
interface QuestionRecord {
  attempts: number;
  correct: number;
  lastSeen: string; // ISO date
}
type QuestionStatsMap = Record<string, QuestionRecord>;
```

### Smart Selection Algorithm

When starting a session of N exercises:

1. Load all questions for the exercise type + the QuestionStatsMap
2. Score each question with a priority tier:
   - Never seen → 1.0
   - Seen, accuracy ≤50% → 0.8
   - Seen, accuracy 51-80% → 0.5
   - Seen, accuracy >80% → 0.2
   - Recency bonus: questions not seen in 7+ days get +0.1
3. Multiply by random jitter (0.8–1.2) to avoid determinism
4. Sort descending, take top N
5. Shuffle the selected N for presentation order
6. No repeats guaranteed (N distinct questions from pool)

### Integration

All 8 exercise screens switch from one-at-a-time random generation to batch selection at session start.

New central function:
```typescript
async function selectExercises<T>(
  mode: ExerciseMode,
  pool: T[],
  count: number
): Promise<{ exercises: T[], questionIds: string[] }>
```

Each screen:
- Calls `selectExercises()` once at setup
- Iterates through the returned list during play
- Calls `recordQuestionAnswer(questionId, correct)` after each answer

### Scope

All 8 exercise types: gender, adjectives, cases, articles, possessives, pronouns, praeteritum, perfekt.

Pool sizes (all > 20, sufficient for max session size):
- Gender: 502 nouns
- Adjectives: 177
- Cases: 225
- Articles: 442
- Possessives: 500
- Pronouns: 58
- Praeteritum: 107
- Perfekt: 101
