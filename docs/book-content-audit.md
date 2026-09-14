# Book content classification audit

Completed 2026-09-14. Reviewed all 17 import files: 354 source tasks, 2,947 source items and 2,917 distinct workbook cards after deduplication. The scope is the skill each card tests, its displayed topic/instruction, and membership in the 19 focused decks. This is not a new transcription of the PDF or a claim that every factual statement in the book is current.

All existing cards, answer content, source references, levels and saved question IDs are preserved. 601 source items received a more accurate topic label. 545 distinct cards changed focused-deck membership (417 memberships added, 145 removed); a card can belong to more than one relevant deck.

## Findings and corrections

- **Articles and cases:** questions asking for a case name belong in Case Identification. This includes 12 previously omitted fill-style case questions. Article-case contrast tasks remain in Articles with an explicit instruction to choose the incorrect phrase. Article endings after prepositions are available in both relevant decks.
- **Adjective endings:** article-only and possessive-only dialogue turns moved to the appropriate decks; turns that also test an adjective ending remain. Recovered picture and speaking drills now reach this deck.
- **Personal pronouns:** removed question/indefinite-pronoun tasks and weather-verb conjugations. Pure reflexive turns moved to Reflexive Verbs. Tasks selecting impersonal es remain, as do mixed turns that actually test personal pronouns.
- **Plurals:** four singular-only noun-form questions are now Overall-only. Mixed singular/plural cards still test a plural and remain. Recovered picture plurals and speaking prompts are included.
- **Prepositions:** removed ordinary verb-conjugation and spatial-verb-choice cards where the preposition/case was already supplied. Kept actual preposition/case choices, wo(r)- questions and relevant sentence structures; included the appendix's route and location drills.
- **Separable verbs:** retained the prior correction, with new relevant appendix items. A separable verb merely appearing in a sentence is insufficient when the gap tests another verb. The shared task manifest now owns this classification.
- **Relative Clauses & Questions:** keeps relative-pronoun, relative-clause and indirect-question practice. Unrelated zu-infinitive drills remain in Overall rather than this deck. Appendix indirect questions are included.
- **Präteritum and modal verbs:** verified the past-tense cards and shared actual past-modal tasks with Modal Verbs; no generic past-tense prose was imported solely because its chapter contains modals.
- **Perfekt, conditionals, reflexives, comparisons and connectors:** verified existing task fit and included relevant recovered/speaking tasks. Comparison drills hidden under general sentence structure now reach Comparisons.
- **Passive voice:** retained valid active/passive discrimination and labelled it explicitly, so active werden + noun/adjective is not presented as a passive construction. The formerly noun-labelled electronic-book passive puzzle is correctly classified.
- **Word Pairs:** included five contrasting-adverb choices, such as oben/unten and oft/selten.
- **Other Overall topics:** checked present tense, imperatives, noun declension, question words, numbers/dates, adverbs, negation and infinitives. They remain available in Overall when no existing focused deck matches. Mixed noun and dialogue sections now use the specific task's topic.

## Workbook cards per focused deck

Counts exclude legacy and separately authored cards. Added/removed are deck memberships, not deleted exercises.

| Deck | Before | After | Added | Removed |
| --- | ---: | ---: | ---: | ---: |
| Der/Die/Das | 181 | 181 | 0 | 0 |
| Adjective Endings | 87 | 108 | 23 | 2 |
| Case Identification | 10 | 22 | 12 | 0 |
| Possessive Pronouns | 76 | 117 | 41 | 0 |
| Articles | 149 | 199 | 60 | 10 |
| Personal Pronouns | 123 | 59 | 0 | 64 |
| Präteritum | 200 | 202 | 2 | 0 |
| Perfekt | 133 | 190 | 57 | 0 |
| Plurals | 56 | 65 | 13 | 4 |
| Prepositions | 322 | 369 | 67 | 20 |
| Modal Verbs | 58 | 126 | 68 | 0 |
| Conditionals & Wishes | 69 | 75 | 6 | 0 |
| Connecting Sentences | 157 | 164 | 7 | 0 |
| Separable Verbs | 42 | 57 | 15 | 0 |
| Relative Clauses & Questions | 136 | 103 | 12 | 45 |
| Reflexive Verbs | 79 | 86 | 7 | 0 |
| Passive Voice | 49 | 50 | 1 | 0 |
| Comparisons & Superlatives | 71 | 92 | 21 | 0 |
| Word Pairs | 0 | 5 | 5 | 0 |

## Prevention and validation

- [reviewed-tasks.ts](../data/book-exercises/reviewed-tasks.ts) records every source task, expected item count, primary target and per-item exceptions. Empty mode lists explicitly mean Overall-only.
- [audit.ts](../data/book-exercises/audit.ts) applies those targets, updates misleading inherited instructions/hints, and rejects unreviewed task IDs, out-of-range items, missing items and duplicate source items. When a task's content changes, its learning target must be reviewed as well.
- Focused decks use the explicit targets for workbook content instead of falling back to chapter/topic labels.
- Deduplication retains source references and the union of relevant deck memberships without changing saved question IDs.
- Automated regression checks cover misclassifications, recovered tasks, all-bank validity, stable/shared progress, task coverage and saved practice preferences.
- Validation: 36 tests, TypeScript, lint and the production web export passed. All 19 focused decks and both Overall decks opened on a 390px mobile viewport without horizontal overflow. Word Pairs correctly caps the default session at its 16 available cards. Representative reclassified cards were answered successfully, including a case-identification card at 320px, article/possessive-only turns, active/passive discrimination, multi-gap prepositions and adverb opposites.
