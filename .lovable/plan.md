## Plan: All text in Wheatfield; remove residual non-palette tints

### What's actually on screen
After the last swap there are no green/brown/old-red literals left in the codebase — only blue, orange, yellow, red wine, wheatfield. What the user is reading as "green/brown" is the muted-blue and mustard-yellow **text** (`--color-dust` and `--color-ochre`) on subtitles, captions, meta lines. They want every piece of text in Wheatfield (`#F5ECD2`), and accents (Blaze Orange / Orange Yellow / Red Wine) reserved for non-text things (buttons, marquee, dividers, borders).

### Changes

1. **`src/styles.css` — repoint muted-text token to Wheatfield**
   - `--color-dust`: `#B8DCEA` → `#F5ECD2` (now Wheatfield, with `opacity` on individual usages providing the hierarchy)
   - `--muted-foreground`: `#B8DCEA` → `#F5ECD2`
   - Leave `--color-bone`, `--color-paper`, `--foreground` as Wheatfield.

2. **Replace `color: var(--color-ochre)` text occurrences with `var(--color-bone)`**
   - Files: `src/components/ProductCard.tsx`, `src/components/layout/CartDrawer.tsx`, `src/routes/works.$slug.tsx`, `src/routes/journal.index.tsx`, `src/routes/journal.$slug.tsx`, `src/routes/checkout.tsx`, `src/routes/artists.index.tsx`, `src/routes/artists.$slug.tsx`, `src/components/home/Testimonials.tsx`, `src/components/home/PressStrip.tsx`, `src/components/home/VideoReel.tsx`.
   - Only touch `color:` declarations. Keep ochre on `backgroundColor`, `borderColor`, dividers, and accent dots.

3. **Replace `color: var(--color-ember)` text occurrences with `var(--color-bone)`**
   - Files: `src/components/ProductCard.tsx`, `src/routes/works.$slug.tsx`, `src/routes/journal.$slug.tsx`, `src/routes/checkout.tsx`, `src/routes/checkout.success.tsx`, `src/routes/artists.index.tsx`, `src/routes/artists.$slug.tsx`, plus any other text-color use found in a final grep.
   - Headings, "Featured Works", "MITTI" wordmarks already use `--color-bone` — leave them.
   - Keep ember on backgrounds/borders/marquee/buttons (e.g. Marquee bg, retry buttons, primary CTA fills).

4. **Stats counter numbers (`src/components/home/Stats.tsx`)**
   - Currently `color: var(--color-ember)` for the big numerals. User wants all text in Wheatfield, so swap to `var(--color-bone)`. Keep the orange divider lines as accent.

5. **Any other `color: var(--color-flare|electric|violet)` text usage**
   - Final grep across `src/`; convert each to `var(--color-bone)`.

6. **Memory**
   - Add a Core rule: "All text uses `--color-bone` (Wheatfield). Orange/Yellow/Red Wine tokens are accent-only — use them on backgrounds, borders, dividers, and buttons, never as text color."

### Out of scope
No layout, typography, copy, or component-structure changes. Backgrounds, borders, button fills, marquee, hero gradient stay exactly as they are.
