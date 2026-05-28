/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sentry DSN; injected from repo-root `.env` at build time. Optional. */
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
