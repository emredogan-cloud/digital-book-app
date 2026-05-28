/* ════════════════════════════════════════════════════════════════
   novel-data.js
   SARMAŞIK · NAZAR — Kitap meta'sı ve hareket (akt) tanımları.

   Üçleme: SARMAŞIK  (I) NAZAR · (II) BOŞLUK · (III) KEFARET
   Bu dosya BİRİNCİ KİTAP — NAZAR.

   Tür: yakın-gelecek sinematik tekno-mit / politik tekno-gerilim.
   Çekirdek: sistemlere inanan genç bir adam → inancını yitirir →
   her şeyi gören sistemin göremediği boşluğa dönüşür.
   Mekân: dokuda inkâr edilemez bir cumhuriyet (gizli organlar kurgusal);
   İstanbul-dokulu bir sahil metropolü. Kitap içinde tarihlenmez.
   ════════════════════════════════════════════════════════════════ */

window.SARMASIK = window.SARMASIK || {};
window.SARMASIK.entries = window.SARMASIK.entries || [];

/* ────────── HAREKETLER — Eşik + Dört Hareket ──────────
   Eski "kategori" alanının karşılığı; bu kitapta hareketler sıralıdır,
   geri dönüş yoktur. Sırayı finalize.js belirler.

   Görsel ark (sigiller): göz → üstüne düşen göz → kapanan çerçeve →
   alarm → boşluk.
*/
window.SARMASIK.categories = [
    {
        id: "esik",
        name: "Eşik",
        full: "Eşik",
        epoch: "Gelecek · tarihsiz",
        sigil: "⊙",
        accent: "var(--act-esik)",
        description: "Her şeyi gören bir sistem, göremediği bir şeyden korkmaya başlar. İleriden gelen bir nefes: henüz var olmayan bir adın ilk fısıltısı."
    },
    {
        id: "catlak",
        name: "Sıradan ve Çatlak",
        full: "Birinci Hareket — Sıradan ve Çatlak",
        epoch: "Bir bahar; sıradan",
        sigil: "◉",
        accent: "var(--act-catlak)",
        description: "Kerem'in sessizce istisnai, düzgün, akılcı hayatı. Onur görmemesi gereken şeyi görür ve ona gelir. Kerem 'doğru yol'u önerir, kurtarmaya çalışır — ve elleri ilk kez makineye girer."
    },
    {
        id: "usul",
        name: "Usul",
        full: "İkinci Hareket — Usul",
        epoch: "İlk haftalar; kapanış",
        sigil: "▣",
        accent: "var(--act-usul)",
        description: "Kerem adaleti hukukun içinde arar: avukat, savcı, gazeteci. Küçük zaferler, sahte umut. Sonra kanıt buharlaşır, gözetim inkâr edilemez olur ve güvendiği usul ona ihanet eder."
    },
    {
        id: "kampanya",
        name: "Kampanya",
        full: "Üçüncü Hareket — Kampanya",
        epoch: "Aylar; daralma",
        sigil: "◈",
        accent: "var(--act-kampanya)",
        description: "Çevresindekiler tek tek silinir. Baskı Kerem'e döner; sonra aileye bir kampanya iner. Bu, geri dönülmez kırılmadır."
    },
    {
        id: "kaybolma",
        name: "Kaybolma",
        full: "Dördüncü Hareket — Kaybolma",
        epoch: "Son",
        sigil: "∅",
        accent: "var(--act-kaybolma)",
        description: "Suikast, sağ kalma, ve öğrenilen gerçek: gözü kuran eldi. İnanan ölür; adsız bir adam yağmura yürür. Boşluk ilk nefesini alır."
    }
];

window.SARMASIK.book = {
    title: "Nazar",
    subtitle: "SARMAŞIK Üçlemesi — Birinci Kitap",
    series: "SARMAŞIK · I",
    edition: "İlk Tab' · MMXXVI",
    epigraph: "“Görülmek, işaretlenmektir. Ve sistem her şeyi görür — yalnızca görmediği şeyden korkar.”",
    backText: "Bu cilt bir inananın elinden geçti. Sonraki cildi yazacak el artık onun değil; ona henüz bir ad bile verilmedi.",
    epilogueText: "Burada Nazar tükenir. Roman bittiğinde Kerem Aras öldü sayılır — dosya kapandı. Ama her şeyi gören sistemin defterinde, kimsenin görmediği bir yerde, küçük bir boşluk açıldı; bir eksik kare, verinin tutmadığı bir nefes. Onu fark eden ilk kişi, onu yaratan adam olacak.",
    colophon: "Cormorant Garamond, EB Garamond, Marcellus ve IBM Plex Mono harfleriyle dizildi. SARMAŞIK Üçlemesi'nin ilk kitabıdır. Sarmaşık kesilince yeniden sürer; mesele onu kesmek değil, kökünü görmektir."
};

window.SARMASIK.categoryById = function (id) {
    return window.SARMASIK.categories.find(c => c.id === id);
};
