# Overall practice

## Content and reference

The user-supplied `book.pdf` is *A-Grammatik: Übungsgrammatik Deutsch als
Fremdsprache*, Anne Buscha and Szilvia Szita, SCHUBERT-Verlag, first edition 2010,
covering A1–A2. The entire 187-page PDF was processed. The exercise-bearing pages
were reviewed across all eight grammar chapters and the speaking appendix;
missing picture/table text was recovered from rendered pages.

The app now has 3,037 questions: 1,644 A1 and 1,393 A2. There are 2,947 imported
source adaptations; 30 exact repeats are merged, retaining their other source
references, leaving 2,917 distinct workbook questions plus the original 120.
The level split is an editorial progression, not the book's per-item CEFR rating.

This is a full-book adaptation pass, not a literal transcription or a promise
that every printed blank is a separate quiz. Tables are split into entries;
dialogues may combine several blanks; picture tasks become contextual grammar
prompts; partner word banks become guided solo questions. Completed examples,
pronunciation/listening practice without supplied audio, and wholly open-ended
group tasks are not counted as missing fixed-answer questions. Specific exclusions
and every source exercise page are recorded in [book-coverage.md](book-coverage.md).
No PDF pages, artwork or audio are bundled in the app. Historical statistics and
claims from the 2010 texts are source material, not updated factual guidance;
some such sentences are shortened or explicitly attributed to the text.

| Category | Coverage | Book sections |
| --- | --- | --- |
| Overall A1 | Present tense, sein/haben, vowel changes, modal and separable verbs, basic imperative | 1.1.2, 1.3 |
| Overall A1 | Articles, accusative/dative basics, plurals, possessives, personal pronouns, basic adjectives | 2.1–2.5, 3.1, 4.1 |
| Overall A1 | Time, place, question words, main-clause order, negation, und/oder | 5.1–5.3, 6.1.1, 7.1, 7.3, 8.1.1 |
| Overall A2 | Perfekt, common Präteritum forms, past modals, reflexives, imperatives and polite requests | 1.1.3–1.4, 3.2 |
| Overall A2 | Adjective endings, comparison, dative plurals, location/direction, verb complements | 1.6.2, 2.3, 4.1–4.2, 5.1–5.3 |
| Overall A2 | Conjunctions, weil/wenn/als/dass, indirect questions, relative clauses, infinitives with zu, object order | 3.4, 3.6, 7.2.1, 8.1–8.6 |

## Interaction

Sentence puzzles fix the opening phrase and shuffle the remaining pieces. Pieces
can be dragged into any open slot. Dragging one placed piece onto another swaps
them; dragging from the bank onto an occupied slot returns its old piece to the
bank. Dragging back to the bank removes a placed piece. An outside drop leaves
the answer unchanged. Scrolling pauses during a drag.

Tap or activate a bank piece to fill the next empty slot; select a particular
empty slot first to target it. Tap a placed piece to return it. Reset leaves the
fixed opening in place. Every slot must be filled before an answer can be checked.
Drop targets are measured again at release to account for scrolling and wrapping.

Each gap offers four shuffled choices: one correct answer and three curated
distractors. Inclusion prioritizes the grammar being tested: nominative articles
include der/die/das, accusative den/die/das, and dative dem/der/den, followed by a
fourth alternative. Relative pronouns prioritize the antecedent's case forms;
pronoun substitutions prioritize the requested case; Perfekt auxiliaries include
the competing haben/sein form for the same person. Display order is shuffled.
Verb endings and participles use forms of the same verb and common mistakes.
There is no text input or character
keyboard. Selecting an option fills its numbered gap in the sentence preview.
Each blank is checked independently; a question scores one point only if all
blanks are correct. Choices stay locked after checking, preventing duplicate scores.

## Maintaining exercises

- Original questions live in `data/overall-a1.ts` and `data/overall-a2.ts`; they
  import the expanded banks from `data/book-exercises/index.ts`.
- Source adaptations are organized by chapter in `data/book-exercises/01-*.ts`
  through `17-*.ts`. The builder accepts `group|Text with {answer}` rows, an
  optional `{answer@override-group}`, and `~`-separated accepted alternatives.
  An override group may explicitly list a same-topic option pool with `/`.
- Tag definite article gaps with `article:nom`, `article:acc`, `article:dat` or
  `article:gen`; a bare `article` gap is rejected. Tag relative pronouns with
  `relative:m/f/n/pl` (one gender/number suffix), and pronoun substitutions with
  `pronoun:nom/acc/dat` (one case suffix). Targets belong to each gap because a
  sentence may mix cases. `optionGroup` retains this authoring context for checks.
  Explicit option pools preserve their author's priority order; spelling similarity
  is only a tie-breaker for forms generated from the same verb/adjective stem.
- Keep IDs stable. Progress keys use level and ID, not array positions or filters.
- `bookSection` records the related grammar topic; `source` records PDF page,
  printed page, exercise and adapted item index. The item index is not always the
  original printed subitem number. `additionalSources` preserves repeat origins.
- Gap questions use one `___` per blank. Supply its hint and accepted answers.
  The builder accepts `|`-separated alternatives if more than one form is valid.
- Maintain original distractors in `data/overall-distractors.ts`; workbook option
  families live in `data/book-exercises/builder.ts` and curated participle errors
  in `data/book-exercises/participles.ts`.
  Exactly one of the four displayed choices must be accepted. Do not use unrelated
  vocabulary as filler or include a distractor valid in the intended context.
- Order questions list pieces in the preferred order. Piece 0 is fixed. Explicit
  alternative permutations can be supplied for other accepted orders. Keep
  prompts constrained and group phrases to avoid ambiguous judgments.
- Mixed sessions balance all four formats before prioritizing unseen and weaker
  questions. Focused sessions cap their length to the available pool.

## Validation

Run `npm test` (or `node tests/overall.test.cjs` when subprocess spawning is
restricted) for content integrity, answer checking, sentence placements,
selection, migration of old progress and concurrent storage writes. Run
`npx tsc --noEmit` and `npm run lint` for static checks. For web export, use
`npx expo export --platform web`. A restricted environment can use
`--max-workers 1` and a fresh output directory.

Browser checks cover drag/drop, swapping, tapping and keyboard placement,
multi-blank choices, feedback, session summaries and history. Native device
gesture behavior should also be checked on an Android device before
shipping a new APK.

Run `node scripts/book-coverage.cjs` after changing the bank to refresh the
page-by-page source inventory and totals. Source material remains local in
`book.pdf`; extracted text and rendered inspection pages stay in ignored `tmp/`.
