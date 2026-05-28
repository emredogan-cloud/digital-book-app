// Living Library — shell entry (Phase 1.1 scaffolding placeholder).
//
// This file exists to prove the TypeScript + Vite build pipeline emits an
// IIFE bundle into www/shell/ without touching www/books/** (Motor LOCK).
// The real shell UI + `window.LL` bridge (emit / isUnlocked / openBook)
// land in SUB-PR 1.2; the namespace itself is reserved by
// www/shared/ll-namespace.js (SUB-PR 0.1).

export const SHELL_BUILD = '0.0.0-scaffold' as const;

declare global {
  interface Window {
    __LL_SHELL__?: { build: string };
  }
}

if (typeof window !== 'undefined') {
  window.__LL_SHELL__ = { build: SHELL_BUILD };
}

console.debug('[Living Library] shell build', SHELL_BUILD);
