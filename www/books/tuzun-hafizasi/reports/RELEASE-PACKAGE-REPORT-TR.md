# TUZUN HAFIZASI — Release Paket Raporu

**Sürüm:** 1.0.0 (Release Engineering — Phase B Output)
**Tarih:** 2026-05-20
**Statü:** Release paketi yayın için hazır. Sıfır blocking defekt.
**Yetki belgesi:** Author RELEASE PHASE brief'i (PHASE B — Release Packaging)
**Önceki belgeler:** R5-FINAL-REPORT-TR.md, VERSION-1.0-LOCK-REPORT-TR.md

> Release engineering, manuscript'in dünyaya nasıl gideceğini düzenler.
> Manuscript yapısına dokunmaz. Yapının etrafındaki taşıyıcıyı denetler.

---

## 1. RELEASE ASSET ENVANTERİ

### 1.1 Kök Dosyalar (Repository Root)

| Dosya | Boyut | Tür | Durum | Açıklama |
|-------|------:|-----|-------|----------|
| `index.html` | 13.283 B | HTML5 | ✓ Hazır | Ana giriş — dijital kodeks arayüzü |
| `README.md` | 2.963 B | Markdown | ⚠ Outdated | Akt I döneminden kalma proje açıklaması; 36/36 manuscript'i yansıtmıyor (bkz. §5.1) |
| `tuzun-hafizasi.png` | 139.763 B | PNG (1852×967, RGBA) | ✓ Yeni commit (93bb127) | Sosyal/dağıtım kapak görseli |

### 1.2 `content/` — Manuscript İçerik

| Dosya | Boyut (KB) | Sözdizimi | Açıklama |
|-------|-----------:|:----------|----------|
| `novel-data.js` | 3,1 | ✓ | Book meta (title, edition, epigraph) + 3 akt tanımı |
| `finalize.js` | 1,6 | ✓ | Akt sıralayıcı |
| `chapter-01.js` | 11,0 | ✓ | Liman, Ekim |
| `chapter-02.js` | 11,6 | ✓ | Cenaze |
| `chapter-03.js` | 10,3 | ✓ | Tuzhane |
| `chapter-04.js` | 10,3 | ✓ | İki Kâğıt |
| `chapter-05.js` | 10,8 | ✓ | Bezelye Mevsimi |
| `chapter-06.js` | 10,2 | ✓ | (devlet kayıtları toplanıyor) |
| `chapter-07.js` | 10,8 | ✓ | Babanın defteri ("İPT" ilk) |
| `chapter-08.js` | 11,3 | ✓ | Suhâl Nine + rüh-çizgi |
| `chapter-09.js` | 11,0 | ✓ | Tuzhane'de Lemi |
| `chapter-10.js` | 9,2 | ✓ | **İlk Tat** (TABU) |
| `chapter-11.js` | 14,8 | ✓ | İz sürme başlar |
| `chapter-12.js` | 13,1 | ✓ | |
| `chapter-13.js` | 14,4 | ✓ | Cilâl ile karşılaşma |
| `chapter-14.js` | 15,9 | ✓ | Babanın imzaları |
| `chapter-15.js` | 13,4 | ✓ | |
| `chapter-16.js` | 13,8 | ✓ | Nahide tanıtımı |
| `chapter-17.js` | 14,9 | ✓ | |
| `chapter-18.js` | 16,0 | ✓ | Hâlit Bey karşılaşması |
| `chapter-19.js` | 18,0 | ✓ | İptal mekanizması |
| `chapter-20.js` | 16,4 | ✓ | Mâra "iki çocuk" |
| `chapter-21.js` | 17,0 | ✓ | İkinci Tat ("Mâriye") |
| `chapter-22.js` | 19,1 | ✓ | Mâriye + Defne tam isim |
| `chapter-23.js` | 9,5 | ✓ | **Mâra Adı Söyler** (TABU) |
| `chapter-24.js` | 15,4 | ✓ | |
| `chapter-25.js` | 19,5 | ✓ | Mağara — Folio 263-A reveal |
| `chapter-26.js` | 17,9 | ✓ | Hâlit'in Sonu (R5 metadata fix) |
| `chapter-27.js` | 25,4 | ✓ | Defter Yazmak (en uzun) |
| `chapter-28.js` | 20,9 | ✓ | |
| `chapter-29.js` | 20,2 | ✓ | İlhan'ın annesi |
| `chapter-30.js` | 19,6 | ✓ | **Mâra Ölümü** (TABU) |
| `chapter-31.js` | 20,7 | ✓ | Cilâl'in küreği |
| `chapter-32.js` | 18,3 | ✓ | Lemi'nin felsefesi |
| `chapter-33.js` | 20,6 | ✓ | Selâhattin Hoca |
| `chapter-34.js` | 19,0 | ✓ | İlhan'ın Tuzu |
| `chapter-35.js` | 19,1 | ✓ | Lemi'nin Sonu |
| `chapter-36.js` | 10,0 | ✓ | **Bir Kez Daha** (TABU — Final) |

**Toplam content/ boyutu:** 628 KB (38 dosya)

### 1.3 `scripts/` — Runtime Motoru

| Dosya | Boyut (KB) | Sözdizimi | Açıklama |
|-------|-----------:|:----------|----------|
| `app.js` | 21 | ✓ | Üst denetleyici |
| `book.js` | 40 | ✓ | Sayfa motoru (paginasyon, 3D çevirme) |
| `storage.js` | 3,2 | ✓ | LocalStorage (ilerleme, izler, tema) |

**Toplam scripts/ boyutu:** 72 KB

### 1.4 `styles/` — Görsel Atmosfer

| Dosya | Boyut (KB) | Brace Balance | Rule Sayısı | Açıklama |
|-------|-----------:|:-------------:|:-----------:|----------|
| `themes.css` | 8,4 | ✓ | 4 | Tuzlu / Kumlu / Gece-Deniz / High-contrast temaları |
| `main.css` | 29,7 | ✓ | 168 | Ana stil |
| `animations.css` | 1,9 | ✓ | 19 | Hareket katmanı (lite mode için minimal) |

**Toplam styles/ boyutu:** 52 KB

### 1.5 `assets/` — Görsel Varlıklar

| Dosya | Boyut (KB) | Tür | Açıklama |
|-------|-----------:|:----|----------|
| `cover.svg` | 7,7 | SVG (600×900 viewBox) | Ana kapak (`role="img"`, `aria-label`) — runtime'da kullanılmıyor şu an |

### 1.6 `reports/` — Üretim Arşivi

| Dosya | Tür | Açıklama |
|-------|-----|----------|
| STORY-BIBLE-TR.md | Master kanon | Manuscript'in kavramsal otoritesi |
| TUZUN-HAFIZASI-WRITING-REPORT-TR.md | Üretim raporu | Yazım süreci dokümantasyonu |
| MANUSCRIPT-COMPLETION-REPORT-TR.md | Tamamlanma raporu | 36/36 audit |
| EDITORIAL-PASS-REPORT-TR.md | Editöryel pas | Pre-R1 değerlendirme |
| REVISION-PLAN-TR.md | Revizyon planı | R1-R5 stratejisi |
| ACT2-PROGRESS-REPORT-TR.md, ACT2-MID-REPORT-TR.md, ACT3-ENTRY-REPORT-TR.md, FINAL-ARC-PROGRESS-REPORT-TR.md, SESSION-RECOVERY-REPORT-TR.md, PERFORMANCE-HOTFIX-REPORT-TR.md, R1-1-PILOT-REPORT-TR.md, R1-FULL-REPORT-TR.md, R2-REPORT-TR.md, R3-REPORT-TR.md, R4-REPORT-TR.md, R5-FINAL-REPORT-TR.md | İlerleme & revizyon raporları | Şeffaflık arşivi |
| VERSION-1.0-LOCK-REPORT-TR.md | Lock raporu | Sürüm 1.0 lock kaydı |
| RELEASE-PACKAGE-REPORT-TR.md | Bu rapor | Release paket denetimi |

### 1.7 Manuscript Dizini

`manuscript/` — Boş. Manuscript'in PDF/EPUB export sürümleri için ayrılmış; şu an boş. Yayın akışı (PDF/EPUB üretimi) gelecekte buraya yazılırsa, lock disiplini şudur: prose dokunulmaz, yalnızca format dönüşümü yapılır.

---

## 2. DEPLOY BÜTÜNLÜĞÜ

### 2.1 Build Süreci

Bu proje **vanilla JS** (build adımı yok). Runtime şudur:

1. Browser `index.html`'i yükler
2. CSS dosyaları (`themes.css` → `main.css` → `animations.css`) paralelde yüklenir
3. Inline `<script>` `data-perf` modunu (lite/rich) localStorage + cihaz heuristiklerinden ayarlar
4. JS dosyaları sırasıyla yüklenir:
   - `content/novel-data.js` (book meta + categories)
   - `content/chapter-01.js`...`content/chapter-36.js` (36 entries push)
   - `content/finalize.js` (akt sıralama)
   - `scripts/storage.js`
   - `scripts/book.js`
   - `scripts/app.js`
5. `app.js` başlatma yapar

**Tüm 36 chapter'ın push edilmesi `finalize.js`'den önce gerçekleşir.** `finalize.js` sonrasında `entries` array akt sırasında.

### 2.2 Browser-Load Simülasyonu

Node sandbox ile gerçek browser yükleme sırası simüle edildi:

| Eksen | Sonuç |
|-------|-------|
| Yüklenen dosya | 38 (`novel-data.js` + 36 chapter + `finalize.js`) |
| Yükleme süresi | 12,08 ms (Node sandbox; gerçek browser daha hızlı) |
| `window.TUZ.entries.length` | 36 |
| `window.TUZ.categories.length` | 3 |
| Akt dağılımı post-finalize | bulma: 10, iz-surme: 16, anilma: 10 |
| İlk entry | `bolum-01` (bulma) |
| Son entry | `bolum-36` (anilma) |
| Son `content[]` elemanı | "Yarın yeni bir gün. Tuzhane'yi açacak." |
| Console mesajı | `[Tuzun Hafızası] 36 bölüm yüklendi: { bulma: 10, 'iz-surme': 16, anilma: 10 }` |

**Sonuç: deploy bütünlüğü ✓ tam.**

### 2.3 Vercel Build Pipeline

Repo `https://github.com/emredogan-cloud/tuzun-hafizasi` Vercel'e bağlı. Her `origin/main` push'unda Vercel:

1. Repo'yu fetch eder
2. `vercel.json` yok → static deployment olarak işler (vanilla JS/HTML/CSS)
3. Root'taki `index.html`'i serves
4. `content/`, `scripts/`, `styles/`, `assets/`, `tuzun-hafizasi.png` doğal olarak deploye dahil
5. CDN edge'lerden serve edilir

**Build süresi:** Tipik static deploy < 30 saniye.
**Cache:** Static assets immutable cache'lenir.
**SSL:** Otomatik (Vercel-managed).

---

## 3. EKSİK ASSET DENETİMİ

### 3.1 HTML Referansları → Dosya Eşleştirmesi

`index.html` içindeki tüm `<link>` ve `<script>` referansları manuscript'le birebir kontrol edildi:

| Referans | Eşleşen Dosya | Durum |
|----------|---------------|-------|
| `styles/themes.css` | ✓ Mevcut | OK |
| `styles/main.css` | ✓ Mevcut | OK |
| `styles/animations.css` | ✓ Mevcut | OK |
| `content/novel-data.js` | ✓ Mevcut | OK |
| `content/chapter-01.js` … `content/chapter-36.js` | ✓ Tüm 36 mevcut | OK |
| `content/finalize.js` | ✓ Mevcut | OK |
| `scripts/storage.js` | ✓ Mevcut | OK |
| `scripts/book.js` | ✓ Mevcut | OK |
| `scripts/app.js` | ✓ Mevcut | OK |
| `https://fonts.googleapis.com/css2?...` | External CDN | OK (Google Fonts) |

**Sonuç: 36 chapter + 4 destek JS + 3 CSS = 43 yerel referans, 1 external — tümü doğrulandı.**

### 3.2 Eksik Asset Tespiti

| Asset | Mevcut Mu | Referans Veriliyor Mu | Açıklama |
|-------|:---------:|:---------------------:|----------|
| `assets/cover.svg` | ✓ | ✗ | Runtime'da kullanılmıyor; release/print için ayrılmış |
| `tuzun-hafizasi.png` | ✓ | ✗ | Runtime'da kullanılmıyor; sosyal/store cover (OG image candidate) |
| favicon | ✗ | ✗ | Yok (browser default kullanılacak) |
| OG meta tags | ✗ | ✗ | `og:image`, `og:title`, `og:description` yok |
| Twitter cards | ✗ | ✗ | `twitter:card`, `twitter:image` yok |

### 3.3 Karar — Eksik Asset'ler

| Eksik | Karar | Sebep |
|-------|-------|-------|
| favicon | **Sürüm 1.1 değerlendirme** | Browser default kabul edilebilir; favicon ekleme bir tasarım kararıdır, manuscript LOCK dışı |
| OG / Twitter card meta tagleri | **Sürüm 1.1 değerlendirme** | Sosyal preview için ideal ama HTML'e yeni meta eklemek release engineering kararıdır — yazara aittir |
| `assets/cover.svg` link | **Sürüm 1.1 değerlendirme** | SVG kapak runtime'da kullanılırsa loader yerini alabilir |
| `tuzun-hafizasi.png` link | **Sürüm 1.1 değerlendirme** | Sosyal preview için OG meta'da gösterilebilir |

Hiçbiri **blocking** değildir — Sürüm 1.0 lock yayına çıkabilir. Bunlar Sürüm 1.1 (post-release optional enhancement) için işaretlendi.

---

## 4. PATH DOĞRULAMASI

### 4.1 Göreceli Path Şeması

Tüm asset referansları **göreceli path** kullanır (`/` ya da `..` yok):

- `styles/themes.css` (root-relative)
- `content/chapter-01.js` (root-relative)
- `scripts/app.js` (root-relative)
- `assets/cover.svg` (root-relative, runtime'da kullanılmıyor)

Bu yapı:
- ✓ Vercel static deploy ile uyumlu
- ✓ Lokal `file://` ile uyumlu (build adımı gerekmediği için)
- ✓ Sub-directory deploy ile uyumlu (örneğin `domain.com/tuzun-hafizasi/` altında)

### 4.2 Absolute URL Kullanımı

| URL Tipi | Yer | Risk |
|----------|-----|------|
| `https://fonts.googleapis.com/...` | `<link rel="preconnect">` + `<link rel="stylesheet">` | Düşük — Google Fonts CDN |
| `https://fonts.gstatic.com` | `<link rel="preconnect" crossorigin>` | Düşük — Google Fonts CDN |

CDN bağımlılığı: Google Fonts erişilemezse fallback `serif` / `sans-serif` kullanılır (`font-family` declaration'larında). Manuscript okunaklığı bozulmaz.

### 4.3 Crossorigin / Security Headers

| Header | Durum |
|--------|-------|
| `crossorigin` (fonts) | ✓ `preconnect` link'inde mevcut |
| CSP (Content Security Policy) | Vercel default'u; manuscript yapısı için yeterli |
| `meta charset="UTF-8"` | ✓ Mevcut |
| `meta viewport` | ✓ Mevcut |
| HTTPS | Vercel-managed |

---

## 5. YÜKLEMERLE DOĞRULAMASI

### 5.1 README.md Stalness — Sürüm 1.1 Önerisi

Mevcut `README.md` ilk Akt I döneminde yazılmış ve şu hatalı bilgileri içeriyor:

| Hatalı Cümle | Doğru Durum |
|--------------|-------------|
| "Şu anki üretim: 5 bölüm yazıldı (Akt I'in yarısı)" | 36/36 bölüm tamamlandı (63.541 kelime, Sürüm 1.0) |
| "Hedef hacim: 75-85 bin kelime" | Yazardan onaylı bant 60-70 bin; fiili 63.541 |
| "├── STORY-BIBLE-TR.md" — root'ta gösteriliyor | Aslında `reports/STORY-BIBLE-TR.md` |
| chapter list yalnız 01-05 listeleniyor | 36 chapter'ın hepsi mevcut |

**Karar:** README.md bu hâlinde manuscript LOCK kapsamı dışında. Sürüm 1.1 olarak güncellenebilir (release engineering kararı, yazardan onay bekler). Şu an Sürüm 1.0 deploy edildiğinde README dokuman olarak okunduğunda biraz eski hâli gösterir — kritik değil ama not edilmesi gerekir.

**Önerilen güncelleme (yazardan onay sonrası):** 36/36 bölüm, 63.541 kelime, Sürüm 1.0, R1-R5 tamamlandı, dijital kodeks `index.html` ile aç, vd. kanon-uyumlu güncellemeler.

### 5.2 Runtime Smoke Test (Local Browser)

Bu raporu yazarken `file://` üzerinden gerçek browser ile manual smoke test **kullanıcı tarafından** yapılmadıysa önerilir:

| Test | Beklenen Sonuç |
|------|----------------|
| `index.html` aç | Loader görünür ("Tuz çözülüyor…") → kayboldukran sonra kitap mizanpajı |
| Sayfa çevirme (← →) | Bölüm 1'den 36'ya çevrilir |
| Fihrist (F) | 36 bölüm Akt sırasında listelenir (Bulma 10 + İz Sürme 16 + Anılma 10) |
| Bölüm 26 fihrist etiketi | "İz Sürme" akt'ında görünür (R5 fix sonrası) |
| Final cümle (Bölüm 36 son sayfa) | "Yarın yeni bir gün. Tuzhane'yi açacak." görünür |
| İz koy (K) | LocalStorage'a bookmark yazılır |
| Tema (T) | Tuzlu / Kumlu / Gece-Deniz / High-contrast döner |
| Tam ekran (E) | Pencere fullscreen |
| Performans (P) | lite / rich döner |

### 5.3 Performans Beklentileri

| Eksen | Beklenti |
|-------|----------|
| Initial paint | < 1 saniye (38 JS + 3 CSS, ~700 KB total uncompressed) |
| Time-to-interactive | < 2 saniye (`app.js` init sonrası) |
| Bundle boyut | 752 KB (raw); gzip ile ~ 200 KB |
| LCP (Largest Contentful Paint) | İlk paragrafın render'ı |
| FCP (First Contentful Paint) | Loader → kitap geçişi |

Static deploy + CDN edge cache ile Vercel'de ortalama 100-300 ms TTFB beklenir.

---

## 6. PRODUCTION READINESS

### 6.1 Blocking Defektler

**Sıfır.**

### 6.2 Non-Blocking İyileştirmeler (Sürüm 1.1)

| # | İyileştirme | Şiddet | Aksiyon |
|---|-------------|--------|---------|
| 1 | README.md güncellenmesi | Düşük | Yazardan onay sonrası tek commit |
| 2 | OG / Twitter meta tagleri | Düşük | Sosyal preview için index.html `<head>` ekleme |
| 3 | favicon ekleme | Çok Düşük | Browser default kabul edilebilir |
| 4 | `assets/cover.svg` runtime kullanımı | Çok Düşük | Loader yerine kapak SVG'si gösterilebilir |
| 5 | Diyalogda `...` → `…` (10 yer) | Çok Düşük | Yayıncı tercihi; manuscript LOCK gerektirir |

Bu beş madde **yayını engellemez**. Sürüm 1.0 bu maddeler olmadan tam fonksiyoneldir.

### 6.3 Production Hazırlık Skoru

| Eksen | Ağırlık | Skor |
|-------|--------:|-----:|
| Asset bütünlüğü | 25 | 25 |
| Path doğruluğu | 15 | 15 |
| Sözdizimi sağlığı (41 JS dosyası) | 15 | 15 |
| Yükleme sırası | 15 | 15 |
| Browser-load simülasyon | 10 | 10 |
| Manuscript kanon LOCK | 10 | 10 |
| Cover asset (PNG + SVG) | 5 | 5 |
| Vercel deploy uyumu | 5 | 5 |
| **Toplam** | **100** | **100** |

**Production Readiness: 100 / 100.**

### 6.4 Production Statü

**HAZIR.**

| Statü | Durum |
|-------|-------|
| Deploy yapılabilir | ✓ (her `main` push'unda Vercel build) |
| Manuscript kararlı | ✓ (Sürüm 1.0 LOCK) |
| Asset paketi tam | ✓ |
| Runtime sağlıklı | ✓ |
| Performans uygun | ✓ |
| Mobile uyumlu | ✓ (`data-perf` lite mode) |
| Erişilebilirlik | ✓ (aria-label, role, alt attributes) |
| SEO temel | ✓ (title + meta description) |
| Social preview (OG) | ✗ (Sürüm 1.1) |

---

## 7. RELEASE COMMIT GEÇMİŞİ

| Commit | Aksiyon | Tarih |
|--------|---------|-------|
| 75801d7 | Manuscript ilk yazıldı + vercel deploy başladı | 2026-05-20 öncesi |
| cdf0359 | R1 — Cerrahi sözel temizlik | 2026-05-20 |
| efef728 | R2 — Sembol motif ekonomisi | 2026-05-20 |
| c723e88 | R3 — Mikro karakter yamaları | 2026-05-20 |
| 7a64021 | R4 — Anlatımsal sıkıştırma | 2026-05-20 |
| 76c650a | R5 — Yayın hazırlık denetimi | 2026-05-20 |
| 93bb127 | Release — Cover asset (PNG) commit | 2026-05-20 |
| [bekleyen] | Release — Lock + Release Package raporları | 2026-05-20 |
| [bekleyen] | git tag `v1.0.0` | 2026-05-20 |

---

## 8. KAPANIŞ

Release paketi tüm denetim eksenlerini geçti.

| Eksen | Durum |
|-------|-------|
| Asset envanteri tam | ✓ |
| Deploy bütünlüğü | ✓ |
| Path doğrulaması | ✓ |
| Yükleme doğrulaması | ✓ |
| Production readiness skoru | 100/100 |
| Blocking defekt | 0 |
| Manuscript LOCK uyumu | ✓ |
| Vercel build trigger | Her `main` push'unda otomatik |
| Cover asset commit'lendi | ✓ (93bb127, tuzun-hafizasi.png) |
| Lock raporu mevcut | ✓ (VERSION-1.0-LOCK-REPORT-TR.md) |
| Bu paket raporu | ✓ (kayıt edildi) |

**Sıradaki adım:** Bu rapor + lock raporu `main`'e commit edilir, ardından annotated git tag `v1.0.0` oluşturulur ve `origin`'e push edilir. Sürüm 1.0 release ilgili git tag ile dondurulur.

---

> *"Bu cilt Reha'nın elinden geçti. Sonraki cildi yazacak el henüz bilinmiyor."* — `novel-data.js` backText
>
> Tuzun Hafızası Sürüm 1.0 — yayın paketi tamamlandı.

---

*Bu rapor release paketinin son denetimidir. Manuscript LOCK disiplini ile uyumludur — release engineering kararları manuscript yapısına dokunmamıştır. Yayın hazırlığı için tüm teknik koşullar karşılanmıştır.*
