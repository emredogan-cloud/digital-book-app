# SUB-PR 1.2 — Bookshelf Home UI & `window.LL` Bridge Stub · Report

| | |
|---|---|
| **Phase** | 1 — Capacitor Android Shell + Bookshelf Home |
| **SUB-PR** | 1.2 — Bookshelf Home UI & `window.LL` Bridge Stub |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed to `origin/main` |

## Roadmap deliverables → status

| Deliverable (per roadmap 1.2) | Status | Notes |
|---|---|---|
| Polished bookshelf `index.html` (cover grid, per-book title/tagline, theme-accurate styling, "Continue reading" hero slot) | ✅ | TS-rendered; real cover images from each book's `assets/cover.jpg`; per-book accent + theme color |
| `src-shell/ll-bridge.ts` (`emit`, `isUnlocked`→`true`, `openBook`) | ✅ | Final signatures; verified by Node-eval of the built bundle |
| Per-book splash/status-bar color metadata table | ✅ | `src-shell/books.ts` — `themeColor`, `statusBarStyle`, `splashBackgroundColor` per book (consumed by native plugins in Phase 2) |

## What changed

**New (`src-shell/`):**
- `books.ts` — the metadata table (single source of truth): slug, title, subtitle, tagline, lang, shelf `accent`, native `themeColor` / `statusBarStyle` / `splashBackgroundColor`, CTA, cover path.
- `ll-bridge.ts` — installs `window.LL` with final signatures: `emit(event, payload?)`, `isUnlocked(bookId, chapterIndex?) → true` (Phase 4 swaps in RevenueCat), `openBook(slug)` (writes `ll:lastOpenedBook` to localStorage, emits `book_open`, navigates), plus `getBooks` / `getBookMeta`.
- `shelf.ts` — dynamic DOM renderer (masthead → optional Continue-reading hero → "Tüm Kitaplar" / "Kitaplar" section title → cover grid → footer). Reads last-opened from localStorage; intercepts card clicks to go through `bridge.openBook` (honors ⌘/Ctrl/Shift open-in-new-tab).

**Updated:**
- `src-shell/main.ts` — boots the bridge, renders the shelf into `#ll-root`, emits `shelf_view`. Bumped `SHELL_BUILD = '1.2.0-bookshelf'`.
- `www/index.html` — thin shell (head + inline CSS for the dark/premium look + `<main id="ll-root">` + `<noscript>` fallback list of all 6 books + `<script src="shell/shell.js">`). Replaces the 0.3 hand-written shelf.
- `eslint.config.mjs` — added `@typescript-eslint/no-unused-vars` rule with `argsIgnorePattern: '^_'` so the bridge's signature-required `_bookId` / `_chapterIndex` lint clean.

**Untouched (Motor LOCK):** every file under `www/books/**`. `git status www/books` stayed at **0** across all steps.

## Design notes

- **Cover-grid aesthetic** — each card uses the book's own `assets/cover.jpg` as the surface, with a dark bottom gradient overlay for text readability + per-book accent hairline at the top + accent-colored focus/hover. Aspect-ratio 2:3 (book proportions). `loading="lazy"` for cards #4–#6 (#1–#3 are eager).
- **Continue-reading hero** — only renders when `localStorage[ll:lastOpenedBook]` resolves to a known book. Two-column layout (cover thumb + body + accent CTA button). Mobile breakpoint at 480px shrinks the cover.
- **Authentic per-book accents** preserved from 1.1 (Sarmaşık cyan `#4fbcce`, Mythologica gold `#c9a24b`, Solgun Kitabe amethyst `#9a7fc0`, …).
- **A11y:** semantic `<a>` cards with `aria-label`; English card carries `lang="en"`; `:focus-visible` accent ring; `<noscript>` fallback lists all 6 books for direct navigation.
- **Progressive enhancement:** entrance animation gated on `prefers-reduced-motion`; works without JS via the `<noscript>` block.
- **Zero external deps** stays true — only the books' own existing Google Fonts call out (logged in Phase 0.4; not added here).

## Verification (commands + output)

```text
[V1] vite build (5 modules transformed)
     www/shell/shell.js  8.97 kB  (gzip 3.21 kB)  built in 18 ms

[V2] outputs only under www/shell/ — www/books untouched (git status: 0)

[V3] tsc --noEmit (strict + verbatimModuleSyntax)   → clean
[V4] eslint src-shell                                → clean

[V5] HTTP smoke (reused 127.0.0.1:8770 / served www/):
     GET /                                  -> 200
     GET /shell/shell.js                    -> 200
     GET /books/sarmasik/index.html         -> 200
     GET /books/sarmasik/assets/cover.jpg   -> 200   (cover image surfaces in the grid)

[V6] functional test — eval built shell.js in Node with mocked browser globals:
     LL.version                : 1.2.0-bridge-stub
     typeof emit/isUnlocked/openBook/getBooks/getBookMeta  : function (all)
     isUnlocked("sarmasik", 0) : true
     isUnlocked("anything", 9) : true
     getBooks().length         : 6
     getBookMeta("mythologica"): lang=en  accent=#c9a24b
     getBookMeta("unknown")    : undefined
     __LL_SHELL__.build        : 1.2.0-bookshelf
```

> Note: the test servers from previous SUB-PRs are still alive on `127.0.0.1:8770` (and earlier). The
> sandbox blocks `kill`/`pkill`, so they linger harmlessly until the session ends.

## Git commit (exact message)

```
feat(shell): polished cover-grid shelf + window.LL bridge stub (SUB-PR 1.2)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 1.3 — Signing, Build Pipeline, Sentry & Play Internal Testing

- Generate + back up a release **keystore**, configure Gradle for a signed `.aab`.
- Wire **Sentry** browser SDK in the shell (CSP that allows only Sentry + the existing Google Fonts).
- Create the Play Console app, draft the listing, upload to **Internal Testing**.
- The Vite-bundled shell + `window.LL` bridge from this SUB-PR will be carried into the signed `.aab` via `cap sync`.
