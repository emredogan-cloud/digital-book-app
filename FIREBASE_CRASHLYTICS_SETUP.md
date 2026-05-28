# Firebase Crashlytics + Android Vitals — Setup

Crashlytics catches **native** crashes (Java/Kotlin/NDK) on Android. The
Capacitor + Vanilla-JS engine in this app runs inside a WebView, so JS errors
go to **Sentry** (already wired in SUB-PR 1.3). Crashlytics covers what Sentry
can't: hard native crashes, ANRs, and OEM-specific issues.

`android/app/build.gradle` already has the conditional `apply` for the Google
Services plugin — it activates the moment `google-services.json` is present
and is a no-op otherwise.

## A. Create the Firebase project (one-time, ~5 min)

1. Open <https://console.firebase.google.com/> with your Google account.
2. **Add project** → name it `living-library` → use your existing Google
   Analytics account or create a new one (optional).
3. Inside the project: **Add app → Android**.
   - **Package name:** `com.emre.livinglibrary` (must match `capacitor.config.ts` / `android/app/build.gradle`)
   - **App nickname:** `Living Library Android`
   - SHA-1 (optional but required for Auth) — see §C below.
4. Download `google-services.json` and drop it in:
   ```
   android/app/google-services.json
   ```
   This file is **gitignored** (it contains your project's Firebase API key).
5. In the Firebase console → **Crashlytics** → **Enable Crashlytics**.

## B. Verify the wire-up locally

```bash
cd /home/emre/Downloads/digital-book-app
npm run cap:sync                  # picks up google-services.json on the next build
cd android
./gradlew bundleRelease
```

If the build succeeds and `google-services.json` is in place, the Google
Services Gradle plugin will activate automatically (`android/app/build.gradle`
already handles this gracefully — it's a no-op without the JSON).

## C. SHA-1 fingerprint (only if you want Firebase Auth / Dynamic Links / App Links)

```bash
# debug SHA-1
keytool -list -v -keystore ~/.android/debug.keystore \
  -alias androiddebugkey -storepass android -keypass android

# release SHA-1 (our production keystore)
keytool -list -v -keystore android/app/release.keystore \
  -alias living-library -storepass 'LivingLib2026!'
```

Copy the `SHA1:` line into Firebase → Project settings → Your apps → SHA fingerprints.
You don't need this for Crashlytics-only.

## D. Force a test crash (after #A and at least one Internal Testing install)

On the device with the installed app, attach `adb logcat` and trigger a crash:

```bash
adb logcat -c
adb logcat | grep -E "FATAL|Crashlytics"
```

In a future sub-PR we'll add a hidden debug button that calls
`Crashlytics.crash()`. For now, the Sentry test-error from `BUILD.md §H.5` is
the JS-side equivalent — a hard native crash test belongs to SUB-PR 2.4.

## E. Android Vitals

Android Vitals is automatic — it activates the moment your app has Internal
Testing installs. Open it at:

```
Play Console → Release → Quality → Android vitals
```

No code or config is needed; vitals are collected by Play Services on the device.

## F. Hard requirements before promoting to production

- `google-services.json` is present locally and used for the **release** build
  uploaded to Play Console.
- The first crash event has actually shown up in the Crashlytics dashboard
  (i.e., end-to-end pipeline verified).
- Android Vitals shows crash-free sessions ≥ 99.5% for ≥ 1 week on the latest build.
