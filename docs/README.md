# Noble Aristocrat Photography — Luxury Website

A world-class, single-page luxury photography company website built with **HTML5, CSS3 and Vanilla JavaScript (ES6+)** only. No frameworks, no build tools — open and run.

> Developed by **Jalixon** — https://jalixon.vercel.app/

---

## ✦ Project Overview

Noble Aristocrat Photography is a premium, cinematic website designed to feel like a $50M+ luxury brand. It communicates professionalism, trust, creativity and high-end photography expertise through elegant typography, generous spacing, gold accents and subtle, tasteful motion.

## ✦ Features

- **Premium splash screen** with logo, tagline, loading animation & smooth fade-out
- **Glassmorphism sticky navigation** with scroll effects, scroll-spy & mobile menu
- **Full-screen cinematic hero** with background slider, Ken-Burns zoom & parallax
- **About** section with storytelling, mission/vision, why-choose-us & animated counters
- **Services** premium cards with hover reveal interactions
- **Portfolio** gallery with category filtering, masonry layout, lightbox & zoom
- **CEO spotlight** with biography, achievements, signature element & social links
- **Testimonials** carousel with client photos, ratings & smooth transitions
- **AI Chatbot (Aria)** — rule-based, frontend-only, 24/7, FAQ + booking guidance
- **Floating WhatsApp button** with pre-filled professional message
- **Booking form** that generates a structured WhatsApp message (no backend)
- **Contact**, **Social media** and a **premium footer**
- Fully **responsive**, **SEO-optimised** and **accessibility-conscious**

## ✦ Folder Structure

```
/photography-company
├── index.html              # Entire site (HTML + CSS + JS, fully commented)
├── css/style.css           # (Reference) styling — embedded in index.html here
├── js/
│   ├── app.js              # Core interactions
│   ├── chatbot.js          # AI assistant logic
│   └── booking.js          # Booking → WhatsApp logic
├── assets/images/          # logo, ceo, hero, portfolio, services, team
├── docs/                   # Documentation
└── screenshots/            # Preview images
```

> **Note:** For this single-file deployment, all CSS and JS are embedded in `index.html` with clearly labelled sections, so the site runs anywhere with zero setup.

## ✦ Installation

1. Download or clone the project.
2. Open `index.html` in any modern browser. That's it!

Optionally serve locally:
```bash
npx serve .
# or
python -m http.server 8000
```

## ✦ Deployment

Deploy to any static host (no server logic required):
- **Vercel:** drag-and-drop or `vercel` CLI
- **Netlify:** drag-and-drop the folder
- **GitHub Pages:** push and enable Pages

See `DEPLOYMENT_GUIDE.md` for step-by-step instructions.

## ✦ Customization

| What | Where |
|------|-------|
| Brand colours / fonts | `:root` CSS variables in `index.html` |
| WhatsApp number | `WHATSAPP_NUMBER` constant in the script |
| Portfolio images | `portfolio` array in JS |
| Testimonials | `testimonials` array in JS |
| Chatbot answers | `KB` knowledge-base array in JS |
| Contact details | Contact & footer sections in HTML |

---

© Noble Aristocrat Photography. Crafted with devotion.
