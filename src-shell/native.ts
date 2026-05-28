// Capacitor native plugin wrappers (SUB-PR 2.1 — Path A: shell-side only).
//
// What this module does:
//   - Apply per-book StatusBar tint when a book opens; reset to bookshelf colors otherwise.
//   - Trigger haptic feedback on engine lifecycle events (page_turn / bookmark_add /
//     chapter_complete). The single-line `emit()` hooks INSIDE the engine that fire those
//     events land in SUB-PR 2.3 (kept separate per the agreed Path A — engine stays frozen
//     in 2.1). So today the haptics are *wired but dormant*; they'll activate the moment 2.3
//     adds the `window.LL?.emit(...)` lines to goNext / goPrev / bookmark / chapterComplete.
//
// What this module deliberately does NOT do:
//   - Swap the splash-screen drawable per book. Capacitor's SplashScreen plugin uses a static
//     Android resource and cannot swap drawables at runtime. The book's `splashBackgroundColor`
//     stays in books.ts as metadata for a future polish sub-PR. Status bar handles per-book
//     tinting at runtime, which is the more visible cue anyway.
//
// Robustness:
//   - EVERY native call goes through `safe(...)`, which (a) feature-detects via
//     `Capacitor.isNativePlatform()` and (b) wraps in try/catch. In a desktop browser this
//     means zero errors; in the native shell it means a missing-plugin runtime is degraded
//     to a debug log rather than a crash.

import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';

import { findBook, type BookMeta } from './books.js';
import { onLLEmit, type LLEventPayload } from './ll-bridge.js';

const SHELF_THEME = { backgroundColor: '#06070a', style: StatusBarStyle.Light } as const;

function isNative(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

async function safe(label: string, fn: () => Promise<unknown>): Promise<void> {
  if (!isNative()) return; // browser/dev: graceful no-op
  try {
    await fn();
  } catch (err) {
    // Plugin missing / method unimplemented / OS denied — degrade to a debug line.
    console.debug(`[native:${label}] no-op:`, (err as Error)?.message ?? err);
  }
}

// ─────────────────────────── status-bar theming ───────────────────────────

export async function applyShelfTheme(): Promise<void> {
  await safe('statusBar:bg', () =>
    StatusBar.setBackgroundColor({ color: SHELF_THEME.backgroundColor }),
  );
  await safe('statusBar:style', () => StatusBar.setStyle({ style: SHELF_THEME.style }));
}

export async function applyBookTheme(book: BookMeta): Promise<void> {
  await safe('statusBar:bg', () => StatusBar.setBackgroundColor({ color: book.themeColor }));
  const style = book.statusBarStyle === 'dark' ? StatusBarStyle.Dark : StatusBarStyle.Light;
  await safe('statusBar:style', () => StatusBar.setStyle({ style }));
}

// ─────────────────────────── haptics ───────────────────────────

async function hapticImpact(style: ImpactStyle): Promise<void> {
  await safe(`haptic:impact:${style}`, () => Haptics.impact({ style }));
}

async function hapticNotification(type: NotificationType): Promise<void> {
  await safe(`haptic:notification:${type}`, () => Haptics.notification({ type }));
}

// ─────────────────────────── bridge subscription ───────────────────────────

/**
 * Subscribe haptics + theming to `bridge.emit` events. Called once at boot from main.ts.
 * Returns an unsubscribe fn (useful for tests).
 */
export function attachNativeListeners(): () => void {
  return onLLEmit((event, payload) => {
    switch (event) {
      case 'page_turn':
        void hapticImpact(ImpactStyle.Light);
        break;
      case 'bookmark_add':
        void hapticImpact(ImpactStyle.Medium);
        break;
      case 'chapter_complete':
        void hapticNotification(NotificationType.Success);
        break;
      case 'book_open': {
        const slug = readSlug(payload);
        if (!slug) return;
        const book = findBook(slug);
        if (book) void applyBookTheme(book);
        break;
      }
    }
  });
}

function readSlug(payload?: LLEventPayload): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const v = (payload as Record<string, unknown>)['bookId'];
  return typeof v === 'string' ? v : null;
}
