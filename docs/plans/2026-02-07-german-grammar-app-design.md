# German Grammar Practice App - Design Document

## Date: 2026-02-07

## Purpose
An Android app to help practice three core German grammar skills:
1. Noun gender (Der/Die/Das)
2. Adjective declension with definite/indefinite articles
3. Grammatical case identification

## Tech Stack
- React Native + Expo (managed workflow)
- TypeScript
- Expo Router for navigation
- AsyncStorage for local stats
- Fully offline, no backend

## Exercise Modes

### Mode 1: Der/Die/Das (Article Gender Quiz)
- Display a German noun (e.g. "Hund")
- Three buttons: Der, Die, Das
- Immediate feedback: green for correct, red for incorrect
- Shows English translation after answering
- Words drawn from curated list of ~1000 common nouns

### Mode 2: Adjective Endings (Fill-in-the-blank)
- Display sentence with gap: "Der groß___ Mann geht nach Hause"
- User types the ending (e.g. "e")
- Validates against correct declension based on gender, case, article type
- Covers: 4 cases x 3 genders x 3 article types (definite/indefinite/no article)
- Generated from templates with noun+adjective combinations

### Mode 3: Case Identification
- Display full sentence: "Ich gebe dem alten Mann das Buch"
- Each noun phrase is tappable/highlighted
- User assigns case: Nominativ / Akkusativ / Dativ / Genitiv
- Feedback shows which assignments are correct/incorrect

### Home Screen
- Three cards for the three exercise modes
- Stats summary: total practiced, accuracy percentage

## Data

### Nouns (bundled JSON)
- ~1000 common German nouns curated from gambolputty/german-nouns (CC-BY-SA-4.0)
- Fields: word, gender (m/f/n), plural form, English translation

### Adjective Templates
- Template sentences covering all declension patterns
- Noun+adjective pairings with correct endings pre-computed

### Case Sentences
- Pre-written sentences with annotated noun phrases
- Each noun phrase tagged with its grammatical case

## Progress Tracking
- Per-mode stats: total attempted, correct, accuracy %
- Session history: last sessions with date and score
- Stored locally with AsyncStorage
- Displayed on home screen

## APK Generation
- Use `eas build -p android --profile preview` for installable APK
- No Play Store required
