# 🛠️ TECH DECISIONS — Living Library

> Companion to [`/roadmaps/APP_EXECUTION_ROADMAP.md`](../roadmaps/APP_EXECUTION_ROADMAP.md) · 2026-05-27
> Each decision: **what / why / alternatives rejected / tradeoff / when to revisit**.

---

## 0. The single most important decision: PRESERVE THE ENGINE

The existing reading engine (measurement-based paginator, 3D page-turn, themes, bookmarks) is the product's **moat** and its **hardest-to-rebuild asset**. It depends on a *real browser layout engine* (`scrollHeight` vs. frame height + exponential/binary search to pack paragraphs). Every other decision flows from one constraint:

> **Do not rewrite, refactor, or "modernize" the engine. Add capability *around* it via a thin bridge, never *inside* it.**

This is why the platform is a **WebView hybrid**, not native — a WebView *is* a real browser engine, so the engine runs verbatim. Going Flutter/React Native would mean rebuilding the paginator in a foreign layout model: maximum cost, maximum risk, for a performance win that isn't needed (the live DOM is only **2 page elements**).

---

## 1. Platform: Capacitor WebView Hybrid (Android-first)

| | Decision |
|---|---|
| **What** | Capacitor 6 wrapping the existing `www/`, Android first, iOS later from the same project |
| **Why** | Preserves the engine 100%; ships to both app stores (PWA can't list on iOS); unlocks native plugins (haptics, IAP, push); fast to market (days→weeks); one codebase → many books, many platforms |
| **Rejected: PWA** | Can't get an iOS App Store listing or reliable native IAP; weak monetization on iOS |
| **Rejected: Fully native (Flutter/RN)** | Requires rewriting the paginator from zero in a different layout model — discards the most valuable asset for an unneeded perf gain |
| **Rejected: TWA-only** | Android-only, weaker native capability than Capacitor, no iOS path |
| **Tradeoff** | One-time native build/signing learning curve; WebView behavior varies across OEMs (mitigated by device testing) |
| **Revisit when** | Never for the engine. Only revisit if a *specific* feature is impossible in WebView — then add a focused native module, not a rewrite |

**Android-first rationale:** the founder is on **Linux** with **Android Studio already installed**; iOS builds need macOS/Xcode. Capacitor's whole value is that the *same* project produces both — only the iOS *build* needs a Mac (Phase 8, via cloud-Mac CI).

---

## 2. The "two-zone" architecture rule (resolves the no-build tension)

The engine is proudly **zero-dependency, no-build**. New work (monetization, analytics, shell) benefits from types and tooling. These are reconciled by splitting the codebase into two zones with a hard boundary:

- **Zone A — Books (`www/books/**`): FROZEN.** No build, no deps, no edits except a single sanctioned hook line per handler: `window.LL?.emit(event, payload)` and one `window.LL?.isUnlocked(...)` check in `book.js`'s lazy chapter splicer.
- **Zone B — Shell & bridge (`src-shell/` → built into `www/`):** TypeScript (strict) + a thin Vite build. Houses the bookshelf, paywall, onboarding, native bridge, analytics, billing, notifications, sharing.

**Why:** keeps the moat untouched while giving new code type-safety and a sane dependency story. **Tradeoff:** two mental models in one repo — bounded by an explicit `README`/CODEOWNERS marking `books/**` as frozen. **Revisit:** if the shell grows large enough to justify a light framework, adopt one *only in Zone B* (the books still never get a framework).

**The bridge contract (`window.LL`):** the only new global the books know about.
```ts
interface LL {
  emit(event: LLEvent, payload?: Record<string, unknown>): void; // → PostHog/Sentry/persist
  isUnlocked(bookId: string, chapterIndex: number): boolean;       // entitlement cache read
  openBook(bookId: string): void;                                  // shell navigation
}
```

---

## 3. Billing: RevenueCat over Google Play Billing

| | Decision |
|---|---|
| **What** | RevenueCat (`@revenuecat/purchases-capacitor`) abstracting Play Billing (and StoreKit later) |
| **Why** | Server-side receipt validation, entitlements, subscription lifecycle, and cross-platform parity **out of the box** — weeks of dangerous, security-critical work avoided; entitlement is the *source of truth* server-side |
| **Rejected: hand-rolled validation** | Receipt validation + subscription state machine is a security/compliance minefield for a solo dev; easy to get wrong, costly to maintain |
| **Rejected: raw `@capacitor-community/in-app-purchases`** | Lower-level; you'd rebuild validation/entitlements/analytics that RevenueCat gives free |
| **Tradeoff** | ~1% MTR fee above the free threshold + a vendor dependency |
| **Revisit when** | MTR fee becomes material at high scale — then evaluate bringing validation in-house (a good problem to have) |

**Policy note:** digital in-app unlocks **must** use the store billing system (Play/Apple) — never a custom payment processor. RevenueCat stays inside policy.

---

## 4. Backend: none for MVP → Firebase serverless for Growth

| | Decision |
|---|---|
| **What** | **No backend in MVP.** Growth adds **Firebase** (Cloud Functions, FCM, Remote Config, Crashlytics). |
| **Why** | The app is offline-first/static — a server in MVP is pure overengineering. Firebase later gives mobile-native services (push, flags, crash, light functions) in one SDK on a generous free tier, serverless |
| **Rejected (for MVP): any always-on server** | Nothing to serve; adds cost, ops, and an attack surface for zero benefit |
| **Rejected (default): Supabase** | Excellent, but Firebase wins for *mobile* primitives (FCM, Crashlytics, Remote Config, A/B). Keep Supabase as the pick **if/when relational sync** dominates (Phase 9) |
| **Tradeoff** | Some Firebase lock-in; cold starts (irrelevant at this scale) |
| **Revisit when** | Accounts/sync (Phase 9) need relational queries/RLS → reconsider Supabase/Postgres |

Cloud Functions do exactly two jobs in Growth: RevenueCat webhook handling and signed delivery of premium assets. No CRUD service, no DB to operate.

---

## 5. Observability: split JS vs. native on purpose

| Concern | Tool | Why this split |
|---|---|---|
| **JS/engine errors** | **Sentry** (browser SDK in WebView) | The product *is* JS — a native crash reporter won't see a paginator exception. Sentry with source maps catches it |
| **Native crashes / ANRs** | **Firebase Crashlytics** + Play **Android Vitals** | Native-layer stability, OEM/device breakdowns, ANR detection |
| **Product analytics + experiments** | **PostHog** | Funnels, retention, feature flags, A/B, session replay in one tool |

**Why two error tools:** a WebView app has two failure planes (JS and native). Watching only one is the classic hybrid blind spot. **Tradeoff:** two dashboards. **Revisit:** consolidate only if Sentry adds adequate mobile-native coverage you trust.

---

## 6. Analytics & experimentation: PostHog

| | Decision |
|---|---|
| **What** | PostHog for product analytics, funnels, retention, feature flags, A/B experiments, session replay |
| **Why** | One tool covers the whole product-growth loop; generous free tier (1M events); **autocapture OFF** + explicit typed events keeps it lean and privacy-clean; EU residency available for KVKK/GDPR |
| **Rejected: GA4-only** | Weak product-analytics/funnel/experiment ergonomics for this use case |
| **Rejected: Amplitude/Mixpanel + separate flag tool** | More tools, more cost; PostHog folds flags+experiments+replay together |
| **Tradeoff** | WebView event hygiene needed; self-host option adds ops if chosen |
| **Revisit when** | Event volume/cost crosses tiers, or you need warehouse-native modeling → add an export to a warehouse |

**Discipline:** no autocapture; a typed `LLEvent` union; events fire-and-forget, batched, off the read critical path (< 1ms added to a page turn).

---

## 7. Storage: localStorage → Preferences + SQLite (local-first)

| | Decision |
|---|---|
| **What** | Migrate reading progress/bookmarks from `localStorage` to **Capacitor Preferences** (small KV) + **@capacitor-community/sqlite** (bookmarks/progress) |
| **Why** | WebView `localStorage` can be evicted by the OS under storage pressure → silent progress loss → 1-star reviews. SQLite/Preferences are durable and offline-first |
| **Rejected: stay on localStorage** | Data-loss risk unacceptable for a reading app where "lost my place" is rage-inducing |
| **Rejected: cloud-first storage** | Breaks offline-first; adds PII/compliance prematurely |
| **Tradeoff** | A one-time, must-be-lossless migration (keep localStorage as fallback for one release) |
| **Revisit when** | Cross-device sync (Phase 9) layers an *optional* cloud mirror on top |

---

## 8. Content delivery: bundled now → OTA + asset packs at scale

| | Decision |
|---|---|
| **What** | Bundle all content in the app (offline-first) for MVP; add **Capacitor live-update OTA** (Capgo/self-hosted/Appflow) + **Play Asset Delivery** for large titles at scale (Phase 10) |
| **Why** | Bundling = instant open, zero CDN cost, true offline. OTA later ships new books/engine fixes **without store review** (web assets only, within store policy); asset packs keep base install size sane as the catalog grows |
| **Rejected: CDN-streamed content from day 1** | Breaks offline-first, adds cost/complexity, slower opens — for no MVP benefit |
| **Rejected: native-code OTA** | Against store policy; only *web* assets may update OTA |
| **Tradeoff** | Install size grows with catalog until asset packs/OTA land |
| **Revisit when** | ~10+ books or base install approaches Play size guidance → move large titles to asset packs |

---

## 9. CI/CD: GitHub Actions + Fastlane

| | Decision |
|---|---|
| **What** | GitHub Actions builds web + `cap sync`; **Fastlane** builds the signed `.aab` and promotes through Play tracks (internal→closed→production); Sentry source maps uploaded in CI; secrets (keystore, tokens) in CI secrets |
| **Why** | Reproducible signed builds; staged, automatable rollouts; one place for the release pipeline |
| **Rejected: manual Android Studio builds only** | Fine for the very first build; not reproducible/auditable for ongoing releases |
| **Tradeoff** | iOS needs a **macOS runner** (GH macOS or Codemagic) — added in Phase 8 |
| **Revisit when** | iOS lands → add a macOS lane; if build minutes get costly, consider Codemagic |

**Keystore is existential:** losing it means you can never update the app. Back it up in ≥2 secure locations and store it as a CI secret.

---

## 10. Notifications: FCM (push) + Local Notifications (offline)

- **FCM** for content drops (new chapter/book) — free, reliable on Android, iOS via APNs later.
- **@capacitor/local-notifications** for streaks/continue-reading — works **offline**, no server needed.
- **Cadence/quiet-hours via Remote Config** — tune without a release.
- **Tradeoff:** scheduling + timezone correctness needs care; over-notifying generates uninstalls (disciplined caps in the growth plan).

---

## 11. AI tooling: optional, pre-generated, cached (never per-read)

The **core app is deliberately not AI-dependent** — this keeps burn near-zero and removes prompt-injection/latency/cost risk from the critical path. AI is a *premium upsell layer* (Phase 10):

| Feature | Approach | Cost rule |
|---|---|---|
| Premium narration | **ElevenLabs**, pre-generated per chapter, stored as static audio, signed delivery to subscribers | Pre-generate + cache; **never** a live TTS call per read |
| AI art cards | Style templates generated offline; composed on-device | No runtime model calls |
| Semantic codex search | Embeddings over the existing Mendîran/Mythologica **structured lore modules** (pgvector/local index) | Index built offline; query is cheap |
| Author co-pilot (internal) | LLM tooling to raise content cadence (the real bottleneck) | Internal tooling, not in the shipped app's hot path |

**Why this discipline:** it converts an unbounded per-user variable cost into a bounded one-time content-production cost — the difference between a sustainable indie product and a runaway bill. **Revisit:** only introduce any runtime model call if a feature genuinely requires it *and* the unit economics are proven.

---

## 12. Stack summary (one screen)

```
Reading engine:   Vanilla JS (FROZEN) ........ the moat
Shell/bridge:     TypeScript + thin Vite ..... new code only
Native shell:     Capacitor 6 (Android→iOS) .. preserves engine, both stores
Billing:          RevenueCat / Play Billing .. server-verified entitlements
Backend:          none → Firebase (serverless) ... push/flags/crash/functions
Device storage:   Preferences + SQLite ....... durable, offline-first
Content:          bundled → OTA + asset packs  instant, offline, store-policy-safe
Product analytics:PostHog .................... funnels/flags/A-B/replay
JS errors:        Sentry ..................... the JS failure plane
Native crashes:   Crashlytics + Vitals ....... the native failure plane
Push/local notif: FCM + Local Notifications .. content drops + streaks
CI/CD:            GitHub Actions + Fastlane .. reproducible signed releases
AI (optional):    ElevenLabs/embeddings ...... pre-generated + cached only
```

**The throughline:** keep the moat frozen, add capability through a thin typed bridge, stay serverless and offline-first as long as possible, and never let an optional AI feature become a per-read variable cost.
