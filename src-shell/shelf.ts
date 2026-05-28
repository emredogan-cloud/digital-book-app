// Bookshelf UI renderer (SUB-PR 2.2 — adds progress badge + streak surface).
//
// Renders the masthead, optional "Continue reading" hero, the cover grid, and the footer
// purely from the BOOKS metadata + (new in 2.2) per-book progress read from the engine's
// own localStorage and the streak counter read from the StorageAdapter.
//
// No engine code touched (Motor LOCK): progress is read via the engine's known
// localStorage prefix (synchronous, cheap). Streak fetch is async, fire-and-forget.

import { BOOKS, type BookMeta } from './books.js';
import { getLastOpenedSlug, type LLBridge } from './ll-bridge.js';
import { getStorage, readEngineProgress } from './storage/index.js';
import { getStreak } from './streak.js';
import { getAnalyticsConsent, setAnalyticsConsent } from './analytics.js';

export function renderShelf(root: HTMLElement, bridge: LLBridge): void {
  root.setAttribute('aria-busy', 'false');
  root.replaceChildren(); // remove <noscript> fallback content

  root.appendChild(buildMasthead());

  const lastSlug = getLastOpenedSlug();
  const lastBook = lastSlug ? bridge.getBookMeta(lastSlug) : undefined;
  if (lastBook) {
    root.appendChild(buildHero(lastBook, bridge));
  }

  const sectionTitle = document.createElement('p');
  sectionTitle.className = 'section-title';
  sectionTitle.textContent = lastBook ? 'Tüm Kitaplar' : 'Kitaplar';
  root.appendChild(sectionTitle);

  const grid = document.createElement('section');
  grid.className = 'shelf';
  grid.setAttribute('aria-label', 'Kitaplar');
  BOOKS.forEach((book, i) => grid.appendChild(buildCard(book, i, bridge)));
  root.appendChild(grid);

  root.appendChild(buildFooter());

  revealCards(grid);

  // Streak surface — async, non-blocking; silently no-ops on failure.
  void surfaceStreak(root);
}

function buildMasthead(): HTMLElement {
  const el = document.createElement('header');
  el.innerHTML = `
    <p class="kicker">Living Library <span class="streak" data-streak hidden></span></p>
    <h1 class="wordmark">Yaşayan Kütüphane</h1>
    <p class="lede">Atmosferik, el işçiliğiyle tasarlanmış kitapların çevrimdışı koleksiyonu. Başlamak için bir kitap seçin.</p>
    <div class="rule"></div>
  `;
  return el;
}

function buildHero(book: BookMeta, bridge: LLBridge): HTMLElement {
  const el = document.createElement('section');
  el.className = 'hero';
  el.style.setProperty('--accent', book.accent);

  const cover = document.createElement('div');
  cover.className = 'hero-cover';
  cover.setAttribute('role', 'presentation');
  cover.setAttribute('aria-hidden', 'true');
  cover.style.backgroundImage = `url("books/${book.slug}/${book.cover}")`;
  el.appendChild(cover);

  const body = document.createElement('div');
  body.className = 'hero-body';

  const kicker = document.createElement('p');
  kicker.className = 'hero-kicker';
  kicker.textContent = book.lang === 'en' ? 'Continue reading' : 'Okumaya devam et';

  const title = document.createElement('h2');
  title.className = 'hero-title';
  title.textContent = book.title;

  const sub = document.createElement('p');
  sub.className = 'hero-sub';
  const progress = readEngineProgress(book.localStoragePrefix);
  sub.textContent = progress.spreadIndex
    ? `${book.subtitle} · ${book.lang === 'en' ? 'page' : 'sayfa'} ${progress.spreadIndex}`
    : book.subtitle;

  const btn = document.createElement('button');
  btn.className = 'hero-go';
  btn.type = 'button';
  btn.innerHTML = `${book.lang === 'en' ? 'Continue' : 'Devam et'} <span aria-hidden="true">→</span>`;
  btn.addEventListener('click', () => bridge.openBook(book.slug));

  body.append(kicker, title, sub, btn);
  el.appendChild(body);
  return el;
}

function buildCard(book: BookMeta, index: number, bridge: LLBridge): HTMLAnchorElement {
  const a = document.createElement('a');
  a.className = 'book';
  a.href = `books/${book.slug}/index.html`;
  a.style.setProperty('--accent', book.accent);
  a.setAttribute('aria-label', `${book.title} · ${book.subtitle}`);
  if (book.lang === 'en') a.lang = 'en';

  const img = document.createElement('img');
  img.className = 'cover';
  img.alt = '';
  img.loading = index < 3 ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.src = `books/${book.slug}/${book.cover}`;
  a.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.setAttribute('aria-hidden', 'true');
  a.appendChild(overlay);

  const meta = document.createElement('div');
  meta.className = 'book-meta';

  // Per-book progress badge (NEW in SUB-PR 2.2). Shown only when the engine has
  // recorded a non-zero spread index. Read synchronously from localStorage.
  const progress = readEngineProgress(book.localStoragePrefix);
  if (progress.spreadIndex !== null) {
    const badge = document.createElement('span');
    badge.className = 'progress-badge';
    badge.textContent = `${book.lang === 'en' ? 'page' : 'sayfa'} ${progress.spreadIndex}`;
    badge.title = book.lang === 'en' ? 'You have saved progress' : 'Kayıtlı ilerlemeniz var';
    meta.appendChild(badge);
  }

  const idx = document.createElement('span');
  idx.className = 'idx';
  idx.textContent = String(index + 1).padStart(2, '0');

  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const sub = document.createElement('p');
  sub.className = 'sub';
  sub.textContent = book.subtitle;

  const go = document.createElement('span');
  go.className = 'go';
  const cta = document.createTextNode(`${book.cta} `);
  const arrow = document.createElement('span');
  arrow.className = 'arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  go.append(cta, arrow);

  meta.append(idx, h3, sub, go);
  a.appendChild(meta);

  a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // honor open-in-new-tab
    e.preventDefault();
    bridge.openBook(book.slug);
  });
  return a;
}

function buildFooter(): HTMLElement {
  const el = document.createElement('footer');
  el.innerHTML = `
    <span>${BOOKS.length} kitap · çevrimdışı · sıfır bağımlılık</span>
    <span class="footer-actions">
      <button type="button" class="footer-consent" data-consent-toggle></button>
    </span>
  `;
  wireConsentToggle(el);
  return el;
}

/**
 * Tiny, unobtrusive consent toggle in the footer (SUB-PR 2.4).
 * Default state is "unknown" — read as OFF; the user opts in/out with a single tap.
 * Persisted via setAnalyticsConsent → localStorage at `ll:analytics:consent`.
 */
function wireConsentToggle(footer: HTMLElement): void {
  const btn = footer.querySelector<HTMLButtonElement>('[data-consent-toggle]');
  if (!btn) return;
  const refresh = (): void => {
    const state = getAnalyticsConsent();
    const isOn = state === 'granted';
    btn.textContent = isOn ? '📊 Analiz: Açık' : '📊 Analiz: Kapalı';
    btn.title = isOn
      ? 'Anonim kullanım analitiği etkin. Tıklayarak kapatabilirsiniz.'
      : 'Anonim kullanım analitiği kapalı. Tıklayarak açabilirsiniz.';
    btn.dataset.state = state;
    btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  };
  refresh();
  btn.addEventListener('click', () => {
    setAnalyticsConsent(getAnalyticsConsent() !== 'granted');
    refresh();
  });
}

function revealCards(grid: HTMLElement): void {
  const cards = grid.querySelectorAll<HTMLElement>('.book');
  const motionOK =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: no-preference)').matches
      : true;
  if (motionOK) {
    cards.forEach((c, i) => window.setTimeout(() => c.classList.add('reveal'), 55 * i));
  } else {
    cards.forEach((c) => c.classList.add('reveal'));
  }
}

async function surfaceStreak(root: HTMLElement): Promise<void> {
  try {
    const adapter = await getStorage();
    const streak = await getStreak(adapter);
    if (streak.current <= 0) return;
    const el = root.querySelector<HTMLElement>('[data-streak]');
    if (!el) return;
    el.textContent = `🔥 ${streak.current} gün`;
    el.title = `En uzun: ${streak.longest} gün`;
    el.hidden = false;
    el.style.marginLeft = '0.6em';
  } catch {
    /* non-critical */
  }
}
