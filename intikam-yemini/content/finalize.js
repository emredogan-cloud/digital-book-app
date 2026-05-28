/* ════════════════════════════════════════════════════════════════
   finalize.js
   Bölümleri hareket sırasına göre yerleştirir. Her bölüm dosyası
   kendisini window.SARMASIK.entries içine push eder; bu adım, dosya
   yüklenme sırasından bağımsız olarak romanın daima aynı sırada
   görünmesini sağlar.

   Sıra (NAZAR — Birinci Kitap):
     0) Eşik                (Prolog)
     1) Sıradan ve Çatlak   (Birinci Hareket)
     2) Usul                (İkinci Hareket)
     3) Kampanya            (Üçüncü Hareket)
     4) Kaybolma            (Dördüncü Hareket)

   Aynı hareket içindeki bölümler dosyada yazıldıkları sırada kalır.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";
    const NS = window.SARMASIK;
    if (!NS || !Array.isArray(NS.entries) || !Array.isArray(NS.categories)) return;

    const order = new Map(NS.categories.map((c, i) => [c.id, i]));
    const lastResort = NS.categories.length + 1;

    NS.entries
        .map((e, i) => ({ e, i, ord: order.has(e.category) ? order.get(e.category) : lastResort }))
        .sort((a, b) => a.ord - b.ord || a.i - b.i)
        .forEach((wrapped, idx) => { NS.entries[idx] = wrapped.e; });

    if (typeof console !== "undefined" && console.info) {
        const tally = {};
        NS.entries.forEach(e => { tally[e.category] = (tally[e.category] || 0) + 1; });
        console.info("[SARMAŞIK · Nazar] " + NS.entries.length + " bölüm yüklendi:", tally);
    }
})();
