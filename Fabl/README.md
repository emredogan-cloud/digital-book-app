# Fabl

**Küçük Masallar** · *İlk Defter · Birinci Derleme*

> *"Her küçük hikâye de bir şey bilir; yeter ki acele edilmesin."*

Bağımsız okunabilen kısa fabller derlemesi. Her metin tek başına tamamdır: tek bir dramatik eylem, tek bir çekirdek fikir, sembolik ama açık. Ders dayatmaz; bir gözlem bırakır. Aesop ve Beydeba geleneğine bakar, ama taklit etmez.

Motor, **Tuzun Hafızası** dijital kodeksinden devralınmıştır; biçim disiplini (sayfa çevirme, dizgi, okuma deneyimi, performans) korunmuş, yalnızca kimlik — renk, atmosfer, kapak, üst-veri — değiştirilmiştir.

---

## Yapısı

- **Tür:** Kısa fabl derlemesi (roman değil)
- **Çerçeve:** Hafif — üç tematik küme yalnızca düzen verir, süreklilik yükü getirmez
  - **I · Kendilik** — kişinin kendisiyle ilişkisi
  - **II · Birlikte** — birlikte yaşamak
  - **III · Yapmak ve Bırakmak** — el, ustalık, vazgeçiş
- **Ölçek:** Her fabl ~500–900 kelime (2–3 sayfa)
- **Şu anki üretim:** 15 fabl yazıldı — Defter I (3) + Defter II (12); her kümede 5 fabl

### Yazılan fabller (15)

**I · Kendilik:** Yankıyı Besleyen Çoban · Kendi İzini Kovalayan Tilki · Adını Unutan Nehir · Aynadaki Tavus · Rüzgârın Borcu

**II · Birlikte:** İki Saatin Kasabası · Terazinin İki Gözü · Borç Veren Mum · Çatlaktaki Tohum · Konuşan Kavak ile Sessiz Çınar

**III · Yapmak ve Bırakmak:** Düğümü Çözmeyen Denizci · Arının Tereddüdü · Heykeltıraşın Fazlası · Haritada Olmayan Patika · Saatçinin Kuşu

Defter II üretim raporu: `FABL-DEFTER2-REPORT-TR.md`

---

## Dosya Yapısı

```
Fabl/
├── index.html                — Dijital kitap arayüzü
├── content/
│   ├── novel-data.js         — Kitap meta'sı, üç küme tanımı
│   ├── fable-01.js … fable-15.js — 15 fabl (küme sırasına dizilir: 5 + 5 + 5)
│   └── finalize.js           — Küme sıralayıcı
├── scripts/
│   ├── storage.js            — LocalStorage (ilerleme, izler, tema)
│   ├── book.js               — Sayfa motoru (paginasyon, 3D çevirme)
│   └── app.js                — Üst denetleyici
├── styles/
│   ├── themes.css            — Sabah / Gündüz / Alaca temaları
│   ├── main.css              — Ana stil (değişmedi — format LOCK)
│   └── animations.css        — Hareket katmanı (değişmedi)
└── assets/
    └── cover.svg             — Kapak görseli
```

## Kullanım

`index.html` dosyasını bir tarayıcıda aç. Yerel sunucu gerekmez — saf vanilla JS, build adımı yok. Vercel'e statik kök olarak deploy edilir (yapılandırma gerektirmez).

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

### Temalar — "Sabah Mavisi" ailesi

- **Sabah** — Varsayılan. Gün ağarmadan önceki mavi saat; kâğıt loşlukta parıldar.
- **Gündüz** — Aydınlık okuma; açık mavi-gri ve krem, ferah.
- **Alaca** — Akşam okuması; lacivert dinginliği, parşömen sayfa.

## Yeni Fabl Eklemek

1. `content/fable-04.js` oluştur; `window.FABL.entries.push({ id, title, subtitle, category, themes, content: [...] })`.
   - `category`: `"kendilik"`, `"birlikte"` veya `"yapmak"`.
   - `content`: paragraf dizgileri; sahne kırılımı için `{ style: "hr" }`, vurgulu tek satır için `{ style: "quote", text: "…" }`.
2. `index.html` içinde `finalize.js`'ten **önce** `<script src="content/fable-04.js"></script>` ekle.
3. Hepsi bu — paginasyon, fihrist ve folio otomatik.

## Lisans

Çalışma henüz yayım aşamasında değildir. Hiçbir parçası izinsiz dağıtılamaz.
