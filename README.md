# AIMapper — theaimapper.com

A static, SEO-friendly marketing site for **AIMapper** (strategy-led AI implementation).
Built with semantic HTML5, one CSS file, and a tiny bit of vanilla JavaScript — no frameworks.

## Pages
| File | Page |
|------|------|
| `index.html` | Home / landing page |
| `approach.html` | Our Approach — M.A.P. Framework & D.R.I.V.E. Process |
| `services.html` | Services & Pricing — three tiers |
| `contact.html` | Contact — free session booking form |

## Structure
```
theaimapper/
├── index.html  approach.html  services.html  contact.html
├── css/style.css      # all styling + brand tokens
├── js/script.js       # mobile nav toggle only
├── favicon.svg        # placeholder brand mark
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local preview
Open `index.html` directly in a browser, or run a tiny server:
```bash
cd theaimapper
python3 -m http.server 8000
# visit http://localhost:8000
```

## Before going live — replace the placeholders
Search the project for `Replace with` / `NOTE:` comments. Key items:
- **Booking form** (`contact.html`) needs a handler. Easiest: point the `<form action>` at a
  free service like Formspree/Basin, or swap the form for an embedded Calendly widget.
- **Social links** in the footer (`href="#"`) → your real LinkedIn / X URLs.
- **Testimonials & client headshots** — currently placeholder initials avatars.
- **Open Graph image** — add `images/og-image.jpg` (1200×630) for social sharing.
- **Domain** — `canonical`, `og:url`, and `sitemap.xml` already assume `https://www.theaimapper.com`.

## Deploy
See the chat instructions for GitHub + Vercel + custom-domain setup.
This is a pure static site, so it deploys with zero build configuration.
