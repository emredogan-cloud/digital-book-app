# SESSION-HANDOVER — SARMAŞIK / NAZAR

*Bu oturumun tam hafızası. Sonraki ajan: ÖNCE bunu, sonra `CANON-LOCK.md` + `AGENT-MEMORY.md` + `DEPLOY-STATE.md`'yi oku. Tarih: 2026-05-27.*

---

## 0. 30 saniyelik özet
**SARMAŞIK** = Türkçe siber-noir tekno-mit / intikam **üçlemesi**. **Birinci Kitap "NAZAR" YAZILDI ve BİTTİ** (Prolog + 15 bölüm), statik "dijital kodeks" web okuyucusu olarak çalışıyor, GitHub'a push edildi. Kapaklar entegre (ama **yer-tutucu yanlış başlık** taşıyorlar — düzeltme promptları hazır). **Book II'ye BAŞLAMA** (yazar izni gerek). Çıktı dili: **Türkçe**.

## 1. Proje
- Seri **SARMAŞIK**: **I · NAZAR** (✅ bitti) · **II · BOŞLUK** (planlı) · **III · KEFARET** (planlı).
- Tür/DNA: sinematik tekno-mit; "sistemlere inanan adam → inancını yitirir → sistemin göremediği boşluğa dönüşür." Güç fantezisi değil; devlet formidable; her tırmanış bedelli.
- Platform: vanilla-JS statik kodeks (kardeş `tuzun-hafizasi`'ndan klonlandı), namespace `window.SARMASIK`, siber-noir tema, ön+arka kapaklı eşik.

## 2. Oturum kronolojisi (ne yapıldı, sırayla)
1. **Planlama (yazıma kadar):** Master blueprint → 2 yapısal revizyon (final-revision + changelog) → DNA/sinematik geçiş (DNA-REVISION + CINEMATIC overlay) → final-mini-revision → **BOOK-I-CONSTITUTION** (yöneten belge). Tümü `reports/` altında.
2. **Yürütme — Platform:** kardeş motor kopyalandı, ad alanı `TUZ→SARMASIK`, depo öneki `intikam-yemini:`, `themes.css` siber-noir'e temalandı, `novel-data.js` (5 hareket) + `finalize.js`, `index.html` uyarlandı, vektör `cover.svg`.
3. **Yürütme — Book I yazımı:** 8 fazda Prolog + 15 bölüm. **Her faz = 2 bölüm + zorunlu 7-nokta QA + commit/push** (Vercel). Kayıp-katmanlaması, deniable-ölüm imzası, Vedat predator>villain, "kimse bağırmadan", "her kurtarma öldürür", suç ortaklığı (GÖZ→göz) sırasıyla işlendi. Faz 7 apeks (Eylül, özne, cheap-tragedy yok), Faz 8 final (eksilme / BOŞLUK'un ilk nefesi — manifesto/yemin/savaş YOK).
4. **Finalize (post-release):** kapak entegrasyonu (ön+arka), uçtan uca denetim (tek objektif düzeltme: cenaze sayımı), 4 devir dokümanı.
5. **Kapak-prompt hazırlığı:** 6 kitabın hepsi için **FINAL-COVER-PROMPTS-TR.md** (3 ön + 2 arka, GPT Images 2.0, metinsiz) + üst dizinde **FINAL-COVER-PROMPT-INDEX-TR.md**. *Görsel üretilmedi; bu faz commit edilMEDİ.*

## 3. YAPILANLAR (envanter)

### Manuscript — Prolog + 15 bölüm (`content/chapter-NN.js`)
| Dosya | Başlık | Hareket | Çekirdek |
|---|---|---|---|
| 00 | Eşik (Prolog) | esik | Gelecekte Vedat; sistem göremediğine **BOŞLUK** adını verir (mit-nefesi) |
| 01 | Sayan Adam | catlak | Sıradan/istisnai Kerem; fark eden zihin; sisteme inanç |
| 02 | Korkmuş Bir Adam | catlak | Onur sızıntıyı getirir; "doğru yol"; "sen hep doğruyu söylersin" |
| 03 | Eşleşme | catlak | Kerem kendi kodunu tanır (suç ortaklığı şafağı) + sahte kurtarış + Büro/Vedat haritalar |
| 04 | Daralan Çember | catlak | Görünmez baskı; "dur, doğru yapalım" (Onur'u tutar) |
| 05 | Kaza | catlak | Onur'un deniable ölümü; motor ateşlenir (yasal yol kararı) |
| 06 | Korkmayan Kadın | usul | Avukat Nesrin; doğru yolun ilk adımı; ilk eksik cümle (omission) |
| 07 | Küçük Zaferler | usul | Gazeteci Defne + savcı Levent; gerçek umut + ilk ince çatlak |
| 08 | Kimse Bağırmadan | usul | Sessiz kapanış; Levent tayin; kanıt buharlaşır; omission davayı zayıflatır |
| 09 | Duvar | usul | Haber ölür; Nesrin baskı; ilk karanlık kıvılcım; Kampanya eşiği |
| 10 | Çark | kampanya | Katmanlı kuşatma; İhsan'a kumpas; ideolojik ölüm; oblik Vedat sorgusu |
| 11 | Düzelir | kampanya | İhsan'ın sessiz ölümü; Nazlı çöküşü; Eylül'e dönen el (eşik) |
| 12 | Susmayan | kampanya | Eylül **özne**; deniable "intihar" (apeks; cheap-tragedy yok) |
| 13 | Sessizlik | kampanya | İç çöküş (savaş değil **boşluk**); Nazlı'nın ölümü; Vedat suikast kararı |
| 14 | Gözü Kuran El | kaybolma | Suç ortaklığı reckoning'i (GÖZ→gözü o kurdu); nihai kapatma gelir |
| 15 | Silinme | kaybolma | Deniable erasure; **kendini silme/eksilme**; BOŞLUK'un ilk nefesi; Book II köprüsü |

### Platform / dosyalar
`index.html` (manifest: novel-data → chapter-00…15 → finalize → storage → book → app) · `content/` (novel-data.js, finalize.js, 16 bölüm) · `scripts/` (app/book/storage — MOTOR, dokunma) · `styles/` (themes.css siber-noir · main/animations.css motor · **cover.css LOCK** · cover-physical.css NAZAR arka-kapak ek) · `assets/` (cover.webp/jpg ön, back-cover.webp/jpg arka, cover.svg eski) · `images/` (yazarın kaynak PNG'leri) · `cover-prompts/` (eski 3 keşif promptu) · `FINAL-COVER-PROMPTS-TR.md` (yeni nihai) · `reports/` (tüm blueprint/DNA/constitution) · `AGENT-MEMORY/PROJECT-STATE/CANON-LOCK/DEPLOY-STATE.md`.

### Commit'ler (origin/main, github.com/emredogan-cloud/intikam-yemini)
`a8e7b4c` Faz1 · `de1e143` Faz1-devam · `adf9f73` Faz3 · `8d785e9` Faz4 · `2c6fca3` Faz5 · `c479939` Faz6 · `83807ed` Faz7 · `cd4a118` Faz8 (NAZAR bitti) · `88df835` final post-release (kapak+denetim+devir).

### Kapak-prompt setleri (6 kitap + dizin)
Her kitap kökünde `FINAL-COVER-PROMPTS-TR.md` (3 ön + 2 arka) · üst dizinde `FINAL-COVER-PROMPT-INDEX-TR.md`. **Bunlar henüz commit edilmedi** (intikam-yemini'ninki bu devir commit'ine girecek; kardeş kitaplarınkiler kendi repolarında untracked).

## 4. ŞU ANKİ DURUM
Book I **TAMAM & KİLİTLİ**, site dolu ve push'lu. Kapaklar entegre **ama yanlış başlık taşıyor** (bkz. Bilinen Sorunlar). Tüm 6 kitap için **metinsiz** değiştirme kapak promptları hazır. Denetim temiz (cover.css LOCK md5 kardeşle aynı; tüm JS geçerli).

## 5. YAPILACAKLAR (sonraki ajan)

### (A) KAPAK YENİLEME → ENTEGRASYON  *(en yakın iş)*
1. Yazar, `FINAL-COVER-PROMPTS-TR.md`'den **metinsiz** ön+arka görseller üretip kitap köküne bırakır (GPT Images 2.0, 1024×1536).
2. Entegrasyon fazı: görseli optimize et (`convert … cover.webp` + `cover.jpg`; back-cover aynı) → `assets/`'a koy → `index.html` `<picture>` zaten webp+jpg bekliyor (ön); arka `cover-physical.css`'in `.book3d__back` arka-plan görselini kullanır → **başlık "NAZAR"/yazar DİZGİDE eklenecek (görsele gömme)** → serve+200/CLS doğrula → commit+push.
3. `og:image`'ı mutlak URL'ye çevir (alan adı belliyse).

### (B) BOOK II — "BOŞLUK"  *(yazar izniyle)*
- Yay: boşluk operatöre dönüşür — YAVAŞ, bedelli, hak edilmiş (asla doğuştan elit). Yeni: **Bahri** (mentor), **NÖBETÇİ** (Kerem kurar; bilinçsiz ops yoldaşı, yalnızlık belirtisi, zehirlenebilir), **TİLKİ/Sıla** (hacker), dron/negatif-uzay tekno (tutarlı yakın-gelecek; tavanlar: sentient YZ/zırh/ordu/sihir YOK).
- Görünürlük eğrisi: görünmez → inkâr (II); anomali → ulusal → jeopolitik (III).
- Vedat: av başlar; ayna-yöntem; BOŞLUK'un kendi yarattığı (ailesini yok ettiği adam) olduğunu anlar.
- **Ödenecek açık iplikler:** Eylül'ün okunmamış mesajı · Defne'nin sakladığı tanıklık · Kerem'in suç ortaklığı-bilgisi (silah+suçluluk) · Vedat'ın iki kez bakmadığı boşluk.
- Üçleme finali (kilitli yön): B+C bileşimi — ışığı/ifşayı seçer, bedel öder, ama ifşa sistemi yalnızca yaralar (kategori hatası).

### (C) Kardeş kitap kapak-promptları
Gerektiğinde her kardeş kitabın `FINAL-COVER-PROMPTS-TR.md`'si kendi reposunda commit edilir (entegrasyonla birlikte).

### (D) Vercel
Deploy doğrulanamadı (MCP kapsam hatası). Repo Vercel'e bağlı değilse **tek seferlik GitHub→Vercel import** gerekebilir. Bkz. `DEPLOY-STATE.md`.

## 6. ANAHTAR KURALLAR (kısa)
- **Bölüm ekleme:** `content/chapter-NN.js` → `window.SARMASIK.entries.push({id,title,subtitle,category,themes,content:[...]})`; `category ∈ {esik,catlak,usul,kampanya,kaybolma}` (II için novel-data'da yeni hareketler tanımla); paragraf string'leri; sahne kesme `{style:"hr"}`; diyalog `—`; iç-tırnak **kıvrık “ ”/‘ ’** (asla düz `"` string içinde); yeni dosyayı index.html'e finalize'dan ÖNCE ekle; `node --check` + serve 200 doğrula.
- **Workflow:** ~2 bölüm/faz → 7-nokta QA → commit+push. Temiz sinematik Türkçe (mor-nesir değil). **Yalnızca objektif hata düzelt; kozmetik yeniden-yazım YOK.**
- **Kapaklar:** GÖRSELE METİN GÖMME (başlık/yazar dizgide). Premium fiziksel-kitap; arka kapak = ön kapakla aynı dünya + blurb alanı.
- **DOKUNMA:** `scripts/` (motor) · `styles/cover.css` (kardeş LOCK; md5 eşleşmeli) · eşik IDs/davranışı · `themes.css` tema-IDleri (tuzlu/kumlu/gece-deniz).
- **Commit trailer:** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

## 7. BİLİNEN SORUNLAR (engelleyici değil)
1. **KAPAK BAŞLIK UYUMSUZLUĞU (yazar aksiyonu):** entegre kapaklar yanlış/yer-tutucu metin taşıyor — ön "SPACE", arka "IVY", kurgusal yazar "Daniel Marlowe". "SARMAŞIK/NAZAR" değil. Sanat on-theme; metin yanlış. **Düzeltme promptları HAZIR** (`FINAL-COVER-PROMPTS-TR.md`). Yeniden üret → entegre et.
2. Arka kapak şu an ince "arka tahta" (peeking) — tam flip/teşhir değil; opsiyonel gelecek geliştirme.
3. Vercel deploy buradan doğrulanamıyor (MCP kapsam).
4. Headless tarayıcı yok → görsel/animasyon son kontrolü Vercel preview'da (masaüstü+mobil).
5. `images/` ek görselleri (kare/dik/yatay) = sosyal/iç görsel (bkz. `cover-prompts/` formatları).

## 8. KANON HIZLI-REFERANS (tam: `CANON-LOCK.md`)
Kerem Aras (=BOŞLUK; gözü o kurdu) · Onur (ilk ölüm) · İhsan(baba, ideolojik ölüm)/Nazlı(anne)/Eylül(kız kardeş, özne, apeks) — aile tümüyle yok edildi · Pınar (koparıldı, yaşıyor) · Nesrin Akay (avukat) · Defne Yıldırım (gazeteci, tanıklığı saklı) · Levent Aydın (savcı) · Vedat Sönmez (predator ayna-avcı; BOŞLUK'u o yarattı) · Reşat/Bahçıvan, Meridian/Adler, Albay (II/III) · NÖBETÇİ (II, bilinçsiz). Sistem: SARMAŞIK (kestirimci gözetim) · Mutabakat Bürosu. Deniable-ölüm imzası; "kimse bağırmadan"; Book I sonunda BOŞLUK **doğmadı — ilk nefes.**

## 9. Standing rules
Her tamamlanan fazdan sonra **commit + push** (Vercel tetikleyici). Yazar gözden geçirme/onay akışına saygı (özellikle Book II'ye başlamadan). Prozadan önce planlama; kanon kilitli.
