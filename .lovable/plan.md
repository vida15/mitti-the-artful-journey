
# MITTI visual system rebuild

Scope: visual only. No section adds/removes, no feature changes, no business logic. Copy edits only where the brief specifies new strings (hero subline, Featured Works label/heading, marquee text).

## 1. Tokens — `src/styles.css`

Rewrite the palette + typography tokens to the new system as the single source of truth, so component-level hex usage stays consistent.

- `--color-void` → `#F3EEE7` (global bg)
- `--color-ink` / `--color-ash` → `#E6DED2` (secondary surface)
- `--color-bone` → `#2A2622` (primary text + dark anchor bg)
- `--color-dust` → `#6B5E52` (muted text)
- `--color-ember` → `#A54F5E` (burnt rose — CTA, price)
- `--color-ochre` → `#E88E46` (warm ochre — tags, hover, ✦, newsletter arrow)
- `--color-electric` / `--color-violet` → `#BEBD95` (dusty sage — dividers, labels on dark)
- Hairline border token: `#D4C9BC`
- Remove any mint/iris/teal/`#283933`/`#546144` references.
- Shadcn aliases (`--background`, `--card`, `--primary`, `--accent`, `--ring`, `--border`, `--input`, `--muted-foreground`, etc.) repointed to the new hexes.
- `::selection` → bg `#A54F5E`, text `#F3EEE7`.
- Body bg `#F3EEE7`, text `#2A2622`.

Typography:
- Google Fonts import: Cormorant Garamond (300, 400, 500, italics) + Inter (400, 500). Remove Bebas Neue + IBM Plex Mono imports and tokens.
- `--font-display` / `--font-editorial` / `--font-accent` → `"Cormorant Garamond", serif`
- `--font-body` → `"Inter", system-ui, sans-serif`
- `--font-mono` retired; any `font-mono` usages swapped to Inter 500 uppercase small-label style.
- Global heading defaults: Cormorant 300/400, letter-spacing `-0.01em` on h1.
- Utility class `.label-mono` replaced/aliased to: Inter 500, 0.7rem, uppercase, letter-spacing 0.12em, color `#6B5E52`.

Global rules:
- All transitions `0.4s ease`. Remove spring/bounce easings on hover/state transitions (Framer scroll/reveal animations stay — they aren't "UI transitions").
- No drop-shadow, glass blur, glow, or gradient utilities on UI surfaces. Remove `.hero-conic` gradient, ghost ART vignette stays as flat opacity.
- Border-radius: cards/inputs `2px`, buttons `0px`. Update `.cta-outline` accordingly (already `0`).
- Section dividers helper: `border-top: 1px solid #E6DED2`.

## 2. Section-by-section edits

Each item below is a targeted edit inside an existing component file — no restructuring.

**Hero (`src/components/home/Hero.tsx`)**
- Remove the "— 01 / Welcome to MITTI" label line entirely.
- Heading "Objects with a Soul." → Cormorant 300, `clamp(3rem, 7vw, 5.5rem)`, `#2A2622`, `max-width: 700px`, `line-height: 1.1`, letter-spacing `-0.01em`.
- Replace current "2,400 works…" subline with: *"Handpicked from studios, villages, and dye yards across India."* — Inter 400, 0.85rem, `#6B5E52`, letter-spacing 0.08em.
- Primary CTA: outlined, `1.5px solid #2A2622`, transparent fill, text `#2A2622`, padding `12px 28px`, radius `0`, hover bg `#2A2622` + text `#F3EEE7`.
- Secondary CTA ("Our Artists"): outlined, `1.5px solid #BEBD95`, text `#6B5E52`, radius 0.
- Ghost "ART" word stays but at `rgba(42,38,34,0.06)`. Remove ochre vertical accent line (replaced by sage hairline) — or keep using ochre per "warm ochre — hover" — keep as-is (`#E88E46`).
- Scroll indicator label color → `#6B5E52`.

**Featured Works (`src/components/home/FeaturedWorks.tsx` + `src/components/ProductCard.tsx`)**
- Remove the glitch / double-letter heading rendering. Heading text becomes plain "Featured works" — Cormorant 400, `2.8rem`, `#2A2622`.
- Add label above: "Curated this season" — Inter 500, 0.7rem, uppercase, letter-spacing 0.15em, `#6B5E52`.
- Cards: bg `#E6DED2`, no shadow, no rest border, hover `1px solid #D4C9BC`, radius `2px`. Image stays sharp (no radius).
- Title → Cormorant 400 1.1rem `#2A2622`. Price → Inter 500 0.85rem `#A54F5E`. Artist name → Inter 400 0.75rem `#6B5E52`, letter-spacing 0.06em.

**Artist Feature (`src/components/home/ArtistFeature.tsx`)** — already `#2A2622` from prior pass; refine text styles.
- Quote: Cormorant italic 300, 1.6rem, line-height 1.5, max-width 600px, color `#F3EEE7`.
- Attribution ("Asha Naik" block) → Inter 500, 0.75rem, uppercase, letter-spacing 0.12em, color `#BEBD95`.
- Body sentences → Inter 400 1rem line-height 1.75, `#BEBD95` for muted-on-dark.
- "View all works →" → underlined text link only (no button), Inter 0.85rem `#F3EEE7`. Top label switches to sage `#BEBD95`.

**Categories (`src/components/home/Categories.tsx`)**
- Section bg `#F3EEE7`.
- Category labels → Cormorant 400, 1.3rem, `#2A2622`.
- Replace decorative arrow with simple `→` (Inter), color `#A54F5E`.

**Stats (`src/components/home/Stats.tsx`)**
- Bg `#E6DED2`.
- Numbers Cormorant 300, 4rem, `#A54F5E`.
- Labels Inter 500, 0.75rem uppercase, letter-spacing 0.1em, `#6B5E52`.
- Divider lines `#D4C9BC`.

**Process (`src/components/home/Process.tsx`)**
- Bg `#E6DED2`.
- Step numbers Cormorant italic 300, 3rem, `#BEBD95` (replaces the vertical clay accent + mono number).
- Step headings Cormorant 400, 1.3rem, `#2A2622`.
- Body Inter 400, 0.9rem, line-height 1.7, `#6B5E52`.

**Manifesto + VideoReel (`src/components/home/Manifesto.tsx`, `src/components/home/VideoReel.tsx`)**
- Bg `#2A2622` (already).
- Manifesto text Cormorant italic 300, 1.8rem, `#F3EEE7`, max-width 680px, line-height 1.5. Update the per-word color motion-value to interpolate `rgba(243,238,231, …)`.
- ✦ symbol color → `#E88E46`.
- VideoReel: same dark bg, text on dark uses `#F3EEE7`/`#BEBD95`; remove any gradient/glow overlays.

**Marquee (`src/components/home/Marquee.tsx`)**
- Reduce animation speed by 60% (e.g. if current `duration: 30s`, new `75s` = 30 / 0.4). Apply via CSS `animation-duration` or Framer transition.
- Text: `Handmade · Authentic · Artist-direct · 94 makers · 28 origins · Zero mass production` — mixed case, no uppercase transform.
- Color `#6B5E52`, bg `#F3EEE7`, `border-top` + `border-bottom: 1px solid #E6DED2`.

**Newsletter (`src/components/home/Newsletter.tsx`)** — already dark.
- Heading Cormorant 300, 2.5rem, `#F3EEE7`.
- Subtext Inter 0.85rem, `#BEBD95`.
- Input: transparent, no borders except `border-bottom: 1px solid #BEBD95`, text `#F3EEE7`, placeholder `#6B5E52`.
- Submit arrow `#E88E46`.
- Remove the flash-to-ember bg micro-interaction (snap animation) — replace with 0.4s ease opacity/color fade on submit confirmation.

**Footer / Navbar / Mobile menu (`src/components/layout/*`)**
- Navbar wordmark "MITTI": Cormorant Garamond italic 400, 1.4rem, `#2A2622`.
- All nav links Inter 500, 0.7rem, uppercase, letter-spacing 0.12em, `#6B5E52`; hover `#2A2622`.
- Footer surfaces on `#F3EEE7` or `#E6DED2` (whichever is currently there) — sweep mono/Bebas usages, repaint to new palette.

**Other home sections** (FilmStrip, JournalTeaser, PressStrip, Testimonials): sweep only — repaint old hexes to the new palette, swap any `font-mono`/Bebas to Inter, ensure section bg is `#F3EEE7` (no dark anchors here), and add `border-top: 1px solid #E6DED2` divider where there's currently a hard contrast edge.

## 3. Sweep + cleanup
- `rg` for any remaining `#283933`, `#546144`, mint/iris hexes, `bebas`, `IBM Plex Mono`, `font-mono` and remove/replace.
- Remove unused token references from `src/lib/types.ts` gradient strings.
- Update `mem://index.md` Core rules to reflect the parchment palette + Cormorant/Inter system; remove the stale "Glow" botanical-green entry.

## 4. Verification
- Visit `/` in preview at the user's current viewport (729×777) + desktop, screenshot the hero, Featured Works, Artist Feature, Manifesto, Stats/Process, Newsletter.
- Confirm: no teal/mint/iris remaining, no Bebas/mono, dark anchors only on Artist Feature / Manifesto+VideoReel / Newsletter, all CTAs square-edged outlined, marquee mixed-case at slower speed.

## Out of scope
- No new sections, no removed sections, no copy changes beyond the three specified strings, no business/data/auth changes, no route changes.
