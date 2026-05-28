# Codex Mythologica — Stratejik Ürün ve İş Analizi Raporu

> **Hazırlayan:** Kıdemli dijital yayıncılık stratejisti & bağımsız üretici iş analisti perspektifi
> **Tarih:** Mayıs 2026
> **Proje:** `~/Downloads/mythology-digital-book` (Codex Mythologica)
> **Portfolyo bağlamı:** `~/Downloads/my-portfolio` (Next.js tabanlı kişisel site)
> **Ton:** Dürüst, ölçülü, abartısız. Heyecan değil; veri ve gerçeklik.

---

## İçindekiler

1. [Mevcut Kitabın Özeti](#1-mevcut-kitabın-özeti)
2. [Bu İşten Gerçekten Para Kazanılabilir mi?](#2-bu-i̇şten-gerçekten-para-kazanılabilir-mi)
3. [Hangi Tür Kitaplar Daha Çok Kazandırabilir?](#3-hangi-tür-kitaplar-daha-çok-kazandırabilir)
4. [Nerelerde Satabiliriz?](#4-nerelerde-satabiliriz)
5. [Kendi Web Sitemizde Satmak Mantıklı mı?](#5-kendi-web-sitemizde-satmak-mantıklı-mı)
6. [Nasıl Viral Yayılabilir?](#6-nasıl-viral-yayılabilir)
7. [Teknik Ölçeklenme Planı](#7-teknik-ölçeklenme-planı)
8. [Riskler ve Problemler](#8-riskler-ve-problemler)
9. [En Mantıklı Yol Haritası (3–6 Ay)](#9-en-mantıklı-yol-haritası-3-6-ay)
10. [Final Sonuç](#10-final-sonuç)

---

## 1. Mevcut Kitabın Özeti

### Genel Görünüm

Codex Mythologica, **76 uzun-form mitoloji öyküsünü** (~88.000 kelime) **19 farklı medeniyetten** (Yunan, Mısır, Norse, Japon, Hint, Kelt, Mezopotamya, Aztek, Roma, Çin, Kore, Maya, Slav, Afrika, Pers, Polinezya, İnuit, Türk, Arap) tek bir tarayıcı-içi etkileşimli "kitap" deneyiminde sunan, **tamamen client-side**, **çerçevesiz** (no-framework) bir dijital yayındır.

Saf HTML5 + CSS3 + vanilla JavaScript. Backend yok, build adımı yok, harici bağımlılık yok. Bir statik sunucudan (veya hatta `file://` üzerinden, font önbelleği sonrası) çalışır.

### Teknik Güçlü Yönler

| Boyut | Durum |
|---|---|
| Toplam JS + CSS + HTML | ~145 KB |
| Toplam içerik (metin) | ~520 KB (gzip sonrası ~140 KB civarı tahmini) |
| DOM içinde anlık `.page` element sayısı | Yalnızca 2 |
| Font istek sayısı | 4 aile, 8 axis (Google Fonts CDN, swap) |
| Build süresi (76 bölüm, masaüstü) | ~500 ms |
| Layout-read sayısı (paginasyon) | ~1.630 (chunked exponential search) |
| Sayfa çevirme animasyonu | 60 fps (GPU layer + transform/opacity only) |
| Performans profilleri | `lite` / `rich` (otomatik tespit + kullanıcı toggle) |
| Çerçeve / runtime bağımlılığı | **Yok** |
| Sunucu / API bağımlılığı | **Yok** |
| LocalStorage kalıcılığı | Okuma ilerlemesi, yer imleri, tema, tipografi tercihi, performans modu |

Bu rakamlar, sektördeki tipik "AI içerik üretici"nin Wordpress + 12 plugin + 8 MB theme şeklinde dağıttığı kitap deneyimine kıyasla **ciddi bir teknik ayrışma noktası**.

### Görsel ve Estetik Güçlü Yönler

- **Aydınlatılmış el yazması estetiği** — Cinzel, Cormorant Garamond, EB Garamond, UnifrakturMaguntia tipografi karışımı
- **Üç ortam teması:** *Midnight* (varsayılan, mum ışığı), *Parchment* (gündüz okuma), *Obsidian* (ay ışığı/koyu)
- **Gerçekçi 3D sayfa çevirme animasyonu** (rich modda) + opacity crossfade (lite modda)
- **Süslü ayraçlar, açılış sayfaları, illuminated drop-cap'lar, kırmızı ipek imleyici**
- **Parşömen dokusu**, altın foil aksanlar, derin gölgeler — her sayfada
- Logo / sigil / amblem: lapis-altın gradyanlı SVG, ambient ışıma

Görsel dil bilinçli olarak "AI markete tipik" estetiğin (gradient bol, generic sans-serif, glassmorphism) tam **karşıtı** olarak konumlandırılmış. Bu, markette yeniden satılması zor olan "hand-crafted artifact" hissini veriyor.

### Etkileşim Deneyimi

| Özellik | Tipik AI ebook'larda | Codex Mythologica |
|---|---|---|
| Sayfa çevirme | Yok (PDF) / scroll | 3D flip animasyon + curl gölgesi |
| İçindekiler | Statik | Filtrelenebilir + arama destekli drawer |
| Yer imi | Yok | Tarihli, hatırlatmalı, kalıcı |
| Tipografi ölçeği | Yok | 5 kademeli (rebuild + restore) |
| Tam ekran modu | Tarayıcı F11'e bağlı | Yerleşik + chrome'u gizler |
| Klavye navigasyonu | Yok | Ok, T, B, M, F, V, A, P, X, Esc |
| Mobil swipe | Yok | Var (passive listener) |
| PDF dışa aktarma | Yok | Yerleşik (chunked, idle-callback) |
| Performans ayarı | Yok | Otomatik tespit + manuel toggle |
| Erişilebilirlik | Genelde zayıf | Semantik HTML, ARIA, reduced-motion |

### Tipik Ebook'lardan Farkı

Sıradan bir ebook (PDF/EPUB) bir **belge**dir. Codex Mythologica bir **uygulamadır** — okuyucunun "nereye kaydedeceğim, hangi okuyucuyla açacağım" sürtünmesi yok. URL ver, çalışsın. Bu, hem dağıtım kolaylığı hem premium algı yaratıyor.

### Kullanıcıyı Çekecek Sebepler

- **Anlık erişim:** İndirme, kurulum, kayıt yok
- **Estetik şok:** İlk açılışta "vay" hissi — sosyal medyada paylaşılabilir
- **Cep telefonunda da çalışır:** Mobile-first değil ama mobile-friendly
- **Kullanıcının kontrolü:** Tema, font, mod kendi tercihi
- **Koleksiyon hissi:** "76 öykü, 19 medeniyet" gibi somut bir sayım

> **Net teknik ve estetik değerlendirme:** Bu proje, ücretsiz olarak bile yayınlansa, **portfolyo değeri açısından bir freelance/kurumsal sözleşmenin tetikleyicisi** olabilir — sadece bu değer bile zaman yatırımını karşılayabilir. Doğrudan satış geliri **bonus** olarak değerlendirilmeli.

---

## 2. Bu İşten Gerçekten Para Kazanılabilir mi?

**Kısa cevap:** Evet, ama aşağıdaki kalın yazılı olanı baştan kabul edersen: **doğrudan kitap satışından hayatını geçindirecek para kazanmak istatistiksel olarak çok düşük olasılık. Buradan gelen "para" daha çok ikincil kanallardan geliyor.**

Detaylara girelim.

### 2.1 Pazar Talebi — Gerçekçi Resim

Mitoloji içeriği için talep var. Ama "talep var" ile "satın alır" arasında büyük bir uçurum var.

**Talep göstergeleri (pozitif):**
- Subreddit `r/mythology` ~470K üye, `r/Norse` 280K, `r/GreekMythology` 250K
- "Mythology" YouTube nişi: orta-üst seviye (Overly Sarcastic Productions, Crash Course Mythology)
- TikTok #mythology hashtag'i milyarlarca görüntülenme
- Steam'de mitoloji temalı oyunların sürekli satması (Hades, God of War, Smite)
- Tabletop RPG (D&D, Pathfinder) topluluğu — worldbuilding referansı için sürekli içerik tüketiyor

**Ama dikkat:**
- Bu kitlenin büyük çoğunluğu **ücretsiz Wikipedia, YouTube videoları ve Reddit threadleri ile tatmin oluyor**
- Ödeme yapan dilim çok küçük: tahminen toplam ilgili kitlenin %1–3'ü

### 2.2 AI İçerik Pazar Doygunluğu

Bu, dürüstçe ele alınması gereken en büyük problem.

| Etken | Etki |
|---|---|
| Amazon KDP'nin günlük yayın limiti (3 kitap/gün) | Eylül 2023'ten beri AI bombalamasına karşı önlem |
| Goodreads ve Reddit'te "AI written" damgalaması | Yorumlarda anında negatif puan |
| Reader skepticism (özellikle 2024 sonrası) | "AI yazmış mı?" sorusu satın alma kararını yavaşlatıyor |
| Düşük fiyat baskısı | Aynı nişte $0.99'a satan binlerce başka ürün var |
| Discoverability düşüşü | Algoritmik filtreler AI içeriği gömüyor |

**Gerçekçi tablo:** "AI ile yazılmış mitoloji ebook" diye konumlanırsan kaybedersin. **"El işi gibi görünen, premium dijital codex"** diye konumlanırsan kazanma şansın daha yüksek. Codex Mythologica zaten bu ikinci konumda — ama bu konumlama korunmalı.

### 2.3 Rekabet Analizi

| Rakip Tipi | Örnekler | Onların Zayıflığı | Bizim Avantajımız |
|---|---|---|---|
| Akademik mitoloji kitapları | Edith Hamilton, Robert Graves | Pahalı, kuru, etkileşimsiz | Cinematic ton, etkileşim |
| Wikipedia / Britannica | Ücretsiz | Estetiksiz, hap-bilgi | Edebî, atmosferik |
| YouTube anlatıcılar | Crash Course, Mythology Files | Zaman yatırımı gerekir | İstediğin tempoda oku |
| AI-üretim ebook'lar | KDP'de yüzlerce | Düşük kalite, generic | Yüksek kalite, el işi hissi |
| Mitoloji oyunları | Hades, Smite | Başka bir medya | Özgül zihinsel deneyim |
| Premium illustrated kitaplar | Folio Society, Taschen | $150+, fiziksel | Dijital, $5–15 erişilebilir |

**Pozisyon:** Folio Society'nin dijital, accessible versiyonu. Bu pozisyon **boş**, ama aynı zamanda bu pozisyon için hazır talep de küçük.

### 2.4 Ödeme İsteği (Willingness to Pay)

Indie dijital yayıncılıkta, **gerçekçi fiyatlandırma penceresi:**

| Fiyat Bandı | Beklenen Conversion (görüntülemeden satışa) | Yorum |
|---|---|---|
| $0 (ücretsiz) | %5–15 indir, %0 gelir | E-posta listesi yapımı için iyi |
| $1–3 (impuls) | %2–5 conversion | Dürtü alımı; gelirde ölçek için kullanışlı |
| $5–9 (sweet spot) | %1–2 conversion | Premium algı + erişilebilir |
| $10–19 (seri/koleksiyon) | %0.5–1 | Sadık alıcı bandı |
| $25+ | %0.1–0.3 | Sadece bilinen markalar |

**Codex Mythologica için en mantıklı tek-ürün fiyatı:** $7–9 USD (Türkiye için 250–350 TL eşdeğeri). "Pay-what-you-want" başlangıç fiyatı $5 ile.

### 2.5 Avantaj / Dezavantaj Tablosu

| Avantajlar | Dezavantajlar |
|---|---|
| Teknik ayrışma gerçek | Kitle yok (kişisel marka yok) |
| Estetik yüksek | Pazarlama bilgisi gerekir |
| Mitoloji = kalıcı niş | AI etiketi şüphe yaratıyor |
| Mobile + desktop çalışıyor | Discoverability sıfırdan kurulacak |
| Kopyalanması teknik olarak zor değil ama deneyim kopyalanamaz | DRM yok — piracy mümkün |
| Portfolyo değeri büyük | Doğrudan satış geliri istatistiksel düşük |
| Tek seferlik yatırım | Reklam bütçesi yoksa organik trafik aylar alır |

### 2.6 Uzun Vadeli Potansiyel

**3 farklı senaryoyu ayır:**

**Senaryo A — "Sadece ürün":** Tek bir Codex Mythologica satarsın, tıklayan tıklar. **Beklenen yıllık gelir: $100–600.** Bu tek başına yatırım değil.

**Senaryo B — "Seri / katalog":** Cyberpunk Codex, Dark Fantasy Lore, Sci-Fi Bestiary gibi 4–6 kitap çıkarırsın. Her biri $7–9. E-posta listesi 1.000–5.000 kişiye ulaşır. **Beklenen yıllık gelir: $2.000–12.000.** Hala tam zamanlı iş değil ama anlamlı bir yan gelir.

**Senaryo C — "Platform / ekosistem":** Codex Engine'i başka yazarların kullanabileceği bir SaaS / template'e dönüştürürsün. B2B pazarına çıkarsın (yazarlar, küçük yayınevleri, RPG worldbuilders). **Beklenen yıllık potansiyel: $20.000–100.000+** ama bu artık kitap satmak değil, yazılım satmak. Tamamen farklı operasyon.

> **Dürüst sonuç:** Bu işten *para kazanılabilir*, ama "pasif gelir, otomatik para basma makinesi" beklentisi gerçekçi değil. **En yüksek olasılıklı senaryo:** portfolyo + freelance kanal güçlendirme + yan gelir kombinasyonu.

---

## 3. Hangi Tür Kitaplar Daha Çok Kazandırabilir?

Aşağıda her kategori için **5 boyutta puan** veriyorum. Puanlar 1–10 arası; 10 = en yüksek.

| Kategori | Talep | Üretim Kolaylığı | Para Skoru | Ölçeklenme | Hedef Kitle | Genel |
|---|---|---|---|---|---|---|
| **Mitoloji (mevcut)** | 7 | 8 | 6 | 9 | Geniş, eğitimli, fantezi sever | **7.6** |
| **Dark fantasy lore / bestiary** | 9 | 7 | 8 | 9 | RPG oyuncuları, fan fic yazarları | **8.4** |
| **Cyberpunk universes / codex** | 8 | 7 | 8 | 8 | Tech-fantasy okuyucu, gamer | **7.8** |
| **Etkileşimli korku öyküleri** | 8 | 6 | 7 | 7 | Niş, sadık, viral potansiyeli yüksek | **7.0** |
| **Self-improvement (görsel)** | 10 | 5 | 9 | 8 | Geniş, ödeme gücü yüksek | **8.4** |
| **Animated educational books** | 9 | 4 | 8 | 6 | Veliler, eğitimciler | **7.0** |
| **Sci-fi codex / bestiary** | 8 | 7 | 8 | 9 | Gamer, RPG, sci-fi okur | **8.0** |
| **Felsefe / öykü hibridi** | 5 | 7 | 6 | 8 | Niş entellektüel | **6.4** |
| **AI-generated worldbuilding** | 8 | 8 | 7 | 10 | Yazarlar, GMs | **8.2** |
| **Fitness bilgi kitabı** | 9 | 6 | 9 | 7 | Pratiğe yönelik | **7.8** |
| **Productivity handbook** | 9 | 7 | 9 | 7 | Profesyoneller | **8.0** |
| **Gamified reading deneyimleri** | 7 | 4 | 7 | 6 | Erken-deneme grubu | **6.0** |

### En İyi 3 Aday (Codex Mythologica formatına uygun)

#### Aday 1: **Dark Fantasy Lore Codex** — *"Bestiary of the Hollow Ages"*

- **Neden:** D&D ve Pathfinder oyuncuları sürekli yeni canavar/lokasyon/lore içeriği satın alıyor. Drivethrurpg ve Itch.io'da bu pazar canlı
- **Format:** 50–80 yaratık + 20 lokasyon + 10 hanedan, her biri kısa öykü + istatistik bloğu (RPG için)
- **Pazar:** $9.99 standart, $14.99 PDF + interactive bundle
- **Ölçek:** Her seasona genişletme (Volume II, III)

#### Aday 2: **Cyberpunk City Codex** — *"Nine Districts of Neo-Constantinople"*

- **Neden:** Cyberpunk renaissance devam ediyor (Cyberpunk 2077 anime, Edgerunners), Türkiye-temalı Cyberpunk hâlâ rare
- **Format:** 9 mahalle, her biri 5–8 öykü, karakter dosyası, glitch tema
- **Pazar:** Lokal hashtag'lerle TikTok'ta viral potansiyeli yüksek
- **Ek değer:** Türk kültür-cyberpunk fusion → uluslararası ilgi

#### Aday 3: **Productivity / Self-Improvement Visual Book** — *"The Quiet Codex"*

- **Neden:** Self-help kalıcı en çok satan kategori. Cinematic, "el yazması" estetiği bu pazara çok az dokunuldu
- **Format:** 30 kavram (deep work, flow, anti-fragility, stoicism vb.), her biri 1.500–2.000 kelime + görsel mizansen
- **Pazar:** $12.99–19.99 (premium algı)
- **Avantaj:** Profesyonellerin ödeme isteği yüksek

### Düşük Öncelik (en azından şimdilik)

- **Felsefe-öykü hibridi:** Düşük talep + yüksek üretim kalitesi gerekiyor
- **Gamified reading:** Üretim maliyeti çok yüksek, getirisi belirsiz
- **Animated educational books:** Animasyon üretimi pipeline gerekiyor; AI animation hâlâ erken aşama

---

## 4. Nerelerde Satabiliriz?

İnteraktif HTML kitap **çoğu platform için tipik bir ürün değil**. Her platformu bu özel format açısından değerlendirelim.

### 4.1 Platform Karşılaştırması

| Platform | Ücret | HTML Kitap Uyumu | Pazarlama Yardımı | Ödeme Gateway | Genel |
|---|---|---|---|---|---|
| **Gumroad** | %10 (azalan) | Mükemmel — ZIP indirir | Düşük | Stripe + PayPal | ⭐⭐⭐⭐⭐ |
| **Lemon Squeezy** | %5 + 50¢ | Mükemmel | Düşük | Tüm dünya, MoR | ⭐⭐⭐⭐⭐ |
| **Itch.io** | İstenen yüzde (varsayılan %10) | Çok iyi — HTML5 hosted çalışır | Orta (kategori sayfaları) | Stripe + PayPal | ⭐⭐⭐⭐⭐ |
| **Payhip** | %5 (free plan) | İyi — ZIP veya hosted | Düşük | Stripe + PayPal | ⭐⭐⭐⭐ |
| **Etsy** | %6.5 + listing $0.20 | Zayıf — fiziksel ürün odaklı | Yüksek (organik trafik) | Etsy Payments | ⭐⭐ |
| **Amazon KDP** | %30–65 | **Çok zayıf** — sadece EPUB/PDF | Yüksek (algoritma) | Direct deposit | ⭐⭐ |
| **Patreon** | %8–12 | Üyelik modeline iyi | Orta (mevcut takipçi) | Stripe + PayPal | ⭐⭐⭐⭐ |
| **Shopify** | $29/ay + payment | Tam kontrol | **Yok** — kendin getir | Tüm dünya | ⭐⭐ |
| **Ko-fi** | %0 (Gold $6/ay) | Orta — link ile | Düşük | Stripe + PayPal | ⭐⭐⭐⭐ |

### 4.2 Detaylı Platform Yorumları

#### Gumroad
**Artıları:** Indie creator için altın standart. Setup 10 dakika. Türk yaratıcılar için Payoneer üzerinden çalışır. Affiliate sistemi var. PWYW (pay-what-you-want) destekler.
**Eksileri:** Komisyon 2024 değişikliklerinden sonra hâlâ yüksek (%10 + payment fees). Discoverability yok — kendi trafiğini getirmen lazım.
**HTML kitaba uygunluk:** ZIP arşivi olarak yükle, müşteri indirsin, açtığında kendi tarayıcısında çalışır. **Önerilen:** Birincil satış kanalı.

#### Lemon Squeezy
**Artıları:** Merchant of Record olarak satıyor — KDV/VAT/sales tax yükünü onlar üstleniyor. Avrupa pazarı için bu **çok büyük avantaj**. Modern UX. Türkiye'den hesap açılabilir.
**Eksileri:** Daha yeni; Gumroad kadar cüretkâr indie kitle yok.
**HTML kitaba uygunluk:** Aynı Gumroad gibi — dosya teslim eder. **Önerilen:** Avrupa müşterileri için ana kanal.

#### Itch.io
**Artıları:** **Etkileşimli HTML içerik için yapılmış platform.** Kitabı doğrudan iframe ile açabilirler — indirmeye bile gerek yok. Indie/oyuncu kültürü pasif olarak mitoloji & dark fantasy okur. Oyun jam'lerine paralel "book jam" trendi de yükseliyor.
**Eksileri:** Ana kitle gamer; "kitap" arayan az. Yine de kategori sayfalarında PWYW kitaplar dikkat çekiyor.
**HTML kitaba uygunluk:** **En iyi platform.** ZIP yükle, "play in browser" işaretle, anında çalışır.
**Önerilen:** Birincil "ücretsiz / PWYW" yayın platformu. Discoverability tetiği için.

#### Payhip
**Artıları:** Düşük komisyon, basit. Avrupa için VAT halloluyor. Yer imi: özellikle e-kitap satıcıları için tasarlandı.
**Eksileri:** Trafik üretmiyor.
**HTML kitaba uygunluk:** Gumroad'a alternatif. **Önerilen:** B planı / ikinci satış kanalı.

#### Etsy
**Artıları:** Massive organik trafik. "Mythology print" arayan ciddi kullanıcı havuzu var.
**Eksileri:** Etsy fiziksel ürün ve printable PDF için. **İnteraktif HTML için uygunluk düşük.** "Mystical printable" niche'inde PDF/JPG mitoloji kartları satılıyor — bu farklı bir ürün formatı olur.
**HTML kitaba uygunluk:** Ana ürün için **uygun değil.** Yan ürün (e.g. "Mythology Notebook PDF") için uygun.

#### Amazon KDP
**Artıları:** Devasa kitle. Algoritma sana trafik getirebilir.
**Eksileri:** Sadece EPUB/PDF/MOBI. **İnteraktif HTML kitabımızı yayınlayamayız.** Üstelik AI içerik konusunda 2024 itibarıyla çok agresif policy değişiklikleri var. Eylül 2023'ten beri günlük 3 kitap yayın limiti var.
**HTML kitaba uygunluk:** **Doğrudan değil.** Ancak **ekstra ürün** olarak: aynı içeriği geleneksel EPUB olarak da paketleyip orada satabilirsin. Bu ayrı bir SKU olur.

#### Patreon
**Artıları:** Tekrarlayan gelir. Sadık takipçi modeli.
**Eksileri:** Sıfırdan başlamak ve takipçi toplamak zor. Mevcut audience yoksa boş tabela.
**HTML kitaba uygunluk:** Kitabı tier-perk olarak ver. **Önerilen:** *Sonradan* — audience oluşunca devreye gir.

#### Shopify
**Artıları:** Tam kontrol. Brand inşa etmek için ideal.
**Eksileri:** Aylık $29 + tema + ödeme komisyonları. Trafik yok. Mid-six-figure yapana kadar overkill.
**HTML kitaba uygunluk:** Tek ürün için **gereksiz**. 5+ ürünlük bir katalog olduğunda düşün.

#### Ko-fi
**Artıları:** %0 komisyon (Gold $6/ay alternatifi). Tip jar + ürün satışı + üyelik birlikte.
**Eksileri:** Discoverability düşük.
**HTML kitaba uygunluk:** **Mükemmel "yan platform"** — tip jar olarak. Ana satış değil ama ekstra kanal.

### 4.3 Platform Stratejisi Önerisi

```
            ┌──────────────────┐
            │  Itch.io         │  ← Ücretsiz / PWYW (TRAFİK MİKNATIS)
            │  (ücretsiz veya  │
            │   $1+ PWYW)      │
            └──────────────────┘
                    │
                    │ "Tam sürümü buradan satın al"
                    ▼
    ┌──────────────────────────────┐
    │   Gumroad VEYA Lemon Squeezy │  ← Ana satış kanalı
    │   (deluxe versiyonlar $9–15) │     ($7–15 fiyat)
    └──────────────────────────────┘
                    │
                    │ "İlerideki kitaplar için"
                    ▼
            ┌──────────────────┐
            │  Patreon / Ko-fi │  ← Aylık abonelik (sonra)
            │  ($3–10 / ay)    │
            └──────────────────┘
                    │
                    │ "Toplu paket / fiziksel ek"
                    ▼
            ┌──────────────────┐
            │  KDP (yan ürün)  │  ← Geleneksel EPUB versiyonu
            │  ($4.99 ebook)   │     (sadece bonus kanal)
            └──────────────────┘
```

---

## 5. Kendi Web Sitemizde Satmak Mantıklı mı?

**Kısa cevap:** *Direkt satış için* hayır (henüz). *Showcase ve trafik dönüşümü için* kesinlikle evet.

### 5.1 Portfolyo Bağlamı

Mevcut portfolyo `~/Downloads/my-portfolio` Next.js + AI SDK + Vercel KV + Three.js stack'ine sahip. Bu, eklenecek ürün vitrini için **teknik olarak zaten hazır**. Stripe entegrasyonu için altyapı var.

### 5.2 Önerilen Yaklaşım: "Showcase + Showroom" Modeli

Doğrudan e-ticarete atlama. Şu sıralamayı izle:

#### Aşama 1 (hemen): **Showcase Sayfası**

Portfolyoya `/codex` veya `/projects/codex-mythologica` rotası ekle. İçerik:

- **Hero:** Cinematic GIF/WebM (sayfa çevirme, ambient drift)
- **Yaşayan demo:** İframe yerine direct embed — okuyucu site içinde ilk 3 öyküyü ücretsiz okuyabilir
- **Tech stack vurgusu:** "Vanilla JS, no framework, 76 stories, 446 pages, 60fps page-turn"
- **Sayılar:** 88.000 kelime, 19 medeniyet, 0 dependency
- **CTA:** "Tam sürümü itch.io'da indirin" (ücretsiz veya PWYW)
- **İkincil CTA:** "Premium yayını Gumroad'da satın alın" ($9)

#### Aşama 2 (1–2 ay sonra, eğer talep varsa): **Premium Sayfası / Reader**

- Login ile premium içeriklere erişim (Vercel KV + NextAuth)
- Ödeme: Stripe Checkout (tek tıkla, link ile)
- Müşteri kayıtlı kitabını kendi okuma profilinden açar
- Reader hâlâ aynı kod tabanı, sadece auth/license katmanı

#### Aşama 3 (3–6 ay sonra, eğer 50+ müşteri varsa): **Katalog Sitesi**

- `/codex/library` rotası
- Yeni kitaplar burada listelenir
- Bundle deals, üyelik tier'ları
- Email pazarlama otomasyonu (Resend, ConvertKit)

### 5.3 Showcase Görsel Yaklaşımı

Portfolyodaki diğer projelerle uyumlu olmalı. Önerilen:

```
┌─────────────────────────────────────────────────┐
│   [Tam genişlik sinematik video — 8 sn loop]    │
│   Sayfa çevirme + ambient drift                 │
│                                                  │
│   CODEX MYTHOLOGICA                              │
│   An interactive illuminated archive             │
│                                                  │
│   [▶ Open Reader]    [↗ Source on GitHub]      │
└─────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┐
│  19 civs     │  76 myths    │  88K words   │
│  ━━━         │  ━━━         │  ━━━         │
└──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────┐
│  Embedded reader (iframe veya bileşen)          │
│  İlk 3 bölüm açık, gerisi paywall'lu            │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Technical writeup                              │
│  - No framework                                 │
│  - 60fps page-turn                              │
│  - GPU-friendly transitions                     │
│  - Auto perf detection                          │
│  ...                                            │
└─────────────────────────────────────────────────┘
```

### 5.4 Demo / Preview Reader

**Olmazsa olmaz.** Hiçbir kullanıcı satın almadan önce dokunmadığı bir interactive ürünü almaz.

**Strateji:** Her medeniyetten 1 öykü ücretsiz okunabilir (toplam 19 öykü). Geri kalan 57 paywall arkasında. Bu, talebi gerçek anlamda test eden bir freemium modelidir.

### 5.5 Fiyatlandırma Önerisi

| Plan | Fiyat | İçerik |
|---|---|---|
| **Free Sampler** | $0 | 19 öykü (her medeniyetten 1 tane), itch.io'da host |
| **Standard Edition** | $9 | Tüm 76 öykü, lifetime access |
| **Patron Edition** | $19 | Standard + sonraki kitap erken erişim + isim "supporter" listesinde |
| **Bundle (3 kitap)** | $24 | Mythology + Dark Fantasy + Cyberpunk Codex (sonradan) |

PWYW (pay-what-you-want) seçeneği: $5 minimum, üst sınır yok. Bağışçıların ortalaması genelde minimum + %20–40.

### 5.6 Hesap Sistemi: Gerek Var mı?

**Şimdilik:** Hayır. Üç sebepten:

1. **Sürtünme:** Kayıt zorunluluğu conversion'ı %30–50 düşürüyor
2. **Maintenance:** Kullanıcı verisi GDPR/KVKK yükümlülüğü demek
3. **Scope creep:** Login → şifre sıfırlama → 2FA → email verify → yönetim paneli zinciri ürünü engeller

**Alternatif çözüm:** Stripe Checkout sonrası **download link** veya **özel URL token** (örnek: `/codex/library/r4nd0m-t0k3n-h3r3`). Müşteri linki bookmark eder, istediği zaman okur. Vercel KV'da token → satın alma kaydı.

50+ aktif müşteri olursa hesap sistemi mantıklı olabilir. Önce *gerçek* talebi gör.

### 5.7 İndirilen Kitaplar Korunmalı mı?

**Dürüst cevap:** Etkili koruma yok. HTML/JS açık kod. Birinin paylaşmasına engel olmazsın.

**Ne yapabilirsin:**
- **Hafif watermark:** Müşterinin email'i kitabın footer'ında (sosyal baskı)
- **License notice:** README'de "kişisel kullanım için satın alındı"
- **Kanonik versiyon kontrolü:** Web reader'da sürekli güncellenen "official" versiyon
- **Eklenti hizmetleri:** Kitap satın alana ekstra (yeni öyküler, müşteri-özel notlar) ver

**Yapma:** DRM, obfuscation, anti-debug. Bunlar ürün tecrübesini bozar, ciddi pirate'i durdurmaz.

**Realite:** Indie creator'ların %95'i piracy'ye karşı *bilerek görmezden gelme* stratejisi izler. Pirate okuyan zaten ödeme yapmayacaktı, ama belki ileride başka bir şey alır.

### 5.8 Conversion Optimizasyonu

| Taktik | Conversion Etkisi (tahmini) |
|---|---|
| Yaşayan demo (homepage'de embed) | +%20–40 |
| Bedava sampler (19 öykü) | +%30–60 |
| "76 myths from 19 civilizations" gibi somut sayılar | +%10–20 |
| Sosyal kanıt (kullanıcı yorumu, Reddit pinch'i) | +%15–30 |
| Net fiyat ($9, üyelik karmaşası yok) | +%20 |
| Mobile-friendly demo | +%10–25 |
| Loading speed < 2s | +%5–15 |
| Açıkça "no sign-up needed" yazısı | +%10 |
| Yıldız puanlar / quote'lar | +%10–20 |

### 5.9 Trust-Building

- **Açık kaynak:** GitHub'da repository public yap. "Open source ama satılan deluxe edition" modeli (Obsidian-style)
- **Yapımcı kim olduğunu söyle:** "Hi, I'm Emre — a developer in Türkiye who loves mythology and good typography"
- **Process'i belgele:** "Bu kitabı nasıl yaptım" blog yazıları → SEO + güven
- **Geri ödeme garantisi:** "Sevmezseniz 14 gün içinde para iadesi" — aslında kimse istemez ama güven verir

---

## 6. Nasıl Viral Yayılabilir?

Realistic shu: **çoğu indie kitap viral olmaz**. Ancak doğru içerik + doğru kanal kombinasyonuyla algoritmik dalgaya yakalanma şansı vardır. Aşağıda olasılık sırasıyla:

### 6.1 TikTok / Reels / YouTube Shorts (En Yüksek Potansiyel)

**Neden:** Kısa video format, "wow" anı için biçilmiş kaftan. Codex Mythologica'nın sayfa çevirme animasyonu doğal "satisfying content".

**İçerik fikirleri:**

| Tip | Örnek | Tahmini Etki |
|---|---|---|
| **ASMR sayfa çevirme** | 30 sn slow page-turn, ambient pink-noise BGM | Yüksek |
| **"POV: 76 myths in your browser"** | Cover → TOC → birkaç bölüm hızlı geçiş | Çok yüksek |
| **Mitoloji "did you know"** | Tek bir öyküden cinematic alıntı + sayfanın görüntüsü | Orta-yüksek |
| **"Built without React"** | Geliştirici kitleye yönelik tech showoff | Orta (dev niş) |
| **Tema değişimi** | Midnight → Parchment → Obsidian transition | Orta |
| **Yaratık alıntıları** | Loki, Anansi, Quetzalcoatl alıntı kartları | Yüksek |

**Strateji:** Haftada **3–5 video.** Her biri 15–45 sn. Hashtag: #mythology #darkacademia #booktok #webdev #folklore #ancientgreece (segment bazlı).

**Önemli:** İlk 30 video genelde flop. 31'inci patlayabilir. Algoritma hacminden değil, video başına ortalama izlenme sürelerinden besleniyor.

### 6.2 Instagram

- **Reels:** TikTok ile paralel
- **Carousel posts:** "10 Myths You Didn't Know From Polynesia" tarzı
- **Stories:** Behind the scenes, geliştirme süreci
- **Profile setup:** Link tree → demo, satın al, e-posta listesi

### 6.3 Pinterest

**Underrated.** Mitoloji + dark academia + book aesthetic Pinterest'te devasa pasif trafik. Pin'ler 6–12 ay sonra hâlâ trafik getirir.

**Strateji:** 50–100 pin oluştur. Her pin 1 öyküden cinematic kapak görüntüsü. Linki demo sayfasına. SEO-optimize başlık.

### 6.4 Reddit

**Dikkatli yaklaş.** Reddit anti-self-promo kültürlü. Spam'sın algılanırsan banlanırsın.

**Doğru yaklaşım:**
- `r/mythology`, `r/Norse`, `r/ancientegypt`, `r/Cthulhu`, `r/folklore` — buralarda 2–3 ay önce *gerçek* katılımcı ol
- Kendi projeni paylaşırken sadece `r/InternetIsBeautiful`, `r/web_design`, `r/javascript` (Showoff Saturday) gibi yapım-paylaşımına açık subreddit'lerde paylaş
- "I built this" formatı: alçakgönüllü, teknik detay, ücretsiz erişim açık

**Beklenti:** Tek bir başarılı r/InternetIsBeautiful postu = 5K–50K trafik, %0.5–2 conversion = 25–1000 indirme.

### 6.5 Mitoloji / Fantezi Toplulukları

- **Discord sunucuları:** D&D, Pathfinder, fantasy writers, mythology enthusiasts. Sunucu kuralları izin veriyorsa paylaş.
- **Worldbuilding forumları:** WorldAnvil, Reddit r/worldbuilding
- **Goodreads:** Mythology grupları, "free book" şeklinde paylaş (ama hak ile yapılırsa)

### 6.6 SEO / Blog Stratejisi

**Uzun vadeli ama güçlü.** SEO 6–12 ayda demlenir.

**İçerik fikirleri (sıralı):**
1. "Why I Built a 76-Myth Interactive Codex Without React" — Hacker News + r/programming
2. "The Twelve Animals of the Chinese Zodiac (Full Story)" — yüksek arama hacmi
3. "Norse Mythology Reading List for Beginners" — affiliate + kendi link
4. "How to Build a 3D Page Turn in Pure CSS" — dev kitle SEO
5. Her medeniyet için 1 master post → her postta öyküye link

**Hedef:** Domain authority kur. "mythology stories online" gibi long-tail anahtar kelimelerde sıralan.

### 6.7 AI-Üretilmiş Sinematik Trailer

**Çok güçlü taktik.** Suno (müzik) + Runway/Pika (görsel) + ElevenLabs (anlatıcı ses) → 60 saniyelik fragman.

```
0:00–0:08  Karanlık ekran, mum yanma sesi
0:08–0:18  "Before the cities of men..." voice-over
0:18–0:35  Cinematic shot'lar: alev, taş, deniz, kitap açılışı
0:35–0:50  Sayfa çevirme, ekrana metnin gelmesi
0:50–0:60  "Codex Mythologica. Now reading at [URL]"
```

Bu trailer:
- YouTube ana video
- TikTok kısaltma (30 sn)
- Instagram Reel (15 sn)
- Twitter/X video tweet
- LinkedIn (dev/tech kitle)

### 6.8 Visual Storytelling

Her hafta 1 öyküden sinematik görsel hikaye paylaş — TikTok carousel, Instagram carousel, Pinterest pin. **Sürdürülebilir içerik kazığı.**

### 6.9 Marketing Bütçesi (gerçekçi)

| Kanal | Aylık Bütçe (önerilen) | Beklenen ROI |
|---|---|---|
| Organik (TikTok, Reels) | $0 (sadece zaman) | Asimetrik — ya sıfır ya patlama |
| TikTok Spark Ads | $50–200/ay | 1.5×–3× ROI mümkün |
| Pinterest Ads | $30–100/ay | Slow burn ama kalıcı |
| Reddit Ads | $50/ay (test) | Genelde zayıf |
| Google Ads | **Yapma** — anahtar kelime başına $1+ pahalı, niş için ROI negatif |

> **Not:** Sıfır bütçeyle de başlanabilir. İlk 90 gün **sadece organik içerik** önerilir. Ne çalışıyor öğren, sonra ödenen mecraya ölçeklendir.

---

## 7. Teknik Ölçeklenme Planı

Mevcut Codex Engine zaten bir **content-agnostic platform**. Sadece content + metadata değiştirerek yeni kitaplar çıkarılabilir.

### 7.1 Üretim Otomasyonu

```
content/
├── mythology-data.js
├── stories.js
└── stories-extended.js
```

Bu yapı **template'leştirilebilir**:

```bash
codex-cli new --title "Bestiary of the Hollow Ages" --slug bestiary
# → content-bestiary/ klasörü, doldurulmaya hazır
```

### 7.2 Şablon Sistemi

**3 şablon:**

1. **Mythology Codex** (mevcut) — bölümler + medeniyet metadata
2. **Bestiary** — yaratıklar + istatistik bloğu + "habitat / lore" alanları
3. **City Codex / Worldbuilding** — bölgeler + karakterler + olaylar + harita

### 7.3 AI İçerik Pipeline

**Yarı-otomatik akış (insanın editör olduğu):**

```
1. Outline (insan): Konu, ton, tema, kelime sayısı hedefi
        ↓
2. Draft (AI — Claude / GPT): İlk taslak
        ↓
3. Edit (insan): Kalite kontrolü, tutarlılık, ton
        ↓
4. Stylize (AI): Eski-stil edebî dil yakınlaştırması
        ↓
5. Final pass (insan): Yayınlanabilir hâle getirme
        ↓
6. Format (script): Otomatik JS object dönüştürme
```

**Her bölüm için ortalama süre:** 30–60 dk (şablon + AI + edit). 50 bölümlük yeni kitap: ~3–5 hafta tek kişilik proje.

### 7.4 Asset Üretimi

- **SVG sigil/logo:** AI image (Midjourney/DALL-E) → Inkscape vectorization → CSS optimize
- **Sayfa süslemeleri:** AI üretim → manuel temizlik
- **Fragman görselleri:** Runway, Pika, Stable Diffusion video
- **Müzik/ambient:** Suno, Mubert (CC-BY veya kendi royalty)

### 7.5 Çoklu Dil Desteği

**Phase A — basit:** Her bölüm için `_tr` ve `_en` versiyonları aynı story object'inde:

```js
{
    id: "prometheus",
    civilization: "greek",
    locales: {
        en: { title: "...", subtitle: "...", content: [...] },
        tr: { title: "...", subtitle: "...", content: [...] }
    }
}
```

**Phase B — gelişmiş:** AI çeviri pipeline. DeepL veya Claude ile **toplu çeviri**, sonra dilbilen editör pass'i.

**Talep:** İngilizce dünya kitlesi + Türkçe yerel kitle = en azından x2 erişim.

### 7.6 Toplu Yayınlama Sistemi

```
codex-cli build --target gumroad   # ZIP arşivi oluşturur
codex-cli build --target itch       # Itch ZIP + manifest
codex-cli build --target portfolio  # Portfolyoya kopya + iframe meta
codex-cli build --target pdf        # Static PDF rendering
codex-cli build --target epub       # EPUB v3 conversion
```

Her yayın hedefi için tek tuşla derleme. **3 saatlik geliştirme yatırımı, gelecekteki her kitap için 3 gün tasarruf.**

### 7.7 Analytics

- **Plausible** veya **Umami** (privacy-friendly, GDPR uyumlu)
- Sayfa başına metrikler: hangi öyküler en çok okunuyor, drop-off noktaları, theme tercih dağılımı
- A/B test: fiyat noktası, CTA metni, hero görsel

### 7.8 Bakım Yükü

Önemli: bu otomasyon **bir kez kurulur**, sonra **minimum bakım** ister. Her yeni kitap için:

| Görev | Süre |
|---|---|
| İçerik üretimi (AI + edit) | 2–4 hafta |
| Şablon doldurma | 2 saat |
| Test + cilalama | 4 saat |
| Yayın + dağıtım | 2 saat |
| **Toplam** | **3–4 hafta / kitap** |

Yılda 4–6 kitap mümkün → katalog hızla büyür.

---

## 8. Riskler ve Problemler

### 8.1 Telif Hakkı

**Mitoloji = public domain.** Yunan, Norse, Mısır vb. binlerce yıllık. Ham kaynak güvenli.

**Riskler:**
- **Modern bir yazarın retelling'inden kelime kelime alıntı:** YAPMA
- **İllüstrasyon:** Stock görsellerin telif kontrolü, AI görsellerin training data tartışması
- **Yazı tipi:** Google Fonts SIL Open Font License — güvenli. Ticari kitaplara uygun
- **Audio:** Suno, Mubert — ticari haklarını dikkatlice oku

### 8.2 AI İçerik Kalite Riski

| Risk | Etkisi | Hafifletme |
|---|---|---|
| Generic ton | Marka itibarı | İnsan editör, ton tutarlılığı |
| Olgu hataları | Güvenirlik kaybı | Fact-checking pass |
| Tekrarlanan kalıplar ("In a world where...") | "AI yazmış" damgası | Çeşitlilik kontrolü, üslup düzenleme |
| Hallucination (uydurma mit detayı) | Güvenirlik | Wikipedia + akademik kaynak ile karşılaştır |

**Test yöntemi:** Yayın öncesi 5 öyküyü alanın bir uzmanına (mitoloji öğretmeni, fantezi yazarı) gönder. Geri bildirim al.

### 8.3 Discoverability

**En büyük risk.** Harika ürün + sıfır görünürlük = $0 satış.

**Önlemler:**
- 90 gün organik içerik üretimi
- Email listesi başlat (Buttondown $9/ay veya ConvertKit free tier)
- Indie creator topluluklarına gir (Indie Hackers, Makerlog, hashtag #buildinpublic)
- Sektörel newsletter'lara denk gel (e.g. The Sample, Refind)

### 8.4 Ödeme İşleme

| Sorun | Türkiye Bağlamı | Çözüm |
|---|---|---|
| Stripe doğrudan kullanılamaz | TR'de Stripe Atlas dışında zor | Gumroad / Lemon Squeezy MoR olarak çalış |
| PayPal kısıtlamaları | Aktif ama limit ve iade riski | Yedek olarak tut |
| KDV/VAT yükümlülüğü | AB satışları için karmaşık | Lemon Squeezy halleder |
| Kur farkı | TL volatilitesi | USD'de fiyatla, EUR'da satış kabul et |
| Türk müşteri ödeme | Kredi kartı ile sorun olabilir | Iyzico, Shopier alternatifleri |

### 8.5 Piracy

Kabul et: **HTML kitap kopyalanabilir**. Engelleyemezsin.

**Bilinen veriler:**
- Indie game piracy oranı: %30–60
- Ebook piracy oranı: %20–40 (popüler başlıklar için)
- **Pirate'lerin %5–10'u sonradan ödüyor** (Humble Bundle, Patreon vb.)

**Felsefe:** Piracy'i bedava pazarlama olarak gör. 1.000 indirilen pirate kopya = belki 50 kişi seni keşfeder, 5 kişi ileride alır. Net pozitif.

### 8.6 Düşük Conversion Oranı

Indie ebook ortalaması: **landing visitor → satın alma %0.5–2**. Yani 1.000 trafik → 5–20 satış. $9 fiyatla: $45–180.

**Bu istatistik bilinmesi gereken çıplak gerçek.**

İyi haber: trafik organik kanallardan birikmeye başlayınca compounding.

### 8.7 Platform Bağımlılığı

Tek platforma kilitlenme = risk:
- Itch.io politika değişirse?
- Gumroad komisyonları artırırsa? (zaten yaptılar)
- TikTok hesabı banlanırsa?

**Çözüm:** Diversify.
- En az 2 satış kanalı
- Email listesi (yapay zeka algoritmasından bağımsız)
- Kendi domain + portfolyo (kontrol ettiğin alan)
- Açık kaynak GitHub (yedek erişim)

### 8.8 Burnout

Tek başına yaratıcı + pazarlamacı + geliştirici + müşteri destek olmak yorar. **6 ayda enerji düşüşü tipik.**

**Önlemler:**
- Üretim hızını batchle (1 hafta yaz, 1 hafta yayınla, 1 hafta dinlen)
- Otomasyonu öncele
- Beklentileri gerçekçi tut

---

## 9. En Mantıklı Yol Haritası (3–6 Ay)

Bu bir **düşük-risk, yüksek-öğrenme** yol haritası. Para kazanmaktan önce **talebi doğrulamak** üzerine kurulu.

### Ay 0 — Hazırlık (1 hafta)

- [ ] Codex Mythologica'yı GitHub'a public yap (MIT veya custom dual license)
- [ ] Domain seç: `codexmythologica.com` veya `codex.emre.dev` (portfolyoya bağla)
- [ ] Twitter/X + TikTok + Instagram hesaplarını oluştur (handle: `codexmytho` benzeri)
- [ ] Buttondown email listesi kur (free tier)
- [ ] Plausible analytics ekle

### Ay 1 — Yayın + Showcase

**Hafta 1–2:**
- [ ] Portfolyoya `/projects/codex-mythologica` rotası ekle (Aşama 1: showcase)
- [ ] Itch.io'da ücretsiz / PWYW yayın
- [ ] Gumroad'da $9 standard edition (premium algı için, indirim yok)

**Hafta 3–4:**
- [ ] r/InternetIsBeautiful, r/javascript Showoff Saturday, Hacker News Show HN postları
- [ ] LinkedIn ve Twitter'da launch postu (geliştirici kitlesi)
- [ ] İlk 5 TikTok / Reels video (sayfa çevirme ASMR, "I built X without Y", öykü alıntıları)

**Hedef metrikleri:**
- 500+ unique visitor
- 20+ email abonesi
- 5–20 organic mention
- **0–50 dolar gelir (önemli değil; öğrenme amaçlı)**

### Ay 2 — Sosyal Medya + Geri Bildirim

**Sürekli:**
- [ ] Haftada 3–5 video (TikTok, Reels, Shorts)
- [ ] Pinterest'e haftada 10–20 pin
- [ ] Email listesine 2 haftada bir behind-the-scenes update

**Bir kez:**
- [ ] AI sinematik trailer (60 sn) üret
- [ ] r/mythology, r/Norse, r/folklore vs. **gerçek katılımcı** ol (paylaşım sonra)
- [ ] İlk müşterilere yorum/feedback iste (Gumroad message)

**Hedef:**
- Email listesi: 100+
- Sosyal medya toplam takipçi: 500–2.000
- Yeni 10–50 satış

### Ay 3 — Validasyon Noktası

Burada **karar ver:**

| Sinyal | Yorum | Aksiyon |
|---|---|---|
| Email listesi 100+, açma %30+ | Talep gerçek | Devam et, ürün geliştir |
| Sosyal medya engagement var | Marka oluşuyor | İçerik temposunu artır |
| Toplam gelir $200+ | Komvalide | İkinci kitabı planla |
| Toplam gelir < $50, list 30 altı | Talep zayıf | Pivota düşün |
| Trafik geliyor ama satış yok | Conversion problemi | A/B test, fiyat, demo |
| Hiç trafik yok | Pazarlama eksiği | İçerik temposu sorgula |

### Ay 4–5 — Genişletme veya Pivot

**Senaryo A (validasyon güçlü):**
- [ ] İkinci kitabı yaz (Dark Fantasy Bestiary önerilir — RPG kitlesi öder)
- [ ] Patreon hesabı aç (mevcut müşteri tabanına 24-saat erken erişim)
- [ ] Birinci kitabı Türkçeye çevir (yerel pazara yayıl)

**Senaryo B (validasyon orta):**
- [ ] Daha agresif sosyal medya (haftada 7+ video)
- [ ] $50/ay TikTok Spark Ads test
- [ ] Mevcut kitabı premium'a yükselt: ek 10 öykü, yeni tema, "Volume I Director's Cut"

**Senaryo C (validasyon zayıf):**
- [ ] Kullanıcılarla derinlemesine konuş (5–10 yorum / e-posta)
- [ ] Format değişikliği: belki PDF + audio bundle daha iyi conversion verir
- [ ] B2B pivot: "Codex Engine" template olarak sat (yazarlara, indie publisher'lara)

### Ay 6 — Ekosistem veya Çıkış

**3 yol:**

1. **Yıllık katalog yaratıcısı:** Yılda 4–6 kitap, gelir $5K–20K, sürdürülebilir yan iş
2. **Platform pivotu:** Codex Engine'i sat (B2B SaaS), kitap sadece showcase
3. **Portfolyo silahı:** Direkt kitap satışını çekirdek odak yapma; freelance/iş başvurularında "şuna bak" diye göster, kazanç oradan gelsin

### Bütçe (toplam 6 ay)

| Kalem | Maliyet |
|---|---|
| Domain + hosting (Vercel free tier) | $20 |
| Email tool (Buttondown free, $9 sonra) | $0–54 |
| Analytics (Plausible $9/ay) | $54 |
| Suno / Pika / video tools | $20–60 |
| Lemon Squeezy / Gumroad | %5–10 satıştan |
| Reklam (opsiyonel test) | $0–600 |
| **Toplam zorunlu** | **$100–200** |
| **Toplam dahil reklam** | **$700–1.500** |

### Beklenen Gerçekçi Sonuçlar (6 ay sonu)

| Senaryo | Olasılık | Gelir | Email listesi | Sosyal Takipçi |
|---|---|---|---|---|
| Pesimistik (en muhtemel) | %40 | $50–500 | 100–300 | 500–1.500 |
| Orta (mümkün) | %35 | $500–3.000 | 300–1.000 | 1.500–8.000 |
| İyimser (şanslı) | %20 | $3.000–15.000 | 1.000–5.000 | 8.000–50.000 |
| Viral (nadir) | %5 | $15.000+ | 5.000+ | 50.000+ |

> **Önemli:** Pesimistik bile **net pozitif** çünkü yatırım çoğunlukla zaman, parasal yatırım minimum, ve portfolyo değeri her durumda artar.

---

## 10. Final Sonuç

### Genel Değerlendirme

Codex Mythologica **teknik ve estetik olarak ciddi bir iş**. AI ile üretilen tipik içerik denizinde belirgin biçimde ayrışıyor. Bu, satılma şansını yükseltir — ama **şansı garantiye dönüştürmez**.

### Yapılması Gerekenler (önem sırasıyla)

1. **Hemen şimdi:** Portfolyoya entegre et. Bu en yüksek garantili ROI'dır — freelance/iş kazanımı tek bir kitap satışından dolarca daha kıymetli.
2. **1 ay içinde:** itch.io ücretsiz PWYW + Gumroad $9 ikili kanal yayını.
3. **3 ay içinde:** Sosyal medya temposunu (TikTok / Reels) sürekli kıl. Email listesi başlat.
4. **6 ay içinde:** Validasyon noktasında karar ver: katalog mı, platform mı, portfolyo silahı mı.

### Yapılmaması Gerekenler

- ❌ **Erken Shopify mağazası kurma.** Tek üründe overkill.
- ❌ **Erken hesap/login sistemi.** Sürtünme + bakım yükü.
- ❌ **Amazon KDP'ye taşıma.** İnteraktif HTML kitap o platforma sığmaz; AI etiketi de sorun.
- ❌ **Reklam bütçesini önceden harcama.** Önce organik nelerin işe yaradığını bul.
- ❌ **Tek başına 6+ kitap yaz, sonra yayınla.** İlki doğrulanmadan ikinciyi yazmak risk.
- ❌ **Piracy'le savaşmak için DRM yatırımı.** Faydadan çok zarar.
- ❌ **"Bu kitap her şeyi değiştirecek" beklentisi.** Çoğu zaman değiştirmez. İkinci ya da üçüncü ürün döner.

### En Akıllı Strateji (tek paragrafta)

> **Codex Mythologica'yı portfolyo merkezindeki "showcase silahı" olarak konumlandır.** Bedava itch.io / PWYW Gumroad ile pazara çık. Asıl amaç: **e-posta listesi inşa etmek**, satış değil. 90 gün sosyal medya organik içerik dene. Eğer 100+ aboneye ve 50+ ücretli müşteriye ulaşırsan, ikinci kitap (Dark Fantasy Bestiary) için hazırsın. Eğer ulaşmazsan, format/niş/conversion'ı revize et — ama portfolyo değerini her durumda kullan: bu proje **freelance dev olarak görünürlüğünü, junior+ pozisyon başvurusu yaparken farkını, ve Türkiye'de seyrek olan "premium dijital yayın deneyimi inşa edebilen geliştirici" konumunu doğruluyor.** Bu konumdaki bir geliştirici, yıllık $20K–80K freelance kazanç penceresinde durur. Tek kitabın doğrudan geliri buna kıyasla küçük kalır — ama kombinasyon güçlüdür.

### En Yüksek Başarı Olasılığı Nerede?

| Strateji | Başarı Olasılığı | Beklenen 1-Yıl Geliri |
|---|---|---|
| **Sadece kitap satışı** (tek ürün) | %15 | $200–2.000 |
| **Kitap serisi** (4–6 ürün, 12 ay) | %35 | $2.000–20.000 |
| **Portfolyo + freelance kanal** | %75 | $5.000–80.000 (dolaylı) |
| **B2B platform/template pivot** | %20 | $0–60.000 (slow burn) |
| **Karma: portfolyo + 1–2 kitap + email listesi** | %60 | $3.000–25.000 (toplam) |

**En yüksek beklenen değer: karma strateji.** Tek bir noktaya yatırma; 3 ayağı paralel çalıştır.

### Kapanış

Bu proje **harika bir teknik eser** ve **ekonomik olarak küçük-orta ölçekli sürdürülebilir bir gelir kanalı**. Ama bu projenin asıl değeri rakamla ölçülmez: **ne yapabildiğini kanıtlayan bir vitrin**. Bu vitrini doğru sergilemek, doğrudan satıştan beş kat daha fazla getiri sağlayabilir.

Hayalî milyon dolar beklentisi koyma. Üç-altı aylık bir disiplinli deneyim olarak gör. Verileri topla. Bir sonraki kararı verilere göre ver. Bu yaklaşımla hem **kaybetmezsin** hem de **kazanma kapısını açık tutarsın**.

---

*Bu rapor, mevcut pazar koşulları (Mayıs 2026) ve indie creator ekonomisindeki güncel verilere dayanmaktadır. Pazar koşulları hızla değişebilir; 6 ay sonra yeniden değerlendirilmesi önerilir.*

*Codex Mythologica — `~/Downloads/mythology-digital-book` · Kişisel portfolyo entegrasyonu önerisi: `~/Downloads/my-portfolio`*
