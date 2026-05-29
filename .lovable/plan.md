## Goal

The site feels empty because most pages have a single grid and the home page stops after a few sections. I'll add new sections, richer detail pages, and seed more content — keeping the Glow palette and vibrancy at level 3 (rich but not maximalist).

## 1. Seed more content (DB)

- Add **5 new artists** (with bios, origins, portrait URLs from existing artwork files or generated placeholders).
- Add **~18 more products** spread across the new artists, with varied categories (painting, sketch, mixed media, ceramic, textile), price tiers, and `featured` flags. Use existing `/artworks/*.jpg` images plus 2–3 newly generated artwork images for variety.
- Add **6 more testimonials**.
- Create a new `journal_posts` table (slug, title, excerpt, body, cover_url, author, published_at) with public-read RLS, and seed 6 posts.
- Create a new `press_mentions` table (publication, quote, url, logo_url) with public-read RLS, and seed 6 entries.

## 2. Home page — add sections

Insert new components into `src/routes/index.tsx` between existing ones:
- **Process** — 4-step editorial section (Source → Make → Curate → Ship) with numbered cards and subtle motion.
- **JournalTeaser** — 3 latest journal posts in an asymmetric layout.
- **PressStrip** — silent marquee of publication names/logos.
- **VideoReel** — looping muted background video panel (placeholder MP4 or animated gradient if no asset) with editorial caption.
- **CategoryShowcase** improvement — replace placeholder gradients in `Categories` with real product imagery sampled from DB.

## 3. Artists page (`/artists`)

Replace the bare grid with:
- **Hero collage** — overlapping artwork thumbnails + big editorial headline + count ("94 hands. 28 origins.")
- **Filter bar** — by region (chips) and medium.
- **Artist cards** — portrait + name + origin + work count + 3-thumbnail strip of their works + short bio excerpt + "View studio →".
- **Manifesto block** at the bottom.

## 4. Artist detail (`/artists/$slug`)

Already exists — verify and enhance:
- Add a quote pulled from bio, a "process" image strip, and a "more from this artist" rail.

## 5. Work detail (`/works/$slug`)

- Add provenance block (artist, origin, year, medium, dimensions).
- Materials breakdown.
- **Related works** carousel (same artist + same category).
- Sticky artist mini-card with link to their page.
- Story section with editorial pull-quote.

## 6. New routes

- `/journal` — index of journal posts (magazine layout).
- `/journal/$slug` — long-form post page with cover image, body, share metadata.
- `/process` — dedicated process page (linked from home).

## 7. Visual richness (vibrancy 3)

- Add subtle decorative SVG accents (botanical line motifs) in section dividers.
- Use the new `--color-electric` and `--color-violet` tokens sparingly as accent highlights on hover/badges.
- Add a thin colored rule above each section heading (rotating through ember/ochre/electric/violet).

## Technical notes

- New tables created via `supabase--migration` with public-read RLS.
- Seed data inserted via `supabase--insert`.
- New server functions: `getJournalPosts`, `getJournalPost`, `getPressMentions`, `getRelatedWorks` in `src/lib/products.functions.ts` and `src/lib/journal.functions.ts`.
- New route files added under `src/routes/`; head() metadata set per route.
- No changes to auth, payments, or existing route shells.

## Out of scope

- Stripe checkout flow (already wired, leave alone).
- Palette changes (locked to Glow).
- Mobile-specific redesign beyond responsive defaults.
