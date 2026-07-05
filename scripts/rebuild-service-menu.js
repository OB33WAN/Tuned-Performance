const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "outputs");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const assetVersion = "28";

const serviceLinks = [
  { href: "scratch-bumper-repairs.html", label: "Bumper scratch repairs" },
  { href: "single-panel-repair-respray.html", label: "Single panel respray" },
  { href: "obd-diagnostics.html", label: "Car and engine diagnostics" },
  { href: "mot-support.html", label: "MOT prep and fault checks" }
];

const secondaryServiceLinks = [
  { href: "trim-fitment.html", label: "Trim replacement and accessory fitting" },
  { href: "bmw-mini-coding.html", label: "BMW and MINI coding" },
  { href: "ecu-remapping.html", label: "ECU remap enquiries" }
];

const coreLinks = [
  { href: "index.html", label: "Home" },
  { href: "car-services-feltham.html", label: "Mobile Mechanic" },
  { href: "services.html", label: "Repairs" },
  { href: "obd-diagnostics.html", label: "Diagnostics" },
  { href: "pricing.html", label: "Pricing" },
  { href: "areas.html", label: "Areas" },
  { href: "contact.html", label: "Contact", className: "nav-book-link" }
];

const areaLinks = [
  { href: "car-services-feltham.html", label: "Mobile mechanic Feltham" },
  { href: "car-services-bedfont.html", label: "Mobile mechanic Bedfont" },
  { href: "car-services-ashford.html", label: "Mobile mechanic Ashford" },
  { href: "car-services-sunbury.html", label: "Mobile mechanic Sunbury" },
  { href: "car-services-hounslow.html", label: "Mobile mechanic Hounslow" },
  { href: "car-services-kingston.html", label: "Mobile mechanic Kingston" }
];

const businessLinks = [
  { href: "about.html", label: "About Tuned Performance" },
  { href: "recent-jobs.html", label: "Recent jobs" },
  { href: "reviews.html", label: "Reviews" },
  { href: "gallery.html", label: "Gallery" },
  { href: "faq.html", label: "FAQ" },
  { href: "refer-a-friend.html", label: "Refer a friend" }
];

const legalLinks = [
  { href: "privacy-gdpr.html", label: "Privacy and GDPR" },
  { href: "cookies.html", label: "Cookies" },
  { href: "terms.html", label: "Terms" },
  { href: "cancellation-policy.html", label: "Cancellation policy" }
];

function renderLinks(links, baseClass = "") {
  return links
    .map(({ href, label, className = "" }) => {
      const classes = [baseClass, className].filter(Boolean).join(" ");
      const classAttr = classes ? ` class="${classes}"` : "";
      return `<a${classAttr} href="${href}">${label}</a>`;
    })
    .join("");
}

const serviceNav = `<nav class="service-link-nav" aria-label="Direct service navigation" data-service-nav><div class="container"><span class="service-link-nav__label">Service pages</span>${renderLinks(serviceLinks)}</div></nav>`;

const sharedReplacements = [
  ['Mobile car care - Feltham', 'Mobile mechanic - Feltham'],
  ['Mobile car care, diagnostics, BMW/MINI coding and repair enquiries in Feltham', 'Mobile car care, car diagnostics, BMW and MINI coding and repair enquiries in Feltham'],
  ['Mobile mechanic visits, car repairs, car and engine diagnostics, MOT prep checks, minor bodywork enquiries, trim replacement and specialist BMW and MINI coding from 105 Swan Road, Feltham, TW13 6PE, serving Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston.', 'Mobile mechanic visits, car repairs, bumper scratch repairs, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement from 105 Swan Road, Feltham, TW13 6PE, serving Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston. Specialist BMW and MINI coding is available when relevant.'],
  ['Mobile car repairs, diagnostics, BMW and MINI coding, trim fitment, MOT support and ECU remap enquiries from 105 Swan Road, Feltham, TW13 6PE, serving Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston.', 'Mobile car repairs, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries from 105 Swan Road, Feltham, TW13 6PE, serving Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston.'],
  ['Mobile car repairs, diagnostics, BMW and MINI coding, fitment, MOT support and ECU remap enquiries across Feltham and nearby areas. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.', 'Mobile car repairs, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries across Feltham and nearby areas. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.'],
  ['Mobile car repairs, diagnostics, BMW and MINI coding, fitment, MOT support and ECU remap enquiries. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.', 'Mobile car repairs, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.'],
  ['Tuned Performance provides mobile bumper repairs, single panel repair and re-spray, OBD diagnostics, BMW and MINI coding, trim fitment, MOT support and ECU remap enquiries across Feltham, Bedfont, Ashford, Sunbury, Kingston and Hounslow. Weekday and weekend availability.', 'Tuned Performance provides mobile bumper scratch repairs, single panel resprays, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries across Feltham, Bedfont, Ashford, Sunbury, Kingston and Hounslow. Weekday and weekend availability.'],
  ['Explore Tuned Performance mobile car services including bumper repairs, single panel repair and re-spray, diagnostics, BMW and MINI coding, trim fitment, MOT support and ECU remap enquiries.', 'Explore Tuned Performance mobile car services including bumper scratch repairs, single panel resprays, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries.'],
  ['Request a Tuned Performance quote by email, phone or WhatsApp for mobile car repair, diagnostics, BMW and MINI coding, fitment, MOT support or ECU remap enquiries.', 'Request a Tuned Performance quote by email, phone or WhatsApp for mobile car repair, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks or ECU remap enquiries.'],
  ['Use the Tuned Performance estimator for mobile bumper repair, single panel repair and re-spray, diagnostics, BMW/MINI coding, fitment and MOT support guide pricing.', 'Use the Tuned Performance estimator for mobile bumper scratch repair, single panel respray, car and engine diagnostics, BMW and MINI coding, car styling and MOT prep check pricing guidance.'],
  ['Use the Tuned Performance estimator for mobile bumper scratch repair, single panel respray, car and engine diagnostics, BMW and MINI coding, car styling and MOT prep check guide pricing.', 'Use the Tuned Performance estimator for mobile bumper scratch repair, single panel respray, car and engine diagnostics, BMW and MINI coding, car styling and MOT prep check pricing guidance.'],
  ['OBD diagnostics and fault guidance from Tuned Performance across Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston.', 'Car and engine diagnostics and fault guidance from Tuned Performance across Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston.'],
  ['mobile car repairs Feltham, car repair near TW13 6PE, bumper repair Feltham, single panel repair, OBD diagnostics Feltham, BMW coding Feltham, MINI coding Feltham, BimmerCode coding, trim fitment, MOT support, ECU remap enquiries', 'mobile car repairs Feltham, car repair near TW13 6PE, bumper scratch repair Feltham, single panel respray Feltham, car and engine diagnostics Feltham, BMW coding Feltham, MINI coding Feltham, BimmerCode coding, car styling and accessory fitting Feltham, MOT prep checks Feltham, ECU remap enquiries'],
  ['Mobile repairs, diagnostics and BMW/MINI coding', 'Mobile repairs, car diagnostics and BMW and MINI coding'],
  ['Book clear, local support for bumper repair, single panel repair and re-spray, OBD diagnostics, BMW/MINI coding, trim fitment, MOT help and ECU remap enquiries across Feltham, Bedfont, Ashford, Sunbury, Kingston and Hounslow.', 'Book clear, local support for bumper scratch repair, single panel respray, car and engine diagnostics, BMW and MINI coding, car styling and accessory fitting, MOT prep checks and ECU remap enquiries across Feltham, Bedfont, Ashford, Sunbury, Kingston and Hounslow.'],
  ['href="scratch-bumper-repairs.html">Bumper repairs<', 'href="scratch-bumper-repairs.html">Bumper scratch repairs<'],
  ['href="scratch-bumper-repairs.html">Bumper and scratch repairs<', 'href="scratch-bumper-repairs.html">Bumper scratch repairs<'],
  ['href="single-panel-repair-respray.html">Single panel repair<', 'href="single-panel-repair-respray.html">Single panel respray<'],
  ['href="obd-diagnostics.html">OBD diagnostics<', 'href="obd-diagnostics.html">Car and engine diagnostics<'],
  ['href="obd-diagnostics.html">Car diagnostics<', 'href="obd-diagnostics.html">Car and engine diagnostics<'],
  ['href="trim-fitment.html">Trim fitment<', 'href="trim-fitment.html">Trim replacement and accessory fitting<'],
  ['href="trim-fitment.html">Styling and fitment<', 'href="trim-fitment.html">Trim replacement and accessory fitting<'],
  ['href="trim-fitment.html">Car styling and accessory fitting<', 'href="trim-fitment.html">Trim replacement and accessory fitting<'],
  ['href="mot-support.html">MOT support<', 'href="mot-support.html">MOT prep and fault checks<'],
  ['href="bmw-mini-coding.html">BMW/MINI coding<', 'href="bmw-mini-coding.html">BMW and MINI coding<'],
  ['href="mobile-obd-diagnostics-feltham.html">OBD diagnostics Feltham<', 'href="mobile-obd-diagnostics-feltham.html">Car diagnostics Feltham<'],
  ['href="bmw-mini-coding-feltham.html">BMW/MINI coding Feltham<', 'href="bmw-mini-coding-feltham.html">BMW and MINI coding Feltham<'],
  ['href="bumper-repair-feltham.html">Bumper repair Feltham<', 'href="bumper-repair-feltham.html">Bumper scratch repair Feltham<'],
  ['<title>Car Diagnostics Feltham | Warning Light Checks | Tuned Performance</title>', '<title>Car and Engine Diagnostics Feltham | Warning Light Checks | Tuned Performance</title>'],
  ['content="Car Diagnostics Feltham | Warning Light Checks | Tuned Performance"', 'content="Car and Engine Diagnostics Feltham | Warning Light Checks | Tuned Performance"'],
  ['<span>OBD diagnostics</span></nav><p class="eyebrow">Fault scan support</p><h1>Car Diagnostics and Warning Light Checks in Feltham</h1>', '<span>Car and engine diagnostics</span></nav><p class="eyebrow">Car diagnostics Feltham</p><h1>Car and Engine Diagnostics and Warning Light Checks in Feltham</h1>'],
  ['Book diagnostics', 'Book car diagnostics'],
  ['Estimate diagnostics', 'Estimate car diagnostics'],
  ['OBD diagnostics start from &pound;50 per visit, with guidance on what to do next.', 'Car and engine diagnostics start from &pound;50 per visit, with guidance on what to do next.'],
  ['<h3>OBD diagnostics and fault guidance</h3>', '<h3>Car and engine diagnostics and fault guidance</h3>'],
  ['<h3>BMW Coding and MINI Coding</h3>', '<h3>BMW and MINI coding</h3>'],
  ['<h3>BMW/MINI coding</h3>', '<h3>BMW and MINI coding</h3>'],
  ['<h3>MOT support and checks</h3>', '<h3>MOT prep and fault checks</h3>'],
  ['<dd>Bumper repairs</dd>', '<dd>Bumper scratch repairs</dd>'],
  ['<dd>OBD diagnostics</dd>', '<dd>Car and engine diagnostics</dd>'],
  ['<option value="repair">Bumper or panel repair</option>', '<option value="repair">Bumper scratch or panel repair</option>'],
  ['<option value="diagnostic">OBD diagnostics</option>', '<option value="diagnostic">Car and engine diagnostics</option>'],
  ['<option value="fitment">Trim or accessory fitment</option>', '<option value="fitment">Trim replacement or accessory fitting</option>'],
  ['<option value="mot">MOT support</option>', '<option value="mot">MOT prep and fault checks</option>'],
  ['<option value="coding">BMW/MINI coding</option>', '<option value="coding">BMW and MINI coding</option>'],
  ['<option>OBD diagnostics</option>', '<option>Car and engine diagnostics</option>'],
  ['<option>Trim or accessory fitment</option>', '<option>Trim replacement or accessory fitting</option>'],
  ['<option>MOT support</option>', '<option>MOT prep and fault checks</option>'],
  ['<option>BMW/MINI coding</option>', '<option>BMW and MINI coding</option>'],
  ['<h3>OBD diagnostics Feltham</h3>', '<h3>Car and engine diagnostics Feltham</h3>'],
  ['<h3>Mobile OBD diagnostics Feltham</h3>', '<h3>Car and engine diagnostics Feltham</h3>'],
  ['>Diagnostics Feltham<', '>Car diagnostics Feltham<'],
  ['<h3>BMW/MINI coding Feltham</h3>', '<h3>BMW and MINI coding Feltham</h3>'],
  ['>Coding Feltham<', '>BMW and MINI coding Feltham<'],
  ['<h3>Bumper repair Feltham</h3>', '<h3>Bumper scratch repair Feltham</h3>'],
  ['>Bumper repair Feltham<', '>Bumper scratch repair Feltham<'],
  ['<h3>Panel respray Feltham</h3>', '<h3>Single panel respray Feltham</h3>'],
  ['>Panel respray Feltham<', '>Single panel respray Feltham<'],
  ['<option>Bumper or panel repair</option>', '<option>Bumper scratch or panel repair</option>'],
  ['<span>OBD diagnostics</span><strong>From &pound;50</strong>', '<span>Car and engine diagnostics</span><strong>From &pound;50</strong>'],
  ['<span>BMW/MINI coding</span><strong>From &pound;40</strong>', '<span>BMW and MINI coding</span><strong>From &pound;40</strong>'],
  ['Request MOT support', 'Request MOT prep checks'],
  ['Ideal for diagnostics, MOT support and smaller mobile jobs.', 'Ideal for car diagnostics, MOT prep checks and smaller mobile jobs.'],
  ['Local landing page for mobile car repairs, diagnostics, BMW/MINI coding, fitment and MOT support.', 'Local landing page for mobile car repairs, car and engine diagnostics, BMW and MINI coding, car styling and MOT prep checks.'],
  ['For BMW/MINI coding, send model, year and the feature list.', 'For BMW and MINI coding, send model, year and the feature list.'],
  ['Yes. BMW/MINI coding is available for supported BimmerCode-compatible vehicles. Send the model, year and feature list first because availability depends on ECU hardware and software support.', 'Yes. BMW and MINI coding is available for supported BimmerCode-compatible vehicles. Send the model, year and feature list first because availability depends on ECU hardware and software support.'],
  ['Yes. BMW/MINI coding is available for supported BimmerCode-compatible vehicles. Send the model, year and feature list first so compatibility can be checked.', 'Yes. BMW and MINI coding is available for supported BimmerCode-compatible vehicles. Send the model, year and feature list first so compatibility can be checked.'],
  ['Is BMW/MINI coding the same as ECU remapping?', 'Is BMW and MINI coding the same as ECU remapping?'],
  ['Car Diagnostics Prices and Booking Information', 'Car and Engine Diagnostics Prices and Booking Information'],
  ['Mobile Car Diagnostics Before Repair Work', 'Mobile Car and Engine Diagnostics Before Repair Work'],
  ['alt="Car in a professional inspection bay for MOT support"', 'alt="Car in a professional inspection bay for MOT preparation checks"'],
  ['"OBD diagnostics",', '"Car and engine diagnostics",'],
  ['"BMW/MINI coding",', '"BMW and MINI coding",'],
  ['"MOT support",', '"MOT prep and fault checks",'],
  ['"serviceType": "OBD diagnostics"', '"serviceType": "Car and engine diagnostics"'],
  ['BMW/MINI coding', 'BMW and MINI coding'],
  ['OBD diagnostics', 'Car and engine diagnostics'],
  ['"name": "Bumper repairs"', '"name": "Bumper scratch repairs"'],
  ['"name": "OBD diagnostics"', '"name": "Car and engine diagnostics"'],
  ['"name": "MOT support"', '"name": "MOT prep and fault checks"'],
  ['"name": "Trim and styling fitment"', '"name": "Trim replacement and accessory fitting"'],
  ['Car styling and accessory fitting', 'Trim replacement and accessory fitting'],
  ['car styling and accessory fitting', 'trim replacement and accessory fitting'],
  ['Car styling or accessory fitting', 'Trim replacement or accessory fitting'],
  ['Mobile mechanic visits, car repairs, car and engine diagnostics, MOT prep checks, minor bodywork, trim replacement and specialist BMW and MINI coding. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.', 'Mobile mechanic quotes for car repairs, bumper scratch repairs, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement. Address: 105 Swan Road, Feltham, TW13 6PE. BMW and MINI coding is available as a specialist add-on service. Company number: 17180730.'],
  ['Mobile car repairs, car and engine diagnostics, BMW and MINI coding, trim replacement and accessory fitting, MOT prep checks and ECU remap enquiries across Feltham and nearby areas. Address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.', 'Mobile mechanic quotes for car repairs, bumper scratch repairs, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement across Feltham and nearby areas. Address: 105 Swan Road, Feltham, TW13 6PE. BMW and MINI coding is available as a specialist add-on service. Company number: 17180730.'],
  ['<div><h2>Services</h2><a href="scratch-bumper-repairs.html">Bumper scratch repairs</a><a href="single-panel-repair-respray.html">Single panel respray</a><a href="obd-diagnostics.html">Car and engine diagnostics</a><a href="trim-fitment.html">Trim replacement and accessory fitting</a><a href="mot-support.html">MOT prep and fault checks</a><a href="bmw-mini-coding.html">BMW and MINI coding</a><a href="ecu-remapping.html">ECU remapping</a></div>', '<div><h2>Services</h2><a href="bumper-repair-feltham.html">Bumper scratch repair Feltham</a><a href="single-panel-respray-feltham.html">Single panel respray Feltham</a><a href="mobile-obd-diagnostics-feltham.html">Car diagnostics Feltham</a><a href="mot-support.html">MOT prep and fault checks</a><a href="trim-fitment.html">Trim replacement and accessory fitting</a><a href="bmw-mini-coding-feltham.html">BMW and MINI coding Feltham</a></div>'],
  ['"name": "Is BMW and MINI coding the same as ECU remapping?"', '"name": "Do I need diagnostics before BMW or MINI coding?"'],
  ['"text": "No. BMW and MINI coding changes supported convenience and hidden features, while ECU remapping changes engine calibration. Coding availability depends on vehicle support and remapping remains an enquiry route only."', '"text": "If the vehicle has warning lights, fault codes or running issues, diagnostics should come before BMW or MINI coding. Coding is for supported comfort and hidden-feature changes on fault-free vehicles."'],
  ['Can I enquire about ECU remapping now?', 'Should I book diagnostics before replacing parts?'],
  ['Yes. Remapping is enquiry-only at the moment, so the best next step is to register interest with make, model, engine and your goal.', 'If the car has a warning light, starting issue or running fault, diagnostics should usually come before parts ordering. Send the symptoms and any warning light photo first.'],
  ['Compare repair, diagnostics, MOT prep, trim replacement and specialist BMW and MINI coding pages.', 'Compare repair, diagnostics, MOT prep and trim replacement pages, with BMW and MINI coding available when relevant.'],
  ['Trim replacement and specialist BMW and MINI coding are still available through the services page when relevant.', 'Trim replacement is available directly, and BMW and MINI coding remains a specialist secondary service when relevant.'],
  ['Most bookings start with repairs, diagnostics or MOT-related checks. Use the specialist BMW and MINI coding route only when the car is fault-free and you already know the feature change you want.', 'Most bookings start with bumper scratches, panel paint damage, diagnostics or MOT-related checks. BMW and MINI coding remains a specialist secondary route for supported, fault-free vehicles.'],
  ['Learn about Tuned Performance, a Feltham-based mobile car care business for repairs, diagnostics, BMW and MINI coding, fitment, MOT support and ECU remap enquiries.', 'Learn about Tuned Performance, a Feltham-based mobile mechanic business for repairs, bumper scratches, diagnostics, MOT prep checks and trim replacement, with BMW and MINI coding available when relevant.'],
  ['Request a Tuned Performance quote by email, phone or WhatsApp for mobile car repair, car and engine diagnostics, BMW and MINI coding, trim replacement and accessory fitting, MOT prep checks or ECU remap enquiries.', 'Request a Tuned Performance quote by email, phone or WhatsApp for mobile car repairs, bumper scratches, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement.'],
  ['Tuned Performance pricing for bumper repairs, single panel repair and re-spray, diagnostics, BMW and MINI coding, fitment labour, MOT support and ECU remap enquiries in Feltham and nearby areas.', 'Tuned Performance pricing for bumper scratch repairs, single panel resprays, car and engine diagnostics, trim replacement labour and MOT prep checks in Feltham and nearby areas.'],
  ['Frequently asked questions for Tuned Performance quotes, repairs, diagnostics, BMW and MINI coding, trim replacement, MOT support, ECU remap enquiries and weekend availability.', 'Frequently asked questions for Tuned Performance quotes, repairs, diagnostics, MOT prep checks, trim replacement, weekday and weekend availability, and BMW and MINI coding where relevant.'],
  ['View Tuned Performance gallery images for bumper repairs, single panel repair and re-spray, carbon mirror caps, trim replacement, diagnostics, MOT support and ECU remap enquiries.', 'View Tuned Performance gallery images for bumper scratch repairs, single panel resprays, trim replacement, diagnostics, MOT prep checks and recent customer jobs.'],
  ['Mobile mechanic visits, car repairs, bumper scratch repairs, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement from 105 Swan Road, Feltham, TW13 6PE, serving Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston. Specialist BMW and MINI coding is available when relevant.', 'Mobile mechanic visits from 105 Swan Road, Feltham, TW13 6PE for car repairs, warning light diagnostics, MOT prep checks, bumper scratches and single panel resprays across Feltham, Bedfont, Ashford, Sunbury, Hounslow and Kingston. Home or workplace visits are available where the job suits a mobile booking.'],
  ['Trim replacement is available directly, and BMW and MINI coding remains a specialist secondary service when relevant.', 'Home or workplace visits are available where the job suits a mobile booking, and clear guidance is given when workshop support is the better route.'],
  ['Compare repair, diagnostics, MOT prep and trim replacement pages, with BMW and MINI coding available when relevant.', 'Compare the main mobile mechanic routes for repairs, diagnostics, pricing and contact before you book.'],
  ['Most bookings start with bumper scratches, panel paint damage, diagnostics or MOT-related checks. BMW and MINI coding remains a specialist secondary route for supported, fault-free vehicles.', 'Most bookings start with car repairs, warning lights, MOT-related faults or quote-ready photos. Specialist secondary services are discussed separately when relevant.'],
  ['Specialist coding only if relevant', 'Secondary specialist services only where relevant'],
  ['Move between the main service page, local area page, pricing guide and enquiry form without starting again.', 'Move between mobile mechanic, pricing, area and contact routes without starting again.'],
  ['Send one message with the vehicle, postcode, symptoms and photos where relevant and get pointed to the fastest booking path.', 'Send one message with the vehicle, postcode, symptoms and photos and get pointed to the fastest mobile mechanic booking path.'],
  ['Use this page for customer confidence and SEO. It answers the cost question without pretending every vehicle can be priced instantly.', 'Use this page to answer the cost question quickly with clear guide prices, a minimum diagnostic visit and the main next-step routes.'],
  ['Mobile mechanic quotes for car repairs, bumper scratch repairs, single panel resprays, car and engine diagnostics, MOT prep checks and trim replacement. Address: 105 Swan Road, Feltham, TW13 6PE. BMW and MINI coding is available as a specialist add-on service. Company number: 17180730.', 'Mobile mechanic support from 105 Swan Road, Feltham, TW13 6PE for car repairs, warning light diagnostics, MOT prep checks, bumper scratches and single panel resprays. Home or workplace visits are available where the job suits a mobile booking. Company number: 17180730.']
];

const primaryNav = `<nav class="site-nav" aria-label="Primary navigation" data-nav>
          <div class="mobile-nav-header">
            <div>
              <strong>Menu</strong>
              <small>Core routes, service pages, areas and legal info</small>
            </div>
            <button class="mobile-nav-close" type="button" aria-label="Close menu" data-nav-close><span aria-hidden="true"></span></button>
          </div>
          <div class="mobile-nav-section-title">Main routes</div>
          ${renderLinks(coreLinks)}
          <div class="mobile-nav-section-title">Core service pages</div>
          ${renderLinks(serviceLinks, "mobile-service-link")}
          <div class="mobile-nav-section-title">Specialist services</div>
          ${renderLinks(secondaryServiceLinks, "mobile-service-link")}
          <div class="mobile-nav-section-title">Area pages</div>
          ${renderLinks(areaLinks, "mobile-service-link")}
          <div class="mobile-nav-section-title">Business</div>
          ${renderLinks(businessLinks, "mobile-service-link")}
          <div class="mobile-nav-section-title">Legal</div>
          ${renderLinks(legalLinks, "mobile-service-link")}
          <div class="mobile-nav-actions">
            <a class="mobile-nav-action mobile-nav-action--call" href="tel:+447933705124">Call now</a>
            <a class="mobile-nav-action mobile-nav-action--whatsapp" href="https://wa.me/447933705124" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </nav>`;

for (const file of htmlFiles) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, "utf8");

  html = html.replace(/<nav class="site-nav"[\s\S]*?<\/nav>/i, primaryNav);
  html = html.replace(/\s*<nav class="service-link-nav"[\s\S]*?<\/nav>/i, "");
  html = html.replace(/<\/div>\s*<\/header>/i, `</div>${serviceNav}</header>`);
  html = html.replace(/<a href="guides\.html">Guides<\/a>/g, "");
  html = html.replace(/<a href="guides\.html">All guides<\/a>/g, "");
  html = html.replace(/href="styles\.css(?:\?v=\d+)?"/g, `href="styles.css?v=${assetVersion}"`);
  html = html.replace(/src="script\.js(?:\?v=\d+)?"/g, `src="script.js?v=${assetVersion}"`);
  html = html.replace(
    /<input class="botcheck"(?![^>]*\baria-label=)([^>]*)>/gi,
    '<input class="botcheck" aria-label="Leave this field empty"$1>'
  );
  for (const [search, replace] of sharedReplacements) {
    html = html.split(search).join(replace);
  }

  fs.writeFileSync(fullPath, html, "utf8");
}

const serviceWorkerPath = path.join(root, "service-worker.js");
const serviceWorker = fs
  .readFileSync(serviceWorkerPath, "utf8")
  .replace(/tuned-performance-pwa-v\d+/, `tuned-performance-pwa-v${assetVersion}`)
  .replace(/"\.\/styles\.css(?:\?v=\d+)?"/, `"./styles.css?v=${assetVersion}"`)
  .replace(/"\.\/script\.js(?:\?v=\d+)?"/, `"./script.js?v=${assetVersion}"`);
fs.writeFileSync(serviceWorkerPath, serviceWorker, "utf8");

console.log(`Rebuilt the service menu and form-control labels across ${htmlFiles.length} pages.`);
