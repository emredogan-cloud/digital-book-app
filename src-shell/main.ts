// Living Library — shell entry (SUB-PR 1.3).
// Inits Sentry (no-op if VITE_SENTRY_DSN unset), installs window.LL, renders
// the bookshelf into #ll-root.

import { initSentry } from './sentry.js';
import { installBridge } from './ll-bridge.js';
import { renderShelf } from './shelf.js';

export const SHELL_BUILD = '1.3.0-signed' as const;

declare global {
  interface Window {
    __LL_SHELL__?: { build: string };
  }
}

initSentry();
const bridge = installBridge();
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
