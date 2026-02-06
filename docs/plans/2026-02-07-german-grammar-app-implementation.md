# German Grammar Practice App - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an offline Android app with three German grammar exercise modes: article gender quiz, adjective declension fill-in-the-blank, and case identification.

**Architecture:** React Native + Expo app with tab navigation (Expo Router). All exercise data bundled as JSON. Local progress tracking via AsyncStorage. No backend.

**Tech Stack:** React Native, Expo (SDK 52+), TypeScript, Expo Router, AsyncStorage

---

### Task 1: Scaffold Expo Project

**Step 1: Initialize Expo project**

Run from `B:\Projects\Doiti`:
```bash
npx create-expo-app@latest . --template blank-typescript
```
If it complains about existing files, use `--yes` or move CLAUDE.md/docs temporarily.

Expected: Expo project scaffolded with TypeScript template.

**Step 2: Install dependencies**

```bash
npx expo install expo-router expo-linking expo-constants expo-status-bar @react-native-async-storage/async-storage react-native-safe-area-context react-native-screens expo-splash-screen
```

**Step 3: Configure Expo Router**

Modify `package.json` — set main entry:
```json
{
  "main": "expo-router/entry"
}
```

Modify `app.json`:
```json
{
  "expo": {
    "name": "Doiti",
    "slug": "doiti",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "doiti",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.doiti.app"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

**Step 4: Create app directory structure**

```
mkdir app
mkdir app/(tabs)
mkdir components
mkdir data
mkdir lib
mkdir constants
```

**Step 5: Create root layout — `app/_layout.tsx`**

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

**Step 6: Create tab layout — `app/(tabs)/_layout.tsx`**

```tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#f8fafc",
        tabBarStyle: { backgroundColor: "#1e293b", borderTopColor: "#334155" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gender"
        options={{
          title: "Der/Die/Das",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adjectives"
        options={{
          title: "Adjectives",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cases"
        options={{
          title: "Cases",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

**Step 7: Create placeholder screens**

`app/(tabs)/index.tsx`:
```tsx
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doiti</Text>
      <Text style={styles.subtitle}>German Grammar Practice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  title: { fontSize: 32, fontWeight: "bold", color: "#f8fafc" },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 8 },
});
```

`app/(tabs)/gender.tsx`:
```tsx
import { View, Text, StyleSheet } from "react-native";
export default function GenderScreen() {
  return (
    <View style={styles.container}><Text style={styles.text}>Gender Quiz</Text></View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  text: { color: "#f8fafc", fontSize: 24 },
});
```

`app/(tabs)/adjectives.tsx`:
```tsx
import { View, Text, StyleSheet } from "react-native";
export default function AdjectivesScreen() {
  return (
    <View style={styles.container}><Text style={styles.text}>Adjective Endings</Text></View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  text: { color: "#f8fafc", fontSize: 24 },
});
```

`app/(tabs)/cases.tsx`:
```tsx
import { View, Text, StyleSheet } from "react-native";
export default function CasesScreen() {
  return (
    <View style={styles.container}><Text style={styles.text}>Case Identification</Text></View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  text: { color: "#f8fafc", fontSize: 24 },
});
```

**Step 8: Verify app runs**

```bash
npx expo start
```
Press `a` for Android or use web. Verify tabs appear and navigate correctly.

**Step 9: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Expo project with tab navigation"
```

---

### Task 2: Create Data Files

**Step 1: Create types — `lib/types.ts`**

```tsx
export interface Noun {
  word: string;
  gender: "m" | "f" | "n";
  plural: string;
  translation: string;
}

export type ArticleType = "definite" | "indefinite" | "none";
export type GrammaticalCase = "nominativ" | "akkusativ" | "dativ" | "genitiv";
export type Gender = "m" | "f" | "n";

export interface AdjectiveTemplate {
  id: number;
  articleType: ArticleType;
  case: GrammaticalCase;
  gender: Gender;
  article: string;
  noun: string;
  nounTranslation: string;
  adjective: string;
  adjectiveTranslation: string;
  correctEnding: string;
  sentenceBefore: string;
  sentenceAfter: string;
}

export interface NounPhrase {
  text: string;
  case: GrammaticalCase;
}

export interface CaseSentence {
  id: number;
  sentence: string;
  nounPhrases: NounPhrase[];
  translation: string;
}

export type ExerciseMode = "gender" | "adjectives" | "cases";

export interface SessionStats {
  mode: ExerciseMode;
  date: string;
  total: number;
  correct: number;
}

export interface ModeStats {
  totalAttempted: number;
  totalCorrect: number;
}

export interface AllStats {
  gender: ModeStats;
  adjectives: ModeStats;
  cases: ModeStats;
  sessions: SessionStats[];
}
```

**Step 2: Create nouns data — `data/nouns.ts`**

Create a TypeScript file exporting an array of ~300 common German nouns. Include a balanced mix of masculine, feminine, and neuter nouns. Example structure:

```tsx
import { Noun } from "../lib/types";

const nouns: Noun[] = [
  // Masculine (der)
  { word: "Hund", gender: "m", plural: "Hunde", translation: "dog" },
  { word: "Mann", gender: "m", plural: "Männer", translation: "man" },
  { word: "Tisch", gender: "m", plural: "Tische", translation: "table" },
  { word: "Stuhl", gender: "m", plural: "Stühle", translation: "chair" },
  { word: "Baum", gender: "m", plural: "Bäume", translation: "tree" },
  { word: "Tag", gender: "m", plural: "Tage", translation: "day" },
  { word: "Freund", gender: "m", plural: "Freunde", translation: "friend" },
  { word: "Apfel", gender: "m", plural: "Äpfel", translation: "apple" },
  { word: "Bruder", gender: "m", plural: "Brüder", translation: "brother" },
  { word: "Garten", gender: "m", plural: "Gärten", translation: "garden" },
  // ... ~100 masculine nouns total

  // Feminine (die)
  { word: "Katze", gender: "f", plural: "Katzen", translation: "cat" },
  { word: "Frau", gender: "f", plural: "Frauen", translation: "woman" },
  { word: "Schule", gender: "f", plural: "Schulen", translation: "school" },
  { word: "Blume", gender: "f", plural: "Blumen", translation: "flower" },
  { word: "Straße", gender: "f", plural: "Straßen", translation: "street" },
  // ... ~100 feminine nouns total

  // Neuter (das)
  { word: "Kind", gender: "n", plural: "Kinder", translation: "child" },
  { word: "Haus", gender: "n", plural: "Häuser", translation: "house" },
  { word: "Buch", gender: "n", plural: "Bücher", translation: "book" },
  { word: "Auto", gender: "n", plural: "Autos", translation: "car" },
  { word: "Bier", gender: "n", plural: "Biere", translation: "beer" },
  // ... ~100 neuter nouns total
];

export default nouns;
```

**Important:** The actual file must contain at MINIMUM 300 nouns (100 per gender). Use common A1-B1 level vocabulary. Every noun must have accurate gender, plural, and translation.

**Step 3: Create adjective declension tables — `lib/declension.ts`**

```tsx
import { ArticleType, GrammaticalCase, Gender } from "./types";

// Adjective ending tables
// [articleType][case][gender]
const endings: Record<ArticleType, Record<GrammaticalCase, Record<Gender, string>>> = {
  definite: {
    nominativ: { m: "e", f: "e", n: "e" },
    akkusativ: { m: "en", f: "e", n: "e" },
    dativ: { m: "en", f: "en", n: "en" },
    genitiv: { m: "en", f: "en", n: "en" },
  },
  indefinite: {
    nominativ: { m: "er", f: "e", n: "es" },
    akkusativ: { m: "en", f: "e", n: "es" },
    dativ: { m: "en", f: "en", n: "en" },
    genitiv: { m: "en", f: "en", n: "en" },
  },
  none: {
    nominativ: { m: "er", f: "e", n: "es" },
    akkusativ: { m: "en", f: "e", n: "es" },
    dativ: { m: "em", f: "er", n: "em" },
    genitiv: { m: "en", f: "er", n: "en" },
  },
};

export function getAdjectiveEnding(
  articleType: ArticleType,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  return endings[articleType][grammaticalCase][gender];
}

// Articles for each type/case/gender
const articles: Record<ArticleType, Record<GrammaticalCase, Record<Gender, string>>> = {
  definite: {
    nominativ: { m: "der", f: "die", n: "das" },
    akkusativ: { m: "den", f: "die", n: "das" },
    dativ: { m: "dem", f: "der", n: "dem" },
    genitiv: { m: "des", f: "der", n: "des" },
  },
  indefinite: {
    nominativ: { m: "ein", f: "eine", n: "ein" },
    akkusativ: { m: "einen", f: "eine", n: "ein" },
    dativ: { m: "einem", f: "einer", n: "einem" },
    genitiv: { m: "eines", f: "einer", n: "eines" },
  },
  none: {
    nominativ: { m: "", f: "", n: "" },
    akkusativ: { m: "", f: "", n: "" },
    dativ: { m: "", f: "", n: "" },
    genitiv: { m: "", f: "", n: "" },
  },
};

export function getArticle(
  articleType: ArticleType,
  grammaticalCase: GrammaticalCase,
  gender: Gender
): string {
  return articles[articleType][grammaticalCase][gender];
}
```

**Step 4: Create adjective exercise data — `data/adjectives.ts`**

```tsx
interface AdjectiveNounPair {
  adjective: string;
  adjectiveTranslation: string;
  noun: string;
  nounTranslation: string;
  gender: "m" | "f" | "n";
}

interface SentenceTemplate {
  case: "nominativ" | "akkusativ" | "dativ" | "genitiv";
  // {article} {adj}{ending} {noun} will be substituted
  before: string; // text before the noun phrase
  after: string;  // text after the noun phrase
}

export const adjectiveNounPairs: AdjectiveNounPair[] = [
  { adjective: "groß", adjectiveTranslation: "big", noun: "Mann", nounTranslation: "man", gender: "m" },
  { adjective: "klein", adjectiveTranslation: "small", noun: "Kind", nounTranslation: "child", gender: "n" },
  { adjective: "alt", adjectiveTranslation: "old", noun: "Frau", nounTranslation: "woman", gender: "f" },
  { adjective: "jung", adjectiveTranslation: "young", noun: "Mädchen", nounTranslation: "girl", gender: "n" },
  { adjective: "schön", adjectiveTranslation: "beautiful", noun: "Blume", nounTranslation: "flower", gender: "f" },
  { adjective: "rot", adjectiveTranslation: "red", noun: "Auto", nounTranslation: "car", gender: "n" },
  { adjective: "neu", adjectiveTranslation: "new", noun: "Haus", nounTranslation: "house", gender: "n" },
  { adjective: "lang", adjectiveTranslation: "long", noun: "Straße", nounTranslation: "street", gender: "f" },
  { adjective: "kalt", adjectiveTranslation: "cold", noun: "Winter", nounTranslation: "winter", gender: "m" },
  { adjective: "warm", adjectiveTranslation: "warm", noun: "Sommer", nounTranslation: "summer", gender: "m" },
  { adjective: "gut", adjectiveTranslation: "good", noun: "Buch", nounTranslation: "book", gender: "n" },
  { adjective: "schlecht", adjectiveTranslation: "bad", noun: "Wetter", nounTranslation: "weather", gender: "n" },
  { adjective: "schnell", adjectiveTranslation: "fast", noun: "Zug", nounTranslation: "train", gender: "m" },
  { adjective: "langsam", adjectiveTranslation: "slow", noun: "Bus", nounTranslation: "bus", gender: "m" },
  { adjective: "teuer", adjectiveTranslation: "expensive", noun: "Restaurant", nounTranslation: "restaurant", gender: "n" },
  { adjective: "billig", adjectiveTranslation: "cheap", noun: "Hotel", nounTranslation: "hotel", gender: "n" },
  { adjective: "interessant", adjectiveTranslation: "interesting", noun: "Film", nounTranslation: "film", gender: "m" },
  { adjective: "langweilig", adjectiveTranslation: "boring", noun: "Vorlesung", nounTranslation: "lecture", gender: "f" },
  { adjective: "lecker", adjectiveTranslation: "delicious", noun: "Kuchen", nounTranslation: "cake", gender: "m" },
  { adjective: "frisch", adjectiveTranslation: "fresh", noun: "Brot", nounTranslation: "bread", gender: "n" },
  { adjective: "dunkel", adjectiveTranslation: "dark", noun: "Nacht", nounTranslation: "night", gender: "f" },
  { adjective: "hell", adjectiveTranslation: "bright", noun: "Zimmer", nounTranslation: "room", gender: "n" },
  { adjective: "schwer", adjectiveTranslation: "heavy", noun: "Koffer", nounTranslation: "suitcase", gender: "m" },
  { adjective: "leicht", adjectiveTranslation: "light", noun: "Tasche", nounTranslation: "bag", gender: "f" },
  { adjective: "stark", adjectiveTranslation: "strong", noun: "Kaffee", nounTranslation: "coffee", gender: "m" },
  { adjective: "süß", adjectiveTranslation: "sweet", noun: "Schokolade", nounTranslation: "chocolate", gender: "f" },
  { adjective: "hoch", adjectiveTranslation: "high", noun: "Berg", nounTranslation: "mountain", gender: "m" },
  { adjective: "tief", adjectiveTranslation: "deep", noun: "See", nounTranslation: "lake", gender: "m" },
  { adjective: "breit", adjectiveTranslation: "wide", noun: "Fluss", nounTranslation: "river", gender: "m" },
  { adjective: "eng", adjectiveTranslation: "narrow", noun: "Gasse", nounTranslation: "alley", gender: "f" },
];

export const sentenceTemplates: SentenceTemplate[] = [
  // Nominativ
  { case: "nominativ", before: "", after: " ist hier." },
  { case: "nominativ", before: "", after: " kommt morgen." },
  { case: "nominativ", before: "", after: " gefällt mir." },
  { case: "nominativ", before: "Wo ist ", after: "?" },
  { case: "nominativ", before: "", after: " ist sehr schön." },
  // Akkusativ
  { case: "akkusativ", before: "Ich sehe ", after: "." },
  { case: "akkusativ", before: "Er kauft ", after: "." },
  { case: "akkusativ", before: "Wir brauchen ", after: "." },
  { case: "akkusativ", before: "Sie hat ", after: " gefunden." },
  { case: "akkusativ", before: "Ich möchte ", after: " bitte." },
  // Dativ
  { case: "dativ", before: "Ich gebe ", after: " ein Geschenk." },
  { case: "dativ", before: "Er hilft ", after: "." },
  { case: "dativ", before: "Sie kommt mit ", after: "." },
  { case: "dativ", before: "Wir wohnen neben ", after: "." },
  { case: "dativ", before: "Das gehört ", after: "." },
  // Genitiv
  { case: "genitiv", before: "Das ist das Haus ", after: "." },
  { case: "genitiv", before: "Die Farbe ", after: " ist schön." },
  { case: "genitiv", before: "Wegen ", after: " bleibe ich zu Hause." },
  { case: "genitiv", before: "Trotz ", after: " gehen wir raus." },
  { case: "genitiv", before: "Das Ende ", after: " war überraschend." },
];
```

**Step 5: Create case sentences data — `data/cases.ts`**

```tsx
import { CaseSentence } from "../lib/types";

const caseSentences: CaseSentence[] = [
  {
    id: 1,
    sentence: "Der Hund frisst den Knochen.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "den Knochen", case: "akkusativ" },
    ],
    translation: "The dog eats the bone.",
  },
  {
    id: 2,
    sentence: "Die Frau gibt dem Kind ein Buch.",
    nounPhrases: [
      { text: "Die Frau", case: "nominativ" },
      { text: "dem Kind", case: "dativ" },
      { text: "ein Buch", case: "akkusativ" },
    ],
    translation: "The woman gives the child a book.",
  },
  {
    id: 3,
    sentence: "Das Auto des Mannes ist rot.",
    nounPhrases: [
      { text: "Das Auto", case: "nominativ" },
      { text: "des Mannes", case: "genitiv" },
    ],
    translation: "The man's car is red.",
  },
  {
    id: 4,
    sentence: "Ich helfe dem alten Mann.",
    nounPhrases: [
      { text: "dem alten Mann", case: "dativ" },
    ],
    translation: "I help the old man.",
  },
  {
    id: 5,
    sentence: "Der Lehrer erklärt den Schülern die Aufgabe.",
    nounPhrases: [
      { text: "Der Lehrer", case: "nominativ" },
      { text: "den Schülern", case: "dativ" },
      { text: "die Aufgabe", case: "akkusativ" },
    ],
    translation: "The teacher explains the assignment to the students.",
  },
  {
    id: 6,
    sentence: "Wegen des Regens bleiben wir zu Hause.",
    nounPhrases: [
      { text: "des Regens", case: "genitiv" },
    ],
    translation: "Because of the rain, we stay at home.",
  },
  {
    id: 7,
    sentence: "Die Mutter kauft der Tochter ein Kleid.",
    nounPhrases: [
      { text: "Die Mutter", case: "nominativ" },
      { text: "der Tochter", case: "dativ" },
      { text: "ein Kleid", case: "akkusativ" },
    ],
    translation: "The mother buys the daughter a dress.",
  },
  {
    id: 8,
    sentence: "Der Junge wirft den Ball über den Zaun.",
    nounPhrases: [
      { text: "Der Junge", case: "nominativ" },
      { text: "den Ball", case: "akkusativ" },
      { text: "den Zaun", case: "akkusativ" },
    ],
    translation: "The boy throws the ball over the fence.",
  },
  {
    id: 9,
    sentence: "Das Buch des Professors liegt auf dem Tisch.",
    nounPhrases: [
      { text: "Das Buch", case: "nominativ" },
      { text: "des Professors", case: "genitiv" },
      { text: "dem Tisch", case: "dativ" },
    ],
    translation: "The professor's book lies on the table.",
  },
  {
    id: 10,
    sentence: "Er schenkt seiner Freundin einen Ring.",
    nounPhrases: [
      { text: "seiner Freundin", case: "dativ" },
      { text: "einen Ring", case: "akkusativ" },
    ],
    translation: "He gives his girlfriend a ring.",
  },
  {
    id: 11,
    sentence: "Die Kinder spielen in dem großen Garten.",
    nounPhrases: [
      { text: "Die Kinder", case: "nominativ" },
      { text: "dem großen Garten", case: "dativ" },
    ],
    translation: "The children play in the big garden.",
  },
  {
    id: 12,
    sentence: "Trotz des schlechten Wetters gehen wir spazieren.",
    nounPhrases: [
      { text: "des schlechten Wetters", case: "genitiv" },
    ],
    translation: "Despite the bad weather, we go for a walk.",
  },
  {
    id: 13,
    sentence: "Der Arzt untersucht den Patienten.",
    nounPhrases: [
      { text: "Der Arzt", case: "nominativ" },
      { text: "den Patienten", case: "akkusativ" },
    ],
    translation: "The doctor examines the patient.",
  },
  {
    id: 14,
    sentence: "Sie zeigt dem Touristen den Weg.",
    nounPhrases: [
      { text: "dem Touristen", case: "dativ" },
      { text: "den Weg", case: "akkusativ" },
    ],
    translation: "She shows the tourist the way.",
  },
  {
    id: 15,
    sentence: "Die Farbe des Himmels ist wunderschön.",
    nounPhrases: [
      { text: "Die Farbe", case: "nominativ" },
      { text: "des Himmels", case: "genitiv" },
    ],
    translation: "The color of the sky is beautiful.",
  },
  {
    id: 16,
    sentence: "Der Koch bereitet dem Gast ein besonderes Menü zu.",
    nounPhrases: [
      { text: "Der Koch", case: "nominativ" },
      { text: "dem Gast", case: "dativ" },
      { text: "ein besonderes Menü", case: "akkusativ" },
    ],
    translation: "The chef prepares a special menu for the guest.",
  },
  {
    id: 17,
    sentence: "Während der Pause trinke ich einen Kaffee.",
    nounPhrases: [
      { text: "der Pause", case: "genitiv" },
      { text: "einen Kaffee", case: "akkusativ" },
    ],
    translation: "During the break, I drink a coffee.",
  },
  {
    id: 18,
    sentence: "Das Mädchen schreibt dem Freund einen Brief.",
    nounPhrases: [
      { text: "Das Mädchen", case: "nominativ" },
      { text: "dem Freund", case: "dativ" },
      { text: "einen Brief", case: "akkusativ" },
    ],
    translation: "The girl writes the friend a letter.",
  },
  {
    id: 19,
    sentence: "Der Polizist folgt dem Verdächtigen durch die Stadt.",
    nounPhrases: [
      { text: "Der Polizist", case: "nominativ" },
      { text: "dem Verdächtigen", case: "dativ" },
      { text: "die Stadt", case: "akkusativ" },
    ],
    translation: "The policeman follows the suspect through the city.",
  },
  {
    id: 20,
    sentence: "Innerhalb des Gebäudes ist das Rauchen verboten.",
    nounPhrases: [
      { text: "des Gebäudes", case: "genitiv" },
      { text: "das Rauchen", case: "nominativ" },
    ],
    translation: "Smoking is prohibited inside the building.",
  },
  {
    id: 21,
    sentence: "Die Studentin leiht sich das Buch aus der Bibliothek.",
    nounPhrases: [
      { text: "Die Studentin", case: "nominativ" },
      { text: "das Buch", case: "akkusativ" },
      { text: "der Bibliothek", case: "dativ" },
    ],
    translation: "The student borrows the book from the library.",
  },
  {
    id: 22,
    sentence: "Er erzählt den Kindern eine Geschichte.",
    nounPhrases: [
      { text: "den Kindern", case: "dativ" },
      { text: "eine Geschichte", case: "akkusativ" },
    ],
    translation: "He tells the children a story.",
  },
  {
    id: 23,
    sentence: "Der Hund des Nachbarn bellt die ganze Nacht.",
    nounPhrases: [
      { text: "Der Hund", case: "nominativ" },
      { text: "des Nachbarn", case: "genitiv" },
      { text: "die ganze Nacht", case: "akkusativ" },
    ],
    translation: "The neighbor's dog barks all night.",
  },
  {
    id: 24,
    sentence: "Sie bringt dem Kranken eine Suppe.",
    nounPhrases: [
      { text: "dem Kranken", case: "dativ" },
      { text: "eine Suppe", case: "akkusativ" },
    ],
    translation: "She brings the sick person a soup.",
  },
  {
    id: 25,
    sentence: "Anstelle des Direktors leitet die Sekretärin das Meeting.",
    nounPhrases: [
      { text: "des Direktors", case: "genitiv" },
      { text: "die Sekretärin", case: "nominativ" },
      { text: "das Meeting", case: "akkusativ" },
    ],
    translation: "Instead of the director, the secretary leads the meeting.",
  },
];

export default caseSentences;
```

**Step 6: Commit data files**

```bash
git add -A
git commit -m "feat: add types, data files, and declension logic"
```

---

### Task 3: Stats Module

**Step 1: Create stats module — `lib/stats.ts`**

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllStats, ExerciseMode, ModeStats, SessionStats } from "./types";

const STATS_KEY = "doiti_stats";

const defaultStats: AllStats = {
  gender: { totalAttempted: 0, totalCorrect: 0 },
  adjectives: { totalAttempted: 0, totalCorrect: 0 },
  cases: { totalAttempted: 0, totalCorrect: 0 },
  sessions: [],
};

export async function getStats(): Promise<AllStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  if (!raw) return { ...defaultStats };
  return JSON.parse(raw);
}

export async function recordAnswer(
  mode: ExerciseMode,
  correct: boolean
): Promise<void> {
  const stats = await getStats();
  stats[mode].totalAttempted += 1;
  if (correct) stats[mode].totalCorrect += 1;
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export async function recordSession(session: SessionStats): Promise<void> {
  const stats = await getStats();
  stats.sessions.unshift(session);
  // Keep only last 20 sessions
  if (stats.sessions.length > 20) {
    stats.sessions = stats.sessions.slice(0, 20);
  }
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export async function resetStats(): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(defaultStats));
}

export function getAccuracy(mode: ModeStats): number {
  if (mode.totalAttempted === 0) return 0;
  return Math.round((mode.totalCorrect / mode.totalAttempted) * 100);
}
```

**Step 2: Create theme constants — `constants/theme.ts`**

```tsx
export const colors = {
  background: "#0f172a",
  surface: "#1e293b",
  surfaceLight: "#334155",
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#475569",
  masculine: "#3b82f6",   // blue for der
  feminine: "#ec4899",    // pink for die
  neuter: "#22c55e",      // green for das
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add stats module and theme constants"
```

---

### Task 4: Home Screen

**Step 1: Build home screen — `app/(tabs)/index.tsx`**

```tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getStats, getAccuracy } from "../../lib/stats";
import { AllStats } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

interface ModeCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  accuracy: number;
  total: number;
  onPress: () => void;
}

function ModeCard({ title, subtitle, icon, color, accuracy, total, onPress }: ModeCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={28} color={color} />
        <View style={styles.cardTitleArea}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {total > 0 && (
        <View style={styles.cardStats}>
          <Text style={styles.statText}>{accuracy}% accuracy</Text>
          <Text style={styles.statTextMuted}>{total} practiced</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<AllStats | null>(null);

  useFocusEffect(
    useCallback(() => {
      getStats().then(setStats);
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Doiti</Text>
      <Text style={styles.subtitle}>German Grammar Practice</Text>

      <View style={styles.cards}>
        <ModeCard
          title="Der / Die / Das"
          subtitle="Learn noun genders"
          icon="help-circle"
          color={colors.primary}
          accuracy={stats ? getAccuracy(stats.gender) : 0}
          total={stats?.gender.totalAttempted ?? 0}
          onPress={() => router.push("/gender")}
        />
        <ModeCard
          title="Adjective Endings"
          subtitle="Practice declension"
          icon="create"
          color={colors.warning}
          accuracy={stats ? getAccuracy(stats.adjectives) : 0}
          total={stats?.adjectives.totalAttempted ?? 0}
          onPress={() => router.push("/adjectives")}
        />
        <ModeCard
          title="Case Identification"
          subtitle="Nom / Akk / Dat / Gen"
          icon="book"
          color={colors.success}
          accuracy={stats ? getAccuracy(stats.cases) : 0}
          total={stats?.cases.totalAttempted ?? 0}
          onPress={() => router.push("/cases")}
        />
      </View>

      {stats && stats.sessions.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {stats.sessions.slice(0, 5).map((s, i) => (
            <View key={i} style={styles.sessionRow}>
              <Text style={styles.sessionMode}>
                {s.mode === "gender" ? "Der/Die/Das" : s.mode === "adjectives" ? "Adjectives" : "Cases"}
              </Text>
              <Text style={styles.sessionScore}>
                {s.correct}/{s.total} ({s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0}%)
              </Text>
              <Text style={styles.sessionDate}>{s.date}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: 60 },
  title: { fontSize: 36, fontWeight: "bold", color: colors.text, textAlign: "center" },
  subtitle: { fontSize: 16, color: colors.textSecondary, textAlign: "center", marginTop: spacing.xs },
  cards: { marginTop: spacing.xl, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  cardTitleArea: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: colors.text },
  cardSubtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  cardStats: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.surfaceLight },
  statText: { fontSize: 14, color: colors.primary, fontWeight: "500" },
  statTextMuted: { fontSize: 14, color: colors.textMuted },
  recentSection: { marginTop: spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: colors.text, marginBottom: spacing.md },
  sessionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.surfaceLight },
  sessionMode: { fontSize: 14, color: colors.text, flex: 1 },
  sessionScore: { fontSize: 14, color: colors.primary, flex: 1, textAlign: "center" },
  sessionDate: { fontSize: 12, color: colors.textMuted, flex: 1, textAlign: "right" },
});
```

**Step 2: Verify home screen renders**

```bash
npx expo start
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement home screen with mode cards and stats"
```

---

### Task 5: Der/Die/Das Quiz Screen

**Step 1: Create exercise logic — `lib/exercise-logic.ts`**

```tsx
import nouns from "../data/nouns";
import { adjectiveNounPairs, sentenceTemplates } from "../data/adjectives";
import caseSentences from "../data/cases";
import { getAdjectiveEnding, getArticle } from "./declension";
import { AdjectiveTemplate, ArticleType, CaseSentence, GrammaticalCase, Noun } from "./types";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomNoun(): Noun {
  return nouns[Math.floor(Math.random() * nouns.length)];
}

export function getRandomNouns(count: number): Noun[] {
  return shuffle(nouns).slice(0, count);
}

export function getArticleForGender(gender: "m" | "f" | "n"): string {
  switch (gender) {
    case "m": return "der";
    case "f": return "die";
    case "n": return "das";
  }
}

export function generateAdjectiveExercise(): AdjectiveTemplate {
  const pair = adjectiveNounPairs[Math.floor(Math.random() * adjectiveNounPairs.length)];
  const template = sentenceTemplates[Math.floor(Math.random() * sentenceTemplates.length)];
  const articleTypes: ArticleType[] = ["definite", "indefinite", "none"];
  const articleType = articleTypes[Math.floor(Math.random() * articleTypes.length)];

  const article = getArticle(articleType, template.case, pair.gender);
  const ending = getAdjectiveEnding(articleType, template.case, pair.gender);

  return {
    id: Math.random(),
    articleType,
    case: template.case,
    gender: pair.gender,
    article,
    noun: pair.noun,
    nounTranslation: pair.nounTranslation,
    adjective: pair.adjective,
    adjectiveTranslation: pair.adjectiveTranslation,
    correctEnding: ending,
    sentenceBefore: template.before,
    sentenceAfter: template.after,
  };
}

export function getRandomCaseSentence(): CaseSentence {
  return caseSentences[Math.floor(Math.random() * caseSentences.length)];
}

export function getShuffledCaseSentences(): CaseSentence[] {
  return shuffle(caseSentences);
}
```

**Step 2: Build gender quiz screen — `app/(tabs)/gender.tsx`**

```tsx
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useState, useRef, useCallback } from "react";
import { getRandomNoun, getArticleForGender } from "../../lib/exercise-logic";
import { recordAnswer, recordSession } from "../../lib/stats";
import { Noun, SessionStats } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

const ARTICLES = ["der", "die", "das"] as const;
const ARTICLE_COLORS = { der: colors.masculine, die: colors.feminine, das: colors.neuter };

export default function GenderScreen() {
  const [noun, setNoun] = useState<Noun>(getRandomNoun);
  const [selected, setSelected] = useState<string | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const correctArticle = getArticleForGender(noun.gender);

  const handleSelect = useCallback((article: string) => {
    if (selected) return; // already answered
    setSelected(article);
    const isCorrect = article === correctArticle;
    recordAnswer("gender", isCorrect);
    setSessionTotal((t) => t + 1);
    if (isCorrect) setSessionCorrect((c) => c + 1);
  }, [selected, correctArticle]);

  const handleNext = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setSelected(null);
    setNoun(getRandomNoun());
  }, [fadeAnim]);

  const getButtonStyle = (article: string) => {
    if (!selected) return { backgroundColor: colors.surface };
    if (article === correctArticle) return { backgroundColor: colors.success + "33", borderColor: colors.success };
    if (article === selected) return { backgroundColor: colors.error + "33", borderColor: colors.error };
    return { backgroundColor: colors.surface, opacity: 0.5 };
  };

  const getButtonTextColor = (article: string) => {
    if (!selected) return ARTICLE_COLORS[article as keyof typeof ARTICLE_COLORS];
    if (article === correctArticle) return colors.success;
    if (article === selected) return colors.error;
    return colors.textMuted;
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>
          {sessionCorrect}/{sessionTotal}
          {sessionTotal > 0 && ` (${Math.round((sessionCorrect / sessionTotal) * 100)}%)`}
        </Text>
      </View>

      <Animated.View style={[styles.wordArea, { opacity: fadeAnim }]}>
        <Text style={styles.word}>{noun.word}</Text>
        {selected && (
          <Text style={styles.translation}>
            {correctArticle} {noun.word} = {noun.translation}
          </Text>
        )}
      </Animated.View>

      <View style={styles.buttons}>
        {ARTICLES.map((article) => (
          <TouchableOpacity
            key={article}
            style={[styles.articleButton, getButtonStyle(article)]}
            onPress={() => handleSelect(article)}
            activeOpacity={0.7}
            disabled={!!selected}
          >
            <Text style={[styles.articleText, { color: getButtonTextColor(article) }]}>
              {article}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  scoreBar: { alignItems: "center", paddingVertical: spacing.md },
  scoreText: { fontSize: 16, color: colors.textSecondary },
  wordArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  word: { fontSize: 48, fontWeight: "bold", color: colors.text },
  translation: { fontSize: 18, color: colors.textSecondary, marginTop: spacing.md },
  buttons: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg },
  articleButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surfaceLight,
  },
  articleText: { fontSize: 24, fontWeight: "bold" },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  nextText: { fontSize: 18, fontWeight: "600", color: colors.text },
});
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement Der/Die/Das gender quiz screen"
```

---

### Task 6: Adjective Endings Screen

**Step 1: Build adjective screen — `app/(tabs)/adjectives.tsx`**

```tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useRef, useCallback } from "react";
import { generateAdjectiveExercise } from "../../lib/exercise-logic";
import { recordAnswer } from "../../lib/stats";
import { AdjectiveTemplate } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

export default function AdjectivesScreen() {
  const [exercise, setExercise] = useState<AdjectiveTemplate>(generateAdjectiveExercise);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const isCorrect = input.toLowerCase().trim() === exercise.correctEnding;

  const handleSubmit = useCallback(() => {
    if (submitted || input.trim() === "") return;
    setSubmitted(true);
    const correct = input.toLowerCase().trim() === exercise.correctEnding;
    recordAnswer("adjectives", correct);
    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
  }, [submitted, input, exercise.correctEnding]);

  const handleNext = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setExercise(generateAdjectiveExercise());
    setInput("");
    setSubmitted(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [fadeAnim]);

  const articleLabel =
    exercise.articleType === "definite" ? "Definite article" :
    exercise.articleType === "indefinite" ? "Indefinite article" : "No article";

  const caseLabel = exercise.case.charAt(0).toUpperCase() + exercise.case.slice(1);

  // Build display sentence
  const articlePart = exercise.article ? exercise.article + " " : "";
  const nounPhrase = `${articlePart}${exercise.adjective}___  ${exercise.noun}`;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>
          {sessionCorrect}/{sessionTotal}
          {sessionTotal > 0 && ` (${Math.round((sessionCorrect / sessionTotal) * 100)}%)`}
        </Text>
      </View>

      <View style={styles.infoBar}>
        <View style={styles.badge}><Text style={styles.badgeText}>{articleLabel}</Text></View>
        <View style={styles.badge}><Text style={styles.badgeText}>{caseLabel}</Text></View>
      </View>

      <Animated.View style={[styles.exerciseArea, { opacity: fadeAnim }]}>
        <Text style={styles.sentence}>
          {exercise.sentenceBefore}
          <Text style={styles.highlight}>{nounPhrase}</Text>
          {exercise.sentenceAfter}
        </Text>

        <Text style={styles.hint}>
          {exercise.adjective} ({exercise.adjectiveTranslation}) + {exercise.noun} ({exercise.nounTranslation})
        </Text>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>{exercise.adjective}</Text>
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              submitted && (isCorrect
                ? { borderColor: colors.success, color: colors.success }
                : { borderColor: colors.error, color: colors.error }),
            ]}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            placeholder="..."
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!submitted}
            autoFocus
          />
        </View>

        {submitted && !isCorrect && (
          <Text style={styles.correction}>
            Correct: {exercise.adjective}<Text style={{ color: colors.success, fontWeight: "bold" }}>{exercise.correctEnding}</Text>
          </Text>
        )}

        {submitted && isCorrect && (
          <Text style={[styles.correction, { color: colors.success }]}>Correct!</Text>
        )}
      </Animated.View>

      <View style={styles.bottomButtons}>
        {!submitted ? (
          <TouchableOpacity
            style={[styles.button, input.trim() === "" && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={input.trim() === ""}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  scoreBar: { alignItems: "center", paddingVertical: spacing.md },
  scoreText: { fontSize: 16, color: colors.textSecondary },
  infoBar: { flexDirection: "row", justifyContent: "center", gap: spacing.sm, marginBottom: spacing.md },
  badge: { backgroundColor: colors.surfaceLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, color: colors.textSecondary },
  exerciseArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  sentence: { fontSize: 22, color: colors.text, textAlign: "center", lineHeight: 34 },
  highlight: { color: colors.warning, fontWeight: "600" },
  hint: { fontSize: 14, color: colors.textMuted, marginTop: spacing.lg, textAlign: "center" },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.xl, gap: spacing.sm },
  inputLabel: { fontSize: 24, color: colors.text, fontWeight: "600" },
  input: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "600",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    minWidth: 80,
    textAlign: "center",
    paddingVertical: 4,
  },
  correction: { fontSize: 18, color: colors.text, marginTop: spacing.lg },
  bottomButtons: { marginBottom: spacing.lg },
  button: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 18, fontWeight: "600", color: colors.text },
});
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: implement adjective endings fill-in-the-blank screen"
```

---

### Task 7: Case Identification Screen

**Step 1: Build case screen — `app/(tabs)/cases.tsx`**

```tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useState, useRef, useCallback } from "react";
import { getShuffledCaseSentences } from "../../lib/exercise-logic";
import { recordAnswer } from "../../lib/stats";
import { CaseSentence, GrammaticalCase } from "../../lib/types";
import { colors, spacing } from "../../constants/theme";

const CASES: { label: string; value: GrammaticalCase }[] = [
  { label: "NOM", value: "nominativ" },
  { label: "AKK", value: "akkusativ" },
  { label: "DAT", value: "dativ" },
  { label: "GEN", value: "genitiv" },
];

const CASE_COLORS: Record<GrammaticalCase, string> = {
  nominativ: "#3b82f6",
  akkusativ: "#ef4444",
  dativ: "#22c55e",
  genitiv: "#f59e0b",
};

export default function CasesScreen() {
  const [sentences] = useState<CaseSentence[]>(() => getShuffledCaseSentences());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, GrammaticalCase>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const sentence = sentences[currentIndex % sentences.length];

  const handleSelectCase = (phraseIndex: number, selectedCase: GrammaticalCase) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [phraseIndex]: selectedCase }));
  };

  const handleCheck = useCallback(() => {
    setSubmitted(true);
    let allCorrect = true;
    sentence.nounPhrases.forEach((np, i) => {
      const correct = answers[i] === np.case;
      if (!correct) allCorrect = false;
      recordAnswer("cases", correct);
    });
    setSessionTotal((t) => t + sentence.nounPhrases.length);
    setSessionCorrect((c) => c + sentence.nounPhrases.filter((np, i) => answers[i] === np.case).length);
  }, [answers, sentence]);

  const handleNext = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setCurrentIndex((i) => i + 1);
    setAnswers({});
    setSubmitted(false);
  }, [fadeAnim]);

  const allAnswered = sentence.nounPhrases.every((_, i) => answers[i] !== undefined);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>
          {sessionCorrect}/{sessionTotal}
          {sessionTotal > 0 && ` (${Math.round((sessionCorrect / sessionTotal) * 100)}%)`}
        </Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.sentenceCard}>
          <Text style={styles.sentenceText}>{sentence.sentence}</Text>
          {submitted && (
            <Text style={styles.translation}>{sentence.translation}</Text>
          )}
        </View>

        <Text style={styles.instruction}>
          {submitted ? "Results:" : "Identify the case of each noun phrase:"}
        </Text>

        {sentence.nounPhrases.map((np, phraseIndex) => {
          const userAnswer = answers[phraseIndex];
          const isCorrect = submitted && userAnswer === np.case;
          const isWrong = submitted && userAnswer !== np.case;

          return (
            <View key={phraseIndex} style={styles.phraseBlock}>
              <View style={styles.phraseHeader}>
                <Text style={[
                  styles.phraseText,
                  submitted && isCorrect && { color: colors.success },
                  submitted && isWrong && { color: colors.error },
                ]}>
                  "{np.text}"
                </Text>
                {submitted && isWrong && (
                  <Text style={styles.correctLabel}>
                    = {np.case.charAt(0).toUpperCase() + np.case.slice(1)}
                  </Text>
                )}
              </View>
              <View style={styles.caseButtons}>
                {CASES.map(({ label, value }) => {
                  const isSelected = userAnswer === value;
                  const showCorrect = submitted && value === np.case;
                  const showWrong = submitted && isSelected && value !== np.case;

                  return (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.caseButton,
                        isSelected && !submitted && { backgroundColor: CASE_COLORS[value] + "33", borderColor: CASE_COLORS[value] },
                        showCorrect && { backgroundColor: colors.success + "33", borderColor: colors.success },
                        showWrong && { backgroundColor: colors.error + "33", borderColor: colors.error },
                      ]}
                      onPress={() => handleSelectCase(phraseIndex, value)}
                      disabled={submitted}
                    >
                      <Text style={[
                        styles.caseButtonText,
                        isSelected && !submitted && { color: CASE_COLORS[value] },
                        showCorrect && { color: colors.success },
                        showWrong && { color: colors.error },
                      ]}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Animated.View>

      <View style={styles.bottomArea}>
        {!submitted ? (
          <TouchableOpacity
            style={[styles.button, !allAnswered && styles.buttonDisabled]}
            onPress={handleCheck}
            disabled={!allAnswered}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  scoreBar: { alignItems: "center", paddingVertical: spacing.md },
  scoreText: { fontSize: 16, color: colors.textSecondary },
  sentenceCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sentenceText: { fontSize: 22, color: colors.text, textAlign: "center", lineHeight: 32 },
  translation: { fontSize: 14, color: colors.textMuted, textAlign: "center", marginTop: spacing.sm },
  instruction: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.md },
  phraseBlock: { marginBottom: spacing.lg },
  phraseHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  phraseText: { fontSize: 18, color: colors.text, fontWeight: "600" },
  correctLabel: { fontSize: 14, color: colors.success, fontWeight: "500" },
  caseButtons: { flexDirection: "row", gap: spacing.sm },
  caseButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
  },
  caseButtonText: { fontSize: 14, fontWeight: "600", color: colors.textSecondary },
  bottomArea: { marginTop: spacing.md, marginBottom: spacing.xl },
  button: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 18, fontWeight: "600", color: colors.text },
});
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: implement case identification screen"
```

---

### Task 8: EAS Build Configuration

**Step 1: Create `eas.json`**

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "distribution": "internal"
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

**Step 2: Update `.gitignore` if needed**

Ensure standard Expo ignores are in place.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: add EAS build config for APK generation"
```

---

### Task 9: Full Verification

**Step 1: Run the app and verify all screens**

```bash
npx expo start
```

Verify:
- Home screen shows 3 mode cards
- Gender quiz works: shows noun, 3 buttons, feedback, next
- Adjective screen works: fill-in-the-blank with validation
- Case screen works: sentence with noun phrases, case selection, check/next
- Stats update after exercises and show on home screen

**Step 2: Final commit with all polish**

```bash
git add -A
git commit -m "chore: final polish and verification"
```
