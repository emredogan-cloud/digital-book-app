# SUB-PR 2.1 — Native Feel: Haptics & Per-Book Theming · Report

| | |
|---|---|
| **Phase** | 2 — Native Polish, Persistence & Instrumentation |
| **SUB-PR** | 2.1 — Native Feel: Haptics & Per-Book Theming (**Path A** — clean separation; engine untouched) |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed to `origin/main` |

## Roadmap deliverables → status

| Deliverable (per roadmap 2.1) | Status | Notes |
|---|---|---|
| `src-shell/native.ts` (haptics + theming wrapper) | ✅ | All native calls feature-detected via `Capacitor.isNativePlatform()` AND wrapped in `try/catch`. |
| Haptic page-turn + firmer bookmark/chapter-complete | ✅ wired (dormant) | Listener fires on `emit('page_turn')` / `bookmark_add` / `chapter_complete`. Will activate the moment SUB-PR 2.3 adds the `window.LL?.emit(...)` calls inside the engine. Per Path A, no engine edits in 2.1. |
| Per-book status-bar theming | ✅ | Live: `book_open` event → `applyBookTheme(book)` → `StatusBar.setBackgroundColor` + `setStyle` using `themeColor`/`statusBarStyle` from `books.ts`. |
| Per-book splash | ⚠ partial — see below | Bookshelf-themed launch splash configured in `capacitor.config.ts`. Per-book *drawable swap* deferred (Capacitor doesn't support runtime drawable swap; `book.splashBackgroundColor` stays in metadata for a future polish sub-PR). |
| Silent browser degradation | ✅ | Verified by Node-eval (see V7 below). |

## What changed

**New:** `src-shell/native.ts` — `applyShelfTheme()`, `applyBookTheme(book)`, `attachNativeListeners()` (subscribes to the bridge's emit fan-out and routes events to `Haptics.impact` / `Haptics.notification` and `StatusBar` calls). Every plugin call goes through a `safe(label, fn)` helper that returns early when not native and catches at the call site.

**Modified:**
- `src-shell/ll-bridge.ts` — added the **emit subscriber fan-out**: `type EmitListener`, `onLLEmit(listener)`, and `emit` now calls registered listeners synchronously (with per-listener `try/catch` so a bad listener can't break others). Public `LLBridge` interface unchanged. `bridge.version` bumped to `2.1.0-bridge-listener`.
- `src-shell/main.ts` — boot order now: `initSentry → installBridge → attachNativeListeners → applyShelfTheme → renderShelf`. `SHELL_BUILD = '2.1.0-native-feel'`.
- `capacitor.config.ts` — added `plugins.SplashScreen` with bookshelf-themed defaults (color, scale type, launch duration).
- `package.json` / `package-lock.json` — `@capacitor/haptics@^6.0.3`, `@capacitor/status-bar@^6.0.3`, `@capacitor/splash-screen@^6.0.4`.

**Engine (`www/books/**`):** untouched. Phase 2.1 = Path A. The engine's lifecycle emit hooks come in SUB-PR 2.3.

## Architecture (the loop)

```
                  ┌─────────────────────────────────────────┐
                  │   src-shell/ll-bridge.ts                │
   engine emit ───▶  window.LL.emit(event, payload)         │
   (added 2.3)    │   └─► console.debug + listener fan-out  │
                  └────────────────┬────────────────────────┘
                                   │
                  ┌────────────────▼────────────────────────┐
                  │   src-shell/native.ts                   │
                  │   attachNativeListeners(): onLLEmit(...) │
                  │     case 'page_turn'        → impact Light
                  │     case 'bookmark_add'      → impact Medium
                  │     case 'chapter_complete'  → notif Success
                  │     case 'book_open'         → applyBookTheme
                  │   (every call wrapped in safe() — isNative + try/catch)
                  └─────────────────────────────────────────┘
```

Decoupling means 2.3 just adds the `emit` calls; this module is already listening.

## Decisions / flags

1. **Path A taken** (engine untouched in 2.1) per your explicit confirmation. The result is haptics are *wired but dormant* — they activate automatically as soon as 2.3 lands the engine `emit` hooks. Zero rework needed.
2. **Splash per-book deferred.** Capacitor's `SplashScreen` plugin uses a static Android drawable; runtime drawable swap isn't supported. The bookshelf-themed splash is configured statically; per-book splash will need a polish sub-PR with native-side hooks (acceptable trade-off — status bar tinting is the more visible per-book cue, and it's fully runtime).
3. **`prefers-reduced-motion`** is honored in the shelf entrance animation already (from 1.2). For haptics, the roadmap mentions reduced-motion respect — we can add an opt-out in 2.4 (verification) if you want haptics to dial down with reduced-motion. Not blocking 2.1.

## Verification (commands + output)

```text
[V1] npx cap sync — registered 3 plugins into android:
     @capacitor/haptics@6.0.3 · @capacitor/splash-screen@6.0.4 · @capacitor/status-bar@6.0.3
     Sync finished in 0.27s

[V2] vite build — 326 modules transformed
     www/shell/shell.js  35.99 kB  (gzip 10.18 kB)  built in 54 ms
     (+26 kB vs 1.2 for the three Capacitor web shims; tree-shaken)

[V3] tsc --noEmit            → clean
[V4] eslint src-shell        → clean
[V5] HTTP smoke              → / 200, /shell/shell.js 200, /books/sarmasik/index.html 200
[V6] www/books untouched     → git status --short www/books = 0 lines

[V7] Node-eval graceful-degradation test (browser-simulated; Capacitor.isNativePlatform → false):
     bundle eval threw       : no
     LL.version              : 2.1.0-bridge-listener
     isUnlocked(sarmasik, 0) : true
     getBooks().length       : 6
     __LL_SHELL__.build      : 2.1.0-native-feel
     emit() events tested    : 5 (page_turn · bookmark_add · chapter_complete · book_open · shelf_view)
     emit() failures         : NONE (graceful no-op ✓)
     openBook("sarmasik")    : ok (no throw)
     → every native plugin call was short-circuited by isNative()=false; the listener fan-out
       ran, and all paths completed without errors.
```

## Git commit (exact message)

```
feat(shell): native plugins + emit listener fan-out + per-book status-bar (SUB-PR 2.1)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 2.2 — Durable Persistence, Migration, Progress & Streak Data

- Install `@capacitor/preferences` + `@capacitor-community/sqlite`.
- Build `src-shell/storage.ts` with a SQLite + Preferences layer and a lossless / idempotent
  `localStorage → SQLite` migration (with seeded-fixture unit test).
- Surface per-book progress on the shelf ("Continue reading" % + per-book %).
- Build `src-shell/streak.ts` (persisted offline streak counter, minimal shelf surface).
- All Motor-LOCK guardrails stay in place; engine remains untouched until 2.3.
