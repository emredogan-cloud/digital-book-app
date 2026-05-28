# TUZUN HAFIZASI — Sürüm 1.0 Lock Raporu

**Sürüm:** 1.0.0 (Manuscript Lock — Frozen State)
**Tarih:** 2026-05-20
**Statü:** Manuscript artık değişmiyor. Yayın için kararlı.
**Yetki belgesi:** R5 APPROVED + Author RELEASE PHASE brief'i ("Manuscript is LOCKED. This is release engineering.")
**Önceki belge:** R5-FINAL-REPORT-TR.md (Publication Ready confirmation)

> Sürüm 1.0, manuscript'in son hâlidir.
> Değiştirilmemesi gereken bir kayıt değil — değiştirilmeyecek bir kayıt.

---

## 1. FİNAL MANUSCRIPT DURUMU

### 1.1 Yapısal Kapanış

| Eksen | Sonuç |
|-------|-------|
| Toplam bölüm | 36 / 36 (%100) |
| Yapısal organ | 3 perde (Akt I/II/III) |
| Akt I (Bulma) | 10 bölüm (Bölüm 1-10) |
| Akt II (İz Sürme) | 16 bölüm (Bölüm 11-26) |
| Akt III (Anılma) | 10 bölüm (Bölüm 27-36) |
| Yazılı kelime | 63.541 |
| Prose paragraph | 3.923 |
| Yapısal eleman | 316 (256 `hr`, 60 `quote`) |
| Ortalama bölüm uzunluğu | 1.765 kelime |
| En kısa bölüm | Bölüm 23 (1.008 kelime — Mâra Adı Söyler) |
| En uzun bölüm | Bölüm 27 (2.914 kelime — Defter Yazmak) |
| Final cümle (canonical) | "Yarın yeni bir gün. Tuzhane'yi açacak." |

### 1.2 Revizyon Süreci Kapanışı

| Faz | Aksiyon | Net Delta | Birikim |
|-----|---------|-----------|---------|
| Pre-R1 | Manuscript tamamlandı | 64.330 | 0 |
| R1 | Cerrahi sözel temizlik (saturasyon trim) | -148 | -148 |
| R2 | Sembol motif ekonomisi | -16 | -164 |
| R3 | Mikro karakter yamaları (Mâra paragrafı, Cilâl mektup, vb.) | +69 | -95 |
| R4 | Sıkıştırma pasajı (Bölüm 25, 27, 34, 35) | -694 | -789 |
| **R5** | **Son pas + yayın hazırlık denetimi (yalnız Bölüm 26 metadata)** | **0** | **-789** |
| **Sürüm 1.0** | **Lock** | **63.541** | — |

### 1.3 Kanon Disiplini Sonu

| Disiplin | Durum | Kanıt |
|----------|-------|-------|
| 20 canonical reveal Story Bible §10.2'de | ✓ | Tamamı doğru bölümde |
| 14 karakter imza cümlesi birebir | ✓ | Lemi (5), Selâhattin (4), Cilâl (3), İlhan (1), Mâra (3) |
| Kültürel marker "Sağol değil" | ✓ | 15 farklı bölümde 25+ kullanım |
| Motif zincirleri (13 motif sayıldı) | ✓ | Kanon limitleri içinde |
| TABU bölümler (10, 23, 30, 36) | ✓ | Ch10/Ch23/Ch36 hiç dokunulmadı; Ch30 yalnız R1+R3 onaylı |
| Final cümle | ✓ | "Yarın yeni bir gün. Tuzhane'yi açacak." (Ch36 son `content[]`) |
| Akt sınırları | ✓ | 10+16+10 = 36, finalize.js + Story Bible + novel-data.js tutarlı |
| İsim yazımları | ✓ | 19 özel ad varyantı tutarlı (Mâra, Mâriye, Sezerân, Cilâl, vd.) |

---

## 2. FİNAL METRİKLER

### 2.1 Kelime Sayımı Doğrulaması

| Bölüm | Kelime | Akt |
|-------|-------:|:----|
| 1 | 1.224 | Bulma |
| 2 | 1.295 | Bulma |
| 3 | 1.170 | Bulma |
| 4 | 1.131 | Bulma |
| 5 | 1.199 | Bulma |
| 6 | 1.146 | Bulma |
| 7 | 1.220 | Bulma |
| 8 | 1.301 | Bulma |
| 9 | 1.282 | Bulma |
| **10** | **1.031** | Bulma (TABU) |
| 11 | 1.711 | İz Sürme |
| 12 | 1.561 | İz Sürme |
| 13 | 1.695 | İz Sürme |
| 14 | 1.838 | İz Sürme |
| 15 | 1.533 | İz Sürme |
| 16 | 1.634 | İz Sürme |
| 17 | 1.702 | İz Sürme |
| 18 | 1.896 | İz Sürme |
| 19 | 2.070 | İz Sürme |
| 20 | 1.814 | İz Sürme |
| 21 | 1.978 | İz Sürme |
| 22 | 2.246 | İz Sürme |
| **23** | **1.008** | İz Sürme (TABU) |
| 24 | 1.845 | İz Sürme |
| 25 | 2.293 | İz Sürme |
| 26 | 2.135 | İz Sürme |
| 27 | 2.914 | Anılma |
| 28 | 2.410 | Anılma |
| 29 | 2.340 | Anılma |
| **30** | **2.313** | Anılma (TABU) |
| 31 | 2.406 | Anılma |
| 32 | 2.193 | Anılma |
| 33 | 2.370 | Anılma |
| 34 | 2.270 | Anılma |
| 35 | 2.266 | Anılma |
| **36** | **1.101** | Anılma (TABU — Final Mum) |
| **TOPLAM** | **63.541** | |

### 2.2 Akt Dağılımı

| Akt | Bölümler | Kelime | Pay (%) |
|-----|----------|-------:|--------:|
| Bulma (Akt I) | 10 | 11.999 | %18,9 |
| İz Sürme (Akt II) | 16 | 28.959 | %45,6 |
| Anılma (Akt III) | 10 | 22.583 | %35,5 |
| **Toplam** | **36** | **63.541** | %100 |

### 2.3 Yazardan Onaylı Bant Karşılaştırması

| Eksen | Hedef | Fiili | Durum |
|-------|-------|-------|-------|
| Yazardan onaylı bant | 60.000 – 70.000 kelime | 63.541 | ✓ Orta bölge |
| Plan §6.1 ince hedef | 62.750 – 63.070 | 63.541 | +471 (kabul edilebilir sapma) |
| R4 OPTION B silinme | -1.100 ila -1.250 | -694 | -406 (tone-protective sapma — yazardan onaylı) |
| Toplam revizyon delta | ~-1.000 | -789 | -211 (yazardan onaylı) |

### 2.4 Teknik Sağlık Metrikleri

| Metrik | Değer |
|--------|-------|
| JavaScript dosya sayısı | 41 (36 chapter + finalize + novel-data + 3 scripts) |
| Tüm dosyalar `node --check` | ✓ 41/41 temiz |
| CSS dosya sayısı | 3 (themes, main, animations) |
| CSS brace balance | ✓ Tüm 3 dosya dengeli (19+168+4 = 191 rule) |
| HTML başlık | "Tuzun Hafızası · Bir Kıyı Romanı" |
| HTML meta description | Mevcut (162 karakter, Türkçe) |
| HTML theme-color | `#0a1418` (koyu lacivert) |
| Browser load süresi (Node sim) | 12.08 ms |
| Browser tarafından entries doldurma | ✓ 36 entry, 3 kategori |
| Final cümle final `content[]` elemanı | ✓ "Yarın yeni bir gün. Tuzhane'yi açacak." |

---

## 3. FROZEN-STATE BEYANI

### 3.1 Kapanmış Maddeler

Aşağıdaki listenin tamamı **kapanmıştır**. Sürüm 1.0 sonrasında değiştirilmez:

**Kanon İçerik:**
- 36 bölüm prose'u (chapter-01.js'den chapter-36.js'e)
- Tüm karakter cümleleri (14 imza dahil)
- Tüm karakter isimleri (19 varyant — Mâra, Mâriye, Sezerân, Cilâl, Selâhattin, Hâlit, Vâliçe, İlhan, Behçet, Akrâ, Mestân, Karahan, Erivân, Kaldaş, Suhâl, Nahide, Berhan, Tuzhane, Düzeltme)
- 20 reveal (Story Bible §10.2)
- 13 motif zinciri (mum, kapı, tane, nane, çekmece, defter, bahçe, folio, Defne, Mâriye, İPT, Tuzhane, çocuk eli)
- Final cümle: "Yarın yeni bir gün. Tuzhane'yi açacak."
- TABU bölümler 10, 23, 30, 36 — ABSOLUTE LOCK

**Yapı:**
- 3-akt yapısı: Bulma (1-10), İz Sürme (11-26), Anılma (27-36)
- 36 bölüm sayısı
- Bölüm sırası ve id'leri (`bolum-01`...`bolum-36`)
- Bölüm başlık ve subtitle metni
- Theme etiketleri (her bölüm 3 tema)

**Metadata:**
- `novel-data.js` book block (title, subtitle, series, edition, epigraph, backText, epilogueText, colophon)
- `novel-data.js` categories array (bulma → iz-surme → anilma sırası, sigils, accents, descriptions)
- `finalize.js` akt sıralama lojiği
- Her chapter file header yorumu

### 3.2 Açık Kalan Maddeler (Sürüm 1.0 Lock Dışı)

Aşağıdakiler manuscript LOCK kapsamında **değildir**. Yayın engineering kararı ile değiştirilebilir:

- index.html sayfa altyapısı (script `<script>` referansları, meta tagler) — kanon-uyumlu kalmak şartıyla
- scripts/app.js, book.js, storage.js (sayfalandırma, depolama, etkileşim) — runtime engineering
- styles/*.css (görsel atmosfer) — tema engineering
- assets/cover.svg + tuzun-hafizasi.png (kapak görselleri)
- README.md (proje dokümanı)
- reports/* (revizyon raporları arşivi)

### 3.3 Dokunulmaması Gereken Kanon Noktaları

Bu liste yazardan açıkça onaylanmış ABSOLUTE LOCK kuralıdır:

1. **Bölüm 10 — İlk Tat** (İlk reveal, kız kardeş)
2. **Bölüm 23 — Mâra Adı Söyler** ("Defne Mâriye.")
3. **Bölüm 30 — Mâra Ölümü** ("Affedilecek bir şey mi var?")
4. **Bölüm 36 — Bir Kez Daha** (Final mum + son cümle)
5. **Final cümle** — "Yarın yeni bir gün. Tuzhane'yi açacak."
6. **Lemi'nin felsefi cümleleri** (5 imza, Ch25-Ch35 arası)
7. **Selâhattin'in 4 imza cümlesi** (Ch33)
8. **Nahide'nin free-indirect paragrafı** (Ch35:136 — TABU TABU)
9. **İlhan'ın notu** (Ch34:78 — quote bloğu)
10. **Folio 263-A içeriği** (Ch25:215)

Bu 10 noktaya hiçbir koşulda dokunulmaz.

---

## 4. GIT RELEASE ÖZETİ

### 4.1 Commit Geçmişi (Üretim → Lock)

| Commit | Tarih | Aksiyon |
|--------|-------|---------|
| 75801d7 | 2026-05-20 öncesi | `feat(tuzun-hafizasi): Start vercel deployment` (manuscript yazıldı + ilk deploy) |
| cdf0359 | 2026-05-20 | `revision(R1): cerrahi sözel temizlik fazı tamamlandı` |
| efef728 | 2026-05-20 | `revision(R2): sembol motif ekonomi ayarlaması` |
| c723e88 | 2026-05-20 | `revision(R3): mikro karakter yamaları` |
| 7a64021 | 2026-05-20 | `revision(R4): sıkıştırma pasajı — anlatımsal fazlalık temizliği` |
| 76c650a | 2026-05-20 | `revision(R5): son pas + yayın hazırlık denetimi tamamlandı` |
| 93bb127 | 2026-05-20 | `release: add cover image asset (tuzun-hafizasi.png)` |

### 4.2 Branch Durumu

| Branch | Durum | Push Hedefi |
|--------|-------|-------------|
| `main` | Sürüm 1.0 aktif | `origin/main` (GitHub: emredogan-cloud/tuzun-hafizasi) |
| Vercel build | Otomatik trigger | Her `main` push'unda yeniden derlenir |

### 4.3 Tag Stratejisi

**Sürüm 1.0 için annotated git tag:** `v1.0.0`

| Eksen | Değer |
|-------|-------|
| Tag adı | `v1.0.0` |
| Tag tipi | Annotated (mesaj içerir) |
| Hedef commit | 93bb127 (release: add cover image asset) — manuscript R5 sonrası + cover commit'i |
| Mesaj | "Tuzun Hafızası — Sürüm 1.0 (Manuscript Lock)" |
| Push hedefi | `origin v1.0.0` |

Tag, manuscript'in lock noktasını işaretler. İleride `v1.0.0`'a refer edilerek bu tam halin checkout edilmesi mümkün.

### 4.4 Repo Genel Durumu

| Eksen | Değer |
|-------|-------|
| Remote | `https://github.com/emredogan-cloud/tuzun-hafizasi.git` |
| Active branch | `main` |
| Total commits (manuscript yazımından bu yana) | 7 |
| Revizyon commitleri | 5 (R1-R5) |
| Release commitleri | 1 (cover asset) |
| Initial commit | 1 (start deployment + tüm manuscript) |
| Untracked dosyalar | 0 |
| Modified dosyalar | 0 |

---

## 5. LOCK GEREKÇESİ

### 5.1 Niçin Şimdi Lock?

**R5 Publication Readiness Audit sonucu 98/100 (operational 100/100) skoru ile geçildi.** Aşağıdaki dört ana eksen aynı anda doğrulandı:

1. **Kanon tutarlılığı.** 20 reveal, 14 imza cümlesi, 13 motif zinciri, TABU bölümler — hepsi Story Bible §10/§11 ile birebir.

2. **Yapısal sağlık.** 36/36 chapter sözdizimi temiz, browser-load simülasyonu 12 ms'de 38 dosyayı doğru sırada okudu, Akt dağılımı (10+16+10) tutarlı.

3. **Yazardan onaylı bant.** 63.541 kelime — 60-70k hedef bandının orta bölgesinde.

4. **Metadata tutarlılığı.** R5 tek operasyonel pürüzü (Ch26 category) düzeltti; geri kalan 35 bölüm metadata zaten tutarlıydı.

Manuscript artık değiştirilmek için bekleniyor olmadığı için, beklemek değiştirme dürtüsü yaratır. Lock, "iyileştirme dürtüsünün" disipline geçiş noktasıdır.

### 5.2 R5 Brief'inden Anahtar Cümle

> "R5 does not improve the manuscript. It verifies whether the manuscript is ready to stop changing."

R5 bu doğrulamayı yaptı. Sonuç: hazır.

### 5.3 Lock Disiplini

**Lock sonrası kural:** prose'a dokunulmaz.

| Senaryo | Aksiyon |
|---------|---------|
| Okur bir typo bildirirse | Sürüm 1.1 değerlendirilir; tek typo için lock açılmaz |
| Yayıncı stilistik tercih önerirse (örn. `...` → `…`) | Sürüm 1.1 değerlendirilir; toplu uygulanır, lock güncelenir |
| Çeviri için yapısal pas gerekirse | Sürüm 1.1 ya da ayrı bir Translation Edition olarak |
| Sequel yazılırsa | "Vâliçe Kıyısı · Cilt-i Sânî" olarak ayrı manuscript; cilt-i evvel locked kalır |
| Bug bulunursa (script/UI) | Lock sadece manuscript için — script/UI'da düzeltme serbest |

### 5.4 Lock'un Anlamı

Lock, manuscript'in:
- **Mükemmel** olduğu anlamına gelmez — *değiştirilmeyecek kadar iyi* olduğu anlamına gelir.
- **Statik** olduğu anlamına gelmez — okur tarafından her okumada farklı yaşanacak.
- **Bitti** anlamına gelmez — *yazma sürecinin bitti, yayın süreci başladı* anlamına gelir.

Manuscript yazıldı. Beş tur revizyondan geçti. Her tur farklı bir disiplinle yapıldı (R1: cerrahi sözel; R2: motif ekonomisi; R3: karakter yamaları; R4: anlatımsal sıkıştırma; R5: yayın denetimi). Beş tur sonunda, manuscript artık değişmek için yazılmıyor — okunmak için yazılıyor.

Lock budur.

---

## 6. LOCK SONRASI SORUMLULUKLAR

### 6.1 Yazar Sorumluluğu

| Sorumluluk | Aksiyon |
|------------|---------|
| Manuscript prose'a dokunmama | Sürüm 1.0 lock disiplini |
| Sürüm 1.1 açma kararı | Yalnız 5.3'teki senaryolardan biri varsa |
| Sequel/Cilt-i Sânî kararı | Ayrı manuscript olarak; cilt-i evvel locked kalır |

### 6.2 Engineering Sorumluluğu

| Sorumluluk | Aksiyon |
|------------|---------|
| Runtime (script/UI) bakım | Lock dışı; gerekirse PR aç |
| Vercel deploy izleme | `main` push'larında derleme tetiklenir |
| Browser uyumluluk | `data-perf` lite/rich ayrımı korunur |
| Performans | Bug raporu üzerine değerlendirilir |
| Cover/Asset güncellemesi | Lock dışı; ayrı release-asset commit'leri |

### 6.3 Dokümantasyon Sorumluluğu

| Sorumluluk | Aksiyon |
|------------|---------|
| README.md güncellemesi | (Önerilen — şu an Akt I durumunda görünüyor; manuscript artık 36/36) |
| Revizyon raporları arşivi | `reports/` dizininde kalır; tarih sırasında okunur |
| Bu lock raporu | Manuscript'in son durum kaydı olarak referans |

---

## 7. KAPANIŞ

Sürüm 1.0 lock için tüm koşullar karşılanmıştır.

| Eksen | Durum |
|-------|-------|
| Manuscript yazıldı | ✓ (36/36 bölüm) |
| R1-R5 revizyon süreci tamamlandı | ✓ (5 faz) |
| Kanon disiplini korunmuş | ✓ |
| Teknik sağlık doğrulanmış | ✓ |
| Yazardan onay alındı | ✓ ("R5 APPROVED. Publication Ready status confirmed.") |
| Release engineering brief'i geçerli | ✓ |
| Cover asset commit edildi | ✓ (tuzun-hafizasi.png, 93bb127) |
| Frozen-state beyanı yazıldı | ✓ (bu rapor) |
| Lock gerekçesi belgelendi | ✓ (§5) |
| Lock sonrası sorumluluklar tanımlandı | ✓ (§6) |

**Şimdi git tag aşaması.**

Annotated git tag `v1.0.0` oluşturulacak ve `origin` remote'a push edilecektir. Bu tag, Sürüm 1.0 lock noktasını kalıcı olarak işaretler.

Manuscript artık değişmiyor.

Manuscript okunmak için bekliyor.

---

> *"Roman bittikten sonra Reha hâlâ Vâliçe'de. Hâlâ Tuzhane'yi her sabah açıyor."* — `novel-data.js` epilogue
>
> Tuzun Hafızası, Sürüm 1.0 — kararlı, donmuş, yayına hazır.

---

*Bu rapor Sürüm 1.0 manuscript lock'unun kaydıdır. Aşağıdaki tag bu lock'un git seviyesinde işaretlenmesi içindir: `v1.0.0`. İleride bu tag'a referans verilerek manuscript'in lock anındaki tam hâli geri çağrılabilir.*
