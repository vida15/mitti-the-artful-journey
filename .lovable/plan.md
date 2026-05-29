## New palette: Teesta & Tea Gardens

Replace the current "Glow" palette with the Teesta palette across the design system. Use a deep, atmospheric background (not Mist White) so the site keeps cinematic depth.

### Color role mapping

| Role | Token | Hex | Notes |
|---|---|---|---|
| Base background | `--color-void` | `#2C2C2A` Charcoal | Deep neutral, replaces botanical green |
| Deeper ink | `--color-ink` | `#1F1F1D` | Slightly darker Charcoal for layering |
| Surface / cards | `--color-ash` | `#7A5A47` Wet Earth | Warm earthy surface tone |
| Foreground (text) | `--color-bone` / `--color-paper` | `#F4F1EB` Mist White | Primary on-dark text |
| Primary accent | `--color-ember` | `#5D7258` Tea Leaf | Replaces rose; used for CTAs, hover underlines |
| Hover / soft accent | `--color-flare` | `#A89D90` River Stone | Muted highlight on hover |
| Secondary accent | `--color-ochre` | `#7D9DA8` Teesta Blue | Editorial rules, "01 / Welcome" labels, scroll line |
| Muted text | `--color-dust` | `#A89D90` River Stone | Body muted, captions |
| Pop accents | `--color-electric`, `--color-violet` | derived from Teesta Blue + Tea Leaf | Subtle tints only |

### Files to edit

1. **`src/styles.css`** — only file with hex colors:
   - Update `@theme inline` block with the new hex values for every `--color-*` token above.
   - Update `:root` shadcn vars: `--background: #2C2C2A`, `--foreground: #F4F1EB`, `--card/popover: #7A5A47`, `--primary: #5D7258`, `--accent: #7D9DA8`, `--muted-foreground: #A89D90`, `--border/input: #7A5A47` (or a subtle charcoal variant), `--ring: #5D7258`.
   - Update `body` background to `--color-void` (Charcoal).
   - Update `.hero-conic` gradient stops to use Charcoal + Tea Leaf + Teesta Blue tints (keeps the rotating depth).
   - Update `::selection` to Tea Leaf bg / Mist White fg.

2. **`mem/index.md`** — replace the "Glow" Core memory with the Teesta palette mapping so future work uses the same tokens.

### Out of scope

- No component file edits — every component already reads from `var(--color-*)` tokens, so the palette swap flows through automatically.
- No layout, typography, or content changes.
- No changes to images, products, or copy.

### Verification

- Reload the home page and confirm: Charcoal background, Mist White text, Tea Leaf CTA hover/underline, Teesta Blue "— 01 / Welcome" label and scroll line, Wet Earth marquee strip, River Stone muted body copy.
