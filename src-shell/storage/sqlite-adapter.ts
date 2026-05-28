// SQLite-backed StorageAdapter using @capacitor-community/sqlite. Native-only:
// init() throws on web; the runtime picker in storage/index.ts catches the throw
// and falls back to MemoryAdapter. The import itself is safe on web (the plugin's
// web shim just throws "not implemented" when called).

import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';

import type { StorageAdapter } from './adapter.js';
import type { StoredBookmark, StoredProgress } from './types.js';

const DB_NAME = 'living-library';
const SCHEMA_VERSION = 1;

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS progress (
    bookId       TEXT PRIMARY KEY NOT NULL,
    spreadIndex  INTEGER NOT NULL DEFAULT 0,
    chapter      TEXT,
    typeStep     INTEGER NOT NULL DEFAULT 1,
    theme        TEXT,
    perfMode     TEXT,
    firstSeen    INTEGER NOT NULL DEFAULT 0,
    updatedAt    INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS bookmarks (
    bookId  TEXT NOT NULL,
    spread  INTEGER NOT NULL,
    label   TEXT NOT NULL DEFAULT '',
    ts      INTEGER NOT NULL,
    PRIMARY KEY (bookId, spread)
  );
  CREATE TABLE IF NOT EXISTS meta (
    key    TEXT PRIMARY KEY NOT NULL,
    value  TEXT NOT NULL
  );
`;

export class SQLiteAdapter implements StorageAdapter {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private conn: SQLiteDBConnection | null = null;

  async init(): Promise<void> {
    this.conn = await this.sqlite.createConnection(
      DB_NAME,
      false,
      'no-encryption',
      SCHEMA_VERSION,
      false,
    );
    await this.conn.open();
    await this.conn.execute(SCHEMA);
  }

  private requireConn(): SQLiteDBConnection {
    if (!this.conn) throw new Error('SQLiteAdapter not initialized — call init() first');
    return this.conn;
  }

  async upsertProgress(p: StoredProgress): Promise<void> {
    const db = this.requireConn();
    await db.run(
      `INSERT INTO progress (bookId, spreadIndex, chapter, typeStep, theme, perfMode, firstSeen, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(bookId) DO UPDATE SET
         spreadIndex = excluded.spreadIndex,
         chapter     = excluded.chapter,
         typeStep    = excluded.typeStep,
         theme       = excluded.theme,
         perfMode    = excluded.perfMode,
         firstSeen   = excluded.firstSeen,
         updatedAt   = excluded.updatedAt`,
      [p.bookId, p.spreadIndex, p.chapter, p.typeStep, p.theme, p.perfMode, p.firstSeen ? 1 : 0, p.updatedAt],
    );
  }

  async getProgress(bookId: string): Promise<StoredProgress | null> {
    const db = this.requireConn();
    const res = await db.query(`SELECT * FROM progress WHERE bookId = ? LIMIT 1`, [bookId]);
    const row = res.values?.[0];
    if (!row) return null;
    return rowToProgress(row as Record<string, unknown>);
  }

  async getAllProgress(): Promise<readonly StoredProgress[]> {
    const db = this.requireConn();
    const res = await db.query(`SELECT * FROM progress`);
    return (res.values ?? []).map((r) => rowToProgress(r as Record<string, unknown>));
  }

  async upsertBookmark(b: StoredBookmark): Promise<void> {
    const db = this.requireConn();
    await db.run(
      `INSERT INTO bookmarks (bookId, spread, label, ts)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(bookId, spread) DO UPDATE SET
         label = excluded.label,
         ts    = excluded.ts`,
      [b.bookId, b.spread, b.label, b.ts],
    );
  }

  async getBookmarks(bookId: string): Promise<readonly StoredBookmark[]> {
    const db = this.requireConn();
    const res = await db.query(`SELECT * FROM bookmarks WHERE bookId = ? ORDER BY spread ASC`, [bookId]);
    return (res.values ?? []).map((r) => {
      const row = r as Record<string, unknown>;
      return {
        bookId: String(row.bookId),
        spread: Number(row.spread),
        label: String(row.label ?? ''),
        ts: Number(row.ts),
      };
    });
  }

  async setMeta(key: string, value: string): Promise<void> {
    const db = this.requireConn();
    await db.run(
      `INSERT INTO meta (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [key, value],
    );
  }

  async getMeta(key: string): Promise<string | null> {
    const db = this.requireConn();
    const res = await db.query(`SELECT value FROM meta WHERE key = ? LIMIT 1`, [key]);
    const row = res.values?.[0] as Record<string, unknown> | undefined;
    return row ? String(row.value) : null;
  }

  async reset(): Promise<void> {
    const db = this.requireConn();
    await db.execute(`DELETE FROM progress; DELETE FROM bookmarks; DELETE FROM meta;`);
  }
}

function rowToProgress(row: Record<string, unknown>): StoredProgress {
  return {
    bookId: String(row.bookId),
    spreadIndex: Number(row.spreadIndex),
    chapter: row.chapter == null ? null : String(row.chapter),
    typeStep: Number(row.typeStep),
    theme: row.theme == null ? null : String(row.theme),
    perfMode: row.perfMode == null ? null : String(row.perfMode),
    firstSeen: Number(row.firstSeen) === 1,
    updatedAt: Number(row.updatedAt),
  };
}
