// window.LL — bridge stub with FINAL signatures (introduced 1.2 · extended 2.1).
//
// SUB-PR 2.1 added an emit-listener fan-out so `src-shell/native.ts` can attach
// haptics + per-book StatusBar tinting via `onLLEmit(...)`. The public LLBridge
// interface is UNCHANGED (emit / isUnlocked / openBook / getBooks / getBookMeta).
//
// Phases 2+ wire the real bodies:
//   - emit body  → PostHog (Phase 2.3 — also adds the engine emit hooks)
//   - isUnlocked → RevenueCat entitlement cache (Phase 4)
//
// The book engine is FROZEN. The single sanctioned engine contact remains
// `window.LL.emit()` / `window.LL.isUnlocked()` — same signatures forever.

import { BOOKS, findBook, type BookMeta } from './books.js';

export type LLEventPayload = Record<string, unknown> | undefined;

export interface LLBridge {
  readonly version: string;
  emit(event: string, payload?: LLEventPayload): void;
  isUnlocked(bookId: string, chapterIndex?: number): boolean;
  openBook(slug: string): void;
  getBooks(): readonly BookMeta[];
  getBookMeta(slug: string): BookMeta | undefined;
}

declare global {
  interface Window {
    LL?: LLBridge;
  }
}

// ── Emit subscriber fan-out (SUB-PR 2.1) ───────────────────────────────────
// Listeners run synchronously to keep emit's call-site cheap. They may fire-and-
// forget async work themselves (native plugin calls do exactly this).

export type EmitListener = (event: string, payload?: LLEventPayload) => void;

const emitListeners = new Set<EmitListener>();

export function onLLEmit(listener: EmitListener): () => void {
  emitListeners.add(listener);
  return () => {
    emitListeners.delete(listener);
  };
}

// ── Last-opened book persistence (drives the Continue-reading hero) ─────────

const LAST_OPENED_KEY = 'll:lastOpenedBook';

function safeSet(key: string, value: string): void {
  try {
    window.localStorage?.setItem(key, value);
  } catch {
    /* private mode / disabled — ignore */
  }
}

export function getLastOpenedSlug(): string | null {
  try {
    return window.localStorage?.getItem(LAST_OPENED_KEY) ?? null;
  } catch {
    return null;
  }
}

// ── The bridge ─────────────────────────────────────────────────────────────

export function installBridge(): LLBridge {
  const bridge: LLBridge = {
    version: '2.1.0-bridge-listener',

    emit(event, payload) {
      console.debug('[LL.emit]', event, payload ?? {});
      emitListeners.forEach((listener) => {
        try {
          listener(event, payload);
        } catch (err) {
          console.warn('[LL.emit] listener error for', event, err);
        }
      });
    },

    isUnlocked(_bookId, _chapterIndex) {
      // Phase 4 swaps this for the RevenueCat entitlement cache.
      return true;
    },

    openBook(slug) {
      const book = findBook(slug);
      if (!book) {
        console.warn('[LL.openBook] unknown book slug:', slug);
        return;
      }
      safeSet(LAST_OPENED_KEY, slug);
      bridge.emit('book_open', { bookId: slug });
      window.location.assign(`books/${slug}/index.html`);
    },

    getBooks() {
      return BOOKS;
    },

    getBookMeta(slug) {
      return findBook(slug);
    },
  };

  window.LL = bridge;
  return bridge;
}
