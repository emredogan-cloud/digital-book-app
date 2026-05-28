// Analytics consent gate verification (SUB-PR 2.4).
// Proves:
//   1. Default consent is "unknown" (privacy-first; no events leave the device).
//   2. setAnalyticsConsent(true) persists "granted" and is read-after-write.
//   3. setAnalyticsConsent(false) persists "denied" and is read-after-write.
//   4. Consent flips correctly when toggled repeatedly.

import assert from 'node:assert/strict';

// Mock window + localStorage; track stored values for assertions.
const lsData = new Map<string, string>();
(globalThis as { window?: unknown }).window = globalThis;
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => lsData.get(k) ?? null,
  setItem: (k: string, v: string) => {
    lsData.set(k, v);
  },
};

// Silence the consent module's debug logs during the run.
const ORIG_DEBUG = console.debug;
console.debug = () => {};

import { getAnalyticsConsent, setAnalyticsConsent } from '../src-shell/analytics.js';

const CONSENT_KEY = 'll:analytics:consent';

const tests: ReadonlyArray<readonly [string, () => void]> = [
  [
    'default consent is "unknown" (no PostHog init, no events leave the device)',
    () => {
      lsData.clear();
      assert.equal(getAnalyticsConsent(), 'unknown');
    },
  ],
  [
    'setAnalyticsConsent(true) persists "granted"',
    () => {
      lsData.clear();
      setAnalyticsConsent(true);
      assert.equal(lsData.get(CONSENT_KEY), 'granted');
      assert.equal(getAnalyticsConsent(), 'granted');
    },
  ],
  [
    'setAnalyticsConsent(false) persists "denied"',
    () => {
      lsData.clear();
      setAnalyticsConsent(false);
      assert.equal(lsData.get(CONSENT_KEY), 'denied');
      assert.equal(getAnalyticsConsent(), 'denied');
    },
  ],
  [
    'consent toggles cleanly between granted / denied',
    () => {
      lsData.clear();
      setAnalyticsConsent(true);
      assert.equal(getAnalyticsConsent(), 'granted');
      setAnalyticsConsent(false);
      assert.equal(getAnalyticsConsent(), 'denied');
      setAnalyticsConsent(true);
      assert.equal(getAnalyticsConsent(), 'granted');
    },
  ],
  [
    'corrupt/unknown stored value falls back to "unknown" (defensive)',
    () => {
      lsData.clear();
      lsData.set(CONSENT_KEY, 'definitelyNotAValidState');
      assert.equal(getAnalyticsConsent(), 'unknown');
    },
  ],
];

void (async () => {
  let pass = 0, fail = 0;
  for (const [name, fn] of tests) {
    try {
      fn();
      console.debug = ORIG_DEBUG;
      console.log(`  ✓ ${name}`);
      console.debug = () => {};
      pass++;
    } catch (e) {
      console.debug = ORIG_DEBUG;
      console.log(`  ✗ ${name}`);
      console.log(`     ${(e as Error).message}`);
      console.debug = () => {};
      fail++;
    }
  }
  console.debug = ORIG_DEBUG;
  console.log(`\n  ${pass}/${tests.length} passed${fail ? ` · ${fail} FAILED` : ''}`);
  if (fail) process.exit(1);
})();
