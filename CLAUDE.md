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

No lint or test scripts exist.

---

## Architecture

Single-page portfolio (landing page) for tattoo artist Clarota. All sections render in `app/page.tsx` in order; navigation scrolls within the same page.

**All site content lives in `lib/content.ts`** — `ARTIST`, `CONTACT`, `STATS`, `STYLES`, `TESTIMONIALS`, and `PORTFOLIO_ITEMS`. Never hardcode copy inside components.

Design spec (colors, typography, section layout intent): `docs/design-spec.md`.

### Tailwind v4

Configured entirely in `app/globals.css` via `@theme {}`. There is no `tailwind.config.js`. All design tokens (`--color-purple`, `--font-display`, etc.) are CSS variables defined there. Use `bg-[var(--color-purple)]` or `text-[#7c3aed]` syntax — not arbitrary Tailwind config values.

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

- Portfolio images: `public/portfolio/*.webp` — filenames referenced in `PORTFOLIO_ITEMS` in `lib/content.ts`
- Profile photo: `public/profile.jpg` — used in `About.tsx`
- `app/icon.svg` and `app/opengraph-image.tsx` are Next.js metadata file conventions; picked up automatically by the framework
