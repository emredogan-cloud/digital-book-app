/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sentry DSN; injected from repo-root `.env` at build time. Optional. */
  readonly VITE_SENTRY_DSN?: string;
  /** PostHog project API key; injected at build time. Optional. */
  readonly VITE_POSTHOG_KEY?: string;
  /** PostHog host; defaults to https://app.posthog.com when unset. */
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
