/* ════════════════════════════════════════════════════════════════
   storage.js
   Thin wrapper over localStorage for reading progress, bookmarks,
   theme, and typography preferences.
   ════════════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    const NS = "codex-mythologica:v1:";
    const KEYS = {
        progress:   NS + "progress",
        bookmarks:  NS + "bookmarks",
        theme:      NS + "theme",
        typeStep:   NS + "typeStep",
        firstSeen:  NS + "firstSeen"
    };

    function safeGet(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return fallback;
            return JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    }

    function safeSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    const Storage = {
        // --- progress (last spread index viewed) ---
        getProgress() {
            return safeGet(KEYS.progress, 0);
        },
        setProgress(spreadIndex) {
            return safeSet(KEYS.progress, Math.max(0, spreadIndex | 0));
        },

        // --- bookmarks: array of { spread, label, ts } ---
        getBookmarks() {
            return safeGet(KEYS.bookmarks, []);
        },
        setBookmarks(list) {
            return safeSet(KEYS.bookmarks, Array.isArray(list) ? list : []);
        },
        toggleBookmark(spreadIndex, label) {
            const list = this.getBookmarks();
            const idx = list.findIndex(b => b.spread === spreadIndex);
            if (idx >= 0) {
                list.splice(idx, 1);
                this.setBookmarks(list);
                return false;
            }
            list.push({ spread: spreadIndex, label: label || "", ts: Date.now() });
            list.sort((a, b) => a.spread - b.spread);
            this.setBookmarks(list);
            return true;
        },
        hasBookmark(spreadIndex) {
            return this.getBookmarks().some(b => b.spread === spreadIndex);
        },

        // --- theme ---
        getTheme() { return safeGet(KEYS.theme, "midnight"); },
        setTheme(name) { return safeSet(KEYS.theme, name); },

        // --- type scale step (0..4) ---
        getTypeStep() { return safeGet(KEYS.typeStep, 1); },
        setTypeStep(step) { return safeSet(KEYS.typeStep, Math.max(0, Math.min(4, step | 0))); },

        // --- first seen flag ---
        getFirstSeen() { return safeGet(KEYS.firstSeen, false); },
        setFirstSeen(value) { return safeSet(KEYS.firstSeen, !!value); },

        // --- bulk reset (for debugging) ---
        clear() {
            Object.values(KEYS).forEach(k => {
                try { localStorage.removeItem(k); } catch (e) { /* */ }
            });
        }
    };

    window.MYTHOLOGY = window.MYTHOLOGY || {};
    window.MYTHOLOGY.Storage = Storage;
})();
