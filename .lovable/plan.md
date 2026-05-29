## New palette (from your reference)

- Saffron `#F8C662` — primary accent (buttons, marquee, highlights)
- Saffron text `#F8C662` — used as foreground for headlines/body, like the reference cards
- Ultra Violet `#595082` — secondary accent / lifted surface
- Dark Purple `#2C263F` — deep surface (cards, drawers, footer)
- Hunter Green `#41644A` — mid surface / borders / hover
- Dark Green `#213722` — base background (every page)

## Token remap in `src/styles.css`

Repoint the existing semantic tokens so every component inherits the new palette automatically — no per-component color changes needed:

- `--color-void` (bg) → `#213722` Dark Green
- `--color-ink` (deep surface) → `#2C263F` Dark Purple
- `--color-ash` (lifted surface / borders) → `#41644A` Hunter Green
- `--color-bone` / `--color-paper` / `--color-dust` / `--foreground` / `--muted-foreground` → `#F8C662` Saffron (all text reads Saffron, matching the reference)
- `--color-ember` (primary accent) → `#F8C662` Saffron
- `--color-flare` / `--color-ochre` (secondary accent) → `#595082` Ultra Violet
- `--color-electric` → `#41644A` Hunter Green
- `--color-violet` (pop) → `#595082` Ultra Violet
- `:root` shadcn vars (`--background`, `--card`, `--muted`, `--primary`, `--accent`, `--border`, `--input`, `--ring`, etc.) repointed to the same hex values

## Kill the rainbow hero

Replace the 6-stop conic `.hero-conic` gradient with a calm 3-stop blend in the new palette so the first page has depth, not a rainbow:

```
background: radial-gradient(120% 90% at 30% 40%, #2C263F 0%, #213722 55%, #41644A 100%);
```

(Static — drop the `gradient-spin` animation on `.hero-conic`.) Saffron stays as accent only (CTA underline, scroll line, "01 / WELCOME" label, ART ghost letters at low opacity).

## Mass-replace legacy rgba literals

Sed across `src/components` and `src/routes` to swap the old Retro Sunburst rgba values to the new palette:

- `rgba(21,112,172,…)` (Nice Blue) → `rgba(33,55,34,…)` Dark Green
- `rgba(15,79,122,…)` → `rgba(44,38,63,…)` Dark Purple
- `rgba(44,159,199,…)` (Curious Blue) → `rgba(65,100,74,…)` Hunter Green
- `rgba(245,236,210,…)` (Wheatfield) → `rgba(248,198,98,…)` Saffron
- `rgba(240,107,4,…)` (Blaze Orange) → `rgba(248,198,98,…)` Saffron
- `rgba(251,183,40,…)` (Orange Yellow) → `rgba(89,80,130,…)` Ultra Violet
- `rgba(161,8,31,…)` (Red Wine) → `rgba(89,80,130,…)` Ultra Violet

## Featured-works / product-card depth

Right now product cards sit on the same bg as the page, which is why they look flat-pink. After the token remap they'll automatically use Dark Purple (`--card`) on Dark Green (`--background`) — clear surface separation. Featured artwork frames get an Ultra Violet 1px border + Hunter Green soft shadow for depth.

## What stays the same

- Layout, typography, copy, animations, component structure — untouched
- Images and artwork — untouched
- Per-card colors driven by tokens — they automatically restyle; no manual per-card overrides

## Memory update

Replace the "Retro Sunburst" Core rule in `mem/index.md` with the new "Forest Saffron" palette and the rule: hero uses a calm 3-stop radial gradient (Dark Purple → Dark Green → Hunter Green) — never a rainbow conic.

## Files touched

- `src/styles.css` (tokens + hero gradient)
- `mem/index.md` (palette rule)
- All `src/components/**` and `src/routes/**` via sed for legacy rgba literals
