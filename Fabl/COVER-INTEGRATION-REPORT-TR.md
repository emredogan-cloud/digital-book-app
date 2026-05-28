# FABL — KAPAK ENTEGRASYONU VE GİRİŞ DENEYİMİ RAPORU

*Tarih: 25 Mayıs 2026 · Durum: doğrulama başarılı, commit + push yapıldı*

Yazarın yüklediği kapak görseli FABL'ın birincil/landing kapağı yapıldı ve siteye bir "giriş eşiği" eklendi: ziyaretçi önce kapakla karşılaşıyor, "Kitabı Aç" deyince kodeks açılıyor. **Motor LOCK korundu** — sayfa çevirme, paginasyon, tipografi, okuma mekaniği, performans mimarisi ve kitap içi hiç değişmedi.

---

## 1. Kapak Nasıl Entegre Edildi

- **Kaynak:** Yazar `Fabl_kitap_kapağı.png` dosyasını (1054×1492, 2,7 MB PNG) köke ekledi. Bu dosya **arşiv/master** olarak kökte korundu (siteye referans verilmiyor).
- **Servis edilen varlıklar:** `assets/cover.webp` (birincil) + `assets/cover.jpg` (yedek) — ASCII adlarla (Türkçe karakterli dosya adı URL sorununu önlemek için).
- **İşaretleme:** `<picture>` ile WebP kaynağı + JPEG yedeği. Görsel `width="1054" height="1492"` öznitelikleriyle verildi (oran baştan biliniyor → yerleşim kayması yok).
- **Erken getirme:** `<link rel="preload" as="image" type="image/webp" fetchpriority="high">` ile WebP daha ilk boyamadan yükleniyor.
- **Kitap kimliği:** `og:image` + `twitter:card` eklendi (paylaşım önizlemesi için).
- **İzolasyon:** Tüm kapak biçimi `styles/cover.css` içinde; motor CSS/JS dosyalarına dokunulmadı. Git doğrulaması: `scripts/`, `styles/main.css`, `styles/animations.css`, `styles/themes.css`, `content/` → bir önceki commit ile **bayt-bayt aynı**.

## 2. Giriş Akışı Değişiklikleri

| Önce | Sonra |
|------|-------|
| Site açılır → yükleyici → doğrudan kodeks | Site açılır → **tam ekran kapak eşiği** → "Kitabı Aç" → kodeks |

- Eşik (`#cover-gate`) en üstte (z-index 300); kodeks **onun ardında, görünmeden kurulur**. Böylece "Kitabı Aç" anında açılır (build beklenmez).
- **Etkinleştirme:** butona tıklama · kapağa dokunma · klavyede Enter/Space. Eşik 600 ms'lik bir opaklık geçişiyle solar, kodeks belirir.
- Eşik açıkken kodeksin klavye gezinmesi perde arkasında **donduruldu** (yakalama fazında ok/space/kısayol tuşları yutuluyor) — kapak gerçek bir eşik gibi davranıyor.
- Kodeksin kendi iç kapak sayfası (amblem + başlık) ve tüm okuma deneyimi **aynen korundu**; bu dış kapak onun önünde bir şömiz/ceket gibi duruyor.

## 3. Performans Etkisi

- **Giriş yükü:** WebP **168 KB** (tarayıcıların ~%97'si) ya da JPEG 465 KB yedek (~%3); + `cover.css` ~3 KB + ~1 KB satır içi JS.
- **Ağır animasyon yok:** tek bir GPU-dostu opaklık geçişi; `prefers-reduced-motion` → anlık (animasyonsuz).
- **CLS yok:** sabit tam ekran konteyner + `width/height` öznitelikleri → kutu, görsel yüklenmeden ayrılıyor.
- **Beyaz parlama yok:** eşik zemini ilk boyamadan koyu; `decoding="async"`, `fetchpriority="high"`.
- **Render gecikmesi yok:** ek font yok, motorda ek iş yok, kodeks arka planda kuruluyor.

## 4. Mobil + Masaüstü Doğrulama

> **Yöntem:** Bu ortamda headless tarayıcı bulunmadığından doğrulama statik analiz + yerel statik sunucu (Vercel eşdeğeri) ile yapıldı. Piksel düzeyinde son göz kontrolü Vercel preview'da önerilir.

- **Sunucu:** `/`, `/assets/cover.webp` (image/webp), `/assets/cover.jpg` (image/jpeg), `/styles/cover.css` (text/css) → hepsi **200**, doğru MIME.
- **Motor bütünlüğü:** motor dosyaları git ile bayt-bayt aynı; tüm motor/içerik JS ve satır içi eşik betiği `node --check` ile sözdizimsel olarak temiz.
- **Masaüstü:** dikey görsel yükseklikle sınırlanır (`max-block-size: 80vh`), ortalanır; "Kitabı Aç" altında — kitabı sunan bir tezgâh hissi. Yatay kaydırma yok.
- **Mobil:** görsel genişlikle sınırlanır (`max-inline-size: 92vw`), kapağa dokunarak da girilir; `max-height: 560px` altında görsel küçülüp butona yer açar. Taşma yok.
- **Vercel uyumu:** saf statik dosyalar, yapılandırma gerektirmez; `<picture>`/WebP/preload standart ve desteklenir.

## 5. Uygulanan Optimizasyon

| Dosya | Boyut | PNG'ye göre |
|-------|------:|------------:|
| `Fabl_kitap_kapağı.png` (master) | 2.759 KB | — |
| `assets/cover.webp` (birincil) | **168 KB** | −94% |
| `assets/cover.jpg` (yedek) | 465 KB | −83% |

- **WebP:** kalite 86, `method=6` (en yüksek sıkıştırma çabası), meta veri temizlendi.
- **JPEG:** kalite 88, **4:4:4** renk örnekleme (altın başlık kenarları net kalsın), progressive, siyah üstüne düzleştirme, meta temizlendi.
- **Bütünlük:** görünür kayıp yok; **bozma/germe/zararlı kırpma yok** — `object-fit` yerine `max-*` + `auto` ile oran korunarak ölçekleniyor.
- Yeniden kodlama gerekirse diye orijinal master saklandı.

---

## Notlar / Sonraki adımlar için öneri

- `og:image` şimdilik göreli yol; **yayın alan adı belli olunca mutlak URL** yapılmalı (sosyal önizlemenin garantili çalışması için).
- Eşik **her girişte** görünür (kasıtlı: "kitaba yaklaşma" hissi). İstenirse, daha önce giren/okuma ilerlemesi olan ziyaretçide eşiği atlamak için küçük bir `localStorage` kontrolü eklenebilir.
- Görsel, gelecekte birden çok çözünürlükte (`srcset`) sunulabilir; mevcut tek 1054×1492 varlık tüm hedef ekranlar için yeterli ve en yalın çözüm.
