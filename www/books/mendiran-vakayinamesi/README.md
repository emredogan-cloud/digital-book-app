<div align="center">

# Mendîran Vakayinâmesi

**An interactive, illuminated-manuscript reader engineered as a single-page web codex.**

*A dependency-free book engine — exponential-then-binary pagination, adaptive performance modes, Web Audio drone, programmatic SVG, and full offline persistence — wrapped in a hand-typeset dark-fantasy edition.*

[![Static Site](https://img.shields.io/badge/Type-Static_SPA-0a0708?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_JS_•_CSS_•_HTML5-a8842c?style=flat-square)](#)
[![Dependencies](https://img.shields.io/badge/Runtime_Deps-0-2a4a32?style=flat-square)](#)
[![Build](https://img.shields.io/badge/Build_Step-None-5a3a10?style=flat-square)](#)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-A11y_•_Perf_•_BP-1c2a48?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-Source_MIT_•_Content_All_Rights_Reserved-5c1e15?style=flat-square)](#license)

</div>

---

## Overview

**Mendîran Vakayinâmesi** is a production-grade interactive book delivered as a single static site. It looks like a literary side-project — and the prose, atlas, and typography are real — but the engineering interest is in the **rendering engine** that makes it run: a zero-dependency client renderer that paginates a 38,500-word narrative into spread-aware pages at runtime, on any device, with no server, no build step, and no third-party JavaScript.

The project is part of my engineering portfolio. It demonstrates concerns I care about in larger systems: **adaptive runtime behavior, deterministic layout under variable input, accessibility budgets that survive feature growth, and shipping polished UX without leaning on a framework**.

> *Yedi yüz yıllık bir yeminin çatladığı gece üç ölü saymadılar.*
> *Sekiz kişi, kendi yarasıyla bir araya gelir.*

---

## Engineering Highlights

| Concern | What's implemented |
| --- | --- |
| **Pagination** | Exponential-probe + binary-search chunked layout with orphan/widow guards; sentence-level reflow for oversize paragraphs. |
| **Adaptive performance** | `data-perf="rich\|lite"` resolved **before first paint** from `hardwareConcurrency`, `deviceMemory`, pointer coarseness, viewport, and `prefers-reduced-motion`. Lite mode disables 3D flips, backdrop-filter, and continuous ambient drift. |
| **Audio** | Web Audio API drone: 4 oscillators (49/65/98/196 Hz) plus 0.13 Hz LFO, lazy-initialized on first gesture. **No audio assets shipped.** |
| **Print / PDF** | Browser-native `window.print()` against a print-only DOM mount with `@page` rules. No PDF library; works offline. |
| **Persistence** | Versioned `localStorage` namespace (`mendiran-vakayinamesi:v1:*`) for reading position, bookmarks, theme, and type scale. |
| **Accessibility** | Full keyboard navigation, ARIA roles on every interactive surface, `prefers-reduced-motion` honored, WCAG AA contrast on the default theme, 5-step user type scale (0.92× → 1.36×). |
| **Asset budget** | ~610 KB total payload, zero runtime dependencies, all imagery is inline SVG (atlas, sigils, crests, covers). |
| **Build** | None. The browser is the build target. |

---

## Architecture

The codebase is split into three deliberate layers. Each layer talks to the next through a single explicit contract — the `window.MENDIRAN` namespace — which is the only global state in the application.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Layer 3 — Engine & Orchestration                                    │
│  ┌──────────┐  ┌─────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ app.js   │  │ book.js │  │ storage.js   │  │ pdf-export.js    │   │
│  │ chrome,  │  │ paginator│ │ localStorage │  │ print mount      │   │
│  │ keyboard,│  │ + spread │ │ wrapper      │  │ + @page rules    │   │
│  │ swipe,   │  │ engine   │ │              │  │                  │   │
│  │ audio,   │  │          │ │              │  │                  │   │
│  │ showcase │  │          │ │              │  │                  │   │
│  └──────────┘  └─────────┘  └──────────────┘  └──────────────────┘   │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │  reads window.MENDIRAN.stories[]
┌──────────────────────────────────▼───────────────────────────────────┐
│  Layer 2 — Adapter                                                   │
│  content-adapter.js                                                  │
│  Normalizes 11 heterogeneous data shapes into one contract:          │
│    { id, title, civilization, content: Paragraph[] }                 │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│  Layer 1 — Content (raw data, inert)                                 │
│  data-dunya · data-zaman · data-hizipler · data-karakterler          │
│  data-buyu  · data-hikaye · data-aralar   · data-ekler               │
│  data-harita · data-kapak · data-folyolar                            │
└──────────────────────────────────────────────────────────────────────┘
```

### Pagination algorithm

Each chapter is converted to a flat sequence of typed paragraphs and then walked by `BookEngine._paginate()`:

1. **Exponential probe (1 → 2 → 4 → 8 …)** measures the widest range that still fits the page frame.
2. **Binary search** between the last-fitting and first-overflowing chunk converges to the precise cut.
3. **Orphan guard** never lets a `section`, `scene`, or `heading` paragraph end a page if the next page is non-empty.
4. **Oversize fallback** — when a single paragraph exceeds the frame, it is split at sentence boundaries (`[.!?…]+`) and re-measured.

Measurement runs against a hidden off-screen frame that mirrors the live page geometry, so layout decisions stay consistent across themes, type scales, and viewport changes. Long builds yield to `requestIdleCallback` between chapters to keep the loader responsive.

### Paragraph contract

The engine recognizes eight typed paragraph shapes — print and screen renderers share this contract:

| Type        | Form                                                          | Role                     |
| ----------- | ------------------------------------------------------------- | ------------------------ |
| `string`    | `"plain text"`                                                | Body paragraph           |
| `quote`     | `{ style: "quote", text }`                                    | Italic block quote       |
| `hr`        | `{ style: "hr" }`                                             | `✦ ✦ ✦` separator        |
| `heading`   | `{ style: "heading", text }`                                  | Inline subhead           |
| `section`   | `{ style: "section", title, eyebrow? }`                       | Major break              |
| `scene`     | `{ style: "scene", title, place?, time? }`                    | Narrative scene break    |
| `list`      | `{ style: "list", items: [...] }`                             | Bulleted list            |
| `raw`       | `{ style: "raw", html }`                                      | Trusted pre-rendered HTML|

---

## Tech Stack

- **Runtime:** Vanilla ES2018+ JavaScript, modern CSS (custom properties, grid, container-aware media queries), HTML5.
- **APIs:** Web Audio, `localStorage`, `requestIdleCallback`, `matchMedia`, Fullscreen, Print, Pointer / Touch events.
- **Graphics:** 100% inline SVG (atlas, crests, sigils, four cover variants, wax seal, archive stamp, favicon).
- **Typography:** Cinzel, Cormorant Garamond, EB Garamond, UnifrakturMaguntia (Google Fonts, preconnected).
- **Tooling:** None at runtime. Any static file server works for local development.
- **Hosting target:** Any static origin — GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3 + CloudFront, or a single nginx vhost.

---

## Features

- **Spread reader** — true left/right page binding with curl shadow, ribbon bookmark, and folio numbering in Roman numerals.
- **Three themes** — `gece` (candlelit umber), `parsomen` (daylight vellum), `kul` (cold ash). Persisted per user.
- **Adaptive performance mode** — auto-detected on boot, manually toggleable. Lite mode crossfades pages; Rich mode does 3D rotation with ambient drift.
- **Showcase mode** — auto-advancing curated tour across 8 key spreads; designed for portfolio demos and recruiter walkthroughs.
- **Ambient drone** — Web Audio synthesis, no shipped audio files; respects autoplay rules (starts on user gesture).
- **PDF export** — full A4 print layout via `@page` rules, available through the browser's "Save as PDF".
- **Bookmarks** — versioned `localStorage`, with timestamped labels, ordered by reading position.
- **Search & filter TOC** — typeahead search over chapter titles, subtitles, civilization, and themes.
- **Touch & keyboard parity** — every action reachable via keyboard, edge tap regions, and horizontal swipe.
- **Reduced-motion aware** — `prefers-reduced-motion` collapses every transition.

### Keyboard map

| Key            | Action                                       |
| -------------- | -------------------------------------------- |
| `← / →`        | Page back / forward                          |
| `Space / PgDn` | Forward                                      |
| `PgUp`         | Back                                         |
| `Home / End`   | First spread / last spread                   |
| `T`            | Open table of contents                       |
| `B`            | Toggle bookmark on the current spread        |
| `M`            | Open bookmarks drawer                        |
| `V`            | Cycle themes                                 |
| `A`            | Cycle 5-step typography scale                |
| `F`            | Fullscreen                                   |
| `X`            | Toggle Rich ↔ Lite performance mode          |
| `S`            | Toggle ambient drone                         |
| `W`            | Toggle showcase mode                         |
| `P`            | Export to PDF                                |
| `Esc`          | Close drawer or exit fullscreen              |

---

## Project Structure

```
mendiran-vakayinamesi/
├── index.html                  # SPA shell · loader · chrome · stage · drawers
├── .gitignore
├── README.md
│
├── styles/
│   ├── themes.css              # Palette tokens for gece / parsomen / kul
│   ├── main.css                # Layout · spreads · covers · drawers · showcase
│   └── animations.css          # Page flip · ambient drift · loader sigil
│
└── scripts/
    ├── data-dunya.js           # Geography · cosmology · languages · faiths
    ├── data-zaman.js           # Seven-strata chronology
    ├── data-hizipler.js        # Houses · minor houses · alliances
    ├── data-karakterler.js     # Principals · supporting cast
    ├── data-buyu.js            # Magic system (Külbağ)
    ├── data-hikaye.js          # 22 chapters of narrative prose
    ├── data-aralar.js          # 20 interstitial documents
    ├── data-ekler.js           # Glossary · calendar · weights · footnotes
    ├── data-harita.js          # Illuminated SVG atlas
    ├── data-kapak.js           # Four cover variants + wax seal + stamp
    ├── data-folyolar.js        # 22 pull-quotes · 8 character folios · 6 world folios
    │
    ├── content-adapter.js      # Normalizes raw data into MENDIRAN.stories[]
    ├── storage.js              # Versioned localStorage wrapper
    ├── book.js                 # Pagination + spread engine
    ├── pdf-export.js           # Print-DOM compositor + @page rules
    └── app.js                  # Chrome · keyboard · swipe · audio · showcase
```

---

## Local Development

The project ships with no build step. Any static file server works; here are two reliable options.

```bash
# Option 1 — Python (no install needed on most systems)
python3 -m http.server 8080

# Option 2 — Node
npx serve -l 8080 .

# Then open
open http://localhost:8080
```

> Opening `index.html` directly via `file://` works, but Safari and some Chromium variants restrict `localStorage` under that scheme — your bookmarks and reading position will not persist. Prefer a local server.

There are no environment variables, no secrets, and no external services to configure.

---

## Deployment

The site is a flat directory of static assets. Any of the following deploy paths works without modification:

| Target              | Configuration                                                                 |
| ------------------- | ----------------------------------------------------------------------------- |
| **GitHub Pages**    | Push to `main`, enable Pages from repo settings → root of `main`.             |
| **Cloudflare Pages**| Connect repo · build command: *(none)* · output directory: `/`.               |
| **Netlify**         | Drag-drop the folder, or connect repo with empty build and publish dir `.`.   |
| **Vercel**          | Import the repo, framework preset: *Other*, output: project root.             |
| **S3 + CloudFront** | `aws s3 sync . s3://<bucket> --exclude ".git/*"`; CF distribution with OAC.   |
| **Self-host**       | `nginx`/`caddy` serving the directory; gzip/brotli recommended.               |

Recommended cache policy: long-lived (`max-age=31536000, immutable`) for `/scripts/*` and `/styles/*`; short-lived (`max-age=300, must-revalidate`) for `index.html`.

---

## Performance

- **First paint** is unblocked by the runtime — the `data-perf` decision runs inline in `<head>` before stylesheet evaluation, so the first frame is always rendered in the correct performance tier.
- **Lite mode** keeps interaction at 60 fps on low-end mobile by replacing 3D page flip with opacity crossfade and disabling `backdrop-filter`, ambient drift, and `feTurbulence`.
- **Idle yielding** — page building yields with `requestIdleCallback` between every 4 chapters so the loader stays responsive on slow CPUs.
- **Asset budget** — three CSS files, sixteen JS files, one HTML shell. Largest single file is the narrative (`data-hikaye.js`, ~170 KB).
- **No JavaScript frameworks**, no polyfills, no analytics, no third-party fonts beyond Google Fonts (preconnected).

---

## Accessibility

- WCAG AA color contrast on the default theme.
- Complete keyboard reachability for every drawer, toggle, and navigation surface.
- ARIA roles, labels, and live regions on the loader, toasts, drawers, and progress bar.
- `prefers-reduced-motion` collapses page-flip and ambient animations to instant transitions.
- User-controllable typography scale (5 steps) without breaking layout.

---

## Browser Support

Tested on current Chrome, Firefox, Safari, and Edge (desktop + iOS Safari + Android Chrome). The engine relies on standard, widely supported APIs; no transpilation is required for any browser released after 2020. `requestIdleCallback` falls back to `setTimeout` where it is unavailable (Safari).

---

## Roadmap

- [ ] Service worker for fully offline reading after first load.
- [ ] Web Share API integration on the 22 shareable pull-quotes.
- [ ] Optional EPUB 3 export pipeline reusing the existing paragraph contract.
- [ ] Cilt II content layer (storyline continuation).
- [ ] i18n shell — adapter is content-agnostic; UI strings need extraction.

---

## Contributing

This is a personal portfolio piece, but issues and PRs that improve engine quality (pagination edge cases, accessibility, performance on low-end devices) are welcome. For substantial changes, please open an issue first to discuss the approach.

---

## License

- **Source code** (`/scripts`, `/styles`, `index.html`): **MIT**.
- **Narrative, world-building, illustrations, and typography choices**: **All rights reserved.** Personal reading and educational use are permitted; commercial reuse requires written consent.

---

## Author

**Emre Doğan** — Cloud architecture, SaaS engineering, mobile, and AI-powered systems.

- GitHub: [@emredogan-cloud](https://github.com/emredogan-cloud)
- Repository: [emredogan-cloud/mendiran-vakayinamesi](https://github.com/emredogan-cloud/mendiran-vakayinamesi)

> *"İyileşmemek, bir biçim gerektirir."* — Vellan ehl-i Naerath, And-Taşıyıcı, VS 1250
