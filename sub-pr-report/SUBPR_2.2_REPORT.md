# SUB-PR 2.2 — Durable Persistence, Migration, Progress & Streak Data · Report

| | |
|---|---|
| **Phase** | 2 — Native Polish, Persistence & Instrumentation |
| **SUB-PR** | 2.2 — Durable Persistence, Migration, Progress & Streak Data (**Path A continues** — engine untouched) |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed to `origin/main` |

## Roadmap deliverables → status

| Deliverable (per roadmap 2.2) | Status | Notes |
|---|---|---|
| `src-shell/storage.ts` (SQLite + Preferences layer) | ✅ | Implemented as a module folder: `storage/{types,adapter,memory-adapter,sqlite-adapter,migrate,index}.ts`. Runtime adapter selection: SQLite on native, MemoryAdapter as graceful web fallback. |
| `src-shell/streak.ts` | ✅ | Persisted via `StorageAdapter.setMeta/getMeta`; idempotent within a local day; deterministic with injectable `now`. |
| `localStorage → SQLite/Preferences` migration | ✅ | One-time, idempotent, lossless, malformed-JSON-tolerant. **Original localStorage stays intact** (engine keeps reading its own keys). |
| Seeded-fixture unit test | ✅ | `test/storage-migration.test.ts` — **6/6 tests pass** via `npm test` (tsx). |
| Shelf progress surfacing ("Continue reading" + per-book %) | ✅ | Hero shows `· sayfa N` when last-opened book has progress; cards get a small accent-tinted `sayfa N` badge when their engine progress is > 0. Read synchronously from each book's known localStorage prefix (cheap; doesn't depend on SQLite init). |
| Offline streak counter (surfaced minimally) | ✅ | Tiny `🔥 N gün` chip in the masthead kicker (hidden when streak is 0). Async-fetched; non-critical. |
| **Engine untouched** | ✅ | `git status www/books` = 0 across all steps. |

## Read-only engine inspection (per your authorization)

Each book's `scripts/storage.js` was read (Read tool only, never modified). All 6 books use the same shape (`<prefix>` + key suffix, JSON-encoded values via the engine's `safeGet` / `safeSet`):

| Suffix | Type | Default in engine |
|---|---|---|
| `progress` | number | `0` (engine spread index) |
| `chapter` | string \| null | `null` |
| `bookmarks` | `{spread, label, ts}[]` | `[]` |
| `theme` | string | per-book default (e.g. `tuzlu`) |
| `typeStep` | number (0–4) | `1` |
| `firstSeen` | boolean | `false` |
| `perfMode` | string | (set when forced) |

**Prefix is the critical fact — it is NOT always the slug:**

| Shell slug | Engine localStorage prefix |
|---|---|
| `sarmasik` | `intikam-yemini:v1:` *(original pre-rename slug)* |
| `mythologica` | `codex-mythologica:v1:` |
| `tuzun-hafizasi`, `mendiran-vakayinamesi`, `solgun-kitabe`, `fabl` | (matches the slug) |

This is now carried as a new `BookMeta.localStoragePrefix` field in `src-shell/books.ts`.

## What changed

**New (`src-shell/storage/`):**
- `types.ts` — `StoredProgress`, `StoredBookmark`, `MigrationResult`, `LocalStorageLike`.
- `adapter.ts` — `StorageAdapter` interface (async, init/upsert/get/setMeta/getMeta/reset).
- `memory-adapter.ts` — pure-JS in-memory adapter (test + web fallback).
- `sqlite-adapter.ts` — `@capacitor-community/sqlite` wrapper with `progress` / `bookmarks` / `meta` tables and upsert via `ON CONFLICT … DO UPDATE`.
- `migrate.ts` — pure, no-Capacitor migration logic with a `MIGRATION_KEY` marker in the meta table. Engine keys are read via the injectable `LocalStorageLike`; the adapter receives normalized rows.
- `index.ts` — facade: `getStorage()` picks SQLite on native / MemoryAdapter on web; `runMigrationIfNeeded()` is the one-shot entry; `readEngineProgress(prefix)` is the synchronous shelf reader.

**New:**
- `src-shell/streak.ts` — `getStreak(adapter)`, `tickStreak(adapter, now)`, `localDateISO(d)` (local-midnight key).
- `test/storage-migration.test.ts` — 6 tests; `npm test` runs them via `tsx`.

**Modified:**
- `src-shell/books.ts` — added `localStoragePrefix` to every book (discovered by read-only inspection).
- `src-shell/shelf.ts` — synchronous per-book progress badge in `buildCard` (cards only show the badge when the engine has saved progress); hero subtitle now reads `subtitle · sayfa N` when the last-opened book has progress; async `surfaceStreak()` fills the kicker chip when `streak.current > 0`.
- `src-shell/main.ts` — boot now schedules `runMigrationIfNeeded()` + `tickStreak()` as a fire-and-forget async pipeline. Failures only `console.warn` — never block the shelf render. `SHELL_BUILD = '2.2.0-persistence'`.
- `www/index.html` — small CSS for `.book-meta .progress-badge` (accent pill) and `.kicker .streak` (subtle chip).
- `package.json` — `"test": "tsx test/storage-migration.test.ts"` (replaced the placeholder); added `@capacitor-community/sqlite@^6.0.2` + `@capacitor/preferences@^6.0.4` deps; `tsx@^4.22.3` devDep.

**Untouched:** every file under `www/books/**`. `git status www/books`: 0 throughout.

## Verification (commands + output)

```text
[V1] npm test (tsx → test/storage-migration.test.ts)
     ✓ empty localStorage → migration is a no-op (marker set)
     ✓ seeded data → SQLite mirrors EVERY engine field (lossless)
     ✓ idempotent (second run is a no-op, no dupes)
     ✓ malformed JSON values are tolerated, never throw
     ✓ original localStorage is byte-for-byte UNTOUCHED
     ✓ partial data (e.g. only theme set) still creates a row
     6/6 passed

[V2] npx cap sync — registered 5 Capacitor plugins for android:
     @capacitor-community/sqlite@6.0.2 · @capacitor/haptics@6.0.3
     @capacitor/preferences@6.0.4 · @capacitor/splash-screen@6.0.4
     @capacitor/status-bar@6.0.3
     Sync finished in 0.314s

[V3] vite build — 334 modules transformed
     www/shell/shell.js  82.80 kB  (gzip 17.78 kB)  built in 61 ms

[V4] tsc --noEmit                  → clean
[V5] eslint src-shell              → clean
[V6] HTTP smoke (/, /shell/shell.js, /books/sarmasik/index.html) → all 200
[V7] git status www/books          → 0 lines

[V8] Node-eval bundle test (browser-sim — empty localStorage mock):
     bundle eval threw       : no
     LL.version              : 2.1.0-bridge-listener
     isUnlocked(sarmasik, 0) : true
     getBooks().length       : 6
     __LL_SHELL__.build      : 2.2.0-persistence
     openBook("sarmasik")     : ok (no throw)
     migration:              : { skipped: false, booksMigrated: 0, bookmarksMigrated: 0 }
     (migration LOGIC is tested independently in V1; this proves the bundle wires
     it without throwing and the async pipeline settles)
```

## Architecture (the shape of the data path)

```
engine (frozen)          shell (this SUB-PR)
─────────────────        ─────────────────────────────────────────
localStorage             readEngineProgress(prefix)   ← sync, cheap
  <prefix>progress  ──►    used by shelf for the badge + hero text
  <prefix>bookmarks
  …                      migrateFromLocalStorage(BOOKS, ls, adapter)
                           idempotent · marker in meta table
                           ─► SQLiteAdapter (native)
                              └ progress · bookmarks · meta
                           ─► MemoryAdapter (web/test fallback)

                         streak.ts → adapter.setMeta('ll:streak:v1', JSON)
                           ticked once per local day on boot
```

## Decisions / findings

1. **Engine touched: zero files.** As authorized, I *read* each book's `scripts/storage.js` to learn the prefix and the suffix set. No edits.
2. **Prefix ≠ slug for two books.** Captured as `BookMeta.localStoragePrefix`. This is permanent metadata about the engine and stays in the shell from here forward.
3. **Bundle weight: 82.80 kB / 17.78 kB gzipped.** Up from 35.99 kB after 2.1 — `@capacitor-community/sqlite` ships a web shim (`jeep-sqlite`-style) that Vite tree-shakes only partially. Two future optimizations available:
   - Dynamic `import('./storage/sqlite-adapter.js')` only when `isNative()` (would require leaving lib/IIFE mode for code splitting).
   - Treat Capacitor plugins as external at build time and resolve through Capacitor's loader.
   For 2.2 placeholder, the size is acceptable and not a blocker.
4. **MemoryAdapter is the web fallback.** SQLite on web (`jeep-sqlite`) isn't initialized in this SUB-PR; the data simply doesn't persist across reloads when developing in a browser. That's the conventional dev experience for a Capacitor app and matches the roadmap (real durability is on-device).
5. **Streak trigger today** is "open the shelf at least once during the local day." 2.3+ will refine this (e.g., trigger on a chapter-complete emit) when the engine emit hooks land.

## Git commit (exact message)

```
feat(shell): persistence + lossless migration + streak (SUB-PR 2.2)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 2.3 — Instrumentation: Analytics Taxonomy, Crash & Error Monitoring

- **The carefully-deferred engine touch:** add the single-line `window.LL?.emit(...)` hooks in each book's engine handlers (`goNext` / `goPrev` / `bookmark` / `chapterComplete`). This is the **only** sanctioned book-code edit, ever. Per CLAUDE.md / D-001.
- Add `src-shell/analytics.ts` (PostHog wrapper + consent gate) — replaces today's `console.debug` body of `emit`.
- Define the typed `LLEvent` taxonomy (`app_open`, `shelf_view`, `book_open`, `cover_gate_opened`, `page_turn`, `chapter_complete`, `book_complete`, `bookmark_add`, `theme_change`, `font_scale_change`, `session_end`, `error`).
- Firebase Crashlytics + Android Vitals + Sentry source-map upload in CI.
- Once 2.3 lands, the haptics + per-book theming wired in 2.1 will start firing **automatically**.
