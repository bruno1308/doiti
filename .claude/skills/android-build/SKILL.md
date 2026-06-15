---
name: android-build
description: Use when building an Android APK or app bundle for Doiti, deploying to a device, or troubleshooting EAS build issues
---

# Android Build

Build an installable Android APK or production app bundle using EAS Build (cloud).

## Prerequisites

- **EAS CLI**: Installed globally or via npx (`npx eas-cli`)
- **Expo account**: Must be logged in (`npx eas-cli login`)
- **Node modules**: Must be installed (`npm install`)

## Build Profiles

| Profile | Format | Use Case | Command |
|---------|--------|----------|---------|
| `preview` | APK | Testing / sideloading | `npx eas-cli build -p android --profile preview` |
| `production` | AAB (app-bundle) | Google Play Store | `npx eas-cli build -p android --profile production` |

## Quick Reference

**Full build flow (preview APK):**
```bash
cd B:\Projects\Doiti
npm install
npx eas-cli login          # if not already logged in
npx eas-cli build -p android --profile preview
```

The build runs in the cloud on Expo's servers. When complete, EAS provides a download URL for the APK.

**Check build status:**
```bash
npx eas-cli build:list
```

**Download latest build:**
```bash
npx eas-cli build:list --platform android --status finished --limit 1
```

## Current Config

**eas.json profiles:**
- `preview`: `{ "android": { "buildType": "apk" }, "distribution": "internal" }`
- `production`: `{ "android": { "buildType": "app-bundle" } }`

**app.json Android settings:**
- Package: `com.doiti.app`
- Adaptive icon: `./assets/adaptive-icon.png` (white background)
- New Architecture: enabled

**Key dependencies:** Expo 54, React Native 0.81.5, expo-router 6

## Common Issues

| Problem | Fix |
|---------|-----|
| "Not logged in" | Run `npx eas-cli login` first |
| "No EAS project" | Run `npx eas-cli init` to link project to Expo account |
| Build fails on native deps | Check Expo SDK compatibility at expo.dev/versions |
| APK too large | Check `assets/` for unnecessary large files |
| "eas: command not found" | Use `npx eas-cli` instead of bare `eas` |

## Notes

- Builds run in Expo's cloud - no local Android SDK needed
- Free tier allows limited builds per month
- APK is unsigned for debug/testing; production AAB should be signed
- The project uses managed workflow (no `/android` or `/ios` folders committed)
