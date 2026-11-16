// MK Textile Service — static site generator.
// Run:  node build.mjs
// Writes the plain .html pages next to this file. Header, footer, navigation,
// rates and the contact widget live here once, so edit them here and rebuild
// rather than editing the generated pages by hand.

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://mktextileservice.com'; // no trailing slash
const SITE = 'MK Textile Service';
const EMAIL = 'info@mktextileservice.com';
const PHONE = '+923212308070'; // calls and WhatsApp
const PHONE_DISPLAY = '+92 321 2308070';
const WA_URL = `https://wa.me/${PHONE.replace(/\D/g, '')}`;

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
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  unload: '<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M9 3v12M15 3v12"/><path d="M12 17v5"/><path d="m9 19.5 3 2.5 3-2.5"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  report: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
};
const icon = (name, cls = '') =>
  `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const arrow = icon('arrow', 'icon--arrow');

// Company logo mark (MK + swoosh). Light variant is for dark backgrounds.
const emblem = `<img class="brand-mark" src="assets/img/logo-mark.png" width="439" height="192" alt="">`;
const emblemFull = `<img class="brand-logo" src="assets/img/logo-header.png" width="339" height="176" alt="">`;
const emblemLight = `<img class="brand-mark brand-mark--on-dark" src="assets/img/logo-mark-light.png" width="439" height="192" alt="" loading="lazy"><img class="brand-mark brand-mark--on-light" src="assets/img/logo-mark.png" width="439" height="192" alt="" loading="lazy">`;

/* ---------- shared data ---------- */
// Estimated standard fees (USD per man-day). Estimates only, not fixed quotes.
const SERVICES = [
  { key: 'garment', file: 'garment-inspection.html', icon: 'shirt', name: 'Garment Inspection', short: 'Apparel, denim, knitwear, sportswear, socks &amp; hosiery.', rate: 200 },
  { key: 'fabric', file: 'fabric-material-inspection.html', icon: 'layers', name: 'Fabric &amp; Material Inspection', short: 'Fabric rolls, GSM, width, shade and shrinkage.', rate: 200 },
  { key: 'home-textile', file: 'home-textile-inspection.html', icon: 'bed', name: 'Home Textile Inspection', short: 'Towels, bedding, quilts and kitchen textiles.', rate: 200 },
  { key: 'packaging', file: 'packaging-shipment-inspection.html', icon: 'box', name: 'Packaging &amp; Shipment Inspection', short: 'Packing, labels, cartons, quantities and container condition.', rate: 200 },
];
const CONTAINER = [
  { key: 'container-loading', file: 'container-loading-supervision.html', icon: 'truck', name: 'Container Loading Supervision', short: 'Container condition, loading sequence, stacking and seal record.', rate: 200 },
  { key: 'container-unloading', file: 'container-unloading-inspection.html', icon: 'unload', name: 'Container Unloading Inspection', short: 'Seal, internal condition, carton damage and discrepancies.', rate: 200 },
];
const FACTORY = { key: 'factory-assessment', file: 'factory-assessment.html', icon: 'factory', name: 'Factory Assessment &amp; Quality Audit', short: 'Capability, quality management and production readiness.', rate: 275 };
const ALL = [...SERVICES, ...CONTAINER, FACTORY];

const RATE_NOTE = 'Final quotation depends on inspection scope, duration and required manpower.';

const REPORTS = [
  ['inline-garment', 'In-Line Garment Inspection Report', 'Quality during ongoing production'],
  ['final-garment', 'Final Garment Inspection Report', 'Completed goods against agreed criteria'],
  ['dupro', 'DUPRO Inspection Report', 'During-production check of bulk quality'],
  ['fabric', 'Fabric Inspection Report', 'Roll-wise findings and defect records'],
  ['home-textile', 'Home Textile Inspection Report', 'Product-wise findings and measurements'],
  ['packaging-shipment', 'Packaging &amp; Shipment Inspection Report', 'Packing, cartons, labels and quantity'],
  ['container-loading', 'Container Loading Supervision Report', 'Container condition, loading and seal record'],
  ['container-unloading', 'Container Unloading Inspection Report', 'Seal, condition on opening and damage'],
  ['factory-assessment', 'Factory Assessment / Quality Audit Report', 'Capability, quality systems and CAPA'],
];

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

const enquiry = (service, reports) =>
  `contact.html?service=${service}${reports ? '&amp;reports=' + reports : ''}#enquiry`;
const strip = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&middot;/g, '·');

/* ---------- layout ---------- */
const NAV = [
  ['index.html', 'Home'],
  ['inspection-services.html', 'Inspection Services'],
  ['factory-assessment.html', 'Factory Assessment'],
  ['sample-reports.html', 'Sample Reports'],
  ['about.html', 'About Us'],
  ['knowledge-centre.html', 'Knowledge Centre'],
  ['contact.html', 'Contact Us'],
];

function header(active, section) {
  const subLink = (s) => `<li><a href="${s.file}"${s.file === active ? ' aria-current="page"' : ''}>${icon(s.icon)}<span><strong>${s.name}</strong><small>${s.short}</small></span></a></li>`;
  const items = NAV.map(([href, label]) => {
    const current = href === active ? ' aria-current="page"' : '';
    const inSection = href === section ? ' class="is-active"' : '';
    if (href !== 'inspection-services.html') return `<li${inSection}><a href="${href}"${current}>${label}</a></li>`;
    return `<li class="has-sub${href === section ? ' is-active' : ''}">
          <a href="${href}"${current}>${label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-label="Show inspection services">${icon('chevron')}</button>
          <ul class="sub">
            ${SERVICES.map(subLink).join('\n            ')}
            <li class="sub-label">Container services</li>
            ${CONTAINER.map(subLink).join('\n            ')}
            <li><a class="sub-all" href="inspection-services.html">All services and estimated rates ${arrow}</a></li>
          </ul>
        </li>`;
  }).join('\n        ');

  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="${SITE} — home">
      ${emblemFull}${emblem}
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
        ${emblemLight}
        <span class="brand-text"><strong>${SITE}</strong><small>Inspection &amp; Factory Assessment</small></span>
      </a>
      <p class="footer-about">Independent third-party textile inspection and factory assessment services in Pakistan.</p>
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
        ${ALL.map((s) => `<li><a href="${s.file}">${s.name}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    <div class="footer-contact">
      <h2>Contact</h2>
      <ul>
        <li><a href="mailto:${EMAIL}">${icon('mail')}${EMAIL}</a></li>
        <li><a href="tel:${PHONE}">${icon('phone')}${PHONE_DISPLAY}</a></li>
        <li><a href="${WA_URL}" data-whatsapp>${icon('chat')}WhatsApp</a></li>
        <li><a href="sample-reports.html">${icon('report')}Request Sample Reports</a></li>
        <li><span class="footer-line">${icon('pin')}Based in Karachi, Pakistan</span></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>&copy; <span data-year>2026</span> ${SITE}. All rights reserved.</span>
    <span class="footer-legal"><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a></span>
  </div>
</footer>`;

const widget = `<details class="cw">
  <summary aria-label="Contact us">${icon('chat', 'icon--open')}${icon('close', 'icon--close')}Contact Us</summary>
  <div class="cw-panel">
    <h2>Contact Us</h2>
    <p>Send an enquiry or chat with us directly.</p>
    <a class="btn btn--primary" href="contact.html#enquiry">${icon('mail')}Email Us</a>
    <a class="btn btn--wa" href="${WA_URL}" data-whatsapp>${icon('chat')}WhatsApp</a>
  </div>
</details>`;

const built = [];

function page({ file, title, description, body, jsonld, section, noindex }) {
  const canonical = SITE_URL ? `\n<link rel="canonical" href="${SITE_URL}/${file === 'index.html' ? '' : file.replace(/\.html$/, '')}">` : '';
  const ld = jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">${noindex ? '\n<meta name="robots" content="noindex">' : canonical}
<meta name="theme-color" content="#500A13">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<link rel="icon" href="assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap"></noscript>
<link rel="stylesheet" href="assets/css/style.css">
<script>document.documentElement.classList.add('js');try{var s=new URLSearchParams(location.search).get('shade')||localStorage.getItem('mk-shade');if(/^[234]$/.test(s))document.documentElement.setAttribute('data-shade',s)}catch(e){}</script>
<script src="assets/js/main.js" defer></script>${ld}
</head>
<body>
${header(file, section || file)}
<main id="main">
${body}
</main>
${footer}
${widget}
</body>
</html>
`;
  writeFileSync(join(OUT, file), html);
  if (!noindex) built.push(file);
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
const block = (h2, inner, lead = '') => `<section class="reveal">
          <h2>${h2}</h2>${lead ? `\n          <p>${lead}</p>` : ''}
          ${inner}
        </section>`;
const note = (h3, text, ic = 'info') => `<div class="note">
            ${icon(ic)}
            <div>
              <h3>${h3}</h3>
              <p>${text}</p>
            </div>
          </div>`;

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
  'Tell us the product, the service you need and the factory location. We will review your requirements and contact you about the next steps.',
  `<a class="btn btn--teal" href="contact.html#enquiry">Get in Touch ${arrow}</a><a class="btn btn--ghost" href="sample-reports.html">Request Sample Reports</a>`
);

const price = (s) => `US$${s.rate} <small>/ Man-Day</small>`;

const serviceLd = (name, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: name,
  description,
  provider: { '@type': 'Organization', name: SITE, url: SITE_URL + '/' },
  areaServed: { '@type': 'Country', name: 'Pakistan' },
});

const otherServices = (currentKey) => `<div class="aside-links">
          <h2>Other services</h2>
          <ul>
            ${ALL.filter((s) => s.key !== currentKey).map((s) => `<li><a href="${s.file}">${s.name}${icon('arrow')}</a></li>`).join('\n            ')}
          </ul>
        </div>`;

function servicePage({ svc, title, description, intro, eyebrow, requestLabel, sampleLabel, sampleReports, sections, parent = true }) {
  page({
    file: svc.file,
    section: parent ? 'inspection-services.html' : svc.file,
    title,
    description,
    jsonld: serviceLd(strip(svc.name), description),
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
          <p class="rate-label">Estimated standard fee</p>
          <p class="rate">${price(svc)}</p>
          <p>Estimated rate per man-day. <a href="inspection-services.html#rates">Rate details</a></p>
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

/* ---------- Knowledge Centre articles (initial drafts; review before publication) ---------- */
const ARTICLES = [
  {
    file: 'guide-aql-garment-inspection.html', cat: 'Garments', related: SERVICES[0],
    title: 'Understanding AQL in Garment Inspection',
    desc: 'How acceptance sampling works in garment inspection: lot, sample size, sampling plan, acceptance criteria and defect classification.',
    intro: 'Acceptance sampling lets a buyer judge a production lot by inspecting an agreed sample instead of every piece. AQL is the part of that agreement which sets how many defects are acceptable in the sample.',
    parts: [
      ['Key terms', ['<strong>Lot:</strong> the quantity of goods presented for inspection.', '<strong>Sample size:</strong> the number of pieces drawn from the lot for inspection.', '<strong>Sampling plan:</strong> the agreed rules that set the sample size and the number of defects permitted.', '<strong>Acceptance criteria:</strong> the limits agreed for each class of defect.']],
      ['Defect classification', ['<strong>Critical:</strong> a defect that may be unsafe or breach a mandatory requirement.', '<strong>Major:</strong> a defect likely to affect use, saleability or appearance.', '<strong>Minor:</strong> a small departure from the standard that is unlikely to affect use.']],
      ['What sampling does not do', ['Sampling is not a 100% inspection.', 'A passed sample does not guarantee that every item in the lot is free from defects.', 'The result applies to the lot and conditions inspected, against the agreed criteria.']],
    ],
    close: 'Agree the standard, the inspection level and the acceptance limits with your inspection provider before the inspection. ISO 2859-1 is commonly used for acceptance sampling; confirm the edition that applies to your order.',
  },
  {
    file: 'guide-common-garment-defects.html', cat: 'Garments', related: SERVICES[0],
    title: 'Common Garment Defects and Quality Inspection',
    desc: 'The garment defects most often recorded during inspection, from stitching and fabric faults to measurements, printing, labels and finishing.',
    intro: 'Most garment defects fall into a small number of groups. Knowing them helps a buyer write clearer requirements and read an inspection report faster.',
    parts: [
      ['Stitching and seams', ['Broken or skipped stitches', 'Open seams', 'Puckering', 'Uneven stitching']],
      ['Fabric and appearance', ['Fabric holes and cuts', 'Oil and dirt stains', 'Shade variation', 'Twisting and shape distortion']],
      ['Measurements, decoration and finishing', ['Incorrect measurements', 'Print and embroidery defects', 'Wrong or missing labels and accessories', 'Pressing and finishing faults']],
    ],
    close: 'Whether a defect is acceptable depends on the buyer&rsquo;s requirements. Each finding is evaluated against the agreed specification and defect classification.',
  },
  {
    file: 'guide-four-point-fabric-inspection.html', cat: 'Fabrics', related: SERVICES[1],
    title: 'Four-Point Fabric Inspection System Explained',
    desc: 'How the Four-Point system is used for visual fabric roll inspection, which defects are recorded and what else is checked on each roll.',
    intro: 'The Four-Point system is a widely used method for visual inspection of fabric rolls. Defects found along the roll are given penalty points, and the total is compared with the agreed acceptance level.',
    parts: [
      ['Defects typically recorded', ['Holes', 'Stains', 'Weaving faults', 'Printing faults', 'Slubs', 'Bars']],
      ['How points are assigned', ['Points are given to each defect according to its size, following the grading rules of the applicable method.', 'Points are totalled per roll and assessed against the agreed acceptance criteria.']],
      ['What is recorded for each roll', ['Defect mapping along the roll', 'Width', 'Roll length and roll identification', 'Shade', 'Appearance and construction']],
    ],
    close: 'Agree the acceptance criteria before inspection starts. ASTM D5430 describes visual inspection and grading of fabrics; confirm the method your buyer requires.',
  },
  {
    file: 'guide-fabric-gsm-and-width.html', cat: 'Fabrics', related: SERVICES[1],
    title: 'How to Check Fabric GSM and Width',
    desc: 'Why fabric GSM and width matter, what is compared against the specification and which tolerances and test methods apply.',
    intro: 'GSM is the weight of a fabric in grams per square metre. Width affects cutting and fabric consumption. Both are checked against the specification before bulk cutting.',
    parts: [
      ['What is checked', ['GSM against the specification', 'Width against the specification', 'Consistency from roll to roll', 'Usable width compared with full width', 'Results against the agreed tolerances']],
      ['Method', ['Follow the applicable conditioning and test method for the fabric.', 'Record the method used together with the results.']],
    ],
    close: 'ASTM D3776/D3776M covers mass per unit area of fabric. Use the method and tolerances specified by the buyer.',
  },
  {
    file: 'guide-fabric-shade-variation.html', cat: 'Fabrics', related: SERVICES[1],
    title: 'Fabric Shade Variation and Colour Assessment',
    desc: 'Types of fabric shade variation, how shade is checked within and between rolls, and the role of lighting and approved standards.',
    intro: 'Shade variation is one of the most common reasons for fabric and garment rejections. It can appear between rolls, within a roll, between lots and between garment panels.',
    parts: [
      ['Types of variation', ['Roll to roll', 'Within a roll', 'Lot to lot', 'Panel to panel in the finished garment']],
      ['How shade is checked', ['Comparison with the approved standard', 'Side to side and centre to edge', 'Beginning, middle and end of the roll', 'Panel matching']],
      ['Viewing conditions', ['Assess under the specified lighting.', 'Check for metamerism, where colours match under one light source and differ under another.', 'Use instrumental measurement when the buyer specifies it.']],
    ],
    close: 'Shade variation can have several process causes. An agreed approved standard and viewing condition make the assessment consistent.',
  },
  {
    file: 'guide-home-textile-inspection.html', cat: 'Home Textiles', related: SERVICES[2],
    title: 'Home Textile Quality Inspection',
    desc: 'What is checked during home textile inspection for towels, bedding, quilts, upholstery and kitchen textiles.',
    intro: 'Home textiles are judged on appearance, size, weight and how they are finished and packed. Each product type has its own checklist.',
    parts: [
      ['Products covered', ['Towels and bathrobes', 'Bedsheets, pillowcases and duvet covers', 'Upholstery', 'Quilts', 'Kitchen textiles']],
      ['Main checks', ['Appearance', 'GSM and dimensions', 'Stitching', 'Shade', 'Print and embroidery', 'Shrinkage and absorbency where specified', 'Labels', 'Folding and packaging']],
    ],
    close: 'Use a product-specific checklist built from the buyer&rsquo;s specification.',
  },
  {
    file: 'guide-socks-hosiery-inspection.html', cat: 'Garments', related: SERVICES[0],
    title: 'Socks and Hosiery Quality Inspection',
    desc: 'Common socks and hosiery defects and the checks made on knitting, size, toe and heel construction, elasticity, pairing and packaging.',
    intro: 'Socks and hosiery have their own defect types, mostly linked to knitting, sizing and pairing.',
    parts: [
      ['Knitting and construction', ['Holes', 'Dropped stitches and knitting defects', 'Uneven or distorted rib', 'Toe closure', 'Heel and toe construction']],
      ['Size, fit and appearance', ['Size and length', 'Elasticity and recovery', 'Shade', 'Pair matching']],
      ['Presentation', ['Labels', 'Packaging']],
    ],
    close: 'Findings are evaluated against the buyer&rsquo;s specification and the agreed defect classification.',
  },
  {
    file: 'guide-packaging-carton-inspection.html', cat: 'Packaging &amp; Shipment', related: SERVICES[3],
    title: 'Packaging and Carton Inspection',
    desc: 'What is checked during packaging and carton inspection: folding, polybags, assortment, labels, barcodes, shipping marks, cartons and quantity.',
    intro: 'Packing errors are easy to prevent before shipment and costly to correct afterwards. A packaging inspection checks the order from the single unit up to the export carton.',
    parts: [
      ['Unit and inner packing', ['Folding', 'Polybag and inner packing', 'Barcode, product and care labels', 'Hangtags']],
      ['Assortment', ['Assortment', 'Size ratios']],
      ['Cartons and documents', ['Shipping marks', 'Carton dimensions and condition', 'Quantity', 'Packing list', 'Sealing and protection']],
    ],
    close: 'Checks are made against the buyer&rsquo;s packing instructions and the purchase order.',
  },
  {
    file: 'guide-container-loading-unloading.html', cat: 'Packaging &amp; Shipment', related: CONTAINER[0],
    title: 'Container Loading and Unloading Inspection Checklist',
    desc: 'A checklist for container loading and unloading inspection: container condition, loading sequence, stacking, carton damage and photographs.',
    intro: 'Loading and unloading are the two points where the condition of a shipment can be recorded. The checks differ slightly at each end.',
    parts: [
      ['Container condition', ['Container identity', 'Cleanliness and dryness', 'Holes, leakage and visible damage', 'Odour and contamination', 'Floor, walls and doors', 'Seals']],
      ['During loading', ['Loading sequence', 'Handling', 'Stacking', 'Visible carton damage']],
      ['During unloading', ['Wet, crushed, torn or shifted cartons', 'Quantities as agreed', 'Photographs of findings']],
    ],
    close: 'A loading or unloading inspection records what was observed. It does not guarantee cargo safety and does not replace the responsibilities of the carrier or shipper.',
  },
  {
    file: 'guide-factory-assessment.html', cat: 'Factory Assessment', related: FACTORY,
    title: 'Factory Assessment and Quality Management',
    desc: 'What a factory assessment reviews, from capacity and machinery to quality procedures, CAPA and traceability, and how the assessment is carried out.',
    intro: 'A factory assessment gives a buyer a structured view of a manufacturer before or during a business relationship.',
    parts: [
      ['What is reviewed', ['Factory profile and capacity', 'Machinery and workflow', 'Quality procedures', 'Incoming materials', 'In-line and final checks', 'Testing facilities', 'Defects and CAPA', 'Documents and traceability', 'Production readiness']],
      ['How it works', ['Define the scope with the client.', 'Visit the factory and review facilities, processes and records.', 'Report findings, gaps, risks and recommendations.']],
    ],
    close: 'A factory assessment is an independent evaluation against an agreed scope. It is not a certification.',
  },
];

/* ================= HOME ================= */
const tickerItems = ['Apparel', 'Denim', 'Woven Garments', 'Knitwear', 'Sportswear', 'Socks &amp; Hosiery', 'Children&rsquo;s Wear', 'Fabric Rolls', 'Towels', 'Bedding', 'Quilts', 'Kitchen Textiles'];
const tickerList = (hidden) => `<ul${hidden ? ' aria-hidden="true"' : ''}>${tickerItems.map((t) => `<li>${t}</li>`).join('')}</ul>`;
const articleCard = (a, d = 0) => `<a class="card topic reveal"${d ? ` style="--d:${d}ms"` : ''} href="${a.file}"><span class="tag">${a.cat}</span><h3>${a.title}</h3><p>${a.desc}</p><span class="link-arrow">Read guide ${arrow}</span></a>`;

page({
  file: 'index.html',
  title: 'Textile Inspection Services in Pakistan | MK Textile Service',
  description: 'Independent third-party textile inspection and factory assessment services in Pakistan for international buyers, brands and businesses.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE,
    url: SITE_URL + '/',
    email: EMAIL,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
    logo: SITE_URL + '/assets/img/logo.png',
    image: SITE_URL + '/assets/img/logo.png',
    description: 'Independent third-party textile inspection and factory assessment services in Pakistan.',
    areaServed: { '@type': 'Country', name: 'Pakistan' },
  },
  body: `<section class="hero">
    <svg class="hero-threads" viewBox="0 0 1440 360" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
      <path d="M0 300C240 220 420 340 720 250s480-190 720-120"/>
      <path d="M0 325C260 250 440 355 740 275s470-180 700-120" opacity=".7"/>
      <path d="M0 350C280 280 460 370 760 300s460-170 680-120" opacity=".45"/>
    </svg>
    <div class="container hero-grid">
      <div>
        <p class="eyebrow eyebrow--light">Independent third-party inspection</p>
        <h1>Textile Inspection Services <span>in Pakistan</span></h1>
        <p class="lead">Independent third-party inspection and factory assessment services supporting international buyers, brands and businesses in maintaining product quality and manufacturing standards in Pakistan.</p>
        <div class="btn-row">
          <a class="btn btn--teal" href="inspection-services.html">Our Services ${arrow}</a>
          <a class="btn btn--ghost" href="contact.html">Contact Us</a>
        </div>
        <ul class="hero-points">
          <li>${icon('check')}30+ years of industry experience</li>
          <li>${icon('check')}Based in Karachi, Pakistan</li>
          <li>${icon('check')}Rates from US$200 / Man-Day</li>
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
          ${STAGES.slice(0, 5).map(([code, name]) => `<li><span class="code">${code}</span>${name}${icon('check')}</li>`).join('\n          ')}
        </ul>
        <p class="hero-card-foot">Plus 100% inspection, re-inspection and in-line quality checks.</p>
      </div>
    </div>
  </section>

  <div class="ticker" aria-label="Products we inspect">
    <div class="ticker-track">${tickerList(false)}${tickerList(true)}</div>
  </div>

  <section class="section">
    <div class="container intro">
      <div class="reveal">
        <p class="eyebrow">About MK Textile Service</p>
        <h2>Experience you can trust. Quality you can rely on.</h2>
        <p class="lead">With 30+ years of industry experience, our approach is built on practical textile knowledge, hands-on quality assurance expertise and a strong understanding of manufacturing processes.</p>
        <a class="link-arrow" href="about.html">About the company ${arrow}</a>
      </div>
      <div class="stat-card reveal" style="--d:100ms">
        <p class="stat">30+</p>
        <p class="stat-label">Years of Industry Experience</p>
        <p>Independent inspections, honest findings, clear communication and dependable quality support.</p>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Inspection Services</p>
        <h2>Four inspection services, one clear report</h2>
        <p>Open a service to see its scope, checkpoints and estimated rate.</p>
      </div>
      <div class="grid grid--4">
        ${SERVICES.map((s, i) => `<a class="card reveal"${i ? ` style="--d:${i * 70}ms"` : ''} href="${s.file}">
          <span class="icon-tile">${icon(s.icon)}</span>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          <span class="link-arrow">View details ${arrow}</span>
        </a>`).join('\n        ')}
      </div>
      <p class="after-grid reveal">Also available: <a href="${CONTAINER[0].file}">Container Loading Supervision</a> and <a href="${CONTAINER[1].file}">Container Unloading Inspection</a>.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="feature reveal">
        <span class="icon-tile">${icon('factory')}</span>
        <div>
          <p class="eyebrow">Factory Assessment</p>
          <h2>Factory Assessment &amp; Quality Audit</h2>
          <p>A structured review of a manufacturer&rsquo;s production capability, quality management system, facilities and readiness to meet your requirements, reported with observations and photographs.</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="factory-assessment.html">View Factory Assessment ${arrow}</a>
            <a class="btn btn--outline" href="${enquiry('factory-assessment')}">Discuss an Assessment</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Why Choose MK Textile Service</p>
        <h2>Professional, objective and reliable</h2>
      </div>
      <ul class="strengths reveal">
        <li>${icon('scale')}<div><h3>Independent Inspections</h3><p>Third-party and objective, tailored to each client&rsquo;s requirements.</p></div></li>
        <li>${icon('shield')}<div><h3>Honest Findings</h3><p>Results reported against the agreed specifications and criteria.</p></div></li>
        <li>${icon('report')}<div><h3>Clear Communication</h3><p>Clear reports supported by photographic evidence.</p></div></li>
        <li>${icon('users')}<div><h3>Dependable Support</h3><p>30+ years of industry experience behind every assignment.</p></div></li>
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
        <li class="reveal"><h3>Enquiry</h3><p>Send the product, service, location and preferred inspection date.</p></li>
        <li class="reveal" style="--d:70ms"><h3>Coordination</h3><p>Scope, sampling plan, acceptance criteria and schedule are agreed with you.</p></li>
        <li class="reveal" style="--d:140ms"><h3>Inspection</h3><p>The inspection or assessment is carried out on site against the agreed criteria.</p></li>
        <li class="reveal" style="--d:210ms"><h3>Reporting</h3><p>Findings, defect classification and photographic evidence in one clear report.</p></li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Knowledge Centre</p>
        <h2>Practical inspection guides</h2>
      </div>
      <div class="grid grid--3">
        ${[ARTICLES[0], ARTICLES[2], ARTICLES[8]].map((a, i) => articleCard(a, i * 70)).join('\n        ')}
      </div>
      <p class="after-grid reveal"><a class="link-arrow" href="knowledge-centre.html">All guides ${arrow}</a></p>
    </div>
  </section>
  ${defaultCta}`,
});

/* ================= INSPECTION SERVICES OVERVIEW ================= */
const OVERVIEW = [
  {
    svc: SERVICES[0],
    intro: 'Independent quality inspections of apparel, denim and woven garments, knitwear, sportswear, socks and hosiery, and children&rsquo;s wear.',
    coverage: ['Apparel', 'Denim &amp; woven', 'Knitwear', 'Sportswear', 'Socks &amp; hosiery', 'Children&rsquo;s wear'],
    activities: ['Workmanship and stitching', 'Measurements', 'Print, embroidery and labels', 'Defect classification with photographic evidence'],
  },
  {
    svc: SERVICES[1],
    intro: 'Inspection of fabric rolls, construction, GSM, width, shade and dimensional performance.',
    coverage: ['Woven fabric', 'Knitted fabric', 'Denim'],
    activities: ['Fabric roll inspection, Four-Point system where applicable', 'GSM, width and roll length', 'Shade and colour variation', 'Shrinkage and dimensional stability'],
  },
  {
    svc: SERVICES[2],
    intro: 'Inspection of towels, bedding, quilts, kitchen textiles and related home textile products.',
    coverage: ['Towels &amp; bathrobes', 'Bedding', 'Quilts', 'Kitchen textiles'],
    activities: ['Fabric appearance and construction', 'GSM and dimensions', 'Stitching, shade, print and embroidery', 'Labels, folding and packaging'],
  },
  {
    svc: SERVICES[3],
    intro: 'Verification of packing, assortment, labels, cartons, quantities, shipping marks and container condition.',
    coverage: ['Inner packing', 'Labels &amp; barcodes', 'Cartons', 'Container condition'],
    activities: ['Folding, polybag and inner packing', 'Assortment and size ratios', 'Shipping marks, carton condition and quantity', 'Container condition checks'],
  },
];

page({
  file: 'inspection-services.html',
  title: 'Inspection Services in Pakistan | Scope and Estimated Rates | MK Textile Service',
  description: 'Third-party garment, fabric, home textile, packaging and container inspection services in Pakistan, with estimated man-day rates.',
  body: `${pageHero({
    trail: [['Inspection Services']],
    eyebrow: 'Inspection Services',
    h1: 'Inspection Services in Pakistan',
    lead: 'Four inspection categories and two container services, covering textile products from incoming material to the loaded container. Open a service to review its scope and checkpoints.',
    buttons: `<a class="btn btn--outline" href="#rates">Estimated rates</a>`,
  })}
  <section class="section">
    <div class="container">
      <div class="grid grid--2">
        ${OVERVIEW.map((o, i) => `<article class="card service-card reveal"${i % 2 ? ' style="--d:80ms"' : ''}>
          <div class="service-card-head"><span class="icon-tile">${icon(o.svc.icon)}</span><div><h2>${o.svc.name}</h2><p class="card-rate">${price(o.svc)}</p></div></div>
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
  <section class="section section--alt">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Container Services</p>
        <h2>Loading supervision and unloading inspection</h2>
        <p>Two separate services for the start and end of the shipment journey.</p>
      </div>
      <div class="grid grid--2">
        ${CONTAINER.map((s, i) => `<a class="card reveal"${i ? ' style="--d:80ms"' : ''} href="${s.file}">
          <span class="icon-tile">${icon(s.icon)}</span>
          <h3>${s.name}</h3>
          <p>${s.short}</p>
          <p class="card-rate">${price(s)}</p>
          <span class="link-arrow">View details ${arrow}</span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>
  <section class="section" id="rates">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Estimated Rates</p>
        <h2>Estimated standard fees</h2>
        <p>Rates are in US dollars per man-day. They are estimates, not fixed quotations.</p>
      </div>
      <div class="rates reveal">
        <table>
          <thead><tr><th scope="col">Service</th><th scope="col">Estimated standard fee</th></tr></thead>
          <tbody>
            ${ALL.map((s) => `<tr><th scope="row"><a href="${s.file}">${s.name}</a></th><td>US$${s.rate} / Man-Day</td></tr>`).join('\n            ')}
          </tbody>
        </table>
      </div>
      <div class="reveal" style="margin-top:22px">
        ${note('How rates apply', RATE_NOTE)}
      </div>
    </div>
  </section>
  ${ctaBand(
    'Need to evaluate a manufacturer?',
    'Factory Assessment &amp; Quality Audit is a separate service covering capability, quality management and production readiness.',
    `<a class="btn btn--teal" href="factory-assessment.html">Factory Assessment ${arrow}</a><a class="btn btn--ghost" href="contact.html#enquiry">Get in Touch</a>`
  )}`,
});

/* ================= GARMENT ================= */
servicePage({
  svc: SERVICES[0],
  title: 'Garment Inspection in Pakistan | PPC, DUPRO, FRI, PSI | MK Textile Service',
  description: 'Third-party garment inspection in Pakistan for apparel, denim, knitwear, sportswear, socks and hosiery, from pre-production check to pre-shipment inspection.',
  eyebrow: 'Inspection Services',
  intro: 'Independent garment inspection services designed to evaluate product quality, workmanship, measurements, appearance and packing at different production stages.',
  requestLabel: 'Request Inspection Service',
  sampleLabel: 'Request Sample Inspection Report',
  sampleReports: 'final-garment',
  sections: [
    block('Product coverage', list(['Apparel and garments', 'Denim and woven garments', 'Knitwear', 'Sportswear', 'Socks and hosiery', 'Children&rsquo;s wear'], 'chips')),
    block('Inspection stages', `<ul class="rows">
            ${STAGES.map(([code, name, text]) => `<li><strong><span class="code">${code}</span>${name}</strong><span>${text}</span></li>`).join('\n            ')}
          </ul>`, 'Inspection can be arranged at one stage or at several stages of the same order.'),
    block('Checkpoints', list(['Product specifications and approved samples', 'Fabric and material condition', 'Workmanship and stitching', 'Measurements', 'Construction and assembly', 'Print and embroidery', 'Labels and branding', 'Colour and shade consistency', 'Functional and appearance checks', 'Defect classification', 'Packing and presentation where applicable', 'Photographic evidence'], 'checks checks--2')),
    `<section class="reveal">
          ${note('Scope, sampling and acceptance criteria', 'The inspection scope, sampling plan and acceptance criteria are agreed with the client for each inspection. There is no single universal setting applied to every order.')}
        </section>`,
  ],
});

/* ================= FABRIC ================= */
servicePage({
  svc: SERVICES[1],
  title: 'Fabric &amp; Material Inspection in Pakistan | Four-Point System | MK Textile Service',
  description: 'Fabric and material inspection in Pakistan: fabric rolls, Four-Point system, GSM, width, shade, shrinkage and spirality.',
  eyebrow: 'Inspection Services',
  intro: 'Inspection of fabric and garment materials to identify quality variations and potential problems before they affect bulk production.',
  requestLabel: 'Request Fabric Inspection',
  sampleLabel: 'Request Sample Fabric Inspection Report',
  sampleReports: 'fabric',
  sections: [
    block('Material coverage', list(['Woven fabric', 'Knitted fabric', 'Denim', 'Other textile materials'], 'chips')),
    block('What is inspected', list(['Fabric roll inspection', 'Four-Point system where applicable', 'Construction and appearance', 'GSM', 'Width', 'Shade and colour variation', 'Shrinkage and dimensional stability', 'Knitted fabric spirality', 'Defect mapping', 'Roll and lot identification', 'Roll length'], 'checks checks--2')),
    `<section class="reveal">
          ${note('Method and acceptance criteria', 'The applicable inspection method and acceptance criteria depend on the buyer&rsquo;s requirements and are confirmed before the inspection.')}
        </section>`,
  ],
});

/* ================= HOME TEXTILE ================= */
servicePage({
  svc: SERVICES[2],
  title: 'Home Textile Inspection in Pakistan | Towels, Bedding, Quilts | MK Textile Service',
  description: 'Home textile inspection in Pakistan for towels, bathrobes, bedsheets, duvet covers, quilts and kitchen textiles.',
  eyebrow: 'Inspection Services',
  intro: 'Product quality inspection for home textile products, covering appearance, construction, dimensions, workmanship, functional details and packing requirements.',
  requestLabel: 'Request Home Textile Inspection',
  sampleLabel: 'Request Sample Home Textile Report',
  sampleReports: 'home-textile',
  sections: [
    block('Product coverage', list(['Towels and bathrobes', 'Bedsheets', 'Pillowcases', 'Duvet covers', 'Upholstery', 'Quilts', 'Kitchen textiles', 'Related products'], 'chips')),
    block('Checkpoints', list(['Fabric appearance and construction', 'GSM and dimensions', 'Stitching and seams', 'Shade', 'Print and embroidery', 'Shrinkage and absorbency where specified', 'Labels', 'Folding and packaging'], 'checks checks--2')),
    `<section class="reveal">
          ${note('Product-specific checklists', 'Each home textile product is inspected against a checklist built for that product and the buyer&rsquo;s specification.')}
        </section>`,
  ],
});

/* ================= PACKAGING ================= */
servicePage({
  svc: SERVICES[3],
  title: 'Packaging &amp; Shipment Inspection in Pakistan | MK Textile Service',
  description: 'Packaging and shipment inspection in Pakistan: folding, inner packing, assortment, labels, barcodes, shipping marks, cartons, quantity and container condition.',
  eyebrow: 'Inspection Services',
  intro: 'Inspection of finished-goods packing and shipment preparation to help verify order presentation, quantity, labelling and loading requirements.',
  requestLabel: 'Request Packaging / Shipment Inspection',
  sampleLabel: 'Request Sample Shipment Report',
  sampleReports: 'packaging-shipment',
  sections: [
    block('Packing and shipment checks', list(['Folding and presentation', 'Polybag and inner packing', 'Assortment and size ratios', 'Labels, care labels, barcode and hangtags', 'Shipping marks and carton markings', 'Carton dimensions and condition', 'Quantity', 'Packing list', 'Shipment preparation'], 'checks checks--2')),
    block('Container condition checks', list(['Container identity', 'Cleanliness and dryness', 'Visible damage', 'Holes and leakage', 'Odour and contamination', 'Floor, walls and roof', 'Doors and locking arrangement', 'Seal details where applicable'], 'checks checks--2')),
    block('Related container services', `<div class="grid grid--2">
            ${CONTAINER.map((s) => `<a class="card" href="${s.file}"><span class="icon-tile">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.short}</p><span class="link-arrow">View details ${arrow}</span></a>`).join('\n            ')}
          </div>`),
  ],
});

/* ================= CONTAINER LOADING ================= */
servicePage({
  svc: CONTAINER[0],
  title: 'Container Loading Supervision in Pakistan | MK Textile Service',
  description: 'Container loading supervision in Pakistan: container condition before loading, carton quantities, loading sequence, stacking, photographs and seal record.',
  eyebrow: 'Container Services',
  intro: 'On-site supervision of container loading, recording the condition of the container, the goods loaded and how they were loaded.',
  requestLabel: 'Request Loading Supervision',
  sampleLabel: 'Request Sample Loading Report',
  sampleReports: 'container-loading',
  sections: [
    block('What is supervised', list(['Container identity and condition before loading', 'Carton identification and quantities as agreed', 'Loading sequence', 'Handling and stacking', 'Load arrangement', 'Visible carton damage and discrepancies', 'Photographs', 'Seal details', 'Final loading record'], 'checks checks--2')),
    `<section class="reveal">
          ${note('Scope of the service', 'Loading supervision records what was observed at the time of loading. It does not guarantee cargo safety and does not replace the responsibilities of the carrier or shipper.')}
        </section>`,
  ],
});

/* ================= CONTAINER UNLOADING ================= */
servicePage({
  svc: CONTAINER[1],
  title: 'Container Unloading Inspection in Pakistan | MK Textile Service',
  description: 'Container unloading inspection in Pakistan: seal and container condition, unloading sequence, wet or damaged cartons, quantity discrepancies and photographs.',
  eyebrow: 'Container Services',
  intro: 'Inspection during container unloading, recording the condition of the container and cartons on arrival.',
  requestLabel: 'Request Unloading Inspection',
  sampleLabel: 'Request Sample Unloading Report',
  sampleReports: 'container-unloading',
  sections: [
    block('What is inspected', list(['Container identity and seal', 'Condition before opening', 'Internal condition', 'Unloading sequence and handling', 'Wet, crushed, torn or shifted cartons', 'Quantity discrepancies where agreed', 'Visible damage', 'Photographs', 'Final unloading report'], 'checks checks--2')),
    `<section class="reveal">
          ${note('Scope of the service', 'An unloading inspection records what was observed at the time of unloading. It does not guarantee cargo safety and does not replace the responsibilities of the carrier or shipper.')}
        </section>`,
  ],
});

/* ================= FACTORY ASSESSMENT ================= */
servicePage({
  svc: FACTORY,
  parent: false,
  title: 'Factory Assessment &amp; Quality Audit in Pakistan | MK Textile Service',
  description: 'Factory assessment and quality audit in Pakistan: production capability, quality management system, facilities, documentation, CAPA and production readiness.',
  eyebrow: 'Factory Assessment',
  intro: 'A structured assessment of manufacturing facilities to evaluate production capability, quality management, infrastructure, operational controls and readiness to meet buyer requirements.',
  requestLabel: 'Discuss Factory Assessment',
  sampleLabel: 'Request Sample Factory Assessment Report',
  sampleReports: 'factory-assessment',
  sections: [
    block('Assessment scope', list(['Factory profile', 'Infrastructure', 'Production capability', 'Machinery and facilities', 'Quality management system', 'Production processes', 'Incoming material control', 'In-line and final quality control', 'Testing facilities and records', 'Documentation', 'Defect management', 'CAPA', 'Production readiness', 'Compliance and workplace checks within the agreed scope'], 'checks checks--2')),
    block('Assessment workflow', `<ol class="steps steps--3">
            <li><h3>Enquiry</h3><p>You send the factory details and what you need assessed.</p></li>
            <li><h3>Confirm scope</h3><p>The assessment scope and criteria are agreed.</p></li>
            <li><h3>Location and schedule</h3><p>Factory location and visit date are confirmed.</p></li>
            <li><h3>Factory visit</h3><p>On-site visit to the manufacturing facility.</p></li>
            <li><h3>Review</h3><p>Facilities, processes and records are reviewed.</p></li>
            <li><h3>Observations</h3><p>Observations are recorded with photographs.</p></li>
            <li><h3>Assessment report</h3><p>Findings are compiled in a structured report.</p></li>
            <li><h3>Private sharing</h3><p>The report is shared privately with the client.</p></li>
            <li><h3>CAPA follow-up</h3><p>Follow-up on corrective actions if agreed.</p></li>
          </ol>`),
    `<section class="reveal">
          ${note('Not a certification', 'A factory assessment is an independent evaluation against a scope agreed with the client. It is not a certification, and no formal certificate is issued.')}
        </section>`,
  ],
});

/* ================= SAMPLE REPORTS ================= */
page({
  file: 'sample-reports.html',
  title: 'Request Sample Inspection Reports | MK Textile Service',
  description: 'Select the inspection or factory assessment report types you would like to review and submit a private sample-report request to MK Textile Service.',
  body: `${pageHero({
    trail: [['Sample Reports']],
    eyebrow: 'Sample Reports',
    h1: 'Request Sample Reports',
    lead: 'Select one or more report types you would like to review. Samples are shared privately by email or WhatsApp after your request has been reviewed.',
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
        <li class="reveal" style="--d:70ms"><h3>Complete the form</h3><p>The enquiry form opens with your selection filled in. Add your contact details.</p></li>
        <li class="reveal" style="--d:140ms"><h3>Request is reviewed</h3><p>MK Textile Service reviews each sample-report request.</p></li>
        <li class="reveal" style="--d:210ms"><h3>Sample shared privately</h3><p>A suitable sample is sent to you by email or WhatsApp.</p></li>
      </ol>
      <div class="reveal" style="margin-top:28px">
        ${note('Confidentiality', 'There is no public report library. Confidential client inspection reports are never published, and reports are not available as open downloads.', 'shield')}
      </div>
    </div>
  </section>`,
});

/* ================= ABOUT ================= */
page({
  file: 'about.html',
  title: 'About MK Textile Service | Third-Party Textile Inspection in Pakistan',
  description: 'MK Textile Service provides independent third-party inspection and factory assessment services in Pakistan, built on 30+ years of industry experience.',
  body: `${pageHero({
    trail: [['About Us']],
    eyebrow: 'About MK Textile Service',
    h1: 'Experience You Can Trust. Quality You Can Rely On.',
    lead: 'MK Textile Service provides independent third-party inspection and factory assessment services in Pakistan, supporting international buyers, brands and businesses in maintaining product quality and production standards.',
  })}
  <section class="section">
    <div class="container detail">
      <div class="detail-main prose">
        <section class="reveal">
          <h2>Who we are</h2>
          <p>With 30+ years of industry experience, our approach is built on practical textile knowledge, hands-on quality assurance expertise and a strong understanding of manufacturing processes.</p>
          <p>We understand that product quality is not just about identifying defects. It is about understanding specifications, monitoring production, evaluating materials and ensuring that products meet agreed requirements before shipment.</p>
          <p>From garment and fabric inspections to home textiles, packaging, shipment checks and factory assessments, we provide professional, objective and reliable services tailored to each client&rsquo;s requirements.</p>
        </section>
        <section class="reveal">
          <h2>Our commitment</h2>
          <p>Our commitment is simple: independent inspections, honest findings, clear communication and dependable quality support.</p>
          ${list(['Independent inspections', 'Honest findings', 'Clear communication', 'Dependable quality support'], 'checks checks--2')}
        </section>
        <section class="reveal">
          <h2>Our services</h2>
          <div class="grid grid--2">
            ${ALL.map((s) => `<a class="card" href="${s.file}"><span class="icon-tile">${icon(s.icon)}</span><h3>${s.name}</h3><p>${s.short}</p><span class="link-arrow">View details ${arrow}</span></a>`).join('\n            ')}
          </div>
        </section>
      </div>
      <aside class="detail-aside">
        <div class="stat-card">
          <p class="stat">30+</p>
          <p class="stat-label">Years of Industry Experience</p>
        </div>
        <div class="aside-card">
          <h2>Discuss your inspection requirements</h2>
          <p>Send the product, service, location and preferred date through the enquiry form.</p>
          <a class="btn btn--primary btn--block" href="contact.html#enquiry">Discuss Your Requirements ${arrow}</a>
          <a class="btn btn--outline btn--block" href="sample-reports.html">${icon('report')}Request Sample Reports</a>
        </div>
      </aside>
    </div>
  </section>`,
});

/* ================= KNOWLEDGE CENTRE ================= */
const FAQS = [
  ['Which products do you inspect?', 'Garments (apparel, denim and woven garments, knitwear, sportswear, socks and hosiery, children&rsquo;s wear), fabrics and materials, home textiles such as towels and bedding, and finished-goods packing and shipments.'],
  ['At which production stages can an inspection be carried out?', 'From the Pre-Production Check (PPC) through Initial Production Check (IPC), During Production Check (DUPRO), Final Random Inspection (FRI) and Pre-Shipment Inspection (PSI). 100% inspection, re-inspection and in-line quality checks are also available.'],
  ['How much does an inspection cost?', 'Estimated standard fees are US$200 per man-day for inspection services and US$275 per man-day for factory assessment. The final quotation depends on inspection scope, duration and required manpower.'],
  ['Where are you based?', 'MK Textile Service is based in Karachi, Pakistan.'],
  ['How are the sampling plan and acceptance criteria decided?', 'The scope, sampling plan and acceptance criteria are agreed with the client for each inspection. There is no single universal setting applied to every order.'],
  ['Can I see a sample report before booking?', 'Yes. Select the report types on the Sample Reports page and submit the request. A suitable sample is shared privately after the request has been reviewed.'],
  ['Is a factory assessment a certification?', 'No. It is an independent evaluation against a scope agreed with the client. No formal certificate is issued.'],
];
const CATS = [...new Set(ARTICLES.map((a) => a.cat))];

page({
  file: 'knowledge-centre.html',
  title: 'Knowledge Centre | Textile Inspection Guides &amp; FAQs | MK Textile Service',
  description: 'Textile inspection guides and frequently asked questions on AQL sampling, fabric inspection, garment defects, container checks and factory assessment.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })),
  },
  body: `${pageHero({
    trail: [['Knowledge Centre']],
    eyebrow: 'Knowledge Centre',
    h1: 'Inspection guides and FAQs',
    lead: 'Short, practical guides on textile inspection, and answers to common questions.',
    iconName: 'book',
  })}
  <section class="section">
    <div class="container">
      ${CATS.map((cat) => `<div class="kc-group">
        <h2 class="kc-cat reveal">${cat}</h2>
        <div class="grid grid--3">
          ${ARTICLES.filter((a) => a.cat === cat).map((a) => articleCard(a)).join('\n          ')}
        </div>
      </div>`).join('\n      ')}
      <div class="reveal" style="margin-top:36px">
        ${note('Educational content', 'These guides are general educational material. They are not a substitute for the full text of any standard or for buyer-specific inspection criteria.')}
      </div>
    </div>
  </section>
  <section class="section section--alt">
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
  ${defaultCta}`,
});

for (const a of ARTICLES) {
  page({
    file: a.file,
    section: 'knowledge-centre.html',
    title: `${a.title} | MK Textile Service`,
    description: a.desc,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: strip(a.title),
      description: strip(a.desc),
      author: { '@type': 'Organization', name: SITE },
      publisher: { '@type': 'Organization', name: SITE },
    },
    body: `${pageHero({
      trail: [['Knowledge Centre', 'knowledge-centre.html'], [a.title]],
      eyebrow: a.cat,
      h1: a.title,
      lead: a.intro,
    })}
  <section class="section">
    <div class="container detail">
      <article class="detail-main">
        ${a.parts.map(([h, items]) => block(h, list(items, 'checks'))).join('\n        ')}
        <section class="reveal">
          ${note('Keep in mind', a.close)}
        </section>
      </article>
      <aside class="detail-aside">
        <div class="aside-card">
          <h2>Related service</h2>
          <p>${a.related.name}: ${a.related.short}</p>
          <a class="btn btn--primary btn--block" href="${a.related.file}">View Service ${arrow}</a>
          <a class="btn btn--outline btn--block" href="${enquiry(a.related.key)}">Send an Enquiry</a>
        </div>
        <div class="aside-links">
          <h2>More guides</h2>
          <ul>
            ${ARTICLES.filter((o) => o !== a).slice(0, 5).map((o) => `<li><a href="${o.file}">${o.title}${icon('arrow')}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </aside>
    </div>
  </section>
  ${defaultCta}`,
  });
}

/* ================= CONTACT ================= */
const ENQUIRY_TYPES = [
  ['general', 'General Enquiry'],
  ['garment', 'Garment Inspection'],
  ['fabric', 'Fabric &amp; Material Inspection'],
  ['home-textile', 'Home Textile Inspection'],
  ['packaging', 'Packaging &amp; Shipment Inspection'],
  ['container-loading', 'Container Loading Supervision'],
  ['container-unloading', 'Container Unloading Inspection'],
  ['factory-assessment', 'Factory Assessment'],
  ['sample-report', 'Sample Report Request'],
];

page({
  file: 'contact.html',
  title: 'Contact MK Textile Service | Inspection Enquiry Form',
  description: 'Contact MK Textile Service about textile inspection or factory assessment in Pakistan. Send an enquiry or request a sample report.',
  body: `${pageHero({
    trail: [['Contact Us']],
    eyebrow: 'Contact Us',
    h1: 'Get in touch',
    lead: 'Use the enquiry form for inspection requests, factory assessments and sample reports. One form covers every type of enquiry.',
  })}
  <section class="section">
    <div class="container contact-grid">
      <div class="contact-list">
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('mail')}</span>
          <div><h3>Email</h3><p><a href="mailto:${EMAIL}">${EMAIL}</a></p><a class="link-arrow" href="#enquiry">Use the enquiry form ${arrow}</a></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('chat')}</span>
          <div><h3>Phone &amp; WhatsApp</h3><p><a href="tel:${PHONE}">${PHONE_DISPLAY}</a></p><a class="link-arrow" href="${WA_URL}" data-whatsapp>Chat on WhatsApp ${arrow}</a></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('pin')}</span>
          <div><h3>Location</h3><p>Based in Karachi, Pakistan</p></div>
        </div>
        <div class="contact-item reveal">
          <span class="icon-tile">${icon('globe')}</span>
          <div><h3>Website</h3><p>mktextileservice.com</p></div>
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
              <label for="f-type">Enquiry Type / Inspection Category <span class="req">*</span></label>
              <select id="f-type" name="enquiryType" required>
                ${ENQUIRY_TYPES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
              </select>
              <span class="error">Please choose an enquiry type.</span>
            </div>
            <div class="field">
              <label for="f-stage">Inspection Stage <span class="opt">(if relevant)</span></label>
              <select id="f-stage" name="inspectionStage">
                <option value="">Not applicable / not sure</option>
                ${STAGES.map(([code, name]) => `<option>${/^[A-Z]{3,5}$/.test(code) ? code + ' – ' : ''}${name}</option>`).join('')}
              </select>
            </div>
            <fieldset class="field field--full" data-report-field hidden>
              <legend>Selected Report Type(s)</legend>
              <div class="check-grid">
                ${REPORTS.map(([value, name]) => `<label><input type="checkbox" name="reports" value="${value}">${name}</label>`).join('\n                ')}
              </div>
            </fieldset>
            <div class="field">
              <label for="f-location">Factory / Inspection Location in Pakistan <span class="opt">(optional)</span></label>
              <input id="f-location" name="location" type="text" placeholder="e.g. Karachi">
            </div>
            <div class="field">
              <label for="f-qty">Product Quantity <span class="opt">(if known)</span></label>
              <input id="f-qty" name="quantity" type="text" inputmode="numeric">
            </div>
            <div class="field">
              <label for="f-date">Preferred Inspection Date <span class="opt">(optional)</span></label>
              <input id="f-date" name="preferredDate" type="date">
            </div>
            <div class="field field--full">
              <label for="f-message">Inspection Requirements / Details <span class="req">*</span></label>
              <textarea id="f-message" name="message" required></textarea>
              <span class="error">Please describe your requirements.</span>
            </div>
            <div class="hp" aria-hidden="true">
              <label for="f-website">Leave this field empty</label>
              <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>
          </div>
          <div class="form-foot">
            <p>Your details are used only to respond to this enquiry. See our <a href="privacy-policy.html">Privacy Policy</a>.</p>
            <button class="btn btn--primary" type="submit">Send Enquiry ${arrow}</button>
          </div>
          <div class="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </div>
  </section>`,
});

/* ================= LEGAL ================= */
const legalPage = (file, h1, lead, parts) => page({
  file,
  noindex: true,
  title: `${h1} | MK Textile Service`,
  description: lead,
  body: `${pageHero({ trail: [[h1]], eyebrow: 'Legal', h1, lead })}
  <section class="section">
    <div class="container legal prose">
      ${parts.map(([h, html]) => `<section class="reveal"><h2>${h}</h2>${html}</section>`).join('\n      ')}
    </div>
  </section>`,
});

legalPage('privacy-policy.html', 'Privacy Policy', 'How MK Textile Service handles the information you send through this website.', [
  ['Information we collect', `<p>When you send an enquiry or a sample-report request, we receive the details you enter in the form: your name, company name, email address, country, the service you are enquiring about, any inspection stage, location, quantity and preferred date you provide, and your message.</p>`],
  ['How we use it', `<p>We use these details only to review your requirements, respond to your enquiry, prepare a quotation and share requested sample reports. We do not ask for information we do not need for these purposes.</p>`],
  ['Who receives it', `<p>Enquiry details are received by MK Textile Service. Service providers that support the website, such as hosting and email, may process the data on our behalf. This website loads its typeface from Google Fonts.</p>`],
  ['Cookies and analytics', `<p>This website does not currently use analytics or marketing cookies. If these are introduced, a cookie preference banner will be shown first so that you can accept or reject optional cookies.</p>`],
  ['Retention and your requests', `<p>Enquiry records are kept only as long as needed to handle your enquiry and any resulting business relationship. You may ask us to correct or delete your details, where applicable.</p>`],
  ['Contact', `<p>For privacy questions or requests, email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`],
]);

legalPage('terms.html', 'Terms &amp; Conditions', 'Terms for using the MK Textile Service website and its enquiry form.', [
  ['Website information', `<p>The content of this website is provided for general information about our services. We aim to keep it accurate, but it may change without notice. Knowledge Centre guides are educational and are not a substitute for the full text of any standard or for buyer-specific criteria.</p>`],
  ['Enquiries and quotations', `<p>Sending an enquiry does not create a contract. Rates shown on this website are estimates, not fixed quotations. ${RATE_NOTE}</p>`],
  ['Inspection scope', `<p>Each inspection or assessment is carried out against the scope, specifications, sampling plan and acceptance criteria agreed with the client for that assignment.</p>`],
  ['Inspection disclaimer', `<p>This report represents the inspection findings observed at the time and location of inspection, based on the agreed scope, specifications and sampling requirements. The findings relate only to the items and conditions examined. An inspection based on sampling does not guarantee that every item in an inspected lot or shipment is free from defects. The report should be considered together with the agreed inspection criteria and any limitations recorded during the inspection.</p>`],
  ['Confidentiality', `<p>Client inspection and assessment reports are confidential. Sample reports are shared privately on request and are not published on this website.</p>`],
  ['Intellectual property', `<p>The content and design of this website belong to MK Textile Service and may not be reused without permission.</p>`],
  ['Contact', `<p>Questions about these terms can be sent to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`],
]);

/* ---------- robots, sitemap ---------- */
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

const urls = built.map((f) => `  <url><loc>${SITE_URL}/${f === 'index.html' ? '' : f.replace(/\.html$/, '')}</loc></url>`).join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`Built ${built.length} indexed pages + 2 legal pages.`);
