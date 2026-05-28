# Play Console Store Listing — Living Library (SUB-PR 1.3 draft)

Paste these strings into the Play Console fields. Two languages: **Turkish (default)**
and **English (US)** as a secondary locale.

---

## App name (max 30 chars)
- **TR:** `Yaşayan Kütüphane`
- **EN:** `Living Library`

## Short description (max 80 chars)
- **TR:** `Atmosferik, el işçiliğiyle tasarlanmış Türkçe kitaplar — çevrimdışı.`
- **EN:** `Atmospheric, hand-crafted books — offline-first reading, no clutter.`

## Full description (max 4000 chars)

### TR
**Yaşayan Kütüphane — kitabı bir tüketim nesnesi değil, bir tasarım nesnesi olarak ele alan, çevrimdışı bir mobil okuma koleksiyonu.**

Ana akım e-kitap uygulamalarının yapamadığı şeyi yapar: her kitabın kendi atmosferini, tipografisini ve sayfa çevirme hissini taşır. Sıfır bağımlılık ile yazılmış, ölçüme dayalı bir sayfalama motoru üzerine kurulu. İnternetsiz açar, internetsiz okur. Reklam yok, hesap yok.

**Koleksiyondaki kitaplar:**
• **Sarmaşık · Nazar** — Sistemlere inanan bir yazılımcının dijital noir öyküsü.
• **Tuzun Hafızası · Bir Kıyı Romanı** — Bir kıyı kasabasında tuza karışmış hatıralar.
• **Mendîran Vakayinâmesi** — Yedinci And'ın çatladığı diyarın karanlık fantazi evreni.
• **Codex Mythologica** — Dünya mitolojilerinden yirmi altı öykü, aydınlatılmış el yazması formatında.
• **Solgun Kitabe** — Çöken Varân İmparatorluğu'nun yasak arşivi.
• **Fabl · Küçük Masallar** — Sakin, hafif şiirsel, bağımsız okunabilen kısa fabller.

**Özellikler**
- 6 kitap · ~265.000 kelime · tamamen çevrimdışı.
- Sinematik 3B sayfa çevirme animasyonu.
- Her kitabın kendine özgü teması, tipografisi ve renk paleti.
- Yer imleri, okuma ilerlemesi, tema değişimi, yazı boyutu ayarı.
- Reklamsız. Hesap gerektirmez. Veri toplamaz.

Kitabın gerçekten bir nesne gibi hissettirmesi gerektiğine inanan okurlar için.

### EN
**Living Library — a hand-crafted offline reading collection that treats books as artifacts, not as content.**

Living Library does what mainstream e-readers structurally can't: it art-directs every title. Built on a measurement-based, zero-dependency reading engine, it opens, paginates and turns pages with the feel of a real object. No accounts, no ads, no network required.

**In the collection**
• **Sarmaşık · Nazar** — a cyber-noir of a developer who falls into the gap a surveillance state can't see.
• **Tuzun Hafızası · Bir Kıyı Romanı** — a coastal novel of memories dissolved in salt.
• **Mendîran Vakayinâmesi** — a dark-fantasy chronicle of a fractured Seventh Oath.
• **Codex Mythologica** — twenty-six myths from Greek, Egyptian, Norse, Japanese and beyond, as an illuminated manuscript.
• **Solgun Kitabe** — the forbidden archive of a collapsed empire.
• **Fabl · Küçük Masallar** — short, gentle, poetic fables.

**Features**
- 6 books · ~265,000 words · fully offline.
- Cinematic 3D page-turn animation.
- Per-book theming, typography and palette.
- Bookmarks, reading progress, theme switch, font scaling.
- Ad-free. No account. No data collection.

For readers who want books to feel like objects again.

---

## Category
**Books & Reference**

## Content rating
Run the IARC questionnaire as: Books & Reference → text-only content → no explicit material → typical outcome **Teen**.

## Data Safety (updated for SUB-PR 2.3 + 2.4 instrumentation)

**Privacy promise:** **no event leaves the device until the user explicitly grants consent** via the bookshelf footer toggle ("📊 Analiz: Kapalı" → "📊 Analiz: Açık"). Default is **off**. Persisted at `localStorage['ll:analytics:consent']`.

### Data collected when consent is granted (PostHog)
Anonymous, behavioral events only. **No PII** is collected. Each event ships *only* the listed payload fields — no name, email, IP-derived PII (PostHog masks IP at ingest), no device IDs the app generates, no content excerpts.

| Event | When | Payload fields the app sets |
|---|---|---|
| `app_open` | Shell boots | *(none)* |
| `shelf_view` | Bookshelf renders | *(none)* |
| `book_open` | User taps a book | `bookId` (slug) |
| `cover_gate_opened` | First time the book's cover-gate is dismissed | `bookId` |
| `page_turn` | Every spread change inside a book | `bookId`, `spread` *(integer page-pair index)* |
| `chapter_complete` | *(deferred — engine has no clean single-line completion signal yet)* | — |
| `book_complete` | *(deferred)* | — |
| `bookmark_add` | User adds a bookmark | `bookId`, `spread` |
| `theme_change` | User toggles the in-book theme | `bookId`, `theme` *(preset name)* |
| `font_scale_change` | User changes the type step | `bookId`, `typeStep` *(0–4)* |
| `session_end` | *(shell-side, future hook)* | — |
| `error` | JS error / unhandled rejection caught by the shell | `message`, optional `filename` / `lineno` / `kind`. The book engine doesn't put user content in errors. |

### Crash & error reporting
- **Sentry** (JS errors / WebView): browser SDK wired; activates when `VITE_SENTRY_DSN` is populated. Source maps uploaded by `.github/workflows/sentry-sourcemaps.yml`.
- **Firebase Crashlytics** (native Android crashes): activates when `google-services.json` is dropped into `android/app/` (see `FIREBASE_CRASHLYTICS_SETUP.md`).
- **Android Vitals**: automatic post-install in Play Console; no code / config needed.

### Declarations to make in Play Console "Data Safety"
- **App activity → Page views and taps**: ✅ Collected (only with consent). Purpose: Analytics + App functionality. Optional to the user (in-app toggle).
- **App info and performance → Crash logs**: ✅ Collected. Purpose: App functionality + Analytics.
- **App info and performance → Diagnostics**: ✅ Collected (Sentry breadcrumbs, performance traces). Purpose: Analytics.
- **All other Play categories** (personal info, financial, location, web history, contacts, etc.): **Not collected**.

### User controls
- **In-app:** bookshelf footer → "📊 Analiz" toggle (one tap; persisted at `localStorage['ll:analytics:consent']`). Default is **off**.
- **OS-level:** standard Android "Clear app data" resets the consent flag and all on-device data.

## ASO keywords / discovery
- **TR:** kitap, e-kitap, çevrimdışı kitap, edebiyat, hikaye, roman, fantazi, mitoloji, Türk edebiyatı, cyber-noir
- **EN:** book, ebook, offline reading, literature, novel, fantasy, mythology, Turkish literature

## Graphic assets you'll need to upload
| Asset | Size | Notes |
|---|---|---|
| App icon | 512×512 PNG | High-fidelity Living Library mark — designed in a later polish pass. |
| Feature graphic | 1024×500 | Strong typographic / cover collage. |
| Phone screenshots | 1080×1920 (or similar portrait), 2–8 | Capture the bookshelf + a book open + a page-turn moment. |
| (Optional) Promo video | up to 30s | YouTube URL. |

For the first internal-testing upload, **placeholders are fine** — the assets just have to exist. Finalize before promoting to Closed/Production.
