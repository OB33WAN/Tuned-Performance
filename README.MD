# Tuned Performance Website

Static website package for Tuned Performance, a mobile car care business serving Feltham and nearby areas.

Business address: 105 Swan Road, Feltham, TW13 6PE. Company number: 17180730.

## What Is Included

- Conversion-focused homepage with direct call, WhatsApp and quote routes.
- Individual service pages for repairs, diagnostics, BMW/MINI coding, trim fitment, MOT support and ECU remap enquiries.
- Pricing, estimator, contact, thank-you, reviews, gallery and local area SEO pages.
- Legal pages for Privacy and GDPR, Cookies, Terms and Cancellation.
- PWA files: `manifest.webmanifest`, `service-worker.js`, app icons and install support.
- SEO files: `sitemap.xml`, `robots.txt` and `llms.txt`.

## Forms And Enquiries

Website forms submit through Web3Forms and redirect successful email enquiries to:

`https://tunedperformance.co.uk/thank-you.html?source=email`

WhatsApp enquiry buttons build a message and redirect to:

`thank-you.html?source=whatsapp`

Before going live, submit a real test enquiry from:

- `index.html`
- `contact.html`
- `estimator.html`

## Service Notes

BMW/MINI Coding is listed as a guide-price service from GBP40. Feature availability depends on model, year, ECU hardware, iDrive/head-unit and BimmerCode support, so customers are asked to send the vehicle and requested feature list before booking.

## Analytics And Reviews

Google Analytics measurement ID:

`G-Z6M09GYPFY`

Analytics is loaded after the visitor accepts analytics cookies. The site tracks key conversion actions such as form submissions, phone clicks, WhatsApp clicks and review clicks.

Review links:

- Google Reviews: `https://g.page/r/CZnD7eUE_OmbEBM/review`
- Trustpilot: `https://www.trustpilot.com/review/tunedperformance.co.uk`

## Deployment

Upload the contents of this folder to the website root for:

`https://tunedperformance.co.uk/`

Do not upload the parent `outputs` folder itself. The files inside `outputs` should sit at the web root.

After upload:

- Confirm `https://tunedperformance.co.uk/sitemap.xml` loads.
- Confirm `https://tunedperformance.co.uk/robots.txt` loads.
- Confirm `https://tunedperformance.co.uk/llms.txt` loads.
- Test the contact form and estimator email route.
- Test WhatsApp links on mobile.
- Check Google Analytics real-time events after accepting analytics cookies.

## SEO Expansion

Added high-intent local landing pages for bumper repair, panel re-spray, OBD diagnostics and BMW/MINI coding in Feltham, plus guide pages for repair photos, MOT warning lights and coding compatibility. Submit the updated sitemap in Google Search Console after deployment.
