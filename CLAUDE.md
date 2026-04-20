# Khatai Heritage — Project Guide

Premium single-page landing for **Khatai Heritage**, a small homemade-khatai brand baking in Lahore.

**Positioning (important):**
- Homemade · Hygienic kitchen · Lahore-only delivery.
- **Do not** use "since 1925", "heirloom", "four generations", founder stories, or any heritage-age messaging — the user removed it intentionally.
- Only **two** products: **Khatai** and **Badam Wali Khatai**. Do not re-introduce Saffron Gold, Royal Pistachio, etc.
- Shipping copy: Lahore same-day. Not Pakistan/UAE/UK.
- No street address anywhere — city only (Lahore, Punjab, PK).

**Scope:** landing page only. No cart, no checkout, no product detail routes.

## Stack

- Next.js **15** (App Router) · React **19** · TypeScript (strict)
- Tailwind CSS **v4** (CSS-first — tokens live in `app/globals.css` under `@theme`, no `tailwind.config.ts`)
- Motion **v12** for animations — import from `motion/react`
- Lucide icons, Radix primitives, CVA + clsx + tailwind-merge
- pnpm · Node 20+
- Fonts: Playfair Display (display) + Inter (body) via `next/font/google`

## Commands

```bash
pnpm install            # install deps
pnpm dev                # localhost:3000
pnpm build              # production build
pnpm start              # serve production build
pnpm lint
```

## Folder Conventions

```
app/          route segments, metadata, OG, sitemap, robots
components/
  sections/   one file per landing section (Navbar, Hero, etc.)
  shared/     cross-section islands (TiltCard, Marquee, AnimatedCounter, JsonLd)
  ui/         design primitives (Button, Badge, Input, Separator, Container)
lib/          data (products, testimonials, ingredients) + metadata, structured-data, utils, fonts, site
public/       static assets
```

- `app/page.tsx` is a **Server Component**. It imports the sections directly.
- A section becomes `"use client"` only when it needs motion, state, or browser APIs.
- Data (products, testimonials, ingredients) lives in `lib/` and is imported into sections as props or via direct import.
- SEO metadata lives in `lib/metadata.ts`; JSON-LD builders in `lib/structured-data.ts`; site constants in `lib/site.ts`.

## Brand Guidelines

Palette (defined as Tailwind color tokens in `globals.css`):

| Name | Hex | Use |
| --- | --- | --- |
| `cream` | `#F5EFE7` | Page background |
| `saffron` | `#D4AF37` | Primary accent, gold CTAs |
| `pistachio` | `#92B884` | Secondary accent |
| `rose` | `#8B4348` | Occasions / tertiary accent |
| `charcoal` | `#3A3A3A` | Text secondary |
| `ink` | `#14110D` | Body text, dark surfaces |

Typography:
- Display (h1–h4, numbers): **Playfair Display**, tight tracking, `text-balance`.
- Body: **Inter**, 16–18px default.

Voice: warm, heritage-forward, never casual slang. Short sentences. Never say "buy now" — say "order a box". Never shout — tighten instead.

## Component Patterns

- Use `cn()` from `lib/utils` to merge classes.
- Variants via CVA (`buttonVariants`, `badgeVariants`).
- Prefer `type` over `interface` for public prop types unless declaration merging is needed.
- `next/image` always with `sizes`. Only the hero uses `priority`. Others lazy-load.
- Every motion effect checks `useReducedMotion()` and degrades gracefully.
- Anchor IDs on sections: `#heritage`, `#ingredients`, `#collection`, `#flavor`, `#occasions`, `#newsletter`, plus `#<product-slug>` on each product card.

## Do

- Prefer Server Components; add `"use client"` only where needed.
- Honor `prefers-reduced-motion` via Motion's `useReducedMotion`.
- Use semantic tokens (`bg-cream`, `text-ink`) — never raw hex.
- Keep sections under ~200 lines; extract shared islands into `components/shared`.

## Don't

- Don't add cart, checkout, auth, or product detail routes — this is a landing page.
- Don't import Motion from `framer-motion`. It's `motion/react` now.
- Don't import Motion into a Server Component file.
- Don't inline `tailwind.config.js` — v4 is CSS-first; edit `@theme` in `globals.css`.
- Don't commit `.env*.local`.

## SEO

- `app/layout.tsx` exports `metadata` from `lib/metadata.ts` and renders `Organization` + `LocalBusiness` JSON-LD.
- `app/page.tsx` renders `BreadcrumbList` + one `Product` JSON-LD per item.
- `app/opengraph-image.tsx` renders a 1200×630 branded card at edge runtime.
- `app/robots.ts` allows all and points at `/sitemap.xml`.
- `app/sitemap.ts` exposes `/` only.

## Verification

1. `pnpm install && pnpm dev` → open `http://localhost:3000`. Expect zero hydration warnings.
2. `pnpm build` → must pass. `pnpm start` then Lighthouse: Perf ≥ 90, SEO = 100, A11y ≥ 95.
3. Smoke clicks: every nav anchor, every hover on product cards, form submit, mobile drawer at 375px.
4. `view-source:/` confirms title, description, Open Graph, and five JSON-LD blocks.
5. `prefers-reduced-motion: reduce` disables parallax, marquee, tilt.
