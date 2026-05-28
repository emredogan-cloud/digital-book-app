# RUN.md — Living Library · Local Run & Phase-0 Smoke Test

How to run the consolidated app locally, plus a **per-book manual smoke checklist** to confirm the
frozen reading engine works for all 6 books from the served `www/` root.

## 1. Serve locally

```bash
# from the repo root (digital-book-app/)
python3 -m http.server 8080 --bind 127.0.0.1 --directory www
#   or:  npx serve www
#   or:  npm run serve
```

Open **<http://127.0.0.1:8080/>** → the bookshelf. Click a book, or go direct:

| # | Book | URL |
|---|------|-----|
| 01 | Sarmaşık · Nazar | `/books/sarmasik/index.html` |
| 02 | Tuzun Hafızası · Bir Kıyı Romanı | `/books/tuzun-hafizasi/index.html` |
| 03 | Mendîran Vakayinâmesi | `/books/mendiran-vakayinamesi/index.html` |
| 04 | Codex Mythologica | `/books/mythologica/index.html` |
| 05 | Solgun Kitabe | `/books/solgun-kitabe/index.html` |
| 06 | Fabl · Küçük Masallar | `/books/fabl/index.html` |

> Stop with **Ctrl-C**. Use a real browser (Chrome/Firefox) for the checks below — the 3D page-turn,
> bookmarks, and resume need a live DOM. Prefer the **served** URL over `file://` (some engine paths
> assume a served root).

## 2. Automated pre-checks (already passing — details in `sub-pr-report/SUBPR_0.4_REPORT.md`)

- ✅ **JS syntax:** 132/132 book JS files parse (`node --check`).
- ✅ **Asset paths:** every local `src`/`href` in all 6 `index.html` resolves **200** over the served root (no 404s).
- ✅ **Bookshelf:** `/` and all 6 book links resolve **200**.
- ⚠️ **Fonts:** each book loads **Google Fonts** (3 external refs). First load needs network; **offline**, typography falls back to system fonts (content still reads). → self-host fonts in a later phase for full offline fidelity.

## 3. What each check means

| Check | How to test | Expected result |
|---|---|---|
| **Open** | Load the book URL | Loads cleanly, no console errors |
| **Cover-gate** | Tap/click the cover to enter | 3D cover opens → enters the reader |
| **Paginate** | Look at the body text | Text measured into discrete pages (not one long scroll) |
| **Page-turn** | Next **and** previous (swipe/tap/arrows) | Cinematic 3D turn animates both ways |
| **TOC** | Open the table of contents | Chapters listed; tapping one jumps there |
| **Theme switch** | Toggle theme/appearance | Palette changes; text stays legible |
| **Font scale** | Increase/decrease text size | Text rescales; pages re-measure cleanly |
| **Bookmark** | Add a bookmark ("İz"), reopen list | Bookmark saved and listed |
| **Reload-resume** | Note page, press F5 | Returns to same position + settings (progress persisted) |

## 4. Per-book checklist (tick as you go)

### 01 · Sarmaşık — `/books/sarmasik/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

### 02 · Tuzun Hafızası — `/books/tuzun-hafizasi/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

### 03 · Mendîran Vakayinâmesi — `/books/mendiran-vakayinamesi/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

### 04 · Codex Mythologica — `/books/mythologica/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

### 05 · Solgun Kitabe — `/books/solgun-kitabe/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

### 06 · Fabl — `/books/fabl/index.html`
- [ ] Open · [ ] Cover-gate · [ ] Paginate · [ ] Page-turn · [ ] TOC
- [ ] Theme switch · [ ] Font scale · [ ] Bookmark · [ ] Reload-resume
- Notes: ________________________________________________

## 5. Offline check (do once)

1. Load a book over the served URL (so anything cacheable caches).
2. Turn on airplane mode / stop the network.
3. Reload the book.

- [ ] Book still opens and reads (typography may fall back to system fonts — see §2).

## 6. Pass / fail summary

| Book | Result | Notes |
|------|--------|-------|
| Sarmaşık | ☐ pass ☐ fail | |
| Tuzun Hafızası | ☐ pass ☐ fail | |
| Mendîran Vakayinâmesi | ☐ pass ☐ fail | |
| Codex Mythologica | ☐ pass ☐ fail | |
| Solgun Kitabe | ☐ pass ☐ fail | |
| Fabl | ☐ pass ☐ fail | |

> **Do not edit anything under `www/books/**`** — frozen engine (see each book's `MOTOR_LOCK.md` and `CLAUDE.md`).
