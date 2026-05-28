# DEPLOY-STATE

## Repo
- **GitHub:** https://github.com/emredogan-cloud/intikam-yemini · branch **main**
- **Git identity:** emredogan-cloud / ed897854@gmail.com (HTTPS push works non-interactively; creds cached).
- `.gitignore` present (.vercel, .env, node_modules, OS cruft).

## Site
- Pure **static** (vanilla HTML/CSS/JS). **No build step.** Vercel-safe: correct MIME, zero config.
- Verified locally: `index`, all `assets/cover*.{webp,jpg}`, `styles/*.css`, `scripts/*.js`, `content/*.js` → **200**.

## STANDING RULE (author instruction)
**Commit + push after EVERY completed phase** → triggers Vercel. This overrides any "no commit" default.
- Commit message convention: Turkish summary + body, **end with trailer** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

## Vercel assumptions
- Per-book convention: each sibling book = own GitHub repo → **own Vercel project**. Push to `main` = production deploy **IF** this repo is imported into a Vercel project.
- ⚠️ The Claude-side Vercel MCP token **lacks scope** (`user:mcp_servers`) → an agent here **cannot verify/inspect deploys**. The push IS the trigger. If this repo was never imported into Vercel, a **one-time GitHub→Vercel import** is required (then pushes auto-deploy).
- `og:image` is relative (`assets/cover.jpg`) → convert to an absolute URL once the domain is known.

## Assets
- Covers optimized: **webp (primary) + jpg (fallback)**, ~1024×1536, via ImageMagick `convert`. Masters (PNG) kept in `images/`. `assets/cover.svg` = old placeholder, now unused.

## Last finalize
Post-release finalize: cover integration (front+back) + full audit + handover memory. See `git log` for the hash.
