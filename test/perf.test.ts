// Performance budget verification (SUB-PR 2.4).
// Roadmap §2.2/2.4 budget: "instrumentation adds < 1 ms to a page turn and is
// batched off the critical path."
//
// We measure bridge.emit dispatch time end-to-end (including the listener fan-out)
// across 20,000 calls with 3 active listeners — production has roughly that many
// (native, analytics, optional sentry breadcrumb forwarder). Console.debug is
// muted during measurement so we time the dispatch path, not stdout writes.

import assert from 'node:assert/strict';

(globalThis as { window?: unknown }).window = globalThis;
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: () => null,
  setItem: () => {},
};

const ORIG_DEBUG = console.debug;
const ORIG_WARN = console.warn;

import { installBridge, onLLEmit } from '../src-shell/ll-bridge.js';

void (async () => {
  console.debug = () => {};
  console.warn = () => {};
  try {
    const bridge = installBridge();
    const offs = [onLLEmit(() => {}), onLLEmit(() => {}), onLLEmit(() => {})];

    // warm-up
    for (let i = 0; i < 2000; i++) {
      bridge.emit('page_turn', { bookId: 'sarmasik', spread: i });
    }

    const N = 20000;
    const t0 = performance.now();
    for (let i = 0; i < N; i++) {
      bridge.emit('page_turn', { bookId: 'sarmasik', spread: i });
    }
    const elapsed = performance.now() - t0;
    const perEmitMs = elapsed / N;
    const perEmitUs = perEmitMs * 1000;

    offs.forEach((off) => off());

    console.debug = ORIG_DEBUG;
    console.warn = ORIG_WARN;

    console.log(`  ${N.toLocaleString()} emits × 3 listeners`);
    console.log(`  total : ${elapsed.toFixed(2)} ms`);
    console.log(`  avg   : ${perEmitUs.toFixed(2)} μs/emit (${perEmitMs.toFixed(5)} ms)`);

    assert.ok(
      perEmitMs < 1,
      `bridge.emit dispatch must be < 1 ms; measured ${perEmitMs.toFixed(5)} ms`,
    );

    const headroom = 1 / perEmitMs;
    console.log(`  ✓ within budget — ~${Math.round(headroom)}× headroom under 1 ms`);
  } catch (e) {
    console.debug = ORIG_DEBUG;
    console.warn = ORIG_WARN;
    console.log(`  ✗ ${(e as Error).message}`);
    process.exit(1);
  }
})();
