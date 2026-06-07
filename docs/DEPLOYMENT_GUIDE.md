# Deployment Guide — Noble Aristocrat Photography

This is a fully static site (HTML/CSS/JS). No build step or server is required.

---

## Option A — Vercel (Recommended)
1. Create a free account at https://vercel.com
2. Click **Add New → Project** and import your repository, **or** drag-and-drop the project folder.
3. Framework preset: **Other** (no build command needed).
4. Click **Deploy**. Your site is live in seconds with HTTPS.
5. (Optional) Add a custom domain under **Settings → Domains**.

### Vercel CLI
```bash
npm i -g vercel
cd photography-company
vercel
```

## Option B — Netlify
1. Go to https://app.netlify.com
2. Drag-and-drop the project folder onto the dashboard.
3. Done — your site is live. Configure a custom domain under **Domain settings**.

## Option C — GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: `main` branch, root folder. Save.
4. Your site publishes at `https://<username>.github.io/<repo>/`.

---

## Pre-Deployment Checklist
- [ ] Update `WHATSAPP_NUMBER` in `index.html` (international format, no `+`).
- [ ] Replace contact details (address, phone, email) in Contact + Footer.
- [ ] Update social media links (`href="#"`) with real profiles.
- [ ] Swap demo images for your own under `assets/images/`.
- [ ] Confirm meta title/description for SEO.
- [ ] Test the booking form opens WhatsApp correctly.

## Post-Deployment
- Submit your sitemap to Google Search Console.
- Run a Lighthouse audit (aim for 95+).
- Verify mobile responsiveness on real devices.
- Enable HTTPS (automatic on Vercel/Netlify/GitHub Pages).
