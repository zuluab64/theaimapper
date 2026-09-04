# The AIMapper — Brand Outline

Quick-reference brand sheet for **The AIMapper** (theaimapper.com).
Values are the source of truth from the site's stylesheet (`css/style.css`).

> **Updated July 2026** to the design-handoff direction: Inter across the board (Plus Jakarta Sans retired), IBM Plex Mono added for framework/data tags, secondary accent moved from Indigo to **Route Blue**, and two signature motion effects (animated gradient-ring CTA + cursor spotlight).

---

## Fonts

| Use | Font | Weights | Source |
|---|---|---|---|
| **Headings / logo** | Inter | 400, 500, 600, 700, 800 | Google Fonts |
| **Body / UI** | Inter | 400, 500, 600, 700 | Google Fonts |
| **Framework tags / data** | IBM Plex Mono | 500 | Google Fonts |

Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
Mono fallback: `ui-monospace, "SFMono-Regular", monospace`

- Headings are Inter **800** with `letter-spacing: -0.02em` (the "tight" headline feel).
- Use IBM Plex Mono for the M.A.P. framework tag and any code/data-style labels, e.g. `M.A.P. — Measure · Analyze · Prescribe`.

Google Fonts embed:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
```

---

## Core Brand Colors

| Name | Hex | Use |
|---|---|---|
| **Gold** | `#F5B40E` | Primary brand / buttons / accents |
| **Gold Bright** | `#FACC15` | Hover, highlights, gradient start |
| **Route Blue** | `#5B9DDF` | Secondary accent (from design handoff `oklch(0.68 0.12 250)`) |
| **Route Blue Soft** | `#8BBAEA` | Eyebrows, soft accents |
| **Deep Navy** | `#0A0E1A` | Main background |

> **Note:** In `css/style.css` the secondary-accent CSS variables are still named `--indigo` / `--indigo-soft` for compatibility, but their values are now Route Blue. The old Indigo `#6366F1` has been retired.

---

## Full Palette

### Dark theme
| Name | Hex | Use |
|---|---|---|
| Background | `#0A0E1A` | Page background |
| Background 2 | `#0D1326` | Gradient partner |
| Card surface | `#141B2E` | Card backgrounds |
| Raised surface | `#1B2340` | Hover / raised |
| Border | `#243049` | Hairline borders |
| Text primary | `#F4F6FB` | Main text |
| Text muted | `#9AA4BF` | Secondary text |
| Text dim | `#6F7A96` | Tertiary / labels |

### Light sections
| Name | Hex | Use |
|---|---|---|
| Background | `#FFFFFF` | Light section bg |
| Text | `#0F1422` | Text on light |
| Muted text | `#4A5568` | Secondary on light |
| Border | `#E6E9F2` | Borders on light |

---

## Gradients

- **Brand text gradient** (gold → Route Blue, ~100°): `#FACC15 → #F5B40E → #8BBAEA → #5B9DDF`
  - Used on highlighted headline words (`.gradient-text`).
  - CSS: `linear-gradient(100deg, #FACC15 0%, #F5B40E 25%, #8BBAEA 75%, #5B9DDF 100%)`
- **CTA band:** now a **dark-navy** surface with a soft Route-Blue radial glow (the old purple gradient band was retired). The gold CTA sits on the navy.

---

## Signature Motion

Two effects define the brand's interactive feel. Both respect `prefers-reduced-motion`.

1. **Animated gradient-ring CTA** (`.btn--ring`) — the primary call-to-action. A gold button wrapped in a 3px gradient border (gold → Route Blue) that flows around the ring on a slow, calm loop (~9s), plus a gentle gold+blue glow that breathes (~7s). Reserved for the hero and CTA-band buttons — not every button.
2. **Cursor-follow spotlight** (`.card`) — feature cards render a soft Route-Blue radial glow that follows the cursor (`--mx` / `--my` custom properties set in `js/script.js`).

---

## Logo

- **Wordmark:** The AI**Mapper** — "Mapper" in Gold `#F5B40E`, the rest in white (`#F4F6FB`).
- **Mark:** gold rounded square (`#F5B40E`) containing a dark lightning bolt.
- Logo font: Inter, weight 800.

---

## Voice & Tone

- Plain-spoken, not jargon-heavy
- Calm authority
- Guide, not hype-man
- Business outcomes over tech specs

---

## Quick Copy/Paste

**Primary swatches:** `#F5B40E` `#FACC15` `#5B9DDF` `#8BBAEA` `#0A0E1A` `#F4F6FB`

**Fonts:** Inter (headings + body) · IBM Plex Mono (framework/data tags)
