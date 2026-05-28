// In-memory StorageAdapter. Used by the migration unit test, and also as a graceful
// web-fallback when SQLite can't initialize (data doesn't persist across reloads, but
// the shell still functions). Pure JS at runtime — no native plugin imports.

import type { StorageAdapter } from './adapter.js';
import type { StoredBookmark, StoredProgress } from './types.js';

export class MemoryAdapter implements StorageAdapter {
  private progress = new Map<string, StoredProgress>();
  private bookmarks: StoredBookmark[] = [];
  private meta = new Map<string, string>();

  async init(): Promise<void> {
    /* no-op */
  }

  async upsertProgress(p: StoredProgress): Promise<void> {
    this.progress.set(p.bookId, p);
  }

  async getProgress(bookId: string): Promise<StoredProgress | null> {
    return this.progress.get(bookId) ?? null;
  }

  async getAllProgress(): Promise<readonly StoredProgress[]> {
    return [...this.progress.values()];
  }

  async upsertBookmark(b: StoredBookmark): Promise<void> {
    const idx = this.bookmarks.findIndex((x) => x.bookId === b.bookId && x.spread === b.spread);
    if (idx >= 0) this.bookmarks[idx] = b;
    else this.bookmarks.push(b);
  }

  async getBookmarks(bookId: string): Promise<readonly StoredBookmark[]> {
    return this.bookmarks.filter((x) => x.bookId === bookId);
  }

  async setMeta(key: string, value: string): Promise<void> {
    this.meta.set(key, value);
  }

  async getMeta(key: string): Promise<string | null> {
    return this.meta.get(key) ?? null;
  }

  async reset(): Promise<void> {
    this.progress.clear();
    this.bookmarks.length = 0;
    this.meta.clear();
  }
}
