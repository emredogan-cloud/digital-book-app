// Per-book metadata table — the shell's single source of truth.
// Drives the shelf renderer (1.2), native plugins (2.1), and the localStorage→SQLite
// migration (2.2). The `localStoragePrefix` was discovered by READ-ONLY inspection of
// each book's scripts/storage.js — Motor LOCK preserved (engine code untouched).

export interface BookMeta {
  /** URL-safe slug; matches the `www/books/<slug>/` directory name. */
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly tagline: string;
  /** BCP-47-ish content language; drives `lang=` on the card + CTA copy. */
  readonly lang: 'tr' | 'en';
  /** Shelf accent (curated from each book's own CSS variables). */
  readonly accent: string;
  /** The book's own `<meta theme-color>` — the StatusBar/Splash bg in Phase 2. */
  readonly themeColor: string;
  /** Capacitor StatusBar text/icon style for this book. */
  readonly statusBarStyle: 'light' | 'dark';
  /** Capacitor SplashScreen background color when this book opens. */
  readonly splashBackgroundColor: string;
  /** CTA verb shown on the card ("Oku" / "Read"). */
  readonly cta: string;
  /** Cover image path relative to `/books/<slug>/`. The book engine ships it. */
  readonly cover: string;
  /**
   * The localStorage key prefix the engine itself writes to — NOT always the slug:
   * `sarmasik` keeps the original `intikam-yemini:v1:` prefix; `mythologica` keeps
   * `codex-mythologica:v1:`. Discovered by READ-ONLY inspection of
   * `www/books/<slug>/scripts/storage.js` (SUB-PR 2.2). Used by the migration to
   * mirror engine state into SQLite without touching the frozen engine.
   */
  readonly localStoragePrefix: string;
}

export const BOOKS: readonly BookMeta[] = [
  {
    slug: 'sarmasik',
    title: 'Sarmaşık',
    subtitle: 'Nazar',
    tagline:
      'Sistemlere inanan bir yazılımcı, her şeyi gören bir gözetim devletinin göremediği boşluğa dönüşür.',
    lang: 'tr',
    accent: '#4fbcce',
    themeColor: '#05080c',
    statusBarStyle: 'light',
    splashBackgroundColor: '#05080c',
    cta: 'Oku',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'intikam-yemini:v1:',
  },
  {
    slug: 'tuzun-hafizasi',
    title: 'Tuzun Hafızası',
    subtitle: 'Bir Kıyı Romanı',
    tagline:
      'Bir kıyı kasabasında tuza karışmış hatıralar ve silinmiş bir kız kardeşin yası.',
    lang: 'tr',
    accent: '#c2703f',
    themeColor: '#0a1418',
    statusBarStyle: 'light',
    splashBackgroundColor: '#0a1418',
    cta: 'Oku',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'tuzun-hafizasi:v1:',
  },
  {
    slug: 'mendiran-vakayinamesi',
    title: 'Mendîran Vakayinâmesi',
    subtitle: "Yedinci And'ın Çatladığı Diyar",
    tagline:
      "Yedinci And'ın çatladığı diyarın kitabesi — tarih, hâneler ve sîmâlarla örülü karanlık bir fantazi evreni.",
    lang: 'tr',
    accent: '#a64a44',
    themeColor: '#0a0708',
    statusBarStyle: 'light',
    splashBackgroundColor: '#0a0708',
    cta: 'Oku',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'mendiran-vakayinamesi:v1:',
  },
  {
    slug: 'mythologica',
    title: 'Codex Mythologica',
    subtitle: 'An Illuminated Archive of the Ancient World',
    tagline:
      'An interactive illuminated manuscript of world mythology — twenty-six tales from Greek, Egyptian, Norse, Japanese and other traditions.',
    lang: 'en',
    accent: '#c9a24b',
    themeColor: '#0c0807',
    statusBarStyle: 'light',
    splashBackgroundColor: '#0c0807',
    cta: 'Read',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'codex-mythologica:v1:',
  },
  {
    slug: 'solgun-kitabe',
    title: 'Solgun Kitabe',
    subtitle: 'Çöken İmparatorluğun Yasak Arşivi',
    tagline:
      "Çöken Varân İmparatorluğu'nun yasak arşivi — mahlûkât, tarîkât, emanetler ve vakâyiname.",
    lang: 'tr',
    accent: '#9a7fc0',
    themeColor: '#06040a',
    statusBarStyle: 'light',
    splashBackgroundColor: '#06040a',
    cta: 'Oku',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'solgun-kitabe:v1:',
  },
  {
    slug: 'fabl',
    title: 'Fabl',
    subtitle: 'Küçük Masallar',
    tagline: 'Bağımsız okunabilen kısa fabller — küçük, sakin ve hafif şiirsel hikâyeler.',
    lang: 'tr',
    accent: '#6fae9a',
    themeColor: '#0e161d',
    statusBarStyle: 'light',
    splashBackgroundColor: '#0e161d',
    cta: 'Oku',
    cover: 'assets/cover.jpg',
    localStoragePrefix: 'fabl:v1:',
  },
] as const;

export function findBook(slug: string): BookMeta | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
