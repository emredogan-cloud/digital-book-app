# PAST DECISIONS — Living Library

> Locked architectural decisions and their rationale. **Append** new entries; do not rewrite history.
> Agents: read this **before** making any architectural choice. Decisions marked `LOCKED` are binding.

---

## D-001 — Capacitor over fully-native (LOCKED)

**Decision:** We chose **Capacitor** over a fully native (Kotlin/Swift) build.

**Why:** To preserve our highly optimized, **measurement-based Vanilla JS 3D pagination engine**.
The engine depends on a real browser layout engine; a native rewrite would be maximum risk for
zero added value. It is the product's moat.

**Consequences (the rules this creates):**
- The reading engine is **FROZEN** — the "Motor LOCK." Do not modify book code
  (the root book folders today; `www/books/**` after Phase 0 consolidation).
- **All new logic goes into the Capacitor bridge / shell** (`src-shell/`, TypeScript + Vite).
- The only sanctioned engine contact points are `window.LL.emit()` and `window.LL.isUnlocked()`.

**Status:** Locked. Revisit only if the WebView layout engine itself becomes a hard blocker.

---

## D-002 — Build repository = `digital-book-app/` (LOCKED)

**Decision:** Execution happens in `/home/emre/Downloads/digital-book-app/` (this repo, wired to
GitHub `origin: emredogan-cloud/digital-book-app`). The 6 books were copied in from
`MY-DİGİTAL-BOOK/` as source content; their nested per-book `.git` repos were stripped so they
track as plain content in this monorepo.

**Why:** `digital-book-app/` already had the roadmap, reports, and a configured GitHub remote.
`MY-DİGİTAL-BOOK/` is the untouched original source and must not be modified.

**Consequences:**
- Do **not** modify `MY-DİGİTAL-BOOK/`. Treat it as read-only source.
- The execution roadmap is `roadmaps/APP_EXECUTION_ROADMAP.md`.

**Status:** Locked.

---

<!-- Template for new entries — copy below and fill in:

## D-00X — <short title> (PROPOSED | LOCKED | SUPERSEDED)

**Decision:**
**Why:**
**Consequences:**
**Status:**

-->
