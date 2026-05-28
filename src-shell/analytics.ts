// PostHog analytics + consent gate + LLEvent taxonomy (SUB-PR 2.3).
//
// Pattern mirrors src-shell/sentry.ts:
//   - VITE_POSTHOG_KEY is read at build time. Empty → init is a no-op AND Vite
//     dead-code-eliminates the PostHog runtime (bundle stays lean pre-DSN).
//   - Optional VITE_POSTHOG_HOST defaults to https://app.posthog.com.
//
// Privacy (KVKK/GDPR per roadmap §9):
//   - NO events leave the device until the user grants consent.
//   - Consent is persisted in localStorage so it survives reloads.
//   - The actual consent UI lands in a later sub-PR; for now you can call
//     setAnalyticsConsent(true) from DevTools to flip the gate during testing.
//
// Decoupling:
//   - This module subscribes to bridge.emit() via onLLEmit(). It never imports
//     the bridge object; the bridge stays unchanged from 2.1's listener fan-out.

// posthog-js is dynamically imported inside initIfReady — only loaded once
// VITE_POSTHOG_KEY is set AND consent is granted. Keeps the bundle tiny pre-DSN
// and prevents posthog-js's top-level browser-global access (navigator/etc.)
// from breaking environments where those don't exist (e.g. Node-eval tests).
import type { PostHog } from 'posthog-js';

import { onLLEmit, type LLEventPayload } from './ll-bridge.js';

// ── LLEvent taxonomy (roadmap 2.3 §Tasks) ─────────────────────────────────

/** Canonical event names — only these should appear in `LL.emit(name, payload)`. */
export type LLEventName =
  | 'app_open'
  | 'shelf_view'
  | 'book_open'
  | 'cover_gate_opened'
  | 'page_turn'
  | 'chapter_complete'
  | 'book_complete'
  | 'bookmark_add'
  | 'theme_change'
  | 'font_scale_change'
  | 'session_end'
  | 'error';

/** Optional payload shapes per event (informational; emit() accepts any object). */
export interface LLEventPayloads {
  app_open: Record<string, never>;
  shelf_view: Record<string, never>;
  book_open: { bookId: string };
  cover_gate_opened: { bookId: string };
  page_turn: { bookId: string; spread?: number; direction?: 'next' | 'prev' };
  chapter_complete: { bookId: string; chapter?: string };
  book_complete: { bookId: string };
  bookmark_add: { bookId: string; spread?: number };
  theme_change: { bookId: string; theme?: string };
  font_scale_change: { bookId: string; typeStep?: number };
  session_end: { bookId: string; reading_minutes?: number };
  error: { message: string; stack?: string; filename?: string; lineno?: number; kind?: string };
}

// ── Consent gate ──────────────────────────────────────────────────────────

const CONSENT_KEY = 'll:analytics:consent';
export type ConsentState = 'granted' | 'denied' | 'unknown';

export function getAnalyticsConsent(): ConsentState {
  try {
    const v = window.localStorage?.getItem(CONSENT_KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {
    /* ignore */
  }
  return 'unknown';
}

export function setAnalyticsConsent(granted: boolean): void {
  try {
    window.localStorage?.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch {
    /* ignore */
  }
  if (granted) initIfReady();
}

// ── PostHog init (idempotent, gated on consent + DSN) ─────────────────────

let _posthog: PostHog | null = null;
let _initPromise: Promise<void> | null = null;

async function initIfReady(): Promise<void> {
  if (_posthog) return;
  if (_initPromise) return _initPromise;
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) {
    console.debug('[Living Library] PostHog skipped (no VITE_POSTHOG_KEY)');
    return;
  }
  if (getAnalyticsConsent() !== 'granted') {
    console.debug('[Living Library] PostHog skipped (consent not granted)');
    return;
  }
  _initPromise = (async () => {
    const mod = await import('posthog-js');
    const posthog = mod.default;
    posthog.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://app.posthog.com',
      capture_pageview: false, // we use explicit emit() events
      capture_pageleave: false,
      autocapture: false, // explicit-only; no DOM-watching
      persistence: 'localStorage',
      person_profiles: 'identified_only',
    });
    _posthog = posthog;
    console.debug('[Living Library] PostHog initialized');
  })().catch((err) => {
    console.warn('[Living Library] PostHog init failed:', err);
  });
  return _initPromise;
}

/**
 * Boot-time installation: kick off the (no-op-when-empty) PostHog init and
 * subscribe to bridge.emit. Events are captured only after PostHog actually loads.
 */
export function initAnalytics(): void {
  void initIfReady();
  onLLEmit((event, payload) => {
    if (!_posthog) return; // pre-load / pre-consent / pre-DSN → drop (privacy first)
    _posthog.capture(event, normalizePayload(payload));
  });
}

function normalizePayload(payload: LLEventPayload): Record<string, unknown> {
  return payload && typeof payload === 'object' ? payload : {};
}
