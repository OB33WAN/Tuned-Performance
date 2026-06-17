const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const slotField = document.querySelector("[data-slot-field]");
const WEB3FORMS_ACCESS_KEY = "4f7ab378-e677-4b67-b382-d548236a7160";
const GOOGLE_ANALYTICS_ID = "G-Z6M09GYPFY";
const whatsappThankYouUrl = "thank-you.html?source=whatsapp";
let analyticsLoaded = false;

const loadAnalytics = () => {
  if (analyticsLoaded || !GOOGLE_ANALYTICS_ID || !/^https?:$/.test(window.location.protocol)) return;

  analyticsLoaded = true;
  window[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`;
  document.head.append(tag);

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_ID, {
    anonymize_ip: true,
    send_page_view: true
  });
};

const disableAnalytics = () => {
  if (!GOOGLE_ANALYTICS_ID) return;
  window[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = true;
};

const trackConversion = (eventName, params = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    website_area: document.title,
    ...params
  });
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const estimates = {
  repair: { small: "From &pound;60", medium: "&pound;90-&pound;160 guide", large: "Photo quote needed" },
  scratch: { small: "From &pound;100", medium: "&pound;150-&pound;240 guide", large: "Panel review needed" },
  diagnostic: { small: "From &pound;50", medium: "&pound;50-&pound;90 guide", large: "Fault route needed" },
  fitment: { small: "From &pound;20", medium: "&pound;35-&pound;80 guide", large: "Parts review needed" },
  mot: { small: "Ask for route quote", medium: "Pickup support quote", large: "Workshop route needed" }
};

const estimator = document.querySelector("[data-estimator]");
const estimateService = document.querySelector("[data-estimate-service]");
const estimateSize = document.querySelector("[data-estimate-size]");
const estimateResult = document.querySelector("[data-estimate-result]");

const updateEstimate = () => {
  if (!estimateService || !estimateSize || !estimateResult) return;
  const service = estimateService.value;
  const size = estimateSize.value;
  estimateResult.innerHTML = estimates[service]?.[size] || "Quote needed";
};

estimator?.addEventListener("change", updateEstimate);
updateEstimate();

const remapRanges = {
  "turbo-diesel": {
    text: "Typical enquiry range: 20-35 bhp and stronger mid-range torque.",
    angle: "-18deg"
  },
  "turbo-petrol": {
    text: "Typical enquiry range: 25-45 bhp with sharper throttle response.",
    angle: "8deg"
  },
  "naturally-aspirated": {
    text: "Typical gains are usually modest. Enquire for vehicle-specific advice.",
    angle: "-44deg"
  }
};

const remapForm = document.querySelector("[data-remap]");
const engineType = document.querySelector("[data-engine-type]");
const remapOutput = document.querySelector("[data-remap-output]");
const gaugeNeedle = document.querySelector("[data-gauge-needle]");

const updateRemap = () => {
  if (!engineType || !remapOutput || !gaugeNeedle) return;
  const range = remapRanges[engineType.value];
  remapOutput.textContent = range.text;
  gaugeNeedle.style.transform = `translateX(-50%) rotate(${range.angle})`;
};

remapForm?.addEventListener("change", updateRemap);
updateRemap();

const availability = document.querySelector("[data-availability]");
const availabilityNote = document.querySelector("[data-availability-note]");
const availabilityLabels = {
  "weekday-day": "Weekday daytime request",
  "weekday-evening": "Weekday evening request",
  saturday: "Saturday route request",
  sunday: "Sunday route request"
};

availability?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-slot]");
  if (!(card instanceof HTMLElement)) return;

  availability.querySelectorAll("[data-slot]").forEach((item) => {
    item.classList.toggle("is-active", item === card);
  });

  const label = availabilityLabels[card.dataset.slot] || "Availability request";
  if (availabilityNote) availabilityNote.textContent = `Selected preference: ${label}`;
  if (slotField) slotField.value = label;
});

const coreAreas = ["feltham", "bedfont", "ashford", "sunbury", "hounslow", "kingston"];
const areaFilter = document.querySelector("[data-area-filter]");
const areaMessage = document.querySelector("[data-area-message]");

areaFilter?.addEventListener("input", () => {
  const value = areaFilter.value.trim().toLowerCase();
  if (!areaMessage) return;

  if (!value) {
    areaMessage.textContent = "Start typing to check the core coverage list.";
    return;
  }

  const match = coreAreas.find((area) => area.includes(value) || value.includes(area));
  areaMessage.textContent = match
    ? `${match[0].toUpperCase()}${match.slice(1)} is in the core mobile coverage list.`
    : "That area may still be possible. Send the postcode for confirmation.";
});

const getFormStatus = (form) => form.querySelector("[data-form-status]") || form.closest(".full-estimator")?.querySelector("[data-form-status]");

const validateEmailFormSetup = (form, event) => {
  const accessKey = form.querySelector('input[name="access_key"]')?.value.trim();
  const status = getFormStatus(form);

  if (!accessKey || accessKey !== WEB3FORMS_ACCESS_KEY) {
    event.preventDefault();
    if (status) status.textContent = "Email sending is not connected yet. Please use WhatsApp or call instead.";
    return false;
  }

  if (status) status.textContent = "Sending your enquiry securely...";
  trackConversion("generate_lead", { method: "email_form" });
  return true;
};

const openWhatsAppLead = (url) => {
  trackConversion("generate_lead", { method: "whatsapp" });
  trackConversion("whatsapp_click", { link_url: url });
  const opened = window.open(url, "_blank", "noopener");
  if (!opened) {
    window.location.href = url;
    return;
  }

  window.setTimeout(() => {
    window.location.href = whatsappThankYouUrl;
  }, 650);
};

document.querySelectorAll("[data-lead-form], [data-estimate-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => validateEmailFormSetup(form, event));
});

document.querySelectorAll("[data-booking-form]").forEach((bookingForm) => {
  const whatsappSubmit = bookingForm.querySelector("[data-whatsapp-submit]");

  whatsappSubmit?.addEventListener("click", () => {
    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const lines = [
      "Hi Tuned Performance, I would like a quote.",
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Postcode or area: ${data.get("postcode") || ""}`,
      `Vehicle: ${data.get("vehicle") || ""}`,
      `Service: ${data.get("service") || ""}`,
      `Preferred availability: ${data.get("slot") || ""}`,
      `Details: ${data.get("message") || ""}`
    ];
    const message = encodeURIComponent(lines.join("\n"));
    openWhatsAppLead(`https://wa.me/447933705124?text=${message}`);
  });
});

const buildBookingLeadPreview = (bookingForm) => {
  const data = new FormData(bookingForm);
  const lines = [
    "New Tuned Performance website enquiry",
    `Name: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Postcode or area: ${data.get("postcode") || ""}`,
    `Vehicle: ${data.get("vehicle") || ""}`,
    `Service: ${data.get("service") || ""}`,
    `Preferred availability: ${data.get("slot") || ""}`,
    `Details: ${data.get("message") || ""}`
  ];

  return lines.join("\n");
};

document.querySelectorAll("[data-booking-form]").forEach((bookingForm) => {
  const updatePreview = () => {
    let summary = bookingForm.querySelector('input[name="enquiry_summary"]');
    if (!summary) {
      summary = document.createElement("input");
      summary.type = "hidden";
      summary.name = "enquiry_summary";
      bookingForm.append(summary);
    }
    summary.value = buildBookingLeadPreview(bookingForm);
  };

  bookingForm.addEventListener("input", updatePreview);
  bookingForm.addEventListener("change", updatePreview);
  updatePreview();
});

const fullEstimator = document.querySelector("[data-full-estimator]");
const fullName = document.querySelector("[data-full-name]");
const fullPhone = document.querySelector("[data-full-phone]");
const fullEmail = document.querySelector("[data-full-email]");
const fullContact = document.querySelector("[data-full-contact]");
const fullService = document.querySelector("[data-full-service]");
const fullSize = document.querySelector("[data-full-size]");
const fullSlot = document.querySelector("[data-full-slot]");
const fullArea = document.querySelector("[data-full-area]");
const fullVehicle = document.querySelector("[data-full-vehicle]");
const fullColour = document.querySelector("[data-full-colour]");
const fullAccess = document.querySelector("[data-full-access]");
const fullUrgency = document.querySelector("[data-full-urgency]");
const fullDetails = document.querySelector("[data-full-details]");
const fullTotal = document.querySelector("[data-full-total]");
const fullBreakdown = document.querySelector("[data-full-breakdown]");
const fullWhatsApp = document.querySelector("[data-full-whatsapp]");
const estimateEmailForm = document.querySelector("[data-estimate-email-form]");
const estimateServiceLabel = document.querySelector("[data-estimate-service-label]");
const estimateSizeLabel = document.querySelector("[data-estimate-size-label]");
const estimateGuide = document.querySelector("[data-estimate-guide]");
const estimateSummary = document.querySelector("[data-estimate-summary]");

const fullEstimateData = {
  repair: {
    label: "Bumper or panel repair",
    small: { amount: 60, note: "Small scuff or localised repair" },
    medium: { amount: 120, note: "Medium repair or two affected areas" },
    large: { amount: null, note: "Photo quote needed for larger repair" }
  },
  scratch: {
    label: "Single panel repair & re-spray",
    small: { amount: 100, note: "Single panel starting guide" },
    medium: { amount: 160, note: "More visible or wider panel repair" },
    large: { amount: null, note: "Panel review needed" }
  },
  diagnostic: {
    label: "OBD diagnostics",
    small: { amount: 50, note: "Fault scan visit" },
    medium: { amount: 75, note: "Scan plus extended guidance" },
    large: { amount: null, note: "Workshop route may be needed" }
  },
  fitment: {
    label: "Trim or accessory fitment",
    small: { amount: 20, note: "Simple small-item fitment" },
    medium: { amount: 50, note: "Two items or more involved fitment" },
    large: { amount: null, note: "Parts review needed" }
  },
  mot: {
    label: "MOT support",
    small: { amount: null, note: "Route quote needed" },
    medium: { amount: null, note: "Garage route quote needed" },
    large: { amount: null, note: "Workshop support quote needed" }
  },
  remap: {
    label: "ECU remap enquiry",
    small: { amount: null, note: "Enquiry-only service" },
    medium: { amount: null, note: "Vehicle-specific guidance needed" },
    large: { amount: null, note: "Register interest first" }
  }
};

const slotLabels = {
  weekday: "Weekday daytime",
  evening: "Weekday evening",
  saturday: "Saturday route",
  sunday: "Sunday route"
};

const formatPounds = (amount) => `&pound;${amount}`;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
}[char]));

const updateFullEstimator = () => {
  if (!fullEstimator || !fullService || !fullSize || !fullSlot || !fullTotal || !fullBreakdown || !fullWhatsApp) return;

  const service = fullEstimateData[fullService.value];
  const size = service[fullSize.value];
  const slot = slotLabels[fullSlot.value] || "Availability request";
  const name = fullName?.value.trim() || "Not provided";
  const phone = fullPhone?.value.trim() || "Not provided";
  const email = fullEmail?.value.trim() || "Not provided";
  const contact = fullContact?.value || "WhatsApp";
  const area = fullArea?.value.trim() || "Not provided";
  const vehicle = fullVehicle?.value.trim() || "Not provided";
  const colour = fullColour?.value.trim() || "Not provided";
  const access = fullAccess?.value || "Not provided";
  const urgency = fullUrgency?.value || "Flexible";
  const details = fullDetails?.value.trim() || "Not provided";
  const guideText = size.amount ? `From \u00a3${size.amount}` : "Quote required";
  const amountText = size.amount ? `From ${formatPounds(size.amount)}` : "Quote required";

  fullTotal.innerHTML = amountText;
  fullBreakdown.innerHTML = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Service", service.label],
    ["Job size", size.note],
    ["Guide", guideText],
    ["Availability", slot],
    ["Urgency", urgency],
    ["Area", area],
    ["Vehicle", vehicle],
    ["Colour", colour],
    ["Access", access]
  ].map(([label, value]) => `<li><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></li>`).join("");

  const lines = [
    "Hi Tuned Performance, I used the estimator and would like a quote.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Preferred contact: ${contact}`,
    `Service: ${service.label}`,
    `Job size: ${size.note}`,
    `Guide: ${guideText}`,
    `Preferred availability: ${slot}`,
    `Urgency: ${urgency}`,
    `Area/postcode: ${area}`,
    `Vehicle: ${vehicle}`,
    `Vehicle colour: ${colour}`,
    `Access: ${access}`,
    `Details: ${details}`
  ];
  fullWhatsApp.href = `https://wa.me/447933705124?text=${encodeURIComponent(lines.join("\n"))}`;
  fullWhatsApp.target = "_blank";
  fullWhatsApp.rel = "noopener";

  if (estimateServiceLabel) estimateServiceLabel.value = service.label;
  if (estimateSizeLabel) estimateSizeLabel.value = size.note;
  if (estimateGuide) estimateGuide.value = guideText;
  if (estimateSummary) estimateSummary.value = lines.join("\n");
};

fullEstimator?.addEventListener("input", updateFullEstimator);
fullEstimator?.addEventListener("change", updateFullEstimator);
updateFullEstimator();

fullWhatsApp?.addEventListener("click", (event) => {
  if (estimateEmailForm && !estimateEmailForm.reportValidity()) {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  openWhatsAppLead(fullWhatsApp.href);
});

const cookieBanner = document.querySelector("[data-cookie-banner]");
const cookieAccept = document.querySelector("[data-cookie-accept]");
const cookieReject = document.querySelector("[data-cookie-reject]");
const cookieReset = document.querySelector("[data-cookie-reset]");
const cookieResetStatus = document.querySelector("[data-cookie-reset-status]");

const getCookieChoice = () => {
  try {
    return localStorage.getItem("tp_cookie_choice");
  } catch {
    return null;
  }
};

const setCookieChoice = (choice) => {
  try {
    localStorage.setItem("tp_cookie_choice", choice);
  } catch {
    // If local storage is unavailable, the current page view can still honour the click.
  }
};

const cookieChoice = getCookieChoice();

if (cookieChoice === "analytics" || cookieChoice === "accepted") {
  loadAnalytics();
}

if (cookieBanner && !["analytics", "accepted", "essential"].includes(cookieChoice)) {
  cookieBanner.classList.add("is-visible");
}

cookieAccept?.addEventListener("click", () => {
  setCookieChoice("analytics");
  loadAnalytics();
  cookieBanner?.classList.remove("is-visible");
});

cookieReject?.addEventListener("click", () => {
  setCookieChoice("essential");
  disableAnalytics();
  cookieBanner?.classList.remove("is-visible");
});

cookieReset?.addEventListener("click", () => {
  try {
    localStorage.removeItem("tp_cookie_choice");
  } catch {
    // If local storage is unavailable, show the banner for this page view.
  }
  disableAnalytics();
  cookieBanner?.classList.add("is-visible");
  if (cookieResetStatus) cookieResetStatus.textContent = "Cookie choice reset. Use the banner to choose again.";
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => trackConversion("phone_click", { link_url: link.href }));
});

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", () => trackConversion("whatsapp_click", { link_url: link.href }));
});

document.querySelectorAll('a[href*="g.page/r/CZnD7eUE_OmbEBM/review"]').forEach((link) => {
  link.addEventListener("click", () => trackConversion("review_click", { platform: "google", link_url: link.href }));
});

document.querySelectorAll('a[href*="trustpilot.com/review/tunedperformance.co.uk"]').forEach((link) => {
  link.addEventListener("click", () => trackConversion("review_click", { platform: "trustpilot", link_url: link.href }));
});

const thanksTitle = document.querySelector("[data-thanks-title]");
const thanksCopy = document.querySelector("[data-thanks-copy]");
const thanksPanelTitle = document.querySelector("[data-thanks-panel-title]");
const thanksPanelCopy = document.querySelector("[data-thanks-panel-copy]");

if (thanksTitle && thanksCopy && thanksPanelTitle && thanksPanelCopy) {
  const source = new URLSearchParams(window.location.search).get("source");

  if (source === "whatsapp") {
    thanksTitle.textContent = "Thank you, WhatsApp should now be open";
    thanksCopy.textContent = "If WhatsApp opened, please press send there to complete the enquiry. Tuned Performance will reply as soon as possible.";
    thanksPanelTitle.textContent = "Do not forget to send the message";
    thanksPanelCopy.textContent = "The website prepared the enquiry, but WhatsApp messages are only received after you press send in WhatsApp. Add photos there if the job involves damage, paintwork or fitment.";
  } else if (source === "email") {
    thanksTitle.textContent = "Thank you, your email enquiry has been sent";
    thanksCopy.textContent = "Your details have been sent to the Tuned Performance inbox through Web3Forms. You will receive a reply as soon as possible.";
    thanksPanelTitle.textContent = "Your enquiry is in the inbox";
    thanksPanelCopy.textContent = "For repair and fitment jobs, keeping clear photos ready will help confirm the quote faster. For urgent bookings, calling is still the quickest option.";
  }
}

if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

let deferredInstallPrompt;

const addInstallButton = () => {
  if (!deferredInstallPrompt || document.querySelector("[data-install-app]")) return;

  const footerBottom = document.querySelector(".footer-bottom");
  if (!footerBottom) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "install-app-button";
  button.dataset.installApp = "";
  button.textContent = "Install app";
  button.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    button.remove();
  });

  footerBottom.append(button);
};

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  addInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  document.querySelector("[data-install-app]")?.remove();
});
