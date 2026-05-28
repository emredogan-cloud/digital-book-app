# SUB-PR 2.3 — Instrumentation: Analytics Taxonomy, Crash & Error Monitoring · Report

| | |
|---|---|
| **Phase** | 2 — Native Polish, Persistence & Instrumentation |
| **SUB-PR** | 2.3 — Instrumentation: Analytics Taxonomy, Crash & Error Monitoring |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Complete — committed and pushed to `origin/main` |

## Roadmap deliverables → status

| Deliverable (per roadmap 2.3) | Status | Notes |
|---|---|---|
| `src-shell/analytics.ts` (PostHog wrapper + consent gate) | ✅ | PostHog dynamically imported only after consent + DSN — bundle stays ~83 kB pre-consent. |
| Typed `LLEvent` taxonomy via `window.LL.emit` | ✅ | `LLEventName` + `LLEventPayloads` exported from `analytics.ts` — 12 canonical events. |
| **Single-line engine `emit` hooks (the only sanctioned book-code edit)** | ✅ | **5 hooks × 6 books = 30 single-line additions, zero removals.** Proved surgical by `diff -rq` vs the untouched `MY-DİGİTAL-BOOK` source. |
| Firebase Crashlytics + Android Vitals | ✅ (config only) | `FIREBASE_CRASHLYTICS_SETUP.md` documents the Firebase project setup + where `google-services.json` goes. The Gradle conditional in `android/app/build.gradle` already activates GMS only when JSON is present (no-ops otherwise). Android Vitals is automatic post-install on Play. |
| Sentry source-map upload in CI | ✅ | `.github/workflows/sentry-sourcemaps.yml` — release+sourcemaps on every `main` push, skipped silently until `SENTRY_PROJECT` is configured. |
| PostHog dashboards | ⚠ pending **you** | Activation funnel / retention / NSM are PostHog-side — set up in the PostHog UI after VITE_POSTHOG_KEY is populated. |

## The engine hooks — exactly what was added

**5 single-line `window.LL?.emit(...)` insertions** in each book's `scripts/app.js`. Each immediately follows the existing `Storage.<setter>(…)` call, matches the original indentation, and uses the optional-chain `?.` so the line is a silent no-op when the bridge isn't installed (e.g., a book served standalone).

| # | Engine site (every book) | Inserted line (with the book's own `<slug>`) |
|---|---|---|
| 1 | after `Storage.setFirstSeen(true);` | `window.LL?.emit('cover_gate_opened', { bookId: '<slug>' });` |
| 2 | after `Storage.setProgress(spreadIdx);` | `window.LL?.emit('page_turn', { bookId: '<slug>', spread: spreadIdx });` |
| 3 | after `const added = Storage.toggleBookmark(idx, label);` | `if (added) window.LL?.emit('bookmark_add', { bookId: '<slug>', spread: idx });` |
| 4 | after `Storage.setTheme(next);` | `window.LL?.emit('theme_change', { bookId: '<slug>', theme: next });` |
| 5 | after `Storage.setTypeStep(next);` | `window.LL?.emit('font_scale_change', { bookId: '<slug>', typeStep: next });` |

Verified per book (`diff` vs `MY-DİGİTAL-BOOK`):

| Book | `+ lines` | `– lines` | All adds are `window.LL?.emit` | Own-slug refs |
|---|---|---|---|---|
| sarmasik | 5 | 0 | ✓ | 5 |
| tuzun-hafizasi | 5 | 0 | ✓ | 5 |
| mendiran-vakayinamesi | 5 | 0 | ✓ | 5 |
| mythologica | 5 | 0 | ✓ | 5 |
| solgun-kitabe | 5 | 0 | ✓ | 5 |
| fabl | 5 | 0 | ✓ | 5 |
| **Total** | **30** | **0** | — | — |

**Deferred from this SUB-PR (per the approved proposal):**
- `chapter_complete` / `book_complete` — no clean single-line signal in the engine; need a precise "completed past last spread of chapter/book" detection. Taxonomy ships the names; the hook lands later.
- `session_end` — belongs to the shell (`visibilitychange` / `beforeunload`), not the books.

## What changed (shell-side)

**New:**
- `src-shell/analytics.ts` — `LLEventName` + `LLEventPayloads` taxonomy; `getAnalyticsConsent` / `setAnalyticsConsent`; `initAnalytics()` subscribes to `onLLEmit` and drops events on the floor until PostHog actually loads. **PostHog is dynamically imported** inside `initIfReady` only after `VITE_POSTHOG_KEY` *and* consent are both present.
- `.github/workflows/sentry-sourcemaps.yml` — release + source-map upload via `getsentry/action-release@v3`; gated on `vars.SENTRY_PROJECT` so it's silent until configured.
- `FIREBASE_CRASHLYTICS_SETUP.md` — Firebase project creation, `google-services.json` placement (gitignored), SHA-1 commands, verification flow.

**Modified:**
- `src-shell/main.ts` — calls `initAnalytics()` after `attachNativeListeners()`; emits `app_open` at boot; wires `window.error` + `unhandledrejection` → `emit('error', …)`; `SHELL_BUILD = '2.3.0-instrumented'`.
- `src-shell/vite-env.d.ts` — typed `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST`.
- `.env` — `VITE_POSTHOG_KEY=` + `VITE_POSTHOG_HOST=https://app.posthog.com`.
- `.gitignore` — added `google-services.json` and `GoogleService-Info.plist` (Firebase project credentials — same treatment as the keystore).
- `package.json` / `package-lock.json` — `posthog-js@^1.376.3` dep.

## Decisions / findings

1. **Dynamic-import for PostHog was decisive.** First build with a static `import posthog from 'posthog-js'` ballooned the bundle to **334.76 kB / 88.67 kB gzipped** (because posthog-js has top-level browser-global access that Vite couldn't tree-shake). Switching to `await import('posthog-js')` inside the gated `initIfReady()` brought it back to **83.63 kB / 18.07 kB gzipped** — essentially the same as the 2.2 bundle. The cost: PostHog loads on first event after consent grants, not at boot. Acceptable trade-off; arguably correct (lazy-load the analytics SDK).
2. **Engine code is byte-for-byte identical to `MY-DİGİTAL-BOOK` except for the 30 sanctioned lines.** `diff -rq` per book confirms `.git` is the only "source-only" entry and `MOTOR_LOCK.md` + `scripts/app.js` are the only "ours-side" differences; the `app.js` diff is exactly 5 added lines (no removals, no whitespace shifts) per book.
3. **Crashlytics is "config-ready" but not active.** The Gradle conditional in `android/app/build.gradle` activates the Google Services plugin only when `google-services.json` is present. Drop the JSON in, run `npm run cap:sync`, and the next `bundleRelease` ships with Crashlytics live. No code change needed.
4. **Sentry source-map workflow is silent-skip until configured.** `if: ${{ vars.SENTRY_PROJECT != '' }}` on the job — once you add the GitHub variable, the workflow starts uploading on the next main push.
5. **The PostHog SDK bundle is dynamic-loaded** — when consent + DSN are set, the next emit triggers `await import('posthog-js')`, the chunk is fetched, init runs once, the subscriber starts forwarding events. All synchronously-emitted events between consent grant and load completion are dropped (privacy-correct: pre-init events should NOT post-hoc post to PostHog).

## Verification (commands + output)

```text
[V1] node --check on each modified app.js: 6/6 parse cleanly
[V2] npx cap sync — 5 plugins registered for android; sync finished in 0.291s
[V3] HTTP smoke — every book index.html AND scripts/app.js → 200 (12/12)
[V4] vite build (after dynamic-import switch)
     www/shell/shell.js  83.63 kB  (gzip 18.07 kB)  built in 77 ms
[V5] tsc --noEmit + eslint src-shell → clean

[V6] full books-JS sweep: 132/132 book JS files parse cleanly

[V7] surgical-touch proof vs untouched MY-DİGİTAL-BOOK (per book):
     only diffs allowed = .git stripped · MOTOR_LOCK.md added · scripts/app.js
     ALL 6 BOOKS ✓ surgical

[V8] app.js line-delta per book:
     +5 lines / -0 lines (every book) · all 30 additions are window.LL?.emit calls

[V9] migration unit test (2.2) still passes — 6/6 (regression check)

[V10] Node-eval bundle (browser-sim, seeded book progress):
      bundle eval did not throw
      LL.version              : 2.1.0-bridge-listener
      __LL_SHELL__.build      : 2.3.0-instrumented
      All 10 taxonomy events fan out via emit; PostHog drops them silently
      (no DSN + no consent — pre-init drop is privacy-correct).
```

## Git commit (exact message)

```
feat(instrumentation): PostHog + LLEvent taxonomy + engine emit hooks (SUB-PR 2.3)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 2.4 — Verification, QA & Compliance Hardening

- **Migration test report** + a `forced-test-crash → Sentry + Crashlytics receive` end-to-end check (BUILD.md §H.5 sketch).
- **Event-fires-once** verification (per the roadmap): assert each taxonomy event fires exactly once per user action across a manual matrix.
- **Consent gate proof** (KVKK/GDPR per §9) — UI for opt-in / opt-out + persistence + a "no events pre-consent" sanity check.
- **Data Safety mapping** — declare what's collected (the LLEvent payload set) in `STORE_LISTING.md` Data Safety section, ready for the next Play Console update.
- **Performance budget** — confirm instrumentation adds < 1 ms to a page turn and is batched off the critical path.
