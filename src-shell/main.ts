// Living Library — shell entry (SUB-PR 2.3 part 1: instrumentation wired).
//
// Boot order:
//   1) initSentry             (no-op when VITE_SENTRY_DSN is empty)
//   2) installBridge          (sets window.LL with final signatures + emit fan-out)
//   3) attachNativeListeners  (haptics + per-book StatusBar via onLLEmit)
//   4) initAnalytics          (PostHog subscriber via onLLEmit; consent-gated)
//   5) applyShelfTheme        (StatusBar tint for the bookshelf — no-op in browser)
//   6) bridge.emit('app_open') + global error → emit('error', …)
//   7) async: runMigrationIfNeeded → tickStreak (fire-and-forget; don't block render)
//   8) DOMContentLoaded       → renderShelf(#ll-root) → emit('shelf_view')

import { initSentry } from './sentry.js';
import { installBridge } from './ll-bridge.js';
import { renderShelf } from './shelf.js';
import { applyShelfTheme, attachNativeListeners } from './native.js';
import { getStorage, runMigrationIfNeeded } from './storage/index.js';
import { tickStreak } from './streak.js';
import { initAnalytics } from './analytics.js';

export const SHELL_BUILD = '2.3.0-instrumented' as const;

declare global {
  interface Window {
    __LL_SHELL__?: { build: string };
  }
}

initSentry();
const bridge = installBridge();
attachNativeListeners();
initAnalytics();
void applyShelfTheme();
window.__LL_SHELL__ = { build: SHELL_BUILD };

// Shell-side instrumentation seed (engine emit hooks land in 2.3 Part 2 — per
// CLAUDE.md / D-001, that's the only sanctioned book-code edit, ever).
bridge.emit('app_open');

window.addEventListener('error', (e: ErrorEvent) => {
  bridge.emit('error', {
    message: e.message || 'unknown',
    filename: e.filename,
    lineno: e.lineno,
  });
});
window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
  const msg = e.reason instanceof Error ? e.reason.message : String(e.reason);
  bridge.emit('error', { message: msg, kind: 'unhandledRejection' });
});

// One-time engine → SQLite migration + daily streak tick. Fully async; failures
// only console.warn — never block the shelf render.
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
