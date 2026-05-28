/* ════════════════════════════════════════════════════════════════
   novel-data.js
   FABL — Kitap meta'sı ve küme tanımları.

   Tür: bağımsız okunabilen kısa fabllar derlemesi. Her metin tek
   başına tamamdır; tek bir dramatik eylem, tek bir çekirdek fikir.
   Çerçeve hafiftir: üç tematik küme yalnızca düzen verir, süreklilik
   yükü getirmez.
     I  · Kendilik           (kişinin kendisiyle ilişkisi)
     II · Birlikte           (birlikte yaşamak)
     III· Yapmak ve Bırakmak (el, ustalık, vazgeçiş)
   ════════════════════════════════════════════════════════════════ */

window.FABL = window.FABL || {};
window.FABL.entries = window.FABL.entries || [];

/* ────────── KÜME — Üç tematik kapı ──────────
   Eski motorun "kategori/akt" yapısının karşılığı. Sıralı; sırayı
   belirler. Fabller kümelere göre dizilir, küme içinde yazıldıkları
   sırada kalır.
*/
window.FABL.categories = [
    {
        id: "kendilik",
        name: "Kendilik",
        full: "Birinci Küme — Kendilik",
        epoch: "insanın kendisiyle",
        sigil: "◇",
        accent: "var(--act-kendilik)",
        description: "Bir kişinin kendisiyle olan sessiz pazarlığı. Yankılar, yansımalar, kendi izini kovalamalar. Burada ders verilmez; yalnızca biri kendini bir kez daha tanır."
    },
    {
        id: "birlikte",
        name: "Birlikte",
        full: "İkinci Küme — Birlikte",
        epoch: "birlikte yaşamak",
        sigil: "◈",
        accent: "var(--act-birlikte)",
        description: "İki kişinin, bir kasabanın, bir terazinin meselesi. Anlaşmak çoğu zaman haklı çıkmak değil, bir paya razı olmaktır."
    },
    {
        id: "yapmak",
        name: "Yapmak ve Bırakmak",
        full: "Üçüncü Küme — Yapmak ve Bırakmak",
        epoch: "el ve vazgeçiş",
        sigil: "◉",
        accent: "var(--act-yapmak)",
        description: "Bir elin yaptığı ve yapmaktan vazgeçtiği. Ustalık, kimi zaman neyi çözmeyeceğini, neyi bırakacağını bilmektir."
    }
];

window.FABL.book = {
    title: "Fabl",
    subtitle: "Küçük Masallar",
    series: "İlk Defter · Birinci Derleme",
    edition: "İlk Tab' · MMXXVI",
    epigraph: "“Her küçük hikâye de bir şey bilir; yeter ki acele edilmesin.”",
    backText: "Bu defterdeki fabller birbirinden bağımsız okunabilir; her biri kendi başına tamamdır. Derleme acele etmeden büyüyor — yeni masallar hep yolda.",
    epilogueText: "Burada defter şimdilik kapanır. Anlatılan hikâyelerin hepsi küçüktü; ama küçük olan, çoğu zaman akılda en uzun kalandır. Okur kitabı kapatınca fabller bitmez — yalnızca sırasını okura bırakır.",
    colophon: "Cormorant Garamond, EB Garamond ve Marcellus harfleriyle dizildi. Küçük masallar için kısa bir kodeks. Bir ders dayatmaz; bir gözlem bırakır."
};

window.FABL.categoryById = function (id) {
    return window.FABL.categories.find(c => c.id === id);
};
