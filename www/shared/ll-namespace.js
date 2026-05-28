/**
 * Living Library — window.LL namespace reservation
 * SUB-PR 0.1 (Phase 0). No logic yet.
 *
 * The real bridge (emit / isUnlocked / openBook) is implemented in src-shell/
 * during Phase 1+ and emitted into this shared layer. The namespace is reserved
 * here so the frozen book engine (Zone A) and the shell (Zone B) agree on one
 * global contract: window.LL.
 */
(function reserveLLNamespace(global) {
  "use strict";
  // Idempotent reservation — defines the namespace object without behavior.
  global.LL = global.LL || {};
})(typeof window !== "undefined" ? window : globalThis);
