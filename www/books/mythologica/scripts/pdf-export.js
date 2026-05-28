/* ════════════════════════════════════════════════════════════════
   pdf-export.js
   Renders the entire codex into a print-optimized DOM tree, then
   triggers the browser print dialog. Users can "Save as PDF" from
   the print dialog on every modern browser, no library required.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MYTHOLOGY;

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function paragraphToHtml(item) {
        if (typeof item === "string") return `<p>${escapeHtml(item)}</p>`;
        if (item && item.style === "quote") return `<p class="prose-quote">${escapeHtml(item.text || "")}</p>`;
        if (item && item.style === "hr") return `<p class="prose-hr">✦ ✦ ✦</p>`;
        return "";
    }

    const PRINT_CSS = `
        /* ─── PRINT MODE ─── */
        @page { size: A4; margin: 22mm 18mm 22mm 18mm; }

        @media print {
            body * { visibility: hidden !important; }
            .print-mount, .print-mount * { visibility: visible !important; }
            .print-mount {
                position: absolute !important;
                inset: 0 !important;
                display: block !important;
                background: #f8eed4 !important;
                color: #2a1d12 !important;
            }
            .ambient, .chrome, .drawer, .toast, .hint, .stage { display: none !important; }
        }

        .print-mount {
            font-family: 'EB Garamond', 'Cormorant Garamond', Georgia, serif;
            font-size: 11pt;
            line-height: 1.55;
            color: #2a1d12;
            background: #f8eed4;
        }
        .print-mount .print-cover {
            text-align: center;
            page-break-after: always;
            padding: 30mm 10mm;
        }
        .print-mount .print-cover h1 {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 36pt;
            margin: 0 0 8pt;
            color: #6a4f30;
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
            font-style: italic;
            font-size: 14pt;
            margin: 0 0 20pt;
            color: #4a3624;
        }
        .print-mount .print-cover .pc-divider {
            width: 80pt; height: 1pt; background: #8a6f2c;
            margin: 20pt auto; position: relative;
        }
        .print-mount .print-cover .pc-divider::before {
            content: '✦';
            position: absolute; left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            background: #f8eed4; padding: 0 6pt;
            color: #8a6f2c;
        }
        .print-mount .print-cover .pc-epigraph {
            font-style: italic; font-size: 12pt; max-width: 70%;
            margin: 30pt auto;
        }

        .print-mount .print-toc {
            page-break-after: always;
        }
        .print-mount .print-toc h2 {
            font-family: 'Cinzel', serif;
            font-size: 18pt;
            text-align: center;
            letter-spacing: 0.2em;
            color: #2a1d12;
            margin: 20pt 0 18pt;
        }
        .print-mount .print-toc ol {
            list-style: none;
            padding: 0;
            max-width: 480pt;
            margin: 0 auto;
        }
        .print-mount .print-toc li {
            display: flex;
            align-items: baseline;
            gap: 10pt;
            padding: 5pt 0;
            border-bottom: 1px dotted #c8b07a;
        }
        .print-mount .print-toc .num {
            font-family: 'Cinzel', serif;
            font-size: 9pt;
            min-width: 36pt;
            color: #6a5224;
        }
        .print-mount .print-toc .name { flex: 1; }
        .print-mount .print-toc .civ {
            font-family: 'Cinzel', serif;
            font-size: 8pt;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #6a4f30;
        }
        .print-mount .print-toc .pg {
            font-family: 'Cinzel', serif;
            font-size: 9pt;
            color: #6a5224;
            min-width: 36pt;
            text-align: right;
        }

        .print-mount .print-chapter {
            page-break-before: always;
        }
        .print-mount .print-chapter-opening {
            text-align: center;
            padding: 60pt 20pt 30pt;
            page-break-after: always;
        }
        .print-mount .print-chapter-opening .pco-civ {
            font-family: 'Cinzel', serif;
            font-size: 9pt;
            letter-spacing: 0.6em;
            text-transform: uppercase;
            color: #6a5224;
            border-top: 1px solid #c8b07a;
            border-bottom: 1px solid #c8b07a;
            display: inline-block;
            padding: 4pt 10pt;
            margin-bottom: 30pt;
        }
        .print-mount .print-chapter-opening .pco-num {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 48pt;
            color: #8a6f2c;
            line-height: 1;
            margin-bottom: 10pt;
        }
        .print-mount .print-chapter-opening h2 {
            font-family: 'Cinzel', serif;
            font-size: 22pt;
            margin: 0 0 6pt;
            color: #2a1d12;
        }
        .print-mount .print-chapter-opening .pco-subtitle {
            font-style: italic;
            font-size: 12pt;
            color: #4a3624;
            max-width: 75%;
            margin: 0 auto;
        }

        .print-mount .print-body {
            text-align: justify;
            hyphens: auto;
            -webkit-hyphens: auto;
            padding: 0 8mm;
            orphans: 3;
            widows: 3;
        }
        .print-mount .print-body p {
            margin: 0 0 8pt;
            text-indent: 1.4em;
        }
        .print-mount .print-body p:first-child { text-indent: 0; }
        .print-mount .print-body p:first-child::first-letter {
            font-family: 'UnifrakturMaguntia', 'Cinzel', serif;
            font-size: 3em;
            float: left;
            line-height: 0.8;
            margin: 0.05em 0.1em 0 0;
            color: #7a1f1f;
        }
        .print-mount .print-body .prose-quote {
            font-style: italic;
            text-indent: 0;
            margin: 8pt 1.2em;
            padding-left: 0.8em;
            border-left: 2pt solid #8a6f2c;
            color: #4a3624;
        }
        .print-mount .print-body .prose-hr {
            text-indent: 0;
            text-align: center;
            color: #8a6f2c;
            letter-spacing: 0.5em;
            margin: 12pt 0;
        }

        .print-mount .print-end {
            text-align: center;
            color: #8a6f2c;
            font-size: 14pt;
            margin: 16pt 0 4pt;
            letter-spacing: 0.4em;
        }
        .print-mount .print-colophon {
            page-break-before: always;
            text-align: center;
            padding: 80pt 20pt;
        }
        .print-mount .print-colophon h2 {
            font-family: 'Cinzel', serif;
            font-size: 18pt;
            letter-spacing: 0.2em;
            margin-bottom: 18pt;
        }
        .print-mount .print-colophon p {
            font-style: italic;
            max-width: 70%;
            margin: 0 auto 14pt;
            line-height: 1.7;
        }
    `;

    function injectPrintStylesOnce() {
        if (document.getElementById("print-css")) return;
        const style = document.createElement("style");
        style.id = "print-css";
        style.textContent = PRINT_CSS;
        document.head.appendChild(style);
    }

    /* PERF: previously buildPrintHtml() ran synchronously, building the
       whole 185 KB HTML string in one pass and then assigning it via
       .innerHTML — both operations blocked the main thread. The new
       implementation:

         1. emits the cover + TOC immediately,
         2. yields to the browser (rIC/setTimeout) between every 2-3
            chapters so we don't lock up scroll/animations during export,
         3. emits the colophon last and triggers print().

       The user-visible "Preparing codex…" toast stays on screen the
       whole time, and the UI remains interactive in the meantime. */

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
            const civ = NS.civilizationById(s.civilization);
            return `<li>
                <span class="num">${ROMAN[i + 1]}.</span>
                <span class="name">${escapeHtml(s.title)}</span>
                <span class="civ">${escapeHtml(civ ? civ.full : "")}</span>
                <span class="pg">${i + 1}</span>
            </li>`;
        }).join("");
        return `<section class="print-toc">
            <h2>Tabula Mythologica</h2>
            <ol>${items}</ol>
        </section>`;
    }
    function buildChapterHtml(s, num) {
        const civ = NS.civilizationById(s.civilization);
        const body = s.content.map(paragraphToHtml).join("");
        return `
            <section class="print-chapter">
                <div class="print-chapter-opening">
                    <div class="pco-civ">${escapeHtml(civ ? civ.full : "")}</div>
                    <div class="pco-num">${num}</div>
                    <h2>${escapeHtml(s.title)}</h2>
                    <p class="pco-subtitle">${escapeHtml(s.subtitle || "")}</p>
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
            <h2>Colophon</h2>
            <p>${escapeHtml(book.epilogueText)}</p>
            <p style="margin-top:30pt;">An illuminated archive of twenty-six tales from eight civilizations, set in Cinzel, Cormorant Garamond, EB Garamond, and the old Fraktur of Maguntia.</p>
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

        // Phase 1: cover + TOC (synchronous, small).
        mount.innerHTML = buildCoverHtml(book) + buildTocHtml(stories, ROMAN);

        // Phase 2: chapters in chunks, yielding between each.
        const CHUNK = 3;
        let next = 0;

        function emitChunk(deadline) {
            const end = Math.min(next + CHUNK, stories.length);
            let buf = "";
            for (let i = next; i < end; i++) {
                buf += buildChapterHtml(stories[i], ROMAN[i + 1]);
            }
            mount.insertAdjacentHTML("beforeend", buf);
            next = end;
            if (typeof opts === "object" && opts && typeof opts.onProgress === "function") {
                opts.onProgress(next, stories.length);
            }
            if (next < stories.length) {
                requestIdle(emitChunk);
            } else {
                // Phase 3: colophon, then print.
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
