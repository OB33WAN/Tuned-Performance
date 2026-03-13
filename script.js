document.documentElement.classList.add("js");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");
const worksEstimateForm = document.getElementById("worksEstimateForm");
const estimateService = document.getElementById("estimateService");
const addPartBtn = document.getElementById("addPartBtn");
const partsRows = document.getElementById("partsRows");
const labourPrice = document.getElementById("labourPrice");
const estimateDuration = document.getElementById("estimateDuration");
const estimateFormNote = document.getElementById("estimateFormNote");
const estimateParts = document.getElementById("estimateParts");
const estimateLabour = document.getElementById("estimateLabour");
const estimateTotal = document.getElementById("estimateTotal");

const partsCatalog = [
  { id: "scratch-kit", label: "Scratch Repair Kit (Colour Code Required)", unitPrice: 29.99 },
  { id: "startstop-button", label: "BMW Start/Stop Button - Red or Blue", unitPrice: 12.99 },
  { id: "vbar-wrap", label: "BMW Reflective V Bar Wrap Kit", unitPrice: 12.99 },
  { id: "chargepipe", label: "Motorsport Chargepipe - BMW F20/F30/G20", unitPrice: 219.99 },
  { id: "mastra-chargepipe", label: "MASTRA Aluminium Charge Pipe - BMW F20/F30/G20", unitPrice: 249.99 },
  { id: "downpipe", label: "CTS Downpipe 200 CEL CAT - BMW F20/F30/G20", unitPrice: 304.99 },
  { id: "intake-kyostar", label: "Kyostar Intake Kit - BMW F20/F30/G20", unitPrice: 180 },
  { id: "intake-bms", label: "BMS Motorsport Intake Kit - BMW F20/F30/G20", unitPrice: 269.99 },
];

const serviceProfiles = {
  scratch: { labourPrice: 100, duration: "Typical duration: 1-4 hours depending on bumper scuff vs scratch repair" },
  diffuser: { labourPrice: 50, duration: "Typical duration: 1-2 hours" },
  tips: { labourPrice: 20, duration: "Typical duration: roughly 30 minutes" },
  intake: { labourPrice: 50, duration: "Typical duration: roughly 30 minutes" },
  "ecu-stage1": { labourPrice: 250, duration: "Typical duration: 1-2 hours" },
  custom: { labourPrice: 50, duration: "Typical duration: varies by job" },
};

function formatMoney(value) {
  return `GBP${value.toFixed(2)}`;
}

function buildPartOptionsMarkup() {
  return partsCatalog
    .map((item) => {
      return `<option value="${item.id}" data-unit-price="${item.unitPrice}">${item.label}</option>`;
    })
    .join("");
}

function createPartRow() {
  if (!partsRows) {
    return;
  }

  const row = document.createElement("div");
  row.className = "part-row";
  row.innerHTML = `
    <label>
      Part
      <select class="part-select">${buildPartOptionsMarkup()}</select>
    </label>
    <label>
      Qty
      <input type="number" class="part-qty" min="1" step="1" value="1" />
    </label>
    <button type="button" class="btn btn-ghost part-remove">Remove</button>
  `;

  const removeBtn = row.querySelector(".part-remove");

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      row.remove();
    });
  }

  partsRows.appendChild(row);
}

function calculatePartsSubtotal() {
  if (!partsRows) {
    return 0;
  }

  const rows = partsRows.querySelectorAll(".part-row");
  let total = 0;

  rows.forEach((row) => {
    const partSelect = row.querySelector(".part-select");
    const qtyInput = row.querySelector(".part-qty");
    const qty = Number(qtyInput && qtyInput.value ? qtyInput.value : 0);
    const selectedOption = partSelect ? partSelect.options[partSelect.selectedIndex] : null;
    const price = Number(selectedOption && selectedOption.dataset.unitPrice ? selectedOption.dataset.unitPrice : 0);
    total += qty * price;
  });

  return total;
}


function closeMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("open");
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}


if (worksEstimateForm && estimateService && labourPrice) {
  estimateService.addEventListener("change", () => {
    const profile = serviceProfiles[estimateService.value];
    if (!profile) {
      labourPrice.value = "0";
      if (estimateDuration) {
        estimateDuration.textContent = "";
      }
      if (estimateLabour) {
        estimateLabour.textContent = formatMoney(0);
      }
      if (estimateTotal && estimateParts) {
        const partsSubtotal = calculatePartsSubtotal();
        estimateParts.textContent = formatMoney(partsSubtotal);
        estimateTotal.textContent = formatMoney(partsSubtotal);
      }
      return;
    }

    const labourSubtotal = Number(profile.labourPrice || 0);
    const partsSubtotal = calculatePartsSubtotal();

    labourPrice.value = String(labourSubtotal);
    if (estimateDuration) {
      estimateDuration.textContent = profile.duration;
      estimateDuration.classList.remove("is-error");
    }
    if (estimateParts) {
      estimateParts.textContent = formatMoney(partsSubtotal);
    }
    if (estimateLabour) {
      estimateLabour.textContent = formatMoney(labourSubtotal);
    }
    if (estimateTotal) {
      estimateTotal.textContent = formatMoney(partsSubtotal + labourSubtotal);
    }
    if (estimateFormNote) {
      estimateFormNote.textContent = "Labour updated for selected service.";
      estimateFormNote.classList.remove("is-error");
    }
  });
}

if (addPartBtn) {
  addPartBtn.addEventListener("click", () => {
    createPartRow();
  });
}

if (partsRows && partsRows.children.length === 0) {
  createPartRow();
}

if (
  worksEstimateForm &&
  estimateService &&
  labourPrice &&
  estimateFormNote &&
  estimateParts &&
  estimateLabour &&
  estimateTotal
) {
  worksEstimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = serviceProfiles[estimateService.value];

    if (!profile) {
      estimateFormNote.textContent = "Select a service type first.";
      estimateFormNote.classList.add("is-error");
      return;
    }

    const labourSubtotal = Number(profile.labourPrice || 0);

    if (labourSubtotal < 0) {
      estimateFormNote.textContent = "Labour pricing is invalid. Please refresh and try again.";
      estimateFormNote.classList.add("is-error");
      return;
    }

    const partsSubtotal = calculatePartsSubtotal();
    const total = partsSubtotal + labourSubtotal;

    estimateParts.textContent = formatMoney(partsSubtotal);
    estimateLabour.textContent = formatMoney(labourSubtotal);
    estimateTotal.textContent = formatMoney(total);

    estimateFormNote.textContent = "Estimate updated. Send this through for a final confirmed quote.";
    estimateFormNote.classList.remove("is-error");
  });
}


if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    const clickInsideNav = mainNav.contains(target);
    const clickToggle = menuToggle.contains(target);

    if (!clickInsideNav && !clickToggle) {
      closeMenu();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
    observer.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

