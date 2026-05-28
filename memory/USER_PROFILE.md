# USER PROFILE — Project Creator

> Long-term memory about the human lead. Agents: read this **before** proposing workflows or
> code style. Fill in / refine as we work together. Items marked _(TBD)_ are placeholders —
> confirm with the user, then replace.

## Role
- **Creator & lead of the Living Library digital-book ecosystem** — owns the product, the frozen
  reading engine, and the content.
- Works as a **solo founder-engineer** (on Linux); content-creation throughput is the true scaling
  constraint for the business.
- **GitHub:** `emredogan-cloud` · **build repo:** `digital-book-app` (private remote configured).

## Coding Style
- _Preferred languages:_ **TypeScript (strict)** for all new shell/bridge code; **Vanilla JS** for
  the frozen engine (never reframework it). _(confirm any further preferences)_
- _Formatting:_ _(TBD — defer to Prettier defaults until specified)_
- _Naming conventions:_ _(TBD)_
- _Comment density / style:_ _(TBD)_
- _Testing expectations:_ _(TBD — unit vs. manual-on-device thresholds)_

## Preferred Workflows
- _Execution discipline:_ strict **one SUB-PR at a time** from the roadmap, each with the lifecycle
  Execution → Test/verify → Commit+push → Report (`sub-pr-report/`) → **hard stop for approval**.
- _Version control:_ conventional commits; commit + push each SUB-PR to `origin/main`.
- _Review style:_ Human-in-the-loop gates on outward/irreversible actions (push, publish) — see
  `../.claude/settings.json`.
- _Verification:_ Wants UI changes verified on the **local server** before committing.
- _Communication style:_ _(TBD — concise vs. detailed; preferred summary format)_
- _Decision logging:_ Durable architectural choices are recorded in `PAST_DECISIONS.md`.

## Domain Notes
- _Audience:_ Turkish-language readers of literary & genre fiction (cyber-noir, fantasy, mythology,
  fables); values atmosphere, craft, and design over catalog breadth.
- _Monetization:_ freemium funnel → single-book unlocks → "Library Pass" subscription (RevenueCat).

> Update this file whenever a durable preference is observed or stated.
