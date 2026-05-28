/* ════════════════════════════════════════════════════════════════
   book.js — Sayfa motoru (Lazy Pagination v2)
   Eager faz: ön matter + ilk 3 bölüm + arka matter (yapı tamam).
   Lazy faz: arka plan idle build, sayfa dizisine splice eder.
   TOC'tan ileri sıçramada sync catch-up.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.TUZ;

    const PAGE_KINDS = {
        COVER: "cover",
        TOC: "toc",
        ACT_TITLE: "act-title",
        CHAPTER_OPENING: "chapter-opening",
        STORY: "story",
        EPILOGUE: "epilogue",
        BLANK: "blank"
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

    function paragraphHtml(item) {
        if (typeof item === "string") {
            return `<p>${escapeHtml(item)}</p>`;
        }
        if (item && item.style === "quote") {
            return `<p data-style="quote">${escapeHtml(item.text || "")}</p>`;
        }
        if (item && item.style === "hr") {
            return `<p data-style="hr">◇ ◇ ◇</p>`;
        }
        return "";
    }

    const ROMAN_ONES = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    function toRoman(n) {
        if (n <= 0) return "";
        if (n >= 100) return "C" + toRoman(n - 100);
        return ROMAN_TENS[Math.floor(n / 10)] + ROMAN_ONES[n % 10];
    }
    const ROMAN = new Proxy({}, { get(_, key) { return toRoman(Number(key)); } });

    const BLANK_INNER = `<div class="page__inner"></div>`;

    // ──────────────────────────────────────────────────────────────
    // BookEngine — Lazy Pagination
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
            this.onLazyProgress = null;
            this.onLazyComplete = null;
            this.entryToSpread = new Map();

            // Lazy pagination state
            this._builtChapters = new Set();
            this._eagerChapterCount = 3;
            this._lazyComplete = false;
            this._lazyScheduled = false;
            this._tocPlaceholderStart = -1;
            this._tocPagesCount = 0;
            this._backMatterStart = -1;
            this._tocEntries = [];
            this._lazyTimeoutHandle = null;
        }

        async build() {
            this._createMeasureEl();
            await this._buildEagerStructure();
            this._pairSpreads();
            this._recomputeFolios();
            this._renderTocPages();
            this._mountInitial();
            // Eager fazı bitti; lazy fazı ilk paint sonrası başlasın.
            requestAnimationFrame(() => requestAnimationFrame(() => {
                this._scheduleLazy();
            }));
        }

        // ────────────────────────── Ölçüm scratch ──────────────────────────

        _createMeasureEl() {
            if (this.measureEl) return;
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
            this._frameHeight = this.measureFrame.clientHeight;
        }
        _removeMeasureEl() {
            if (this.measureEl && this.measureEl.parentNode) {
                this.measureEl.parentNode.removeChild(this.measureEl);
            }
            this.measureEl = null;
            this.measureContent = null;
            this.measureFrame = null;
        }
        _measureFits(html) {
            this.measureContent.innerHTML = html;
            return this.measureContent.scrollHeight <= this._frameHeight;
        }

        // ────────────────────────── Pagination ──────────────────────────

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

                if (lo === 1 && cursor + 1 <= htmls.length) {
                    const trial = htmls[cursor].html;
                    if (!this._measureFits(trial)) {
                        const sliced = this._splitOversizedParagraph(htmls[cursor].item);
                        htmls.splice(cursor, 1, ...sliced.map(s => ({ html: s, item: null })));
                        continue;
                    }
                }

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

                pages.push(htmls.slice(cursor, cursor + fits).map(h => h.html).join(""));
                cursor += fits;
            }

            if (pages.length === 0) pages.push("");
            return pages;
        }

        _splitOversizedParagraph(item) {
            const text = (typeof item === "string") ? item : (item.text || "");
            const style = (typeof item === "string") ? null : item.style;
            const sentences = text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) || [text];
            const wrap = (txt) => style === "quote"
                ? `<p data-style="quote">${escapeHtml(txt)}</p>`
                : `<p>${escapeHtml(txt)}</p>`;

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

        // ────────────────────────── Eager build ──────────────────────────

        async _buildEagerStructure() {
            const entries = NS.entries;
            const acts = NS.categories;
            const book = NS.book;

            // 1. Ön matter — kapak ve başlık spread'i
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            this.pages.push({
                kind: PAGE_KINDS.COVER,
                html: this._coverHtml(book),
                chapter: "", folio: ""
            });
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: this._titleHtml(book, acts),
                chapter: "", folio: ""
            });

            // 2. Fihrist yer tutucuları
            const TOC_ENTRIES_PER_PAGE = 12;
            let tocPagesNeeded = Math.max(2, Math.ceil(entries.length / TOC_ENTRIES_PER_PAGE));
            if (tocPagesNeeded % 2 === 1) tocPagesNeeded++;
            this._tocPlaceholderStart = this.pages.length;
            this._tocPagesCount = tocPagesNeeded;
            for (let i = 0; i < tocPagesNeeded; i++) {
                this.pages.push({ kind: PAGE_KINDS.TOC, html: "", chapter: "Fihrist", folio: "" });
            }

            // 3. Tüm bölümler için TOC kayıt iskeleti (folio "—" başlangıçta)
            for (let i = 0; i < entries.length; i++) {
                const e = entries[i];
                const a = NS.categoryById(e.category);
                const num = ROMAN[i + 1] || String(i + 1);
                this._tocEntries.push({
                    num,
                    title: e.title,
                    civ: a ? a.full : "",
                    civId: e.category,
                    folioPage: -1,
                    folio: "—",
                    storyId: e.id
                });
            }

            // 4. İlk N bölümü eager paginate
            const eager = Math.min(this._eagerChapterCount, entries.length);
            for (let i = 0; i < eager; i++) {
                this._appendChapterAtEnd(i);
                if (typeof this.onProgress === "function") {
                    this.onProgress(i + 1, eager);
                }
                if (i + 1 < eager) {
                    await yieldToBrowser();
                }
            }

            // 5. Arka matter — bu sayfalardan önce lazy bölümler splice edilecek
            this._addBackMatter(book);
        }

        _appendChapterAtEnd(i) {
            // Bölümü pages dizisinin sonuna ekler. Yalnızca eager fazda kullanılır.
            const entries = NS.entries;
            const entry = entries[i];
            const act = NS.categoryById(entry.category);
            const num = ROMAN[i + 1] || String(i + 1);

            // Yeni akt başlangıcı: hizalama + akt başlığı
            const prevPage = this.pages[this.pages.length - 1];
            const lastActId = this._findCurrentActId(this.pages.length);
            if (act && act.id !== lastActId) {
                if (this.pages.length % 2 === 1) {
                    this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
                }
                this.pages.push({
                    kind: PAGE_KINDS.ACT_TITLE,
                    html: this._actTitleHtml(act),
                    chapter: act.name,
                    folio: ""
                });
            }

            // Bölüm açılışı sağda olmalı
            if (this.pages.length % 2 === 1) {
                this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            }

            const openingIdx = this.pages.length;
            this.pages.push({
                kind: PAGE_KINDS.CHAPTER_OPENING,
                html: this._chapterOpeningHtml(entry, act, num),
                chapter: entry.title,
                folio: ""
            });

            const paginated = this._paginate(entry.content);
            paginated.forEach((html, idx) => {
                const isContinuation = idx > 0;
                const isLast = idx === paginated.length - 1;
                this.pages.push({
                    kind: PAGE_KINDS.STORY,
                    html: this._storyPageHtml(html, isContinuation, isLast, entry, act, num),
                    chapter: entry.title,
                    folio: "",
                    story: entry.id,
                    continuation: isContinuation,
                    ending: isLast
                });
            });

            this._builtChapters.add(i);
            const tocEntry = this._tocEntries[i];
            if (tocEntry) tocEntry.folioPage = openingIdx;
        }

        _addBackMatter(book) {
            if (this.pages.length % 2 === 1) {
                this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            }
            this._backMatterStart = this.pages.length;
            this.pages.push({
                kind: PAGE_KINDS.EPILOGUE,
                html: this._epilogueHtml(book),
                chapter: "Mühür",
                folio: ""
            });
            if (this.pages.length % 2 === 1) {
                this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            }
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: this._backCoverHtml(book),
                chapter: "",
                folio: ""
            });
            this.pages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
        }

        // ────────────────────────── Lazy build ──────────────────────────

        _scheduleLazy() {
            if (this._lazyScheduled || this._lazyComplete) return;
            this._lazyScheduled = true;
            this._lazyTick();
        }

        _lazyTick() {
            const entries = NS.entries;
            const nextIdx = this._findNextUnbuilt();
            if (nextIdx < 0) {
                this._completeLazy();
                return;
            }

            const run = () => {
                this._lazyTimeoutHandle = null;
                if (this._builtChapters.has(nextIdx)) {
                    // Senkron catch-up bizden önce yaptı; sıraya devam et
                    this._lazyTick();
                    return;
                }
                this._createMeasureEl();
                try {
                    this._insertChapterBeforeBackMatter(nextIdx);
                } finally {
                    this._removeMeasureEl();
                }
                this._pairSpreads();
                this._recomputeFolios();
                this._renderTocPages();
                if (typeof this.onLazyProgress === "function") {
                    this.onLazyProgress(this._builtChapters.size, entries.length);
                }
                this._lazyTick();
            };

            if (typeof window.requestIdleCallback === "function") {
                this._lazyTimeoutHandle = window.requestIdleCallback(run, { timeout: 800 });
            } else {
                this._lazyTimeoutHandle = setTimeout(run, 60);
            }
        }

        _findNextUnbuilt() {
            const entries = NS.entries;
            for (let i = 0; i < entries.length; i++) {
                if (!this._builtChapters.has(i)) return i;
            }
            return -1;
        }

        _completeLazy() {
            if (this._lazyComplete) return;
            this._lazyComplete = true;
            if (typeof this.onLazyComplete === "function") {
                this.onLazyComplete();
            }
        }

        _insertChapterBeforeBackMatter(i) {
            const entries = NS.entries;
            const entry = entries[i];
            const act = NS.categoryById(entry.category);
            const num = ROMAN[i + 1] || String(i + 1);

            const insertAt = this._backMatterStart;
            const newPages = [];

            // Akt başlığı gerekli mi? Insertion noktasından önceki bölümün akt'ına bak.
            const lastActId = this._findCurrentActId(insertAt);
            if (act && act.id !== lastActId) {
                // Akt başlığı için hizalama gerekirse blank
                if ((insertAt + newPages.length) % 2 === 1) {
                    newPages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
                }
                newPages.push({
                    kind: PAGE_KINDS.ACT_TITLE,
                    html: this._actTitleHtml(act),
                    chapter: act.name,
                    folio: ""
                });
            }

            // Bölüm açılışı sağ sayfada olsun
            if ((insertAt + newPages.length) % 2 === 1) {
                newPages.push({ kind: PAGE_KINDS.BLANK, html: BLANK_INNER, chapter: "", folio: "" });
            }

            const openingPageIdx = insertAt + newPages.length;
            newPages.push({
                kind: PAGE_KINDS.CHAPTER_OPENING,
                html: this._chapterOpeningHtml(entry, act, num),
                chapter: entry.title,
                folio: ""
            });

            const paginated = this._paginate(entry.content);
            paginated.forEach((html, idx) => {
                const isContinuation = idx > 0;
                const isLast = idx === paginated.length - 1;
                newPages.push({
                    kind: PAGE_KINDS.STORY,
                    html: this._storyPageHtml(html, isContinuation, isLast, entry, act, num),
                    chapter: entry.title,
                    folio: "",
                    story: entry.id,
                    continuation: isContinuation,
                    ending: isLast
                });
            });

            // Splice
            this.pages.splice(insertAt, 0, ...newPages);
            this._backMatterStart += newPages.length;
            this._builtChapters.add(i);

            const tocEntry = this._tocEntries[i];
            if (tocEntry) tocEntry.folioPage = openingPageIdx;
        }

        _findCurrentActId(beforeIdx) {
            // beforeIdx'den önce gelen son chapter / act-title'ın akt id'sini bul
            for (let k = beforeIdx - 1; k >= 0; k--) {
                const p = this.pages[k];
                if (p.kind === PAGE_KINDS.STORY && p.story) {
                    const ent = NS.entries.find(e => e.id === p.story);
                    return ent ? ent.category : null;
                }
                if (p.kind === PAGE_KINDS.CHAPTER_OPENING) {
                    const ent = NS.entries.find(e => e.title === p.chapter);
                    return ent ? ent.category : null;
                }
                if (p.kind === PAGE_KINDS.ACT_TITLE) {
                    const act = NS.categories.find(a => a.name === p.chapter);
                    return act ? act.id : null;
                }
            }
            return null;
        }

        // ────────────────────────── Folio + TOC güncellemesi ──────────────────────────

        _pairSpreads() {
            this.spreads = [];
            for (let i = 0; i < this.pages.length; i += 2) {
                this.spreads.push([i, this.pages[i + 1] ? i + 1 : null]);
            }
        }

        _recomputeFolios() {
            // İlk bölüm açılışından itibaren folio numaralandırma
            let folio = 1;
            const firstChapterIdx = this.pages.findIndex(p => p.kind === PAGE_KINDS.CHAPTER_OPENING);
            for (let i = 0; i < this.pages.length; i++) {
                const p = this.pages[i];
                if (i < firstChapterIdx) {
                    p.folio = "";
                    continue;
                }
                if (p.kind === PAGE_KINDS.BLANK || p.kind === PAGE_KINDS.ACT_TITLE) {
                    p.folio = "";
                    continue;
                }
                p.folio = ROMAN[folio] || String(folio);
                folio++;
            }

            // entryToSpread yeniden inşa et — bölüm açılış konumlarından
            this.entryToSpread.clear();
            for (let i = 0; i < this.pages.length; i++) {
                const p = this.pages[i];
                if (p.kind === PAGE_KINDS.CHAPTER_OPENING && p.chapter) {
                    const ent = NS.entries.find(e => e.title === p.chapter);
                    if (ent) {
                        this.entryToSpread.set(ent.id, Math.floor(i / 2));
                    }
                }
            }

            // TOC kayıt folio'larını güncelle
            this._tocEntries.forEach(te => {
                if (te.folioPage >= 0 && te.folioPage < this.pages.length) {
                    te.folio = this.pages[te.folioPage].folio || "—";
                } else {
                    te.folio = "—";
                }
            });
        }

        _renderTocPages() {
            const totalPages = this._tocPagesCount;
            const startIdx = this._tocPlaceholderStart;
            const perPage = Math.ceil(this._tocEntries.length / totalPages);
            for (let p = 0; p < totalPages; p++) {
                const slice = this._tocEntries.slice(p * perPage, (p + 1) * perPage);
                if (!slice.length) {
                    this.pages[startIdx + p].html = BLANK_INNER;
                    continue;
                }
                const first = slice[0].num;
                const last = slice[slice.length - 1].num;
                this.pages[startIdx + p].html = this._tocPageHtml("Fihrist", `${first} — ${last}`, slice);
            }
            // Mevcut spread TOC sayfasını gösteriyorsa, yeniden yaz
            this._refreshCurrentSpreadIfTocVisible();
        }

        _refreshCurrentSpreadIfTocVisible() {
            const [lp, rp] = this.getCurrentPages();
            const isTocVisible = (lp && lp.kind === PAGE_KINDS.TOC) || (rp && rp.kind === PAGE_KINDS.TOC);
            if (isTocVisible) {
                const [leftEl, rightEl] = this._currentDomPair();
                if (leftEl && rightEl) {
                    this._renderSpread(this.spread, leftEl, rightEl);
                }
            }
        }

        // ────────────────────────── HTML üreteçleri ──────────────────────────

        _coverHtml(book) {
            return `
                <div class="page__inner">
                  <div class="cover">
                    <div class="cover__crest" aria-hidden="true">
                      <svg viewBox="0 0 120 120" fill="none">
                        <defs>
                          <radialGradient id="cvSalt" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#e8eef2" stop-opacity="0.95"/>
                            <stop offset="55%" stop-color="#a8b8c0" stop-opacity="0.75"/>
                            <stop offset="100%" stop-color="#3a4a52" stop-opacity="0.2"/>
                          </radialGradient>
                          <linearGradient id="cvThread" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#7a8c98"/>
                            <stop offset="50%" stop-color="#c4d0d8"/>
                            <stop offset="100%" stop-color="#4a5a64"/>
                          </linearGradient>
                        </defs>
                        <g transform="translate(60 60)">
                          <polygon points="0,-44 30,-16 30,18 0,44 -30,18 -30,-16"
                                   fill="url(#cvSalt)" stroke="#8a9aa4" stroke-width="0.6" opacity="0.88"/>
                          <polygon points="0,-26 18,-10 18,12 0,26 -18,12 -18,-10"
                                   fill="none" stroke="#a8b8c0" stroke-width="0.45" opacity="0.65"/>
                          <path d="M -24 -10 Q 0 0 26 12"
                                fill="none" stroke="url(#cvThread)" stroke-width="0.9" opacity="0.92"/>
                        </g>
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
                      <svg viewBox="0 0 120 120">
                        <g transform="translate(60 60)">
                          <polygon points="0,-32 22,-12 22,14 0,32 -22,14 -22,-12"
                                   fill="none" stroke="#8a9aa4" stroke-width="0.5"/>
                        </g>
                      </svg>
                    </div>
                    <div class="cover__series" style="margin-top:2rem;">Hitâm — Burada Tükenir</div>
                    <p class="cover__epigraph" style="margin-top:2rem; max-width:74%;">${escapeHtml(book.backText || "")}</p>
                  </div>
                </div>
            `;
        }

        _titleHtml(book, acts) {
            const chips = acts
                .map(a => `<span class="chapter-opening__theme">${escapeHtml(a.name)}</span>`)
                .join("");
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="chapter-opening" style="border:none; padding-top:3rem;">
                      <div class="chapter-opening__civ-mark">${escapeHtml(book.series)}</div>
                      <h1 class="chapter-opening__title" style="margin-bottom:1.2rem;">${escapeHtml(book.title)}</h1>
                      <p class="chapter-opening__subtitle">${escapeHtml(book.subtitle)}</p>
                      <div class="chapter-opening__divider"></div>
                      <p class="chapter-opening__subtitle" style="font-style:italic;max-width:82%;">${escapeHtml(book.epigraph)}</p>
                      <div class="chapter-opening__themes" style="margin-top:2rem;">${chips}</div>
                    </div>
                  </div>
                </div>
            `;
        }

        _actTitleHtml(act) {
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="chapter-opening" style="--act-color:${act.accent || 'var(--c-gold)'};">
                      <div class="chapter-opening__civ-mark">${escapeHtml(act.epoch || "")}</div>
                      <div class="chapter-opening__num">${escapeHtml(act.sigil || "◇")}</div>
                      <h2 class="chapter-opening__title">${escapeHtml(act.full)}</h2>
                      <div class="chapter-opening__divider"></div>
                      <p class="chapter-opening__subtitle">${escapeHtml(act.description || "")}</p>
                    </div>
                  </div>
                </div>
            `;
        }

        _tocPageHtml(title, eyebrow, entries) {
            const items = entries.map(e => `
                <li class="toc-page__item" data-story-jump="${e.storyId}" role="link" tabindex="0">
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

        _chapterOpeningHtml(entry, act, num) {
            const themes = (entry.themes || []).map(t => `<span class="chapter-opening__theme">${escapeHtml(t)}</span>`).join("");
            const accent = act && act.accent ? act.accent : "var(--c-gold)";
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="chapter-opening" style="--act-color:${accent};">
                      <div class="chapter-opening__civ-mark">${escapeHtml(act ? act.full : "")}</div>
                      <div class="chapter-opening__num">${num}</div>
                      <h2 class="chapter-opening__title">${escapeHtml(entry.title)}</h2>
                      <p class="chapter-opening__subtitle">${escapeHtml(entry.subtitle || "")}</p>
                      <div class="chapter-opening__divider"></div>
                      <div class="chapter-opening__themes">${themes}</div>
                    </div>
                  </div>
                </div>
            `;
        }

        _storyPageHtml(bodyHtml, isContinuation, isLast, entry, act, num) {
            const endingMark = isLast ? `<div class="chapter-end">◇</div>` : "";
            const continuationCls = isContinuation ? " page--continuation" : "";
            const actName = act ? act.name : "";
            return `
                <div class="page__inner${continuationCls}">
                  <div class="page__chapter-mark">${escapeHtml(entry.title)} · ${escapeHtml(actName)}</div>
                  <div class="page__content">
                    <div class="story-body">${bodyHtml}${endingMark}</div>
                  </div>
                </div>
            `;
        }

        _epilogueHtml(book) {
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="epilogue">
                      <h2 class="epilogue__title">Mühür</h2>
                      <p class="epilogue__text">${escapeHtml(book.epilogueText)}</p>
                      <div class="chapter-opening__divider" style="width:140px;"></div>
                      <p class="epilogue__text" style="font-size:0.95rem;">${escapeHtml(book.colophon)}</p>
                      <div class="epilogue__seal" aria-hidden="true">◇</div>
                    </div>
                  </div>
                </div>
            `;
        }

        // ────────────────────────── Mount + Nav ──────────────────────────

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

        _writePage(el, page, side) {
            if (!page) {
                el.innerHTML = BLANK_INNER;
                return;
            }
            const folio = page.folio
                ? `<div class="page__folio">${escapeHtml(page.folio)}</div>`
                : "";
            const curl = `<div class="page__curl" aria-hidden="true"></div>`;
            el.innerHTML = page.html + folio + curl;
        }

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
            const distance = Math.abs(spreadIdx - this.spread);
            if (distance === 1) {
                await this._turn(spreadIdx > this.spread ? +1 : -1);
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

        async goToEntry(entryId) {
            const i = NS.entries.findIndex(e => e.id === entryId);
            if (i < 0) return false;

            // Sync catch-up — eğer hedef bölüm henüz lazy fazda inşa edilmediyse
            if (!this._builtChapters.has(i)) {
                this._syncBuildChaptersUpTo(i);
            }

            const spread = this.entryToSpread.get(entryId);
            if (typeof spread === "number") {
                await this.goToSpread(spread);
                return true;
            }
            return false;
        }

        async goToStory(entryId) { return this.goToEntry(entryId); }

        _syncBuildChaptersUpTo(targetI) {
            const entries = NS.entries;
            this._createMeasureEl();
            try {
                while (!this._builtChapters.has(targetI) && this._builtChapters.size < entries.length) {
                    const nextIdx = this._findNextUnbuilt();
                    if (nextIdx < 0 || nextIdx > targetI) break;
                    this._insertChapterBeforeBackMatter(nextIdx);
                }
            } finally {
                this._removeMeasureEl();
            }
            this._pairSpreads();
            this._recomputeFolios();
            this._renderTocPages();
            if (typeof this.onLazyProgress === "function") {
                this.onLazyProgress(this._builtChapters.size, entries.length);
            }
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
                setTimeout(() => { if (!done) { done = true; resolve(); } }, 1400);
            });
        }

        _fireSpreadChange() {
            if (typeof this.onSpreadChange === "function") {
                this.onSpreadChange(this.spread);
            }
        }

        // Eski entry-spread map (geriye uyumluluk)
        get tocEntries() { return this._tocEntries; }
    }

    NS.BookEngine = BookEngine;
    NS.PAGE_KINDS = PAGE_KINDS;
})();
