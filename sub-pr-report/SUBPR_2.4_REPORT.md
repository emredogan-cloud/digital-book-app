# SUB-PR 2.4 — Verification, QA & Compliance Hardening · Report

| | |
|---|---|
| **Phase** | 2 — Native Polish, Persistence & Instrumentation |
| **SUB-PR** | 2.4 — Verification, QA & Compliance Hardening |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Code, tests & docs complete — committed and pushed. **Phase 2 closed.** Per-device manual sweep pending (see `BUILD.md §J`). |

## Roadmap deliverables → status

| Deliverable (per roadmap 2.4) | Status | Notes |
|---|---|---|
| Migration test report | ✅ | `test/storage-migration.test.ts` — 6/6 pass · also covered in `SUBPR_2.2_REPORT.md`. |
| Event-fires-once verification | ✅ | New `test/event-once.test.ts` — 4/4 pass (one-per-call · multi-listener · throw-isolation · unsubscribe). |
| Consent gate enforced | ✅ | New `test/consent-gate.test.ts` — 5/5 pass (default `unknown` · persists granted/denied · toggles · defensive on corrupt). |
| **Consent UI** (unobtrusive, in footer) | ✅ | Tiny `📊 Analiz: Kapalı` / `Açık` chip in the bookshelf footer; one tap toggles; persisted at `localStorage['ll:analytics:consent']`. |
| Per-emit overhead < 1 ms | ✅ | New `test/perf.test.ts` — measured **0.11 μs per emit** (3 listeners, 20 000 calls): **~8 800× headroom under the 1 ms budget**. |
| Data Safety mapping | ✅ | `STORE_LISTING.md` Data Safety section now lists the exact 12-event taxonomy, payload fields, and the 3 Play Console categories to declare. |
| Human QA hand-off | ✅ | New `BUILD.md §J` — 7 sub-checks (J.1–J.7) for you to walk through on a real device with real DSN/credentials. |

## What changed

**New tests** (all run by `npm test`):
- `test/event-once.test.ts` — proves `bridge.emit` fan-out invariants (one-invocation-per-call, multi-listener correctness, throwing-listener isolation, unsubscribe).
- `test/consent-gate.test.ts` — proves the privacy-first consent gate (default `unknown`, toggles persist, corrupt input falls back to `unknown`).
- `test/perf.test.ts` — measures bridge.emit dispatch time across 20 000 calls and asserts `< 1 ms` per call. (Actual: 0.11 μs.)

**New / updated UI:**
- `src-shell/shelf.ts` — `wireConsentToggle(footer)` reads `getAnalyticsConsent()`, renders the chip with current state, and toggles on click. Title text + `aria-pressed` + accent color via `data-state`. ESLint-clean.
- `www/index.html` — small CSS for `.footer-consent` + `.footer-actions`: transparent base, soft hover background, green tint when granted.

**Robust analytics env-read:**
- `src-shell/analytics.ts` `initIfReady()` body wrapped in a single outer `try/catch`. Vite's static replacement of `import.meta.env.VITE_*` is preserved (so dead-code-elimination keeps the bundle ~85 kB when DSN is empty), AND raw Node/tsx execution degrades cleanly via the catch — which fixed the unhandled-rejection in the consent-gate test. Bundle: **85.41 kB / 18.63 kB gzipped** (was 334+ kB with a non-literal env-read; tree-shaken effectively).

**Docs:**
- `STORE_LISTING.md` Data Safety section: 12-event taxonomy table, exact payload fields, Play Console declarations, user-control summary.
- `BUILD.md §J. Phase 2 manual QA (SUB-PR 2.4)`: 7-section checklist for human execution.

**`package.json` `test` script:** runs the 4 test files in sequence (migration · event-once · consent · perf).

## Verification (commands + output)

```text
[V1] npm test (tsx chain → 4 files)
     ── storage-migration.test.ts
     ✓ empty localStorage → migration is a no-op (marker set)
     ✓ seeded data → SQLite mirrors EVERY engine field (lossless)
     ✓ idempotent (second run is a no-op, no dupes)
     ✓ malformed JSON values are tolerated, never throw
     ✓ original localStorage is byte-for-byte UNTOUCHED
     ✓ partial data (e.g. only theme set) still creates a row
     6/6 passed
     ── event-once.test.ts
     ✓ emit invokes each listener exactly once per call
     ✓ multiple listeners — each fires exactly once per emit
     ✓ a throwing listener does not break the others
     ✓ unsubscribe stops further dispatch to that listener
     4/4 passed
     ── consent-gate.test.ts
     ✓ default consent is "unknown" (no PostHog init, no events leave the device)
     ✓ setAnalyticsConsent(true) persists "granted"
     ✓ setAnalyticsConsent(false) persists "denied"
     ✓ consent toggles cleanly between granted / denied
     ✓ corrupt/unknown stored value falls back to "unknown" (defensive)
     5/5 passed
     ── perf.test.ts
     20,000 emits × 3 listeners
     total : 2.27 ms
     avg   : 0.11 μs/emit (0.00011 ms)
     ✓ within budget — ~8825× headroom under 1 ms

[V2] vite build (after env-read restructure):
     www/shell/shell.js  85.41 kB  (gzip 18.63 kB)  built in 53 ms
     Bundle "posthog.init" references: 0  (Vite DCE works again)

[V3] tsc --noEmit + eslint src-shell → both clean

[V4] HTTP smoke:
     /                -> 200
     /shell/shell.js  -> 200
     CSP meta present in served HTML
     "footer-consent" string present in served HTML
     www/books still 0 modified (Motor LOCK intact across 2.4)
```

## Decisions / findings

1. **The env-read trap.** When I switched `import.meta.env.VITE_POSTHOG_KEY` to a cast-based access (`(import.meta as …).env`) to survive tsx, Vite's static-replacement transform stopped recognizing it — the bundle ballooned to 346 kB because `posthog-js` was no longer dead-code-eliminated. The fix: **keep the literal access exactly** (`import.meta.env.VITE_POSTHOG_KEY`) so Vite can still replace it at build time, but wrap the whole `initIfReady` body in a `try/catch` so raw Node/tsx degrades cleanly when `import.meta.env` is undefined. Tests pass + bundle stays small.
2. **Perf is 4 orders of magnitude under budget.** 0.11 μs/emit means the page-turn cost from instrumentation is essentially free. The budget is 1 ms; even at 8000 listeners (unrealistic) we'd still fit.
3. **Consent UI is genuinely tiny.** A single line in `buildFooter` + 16 lines of CSS + a small `wireConsentToggle` function. No layout shift, no modal, no banner. The reader picks a book first; consent is opt-in via a one-tap chip whenever they want.
4. **Phase 2 has no remaining roadmap deliverables.** Everything left is the *human* QA in `BUILD.md §J` (device sweep, real-DSN PostHog activation test, Sentry test error, Crashlytics activation, pre-consent zero-events verification).

## Git commit (exact message)

```
test(qa): event-once + consent + perf tests + footer consent UI (SUB-PR 2.4)
```

This commit closes **Phase 2**. The Phase 2 series on `origin/main`:
```
<this>   test(qa): event-once + consent + perf tests + footer consent UI (SUB-PR 2.4)
dc5c9cc  feat(instrumentation): PostHog + LLEvent taxonomy + engine emit hooks (SUB-PR 2.3)
5760375  feat(shell): persistence + lossless migration + streak (SUB-PR 2.2)
c9398fa  feat(shell): native plugins + emit listener fan-out + per-book status-bar (SUB-PR 2.1)
```

## Combined open human follow-ups for Phase 2

| # | Action | Source |
|---|---|---|
| 1 | Back up `android/app/release.keystore` (≥ 2 off-machine locations) | 1.3 |
| 2 | Populate `VITE_SENTRY_DSN` in `.env`, rebuild | 1.3 |
| 3 | Populate `VITE_POSTHOG_KEY` in `.env`, rebuild | 2.3 |
| 4 | Drop `google-services.json` into `android/app/` for Crashlytics | `FIREBASE_CRASHLYTICS_SETUP.md` |
| 5 | Run `PLAY_UPLOAD_CHECKLIST.md` (Play Console web flow) | 1.3 |
| 6 | Fill `BUILD.md §G` device matrix on emulator + ≥ 2 OEMs | 1.4 |
| 7 | Run `BUILD.md §J` Phase 2 QA on a real device | 2.4 |
| 8 | Set up PostHog dashboards (activation / retention / reading-minutes NSM) | 2.3 |

## Hand-off to Phase 3 — Closed Beta & Public Play Store Launch

Phase 3 SUB-PRs from the roadmap:
- **3.1** — Launch-readiness polish & first-run experience (cover-gate ritual, delayed notification opt-in, error/offline state polish).
- **3.2** — Store presence (ASO, listing, legal & compliance — much of it staged in `STORE_LISTING.md` already).
- **3.3** — Remote Config, growth hooks & baseline analytics (Firebase Remote Config flags, review-prompt-after-delight, baseline dashboard).
- **3.4** — Closed beta → staged production rollout (`RELEASE.md` + rollout monitoring).
