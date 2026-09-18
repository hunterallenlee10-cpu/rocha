# Rocha Family Auto Sales — Website Redesign

A modern, mobile-friendly redesign of [rochafamilyautosales.com](https://www.rochafamilyautosales.com/), keeping all of the original site's copy.

## What's inside

- `index.html` — the entire site in a single self-contained file (HTML + CSS + JS, no build step, no dependencies beyond Google Fonts and a Google Maps embed).
- `assets/logo.webp` — the Rocha Family Auto Sales logo (white-on-transparent), used in the header and footer.

## Features

- Sticky glass navigation with mobile menu
- Hero section with calls to action (Inventory Vehicles / Apply Now — Credit Online)
- **Search by Price** chips that live-filter the featured vehicles
- Featured vehicle cards (2001 Ford F250 Super Duty Super Cab, 2000 Chrysler 300M, 2000 Dodge Ram 3500 Quad Cab, 1999 Mazda 626)
- Welcome / About Us section with the original dealership copy
- Apply Online section with a credit application lead form (front-end only — wire the form's submit handler to your backend or form service to receive submissions)
- Contact section with address, phone, embedded Google Map, and social links
- Scroll-reveal animations (respects `prefers-reduced-motion`), semantic markup, responsive down to phone width

## Running it

Open `index.html` in a browser — that's it. To publish, host the file on any static host (GitHub Pages, Netlify, etc.).

## Customizing

- **Photos:** vehicle cards currently use stylized SVG illustrations; swap each card's `<svg>` in `.car-media` for an `<img>` of the actual vehicle.
- **Social links:** the Facebook / X / Yelp icons point to `#` — set their `href`s to the dealership's real profile URLs.
- **Colors/fonts:** all colors are CSS variables in `:root` at the top of the stylesheet.
