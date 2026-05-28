# Local Serve Workflow — Living Library

The app is **offline-first static content**. Serve the **`www/`** directory as the web root, then
open the bookshelf (`www/index.html`) which links to all 6 books under `www/books/<slug>/`.

## Option A — Python (no install needed)

```bash
python3 -m http.server 8080 --bind 127.0.0.1 --directory www
```
Then open <http://127.0.0.1:8080/> → the bookshelf.

## Option B — npx serve

```bash
npx serve www
```
Open the URL it prints (typically <http://localhost:3000>).

## Option C — npm script (wraps Option A)

```bash
npm run serve
```
Defined in `package.json` as `python3 -m http.server 8080 --bind 127.0.0.1 --directory www`.

## Books & direct URLs (served root = `www/`)

| # | slug | title | URL |
|---|---|---|---|
| 01 | `sarmasik` | Sarmaşık · Nazar | `/books/sarmasik/index.html` |
| 02 | `tuzun-hafizasi` | Tuzun Hafızası · Bir Kıyı Romanı | `/books/tuzun-hafizasi/index.html` |
| 03 | `mendiran-vakayinamesi` | Mendîran Vakayinâmesi | `/books/mendiran-vakayinamesi/index.html` |
| 04 | `mythologica` | Codex Mythologica | `/books/mythologica/index.html` |
| 05 | `solgun-kitabe` | Solgun Kitabe | `/books/solgun-kitabe/index.html` |
| 06 | `fabl` | Fabl · Küçük Masallar | `/books/fabl/index.html` |

The bookshelf links are **relative** (`books/<slug>/index.html`), so they also work when opening
`www/index.html` directly via `file://`.

## Notes

- Stop the server with **Ctrl-C**.
- **Do not edit anything under `www/books/**`** — that is the frozen reading engine (see each book's
  `MOTOR_LOCK.md` and `/CLAUDE.md`). New shell/bridge code belongs in `src-shell/` (Phase 1+).
