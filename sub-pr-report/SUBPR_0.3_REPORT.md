# SUB-PR 0.3 — Bookshelf Entry Point & Local Serve Workflow · Report

| | |
|---|---|
| **Phase** | 0 — Foundation & Consolidation |
| **SUB-PR** | 0.3 — Bookshelf Entry Point & Local Serve Workflow |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (branch `main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed to `origin/main` |

## Roadmap deliverables → status

| Deliverable (per roadmap 0.3) | Status | Notes |
|---|---|---|
| `www/index.html` bookshelf placeholder | ✅ | Dark, restrained, premium; pure vanilla HTML/CSS/JS |
| Vanilla, **zero dependencies** | ✅ | Inline `<style>` + inline `<script>` only — no external fonts/scripts/CDN (verified) |
| Relative links to all 6 books' `index.html` | ✅ | `books/<slug>/index.html` — all resolve 200 |
| Documented local serve workflow | ✅ | `SERVE_WORKFLOW.md` (root) + `npm run serve` + footer hint |

## What changed (new files)

- **`www/index.html`** — the bookshelf entry point.
- **`SERVE_WORKFLOW.md`** — serve instructions (Python / `npx serve` / `npm run serve`) + slug→URL table.

## Design notes

- **Aesthetic:** deep-ink background (`#06070a`) with a soft top vignette; editorial serif wordmark
  *"Yaşayan Kütüphane"*; restrained, lots of negative space — no generic gradients/emoji.
- **Authentic per-book accents** pulled from each book's own CSS variables (read-only): Sarmaşık
  cyber-cyan `#4fbcce`, Tuzun Hafızası salt-rust `#c2703f`, Mendîran blood `#a64a44`, Mythologica
  manuscript-gold `#c9a24b`, Solgun Kitabe amethyst `#9a7fc0`, Fabl sage `#6fae9a`.
- **Real titles/taglines** extracted from each book's `<title>`/`<meta description>`.
- **Zero dependency:** all CSS/JS inline; system serif/sans stacks (no web fonts) — true offline-first.
- **A11y / robustness:** semantic `<a>` cards with `aria-label`; English book card marked `lang="en"`;
  `:focus-visible` rings; entrance animation is progressive-enhancement only and gated on
  `prefers-reduced-motion` (cards fully visible without JS).
- **Responsive:** `auto-fill minmax(256px,1fr)` grid (1→3 columns).

## Decisions / deviations (flagged)

- **Relative links `books/<slug>/index.html`** (no leading slash), rather than the `/books/...`
  in your example. Root-absolute works only when `www/` is the server root; the relative form works
  **both** over HTTP and when opening `www/index.html` via `file://`. Functionally identical when served.
- This is the Phase-0 **placeholder** shelf (typographic). The full art-directed shelf with cover art,
  per-book theming, and a "Continue reading" hero is **SUB-PR 1.2**.

## Verification (commands + output)

```text
[V1] zero external-dependency scan of www/index.html:
     grep -inE 'https?://|<link |<script src=|@import|googleapis|cdn.'  →  NONE
     (1 inline <style>, 1 inline <script>, 6 book links)

[V2] links declared in index.html:
     books/{sarmasik,tuzun-hafizasi,mendiran-vakayinamesi,mythologica,solgun-kitabe,fabl}/index.html

[V3] serve (python3 -m http.server, 127.0.0.1, --directory www) + follow EVERY link:
     GET /                                       -> 200   (bookshelf)
     GET /books/sarmasik/index.html              -> 200
     GET /books/tuzun-hafizasi/index.html        -> 200
     GET /books/mendiran-vakayinamesi/index.html -> 200
     GET /books/mythologica/index.html           -> 200
     GET /books/solgun-kitabe/index.html         -> 200
     GET /books/fabl/index.html                  -> 200
     RESULT: ✓ all 6 links resolve 200 — no 404s
```

> Note: reused the still-live local test server from SUB-PR 0.2 (`:8770`, read-only, `127.0.0.1`).
> Test servers can't be killed afterward (`kill`/`pkill` blocked by the sandbox) but are harmless and
> die with the session.

## Git commit (exact message)

```
feat(shelf): add vanilla bookshelf index.html + serve workflow (SUB-PR 0.3)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 0.4 — Smoke Verification, Checklist & Docs

- Manually verify each book end-to-end (open, cover-gate, paginate, page-turn, TOC, theme, font scale,
  bookmark, reload-resume) and record a per-book pass/fail table.
- Write `RUN.md` and make the final consolidated Phase-0 commit.
