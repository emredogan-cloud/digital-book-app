// Storage adapter contract — implemented by MemoryAdapter (tests/web fallback) and
// SQLiteAdapter (native production). Keeping the surface small and async-only keeps
// every implementation testable through the same interface.

import type { StoredBookmark, StoredProgress } from './types.js';

export interface StorageAdapter {
  init(): Promise<void>;

  upsertProgress(progress: StoredProgress): Promise<void>;
  getProgress(bookId: string): Promise<StoredProgress | null>;
  getAllProgress(): Promise<readonly StoredProgress[]>;

  upsertBookmark(bookmark: StoredBookmark): Promise<void>;
  getBookmarks(bookId: string): Promise<readonly StoredBookmark[]>;

  /** Small key-value (migration marker, streak state, …). */
  setMeta(key: string, value: string): Promise<void>;
  getMeta(key: string): Promise<string | null>;

  /** Tests only; production adapters MAY no-op or throw. */
  reset(): Promise<void>;
}
