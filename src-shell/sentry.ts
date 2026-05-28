// Sentry browser SDK wiring (SUB-PR 1.3).
//
// DSN is read from the gitignored repo-root `.env` as VITE_SENTRY_DSN. The
// shell ALWAYS builds; if the DSN is empty, init is a no-op so contributors
// without a Sentry account can still develop locally. Phases 2+ may add
// source-map upload in CI.

import { init as sentryInit } from '@sentry/browser';

export function initSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.debug('[Living Library] Sentry skipped (no VITE_SENTRY_DSN)');
    return;
  }
  sentryInit({
    dsn,
    release: '1.3.0-internal',
    environment: 'internal',
    // Conservative defaults — telemetry policy locks in Phase 2.
    tracesSampleRate: 0,
    sendDefaultPii: false,
  });
  console.debug('[Living Library] Sentry initialized');
}
