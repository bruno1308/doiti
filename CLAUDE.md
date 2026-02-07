# Doiti - German Grammar Practice App

## Project Overview
Android app built with React Native + Expo to practice German grammar. Three exercise modes:
1. **Der/Die/Das** - Multiple choice article gender quiz
2. **Adjective Endings** - Fill-in-the-blank adjective declension
3. **Case Identification** - Identify grammatical case of each noun phrase in a sentence

## Tech Stack
- **React Native** with **Expo** (managed workflow)
- **TypeScript**
- **Expo Router** for navigation
- **AsyncStorage** for local progress tracking
- **No backend** - fully offline, all data bundled

## APK Generation
Use `eas build -p android --profile preview` to generate an installable APK.

## Data Sources
- German nouns: curated from [gambolputty/german-nouns](https://github.com/gambolputty/german-nouns) (CC-BY-SA-4.0)
- Adjective templates and case sentences: hand-crafted

## Code Review Requirements (MANDATORY)
**Before ANY commit, code must be reviewed by BOTH:**
1. **Codex agent** - Use the `codex` skill to get peer feedback from OpenAI Codex CLI
2. **Claude subagent** - Launch a `superpowers:code-reviewer` Task agent for thorough code review

Both reviewers must approve before committing. If either raises issues, fix them before re-reviewing.

## Commit Message Format
```
<main commit message>

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>
```

## Project Structure
```
doiti/
  app/                    # Expo Router screens
    (tabs)/
      index.tsx           # Home screen
      gender.tsx          # Der/Die/Das quiz
      adjectives.tsx      # Adjective endings
      cases.tsx           # Case identification
    _layout.tsx           # Root layout
  components/             # Shared UI components
  data/                   # Bundled TypeScript data files
    nouns.ts              # 303 German nouns with gender, plural, translation
    adjectives.ts         # 30 adjective-noun pairs + 20 sentence templates
    cases.ts              # 25 annotated case identification sentences
  lib/                    # Utilities and logic
    types.ts              # All TypeScript interfaces and types
    declension.ts         # Adjective ending tables and article lookup
    stats.ts              # Progress tracking with AsyncStorage
    exercise-logic.ts     # Quiz generation and randomization logic
  constants/              # Theme colors, spacing
```

## Design Decisions
- 303 curated common nouns (101 masculine, 102 feminine, 100 neuter)
- Basic progress tracking (total/correct per mode, session history)
- No spaced repetition, no accounts, no internet required
- Immediate feedback on answers (green/red)
