document.documentElement.classList.add("js");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");
const worksEstimateForm = document.getElementById("worksEstimateForm");
const servicePicker = document.getElementById("servicePicker");
const estimateSelectAllBtn = document.getElementById("estimateSelectAll");
const estimateClearSelectionBtn = document.getElementById("estimateClearSelection");
const estimateSelectedCountEl = document.getElementById("estimateSelectedCount");
const addPartBtn = document.getElementById("addPartBtn");
const partsRows = document.getElementById("partsRows");
const scratchPanelField = document.getElementById("scratchPanelField");
const scratchPanelHint = document.getElementById("scratchPanelHint");
const scratchPanelCountInput = document.getElementById("scratchPanelCount");
const labourPrice = document.getElementById("labourPrice");
const estimateDuration = document.getElementById("estimateDuration");
const estimateFormNote = document.getElementById("estimateFormNote");
const estimateParts = document.getElementById("estimateParts");
const estimateLabour = document.getElementById("estimateLabour");
const estimateTotal = document.getElementById("estimateTotal");
const openQuoteModalBtn = document.getElementById("openQuoteModal");
const openQuoteServiceButtons = document.querySelectorAll("[data-open-quote-service]");
const quoteModal = document.getElementById("quoteModal");
const closeQuoteModalBtn = document.getElementById("closeQuoteModal");
const contactForm = document.getElementById("contactForm");
const finalQuoteForm = document.getElementById("finalQuoteForm");
const formNote = document.getElementById("formNote");
const quoteModalNote = document.getElementById("quoteModalNote");
const quoteSubject = document.getElementById("quoteSubject");
const quoteAction = document.getElementById("quoteAction");
const quoteServiceHidden = document.getElementById("quoteServiceHidden");
const quotePartsHidden = document.getElementById("quotePartsHidden");
const quotePartsTotalHidden = document.getElementById("quotePartsTotalHidden");
const quoteLabourHidden = document.getElementById("quoteLabourHidden");
const quoteTotalHidden = document.getElementById("quoteTotalHidden");
const quoteDurationHidden = document.getElementById("quoteDurationHidden");
const quoteSummaryService = document.getElementById("quoteSummaryService");
const quoteSummaryPartsTotal = document.getElementById("quoteSummaryPartsTotal");
const quoteSummaryLabour = document.getElementById("quoteSummaryLabour");
const quoteSummaryTotal = document.getElementById("quoteSummaryTotal");
const quoteServiceDisplay = document.getElementById("quoteServiceDisplay");
const quotePartsDisplay = document.getElementById("quotePartsDisplay");
const quoteMessage = document.getElementById("quoteMessage");
const contactPicker = document.getElementById("contactServicePicker");
const contactSelectedCountEl = document.getElementById("contactSelectedCount");
const contactSelectAllServicesBtn = document.getElementById("contactSelectAllServices");
const contactClearServicesBtn = document.getElementById("contactClearServices");
const contactImageInput = contactForm ? contactForm.querySelector('input[type="file"]') : null;
const quoteImageInput = finalQuoteForm ? finalQuoteForm.querySelector('input[type="file"]') : null;
let lastQuoteTrigger = null;

const partsCatalog = [
  { id: "scratch-kit", label: "Scratch Repair Kit (Colour Code Required)", unitPrice: 0 },
  { id: "startstop-button", label: "Start/Stop Button - Red or Blue", unitPrice: 0 },
  { id: "vbar-wrap", label: "Reflective V-Bar Wrap Kit", unitPrice: 0 },
  { id: "chargepipe", label: "Motorsport Chargepipe", unitPrice: 0 },
  { id: "mastra-chargepipe", label: "MASTRA Aluminium Charge Pipe", unitPrice: 0 },
  { id: "downpipe", label: "High-Flow Downpipe (Sports Cat)", unitPrice: 0 },
  { id: "intake-kyostar", label: "Performance Intake Kit", unitPrice: 0 },
  { id: "intake-bms", label: "Motorsport Intake Kit", unitPrice: 0 },
  { id: "diffuser-front-lip", label: "Front Lip", unitPrice: 0 },
  { id: "diffuser-rear", label: "Rear Diffuser", unitPrice: 0 },
  { id: "diffuser-side-skirts", label: "Side Skirts", unitPrice: 0 },
  { id: "diffuser-mirror-caps", label: "Mirror Caps", unitPrice: 0 },
];

const serviceProfiles = {
  scratch: { labourPrice: 100, duration: "Typical duration: 1-4 hours depending on bumper scuff vs scratch repair" },
  diffuser: { labourPrice: 50, duration: "Typical duration: 1-2 hours for diffuser, side skirt, and mirror cap fitting" },
  tips: { labourPrice: 20, duration: "Typical duration: roughly 30 minutes" },
  intake: { labourPrice: 50, duration: "Typical duration: roughly 30 minutes" },
  "small-scratch": { labourPrice: 100, duration: "Typical duration: 30-90 minutes" },
  "obd-diagnosis": { labourPrice: 50, duration: "Typical duration: 30-60 minutes" },
  "mot-pickup-dropoff": {
    labourPrice: 0,
    duration: "Charged once MOT is completed and vehicle is dropped back to the client.",
  },
  "ecu-stage1": { labourPrice: 250, duration: "Typical duration: 1-2 hours" },
  custom: { labourPrice: 50, duration: "Typical duration: varies by job" },
};

function formatMoney(value) {
  return `GBP${value.toFixed(2)}`;
}

function setNote(noteEl, message, isError = false) {
  if (!noteEl) {
    return;
  }

  noteEl.textContent = message;
  noteEl.classList.toggle("is-error", isError);
}

function setSubmitButtonsDisabled(form, isDisabled) {
  if (!form) {
    return;
  }

  form.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.disabled = isDisabled;
  });
}

async function submitFormWithFetch(form, noteEl, pendingMessage, successMessage) {
  setSubmitButtonsDisabled(form, true);
  setNote(noteEl, pendingMessage);

  try {
    const response = await fetch(form.action, {
      method: form.method || "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(result.message || result.error || "Something went wrong. Please try again.");
    }

    setNote(noteEl, successMessage);
    return result;
  } catch (error) {
    setNote(noteEl, error instanceof Error ? error.message : "Something went wrong. Please try again.", true);
    return null;
  } finally {
    setSubmitButtonsDisabled(form, false);
  }
}

function getSelectedServiceLabel() {
  if (!servicePicker) {
    return "";
  }

  return Array.from(servicePicker.querySelectorAll('.service-tile[aria-pressed="true"]'))
    .map((tile) => (tile instanceof HTMLElement ? tile.dataset.label || tile.dataset.value || "" : ""))
    .filter(Boolean)
    .join(", ");
}

function getSelectedServiceValues() {
  if (!servicePicker) {
    return [];
  }

  return Array.from(servicePicker.querySelectorAll('.service-tile[aria-pressed="true"]'))
    .map((tile) => (tile instanceof HTMLElement ? tile.dataset.value || "" : ""))
    .filter(Boolean);
}

const serviceAutoPartMap = {
  scratch: ["scratch-kit"],
  "small-scratch": ["scratch-kit"],
  diffuser: ["diffuser-front-lip", "diffuser-rear", "diffuser-side-skirts", "diffuser-mirror-caps"],
  intake: ["intake-kyostar"],
  "ecu-stage1": ["chargepipe", "downpipe"],
};

function autoAddPartsForService(serviceValue) {
  const suggestedIds = serviceAutoPartMap[serviceValue];
  if (!suggestedIds || !partsRows) {
    return;
  }

  suggestedIds.forEach((partId) => {
    const existing = partsRows.querySelector(`.part-row[data-auto-service="${serviceValue}"][data-part-id="${partId}"]`);
    if (!existing) {
      createPartRow({ preSelectId: partId, autoService: serviceValue });
    }
  });
}

function updateEstimateSelectedCount() {
  if (!estimateSelectedCountEl || !servicePicker) {
    return;
  }

  const count = servicePicker.querySelectorAll('.service-tile[aria-pressed="true"]').length;
  estimateSelectedCountEl.textContent = count === 0 ? "0 selected" : `${count} selected`;
}

function updateContactSelectedCount() {
  if (!contactSelectedCountEl || !contactPicker) {
    return;
  }

  const count = contactPicker.querySelectorAll('input[type="checkbox"]:checked').length;
  contactSelectedCountEl.textContent = count === 0 ? "0 selected" : `${count} selected`;
}

function getSelectedParts() {
  if (!partsRows) {
    return [];
  }

  const rows = partsRows.querySelectorAll(".part-row");

  return Array.from(rows)
    .map((row) => {
      const partSelect = row.querySelector(".part-select");
      const qtyInput = row.querySelector(".part-qty");
      const qty = Number(qtyInput && qtyInput.value ? qtyInput.value : 0);
      const selectedOption = partSelect ? partSelect.options[partSelect.selectedIndex] : null;
      const unitPrice = Number(selectedOption && selectedOption.dataset.unitPrice ? selectedOption.dataset.unitPrice : 0);
      const label = selectedOption ? selectedOption.textContent.trim() : "";

      return {
        label,
        qty,
        unitPrice,
        subtotal: qty * unitPrice,
      };
    })
    .filter((item) => item.label && item.qty > 0);
}

function getPartsSummaryText(parts) {
  if (!parts.length) {
    return "No additional parts required.";
  }

  return parts
    .map((item) => `${item.label} x${item.qty}`)
    .join("\n");
}

function getEstimateSnapshot() {
  if (!servicePicker) {
    return null;
  }

  const serviceValues = getSelectedServiceValues();

  if (serviceValues.length === 0) {
    return null;
  }

  const profiles = serviceValues
    .map((value) => ({ value, profile: serviceProfiles[value] }))
    .filter((item) => Boolean(item.profile));

  if (profiles.length === 0) {
    return null;
  }

  const panelCount = getScratchPanelCount();
  const parts = getSelectedParts();
  const partsSubtotal = parts.reduce((total, item) => total + item.subtotal, 0);
  const labourSubtotal = profiles.reduce((total, item) => {
    const baseLabour = Number(item.profile.labourPrice || 0);
    if (item.value === "scratch" || item.value === "small-scratch") {
      return total + baseLabour * panelCount;
    }
    return total + baseLabour;
  }, 0);
  const durations = profiles.map((item) => item.profile.duration).filter((duration) => Boolean(duration));

  return {
    serviceValue: serviceValues,
    serviceLabel: getSelectedServiceLabel(),
    panelCount,
    parts,
    partsText: getPartsSummaryText(parts),
    partsSubtotal,
    labourSubtotal,
    total: partsSubtotal + labourSubtotal,
    duration: durations.join(" | "),
  };
}

function hasPerPanelScratchService(serviceValues) {
  return serviceValues.includes("scratch") || serviceValues.includes("small-scratch");
}

function getScratchPanelCount() {
  if (!scratchPanelCountInput) {
    return 1;
  }

  const parsed = Number(scratchPanelCountInput.value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

function toggleScratchPanelUi(serviceValues) {
  const shouldShow = hasPerPanelScratchService(serviceValues);

  if (scratchPanelField) {
    scratchPanelField.hidden = !shouldShow;
  }

  if (scratchPanelHint) {
    scratchPanelHint.hidden = !shouldShow;
  }

  if (!shouldShow && scratchPanelCountInput) {
    scratchPanelCountInput.value = "1";
  }
}

function updateEstimateOutputs(statusMessage = "") {
  if (!labourPrice) {
    return null;
  }

  const selectedServiceValues = getSelectedServiceValues();
  toggleScratchPanelUi(selectedServiceValues);

  const snapshot = getEstimateSnapshot();
  const partsSubtotal = calculatePartsSubtotal();

  if (!snapshot) {
    labourPrice.value = "0";

    if (estimateDuration) {
      estimateDuration.textContent = "";
    }
    if (estimateParts) {
      estimateParts.textContent = "None added";
    }
    if (estimateLabour) {
      estimateLabour.textContent = formatMoney(0);
    }
    if (estimateTotal) {
      estimateTotal.textContent = formatMoney(0);
    }

    if (statusMessage) {
      setNote(estimateFormNote, statusMessage, true);
    }

    return null;
  }

  labourPrice.value = String(snapshot.labourSubtotal);

  if (estimateDuration) {
    const panelNote = hasPerPanelScratchService(snapshot.serviceValue)
      ? ` Scratch service labour is charged per panel using ${snapshot.panelCount} panel${snapshot.panelCount === 1 ? "" : "s"}.`
      : "";
    estimateDuration.textContent = `${snapshot.duration}${panelNote}`;
    estimateDuration.classList.remove("is-error");
  }
  if (estimateParts) {
    const partsCount = snapshot.parts.length;
    estimateParts.textContent = partsCount === 0 ? "None added" : `${partsCount} item${partsCount === 1 ? "" : "s"} — sourced to order`;
  }
  if (estimateLabour) {
    estimateLabour.textContent = formatMoney(snapshot.labourSubtotal);
  }
  if (estimateTotal) {
    estimateTotal.textContent = formatMoney(snapshot.labourSubtotal);
  }

  if (statusMessage) {
    setNote(estimateFormNote, statusMessage);
  }

  return snapshot;
}

function buildQuoteMessage(snapshot) {
  const perPanelNote = hasPerPanelScratchService(snapshot.serviceValue)
    ? `For scratch services, labour is charged per panel and this estimate currently uses ${snapshot.panelCount} panel${snapshot.panelCount === 1 ? "" : "s"}.`
    : "";

  return [
    `Hello Tuned Performance,`,
    `I would like a final quote for ${snapshot.serviceLabel}.`,
    `Selected parts:`,
    snapshot.partsText,
    `Labour estimate: ${formatMoney(snapshot.labourSubtotal)}. Parts will be sourced and priced at booking.`,
    perPanelNote,
    `Please confirm availability and next steps.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function populateQuoteModal() {
  const snapshot = getEstimateSnapshot();

  if (!snapshot) {
    setNote(estimateFormNote, "Select a service and generate an estimate before requesting a final quote.", true);
    if (servicePicker) {
      const firstTile = servicePicker.querySelector(".service-tile");
      if (firstTile instanceof HTMLElement) {
        firstTile.focus();
      }
    }
    return null;
  }

  if (quoteSummaryService) {
    quoteSummaryService.textContent = snapshot.serviceLabel;
  }
  if (quoteSummaryPartsTotal) {
    quoteSummaryPartsTotal.textContent = "Sourced to order";
  }
  if (quoteSummaryLabour) {
    quoteSummaryLabour.textContent = formatMoney(snapshot.labourSubtotal);
  }
  if (quoteSummaryTotal) {
    quoteSummaryTotal.textContent = formatMoney(snapshot.total);
  }
  if (quoteServiceDisplay) {
    quoteServiceDisplay.value = snapshot.serviceLabel;
  }
  if (quotePartsDisplay) {
    quotePartsDisplay.value = snapshot.partsText;
  }
  if (quoteServiceHidden) {
    quoteServiceHidden.value = snapshot.serviceLabel;
  }
  if (quotePartsHidden) {
    quotePartsHidden.value = snapshot.partsText;
  }
  if (quotePartsTotalHidden) {
    quotePartsTotalHidden.value = "Sourced to order";
  }
  if (quoteLabourHidden) {
    quoteLabourHidden.value = formatMoney(snapshot.labourSubtotal);
  }
  if (quoteTotalHidden) {
    quoteTotalHidden.value = formatMoney(snapshot.total);
  }
  if (quoteDurationHidden) {
    quoteDurationHidden.value = snapshot.duration;
  }
  if (quoteMessage) {
    quoteMessage.value = buildQuoteMessage(snapshot);
  }

  setNote(quoteModalNote, "Instant quote copied from the estimate tool.");
  return snapshot;
}

function openQuoteModal(triggerElement = openQuoteModalBtn) {
  if (!quoteModal) {
    return;
  }

  const snapshot = populateQuoteModal();
  if (!snapshot) {
    return;
  }

  lastQuoteTrigger = triggerElement;
  quoteModal.hidden = false;
  document.body.classList.add("quote-modal-open");

  syncContactDetailsIntoQuoteForm();

  const firstField = finalQuoteForm ? finalQuoteForm.querySelector('input[name="name"]') : null;
  if (firstField instanceof HTMLElement) {
    firstField.focus();
  }
}

function closeQuoteModal() {
  if (!quoteModal) {
    return;
  }

  quoteModal.hidden = true;
  document.body.classList.remove("quote-modal-open");

  if (lastQuoteTrigger instanceof HTMLElement) {
    lastQuoteTrigger.focus();
  }
}

function syncContactDetailsIntoQuoteForm() {
  if (!contactForm || !finalQuoteForm) {
    return;
  }

  const fieldNames = ["name", "email", "phone", "vehicle_make", "vehicle_model", "vehicle_year", "engine_size"];

  fieldNames.forEach((fieldName) => {
    const contactField = contactForm.elements.namedItem(fieldName);
    const quoteField = finalQuoteForm.elements.namedItem(fieldName);

    if (
      contactField instanceof HTMLInputElement &&
      quoteField instanceof HTMLInputElement &&
      contactField.value.trim() &&
      !quoteField.value.trim()
    ) {
      quoteField.value = contactField.value;
    }
  });
}

function validateImageInput(fileInput, noteEl) {
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    return true;
  }

  const file = fileInput.files[0];
  const lowerName = file.name.toLowerCase();
  const validExtension = lowerName.endsWith(".png") || lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg");
  const validType = !file.type || file.type === "image/png" || file.type === "image/jpeg";

  if (!validExtension || !validType) {
    fileInput.value = "";
    setNote(noteEl, "Upload PNG or JPG images only.", true);
    return false;
  }

  return true;
}

function buildPartOptionsMarkup() {
  return partsCatalog
    .map((item) => {
      return `<option value="${item.id}" data-unit-price="${item.unitPrice}">${item.label}</option>`;
    })
    .join("");
}

function createPartRow({ preSelectId = null, autoService = null } = {}) {
  if (!partsRows) {
    return;
  }

  const row = document.createElement("div");
  row.className = "part-row";

  if (autoService) {
    row.dataset.autoService = autoService;
    row.dataset.partId = preSelectId || "";
  }

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
  const partSelect = row.querySelector(".part-select");
  const qtyInput = row.querySelector(".part-qty");

  if (preSelectId && partSelect) {
    const matchingOpt = partSelect.querySelector(`option[value="${preSelectId}"]`);
    if (matchingOpt) {
      matchingOpt.selected = true;
    }
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      row.remove();
      updateEstimateOutputs();
    });
  }

  if (partSelect) {
    partSelect.addEventListener("change", () => {
      updateEstimateOutputs();
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener("input", () => {
      updateEstimateOutputs();
    });
  }

  partsRows.appendChild(row);
  updateEstimateOutputs();
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


if (servicePicker) {
  servicePicker.addEventListener("click", (event) => {
    const tile = event.target instanceof Element ? event.target.closest(".service-tile") : null;
    if (!(tile instanceof HTMLButtonElement)) {
      return;
    }

    const wasSelected = tile.getAttribute("aria-pressed") === "true";
    tile.setAttribute("aria-pressed", String(!wasSelected));

    const serviceValue = tile.dataset.value || "";
    updateEstimateOutputs("Labour updated for selected service.");
    updateEstimateSelectedCount();

    if (!wasSelected && serviceValue) {
      autoAddPartsForService(serviceValue);
    }
  });
}

if (estimateSelectAllBtn && servicePicker) {
  estimateSelectAllBtn.addEventListener("click", () => {
    servicePicker.querySelectorAll(".service-tile").forEach((tile) => {
      if (tile instanceof HTMLButtonElement) {
        const wasSelected = tile.getAttribute("aria-pressed") === "true";
        tile.setAttribute("aria-pressed", "true");
        if (!wasSelected) {
          autoAddPartsForService(tile.dataset.value || "");
        }
      }
    });
    updateEstimateOutputs("All services selected.");
    updateEstimateSelectedCount();
  });
}

if (estimateClearSelectionBtn && servicePicker) {
  estimateClearSelectionBtn.addEventListener("click", () => {
    servicePicker.querySelectorAll(".service-tile").forEach((tile) => {
      if (tile instanceof HTMLButtonElement) {
        tile.setAttribute("aria-pressed", "false");
      }
    });
    updateEstimateOutputs("Service selection cleared.");
    updateEstimateSelectedCount();
  });
}

if (contactPicker) {
  contactPicker.addEventListener("change", (event) => {
    const cb = event.target;
    if (cb instanceof HTMLInputElement && cb.type === "checkbox") {
      cb.closest(".service-tile")?.classList.toggle("is-selected", cb.checked);
      updateContactSelectedCount();
    }
  });
}

if (contactSelectAllServicesBtn && contactPicker) {
  contactSelectAllServicesBtn.addEventListener("click", () => {
    contactPicker.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      if (cb instanceof HTMLInputElement) {
        cb.checked = true;
        cb.closest(".service-tile")?.classList.add("is-selected");
      }
    });
    updateContactSelectedCount();
  });
}

if (contactClearServicesBtn && contactPicker) {
  contactClearServicesBtn.addEventListener("click", () => {
    contactPicker.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      if (cb instanceof HTMLInputElement) {
        cb.checked = false;
        cb.closest(".service-tile")?.classList.remove("is-selected");
      }
    });
    updateContactSelectedCount();
  });
}

if (addPartBtn) {
  addPartBtn.addEventListener("click", () => {
    createPartRow();
  });
}

if (partsRows && partsRows.children.length === 0) {
  updateEstimateOutputs();
}

if (scratchPanelCountInput) {
  scratchPanelCountInput.addEventListener("input", () => {
    const panelCount = getScratchPanelCount();
    scratchPanelCountInput.value = String(panelCount);
    updateEstimateOutputs("Labour updated for selected panel count.");
  });
}

updateEstimateSelectedCount();
updateContactSelectedCount();

if (
  worksEstimateForm &&
  servicePicker &&
  labourPrice &&
  estimateFormNote &&
  estimateParts &&
  estimateLabour &&
  estimateTotal
) {
  worksEstimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    setNote(estimateFormNote, "Estimate already updates automatically as you change service and parts.");
  });
}

if (openQuoteModalBtn) {
  openQuoteModalBtn.addEventListener("click", () => openQuoteModal(openQuoteModalBtn));
}

if (openQuoteServiceButtons.length > 0) {
  openQuoteServiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!(button instanceof HTMLElement)) {
        return;
      }

      const serviceValue = button.dataset.openQuoteService;
      if (servicePicker && serviceValue) {
        servicePicker.querySelectorAll(".service-tile").forEach((tile) => {
          if (tile instanceof HTMLButtonElement) {
            tile.setAttribute("aria-pressed", tile.dataset.value === serviceValue ? "true" : "false");
          }
        });
        updateEstimateOutputs("Service pre-selected. Review estimate, then continue to final quote.");
        updateEstimateSelectedCount();
        autoAddPartsForService(serviceValue);
      }

      openQuoteModal(button);
    });
  });
}

if (closeQuoteModalBtn) {
  closeQuoteModalBtn.addEventListener("click", closeQuoteModal);
}

if (quoteModal) {
  quoteModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute("data-close-quote-modal")) {
      closeQuoteModal();
    }
  });
}

if (contactImageInput) {
  contactImageInput.addEventListener("change", () => {
    if (validateImageInput(contactImageInput, formNote) && formNote && formNote.classList.contains("is-error")) {
      setNote(formNote, "");
    }
  });
}

if (quoteImageInput) {
  quoteImageInput.addEventListener("change", () => {
    if (validateImageInput(quoteImageInput, quoteModalNote) && quoteModalNote && quoteModalNote.classList.contains("is-error")) {
      setNote(quoteModalNote, "");
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateImageInput(contactImageInput, formNote)) {
      return;
    }

    submitFormWithFetch(
      contactForm,
      formNote,
      "Sending your enquiry...",
      "Enquiry sent. Redirecting..."
    ).then((result) => {
      if (!result) {
        return;
      }

      window.location.href = result.redirectTo || contactForm.dataset.successRedirect || "thank-you.html";
    });
  });
}


if (finalQuoteForm) {
  finalQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateImageInput(quoteImageInput, quoteModalNote)) {
      event.preventDefault();
      return;
    }

    const snapshot = populateQuoteModal();
    if (!snapshot) {
      return;
    }

    const submitter = event.submitter;
    const actionType = submitter instanceof HTMLElement && submitter.dataset.quoteAction === "accept" ? "accept" : "request";

    if (quoteAction) {
      quoteAction.value = actionType;
    }
    if (quoteSubject) {
      quoteSubject.value = actionType === "accept"
        ? "Quote Accepted Online - Tuned Performance Website"
        : "Final Quote Request - Tuned Performance Website";
    }

    submitFormWithFetch(
      finalQuoteForm,
      quoteModalNote,
      actionType === "accept" ? "Accepting your quote..." : "Sending your quote request...",
      actionType === "accept" ? "Quote accepted. Redirecting..." : "Quote request sent. Redirecting..."
    ).then((result) => {
      if (!result) {
        return;
      }

      window.location.href = result.redirectTo || finalQuoteForm.dataset.successRedirect || "thank-you.html";
    });
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
      closeQuoteModal();
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

