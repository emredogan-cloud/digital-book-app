// Living Library — shell entry (SUB-PR 1.2).
// Installs `window.LL` and renders the bookshelf into `#ll-root`.

import { installBridge } from './ll-bridge.js';
import { renderShelf } from './shelf.js';

export const SHELL_BUILD = '1.2.0-bookshelf' as const;

declare global {
  interface Window {
    __LL_SHELL__?: { build: string };
  }
}

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
