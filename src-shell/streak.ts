// Offline streak counter (SUB-PR 2.2).
//
// Persisted via the shared StorageAdapter (SQLite on native, in-memory on web).
// Per the roadmap: "counter only, surfaced minimally on shelf." The trigger to
// tick the streak (e.g. on first engagement of the day) hooks in later — for
// now main.ts ticks once at boot, which marks the day as engaged.
//
// Pure logic with `now` as a dependency, so the counter math is deterministically
// testable across midnight rollovers and timezones in a later test.

import type { StorageAdapter } from './storage/adapter.js';

const STREAK_META_KEY = 'll:streak:v1';

export interface StreakState {
  readonly current: number;
  readonly longest: number;
  readonly lastDateISO: string | null; // YYYY-MM-DD in *local* time
}

const EMPTY: StreakState = { current: 0, longest: 0, lastDateISO: null };

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function localDateISO(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function yesterdayISO(d: Date): string {
  const y = new Date(d);
  y.setDate(y.getDate() - 1);
  return localDateISO(y);
}

export async function getStreak(adapter: StorageAdapter): Promise<StreakState> {
  const raw = await adapter.getMeta(STREAK_META_KEY);
  if (!raw) return EMPTY;
  try {
    const obj = JSON.parse(raw) as Partial<StreakState>;
    return {
      current: typeof obj.current === 'number' ? obj.current : 0,
      longest: typeof obj.longest === 'number' ? obj.longest : 0,
      lastDateISO: typeof obj.lastDateISO === 'string' ? obj.lastDateISO : null,
    };
  } catch {
    return EMPTY;
  }
}

/**
 * Mark today as engaged. Idempotent within a single local day (multiple ticks
 * on the same date do nothing). Returns the new state.
 */
export async function tickStreak(
  adapter: StorageAdapter,
  now: Date = new Date(),
): Promise<StreakState> {
  const today = localDateISO(now);
  const cur = await getStreak(adapter);
  if (cur.lastDateISO === today) return cur;

  let newCurrent: number;
  if (cur.lastDateISO === null) {
    newCurrent = 1;
  } else if (cur.lastDateISO === yesterdayISO(now)) {
    newCurrent = cur.current + 1;
  } else {
    newCurrent = 1; // a gap → restart
  }

  const next: StreakState = {
    current: newCurrent,
    longest: Math.max(cur.longest, newCurrent),
    lastDateISO: today,
  };
  await adapter.setMeta(STREAK_META_KEY, JSON.stringify(next));
  return next;
}
