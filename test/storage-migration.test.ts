// SUB-PR 2.2 — storage migration unit test
// Run via `npm test` (uses tsx).
//
// Proves the four critical properties:
//   1. Lossless — engine localStorage data is faithfully mirrored to the adapter.
//   2. Idempotent — second run is a no-op; no duplicates.
//   3. Tolerates malformed JSON — bad input never throws.
//   4. localStorage stays intact — engine keeps reading its own keys.

import assert from 'node:assert/strict';

import { MemoryAdapter } from '../src-shell/storage/memory-adapter.js';
import { migrateFromLocalStorage, MIGRATION_KEY } from '../src-shell/storage/migrate.js';
import type { LocalStorageLike } from '../src-shell/storage/types.js';

// ── helpers ───────────────────────────────────────────────────────────────

interface FakeLocalStorage extends LocalStorageLike {
  readonly data: Map<string, string>;
  setItem(k: string, v: string): void;
}

function newFakeLS(seed: Record<string, unknown> = {}): FakeLocalStorage {
  const data = new Map<string, string>();
  for (const [k, v] of Object.entries(seed)) data.set(k, JSON.stringify(v));
  return {
    data,
    getItem(k) {
      return data.get(k) ?? null;
    },
    setItem(k, v) {
      data.set(k, v);
    },
  };
}

const SARMASIK = { slug: 'sarmasik', localStoragePrefix: 'intikam-yemini:v1:' };
const FABL = { slug: 'fabl', localStoragePrefix: 'fabl:v1:' };
const MYTH = { slug: 'mythologica', localStoragePrefix: 'codex-mythologica:v1:' };
const FAKE_BOOKS = [SARMASIK, FABL, MYTH] as const;

// ── tests ─────────────────────────────────────────────────────────────────

async function t_emptyLocalStorage(): Promise<void> {
  const ls = newFakeLS();
  const adapter = new MemoryAdapter();
  const result = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter, () => 1000);
  assert.equal(result.skipped, false);
  assert.equal(result.booksMigrated, 0);
  assert.equal(result.bookmarksMigrated, 0);
  assert.equal(await adapter.getMeta(MIGRATION_KEY), 'done');
}

async function t_seededData_lossless(): Promise<void> {
  const ls = newFakeLS({
    'intikam-yemini:v1:progress': 42,
    'intikam-yemini:v1:chapter': 'Bölüm 3',
    'intikam-yemini:v1:theme': 'tuzlu',
    'intikam-yemini:v1:typeStep': 2,
    'intikam-yemini:v1:firstSeen': true,
    'intikam-yemini:v1:bookmarks': [
      { spread: 10, label: 'önemli', ts: 500 },
      { spread: 25, label: '', ts: 600 },
    ],
    'fabl:v1:progress': 7,
    'fabl:v1:theme': 'orman',
    'codex-mythologica:v1:perfMode': 'lite',
  });
  const adapter = new MemoryAdapter();
  const result = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter, () => 1000);

  assert.equal(result.skipped, false);
  assert.equal(result.booksMigrated, 3);
  assert.equal(result.bookmarksMigrated, 2);

  const sarmasik = await adapter.getProgress('sarmasik');
  assert.ok(sarmasik);
  assert.equal(sarmasik.spreadIndex, 42);
  assert.equal(sarmasik.chapter, 'Bölüm 3');
  assert.equal(sarmasik.theme, 'tuzlu');
  assert.equal(sarmasik.typeStep, 2);
  assert.equal(sarmasik.firstSeen, true);
  assert.equal(sarmasik.bookId, 'sarmasik');

  const sarmasikBM = await adapter.getBookmarks('sarmasik');
  assert.equal(sarmasikBM.length, 2);
  assert.equal(sarmasikBM[0].spread, 10);
  assert.equal(sarmasikBM[0].label, 'önemli');
  assert.equal(sarmasikBM[1].spread, 25);

  const fabl = await adapter.getProgress('fabl');
  assert.ok(fabl);
  assert.equal(fabl.spreadIndex, 7);
  assert.equal(fabl.theme, 'orman');
  assert.equal(fabl.typeStep, 1); // default when not seeded
  assert.equal(fabl.firstSeen, false);

  const myth = await adapter.getProgress('mythologica');
  assert.ok(myth);
  assert.equal(myth.perfMode, 'lite');
}

async function t_idempotent(): Promise<void> {
  const ls = newFakeLS({
    'fabl:v1:progress': 5,
    'fabl:v1:bookmarks': [{ spread: 1, label: 'x', ts: 100 }],
  });
  const adapter = new MemoryAdapter();

  const r1 = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter);
  assert.equal(r1.skipped, false);
  assert.equal(r1.booksMigrated, 1);
  assert.equal(r1.bookmarksMigrated, 1);

  const r2 = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter);
  assert.equal(r2.skipped, true);
  assert.equal(r2.booksMigrated, 0);
  assert.equal(r2.bookmarksMigrated, 0);

  // No duplicate bookmark introduced
  const bm = await adapter.getBookmarks('fabl');
  assert.equal(bm.length, 1);
}

async function t_malformedJSON_tolerated(): Promise<void> {
  const ls = newFakeLS();
  ls.data.set('fabl:v1:progress', '{not json');
  ls.data.set('fabl:v1:bookmarks', 'still not json');
  const adapter = new MemoryAdapter();
  const result = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter);
  // Doesn't throw; the malformed values are treated as null → book skipped.
  assert.equal(result.skipped, false);
  assert.equal(result.booksMigrated, 0);
}

async function t_originalLocalStorage_untouched(): Promise<void> {
  const ls = newFakeLS({
    'fabl:v1:progress': 99,
    'intikam-yemini:v1:theme': 'tuzlu',
  });
  const before = new Map(ls.data);
  const adapter = new MemoryAdapter();
  await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter);
  assert.equal(ls.data.size, before.size);
  for (const [k, v] of before) {
    assert.equal(ls.data.get(k), v, `key ${k} changed during migration`);
  }
}

async function t_partialData(): Promise<void> {
  // A book with only `theme` set (no progress, no bookmarks) still gets a row.
  const ls = newFakeLS({ 'fabl:v1:theme': 'orman' });
  const adapter = new MemoryAdapter();
  const result = await migrateFromLocalStorage(FAKE_BOOKS, ls, adapter);
  assert.equal(result.booksMigrated, 1);
  const fabl = await adapter.getProgress('fabl');
  assert.ok(fabl);
  assert.equal(fabl.theme, 'orman');
  assert.equal(fabl.spreadIndex, 0); // default
}

// ── runner ────────────────────────────────────────────────────────────────

const tests: ReadonlyArray<readonly [string, () => Promise<void>]> = [
  ['empty localStorage → migration is a no-op (marker set)', t_emptyLocalStorage],
  ['seeded data → SQLite mirrors EVERY engine field (lossless)', t_seededData_lossless],
  ['idempotent (second run is a no-op, no dupes)', t_idempotent],
  ['malformed JSON values are tolerated, never throw', t_malformedJSON_tolerated],
  ['original localStorage is byte-for-byte UNTOUCHED', t_originalLocalStorage_untouched],
  ['partial data (e.g. only theme set) still creates a row', t_partialData],
];

// Wrapped in an async IIFE because tsx's default CJS transform rejects top-level await.
void (async () => {
  let passed = 0;
  let failed = 0;
  for (const [name, fn] of tests) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (e) {
      console.log(`  ✗ ${name}`);
      console.log(`     ${(e as Error).message}`);
      failed++;
    }
  }
  console.log(`\n  ${passed}/${tests.length} passed${failed > 0 ? ` · ${failed} FAILED` : ''}`);
  if (failed > 0) process.exit(1);
})();
