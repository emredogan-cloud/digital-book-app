var LLShell = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	//#region src-shell/main.ts
	var SHELL_BUILD = "0.0.0-scaffold";
	if (typeof window !== "undefined") window.__LL_SHELL__ = { build: SHELL_BUILD };
	console.debug("[Living Library] shell build", SHELL_BUILD);
	//#endregion
	exports.SHELL_BUILD = SHELL_BUILD;
	return exports;
})({});

//# sourceMappingURL=shell.js.map