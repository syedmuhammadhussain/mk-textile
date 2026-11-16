# mk-textile

Static website for MK Textile Service — independent textile inspection and factory assessment services in Pakistan.

Plain HTML, one stylesheet, one script. No framework and no build step is needed to deploy.

## Structure

- `*.html` — the 25 generated pages (services, Knowledge Centre guides, draft legal pages)
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

- WhatsApp number and enquiry backend URL — `CONFIG` at the top of `assets/js/main.js`
- Final company logo and genuine inspection photographs
- Legal review of the Privacy Policy and Terms pages (drafts, marked `noindex`)

Until the PHP/MySQL enquiry backend exists, the enquiry form validates input and then opens the visitor's email app addressed to info@mktextileservice.com. Nothing is stored.

Not built yet (later phases of the specification): enquiry database and admin panel, seven-language versions, cookie preference banner.

## Deploy

Import the repository in Vercel as a static site: framework preset "Other", no build command, output directory the repository root.
