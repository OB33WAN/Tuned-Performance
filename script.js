document.documentElement.classList.add("is-enhanced");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navClose = document.querySelector("[data-nav-close]");
const serviceNav = document.querySelector("[data-service-nav]");
const WEB3FORMS_ACCESS_KEY = "4f7ab378-e677-4b67-b382-d548236a7160";
const GOOGLE_ANALYTICS_ID = "G-Z6M09GYPFY";
const whatsappThankYouUrl = "thank-you.html?source=whatsapp";
let analyticsLoaded = false;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobileNavBreakpoint = 1080;

const navBackdrop = nav
  ? Object.assign(document.createElement("button"), {
      type: "button",
      className: "mobile-nav-backdrop"
    })
  : null;

if (navBackdrop) {
  navBackdrop.setAttribute("aria-label", "Close menu");
  navBackdrop.setAttribute("aria-hidden", "true");
  document.body.append(navBackdrop);
}

const loader = document.createElement("div");
loader.className = "site-loader";
loader.setAttribute("aria-hidden", "true");
loader.innerHTML = "<span></span>";
document.body.prepend(loader);

window.addEventListener("load", () => {
  document.documentElement.classList.add("is-ready");
  window.setTimeout(() => loader.remove(), prefersReducedMotion ? 40 : 650);
});

const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.setAttribute("aria-hidden", "true");
scrollProgress.innerHTML = "<span></span>";
document.body.prepend(scrollProgress);

const updateScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
  scrollProgress.style.setProperty("--scroll-progress", `${percent}%`);
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });

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

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const pageBookingDefaults = {
  "index.html": "Not sure yet",
  "services.html": "Not sure yet",
  "contact.html": "Not sure yet",
  "pricing.html": "Not sure yet",
  "estimator.html": "Not sure yet",
  "areas.html": "Not sure yet",
  "availability.html": "Not sure yet",
  "about.html": "Not sure yet",
  "gallery.html": "Not sure yet",
  "reviews.html": "Not sure yet",
  "recent-jobs.html": "Not sure yet",
  "refer-a-friend.html": "Not sure yet",
  "faq.html": "Not sure yet",
  "car-services-feltham.html": "Oil and filter service",
  "car-services-bedfont.html": "Oil and filter service",
  "car-services-ashford.html": "Oil and filter service",
  "car-services-sunbury.html": "Oil and filter service",
  "car-services-hounslow.html": "Oil and filter service",
  "car-services-kingston.html": "Oil and filter service",
  "scratch-bumper-repairs.html": "Bumper scratches or bumper replacement",
  "bumper-repair-feltham.html": "Bumper scratches or bumper replacement",
  "single-panel-repair-respray.html": "Single panel repair and re-spray",
  "single-panel-respray-feltham.html": "Single panel repair and re-spray",
  "obd-diagnostics.html": "OBD diagnostics and fault code scan",
  "mobile-obd-diagnostics-feltham.html": "OBD diagnostics and fault code scan",
  "bmw-mini-coding.html": "BMW and MINI coding",
  "bmw-mini-coding-feltham.html": "BMW and MINI coding",
  "trim-fitment.html": "Screen, cluster or trim upgrade",
  "mot-support.html": "Not sure yet",
  "ecu-remapping.html": "Not sure yet"
};

const BUSINESS_HOURS_SUMMARY = "Standard hours are Monday to Wednesday 10am to 6pm and Saturday to Sunday 10am to 6pm. Thursday and Friday are closed.";
const OUT_OF_HOURS_SUMMARY = "Weekend evening appointments run on Saturday and Sunday from 6pm to 11.30pm and add a £50 evening booking fee.";
const BOOKING_SLOT_OPTIONS = [
  { key: "mon-wed-day", label: "Monday to Wednesday daytime (10am to 6pm)", fee: 0 },
  { key: "saturday-day", label: "Saturday daytime (10am to 6pm)", fee: 0 },
  { key: "sunday-day", label: "Sunday daytime (10am to 6pm)", fee: 0 },
  { key: "saturday-ooh", label: "Saturday evening appointment (6pm to 11.30pm, +£50 evening booking fee)", fee: 50 },
  { key: "sunday-ooh", label: "Sunday evening appointment (6pm to 11.30pm, +£50 evening booking fee)", fee: 50 }
];
const BOOKING_SLOT_LOOKUP = Object.fromEntries(BOOKING_SLOT_OPTIONS.map((option) => [option.key, option]));
const BOOKING_SLOT_LABELS = Object.fromEntries(BOOKING_SLOT_OPTIONS.map((option) => [option.key, option.label]));
const LONDON_WEEKDAY_MAP = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun"
};

const getLondonNow = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value])
  );
  const dayKey = LONDON_WEEKDAY_MAP[values.weekday] || "mon";
  const hour = Number(values.hour || 0);
  const minute = Number(values.minute || 0);

  return {
    dayKey,
    hour,
    minute,
    totalMinutes: (hour * 60) + minute
  };
};

const getBookingSlotKey = (value) => {
  const normalized = String(value || "").trim();
  if (!normalized) return null;
  if (BOOKING_SLOT_LOOKUP[normalized]) return normalized;

  const exactLabel = BOOKING_SLOT_OPTIONS.find((option) => option.label === normalized);
  if (exactLabel) return exactLabel.key;

  const compact = normalized.replace(/\s+/g, " ").toLowerCase();
  const textMatch = BOOKING_SLOT_OPTIONS.find((option) => {
    const optionLabel = option.label.toLowerCase();
    return compact === optionLabel || compact.includes(optionLabel) || optionLabel.includes(compact);
  });

  return textMatch?.key || null;
};

const getBookingSlotLabel = (value) => {
  const slotKey = getBookingSlotKey(value);
  return slotKey ? BOOKING_SLOT_LOOKUP[slotKey].label : String(value || "Availability request");
};

const isOutOfHoursKey = (slotKey) => (BOOKING_SLOT_LOOKUP[slotKey]?.fee || 0) > 0;

const getSlotOptionForKey = (select, slotKey) => [...select.options].find((option) => (
  getBookingSlotKey(option.value || option.textContent) === slotKey
));

const setBookingSelectValue = (select, slotValueOrKey) => {
  const slotKey = getBookingSlotKey(slotValueOrKey);
  if (!slotKey) return false;

  const option = getSlotOptionForKey(select, slotKey);
  if (!option) return false;

  select.value = option.value;
  return true;
};

const getBusinessHoursState = (now = getLondonNow()) => {
  const { dayKey, totalMinutes } = now;
  let liveKey = null;
  let recommendedKey = "mon-wed-day";
  let statusTone = "closed";
  let statusText = "Currently closed.";

  if (["mon", "tue"].includes(dayKey)) {
    recommendedKey = "mon-wed-day";
    if (totalMinutes < 600) {
      statusText = "Currently closed. Monday to Wednesday daytime bookings start at 10am.";
    } else if (totalMinutes < 1080) {
      liveKey = "mon-wed-day";
      statusTone = "open";
      statusText = "Open now for Monday to Wednesday daytime bookings (10am to 6pm).";
    } else {
      statusText = dayKey === "mon"
        ? "Currently closed. The next Monday to Wednesday daytime slot starts on Tuesday at 10am."
        : "Currently closed. The next Monday to Wednesday daytime slot starts on Wednesday at 10am.";
    }
  } else if (dayKey === "wed") {
    if (totalMinutes < 600) {
      recommendedKey = "mon-wed-day";
      statusText = "Currently closed. Wednesday daytime bookings start at 10am.";
    } else if (totalMinutes < 1080) {
      liveKey = "mon-wed-day";
      recommendedKey = "mon-wed-day";
      statusTone = "open";
      statusText = "Open now for Monday to Wednesday daytime bookings (10am to 6pm).";
    } else {
      recommendedKey = "saturday-day";
      statusText = "Currently closed. Thursday and Friday are closed, so the next standard slot starts on Saturday at 10am.";
    }
  } else if (dayKey === "thu" || dayKey === "fri") {
    recommendedKey = "saturday-day";
    statusText = "Currently closed. Thursday and Friday are closed. The next standard slot is Saturday daytime from 10am to 6pm.";
  } else if (dayKey === "sat") {
    if (totalMinutes < 600) {
      recommendedKey = "saturday-day";
      statusText = "Currently closed. Saturday daytime bookings start at 10am.";
    } else if (totalMinutes < 1080) {
      liveKey = "saturday-day";
      recommendedKey = "saturday-day";
      statusTone = "open";
      statusText = "Open now for Saturday daytime bookings (10am to 6pm).";
    } else if (totalMinutes < 1410) {
      liveKey = "saturday-ooh";
      recommendedKey = "saturday-ooh";
      statusTone = "out-of-hours";
      statusText = "Open now for Saturday evening appointment requests (6pm to 11.30pm). A £50 evening booking fee applies.";
    } else {
      recommendedKey = "sunday-day";
      statusText = "Currently closed. The next standard slot is Sunday daytime from 10am to 6pm.";
    }
  } else if (dayKey === "sun") {
    if (totalMinutes < 600) {
      recommendedKey = "sunday-day";
      statusText = "Currently closed. Sunday daytime bookings start at 10am.";
    } else if (totalMinutes < 1080) {
      liveKey = "sunday-day";
      recommendedKey = "sunday-day";
      statusTone = "open";
      statusText = "Open now for Sunday daytime bookings (10am to 6pm).";
    } else if (totalMinutes < 1410) {
      liveKey = "sunday-ooh";
      recommendedKey = "sunday-ooh";
      statusTone = "out-of-hours";
      statusText = "Open now for Sunday evening appointment requests (6pm to 11.30pm). A £50 evening booking fee applies.";
    } else {
      recommendedKey = "mon-wed-day";
      statusText = "Currently closed. Monday to Wednesday daytime bookings resume at 10am.";
    }
  }

  return {
    liveKey,
    recommendedKey,
    recommendedLabel: BOOKING_SLOT_LOOKUP[recommendedKey].label,
    statusTone,
    statusText,
    formText: `${statusText} ${BUSINESS_HOURS_SUMMARY} ${OUT_OF_HOURS_SUMMARY} Recommended request window: ${BOOKING_SLOT_LOOKUP[recommendedKey].label}.`
  };
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const markCurrentNavigation = (navigation) => {
  navigation?.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const page = href.split("#")[0] || "index.html";
    const homeMatch = currentPage === "index.html" && (href === "#top" || page === "index.html");
    if (homeMatch || page === currentPage) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
  });
};

markCurrentNavigation(nav);
markCurrentNavigation(serviceNav);

const setNavOpen = (isOpen, { restoreFocus = false } = {}) => {
  nav?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("has-nav-open", isOpen);
  navBackdrop?.classList.toggle("is-visible", isOpen);
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  navToggle?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  if (!isOpen && restoreFocus) navToggle?.focus();
  if (isOpen) navClose?.focus();
};

const closeNav = (options) => {
  setNavOpen(false, options);
};

navToggle?.addEventListener("click", () => {
  const isOpen = !nav?.classList.contains("is-open");
  setNavOpen(Boolean(isOpen));
});

navClose?.addEventListener("click", () => {
  closeNav({ restoreFocus: true });
});

navBackdrop?.addEventListener("click", () => {
  closeNav({ restoreFocus: true });
});

nav?.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (link && nav.contains(link)) {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav({ restoreFocus: true });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > mobileNavBreakpoint && nav?.classList.contains("is-open")) {
    closeNav();
  }
});

const bookingModal = document.createElement("div");
bookingModal.className = "booking-modal";
bookingModal.setAttribute("data-booking-modal", "");
bookingModal.setAttribute("aria-hidden", "true");
bookingModal.innerHTML = `
  <div class="booking-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" aria-describedby="booking-modal-copy" tabindex="-1">
    <button class="booking-modal__close" type="button" aria-label="Close booking form" data-booking-modal-close>
      <span aria-hidden="true"></span>
    </button>
    <div class="booking-modal__layout">
      <aside class="booking-modal__side">
        <span class="booking-modal__eyebrow">Quick booking</span>
        <h2 id="booking-modal-title">Send a booking enquiry from this page</h2>
        <p id="booking-modal-copy">Send the booking details directly from the menu. Use email for a tracked enquiry or WhatsApp when you want to attach photos straight away.</p>
        <ul class="booking-modal__list">
          <li>Monday to Wednesday daytime plus weekend booking requests</li>
          <li>Thursday and Friday are closed</li>
          <li>Service, vehicle and area details in one step</li>
          <li>Saturday and Sunday evening appointments after 6pm include a &pound;50 evening booking fee</li>
        </ul>
        <div class="booking-modal__actions">
          <a class="btn btn-secondary" href="tel:+447347388893">Call 07347 388893</a>
          <a class="btn btn-secondary" href="https://wa.me/447347388893" target="_blank" rel="noopener">WhatsApp directly</a>
        </div>
      </aside>
      <form class="booking-form booking-modal__form" action="https://api.web3forms.com/submit" method="POST" data-booking-form data-lead-form>
        <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}">
        <input type="hidden" name="subject" value="New Tuned Performance quick booking enquiry">
        <input type="hidden" name="from_name" value="Tuned Performance Website">
        <input type="hidden" name="redirect" value="https://tunedperformance.co.uk/thank-you.html?source=email">
        <input type="hidden" name="lead_source" value="Menu booking modal">
        <input type="hidden" name="page_context" value="${document.title}">
        <input class="botcheck" aria-label="Leave this field empty" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off">
        <div class="form-row">
          <label for="modal-book-name">Name</label>
          <input id="modal-book-name" name="name" type="text" autocomplete="name" required>
        </div>
        <div class="form-row">
          <label for="modal-book-phone">Phone</label>
          <input id="modal-book-phone" name="phone" type="tel" autocomplete="tel" required>
        </div>
        <div class="form-row">
          <label for="modal-book-email">Email</label>
          <input id="modal-book-email" name="email" type="email" autocomplete="email" placeholder="For email replies">
        </div>
        <div class="form-row">
          <label for="modal-book-postcode">Postcode or area</label>
          <input id="modal-book-postcode" name="postcode" type="text" autocomplete="postal-code" required>
        </div>
        <div class="form-row">
          <label for="modal-book-vehicle">Vehicle</label>
          <input id="modal-book-vehicle" name="vehicle" type="text" placeholder="Make, model, year or registration">
        </div>
        <div class="form-row">
          <label for="modal-book-service">Service needed</label>
          <select id="modal-book-service" name="service">
            <option>Oil and filter service</option>
            <option>Spark plugs and ignition coils</option>
            <option>Brakes, pads and discs</option>
            <option>Tyres and wheel replacement</option>
            <option>Bumper scratches or bumper replacement</option>
            <option>Single panel repair and re-spray</option>
            <option>BMW and MINI coding</option>
            <option>Screen, cluster or trim upgrade</option>
            <option>OBD diagnostics and fault code scan</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div class="form-row">
          <label for="modal-book-slot">Preferred availability</label>
          <select id="modal-book-slot" name="slot">
            <option>Monday to Wednesday daytime (10am to 6pm)</option>
            <option>Saturday daytime (10am to 6pm)</option>
            <option>Sunday daytime (10am to 6pm)</option>
            <option>Saturday evening appointment (6pm to 11.30pm, +£50 evening booking fee)</option>
            <option>Sunday evening appointment (6pm to 11.30pm, +£50 evening booking fee)</option>
          </select>
        </div>
        <div class="form-row form-row-full">
          <label for="modal-book-message">What is happening?</label>
          <textarea id="modal-book-message" name="message" rows="4" placeholder="Add the oil service, plugs, brakes, wheel change, bumper damage, parts to fit, screen upgrade or coding features needed."></textarea>
        </div>
        <div class="form-actions form-row-full">
          <button class="btn btn-primary" type="submit">Send email enquiry</button>
          <button class="btn btn-secondary btn-on-light" type="button" data-whatsapp-submit>Send on WhatsApp</button>
        </div>
        <p class="form-note">Email enquiries go through Web3Forms. Use this route for planned servicing, cosmetic work, coding and upgrade bookings.</p>
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
`;
document.body.append(bookingModal);

const bookingModalDialog = bookingModal.querySelector(".booking-modal__dialog");
const bookingModalClose = bookingModal.querySelector("[data-booking-modal-close]");
const bookingModalForm = bookingModal.querySelector("[data-booking-form]");
const bookingModalService = bookingModal.querySelector('select[name="service"]');
const bookingModalLeadSource = bookingModal.querySelector('input[name="lead_source"]');
const bookingModalPageContext = bookingModal.querySelector('input[name="page_context"]');
const bookingModalTriggers = [...new Set(document.querySelectorAll(
  ".nav-book-link, a.btn[href='contact.html'], .mobile-bar a[href='contact.html'], .route-item[href='contact.html']"
))];
let bookingModalRestoreFocus = null;

const estimates = {
  oil: { small: "From &pound;50", medium: "&pound;60-&pound;80 guide", large: "Vehicle and parts review needed" },
  plugs: { small: "From &pound;50", medium: "&pound;60-&pound;90 guide", large: "Vehicle and parts review needed" },
  brakes: { small: "From &pound;60", medium: "&pound;90-&pound;160 guide", large: "Vehicle and parts review needed" },
  wheels: { small: "From &pound;25", medium: "&pound;35-&pound;60 guide", large: "Vehicle and parts review needed" },
  bumper: { small: "From &pound;60", medium: "&pound;90-&pound;160 guide", large: "Photo quote needed" },
  panel: { small: "From &pound;100", medium: "&pound;150-&pound;240 guide", large: "Panel review needed" },
  scan: { small: "From &pound;50", medium: "&pound;50-&pound;90 guide", large: "Vehicle symptoms review needed" },
  upgrades: { small: "From &pound;30", medium: "&pound;50-&pound;90 guide", large: "Parts review needed" },
  coding: { small: "From &pound;40", medium: "&pound;60-&pound;90 guide", large: "Compatibility check needed" },
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
  estimateResult.classList.remove("is-updated");
  void estimateResult.offsetWidth;
  estimateResult.classList.add("is-updated");
  trackConversion("quick_estimate_change", { service, size });
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

const setBookingModalDefaultService = () => {
  if (!(bookingModalService instanceof HTMLSelectElement)) return;
  bookingModalService.value = pageBookingDefaults[currentPage] || "Not sure yet";
};

const getBookingTriggerSource = (trigger) => {
  if (!(trigger instanceof HTMLElement)) {
    return "Quick booking modal";
  }

  if (trigger.classList.contains("nav-book-link")) {
    return "Header book";
  }

  if (trigger.closest(".mobile-bar")) {
    return "Mobile quote bar";
  }

  if (trigger.classList.contains("route-item")) {
    return "Quick route quote";
  }

  if (trigger.closest(".hero-actions")) {
    return "Hero quote CTA";
  }

  if (trigger.closest(".conversion-strip")) {
    return "Conversion strip CTA";
  }

  if (trigger.closest(".quote-ready")) {
    return "Quote section CTA";
  }

  if (trigger.closest(".mini-cta")) {
    return "Mini CTA";
  }

  if (trigger.classList.contains("btn")) {
    return "Page quote button";
  }

  return "Quick booking modal";
};

const closeBookingModal = ({ restoreFocus = true } = {}) => {
  bookingModal.classList.remove("is-visible");
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-modal");

  if (restoreFocus && bookingModalRestoreFocus instanceof HTMLElement) {
    bookingModalRestoreFocus.focus();
  }
};

const openBookingModal = (trigger = null) => {
  bookingModalRestoreFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
  if (bookingModalLeadSource instanceof HTMLInputElement) {
    bookingModalLeadSource.value = `${getBookingTriggerSource(trigger)} - ${currentPage}`;
  }
  if (bookingModalPageContext instanceof HTMLInputElement) {
    bookingModalPageContext.value = document.title;
  }
  setBookingModalDefaultService();
  bookingModal.classList.add("is-visible");
  bookingModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal");
  bookingModalDialog?.focus();
  const firstField = bookingModal.querySelector("input:not([type='hidden']):not(.botcheck), select, textarea");
  if (firstField instanceof HTMLElement) {
    window.setTimeout(() => firstField.focus(), 40);
  }
  trackConversion("booking_modal_open", { page: currentPage });
};

bookingModalTriggers.forEach((trigger) => {
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", "site-booking-modal");
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    closeNav();
    openBookingModal(trigger);
  });
});

bookingModal.id = "site-booking-modal";

bookingModal.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    closeBookingModal();
  }
});

bookingModalClose?.addEventListener("click", () => {
  closeBookingModal();
});

document.addEventListener("keydown", (event) => {
  if (!bookingModal.classList.contains("is-visible")) return;

  if (event.key === "Escape") {
    closeBookingModal();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = [...bookingModal.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => element instanceof HTMLElement && element.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const ensureHiddenFormField = (form, fieldName) => {
  let field = form.querySelector(`input[name="${fieldName}"]`);
  if (field instanceof HTMLInputElement) return field;

  field = document.createElement("input");
  field.type = "hidden";
  field.name = fieldName;
  const botcheck = form.querySelector(".botcheck");
  if (botcheck) {
    botcheck.insertAdjacentElement("beforebegin", field);
  } else {
    form.prepend(field);
  }
  return field;
};

const ensureBusinessHoursNote = (form) => {
  let note = form.querySelector("[data-business-hours-note]");
  if (note instanceof HTMLElement) return note;

  note = document.createElement("p");
  note.className = "form-hours-note";
  note.dataset.businessHoursNote = "";
  note.setAttribute("role", "status");
  note.setAttribute("aria-live", "polite");

  const bookingSlotRow = form.querySelector('select[name="slot"]')?.closest(".form-row");
  if (bookingSlotRow instanceof HTMLElement) {
    note.classList.add("form-row-full");
    bookingSlotRow.insertAdjacentElement("afterend", note);
    return note;
  }

  const estimatorGrid = form.querySelector("[data-full-slot]")?.closest(".estimator-field-grid");
  if (estimatorGrid instanceof HTMLElement) {
    note.classList.add("estimator-wide-field");
    estimatorGrid.append(note);
    return note;
  }

  const formNote = form.querySelector(".form-note");
  if (formNote instanceof HTMLElement) {
    formNote.insertAdjacentElement("beforebegin", note);
    return note;
  }

  form.append(note);
  return note;
};

const syncBusinessHourForms = () => {
  const businessState = getBusinessHoursState();

  document.querySelectorAll("[data-booking-form], [data-estimate-email-form]").forEach((form) => {
    const slotSelect = form.querySelector('select[name="slot"], [data-full-slot]');
    if (!(slotSelect instanceof HTMLSelectElement)) return;

    if (slotSelect.dataset.userSelected !== "true") {
      setBookingSelectValue(slotSelect, businessState.recommendedKey);
    }

    const selectedKey = getBookingSlotKey(slotSelect.value || slotSelect.selectedOptions[0]?.textContent);
    const selectedLabel = selectedKey
      ? BOOKING_SLOT_LOOKUP[selectedKey].label
      : (slotSelect.selectedOptions[0]?.textContent?.trim() || slotSelect.value || "Availability request");
    const selectedFee = BOOKING_SLOT_LOOKUP[selectedKey]?.fee || 0;

    const note = ensureBusinessHoursNote(form);
    note.classList.remove("is-open", "is-out-of-hours", "is-closed");
    note.classList.add(
      businessState.statusTone === "out-of-hours"
        ? "is-out-of-hours"
        : businessState.statusTone === "open"
          ? "is-open"
          : "is-closed"
    );
    note.textContent = `${businessState.formText} The form uses current UK time and updates automatically. Selected slot: ${selectedLabel}. ${selectedFee ? "This slot includes the £50 evening booking fee." : "This slot is within standard hours."}`;

    ensureHiddenFormField(form, "business_hours_status").value = businessState.statusText;
    ensureHiddenFormField(form, "business_hours_summary").value = `${BUSINESS_HOURS_SUMMARY} ${OUT_OF_HOURS_SUMMARY}`;
    ensureHiddenFormField(form, "recommended_booking_window").value = businessState.recommendedLabel;
    ensureHiddenFormField(form, "selected_booking_window").value = selectedLabel;
    ensureHiddenFormField(form, "out_of_hours_fee").value = selectedFee ? "£50 applies" : "Not applied";
  });

  return businessState;
};

document.querySelectorAll('[data-booking-form] select[name="slot"], [data-estimate-email-form] [data-full-slot]').forEach((select) => {
  select.addEventListener("change", () => {
    select.dataset.userSelected = "true";
    syncBusinessHourForms();
    updateFullEstimator?.();
  });
});

const availability = document.querySelector("[data-availability]");
const availabilityNote = document.querySelector("[data-availability-note]");
const availabilityLabels = BOOKING_SLOT_LABELS;

availability?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const card = target?.closest("[data-slot]");
  if (!(card instanceof HTMLElement)) return;

  availability.querySelectorAll("[data-slot]").forEach((item) => {
    item.classList.toggle("is-active", item === card);
  });

  const label = availabilityLabels[card.dataset.slot] || "Availability request";
  if (availabilityNote) availabilityNote.textContent = `Selected booking window: ${label}`;
  document.querySelectorAll('[data-booking-form] select[name="slot"], [data-estimate-email-form] [data-full-slot], [data-slot-field]').forEach((field) => {
    if (!(field instanceof HTMLSelectElement)) return;
    setBookingSelectValue(field, card.dataset.slot || label);
    field.dataset.userSelected = "true";
  });
  syncBusinessHourForms();
  updateFullEstimator?.();
  if (availabilityNote) {
    availabilityNote.classList.remove("is-updated");
    void availabilityNote.offsetWidth;
    availabilityNote.classList.add("is-updated");
  }
  trackConversion("availability_select", { slot: label });
});

const codingPreview = document.querySelector("[data-coding-preview]");
const codingResult = document.querySelector("[data-coding-result]");
const codingLabels = {
  comfort: "Selected coding route: Comfort coding. Send the vehicle, model year and the exact convenience features wanted.",
  lighting: "Selected coding route: Lighting coding. Send the current light behaviour and the setting you want changed.",
  display: "Selected coding route: Display and iDrive coding. Send photos of the current menu or cluster if possible.",
  compatibility: "Selected coding route: Compatibility review. Send the registration or model/year plus your full feature wish list."
};

codingPreview?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const card = target?.closest("[data-coding-option]");
  if (!(card instanceof HTMLElement)) return;

  codingPreview.querySelectorAll("[data-coding-option]").forEach((item) => {
    item.classList.toggle("is-active", item === card);
  });

  const label = codingLabels[card.dataset.codingOption] || codingLabels.compatibility;
  if (codingResult) {
    codingResult.textContent = label;
    codingResult.classList.remove("is-updated");
    void codingResult.offsetWidth;
    codingResult.classList.add("is-updated");
  }
  trackConversion("coding_option_select", { option: card.dataset.codingOption || "compatibility" });
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
  areaMessage.classList.toggle("is-positive", Boolean(match));
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
    const businessState = getBusinessHoursState();
    const slotLabel = getBookingSlotLabel(data.get("slot"));
    const slotKey = getBookingSlotKey(data.get("slot"));
    const outOfHoursText = isOutOfHoursKey(slotKey) ? "£50 applied" : "Not applied";
    const lines = [
      "Hi Tuned Performance, I would like a quote.",
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Postcode or area: ${data.get("postcode") || ""}`,
      `Vehicle: ${data.get("vehicle") || ""}`,
      `Service: ${data.get("service") || ""}`,
      `Preferred availability: ${slotLabel}`,
      `Evening booking fee: ${outOfHoursText}`,
      `Current booking status: ${businessState.statusText}`,
      `Business hours: ${BUSINESS_HOURS_SUMMARY} ${OUT_OF_HOURS_SUMMARY}`,
      `Details: ${data.get("message") || ""}`
    ];
    const message = encodeURIComponent(lines.join("\n"));
    openWhatsAppLead(`https://wa.me/447347388893?text=${message}`);
  });
});

const buildBookingLeadPreview = (bookingForm) => {
  const data = new FormData(bookingForm);
  const businessState = getBusinessHoursState();
  const slotLabel = getBookingSlotLabel(data.get("slot"));
  const slotKey = getBookingSlotKey(data.get("slot"));
  const outOfHoursText = isOutOfHoursKey(slotKey) ? "£50 applied" : "Not applied";
  const lines = [
    "New Tuned Performance website enquiry",
    `Name: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Postcode or area: ${data.get("postcode") || ""}`,
    `Vehicle: ${data.get("vehicle") || ""}`,
    `Service: ${data.get("service") || ""}`,
    `Preferred availability: ${slotLabel}`,
    `Evening booking fee: ${outOfHoursText}`,
    `Current booking status: ${businessState.statusText}`,
    `Business hours: ${BUSINESS_HOURS_SUMMARY} ${OUT_OF_HOURS_SUMMARY}`,
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
const estimatorWizard = document.querySelector("[data-estimator-wizard]");
let validateEstimatorAll = null;

const fullEstimateData = {
  oil: {
    label: "Oil and filter service",
    small: { amount: 50, note: "Routine oil and filter service" },
    medium: { amount: 70, note: "Oil service plus extra filters or checks" },
    large: { amount: null, note: "Vehicle and parts review needed" }
  },
  plugs: {
    label: "Spark plugs and ignition coils",
    small: { amount: 50, note: "Spark plug or simple ignition service" },
    medium: { amount: 80, note: "Multiple plugs or ignition coils" },
    large: { amount: null, note: "Vehicle and parts review needed" }
  },
  brakes: {
    label: "Brakes, pads and discs",
    small: { amount: 60, note: "Brake inspection or smaller axle job" },
    medium: { amount: 120, note: "Pads and discs or more involved brake work" },
    large: { amount: null, note: "Vehicle and parts review needed" }
  },
  wheels: {
    label: "Tyres and wheel replacement",
    small: { amount: 25, note: "Single wheel change or simple swap" },
    medium: { amount: 50, note: "Two wheels or more involved change" },
    large: { amount: null, note: "Vehicle and parts review needed" }
  },
  bumper: {
    label: "Bumper scratches or bumper replacement",
    small: { amount: 60, note: "Small scuff or localised bumper repair" },
    medium: { amount: 120, note: "Medium bumper repair or two affected areas" },
    large: { amount: null, note: "Photo quote needed for larger bumper repair" }
  },
  panel: {
    label: "Single panel repair and re-spray",
    small: { amount: 100, note: "Single panel starting guide" },
    medium: { amount: 160, note: "More visible or wider panel repair" },
    large: { amount: null, note: "Panel review needed" }
  },
  scan: {
    label: "OBD diagnostics and fault code scan",
    small: { amount: 50, note: "Fault code scan and basic next-step guidance" },
    medium: { amount: 75, note: "Fault code scan plus extended checks" },
    large: { amount: null, note: "Complex repair diagnosis not included" }
  },
  upgrades: {
    label: "Screen, cluster or trim upgrade",
    small: { amount: 30, note: "Simple supplied trim or accessory fitment" },
    medium: { amount: 60, note: "Screen, cluster or multi-part upgrade" },
    large: { amount: null, note: "Parts review needed" }
  },
  coding: {
    label: "BMW and MINI coding",
    small: { amount: 40, note: "Supported feature coding session" },
    medium: { amount: 60, note: "Multiple supported coding changes" },
    large: { amount: null, note: "Compatibility review needed first" }
  }
};

const slotLabels = BOOKING_SLOT_LABELS;

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

  const businessState = getBusinessHoursState();
  const service = fullEstimateData[fullService.value];
  const size = service[fullSize.value];
  const slotKey = getBookingSlotKey(fullSlot.value);
  const slot = slotLabels[slotKey] || "Availability request";
  const outOfHoursFee = BOOKING_SLOT_LOOKUP[slotKey]?.fee || 0;
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
  const guideText = size.amount
    ? `From \u00a3${size.amount}${outOfHoursFee ? " plus a \u00a350 evening booking fee" : ""}`
    : outOfHoursFee
      ? "Quote required plus a \u00a350 evening booking fee"
      : "Quote required";
  const amountText = size.amount
    ? `From ${formatPounds(size.amount + outOfHoursFee)}`
    : "Quote required";

  fullTotal.innerHTML = amountText;
  fullBreakdown.innerHTML = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Service", service.label],
    ["Job size", size.note],
    ["Guide", guideText],
    ["Availability", slot],
    ["Evening booking fee", outOfHoursFee ? "\u00a350" : "Not applied"],
    ["Current booking status", businessState.statusText],
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
    `Evening booking fee: ${outOfHoursFee ? "\u00a350 applied" : "Not applied"}`,
    `Current booking status: ${businessState.statusText}`,
    `Business hours: ${BUSINESS_HOURS_SUMMARY} ${OUT_OF_HOURS_SUMMARY}`,
    `Urgency: ${urgency}`,
    `Area/postcode: ${area}`,
    `Vehicle: ${vehicle}`,
    `Vehicle colour: ${colour}`,
    `Access: ${access}`,
    `Details: ${details}`
  ];
  fullWhatsApp.href = `https://wa.me/447347388893?text=${encodeURIComponent(lines.join("\n"))}`;
  fullWhatsApp.target = "_blank";
  fullWhatsApp.rel = "noopener";

  if (estimateServiceLabel) estimateServiceLabel.value = service.label;
  if (estimateSizeLabel) estimateSizeLabel.value = size.note;
  if (estimateGuide) estimateGuide.value = guideText;
  if (estimateSummary) estimateSummary.value = lines.join("\n");
};

fullEstimator?.addEventListener("input", updateFullEstimator);
fullEstimator?.addEventListener("change", updateFullEstimator);
syncBusinessHourForms();
updateFullEstimator();
window.setInterval(() => {
  syncBusinessHourForms();
  updateFullEstimator();
}, 60000);

if (estimatorWizard && estimateEmailForm) {
  const panels = [...estimatorWizard.querySelectorAll("[data-estimator-step]")];
  const triggers = [...estimatorWizard.querySelectorAll("[data-estimator-step-trigger]")];
  let activeStep = 0;
  let maxStepReached = 0;

  const getPanelFields = (panel) => [...panel.querySelectorAll("input, select, textarea")].filter((field) => {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return false;
    if (field.type === "hidden" || (field.type === "checkbox" && field.classList.contains("botcheck"))) return false;
    return !field.disabled;
  });

  const showEstimatorStep = (index, allowLocked = false) => {
    const nextIndex = Math.max(0, Math.min(index, panels.length - 1));
    if (!allowLocked && nextIndex > maxStepReached) return;

    activeStep = nextIndex;
    panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === activeStep;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    triggers.forEach((trigger, triggerIndex) => {
      const isActive = triggerIndex === activeStep;
      const isComplete = triggerIndex < maxStepReached;
      trigger.disabled = triggerIndex > maxStepReached;
      trigger.classList.toggle("is-active", isActive);
      trigger.classList.toggle("is-complete", isComplete);
      if (isActive) {
        trigger.setAttribute("aria-current", "step");
      } else {
        trigger.removeAttribute("aria-current");
      }
    });

    const progress = panels.length ? Math.round(((activeStep + 1) / panels.length) * 100) : 100;
    estimatorWizard.style.setProperty("--wizard-progress", `${progress}%`);
    updateFullEstimator();
    trackConversion("estimator_step_view", { step: String(activeStep + 1) });
  };

  const validateFields = (fields) => {
    const invalidField = fields.find((field) => !field.checkValidity());
    if (!invalidField) return true;

    const fieldPanel = invalidField.closest("[data-estimator-step]");
    if (fieldPanel) {
      const panelIndex = panels.indexOf(fieldPanel);
      if (panelIndex >= 0) showEstimatorStep(panelIndex, true);
    }

    invalidField.reportValidity();
    invalidField.focus({ preventScroll: false });
    return false;
  };

  const validateActiveEstimatorStep = () => validateFields(getPanelFields(panels[activeStep]));
  validateEstimatorAll = () => validateFields(panels.flatMap(getPanelFields));

  estimatorWizard.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest("[data-estimator-step-trigger]");
    if (trigger instanceof HTMLButtonElement) {
      showEstimatorStep(Number(trigger.dataset.estimatorStepTrigger || 0));
      return;
    }

    if (target?.closest("[data-estimator-next]")) {
      if (!validateActiveEstimatorStep()) return;
      maxStepReached = Math.max(maxStepReached, activeStep + 1);
      showEstimatorStep(activeStep + 1, true);
      return;
    }

    if (target?.closest("[data-estimator-prev]")) {
      showEstimatorStep(activeStep - 1, true);
    }
  });

  estimateEmailForm.addEventListener("submit", (event) => {
    if (activeStep < panels.length - 1) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!validateActiveEstimatorStep()) return;
      maxStepReached = Math.max(maxStepReached, activeStep + 1);
      showEstimatorStep(activeStep + 1, true);
      return;
    }

    if (!validateEstimatorAll()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  showEstimatorStep(0, true);
}

fullWhatsApp?.addEventListener("click", (event) => {
  if (validateEstimatorAll && !validateEstimatorAll()) {
    event.preventDefault();
    return;
  }

  if (!validateEstimatorAll && estimateEmailForm && !estimateEmailForm.reportValidity()) {
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
    return sessionStorage.getItem("tp_cookie_choice");
  } catch {
    return null;
  }
};

const setCookieChoice = (choice) => {
  try {
    sessionStorage.setItem("tp_cookie_choice", choice);
  } catch {
    // If session storage is unavailable, the current page view can still honour the click.
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
    sessionStorage.removeItem("tp_cookie_choice");
  } catch {
    // If session storage is unavailable, show the banner for this page view.
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

const loyaltyCode = document.querySelector("[data-loyalty-code]");
const loyaltyCodeField = document.querySelector("[data-loyalty-code-field]");
const copyLoyaltyButton = document.querySelector("[data-copy-loyalty]");
const copyStatus = document.querySelector("[data-copy-status]");
const loyaltyParams = new URLSearchParams(window.location.search);

if (loyaltyCode) {
  const code = loyaltyParams.get("code")?.trim().slice(0, 24) || "TUNED10";
  loyaltyCode.textContent = code;
  if (loyaltyCodeField instanceof HTMLInputElement) loyaltyCodeField.value = code;
}

copyLoyaltyButton?.addEventListener("click", async () => {
  const code = loyaltyCode?.textContent?.trim() || "TUNED10";
  try {
    await navigator.clipboard.writeText(code);
    if (copyStatus) copyStatus.textContent = `Copied ${code}. Use it on your next enquiry.`;
    trackConversion("loyalty_code_copy", { code });
  } catch {
    if (copyStatus) copyStatus.textContent = `Code: ${code}`;
  }
});

const addFloatingQuote = () => {
  if (document.querySelector("[data-floating-quote]")) return;

  const link = document.createElement("a");
  link.className = "floating-quote";
  link.dataset.floatingQuote = "";
  link.href = currentPage === "contact.html" ? "tel:+447347388893" : "contact.html";
  link.textContent = currentPage === "contact.html" ? "Call now" : "Quick quote";
  document.body.append(link);
};

addFloatingQuote();

const revealTargets = document.querySelectorAll([
  ".page-hero .container",
  ".hero-inner > *",
  ".quick-route",
  ".section-heading",
  ".split > *",
  ".split-reverse > *",
  ".booking-layout > *",
  ".info-card",
  ".detail-card",
  ".price-card",
  ".policy-card",
  ".service-card",
  ".availability-card",
  ".journey-grid article",
  ".area-link-grid a",
  ".area-map span",
  ".quote-ready",
  ".mini-cta",
  ".conversion-card",
  ".feature-image",
  ".tuned-copy",
  ".tuned-media",
  ".price-row",
  ".faq-list details",
  ".legal-content h2",
  ".legal-content p"
].join(","));

revealTargets.forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 40}ms`);
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}

const animateNumberText = (element) => {
  if (element.dataset.counted === "true") return;

  const original = element.textContent.trim();
  const match = original.match(/\d+(?:,\d{3})*(?:\.\d+)?/);
  if (!match) return;

  element.dataset.counted = "true";

  const target = Number(match[0].replace(/,/g, ""));
  if (!Number.isFinite(target) || target <= 0 || prefersReducedMotion) {
    element.textContent = original;
    return;
  }

  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  const formatter = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
  const startedAt = performance.now();
  const duration = 900;

  const frame = (timestamp) => {
    const progress = Math.min(1, (timestamp - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = decimals ? target * eased : Math.round(target * eased);
    element.textContent = original.replace(match[0], formatter.format(current));

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    element.textContent = original;
  };

  requestAnimationFrame(frame);
};

const numberTargets = [...document.querySelectorAll(".hero-stats dt, .estimate-amount")];

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateNumberText(entry.target);
      numberObserver.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  numberTargets.forEach((item) => numberObserver.observe(item));
} else {
  numberTargets.forEach(animateNumberText);
}

const heroBg = document.querySelector(".hero-bg");
const updateHeroMotion = () => {
  if (!heroBg || prefersReducedMotion) return;
  const offset = Math.min(36, window.scrollY * 0.035);
  heroBg.style.transform = `translateY(${offset}px) scale(1.04)`;
};

updateHeroMotion();
window.addEventListener("scroll", () => requestAnimationFrame(updateHeroMotion), { passive: true });

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) trackConversion("faq_open", { question: detail.querySelector("summary")?.textContent?.trim() || "detail" });
  });
});

document.querySelectorAll("form").forEach((form) => {
  const fields = [...form.querySelectorAll("input, select, textarea")].filter((field) => {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return false;
    if (field.type === "hidden" || (field.type === "checkbox" && field.classList.contains("botcheck"))) return false;
    return !field.disabled;
  });

  if (fields.length < 2 || form.querySelector(".form-progress")) return;

  const progress = document.createElement("div");
  progress.className = "form-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = "<span></span>";
  form.prepend(progress);

  const updateFormProgress = () => {
    const completed = fields.filter((field) => {
      if (field instanceof HTMLInputElement && ["checkbox", "radio"].includes(field.type)) return field.checked;
      return Boolean(field.value?.trim());
    }).length;
    const percent = Math.round((completed / fields.length) * 100);
    progress.style.setProperty("--form-progress", `${percent}%`);
  };

  form.addEventListener("input", updateFormProgress);
  form.addEventListener("change", updateFormProgress);
  updateFormProgress();
});

const galleryCards = [...document.querySelectorAll("[data-gallery-card]")];
const galleryFilters = document.querySelector("[data-gallery-filters]");
let activeGalleryIndex = 0;

if (galleryCards.length) {
  galleryCards.forEach((card, index) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open gallery image: ${card.querySelector("h2")?.textContent?.trim() || "vehicle image"}`);
    card.dataset.galleryIndex = String(index);

    card.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("a")) return;
      openGalleryLightbox(index);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGalleryLightbox(index);
      }
    });
  });
}

galleryFilters?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const button = target?.closest("[data-gallery-filter]");
  if (!(button instanceof HTMLButtonElement)) return;

  const filter = button.dataset.galleryFilter || "all";
  galleryFilters.querySelectorAll("[data-gallery-filter]").forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  galleryCards.forEach((card) => {
    const show = filter === "all" || card.dataset.galleryCategory === filter;
    card.classList.toggle("is-filtered-out", !show);
    card.toggleAttribute("hidden", !show);
  });

  trackConversion("gallery_filter", { filter });
});

const lightbox = document.createElement("div");
lightbox.className = "gallery-lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-hidden", "true");
lightbox.innerHTML = `
  <div class="gallery-lightbox__panel">
    <button class="gallery-lightbox__close" type="button" aria-label="Close gallery image">Close</button>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" aria-label="Previous gallery image">Prev</button>
    <figure>
      <img alt="">
      <figcaption>
        <strong></strong>
        <span></span>
        <a class="btn btn-primary" href="contact.html">Start similar enquiry</a>
      </figcaption>
    </figure>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" aria-label="Next gallery image">Next</button>
  </div>
`;
document.body.append(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxTitle = lightbox.querySelector("figcaption strong");
const lightboxCopy = lightbox.querySelector("figcaption span");
const lightboxCta = lightbox.querySelector("figcaption a");
const lightboxClose = lightbox.querySelector(".gallery-lightbox__close");
const lightboxPrev = lightbox.querySelector(".gallery-lightbox__nav--prev");
const lightboxNext = lightbox.querySelector(".gallery-lightbox__nav--next");

const visibleGalleryCards = () => galleryCards.filter((card) => !card.hidden);

function openGalleryLightbox(index) {
  const cards = visibleGalleryCards();
  const selected = galleryCards[index];
  activeGalleryIndex = Math.max(0, cards.indexOf(selected));
  updateGalleryLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal");
  lightboxClose?.focus();
  trackConversion("gallery_open", { item: selected?.querySelector("h2")?.textContent?.trim() || "gallery item" });
}

const updateGalleryLightbox = () => {
  const cards = visibleGalleryCards();
  if (!cards.length || !lightboxImage || !lightboxTitle || !lightboxCopy || !lightboxCta) return;

  const card = cards[activeGalleryIndex];
  const image = card.querySelector("img");
  const title = card.querySelector("h2")?.textContent?.trim() || "Gallery image";
  const copy = card.querySelector("p")?.textContent?.trim() || "";
  const link = card.querySelector("a")?.getAttribute("href") || "contact.html";

  lightboxImage.src = image?.getAttribute("src") || "";
  lightboxImage.alt = image?.getAttribute("alt") || title;
  lightboxTitle.textContent = title;
  lightboxCopy.textContent = copy;
  lightboxCta.href = link;
};

const closeGalleryLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-modal");
};

const moveGalleryLightbox = (direction) => {
  const cards = visibleGalleryCards();
  if (!cards.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + cards.length) % cards.length;
  updateGalleryLightbox();
};

lightboxClose?.addEventListener("click", closeGalleryLightbox);
lightboxPrev?.addEventListener("click", () => moveGalleryLightbox(-1));
lightboxNext?.addEventListener("click", () => moveGalleryLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGalleryLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeGalleryLightbox();
  if (event.key === "ArrowLeft") moveGalleryLightbox(-1);
  if (event.key === "ArrowRight") moveGalleryLightbox(1);
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
    thanksPanelCopy.textContent = "For repair and fitment jobs, keeping clear photos ready will help confirm the quote faster. For time-sensitive bookings, calling is still the quickest option.";
  } else if (source === "referral") {
    thanksTitle.textContent = "Thank you, your referral has been registered";
    thanksCopy.textContent = "The referral details have been sent to the Tuned Performance inbox so they can be matched manually when the friend books.";
    thanksPanelTitle.textContent = "Referral received";
    thanksPanelCopy.textContent = "Referral rewards are confirmed only after a genuine completed job. Reviews are always separate and should only reflect real customer experience.";
  } else if (source === "loyalty") {
    thanksTitle.textContent = "Thank you, your loyalty claim has been sent";
    thanksCopy.textContent = "Your loyalty details have been sent to the Tuned Performance inbox for manual matching against completed customer records.";
    thanksPanelTitle.textContent = "Loyalty claim received";
    thanksPanelCopy.textContent = "Keep your loyalty code ready for your next enquiry. Tuned Performance will confirm any reward before booking.";
  }
}

if ("serviceWorker" in navigator) {
  const isLocalPreview = window.location.protocol === "file:" || ["127.0.0.1", "localhost"].includes(window.location.hostname);

  if (isLocalPreview) {
    navigator.serviceWorker.getRegistrations?.()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => {});
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }
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


