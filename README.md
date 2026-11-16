# mk-textile

Static website for MK Textile Service — independent textile inspection and factory assessment services in Pakistan.

Plain HTML, one stylesheet, one script. No framework and no build step is needed to deploy.

## Structure

- `*.html` — the 11 generated pages
- `assets/css/style.css` — styles
- `assets/js/main.js` — navigation, enquiry form, sample-report selection
- `build.mjs` — generator that writes the pages (header, footer and navigation live here once)
- `vercel.json` — clean URLs on Vercel (`/garment-inspection` instead of `/garment-inspection.html`)

## Editing

Edit content and shared layout in `build.mjs`, then rebuild:

```bash
node build.mjs
```

Do not edit the generated `.html` files by hand; a rebuild overwrites them.

## Pending business details

Placeholders are used until these are confirmed:

- Business email, WhatsApp number and enquiry backend URL — `CONFIG` at the top of `assets/js/main.js`
- Domain — `SITE_URL` in `build.mjs` (enables canonical URLs and `sitemap.xml`)
- Business address and approved logo

The enquiry form validates input but does not send anything until `formEndpoint` or `email` is set.

## Deploy

Import the repository in Vercel as a static site: framework preset "Other", no build command, output directory the repository root.
