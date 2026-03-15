(function () {
  const CONSENT_KEY = "tp_cookie_consent_v1";

  function ensureGtagShim() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
  }

  function applyConsentMode(consent, mode) {
    ensureGtagShim();
    window.gtag("consent", mode, {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
    });
  }

  function safeReadConsent() {
    try {
      const raw = window.localStorage.getItem(CONSENT_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) {
        return null;
      }
      return {
        essential: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        updatedAt: parsed.updatedAt || "",
      };
    } catch (_error) {
      return null;
    }
  }

  function safeWriteConsent(consent) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (_error) {
      // Ignore write failures for private mode or blocked storage.
    }
  }

  function applyConsentState(consent) {
    document.documentElement.dataset.cookieAnalytics = consent.analytics ? "granted" : "denied";
    document.documentElement.dataset.cookieMarketing = consent.marketing ? "granted" : "denied";
    applyConsentMode(consent, "update");

    window.dispatchEvent(
      new CustomEvent("tp:cookie-consent-updated", {
        detail: {
          analytics: consent.analytics,
          marketing: consent.marketing,
          essential: true,
        },
      })
    );
  }

  function createConsentUi() {
    const banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.id = "cookieBanner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent notice");
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <p class="cookie-title">Privacy and Cookies</p>
        <p class="cookie-text">
          We use essential cookies for site functionality and optional cookies for analytics and marketing.
          You can accept all, reject optional cookies, or manage preferences.
          See our <a href="cookies.html">Cookie Policy</a>, <a href="privacy.html">Privacy Policy</a>, and <a href="gdpr.html">UK GDPR page</a>.
        </p>
        <div class="cookie-actions">
          <button type="button" class="btn btn-primary" data-cookie-action="accept-all">Accept All</button>
          <button type="button" class="btn btn-ghost" data-cookie-action="reject-optional">Reject Optional</button>
          <button type="button" class="btn btn-ghost" data-cookie-action="open-settings">Manage</button>
        </div>
      </div>
    `;

    const modal = document.createElement("div");
    modal.className = "cookie-modal";
    modal.id = "cookieModal";
    modal.setAttribute("hidden", "");
    modal.innerHTML = `
      <div class="cookie-modal-backdrop" data-cookie-action="close-settings"></div>
      <div class="cookie-modal-card" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">
        <h2 id="cookieModalTitle">Cookie Preferences</h2>
        <p>Choose which optional cookies you allow. Essential cookies are always active.</p>

        <label class="cookie-toggle cookie-toggle-locked">
          <span>
            <strong>Essential Cookies</strong>
            <small>Required for forms, navigation, and security.</small>
          </span>
          <input type="checkbox" checked disabled />
        </label>

        <label class="cookie-toggle">
          <span>
            <strong>Analytics Cookies</strong>
            <small>Help us understand how visitors use the site.</small>
          </span>
          <input type="checkbox" id="cookieAnalyticsToggle" />
        </label>

        <label class="cookie-toggle">
          <span>
            <strong>Marketing Cookies</strong>
            <small>Enable campaign and social media attribution.</small>
          </span>
          <input type="checkbox" id="cookieMarketingToggle" />
        </label>

        <div class="cookie-actions">
          <button type="button" class="btn btn-primary" data-cookie-action="save-settings">Save Preferences</button>
          <button type="button" class="btn btn-ghost" data-cookie-action="close-settings">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.body.appendChild(modal);

    return { banner, modal };
  }

  function initConsent() {
    applyConsentMode(
      {
        essential: true,
        analytics: true,
        marketing: false,
      },
      "default"
    );

    const existingConsent = safeReadConsent();
    const ui = createConsentUi();
    const analyticsToggle = document.getElementById("cookieAnalyticsToggle");
    const marketingToggle = document.getElementById("cookieMarketingToggle");

    function hideBanner() {
      ui.banner.classList.add("is-hidden");
    }

    function showBanner() {
      ui.banner.classList.remove("is-hidden");
    }

    function openModal() {
      ui.modal.removeAttribute("hidden");
      document.body.classList.add("cookie-modal-open");
    }

    function closeModal() {
      ui.modal.setAttribute("hidden", "");
      document.body.classList.remove("cookie-modal-open");
    }

    function persistConsent(options) {
      const consent = {
        essential: true,
        analytics: Boolean(options.analytics),
        marketing: Boolean(options.marketing),
        updatedAt: new Date().toISOString(),
      };

      safeWriteConsent(consent);
      applyConsentState(consent);
      hideBanner();
      closeModal();
    }

    const seededConsent = existingConsent || {
      essential: true,
      analytics: true,
      marketing: false,
      updatedAt: "",
    };

    applyConsentState(seededConsent);

    if (analyticsToggle && marketingToggle) {
      analyticsToggle.checked = seededConsent.analytics;
      marketingToggle.checked = seededConsent.marketing;
    }

    if (existingConsent) {
      hideBanner();
    } else {
      showBanner();
    }

    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const trigger = target.closest("[data-cookie-action], [data-open-cookie-settings]");
      if (!trigger) {
        return;
      }

      if (trigger.hasAttribute("data-open-cookie-settings")) {
        if (analyticsToggle && marketingToggle) {
          const current = safeReadConsent() || seededConsent;
          analyticsToggle.checked = Boolean(current.analytics);
          marketingToggle.checked = Boolean(current.marketing);
        }
        openModal();
        return;
      }

      const action = trigger.getAttribute("data-cookie-action");
      if (action === "accept-all") {
        persistConsent({ analytics: true, marketing: true });
        return;
      }

      if (action === "reject-optional") {
        persistConsent({ analytics: false, marketing: false });
        return;
      }

      if (action === "open-settings") {
        openModal();
        return;
      }

      if (action === "save-settings") {
        persistConsent({
          analytics: analyticsToggle ? analyticsToggle.checked : false,
          marketing: marketingToggle ? marketingToggle.checked : false,
        });
        return;
      }

      if (action === "close-settings") {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConsent);
  } else {
    initConsent();
  }
})();
