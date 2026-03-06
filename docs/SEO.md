# SEO & SPA crawlability

This app is a client-side SPA (Vite + React). Search engines receive the initial HTML (with empty `<div id="root"></div>`) and may not run JavaScript, so they can miss your real content.

## What’s already in place

- **robots.txt** – `public/robots.txt` points crawlers at the sitemap.
- **Meta tags** – `index.html` has description, Open Graph, and Twitter tags.
- **Sitemap** – `public/sitemap.xml` lists main routes (home, plans, team, testimonials, etc.).
- **Structured data** – JSON-LD (WebSite + Organization) in `index.html` so crawlers get semantic data without JS.
- **Noscript fallback** – A short, crawlable summary and link in `<noscript>` for no-JS crawlers.

## Improving crawlability (Fix 5)

To get **full HTML** for each public route (so Google indexes real content), use one of these:

### Option A: Prerender service (easiest)

Use [Prerender.io](https://prerender.io) or similar:

1. Sign up and get an API key.
2. On your host (e.g. Vercel, Netlify, or nginx), send requests from crawler user-agents to the prerender service instead of your SPA.
3. The service returns fully rendered HTML for the requested URL; your SPA stays unchanged.

No code changes; only hosting/config. Good fit when only marketing/landing pages need to be indexed.

### Option B: Build-time prerender (no external service)

Prerender key routes at **build time** and deploy the generated HTML.

**What you need to do:**

| Step | Action |
|------|--------|
| 1 | Install deps: `npm i -D vite-plugin-prerender-esm-fix @prerenderer/renderer-puppeteer` (use the ESM-fix package; the original breaks with `"type": "module"`). |
| 2 | Run the prerender build: `npm run build:prerender` (config and routes are already set up in this repo). |
| 3 | Deploy the `dist/` folder as you normally do. Your host should serve `/plans` from `dist/plans/index.html`, etc.—most static hosts (Vercel, Netlify, Cloudflare Pages) do this by default. |
| 4 | (Optional) In CI/CD, use `build:prerender` instead of `build` when you want SEO-ready HTML; use `build` for faster builds without prerender. |

**Trade-off:** `build:prerender` is slower (Puppeteer) and needs Node + Chrome/Chromium. Normal `npm run build` is unchanged and does not run prerender.

### Option C: SSR or meta-framework (largest change)

Move to a stack with server rendering (Vite SSR, Remix, Next.js, Astro, etc.) so each URL returns full HTML. Best long-term if the whole site must be indexed and you’re okay with a bigger refactor.

---

**Recommendation:** For a landing/marketing site where only public routes matter for SEO, Option A (Prerender.io) or Option B (build-time prerender for those routes) is usually the best tradeoff.
