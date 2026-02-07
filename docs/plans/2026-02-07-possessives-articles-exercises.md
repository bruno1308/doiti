# Possessive Pronouns & Articles Exercises Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add two new exercise categories: possessive pronoun conjugation and definite/indefinite article conjugation, both as text-input fill-in-the-blank exercises.

**Architecture:** Each exercise follows the existing 3-phase pattern (setup → playing → summary). New data files provide sentence templates with blanks. New lookup tables provide correct forms. The ExerciseMode union and AllStats are extended. Each exercise gets a new tab screen mirroring the adjectives.tsx pattern.

**Tech Stack:** React Native, Expo Router, TypeScript, AsyncStorage

---

### Task 1: Add accent colors to theme

**Files:**
- Modify: `constants/theme.ts`

**Step 1: Add two new accent colors**

Add after the `neuter` color in `constants/theme.ts`:

```ts
  possessive: "#a855f7",  // purple
  articles: "#06b6d4",    // cyan
```

---

### Task 2: Extend types for new exercise modes

**Files:**
- Modify: `lib/types.ts`

**Step 1: Extend ExerciseMode**

Change line 39:
```ts
export type ExerciseMode = "gender" | "adjectives" | "cases" | "possessives" | "articles";
```

**Step 2: Add PossessiveExercise interface**

Add after the CaseSentence interface:

```ts
export type Person = "ich" | "du" | "er" | "sie_sg" | "es" | "wir" | "ihr" | "sie_pl" | "Sie";

export interface PossessiveExercise {
  id: number;
  person: Person;
  case: GrammaticalCase;
  gender: Gender;
  noun: string;
  nounTranslation: string;
  correctForm: string;
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}
```

**Step 3: Add ArticleExercise interface**

```ts
export interface ArticleExercise {
  id: number;
  articleType: "definite" | "indefinite";
  case: GrammaticalCase;
  gender: Gender;
  noun: string;
  nounTranslation: string;
  correctForm: string;
  sentenceBefore: string;
  sentenceAfter: string;
  translation: string;
}
```

**Step 4: Extend AllStats**

Add to the AllStats interface:
```ts
export interface AllStats {
  gender: ModeStats;
  adjectives: ModeStats;
  cases: ModeStats;
  possessives: ModeStats;
  articles: ModeStats;
  sessions: SessionStats[];
}
```

---

### Task 3: Update stats for new modes

**Files:**
- Modify: `lib/stats.ts`

**Step 1: Update defaultStats**

```ts
const defaultStats: AllStats = {
  gender: { totalAttempted: 0, totalCorrect: 0 },
  adjectives: { totalAttempted: 0, totalCorrect: 0 },
  cases: { totalAttempted: 0, totalCorrect: 0 },
  possessives: { totalAttempted: 0, totalCorrect: 0 },
  articles: { totalAttempted: 0, totalCorrect: 0 },
  sessions: [],
};
```

**Step 2: Update getStats to handle legacy data**

The `getStats` function must gracefully handle stored stats that lack the new modes. After the `JSON.parse(raw)` line, merge defaults:

```ts
export async function getStats(): Promise<AllStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  if (!raw) return JSON.parse(JSON.stringify(defaultStats));
  try {
    const parsed = JSON.parse(raw);
    // Merge defaults for any new modes not in stored data
    return { ...JSON.parse(JSON.stringify(defaultStats)), ...parsed };
  } catch {
    return JSON.parse(JSON.stringify(defaultStats));
  }
}
```

---

### Task 4: Create possessive pronoun data

**Files:**
- Create: `data/possessives.ts`

This file contains:
1. A lookup table for all possessive pronoun forms: `possessiveForms[person][case][gender]`
2. ~25 sentence templates with `[PP]` placeholder
3. A list of nouns with gender and translation for random pairing

```ts
import type { Gender, GrammaticalCase, Person } from "../lib/types";

/**
 * Possessive pronoun stems by person.
 */
const possessiveStems: Record<Person, string> = {
  ich: "mein",
  du: "dein",
  er: "sein",
  sie_sg: "ihr",
  es: "sein",
  wir: "unser",
  ihr: "euer",
  sie_pl: "ihr",
  Sie: "Ihr",
};

/**
 * Endings for possessive pronouns (same pattern as indefinite articles).
 */
const possessiveEndings: Record<GrammaticalCase, Record<Gender, string>> = {
  nominativ: { m: "", f: "e", n: "" },
  akkusativ: { m: "en", f: "e", n: "" },
  dativ: { m: "em", f: "er", n: "em" },
  genitiv: { m: "es", f: "er", n: "es" },
};

/**
 * Get the full possessive pronoun form for a given person, case, and gender.
 * Handles special "euer" contraction (euer → eure, eurem, etc.)
 */
export function getPossessiveForm(
  person: Person,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  const stem = possessiveStems[person];
  const ending = possessiveEndings[grammaticalCase][gender];

  // Special case: "euer" drops the inner "e" when an ending is added
  if (person === "ihr" && stem === "euer" && ending) {
    return "eur" + ending;
  }

  return stem + ending;
}

export const personLabels: Record<Person, string> = {
  ich: "ich (I)",
  du: "du (you)",
  er: "er (he)",
  sie_sg: "sie (she)",
  es: "es (it)",
  wir: "wir (we)",
  ihr: "ihr (you pl.)",
  sie_pl: "sie (they)",
  Sie: "Sie (you formal)",
};

export interface PossessiveNoun {
  noun: string;
  gender: Gender;
  translation: string;
}

export const possessiveNouns: PossessiveNoun[] = [
  { noun: "Hund", gender: "m", translation: "dog" },
  { noun: "Katze", gender: "f", translation: "cat" },
  { noun: "Buch", gender: "n", translation: "book" },
  { noun: "Bruder", gender: "m", translation: "brother" },
  { noun: "Schwester", gender: "f", translation: "sister" },
  { noun: "Auto", gender: "n", translation: "car" },
  { noun: "Lehrer", gender: "m", translation: "teacher" },
  { noun: "Mutter", gender: "f", translation: "mother" },
  { noun: "Haus", gender: "n", translation: "house" },
  { noun: "Freund", gender: "m", translation: "friend" },
  { noun: "Tasche", gender: "f", translation: "bag" },
  { noun: "Handy", gender: "n", translation: "phone" },
  { noun: "Vater", gender: "m", translation: "father" },
  { noun: "Arbeit", gender: "f", translation: "work" },
  { noun: "Fahrrad", gender: "n", translation: "bicycle" },
];

export interface PossessiveTemplate {
  case: GrammaticalCase;
  template: string;
  translation: string;
}

/**
 * 24 sentence templates (6 per case) with [PP] placeholder for the possessive + noun.
 * The translation uses [PP] to show where the possessive goes.
 */
export const possessiveTemplates: PossessiveTemplate[] = [
  // Nominativ (6)
  { case: "nominativ", template: "[PP] ist sehr groß.", translation: "[PP] is very big." },
  { case: "nominativ", template: "[PP] kommt morgen.", translation: "[PP] is coming tomorrow." },
  { case: "nominativ", template: "[PP] ist kaputt.", translation: "[PP] is broken." },
  { case: "nominativ", template: "Wo ist [PP]?", translation: "Where is [PP]?" },
  { case: "nominativ", template: "[PP] gefällt mir.", translation: "I like [PP]." },
  { case: "nominativ", template: "[PP] ist hier.", translation: "[PP] is here." },
  // Akkusativ (6)
  { case: "akkusativ", template: "Ich sehe [PP].", translation: "I see [PP]." },
  { case: "akkusativ", template: "Er sucht [PP].", translation: "He is looking for [PP]." },
  { case: "akkusativ", template: "Wir brauchen [PP].", translation: "We need [PP]." },
  { case: "akkusativ", template: "Sie findet [PP].", translation: "She finds [PP]." },
  { case: "akkusativ", template: "Hast du [PP] gesehen?", translation: "Have you seen [PP]?" },
  { case: "akkusativ", template: "Ich rufe [PP] an.", translation: "I am calling [PP]." },
  // Dativ (6)
  { case: "dativ", template: "Ich helfe [PP].", translation: "I help [PP]." },
  { case: "dativ", template: "Er spricht mit [PP].", translation: "He talks to [PP]." },
  { case: "dativ", template: "Sie gibt [PP] etwas.", translation: "She gives [PP] something." },
  { case: "dativ", template: "Wir fahren zu [PP].", translation: "We drive to [PP]." },
  { case: "dativ", template: "Das gehört [PP].", translation: "That belongs to [PP]." },
  { case: "dativ", template: "Ich danke [PP].", translation: "I thank [PP]." },
  // Genitiv (6)
  { case: "genitiv", template: "Das ist das Zimmer [PP].", translation: "That is the room of [PP]." },
  { case: "genitiv", template: "Die Farbe [PP] ist schön.", translation: "The color of [PP] is nice." },
  { case: "genitiv", template: "Wegen [PP] komme ich zu spät.", translation: "Because of [PP], I am late." },
  { case: "genitiv", template: "Trotz [PP] bin ich glücklich.", translation: "Despite [PP], I am happy." },
  { case: "genitiv", template: "Der Name [PP] ist lang.", translation: "The name of [PP] is long." },
  { case: "genitiv", template: "Die Größe [PP] überrascht mich.", translation: "The size of [PP] surprises me." },
];
```

**Note on "euer"**: The `ihr` person maps to stem "euer", but when an ending is added, the inner "e" drops. However, since `ihr` (2nd person plural) and `sie_pl`/`sie_sg` both use "ihr" as stem — wait, let me reconsider. Actually:
- `ihr` (2pl possessive) = "euer" stem → fix the stems mapping so `ihr: "euer"` is correct.
- `sie_pl` (3pl) and `sie_sg` (3sg fem) both = "ihr"

So the possessiveStems should have `ihr` as person mapped to "euer". Let me double-check in the code above — yes, that's wrong. The `Person` type has `"ihr"` for 2nd person plural. Let me fix: `ihr: "euer"` in the stems. The code above already has `ihr: "euer"` ✓. But wait, it also has `sie_pl: "ihr"`. The issue is in `getPossessiveForm` — the special case check uses `person === "ihr"` and `stem === "euer"`, which is correct. ✓

---

### Task 5: Create article drill data

**Files:**
- Create: `data/articleDrills.ts`

```ts
import type { Gender, GrammaticalCase } from "../lib/types";

export interface ArticleDrillNoun {
  noun: string;
  gender: Gender;
  translation: string;
}

export const articleDrillNouns: ArticleDrillNoun[] = [
  { noun: "Mann", gender: "m", translation: "man" },
  { noun: "Frau", gender: "f", translation: "woman" },
  { noun: "Kind", gender: "n", translation: "child" },
  { noun: "Tisch", gender: "m", translation: "table" },
  { noun: "Lampe", gender: "f", translation: "lamp" },
  { noun: "Fenster", gender: "n", translation: "window" },
  { noun: "Stuhl", gender: "m", translation: "chair" },
  { noun: "Tür", gender: "f", translation: "door" },
  { noun: "Bild", gender: "n", translation: "picture" },
  { noun: "Garten", gender: "m", translation: "garden" },
  { noun: "Straße", gender: "f", translation: "street" },
  { noun: "Zimmer", gender: "n", translation: "room" },
  { noun: "Arzt", gender: "m", translation: "doctor" },
  { noun: "Schule", gender: "f", translation: "school" },
  { noun: "Restaurant", gender: "n", translation: "restaurant" },
];

export interface ArticleDrillTemplate {
  case: GrammaticalCase;
  template: string;
  translation: string;
}

/**
 * 24 sentence templates (6 per case) with [ART] placeholder for article + noun.
 */
export const articleDrillTemplates: ArticleDrillTemplate[] = [
  // Nominativ (6)
  { case: "nominativ", template: "[ART] ist hier.", translation: "[ART] is here." },
  { case: "nominativ", template: "[ART] ist sehr alt.", translation: "[ART] is very old." },
  { case: "nominativ", template: "Wo ist [ART]?", translation: "Where is [ART]?" },
  { case: "nominativ", template: "[ART] gefällt mir.", translation: "I like [ART]." },
  { case: "nominativ", template: "[ART] kommt bald.", translation: "[ART] is coming soon." },
  { case: "nominativ", template: "[ART] ist neu.", translation: "[ART] is new." },
  // Akkusativ (6)
  { case: "akkusativ", template: "Ich sehe [ART].", translation: "I see [ART]." },
  { case: "akkusativ", template: "Er kauft [ART].", translation: "He buys [ART]." },
  { case: "akkusativ", template: "Wir brauchen [ART].", translation: "We need [ART]." },
  { case: "akkusativ", template: "Sie findet [ART].", translation: "She finds [ART]." },
  { case: "akkusativ", template: "Ich nehme [ART].", translation: "I take [ART]." },
  { case: "akkusativ", template: "Kennst du [ART]?", translation: "Do you know [ART]?" },
  // Dativ (6)
  { case: "dativ", template: "Ich helfe [ART].", translation: "I help [ART]." },
  { case: "dativ", template: "Er spricht mit [ART].", translation: "He speaks with [ART]." },
  { case: "dativ", template: "Sie gibt [ART] etwas.", translation: "She gives [ART] something." },
  { case: "dativ", template: "Wir wohnen neben [ART].", translation: "We live next to [ART]." },
  { case: "dativ", template: "Das gehört [ART].", translation: "That belongs to [ART]." },
  { case: "dativ", template: "Ich komme aus [ART].", translation: "I come from [ART]." },
  // Genitiv (6)
  { case: "genitiv", template: "Das ist das Haus [ART].", translation: "That is the house of [ART]." },
  { case: "genitiv", template: "Die Farbe [ART] ist schön.", translation: "The color of [ART] is nice." },
  { case: "genitiv", template: "Wegen [ART] bleibe ich.", translation: "Because of [ART], I stay." },
  { case: "genitiv", template: "Trotz [ART] gehen wir.", translation: "Despite [ART], we go." },
  { case: "genitiv", template: "Der Preis [ART] ist hoch.", translation: "The price of [ART] is high." },
  { case: "genitiv", template: "Die Qualität [ART] ist gut.", translation: "The quality of [ART] is good." },
];
```

The article lookup table already exists in `lib/declension.ts` (`getArticle` function), so the exercise logic will reuse it directly.

---

### Task 6: Add exercise generation functions

**Files:**
- Modify: `lib/exercise-logic.ts`

**Step 1: Add imports**

```ts
import { possessiveNouns, possessiveTemplates, getPossessiveForm } from "../data/possessives";
import { articleDrillNouns, articleDrillTemplates } from "../data/articleDrills";
import type { PossessiveExercise, ArticleExercise, Person } from "./types";
```

**Step 2: Add generatePossessiveExercise()**

```ts
let possessiveExerciseId = 0;

const allPersons: Person[] = ["ich", "du", "er", "sie_sg", "es", "wir", "ihr", "sie_pl", "Sie"];

export function generatePossessiveExercise(): PossessiveExercise {
  const noun = possessiveNouns[Math.floor(Math.random() * possessiveNouns.length)];
  const template = possessiveTemplates[Math.floor(Math.random() * possessiveTemplates.length)];
  const person = allPersons[Math.floor(Math.random() * allPersons.length)];

  const correctForm = getPossessiveForm(person, template.case, noun.gender);
  const [sentenceBefore, sentenceAfter] = template.template.split("[PP]");

  possessiveExerciseId += 1;

  return {
    id: possessiveExerciseId,
    person,
    case: template.case,
    gender: noun.gender,
    noun: noun.noun,
    nounTranslation: noun.translation,
    correctForm,
    sentenceBefore: sentenceBefore ?? "",
    sentenceAfter: sentenceAfter ?? "",
    translation: template.translation.replace("[PP]", correctForm + " " + noun.noun),
  };
}
```

**Step 3: Add generateArticleExercise()**

```ts
let articleExerciseId = 0;

export function generateArticleExercise(): ArticleExercise {
  const noun = articleDrillNouns[Math.floor(Math.random() * articleDrillNouns.length)];
  const template = articleDrillTemplates[Math.floor(Math.random() * articleDrillTemplates.length)];
  const articleType: "definite" | "indefinite" = Math.random() < 0.5 ? "definite" : "indefinite";

  const correctForm = getArticle(articleType, template.case, noun.gender);
  const [sentenceBefore, sentenceAfter] = template.template.split("[ART]");

  articleExerciseId += 1;

  return {
    id: articleExerciseId,
    articleType,
    case: template.case,
    gender: noun.gender,
    noun: noun.noun,
    nounTranslation: noun.translation,
    correctForm,
    sentenceBefore: sentenceBefore ?? "",
    sentenceAfter: sentenceAfter ?? "",
    translation: template.translation.replace("[ART]", correctForm + " " + noun.noun),
  };
}
```

---

### Task 7: Create possessives exercise screen

**Files:**
- Create: `app/(tabs)/possessives.tsx`

This screen mirrors `adjectives.tsx` closely. Key differences:
- Uses `generatePossessiveExercise()` instead of `generateAdjectiveExercise()`
- Mode is `"possessives"`
- Accent color is `colors.possessive` (purple)
- Info badges show person (e.g. "ich") and case
- Sentence shows blank: `"Ich sehe ___ Hund."`
- User types the full possessive form (e.g. "meinen")
- Input is standalone (no prefix like adjective endings)
- Hint shows noun translation
- Feedback shows correct full form on wrong answer

The screen follows the exact same 3-phase pattern, animation logic, shake/celebration behavior, and session recording as adjectives.tsx. Reuse ExerciseSetup, ExerciseSummary, CelebrationOverlay components.

Use the `adjectives-card.webp` image temporarily (or `cases-card.webp`) since we don't have dedicated images yet — use `cases-card.webp` for possessives.

---

### Task 8: Create articles exercise screen

**Files:**
- Create: `app/(tabs)/articles.tsx`

Same pattern as possessives screen but:
- Uses `generateArticleExercise()`
- Mode is `"articles"`
- Accent color is `colors.articles` (cyan)
- Info badges show article type ("Definite"/"Indefinite") and case
- Sentence shows blank: `"Ich sehe ___ Mann."`
- User types the article form (e.g. "den")
- Hint shows noun translation and gender hint

Use `gender-card.webp` image temporarily since articles relate to gender.

---

### Task 9: Add tabs for new exercises

**Files:**
- Modify: `app/(tabs)/_layout.tsx`

Add two new Tabs.Screen entries after the Cases tab:

```tsx
<Tabs.Screen
  name="possessives"
  options={{
    title: "Possessives",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="people" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="articles"
  options={{
    title: "Articles",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="document-text" size={size} color={color} />
    ),
  }}
/>
```

---

### Task 10: Add cards to home screen

**Files:**
- Modify: `app/(tabs)/index.tsx`

**Step 1: Update modeNames**

```ts
const modeNames: Record<ExerciseMode, string> = {
  gender: "Der/Die/Das",
  adjectives: "Adjective Endings",
  cases: "Case Identification",
  possessives: "Possessive Pronouns",
  articles: "Articles",
};
```

**Step 2: Update default stats in useState**

Add the new modes to the default state:
```ts
const [stats, setStats] = useState<AllStats>({
  gender: { totalAttempted: 0, totalCorrect: 0 },
  adjectives: { totalAttempted: 0, totalCorrect: 0 },
  cases: { totalAttempted: 0, totalCorrect: 0 },
  possessives: { totalAttempted: 0, totalCorrect: 0 },
  articles: { totalAttempted: 0, totalCorrect: 0 },
  sessions: [],
});
```

**Step 3: Add ModeCards**

After the Cases ModeCard, add:

```tsx
<ModeCard
  title="Possessive Pronouns"
  subtitle="Conjugate mein, dein, sein..."
  image={casesCard}
  accentColor={colors.possessive}
  modeStats={stats.possessives}
  onPress={() => router.push("/possessives")}
/>

<ModeCard
  title="Articles"
  subtitle="Practice definite & indefinite articles"
  image={genderCard}
  accentColor={colors.articles}
  modeStats={stats.articles}
  onPress={() => router.push("/articles")}
/>
```

---

### Task 11: Verify and test

**Step 1: Run the app**

```bash
npx expo start
```

**Step 2: Manual test checklist**
- [ ] Home screen shows 5 exercise cards
- [ ] All 5 tabs appear in bottom nav
- [ ] Possessives: setup → play 5 → summary → done navigates home
- [ ] Articles: setup → play 5 → summary → done navigates home
- [ ] Possessives: correct answer shows celebration, wrong shows shake + correct answer
- [ ] Articles: correct answer shows celebration, wrong shows shake + correct answer
- [ ] Stats persist across sessions (check home screen "X practiced" counters)
- [ ] Recent sessions show possessive/article entries with correct names
