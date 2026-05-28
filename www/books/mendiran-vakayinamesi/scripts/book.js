/* ════════════════════════════════════════════════════════════════
   book.js  —  Mendîran Vakayinâmesi sayfa motoru.

   Tasarım hedefi: gerçek bir basılı romanın akışı.

   Önceki sürümde her bölüm:
     1. zorla sağ sayfaya hizalanıyordu (gerekirse boş sol sayfa)
     2. ayrı bir TAM-SAYFA bölüm-açılışı sayfası alıyordu
     3. ardından bölüm gövdesi sayfaları
     4. ✦ ile kapanış
   → 16 bölüm × bu sekans = sürekli yarı-boş sayfalar, kopuk akış.

   Bu sürümde:
     • Bölümler doğal aktıkları sayfada başlar (sol ya da sağ olabilir).
     • Bölüm-açılışı (chapter-head) ARTIK ayrı bir sayfa değil; bölümün
       İLK SAYFASININ üst bölümüne yerleşen bir paragraf öğesidir.
     • Sahne kırılmaları (scene) ve kesim başlıkları (section) bölüm
       içinde inline öğelerdir; sayfalama doğal olarak işler.
     • ✦ kapanış işareti bölümün son sayfasında küçük altbilgi olur.
     • Sayfalama exponential-then-binary chunked algoritması ile aynı
       (compositor dostu), ama orphan/widow kontrolüne dikkat eder.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MENDIRAN;

    const PAGE_KINDS = {
        COVER:    "cover",
        TOC:      "toc",
        STORY:    "story",
        EPILOGUE: "epilogue",
        BLANK:    "blank"
    };

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    const _idleYield = (typeof window.requestIdleCallback === "function")
        ? () => new Promise(r => window.requestIdleCallback(() => r(), { timeout: 50 }))
        : () => new Promise(r => setTimeout(r, 0));
    const yieldToBrowser = _idleYield;

    /* ────── Paragraph → HTML ──────
       Yedi türü destekler:
         string                                → düz paragraf
         { style: "quote", text }              → italik blok-alıntı
         { style: "hr" }                       → ✦ ✦ ✦ ayraç
         { style: "heading", text }            → küçük alt-başlık
         { style: "section", title, eyebrow }  → BÜYÜK kesim başlığı
         { style: "scene", title, place, time, opening? } → sahne kırılması
         { style: "list", items }              → noktalı liste
         { style: "raw", html }                → güvenilir HTML
         { style: "chapter-head", … }          → bölüm açılışı (kart)
         { style: "chapter-end" }              → bölüm kapanışı (✦)            */
    function paragraphHtml(item) {
        if (typeof item === "string") {
            return `<p>${escapeHtml(item)}</p>`;
        }
        if (!item) return "";
        switch (item.style) {
            case "quote":
                return `<p data-style="quote">${escapeHtml(item.text || "")}</p>`;
            case "hr":
                return `<p data-style="hr">✦ ✦ ✦</p>`;
            case "heading":
                return `<h4 class="prose-heading">${escapeHtml(item.text || "")}</h4>`;
            case "section":
                return sectionBreakHtml(item);
            case "scene":
                return sceneBreakHtml(item);
            case "list": {
                const items = (item.items || [])
                    .map(li => `<li>${escapeHtml(li)}</li>`).join("");
                return `<ul class="prose-list">${items}</ul>`;
            }
            case "raw":
                return item.html || "";
            case "chapter-head":
                return chapterHeadHtml(item);
            case "chapter-end":
                return `<div class="chapter-end-mark" aria-hidden="true">✦</div>`;
        }
        return "";
    }

    function chapterHeadHtml(item) {
        const eyebrow  = item.eyebrow || "";
        const num      = item.num || "";
        const title    = item.title || "";
        const subtitle = item.subtitle || "";
        return `
            <header class="chapter-head" role="heading" aria-level="2">
              ${eyebrow ? `<div class="chapter-head__eyebrow">${escapeHtml(eyebrow)}</div>` : ""}
              ${num ? `<div class="chapter-head__num">${escapeHtml(num)}</div>` : ""}
              <h1 class="chapter-head__title">${escapeHtml(title)}</h1>
              ${subtitle ? `<div class="chapter-head__subtitle">${escapeHtml(subtitle)}</div>` : ""}
              <div class="chapter-head__rule" aria-hidden="true"></div>
            </header>
        `;
    }

    function sectionBreakHtml(item) {
        const eyebrow = item.eyebrow || "";
        const title   = item.title   || "";
        return `
            <div class="section-break" role="heading" aria-level="3">
              <div class="section-break__rule" aria-hidden="true"></div>
              ${eyebrow ? `<div class="section-break__eyebrow">${escapeHtml(eyebrow)}</div>` : ""}
              <div class="section-break__title">${escapeHtml(title)}</div>
            </div>
        `;
    }

    function sceneBreakHtml(item) {
        const title   = item.title || "";
        const place   = item.place || "";
        const time    = item.time  || "";
        const compact = !!item.opening;
        const ruleHtml = compact
            ? ""
            : `<div class="scene-break__rule" aria-hidden="true">✦ ✦ ✦</div>`;
        const meta = (place || time)
            ? `<div class="scene-break__meta">${escapeHtml(place)}${place && time ? " · " : ""}${escapeHtml(time)}</div>`
            : "";
        return `
            <div class="scene-break${compact ? " scene-break--opening" : ""}">
              ${ruleHtml}
              <div class="scene-break__title">${escapeHtml(title)}</div>
              ${meta}
            </div>
        `;
    }

    /* Roma rakamları */
    const ROMAN_ONES = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    function toRoman(n) {
        if (n <= 0) return "";
        if (n >= 100) return "C" + toRoman(n - 100);
        return ROMAN_TENS[Math.floor(n / 10)] + ROMAN_ONES[n % 10];
    }
    const ROMAN = new Proxy({}, { get(_, key) { return toRoman(Number(key)); } });

    // ──────────────────────────────────────────────────────────────
    // BookEngine
    // ──────────────────────────────────────────────────────────────

    class BookEngine {
        constructor(root) {
            this.root = root;
            this.pages = [];
            this.spreads = [];
            this.spread = 0;
            this.isAnimating = false;
            this.measureEl = null;
            this.onSpreadChange = null;
            this.onProgress = null;
            this.storyToSpread = new Map();
        }

        async build() {
            this._createMeasureEl();
            await this._buildPages();
            this._pairSpreads();
            this._mountInitial();
            this._removeMeasureEl();
        }

        // -------- measurement scratch --------
        _createMeasureEl() {
            const sample = document.createElement("div");
            sample.className = "page page--right";
            sample.style.visibility = "hidden";
            sample.style.position = "absolute";
            sample.style.zIndex = "-1";
            sample.style.pointerEvents = "none";
            sample.innerHTML = `<div class="page__inner"><div class="page__content"><div class="story-body" data-measure-target></div></div></div>`;
            this.root.appendChild(sample);
            this.measureEl = sample;
            this.measureContent = sample.querySelector("[data-measure-target]");
            this.measureFrame = sample.querySelector(".page__content");
        }
        _removeMeasureEl() {
            if (this.measureEl && this.measureEl.parentNode) {
                this.measureEl.parentNode.removeChild(this.measureEl);
            }
            this.measureEl = null;
        }

        _measureFits(html) {
            this.measureContent.innerHTML = html;
            return this.measureContent.scrollHeight <= this._frameHeight;
        }

        /* ────── PAGINATION ──────────────────────────────────────────
           Chunked exponential-then-binary algoritması.

           ORPHAN/WIDOW kontrolü:
             • Bir sayfa, ardından bir paragrafa zar zor yer kalmış
               olarak chapter-head/section/scene ile bitemez (başlık
               yetim kalmamalı). Algoritma bu durumda sığacak başlığı
               sonraki sayfaya iter.
             • Aynı şekilde, bir paragrafın tek satırı bir sonraki
               sayfaya kalamaz (widow); ama bu CSS orphans/widows ile
               yönetilir.

           Bir öğenin tek başına sığmazlığında, raw/quote/string için
           cümle bazında bölünür; section/scene/chapter-head için
           bölünmez — sonraki sayfaya gönderilir.                  */

        _paginate(contentItems) {
            this._frameHeight = this.measureFrame.clientHeight;

            const htmls = [];
            for (let i = 0; i < contentItems.length; i++) {
                const h = paragraphHtml(contentItems[i]);
                if (h) htmls.push({ html: h, item: contentItems[i] });
            }

            const pages = [];
            let cursor = 0;

            while (cursor < htmls.length) {
                // Phase 1: exponential probe
                let lo = 1;
                let hi = 1;
                while (cursor + hi <= htmls.length) {
                    const trial = htmls.slice(cursor, cursor + hi).map(h => h.html).join("");
                    if (this._measureFits(trial)) {
                        lo = hi;
                        if (cursor + hi === htmls.length) break;
                        hi = Math.min(hi * 2, htmls.length - cursor);
                        if (hi === lo) break;
                    } else {
                        break;
                    }
                }

                // İlk öğe tek başına sığmıyor → split eligible mi?
                if (lo === 1 && cursor + 1 <= htmls.length) {
                    const trial = htmls[cursor].html;
                    if (!this._measureFits(trial)) {
                        const cur = htmls[cursor].item;
                        const splittable = (typeof cur === "string")
                            || (cur && (cur.style === "quote" || cur.style === "raw"));
                        if (splittable) {
                            const sliced = this._splitOversizedItem(cur);
                            htmls.splice(cursor, 1, ...sliced.map(s => ({ html: s, item: null })));
                            continue;
                        }
                        // Bölünemiyor — yine de tek başına o sayfaya koy
                        pages.push(trial);
                        cursor += 1;
                        continue;
                    }
                }

                // Phase 2: binary search
                let fits = lo;
                let over = Math.min(hi, htmls.length - cursor);
                if (over > fits) {
                    while (over - fits > 1) {
                        const mid = (fits + over) >> 1;
                        const trial = htmls.slice(cursor, cursor + mid).map(h => h.html).join("");
                        if (this._measureFits(trial)) fits = mid;
                        else over = mid;
                    }
                }

                /* ORPHAN GUARD:
                   Sayfanın SONUNDAKİ öğe bir BAŞLIKsa (section/scene/heading)
                   ve sayfada başka şey varsa — başlığı bir sonraki sayfaya it
                   ki başlık tek başına dipte yetim kalmasın. */
                if (fits > 1 && cursor + fits < htmls.length) {
                    const lastItem = htmls[cursor + fits - 1].item;
                    if (lastItem && (lastItem.style === "section" ||
                                     lastItem.style === "scene"   ||
                                     lastItem.style === "heading")) {
                        fits -= 1;
                    }
                }

                pages.push(htmls.slice(cursor, cursor + fits).map(h => h.html).join(""));
                cursor += fits;
            }

            if (pages.length === 0) pages.push("");
            return pages;
        }

        _splitOversizedItem(item) {
            if (typeof item === "string") {
                return this._sentenceSplit(item, txt => `<p>${escapeHtml(txt)}</p>`);
            }
            if (!item) return [`<p></p>`];
            if (item.style === "quote") {
                return this._sentenceSplit(item.text || "",
                    txt => `<p data-style="quote">${escapeHtml(txt)}</p>`);
            }
            if (item.style === "raw") {
                const plain = (item.html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
                return this._sentenceSplit(plain, txt => `<p>${escapeHtml(txt)}</p>`);
            }
            return [paragraphHtml(item) || `<p></p>`];
        }

        _sentenceSplit(text, wrap) {
            const sentences = text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) || [text];
            const out = [];
            let buf = "";
            for (const s of sentences) {
                const trial = buf + s;
                if (this._measureFits(wrap(trial))) {
                    buf = trial;
                } else {
                    if (buf) out.push(wrap(buf));
                    buf = s;
                }
            }
            if (buf) out.push(wrap(buf));
            return out;
        }

        // -------- tüm sayfaları topla --------
        async _buildPages() {
            const stories = NS.stories;
            const book = NS.book;

            // 1) Ön kapak — sol blank, sağ kapak
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: `<div class="page__inner"></div>`, chapter: "", folio: "" });
            this.pages.push({ kind: PAGE_KINDS.COVER, html: this._coverHtml(book), chapter: "", folio: "" });

            // 2) Başlık iç sayfası — sol blank, sağ başlık
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: `<div class="page__inner"></div>`, chapter: "", folio: "" });
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: this._titleHtml(book), chapter: "", folio: "" });

            // 3) Fihrist sayfalarını rezerv et (later doldurulur)
            const TOC_ENTRIES_PER_PAGE = 12;
            let tocPagesNeeded = Math.max(2, Math.ceil(stories.length / TOC_ENTRIES_PER_PAGE));
            if (tocPagesNeeded % 2 === 1) tocPagesNeeded++;
            const tocPlaceholderIndex = this.pages.length;
            for (let i = 0; i < tocPagesNeeded; i++) {
                this.pages.push({ kind: PAGE_KINDS.TOC, html: "", chapter: "Fihrist", folio: "" });
            }

            // 4) Bölümler — artık ZORLA sağ-sayfa hizalama YOK.
            //    Bölümler doğal aktıkları sayfadan başlar.
            //    Chapter-head paragrafı içeriğin başına prepend edilir;
            //    sayfalama onu doğal olarak ilk sayfaya koyar.
            const YIELD_EVERY = 4;
            const tocEntries = [];
            for (let i = 0; i < stories.length; i++) {
                const story = stories[i];
                const kisim = NS.civilizationById(story.civilization);
                const num = ROMAN[i + 1] || String(i + 1);

                // Bölümün ilk sayfasının dizinini sakla (TOC için)
                const openingPageIdx = this.pages.length;

                // İçeriği chapter-head ile zenginleştir
                const enrichedContent = [
                    {
                        style:    "chapter-head",
                        eyebrow:  kisim ? kisim.full : "",
                        num:      num,
                        title:    story.title,
                        subtitle: story.subtitle || ""
                    },
                    ...story.content,
                    /* Bölüm sonu işareti — yalnız son sayfada görünür,
                       ama bütün içeriğin sonuna eklenir, sayfalama
                       onu doğal olarak son sayfaya koyar. */
                    { style: "chapter-end" }
                ];

                const paginated = this._paginate(enrichedContent);

                paginated.forEach((html, idx) => {
                    const isFirst = idx === 0;
                    const isLast  = idx === paginated.length - 1;
                    this.pages.push({
                        kind: PAGE_KINDS.STORY,
                        html: this._storyPageHtml(html, isFirst, isLast, story, kisim, num),
                        chapter: story.title,
                        folio: "",
                        story:   story.id,
                        opening: isFirst,
                        ending:  isLast
                    });
                });

                tocEntries.push({
                    num,
                    title: story.title,
                    civ:   kisim ? kisim.full : "",
                    civId: story.civilization,
                    openingPageIdx,
                    storyId: story.id
                });

                if (typeof this.onProgress === "function") {
                    this.onProgress(i + 1, stories.length);
                }
                if ((i + 1) % YIELD_EVERY === 0 && i + 1 < stories.length) {
                    await yieldToBrowser();
                }
            }

            // 5) Hatime — sona kadar akmasından sonra
            this.pages.push({
                kind: PAGE_KINDS.EPILOGUE,
                html: this._epilogueHtml(book),
                chapter: "Hatime",
                folio: ""
            });

            // 6) Arka kapak için çift sayfaya tamamla (yalnız sona)
            if (this.pages.length % 2 === 1) {
                this.pages.push({ kind: PAGE_KINDS.BLANK, html: `<div class="page__inner"></div>`, chapter: "", folio: "" });
            }
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: this._backCoverHtml(book), chapter: "", folio: "" });
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: `<div class="page__inner"></div>`, chapter: "", folio: "" });

            // 7) Varak numaraları (ilk bölüm açılışından itibaren)
            let folio = 1;
            const firstStoryIdx = this.pages.findIndex(p => p.kind === PAGE_KINDS.STORY);
            for (let i = 0; i < this.pages.length; i++) {
                if (i < firstStoryIdx) continue;
                const p = this.pages[i];
                if (p.kind === PAGE_KINDS.BLANK) continue;
                p.folio = ROMAN[folio] || String(folio);
                folio++;
            }

            tocEntries.forEach(e => {
                const page = this.pages[e.openingPageIdx];
                e.folio = page ? page.folio : "";
            });
            tocEntries.forEach(e => {
                this.storyToSpread.set(e.storyId, Math.floor(e.openingPageIdx / 2));
            });

            this._writeTocPages(tocPlaceholderIndex, tocEntries, tocPagesNeeded);
            this.tocEntries = tocEntries;
        }

        _pairSpreads() {
            this.spreads = [];
            for (let i = 0; i < this.pages.length; i += 2) {
                this.spreads.push([i, this.pages[i + 1] ? i + 1 : null]);
            }
        }

        // ────── HTML inşa ediciler ──────

        _coverHtml(book) {
            return `
                <div class="page__inner">
                  <div class="cover">
                    <div class="cover__crest" aria-hidden="true">
                      <svg viewBox="0 0 100 100" fill="none">
                        <defs>
                          <radialGradient id="crestG" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#e6c170"/>
                            <stop offset="100%" stop-color="#5a3a10"/>
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="44" stroke="url(#crestG)" stroke-width="0.7" fill="none"/>
                        <circle cx="50" cy="50" r="34" stroke="url(#crestG)" stroke-width="0.4" fill="none"/>
                        <g stroke="url(#crestG)" stroke-width="0.6" fill="url(#crestG)" opacity="0.85" transform="translate(50 50)">
                          <path d="M 0 -32 L 7 -10 L 30 -10 L 12 4 L 19 25 L 0 12 L -19 25 L -12 4 L -30 -10 L -7 -10 Z"/>
                        </g>
                        <circle cx="50" cy="50" r="4" fill="#0e0a08"/>
                        <circle cx="50" cy="50" r="1.8" fill="url(#crestG)"/>
                      </svg>
                    </div>
                    <div class="cover__series">${escapeHtml(book.series)}</div>
                    <h1 class="cover__title">${escapeHtml(book.title)}</h1>
                    <p class="cover__subtitle">${escapeHtml(book.subtitle)}</p>
                    <div class="cover__divider" aria-hidden="true"></div>
                    <p class="cover__epigraph">${escapeHtml(book.epigraph)}</p>
                    <div class="cover__edition">${escapeHtml(book.edition)}</div>
                  </div>
                </div>
            `;
        }

        _backCoverHtml(book) {
            return `
                <div class="page__inner">
                  <div class="cover" style="justify-content:center;">
                    <div class="cover__crest" aria-hidden="true" style="opacity:0.55;">
                      <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#a8842c" stroke-width="0.5"/>
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#a8842c" stroke-width="0.4"/>
                      </svg>
                    </div>
                    <div class="cover__series" style="margin-top:2rem;">Cilt Burada Kapanır</div>
                  </div>
                </div>
            `;
        }

        _titleHtml(book) {
            const kisimChips = NS.civilizations
                .map(c => `<span class="title-page__chip">${escapeHtml(c.name)}</span>`)
                .join("");
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="title-page">
                      <div class="title-page__series">${escapeHtml(book.series)}</div>
                      <h1 class="title-page__title">${escapeHtml(book.title)}</h1>
                      <p class="title-page__subtitle">${escapeHtml(book.subtitle)}</p>
                      <div class="title-page__rule" aria-hidden="true"></div>
                      <p class="title-page__epigraph">${escapeHtml(book.epigraph)}</p>
                      <div class="title-page__chips">${kisimChips}</div>
                    </div>
                  </div>
                </div>
            `;
        }

        _writeTocPages(startIdx, entries, totalPages) {
            const perPage = Math.ceil(entries.length / totalPages);
            for (let p = 0; p < totalPages; p++) {
                const slice = entries.slice(p * perPage, (p + 1) * perPage);
                if (!slice.length) {
                    this.pages[startIdx + p].html = `<div class="page__inner"></div>`;
                    continue;
                }
                const first = slice[0].num;
                const last = slice[slice.length - 1].num;
                this.pages[startIdx + p].html = this._tocPageHtml(
                    p === 0 ? "Fihrist" : "Fihrist (devamı)",
                    `${first} — ${last}`,
                    slice
                );
            }
        }

        _tocPageHtml(title, eyebrow, entries) {
            const items = entries.map(e => `
                <li class="toc-page__item" data-story-jump="${escapeHtml(e.storyId)}" role="link" tabindex="0">
                  <span class="toc-page__num">${e.num}.</span>
                  <span class="toc-page__name">${escapeHtml(e.title)}</span>
                  <span class="toc-page__civ">${escapeHtml(e.civ)}</span>
                  <span class="toc-page__page">${e.folio}</span>
                </li>
            `).join("");
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="toc-page">
                      <div class="toc-page__header">
                        <div class="toc-page__eyebrow">${escapeHtml(eyebrow)}</div>
                        <h2 class="toc-page__title">${escapeHtml(title)}</h2>
                      </div>
                      <ul class="toc-page__list">${items}</ul>
                    </div>
                  </div>
                </div>
            `;
        }

        /* Bölüm sayfası: ister ilk sayfa olsun (chapter-head içerir),
           ister devam, ister son — hepsi aynı _storyPageHtml ile sarılır.
           Devam sayfalarında drop-cap baskılanır (page--continuation). */
        _storyPageHtml(bodyHtml, isFirst, isLast, story, kisim, _num) {
            const continuationCls = isFirst ? "" : " page--continuation";
            const endingCls       = isLast  ? " page--ending"       : "";
            const openingCls      = isFirst ? " page--opening"      : "";
            const kisimName       = kisim ? kisim.name : "";

            // İlk sayfada chapter-mark gizli (chapter-head zaten orada);
            // devam sayfalarında üst kenarda küçük belirteç vardır.
            const chapterMark = isFirst
                ? ""
                : `<div class="page__chapter-mark">${escapeHtml(story.title)} · ${escapeHtml(kisimName)}</div>`;

            return `
                <div class="page__inner${continuationCls}${endingCls}${openingCls}">
                  ${chapterMark}
                  <div class="page__content">
                    <div class="story-body">${bodyHtml}</div>
                  </div>
                </div>
            `;
        }

        _epilogueHtml(book) {
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="epilogue">
                      <h2 class="epilogue__title">Hatime</h2>
                      <p class="epilogue__text">${escapeHtml(book.epilogueText)}</p>
                      <div class="epilogue__rule" aria-hidden="true"></div>
                      <p class="epilogue__text" style="font-size:0.95rem;">Bu kitabe, Sâkin Vasıl tarîkâtının yedi defterinden, Hâne Korsend’in Cam Mahzeni’nden ve Vehdâr’ın yedi kum sayfasından derlenmiştir. Tipografi: Cinzel, Cormorant Garamond, EB Garamond, Maguntia Fraktur.</p>
                      <div class="epilogue__seal" aria-hidden="true">❦</div>
                    </div>
                  </div>
                </div>
            `;
        }

        // ────── mount + gezinme ──────

        _mountInitial() {
            this.root.innerHTML = "";
            const left = document.createElement("div");
            left.className = "page page--left page--current";
            const right = document.createElement("div");
            right.className = "page page--right page--current";
            this.root.appendChild(left);
            this.root.appendChild(right);
            this._renderSpread(this.spread, left, right);
            const bookEl = this.root.closest(".book");
            if (bookEl) bookEl.classList.add("is-ready");
        }

        _renderSpread(spreadIdx, leftEl, rightEl) {
            const [li, ri] = this.spreads[spreadIdx] || [null, null];
            const lp = li !== null ? this.pages[li] : null;
            const rp = ri !== null ? this.pages[ri] : null;
            this._writePage(leftEl, lp, "left");
            this._writePage(rightEl, rp, "right");
        }

        _writePage(el, page, _side) {
            if (!page) {
                el.innerHTML = `<div class="page__inner"></div>`;
                return;
            }
            const folio = page.folio
                ? `<div class="page__folio">${escapeHtml(page.folio)}</div>`
                : "";
            const curl = `<div class="page__curl" aria-hidden="true"></div>`;
            el.innerHTML = page.html + folio + curl;
        }

        // ────── public API ──────
        getSpreadCount() { return this.spreads.length; }
        getCurrentSpread() { return this.spread; }
        getCurrentPages() {
            const [li, ri] = this.spreads[this.spread] || [null, null];
            return [
                li !== null ? this.pages[li] : null,
                ri !== null ? this.pages[ri] : null
            ];
        }
        getCurrentChapterLabel() {
            const [lp, rp] = this.getCurrentPages();
            return (rp && rp.chapter) || (lp && lp.chapter) || "";
        }
        getCurrentFolioRange() {
            const [lp, rp] = this.getCurrentPages();
            const lf = lp ? lp.folio : "";
            const rf = rp ? rp.folio : "";
            if (lf && rf) return `${lf} — ${rf}`;
            return lf || rf || "—";
        }

        async next() { return this._turn(+1); }
        async prev() { return this._turn(-1); }

        async goToSpread(spreadIdx) {
            spreadIdx = Math.max(0, Math.min(this.spreads.length - 1, spreadIdx | 0));
            if (spreadIdx === this.spread) return;
            const dir = spreadIdx > this.spread ? +1 : -1;
            const distance = Math.abs(spreadIdx - this.spread);
            if (distance === 1) {
                await this._turn(dir);
                return;
            }
            this.spread = spreadIdx;
            const [leftEl, rightEl] = this._currentDomPair();
            leftEl.classList.add("page--fade");
            rightEl.classList.add("page--fade");
            this._renderSpread(this.spread, leftEl, rightEl);
            requestAnimationFrame(() => {
                leftEl.classList.remove("page--fade");
                rightEl.classList.remove("page--fade");
            });
            this._fireSpreadChange();
        }

        async goToStory(storyId) {
            const idx = this.storyToSpread.get(storyId);
            if (typeof idx === "number") {
                await this.goToSpread(idx);
                return true;
            }
            return false;
        }

        _currentDomPair() {
            return [this.root.querySelector(".page--left"), this.root.querySelector(".page--right")];
        }

        async _turn(direction) {
            if (this.isAnimating) return;
            const newSpread = this.spread + direction;
            if (newSpread < 0 || newSpread >= this.spreads.length) return;

            this.isAnimating = true;
            const [leftEl, rightEl] = this._currentDomPair();

            const reduceMotion = (typeof window.matchMedia === "function")
                ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
                : false;

            if (reduceMotion) {
                this.spread = newSpread;
                this._renderSpread(this.spread, leftEl, rightEl);
                this.isAnimating = false;
                this._fireSpreadChange();
                return;
            }

            const target = this.spreads[newSpread];
            const targetLeft = this.pages[target[0]];
            const targetRight = target[1] !== null ? this.pages[target[1]] : null;

            const sourceEl = direction === +1 ? rightEl : leftEl;
            const baseClass = direction === +1
                ? "page page--right page--turning"
                : "page page--left page--turning";
            const triggerClass = direction === +1 ? "page--turn-forward" : "page--turn-backward";

            const turnEl = document.createElement("div");
            turnEl.className = baseClass;
            turnEl.innerHTML = sourceEl.innerHTML;
            turnEl.style.willChange = "transform, opacity";
            this.root.appendChild(turnEl);

            this._writePage(leftEl, targetLeft, "left");
            this._writePage(rightEl, targetRight, "right");

            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            turnEl.classList.add(triggerClass);

            await this._waitForTransition(turnEl);
            turnEl.style.willChange = "auto";
            turnEl.remove();

            this.spread = newSpread;
            this.isAnimating = false;
            this._fireSpreadChange();
        }

        _waitForTransition(el) {
            return new Promise(resolve => {
                let done = false;
                const handler = () => {
                    if (done) return;
                    done = true;
                    el.removeEventListener("transitionend", handler);
                    resolve();
                };
                el.addEventListener("transitionend", handler);
                setTimeout(() => { if (!done) { done = true; resolve(); } }, 1300);
            });
        }

        _fireSpreadChange() {
            if (typeof this.onSpreadChange === "function") {
                this.onSpreadChange(this.spread);
            }
        }
    }

    NS.BookEngine = BookEngine;
    NS.PAGE_KINDS = PAGE_KINDS;
})();
