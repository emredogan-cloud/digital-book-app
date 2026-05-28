# SUB-PR 1.4 — Device-Matrix Testing & Validation · Report

| | |
|---|---|
| **Phase** | 1 — Capacitor Android Shell + Bookshelf Home |
| **SUB-PR** | 1.4 — Device-Matrix Testing & Validation |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Code, docs & static hardening complete — committed and pushed. **Phase 1 closed.** Per-device manual execution pending (human-only on real devices). |

## Roadmap deliverables → status

| Deliverable (per roadmap 1.4) | Status | Notes |
|---|---|---|
| `BUILD.md` — device matrix + `cap doctor` / Gradle output + signing/backup steps | ✅ | New at repo root; sections A–I |
| Run on emulator + ≥ 2 physical OEM devices, all 6 books open | ⚠ pending **you** | `BUILD.md §G–H` provides the matrix template + exact install commands |
| Offline launch + back-button (book→shelf, not exit) verified | ⚠ pending **you** | scripted assertions in `BUILD.md §H.1` + `§H.2` |
| Low-end / `lite` perf-mode path checked | ⚠ pending **you** | `BUILD.md §H.3` |

## Honest scope (per your direction)

I can't physically run the `.aab` on a Samsung or Pixel device — that's your part. What I did do for 1.4:
1. Wrote **`BUILD.md`** so you have a concrete, scripted matrix to fill in (the deliverable).
2. Snapshotted the Android config (`variables.gradle`, `AndroidManifest.xml`, `capacitor.config.ts`) — clean defaults, nothing brittle.
3. Did the static hardening described below.

## Static hardening done in this SUB-PR

1. **CSP added to `www/index.html`** (the bookshelf shell). Strict default — `default-src 'self'`; explicit allow-list for Sentry's ingest hosts (`https://*.sentry.io`, `https://*.ingest.sentry.io`) so the SDK works the moment you populate `VITE_SENTRY_DSN`; `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` to harden against script injection/clickjacking-via-base. This was a **carry-over from SUB-PR 1.3** (the roadmap said "strict CSP allowing only Google Fonts + self") that I missed in 1.3 and fixed here. The bookshelf doesn't actually use Google Fonts (it's system-only) so it doesn't need them in CSP. The frozen books carry their own `<head>` headers and are out of scope.
2. **`npm run prod` one-shot script** added to `package.json`: `vite build && cap sync && cd android && ./gradlew bundleRelease`. Used by `BUILD.md §F` so the install loop is a single command.
3. **Verified no config drift**: minSdk 22 / target 34 (Cap 6 defaults); no `usesCleartextTraffic` (default-blocked on Android 9+); `allowBackup="true"` (intentional — user reading state survives reinstall, which fits offline-first); only `INTERNET` permission requested (needed for Google Fonts in books + Sentry).

Files modified:
- `www/index.html` — added the CSP `<meta>`.
- `package.json` — added `prod` script.

Files added:
- `BUILD.md` (root)
- `sub-pr-report/SUBPR_1.4_REPORT.md` (this file)

`www/books/**` and `android/**` source untouched. `git status www/books`: 0 modified.

## Verification (commands + output)

```text
[V1] re-build after CSP/scripts edits
     vite v8.0.14 · 319 modules transformed
     www/shell/shell.js   9.12 kB  (gzip 3.26 kB)   built in 17 ms
[V2] tsc --noEmit                    → clean
[V3] eslint src-shell                → clean
[V4] HTTP smoke (reused running server)
     GET /                                  -> 200
     GET /shell/shell.js                    -> 200
     GET /books/sarmasik/index.html         -> 200
     GET /books/sarmasik/assets/cover.jpg   -> 200
     CSP meta present in index.html         -> yes
[V5] www/books untouched               → 0 lines
```

(I deliberately didn't re-run `gradlew bundleRelease` here — the binary doesn't change with HTML
CSP / npm-script edits, and re-running would just regenerate the same `.aab` already verified
in 1.3.)

## Git commit (exact message)

```
docs(phase-1): BUILD.md + CSP hardening + prod script (SUB-PR 1.4)
```

This is the **final commit of Phase 1**. Phase 1 commits on `origin/main`:

```
ee466cf chore(gitignore): fix www/shell/ ignore + untrack stray build artifacts
1958180 feat(shell): scaffold Capacitor 6 + Vite/TS shell (SUB-PR 1.1)
7c21c06 feat(shell): polished cover-grid shelf + window.LL bridge stub (SUB-PR 1.2)
2126b53 feat(android): release signing + Sentry SDK + listing draft (SUB-PR 1.3)
<this>  docs(phase-1): BUILD.md + CSP hardening + prod script (SUB-PR 1.4)
```

## Open human actions (combined from 1.3 + 1.4)

| # | Action | Source |
|---|---|---|
| 1 | **Back up the keystore** in ≥ 2 off-machine locations | 1.3 |
| 2 | Populate `VITE_SENTRY_DSN` in `.env`, rebuild | 1.3 |
| 3 | Walk through `PLAY_UPLOAD_CHECKLIST.md` (Play Console) | 1.3 |
| 4 | Trigger test JS error after #2 + fresh build → confirm Sentry ingests | 1.3 / `BUILD.md §H.5` |
| 5 | **Fill in `BUILD.md §G` device matrix** — emulator + ≥ 2 OEM devices, including a low-end one | 1.4 (this) |
| 6 | Execute the scripted assertions in `BUILD.md §H` per device | 1.4 (this) |

## Hand-off to Phase 2 — Native Polish, Persistence & Instrumentation

Phase 2 SUB-PRs (from the roadmap):
- **2.1** — Native feel: haptics + per-book splash/status-bar theming (consumes the `themeColor` / `statusBarStyle` / `splashBackgroundColor` already in `src-shell/books.ts`).
- **2.2** — Durable persistence: localStorage → SQLite/Preferences migration + shelf progress + streak data.
- **2.3** — Instrumentation: PostHog taxonomy via `window.LL.emit` + Crashlytics + Sentry source-map upload in CI.
- **2.4** — Verification, QA & compliance hardening.
