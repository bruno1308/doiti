# Web Deploy to GitHub Pages - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deploy Doiti as a web app on GitHub Pages with automated CI/CD, working on both phone and desktop browsers.

**Architecture:** Use Expo's built-in web export (`npx expo export --platform web`) to generate a static site, served from GitHub Pages at `<username>.github.io/doiti`. A GitHub Actions workflow auto-deploys on push to `main`. A responsive max-width wrapper prevents the phone-optimized layout from stretching on wide screens.

**Tech Stack:** Expo Web (react-native-web), GitHub Actions, GitHub Pages

---

### Task 1: Fix `useNativeDriver` for web compatibility

`useNativeDriver: true` crashes on web because there's no native animation bridge. Replace all occurrences with `Platform.OS !== 'web'` so animations use the native driver on mobile and the JS driver on web.

**Files:**
- Modify: `components/CelebrationOverlay.tsx` (lines 28, 33)
- Modify: `app/(tabs)/gender.tsx` (lines 54, 65-69)
- Modify: `app/(tabs)/adjectives.tsx` (lines 84-88, 155-158, 166-169)
- Modify: `app/(tabs)/cases.tsx` (lines 161-164, 171-174)

**Step 1: Add Platform import and useNativeDriver constant to CelebrationOverlay.tsx**

In `components/CelebrationOverlay.tsx`, add `Platform` to the import from "react-native", then add a constant:

```typescript
import { Animated, Image, Platform, StyleSheet, View } from "react-native";

const useNativeDriver = Platform.OS !== "web";
```

Then replace both `useNativeDriver: true` on lines 28 and 33 with `useNativeDriver`.

**Step 2: Fix gender.tsx**

In `app/(tabs)/gender.tsx`, add `Platform` to the "react-native" import (it's not currently imported there). Add `const useNativeDriver = Platform.OS !== "web";` after the imports. Replace all `useNativeDriver: true` (line 54 in fadeAnim, lines 65-69 in the shake sequence) with `useNativeDriver`.

**Step 3: Fix adjectives.tsx**

In `app/(tabs)/adjectives.tsx`, `Platform` is already imported. Add `const useNativeDriver = Platform.OS !== "web";` after the imports. Replace all `useNativeDriver: true` (lines 84-88 shake sequence, lines 155-158 and 166-169 fade timings) with `useNativeDriver`.

**Step 4: Fix cases.tsx**

In `app/(tabs)/cases.tsx`, add `Platform` to the "react-native" import. Add `const useNativeDriver = Platform.OS !== "web";` after the imports. Replace all `useNativeDriver: true` (lines 161-164 and 171-174 fade timings) with `useNativeDriver`.

**Step 5: Verify the app still runs**

Run: `npx expo start --web`
Expected: App loads in browser with working animations, no `useNativeDriver` crash.

**Step 6: Commit**

```bash
git add components/CelebrationOverlay.tsx app/(tabs)/gender.tsx app/(tabs)/adjectives.tsx app/(tabs)/cases.tsx
git commit -m "fix: use JS animation driver on web for useNativeDriver compat"
```

---

### Task 2: Add web configuration to app.json

Expo needs a `web` section in app.json for proper meta tags, favicon, and bundler config.

**Files:**
- Modify: `app.json`

**Step 1: Add web config to app.json**

Add the following inside the `"expo"` object in `app.json`:

```json
"web": {
  "bundler": "metro",
  "output": "static",
  "favicon": "./assets/images/owl-mascot.png"
}
```

The `"output": "static"` tells Expo to generate a fully static site (no server needed). `"bundler": "metro"` uses the same bundler as native for consistency.

**Step 2: Commit**

```bash
git add app.json
git commit -m "feat: add web config to app.json for static export"
```

---

### Task 3: Add responsive max-width wrapper for desktop browsers

On desktop, the full-width phone layout looks stretched. Wrap the root layout in a centered container with a max-width of ~480px (phone-like) so it looks like a phone app on desktop.

**Files:**
- Modify: `app/_layout.tsx`

**Step 1: Add responsive wrapper**

Replace the contents of `app/_layout.tsx` with:

```typescript
import { Platform, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <View style={styles.appShell}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0a0f1a",
  },
  appShell: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
  },
});
```

This centers the app in a 480px column on desktop while having no effect on mobile.

**Step 2: Test responsiveness**

Run: `npx expo start --web`
Expected: On a wide browser window, the app content is centered in a ~480px column. On a narrow (phone-width) window, it fills the screen.

**Step 3: Commit**

```bash
git add app/_layout.tsx
git commit -m "feat: add responsive max-width wrapper for desktop web"
```

---

### Task 4: Configure base path for GitHub Pages subdirectory

GitHub Pages serves from `/<repo-name>/` (e.g., `/doiti/`). Expo needs to know this base path so assets and routes resolve correctly.

**Files:**
- Modify: `app.json`

**Step 1: Add baseUrl experiment to app.json**

In `app.json`, update the `"experiments"` object:

```json
"experiments": {
  "typedRoutes": true,
  "baseUrl": "/doiti"
}
```

This tells Expo Router and the asset system to prefix all URLs with `/doiti`.

**Step 2: Verify export works**

Run: `npx expo export --platform web`
Expected: A `dist/` folder is created with `index.html` and asset files. Check that `index.html` references assets with `/doiti/` prefix.

**Step 3: Commit**

```bash
git add app.json
git commit -m "feat: set baseUrl for GitHub Pages subdirectory hosting"
```

---

### Task 5: Create GitHub Actions deploy workflow

Set up automated deployment: push to `main` triggers a build and deploy to GitHub Pages.

**Files:**
- Create: `.github/workflows/deploy-web.yml`

**Step 1: Create the workflow file**

Create `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npx expo export --platform web

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Commit**

```bash
git add .github/workflows/deploy-web.yml
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

### Task 6: Manual steps (user action required)

These steps require the repo owner to do manually:

**Step 1: Create a GitHub repository**

Go to https://github.com/new and create a repo named `doiti` (public, so GitHub Pages is free).

**Step 2: Add remote and push**

```bash
git remote add origin https://github.com/<your-username>/doiti.git
git branch -M main
git push -u origin main
```

**Step 3: Enable GitHub Pages**

In the GitHub repo, go to **Settings > Pages**:
- Source: **GitHub Actions**
- (Do NOT select "Deploy from a branch" — the Actions workflow handles it)

**Step 4: Verify deployment**

After the first push, check the **Actions** tab for the workflow run. Once complete, the app will be live at:
`https://<your-username>.github.io/doiti/`

---

## Summary of changes

| File | Change |
|------|--------|
| `components/CelebrationOverlay.tsx` | Platform-aware `useNativeDriver` |
| `app/(tabs)/gender.tsx` | Platform-aware `useNativeDriver` |
| `app/(tabs)/adjectives.tsx` | Platform-aware `useNativeDriver` |
| `app/(tabs)/cases.tsx` | Platform-aware `useNativeDriver` |
| `app.json` | Add `web` config + `baseUrl` |
| `app/_layout.tsx` | Responsive max-width wrapper |
| `.github/workflows/deploy-web.yml` | CI/CD auto-deploy |
