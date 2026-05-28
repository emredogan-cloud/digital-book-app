# BUILD.md — Living Library · Build, Signing & Device-Matrix Testing

The runnable record for SUB-PR 1.4. Tooling, build steps, signing/keystore facts, the device
matrix template, and the exact assertions to run on each device.

---

## A. Quick reference

| Thing | Where |
|---|---|
| Signed `.aab` for Play upload | `android/app/build/outputs/bundle/release/app-release.aab` (~37 MB, gitignored) |
| Keystore | `android/app/release.keystore` (gitignored) — **back up off-machine** |
| One-shot build | `npm run prod` *(= `vite build && cap sync && cd android && ./gradlew bundleRelease`)* |
| Manual upload flow | `PLAY_UPLOAD_CHECKLIST.md` |
| Listing copy | `STORE_LISTING.md` |

## B. Toolchain (verified 2026-05-28)

| Tool | Version | Path / note |
|---|---|---|
| Node | v24.13.1 | via nvm |
| npm | 11.8.0 | |
| Java (JDK) | OpenJDK 17.0.18 | `/usr/lib/jvm/java-17-openjdk-amd64` |
| Capacitor | 6.2.1 (cli/core/android) | per LOCKED D-001 — `cap doctor` reports latest 8.3.4 |
| Vite | 8.0.14 | dev tooling |
| Android SDK | `/home/emre/Android/Sdk` | export `ANDROID_HOME` per shell |
| apksigner (APK only) | build-tools/37.0.0 | `$ANDROID_HOME/build-tools/37.0.0/apksigner` |
| keytool / jarsigner | bundled with JDK 17 | `jarsigner -verify` is the right tool for `.aab` |

## C. Android config snapshot (lifted from this repo)

```
android/variables.gradle:
  minSdkVersion     = 22      # Android 5.1 — ~99% device coverage
  compileSdkVersion = 34      # Android 14
  targetSdkVersion  = 34      # Android 14

AndroidManifest.xml (android/app/src/main/AndroidManifest.xml):
  application:
    allowBackup="true"        # user reading state survives reinstall (good for offline-first)
    supportsRtl="true"
    theme=@style/AppTheme
  activity .MainActivity:
    launchMode="singleTask"
    exported="true"           # LAUNCHER intent
    configChanges=orientation|...   # the WebView handles rotation/IME
  permissions: INTERNET       # for Google Fonts on book pages + Sentry when wired

  ❌ NO usesCleartextTraffic   → cleartext blocked by default on Android 9+ (correct)
  ❌ NO networkSecurityConfig  → Android default (HTTPS only) (correct)

capacitor.config.ts:
  appId   = com.emre.livinglibrary
  appName = Living Library
  webDir  = www
  (no server overrides — Cap 6 default is https://localhost, correct for offline-first)
```

## D. Signing & keystore — operational facts

```
file        android/app/release.keystore        (gitignored)
alias       living-library
algorithm   RSA 2048 / SHA256withRSA
validity    25,000 days → 2094-11-07
subject DN  CN=Living Library, OU=Mobile, O=emredogan-cloud, L=Istanbul, ST=Istanbul, C=TR
password    LivingLib2026!   (in .env + android/keystore.properties, both gitignored)
```

🛑 **Back this file up in ≥2 locations off this machine** (password manager + encrypted offline
drive). If the keystore is lost, the app's Play Store identity is dead forever.

## E. `cap doctor` + Gradle output (last verified run)

```
$ npx cap doctor
@capacitor/cli: 6.2.1 · @capacitor/core: 6.2.1 · @capacitor/android: 6.2.1
[success] Android looking great! 👌

$ npx cap sync
✔ Sync finished in 0.239s

$ cd android && ./gradlew bundleRelease --no-daemon
BUILD SUCCESSFUL in 15s · 71 actionable tasks: 12 executed, 59 up-to-date
app-release.aab  37,006,537 bytes

$ jarsigner -verify -verbose app-release.aab
META-INF/LIVING-L.SF + META-INF/LIVING-L.RSA + META-INF/MANIFEST.MF
"s = signature was verified"
Embedded cert: CN=Living Library, O=emredogan-cloud, C=TR
```

## F. Install the signed `.aab` on a device or emulator

The `.aab` is for the **Play Console** — for **local install on a device**, build/install the APK.

### Option 1 — release APK via Gradle (recommended for the device matrix)
```bash
# device or emulator visible to adb:
adb devices

cd /home/emre/Downloads/digital-book-app
npm run prod              # vite build + cap sync + bundleRelease
cd android
./gradlew installRelease  # builds + signs + installs the release APK on the connected device
adb shell am start -n com.emre.livinglibrary/.MainActivity   # launch (optional)
```

### Option 2 — `cap run android` (debug build, fast iteration)
```bash
cd /home/emre/Downloads/digital-book-app
npx cap run android        # detects connected device/emulator, installs the DEBUG build
```
Note: this is the **debug** APK — use Option 1 to install the actual signed release artifact.

### Option 3 — install the `.aab` directly with bundletool

Useful for testing exactly what Play Store distributes.
```bash
# install bundletool once: https://github.com/google/bundletool/releases
bundletool build-apks \
  --bundle=android/app/build/outputs/bundle/release/app-release.aab \
  --output=app.apks \
  --ks=android/app/release.keystore \
  --ks-pass=pass:LivingLib2026! \
  --ks-key-alias=living-library \
  --key-pass=pass:LivingLib2026!

bundletool install-apks --apks=app.apks
```

## G. Device matrix — **fill as you test**

The roadmap gate for SUB-PR 1.4 is **"crash-free manual run on ≥2 OEMs; offline launch and back-button correct."**

| # | Device | OEM | Android · API | RAM | Build | Bookshelf renders | All 6 books open | Offline launch | Back: book→shelf | Back: shelf→exit | Theme switch | Font scale | Bookmark survives reload | Lite perf-mode | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | _e.g. Pixel 8 emulator_ | Google | 14 · 34 | 4 GB | release | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| 2 | _your device 1_ | _OEM_ | _·_ | _GB_ | release | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| 3 | _your device 2_ | _OEM_ | _·_ | _GB_ | release | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | |
| 4 | **_low-end ≤ 3 GB_** | _OEM_ | _·_ | ≤ 3 GB | release | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ ←**critical** | |

Tick → ✓ / fail → ✗; jot any oddities in **Notes** (cold-start latency, fps subjective, layout glitches, weird haptics, etc.). Even all-OK rows count — the matrix itself is the deliverable.

## H. Scripted assertions — exactly what behaviors to check

### H.1 Offline launch
1. Install the release APK (Option 1 above).
2. Enable airplane mode (kill Wi-Fi + cellular).
3. Cold-start the app from the launcher.

- **Expected:** bookshelf renders in ~2 s; cover thumbnails for all 6 books appear (they're bundled in the `.aab`).
- **Acceptable degradation on book pages:** typography falls back to system fonts (the books load Google Fonts at runtime — Phase 0.4 finding). The bookshelf itself uses only system fonts and is unaffected by network state.
- **NOT expected:** "no internet" toast, blank/white page, crash, ANR.

### H.2 Android hardware back-button — the exact transitions
From a fresh launch (no prior history):

| Where you are | Hardware back → expected |
|---|---|
| **Bookshelf (root)** | **Exits the app** (returns to launcher / previous app). |
| **Inside a book's reader** | **Returns to the bookshelf** (the shell). |
| **Book reader → settings/TOC overlay** | **Closes the overlay only**, stays on the book. Press back again → returns to shelf. |

If any of these is wrong, that's a real bug — record it. (The shell uses `window.location.assign` to navigate from shelf → book, so the WebView's history.goBack() naturally maps to shelf on back from a book.)

### H.3 Lite / low-end perf-mode probe
The engine has a `lite` perf path (per CLAUDE.md). On a low-end device (≤ 3 GB RAM, e.g. Galaxy A14, Redmi Note 9):

1. Open each book and confirm the engine detects/auto-selects `lite` (or whatever it surfaces — look for any "lite" indicator on the page; otherwise judge subjectively).
2. Page-turn animation should remain smooth (subjectively ≥ 30 fps). If choppy, record it.
3. No OOM and no OS-killed-app within a 5-minute reading session.

### H.4 OEM-specific checks
- **Samsung One UI:** the *edge-swipe* back gesture should behave the same as the hardware/system back. Verify it explicitly.
- **MIUI / ColorOS / Realme UI (aggressive bg-killing):** open a book, scroll, return to launcher, leave for 5 min, come back. Confirm the "Continue reading" hero on the shelf points to the last-opened book (the shell persists `ll:lastOpenedBook` to localStorage).
- **Foldables (if available):** unfold/refold mid-reading — cover grid reflows; no layout glitches.

### H.5 Sentry sanity check (after you populate VITE_SENTRY_DSN)
1. Set the DSN in `.env`, run `npm run prod`, re-install.
2. Trigger a benign JS error from the shelf (e.g. open Chrome DevTools via `chrome://inspect`, evaluate `throw new Error('test from SUB-PR 1.4 BUILD.md');`).
3. Confirm the event appears in your Sentry inbox within ~30 s.

## I. Promotion gates (from the roadmap — for later)

Before moving beyond Internal Testing:
- ≥ 99.5% crash-free sessions (Android Vitals + Crashlytics; wired in Phase 2).
- ≥ 4.3 store rating.
- Privacy policy URL hosted and reflected in Data Safety.
- Sentry DSN populated and confirmed receiving events.
- ≥ 2 OEM devices verified in this matrix (this SUB-PR's gate).
