# 🔒 FROZEN — Motor LOCK · DO NOT EDIT

This folder is part of the **frozen, zero-dependency Vanilla-JS reading engine**
("Motor LOCK"), consolidated verbatim into `www/books/` in SUB-PR 0.2. The engine
is the product's moat — see `/memory/PAST_DECISIONS.md` (D-001) and `/CLAUDE.md`.

## Rules
- ❌ Do NOT edit, refactor, reformat, or "improve" any file in this folder
  (`index.html`, `scripts/`, `styles/`, `content/`, `assets/`, `images/`).
- ❌ Do NOT add a build step or npm dependency here.
- ✅ The ONLY sanctioned engine contact is the shell's global hooks
  `window.LL.emit()` / `window.LL.isUnlocked()`, wired in later phases.

All new logic lives in `src-shell/` (Zone B). Permission guardrails in
`/.claude/settings.json` deny Edit/Write into `www/books/**`.
