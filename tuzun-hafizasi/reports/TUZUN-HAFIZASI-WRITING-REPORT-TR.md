# TUZUN HAFIZASI — Üretim Raporu

**Tarih:** 2026
**Sürüm:** 0.1 (Açılış Üretimi)
**Durum:** Akt I'in yarısı yazıldı; dijital kitap motoru tam çalışır

---

## 1. ÜRETİM ÖZETİ

Tek seansta üretildi:

| Bileşen | Durum | Notlar |
|---------|-------|--------|
| Story Bible | ✓ Kopyalandı | `STORY-BIBLE-TR.md` — 18.5k kelime, 15 bölüm, 36 bölüm yol haritası |
| Dijital kitap mimarisi | ✓ Tam çalışır | HTML + 3 CSS + 3 JS; 3D sayfa çevirme, paginasyon, paralel cilt |
| İçerik motoru | ✓ Tam çalışır | Üç akt sistemi, dinamik fihrist, tema değiştirme, yerel saklama |
| Yazılı bölümler | ✓ 5 / 36 (%14) | Akt I (Bulma) — 5 bölüm; sonraki 31 bölüm yazılmayı bekliyor |
| Kapak sistemi | ✓ Çift katman | Hem `assets/cover.svg` hem in-engine kapak sayfası (book.js içinde) |
| Sunucu testi | ✓ HTTP 200 (15/15) | Tüm kaynaklar geçerli; JS sözdizimi temiz; başvurular tutarlı |

## 2. YAZILMIŞ BÖLÜMLER

| Bölüm | Başlık | Kelime | Kanon İşlevi | Statü |
|-------|--------|--------|--------------|-------|
| I | Liman, Ekim | ~1.208 | Geri dönüş; ilk yarılma ("Yağmur yağacak"); tavandaki leke | ✓ |
| II | Cenaze | ~1.260 | Babanın gömülüşü; İlhan'ın ilk görünümü; kilitli çekmece plantı | ✓ |
| III | Tuzhane | ~1.167 | Aile tuz-evinin keşfi; numaralı çekmeceler; arka kilit | ✓ |
| IV | İki Kâğıt | ~1.117 | Bıçakla açma; iki tuz tanesi; "Ablam geldi mi?"; deri defter | ✓ |
| V | Bezelye Mevsimi | ~1.179 | Annenin iyi günü; çoğul "çocuklar"; Suhâl Nine ilk görüş | ✓ |
| **Toplam** | | **~5.931** | | **%14** |

### Toplam Hedef Karşılaştırması

| Eksen | Hedef | Mevcut | Fark |
|-------|-------|--------|------|
| Bölüm sayısı | 36 | 5 | -31 |
| Toplam kelime | 75.000-85.000 | 5.931 | %7-8 |
| Akt I bölüm | 10 | 5 | -5 |
| Bölüm başı ortalama | 2.000-2.300 | 1.186 | -%50 |

**Not:** Bölüm başı ortalama Story Bible hedefinin altında. Bu, sıkı tutulmuş bir disiplinin sonucu — boşluk doldurmaktan kaçınıldı. Bölüm 4-5 gibi diyalog ağırlıklı sahneler daha kısa kaldı. Akt II'nin araştırma ağırlıklı bölümleri (özellikle Bölüm 14, 18, 19, 25) doğal olarak daha uzun olacaktır. Yine de tüm roman bu tempoda yazılırsa toplam ~42-50k kelime tutar — kanonun alt sınırının altında. Devam ederken her bölüme bir-iki sahne genişletmesi düşünülmeli.

## 3. KANON UYUMU

Story Bible Bölüm 14'teki "Çakılı İsim Listesi" ve "Çakılı Tarihler" kayıtlarına karşı yazılan bölümler:

| Kanon Maddesi | Yazılı Bölümlerde |
|---------------|-------------------|
| Reha Sezerân (24, kütüphaneci) | ✓ Bölüm 1'de doğru yaşta, mesleğe işaret edilmiş |
| Mâra (52, demanslı anne) | ✓ Bölüm 1, 4, 5'te tutarlı |
| Erol (ölmüş, kayıtçı) | ✓ Bölüm 2, 3, 4'te tutarlı; defter yazısı eski mürekkep |
| Yzb. İlhan Berhan (35, jandarma komutanı) | ✓ Bölüm 2'de doğru rütbe, doğru sıcaklık |
| Suhâl Nine (eczanenin üstünde) | ✓ Bölüm 5'te ilk görünüm — doğrudan etkileşim Bölüm 8'de gelecek |
| Cilâl Halife (Kerâli'de teyze) | ✓ Bölüm 4'te dolaylı anılma; Bölüm 13'te aktif |
| Kasaba: Vâliçe | ✓ Tüm bölümlerde tutarlı; coğrafya bibledan |
| Aile tuz-evi (bahçenin arkasında) | ✓ Bölüm 3-4'te konum doğru |
| Eski Tuzhane (batı sahili, yarı yıkık) | ✓ Bölüm 1 ve 5'te uzaktan görünüm doğru |
| Düzeltme (1880-1918) | Henüz açılmadı — Bölüm 14, 18, 19'da gelecek |
| Defne Mâriye (silinmiş kız kardeş) | Adı **henüz söylenmedi** — kanon Bölüm 22 |
| "İPT." kodu | ✓ Bölüm 4'te ilk planlanmış (kanon Bölüm 7) |
| "Yağmur yağacak" / yağmuyor | ✓ Bölüm 1'de tek yarılma |
| "Ablam geldi mi?" | ✓ Bölüm 4'te tam diyalog |

### Yasak Hamlelerden Sapmalar

Story Bible 1.6'daki 10 maddelik yasak listesi gözden geçirildi:

| Yasak | İhlal? |
|-------|--------|
| Tuz mekaniğinin ders gibi açıklanması | Hayır. Tane "sıradan tuz gibi" tarif edildi, mekanik anlatılmadı |
| "Reha hissetti" tarzı duygu adlandırması | Hayır. Hisler beden ve gözlem üzerinden gösterildi |
| Geri-dönüş içinde geri-dönüş | Hayır. Tek katman geri-dönüş, Bölüm 4 defter okumasında |
| Politik konuşma yapan karakter | Hayır. İlhan'ın "düzen" ifadesi politik değil bürokratik |
| Travma açıklayan psikolojik diyalog | Hayır. Karakterler kendilerini analiz etmedi |
| Sürpriz kötü adam reveal | Henüz reveal gelmedi |
| Yas dökme sahnesi | Hayır. Cenaze (Bölüm 2) restrained tutuldu |
| Anne-kız uzlaşma melodramı | Hayır. Bölüm 4'te yarılma kısa, hızlı kapandı |
| Açıklayıcı epilog | Roman bitmedi |
| Sembolün kelimeyle vurgulanması | Hayır. "Hatıra" kelimesi tek bir kez bile bilinçli kullanılmadı |

## 4. UX UYGULAMA DURUMU

### Tamamlanan

- **Sayfa motoru** (`scripts/book.js`)
  - Dinamik paginasyon (üstel arama + ikili daraltma)
  - 2-sayfa spread (çift sayfa açılış)
  - 3D sayfa çevirme animasyonu
  - Romen rakam folio numaralandırma
  - Bölüm açılış sayfaları (numerik, alt başlıklı)
  - Akt geçiş sayfaları (üç perde için ayrı görsel)
  - Otomatik fihrist üretimi (12 bölüm/sayfa)

- **Kullanıcı arayüzü** (`scripts/app.js`)
  - Klavye navigasyonu (← → Space F K İ T Y E P Esc)
  - Mobil dokunmatik kaydırma
  - İz koyma (LocalStorage)
  - Tema değiştirici (3 tema rotasyonu)
  - Yazı boyutu (5 adım)
  - Performans modu (zengin/sade)
  - Tam ekran modu
  - Bölüm arama (fihrist drawer)
  - Akt filtreleme

- **Stil sistemi** (`styles/`)
  - 3 tema: Tuzlu, Kumlu, Gece-Deniz
  - Story Bible Bölüm 12 kanonuna uygun renk paleti
  - Cormorant Garamond, EB Garamond, Marcellus tipografi
  - Drop cap (ilk harf süslemesi) sadece ilk paragrafta
  - Restrained animasyonlar (prefers-reduced-motion uyumlu)
  - 700px altında tek sayfa fallback (mobil)

- **Yerel saklama** (`scripts/storage.js`)
  - Okuma ilerlemesi (spread indeksi)
  - İzler (timestamped)
  - Tema tercihi
  - Yazı boyutu adımı
  - İlk açılış hatırlama

### Yapılmadı / Sonraki Sürüm

| Özellik | Sebep |
|---------|-------|
| PDF dışa aktarma | Referans projelerde var; bu sürümde atlandı, sonraki sürümde eklenebilir |
| Çoklu dil çevirisi | Türkçe kalmalı; çeviri yayın aşamasında ayrı |
| Ses anlatı (audiobook) | Kapsam dışı |
| Çapraz cihaz senkronizasyon | LocalStorage yeterli — server-side sync gerekirse sonra |

## 5. RİSKLER VE ÇÖZÜMSÜZ ENDİŞELER

### Yüksek Öncelik

1. **Bölüm uzunlukları hedefin altında.** Mevcut tempo 36 bölüm üzerinden ~42-50k kelime verir — Story Bible hedefi olan 75-85k aralığının %50-60'ı. Bu, ya hedef düşürülmesini ya da yazılan bölümlerin genişletilmesini gerektirir. Editöryel öneri: ilk üretimi tamamla, sonra Akt II araştırma bölümlerini doğal olarak genişlet.

2. **Tek seansta üretilebilen bölüm sayısı sınırlı.** 5 bölüm bir seansta üretildi. 31 bölüm kalan = ~7 ek seans. Her seansın aynı disiplini koruması gerekecek — kanon Story Bible'a sıkı bağlılıkla.

### Orta Öncelik

3. **Tuz fenomeninin "bir şey" olduğunun romanın 10. bölümüne kadar açılmaması.** Bölüm 8 (Kandil Altında Bir Çizgi) ve Bölüm 10 (İlk Tat) henüz yazılmadı — bunlar yapısal olarak en hassas bölümler. Suhâl Nine'nin kapıdan görünüşü (Bölüm 5'te) Bölüm 8'in zeminini doğru kurdu.

4. **Subay İlhan'ın karikatürleşmemesi.** Bölüm 2'de mesafe + sıcaklık dengeli sunuldu, ama Bölüm 6 ve 15'teki "uyarı" sahneleri yazılırken aynı denge sürdürülmeli — kanon Bölüm 6 ve 1.6'ya geri dönülecek.

### Düşük Öncelik

5. **Mobil deneyim.** 700px altında tek-sayfa fallback yazıldı ama tablet ölçeklerinde test edilmedi.

6. **Kapak SVG'sinin yüksek çözünürlükte rasterize edilmesi.** Şu an saf SVG; pazarlama için PNG dönüşümü ileride gerekecek (Inkscape / rsvg-convert ile).

## 6. SONRAKI ADIMLAR

Önceliklendirilmiş:

1. **Bölüm 6-10'u yaz** — Akt I'i tamamla. Bölüm 10 (İlk Tat) romanın ilk büyük reveal'i.
2. **Bölüm 11-16** — Akt II'nin açılışı. Cilâl, Defter-Hâne, "İptal" terimi.
3. **Bölüm 17-21** — Hâlit Bey, Yörük, Mâra'nın günü, ikinci tat.
4. **Bölüm 22-26** — İki Mâriye reveal'i; mağara taşıma; Hâlit'in sonu.
5. **Bölüm 27-32** — Akt III. Defter yazma, teftiş, İlhan ile sahil, Mâra'nın ölümü.
6. **Bölüm 33-36** — Selâhattin Hoca, İlhan'ın tuzu, Lemi'nin sonu, final mum.

Her seansta 4-6 bölüm üretmek mümkün — toplam 6-7 ek seans.

## 7. KALİTE GÜVENCESİ NOTLARI

- Tüm JS dosyaları `node --check` sözdizimi testinden geçti.
- HTML referans bütünlüğü doğrulandı (15/15 dosya HTTP 200).
- Storage namespace: `tuzun-hafizasi:v1:` — referans projelerle çakışmaz.
- Vanilla JS, build adımı yok — referans projelerin felsefesi sürdürüldü.
- Mobil yatay kaydırma destekli.
- `prefers-reduced-motion` saygılı.

## 8. TESLİM EDİLEN DOSYALAR

```
/home/emre/Downloads/tuzun-hafizasi/
├── STORY-BIBLE-TR.md                       (130 KB) — Master kanon
├── TUZUN-HAFIZASI-WRITING-REPORT-TR.md     (bu dosya) — Üretim raporu
├── README.md                                       — Proje açıklaması
├── index.html                                (11 KB) — Giriş noktası
├── content/
│   ├── novel-data.js                         (3 KB)  — Meta + 3 akt
│   ├── chapter-01.js                        (11 KB)  — Liman, Ekim
│   ├── chapter-02.js                        (12 KB)  — Cenaze
│   ├── chapter-03.js                        (11 KB)  — Tuzhane
│   ├── chapter-04.js                        (11 KB)  — İki Kâğıt
│   ├── chapter-05.js                        (11 KB)  — Bezelye Mevsimi
│   └── finalize.js                           (2 KB)  — Akt sıralayıcı
├── scripts/
│   ├── storage.js                            (3 KB)  — LocalStorage
│   ├── book.js                              (29 KB)  — Sayfa motoru
│   └── app.js                               (20 KB)  — Üst denetleyici
├── styles/
│   ├── themes.css                            (8 KB)  — 3 tema
│   ├── main.css                             (29 KB)  — Ana stil
│   └── animations.css                        (2 KB)  — Hareket
└── assets/
    └── cover.svg                             (8 KB)  — Kapak SVG
```

## 9. KARAR İÇİN GEREKEN SORULAR

Bir sonraki üretim seansından önce yazardan onay:

1. **Bölüm uzunluğu kararı:** Mevcut ~1.200 kelime ortalama mı, yoksa hedefi 2.000+ tutmaya çalışmak mı? Kalite kayboluyorsa kısa kalsın; ama hedef 75k+ ise her bölümün doğal bir genişletmesi planlanmalı.

2. **Yayın sırası:** 5 bölüm hâlinde alpha test mi (gerçek okuyucu önünde), yoksa 36 bölüm tamamlanana kadar kapalı mı?

3. **Görsel:** Kapak SVG'si yeterli mi, yoksa rasterize edilmiş bir PNG / illüstratif kapak da hazırlanmalı mı?

4. **Tema önceliği:** Hangi tema okurun ilk göreceği olsun? Şu an `tuzlu` (gece tonu) varsayılan.

---

*Bu rapor üretim disiplinine bağlı kalarak yazıldı. Doğaçlama yapılmadı; her bölüm Story Bible'a karşılaştırıldı. Bir sonraki seansta üretim aynı eşik üzerinden devam edecek.*
