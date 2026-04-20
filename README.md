# Khatai Heritage

Homemade khatai, baked fresh in Lahore. A premium single-page landing site built with Next.js 15, React 19, Tailwind v4, and Motion.

## Quick start

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

## Scripts

```bash
pnpm dev     # Start Next.js dev server
pnpm build   # Production build
pnpm start   # Serve production build
pnpm lint    # Lint
```

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme`)
- Motion v12 (`motion/react`)
- shadcn/ui-style primitives built on Radix + CVA
- Lucide icons
- Unsplash imagery via `next/image` `remotePatterns`

## Structure

See [CLAUDE.md](./CLAUDE.md) for full project conventions.

```
app/          Routes, metadata, OG image, sitemap, robots
components/   sections/ · shared/ · ui/
lib/          products, testimonials, ingredients, metadata, structured-data, fonts, site, utils
```

## Sections

1. Navbar (sticky, scroll-hide, mobile drawer)
2. Hero (smooth spring-damped parallax, staggered tagline reveal)
3. Our Promise (homemade / hygienic / pure desi ghee / small batches)
4. Ingredients (four-ingredient provenance grid)
5. Menu (Khatai + Badam Wali Khatai, 3D tilt cards)
6. Tasting Notes (interactive flavor cards)
7. Testimonials (single-row marquee)
8. Gifting (festive CTA)
9. Newsletter
10. Footer

## Brand positioning

- Homemade · hygienic kitchen · Lahore-only delivery
- No "since 1925", no generations, no heritage-age messaging
- Two products only: **Khatai** and **Badam Wali Khatai**

## SEO

- Full Metadata API coverage (title template, OG, Twitter, canonical, robots)
- JSON-LD blocks: Organization, Bakery (LocalBusiness), BreadcrumbList, Product × 2
- Dynamic `/opengraph-image` and `/icon` rendered at the edge
- `robots.ts` + `sitemap.ts`
