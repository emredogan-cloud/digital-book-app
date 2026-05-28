/* ════════════════════════════════════════════════════════════════
   pdf-export.js — Mendîran’ı print-optimize bir DOM ağacına çevirir
   ve tarayıcının yazdırma dialogunu açar. PDF kaydetmek modern her
   tarayıcıda “PDF olarak kaydet” yoluyla mümkündür; kütüphane yok.

   Ekran motoruyla aynı paragraf sözleşmesini kullanır:
     string | quote | hr | heading | section | scene | list | raw

   Her bölüm tek bir akıcı parça olarak basılır (inline chapter-head,
   sahne/kesim kırılmaları metnin içinde). Yazıcının sayfa-sonu davranışı
   page-break-* kuralları ile yönlendirilir.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MENDIRAN;

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function paragraphToHtml(item) {
        if (typeof item === "string") return `<p>${escapeHtml(item)}</p>`;
        if (!item) return "";
        switch (item.style) {
            case "quote":   return `<p class="prose-quote">${escapeHtml(item.text || "")}</p>`;
            case "hr":      return `<p class="prose-hr">✦ ✦ ✦</p>`;
            case "heading": return `<h4 class="prose-h">${escapeHtml(item.text || "")}</h4>`;
            case "section": {
                const eyebrow = item.eyebrow
                    ? `<div class="prose-section__eyebrow">${escapeHtml(item.eyebrow)}</div>`
                    : "";
                return `<div class="prose-section"><div class="prose-section__rule"></div>${eyebrow}<div class="prose-section__title">${escapeHtml(item.title || "")}</div></div>`;
            }
            case "scene": {
                const compact = !!item.opening;
                const rule = compact ? "" : `<div class="prose-scene__rule">✦ ✦ ✦</div>`;
                const meta = (item.place || item.time)
                    ? `<div class="prose-scene__meta">${escapeHtml(item.place || "")}${item.place && item.time ? " · " : ""}${escapeHtml(item.time || "")}</div>`
                    : "";
                return `<div class="prose-scene">${rule}<div class="prose-scene__title">${escapeHtml(item.title || "")}</div>${meta}</div>`;
            }
            case "list": {
                const li = (item.items || []).map(x => `<li>${escapeHtml(x)}</li>`).join("");
                return `<ul class="prose-l">${li}</ul>`;
            }
            case "raw": return item.html || "";
        }
        return "";
    }

    const PRINT_CSS = `
        @page { size: A4; margin: 22mm 18mm 22mm 18mm; }

        @media print {
            body * { visibility: hidden !important; }
            .print-mount, .print-mount * { visibility: visible !important; }
            .print-mount {
                position: absolute !important;
                inset: 0 !important;
                display: block !important;
                background: #f3e6c8 !important;
                color: #1c1410 !important;
            }
            .ambient, .chrome, .drawer, .toast, .hint, .stage { display: none !important; }
        }

        .print-mount {
            font-family: 'EB Garamond', 'Cormorant Garamond', Georgia, serif;
            font-size: 11pt;
            line-height: 1.55;
            color: #1c1410;
            background: #f3e6c8;
        }

        /* ─── Cover ─── */
        .print-mount .print-cover {
            text-align: center;
            page-break-after: always;
            padding: 30mm 10mm;
        }
        .print-mount .print-cover h1 {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 36pt;
            margin: 0 0 8pt;
            color: #5a3a10;
        }
        .print-mount .print-cover .pc-series {
            font-family: 'Cinzel', serif;
            font-size: 9pt;
            letter-spacing: 0.6em;
            text-transform: uppercase;
            margin-bottom: 30pt;
            color: #8a6f2c;
        }
        .print-mount .print-cover .pc-subtitle {
            font-style: italic; font-size: 14pt;
            margin: 0 0 20pt; color: #3a2a1d;
        }
        .print-mount .print-cover .pc-divider {
            width: 80pt; height: 1pt; background: #8a6f2c;
            margin: 20pt auto; position: relative;
        }
        .print-mount .print-cover .pc-divider::before {
            content: '✦';
            position: absolute; left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            background: #f3e6c8; padding: 0 6pt; color: #8a6f2c;
        }
        .print-mount .print-cover .pc-epigraph {
            font-style: italic; font-size: 12pt; max-width: 70%;
            margin: 30pt auto;
        }

        /* ─── Fihrist ─── */
        .print-mount .print-toc { page-break-after: always; }
        .print-mount .print-toc h2 {
            font-family: 'Cinzel', serif;
            font-size: 18pt; text-align: center;
            letter-spacing: 0.2em; color: #1c1410;
            margin: 20pt 0 18pt;
        }
        .print-mount .print-toc ol {
            list-style: none; padding: 0;
            max-width: 480pt; margin: 0 auto;
        }
        .print-mount .print-toc li {
            display: flex; align-items: baseline; gap: 10pt;
            padding: 5pt 0; border-bottom: 1px dotted #a8842c;
        }
        .print-mount .print-toc .num {
            font-family: 'Cinzel', serif; font-size: 9pt;
            min-width: 36pt; color: #6a5224;
        }
        .print-mount .print-toc .name { flex: 1; }
        .print-mount .print-toc .civ {
            font-family: 'Cinzel', serif; font-size: 8pt;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #6a4f30;
        }
        .print-mount .print-toc .pg {
            font-family: 'Cinzel', serif; font-size: 9pt;
            color: #6a5224; min-width: 36pt; text-align: right;
        }

        /* ─── Bölüm gövdesi ─── */
        .print-mount .print-chapter {
            page-break-before: always;
        }

        /* Inline chapter head */
        .print-mount .chead {
            text-align: center;
            padding: 18pt 8pt 14pt;
            margin-bottom: 18pt;
            page-break-after: avoid;
            break-after: avoid;
            border-bottom: 1px dotted #a8842c;
        }
        .print-mount .chead__eyebrow {
            font-family: 'Cinzel', serif;
            font-size: 8pt;
            letter-spacing: 0.5em;
            text-transform: uppercase;
            color: #6a5224;
            border-top: 1px solid #a8842c;
            border-bottom: 1px solid #a8842c;
            display: inline-block;
            padding: 3pt 8pt;
            margin-bottom: 14pt;
        }
        .print-mount .chead__num {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 30pt; color: #8a6f2c;
            line-height: 1; margin: 0 0 6pt;
        }
        .print-mount .chead__title {
            font-family: 'Cinzel', serif; font-size: 18pt;
            margin: 0 0 6pt; color: #1c1410;
            letter-spacing: 0.03em;
        }
        .print-mount .chead__subtitle {
            font-style: italic; font-size: 11pt;
            color: #3a2a1d; max-width: 70%;
            margin: 0 auto;
        }

        /* Akıcı metin */
        .print-mount .print-body {
            text-align: justify; hyphens: auto;
            padding: 0 8mm; orphans: 3; widows: 3;
        }
        .print-mount .print-body p { margin: 0 0 8pt; text-indent: 1.4em; }

        /* Bölüm açılışından sonraki ilk düz paragraf drop-cap’lı */
        .print-mount .chead + .print-body > p:not(.prose-quote):not(.prose-hr) {
            text-indent: 0;
        }
        .print-mount .chead + .print-body > p:not(.prose-quote):not(.prose-hr):first-letter {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 3em; float: left; line-height: 0.8;
            margin: 0.05em 0.1em 0 0; color: #7a1f1f;
        }

        /* Paragraf türleri */
        .print-mount .print-body .prose-quote {
            font-style: italic; text-indent: 0;
            margin: 8pt 1.2em; padding-left: 0.8em;
            border-left: 2pt solid #8a6f2c; color: #3a2a1d;
        }
        .print-mount .print-body .prose-hr {
            text-indent: 0; text-align: center;
            color: #8a6f2c; letter-spacing: 0.5em;
            margin: 12pt 0;
        }
        .print-mount .print-body .prose-h {
            font-family: 'Cinzel', serif; font-size: 11pt;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #6a4f30; margin: 10pt 0 4pt; text-indent: 0;
            border-bottom: 1pt dotted #a8842c; padding-bottom: 2pt;
            page-break-after: avoid; break-after: avoid;
        }
        .print-mount .print-body .prose-l { margin: 4pt 0 8pt 1.4em; }
        .print-mount .print-body .prose-l li { text-indent: 0; margin-bottom: 4pt; }

        /* Section break (bölüm-içi büyük kesim) */
        .print-mount .print-body .prose-section {
            text-align: center;
            margin: 14pt auto 10pt;
            page-break-after: avoid; break-after: avoid;
        }
        .print-mount .print-body .prose-section__rule {
            display: block;
            width: 120pt; height: 1pt;
            background: #a8842c; margin: 0 auto 6pt;
            position: relative;
        }
        .print-mount .print-body .prose-section__rule::before {
            content: '✦'; position: absolute; left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            background: #f3e6c8; padding: 0 5pt;
            color: #8a6f2c; font-size: 8pt;
        }
        .print-mount .print-body .prose-section__eyebrow {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic; font-size: 10pt;
            color: #6a5224; margin-bottom: 3pt;
        }
        .print-mount .print-body .prose-section__title {
            font-family: 'Cinzel', serif; font-size: 12pt;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #1c1410; line-height: 1.3;
        }

        /* Scene break */
        .print-mount .print-body .prose-scene {
            text-align: center;
            margin: 12pt auto 8pt;
            page-break-after: avoid; break-after: avoid;
        }
        .print-mount .print-body .prose-scene__rule {
            font-family: 'Cinzel', serif;
            color: #8a6f2c; letter-spacing: 0.6em;
            font-size: 10pt; margin-bottom: 6pt;
        }
        .print-mount .print-body .prose-scene__title {
            font-family: 'Cinzel', serif; font-size: 10pt;
            letter-spacing: 0.12em; color: #1c1410;
            text-transform: uppercase; margin-bottom: 2pt;
        }
        .print-mount .print-body .prose-scene__meta {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic; font-size: 9pt;
            color: #6a5224;
        }

        .print-mount .print-end {
            text-align: center; color: #8a6f2c;
            font-size: 14pt; margin: 18pt 0 6pt;
            letter-spacing: 0.4em;
        }

        /* Hatime */
        .print-mount .print-colophon {
            page-break-before: always; text-align: center;
            padding: 80pt 20pt;
        }
        .print-mount .print-colophon h2 {
            font-family: 'Cinzel', serif; font-size: 18pt;
            letter-spacing: 0.2em; margin-bottom: 18pt;
        }
        .print-mount .print-colophon p {
            font-style: italic; max-width: 70%;
            margin: 0 auto 14pt; line-height: 1.7;
        }
    `;

    function injectPrintStylesOnce() {
        if (document.getElementById("print-css")) return;
        const style = document.createElement("style");
        style.id = "print-css";
        style.textContent = PRINT_CSS;
        document.head.appendChild(style);
    }

    function buildCoverHtml(book) {
        return `
            <div class="print-cover">
                <div class="pc-series">${escapeHtml(book.series)}</div>
                <h1>${escapeHtml(book.title)}</h1>
                <p class="pc-subtitle">${escapeHtml(book.subtitle)}</p>
                <div class="pc-divider"></div>
                <p class="pc-epigraph">${escapeHtml(book.epigraph)}</p>
                <div class="pc-series" style="margin-top:40pt;">${escapeHtml(book.edition)}</div>
            </div>
        `;
    }
    function buildTocHtml(stories, ROMAN) {
        const items = stories.map((s, i) => {
            const k = NS.civilizationById(s.civilization);
            return `<li>
                <span class="num">${ROMAN[i + 1]}.</span>
                <span class="name">${escapeHtml(s.title)}</span>
                <span class="civ">${escapeHtml(k ? k.full : "")}</span>
                <span class="pg">${i + 1}</span>
            </li>`;
        }).join("");
        return `<section class="print-toc">
            <h2>Fihrist</h2>
            <ol>${items}</ol>
        </section>`;
    }
    function buildChapterHtml(s, num) {
        const k = NS.civilizationById(s.civilization);
        const body = (s.content || []).map(paragraphToHtml).join("");
        return `
            <section class="print-chapter">
                <div class="chead">
                    <div class="chead__eyebrow">${escapeHtml(k ? k.full : "")}</div>
                    <div class="chead__num">${num}</div>
                    <div class="chead__title">${escapeHtml(s.title)}</div>
                    <div class="chead__subtitle">${escapeHtml(s.subtitle || "")}</div>
                </div>
                <div class="print-body">
                    ${body}
                    <div class="print-end">✦</div>
                </div>
            </section>
        `;
    }
    function buildColophonHtml(book) {
        return `<section class="print-colophon">
            <h2>Hatime</h2>
            <p>${escapeHtml(book.epilogueText)}</p>
            <p style="margin-top:30pt;">Bu kitabe, Sâkin Vasıl tarîkâtının yedi defterinden, Hâne Korsend’in Cam Mahzeni’nden ve Vehdâr’ın yedi kum sayfasından derlenmiştir. Tipografi: Cinzel, Cormorant Garamond, EB Garamond, Maguntia Fraktur.</p>
        </section>`;
    }

    const requestIdle = window.requestIdleCallback ||
        (cb => setTimeout(() => cb({ timeRemaining: () => 16 }), 0));

    let exporting = false;

    function exportPDF(opts) {
        if (exporting) return;
        exporting = true;
        injectPrintStylesOnce();
        const mount = document.getElementById("print-mount");
        if (!mount) { exporting = false; return; }

        const book = NS.book;
        const stories = NS.stories;
        const ROMAN_ONES = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        const toRoman = n => n <= 0 ? "" : (n >= 100 ? "C" + toRoman(n - 100) : ROMAN_TENS[Math.floor(n / 10)] + ROMAN_ONES[n % 10]);
        const ROMAN = new Proxy({}, { get: (_, k) => toRoman(Number(k)) });

        mount.innerHTML = buildCoverHtml(book) + buildTocHtml(stories, ROMAN);

        const CHUNK = 2;
        let next = 0;

        function emitChunk(_deadline) {
            const end = Math.min(next + CHUNK, stories.length);
            let buf = "";
            for (let i = next; i < end; i++) {
                buf += buildChapterHtml(stories[i], ROMAN[i + 1]);
            }
            mount.insertAdjacentHTML("beforeend", buf);
            next = end;
            if (opts && typeof opts.onProgress === "function") {
                opts.onProgress(next, stories.length);
            }
            if (next < stories.length) {
                requestIdle(emitChunk);
            } else {
                mount.insertAdjacentHTML("beforeend", buildColophonHtml(book));
                requestAnimationFrame(() => {
                    if (typeof window.print === "function") window.print();
                    setTimeout(() => { mount.innerHTML = ""; exporting = false; }, 1500);
                });
            }
        }

        requestIdle(emitChunk);
    }

    NS.PdfExport = { exportPDF };
})();
