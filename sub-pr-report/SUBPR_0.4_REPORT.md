# SUB-PR 0.4 — Smoke Verification, Checklist & Docs · Report

| | |
|---|---|
| **Phase** | 0 — Foundation & Consolidation |
| **SUB-PR** | 0.4 — Smoke Verification, Checklist & Docs |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (branch `main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed. **Phase 0 is now complete (0.1 → 0.4).** |

## Roadmap deliverables → status

| Deliverable (per roadmap 0.4) | Status | Notes |
|---|---|---|
| Per-book pass/fail smoke checklist | ✅ | In `RUN.md` — human-executable; automated pre-checks done here |
| `RUN.md` with exact serve & verify commands | ✅ | repo root |
| Final consolidated Phase-0 commit | ✅ | this commit |

## Testing strategy (per your direction)

No headless browser was wired up. I performed all the **automated/static + HTTP** verification possible,
and handed the genuinely interactive checks (3D page-turn, bookmark, reload-resume) to the human via
`RUN.md`. Honest scope: the static checks below are machine-verified; the manual checklist is **not yet
executed** (needs a human + real browser).

## Static verification performed

**[S1] JS syntax — `node --check` (parse-only):** **132/132** book JS files parse cleanly.

| book | JS files OK |
|---|---|
| sarmasik | 21/21 |
| tuzun-hafizasi | 41/41 |
| mendiran-vakayinamesi | 16/16 |
| mythologica | 7/7 |
| solgun-kitabe | 12/12 |
| fabl | 35/35 |

**[S2] Asset-path resolution over served root (HTTP):** every local `src`/`href` in all 6 `index.html`
resolves **200** — **0 broken, no 404s**. Local-ref counts: sarmasik 28 · tuzun-hafizasi 47 ·
mendiran-vakayinamesi 22 · mythologica 13 · solgun-kitabe 18 · fabl 41.

**[recap, S0.3] Bookshelf:** `/` and all 6 book links → 200.

## Finding — external font dependency (offline-first signal)

Each book's `index.html` loads **Google Fonts** (3 external refs each: `fonts.googleapis.com` +
`fonts.gstatic.com` preconnects + a `css2` stylesheet). Families include Cormorant Garamond, EB
Garamond, Cinzel, Marcellus, Inter, IBM Plex Mono, UnifrakturMaguntia.

- **Impact:** first load needs network; **offline**, typography degrades to system-font fallbacks —
  **content still reads** (text, engine JS/CSS are bundled).
- This is a property of the **frozen engine** (unchanged here). Recommend **self-hosting fonts** in a
  later phase (Phase 1 shell or Phase 10 asset pipeline) for full offline-first fidelity. Logged for follow-up.

## Manual checklist (handed to the human in `RUN.md`)

Per-book checklist for the 9 interactive checks — **Open, Cover-gate, Paginate, Page-turn, TOC, Theme
switch, Font scale, Bookmark, Reload-resume** — plus an offline check and a pass/fail summary table.
These require a human with a real browser and are **pending your execution**.

## Consolidation (final Phase-0 tree, all committed)

```
digital-book-app/
├─ CLAUDE.md · .gitignore · package.json · package-lock.json
├─ RUN.md · SERVE_WORKFLOW.md · startup_idea_template.md
├─ .claude/   (settings.json [shared], hooks/; settings.local.json is gitignored)
├─ memory/    (PAST_DECISIONS.md, USER_PROFILE.md)
├─ roadmaps/  · reports/
├─ sub-pr-report/  (SUBPR_0.1 … 0.4 reports)
└─ www/
   ├─ index.html            (bookshelf)
   ├─ shared/ll-namespace.js (window.LL reservation)
   └─ books/<6 slugs>/      (FROZEN engine + content + MOTOR_LOCK.md each)
```
Working tree clean after this commit.

## Git commit (exact message)

```
docs(phase-0): add RUN.md smoke checklist + finalize Phase 0 (SUB-PR 0.4)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Phase 0 → Phase 1

Phase 0 (SUB-PRs 0.1–0.4) is complete: version-controlled, consolidated, served, and documented.
**Next: Phase 1, SUB-PR 1.1 — Capacitor Project & TS/Vite Shell Scaffolding.**
