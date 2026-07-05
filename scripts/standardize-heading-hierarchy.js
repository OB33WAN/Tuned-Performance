const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "outputs");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));

const replacements = {
  "index.html": {
    "Support for tuned daily drivers and enthusiast cars": "Mobile Mechanic Services for Performance and Everyday Cars",
    "Mobile car services built around faster booking": "Mobile Car Repairs, Diagnostics and Coding Services",
    "Estimate the right starting point before you message": "Mobile Mechanic and Car Repair Price Estimator",
    "Capture remap demand without overpromising availability": "ECU Remapping and Stage 1 Tuning Enquiries",
    "Choose a slot type that fits the job": "Weekday and Weekend Mobile Mechanic Availability",
    "Mobile car services across Feltham and nearby areas": "Mobile Mechanic Service Areas Near Feltham",
    "Useful links before you book": "Mobile Mechanic, Car Diagnostics and Repair Links",
    "Pages built around high-intent Feltham searches": "Popular Mobile Mechanic and Car Repair Searches in Feltham",
    "From first message to confirmed slot in three steps": "Book a Mobile Mechanic in Three Steps",
    "Send one clear enquiry": "Request a Mobile Mechanic or Car Diagnostics Quote",
    "Fast answers for local drivers": "Mobile Mechanic and Car Diagnostics FAQs",
  },
  "services.html": {
    "Bumper and panel repairs": "Mobile Bumper Repair and Car Scratch Repair",
    "OBD diagnostics": "Car and Engine Diagnostics and Warning Light Checks",
    "BMW and MINI coding": "BMW Coding and MINI Coding",
    "Trim and accessory fitment": "Car Styling and Accessory Fitting",
    "MOT support": "MOT Prep and Fault Checks",
    "ECU remap enquiries": "ECU Remapping and Stage 1 Tuning",
    "Not sure what you need?": "Choose the Right Mobile Mechanic Service",
    "Ready to price the job?": "Get a Mobile Mechanic Quote in Feltham",
    "Service pages for specific Feltham searches": "Popular Mobile Mechanic Services in Feltham",
  },
  "pricing.html": {
    "Service guide pricing": "Mobile Mechanic and Car Diagnostics Guide Prices",
    "Fastest quote route": "Get a Mobile Mechanic Quote Quickly",
    "Best for repair work": "Car Scratch and Bumper Repair Quotes",
    "Need advice first?": "Car Diagnostics and Service Advice",
    "Choose the quickest way to a confirmed price": "Choose a Mobile Mechanic Quote Route",
    "Need a quick estimate now?": "Get a Mobile Mechanic Cost Estimate",
  },
  "estimator.html": {
    "Vehicle and location": "Vehicle and Mobile Mechanic Location",
    "Choose the job": "Choose a Mobile Mechanic or Car Diagnostics Service",
    "Availability and contact": "Mobile Mechanic Availability and Contact Details",
    "Send the estimate request": "Request a Mobile Mechanic Cost Estimate",
    "Photos are added after WhatsApp opens": "Send Car Repair Photos by WhatsApp",
  },
  "contact.html": {
    "Include these details": "Information Needed for a Mobile Mechanic Quote",
    "Business address": "Mobile Mechanic Based in Feltham",
    "Fastest enquiry route": "Fast Mobile Mechanic and Diagnostics Enquiries",
    "Trust and reviews": "Mobile Mechanic Reviews and Customer Feedback",
  },
  "availability.html": {
    "Tell us your preferred slot": "Request Weekday or Weekend Mobile Mechanic Availability",
  },
  "scratch-bumper-repairs.html": {
    "Photo quote first, booking second": "Mobile Bumper Repair Photo Quotes",
    "Built for quick decisions and fewer missed details": "Car Scratch Repair Booking Information",
    "Want the fastest repair quote?": "Request a Mobile Bumper Repair Quote",
  },
  "single-panel-repair-respray.html": {
    "Built for faster repair decisions": "Car Scratch Repair and Panel Respray Quotes",
    "Send photos before booking": "Request a Car Paint Repair Quote",
  },
  "obd-diagnostics.html": {
    "Understand the fault before spending": "Mobile Car Diagnostics Before Repair Work",
    "Turn warning lights into a clear plan": "Warning Light Diagnostics and Repair Guidance",
    "Need a warning light checked?": "Request Mobile Car Diagnostics in Feltham",
  },
  "bmw-mini-coding.html": {
    "Choose the type of coding you want": "BMW and MINI Coding Options",
    "Personalisation without overpromising feature availability": "BimmerCode Compatibility and Hidden Features",
    "Important checks before booking": "BMW and MINI Coding FAQs",
    "Want hidden BMW or MINI features enabled?": "Request BMW or MINI Coding in Feltham",
  },
  "trim-fitment.html": {
    "Make the install route clear before booking": "Car Styling and Accessory Fitting Checks",
    "Stop wrong parts wasting appointment time": "Check Car Accessories Before Fitting",
    "Have parts ready to fit?": "Request Car Accessory Fitting in Feltham",
  },
  "mot-support.html": {
    "Make the MOT enquiry actionable": "Pre-MOT Car Diagnostics and Support",
    "MOT due soon?": "Request MOT Support in Feltham",
  },
  "ecu-remapping.html": {
    "Clear interest capture without overpromising": "ECU Remapping and Stage 1 Tuning Checks",
    "Qualify interest before booking opens": "Stage 1 Tuning Suitability Checks",
    "Interested in Stage 1 tuning?": "Request ECU Remapping in Feltham",
  },
  "bumper-repair-feltham.html": {
    "A focused page for bumper scuff and scratch searches": "Mobile Bumper Repair and Scratch Assessment",
    "Internal links": "Related Mobile Car Services",
    "Recent work": "Recent Mobile Car Repair Work",
    "Questions this page answers": "Mobile Bumper Repair FAQs",
  },
  "single-panel-respray-feltham.html": {
    "Designed for drivers searching for panel paint repair locally": "Car Paint Repair and Panel Respray Assessment",
    "Internal links": "Related Mobile Car Services",
    "Recent work": "Recent Car Paint Repair Work",
    "Questions this page answers": "Car Panel Respray FAQs",
  },
  "mobile-obd-diagnostics-feltham.html": {
    "Capture high-intent warning light searches": "Mobile Car Diagnostics and Fault Code Guidance",
    "Internal links": "Related Mobile Car Services",
    "Recent work": "Recent Mobile Car Diagnostics Work",
    "Questions this page answers": "Mobile Car Diagnostics FAQs",
  },
  "bmw-mini-coding-feltham.html": {
    "A local landing page for a specialist service": "BMW and MINI Coding Compatibility Checks",
    "Internal links": "Related Mobile Car Services",
    "Recent work": "Recent BMW and MINI Coding Work",
    "Questions this page answers": "BMW and MINI Coding FAQs",
  },
  "car-repair-photo-guide.html": {
    "Internal links": "Related Mobile Car Repair Services",
    "Recent work": "Recent Mobile Car Repair Work",
    "Questions this page answers": "Car Repair Photo FAQs",
  },
  "mot-warning-light-guide.html": {
    "Internal links": "Related MOT and Diagnostics Services",
    "Recent work": "Recent Car Diagnostics Work",
    "Questions this page answers": "MOT Warning Light FAQs",
  },
  "bmw-mini-coding-guide.html": {
    "Internal links": "Related BMW and MINI Services",
    "Recent work": "Recent BMW and MINI Coding Work",
    "Questions this page answers": "BMW and MINI Coding FAQs",
  },
};

const townPages = {
  "car-services-ashford.html": "Ashford",
  "car-services-bedfont.html": "Bedfont",
  "car-services-feltham.html": "Feltham",
  "car-services-hounslow.html": "Hounslow",
  "car-services-kingston.html": "Kingston",
  "car-services-sunbury.html": "Sunbury",
};

const unheadedSectionTitles = {
  "about.html": ["Mobile Mechanic Service Standards"],
  "bmw-mini-coding-feltham.html": ["BMW and MINI Coding Quote Information"],
  "bmw-mini-coding-guide.html": ["BMW and MINI Coding Services and Next Steps"],
  "bmw-mini-coding.html": ["BMW and MINI Coding Prices and Compatibility", "BMW Coding Compatibility Resources"],
  "bumper-repair-feltham.html": ["Mobile Bumper Repair Quote Information"],
  "car-repair-photo-guide.html": ["Car Repair Quote Services and Next Steps"],
  "car-services-ashford.html": ["Mobile Mechanic Services in Ashford"],
  "car-services-bedfont.html": ["Mobile Mechanic Services in Bedfont"],
  "car-services-feltham.html": ["Mobile Mechanic Services in Feltham"],
  "car-services-hounslow.html": ["Mobile Mechanic Services in Hounslow"],
  "car-services-kingston.html": ["Mobile Mechanic Services in Kingston"],
  "car-services-sunbury.html": ["Mobile Mechanic Services in Sunbury"],
  "contact.html": ["Mobile Mechanic Contact and Booking Information"],
  "customer-thank-you.html": ["Customer Reviews, Loyalty and Referral Options"],
  "ecu-remapping.html": ["ECU Remapping Prices and Enquiry Information"],
  "mobile-obd-diagnostics-feltham.html": ["Mobile Car Diagnostics Quote Information"],
  "mot-support.html": ["MOT Support Prices and Booking Information", "MOT Status and Car Diagnostics Resources"],
  "mot-warning-light-guide.html": ["MOT and Car Diagnostics Services"],
  "obd-diagnostics.html": ["Car Diagnostics Prices and Booking Information"],
  "pricing.html": ["Mobile Mechanic Quote Options"],
  "refer-a-friend.html": ["Refer a Friend and Loyalty Options"],
  "reviews.html": ["Google Reviews and Trustpilot Feedback", "Mobile Mechanic Review Standards"],
  "scratch-bumper-repairs.html": ["Mobile Bumper Repair Prices and Booking Information"],
  "services.html": ["Mobile Mechanic Services in Feltham"],
  "single-panel-repair-respray.html": ["Car Scratch Repair and Panel Respray Suitability"],
  "single-panel-respray-feltham.html": ["Car Panel Respray Quote Information"],
  "trim-fitment.html": ["Car Styling and Accessory Fitting Prices"],
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceHeading(html, oldText, newText) {
  const pattern = new RegExp(`(<h([2-4])[^>]*>)${escapeRegExp(oldText)}(<\\/h\\2>)`, "g");
  return html.replace(pattern, `$1${newText}$3`);
}

function normalizeSection(section) {
  const articlePattern = /<article\b[\s\S]*?<\/article>/gi;
  const articles = section.match(articlePattern) || [];
  if (!articles.length) return section;

  const outsideArticles = section.replace(articlePattern, "");
  if (!/<h2\b/i.test(outsideArticles)) return section;

  return section.replace(articlePattern, (article) =>
    article.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/i, "<h3$1>$2</h3>")
  );
}

for (const file of htmlFiles) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");

  for (const [oldText, newText] of Object.entries(replacements[file] || {})) {
    html = replaceHeading(html, oldText, newText);
  }

  const town = townPages[file];
  if (town) {
    html = replaceHeading(html, `Useful links for ${town} drivers`, `Mobile Mechanic Services and Prices in ${town}`);
    const townCtas = {
      Ashford: "Make the enquiry easy to price",
      Bedfont: "Reduce back-and-forth before booking",
      Feltham: "Send the vehicle, postcode and photos in one go",
      Hounslow: "Give the details that decide price and route",
      Kingston: "Send one clear message",
      Sunbury: "Move from enquiry to route quickly",
    };
    html = replaceHeading(html, townCtas[town], `Request a Mobile Mechanic Quote in ${town}`);
  }

  let unheadedIndex = 0;
  html = html.replace(/<section\b[\s\S]*?<\/section>/gi, (section) => {
    const articles = section.match(/<article\b[\s\S]*?<\/article>/gi) || [];
    const hasCardArticles = articles.some((article) => !/class="[^"]*legal-content/i.test(article));
    const outsideArticles = section.replace(/<article\b[\s\S]*?<\/article>/gi, "");

    if (hasCardArticles && !/<h2\b/i.test(outsideArticles)) {
      const title = unheadedSectionTitles[file]?.[unheadedIndex];
      unheadedIndex += 1;
      if (title) {
        section = section.replace(/^(<section\b[^>]*>)/i, `$1<div class="container section-heading"><h2>${title}</h2></div>`);
      }
    }

    return normalizeSection(section);
  });
  fs.writeFileSync(full, html, "utf8");
}

console.log(`Standardized H2/H3 hierarchy and keyword-led section headings across ${htmlFiles.length} pages.`);
