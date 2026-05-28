// Event-fires-once verification (SUB-PR 2.4).
// Run via `npm test` (tsx).
//
// Proves the bridge's emit fan-out has the invariants that downstream listeners
// (native.ts, analytics.ts, future sentry/posthog breadcrumb forwarders) rely on:
//   1. Each emit invokes each listener exactly once (no duplication).
//   2. Multiple independent listeners all fire per emit.
//   3. A throwing listener doesn't break the rest of the bus.
//   4. The unsubscribe function returned by onLLEmit actually stops dispatch.

import assert from 'node:assert/strict';

// Mock browser globals before installBridge() touches window.LL.
(globalThis as { window?: unknown }).window = globalThis;
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: () => null,
  setItem: () => {},
};

// Silence the bridge's own console.debug noise during the tests.
const ORIG_DEBUG = console.debug;
console.debug = () => {};

import { installBridge, onLLEmit } from '../src-shell/ll-bridge.js';

const tests: ReadonlyArray<readonly [string, () => void]> = [
  [
    'emit invokes each listener exactly once per call',
    () => {
      let count = 0;
      const off = onLLEmit(() => count++);
      const bridge = installBridge();
      bridge.emit('page_turn', { bookId: 'sarmasik', spread: 1 });
      bridge.emit('bookmark_add', { bookId: 'sarmasik', spread: 1 });
      bridge.emit('shelf_view');
      off();
      assert.equal(count, 3, 'expected one invocation per emit');
    },
  ],
  [
    'multiple listeners — each fires exactly once per emit',
    () => {
      let a = 0, b = 0, c = 0;
      const offA = onLLEmit(() => a++);
      const offB = onLLEmit(() => b++);
      const offC = onLLEmit(() => c++);
      const bridge = installBridge();
      bridge.emit('page_turn');
      bridge.emit('page_turn');
      offA(); offB(); offC();
      assert.equal(a, 2);
      assert.equal(b, 2);
      assert.equal(c, 2);
    },
  ],
  [
    'a throwing listener does not break the others',
    () => {
      let safeCount = 0;
      const offBad = onLLEmit(() => {
        throw new Error('intentional');
      });
      const offGood = onLLEmit(() => safeCount++);
      const bridge = installBridge();
      // Suppress expected console.warn output during this test
      const origWarn = console.warn;
      console.warn = () => {};
      try {
        bridge.emit('page_turn');
        bridge.emit('page_turn');
      } finally {
        console.warn = origWarn;
      }
      offBad(); offGood();
      assert.equal(safeCount, 2, 'safe listener should still see every emit');
    },
  ],
  [
    'unsubscribe stops further dispatch to that listener',
    () => {
      let count = 0;
      const off = onLLEmit(() => count++);
      const bridge = installBridge();
      bridge.emit('page_turn');
      off();
      bridge.emit('page_turn');
      bridge.emit('page_turn');
      assert.equal(count, 1, 'listener should not fire after unsubscribe');
    },
  ],
];

void (async () => {
  let pass = 0, fail = 0;
  for (const [name, fn] of tests) {
    try {
      fn();
      console.debug = ORIG_DEBUG; // restore briefly for the result line
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
