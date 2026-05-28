// Living Library — shell entry (SUB-PR 2.1).
//
// Boot order:
//   1) initSentry             (no-op when VITE_SENTRY_DSN is empty)
//   2) installBridge          (sets window.LL with final signatures + emit fan-out)
//   3) attachNativeListeners  (haptics + per-book StatusBar via onLLEmit)
//   4) applyShelfTheme        (StatusBar tint for the bookshelf — no-op in browser)
//   5) DOMContentLoaded       → renderShelf(#ll-root) → emit('shelf_view')

import { initSentry } from './sentry.js';
import { installBridge } from './ll-bridge.js';
import { renderShelf } from './shelf.js';
import { applyShelfTheme, attachNativeListeners } from './native.js';

export const SHELL_BUILD = '2.1.0-native-feel' as const;

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
