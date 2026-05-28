# AGENT-MEMORY — handover for future Claude agents

**What this is:** **SARMAŞIK**, a Turkish cinematic techno-myth / revenge trilogy. **Book I "NAZAR" is COMPLETE** (Prologue + 15 chapters) and ships as a static "dijital kodeks" web reader. Output language = **Turkish**.

**Read first, in order:** `SESSION-HANDOVER.md` (full session memory — what's done + what's next) → `CANON-LOCK.md` → `PROJECT-STATE.md` → `DEPLOY-STATE.md` → `reports/BOOK-I-CONSTITUTION-TR.md` (Book I governing doc) → `reports/NOVEL-BLUEPRINT-CINEMATIC-REVISION-TR.md` + `reports/DNA-REVISION-REPORT-TR.md` + `reports/FINAL-MINI-REVISION-REPORT-TR.md`.

## Workflow (proven, keep it)
Write in **phases** (~2 chapters each) → **MANDATORY 7-point QA** before continuing (continuity · chronology · contradiction · character-voice · emotional · prose · canon) → **commit + push** (Vercel). Clean cinematic Turkish, **not purple**. **Only fix objective issues; never cosmetic-rewrite.**

## How to add a chapter (engine schema)
1. Author into `content/chapter-NN.js`:
   `window.SARMASIK.entries.push({ id, title, subtitle, category, themes:[…], content:[…] });`
2. `category` ∈ {`esik`,`catlak`,`usul`,`kampanya`,`kaybolma`} (Book I). For Book II define new movements in `content/novel-data.js` (`categories[]` + `book` meta).
3. `content[]`: paragraph strings; scene break = `{ style:"hr" }`. (`{style:"quote"}` exists in book.js but data-shape unverified → avoid.) Dialogue uses `—`. In-prose quotes use **curly “ ” / ‘ ’** — **never a straight `"` inside a JS string** (it breaks the file; Turkish suffix apostrophes like `Kerem'in` are fine).
4. Add the new file's `<script src="content/chapter-NN.js">` to `index.html` **before** `content/finalize.js`.
5. Verify: `node --check content/chapter-NN.js`; then `python3 -m http.server` + confirm 200.

## DO NOT TOUCH
- `scripts/{app,book,storage}.js` (engine).
- `styles/cover.css` (**cross-book LOCK**; its md5 must match siblings).
- The gate element IDs/classes (`book3d__*`, `cover-gate`, `cover-open`) and its open/close behavior.
- `themes.css` theme **IDs** `tuzlu/kumlu/gece-deniz` (app.js depends on them) — their VALUES are NAZAR cyber-noir (ok to extend).
- `cover-physical.css` = NAZAR-only back-cover add-on (safe to tweak; it never overrides cover.css).

## UX rules (locked)
Cover gate = a closed VOLUME (front cover + back board + thickness + spine), textless open-invitation, opens on tap/click/Enter. **CSS-only** transitions; **no rAF / parallax / GPU abuse / CLS**; `prefers-reduced-motion` honored. No heavy animation/video. Keep it premium-restrained.

## KNOWN NON-BLOCKING ISSUES
1. **COVER TITLE MISMATCH (needs author action).** The provided `images/*.png` are AI cover *concepts* with **placeholder titles** — front (`Ana_kapak`) reads **"SPACE"**, back (`Yardımcı_1`) reads **"IVY"** — plus a **fictional author "Daniel Marlowe"** and a fake blurb. They are **NOT** "SARMAŞIK / NAZAR" and front≠back titles. Art is on-theme; **text must be regenerated** with the correct title/author before real publication. (Integrated as instructed; flag stands.) → **Replacement TEXT-FREE prompts now prepared in `FINAL-COVER-PROMPTS-TR.md` (3 front + 2 back, GPT Images 2.0).** Next: author generates → integrate (optimize → assets → in-engine title typography → verify → commit). See `SESSION-HANDOVER.md §5(A)`.
2. Back cover is currently a subtle **peeking back-board** (engine-safe), not a full flip/showcase. Full back-cover reveal = optional future enhancement.
3. **Vercel deploy unverifiable from the agent side** (MCP scope). A one-time GitHub→Vercel import may be needed. See DEPLOY-STATE.
4. **No headless browser here** → do the final pixel/animation check on a Vercel preview (desktop + mobile).
5. Extra `images/` auxiliaries (square/tall/landscape PNGs) = social/marketing/interior art (see `cover-prompts/`).

## BOOK II — "BOŞLUK" continuation guidance
- **Arc:** the void becomes the operator. SLOW, earned, costly transformation (never instant, never born-elite): survivor → counter-surveillance ghost → operator → strategic techno-war actor; every gain injury-bearing/fallible.
- **New elements:** **Bahri** (burned ex-operative mentor; cautionary mirror), **NÖBETÇİ** (Kerem *builds* it; non-sentient ops companion; **loneliness symptom, statistical dread, never sentient, can be poisoned**), **TİLKİ/Sıla** (young hacker ally), drones/negative-space tech (coherent near-future; **ceilings:** no sentient AI / armor / private army / magic).
- **Visibility curve:** invisible → denied (Book II); confirmed anomaly → national → geopolitical (Book III).
- **Vedat:** the hunt proper begins; he hunts in negative space (mirror); he will realize BOŞLUK is the man whose family he destroyed.
- **Pay off Book I threads:** Eylül's unopened message · Defne's hidden testimony (light path) · Kerem's complicity-knowledge (weapon + guilt) · the gap Vedat half-noticed.
- **Trilogy ending (locked direction):** B+C blend — chooses light/exposure, pays a cost, exposure only WOUNDS the system (category error: can't kill a system).

**Do NOT start Book II without explicit author instruction.**
