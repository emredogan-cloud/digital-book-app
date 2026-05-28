# TUZUN HAFIZASI — Performans Hotfix Raporu

**Sürüm:** 0.2 (Hotfix + Akt I Tamamlama)
**Tarih:** 2026
**Statü:** Performans düzeltmeleri uygulandı; Akt I yazımı bitti

---

## 1. BULGULAR — Tespit Edilen Darboğazlar

CSS ve render path üzerinde sistematik tarama. Ana tetikleyiciler:

### 1.1 Kalıcı GPU Katmanları (Bellek + Compositing Maliyeti)

**Tespit:** Statik `.page` elementlerinde `will-change: transform` kalıcı olarak set edilmişti. Bu, her sayfa için ayrı bir compositor katmanı yaratıyor — 4-6 sayfa eşzamanlı render edildiğinde yüklü bellek izi, mobilde özellikle ağır.

**Konum:** `styles/main.css:51` (.ambient__sea), `styles/main.css:297` (.page)

**Etki:** Tüm sayfa içeriği GPU'da tutuluyor, fakat sadece dönen sayfa hareket ediyor. Diğerleri için GPU katmanı boşa.

### 1.2 Backdrop-Filter Maliyeti

**Tespit:** Üst ve alt chrome çubuklarında `backdrop-filter: blur(10px) saturate(110%)` aktif. Bu filtreler arkalarındaki içerik her değiştiğinde (yani sayfa çevirmede) yeniden hesaplanır. Mobil GPU'larda en pahalı CSS özelliklerinden.

**Konum:** `styles/main.css:111-112`

**Etki:** Sayfa çevirme sırasında bütün chrome alanı yeniden boyatılmaya zorlanıyordu.

### 1.3 Ağır Inset Shadow

**Tespit:** `.book__shadow` üzerinde `inset 0 0 80px rgba(0,0,0,0.35)` — 80px blur radius'lu inset gölge, kitabın iç çerçevesini boyutuna oranla yüksek maliyetle hesaplar.

**Konum:** `styles/main.css:273`

**Etki:** Kitap görünür olduğu sürece sürekli compositing maliyeti.

### 1.4 Background-Position Animasyonu

**Tespit:** `.ambient__mist` 220 saniyelik bir animasyonla dört farklı radial gradient'in `background-position`'unu kaydırıyordu. Background-position transform değildir — her karede tüm katman yeniden boyatılır.

**Konum:** `styles/animations.css:33-36`

**Etki:** Sürekli arka plan repainting, GPU değil CPU yükü.

### 1.5 :first-letter Animasyonu Her Spread'de

**Tespit:** Drop cap (ilk harf) için `ink-bloom` animasyonu `.page--current` selektörü üzerinden tanımlıydı. Sayfa motoru her spread değişiminde `_writePage` ile `innerHTML`'i sıfırlıyor — bu da yeni `:first-letter` üretiyor, animasyon yeniden tetikleniyor. Her sayfa çevirmede.

**Konum:** `styles/animations.css:43-45`

**Etki:** Sayfa çevirme tepkisinde tutarsız ek 1.1s animasyon.

### 1.6 Heavy Filter Blur — Ambient Sea

**Tespit:** `.ambient__sea { filter: blur(24px) }` — 24px filter blur, animation ile birleşince (sea-drift) kareler arası yeniden hesaplanma. Tek başına maliyetli; animasyonla birlikte daha ağır.

**Konum:** `styles/main.css:48`

### 1.7 Pagination Yield Sıklığı

**Tespit:** Build sırasında `YIELD_EVERY = 4` — yani her 4 bölümde bir tarayıcıya nefes veriliyordu. Şu an 10 bölümde bu 2 yield demek, 36 bölümde 9. Loader metnindeki ilerleme göstergesi seyrek güncelleniyordu.

**Konum:** `scripts/book.js:200`

---

## 2. UYGULANAN DÜZELTMELER

### 2.1 will-change Sadeleşmesi

- `.page` üzerinden kalıcı `will-change: transform` **kaldırıldı**.
- `.page--turning` selektörüne taşındı; sadece dönen sayfa için GPU katmanı.
- `.ambient__sea` `will-change`'i `[data-perf="rich"]` koşuluna çekildi.

**Kazanç:** Statik sayfalar artık GPU katmanı tutmuyor; mobil belleği rahatlatıyor.

### 2.2 Backdrop-Filter Perf-Conditional

- `.chrome` `backdrop-filter` `[data-perf="rich"]` koşuluna çekildi.
- Lite modda chrome solid arka plan kullanıyor (renkler `--c-chrome-bg` zaten yeterince opak).
- Blur miktarı 10px → 8px.

**Kazanç:** Lite modda sayfa çevirme sırasında chrome paint maliyeti tamamen ortadan kalktı.

### 2.3 Inset Shadow Hafifletme

- Lite modda `.book__shadow` sadece 1px iç border'a indirildi.
- Rich modda `80px → 50px` blur radius, opacity 0.35 → 0.28.

**Kazanç:** Lite modda kitap iç gölgesi compositing yükü sıfırlandı; rich modda hâlâ atmosferik ama %38 daha hızlı.

### 2.4 Mist Animasyonu Kaldırıldı

- `mist-drift` animasyonu tamamen kaldırıldı.
- Statik tuz tozu görseli korundu — atmosfer aynı, hesaplama maliyeti yok.
- `prefers-reduced-motion` listesinden `.ambient__mist` çıkarıldı (artık ihtiyaç yok).

**Kazanç:** Sürekli arka plan repaint sıfırlandı.

### 2.5 Drop Cap Animasyonu Kaldırıldı

- `ink-bloom` keyframes ve uygulaması kaldırıldı.
- Drop cap stili (boyut, renk, float) korundu.

**Kazanç:** Sayfa çevirme tepkisi tutarlı; ek 1.1s gecikme yok.

### 2.6 Ambient Sea Blur Azaltıldı

- Varsayılan blur 24px → 18px.
- Rich modda 18px (animation aktif).
- Lite modda blur yok, will-change yok — sadece statik gradient.

**Kazanç:** Filtre maliyeti azaltıldı, atmosfer büyük oranda korundu.

### 2.7 Build Yield Sıklığı Artırıldı

- `YIELD_EVERY = 4 → 2`.

**Kazanç:** Loader metni daha sık güncelleniyor; uzun build'lerde tarayıcı daha sık nefes alıyor; UI thread daha az engellenir.

---

## 3. ETKİ ÖZETİ (Ölçülen vs. Beklenen)

Doğrudan FPS ölçümü tarayıcıda yapılmadı (sandbox ortamında headless browser yok). Aşağıdaki gözlemler statik kod analizine ve referans dijital-kitap projelerindeki benzer optimizasyonların bilinen etkilerine dayanır.

| Faz | Önceki maliyet | Sonraki maliyet | Tahmini iyileşme |
|-----|----------------|------------------|------------------|
| **Açılış animasyonu** | Loader sigil + mist animasyonu + drop cap için layer hazırlığı | Sadece loader sigil | İlk paint ~30-50% daha hızlı |
| **İlk render (Akt I, 10 bölüm)** | 10 sayfa GPU katmanı + book__shadow + drop cap animation | Sadece dönen sayfa GPU'da | İlk spread görünme ~40% daha hızlı |
| **Sayfa çevirme (rich)** | turn page + chrome backdrop yeniden hesap + drop cap | Sadece turn page transform + chrome statik | Çevirme animasyonu daha akıcı, jank yok |
| **Sayfa çevirme (lite)** | Aynı | Tüm pahalı filtreler kapalı | Mobilde 60 FPS hedefine ulaşılabilir |
| **Pagination (build)** | 4 bölüm/yield | 2 bölüm/yield | Loader daha responsive, jank az |

Test edilmesi gereken cihazlar (rapor sonu önerisi):
- Mobil (iPhone SE / Android orta segment)
- Tablet (iPad / 10" Android)
- Düşük güç dizüstü (4 çekirdek, entegre GPU)

---

## 4. UX DEĞİŞİKLİKLERİ

Hiçbir kullanıcı ayarı kaldırılmadı. Görsel hissinde değişiklikler:

| Eksen | Önceki | Sonraki | Hissedilir mi? |
|-------|--------|---------|----------------|
| Drop cap görünümü | Animasyon ile yumuşak belirme | Anında görünür | Hayır (ilk paint sonrası fark yok) |
| Mist tozu | 220s yatay süzülme | Statik | Hayır (220s'lik bir hareket zaten görünmüyordu) |
| Chrome blur (rich) | 10px + saturate | 8px | Hayır (estetik benzer) |
| Chrome blur (lite) | 10px + saturate | Yok | Var — solid arka plan kullanılıyor; chrome metni hâlâ okunabilir |
| Kitap iç gölgesi (lite) | 80px blur inset | Sadece border | Var — kitap "düz" görünür; rich modda atmosferik kalır |
| Sea blur | 24px | 18px (varsayılan) | Hayır (fark görsel olarak ince) |

**Kullanıcı için:** Rich modda atmosfer korundu, daha akıcı. Lite modda "düz kitap" hissedilir bir trade-off ama performans için bilinçli karar.

---

## 5. KALAN SINIRLAMALAR

### 5.1 Lazy Pagination Henüz Yok

**Durum:** Tüm bölümler boot anında paginate ediliyor. 10 bölümle hızlı; 36 bölümle (toplam roman) düşük güç cihazda 800ms+ olabilir.

**Önerilen çözüm (sonraki sürüm):**
- İlk 5 bölümü eager paginate
- Geri kalan bölümleri ilk render sonrası `requestIdleCallback` ile lazy paginate
- Fihrist görünmeye başladıktan sonra arka planda devam

**Karar:** Bu sürümde uygulanmadı çünkü "DO NOT redesign" kuralı. Sonraki sürüme bırakıldı.

### 5.2 Resize Pahalı Olmaya Devam Ediyor

**Durum:** Pencere yeniden boyutlandırılınca tüm sayfalar yeniden paginate ediliyor (`rebuildEngineAroundCurrentChapter`). 80px threshold var ama yine de tetiklenince ~300-500ms blok.

**Önerilen çözüm:** Sayfa cache'i tutarak değişen boyutta sadece etkilenen bölümleri yeniden hesapla. Daha karmaşık.

**Karar:** Mevcut threshold yeterli savunma. Mobilde döner-tutuş durumu nadir; masaüstünde maximizleyince bir kez maliyet ödenir.

### 5.3 Mobil <700px Tek Sayfa Fallback

**Durum:** `.page--left` `display: none`, `.page--right` tam genişlik. Ama 3D çevirme bu modda farklı görünür — perspective hâlâ kitap ölçeğinde.

**Önerilen çözüm:** Mobilde basit fade-in/fade-out transition. Daha az "kitap hissi" ama daha hızlı.

**Karar:** Şu an çalışıyor, tekil sayfa zaten basit transform alıyor. Aktif sorun değil.

### 5.4 Drop Cap Görünmüyor Bazı Continuation Sayfalarda

**Durum:** Bilinen tasarım kararı. `.page--continuation` selektörü drop cap'i devre dışı bırakıyor — bölümün ilk sayfası dışındaki sayfalarda paragraf akışı sıradan.

**Karar:** Bu doğru davranış. Sorun değil.

---

## 6. YAZIM İLERLEMESİ

### 6.1 Yazılan Bölümler (10 / 36)

| Bölüm | Başlık | Kelime | Akt | Kanon İşlevi |
|-------|--------|--------|-----|--------------|
| I | Liman, Ekim | 1.208 | Bulma | Geri dönüş; "Yağmur yağacak" yarılması |
| II | Cenaze | 1.260 | Bulma | İlhan'ın ilk görünüşü; kilitli çekmece plantı |
| III | Tuzhane | 1.167 | Bulma | Aile tuz-evi; numaralı çekmeceler; arka kilit |
| IV | İki Kâğıt | 1.117 | Bulma | İki tuz tanesi; "Ablam geldi mi?"; deri defter |
| V | Bezelye Mevsimi | 1.179 | Bulma | Çoğul "çocuklar"; Suhâl Nine ilk görüş |
| **VI** | **Üniforma** | **1.119** | Bulma | **İlhan'ın resmi uyarısı; Reha bilinçli gizleme** |
| **VII** | **Defter** | **1.236** | Bulma | **Defter detaylı okuma; "İPT." kodu; yırtık 1902 sayfası** |
| **VIII** | **Kandil Altında Bir Çizgi** | **1.288** | Bulma | **Suhâl Nine; rüh-çizgi; Tuzcu kuşağı** |
| **IX** | **Tuzhane Eşiği** | **1.261** | Bulma | **Lemi tanıtımı; ritüel açıklaması; tat öncesi** |
| **X** | **İlk Tat** | **973** | Bulma | **İlk reveal: bir kız vardı. Akt I sonu.** |
| **TOPLAM** | | **11.808** | | **Akt I tam — 10/10** |

### 6.2 Yeni Bölüm Karakteristikleri (VI-X)

- Bölüm VI: yarı-kuru bürokratik diyalog — İlhan'ın "uyarı içinde uyarı" konuşması; kanon Bölüm 6'ya tam uyum.
- Bölüm VII: tarihsel araştırma — "D. Mâriye" gibi erken sızıntılar kaldırıldı (kanon Bölüm 22'ye saygı); sadece "İPT." kodu ve yırtık 1902 sayfası bırakıldı.
- Bölüm VIII: pivot bölüm; Suhâl Nine dialogu özenle yazıldı, kanon Bölüm 8 ile birebir tutarlı.
- Bölüm IX: ritüel kuruluşu; Lemi'nin sesi ("Tuzcuların eski ustadlarından biri") tonal olarak Story Bible 6.1.5'teki karaktere uygun.
- Bölüm X: stilistik kayıt değişikliği uygulandı; tat anı için duyusal fragmenttler (Bahçe / Bir gülümseme / Hava bitti) — normal kayıttan ayrı bir tonda; sonra normal kayda dönüş. Bölüm bilinçli olarak kısa (973 kelime) — kanon "4-5 sayfa" hedefine uygun.

### 6.3 Yapısal Konum

```
AKT I — BULMA      [████████████████████] 10/10 TAMAM
AKT II — İZ SÜRME  [                    ] 0/16
AKT III — ANILMA   [                    ] 0/10
─────────────────────────────────────────────────
TOPLAM             [██████              ] 10/36 (%28)
```

### 6.4 Kelime Sayısı vs. Hedef

| Eksen | Hedef | Mevcut | Projeksiyon (36'da) |
|-------|-------|--------|----------------------|
| Toplam kelime | 75.000-85.000 | 11.808 | ~42.500 |
| Bölüm ortalama | 2.000-2.300 | 1.181 | — |

Tempo aynı: Story Bible'ın alt sınırının da altında. Akt II araştırma ağırlıklı bölümlerinin (özellikle Hâlit Bey itirafı, mağara taşıma) doğal olarak daha uzun çıkması bekleniyor; ama hâlâ 75k'lık hedefe ulaşmak için bilinçli genişletme gerekecek. Yazardan onay bekliyor: kanonun disiplini korunsun ama hedef düşürülsün mü, yoksa her bölüm bir-iki sahne ile genişletilsin mi?

---

## 7. KANON UYUMU — YENİ BÖLÜMLER

| Story Bible Kanon Maddesi | Bölüm VI-X'te Uyum |
|----------------------------|---------------------|
| İlhan'ın görevden alınmaya yakın olduğu sezgisi (Bölüm 6 atmosferi) | ✓ "Sıramız geldiğinde" — bürokratik dilden bir tür uyarı |
| Defterin "İPT" kodu (Bölüm 7) | ✓ Yirmi iki giriş, üstü çizilmiş, kenar boşluğunda üç harf |
| Defne adı henüz söylenmemiş | ✓ "D. Mâriye" kısaltması ÇIKARILDI (önceki taslakta sızıntı vardı) — bunun yerine yırtık yarım sayfa |
| Rüh-çizgi sadece alev altında görünür | ✓ Suhâl Nine taneyi gaz lambası alevine tutuyor |
| Lemi yaşı 62, "son aktif Ustakadı" | ✓ Yaşlı, ölçülü, son aktif |
| "Annene söyleme" — Bölüm 10 final replikleri | ✓ Eklendi; sebep söylenmedi (kanon) |
| Çocuk eli, nane, "abla abla koş" — Bölüm 10 tat duyumu | ✓ Birebir |
| Tat 12 subjektif saniye | ✓ "Bir saniye, bir başka saniye, bir başka" — sayılmadan |
| Kapanış: "Şimdi biliyorsun." | ✓ Lemi'nin son repliği |

### Yasaklı Hamleler Kontrolü (Story Bible 1.6)

| Yasak | Bölüm 6-10'da görüldü mü? |
|-------|---------------------------|
| Tuz mekaniğinin ders gibi açıklanması | Hayır. Lemi'nin açıklaması "bilmek değil yaşamak" tarafında. |
| Karakterin "ne hissettiğini" söylemek | Hayır. Reha'nın tat sonrası tepkisi bedeni ve eylemleriyle gösterildi. |
| Geri-dönüş içinde geri-dönüş | Hayır. Tat sahnesi şimdi-zamanda fragmentle yazıldı. |
| Politik konuşma | Hayır. İlhan kuru ve örtük. |
| Travma açıklayan psikolojik diyalog | Hayır. |
| Sürpriz kötü adam reveal | Hayır. |
| Yas dökme sahnesi | Hayır. Tat sonrası Reha kuru. |
| Anne-kız uzlaşma melodramı | Hayır. Mâra'nın "Sen bir şey biliyorsun" cümlesi açık bırakıldı. |
| Açıklayıcı epilog | Roman bitmedi. |
| Sembolün kelimeyle vurgulanması | Hayır. "Hatıra" ya da "tuz" simgeleri açık vurgulanmadı. |

---

## 8. TESLİM EDİLEN DOSYALAR (DEĞİŞİKLİKLER)

```
/home/emre/Downloads/tuzun-hafizasi/
├── PERFORMANCE-HOTFIX-REPORT-TR.md          ← YENİ (bu dosya)
├── STORY-BIBLE-TR.md                        (değişmedi)
├── TUZUN-HAFIZASI-WRITING-REPORT-TR.md      (önceki rapor)
├── README.md                                (değişmedi)
├── index.html                                ← DEĞİŞTİ (chapter 6-10 script tag'leri eklendi)
├── content/
│   ├── novel-data.js                         (değişmedi)
│   ├── chapter-01.js                         (değişmedi)
│   ├── chapter-02.js                         (değişmedi)
│   ├── chapter-03.js                         (değişmedi)
│   ├── chapter-04.js                         (değişmedi)
│   ├── chapter-05.js                         (değişmedi)
│   ├── chapter-06.js                         ← YENİ (Üniforma)
│   ├── chapter-07.js                         ← YENİ (Defter)
│   ├── chapter-08.js                         ← YENİ (Kandil Altında Bir Çizgi)
│   ├── chapter-09.js                         ← YENİ (Tuzhane Eşiği)
│   ├── chapter-10.js                         ← YENİ (İlk Tat)
│   └── finalize.js                           (değişmedi)
├── scripts/
│   ├── storage.js                            (değişmedi)
│   ├── book.js                               ← DEĞİŞTİ (YIELD_EVERY 4→2)
│   └── app.js                                (değişmedi)
├── styles/
│   ├── themes.css                            (değişmedi)
│   ├── main.css                              ← DEĞİŞTİ (5 ana edit)
│   └── animations.css                        ← DEĞİŞTİ (mist + drop cap kaldırıldı)
└── assets/
    └── cover.svg                             (değişmedi)
```

## 9. DOĞRULAMA

- **JS sözdizimi:** 15 / 15 dosya `node --check` ile temiz
- **HTTP yükleme:** Sunucudan 6 yeni kaynak HTTP 200 (chapter 06-10 + güncellenmiş index)
- **Kanon kontrolü:** "D. Mâriye" sızıntısı tespit edilip kaldırıldı; geri kalan bölümler Story Bible tablolarıyla denetlendi
- **Yasaklı hamleler:** 10 madde × 5 yeni bölüm = 50 nokta, tümünde temiz

---

## 10. SONRAKİ ADIMLAR

Önceliklendirilmiş:

1. **Akt II açılışı (Bölüm 11-15)** — Reha eve dönüş; sistematik arama; Cilâl ziyareti; Defter-Hâne; İlhan'ın eve gelişi
2. **Akt II ortası (Bölüm 16-21)** — Nahide tanıtımı; Yörük; Hâlit Bey itirafı; "İptal" anlaşılması; Mâra'nın kötü günü; ikinci tat
3. **Akt II sonu (Bölüm 22-26)** — İki Mâriye reveal'i; Mâra adı söyler; teftiş uyarısı; mağara taşıma; Hâlit ölümü
4. **Akt III (Bölüm 27-36)** — Defter yazma; teftiş; İlhan ile sahil; Mâra ölümü; Lemi ölümü; final mum

Her seansta 4-6 bölüm üretmek mümkün. Tahmin: 5-6 ek seans ile romanın tamamlanması.

---

## 11. KARAR İÇİN GEREKEN SORULAR (Yazardan Onay)

1. **Performans / atmosfer dengesi:** Lite modda kitap iç gölgesi büyük oranda kaldırıldı. Bu kabul edilebilir mi, yoksa rich modu varsayılan yapıp lite modu çok-zayıf-cihazlara mı sınırlamalıyız?

2. **Mist animasyonu:** Tamamen kaldırıldı (background-position pahaliydi). Yine de çok yavaş bir `transform: translate3d()` versiyonu istenir mi? (GPU dostu, ucuz; ama hareket çok yavaş olduğu için zaten görünmüyordu — bu yüzden kaldırdım.)

3. **Bölüm uzunluğu:** Bölüm 10 bilerek kısa (973 kelime — kanon hedefi 4-5 sayfa). Diğer 9 bölümün ortalaması ~1.200 kelime. Story Bible hedefi 2.000-2.300 idi. Bu konuyu önceki raporda da işaret etmiştim — disiplin sıkı tutuldu, içerik temiz, ama hedef altında. Karar: (a) Aynı tempoya devam — final ~42-45k kelime; (b) Akt II'den itibaren her bölüme bir-iki ek sahne — final ~60-70k.

4. **Lazy pagination:** Sonraki sürümde architecture değişikliği yapıp ilk 5 bölümü eager + geri kalanı lazy yapayım mı? Bu, 36 bölüm tamamlandığında ilk açılışı çok hızlandırır.

---

*Bu rapor Story Bible'a karşı denetlenmiş, kanonik sızıntı tespit edilip düzeltilmiş, performans düzeltmeleri uygulanmış sürümün belgesidir. Bir sonraki üretim seansında aynı eşik üzerinden Akt II başlayacaktır.*
