// Storage facade — picks the right adapter at runtime and runs the one-time
// localStorage → SQLite migration on first boot.

import { Capacitor } from '@capacitor/core';

import { BOOKS } from '../books.js';
import type { StorageAdapter } from './adapter.js';
import { MemoryAdapter } from './memory-adapter.js';
import { migrateFromLocalStorage } from './migrate.js';
import { SQLiteAdapter } from './sqlite-adapter.js';
import type { MigrationResult } from './types.js';

let _adapter: StorageAdapter | null = null;
let _initPromise: Promise<StorageAdapter> | null = null;

function isNative(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export async function getStorage(): Promise<StorageAdapter> {
  if (_adapter) return _adapter;
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    if (isNative()) {
      const sqlite = new SQLiteAdapter();
      try {
        await sqlite.init();
        _adapter = sqlite;
        return sqlite;
      } catch (err) {
        console.warn('[storage] SQLite init failed, falling back to in-memory:', err);
      }
    }
    const mem = new MemoryAdapter();
    await mem.init();
    _adapter = mem;
    return mem;
  })();
  return _initPromise;
}

export async function runMigrationIfNeeded(): Promise<MigrationResult | null> {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const adapter = await getStorage();
  try {
    return await migrateFromLocalStorage(BOOKS, window.localStorage, adapter);
  } catch (err) {
    console.warn('[storage] migration failed:', err);
    return null;
  }
}

/** Reads engine progress straight from localStorage — used by the shelf for the
 *  per-book progress UI. Synchronous + cheap; doesn't depend on SQLite init. */
export function readEngineProgress(prefix: string): {
  spreadIndex: number | null;
  hasBookmarks: boolean;
} {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { spreadIndex: null, hasBookmarks: false };
  }
  const progress = safeParse(window.localStorage.getItem(prefix + 'progress'));
  const bookmarks = safeParse(window.localStorage.getItem(prefix + 'bookmarks'));
  return {
    spreadIndex:
      typeof progress === 'number' && Number.isFinite(progress) && progress > 0 ? progress : null,
    hasBookmarks: Array.isArray(bookmarks) && bookmarks.length > 0,
  };
}

function safeParse(raw: string | null): unknown {
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
