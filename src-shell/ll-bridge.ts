// window.LL — bridge stub with FINAL signatures (SUB-PR 1.2).
//
// Behaviour is intentionally minimal. Phases 2+ wire the real things:
//   - emit(event, payload)   → PostHog (Phase 2, consent-gated)
//   - isUnlocked(...)         → RevenueCat entitlement cache (Phase 4)
//   - openBook(slug)          → may add StatusBar/Splash theming (Phase 2)
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

export function installBridge(): LLBridge {
  const bridge: LLBridge = {
    version: '1.2.0-bridge-stub',

    emit(event, payload) {
      // Phase 2 wires this to PostHog behind a consent gate.
      console.debug('[LL.emit]', event, payload ?? {});
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
