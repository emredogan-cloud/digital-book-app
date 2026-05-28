import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emre.livinglibrary',
  appName: 'Living Library',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      // Bookshelf-themed default launch splash (SUB-PR 2.1).
      // Per-book splash *drawable* swap isn't supported at runtime in Capacitor;
      // book.splashBackgroundColor stays in src-shell/books.ts as metadata for a
      // future polish sub-PR. Status-bar tinting is fully per-book in native.ts.
      launchShowDuration: 600,
      launchAutoHide: true,
      backgroundColor: '#06070a',
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;
