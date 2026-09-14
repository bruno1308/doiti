# Focused practice rollout

Implemented in this update:

- [x] Upgrade all 11 existing modes to the shared practice experience.
- [x] Preserve their existing exercise banks and original question progress keys.
- [x] Include relevant Overall A1/A2 exercises in focused modes, sharing question progress.
- [x] Add Conditionals & Wishes, Connecting Sentences, Separable Verbs, Relative Clauses & Questions, Reflexive Verbs, and Passive Voice.
- [x] Add Comparisons & Superlatives and Word Pairs, including opposites and similar meanings.
- [x] Add 12 focused dann/denn/wenn questions and 12 sentence puzzles.
- [x] Add 21 matching boards with four pairs each: 10 comparison/superlative boards, six opposite boards, and five similar-meaning boards.
- [x] Offer sentence dragging wherever the topic has sentence puzzles, plus tap/keyboard alternatives.
- [x] Start practice immediately; save session length and activity preferences in Settings.
- [x] Group the grammar library using Nouns & cases, Verbs, Sentences, and Word pairs buttons.

## Interaction

All modes use `OverallPractice`. Single answers use buttons; sentence pieces can
be dragged or tapped into slots. Matching uses two columns: select a left item,
then a right item to connect them. Lines and numbered pair labels show the
connections. Reusing a connected partner swaps it when both items already have
partners; otherwise it moves the connection. Connections can be cleared or reset
before checking. Four correct connections score one exercise. Checked activities
lock their controls and show the solution; incomplete activities cannot be checked.

Selecting a deck starts 20 mixed cards immediately. Settings stores session length
and a nonempty selection of exercise types in `doiti_practice_preferences`,
separately from progress. New sessions wait for pending preference writes, filter
the chosen deck to selected types, and balance only those types. Session lengths
are capped to available questions without repeats. A deck with no matching types
shows an explanation and a Settings link instead of silently ignoring preferences.
Conversation retains its scenario selection and five objectives per scenario.

Der/Die/Das admits only noun-gender article choices, regardless of the source
chapter label. Sentence puzzles from the same chapter remain in Overall practice.

## Data and progress

`practice-modes.ts` holds the home/navigation catalogue. `focused-practice.ts`
selects relevant topics from the existing Overall banks; it reuses the same
exercise objects. `legacy-practice.ts` adapts every original specialized question
and retains its `mode:index` key through `progressKey`. Original source data files
remain intact. The old standalone screen implementations are replaced by small
routes into the shared screen.

Session totals count toward the mode being practised. Question mastery follows
the question regardless of whether it is shown in Overall or a focused mode;
practising it in two places does not create two independent mastery records.
Existing totals and history are preserved, and new modes receive empty defaults.

New matching and connector questions are additional original practice, not
presented as book extracts. The Overall banks remain at 3,037 exercises; focused
mode totals overlap because topics can share the same questions.

## Verification

Automated checks cover all mode banks, original and shared progress identities,
answer validity, matching swaps and incomplete answers, small filtered pools,
source coverage, and migration of existing saved progress. Browser checks cover
all 19 routes at phone width, absence of typing fields and horizontal overflow,
matching reconnection/scoring/saving, and sentence dragging. Type checking,
lint, and the production web export also pass.
