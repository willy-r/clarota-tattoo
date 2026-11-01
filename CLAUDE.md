# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also validates types)
npm run start    # serve production build
```

Admin panel in dev: `http://localhost:3000/keystatic` (writes straight to `content/` and `public/portfolio/`).

No lint or test scripts exist.

---

## Architecture

Single-page portfolio (landing page) for tattoo artist Clarota. All sections render in `app/(site)/page.tsx` in order; navigation scrolls within the same page. `app/(site)/museu` is a desktop-only 3D gallery of the portfolio (`components/museum/`, React Three Fiber, loaded via `next/dynamic` with `ssr: false` so three.js never ships to `/`).

`app/(site)` and `app/keystatic` are separate root layouts: the site's `globals.css` sets `cursor: none`, which must not leak into the admin.

### Content

**All site content lives in `content/*.json`**, edited through Keystatic at `/keystatic` (schema in `keystatic.config.tsx`; local file storage in dev, GitHub storage in production). `lib/content.ts` imports the JSON and exports `ARTIST`, `CONTACT`, `STYLES`, `TESTIMONIALS`, `PORTFOLIO_ITEMS` — components import from there. Never hardcode copy inside components. When adding a field, add it to `keystatic.config.tsx` and the JSON together. Setup/usage: `docs/PAINEL.md`.

Design spec (colors, typography, section layout intent): `docs/design-spec.md`.

### Tailwind v4

Configured entirely in `app/(site)/globals.css` via `@theme {}`. There is no `tailwind.config.js`. All design tokens (`--color-purple`, `--font-display`, etc.) are CSS variables defined there. Use `bg-[var(--color-purple)]` or `text-[#7c3aed]` syntax — not arbitrary Tailwind config values.

### Font classes

Four semantic classes declared in `globals.css`:

| Class | Font | Use |
|---|---|---|
| `font-display` | Playfair Display | Titles, hero name |
| `font-heading` | Bebas Neue | Labels, UI text, CTAs |
| `font-sans` | DM Sans | Body copy |
| `font-editorial` | Cormorant Garamond | Italic quotes |

Custom utility classes also in `globals.css`: `.text-glow`, `.purple-glow`, `.purple-glow-sm`, `.animate-spin-slow`.

### Custom cursor

`cursor: none` is set globally on `html`. `components/shared/CursorGlow.tsx` renders the replacement. On touch devices (`pointer: coarse`) the cursor reverts to `auto` via media query in `globals.css`.

### Animations

All section entry animations use Framer Motion's `useInView({ once: true })`. Standard pattern: `hidden: { opacity: 0, y: 40 }` → `visible: { opacity: 1, y: 0 }`.

### Static assets

- Portfolio images: `public/portfolio/items/<slug>/image.webp` — the path Keystatic writes for array items; keep this layout so saves don't rename files
- Profile photo: `public/profile.jpg` — used in `About.tsx`
- `app/(site)/icon.svg` and `app/(site)/opengraph-image.tsx` are Next.js metadata file conventions; picked up automatically by the framework
