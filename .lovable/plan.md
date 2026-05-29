## Goal

Reduce the visual palette to your 4 colors only, used consistently across every page and component. No burnt rose, no ochre, no old beige — those go away.

## Color mapping

| Role | New value | Replaces |
|---|---|---|
| Global background | Warm Ivory `#F7F3EE` | `#F3EEE7` |
| Card / surface | Soft Ivory `#EFE9E0` (derived, one step darker than ivory for separation) | `#E6DED2` |
| Primary text | Charcoal `#2F2A26` | `#2A2622` |
| Dark anchor sections (ArtistFeature, VideoReel/Manifesto, Newsletter, dark CTAs) | Charcoal `#2F2A26` | `#2A2622` |
| Text on dark sections | Warm Ivory `#F7F3EE` | `#F3EEE7` |
| Primary accent (links, CTA hover, selection, ring, "→") | Muted Clay `#B98B73` | Burnt rose `#A54F5E` AND ochre `#E88E46` (both collapse here) |
| Secondary accent / muted highlights (sage labels, soft chips, hover tint) | Dusty Sage `#7C8973` | `#BEBD95` (and old mint/iris) |
| Secondary text | Charcoal at 65% (`#2F2A26` / opacity-65) | `#6B5E52` warm brown |
| Borders / hairlines | Charcoal at 12% | `#D4C9BC` |

One open call I'm making: your 4 colors don't include a separate card surface or a second accent, so I'm deriving **Soft Ivory `#EFE9E0`** for card/panel surfaces (one shade off ivory, still in-palette feel) and collapsing rose + ochre into **Clay** as the single accent. Sage stays as the quieter secondary accent (labels, sublines on dark sections). If you'd rather have everything flat on ivory with zero surface contrast, say so and I'll drop the soft-ivory surface and use ivory everywhere with hairline borders only.

## What changes

1. **`src/styles.css`** — rewrite the design tokens:
   - `--color-void` → `#F7F3EE`, `--color-ink`/`--color-ash` → `#EFE9E0`, `--color-bone`/`--color-paper` → `#2F2A26`
   - `--color-ember`/`--color-flare` → `#B98B73` (Clay)
   - `--color-ochre` → `#B98B73` (alias to Clay; remove the orange entirely)
   - `--color-electric`/`--color-violet` → `#7C8973` (Sage)
   - `--color-dust` → `#2F2A26` used at 65% opacity in components, token kept as a fallback
   - shadcn aliases (`--background`, `--card`, `--primary`, `--accent`, `--ring`, `--border`, `--input`, `--primary-foreground`, etc.) all rewired to the new palette
   - `::selection`, `.cta-outline`, body bg/text — all swapped to new hexes

2. **Hard-coded hex usage in components** — search-and-replace the literal old hexes (`#F3EEE7`, `#E6DED2`, `#2A2622`, `#A54F5E`, `#E88E46`, `#BEBD95`, `#6B5E52`, `#D4C9BC`) in:
   - `src/components/home/*` (Hero, ArtistFeature, Categories, FeaturedWorks, FilmStrip, JournalTeaser, Manifesto, Marquee, Newsletter, PressStrip, Process, Stats, Testimonials, VideoReel)
   - `src/components/layout/*` (Navbar, Footer, CartDrawer, MobileMenu)
   - `src/components/ProductCard.tsx`
   - `src/routes/*` (index, artists.*, works.$slug, journal.*, collections, checkout.*)
   - `src/lib/types.ts` (the `gradients` array — collapse to clay + sage + charcoal pairs)

3. **Dark sections stay dark anchors** — ArtistFeature, VideoReel/Manifesto, Newsletter keep `#2F2A26` background with ivory text; the inline `#E88E46` ochre labels in VideoReel/ArtistFeature become **Clay** and the `#BEBD95` mint→sage sublines become **Sage**.

4. **Noise / texture** — body SVG noise filter values stay (they're neutral grey), only the background color underneath changes.

## What stays the same

- Typography (Cormorant Garamond / Inter / IBM Plex Mono)
- Layout, sections, animations, transitions
- Border radius rules (0 on buttons, ≤4px on cards)
- All content, copy, routes

After approval I'll do this in one pass: rewrite `styles.css`, then sweep the components with targeted replacements.
