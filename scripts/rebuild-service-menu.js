const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "outputs");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const assetVersion = "23";

const serviceNav = `<nav class="service-link-nav" aria-label="Direct service navigation" data-service-nav><div class="container"><span class="service-link-nav__label">Service pages</span><a href="scratch-bumper-repairs.html">Bumper scratch repairs</a><a href="single-panel-repair-respray.html">Single panel respray</a><a href="obd-diagnostics.html">Car and engine diagnostics</a><a href="bmw-mini-coding.html">BMW and MINI coding</a><a href="mot-support.html">MOT prep and fault checks</a><a href="ecu-remapping.html">ECU remapping</a><a href="trim-fitment.html">Car styling and accessory fitting</a></div></nav>`;

const sharedReplacements = [
  ['Mobile car care, diagnostics, BMW/MINI coding and repair enquiries in Feltham', 'Mobile car care, car diagnostics, BMW and MINI coding and repair enquiries in Feltham'],
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
  ['href="trim-fitment.html">Trim fitment<', 'href="trim-fitment.html">Car styling and accessory fitting<'],
  ['href="trim-fitment.html">Styling and fitment<', 'href="trim-fitment.html">Car styling and accessory fitting<'],
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
  ['>Repairs<', '>Single panel respray<'],
  ['>Diagnostics<', '>Car diagnostics<'],
  ['<dd>Bumper repairs</dd>', '<dd>Bumper scratch repairs</dd>'],
  ['<dd>OBD diagnostics</dd>', '<dd>Car and engine diagnostics</dd>'],
  ['<option value="repair">Bumper or panel repair</option>', '<option value="repair">Bumper scratch or panel repair</option>'],
  ['<option value="diagnostic">OBD diagnostics</option>', '<option value="diagnostic">Car and engine diagnostics</option>'],
  ['<option value="fitment">Trim or accessory fitment</option>', '<option value="fitment">Car styling or accessory fitting</option>'],
  ['<option value="mot">MOT support</option>', '<option value="mot">MOT prep and fault checks</option>'],
  ['<option value="coding">BMW/MINI coding</option>', '<option value="coding">BMW and MINI coding</option>'],
  ['<option>OBD diagnostics</option>', '<option>Car and engine diagnostics</option>'],
  ['<option>Trim or accessory fitment</option>', '<option>Car styling or accessory fitting</option>'],
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
  ['"name": "Trim and styling fitment"', '"name": "Car styling and accessory fitting"']
];

const primaryNav = `<nav class="site-nav" aria-label="Primary navigation" data-nav>
          <div class="mobile-nav-header">
            <div>
              <strong>Menu</strong>
              <small>Direct page links for services and booking</small>
            </div>
            <button class="mobile-nav-close" type="button" aria-label="Close menu" data-nav-close><span aria-hidden="true"></span></button>
          </div>
          <a href="services.html">All services</a>
          <a href="pricing.html">Pricing</a>
          <a href="estimator.html">Estimator</a>
          <a href="recent-jobs.html">Recent jobs</a>
          <a href="areas.html">Areas</a>
          <a href="guides.html">Guides</a>
          <a href="reviews.html">Reviews</a>
          <a class="nav-book-link" href="contact.html">Book</a>
          <div class="mobile-nav-section-title">Service pages</div>
          <a class="mobile-service-link" href="scratch-bumper-repairs.html">Bumper scratch repairs</a>
          <a class="mobile-service-link" href="single-panel-repair-respray.html">Single panel respray</a>
          <a class="mobile-service-link" href="obd-diagnostics.html">Car and engine diagnostics</a>
          <a class="mobile-service-link" href="bmw-mini-coding.html">BMW and MINI coding</a>
          <a class="mobile-service-link" href="mot-support.html">MOT prep and fault checks</a>
          <a class="mobile-service-link" href="ecu-remapping.html">ECU remapping</a>
          <a class="mobile-service-link" href="trim-fitment.html">Car styling and accessory fitting</a>
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
