# SUB-PR 1.3 — Signing, Build Pipeline, Sentry & Play Internal Testing · Report

| | |
|---|---|
| **Phase** | 1 — Capacitor Android Shell + Bookshelf Home |
| **SUB-PR** | 1.3 — Signing, Build Pipeline, Sentry & Play Internal Testing |
| **Repo** | `digital-book-app/` → origin `github.com/emredogan-cloud/digital-book-app` (`main`) |
| **Date** | 2026-05-28 |
| **Status** | ✅ Code & artifacts complete — committed and pushed. **Human action pending** for the actual Play Console upload (web flow) and a real Sentry DSN (per the prior plan). |

## Roadmap deliverables → status

| Deliverable (per roadmap 1.3) | Status | Notes |
|---|---|---|
| Release keystore (securely backed up) + documented signing | ✅ (generated) · ⚠ (back up off-machine!) | RSA 2048 / SHA256, alias `living-library`, valid until 2094; `android/app/release.keystore` (gitignored). Password in `.env` + `android/keystore.properties` (both gitignored). |
| Gradle configured for a signed `.aab` | ✅ | `android/app/build.gradle` reads `keystore.properties` via `rootProject.file(...)`; signs `release` build type when credentials are present (graceful unsigned fallback otherwise). |
| Sentry browser SDK in the shell | ✅ (wired, DSN-from-env) | `@sentry/browser@10.54.0`; `src-shell/sentry.ts` reads `VITE_SENTRY_DSN`; no-ops cleanly when empty. Vite tree-shakes Sentry out entirely when the DSN is empty at build time. |
| Play Console app + listing draft + Internal Testing release | ✅ (locally) · ⚠ (Play web UI is human-only) | `STORE_LISTING.md` (TR+EN) and `PLAY_UPLOAD_CHECKLIST.md` produced; `app-release.aab` is signed and ready to upload. |

## What changed

**New:**
- `src-shell/sentry.ts` — `initSentry()` reads `import.meta.env.VITE_SENTRY_DSN`; calls `@sentry/browser`'s `init(...)` with conservative defaults (`tracesSampleRate: 0`, `sendDefaultPii: false`); no-ops + logs a debug line when DSN is absent.
- `src-shell/vite-env.d.ts` — types the env (`VITE_SENTRY_DSN` optional).
- `STORE_LISTING.md` — TR + EN listing copy (name / short / full description), category, ASO keywords, content-rating notes, Data-Safety initial declaration, graphic-asset spec.
- `PLAY_UPLOAD_CHECKLIST.md` — step-by-step manual upload flow A → I for the Play Console.

**Modified:**
- `src-shell/main.ts` — calls `initSentry()` before `installBridge()`; `SHELL_BUILD` bumped to `1.3.0-signed`.
- `vite.config.ts` — `envDir: '..'` so Vite reads `.env` at the repo root (Vite root is `src-shell/`).
- `android/app/build.gradle` — loads `keystore.properties` via `rootProject.file(...)`, defines `signingConfigs.release`, wires `buildTypes.release.signingConfig` only when the file exists.
- `.gitignore` — added `keystore.properties` (sibling of `*.keystore` / `*.jks`).
- `package.json` / `package-lock.json` — `@sentry/browser@^10.54.0` dependency.

**Created on disk but NOT committed (gitignored, intentionally):**
- `.env` (repo root) — local secrets, including the keystore password (mirror of `keystore.properties`).
- `android/keystore.properties` — what Gradle actually reads at build.
- `android/app/release.keystore` — the signing identity. **Back it up off this machine.**
- `android/app/build/outputs/bundle/release/app-release.aab` — the signed build artifact (37 MB).
- `www/shell/shell.js[.map]` — Vite output.

## Keystore — operational facts

```
file       : android/app/release.keystore
alias      : living-library
algorithm  : RSA 2048 / SHA256withRSA
validity   : 25,000 days → expires 2094-11-07
subject DN : CN=Living Library, OU=Mobile, O=emredogan-cloud, L=Istanbul, ST=Istanbul, C=TR
password   : LivingLib2026!   (placeholder — rotate if/when you want)
```

🛑 **Critical:** if this file is ever lost, the app can never be updated under this signature on Google Play. **Back it up in ≥2 locations off this machine** (password manager + offline drive) before any public push.

## Verification (commands + output)

```text
[V1] secrets are gitignored — git check-ignore -v
     .env                          .gitignore:25:.env
     android/keystore.properties   .gitignore:22:keystore.properties
     android/app/release.keystore  .gitignore:19:*.keystore

[V2] keystore identity (keytool -list -v)
     Alias name           : living-library
     Signature algorithm  : SHA256withRSA
     Subject Public Key   : 2048-bit RSA
     Owner                : CN=Living Library, OU=Mobile, O=emredogan-cloud, L=Istanbul, ST=Istanbul, C=TR
     Valid                : 2026-05-28 → 2094-11-07

[V3] vite build (Sentry imported; DSN empty → tree-shaken)
     319 modules transformed
     www/shell/shell.js   9.12 kB  (gzip 3.26 kB)   built in 51 ms
     Bundle contains "Sentry skipped (no VITE_SENTRY_DSN)" — the no-op branch.
     When VITE_SENTRY_DSN is populated, the next build will include the full
     Sentry runtime (expect ~70–80 kB).

[V4] tsc --noEmit (strict)    → clean
[V5] eslint src-shell          → clean
[V6] www/books untouched       → git status --short www/books = 0 lines

[V7] npx cap sync — Sync finished in 0.239s

[V8] gradlew bundleRelease (after rootProject.file fix)
     BUILD SUCCESSFUL in 15s   71 tasks (12 executed, 59 up-to-date)
     app-release.aab  37,006,537 bytes

[V9] signature verification (jarsigner — apksigner does NOT support .aab)
     META-INF/LIVING-L.SF + META-INF/LIVING-L.RSA + META-INF/MANIFEST.MF present.
     "s = signature was verified" on the signed entries.
     Embedded X.509 cert == CN=Living Library, OU=Mobile, O=emredogan-cloud, ...
     -> matches the keystore exactly.

[V10] bundle weight breakdown (largest entries)
      base/dex/classes.dex                                 6.2 MB
      base/assets/public/books/mythologica/...png         3.1 MB
      base/assets/public/books/solgun-kitabe/...png       3.0 MB
      base/assets/public/books/sarmasik/images/...png     2.8 MB
      ... (the bulk is book cover/image assets — expected)
```

## Findings / decisions (for the log)

1. **Keystore path bug caught in the first build.** `file(keystoreProperties['storeFile'])` resolves relative to the **module dir** (`android/app/`), so `storeFile=app/release.keystore` produced the double-app path `android/app/app/release.keystore` and Gradle's `validateSigningRelease` failed. Fix: switched to `rootProject.file(...)`, which resolves relative to `android/`. Build then SUCCESS in 15s.
2. **`apksigner verify` rejected the `.aab`.** apksigner is for **APKs only**; `.aab` (App Bundle) uses jar signing. Used `jarsigner -verify` (the correct tool for AAB), which confirmed the signature and printed the matching cert.
3. **Sentry DSN absence is a feature here** — the build stays a clean ~9 kB because Vite's static analysis dead-code-eliminates Sentry's runtime when `import.meta.env.VITE_SENTRY_DSN` is the empty string at build time. Populating `.env` will rebuild with full Sentry (~70–80 kB) automatically; no code changes needed.
4. **Two npm advisories carry over** from the 1.1 toolchain install (transitive devDeps). Recommend a focused `npm audit` pass in a later hardening sub-PR.
5. **Gradle daemon not used** (`--no-daemon`) because the sandbox blocks `kill`/`pkill` and leaving daemons running would accumulate; cold start is acceptable.

## Human actions remaining (per the agreed plan)

| # | Owner | Action |
|---|---|---|
| 1 | **You** | **Back up `android/app/release.keystore`** (and the password) in ≥2 locations off this machine. Do this before any public push. |
| 2 | **You** | Populate `VITE_SENTRY_DSN` in `.env` once your Sentry project exists. Re-run `npm run build`; Sentry will be included automatically. |
| 3 | **You** | Walk through `PLAY_UPLOAD_CHECKLIST.md` to create the Play Console app, paste the listing copy, upload `app-release.aab`, and start Internal Testing. |
| 4 | **You** | Trigger a known JS error in the app to confirm Sentry receives events (after #2 + a fresh build). |

## Git commit (exact message)

```
feat(android): release signing + Sentry SDK + listing draft (SUB-PR 1.3)
```
Committed and pushed to `origin/main`. (Live hash + push result in the session summary.)

## Hand-off to SUB-PR 1.4 — Device-Matrix Testing & Validation

- Run the signed app on an emulator + ≥2 physical OEM devices.
- Verify offline launch (airplane mode), Android back button (book → shelf, not exit), deep navigation, and all 6 books open in the shell.
- Check the `lite` perf-mode path on a low-end device.
- Produce `BUILD.md` with the device matrix, `cap doctor` / Gradle output, and signing/backup steps.
