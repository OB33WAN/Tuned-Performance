const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "outputs");
const date = "2026-06-26";
const base = "https://tunedperformance.co.uk/";
const areas = ["Feltham", "Bedfont", "Ashford", "Sunbury", "Hounslow", "Kingston"];
const areaObjects = areas.map((name) => ({ "@type": "City", name }));

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sitewideBlock = indexHtml.match(
  /    <script type="application\/ld\+json" data-seo-schema="sitewide">[\s\S]*?    <\/script>/
)[0];

const navOld =
  '<a href="services.html">Services</a><a href="pricing.html">Pricing</a><a href="estimator.html">Estimator</a><a href="recent-jobs.html">Recent jobs</a><a href="areas.html">Areas</a><a href="reviews.html">Reviews</a><a href="contact.html">Book</a>';
const navNew =
  '<a href="services.html">All services</a><a href="pricing.html">Pricing</a><a href="estimator.html">Estimator</a><a href="recent-jobs.html">Recent jobs</a><a href="areas.html">Areas</a><a href="guides.html">Guides</a><a href="reviews.html">Reviews</a><a href="contact.html">Book</a>';
const footerPagesOld =
  '<h2>Pages</h2><a href="services.html">Services</a><a href="pricing.html">Pricing</a><a href="estimator.html">Estimator</a><a href="recent-jobs.html">Recent jobs</a><a href="availability.html">Availability</a><a href="areas.html">Areas covered</a><a href="contact.html">Contact</a>';
const footerPagesNew =
  '<h2>Pages</h2><a href="services.html">Services</a><a href="pricing.html">Pricing</a><a href="estimator.html">Estimator</a><a href="recent-jobs.html">Recent jobs</a><a href="availability.html">Availability</a><a href="areas.html">Areas covered</a><a href="guides.html">Guides</a><a href="contact.html">Contact</a>';
const serviceNav = `<nav class="service-link-nav" aria-label="Direct service navigation" data-service-nav><div class="container"><span class="service-link-nav__label">Service pages</span><a href="scratch-bumper-repairs.html">Bumper scratch repairs</a><a href="single-panel-repair-respray.html">Single panel respray</a><a href="obd-diagnostics.html">Car and engine diagnostics</a><a href="bmw-mini-coding.html">BMW and MINI coding</a><a href="mot-support.html">MOT prep and fault checks</a><a href="ecu-remapping.html">ECU remapping</a><a href="trim-fitment.html">Car styling and accessory fitting</a></div></nav>`;

function esc(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  })[char]);
}

function jsonScript(key, data) {
  return `    <script type="application/ld+json" data-seo-schema="${key}">\n      ${JSON.stringify(data, null, 6).replace(/\n/g, "\n      ")}\n    </script>`;
}

function header() {
  return `<header class="site-header" data-header><div class="container header-inner"><a class="brand" href="index.html"><img class="brand-logo" src="assets/tuned-performance-logo-cropped.jpg" alt="" aria-hidden="true"><span><strong>Tuned Performance</strong><small>Mobile car care - Feltham</small></span></a><button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><nav class="site-nav" aria-label="Primary navigation" data-nav><div class="mobile-nav-header"><div><strong>Menu</strong><small>Direct page links for services and booking</small></div><button class="mobile-nav-close" type="button" aria-label="Close menu" data-nav-close><span aria-hidden="true"></span></button></div>${navNew}<div class="mobile-nav-section-title">Service pages</div><a class="mobile-service-link" href="scratch-bumper-repairs.html">Bumper scratch repairs</a><a class="mobile-service-link" href="single-panel-repair-respray.html">Single panel respray</a><a class="mobile-service-link" href="obd-diagnostics.html">Car and engine diagnostics</a><a class="mobile-service-link" href="bmw-mini-coding.html">BMW and MINI coding</a><a class="mobile-service-link" href="mot-support.html">MOT prep and fault checks</a><a class="mobile-service-link" href="ecu-remapping.html">ECU remapping</a><a class="mobile-service-link" href="trim-fitment.html">Car styling and accessory fitting</a><div class="mobile-nav-actions"><a class="mobile-nav-action mobile-nav-action--call" href="tel:+447933705124">Call now</a><a class="mobile-nav-action mobile-nav-action--whatsapp" href="https://wa.me/447933705124" target="_blank" rel="noopener">WhatsApp</a></div></nav><a class="header-cta" href="tel:+447933705124">Call 07933 705124</a></div>${serviceNav}</header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/tuned-performance-logo-cropped.jpg" alt="" aria-hidden="true"><span><strong>Tuned Performance</strong><small>Mobile car care - Feltham</small></span></a><p>Mobile car repairs, diagnostics, BMW and MINI coding, fitment, MOT support and ECU remap enquiries. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.</p></div><div>${footerPagesNew}</div><div><h2>Services</h2><a href="bumper-repair-feltham.html">Bumper scratch repair Feltham</a><a href="single-panel-respray-feltham.html">Single panel respray Feltham</a><a href="mobile-obd-diagnostics-feltham.html">Car diagnostics Feltham</a><a href="bmw-mini-coding-feltham.html">BMW and MINI coding Feltham</a><a href="trim-fitment.html">Car styling and accessory fitting</a><a href="mot-support.html">MOT prep and fault checks</a></div><div><h2>Trust</h2><a href="about.html">About</a><a href="recent-jobs.html">Recent jobs</a><a href="gallery.html">Gallery</a><a href="reviews.html">Reviews</a><a href="refer-a-friend.html">Refer a friend</a><a href="faq.html">FAQ</a><a href="https://g.page/r/CZnD7eUE_OmbEBM/review" target="_blank" rel="noopener">Google review</a><a href="https://www.trustpilot.com/review/tunedperformance.co.uk" target="_blank" rel="noopener">Trustpilot</a></div><div><h2>Legal</h2><a href="privacy-gdpr.html">Privacy and GDPR</a><a href="terms.html">Terms</a><a href="cookies.html">Cookies</a><a href="cancellation-policy.html">Cancellation</a></div></div><div class="container footer-bottom"><span>&copy; 2026 Tuned Performance. All rights reserved.</span><a href="#main">Back to top</a></div></footer>`;
}

function cookieBits() {
  return `<div class="mobile-bar" aria-label="Quick contact"><a href="tel:+447933705124">Call</a><a href="https://wa.me/447933705124" target="_blank" rel="noopener">WhatsApp</a><a href="contact.html">Quote</a></div><div class="cookie-banner" data-cookie-banner><p>We use essential session storage to remember your choice while you browse and optional Google Analytics to measure enquiries. Choose analytics or essential only.</p><div><a class="btn btn-secondary btn-on-light" href="cookies.html">Cookies</a><a class="btn btn-secondary btn-on-light" href="privacy-gdpr.html">Privacy</a><button class="btn btn-secondary btn-on-light" type="button" data-cookie-reject>Essential only</button><button class="btn btn-primary" type="button" data-cookie-accept>Accept analytics</button></div></div><script src="script.js"></script>`;
}

function breadcrumbs(items) {
  return items
    .map((item, index) =>
      index === items.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.href)}">${esc(item.name)}</a><span>/</span>`
    )
    .join("");
}

function pageSchema(file, title, description, crumbs) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${file}#webpage`,
        url: `${base}${file}`,
        name: title,
        description,
        isPartOf: { "@id": `${base}#website` },
        about: { "@id": `${base}#business` },
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${base}${file}#breadcrumb`,
        itemListElement: crumbs.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.href === "index.html" ? base : `${base}${item.href}`,
        })),
      },
    ],
  };
}

function serviceSchema(file, description, serviceType, price) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}${file}#service`,
    name: serviceType,
    description,
    serviceType,
    url: `${base}${file}`,
    provider: { "@id": `${base}#business` },
    areaServed: areaObjects,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price,
      availability: "https://schema.org/InStock",
      url: `${base}${file}`,
    },
  };
}

function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function articleSchema(file, title, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${base}${file}`,
    datePublished: date,
    dateModified: date,
    author: { "@id": `${base}#business` },
    publisher: { "@id": `${base}#business` },
    inLanguage: "en-GB",
  };
}

function renderCards(cards) {
  return cards
    .map(
      (card) =>
        `<article class="detail-card"><h2>${card.h}</h2><p>${card.p}</p>${(card.links || [])
          .map((l) => `<a href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ""}>${l.text}</a>`)
          .join("")}</article>`
    )
    .join("");
}

function renderFaq(faqs) {
  return `<section class="section section-light"><div class="container section-heading"><p class="eyebrow">FAQ</p><h2>Questions this page answers</h2></div><div class="container faq-list">${faqs
    .map((item, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(item[0])}</summary><p>${esc(item[1])}</p></details>`)
    .join("")}</div></section>`;
}

function renderPage(data) {
  const crumbs = [{ name: "Home", href: "index.html" }, ...data.crumbs];
  const schemas = [sitewideBlock, jsonScript("page", pageSchema(data.file, data.title, data.description, crumbs))];
  if (data.service) schemas.push(jsonScript("service", serviceSchema(data.file, data.description, data.service.type, data.service.price)));
  if (data.article) schemas.push(jsonScript("article", articleSchema(data.file, data.title, data.description)));
  if (data.faqs?.length) schemas.push(jsonScript("faq", faqSchema(data.faqs)));

  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(data.title)}</title>
    <meta name="description" content="${esc(data.description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${base}${data.file}">
    <meta property="og:title" content="${esc(data.title)}">
    <meta property="og:description" content="${esc(data.description)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_GB">
    <meta property="og:url" content="${base}${data.file}">
    <meta property="og:image" content="${base}${data.image || "assets/hero-bmw-m3-dark.jpg"}">
    <meta property="og:image:alt" content="${esc(data.imageAlt || "Tuned Performance mobile car services")}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(data.title)}">
    <meta name="twitter:description" content="${esc(data.description)}">
    <meta name="twitter:image" content="${base}${data.image || "assets/hero-bmw-m3-dark.jpg"}">
    <meta name="geo.placename" content="105 Swan Road, Feltham, TW13 6PE, United Kingdom">
    <meta name="geo.region" content="GB">
    <meta name="coverage" content="105 Swan Road, Feltham TW13 6PE; Feltham, Bedfont, Ashford, Sunbury, Hounslow, Kingston">
    <meta name="keywords" content="${esc(data.keywords)}">
    <meta name="theme-color" content="#101214">
    <link rel="manifest" href="manifest.webmanifest">
    <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
    <link rel="icon" href="assets/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Tuned Performance">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="stylesheet" href="styles.css">
${schemas.join("\n")}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${header()}
    <main id="main">
      <section class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbs(crumbs)}</nav><p class="eyebrow">${esc(data.eyebrow)}</p><h1>${esc(data.h1)}</h1><p>${esc(data.intro)}</p><div class="hero-actions"><a class="btn btn-primary" href="contact.html">${esc(data.primaryCta || "Request a quote")}</a><a class="btn btn-secondary" href="estimator.html">Use estimator</a></div></div></section>
      <section class="section section-light"><div class="container split"><div><p class="eyebrow">${esc(data.mainEyebrow || "Local SEO focus")}</p><h2>${esc(data.mainHeading)}</h2>${data.mainParagraphs.map((p) => `<p>${p}</p>`).join("")}<div class="trust-row"><span>Feltham based</span><span>Weekday/weekend requests</span><span>Quote-ready forms</span></div></div><img class="feature-image" src="${data.image || "assets/hero-bmw-m3-dark.jpg"}" alt="${esc(data.imageAlt || data.h1)}" loading="lazy"></div></section>
      <section class="section section-dark"><div class="container section-heading"><p class="eyebrow">Search intent</p><h2>${esc(data.cardsHeading)}</h2><p>${esc(data.cardsIntro)}</p></div><div class="container content-grid">${renderCards(data.cards)}</div></section>
      <section class="section section-light"><div class="container content-grid"><article class="detail-card"><h2>Internal links</h2><p>Move between the main service page, local area page, pricing guide and enquiry form without starting again.</p><a href="services.html">All services</a><a href="pricing.html">Pricing</a><a href="areas.html">Areas covered</a><a href="contact.html">Contact</a></article><article class="detail-card highlight"><h2>What to send</h2><p>${esc(data.whatToSend)}</p><a href="contact.html">Send details</a></article><article class="detail-card"><h2>Recent work</h2><p>Use recent jobs and gallery pages to build trust before sending a quote request.</p><a href="recent-jobs.html">Recent jobs</a><a href="gallery.html">Gallery</a></article></div></section>
      ${data.faqs?.length ? renderFaq(data.faqs) : ""}
      <section class="conversion-strip"><div class="container"><div><h2>${esc(data.conversionHeading)}</h2><p>${esc(data.conversionText)}</p></div><a class="btn btn-primary" href="contact.html">${esc(data.primaryCta || "Request a quote")}</a></div></section>
    </main>
    ${footer()}
    ${cookieBits()}
  </body>
</html>
`;
}

const pages = [
  {
    file: "bumper-repair-feltham.html",
    title: "Bumper Repair Feltham | Mobile Scuff and Scratch Quotes | Tuned Performance",
    description: "Photo-led bumper repair quotes in Feltham for scuffs, scratches and minor bumper damage, with weekday and weekend availability requests.",
    keywords: "bumper repair Feltham, bumper scuff repair Feltham, mobile bumper repair TW13, car scratch repair Feltham, Tuned Performance bumper repair",
    crumbs: [{ name: "Bumper Repair Feltham", href: "bumper-repair-feltham.html" }],
    eyebrow: "Bumper repair Feltham",
    h1: "Bumper repair quotes in Feltham from clear photos",
    intro: "Send bumper damage photos, vehicle details and postcode so Tuned Performance can confirm whether a mobile repair or workshop route makes sense.",
    mainHeading: "A focused page for bumper scuff and scratch searches",
    mainParagraphs: [
      "Bumper damage searches are usually urgent and local. This page is built around the exact enquiry route a Feltham driver needs: photos, guide price, availability and contact.",
      "The fastest quote route is a close-up photo, one wider photo of the bumper, the registration or vehicle model, and the best weekday or weekend appointment preference.",
    ],
    cardsHeading: "What affects a bumper repair quote?",
    cardsIntro: "These details decide whether the bumper repair can be quoted from photos or needs extra checking.",
    cards: [
      { h: "Damage depth", p: "Surface scuffs, cracks, paint transfer and deep scratches need different repair routes.", links: [{ href: "scratch-bumper-repairs.html", text: "Bumper repairs" }] },
      { h: "Paint and sensors", p: "Colour, parking sensors, trim texture and previous repairs can change the preparation needed.", links: [{ href: "pricing.html", text: "Guide pricing" }] },
      { h: "Location and access", p: "Feltham and nearby route planning depends on safe access, weather and space around the vehicle.", links: [{ href: "areas.html", text: "Areas covered" }] },
    ],
    whatToSend: "Send one close photo, one wider bumper photo, vehicle make/model, registration if comfortable, colour or paint code if known, postcode and availability preference.",
    conversionHeading: "Need a bumper repair quote in Feltham?",
    conversionText: "Send the photos and vehicle details once so the right repair route can be confirmed quickly.",
    image: "assets/real-bumper-scratch-spot-repairs.jpg",
    imageAlt: "Before and after bumper repair work",
    service: { type: "Bumper repair in Feltham", price: "60" },
    faqs: [
      ["Can bumper repair be quoted from photos?", "Often, yes. Clear close-up and wider photos usually allow an initial guide price, but cracks, sensors or previous repairs may need further checking."],
      ["Does Tuned Performance cover Feltham?", "Yes. Tuned Performance is based at 105 Swan Road, Feltham, TW13 6PE and handles mobile enquiries around Feltham and nearby towns."],
      ["How fast can I get a bumper repair price?", "The fastest route is to send the vehicle, postcode, clear photos and availability preference in one message."],
    ],
  },
  {
    file: "single-panel-respray-feltham.html",
    title: "Single Panel Repair and Respray Feltham | Tuned Performance",
    description: "Single panel repair and re-spray enquiries in Feltham for scratches, scuffs and paint damage, with photo-led quote guidance.",
    keywords: "single panel repair Feltham, panel respray Feltham, car paint repair Feltham, mobile panel repair TW13, car scratch respray Feltham",
    crumbs: [{ name: "Single Panel Respray Feltham", href: "single-panel-respray-feltham.html" }],
    eyebrow: "Panel repair Feltham",
    h1: "Single panel repair and re-spray enquiries in Feltham",
    intro: "Use this page when one panel needs repair, preparation or re-spray guidance before a booking is confirmed.",
    mainHeading: "Designed for drivers searching for panel paint repair locally",
    mainParagraphs: [
      "Single panel repair searches are different from small scratch searches because the price depends on panel size, colour, damage depth and blend risk.",
      "Send photos before booking so Tuned Performance can confirm if the job is a realistic mobile route or needs a workshop recommendation.",
    ],
    cardsHeading: "What decides the panel repair route?",
    cardsIntro: "A useful quote needs the condition and location of the panel, not only a short description.",
    cards: [
      { h: "Panel type", p: "Doors, wings, bumpers and quarter panels have different access, preparation and finish considerations.", links: [{ href: "single-panel-repair-respray.html", text: "Panel repair service" }] },
      { h: "Paint finish", p: "Metallic, pearl, three-stage and previous repairs may need extra care before a final quote.", links: [{ href: "pricing.html", text: "Pricing guide" }] },
      { h: "Damage spread", p: "Wide scratches, dents or edge damage can change the repair scope quickly.", links: [{ href: "estimator.html", text: "Estimator" }] },
    ],
    whatToSend: "Send a wide photo of the full panel, a close-up of the damage, paint code if known, vehicle details, postcode and preferred weekday or weekend timing.",
    conversionHeading: "Need single panel repair guidance?",
    conversionText: "Send photos first so the right price route can be confirmed before a booking.",
    image: "assets/real-small-scratch-repairs.jpg",
    imageAlt: "Car panel scratch requiring repair and paint work",
    service: { type: "Single panel repair and re-spray in Feltham", price: "120" },
    faqs: [
      ["Is a single panel repair the same as a bumper scuff repair?", "No. Single panel repair and re-spray can involve more preparation, paint matching and finish work than a small bumper scuff."],
      ["Can you quote from one photo?", "A close-up helps, but a full-panel photo is also needed to understand the repair size and panel shape."],
      ["Can I request weekend availability?", "Yes. Saturday or Sunday route options can be requested, subject to service type, route and confirmation."],
    ],
  },
  {
    file: "mobile-obd-diagnostics-feltham.html",
    title: "Car and Engine Diagnostics Feltham | Warning Light Checks | Tuned Performance",
    description: "Mobile car and engine diagnostics in Feltham for warning lights, fault symptoms, MOT issues and next-step repair guidance.",
    keywords: "car and engine diagnostics Feltham, warning light check Feltham, car diagnostic Feltham, engine light diagnostic TW13, mobile diagnostics Feltham",
    crumbs: [{ name: "Car Diagnostics Feltham", href: "mobile-obd-diagnostics-feltham.html" }],
    eyebrow: "Car diagnostics Feltham",
    h1: "Car and engine diagnostics for warning lights in Feltham",
    intro: "Send warning light details, symptoms and vehicle information so the right diagnostic or MOT support route can be confirmed.",
    mainHeading: "Capture high-intent warning light searches",
    mainParagraphs: [
      "Drivers searching for car and engine diagnostics usually need a fast answer and a clear next step. This page is built to capture that search intent and route it into the estimator or contact form.",
      "A diagnostic scan can provide fault code guidance, but faults may still need further testing depending on symptoms, vehicle history and live data.",
    ],
    cardsHeading: "What helps before a diagnostic visit?",
    cardsIntro: "Better details reduce back-and-forth and make the appointment more useful.",
    cards: [
      { h: "Warning lights", p: "Engine light, ABS, airbag, emissions and other warnings should be described clearly.", links: [{ href: "obd-diagnostics.html", text: "Car diagnostics service" }] },
      { h: "Symptoms", p: "Tell us if the car is in limp mode, misfiring, hard to start or showing intermittent faults.", links: [{ href: "contact.html", text: "Send symptoms" }] },
      { h: "MOT context", p: "If the diagnostic request is MOT-related, send the due date or fail sheet too.", links: [{ href: "mot-support.html", text: "MOT support" }] },
    ],
    whatToSend: "Send vehicle make/model/year, warning light photos, symptoms, when the fault started, postcode and whether the car is safe to drive.",
    conversionHeading: "Need a warning light checked in Feltham?",
    conversionText: "Send the symptoms and vehicle details so the diagnostic route can be confirmed.",
    image: "assets/real-obd-scanning.jpg",
    imageAlt: "OBD scanner connected for car diagnostic check",
    service: { type: "Car and engine diagnostics in Feltham", price: "35" },
    faqs: [
      ["Does a diagnostic scan fix the fault?", "No. A diagnostic scan gives fault code guidance and next steps. Repair work depends on what the diagnostic information shows."],
      ["Can diagnostics help before an MOT?", "Yes. Warning lights and symptoms before an MOT can be checked so the next route is clearer."],
      ["What if the car is not safe to drive?", "Say this in the enquiry. The route may need to change depending on safety, access and the fault type."],
    ],
  },
  {
    file: "bmw-mini-coding-feltham.html",
    title: "BMW and MINI Coding Feltham | BimmerCode Hidden Features | Tuned Performance",
    description: "BMW and MINI coding in Feltham using BimmerCode for supported models, hidden factory options and comfort feature personalisation.",
    keywords: "BMW coding Feltham, MINI coding Feltham, BimmerCode Feltham, hidden BMW features, Mini coding TW13, iDrive coding Feltham",
    crumbs: [{ name: "BMW MINI Coding Feltham", href: "bmw-mini-coding-feltham.html" }],
    eyebrow: "BMW/MINI coding Feltham",
    h1: "BMW and MINI coding for hidden factory settings in Feltham",
    intro: "Request a compatibility check for supported BimmerCode coding options, comfort features, lighting settings and iDrive preferences.",
    mainHeading: "A local landing page for a specialist service",
    mainParagraphs: [
      "BMW/MINI coding is a strong local search opportunity because it is specific, specialist and less competitive than broad car repair terms.",
      "Coding depends on model, year, ECU hardware, head unit and software support. The safest route is to send a feature list before booking.",
    ],
    cardsHeading: "Common BMW/MINI coding routes",
    cardsIntro: "Only supported, safe and road-legal settings will be considered.",
    cards: [
      { h: "Comfort coding", p: "Mirror fold behaviour, lock/unlock preferences and supported convenience options.", links: [{ href: "bmw-mini-coding.html", text: "Coding service" }] },
      { h: "Lighting and display", p: "Supported welcome light, DRL, digital speed and iDrive display personalisation.", links: [{ href: "https://bimmercode.app/", text: "BimmerCode reference", external: true }] },
      { h: "Compatibility check", p: "Best for customers unsure what their BMW or MINI supports.", links: [{ href: "contact.html", text: "Request check" }] },
    ],
    whatToSend: "Send BMW or MINI model, year, iDrive/head-unit type if known, registration or VIN if comfortable, current warning lights and exact coding features wanted.",
    conversionHeading: "Want BMW or MINI hidden features enabled?",
    conversionText: "Send the feature list first so compatibility can be checked before booking.",
    image: "assets/real-ecu-remapping.jpg",
    imageAlt: "Laptop connected inside a car for coding and software work",
    service: { type: "BMW and MINI coding in Feltham", price: "40" },
    faqs: [
      ["Is coding the same as remapping?", "No. Coding changes supported factory settings. Remapping changes engine calibration and is handled separately as an enquiry route."],
      ["Will every hidden feature work?", "No. Feature availability depends on model, year, hardware, software and BimmerCode support."],
      ["Can coded settings be reversed?", "Many settings can be changed again where the module supports it, but previous coding and dealer updates can affect the route."],
    ],
  },
  {
    file: "car-repair-photo-guide.html",
    title: "How to Send Car Repair Photos for a Faster Quote | Tuned Performance",
    description: "A practical guide showing what photos and details to send for bumper repair, single panel repair, trim fitment and car repair quotes.",
    keywords: "car repair quote photos, bumper repair photo guide, car scratch quote photos, Feltham car repair guide, Tuned Performance quote guide",
    crumbs: [{ name: "Guides", href: "guides.html" }, { name: "Photo Guide", href: "car-repair-photo-guide.html" }],
    eyebrow: "Quote guide",
    h1: "How to send car repair photos for a faster quote",
    intro: "Use this guide before sending a repair or fitment enquiry so the quote can be reviewed with less back-and-forth.",
    mainHeading: "Good photos make a local quote more accurate",
    mainParagraphs: [
      "A repair quote needs context. One close-up photo is useful, but a wider photo often matters more because it shows the panel, bumper shape, trim and surrounding damage.",
      "For paint and bumper work, include the postcode, vehicle model, registration if comfortable, colour or paint code if known, and preferred availability.",
    ],
    cardsHeading: "Photo set to send",
    cardsIntro: "This simple set works for most bumper, panel and fitment enquiries.",
    cards: [
      { h: "Close-up", p: "Take one clear close-up of the damage in daylight with the camera steady.", links: [{ href: "bumper-repair-feltham.html", text: "Bumper quote page" }] },
      { h: "Wide panel photo", p: "Step back and show the whole panel or bumper so the repair area is clear.", links: [{ href: "single-panel-respray-feltham.html", text: "Panel repair page" }] },
      { h: "Part or access photo", p: "For fitment work, include the part, fixings and vehicle area where it will be installed.", links: [{ href: "trim-fitment.html", text: "Fitment service" }] },
    ],
    whatToSend: "Send close-up and wide photos, vehicle details, postcode, colour code if known, part links if relevant and preferred timing.",
    conversionHeading: "Ready to send the photos?",
    conversionText: "Use the contact form or WhatsApp route so the repair can be reviewed quickly.",
    image: "assets/real-bumper-scratch-spot-repairs.jpg",
    imageAlt: "Car bumper repair photo example",
    article: true,
    faqs: [
      ["How many photos should I send?", "Send at least one close-up and one wider photo. More photos help if the damage wraps around an edge or includes trim."],
      ["Should I send the registration?", "It helps identify the vehicle, but only send it if you are comfortable. Make, model and year can also work."],
      ["Can photos confirm the final price?", "Photos can support a guide quote, but final price depends on the real condition, access, paint and job suitability."],
    ],
  },
  {
    file: "mot-warning-light-guide.html",
    title: "Warning Light Before MOT? What to Send First | Tuned Performance",
    description: "Guide for drivers with warning lights before MOT, including what details to send for diagnostics, MOT support and garage routing.",
    keywords: "warning light before MOT, MOT warning light Feltham, car diagnostic before MOT, OBD scan before MOT, MOT support Feltham",
    crumbs: [{ name: "Guides", href: "guides.html" }, { name: "MOT Warning Light Guide", href: "mot-warning-light-guide.html" }],
    eyebrow: "MOT guide",
    h1: "Warning light before MOT? Send these details first",
    intro: "If a warning light appears before MOT, send the right details so diagnostics, repair advice or garage routing can be confirmed.",
    mainHeading: "MOT-related searches need a clear next step",
    mainParagraphs: [
      "A warning light before MOT can mean anything from a stored fault to a current system issue. The useful first step is to send the warning light, symptoms, due date and vehicle details.",
      "This guide links drivers into diagnostics and MOT support without promising that a scan alone will solve the problem.",
    ],
    cardsHeading: "Details to gather before messaging",
    cardsIntro: "These details help decide whether diagnostics, repair or garage support is the correct route.",
    cards: [
      { h: "Warning light photo", p: "Take a clear dashboard photo showing the warning and any messages.", links: [{ href: "mobile-obd-diagnostics-feltham.html", text: "Diagnostic page" }] },
      { h: "MOT date or fail sheet", p: "Send the MOT due date, recent fail sheet or advisories if available.", links: [{ href: "https://www.gov.uk/check-mot-status", text: "Check MOT status", external: true }] },
      { h: "Symptoms", p: "Mention limp mode, rough running, brake issues, airbag lights or intermittent faults.", links: [{ href: "mot-support.html", text: "MOT support" }] },
    ],
    whatToSend: "Send the dashboard warning photo, vehicle details, MOT date, symptoms, postcode and whether the car is safe to drive.",
    conversionHeading: "Need MOT-related diagnostic guidance?",
    conversionText: "Send the warning light details and MOT date before choosing the route.",
    image: "assets/real-mot.jpg",
    imageAlt: "MOT due reminder image",
    article: true,
    faqs: [
      ["Can a warning light fail an MOT?", "Some warning lights can affect MOT outcome depending on the system and vehicle. Use GOV.UK MOT information and send the warning details for guidance."],
      ["Should I book diagnostics before MOT?", "If a warning light is active, diagnostics can help identify the next step before the MOT or after a fail."],
      ["Can you arrange MOT support?", "Tuned Performance can help with MOT support enquiries and local routing where suitable."],
    ],
  },
  {
    file: "bmw-mini-coding-guide.html",
    title: "BMW/MINI Coding Guide | Hidden Features and Compatibility | Tuned Performance",
    description: "Guide to BMW and MINI coding, BimmerCode compatibility, hidden factory features and what to send before requesting coding in Feltham.",
    keywords: "BMW coding guide, MINI coding guide, BimmerCode hidden features, BMW hidden feature compatibility, Mini coding Feltham",
    crumbs: [{ name: "Guides", href: "guides.html" }, { name: "BMW MINI Coding Guide", href: "bmw-mini-coding-guide.html" }],
    eyebrow: "Coding guide",
    h1: "BMW/MINI coding guide for hidden factory features",
    intro: "Understand what coding is, what it is not, and what details to send before requesting a BMW or MINI compatibility check.",
    mainHeading: "Useful content for a specialist search term",
    mainParagraphs: [
      "BMW and MINI coding changes supported factory configuration settings. It is different from ECU remapping, diagnostics and fault repair.",
      "Feature availability depends on vehicle generation, installed modules, software version, head unit and BimmerCode support.",
    ],
    cardsHeading: "Coding routes customers ask about",
    cardsIntro: "Use this guide to decide whether to send a feature list for review.",
    cards: [
      { h: "Comfort settings", p: "Supported mirror, lock/unlock and convenience behaviours can sometimes be personalised.", links: [{ href: "bmw-mini-coding-feltham.html", text: "Local coding page" }] },
      { h: "Display options", p: "Supported iDrive, cluster and menu options depend on hardware and software support.", links: [{ href: "https://bimmercode.app/", text: "BimmerCode website", external: true }] },
      { h: "Coding vs remap", p: "Coding does not tune power. Remapping is handled as a separate enquiry route.", links: [{ href: "ecu-remapping.html", text: "Remap enquiries" }] },
    ],
    whatToSend: "Send model, year, head-unit type if known, feature list, existing warning lights and VIN or registration only if comfortable.",
    conversionHeading: "Want a BMW/MINI coding compatibility check?",
    conversionText: "Send the vehicle and feature list before booking a session.",
    image: "assets/real-ecu-remapping.jpg",
    imageAlt: "Vehicle software coding and diagnostic laptop",
    article: true,
    faqs: [
      ["What is BMW/MINI coding?", "Coding changes supported factory configuration settings in vehicle modules. It is not engine tuning."],
      ["Is BimmerCode required?", "The service is based around BimmerCode-supported coding checks for compatible BMW and MINI vehicles."],
      ["What should I send first?", "Send model, year, feature list and head-unit type if known so compatibility can be reviewed."],
    ],
  },
];

const guidesPage = {
  file: "guides.html",
  title: "Car Repair and Coding Guides | Tuned Performance Feltham",
  description: "Helpful Tuned Performance guides for car repair photos, MOT warning lights, BMW/MINI coding, diagnostics and local quote preparation.",
  keywords: "car repair guides Feltham, bumper repair photo guide, BMW MINI coding guide, MOT warning light guide, car diagnostics Feltham",
  crumbs: [{ name: "Guides", href: "guides.html" }],
  eyebrow: "Helpful guides",
  h1: "Guides for faster car repair, diagnostic and coding enquiries",
  intro: "Use these guides to send better information, reduce back-and-forth and choose the right Tuned Performance quote route.",
  mainHeading: "Content built for real customer questions",
  mainParagraphs: [
    "Search visibility improves when pages answer specific questions clearly. These guides target practical long-tail searches around photos, MOT warning lights and BMW/MINI coding.",
    "Each guide links back into the service, pricing, estimator and contact routes so visitors can move from research to enquiry.",
  ],
  cardsHeading: "Start with the guide that matches your problem",
  cardsIntro: "These pages are written for local drivers who are not ready to call yet but are close to making an enquiry.",
  cards: [
    { h: "Repair photo guide", p: "What to photograph before requesting bumper, scratch or panel repair pricing.", links: [{ href: "car-repair-photo-guide.html", text: "Read photo guide" }] },
    { h: "MOT warning light guide", p: "What to send when a warning light appears before an MOT or after a fail.", links: [{ href: "mot-warning-light-guide.html", text: "Read MOT guide" }] },
    { h: "BMW/MINI coding guide", p: "Understand hidden factory feature coding, compatibility and what details to send.", links: [{ href: "bmw-mini-coding-guide.html", text: "Read coding guide" }] },
  ],
  whatToSend: "Send vehicle details, postcode, service type, photos or warning light details, and preferred weekday or weekend timing.",
  conversionHeading: "Know what you need now?",
  conversionText: "Use the estimator or contact form to turn the guide into a clear enquiry.",
  image: "assets/tuned-car-lineup.jpg",
  imageAlt: "Tuned performance cars for local service guides",
  faqs: [
    ["Why add guides to the website?", "Guides help Google and customers understand the site expertise while capturing longer search queries before someone is ready to book."],
    ["Do guides replace service pages?", "No. Guides answer questions and then link users to service, pricing, estimator and contact pages."],
    ["Can I use these guides before messaging?", "Yes. They are designed to help you send the right information the first time."],
  ],
};

for (const page of [guidesPage, ...pages]) {
  fs.writeFileSync(path.join(root, page.file), renderPage(page), "utf8");
}

for (const file of fs.readdirSync(root).filter((f) => f.endsWith(".html"))) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");
  html = html.split(navOld).join(navNew);
  html = html.split(footerPagesOld).join(footerPagesNew);
  fs.writeFileSync(full, html, "utf8");
}

const popularLocalSection = `      <section class="section section-dark" aria-labelledby="popular-searches-title">
        <div class="container section-heading"><p class="eyebrow">Popular local searches</p><h2 id="popular-searches-title">Pages built around high-intent Feltham searches</h2><p>These pages target the service-and-place searches that are more likely to turn into calls, WhatsApp messages and quote requests.</p></div>
        <div class="container content-grid"><article class="detail-card"><h3>Bumper scratch repair Feltham</h3><p>Photo-led bumper scratch and paint scuff quote route for local drivers.</p><a href="bumper-repair-feltham.html">Open bumper page</a></article><article class="detail-card"><h3>Single panel respray Feltham</h3><p>Single panel repair and re-spray guidance for scratches and paint damage.</p><a href="single-panel-respray-feltham.html">Open panel page</a></article><article class="detail-card"><h3>Car diagnostics Feltham</h3><p>Warning light and engine fault checks before MOT or repair work.</p><a href="mobile-obd-diagnostics-feltham.html">Open diagnostics page</a></article><article class="detail-card"><h3>BMW and MINI coding Feltham</h3><p>BimmerCode-supported hidden feature and comfort coding compatibility checks.</p><a href="bmw-mini-coding-feltham.html">Open coding page</a></article></div>
      </section>

`;
let home = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!home.includes("popular-searches-title")) {
  home = home.replace('      <section class="section section-dark" aria-labelledby="journey-title">', popularLocalSection + '      <section class="section section-dark" aria-labelledby="journey-title">');
  fs.writeFileSync(path.join(root, "index.html"), home, "utf8");
}

const areaServiceSection = `      <section class="section section-light" aria-labelledby="area-service-searches-title"><div class="container section-heading"><p class="eyebrow">Service searches</p><h2 id="area-service-searches-title">High-intent Feltham service pages</h2><p>These pages target specific local queries and link customers directly to pricing, estimator and contact routes.</p></div><div class="container content-grid"><article class="detail-card"><h3>Bumper scratch repair Feltham</h3><p>For bumper scratches, paint transfer and scuff quote requests.</p><a href="bumper-repair-feltham.html">Bumper scratch repair</a></article><article class="detail-card"><h3>Single panel respray Feltham</h3><p>For single panel repair and re-spray enquiries.</p><a href="single-panel-respray-feltham.html">Single panel respray</a></article><article class="detail-card"><h3>Car diagnostics Feltham</h3><p>For warning lights, engine checks and MOT-related faults.</p><a href="mobile-obd-diagnostics-feltham.html">Car diagnostics</a></article><article class="detail-card"><h3>BMW and MINI coding Feltham</h3><p>For supported hidden factory feature coding.</p><a href="bmw-mini-coding-feltham.html">BMW and MINI coding</a></article></div></section>
`;
let areasHtml = fs.readFileSync(path.join(root, "areas.html"), "utf8");
if (!areasHtml.includes("area-service-searches-title")) {
  areasHtml = areasHtml.replace('      <section class="conversion-strip">', areaServiceSection + '      <section class="conversion-strip">');
  fs.writeFileSync(path.join(root, "areas.html"), areasHtml, "utf8");
}

const servicesIntentSection = `      <section class="section section-light" aria-labelledby="service-intent-title"><div class="container section-heading"><p class="eyebrow">Local search pages</p><h2 id="service-intent-title">Service pages for specific Feltham searches</h2><p>Use these pages when the customer already knows the service they want and is searching locally.</p></div><div class="container content-grid"><article class="detail-card"><h3>Bumper scratch repair Feltham</h3><p>Bumper scratches, paint scuffs and minor bumper damage quote route.</p><a href="bumper-repair-feltham.html">Bumper scratch repair Feltham</a></article><article class="detail-card"><h3>Single panel respray Feltham</h3><p>Panel paint repair and re-spray enquiry route.</p><a href="single-panel-respray-feltham.html">Single panel respray Feltham</a></article><article class="detail-card"><h3>Car and engine diagnostics Feltham</h3><p>Warning light, MOT and engine fault check enquiry route.</p><a href="mobile-obd-diagnostics-feltham.html">Car diagnostics Feltham</a></article><article class="detail-card"><h3>BMW and MINI coding Feltham</h3><p>BimmerCode supported coding and hidden feature checks.</p><a href="bmw-mini-coding-feltham.html">BMW and MINI coding Feltham</a></article></div></section>
`;
let servicesHtml = fs.readFileSync(path.join(root, "services.html"), "utf8");
if (!servicesHtml.includes("service-intent-title")) {
  servicesHtml = servicesHtml.replace("    </main>", servicesIntentSection + "    </main>");
  fs.writeFileSync(path.join(root, "services.html"), servicesHtml, "utf8");
}

const newUrls = [
  ["guides.html", "0.7"],
  ["bumper-repair-feltham.html", "0.8"],
  ["single-panel-respray-feltham.html", "0.8"],
  ["mobile-obd-diagnostics-feltham.html", "0.8"],
  ["bmw-mini-coding-feltham.html", "0.8"],
  ["car-repair-photo-guide.html", "0.65"],
  ["mot-warning-light-guide.html", "0.65"],
  ["bmw-mini-coding-guide.html", "0.65"],
];
let sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8").replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${date}</lastmod>`);
for (const [file, priority] of newUrls) {
  const loc = `${base}${file}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    sitemap = sitemap.replace("</urlset>", `  <url><loc>${loc}</loc><lastmod>${date}</lastmod><priority>${priority}</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");

let sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
sw = sw.replace(/tuned-performance-pwa-v\d+/, "tuned-performance-pwa-v13");
if (!sw.includes("./guides.html")) {
  sw = sw.replace(
    '  "./customer-thank-you.html",\n',
    '  "./customer-thank-you.html",\n' + newUrls.map(([file]) => `  "./${file}",\n`).join("")
  );
}
fs.writeFileSync(path.join(root, "service-worker.js"), sw, "utf8");

let llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
if (!llms.includes("## Local SEO Landing Pages")) {
  llms += `\n## Local SEO Landing Pages\n\n- Bumper Repair Feltham: https://tunedperformance.co.uk/bumper-repair-feltham.html\n- Single Panel Respray Feltham: https://tunedperformance.co.uk/single-panel-respray-feltham.html\n- Mobile OBD Diagnostics Feltham: https://tunedperformance.co.uk/mobile-obd-diagnostics-feltham.html\n- BMW/MINI Coding Feltham: https://tunedperformance.co.uk/bmw-mini-coding-feltham.html\n- Guides Hub: https://tunedperformance.co.uk/guides.html\n- Repair Photo Guide: https://tunedperformance.co.uk/car-repair-photo-guide.html\n- MOT Warning Light Guide: https://tunedperformance.co.uk/mot-warning-light-guide.html\n- BMW/MINI Coding Guide: https://tunedperformance.co.uk/bmw-mini-coding-guide.html\n`;
  fs.writeFileSync(path.join(root, "llms.txt"), llms, "utf8");
}

let readme = fs.readFileSync(path.join(root, "README.MD"), "utf8");
if (!readme.includes("## SEO Expansion")) {
  readme += `\n## SEO Expansion\n\nAdded high-intent local landing pages for bumper repair, panel re-spray, OBD diagnostics and BMW/MINI coding in Feltham, plus guide pages for repair photos, MOT warning lights and coding compatibility. Submit the updated sitemap in Google Search Console after deployment.\n`;
  fs.writeFileSync(path.join(root, "README.MD"), readme, "utf8");
}

console.log(`Generated ${pages.length + 1} SEO pages and updated internal links.`);
