/* ════════════════════════════════════════════════════════════════
   app.js
   Top-level controller. Boots the engine, wires drawers, chrome
   buttons, keyboard, swipe, theme cycling, font scaling, and the
   bookmark ribbon.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MYTHOLOGY;
    const Storage = NS.Storage;

    // -------- DOM refs --------
    const $ = (sel, scope = document) => scope.querySelector(sel);
    const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

    const dom = {
        html: document.documentElement,
        body: document.body,
        loader: $("#loader"),
        bookEl: $("#book"),
        pagesEl: $("#book-pages"),
        ribbon: $("#book-ribbon"),

        edgePrev: $("#edge-prev"),
        edgeNext: $("#edge-next"),
        btnPrev: $("#btn-prev"),
        btnNext: $("#btn-next"),

        btnToc: $("#btn-toc"),
        btnBookmark: $("#btn-bookmark"),
        btnBookmarks: $("#btn-bookmarks"),
        btnTheme: $("#btn-theme"),
        btnFont: $("#btn-font"),
        btnPerf: $("#btn-perf"),
        btnFullscreen: $("#btn-fullscreen"),
        btnPrint: $("#btn-print"),

        chapterLabel: $("#chapter-label"),
        progressFill: $("#progress-fill"),
        pageCurrent: $("#page-current"),
        pageTotal: $("#page-total"),

        tocDrawer: $("#toc-drawer"),
        tocFilters: $("#toc-filters"),
        tocList: $("#toc-list"),
        tocSearch: $("#toc-search"),

        bmDrawer: $("#bookmarks-drawer"),
        bmList: $("#bookmarks-list"),

        toast: $("#toast"),
        hint: $("#hint")
    };

    // -------- state --------
    const THEMES = ["midnight", "parchment", "obsidian"];
    const TYPE_STEPS = [0.92, 1.0, 1.1, 1.22, 1.36];

    let engine = null;
    let activeFilter = "all";
    let toastTimer = null;

    // ──────────────────────────────────────────────────────────────
    // BOOT
    // ──────────────────────────────────────────────────────────────

    async function boot() {
        applyTheme(Storage.getTheme());
        applyTypeStep(Storage.getTypeStep());
        // Reflect the perf mode chosen by the inline pre-paint script
        // so the chrome toggle can render its current-state indicator.
        const initialPerf = dom.html.dataset.perf || "rich";
        dom.btnPerf.dataset.active = initialPerf === "lite" ? "true" : "false";

        // PERF: wait for fonts so measurement is accurate, but bound the wait
        // to 2s — Google Fonts can occasionally hang on slow networks and we
        // shouldn't block the entire boot on it.
        try {
            if (document.fonts && document.fonts.ready) {
                await Promise.race([
                    document.fonts.ready,
                    new Promise(r => setTimeout(r, 2000))
                ]);
            }
        } catch (e) { /* */ }

        engine = new NS.BookEngine(dom.pagesEl);
        // Loader text reflects pagination progress so a 76-chapter build
        // doesn't look frozen on slower devices.
        const loaderText = $(".loader__text");
        engine.onProgress = (done, total) => {
            if (loaderText) loaderText.textContent = `Unsealing the codex… ${done}/${total}`;
        };
        await engine.build();
        engine.onSpreadChange = handleSpreadChange;

        wireUI();

        // Restore last spread
        const saved = Storage.getProgress();
        if (saved > 0 && saved < engine.getSpreadCount()) {
            await engine.goToSpread(saved);
        } else {
            handleSpreadChange(engine.getCurrentSpread());
        }

        renderTocDrawer();
        renderBookmarksDrawer();

        // Reveal
        requestAnimationFrame(() => {
            dom.body.classList.remove("is-loading");
            // Show the first-time hint briefly
            if (!Storage.getFirstSeen()) {
                showHintBriefly();
                Storage.setFirstSeen(true);
            }
        });
    }

    // ──────────────────────────────────────────────────────────────
    // SPREAD CHANGES
    // ──────────────────────────────────────────────────────────────

    function handleSpreadChange(spreadIdx) {
        Storage.setProgress(spreadIdx);

        const total = engine.getSpreadCount();
        dom.pageCurrent.textContent = engine.getCurrentFolioRange();
        dom.pageTotal.textContent = (total - 1) + ""; // -1 for back-cover blanks
        const pct = total > 1 ? (spreadIdx / (total - 1)) * 100 : 0;
        dom.progressFill.style.width = pct + "%";

        const label = engine.getCurrentChapterLabel() || NS.book.title;
        dom.chapterLabel.textContent = label;

        // nav buttons
        dom.btnPrev.disabled = spreadIdx <= 0;
        dom.btnNext.disabled = spreadIdx >= total - 1;
        dom.edgePrev.disabled = spreadIdx <= 0;
        dom.edgeNext.disabled = spreadIdx >= total - 1;

        // bookmark indicator on chrome button + ribbon
        const isBookmarked = Storage.hasBookmark(spreadIdx);
        dom.btnBookmark.dataset.active = isBookmarked ? "true" : "false";
        dom.ribbon.classList.toggle("is-visible", isBookmarked);

        // Highlight current entry in TOC drawer if open
        $$(".drawer__entry", dom.tocList).forEach(el => {
            el.dataset.current = (Number(el.dataset.spread) === spreadIdx) ? "true" : "false";
        });
    }

    // ──────────────────────────────────────────────────────────────
    // UI WIRING
    // ──────────────────────────────────────────────────────────────

    function wireUI() {
        // Page navigation
        const goNext = () => engine && engine.next();
        const goPrev = () => engine && engine.prev();

        dom.btnNext.addEventListener("click", goNext);
        dom.btnPrev.addEventListener("click", goPrev);
        dom.edgeNext.addEventListener("click", e => { e.stopPropagation(); goNext(); });
        dom.edgePrev.addEventListener("click", e => { e.stopPropagation(); goPrev(); });

        // Drawer buttons
        dom.btnToc.addEventListener("click", () => openDrawer(dom.tocDrawer));
        dom.btnBookmarks.addEventListener("click", () => {
            renderBookmarksDrawer();
            openDrawer(dom.bmDrawer);
        });

        // Drawer close handlers (scrim + close button)
        $$("[data-drawer-close]").forEach(el => {
            el.addEventListener("click", () => {
                const drawer = el.closest(".drawer");
                if (drawer) closeDrawer(drawer);
            });
        });

        // TOC search
        dom.tocSearch.addEventListener("input", () => renderTocDrawer());

        // Bookmark current spread
        dom.btnBookmark.addEventListener("click", () => {
            const idx = engine.getCurrentSpread();
            const label = engine.getCurrentChapterLabel();
            const added = Storage.toggleBookmark(idx, label);
            handleSpreadChange(idx);
            renderBookmarksDrawer();
            toast(added ? "Folio marked" : "Mark removed");
        });

        // Theme
        dom.btnTheme.addEventListener("click", () => {
            const cur = Storage.getTheme();
            const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
            applyTheme(next);
            Storage.setTheme(next);
            toast("Theme: " + next);
        });

        // Type scaling
        dom.btnFont.addEventListener("click", async () => {
            const cur = Storage.getTypeStep();
            const next = (cur + 1) % TYPE_STEPS.length;
            applyTypeStep(next);
            Storage.setTypeStep(next);
            toast("Type size: " + (next + 1) + "/" + TYPE_STEPS.length);
            await rebuildEngineAroundCurrentChapter();
        });

        // Performance mode toggle
        dom.btnPerf.addEventListener("click", () => {
            const cur = dom.html.dataset.perf || "rich";
            const next = cur === "lite" ? "rich" : "lite";
            dom.html.dataset.perf = next;
            dom.btnPerf.dataset.active = next === "lite" ? "true" : "false";
            try { localStorage.setItem("codex-mythologica:v1:perfMode", JSON.stringify(next)); } catch (e) { /* */ }
            toast(next === "lite" ? "Performance mode" : "Rich visuals");
        });

        // Fullscreen
        dom.btnFullscreen.addEventListener("click", toggleFullscreen);
        document.addEventListener("fullscreenchange", () => {
            dom.body.classList.toggle("is-fullscreen", !!document.fullscreenElement);
            dom.body.classList.toggle("is-immersive", !!document.fullscreenElement);
            dom.btnFullscreen.dataset.active = document.fullscreenElement ? "true" : "false";
        });

        // Print / PDF
        dom.btnPrint.addEventListener("click", () => {
            toast("Preparing codex for export…");
            setTimeout(() => NS.PdfExport.exportPDF(), 200);
        });

        // Keyboard
        document.addEventListener("keydown", onKey);

        // Swipe (touch)
        wireSwipe();

        // Click-to-jump from TOC pages
        document.addEventListener("click", e => {
            const t = e.target.closest("[data-story-jump]");
            if (t && engine) {
                const id = t.dataset.storyJump;
                engine.goToStory(id);
            }
        });
        document.addEventListener("keydown", e => {
            const t = e.target.closest("[data-story-jump]");
            if (t && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                engine.goToStory(t.dataset.storyJump);
            }
        });

        // Click on book itself focuses for keyboard nav
        dom.bookEl.addEventListener("click", () => dom.bookEl.focus());

        /* PERF: resize handler combines two improvements:
            1. Threshold check up front (cheap) — most resize events on
               desktop are 1-2px noise from scrollbar appearance, browser
               chrome shifts, etc. We ignore anything below 80×60.
            2. Schedule a single rebuild on requestIdleCallback (or rAF
               fallback) instead of setTimeout. The rebuild then yields
               back to the browser between phases.

           Mobile orientation changes still trigger because both axes
           cross thresholds simultaneously. */
        let resizePending = false;
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;
        const requestIdle = window.requestIdleCallback ||
            (cb => setTimeout(() => cb({ timeRemaining: () => 16 }), 100));

        window.addEventListener("resize", () => {
            if (resizePending) return;
            const dw = Math.abs(window.innerWidth - lastWidth);
            const dh = Math.abs(window.innerHeight - lastHeight);
            if (dw < 80 && dh < 60) return;
            resizePending = true;
            requestIdle(async () => {
                lastWidth = window.innerWidth;
                lastHeight = window.innerHeight;
                await rebuildEngineAroundCurrentChapter();
                resizePending = false;
            });
        }, { passive: true });

        /* PERF: pause infinite ambient animations (and the loader sigil if
           still visible) when the tab is hidden. Saves significant power
           on phones and laptops on battery — the browser was happily
           painting nebula drift to a buffer nobody could see. */
        document.addEventListener("visibilitychange", () => {
            dom.body.classList.toggle("is-doc-hidden", document.hidden);
        });
    }

    async function rebuildEngineAroundCurrentChapter() {
        if (!engine) return;
        const currentLabel = engine.getCurrentChapterLabel();
        engine = new NS.BookEngine(dom.pagesEl);
        await engine.build();
        engine.onSpreadChange = handleSpreadChange;
        let restored = 0;
        for (let i = 0; i < engine.getSpreadCount(); i++) {
            const [li, ri] = engine.spreads[i];
            const lp = engine.pages[li];
            if (lp && lp.chapter === currentLabel) { restored = i; break; }
            if (ri !== null) {
                const rp = engine.pages[ri];
                if (rp && rp.chapter === currentLabel) { restored = i; break; }
            }
        }
        await engine.goToSpread(Math.min(restored, engine.getSpreadCount() - 1));
        renderTocDrawer();
        renderBookmarksDrawer();
    }

    // ──────────────────────────────────────────────────────────────
    // KEYBOARD
    // ──────────────────────────────────────────────────────────────

    function onKey(e) {
        const tag = e.target && e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        // ignore when a drawer is open and focus is inside an input
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        switch (e.key) {
            case "ArrowRight":
            case "PageDown":
            case " ":
                e.preventDefault();
                engine && engine.next();
                break;
            case "ArrowLeft":
            case "PageUp":
                e.preventDefault();
                engine && engine.prev();
                break;
            case "Home":
                e.preventDefault();
                engine && engine.goToSpread(0);
                break;
            case "End":
                e.preventDefault();
                engine && engine.goToSpread(engine.getSpreadCount() - 1);
                break;
            case "t": case "T":
                openDrawer(dom.tocDrawer);
                break;
            case "b": case "B":
                dom.btnBookmark.click();
                break;
            case "m": case "M":
                renderBookmarksDrawer();
                openDrawer(dom.bmDrawer);
                break;
            case "f": case "F":
                toggleFullscreen();
                break;
            case "v": case "V":
                dom.btnTheme.click();
                break;
            case "a": case "A":
                dom.btnFont.click();
                break;
            case "p": case "P":
                dom.btnPrint.click();
                break;
            case "x": case "X":
                dom.btnPerf.click();
                break;
            case "Escape":
                closeAllDrawers();
                if (document.fullscreenElement) document.exitFullscreen();
                break;
        }
    }

    // ──────────────────────────────────────────────────────────────
    // SWIPE
    // ──────────────────────────────────────────────────────────────

    function wireSwipe() {
        let startX = 0, startY = 0, tracking = false;
        const stage = $("#stage");
        stage.addEventListener("touchstart", e => {
            if (e.touches.length !== 1) return;
            tracking = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        stage.addEventListener("touchend", e => {
            if (!tracking) return;
            tracking = false;
            const t = e.changedTouches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                if (dx < 0) engine && engine.next();
                else engine && engine.prev();
            }
        });
    }

    // ──────────────────────────────────────────────────────────────
    // DRAWERS
    // ──────────────────────────────────────────────────────────────

    function openDrawer(drawer) {
        closeAllDrawers();
        drawer.setAttribute("aria-hidden", "false");
        // Focus the close button for a11y
        const closeBtn = drawer.querySelector(".drawer__close");
        if (closeBtn) setTimeout(() => closeBtn.focus(), 250);
    }

    function closeDrawer(drawer) {
        drawer.setAttribute("aria-hidden", "true");
    }

    function closeAllDrawers() {
        $$(".drawer").forEach(d => d.setAttribute("aria-hidden", "true"));
    }

    // ──────────────────────────────────────────────────────────────
    // TOC RENDER
    // ──────────────────────────────────────────────────────────────

    function renderTocDrawer() {
        if (!engine) return;
        const stories = NS.stories;
        const civs = NS.civilizations;
        const search = (dom.tocSearch.value || "").trim().toLowerCase();

        // Build civ filters once
        if (!dom.tocFilters.children.length) {
            const all = document.createElement("button");
            all.className = "drawer__filter";
            all.setAttribute("role", "tab");
            all.dataset.civ = "all";
            all.textContent = "All";
            all.setAttribute("aria-selected", "true");
            all.addEventListener("click", () => {
                activeFilter = "all";
                renderTocDrawer();
            });
            dom.tocFilters.appendChild(all);

            civs.forEach(c => {
                const b = document.createElement("button");
                b.className = "drawer__filter";
                b.setAttribute("role", "tab");
                b.dataset.civ = c.id;
                b.textContent = c.name;
                b.setAttribute("aria-selected", "false");
                b.addEventListener("click", () => {
                    activeFilter = c.id;
                    renderTocDrawer();
                });
                dom.tocFilters.appendChild(b);
            });
        }

        // Update aria-selected for active filter
        $$(".drawer__filter", dom.tocFilters).forEach(b => {
            b.setAttribute("aria-selected", b.dataset.civ === activeFilter ? "true" : "false");
        });

        // Filter list — Roman numerals scale up with the codex.
        const ROMAN_ONES = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        const toRoman = n => n <= 0 ? "" : (n >= 100 ? "C" + toRoman(n - 100) : ROMAN_TENS[Math.floor(n / 10)] + ROMAN_ONES[n % 10]);
        const ROMAN = new Proxy({}, { get: (_, k) => toRoman(Number(k)) });

        const filtered = stories
            .map((s, i) => ({ s, i, num: ROMAN[i + 1] }))
            .filter(({ s }) => activeFilter === "all" || s.civilization === activeFilter)
            .filter(({ s }) => {
                if (!search) return true;
                const civ = NS.civilizationById(s.civilization);
                const hay = [
                    s.title, s.subtitle, civ ? civ.full : "",
                    (s.themes || []).join(" ")
                ].join(" ").toLowerCase();
                return hay.includes(search);
            });

        dom.tocList.innerHTML = "";
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "drawer__empty";
            empty.textContent = "No tales match the search.";
            dom.tocList.appendChild(empty);
            return;
        }

        const currentSpread = engine.getCurrentSpread();
        filtered.forEach(({ s, i, num }) => {
            const civ = NS.civilizationById(s.civilization);
            const spread = engine.storyToSpread.get(s.id);
            const btn = document.createElement("button");
            btn.className = "drawer__entry";
            btn.dataset.spread = spread;
            btn.dataset.current = (spread === currentSpread) ? "true" : "false";
            btn.innerHTML = `
                <span class="drawer__entry-num">${num}.</span>
                <span class="drawer__entry-body">
                    <span class="drawer__entry-name">${escapeHtml(s.title)}</span>
                    <span class="drawer__entry-civ">${escapeHtml(civ ? civ.full : "")}</span>
                </span>
                <span class="drawer__entry-page">f. ${i + 1}</span>
            `;
            btn.addEventListener("click", async () => {
                closeDrawer(dom.tocDrawer);
                await engine.goToStory(s.id);
            });
            dom.tocList.appendChild(btn);
        });
    }

    // ──────────────────────────────────────────────────────────────
    // BOOKMARKS RENDER
    // ──────────────────────────────────────────────────────────────

    function renderBookmarksDrawer() {
        const bms = Storage.getBookmarks();
        dom.bmList.innerHTML = "";
        if (!bms.length) {
            const empty = document.createElement("div");
            empty.className = "drawer__empty";
            empty.textContent = "No folios marked yet. Press B to mark a spread.";
            dom.bmList.appendChild(empty);
            return;
        }
        const current = engine ? engine.getCurrentSpread() : -1;
        bms.forEach(bm => {
            const btn = document.createElement("button");
            btn.className = "drawer__entry";
            btn.dataset.spread = bm.spread;
            btn.dataset.current = bm.spread === current ? "true" : "false";
            const date = new Date(bm.ts || Date.now());
            const stamp = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
            btn.innerHTML = `
                <span class="drawer__entry-num">◆</span>
                <span class="drawer__entry-body">
                    <span class="drawer__entry-name">${escapeHtml(bm.label || "Folio")}</span>
                    <span class="drawer__entry-civ">Spread ${bm.spread + 1} · ${escapeHtml(stamp)}</span>
                </span>
                <span class="drawer__entry-page">→</span>
            `;
            btn.addEventListener("click", async () => {
                closeDrawer(dom.bmDrawer);
                await engine.goToSpread(bm.spread);
            });
            dom.bmList.appendChild(btn);
        });
    }

    // ──────────────────────────────────────────────────────────────
    // THEME / TYPE
    // ──────────────────────────────────────────────────────────────

    function applyTheme(name) {
        if (!THEMES.includes(name)) name = "midnight";
        dom.body.dataset.theme = name;
    }

    function applyTypeStep(step) {
        const scale = TYPE_STEPS[step] || 1;
        document.documentElement.style.setProperty("--reader-scale", String(scale));
    }

    // ──────────────────────────────────────────────────────────────
    // FULLSCREEN
    // ──────────────────────────────────────────────────────────────

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    // ──────────────────────────────────────────────────────────────
    // TOAST + HINT
    // ──────────────────────────────────────────────────────────────

    function toast(msg) {
        clearTimeout(toastTimer);
        dom.toast.textContent = msg;
        dom.toast.classList.add("is-visible");
        toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 1800);
    }

    function showHintBriefly() {
        dom.hint.classList.add("is-visible");
        setTimeout(() => dom.hint.classList.remove("is-visible"), 5500);
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    // ──────────────────────────────────────────────────────────────
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
