## Plan: Teesta Blue Background

### What
Change the site's primary background from Charcoal (`#2C2C2A`) to Teesta Blue (`#7D9DA8`). Keep text and accent hierarchy readable against the lighter blue surface.

### How
Update `src/styles.css` only:

1. **Base tokens**
   - `--color-void`: `#2C2C2A` → `#7D9DA8` (new base surface)
   - `--color-ink`: `#1F1F1D` → `#5A7A85` (deeper blue shadow for depth)

2. **Shadcn `:root` vars**
   - `--background`: `#2C2C2A` → `#7D9DA8`
   - `--card`: `#7A5A47` → `#5A7A85` (darker blue for card surfaces)
   - `--popover`: `#7A5A47` → `#5A7A85`
   - `--secondary`: `#7A5A47` → `#5A7A85`
   - `--muted`: `#7A5A47` → `#5A7A85`
   - `--border` / `--input`: `#3A3A37` → `#4A6A75`

3. **Foreground stays the same**
   - `--foreground`, `--color-bone`, `--color-paper` remain `#F4F1EB` (Mist White on blue is readable and airy).

4. **Hero conic gradient**
   - Update gradient stops from charcoal tones to blue tones so the animated hero matches the new background.

5. **Selection & body**
   - `body` background already uses `var(--color-void)` — inherits automatically.
   - `::selection` background (`var(--color-ember)`) stays; contrast on blue is fine.

### Out of scope
No component, layout, image, or copy changes. All components read from tokens, so the swap flows through automatically.