# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linking Sound is an Expo universal app (web + iOS + Android) that helps ESL learners understand linking sounds in English speech. Users can explore curated examples of 6 linking types or input their own sentences to see phonetic breakdowns.

## Commands

```bash
# Start development server (opens Expo DevTools)
npm start

# Run on specific platforms
npm run web      # Web browser at localhost:8081
npm run ios      # iOS simulator
npm run android  # Android emulator

# Type checking
npx tsc --noEmit
```

## Architecture

**Navigation**: React Navigation native stack with 3 screens (Home → Learn, Practice). Navigation types defined in `App.tsx` as `RootStackParamList`.

**Design System**: All styling constants in `src/constants/theme.ts`:
- `colors` - Warm cream palette with 6 accent colors (one per linking type)
- `spacing`, `borderRadius`, `typography` - Consistent design tokens

**Linking Types Data**: `src/constants/linkingTypes.ts` defines the 6 linking sound categories:
- Consonant→Vowel (blue), Linking /w/ (green), Linking /j/ (purple)
- Assimilation (orange), Elision (red), Intrusive /r/ (teal)

Each type has: id, name, shortName, description, color, lightColor, and example pairs (`original` → `linked`).

**Phonetic Analysis**: `PracticeScreen.tsx` contains `analyzeLinks()` function that detects linking patterns between words. Currently uses simple rule-based matching (consonant endings, vowel starts, etc.).

**Text-to-Speech**: Uses `expo-speech` for audio playback with rate control (1.0 normal, 0.6 slow).

## Platform-Specific Files

Metro bundler automatically resolves platform-specific implementations based on file extensions:

```
Component.tsx        # Shared/default (or native fallback)
Component.web.tsx    # Web-specific
Component.native.tsx # Native-specific (iOS + Android)
Component.ios.tsx    # iOS-specific
Component.android.tsx # Android-specific
```

**Resolution order for web**: `.web.tsx` → `.tsx`
**Resolution order for iOS**: `.ios.tsx` → `.native.tsx` → `.tsx`
**Resolution order for Android**: `.android.tsx` → `.native.tsx` → `.tsx`

**Usage pattern**:
```tsx
// Import without extension - bundler picks the right file
import Header from './components/Header';

// At build time:
// - Web bundle includes Header.web.tsx
// - Native bundle includes Header.tsx (or Header.native.tsx)
```

**When to use**:
- Different UI patterns (web: hover states, native: touch feedback)
- Platform-specific APIs (web: window/document, native: NativeModules)
- Layout differences (web: wider screens, native: mobile-first)

## Key Patterns

- Screens use `SafeAreaView` from `react-native-safe-area-context`
- Icons from `lucide-react-native`
- All screens follow the warm/friendly visual style with rounded cards and subtle shadows
- Linking transformations displayed as: `"original text"` → `"linked-text"`
