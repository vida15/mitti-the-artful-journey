
# MITTI — Cinematic Art E-Commerce Build Plan

A full rebuild as a dark, editorial, cinematic art platform. Backend on Lovable Cloud, payments via built-in Stripe, motion stack via Framer Motion + Lenis.

## 1. Foundation

- Enable **Lovable Cloud** (Postgres + auth + storage).
- Enable **Lovable Stripe payments** (test mode first).
- Install: `framer-motion`, `@studio-freight/lenis`, `zustand`, `zod`.
- Google Fonts via `<link>` in `__root.tsx` head: Bebas Neue, Playfair Display, Lato, IBM Plex Mono, Abril Fatface.
- Rewrite `src/styles.css`:
  - `@theme` tokens: `--color-void`, `--color-bone`, `--color-ember`, `--color-ochre`, `--color-dust`, `--color-ash`, `--color-flare`, `--color-paper`, `--color-ink`.
  - Body defaults to `--color-void` / `--color-bone`, Lato 300.
  - Utility classes for the warm conic gradient, grain SVG filter, ember glow shadow.

## 2. Routing (TanStack file-based)

```
src/routes/
  __root.tsx              shell, fonts, providers, custom cursor, noise layer, page transition, navbar, footer
  index.tsx               homepage (10 sections)
  collections.tsx         filterable grid (category, price, artist)
  artists.index.tsx       artist directory
  artists.$slug.tsx       artist detail
  works.$slug.tsx         product detail (sticky image)
  cart.tsx                fallback (drawer is primary)
  checkout.tsx            address form + Stripe / UPI QR / COD selector
  checkout.success.tsx    post-payment confirmation
  api/public/stripe-webhook.ts   payment confirmation webhook
```

`__root.tsx` mounts: `<LenisProvider>`, `<CustomCursor>`, `<NoiseLayer>`, `<PageTransition>`, `<Navbar>`, `<Outlet />`, `<Footer>`, `<CartDrawer>`, `<SearchOverlay>`.

## 3. Database (Cloud / Supabase)

Tables (all RLS-on; public read on products/artists, authenticated write on orders, public insert on newsletter):

- `artists` — id, slug, name, origin, bio, portrait_url, featured
- `products` — id, slug, title, artist_id, medium, category, price_inr, description, story, images[], dimensions, sizes (jsonb), in_stock, featured, created_at
- `orders` — id, user_id (nullable for guest), email, items (jsonb), subtotal, shipping_address (jsonb), payment_method (`stripe`|`upi`|`cod`), payment_status, stripe_session_id, created_at
- `newsletter` — id, email (unique), created_at
- `testimonials` — id, quote, author, location

Seed ~12 works across 4 artists + 5 testimonials with placeholder image URLs (solid `--color-ash` SVG data URIs with title overlay; no AI image gen this round to keep build focused).

## 4. State (Zustand)

- `useCartStore` — items, add/remove/qty, subtotal, drawer open state. Persisted to `localStorage`.
- `useUIStore` — theme (dark/light), search overlay, mobile menu.

## 5. Motion / Global System

- **Lenis** wired with `requestAnimationFrame`, `duration: 1.4`.
- **Custom cursor** — desktop only (`matchMedia('(pointer: fine)')`), inner dot + lerped outer ring, expands on `[data-cursor="view"]` and snaps magnetic on `[data-cursor="link"]`.
- **PageTransition** — `AnimatePresence` wrapping `<Outlet />` keyed by pathname; void panel sweep + MITTI wordmark.
- **NoiseLayer** — fixed SVG feTurbulence overlay, 3.5% opacity.
- **Scroll-velocity skew hook** — `useScrollSkew()` applied to all hero/product images.
- **Magnetic hover hook** — `useMagnetic()` on primary CTAs.
- **TextReveal** component — wraps children in `overflow:hidden` mask + `y: 100% → 0`, used by all H1/H2.
- **SplitText** component — top/bottom half clip-path collide (used in "Featured Works" heading).
- **CountUp** hook for stats.

## 6. Homepage Sections

1. **Hero** — conic gradient bg, grain layer, ghost "ART" word with cursor parallax, stagger-curtain headline, parallax artwork on right (clip-path slant), scroll indicator.
2. **Horizontal Film Strip** — pinned section, 5×100vw panels, dotted progress, scale-out exit.
3. **Categories** — masonry overlap layout, ghost "COLLECTIONS" bg, hover lifts z-index, ember top-line draw, circular OPEN cursor text.
4. **Marquee Interruption** — ember band, infinite scroll, hover-speeds-up.
5. **Featured Works** — split-text heading, 4-col grid with every 5th card double-width, hover panel-rise, ember glow, infinite load.
6. **Artist Feature** — diagonal clip-path image left, scroll-revealed quote sentences right.
7. **Stats Bar** — 4 count-up numbers, vertical dust dividers.
8. **Manifesto** — pinned 300vh, scroll-driven word-by-word color reveal.
9. **Testimonials Reel** — full-screen quote rotation via `AnimatePresence`, 6s progress bar.
10. **Newsletter** — ghost STAY, underlined input, ember flash on submit (writes to `newsletter` table).

Plus **Footer** with ghost MITTI watermark and editorial 3-column nav.

## 7. Product Detail Page (`/works/$slug`)

- 60% sticky image left + 40% scrollable info right.
- Size table selector with ember left-border active row.
- Frame swatches that update sticky image (CSS box-shadow mock).
- "BRING THIS HOME" CTA → adds to cart, ripple, ✓ confirm.
- Magnifier opens full-screen overlay.
- Three accordion sections (height + opacity grow).

## 8. Cart Drawer

- Right-side slide drawer (spring), 480px / 100vw.
- Items list, REMOVE slides item out, subtotal row, CHECKOUT CTA.
- Auto-opens 1.2s on add, navbar counter scale-bumps.

## 9. Checkout + Stripe

- `/checkout` page collects email + shipping address (zod-validated) and lets user pick **Card (Stripe)** / **UPI** / **COD**.
- `createCheckoutSession` server fn (`src/lib/checkout.functions.ts`) using `requireSupabaseAuth` (or guest-allowed variant) creates Stripe checkout session and writes pending order row.
- For UPI: render a QR placeholder + UTR input, mark order `pending_verification`.
- For COD: write order with `payment_status: 'cod_pending'`, redirect to `/checkout/success`.
- `api/public/stripe-webhook.ts` verifies Stripe signature → marks order `paid`.
- `/checkout/success` reads order id from query, shows confirmation.

## 10. Search & Filters

- Search overlay (cmd-K / search icon) — full-screen takeover, client-side filter on loaded products by title/artist/medium.
- `/collections` page — sidebar filters (category checkbox, price range slider, artist multi-select), product grid reuses card.

## 11. Responsive + A11y

- Every section adapts: hero stacks, film strip becomes vertical scroll on mobile, masonry collapses to single column, drawer becomes full-width.
- Mobile menu: full-screen takeover with staggered links + slow-rotating SVG blob.
- Cursor + Lenis disabled on touch devices.
- Respect `prefers-reduced-motion`: skip parallax, gradient spin, marquee speed; keep static layout.

---

## Technical notes

- Auth is **optional** — guest checkout supported; orders table allows nullable `user_id`.
- Stripe secret key & webhook secret set via Lovable Cloud secrets after `enable_stripe_payments` runs.
- All server-side DB writes (newsletter, orders, webhook) go through `createServerFn` / server routes — no admin client in components.
- Image placeholders: SVG data URIs in `--color-ash` with title overlay so the build is visually complete without AI generation. User can swap for real art later.
- No carousels with dots, no accordion FAQ, no hamburger — strictly per spec.

## Build order

1. Foundation (tokens, fonts, deps, Cloud, Stripe).
2. Schema + seed.
3. Global motion system (cursor, lenis, transition, noise, hooks).
4. Navbar + footer + page shell.
5. Homepage sections 1 → 10.
6. Product detail + cart drawer.
7. Collections + artists + search.
8. Checkout + Stripe flow + webhook.
9. Mobile + reduced-motion pass.

This is a large single-pass build. I'll deliver it cohesively, then we can iterate on real artwork imagery, copy refinements, and animation tuning.
