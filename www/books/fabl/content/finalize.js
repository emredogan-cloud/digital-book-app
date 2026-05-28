/* ════════════════════════════════════════════════════════════════
   finalize.js
   Fablleri küme sırasına göre yerleştirir. Her fabl dosyası kendisini
   window.FABL.entries içine push eder; bu adım, dosyaların yüklenme
   sırasından bağımsız olarak derlemenin daima aynı sırada görünmesini
   sağlar.

   Sıra:
     I   · Kendilik
     II  · Birlikte
     III · Yapmak ve Bırakmak

   Aynı küme içindeki fabller dosyada yazıldıkları sırada kalır.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";
    const NS = window.FABL;
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
        console.info("[Fabl] " + NS.entries.length + " fabl yüklendi:", tally);
    }
})();
