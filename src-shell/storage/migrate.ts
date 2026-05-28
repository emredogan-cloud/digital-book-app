// One-time, idempotent localStorage → StorageAdapter migration (SUB-PR 2.2).
//
// CRITICAL PROPERTIES (verified by test/storage-migration.test.ts):
//   - Lossless: every key the engine writes is mirrored to the adapter.
//   - Idempotent: a second run is a no-op (gated by a marker in the meta table).
//   - Read-only on localStorage: the engine keeps reading its own keys; we never
//     mutate or remove anything from localStorage in this release (the roadmap
//     says to keep it as a fallback for one release).
//   - Tolerates malformed/missing values: bad JSON → treated as null/default.
//
// This module is intentionally pure: it depends only on the StorageAdapter +
// LocalStorageLike interfaces, so it can be unit-tested without any Capacitor
// plugin or browser globals.

import type { StorageAdapter } from './adapter.js';
import type { LocalStorageLike, MigrationResult } from './types.js';

export const MIGRATION_KEY = 'll:storage:migration:v1';

/** Engine key suffixes (after the per-book prefix). Derived from each book's storage.js. */
const SUFFIXES = ['progress', 'chapter', 'theme', 'typeStep', 'perfMode', 'firstSeen', 'bookmarks'] as const;

interface BookMetaForMigration {
  readonly slug: string;
  readonly localStoragePrefix: string;
}

function safeParse(raw: string | null): unknown {
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asNumber(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

function asString(v: unknown): string | null {
  return typeof v === 'string' ? v : null;
}

export async function migrateFromLocalStorage(
  books: ReadonlyArray<BookMetaForMigration>,
  ls: LocalStorageLike,
  adapter: StorageAdapter,
  now: () => number = Date.now,
): Promise<MigrationResult> {
  if ((await adapter.getMeta(MIGRATION_KEY)) === 'done') {
    return { skipped: true, booksMigrated: 0, bookmarksMigrated: 0 };
  }

  let booksMigrated = 0;
  let bookmarksMigrated = 0;

  for (const book of books) {
    const p = book.localStoragePrefix;
    const progress = safeParse(ls.getItem(p + 'progress'));
    const chapter = safeParse(ls.getItem(p + 'chapter'));
    const theme = safeParse(ls.getItem(p + 'theme'));
    const typeStep = safeParse(ls.getItem(p + 'typeStep'));
    const perfMode = safeParse(ls.getItem(p + 'perfMode'));
    const firstSeen = safeParse(ls.getItem(p + 'firstSeen'));
    const bookmarksRaw = safeParse(ls.getItem(p + 'bookmarks'));

    const hasAny =
      progress !== null ||
      chapter !== null ||
      theme !== null ||
      typeStep !== null ||
      perfMode !== null ||
      (firstSeen !== null && firstSeen !== false) ||
      (Array.isArray(bookmarksRaw) && bookmarksRaw.length > 0);

    if (!hasAny) continue;

    await adapter.upsertProgress({
      bookId: book.slug,
      spreadIndex: Math.max(0, asNumber(progress, 0)),
      chapter: asString(chapter),
      typeStep: Math.max(0, Math.min(4, asNumber(typeStep, 1))),
      theme: asString(theme),
      perfMode: asString(perfMode),
      firstSeen: firstSeen === true,
      updatedAt: now(),
    });
    booksMigrated++;

    if (Array.isArray(bookmarksRaw)) {
      for (const bm of bookmarksRaw) {
        if (bm && typeof bm === 'object') {
          const obj = bm as Record<string, unknown>;
          if (typeof obj.spread === 'number' && Number.isFinite(obj.spread)) {
            await adapter.upsertBookmark({
              bookId: book.slug,
              spread: obj.spread,
              label: typeof obj.label === 'string' ? obj.label : '',
              ts: typeof obj.ts === 'number' ? obj.ts : now(),
            });
            bookmarksMigrated++;
          }
        }
      }
    }
  }

  await adapter.setMeta(MIGRATION_KEY, 'done');
  return { skipped: false, booksMigrated, bookmarksMigrated };
}

/** Exposed for tests / introspection. */
export { SUFFIXES };
