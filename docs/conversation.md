# Conversation practice

The Conversation card opens ten scenarios: Hotel, Doctor appointment, Restaurant,
Train station, Clothes shop, Supermarket, Apartment viewing, Work meeting,
Visiting a friend, and Tourist information. Each contains five objectives, for
50 authored replies. These are original language-practice scenarios.

Each objective shows the other person's message, the learner's intended reply in
English, and any formal/informal context. The learner builds the German reply in
word slots, with four shuffled alternatives for the active slot. Selecting an
option advances to the next empty slot. Completed slots remain selectable until
the reply is accepted. There is no typing or speech requirement.

Send reply checks the complete response. An incorrect answer highlights the
wrong slots, focuses the first wrong slot, and gives a grammar clue without
supplying the answer forms. Show a hint uses the same clue. Full explanations
appear only after a correct reply or an explicit answer reveal. The learner
can correct it or reveal the intended reply, then continue. Completed exchanges
remain available through Earlier replies. Five objectives lead to a closing
message and a recap of replies needing correction.

First submissions count once per objective per run. Corrections and revealed
answers do not award extra points or overwrite the initial result. Leaving the
screen saves attempted objectives; starting again begins the scenario afresh.
Scenario cards show how many objectives have been tried on the device. Existing
practice history is preserved, and Conversation has its own totals/history label.

Content lives in `data/conversations.ts`; each row explicitly supplies all four
options per word. Scenario IDs and objective IDs are progress identities and
must remain stable when editing text. The scenarios follow a fixed sequence;
they do not use generated dialogue or external services.

Verification covers all 50 objectives, four distinct choices per slot, accepted
and rejected replies, slot advancement, navigation registration, and storage
migration. Phone-width browser checks cover scenario selection, a complete hotel
conversation with a corrected error, one-time scoring, saved history, and no
typing fields or horizontal overflow.
