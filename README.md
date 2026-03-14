# Tuned Performance Website

<<<<<<< HEAD
Marketing site for Tuned Performance, a weekend-only mobile automotive service covering TW postcodes and Kingston.
=======
Website for **Tuned Performance**, a weekend-only mobile automotive service covering TW postcodes and Kingston.
>>>>>>> 10c7f9bb894be78b04058df174f111901bccae42

## Overview

This is a static website built with plain HTML, CSS, and JavaScript.

- `index.html`: Main homepage with services, estimate tool, general enquiry form, and quote modal
- `thank-you.html`: Redirect confirmation page after successful submission
- `styles.css`: Global styles, responsive layout, branding, and animations
- `script.js`: Mobile nav behavior, estimate logic, quote modal flow, and Web3Forms submissions

## Services Listed

- ECU Remapping (Waitlist Open)
- Bumper Scuff and Scratch Repairs
- Front & Rear Diffuser, Side Skirts & Mirror Caps
- Exhaust Tips (Slip-On, No Welding)
- Air Filters and Intakes
- Small Scratch Repairs
- OBD Diagnosis

## Static Forms

The site uses Web3Forms so it stays fully static.

Current static submission flows:

- General enquiry form with optional PNG/JPG upload
- ECU remap waitlist form
- Final quote request modal pre-filled from the estimate tool
- Online quote acceptance from the same quote modal

Important tradeoff:

- Web3Forms keeps hosting simple, but email branding and template control are more limited than a custom backend.
- The quote workflow still works, but deeply custom HTML transactional emails depend on Web3Forms features and plan limits rather than custom site code.

## Web3Forms Setup

1. Create a Web3Forms access key.
2. Replace every `YOUR_WEB3FORMS_ACCESS_KEY` placeholder in `index.html` with your live key.
3. Configure any autoresponder options you want inside Web3Forms.

Configured business contact details:

- Phone: `+44 07933 705124`
- Email: `cars@tunedperformance.co.uk`
- Instagram: `@tuned.performance.uk`
- Gumtree: `https://www.gumtree.com/profile/account/621010e54c249814e0b84f3513176f56`

## Local Development

No build tools are required.

1. Replace the Web3Forms access key placeholders.
2. Open `index.html` in a browser.
3. For best local testing, use a simple static server if needed.

## Deployment

Deploy as a static site again, for example on GitHub Pages, Netlify, Vercel static hosting, or traditional hosting.

Production checklist:

- Replace all Web3Forms access key placeholders with the live key
- Test general enquiry, waitlist, quote request, and quote acceptance on the live domain
- Confirm your thank-you flow works as expected after submission

## Remap Widget (Benksy)

The registration lookup feature has been removed.

The Stage/Remap section embeds a Benksy widget directly in `index.html`.

## Works Estimate Tool

The homepage includes a customer estimate calculator for:

- Parts subtotal
- Labour subtotal by selected service
- Estimated total

Configuration notes:

- Parts catalog is defined in `script.js` under `partsCatalog`.
- Default labour presets per service are in `script.js` under `serviceProfiles`.
- You can replace these with your exact products and pricing when ready.

## Git

Repository: `https://github.com/OB33WAN/Tuned-Performance.git`

Main branch: `main`

Live site: `https://tunedperformance.co.uk/`

