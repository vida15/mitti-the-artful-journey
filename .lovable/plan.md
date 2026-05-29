## Plan: Replace site palette with "Grab Coffee With Me"

### New palette
- Regent Blue `#1F281A`... wait — the hex `1F281A` is actually near-black green; the swatch shown is a dusty blue. I'll use the visual swatch value: **Regent Blue ≈ `#8AA9B8`** (dusty blue, matches the image).
- Asparagus `#8DA249` (olive green)
- Faded Orange `#F89254` (warm orange)
- Navajo White `#FBE1B5` (cream)
- Limed Spruce `#2E434F` (deep teal-navy)

### Token mapping (semantic, full site)
Background stays dark for depth per saved memory rule.

- `--color-void` (page bg): `#2E434F` Limed Spruce
- `--color-ink` (deeper section bg / shadow surfaces): `#243641` (slightly darker Limed Spruce)
- `--color-ash` (mid surface / Stats strip): `#3B5867` (lifted Limed Spruce)
- `--color-bone` / `--color-paper` (foreground text): `#FBE1B5` Navajo White
- `--color-ember` (primary accent — buttons, marquee, selection): `#F89254` Faded Orange
- `--color-flare` (hover / soft): `#8AA9B8` Regent Blue
- `--color-ochre` (secondary accent — small labels, dividers): `#8DA249` Asparagus
- `--color-dust` (muted text): `#8AA9B8` Regent Blue
- `--color-electric` (pop 1): `#8DA249` Asparagus
- `--color-violet` (pop 2): `#F89254` Faded Orange

### Shadcn `:root` vars
- `--background`: `#2E434F`
- `--foreground`: `#FBE1B5`
- `--card` / `--popover` / `--secondary` / `--muted`: `#243641`
- `--card-foreground` / `--popover-foreground` / `--secondary-foreground` / `--muted-foreground`: `#FBE1B5` (muted-foreground: `#8AA9B8`)
- `--primary`: `#F89254`, `--primary-foreground`: `#2E434F`
- `--accent`: `#8DA249`, `--accent-foreground`: `#FBE1B5`
- `--border` / `--input`: `#3B5867`
- `--ring`: `#F89254`

### Hero conic gradient
Restop to: Limed Spruce → Regent Blue → Asparagus → Faded Orange → Limed Spruce, so the animated hero reads in the new palette.

### Components with hardcoded colors
Audit and replace any remaining hex/`#000`/`rgba(...)` literals in:
- `src/components/home/Manifesto.tsx` (Word color `rgba(232,224,212,...)` → Navajo White `rgba(251,225,181,...)`)
- `src/components/home/PressStrip.tsx` (border `rgba(190,189,149,0.15)` → token-based)
- `src/components/home/Stats.tsx` (divider `rgba(122,106,88,0.4)` → token)
- `src/components/home/Testimonials.tsx` (track `rgba(122,106,88,0.3)` → token)
- `src/components/home/VideoReel.tsx` (grid border `rgba(242,213,186,0.05)` → token)
- Quick grep across `src/components/**` and `src/routes/**` for any other hardcoded color literals and convert to `var(--color-*)`.

### Memory update
Rewrite `mem/index.md` Core rule to describe the new "Grab Coffee" palette and the token mapping.

### Out of scope
No layout, typography, copy, image, or component-structure changes. Pure color-system swap.
