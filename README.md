# Rocha Family Auto Sales: Dealership Website

A polished, single-page website for Rocha Family Auto Sales in Sequim, WA, with the dealership's real address, phone number and current inventory (see "Business info" and "Updating the inventory" below).

Open `index.html` in a browser. No build step, no frameworks, no third-party CDNs (fonts, icons and the Leaflet map library are self-hosted). The only external requests are the map tiles in the contact section (OpenStreetMap, and Esri for the satellite view).

## Design direction

Researched against award-recognized automotive and dealer sites (Rivian, Polestar, Porsche, Carvana, Clutch, Fletcher Jones) and current dealer UX guidance:

- **Cinematic video hero**: a full-bleed looping montage of cars on open roads behind the headline.
- **Inventory-first** (Carvana / Clutch): a glass quick-search bar sits on the hero, and the inventory grid has body-style and "Search by price" filters with live counts and an empty state.
- **Real lot photography**: every card shows the dealership's own photo of that exact vehicle.
- **Payment next to price** (Fletcher Jones): each card shows an estimated monthly payment, and an interactive payment calculator sits beside the credit application.
- **Restraint** (Polestar): dark off-black palette, one amber accent, Archivo + Geist type, generous spacing.

## Features

- Transparent header that turns to frosted glass on scroll; full-screen mobile menu
- Hero with a muted, looping background video (it shows a still poster frame when `prefers-reduced-motion` is on) with a slow zoom on load and CSS scroll-driven parallax where supported
- Quick search (body style + max price) that filters the inventory and scrolls to it
- Full live inventory (20 vehicles) built from `assets/inventory.js`: search box, sort, body-style (trucks, SUVs, cars, wagons and vans) and price filters with View Transitions animation, "Price drop" tags, live result count and empty state
- Vehicle quick-view dialog (price, estimated payment, mileage, engine, transmission, drivetrain, fuel, color, VIN, stock number) with "Apply Online" (pre-fills the form and calculator), "Estimate payment", a call button and a link to the full photo gallery
- Payment calculator: price, down payment, APR sliders and 36/48/60/72-month terms
- Credit application form with inline validation, loading and success states (front-end only)
- Bento "About Us" section
- Interactive contact map: an amber pin on the lot at 261861 US-101 (48.07776, -123.15954), Map / Satellite toggle, zoom and re-center buttons, Get Directions, and a "How far am I?" button that shows the visitor's straight-line distance. Scroll-wheel zoom turns on only after a click, the map loads only when it's about to scroll into view, and it falls back to a Google Maps embed if Leaflet can't load
- Sticky Call / Apply Online bar on phones
- Respects `prefers-reduced-motion`; keyboard and screen-reader friendly; no horizontal scroll at 390px

## Business info

| Field   | Value |
|---------|-------|
| Phone   | (360) 797-1202 |
| Address | 261861 Highway 101, Sequim, WA 98382 |
| Web     | sequimauto.com |
| Hours   | Not shown. The dealership doesn't publish hours online; add them to the contact card and footer once confirmed. |

## Updating the inventory

Open `assets/inventory.js` and edit the list. Each vehicle has its year, make, model, trim, `type` (`truck`, `suv`, `car` or `wagon`), price (including dealer fees), mileage, specs, VIN, stock number and photo. Add `wasPrice` to show a "Price drop" tag. Update `ROCHA_INVENTORY_UPDATED` whenever you change the list. Put each photo in `assets/inventory/`, named by stock number. The cards, filters and the form's "Vehicle of interest" list all update from that file.

The current list (Oct 9, 2026) came from the dealership's public listings on CarGurus, which is also where each vehicle's "See all photos" link goes.

## Customizing for another dealership

- **Brand**: replace `assets/logo.webp` (white-on-transparent works best) and the name in the copy. Colors are CSS variables in `:root`; change `--accent` to re-theme.
- **Inventory**: see "Updating the inventory" above.
- **Map**: the lot's coordinates are `LOT` in the map script; directions links use the same coordinates.
- **Form**: the submit handler in the `<script>` only shows a success state. Connect it to a CRM or form service to receive leads.
- **Payment estimates**: card estimates assume 10% down, 60 months at 8.9% APR (`estFor()` in the script).

## Files

- `index.html`: the whole site (HTML, CSS, JS)
- `assets/logo.webp`: dealership logo
- `assets/hero-drive.webm` / `.mp4` / `-poster.jpg`: hero background video. It is a 21-second montage of six clips with crossfades and a seamless loop point, at 720p (about 2 MB as WebM, 3 MB as MP4).
- `assets/hero-olympic-range.webp`: social share image (`og:image`)
- `assets/inventory.js`: the vehicle inventory
- `assets/inventory/*.webp`: the dealership's photo of each vehicle, named by stock number
- `assets/vendor/leaflet/`: Leaflet 1.9.4 map library (BSD-2-Clause, see its `LICENSE`)
- `assets/vehicles/*.webp`: background-removed stock photos used as decoration in the About section
- `assets/fonts/`: Archivo, Geist (SIL OFL) and Phosphor icon fonts (MIT)
- `assets/icons.css`: Phosphor icon subset used by the page

## Photo credits

Inventory photos are the dealership's own. The About-section vehicle photos are from Wikimedia Commons and the hero video is from Mixkit.

- Hero video: Mixkit clips 50267, 52427, 41393, 41537, 506 and 52452, under the [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree). Commercial use is allowed and attribution is not required.
- Hurricane Ridge, Olympic Mountains: [Nick Mealey](https://commons.wikimedia.org/wiki/File:Hurricane_Ridge_(15189120833).jpg), CC BY 2.0 (converted to black and white)
- Dodge Ram 3500 Quad Cab: [Mr.choppers](https://commons.wikimedia.org/wiki/File:2000_Dodge_Ram_3500_Sport_Quad_Cab_Long_Bed_2WD_in_White,_front_left.jpg), CC BY-SA 3.0 (background removed)
- Mazda 626: [Elise240SX](https://commons.wikimedia.org/wiki/File:1999_Mazda_626_LX_in_Mojave_Beige_Mica,_Front_Right,_05-08-2023.jpg), CC BY-SA 4.0 (background removed)

The same credits appear in the site footer under "Photo credits". Keep them if you reuse these images.
