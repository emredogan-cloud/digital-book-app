/* ════════════════════════════════════════════════════════════════
   app.js — Mendîran Vakayinâmesi üst-seviye denetleyici.
   Motoru başlatır; üst/alt çubuk, çekmeceler, klavye, dokunma,
   tema/tipografi/performans tuşları, yer-işareti kurdelesini bağlar.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = window.MENDIRAN;
    const Storage = NS.Storage;

    const $ = (sel, scope = document) => scope.querySelector(sel);
    const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

    const dom = {
        html: document.documentElement,
        body: document.body,
        loader: $("#loader"),
        loaderText: $("#loader-text"),
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
        btnSound: $("#btn-sound"),
        btnShowcase: $("#btn-showcase"),
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
        hint: $("#hint"),

        showcaseBanner: $("#showcase-banner"),
        showcaseExit: $("#showcase-exit")
    };

    /* Mendîran’ın üç teması — sırayla döner */
    const THEMES = ["gece", "parsomen", "kul"];
    const THEME_LABELS = { gece: "Gece", parsomen: "Parşömen", kul: "Kül" };
    const TYPE_STEPS = [0.92, 1.0, 1.1, 1.22, 1.36];

    let engine = null;
    let activeFilter = "all";
    let toastTimer = null;

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    /* ────────────────────────── BOOT ────────────────────────── */
    async function boot() {
        applyTheme(Storage.getTheme());
        applyTypeStep(Storage.getTypeStep());

        const initialPerf = dom.html.dataset.perf || "rich";
        dom.btnPerf.dataset.active = initialPerf === "lite" ? "true" : "false";

        try {
            if (document.fonts && document.fonts.ready) {
                await Promise.race([
                    document.fonts.ready,
                    new Promise(r => setTimeout(r, 2000))
                ]);
            }
        } catch (e) { /* yoksay */ }

        // Loader atmosferik alıntısı — derleme sırasında okuru
        // başka bir cümleye sığındırır. Her açılışta rastgele bir alıntı.
        const loaderQuote = document.getElementById("loader-quote");
        if (loaderQuote) {
            const quotes = [
                "Söylediğim ölmüştür; ölmemiş olan, söylenmez.",
                "Demir konuşur, eti susarız.",
                "Karanlığa söylenen ad ezberlenir; yüze söylenen ad unutulur.",
                "Kapıyı kapadım, ama içerdeki ağladı.",
                "Sessizlik dahi bir yemindir.",
                "Bir adın iki sahibi olmaz; üç sahibi vardır.",
                "Kesilen her ad bir yara, taşına bir yemindir.",
                "İyileşmemek, bir biçim gerektirir."
            ];
            loaderQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        }

        engine = new NS.BookEngine(dom.pagesEl);
        engine.onProgress = (done, total) => {
            if (dom.loaderText) {
                dom.loaderText.textContent = `Mühür açılıyor… ${done}/${total}`;
            }
        };
        await engine.build();
        engine.onSpreadChange = handleSpreadChange;

        wireUI();

        const saved = Storage.getProgress();
        if (saved > 0 && saved < engine.getSpreadCount()) {
            await engine.goToSpread(saved);
        } else {
            handleSpreadChange(engine.getCurrentSpread());
        }

        renderTocDrawer();
        renderBookmarksDrawer();

        requestAnimationFrame(() => {
            dom.body.classList.remove("is-loading");
            if (!Storage.getFirstSeen()) {
                showHintBriefly();
                Storage.setFirstSeen(true);
            }
        });
    }

    /* ────────────────────── SPREAD CHANGES ────────────────────── */

    function handleSpreadChange(spreadIdx) {
        Storage.setProgress(spreadIdx);

        const total = engine.getSpreadCount();
        dom.pageCurrent.textContent = engine.getCurrentFolioRange();
        dom.pageTotal.textContent = String(total - 1);
        const pct = total > 1 ? (spreadIdx / (total - 1)) * 100 : 0;
        dom.progressFill.style.width = pct + "%";

        const label = engine.getCurrentChapterLabel() || NS.book.title;
        dom.chapterLabel.textContent = label;

        dom.btnPrev.disabled = spreadIdx <= 0;
        dom.btnNext.disabled = spreadIdx >= total - 1;
        dom.edgePrev.disabled = spreadIdx <= 0;
        dom.edgeNext.disabled = spreadIdx >= total - 1;

        const isBookmarked = Storage.hasBookmark(spreadIdx);
        dom.btnBookmark.dataset.active = isBookmarked ? "true" : "false";
        dom.ribbon.classList.toggle("is-visible", isBookmarked);

        $$(".drawer__entry", dom.tocList).forEach(el => {
            el.dataset.current = (Number(el.dataset.spread) === spreadIdx) ? "true" : "false";
        });
    }

    /* ────────────────────── UI WIRING ────────────────────── */

    function wireUI() {
        const goNext = () => engine && engine.next();
        const goPrev = () => engine && engine.prev();

        dom.btnNext.addEventListener("click", goNext);
        dom.btnPrev.addEventListener("click", goPrev);
        dom.edgeNext.addEventListener("click", e => { e.stopPropagation(); goNext(); });
        dom.edgePrev.addEventListener("click", e => { e.stopPropagation(); goPrev(); });

        dom.btnToc.addEventListener("click", () => openDrawer(dom.tocDrawer));
        dom.btnBookmarks.addEventListener("click", () => {
            renderBookmarksDrawer();
            openDrawer(dom.bmDrawer);
        });

        $$("[data-drawer-close]").forEach(el => {
            el.addEventListener("click", () => {
                const drawer = el.closest(".drawer");
                if (drawer) closeDrawer(drawer);
            });
        });

        dom.tocSearch.addEventListener("input", () => renderTocDrawer());

        dom.btnBookmark.addEventListener("click", () => {
            const idx = engine.getCurrentSpread();
            const label = engine.getCurrentChapterLabel();
            const added = Storage.toggleBookmark(idx, label);
            handleSpreadChange(idx);
            renderBookmarksDrawer();
            toast(added ? "Varak işaretlendi" : "İşaret kaldırıldı");
        });

        dom.btnTheme.addEventListener("click", () => {
            const cur = Storage.getTheme();
            const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
            applyTheme(next);
            Storage.setTheme(next);
            toast("Tema: " + (THEME_LABELS[next] || next));
        });

        dom.btnFont.addEventListener("click", async () => {
            const cur = Storage.getTypeStep();
            const next = (cur + 1) % TYPE_STEPS.length;
            applyTypeStep(next);
            Storage.setTypeStep(next);
            toast("Tipografi: " + (next + 1) + "/" + TYPE_STEPS.length);
            await rebuildEngineAroundCurrentChapter();
        });

        dom.btnPerf.addEventListener("click", () => {
            const cur = dom.html.dataset.perf || "rich";
            const next = cur === "lite" ? "rich" : "lite";
            dom.html.dataset.perf = next;
            dom.btnPerf.dataset.active = next === "lite" ? "true" : "false";
            try { localStorage.setItem("mendiran-vakayinamesi:v1:perfMode", JSON.stringify(next)); } catch (e) { /* */ }
            toast(next === "lite" ? "Hafif görsel mod" : "Zengin görsel mod");
        });

        dom.btnFullscreen.addEventListener("click", toggleFullscreen);
        document.addEventListener("fullscreenchange", () => {
            dom.body.classList.toggle("is-fullscreen", !!document.fullscreenElement);
            dom.body.classList.toggle("is-immersive", !!document.fullscreenElement);
            dom.btnFullscreen.dataset.active = document.fullscreenElement ? "true" : "false";
        });

        dom.btnPrint.addEventListener("click", () => {
            toast("Kitabe yazdırmaya hazırlanıyor…");
            setTimeout(() => NS.PdfExport.exportPDF(), 200);
        });

        // Atmosferik ses (Faz 5)
        if (dom.btnSound) {
            dom.btnSound.addEventListener("click", toggleAmbience);
        }

        // Vitrin / showcase modu (Faz 5)
        if (dom.btnShowcase) {
            dom.btnShowcase.addEventListener("click", toggleShowcase);
        }
        if (dom.showcaseExit) {
            dom.showcaseExit.addEventListener("click", () => {
                if (dom.body.classList.contains("is-showcase")) toggleShowcase();
            });
        }

        document.addEventListener("keydown", onKey);

        wireSwipe();

        document.addEventListener("click", e => {
            const t = e.target.closest("[data-story-jump]");
            if (t && engine) {
                engine.goToStory(t.dataset.storyJump);
            }
        });
        document.addEventListener("keydown", e => {
            const t = e.target.closest("[data-story-jump]");
            if (t && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                engine.goToStory(t.dataset.storyJump);
            }
        });

        dom.bookEl.addEventListener("click", () => dom.bookEl.focus());

        /* Yeniden boyutlanma — eşik altı titreşimleri yoksay,
           tek bir rebuild’i requestIdleCallback ile zamanla. */
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

    /* ────────────────────── KEYBOARD ────────────────────── */

    function onKey(e) {
        const tag = e.target && e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
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
            case "s": case "S":
                if (dom.btnSound) dom.btnSound.click();
                break;
            case "w": case "W":
                if (dom.btnShowcase) dom.btnShowcase.click();
                break;
            case "Escape":
                closeAllDrawers();
                if (document.fullscreenElement) document.exitFullscreen();
                break;
        }
    }

    /* ────────────────────── SWIPE ────────────────────── */

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

    /* ────────────────────── DRAWERS ────────────────────── */

    function openDrawer(drawer) {
        closeAllDrawers();
        drawer.setAttribute("aria-hidden", "false");
        const closeBtn = drawer.querySelector(".drawer__close");
        if (closeBtn) setTimeout(() => closeBtn.focus(), 250);
    }
    function closeDrawer(drawer) {
        drawer.setAttribute("aria-hidden", "true");
    }
    function closeAllDrawers() {
        $$(".drawer").forEach(d => d.setAttribute("aria-hidden", "true"));
    }

    /* ────────────────────── TOC RENDER ────────────────────── */

    function renderTocDrawer() {
        if (!engine) return;
        const stories = NS.stories;
        const kisimlar = NS.civilizations;
        const search = (dom.tocSearch.value || "").trim().toLowerCase();

        if (!dom.tocFilters.children.length) {
            const all = document.createElement("button");
            all.className = "drawer__filter";
            all.setAttribute("role", "tab");
            all.dataset.civ = "all";
            all.textContent = "Tümü";
            all.setAttribute("aria-selected", "true");
            all.addEventListener("click", () => {
                activeFilter = "all";
                renderTocDrawer();
            });
            dom.tocFilters.appendChild(all);

            kisimlar.forEach(c => {
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

        $$(".drawer__filter", dom.tocFilters).forEach(b => {
            b.setAttribute("aria-selected", b.dataset.civ === activeFilter ? "true" : "false");
        });

        const ROMAN_ONES = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        const toRoman = n => n <= 0 ? "" : (n >= 100 ? "C" + toRoman(n - 100) : ROMAN_TENS[Math.floor(n / 10)] + ROMAN_ONES[n % 10]);
        const ROMAN = new Proxy({}, { get: (_, k) => toRoman(Number(k)) });

        const filtered = stories
            .map((s, i) => ({ s, i, num: ROMAN[i + 1] }))
            .filter(({ s }) => activeFilter === "all" || s.civilization === activeFilter)
            .filter(({ s }) => {
                if (!search) return true;
                const k = NS.civilizationById(s.civilization);
                const hay = [
                    s.title, s.subtitle, k ? k.full : "",
                    (s.themes || []).join(" ")
                ].join(" ").toLowerCase();
                return hay.includes(search);
            });

        dom.tocList.innerHTML = "";
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "drawer__empty";
            empty.textContent = "Bu aramayla eşleşen bir bölüm yok.";
            dom.tocList.appendChild(empty);
            return;
        }

        const currentSpread = engine.getCurrentSpread();
        filtered.forEach(({ s, i, num }) => {
            const k = NS.civilizationById(s.civilization);
            const spread = engine.storyToSpread.get(s.id);
            const btn = document.createElement("button");
            btn.className = "drawer__entry";
            btn.dataset.spread = spread;
            btn.dataset.current = (spread === currentSpread) ? "true" : "false";
            btn.innerHTML = `
                <span class="drawer__entry-num">${num}.</span>
                <span class="drawer__entry-body">
                    <span class="drawer__entry-name">${escapeHtml(s.title)}</span>
                    <span class="drawer__entry-civ">${escapeHtml(k ? k.full : "")}</span>
                </span>
                <span class="drawer__entry-page">v. ${i + 1}</span>
            `;
            btn.addEventListener("click", async () => {
                closeDrawer(dom.tocDrawer);
                await engine.goToStory(s.id);
            });
            dom.tocList.appendChild(btn);
        });
    }

    /* ────────────────────── BOOKMARKS RENDER ────────────────────── */

    function renderBookmarksDrawer() {
        const bms = Storage.getBookmarks();
        dom.bmList.innerHTML = "";
        if (!bms.length) {
            const empty = document.createElement("div");
            empty.className = "drawer__empty";
            empty.textContent = "Henüz işaretli bir varak yok. Bir spread işaretlemek için B tuşuna basın.";
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
            const stamp = date.toLocaleDateString("tr-TR", { month: "short", day: "numeric" });
            btn.innerHTML = `
                <span class="drawer__entry-num">◆</span>
                <span class="drawer__entry-body">
                    <span class="drawer__entry-name">${escapeHtml(bm.label || "Varak")}</span>
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

    /* ────────────────────── THEME / TYPE ────────────────────── */

    function applyTheme(name) {
        if (!THEMES.includes(name)) name = "gece";
        dom.body.dataset.theme = name;
    }

    function applyTypeStep(step) {
        const scale = TYPE_STEPS[step] || 1;
        document.documentElement.style.setProperty("--reader-scale", String(scale));
    }

    /* ────────────────────── FULLSCREEN ────────────────────── */

    /* ────────────────────── VİTRİN MODU (Faz 5) ────────────────────── */

    // Showcase mode: auto-advances through a curated list of spreads.
    // Press W or chrome button to toggle.
    let showcaseTimer = null;
    const SHOWCASE_STORY_IDS = [
        "kitabe-hakkinda",
        "kapaklar",
        "harita-mendiran",
        "folyolar",
        "vakayi-onsoz",
        "perde-1",
        "vakayi-final",
        "sonsoz-1"
    ];
    const SHOWCASE_INTERVAL_MS = 14000;

    async function showcaseStep(index) {
        if (!engine) return;
        const id = SHOWCASE_STORY_IDS[index % SHOWCASE_STORY_IDS.length];
        await engine.goToStory(id);
    }

    function toggleShowcase() {
        const active = dom.body.classList.toggle("is-showcase");
        if (dom.btnShowcase) dom.btnShowcase.dataset.active = active ? "true" : "false";
        if (dom.showcaseBanner) dom.showcaseBanner.setAttribute("aria-hidden", active ? "false" : "true");
        if (active) {
            toast("Vitrin modu");
            let i = 0;
            showcaseStep(i);
            showcaseTimer = setInterval(() => {
                i++;
                showcaseStep(i);
            }, SHOWCASE_INTERVAL_MS);
        } else {
            toast("Vitrin modu kapandı");
            if (showcaseTimer) { clearInterval(showcaseTimer); showcaseTimer = null; }
        }
    }

    /* ────────────────────── ATMOSFERİK SES (Faz 5) ──────────────────────
       Web Audio API ile programatik düşük drone. Harici ses dosyası yok.
       Çok düşük volümlü, yalnız kullanıcı isteğiyle başlar (autoplay yok).
       Lazy initialize: ilk tıklamada AudioContext kurulur. */

    let audioCtx = null;
    let audioMaster = null;
    let audioNodes = [];

    function initAudio() {
        if (audioCtx) return;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioMaster = audioCtx.createGain();
            audioMaster.gain.value = 0;
            audioMaster.connect(audioCtx.destination);

            // Üç katmanlı düşük drone: derin temel + ince titreşim + ara harmonik.
            // Saraydaki mum-ışığı odasının ses karşılığı.
            const layers = [
                { freq: 65,  type: "sine",     gain: 0.10 }, // derin
                { freq: 98,  type: "triangle", gain: 0.04 }, // ara
                { freq: 196, type: "sine",     gain: 0.025 }, // ince
                { freq: 49,  type: "sine",     gain: 0.06 }  // sub
            ];

            layers.forEach(l => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = l.type;
                osc.frequency.value = l.freq;
                gain.gain.value = l.gain;
                osc.connect(gain);
                gain.connect(audioMaster);
                osc.start();
                audioNodes.push({ osc, gain });
            });

            // Düşük frekans titreşimi — "katedral rüzgârı" hissi
            const lfo = audioCtx.createOscillator();
            const lfoGain = audioCtx.createGain();
            lfo.frequency.value = 0.13;
            lfoGain.gain.value = 0.015;
            lfo.connect(lfoGain);
            lfoGain.connect(audioMaster.gain);
            lfo.start();
            audioNodes.push({ osc: lfo, gain: lfoGain });
        } catch (e) {
            audioCtx = null;
        }
    }

    function toggleAmbience() {
        if (!audioCtx) initAudio();
        if (!audioCtx) {
            toast("Ortam sesi desteklenmiyor");
            return;
        }
        const isOn = dom.btnSound.dataset.sound === "on";
        if (isOn) {
            audioMaster.gain.setTargetAtTime(0, audioCtx.currentTime, 0.6);
            dom.btnSound.dataset.sound = "off";
            toast("Ortam sesi kapandı");
        } else {
            // Resume on user gesture (mobile/safari)
            if (audioCtx.state === "suspended") audioCtx.resume();
            audioMaster.gain.setTargetAtTime(0.18, audioCtx.currentTime, 1.2);
            dom.btnSound.dataset.sound = "on";
            toast("Ortam sesi");
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    /* ────────────────────── TOAST + HINT ────────────────────── */

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

    /* ────────────────────── BOOT ────────────────────── */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
