# Tuzun Hafızası

**Bir kıyı romanı** · *Vâliçe Kıyısı · Cilt-i Evvel*

> *"Deniz bazen ölülerin sakladığını da geri verir. Tuz hatırlar."*

Edebi spekülatif kurgu. Çöküş halindeki bir imparatorluğun kıyısında, denizde ölenlerin son anılarının tuza karıştığı söylenir. Reha babasının cenazesi için doğduğu Vâliçe kasabasına döner. Eski aile tuz-evinde kayıt dışı bir tane bulur. Dilinin ucuna koyduğunda, hatırlamadığı bir çocuğun sesini duyar: *Abla, abla, koş.*

---

## Yapısı

- **Toplam:** 36 bölüm, üç perde
- **Hedef hacim:** 75–85 bin kelime
- **Şu anki üretim:** 5 bölüm yazıldı (Akt I'in yarısı)
- **Format:** Etkileşimli dijital kodeks + el yazması

## Dosya Yapısı

```
tuzun-hafizasi/
├── index.html                 — Dijital kitap arayüzü
├── STORY-BIBLE-TR.md          — Master kanon (kavramsal otorite)
├── TUZUN-HAFIZASI-WRITING-REPORT-TR.md  — Üretim raporu
├── content/
│   ├── novel-data.js          — Kitap meta'sı, üç perde tanımı
│   ├── chapter-01.js          — Bölüm I: Liman, Ekim
│   ├── chapter-02.js          — Bölüm II: Cenaze
│   ├── chapter-03.js          — Bölüm III: Tuzhane
│   ├── chapter-04.js          — Bölüm IV: İki Kâğıt
│   ├── chapter-05.js          — Bölüm V: Bezelye Mevsimi
│   └── finalize.js            — Bölüm sıralayıcı
├── scripts/
│   ├── storage.js             — LocalStorage (ilerleme, izler, tema)
│   ├── book.js                — Sayfa motoru (paginasyon, 3D çevirme)
│   └── app.js                 — Üst denetleyici
├── styles/
│   ├── themes.css             — Tuzlu / Kumlu / Gece-Deniz temaları
│   ├── main.css               — Ana stil
│   └── animations.css         — Hareket katmanı
└── assets/
    └── cover.svg              — Kapak görseli
```

## Kullanım

`index.html` dosyasını bir tarayıcıda aç. Yerel sunucu gerekmez — saf vanilla JS, build adımı yok.

### Klavye Kısayolları

| Tuş | Eylem |
|-----|-------|
| `←` / `→` | Sayfa çevir |
| `Space` / `PageDown` | İleri |
| `Home` / `End` | Başa / Sona |
| `F` | Fihrist |
| `K` | Sayfaya iz koy |
| `İ` | İzleri aç |
| `T` | Tema değiştir |
| `Y` | Yazı boyutu |
| `E` | Tam ekran |
| `P` | Performans modu |
| `Esc` | Kapı kapat / Tam ekran çık |

### Temalar

- **Tuzlu** — Varsayılan. Sahil akşamı, gemici mavisi.
- **Kumlu** — Gündüz okuma. Kireç ve tütün sarısı.
- **Gece-Deniz** — Gece okuma. Lapis lacivert.

## Kanon

`STORY-BIBLE-TR.md` yazılım/anlatı tüm kararlarının **otoritesi**dir. Doğaçlama bu kapıdan geçmez. Tonal sürüklenme bu belge ile kontrol edilir.

## Lisans

Çalışma henüz yayım aşamasında değildir. Hiçbir parçası izinsiz dağıtılamaz.
# tuzun-hafizasi
