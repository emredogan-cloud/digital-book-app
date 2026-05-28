# SARMAŞIK · NAZAR — Kapak Promptu 3/3 · SOSYAL / PAZARLAMA ADAPTASYONU

> 2:3 kitap kapağı değil — **kampanya/sosyal** formatlar. Aynı çekirdek kimlik (göz-aperture + boşluk + panoptikon kent), farklı oran ve kadrajlarda. Başlık yerleşimi (lockup) ve hareket (teaser) notları dahil.

## Kısa Görsel Yön Notu
Sosyal görseller daha **dar kadraj** ve daha güçlü **tek-imge** ister. Çekirdek motifi (gözetim açıklığı + merkezdeki boşluk) bir "marka amblemi" gibi kullan; etrafında nefes alan koyu negatif alan bırak (üzerine başlık/etiket binebilsin). Üçleme tutarlılığı: aynı palet, aynı göz-amblemi her üç kitapta tekrarlanır (BOŞLUK ve KEFARET'te merkez/halka farklılaşır).

## Önerilen Renk Ailesi (kanon paletten)
Void `#05080c`; çelik `#44586a`; sinyal camgöbeği `#4fbcce`–`#5fd0e2`; sodyum kehribarı `#c8923c`; kemik `#dde3e8`; alarm pası `#a23b30` (çok seyrek). Sosyal küçük-ölçekte okunaklılık için kontrast yüksek tutulur.

## Formatlar ve Kadrajlar
- **Kare 1:1** (feed): merkez göz-aperture amblemi tam ortada; alt bantta başlık lockup'ı için boşluk.
- **Dikey 9:16** (story/reels): üstte göz-amblem, ortada dikey "sinyal damarı"/tarama akışı, altta panoptikon kent şeridi; üst ve alt güvenli alanlar (UI için) boş.
- **Yatay 16:9** (banner/kapak görseli/yarı-X): solda göz-amblem, sağda geniş koyu negatif alan (başlık + alt başlık lockup'ı).

## Başlık Lockup'ı (tipografi yön notu — görsele sonradan bindirilir)
- Üst satır, letterspaced sans: **SARMAŞIK** (camgöbeği `#82a8b4`, geniş harf aralığı).
- Ana satır, serif (Cormorant Garamond/Marcellus): **NAZAR** (kemik `#e7eaee`, iri).
- Alt satır, monospace (IBM Plex Mono): **SARMAŞIK ÜÇLEMESİ · BİRİNCİ KİTAP** (gri-mavi `#6f8794`).
- Tagline (opsiyonel): *“Görülmek, işaretlenmektir.”*

---

### PROMPT — Kare 1:1 (feed key-art)
**TR:** Sosyal medya anahtar görseli, kare 1:1. Tam merkezde, bir marka amblemi gibi, gözetim kamerası diyaframına dönüşmüş simetrik bir göz; iç içe metalik halkalar ve tam ortada ışık yutan kapkara bir boşluk. Çevresinde geniş, sade, koyu negatif alan; çok ince tarama-satırı dokusu ve hafif yağmur granı. Palet: void-siyahı taban, tek soğuk camgöbeği sinyal aksanı, çok hafif sodyum-kehribarı kenar parıltısı. Yüksek kontrast, düşük doygunluk, prestijli ve uğursuz. Üst ve alt bantlar başlık/etiket için temiz. Metinsiz.
**EN (render-ready):** Social key-art, square 1:1. Dead center, like a brand emblem, a symmetrical eye turned into a surveillance-camera diaphragm; concentric metallic rings and a light-swallowing pure-black void at the very center. Around it, wide clean dark negative space; very fine scan-line texture and light rain grain. Palette: void-black base, one cold cyan signal accent, a faint sodium-amber rim glow. High contrast, low saturation, prestige and ominous. Top and bottom bands clean for title/labels. No text. --ar 1:1 --style raw

### PROMPT — Dikey 9:16 (story / reels)
**TR:** Dikey sosyal görsel 9:16. Üstte, gözetim diyaframına dönüşmüş göz ve merkezdeki kara boşluk; ondan aşağıya doğru ince, dikey bir "sinyal damarı" ve soluk veri-akışı/tarama satırları iniyor; en altta sis ve yağmur içinde uzak bir gözetim metropolünün ince şeridi (kuleler, köprü silüeti). Üst ve alt %15 güvenli alan boş ve sade (arayüz için). Palet: void-siyahı, çelik, tek camgöbeği aksan, uzak sodyum parıltı. İnce grain, hacimsel ışık, soğuk ve prestijli. Metinsiz.
**EN (render-ready):** Vertical social image 9:16. Top: the eye-as-surveillance-diaphragm with the central black void; from it a thin vertical "signal thread" and faint data-stream/scan-lines descend; at the bottom, a thin strip of a distant surveillance metropolis in mist and rain (towers, a bridge silhouette). Top and bottom 15% safe areas kept clean and simple (for UI). Palette: void-black, steel, one cyan accent, distant sodium glow. Fine grain, volumetric light, cold and prestige. No text. --ar 9:16 --style raw

### PROMPT — Yatay 16:9 (banner)
**TR:** Yatay banner 16:9. Solda, gözetim diyaframına dönüşmüş göz ve merkezdeki kara boşluk; sağda geniş, sade, koyu negatif alan (başlık lockup'ı için). Arka planda çok soluk panoptikon kent ufku ve tarama satırları. Palet: void-siyahı taban, tek camgöbeği sinyal aksanı, uzak sodyum-kehribarı parıltı. Yüksek kontrast, düşük doygunluk, sinematik letterbox hissi. Metinsiz.
**EN (render-ready):** Horizontal banner 16:9. Left: the eye-as-surveillance-diaphragm with the central black void; right: wide clean dark negative space (for the title lockup). Background: a very faint panopticon city horizon and scan-lines. Palette: void-black base, one cyan signal accent, distant sodium-amber glow. High contrast, low saturation, cinematic letterbox feel. No text. --ar 16:9 --style raw

### Hareket / Teaser Notu (opsiyonel, video)
Diyafram **yavaşça kısılır**, merkez boşluk büyür; tarama satırları akar; tek bir camgöbeği sinyal damarı yatay geçer ve merkez boşlukta **kaybolur** (sistemin onu yitirmesi). 3–5 sn, sessiz, ağır; sonunda başlık lockup'ı belirir. `prefers-reduced-motion` için statik kare.

### Kaçınılacaklar
Küçük ölçekte okunmayan detay kalabalığı · neon-cyberpunk doygunluğu · stok "hacker kapüşonlu adam" klişesi · bozuk/çarpık yazı · tanınır gerçek marka/şehir · aşırı parlak/plastik render · güvenli alanlara taşan kritik öğeler.
