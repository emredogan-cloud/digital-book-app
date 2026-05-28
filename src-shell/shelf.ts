// Bookshelf UI renderer (SUB-PR 1.2).
//
// Builds the masthead, optional "Continue reading" hero, the cover grid, and
// the footer — purely from the BOOKS metadata. No book engine code is touched.
// CSS lives inline in www/index.html (zero external deps); this module just
// owns the DOM.

import { BOOKS, type BookMeta } from './books.js';
import { getLastOpenedSlug, type LLBridge } from './ll-bridge.js';

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
}

function buildMasthead(): HTMLElement {
  const el = document.createElement('header');
  el.innerHTML = `
    <p class="kicker">Living Library</p>
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
  sub.textContent = book.subtitle;

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
  img.alt = ''; // decorative — title text below provides the label
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
    <span>serve: <code>npm run serve</code></span>
  `;
  return el;
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
