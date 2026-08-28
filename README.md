# BINGKAI Studio — Landing Page

A static landing page (plain HTML/CSS/JS, no build step) for a creative
agency offering social media management, branding & motion graphics, and
video production.

## Folder contents
```
index.html    → page structure & content
styles.css    → all styling & design
script.js     → interactions (timecode, accordion, scroll animations)
```

## How to deploy to Vercel

### Option 1 — Vercel CLI (fastest)
1. Install the Vercel CLI (one time): `npm i -g vercel`
2. Go into this folder in your terminal: `cd bingkai-landing`
3. Run: `vercel`
4. Follow the prompts (log in / sign up if needed), choose a new project.
5. To deploy to production: `vercel --prod`

### Option 2 — GitHub + Vercel dashboard (no CLI)
1. Create a new GitHub repository and upload the three files above
   (`index.html`, `styles.css`, `script.js`) to the repo root.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Select that repository. Vercel automatically detects it as a static
   site — no build command or output directory settings needed.
4. Click **Deploy**. Done in about 30 seconds.

### Option 3 — drag & drop
1. Go to [vercel.com/new](https://vercel.com/new).
2. Drag the `bingkai-landing` folder straight onto the page.

## What to replace before publishing
- **Agency name**: currently uses the placeholder name "BINGKAI" — replace
  it across all files (search for "BINGKAI" / "Bingkai") if you want a
  different name.
- **Contact info**: the email (`hello@bingkaistudio.com`) and WhatsApp
  number in the CTA and footer sections (`index.html`, search for `mailto:`
  and `wa.me`).
- **Work/Portfolio**: the "Work" section currently uses generic sample
  projects — replace the titles, descriptions, and ideally real
  thumbnails/videos.
- **Testimonial**: replace the placeholder quote in the testimonial section
  with a real client testimonial.
- **Social links**: fill in the `href="#"` placeholders in the footer with
  your actual Instagram, TikTok, and LinkedIn links.

## Custom domain on Vercel
After deploying, open the project in the Vercel dashboard → **Settings →
Domains** → add your domain (e.g. `bingkaistudio.com`) and point your DNS
according to the instructions shown there.
