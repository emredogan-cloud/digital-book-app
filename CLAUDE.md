# CLAUDE.md — Living Library · Project Constitution

> Master context for every AI agent & developer on this project. Loaded into each session.
> Keep concise (token budget is precious). Update deliberately, not casually.

## Project Overview

**Living Library** — a premium, **offline-first** mobile reading catalog that delivers a curated
set of atmospheric, art-directed books through a hand-crafted reading engine no mainstream
e-reader can match.

- **Platform strategy:** Capacitor **WebView hybrid** — **Android-first**, iOS later.
- **App ID:** `com.emre.livinglibrary`
- **Prime directive:** A best-in-class reading *artifact* (the engine + ~265k words across 6 books)
  already exists. Our job is to wrap it into a distributable, monetizable, retention-driven
  *product* — **without degrading the artifact.**

## Architecture & File Layout

**Two zones, one app. The boundary between them is sacred.**

### Zone A — FROZEN reading engine ("Motor LOCK") · DO NOT TOUCH
Hand-built, **zero-dependency Vanilla JS** (ES6 IIFE): a measurement-based paginator, cinematic
3D page-turn, per-book themes, bookmarks. Each book is a self-contained static site
(`index.html` + `scripts/` + `styles/` + `content/` + `assets/` + `images/`).

- **Current (pre-Phase 0 consolidation):** the 6 books live at the **repo root** —
  `Fabl/`, `intikam-yemini/`, `mendiran-vakayinamesi/`, `mythology-digital-book/`,
  `solgun-kitabe/`, `tuzun-hafizasi/`. **They are FROZEN now, wherever they sit.**
- **Target (SUB-PR 0.2):** moved verbatim into `www/books/<slug>/`
  (slug mapping: `intikam-yemini → sarmasik`, `mythology-digital-book → mythologica`;
  the other four keep their names). Mind the Turkish dotted-İ in any path.

### Zone B — shell + native bridge · ALL NEW LOGIC GOES HERE
- `src-shell/` — **TypeScript + Vite** (added in SUB-PR 1.1); build output emits into `www/`.
- `www/index.html` — bookshelf home screen (added in SUB-PR 0.3 / built from `src-shell/`).
- `www/shared/` — shared assets / bridge output (e.g. `ll-namespace.js`).
- **The only sanctioned contact with Zone A** is two global hooks defined by the shell:
  - `window.LL.emit(event, payload)` — lifecycle/analytics events.
  - `window.LL.isUnlocked(bookId, chapterIndex)` — entitlement check before a locked chapter.
  No other edits to book code are permitted, ever.

### Support
- `.claude/` — agent config: `settings.json` (shared) · `settings.local.json` (personal) · `hooks/`.
- `memory/` — persistent long-term memory (read **before** deciding).
- `roadmaps/APP_EXECUTION_ROADMAP.md` — the phased execution plan (with SUB-PR breakdown). **Source of truth for what to build next.**
- `reports/` — `TECH_DECISIONS.md` · `GROWTH_STRATEGY.md` · `MONETIZATION_ANALYSIS.md` · `RISK_ANALYSIS.md`.
- `startup_idea_template.md` — the original architecture report.
- `sub-pr-report/` — one report per completed SUB-PR.

## Commands

```bash
npm install                  # install shell/bridge dependencies
npm run build                # build src-shell/  → emits into www/ (real build added in SUB-PR 1.1)

# Local serve for verification (pick one):
python3 -m http.server 8080 --bind 127.0.0.1 --directory www    # consolidated app (post Phase 0)
python3 -m http.server 8765 --bind 127.0.0.1 --directory Fabl   # a single book (current/pre-consolidation)

npx cap sync                 # copy www/ + plugins into the native Android project
npx cap open android         # open in Android Studio
npx cap run android          # build & run on device/emulator
```

## Coding Conventions

- **Strict TypeScript** in `src-shell/` (`strict: true`, no `any`, typed event unions).
- **Modular design** — one responsibility per file (`billing.ts`, `analytics.ts`, `storage.ts`,
  `native.ts`, `notifications.ts`, …). No god-files.
- **Native feel** — wrap every native plugin call in `try/catch` + feature-detection so the same
  code runs in a desktop browser during dev; honor `prefers-reduced-motion`.
- **Lint/format** — ESLint + Prettier on `src-shell/` **only** (never on book code).

## Things to Avoid (CRITICAL)

- 🚫 **NEVER rewrite or modify the core Vanilla JS reading engine** — the book folders today,
  `www/books/**` after Phase 0. This is the **Motor LOCK**.
- 🚫 **NEVER use React / Vue / Svelte / any framework for the core reader.** It stays Vanilla JS,
  zero-build, zero-dependency.
- 🚫 Never add a bundler or npm dependency inside a book folder.
- 🚫 Never paywall before the reader's first satisfying session.
- 🚫 Never trust client-side entitlement state as the source of truth (RevenueCat is authoritative).
- 🚫 Never call a TTS/LLM API at read-time per user — premium AI assets are **pre-generated + cached**.

## Verification

- **Always verify UI changes on the local server before committing** — load the served page and
  observe; do not assume.
- Confirm every book still: opens, cover-gates, paginates, page-turns, theme-switches, and resumes
  after reload.
- Report real output (HTTP codes, screenshots). Never claim a feature works without loading it.

## Memory References

**Before answering or making architectural choices, check:**
- `memory/PAST_DECISIONS.md` — locked architectural decisions and their rationale.
- `memory/USER_PROFILE.md` — the creator's role, coding style, and preferred workflows.

Append a new entry to `PAST_DECISIONS.md` whenever a durable architectural choice is made.
