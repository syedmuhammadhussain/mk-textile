// MK Textile Service — static site generator.
// Run:  node build.mjs
// Writes the plain .html pages next to this file. Header, footer, navigation
// and the contact widget live here once, so edit them here and rebuild rather
// than editing the generated pages by hand.

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

// Set once the domain is confirmed (no trailing slash), e.g. "https://www.example.com".
// When set, canonical URLs, sitemap.xml and the sitemap line in robots.txt are generated.
const SITE_URL = '';
const SITE = 'MK Textile Service';

/* ---------- icons (24px line icons) ---------- */
const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  box: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  report: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
};
const icon = (name, cls = '') =>
  `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const arrow = icon('arrow', 'icon--arrow');

// Text emblem placeholder — replace with the approved circular MK emblem when supplied.
const emblem = `<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#0E2A52"/><circle cx="24" cy="24" r="19.5" fill="none" stroke="#16B6C9" stroke-width="1.2"/><text x="24" y="29.5" text-anchor="middle" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="15" font-weight="800" letter-spacing=".5" fill="#fff">MK</text></svg>`;

/* ---------- shared data ---------- */
const SERVICES = [
  { key: 'garment', file: 'garment-inspection.html', icon: 'shirt', name: 'Garment Inspection', short: 'Apparel, denim, knitwear, sportswear, socks &amp; hosiery.' },
  { key: 'fabric', file: 'fabric-material-inspection.html', icon: 'layers', name: 'Fabric &amp; Material Inspection', short: 'Fabric rolls, GSM, shade, construction and trims.' },
  { key: 'home-textile', file: 'home-textile-inspection.html', icon: 'bed', name: 'Home Textile Inspection', short: 'Towels, bedding, curtains, blankets and kitchen textiles.' },
  { key: 'packaging', file: 'packaging-shipment-inspection.html', icon: 'box', name: 'Packaging &amp; Shipment Inspection', short: 'Packing, labels, cartons, quantities and container loading.' },
];
const FACTORY = { key: 'factory-assessment', file: 'factory-assessment.html', icon: 'factory', name: 'Factory Assessment &amp; Quality Audit', short: 'Capability, quality management and production readiness.' };

const REPORTS = [
  ['inline-garment', 'In-Line Garment Inspection Report', 'Quality during ongoing production'],
  ['final-garment', 'Final Garment Inspection Report', 'Completed goods against agreed criteria'],
  ['dupro', 'DUPRO Inspection Report', 'During-production check of bulk quality'],
  ['fabric', 'Fabric Inspection Report', 'Roll-wise findings and defect records'],
  ['home-textile', 'Home Textile Inspection Report', 'Product-wise findings and measurements'],
  ['packaging-shipment', 'Packaging &amp; Shipment Inspection Report', 'Packing, cartons, quantity and loading'],
  ['factory-assessment', 'Factory Assessment / Quality Audit Report', 'Capability, quality systems and CAPA'],
];

const enquiry = (service, reports) =>
  `contact.html?service=${service}${reports ? '&amp;reports=' + reports : ''}#enquiry`;

/* ---------- layout ---------- */
const NAV = [
  ['index.html', 'Home'],
  ['inspection-services.html', 'Inspection Services'],
  ['factory-assessment.html', 'Factory Assessment'],
  ['sample-reports.html', 'Sample Reports'],
  ['about.html', 'About Us'],
  ['knowledge-centre.html', 'Knowledge Centre'],
  ['contact.html', 'Contact'],
];

function header(active) {
  const items = NAV.map(([href, label]) => {
    const current = href === active ? ' aria-current="page"' : '';
    if (href !== 'inspection-services.html') return `<li><a href="${href}"${current}>${label}</a></li>`;
    const inSection = SERVICES.some((s) => s.file === active);
    return `<li class="has-sub${inSection ? ' is-active' : ''}">
          <a href="${href}"${current}>${label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-label="Show inspection services">${icon('chevron')}</button>
          <ul class="sub">
            ${SERVICES.map((s) => `<li><a href="${s.file}"${s.file === active ? ' aria-current="page"' : ''}>${icon(s.icon)}<span><strong>${s.name}</strong><small>${s.short}</small></span></a></li>`).join('\n            ')}
            <li><a class="sub-all" href="inspection-services.html">All inspection services ${arrow}</a></li>
          </ul>
        </li>`;
  }).join('\n        ');

  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="${SITE} — home">
      ${emblem}
      <span class="brand-text"><strong>${SITE}</strong><small>Inspection &amp; Factory Assessment</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">${icon('menu', 'icon--open')}${icon('close', 'icon--close')}</button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
        ${items}
      </ul>
      <a class="btn btn--primary nav-cta" href="contact.html#enquiry">Get in Touch</a>
    </nav>
  </div>
</header>`;
}

const footer = `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="index.html" aria-label="${SITE} — home">
        ${emblem}
        <span class="brand-text"><strong>${SITE}</strong><small>Inspection &amp; Factory Assessment</small></span>
      </a>
      <p class="footer-about">Independent textile inspection and factory assessment services in Pakistan.</p>
    </div>
    <nav aria-label="Quick links">
      <h2>Quick Links</h2>
      <ul>
        ${NAV.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    <nav aria-label="Services">
      <h2>Our Services</h2>
      <ul>
        ${[...SERVICES, FACTORY].map((s) => `<li><a href="${s.file}">${s.name}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    <div class="footer-contact">
      <h2>Contact</h2>
      <ul>
        <li><a href="contact.html#enquiry">${icon('mail')}Email Us</a></li>
        <li><a href="contact.html#enquiry" data-whatsapp>${icon('chat')}WhatsApp</a></li>
        <li><a href="sample-reports.html">${icon('report')}Request Sample Reports</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; <span data-year>2026</span> ${SITE}. All rights reserved.</span>
    <span>Inspection Services in Pakistan &middot; Factory Assessment &amp; Quality Audit</span>
  </div>
</footer>`;

const widget = `<details class="cw">
  <summary aria-label="Contact us">${icon('chat', 'icon--open')}${icon('close', 'icon--close')}Contact Us</summary>
  <div class="cw-panel">
    <h2>Contact Us</h2>
    <p>Send an enquiry or chat with us directly.</p>
    <a class="btn btn--primary" href="contact.html#enquiry">${icon('mail')}Email Us</a>
    <a class="btn btn--wa" href="contact.html#enquiry" data-whatsapp>${icon('chat')}WhatsApp</a>
  </div>
</details>`;

function page({ file, title, description, body, jsonld }) {
  const canonical = SITE_URL ? `\n<link rel="canonical" href="${SITE_URL}/${file === 'index.html' ? '' : file}">` : '';
  const ld = jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">${canonical}
<meta name="theme-color" content="#0E2A52">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap"></noscript>
<link rel="stylesheet" href="assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
<script src="assets/js/main.js" defer></script>${ld}
</head>
<body>
${header(file)}
<main id="main">
${body}
</main>
${footer}
${widget}
</body>
</html>
`;
  writeFileSync(join(OUT, file), html);
  return file;
}

/* ---------- reusable blocks ---------- */
const crumbs = (trail) => `<nav aria-label="Breadcrumb"><ol class="crumbs">
        <li><a href="index.html">Home</a></li>
        ${trail.map(([label, href]) => (href ? `<li><a href="${href}">${label}</a></li>` : `<li aria-current="page">${label}</li>`)).join('\n        ')}
      </ol></nav>`;

const pageHero = ({ trail, eyebrow, h1, lead, iconName, buttons = '' }) => `<section class="page-hero">
    <div class="container">
      ${crumbs(trail)}
      <div class="page-hero-inner">
        ${iconName ? `<span class="icon-tile">${icon(iconName)}</span>` : ''}
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h1>${h1}</h1>
          <p class="lead">${lead}</p>
          ${buttons ? `<div class="btn-row">${buttons}</div>` : ''}
        </div>
      </div>
    </div>
  </section>`;

const list = (items, cls) => `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const ctaBand = (h2, p, buttons) => `<section class="section section--tight">
    <div class="container">
      <div class="cta-band reveal">
        <div>
          <h2>${h2}</h2>
          <p>${p}</p>
        </div>
        <div class="btn-row">${buttons}</div>
      </div>
    </div>
  </section>`;

const defaultCta = ctaBand(
  'Discuss your inspection requirements',
  'Tell us the product, the service you need and your preferred inspection date. We will reply to your enquiry by email.',
  `<a class="btn btn--teal" href="contact.html#enquiry">Get in Touch ${arrow}</a><a class="btn btn--ghost" href="sample-reports.html">Request Sample Reports</a>`
);

const serviceLd = (name, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: name,
  description,
  provider: { '@type': 'Organization', name: SITE },
  areaServed: { '@type': 'Country', name: 'Pakistan' },
});

const otherServices = (currentKey) => `<div class="aside-links">
          <h2>Other services</h2>
          <ul>
            ${[...SERVICES, FACTORY].filter((s) => s.key !== currentKey).map((s) => `<li><a href="${s.file}">${s.name}${icon('arrow')}</a></li>`).join('\n            ')}
          </ul>
        </div>`;

/* Service detail page: sections is an array of HTML strings, each a <section>. */
function servicePage({ svc, title, description, intro, eyebrow, requestLabel, sampleLabel, sampleReports, sections, parent = true }) {
  const plainName = svc.name.replace(/&amp;/g, '&');
  return page({
    file: svc.file,
    title,
    description,
    jsonld: serviceLd(plainName, description),
    body: `${pageHero({
      trail: parent ? [['Inspection Services', 'inspection-services.html'], [svc.name]] : [[svc.name]],
      eyebrow,
      h1: svc.name,
      lead: intro,
      iconName: svc.icon,
    })}
  <section class="section">
    <div class="container detail">
      <div class="detail-main">
        ${sections.join('\n        ')}
      </div>
      <aside class="detail-aside">
        <div class="aside-card">
          <h2>Request this service</h2>
          <p>The enquiry form opens with this service already selected. You can change it if needed.</p>
          <a class="btn btn--primary btn--block" href="${enquiry(svc.key)}">${requestLabel} ${arrow}</a>
          <a class="btn btn--outline btn--block" href="${enquiry('sample-report', sampleReports)}">${icon('report')}${sampleLabel}</a>
          <a class="btn btn--outline btn--block" href="contact.html">Contact Us</a>
        </div>
        ${otherServices(svc.key)}
      </aside>
    </div>
  </section>
  ${defaultCta}`,
  });
}

const built = [];

/* ================= HOME ================= */
const tickerItems = ['Apparel', 'Denim', 'Woven Garments', 'Knitwear', 'Sportswear', 'Socks &amp; Hosiery', 'Children&rsquo;s Wear', 'Fabric Rolls', 'Trims &amp; Accessories', 'Towels', 'Bedding', 'Curtains', 'Blankets', 'Quilts', 'Kitchen Textiles'];
const tickerList = (hidden) => `<ul${hidden ? ' aria-hidden="true"' : ''}>${tickerItems.map((t) => `<li>${t}</li>`).join('')}</ul>`;

built.push(page({
  file: 'index.html',
  title: 'Textile Inspection Services in Pakistan | MK Textile Service',
  description: 'Independent textile inspection and factory assessment services in Pakistan for garments, fabrics, home textiles and related products.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE,
    description: 'Independent textile inspection and factory assessment services in Pakistan.',
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    ...(SITE_URL ? { url: SITE_URL + '/' } : {}),
  },
  body: `<section class="hero">
    <svg class="hero-threads" viewBox="0 0 1440 360" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
      <path d="M0 300C240 220 420 340 720 250s480-190 720-120"/>
      <path d="M0 325C260 250 440 355 740 275s470-180 700-120" opacity=".7"/>
      <path d="M0 350C280 280 460 370 760 300s460-170 680-120" opacity=".45"/>
    </svg>
    <div class="container hero-grid">
      <div>
        <p class="eyebrow eyebrow--light">Independent &middot; Impartial &middot; Evidence-based</p>
        <h1>Textile Inspection Services <span>in Pakistan</span></h1>
        <p class="lead">Independent and professional inspection and factory assessment services for garments, fabrics, home textiles and related products.</p>
        <div class="btn-row">
          <a class="btn btn--teal" href="inspection-services.html">Our Services ${arrow}</a>
          <a class="btn btn--ghost" href="contact.html">Contact Us</a>
        </div>
        <ul class="hero-points">
          <li>${icon('check')}Garments, fabrics and home textiles</li>
          <li>${icon('check')}Pre-production to pre-shipment</li>
          <li>${icon('check')}Clear, evidence-based reports</li>
        </ul>
      </div>
      <div class="hero-card">
        <div class="hero-card-head">
          <div>
            <h2>Inspection coverage</h2>
            <p>From first materials to shipment</p>
          </div>
          ${icon('clipboard')}
        </div>
        <ul class="stage-list">
          <li><span class="code">PPC</span>Pre-Production Check${icon('check')}</li>
          <li><span class="code">IPC</span>Initial Production Check${icon('check')}</li>
          <li><span class="code">DUPRO</span>During Production Check${icon('check')}</li>
          <li><span class="code">FRI</span>Final Random Inspection${icon('check')}</li>
          <li><span class="code">PSI</span>Pre-Shipment Inspection${icon('check')}</li>
        </ul>
        <p class="hero-card-foot">Plus 100% inspection, re-inspection and in-line quality checks.</p>
      </div>
    </div>
  </section>

  <div class="ticker" aria-label="Products we inspect">
    <div class="ticker-track">${tickerList(false)}${tickerList(true)}</div>
  </div>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Where to start</p>
        <h2>Find what you need in one step</h2>
        <p>Choose a route below. Detailed scope, checking points and deliverables are on each service page.</p>
      </div>
      <div class="grid grid--4">
        <a class="card reveal" href="inspection-services.html">
          <span class="icon-tile">${icon('search')}</span>
          <h3>Inspection Services</h3>
          <p>Explore garment, fabric and material, home textile, and packaging and shipment inspection.</p>
          <span class="link-arrow">View services ${arrow}</span>
        </a>
        <a class="card reveal" style="--d:70ms" href="factory-assessment.html">
          <span class="icon-tile">${icon('factory')}</span>
          <h3>Factory Assessment</h3>
          <p>Learn about factory capability, quality management and production readiness assessments.</p>
          <span class="link-arrow">View assessment ${arrow}</span>
        </a>
        <a class="card reveal" style="--d:140ms" href="sample-reports.html">
          <span class="icon-tile">${icon('report')}</span>
          <h3>Sample Reports</h3>
          <p>Choose the report type you would like to review and submit a private request.</p>
          <span class="link-arrow">Request a sample ${arrow}</span>
        </a>
        <a class="card reveal" style="--d:210ms" href="about.html">
          <span class="icon-tile">${icon('users')}</span>
          <h3>About Us</h3>
          <p>Learn about MK Textile Service, its approach and quality commitment.</p>
          <span class="link-arrow">About the company ${arrow}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Why MK Textile Service</p>
        <h2>Built on independence and clear reporting</h2>
      </div>
      <ul class="strengths reveal">
        <li>${icon('scale')}<div><h3>Independent Approach</h3><p>Impartial inspection, with findings reported as observed.</p></div></li>
        <li>${icon('users')}<div><h3>Experienced Team</h3><p>Textile and apparel quality specialists.</p></div></li>
        <li>${icon('shield')}<div><h3>Quality Focus</h3><p>From incoming material to final shipment.</p></div></li>
        <li>${icon('report')}<div><h3>Professional Reporting</h3><p>Clear, factual and evidence-based reports.</p></div></li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">How it works</p>
        <h2>From enquiry to report in four steps</h2>
      </div>
      <ol class="steps">
        <li class="reveal"><h3>Send your enquiry</h3><p>Tell us the product, the service you need and your preferred inspection date.</p></li>
        <li class="reveal" style="--d:70ms"><h3>Agree the scope</h3><p>Inspection criteria, sampling level and acceptance limits are agreed with you.</p></li>
        <li class="reveal" style="--d:140ms"><h3>On-site inspection</h3><p>The inspection or assessment is carried out against the agreed criteria.</p></li>
        <li class="reveal" style="--d:210ms"><h3>Receive your report</h3><p>Findings, defect classification and photographic evidence in one clear report.</p></li>
      </ol>
    </div>
  </section>
  ${defaultCta}`,
}));

/* ================= INSPECTION SERVICES OVERVIEW ================= */
const OVERVIEW = [
  {
    svc: SERVICES[0],
    intro: 'Independent quality inspections of apparel, denim and woven garments, knitwear, sportswear, socks and hosiery, and children&rsquo;s wear.',
    coverage: ['Apparel', 'Denim &amp; woven', 'Knitwear', 'Sportswear', 'Socks &amp; hosiery', 'Children&rsquo;s wear'],
    activities: ['Workmanship, stitching and seams', 'Measurements and tolerances', 'Shade, print, embroidery and trims', 'Packing and assortment'],
  },
  {
    svc: SERVICES[1],
    intro: 'Inspection of fabric rolls, construction, GSM, shade, dimensional performance, trims and accessories.',
    coverage: ['Woven fabric', 'Knitted fabric', 'Denim fabric', 'Trims &amp; accessories'],
    activities: ['Fabric roll inspection, Four-Point System where applicable', 'GSM and width verification', 'Shade and colour variation', 'Shrinkage and dimensional stability'],
  },
  {
    svc: SERVICES[2],
    intro: 'Inspection of towels, bedding, curtains, blankets, quilts, kitchen textiles and related home textile products.',
    coverage: ['Towels &amp; bathrobes', 'Bedding', 'Curtains', 'Blankets &amp; quilts', 'Kitchen textiles'],
    activities: ['Fabric quality and construction', 'Dimensions and tolerances', 'Stitching, colour and appearance', 'Set composition, assortment and packing'],
  },
  {
    svc: SERVICES[3],
    intro: 'Verification of packing, assortment, labels, cartons, quantities, shipping marks and container loading.',
    coverage: ['Finished-goods packing', 'Cartons', 'Labels &amp; barcodes', 'Container loading'],
    activities: ['Assortment and size ratios', 'Barcode and label verification', 'Carton markings and quantity verification', 'Container condition and loading supervision'],
  },
];

built.push(page({
  file: 'inspection-services.html',
  title: 'Inspection Services in Pakistan | Garment, Fabric, Home Textile | MK Textile Service',
  description: 'Four independent inspection services in Pakistan: garment, fabric and material, home textile, and packaging and shipment inspection.',
  body: `${pageHero({
    trail: [['Inspection Services']],
    eyebrow: 'Inspection Services',
    h1: 'Inspection Services in Pakistan',
    lead: 'Four inspection categories covering textile products from incoming material to loaded container. Open a service to review its scope, checking points and deliverables.',
  })}
  <section class="section">
    <div class="container">
      <div class="grid grid--2">
        ${OVERVIEW.map((o, i) => `<article class="card service-card reveal"${i % 2 ? ' style="--d:80ms"' : ''}>
          <div class="service-card-head"><span class="icon-tile">${icon(o.svc.icon)}</span><h2>${o.svc.name}</h2></div>
          <p>${o.intro}</p>
          <h3>Product coverage</h3>
          ${list(o.coverage, 'chips')}
          <h3>Key inspection activities</h3>
          ${list(o.activities, 'checks')}
          <a class="btn btn--primary" href="${o.svc.file}">View Details ${arrow}</a>
        </article>`).join('\n        ')}
      </div>
    </div>
  </section>
  ${ctaBand(
    'Need to evaluate a manufacturer?',
    'Factory Assessment &amp; Quality Audit is a separate service covering capability, quality management and production readiness.',
    `<a class="btn btn--teal" href="factory-assessment.html">Factory Assessment ${arrow}</a><a class="btn btn--ghost" href="contact.html#enquiry">Get in Touch</a>`
  )}`,
}));

/* ================= GARMENT ================= */
const STAGES = [
  ['PPC', 'Pre-Production Check', 'Review materials, specifications, samples, production readiness and quality requirements before bulk production.'],
  ['IPC', 'Initial Production Check', 'Check initial production output, workmanship, measurements and process setup.'],
  ['DUPRO', 'During Production Check', 'Monitor bulk production quality, defects, measurements and corrective actions.'],
  ['FRI', 'Final Random Inspection', 'Evaluate a selected sample of completed goods against agreed inspection criteria.'],
  ['PSI', 'Pre-Shipment Inspection', 'Verify shipment readiness, product quality, packing and shipping requirements.'],
  ['100%', '100% Inspection', 'Inspect every unit within the agreed inspection scope.'],
  ['RE', 'Re-Inspection', 'Verify corrections after an earlier inspection or rejection.'],
  ['IN-LINE', 'In-Line Quality Check', 'Monitor workmanship and quality during ongoing production.'],
];

built.push(servicePage({
  svc: SERVICES[0],
  title: 'Garment Inspection in Pakistan | PPC, DUPRO, FRI, PSI | MK Textile Service',
  description: 'Independent garment inspection in Pakistan for apparel, denim, knitwear, sportswear, socks and hosiery, from pre-production check to pre-shipment inspection.',
  eyebrow: 'Inspection Services',
  intro: 'Independent garment inspection services designed to evaluate product quality, workmanship, measurements, appearance and packing at different production stages.',
  requestLabel: 'Request Inspection Service',
  sampleLabel: 'Request Sample Inspection Report',
  sampleReports: 'final-garment',
  sections: [
    `<section class="reveal">
          <h2>Product coverage</h2>
          ${list(['Apparel and garments', 'Denim and woven garments', 'Knitwear', 'Sportswear', 'Socks and hosiery', 'Children&rsquo;s wear'], 'chips')}
        </section>`,
    `<section class="reveal">
          <h2>Inspection stages</h2>
          <p>Inspection can be arranged at one stage or at several stages of the same order.</p>
          <ul class="rows">
            ${STAGES.map(([code, name, text]) => `<li><strong><span class="code">${code}</span>${name}</strong><span>${text}</span></li>`).join('\n            ')}
          </ul>
        </section>`,
    `<section class="reveal">
          <h2>Main checking points</h2>
          ${list(['Appearance and workmanship', 'Stitching and seams', 'Measurements and tolerances', 'Fabric and material defects', 'Shade and colour consistency', 'Print, embroidery and trims', 'Labels and branding', 'Packing and assortment', 'Defect classification and results'], 'checks checks--2')}
        </section>`,
    `<section class="reveal">
          <h2>Reporting and deliverables</h2>
          <div class="panel">
            ${list(['Inspection summary', 'Defect details and classification', 'Photographic evidence', 'Measurement findings where applicable', 'Result against agreed criteria', 'Corrective-action observations where required'], 'checks checks--2')}
          </div>
        </section>`,
    `<section class="reveal">
          <div class="note">
            ${icon('info')}
            <div>
              <h3>AQL and sampling</h3>
              <p>The sampling level and acceptance criteria are agreed with the client for each inspection. There is no single universal setting applied to every order.</p>
            </div>
          </div>
        </section>`,
  ],
}));

/* ================= FABRIC ================= */
built.push(servicePage({
  svc: SERVICES[1],
  title: 'Fabric &amp; Material Inspection in Pakistan | Four-Point System | MK Textile Service',
  description: 'Fabric and material inspection in Pakistan: fabric rolls, Four-Point System, GSM, width, shade, shrinkage, spirality, trims and accessories.',
  eyebrow: 'Inspection Services',
  intro: 'Inspection of fabric and garment materials to identify quality variations and potential problems before they affect bulk production.',
  requestLabel: 'Request Fabric Inspection',
  sampleLabel: 'Request Sample Fabric Inspection Report',
  sampleReports: 'fabric',
  sections: [
    `<section class="reveal">
          <h2>Material coverage</h2>
          ${list(['Woven fabric', 'Knitted fabric', 'Denim fabric', 'Trims and accessories'], 'chips')}
        </section>`,
    `<section class="reveal">
          <h2>What is inspected</h2>
          ${list(['Fabric roll inspection, with the Four-Point System where applicable', 'Fabric construction and appearance', 'GSM and width verification', 'Shade and colour variation', 'Shrinkage and dimensional stability', 'Knitted fabric spirality', 'Fabric defects and defect mapping', 'Roll identification and lot segregation', 'Trims and accessories incoming inspection'], 'checks checks--2')}
        </section>`,
    `<section class="reveal">
          <h2>Reporting and deliverables</h2>
          <div class="panel">
            ${list(['Roll-wise findings', 'Defect records and photographs', 'Four-Point results where applicable', 'Shade and lot observations', 'GSM, width and dimensional results where checked', 'Overall summary'], 'checks checks--2')}
          </div>
        </section>`,
  ],
}));

/* ================= HOME TEXTILE ================= */
built.push(servicePage({
  svc: SERVICES[2],
  title: 'Home Textile Inspection in Pakistan | Towels, Bedding, Curtains | MK Textile Service',
  description: 'Home textile inspection in Pakistan for towels, bathrobes, bedsheets, duvet covers, curtains, blankets, quilts and kitchen textiles.',
  eyebrow: 'Inspection Services',
  intro: 'Product quality inspection for home textile products, covering appearance, construction, dimensions, workmanship, functional details and packing requirements.',
  requestLabel: 'Request Home Textile Inspection',
  sampleLabel: 'Request Sample Home Textile Report',
  sampleReports: 'home-textile',
  sections: [
    `<section class="reveal">
          <h2>Product coverage</h2>
          ${list(['Towels and bathrobes', 'Bedsheets', 'Pillowcases', 'Duvet covers', 'Curtains', 'Upholstery', 'Blankets', 'Quilts', 'Kitchen textiles'], 'chips')}
        </section>`,
    `<section class="reveal">
          <h2>Main checkpoints</h2>
          ${list(['Fabric quality and construction', 'GSM and material verification', 'Dimensions and tolerances', 'Stitching and seams', 'Colour and appearance', 'Printing, embroidery and embellishments', 'Specified functional checks', 'Labels and care instructions', 'Set composition, assortment and packing'], 'checks checks--2')}
        </section>`,
    `<section class="reveal">
          <h2>Reporting and deliverables</h2>
          <div class="panel">
            ${list(['Product-wise findings', 'Measurement results', 'Defect photographs', 'Packing and assortment findings', 'Summary against buyer requirements'], 'checks checks--2')}
          </div>
        </section>`,
  ],
}));

/* ================= PACKAGING ================= */
built.push(servicePage({
  svc: SERVICES[3],
  title: 'Packaging &amp; Shipment Inspection in Pakistan | Container Loading | MK Textile Service',
  description: 'Packaging and shipment inspection in Pakistan: packing, assortment, barcodes, labels, cartons, quantity verification and container loading supervision.',
  eyebrow: 'Inspection Services',
  intro: 'Inspection of finished-goods packing and shipment preparation to help verify order presentation, quantity, labelling and loading requirements.',
  requestLabel: 'Request Packaging / Shipment Inspection',
  sampleLabel: 'Request Sample Shipment Report',
  sampleReports: 'packaging-shipment',
  sections: [
    `<section class="reveal">
          <h2>What is verified</h2>
          ${list(['Packing quality and presentation', 'Assortment and size ratios', 'Barcode and label verification', 'Carton dimensions and condition', 'Carton markings and shipping marks', 'Quantity verification', 'Packing list and order-document checks', 'Container condition and loading supervision', 'Sealing and shipment confirmation'], 'checks checks--2')}
        </section>`,
    `<section class="reveal">
          <h2>Reporting and deliverables</h2>
          <div class="panel">
            ${list(['Packing findings', 'Barcode and labelling observations', 'Carton and quantity verification', 'Container photographs', 'Loading evidence', 'Shipment inspection summary'], 'checks checks--2')}
          </div>
        </section>`,
  ],
}));

/* ================= FACTORY ASSESSMENT ================= */
const AREAS = [
  ['Factory Profile', 'Company information, location, products and manufacturing background.'],
  ['Infrastructure', 'Buildings, machinery, production facilities and utilities.'],
  ['Production Capability', 'Capacity, production processes and available resources.'],
  ['Quality Management', 'Quality procedures, inspection systems, records and controls.'],
  ['Production Processes', 'Cutting, sewing, finishing, packing and other relevant operations.'],
  ['Compliance &amp; Workplace', 'Workplace conditions, safety practices and applicable requirements.'],
  ['Documentation', 'Production, quality, maintenance and operational records.'],
  ['CAPA Management', 'Corrective and preventive action systems and follow-up.'],
  ['Production Readiness', 'Ability to meet proposed product and order requirements.'],
];

built.push(servicePage({
  svc: FACTORY,
  parent: false,
  title: 'Factory Assessment &amp; Quality Audit in Pakistan | MK Textile Service',
  description: 'Factory assessment and quality audit in Pakistan: production capability, quality management, infrastructure, documentation, CAPA and production readiness.',
  eyebrow: 'Factory Assessment',
  intro: 'A structured assessment of manufacturing facilities to evaluate production capability, quality management, infrastructure, operational controls and readiness to meet buyer requirements.',
  requestLabel: 'Discuss Factory Assessment',
  sampleLabel: 'Request Sample Factory Assessment Report',
  sampleReports: 'factory-assessment',
  sections: [
    `<section class="reveal">
          <h2>Assessment areas</h2>
          <ul class="rows">
            ${AREAS.map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('\n            ')}
          </ul>
        </section>`,
    `<section class="reveal">
          <h2>Assessment workflow</h2>
          <ol class="steps steps--3">
            <li><h3>Planning and scope</h3><p>Planning and scope confirmation with the client.</p></li>
            <li><h3>Factory visit</h3><p>On-site visit and review of the facility.</p></li>
            <li><h3>Evaluation</h3><p>Evaluation against the agreed criteria.</p></li>
            <li><h3>Risks and gaps</h3><p>Risk and gap identification.</p></li>
            <li><h3>Assessment report</h3><p>Findings and evidence in a structured report.</p></li>
            <li><h3>CAPA follow-up</h3><p>Follow-up on corrective actions where agreed.</p></li>
          </ol>
        </section>`,
    `<section class="reveal">
          <h2>Report contents</h2>
          <div class="panel">
            ${list(['Factory profile', 'Assessment scope', 'Findings', 'Photographic evidence', 'Quality-system observations', 'Production capability', 'Risk observations', 'CAPA recommendations', 'Overall summary'], 'checks checks--2')}
          </div>
        </section>`,
    `<section class="reveal">
          <div class="note">
            ${icon('info')}
            <div>
              <h3>Scope and criteria</h3>
              <p>The exact scope and criteria, including any workplace, health and safety or specialised elements, are defined and agreed with the client before each assessment. The assessment is an independent evaluation and is not an accredited certification audit.</p>
            </div>
          </div>
        </section>`,
  ],
}));

/* ================= SAMPLE REPORTS ================= */
built.push(page({
  file: 'sample-reports.html',
  title: 'Request Sample Inspection Reports | MK Textile Service',
  description: 'Select the inspection or factory assessment report types you would like to review and submit a private sample-report request to MK Textile Service.',
  body: `${pageHero({
    trail: [['Sample Reports']],
    eyebrow: 'Sample Reports',
    h1: 'Request Sample Reports',
    lead: 'Select one or more report types you would like to review. Samples are shared privately after your request has been reviewed.',
    iconName: 'report',
  })}
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Step 1</p>
        <h2>Choose report types</h2>
      </div>
      <div data-report-picker class="reveal">
        <div class="report-grid">
          ${REPORTS.map(([value, name, hint]) => `<label class="report-option"><input type="checkbox" value="${value}"><span class="box">${icon('check')}</span><span class="txt"><strong>${name}</strong><small>${hint}</small></span></label>`).join('\n          ')}
        </div>
        <div class="report-bar">
          <p data-report-count aria-live="polite">Select at least one report type to continue.</p>
          <a class="btn btn--primary" data-report-go href="contact.html?service=sample-report#enquiry">Request Sample Reports ${arrow}</a>
        </div>
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">What happens next</p>
        <h2>How the request works</h2>
      </div>
      <ol class="steps">
        <li class="reveal"><h3>Select report types</h3><p>Choose one or more of the report types above.</p></li>
        <li class="reveal" style="--d:70ms"><h3>Complete the form</h3><p>The enquiry form opens with your selection filled in. Add your contact details and purpose.</p></li>
        <li class="reveal" style="--d:140ms"><h3>Request is reviewed</h3><p>MK Textile Service reviews each sample-report request.</p></li>
        <li class="reveal" style="--d:210ms"><h3>Sample shared privately</h3><p>An approved sample is shared with you directly.</p></li>
      </ol>
      <div class="note reveal" style="margin-top:28px">
        ${icon('shield')}
        <div>
          <h3>Confidentiality</h3>
          <p>Confidential client inspection reports are never published, and reports are not available as open downloads.</p>
        </div>
      </div>
    </div>
  </section>`,
}));

/* ================= ABOUT ================= */
built.push(page({
  file: 'about.html',
  title: 'About MK Textile Service | Independent Textile Inspection in Pakistan',
  description: 'MK Textile Service provides independent textile inspection and factory assessment services in Pakistan with clear, evidence-based reporting.',
  body: `${pageHero({
    trail: [['About Us']],
    eyebrow: 'About Us',
    h1: 'Independent inspection, clearly reported',
    lead: 'MK Textile Service provides independent textile inspection and factory assessment services in Pakistan.',
  })}
  <section class="section">
    <div class="container detail">
      <div class="detail-main prose">
        <section class="reveal">
          <h2>Company overview</h2>
          <p>MK Textile Service provides independent textile inspection and factory assessment services in Pakistan. We support buyers and businesses through structured quality inspections, manufacturing assessments and clear, evidence-based reporting across apparel, fabrics, home textiles and related products.</p>
        </section>
        <section class="reveal">
          <h2>Our independent approach</h2>
          <p>Each inspection or assessment is carried out against criteria agreed with the client in advance: the product specification, the sampling level and the acceptance limits. Findings are recorded as observed and supported with photographs and measurements, so the report can be relied on when making a decision about an order or a supplier.</p>
        </section>
        <section class="reveal">
          <h2>Quality and impartiality commitment</h2>
          ${list(['Inspection and assessment only, with no sourcing or buying role in the orders we inspect', 'Scope and acceptance criteria agreed before work starts', 'Findings reported factually, with supporting evidence', 'Client reports treated as confidential'], 'checks')}
        </section>
        <section class="reveal">
          <h2>Service coverage</h2>
          <p>Services are provided in Pakistan for international buyers and businesses, across four inspection categories and a separate factory assessment service.</p>
          <div class="grid grid--2" style="margin-top:22px">
            ${[...SERVICES, FACTORY].map((s) => `<a class="card" href="${s.file}"><span class="icon-tile">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.short}</p><span class="link-arrow">View details ${arrow}</span></a>`).join('\n            ')}
          </div>
        </section>
      </div>
      <aside class="detail-aside">
        <div class="aside-card">
          <h2>Discuss your inspection requirements</h2>
          <p>Send the product, service and preferred date through the enquiry form.</p>
          <a class="btn btn--primary btn--block" href="contact.html#enquiry">Discuss Your Requirements ${arrow}</a>
          <a class="btn btn--outline btn--block" href="sample-reports.html">${icon('report')}Request Sample Reports</a>
        </div>
      </aside>
    </div>
  </section>`,
}));

/* ================= KNOWLEDGE CENTRE ================= */
const TOPICS = [
  ['Common garment defects and their classification', 'garment-inspection.html', 'Garment Inspection'],
  ['Understanding AQL and inspection sampling', 'garment-inspection.html', 'Garment Inspection'],
  ['The Four-Point fabric inspection system explained', 'fabric-material-inspection.html', 'Fabric &amp; Material Inspection'],
  ['Shrinkage, spirality and dimensional stability', 'fabric-material-inspection.html', 'Fabric &amp; Material Inspection'],
  ['Quality checkpoints for towels and bedding', 'home-textile-inspection.html', 'Home Textile Inspection'],
  ['Common socks and hosiery defects', 'garment-inspection.html', 'Garment Inspection'],
  ['Carton, barcode and assortment verification', 'packaging-shipment-inspection.html', 'Packaging &amp; Shipment Inspection'],
  ['How a factory quality assessment works', 'factory-assessment.html', 'Factory Assessment'],
];
const FAQS = [
  ['Which products do you inspect?', 'Garments (apparel, denim and woven garments, knitwear, sportswear, socks and hosiery, children&rsquo;s wear), fabrics and materials, home textiles such as towels and bedding, and finished-goods packing and shipments.'],
  ['At which production stages can an inspection be carried out?', 'From the Pre-Production Check (PPC) through Initial Production Check (IPC), During Production Check (DUPRO), Final Random Inspection (FRI) and Pre-Shipment Inspection (PSI). 100% inspection, re-inspection and in-line quality checks are also available.'],
  ['How are the sampling level and AQL decided?', 'The sampling level and acceptance criteria are agreed with the client for each inspection. There is no single universal setting applied to every order.'],
  ['What does an inspection report include?', 'An inspection summary, defect details and classification, photographic evidence, measurement findings where applicable, the result against the agreed criteria and corrective-action observations where required.'],
  ['Can I see a sample report before booking?', 'Yes. Select the report types on the Sample Reports page and submit the request. Samples are shared privately after the request has been reviewed. Confidential client reports are never published.'],
  ['Is a factory assessment a certification audit?', 'No. It is an independent evaluation against scope and criteria agreed with the client. It is not an accredited certification audit.'],
];
const strip = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’');

built.push(page({
  file: 'knowledge-centre.html',
  title: 'Knowledge Centre | Textile Inspection Guides &amp; FAQs | MK Textile Service',
  description: 'Textile inspection guides and frequently asked questions on AQL sampling, fabric inspection, garment defects and factory assessment.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })),
  },
  body: `${pageHero({
    trail: [['Knowledge Centre']],
    eyebrow: 'Knowledge Centre',
    h1: 'Inspection guides and FAQs',
    lead: 'Answers to common questions about textile inspection, and the technical guides we are preparing.',
    iconName: 'book',
  })}
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">FAQs</p>
        <h2>Frequently asked questions</h2>
      </div>
      <div class="faq reveal">
        ${FAQS.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><div class="answer"><p>${a}</p></div></details>`).join('\n        ')}
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Guides</p>
        <h2>Technical guides in preparation</h2>
        <p>These articles will be published here. Until then, the related service page covers the scope of each topic.</p>
      </div>
      <div class="grid grid--4">
        ${TOPICS.map(([t, href, label]) => `<article class="card topic reveal"><span class="tag">Coming soon</span><h3>${t}</h3><a class="link-arrow" href="${href}">${label} ${arrow}</a></article>`).join('\n        ')}
      </div>
    </div>
  </section>
  ${defaultCta}`,
}));

/* ================= CONTACT ================= */
const ENQUIRY_TYPES = [
  ['general', 'General Enquiry'],
  ['garment', 'Garment Inspection'],
  ['fabric', 'Fabric &amp; Material Inspection'],
  ['home-textile', 'Home Textile Inspection'],
  ['packaging', 'Packaging &amp; Shipment Inspection'],
  ['factory-assessment', 'Factory Assessment'],
  ['sample-report', 'Sample Report Request'],
];
const CATEGORIES = ['Apparel &amp; Garments', 'Denim &amp; Woven Garments', 'Knitwear', 'Sportswear', 'Socks &amp; Hosiery', 'Children&rsquo;s Wear', 'Fabric', 'Trims &amp; Accessories', 'Home Textiles', 'Other'];

built.push(page({
  file: 'contact.html',
  title: 'Contact MK Textile Service | Inspection Enquiry Form',
  description: 'Contact MK Textile Service about textile inspection or factory assessment in Pakistan. Send an enquiry or request a sample report.',
  body: `${pageHero({
    trail: [['Contact']],
    eyebrow: 'Contact',
    h1: 'Get in touch',
    lead: 'Use the enquiry form for inspection requests, factory assessments and sample reports. One form covers every type of enquiry.',
  })}
  <section class="section">
    <div class="container contact-grid">
      <div class="contact-list">
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('mail')}</span>
          <div><h3>Email</h3><p data-pending="email">Business email to be confirmed</p><a class="link-arrow" href="#enquiry">Use the enquiry form ${arrow}</a></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('chat')}</span>
          <div><h3>WhatsApp</h3><p data-pending="whatsapp">WhatsApp number to be confirmed</p><a class="link-arrow" href="#enquiry" data-whatsapp>Chat on WhatsApp ${arrow}</a></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('pin')}</span>
          <div><h3>Location</h3><p>Pakistan. Business address to be confirmed.</p></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('globe')}</span>
          <div><h3>Service coverage</h3><p>Inspection and factory assessment services in Pakistan for international buyers and businesses.</p></div>
        </div>
      </div>

      <div class="form-card reveal" id="enquiry">
        <h2>Enquiry form</h2>
        <p>Fields marked <span class="req">*</span> are required.</p>
        <form id="enquiry-form" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="f-name">Full Name <span class="req">*</span></label>
              <input id="f-name" name="fullName" type="text" autocomplete="name" required>
              <span class="error">Please enter your full name.</span>
            </div>
            <div class="field">
              <label for="f-company">Company Name <span class="req">*</span></label>
              <input id="f-company" name="companyName" type="text" autocomplete="organization" required>
              <span class="error">Please enter your company name.</span>
            </div>
            <div class="field">
              <label for="f-email">Email Address <span class="req">*</span></label>
              <input id="f-email" name="email" type="email" autocomplete="email" required>
              <span class="error">Please enter a valid email address.</span>
            </div>
            <div class="field">
              <label for="f-country">Country <span class="req">*</span></label>
              <input id="f-country" name="country" type="text" autocomplete="country-name" required>
              <span class="error">Please enter your country.</span>
            </div>
            <div class="field">
              <label for="f-type">Enquiry Type <span class="req">*</span></label>
              <select id="f-type" name="enquiryType" required>
                ${ENQUIRY_TYPES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
              </select>
              <span class="error">Please choose an enquiry type.</span>
            </div>
            <div class="field">
              <label for="f-category">Product Category <span class="opt">(optional)</span></label>
              <select id="f-category" name="productCategory">
                <option value="">Select a category</option>
                ${CATEGORIES.map((c) => `<option>${c}</option>`).join('')}
              </select>
            </div>
            <fieldset class="field field--full" data-report-field hidden>
              <legend>Selected Report Type(s)</legend>
              <div class="check-grid">
                ${REPORTS.map(([value, name]) => `<label><input type="checkbox" name="reports" value="${value}">${name}</label>`).join('\n                ')}
              </div>
            </fieldset>
            <div class="field">
              <label for="f-date">Preferred Inspection Date <span class="opt">(optional)</span></label>
              <input id="f-date" name="preferredDate" type="date">
            </div>
            <div class="field field--full">
              <label for="f-message">Message <span class="req">*</span></label>
              <textarea id="f-message" name="message" required></textarea>
              <span class="error">Please enter a message.</span>
            </div>
            <div class="hp" aria-hidden="true">
              <label for="f-website">Leave this field empty</label>
              <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>
          </div>
          <div class="form-foot">
            <p>Your details are used only to respond to this enquiry.</p>
            <button class="btn btn--primary" type="submit">Send Enquiry ${arrow}</button>
          </div>
          <div class="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </div>
  </section>`,
}));

/* ---------- favicon, robots, sitemap ---------- */
writeFileSync(join(OUT, 'assets/img/favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#0E2A52"/><circle cx="24" cy="24" r="19.5" fill="none" stroke="#16B6C9" stroke-width="1.6"/><text x="24" y="30" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="16" font-weight="800" fill="#fff">MK</text></svg>\n`);

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`);

if (SITE_URL) {
  const urls = built.map((f) => `  <url><loc>${SITE_URL}/${f === 'index.html' ? '' : f}</loc></url>`).join('\n');
  writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

console.log(`Built ${built.length} pages:\n  ${built.join('\n  ')}`);
