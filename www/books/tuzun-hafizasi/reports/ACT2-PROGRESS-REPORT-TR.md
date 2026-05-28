# TUZUN HAFIZASI — Akt II İlerleme Raporu

**Sürüm:** 0.3 (Lazy Pagination + Akt II Açılışı)
**Tarih:** 2026
**Statü:** Lazy pagination aktif; Akt II'nin 5 bölümü yazıldı; toplam 15/36 (%42)

---

## 1. LAZY PAGINATION — UYGULAMA DURUMU

### 1.1 Mimari Karar

Sistem **iki fazlı** çalışıyor:

**Eager Faz (boot, ~120-300ms):**
- Ön matter: blank + kapak + blank + başlık spread'i
- TOC iskeleti: tüm 36 bölüm için fihrist kayıt yer tutucuları (folio "—" başlangıçta)
- İlk 3 bölüm tam paginate
- Akt başlığı sayfası (Bulma)
- Arka matter: blank + epilogue + blank + arka kapak + blank
- Spread + folio + TOC sayfaları yazılır
- İlk mount (kullanıcı ilk spread'i görür)

**Lazy Faz (arka plan, ~120-200ms per chapter):**
- `requestAnimationFrame × 2` ile ilk paint sonrası başlar
- Her tick `requestIdleCallback({ timeout: 800 })` ile bir bölüm paginate eder
- Bölüm sayfaları arka matter'dan ÖNCEKİ konuma splice edilir (`_backMatterStart` pointer'ı yönetilir)
- Akt geçişi (Bulma → İz Sürme → Anılma) sırasında akt başlığı sayfası dinamik olarak eklenir
- Her splice sonrası: spread'ler yeniden eşleştirilir, folio'lar yeniden numaralandırılır, TOC sayfaları yeniden yazılır
- Mevcut spread eğer TOC görüntülüyorsa anında DOM'da yenilenir

**Sync Catch-up (TOC sıçramasında):**
- Kullanıcı TOC'tan henüz lazy-build edilmemiş bir bölüme tıklarsa
- `goToEntry()` hedefe kadar olan tüm yapılmamış bölümleri **senkron** olarak inşa eder
- En kötü senaryo: kullanıcı eager fazdan hemen sonra Bölüm 36'ya sıçrar → 33 bölüm sync build (~3-5s); deneyime göre çok nadir
- En yaygın: kullanıcı doğrusal okur, arka plan zaten yetişmiş olur

### 1.2 Uygulanan Değişiklikler

`scripts/book.js` — yeniden yazıldı:

| Eski | Yeni |
|------|------|
| `_buildPages()` monolithic | `_buildEagerStructure()` + `_insertChapterBeforeBackMatter()` |
| Tüm bölümler boot'ta | İlk 3 bölüm boot'ta + lazy arka plan |
| `entryToSpread` build sonrası kurulur | `_recomputeFolios()` her splice'ta yeniden inşa eder |
| TOC tek seferde yazılır | TOC her bölüm tamamlanmasında yenilenir |
| `goToEntry()` index'e gider | `goToEntry()` sync catch-up tetikleyebilir |

`scripts/storage.js` — bölüm anchor'ı eklendi:

```js
getLastChapter() / setLastChapter()
```

Kullanım: kullanıcı kapatıp tekrar açtığında, saved spread index lazy faz tamamlanmadan ötede olabilir. Bölüm etiketi anchor olarak kullanılır — `goToEntry()` sync catch-up yapar.

`scripts/app.js` — lazy entegrasyonu:

- `engine.onLazyProgress` ve `engine.onLazyComplete` callback'leri bağlandı
- Her lazy bölüm tamamlandığında: `handleSpreadChange()` çağrılır (sayfa toplamı güncellenir) + `renderTocDrawer()` (drawer'da folio'lar güncellenir)
- Boot sırasında saved spread aralık dışındaysa, bölüm anchor üzerinden navigasyon
- `rebuildEngineAroundCurrentChapter` (font/resize değişimi sonrası) lazy uyumlu — mevcut bölüme `goToEntry()` ile geri döner

### 1.3 Korunan Yapı (Redesign DEĞİL)

Aynı kalan unsurlar:
- Sayfa kinds (`COVER`, `TOC`, `CHAPTER_OPENING`, `STORY`, `EPILOGUE`, `BLANK`, `ACT_TITLE`)
- Spread modeli (2 sayfa)
- Paginasyon algoritması (üstel + ikili arama)
- 3D çevirme animasyonu
- Akt-akt geçiş hizalama
- Roman rakam folio
- Storage API'si (eski metodlar korundu)

### 1.4 Ölçülmeyen Performans Tahmini

Doğrudan FPS ölçümü mümkün değil (sandbox), ama mimari analiz:

| Eksen | Önceki (eager all 15) | Mevcut (lazy 3 + 12) |
|-------|----------------------|----------------------|
| **İlk paint** | ~300-600ms | ~120-250ms (~50% iyileşme) |
| **Loader gösterimi** | Tüm pagination süresi | Yalnızca eager faz (~120-250ms) |
| **Lazy faz toplam süre** | — | ~1500-2500ms (arka plan, kullanıcı görmez) |
| **TOC'tan sıçrama (yetişmiş)** | Anında | Anında |
| **TOC'tan sıçrama (yetişmemiş)** | — | Sync catch-up (~50-200ms × kayıp bölüm) |

36 bölüme ölçeklendiğinde:
- Eager: 3 bölüm = ~150-300ms
- Lazy: 33 bölüm = ~4000-6000ms (kullanıcı 4 saniye sonra büyük olasılıkla hâlâ ilk bölümü okuyor — fark edilmez)
- TOC'tan ileri sıçramada sync catch-up: deneyimde nadir

---

## 2. AKT II AÇILIŞI — 5 YENİ BÖLÜM

### 2.1 Tablolu Özet

| Bölüm | Başlık | Kelime | Kanon İşlevi |
|-------|--------|--------|--------------|
| XI | Geri Dönmeyenler | 1.673 | Sistematik arama; çocuk çizimi; iki figür biri isimsiz |
| XII | Dilin Eğitimi | 1.522 | Lemi'den okuma kuralları; 1908 düğün anısı pratik tatı |
| XIII | Cilâl | 1.642 | Kerâli ziyareti; "Bilmediğin şeyleri arama"; Defter-Hâne yönü |
| XIV | Defter-Hâne | 1.799 | Yarı yanık bina; Behçet Amca; babanın imzalı İptal kayıtları; eksik folio |
| XV | Uyarı | 1.485 | İlhan resmi olarak eve gelir; karta bırakır; Reha yalan söyler |
| **TOPLAM (Akt II / 5)** | | **8.121** | |
| **GENEL TOPLAM (15 bölüm)** | | **19.929** | |

### 2.2 Organik Genişleme Kalitesi

**Yazar talebine göre uygulanan unsurlar:**

| Unsur | Örnek (hangi bölüm) |
|-------|----------------------|
| **Duygusal nefes** | Bölüm 11 — Reha yatakta uyanış, "Bedeni başkasının bedeniydi"; tek başına salonun aile dolabını taraması |
| **Araştırma dokusu** | Bölüm 14 — Defter-Hâne'nin kül kokusu, üç deftere tek tek bakma, "İptal" sütununun keşfi |
| **Çevresel varlık** | Bölüm 13 — Kerâli yolu (at arabası, köprü, tarla, eve varış); Cilâl'in salonunun pendülü |
| **İlişki baskısı** | Bölüm 15 — İlhan-Reha çocukluk arkadaşı + asker dinamiği; "Babanın değilim, devletin değilim, tam değilim" |
| **Yaşanmış geçişler** | Bölüm 12 — Lemi-Reha ilişkisinin gelişimi (su uzatma, sandık üstüne oturma, kapıdan çıkmadan önce çizimi göstermek) |

**Akt I vs. Akt II kelime ortalaması:**

| Akt | Ortalama bölüm | İçerik tipi |
|-----|----------------|-------------|
| Akt I (10 bölüm) | 1.181 kelime | Sıkı, hızlı, eşik kurma |
| Akt II (5 bölüm şimdiye) | 1.624 kelime | Genişlemiş, soluk alan, araştırma |

**+38% genişleme** — yazar hedefine uygun: ne kuru ne şişme. Her bölümde eklenen materyal hikâye servisi yapar.

### 2.3 Genişleme Disiplin Kontrolü

Her bölümde **eklenen materyalin** Story Bible'a hizmet ettiği doğrulandı:

| Bölüm | Eklenen | Bibel İşlevi |
|-------|---------|---------------|
| XI | Yatak odasında uyanış, fotoğraf araması, üç yaş Reha'nın yalnız fotoğrafı | "Visual trace" + "methodical character shift" |
| XII | 1908 düğün anısı detayı (mektup, koca eli), Lemi'nin Mâriye anısı | "Wider tradition" + "humility before practice" |
| XIII | At arabası yolculuğu, Cilâl'in kitabı (sealed), Lemi adının karşılıklı söylenmesi | "Direction" + "gatekeeping ally" |
| XIV | Yangının kokusu, Behçet Amca'nın felsefi cümlesi, "komisyon kararı no…" sütunu | "Documentary turn" + "father's role confirmed" |
| XV | Salonun ortamı, İlhan'ın açık konuşması ("babanın değilim"), Reha'nın hide-and-stash koreografisi | "External pressure renewed" + "Reha confirms commitment to conceal" |

**Filler kontrol:** Hiçbir bölümde "atmosphere for atmosphere's sake" yok. Her atmosferik detay (kül kokusu, pendül sesi, at arabası) bir karakter durumunu ya da bir gizem ipucunu taşır.

---

## 3. KANON DOĞRULAMASI

### 3.1 Story Bible Bölüm-Bölüm Uyum

**Bölüm XI vs. Story Bible Bölüm 11:**

| Bibel Maddesi | Manuscript'te |
|---------------|---------------|
| Sistematik arama | ✓ Dolap, çekmeceler, üç oda |
| No photos of second child | ✓ Tüm albüm ve fotoğraf kutusu tarandı; 4 yaşında Reha'nın yalnız fotoğrafı |
| No birth records | ✓ Babanın evindeki defterde 3 Eylül yarım koparılmış (Ch 4'ten kalan plant) |
| Child drawing with two figures | ✓ Bölüm sonunda bulunur; "ben" yazılı, diğeri isimsiz |
| Methodical character shift | ✓ "Sistematik" kelimesini Reha kendi içinde kullanır — kütüphane disiplininin uygulanması |

**Bölüm XII vs. Bölüm 12:**

| Bibel Maddesi | Manuscript'te |
|---------------|---------------|
| Rules of reading | ✓ 3 kural net olarak: aynı tane tekrarlanmaz, izin gerektirir, çocuk tanesi okunmaz |
| Tastes 1908 widow's grain | ✓ Düğün anısı, koca eli, mektubun yarım kalmış olması |
| Lemi explains limits | ✓ "Tat hafızanın tam değildir — bir parça" |
| Transition to Cilâl | ✓ "Teyzene git" — Lemi açıkça yönlendirir |

**Bölüm XIII vs. Bölüm 13:**

| Bibel Maddesi | Manuscript'te |
|---------------|---------------|
| Horse-cart to Kerâli | ✓ İki saatlik yolculuk |
| Cilâl evades | ✓ "Bilmediğin şeyleri arama, Reha" |
| Drawing shown | ✓ Cilâl çizimi geri iter |
| "Babanın işine bakman lazım. Defter-Hâne'ye git." | ✓ Birebir |
| "Annen — annen ne bildiğini bilemedi hiç. Bu, suçu değildir." | ✓ Birebir |
| Genişletme (kanon dışı): Cilâl bir kitap verir + "Lemi'yi bul" | Plant: Bölüm 22 reveal'inde Mâriye'nin Tuzcu olduğu açılır; bu kitap o anın anchor'ıdır. Yarımca açılış olarak hizmet eder. |

**Bölüm XIV vs. Bölüm 14:**

| Bibel Maddesi | Manuscript'te |
|---------------|---------------|
| Defter-Hâne partially burnt | ✓ "Yarısı yanık duvarlar, çatısı gitmiş" |
| Behçet Amca caretaker | ✓ Yatakta, küçük arka oda |
| Salvaged ledgers | ✓ Üç defter — 1898-1904, 1905-1911, 1912-1918 |
| "İptal" entries, hundreds | ✓ Onlarca, yüzlerce; sütun olarak |
| Father's "kabul" signature | ✓ "Babasının imzası... onlarcasını" |
| 1905-1907 folio missing | ✓ "24-25-26-27 atlamış"; "kayboldu önce" |
| Behçet's parting line | ✓ "Sevdiklerimiz bize hep iki tane gözükür" — birebir |

**Bölüm XV vs. Bölüm 15:**

| Bibel Maddesi | Manuscript'te |
|---------------|---------------|
| İlhan visits house | ✓ Salon, koltuk |
| Asks about old materials | ✓ "Babanın işyerindeki kayıtlar, evindeki eski belgeler" |
| Reha lies smoothly | ✓ "Sadece eski defterler. Çoğu boş. Yağmurda ıslanmış." — yine |
| "Reha, bu kasabadaki en eski aileden..." | ✓ Birebir |
| Leaves card | ✓ Resmi kart, masada bırakılır |
| Reha sits with grain | ✓ İkinci tane masada (ama bu sefer Reha kartı bulduktan sonra) |

### 3.2 Yasaklı Hamleler — Akt II (Bölüm 11-15)

Story Bible 1.6 yasaklı hamle kontrolü:

| Yasak | Akt II'de görüldü mü? |
|-------|------------------------|
| Tuz mekaniğinin ders gibi açıklanması | Hayır. Lemi'nin kuralları kuru, açıklama değil pratik anlatımı |
| Karakterin "ne hissettiğini" söylemek | Hayır. Reha'nın iç durumu beden ve eylem üzerinden gösterilir |
| Geri-dönüş içinde geri-dönüş | Hayır. 1908 düğün anısı tat içinde, yarı şimdiki zaman fragmentleri |
| Politik konuşma | Hayır. İlhan ve Behçet Amca'nın felsefi cümleleri politiğin değil bireyin tarafında |
| Travma açıklayan psikolojik diyalog | Hayır. Behçet Amca'nın "iyi yarısını ve diğerini" cümlesi felsefidir, psikolojik analiz değil |
| Sürpriz kötü adam reveal | Hayır |
| Yas dökme sahnesi | Hayır |
| Anne-kız uzlaşma melodramı | Hayır. Bölüm 11'de Mâra'nın "Hatırlamıyorum" cevabı çözümsüz kalır |
| Açıklayıcı epilog | Roman bitmedi |
| Sembolün kelimeyle vurgulanması | Hayır. "Hatıra" kelimesi açık vurgulanmadı |

### 3.3 Erken Sızıntı Kontrolü

**"Defne Mâriye" adı:** Hâlâ söylenmedi. Story Bible Bölüm 22 reveal'i için saklı.

**Defne'nin ölüm sebebi (tifo):** Söylenmedi. Story Bible Bölüm 25'te folio ile birlikte açıklanacak.

**Annenin annesi Tuzcu'ydu:** **Lemi tarafından Bölüm 12'de söylendi** ("Annenin annesi bir Tuzcu'ydu"). Bu, Story Bible Bölüm 9-10 atmosferine uygun bir plant. Bölüm 22'deki Cilâl reveal'i daha derin (Mâriye'nin öyküsünün politik bağlamı, 1885'te öldürüldüğü) hâlâ saklı.

**Mâriye'nin kitabı (Cilâl'in verdiği):** Genişletme. Reha henüz açmadı. Sealed artifact. Bölüm 22 reveal'inde "Mâriye Tuzcu'ydu" ile sözleşilir. Plant olarak ödeyecek.

---

## 4. PACING GÖZLEMLERİ

### 4.1 Akt I → Akt II Tempo Geçişi

Akt I (Bölüm 1-10): yoğun, eşik kurma, hızlı plant edici. Kısa cümleler, az duraklama. Bölüm 10'da tat anı için stilistik patlama.

Akt II (Bölüm 11-15): tempo açılıyor, soluk alıyor. Reha artık bilen biri — gizemi inşa ediyor değil, izini takip ediyor. Bölümler arası tarih akışı da yavaşladı: Bölüm 11 (sabah) → 12 (öğleden sonra) → 13 (sabah-akşam, bir gün) → 14 (sabah-akşam) → 15 (gün, akşam). Birkaç gün boyunca yayılmış araştırma.

### 4.2 Duygusal Eğri

| Bölüm | Duygu yoğunluğu (10 üzerinden) | Not |
|-------|-------------------------------|-----|
| XI | 6 | Yumuşak başlangıç, eksiklik kanıtı |
| XII | 5 | Mentor sahnesi, dingin pratik |
| XIII | 7 | Cilâl'in kapısı kısmen açılır; aile sessizliği ortaya çıkar |
| XIV | 8 | Babanın imzaları; "iyi yarısını ve diğerini" |
| XV | 7 | İlhan'ın baskısı; Reha'nın yalan disiplini |

Story Bible §11.1'in beklenen eğrisi: Akt II ortası 5-6, yükselen 7-8'lere doğru. Şu an doğru yörüngede.

### 4.3 Cebindeki İkinci Tane

Bölüm 10'dan beri Reha'nın cebinde ikinci tane var, tatlanmamış. Bu plant Bölüm 21'de patlayacak (kanon: ikinci tat — babanın son tuzu, "Mâriye" kelimesi). Akt II boyunca tane Reha'nın bedeninde bir ağırlık olarak görünmeye devam ediyor — Bölüm 13'te dönüş yolunda hâlâ cebinde, Bölüm 15'te masaya çıkarılıp tekrar konuyor.

### 4.4 Çatışma Yapısı

**Yarı-statik çatışmalar (Akt II boyunca sürer):**
- Reha vs. Devletin baskısı (İlhan aracılığıyla) — Bölüm 6 + 15'te yoğunlaştı
- Reha vs. Babasının suçluluğu (defter aracılığıyla) — Bölüm 14'te zirveye yaklaştı
- Reha vs. Annenin sessizliği — Bölüm 11'de minimal direkt, Bölüm 20'de patlama bekleniyor

**Henüz aktive olmamış:**
- Hâlit Bey ile karşılaşma (Bölüm 18 kanon)
- Cilâl'in kitabı (Bölüm 22 reveal anchor'ı)
- Mâra'nın belleğindeki tortular (Bölüm 20-23 zirvesi)

---

## 5. ÜRETİM RİSKLERİ — KALAN

### 5.1 Yüksek Öncelikli

1. **Bölüm 16-21 (Akt II ortası) tempo dengesi.** Nahide, Yörük, Hâlit Bey, Mâra'nın günü, ikinci tat — 6 farklı duygusal yoğunlukta sahne. Her birinin doğru ağırlığa ulaşması gerek. Bölüm 18 (Hâlit Bey itirafı) en yüksek risk: sarhoş bir adamın diyaloğu didaktiğe dönmeden, melodrama düşmeden yazılmalı.

2. **Bölüm 22 (İki Mâriye reveal'i) tonal kalibrasyon.** Cilâl'in açılışı çok detaylı olursa bilgi dumping, çok kısa olursa duygusal güç kaybı. Çok hassas. Plant'lar (Cilâl'in kitabı + Defne'nin tortu hissi) doğru zamanda toplanmalı.

3. **Lazy pagination edge case'leri.** Henüz test edilmeyen senaryolar:
   - Tabletten masaüstüne taşıma (resize → rebuild + sync catch-up zinciri)
   - Yazı boyutu değiştirme (rebuild) sırasında lazy yarıda
   - Tarayıcı sekmesinin uyku moduna girmesi → tekrar açılma

### 5.2 Orta Öncelikli

4. **Mâra'nın belleği "doğru" yarılma sıklığı.** Akt II'de Mâra'nın bilinç yarılmaları daha az — bu doğru (Mâra'nın iyi günleri var). Ama Bölüm 20'de yoğunlaşacak. Sahneyi dengelemek önemli.

5. **Reha'nın "kütüphaneci kimliği" kayboldu mu?** Reha artık Vâliçe'ye yerleşmiş gibi — Başkent'teki kütüphane görevinden hiç bahsedilmiyor. Bilinçli bir karar mı, bir ihmal mi? Karar: bilinçli — Reha Başkent'i bilinçli olarak ertelemiş. Ama bir bölümde (belki 25 veya 27) Reha'nın görevden uzaktayken iş kaybetmesi riski bir an düşünülmeli (bir telgraf? bir mektup? — duruma karar verilecek).

6. **Eve dönüş ritimleri tekrarlı oluyor.** Her bölüm "Reha eve döner, üst kata çıkar, defter açar" sahnesiyle bitiyor. Bilinçli bir motif (gün sonu kapanışı), ama tekrar riskli olabilir. Akt II'nin ortasında bunu kırmak için bir-iki bölüm farklı kapanışla bitebilir.

### 5.3 Düşük Öncelikli

7. **TOC drawer'da bölüm numaralandırması ile sayfa folio'su arasındaki bağ.** Lazy faz sırasında bölüm "—" (folio belirsiz) gösteriyor. Kullanıcı bunu "yüklenmedi" olarak yorumlayabilir. Bir "Yükleniyor…" indicator eklenebilir ama belki şu an'lık görsel boş olması yeterli.

8. **Klavye kısayolu hâlâ "K" iz koyma; bu Türkçe'de "Kal" gibi okunabiliyor.** Yeniden değerlendirmeye değer; ama mevcut çoğu kullanıcı için doğal hissediyor.

---

## 6. SONRAKİ ADIMLAR

Önceliklendirilmiş — sonraki seans:

1. **Bölüm 16-20** (Akt II ortası) yaz
   - Nahide tanıtımı (16)
   - Yörük + tuz ticareti (17)
   - Hâlit Bey itirafı (18)
   - "İptal" anlaşılması (19)
   - Mâra'nın yarılma günü (20)

2. **Lazy pagination test** — gerçek kullanıcıdan geri bildirim:
   - Mobil + tablet
   - Tarayıcı sekmesi uyku/uyanma
   - Yazı boyutu/tema değişimi sırasında

3. **Cilâl'in kitabı** Reha tarafından *henüz açılmamalı* — Bölüm 22'ye kadar.

---

## 7. TESLİM EDİLEN DOSYALAR (DEĞİŞİKLİKLER)

```
/home/emre/Downloads/tuzun-hafizasi/
├── ACT2-PROGRESS-REPORT-TR.md              ← YENİ (bu dosya)
├── STORY-BIBLE-TR.md                        (değişmedi)
├── TUZUN-HAFIZASI-WRITING-REPORT-TR.md      (sürüm 0.1 raporu)
├── PERFORMANCE-HOTFIX-REPORT-TR.md          (sürüm 0.2 raporu)
├── README.md                                (değişmedi)
├── index.html                                ← DEĞİŞTİ (5 yeni script tag)
├── content/
│   ├── novel-data.js                         (değişmedi)
│   ├── chapter-01..10.js                     (değişmedi)
│   ├── chapter-11.js                         ← YENİ (Geri Dönmeyenler)
│   ├── chapter-12.js                         ← YENİ (Dilin Eğitimi)
│   ├── chapter-13.js                         ← YENİ (Cilâl)
│   ├── chapter-14.js                         ← YENİ (Defter-Hâne)
│   ├── chapter-15.js                         ← YENİ (Uyarı)
│   └── finalize.js                           (değişmedi)
├── scripts/
│   ├── storage.js                            ← DEĞİŞTİ (lastChapter anchor)
│   ├── book.js                               ← YENİDEN YAZILDI (lazy pagination)
│   └── app.js                                ← DEĞİŞTİ (lazy callbacks + chapter restore)
├── styles/                                   (değişmedi)
└── assets/                                   (değişmedi)
```

## 8. DOĞRULAMA

- **JS sözdizimi:** 18 / 18 dosya `node --check` temiz
- **HTTP yükleme:** Sunucudan 9 yeni/değişen kaynak HTTP 200
- **Kanon kontrolü:** Story Bible Bölüm 11-15 tabloları manuscript ile birebir karşılaştırıldı; tek genişletme (Cilâl'in kitabı + Lemi-recognition) plant olarak işlevsel
- **Sızıntı tarama:** "Defne Mâriye" adı / tifo / 1885 raid — hepsi saklı; Bölüm 22 için hazır
- **Lazy pagination:** Eager 3 bölüm + back matter yapısı kuruldu; lazy faz arka plan idle build; sync catch-up TOC sıçramalarında
- **Word count:** 19.929 toplam; 60-70k hedefi için %30; sonraki 21 bölümde 40-50k beklemek doğru projection

## 9. KARAR İÇİN GEREKEN SORULAR

Sonraki seans öncesi yazardan onay:

1. **Cilâl'in verdiği kitap** Reha tarafından **ne zaman açılmalı?** Kanon Bölüm 22'de Cilâl reveal'i veriyor; ama Reha kitabı erken açabilir (örneğin Bölüm 18 sonrasında, Hâlit Bey'le konuştuktan sonra) ve içeriğin bir kısmıyla Bölüm 22'ye gitmek daha güçlü olabilir. Açılış zamanlamasını şimdi karar vermek istemez misin?

2. **Reha'nın Başkent kütüphanesi.** Bir bölümde (belki 20 civarı) bir mektup veya telgraf gelse — "geri dönmen lazım" diye — Reha'nın bu kasabada kalmasının ekonomik bedeli somutlaşır. İstenir mi yoksa Reha'nın kasabaya yerleşmesi sessizce kabul edilsin mi?

3. **Mâra'nın "iyi günleri" oranı.** Şu an Akt II'de Mâra'nın çoğu günü iyi geçiyor (Bölüm 15'te bahçeye çıkıyor). Bölüm 20'de yarılma yoğunlaşacak — bu yoğunlaşma için "kötü günlerin" sıklığını Akt II ortasında nasıl artıralım? Bir-iki yarı-kötü gün eklenmesi ile mi (geçiş), yoksa Bölüm 20'de doğrudan patlamayla mı?

---

*Bu rapor Story Bible'a karşı denetlenmiş, lazy pagination uygulanmış, organik genişleme disiplinli olarak yapılmış sürümün belgesidir. Bir sonraki seans Akt II ortasını (Bölüm 16-20) aynı eşik üzerinden inşa edecektir.*
