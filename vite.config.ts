import { defineConfig } from 'vite';

/**
 * Scaffolding-only Vite config (SUB-PR 1.1).
 *
 * MOTOR LOCK GUARDRAIL:
 *   - root         = 'src-shell' → Vite sees only the shell sources, never www/.
 *   - outDir       = '../www/shell' → a NEW, dedicated subdir of www/. The build
 *                    can NEVER write to www/books/** or overwrite www/index.html.
 *   - emptyOutDir  = false → Vite never deletes anything in www/ during builds.
 *
 * The build is a single IIFE bundle (`shell.js`) so this stays a "library-style"
 * scaffold. The real shell UI lands in SUB-PR 1.2.
 */
export default defineConfig({
  root: 'src-shell',
  // .env lives at the repo root, one level up from the Vite root.
  envDir: '..',
  build: {
    outDir: '../www/shell',
    emptyOutDir: false,
    target: 'es2020',
    sourcemap: true,
    minify: false,
    lib: {
      entry: 'main.ts',
      formats: ['iife'],
      name: 'LLShell',
      fileName: () => 'shell.js',
    },
  },
});
