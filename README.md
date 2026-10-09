# Rocha Family Auto Sales — Website Redesign

A modern, mobile-friendly redesign of [rochafamilyautosales.com](https://www.rochafamilyautosales.com/), keeping all of the original site's copy.

## What's inside

- `index.html` — the site (HTML + CSS + JS, no build step; loads Google Fonts and [Leaflet](https://leafletjs.com/) from a CDN).
- `assets/inventory.js` — **the current vehicle inventory** (20 vehicles as of Oct 9, 2026). Edit this file to add, update, or remove cars.
- `assets/inventory/` — a photo for each vehicle, named by stock number.
- `assets/logo.webp` — the Rocha Family Auto Sales logo (white-on-transparent), used in the header and footer.

## Features

- Sticky glass navigation with mobile menu
- Hero section with calls to action (Inventory Vehicles / Apply Now — Credit Online)
- **Full live inventory** with real photos: search box, body-style and price filters, sorting, "Price Drop" badges, and a details popup (specs, VIN, call / apply buttons) for each vehicle
- The Apply form's *Vehicle of Interest* dropdown is filled in automatically from the inventory
- Welcome / About Us section with the original dealership copy
- Apply Online section with a credit application lead form (front-end only — wire the form's submit handler to your backend or form service to receive submissions)
- Contact section with address, phone, social links, and an interactive map: a branded pin on the lot (261861 US-101), Map/Satellite toggle, one-tap Google Maps directions, and a "How far am I?" button that shows the visitor's distance. If the map library can't load, it falls back to a Google Maps embed
- Scroll-reveal animations (respects `prefers-reduced-motion`), semantic markup, responsive down to phone width

## Running it

Open `index.html` in a browser — that's it. To publish, host the file on any static host (GitHub Pages, Netlify, etc.).

## Customizing

- **Inventory:** open `assets/inventory.js` and edit the list — each entry has the year, make, model, trim, price (including dealer fees), mileage, specs, VIN, and photo path. Add `wasPrice` to show a "Price Drop" badge. Update `ROCHA_INVENTORY_UPDATED` whenever you change it. Put new photos in `assets/inventory/`. The current list came from the dealership's public listings on CarGurus.
- **Social links:** the Facebook / X / Yelp icons point to `#` — set their `href`s to the dealership's real profile URLs.
- **Colors/fonts:** all colors are CSS variables in `:root` at the top of the stylesheet.
