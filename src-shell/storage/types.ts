// Shared types for the durable storage layer (SUB-PR 2.2).

export interface StoredProgress {
  readonly bookId: string;
  /** Engine's "spread" (page-pair) index; mirrors localStorage `<prefix>progress`. */
  readonly spreadIndex: number;
  /** Chapter anchor for sync catch-up on re-open. */
  readonly chapter: string | null;
  /** Font scale step 0–4 (engine). */
  readonly typeStep: number;
  readonly theme: string | null;
  readonly perfMode: string | null;
  readonly firstSeen: boolean;
  readonly updatedAt: number;
}

export interface StoredBookmark {
  readonly bookId: string;
  readonly spread: number;
  readonly label: string;
  readonly ts: number;
}

export interface MigrationResult {
  readonly skipped: boolean;
  readonly booksMigrated: number;
  readonly bookmarksMigrated: number;
}

/** Minimal localStorage shape (so tests can pass a fake without touching globals). */
export interface LocalStorageLike {
  getItem(key: string): string | null;
}
