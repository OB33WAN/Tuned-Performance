# Tuned Performance Website

Marketing site for **Tuned Performance**, a weekend-only mobile automotive service covering TW postcodes and Kingston.

## Overview

This is a static website built with plain HTML, CSS, and JavaScript.

- `index.html`: Main homepage with services, contact form, and booking information
- `thank-you.html`: Redirect confirmation page after successful enquiry submission
- `styles.css`: Global styles, responsive layout, branding, and animations
- `script.js`: Mobile nav behavior, reveal animations, and utility interactions

## Services Listed

- ECU Remapping (BMW B46/B48/B58) - from GBP245
- Rear Diffuser + Mirror Caps - GBP120 labour + parts
- Exhaust Tips (Slip-On, No Welding) - GBP60 labour + parts
- Air Filters and Intakes - GBP100 labour + parts
- Interior Button Swaps - GBP80 labour + parts
- Small Scratch Repairs - GBP60-GBP120

## Contact Settings

Configured contact details:

- Phone: `+44 07933 705124`
- Email: `tunedperformanceuk@gmail.com`

Form submission is configured through FormSubmit:

- Endpoint: `https://formsubmit.co/tunedperformanceuk@gmail.com`
- Redirect URL: `https://tunedperformance.co.uk/thank-you.html`

Important: FormSubmit requires one-time email activation for the destination inbox before live submissions are delivered.

## Local Development

No build tools required.

1. Open the project folder in VS Code.
2. Open `index.html` in a browser.
3. For best local testing, use a simple static server (optional), e.g. VS Code Live Server.

## Deployment

Deploy as a static site (GitHub Pages, Netlify, Vercel static output, or traditional hosting).

Required files for production:

- `index.html`
- `thank-you.html`
- `styles.css`
- `script.js`
- logo assets (`Tuned Performance Logo.*`)

## Git

Repository: `https://github.com/OB33WAN/Tuned-Performance.git`

Main branch: `main`
