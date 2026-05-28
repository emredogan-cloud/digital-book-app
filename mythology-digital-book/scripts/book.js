/* ════════════════════════════════════════════════════════════════
   book.js
   The page engine. Builds the full sequence of pages from
   stories.js, lays them out as left/right spreads, paginates the
   long-form prose by measurement, and drives the page-turn
   animation.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MYTHOLOGY;

    // ──────────────────────────────────────────────────────────────
    // BUILDER  —  produces an array of "page" descriptors.
    // Each descriptor is: { kind, html, chapter, folio, story? }
    // After building, pages are paired into spreads (2 per spread).
    // ──────────────────────────────────────────────────────────────

    const PAGE_KINDS = {
        COVER: "cover",
        TOC: "toc",
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

    /* PERF: cooperative yield. requestIdleCallback is preferred (gives the
       browser a real idle window); when unavailable we settle for a 0-ms
       MessageChannel post (microtask-quick but still releases the main
       thread between heavy chapter pagination passes). */
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
            return `<p data-style="hr">✦ ✦ ✦</p>`;
        }
        return "";
    }

    function buildAllParagraphsHtml(content) {
        return content.map(paragraphHtml).join("");
    }

    // Romanise small chapter numbers — table covers up to 100 since the
    // codex now ships with 76 stories and we want headroom for expansion.
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
            this.pages = [];          // array of page descriptors
            this.spreads = [];        // each = [leftIdx, rightIdx | null]
            this.spread = 0;          // current spread index
            this.isAnimating = false;
            this.measureEl = null;
            this.onSpreadChange = null;
            this.storyToSpread = new Map();  // storyId -> spread index of opening
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
            const stage = this.root.parentElement; // .stage
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
           PERF: rewrote from a per-paragraph greedy walk (~500 layout
           reads on a full build) to a chunked exponential-then-linear
           scheme:

             1. Try doubling the chunk size (1 → 2 → 4 → 8) until it
                overflows or we run out of paragraphs.
             2. Back off to a binary search inside the last successful
                step to find the exact boundary.
             3. Flush, repeat for the next page.

           For an average ~25-paragraph story this drops measurement
           cost to ~6 layout reads per page (≈3× fewer reads overall),
           and it scales sub-linearly with document length. ─────── */

        _paginate(contentItems, _opts) {
            // Cache frame height once per story — it doesn't change between
            // paragraphs and reading clientHeight on every measure was a
            // hidden source of layout reads.
            this._frameHeight = this.measureFrame.clientHeight;

            // Pre-compile each item's HTML once.
            const htmls = [];
            for (let i = 0; i < contentItems.length; i++) {
                const h = paragraphHtml(contentItems[i]);
                if (h) htmls.push({ html: h, item: contentItems[i] });
            }

            const pages = [];
            let cursor = 0;

            while (cursor < htmls.length) {
                // Phase 1: exponential probe — find a chunk that overflows.
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

                // If even the very first paragraph doesn't fit, sentence-split it.
                if (lo === 1 && cursor + 1 <= htmls.length) {
                    const trial = htmls[cursor].html;
                    if (!this._measureFits(trial)) {
                        const sliced = this._splitOversizedParagraph(htmls[cursor].item);
                        // Replace the single oversized paragraph with the slices, then re-loop.
                        htmls.splice(cursor, 1, ...sliced.map(s => ({ html: s, item: null })));
                        continue;
                    }
                }

                // Phase 2: binary search between lo (fits) and hi (overflowed).
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

        // Split one too-tall paragraph into sentence-sized pieces that each
        // fit individually. Only kicks in for genuinely oversized paragraphs.
        _splitOversizedParagraph(item) {
            const text = (typeof item === "string") ? item : (item.text || "");
            const style = (typeof item === "string") ? null : item.style;
            const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [text];
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

        // -------- assemble all pages --------
        async _buildPages() {
            const stories = NS.stories;
            const book = NS.book;

            // 1. Cover page (left of spread 0; right is empty inside cover)
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: `<div class="page__inner"></div>`,
                chapter: "", folio: ""
            });
            this.pages.push({
                kind: PAGE_KINDS.COVER,
                html: this._coverHtml(book),
                chapter: "", folio: ""
            });

            // 2. Title spread (blank-ish, then full title page)
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: `<div class="page__inner"></div>`,
                chapter: "", folio: ""
            });
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: this._titleHtml(book),
                chapter: "", folio: ""
            });

            // 3. Compute story openings & paginations first so we know
            //    folio numbers, then go back and write the TOC.
            //    We'll reserve N TOC pages now and fill HTML after pagination.
            //    PERF: TOC entry capacity scales with story count — 14 per page
            //    fits comfortably in the visual frame. Rounded up to keep TOC
            //    on facing-page spreads (always even number of pages).
            const TOC_ENTRIES_PER_PAGE = 14;
            let tocPagesNeeded = Math.max(2, Math.ceil(stories.length / TOC_ENTRIES_PER_PAGE));
            if (tocPagesNeeded % 2 === 1) tocPagesNeeded++;  // keep TOC on full spreads
            const tocPlaceholderIndex = this.pages.length;
            for (let i = 0; i < tocPagesNeeded; i++) {
                this.pages.push({ kind: PAGE_KINDS.TOC, html: "", chapter: "Tabula", folio: "" });
            }

            // 4. Each chapter: opening page (right side preferred), then story pages.
            //    PERF: yield to the browser every YIELD_EVERY chapters so a 76-story
            //    build doesn't block paint or input. The progress callback feeds
            //    the loader text so the user sees pagination advance, not a frozen
            //    "Unsealing the codex…" spinner.
            const YIELD_EVERY = 6;
            const tocEntries = [];
            for (let i = 0; i < stories.length; i++) {
                const story = stories[i];
                const civ = NS.civilizationById(story.civilization);
                const num = ROMAN[i + 1] || String(i + 1);

                // Ensure chapter opening lands on a RIGHT page (odd index).
                if (this.pages.length % 2 === 1) {
                    this.pages.push({
                        kind: PAGE_KINDS.BLANK,
                        html: `<div class="page__inner"></div>`,
                        chapter: "", folio: ""
                    });
                }

                const openingIdx = this.pages.length;
                this.pages.push({
                    kind: PAGE_KINDS.CHAPTER_OPENING,
                    html: this._chapterOpeningHtml(story, civ, num),
                    chapter: story.title,
                    folio: ""
                });

                // Paginate story body (chunked exponential search inside)
                const paginated = this._paginate(story.content, {});

                paginated.forEach((html, idx) => {
                    const isContinuation = idx > 0;
                    const isLast = idx === paginated.length - 1;
                    this.pages.push({
                        kind: PAGE_KINDS.STORY,
                        html: this._storyPageHtml(html, isContinuation, isLast, story, civ, num),
                        chapter: story.title,
                        folio: "",
                        story: story.id,
                        continuation: isContinuation,
                        ending: isLast
                    });
                });

                tocEntries.push({
                    num,
                    title: story.title,
                    civ: civ ? civ.full : "",
                    civId: story.civilization,
                    folioPage: openingIdx,
                    storyId: story.id
                });

                if (typeof this.onProgress === "function") {
                    this.onProgress(i + 1, stories.length);
                }
                if ((i + 1) % YIELD_EVERY === 0 && i + 1 < stories.length) {
                    await yieldToBrowser();
                }
            }

            // 5. Epilogue — make sure it lands on a right page
            if (this.pages.length % 2 === 1) {
                this.pages.push({
                    kind: PAGE_KINDS.BLANK,
                    html: `<div class="page__inner"></div>`,
                    chapter: "", folio: ""
                });
            }
            this.pages.push({
                kind: PAGE_KINDS.EPILOGUE,
                html: this._epilogueHtml(book),
                chapter: "Colophon",
                folio: ""
            });

            // Make total page count even so the back cover sits cleanly
            if (this.pages.length % 2 === 1) {
                this.pages.push({
                    kind: PAGE_KINDS.BLANK,
                    html: `<div class="page__inner"></div>`,
                    chapter: "", folio: ""
                });
            }
            // Add a back cover blank
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: this._backCoverHtml(book),
                chapter: "", folio: ""
            });
            this.pages.push({
                kind: PAGE_KINDS.BLANK,
                html: `<div class="page__inner"></div>`,
                chapter: "", folio: ""
            });

            // Compute folio numbers (only for non-cover/blank pages, starting from first chapter opening)
            let folio = 1;
            const firstChapterIdx = this.pages.findIndex(p => p.kind === PAGE_KINDS.CHAPTER_OPENING);
            for (let i = 0; i < this.pages.length; i++) {
                if (i < firstChapterIdx) continue;
                const p = this.pages[i];
                if (p.kind === PAGE_KINDS.BLANK) continue;
                p.folio = ROMAN[folio] || String(folio);
                folio++;
            }

            // Update toc entries with their pages' folio numbers
            tocEntries.forEach(e => {
                const page = this.pages[e.folioPage];
                e.folio = page.folio;
            });

            // Map storyId -> spread containing chapter opening
            tocEntries.forEach(e => {
                this.storyToSpread.set(e.storyId, Math.floor(e.folioPage / 2));
            });

            // Now fill the TOC pages with the computed entry distribution.
            this._writeTocPages(tocPlaceholderIndex, tocEntries, tocPagesNeeded);
            this.tocEntries = tocEntries;
        }

        _pairSpreads() {
            this.spreads = [];
            for (let i = 0; i < this.pages.length; i += 2) {
                this.spreads.push([i, this.pages[i + 1] ? i + 1 : null]);
            }
        }

        // -------- HTML builders for page kinds --------

        _coverHtml(book) {
            return `
                <div class="page__inner">
                  <div class="cover">
                    <div class="cover__crest" aria-hidden="true">
                      <svg viewBox="0 0 100 100" fill="none">
                        <defs>
                          <radialGradient id="crestG" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#f5d98a"/>
                            <stop offset="100%" stop-color="#7a5a1c"/>
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="44" stroke="url(#crestG)" stroke-width="0.7" fill="none"/>
                        <circle cx="50" cy="50" r="34" stroke="url(#crestG)" stroke-width="0.5" fill="none"/>
                        <path d="M50 8 L52 48 L92 50 L52 52 L50 92 L48 52 L8 50 L48 48 Z" fill="url(#crestG)" opacity="0.85"/>
                        <circle cx="50" cy="50" r="6" fill="#1c1410"/>
                        <circle cx="50" cy="50" r="3" fill="url(#crestG)"/>
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
                    <div class="cover__crest" aria-hidden="true" style="opacity:0.6;">
                      <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#c9a14a" stroke-width="0.5"/><circle cx="50" cy="50" r="30" fill="none" stroke="#c9a14a" stroke-width="0.4"/></svg>
                    </div>
                    <div class="cover__series" style="margin-top:2rem;">Finis</div>
                  </div>
                </div>
            `;
        }

        _titleHtml(book) {
            const civChips = NS.civilizations
                .map(c => `<span class="chapter-opening__theme">${escapeHtml(c.name)}</span>`)
                .join("");
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="chapter-opening" style="border:none; padding-top:5rem;">
                      <div class="chapter-opening__civ-mark">Volumen Primum</div>
                      <h1 class="chapter-opening__title" style="margin-bottom:1.2rem;">${escapeHtml(book.title)}</h1>
                      <p class="chapter-opening__subtitle">${escapeHtml(book.subtitle)}</p>
                      <div class="chapter-opening__divider"></div>
                      <p class="chapter-opening__subtitle" style="font-style:italic;max-width:80%;">${escapeHtml(book.epigraph)}</p>
                      <div class="chapter-opening__themes">${civChips}</div>
                    </div>
                  </div>
                </div>
            `;
        }

        // Distribute entries across the reserved TOC pages, then write each.
        // Eyebrow shows the Roman numeral range covered by the page.
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
                    "Tabula Mythologica",
                    `${first} — ${last}`,
                    slice
                );
            }
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

        _chapterOpeningHtml(story, civ, num) {
            const themes = (story.themes || []).map(t => `<span class="chapter-opening__theme">${escapeHtml(t)}</span>`).join("");
            return `
                <div class="page__inner">
                  <div class="page__content">
                    <div class="chapter-opening">
                      <div class="chapter-opening__civ-mark">${escapeHtml(civ ? civ.full : "")}</div>
                      <div class="chapter-opening__num">${num}</div>
                      <h2 class="chapter-opening__title">${escapeHtml(story.title)}</h2>
                      <p class="chapter-opening__subtitle">${escapeHtml(story.subtitle || "")}</p>
                      <div class="chapter-opening__divider"></div>
                      <div class="chapter-opening__themes">${themes}</div>
                    </div>
                  </div>
                </div>
            `;
        }

        _storyPageHtml(bodyHtml, isContinuation, isLast, story, civ, num) {
            const endingMark = isLast ? `<div class="chapter-end">✦</div>` : "";
            const continuationCls = isContinuation ? " page--continuation" : "";
            const civName = civ ? civ.name : "";
            return `
                <div class="page__inner${continuationCls}">
                  <div class="page__chapter-mark">${escapeHtml(story.title)} · ${escapeHtml(civName)}</div>
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
                      <h2 class="epilogue__title">Colophon</h2>
                      <p class="epilogue__text">${escapeHtml(book.epilogueText)}</p>
                      <div class="chapter-opening__divider" style="width:140px;"></div>
                      <p class="epilogue__text" style="font-size:0.95rem;">An illuminated archive of twenty-six tales from eight civilizations, set in Cinzel, Cormorant Garamond, EB Garamond, and the old Fraktur of Maguntia.</p>
                      <div class="epilogue__seal" aria-hidden="true">℞</div>
                    </div>
                  </div>
                </div>
            `;
        }

        // -------- mount + navigation --------

        _mountInitial() {
            this.root.innerHTML = "";
            const left = document.createElement("div");
            left.className = "page page--left page--current";
            const right = document.createElement("div");
            right.className = "page page--right page--current";
            this.root.appendChild(left);
            this.root.appendChild(right);
            this._renderSpread(this.spread, left, right);
            // Add is-ready to the .book ancestor so its current pages can rise in.
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
                el.innerHTML = `<div class="page__inner"></div>`;
                return;
            }
            const folio = page.folio
                ? `<div class="page__folio">${escapeHtml(page.folio)}</div>`
                : "";
            const curl = `<div class="page__curl" aria-hidden="true"></div>`;
            el.innerHTML = page.html + folio + curl;
        }

        // public navigation
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
            // Jump with a fade
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

        /* ────── PAGE TURN ──────────────────────────────────────────
           PERF: the actual transform & easing are owned by the CSS
           ([data-perf="rich"] vs ="lite"). JS only:
             1. clones the leaving page,
             2. swaps the underlying pair to the destination spread,
             3. flips one class on the clone,
             4. waits for transitionend (or a short safety timeout),
             5. removes the clone and resets will-change.

           No JS-driven inline transforms (let the CSS engine batch
           them onto the compositor); no shadow transitions; no
           per-frame work.  ─────────────────────────────────────── */

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

            // Clone the leaving page on top of everything else
            const turnEl = document.createElement("div");
            turnEl.className = baseClass;          // start state — no transform yet
            turnEl.innerHTML = sourceEl.innerHTML;
            // PERF: opt the clone into its own GPU layer for the duration of
            // the animation only (removed below).
            turnEl.style.willChange = "transform, opacity";
            this.root.appendChild(turnEl);

            // Pre-render the destination spread underneath the clone
            this._writePage(leftEl, targetLeft, "left");
            this._writePage(rightEl, targetRight, "right");

            // PERF: previously we read .offsetWidth (forced sync layout) and
            // set .style.transform inline. Now we wait two animation frames so
            // the browser commits the start state, then add the trigger class.
            // The browser handles the transition entirely on the compositor.
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
                // Safety fallback
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
