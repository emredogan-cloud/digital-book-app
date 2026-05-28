/* ════════════════════════════════════════════════════════════════
   novel-data.js
   Tuzun Hafızası — Kitap meta'sı ve akt tanımları.

   Dünya: Akdeniz/Ege benzeri bir kıyı, çöküş halindeki bir imparatorluğun
   ardından kurulan bir cumhuriyetin ilk yıllarında.
   Kasaba: Vâliçe.
   Tarih: yaklaşık 1924 ekim → 1925 şubat (kitap içinde tarihlenmez).
   ════════════════════════════════════════════════════════════════ */

window.TUZ = window.TUZ || {};
window.TUZ.entries = window.TUZ.entries || [];

/* ────────── AKT — Üç perde ──────────
   Romanın üç perdesi. Eski sistemde "kategoriler" denilen koleksiyonun
   karşılığı; bu romanda akt'lar sıralı, geri dönüş yok. Sırayı belirler.
*/
window.TUZ.categories = [
    {
        id: "bulma",
        name: "Bulma",
        full: "Birinci Perde — Bulma",
        epoch: "Ekim ortası, sonbahar başı",
        sigil: "◇",
        accent: "var(--act-bulma)",
        description: "Reha babasının cenazesi için Vâliçe'ye döner. Aile tuz-evinde bir tane bulur; ne olduğunu önce anlayamaz. Sonra anlar. Sonra hatırlamayı geri ister."
    },
    {
        id: "iz-surme",
        name: "İz Sürme",
        full: "İkinci Perde — İz Sürme",
        epoch: "Geç sonbahar, ilk kış",
        sigil: "◈",
        accent: "var(--act-iz-surme)",
        description: "Tarikat kalıntılarına ulaşır; teyzesine, eski meslektaşa, devletin defterlerine. Adsız bir kız kardeş yavaş yavaş bir adı, bir yüzü, bir aileyi alır."
    },
    {
        id: "anilma",
        name: "Anılma",
        full: "Üçüncü Perde — Anılma",
        epoch: "Kış, ocak — şubat başı",
        sigil: "◉",
        accent: "var(--act-anilma)",
        description: "Annesi ölür. Lemi ölür. Reha kendi defterini yazar, bir başkasının çekmecesine bırakır. Tuzhane'yi açan kişi artık odur."
    }
];

window.TUZ.book = {
    title: "Tuzun Hafızası",
    subtitle: "Bir Kıyı Romanı",
    series: "Vâliçe Kıyısı · Cilt-i Evvel",
    edition: "İlk Tab' · MMXXVI",
    epigraph: "“Deniz bazen ölülerin sakladığını da geri verir. Tuz hatırlar.”",
    backText: "Bu cilt Reha'nın elinden geçti. Sonraki cildi yazacak el henüz bilinmiyor.",
    epilogueText: "Burada Tuzun Hafızası tükenir. Roman bittikten sonra Reha hâlâ Vâliçe'de. Hâlâ Tuzhane'yi her sabah açıyor. Bir kez, bir yabancının evine bir tane teslim ederken, kendisinden bir başkası gibi söz ettiğini fark etti. Eve döner döner döner döner döner — ama aynı eve değil.",
    colophon: "Cormorant Garamond, EB Garamond ve Marcellus harfleriyle dizildi. Vâliçe Kıyısı dizisinin ilk kitabıdır. Tuz, hatırlamak için değil — unutmamak için."
};

window.TUZ.categoryById = function (id) {
    return window.TUZ.categories.find(c => c.id === id);
};
