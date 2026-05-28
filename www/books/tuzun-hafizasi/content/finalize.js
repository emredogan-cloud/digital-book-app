/* ════════════════════════════════════════════════════════════════
   finalize.js
   Bölümleri akt sırasına göre yerleştirir. Her bölüm dosyası kendisini
   window.TUZ.entries içine push eder; bu adım, her dosyanın yüklenme
   sırasından bağımsız olarak romanın daima aynı sırada görünmesini
   sağlar.

   Sıra:
     1) Bulma          (Bölüm 1-10)
     2) İz Sürme       (Bölüm 11-26)
     3) Anılma         (Bölüm 27-36)

   Aynı akt içindeki bölümler dosyada yazıldıkları sırada kalır.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";
    const NS = window.TUZ;
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
        console.info("[Tuzun Hafızası] " + NS.entries.length + " bölüm yüklendi:", tally);
    }
})();
