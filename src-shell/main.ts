// Living Library — shell entry (SUB-PR 2.2).
//
// Boot order:
//   1) initSentry             (no-op when VITE_SENTRY_DSN is empty)
//   2) installBridge          (sets window.LL with final signatures + emit fan-out)
//   3) attachNativeListeners  (haptics + per-book StatusBar via onLLEmit)
//   4) applyShelfTheme        (StatusBar tint for the bookshelf — no-op in browser)
//   5) async: runMigrationIfNeeded → tickStreak (both fire-and-forget; don't block render)
//   6) DOMContentLoaded       → renderShelf(#ll-root) → emit('shelf_view')

import { initSentry } from './sentry.js';
import { installBridge } from './ll-bridge.js';
import { renderShelf } from './shelf.js';
import { applyShelfTheme, attachNativeListeners } from './native.js';
import { getStorage, runMigrationIfNeeded } from './storage/index.js';
import { tickStreak } from './streak.js';

export const SHELL_BUILD = '2.2.0-persistence' as const;

declare global {
  interface Window {
    __LL_SHELL__?: { build: string };
  }
}

initSentry();
const bridge = installBridge();
attachNativeListeners();
void applyShelfTheme();
window.__LL_SHELL__ = { build: SHELL_BUILD };

// One-time engine→SQLite migration + daily streak tick. Fully async and isolated
// from the render path — a failure here never blocks the shelf.
void (async () => {
  try {
    const result = await runMigrationIfNeeded();
    if (result && !result.skipped) {
      console.debug('[Living Library] migration:', result);
    }
    const adapter = await getStorage();
    await tickStreak(adapter);
  } catch (err) {
    console.warn('[Living Library] storage/streak init failed:', err);
  }
})();

function boot(): void {
  const root = document.getElementById('ll-root');
  if (!root) {
    console.error('[Living Library] #ll-root not found — shell aborted');
    return;
  }
  renderShelf(root, bridge);
  bridge.emit('shelf_view');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

console.debug('[Living Library] shell build', SHELL_BUILD);
