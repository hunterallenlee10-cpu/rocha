# Rocha Family Auto Sales — Website Redesign

A modern, mobile-friendly redesign of [rochafamilyautosales.com](https://www.rochafamilyautosales.com/), keeping all of the original site's copy.

## What's inside

- `index.html` — the entire site in a single self-contained file (HTML + CSS + JS, no build step, no dependencies beyond Google Fonts and a Google Maps embed).
- `assets/logo.webp` — the Rocha Family Auto Sales logo (white-on-transparent), used in the header and footer.
- `assets/hero-drive.mp4` / `.webm` / `-poster.jpg` — the hero's looping background video: a 21-second montage of six cars-on-the-open-road clips with crossfades and a seamless loop point (720p, ~3 MB MP4 / ~2 MB WebM). Clips are from [Mixkit](https://mixkit.co) under the Mixkit Stock Video Free License (commercial use allowed, no attribution required): 50267, 52427, 41393, 41537, 506, 52452.

## Features

- Sticky glass navigation with mobile menu
- Full-bleed looping video hero (muted, autoplays inline on phones, holds on a poster frame for `prefers-reduced-motion`) with calls to action (Inventory Vehicles / Apply Now — Credit Online)
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
