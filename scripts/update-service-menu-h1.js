const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "outputs");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));

const h1Updates = {
  "index.html": "Mobile Mechanic and Car Diagnostics in Feltham",
  "about.html": "Mobile Mechanic and Car Diagnostics by Tuned Performance",
  "availability.html": "Mobile Mechanic Weekday and Weekend Availability in Feltham",
  "bmw-mini-coding.html": "BMW Coding and MINI Coding in Feltham",
  "bmw-mini-coding-feltham.html": "BimmerCode BMW and MINI Coding Feltham",
  "bumper-repair-feltham.html": "Mobile Bumper Repair Feltham",
  "car-services-ashford.html": "Mobile Mechanic and Car Diagnostics in Ashford",
  "car-services-bedfont.html": "Mobile Mechanic and Car Diagnostics in Bedfont",
  "car-services-feltham.html": "Mobile Mechanic and Car Diagnostics in Feltham",
  "car-services-hounslow.html": "Mobile Mechanic and Car Diagnostics in Hounslow",
  "car-services-kingston.html": "Mobile Mechanic and Car Diagnostics in Kingston",
  "car-services-sunbury.html": "Mobile Mechanic and Car Diagnostics in Sunbury",
  "contact.html": "Book a Mobile Mechanic or Car Diagnostics in Feltham",
  "ecu-remapping.html": "ECU Remapping and Stage 1 Tuning in Feltham",
  "estimator.html": "Mobile Mechanic Cost Estimator in Feltham",
  "faq.html": "Mobile Mechanic and Car Diagnostics FAQs",
  "gallery.html": "Mobile Car Repair and Car Styling Gallery in Feltham",
  "guides.html": "Mobile Mechanic and Car Diagnostics Guides",
  "mobile-obd-diagnostics-feltham.html": "Mobile Car Diagnostics Feltham",
  "mot-support.html": "MOT Support and Pre-MOT Car Diagnostics in Feltham",
  "obd-diagnostics.html": "Car Diagnostics and Warning Light Checks in Feltham",
  "pricing.html": "Mobile Mechanic and Car Diagnostics Prices in Feltham",
  "recent-jobs.html": "Mobile Mechanic and Car Repair Jobs in Feltham",
  "reviews.html": "Tuned Performance Google Reviews and Trustpilot Feedback",
  "scratch-bumper-repairs.html": "Mobile Bumper Repair and Car Scratch Repair in Feltham",
  "services.html": "Mobile Mechanic, Car Repairs and Diagnostics in Feltham",
  "single-panel-repair-respray.html": "Car Scratch Repair and Panel Respray in Feltham",
  "single-panel-respray-feltham.html": "Car Panel Respray and Paint Repair Feltham",
  "trim-fitment.html": "Car Styling and Accessory Fitting in Feltham",
};

const titleUpdates = {
  "index.html": "Mobile Mechanic Feltham | Car Diagnostics | Tuned Performance",
  "services.html": "Mobile Mechanic and Car Diagnostics Feltham | Tuned Performance",
  "car-services-ashford.html": "Mobile Mechanic Ashford | Car Diagnostics | Tuned Performance",
  "car-services-bedfont.html": "Mobile Mechanic Bedfont | Car Diagnostics | Tuned Performance",
  "car-services-feltham.html": "Mobile Mechanic Feltham | Car Diagnostics | Tuned Performance",
  "car-services-hounslow.html": "Mobile Mechanic Hounslow | Car Diagnostics | Tuned Performance",
  "car-services-kingston.html": "Mobile Mechanic Kingston | Car Diagnostics | Tuned Performance",
  "car-services-sunbury.html": "Mobile Mechanic Sunbury | Car Diagnostics | Tuned Performance",
  "scratch-bumper-repairs.html": "Mobile Bumper Repair Feltham | Car Scratch Repair",
  "bumper-repair-feltham.html": "Mobile Bumper Repair Feltham | Tuned Performance",
  "single-panel-repair-respray.html": "Car Scratch Repair and Panel Respray Feltham | Tuned Performance",
  "single-panel-respray-feltham.html": "Panel Respray and Car Paint Repair Feltham | Tuned Performance",
  "obd-diagnostics.html": "Car Diagnostics Feltham | Warning Light Checks | Tuned Performance",
  "mobile-obd-diagnostics-feltham.html": "Mobile Car Diagnostics Feltham | Tuned Performance",
  "bmw-mini-coding.html": "BMW Coding and MINI Coding Feltham | Tuned Performance",
  "bmw-mini-coding-feltham.html": "BimmerCode BMW and MINI Coding Feltham | Tuned Performance",
  "trim-fitment.html": "Car Styling and Accessory Fitting Feltham | Tuned Performance",
  "mot-support.html": "MOT Support and Pre-MOT Diagnostics Feltham | Tuned Performance",
  "ecu-remapping.html": "ECU Remapping Feltham | Stage 1 Tuning | Tuned Performance",
  "pricing.html": "Mobile Mechanic and Car Diagnostics Prices | Feltham",
  "estimator.html": "Mobile Mechanic Cost Estimator Feltham | Tuned Performance",
  "contact.html": "Book a Mobile Mechanic in Feltham | Tuned Performance",
};

const oldCookieBannerText = "We use essential storage for site preferences and optional Google Analytics to measure enquiries and improve the website. Choose analytics or essential only.";
const newCookieBannerText = "We use essential session storage to remember your choice while you browse and optional Google Analytics to measure enquiries. Choose analytics or essential only.";

for (const file of htmlFiles) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");

  if (h1Updates[file]) {
    html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${h1Updates[file]}</h1>`);
  }

  if (titleUpdates[file]) {
    const currentTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
    if (currentTitle) html = html.split(currentTitle).join(titleUpdates[file]);
  }

  html = html.split(oldCookieBannerText).join(newCookieBannerText);

  if (file === "cookies.html") {
    html = html
      .replace("Last updated: 25 June 2026.", "Last updated: 29 June 2026.")
      .replace("It uses essential local storage called <strong>tp_cookie_choice</strong> to remember your cookie choice.", "It uses essential session storage called <strong>tp_cookie_choice</strong> to remember your cookie choice while you move between pages in the current browser session. The choice expires when that session ends.")
      .replace("<strong>tp_cookie_choice</strong><span>Essential local storage</span><span>Stores whether you chose analytics or essential-only cookies so the banner does not keep appearing.</span>", "<strong>tp_cookie_choice</strong><span>Essential session storage</span><span>Stores whether you chose analytics or essential-only settings for the current browser session only.</span>")
      .replace("prevents the Google Analytics tag from loading on future page views", "prevents the Google Analytics tag from loading on later page views in the current session")
      .replace("You can clear cookies and local storage in your browser settings.", "You can clear cookies and session storage in your browser settings. Your choice also expires when the current browser session ends.");
  }

  if (["thank-you.html", "customer-thank-you.html"].includes(file)) {
    if (/<meta name="robots"/i.test(html)) {
      html = html.replace(/<meta name="robots" content="[^"]*">/i, '<meta name="robots" content="noindex, follow">');
    } else {
      html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta name="viewport" content="width=device-width, initial-scale=1">\n    <meta name="robots" content="noindex, follow">');
    }
  }

  fs.writeFileSync(full, html, "utf8");
}

const sitemapPath = path.join(root, "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8").replace(/<lastmod>[^<]+<\/lastmod>/g, "<lastmod>2026-06-29</lastmod>");
fs.writeFileSync(sitemapPath, sitemap, "utf8");

const swPath = path.join(root, "service-worker.js");
const sw = fs.readFileSync(swPath, "utf8").replace(/tuned-performance-pwa-v\d+/, "tuned-performance-pwa-v19");
fs.writeFileSync(swPath, sw, "utf8");

console.log(`Revised ${Object.keys(h1Updates).length} H1 headings and aligned ${Object.keys(titleUpdates).length} title tags.`);
