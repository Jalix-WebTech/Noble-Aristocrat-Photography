# SDLC Documentation — Noble Aristocrat Photography

A walkthrough of the Software Development Life Cycle followed to build this luxury website.

---

## 1. Planning Phase
- **Goal:** A luxury, single-page photography website that feels like a $50M+ brand.
- **Constraints:** HTML5 + CSS3 + Vanilla JS only. No frameworks, no backend.
- **Deliverables:** `index.html`, documentation, asset structure.
- **Timeline:** Splash → Nav → Hero → content sections → widgets → docs.

## 2. Requirement Analysis
**Functional requirements**
- Splash screen, sticky glass nav, hero slider, about + counters, services, portfolio (filter + lightbox), CEO, testimonials, AI chatbot, WhatsApp button, booking → WhatsApp, contact, social, footer.

**Non-functional requirements**
- Lighthouse 95+, mobile-friendly, SEO, fast loading, accessible (ARIA, keyboard support), maintainable & well-commented.

## 3. Design Decisions
- **Aesthetic:** Inspired by Apple, Leica, National Geographic — deep near-black canvas, warm ivory text, single gold accent.
- **Typography:** Cormorant Garamond (serif elegance) + Jost (clean sans) for hierarchy.
- **Motion:** Restraint over spectacle — fade/slide reveals, Ken-Burns hero, hover micro-interactions only.
- **Layout:** Generous whitespace and a 1240px content rhythm to convey luxury.
- **Architecture:** Design tokens via CSS variables; data-driven portfolio/testimonials/chatbot for easy extension.

## 4. Implementation Process
- Built mobile-first, semantic HTML5 structure.
- Centralised theming with `:root` variables.
- JavaScript modularised into logical blocks (splash, nav, hero, reveal, counters, portfolio, lightbox, testimonials, WhatsApp, booking, chatbot).
- `IntersectionObserver` used for performant scroll reveals & counters.
- Booking and WhatsApp use `wa.me` deep links — zero backend.

## 5. Testing Process
- **Cross-browser:** Chrome, Firefox, Safari, Edge.
- **Responsive:** 360px → 1440px+ breakpoints verified.
- **Functional:** Filtering, lightbox keyboard nav, chatbot keyword matching, form validation, WhatsApp message formatting.
- **Accessibility:** ARIA labels, focusable controls, keyboard support for menu/lightbox.
- **Performance:** Lazy-loaded images, compressed assets, minimal JS.

## 6. Deployment Strategy
- Static hosting (Vercel / Netlify / GitHub Pages).
- No build step — direct file deploy.
- Add custom domain + HTTPS via host dashboard.

## 7. Maintenance Plan
- Update portfolio/testimonials via JS data arrays.
- Refresh chatbot knowledge base periodically.
- Monitor analytics (future enhancement) and broken-link checks.
- Quarterly content + dependency review (fonts/CDN).
