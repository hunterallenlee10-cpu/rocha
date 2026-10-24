# Marque & Mile: dealership website template

A single-page website for **Marque & Mile**, a fictional Denver pre-owned dealership that sells everything from a Rolls-Royce Wraith to a Honda Fit. The company, address, phone number, cars, prices, VINs and claims are made up, and every photo and the hero film were generated with Higgsfield AI for this template.

Open `index.html` in a browser, or serve the folder (`python3 -m http.server`). No build step, no framework, no CDNs: fonts, icons, Lenis and Leaflet are all self-hosted. The only external requests are the map tiles (OpenStreetMap, and Esri for satellite).

## The idea

**Every car gets the same light.** A $12,900 Honda gets the same 160-point inspection, the same studio and the same honest price as a $229,900 Rolls-Royce. The whole site is built around that promise:

- **The Light Room.** Every car is photographed on the same black turntable under the same paneled light ceiling, so the collection reads as one photo shoot.
- **The hero is a film you scroll.** The studio lights switch on over a Porsche 911, the 911 turns into a Honda Civic under the same light, and the camera pulls back to reveal the floor. Scrolling plays it frame by frame on a canvas.
- **Marque and Mile.** Luxury and performance cars are "Marque", everyday cars are "Mile". It's a filter in the collection, a label on every card and the two ends of the Spectrum gauge.

## What's on the page

1. **Intro**: the eight ceiling panels switch on one by one, then the page is revealed (first visit only; skipped with reduced motion).
2. **Story**: 242-frame scroll film with four chapters (Lights, Marque, Mile, The floor), chapter rail, progress line, and car callouts that open the car sheet.
3. **Makes**: a marquee of every make on the floor that speeds up with your scroll.
4. **Spectrum**: a pinned, sideways-scrolling run of cars from most to least expensive. The car in focus is "lit", a rolling odometer shows its price, and a needle moves along a log-scale Marque-to-Mile gauge. On phones it becomes a swipe carousel.
5. **The floor (collection)**: a "Calculate your monthly payment" button that jumps to the calculator, then 24 cars with search, budget, sort, tier (All / Marque / Mile with counts) and body-style filters, View Transitions, an odometer result count, an empty state, a light-sweep hover and a "View" cursor.
6. **Car sheet**: price, estimated payment, specs, VIN, and buttons to apply for finance (pre-fills the form and calculator), estimate a payment, or book a viewing.
7. **The standard** (racing green): four steps with a sticky photo that wipes to the next image as you read.
8. **Finance**: the payment calculator (unchanged from the previous version of this site) next to the finance application with inline validation.
9. **Sell your car**: an offer form over a shot of an everyday car rolling into the Light Room.
10. **Visit**: an interactive Leaflet map that opens in satellite view (Map / Satellite toggle, zoom, re-center, "How far am I?"), live open/closed status in Denver time, address, phone, email.
11. **Footer**: a giant wordmark that stretches from condensed to wide as it scrolls in (variable font width axis).

Also: Lenis smooth scrolling, a header that hides on scroll down, a sticky Call / Apply bar on phones, keyboard focus styles, a skip link, `prefers-reduced-motion` support (no intro, no smoothing, no easing), LocalBusiness (AutoDealer) JSON-LD, and no horizontal scroll at 390px.

## Customizing

- **Name and copy**: search `index.html` for "Marque" and replace. The wordmark is text, styled in `assets/css/site.css` (`.brand-word`).
- **Colours**: CSS variables in `:root` at the top of `assets/css/site.css`. `--green` is the brand colour; `--accent` (chalk) is used for buttons and sliders.
- **Inventory**: edit `assets/inventory.js`. Each car has a stock number, year, make, model, trim, `tier` (`marque` or `mile`), `type` (`suv`, `sedan`, `coupe`, `truck`, `hatch`), price, optional `wasPrice` (shows "Price drop"), mileage, specs, VIN, optional `badge`, and a photo path. Cards, filters, counts, the Spectrum, the car sheet and the finance form's car list all build from this file.
- **Photos**: put a 3:2 studio shot per car in `assets/cars/` named by stock number. Cards zoom in on the centre of the frame, so keep the car centred.
- **Hero film**: frames live in `assets/film/d/` (1920px, 16:9) and `assets/film/m/` (720x900, phones). If you replace them, update `FILM.count` and the `FILM.map` keyframes in `assets/js/site.js`. The beats' `data-from` / `data-to` attributes in `index.html` set when each caption shows.
- **Map and hours**: `LOT` in the map script, the address in the HTML and JSON-LD, and `HOURS` in the opening-hours script.
- **Forms**: the finance and sell forms only show a success state. Connect the submit handler in `wireForm()` to your CRM or form service.
- **Payment estimates**: cards and the car sheet assume 10% down, 60 months at 8.9% APR (`estFor()`).

## Files

- `index.html`: markup
- `assets/css/site.css`: all styles
- `assets/js/site.js`: all behaviour
- `assets/inventory.js`: the cars
- `assets/cars/`: 24 studio photos (WebP, 1600x1067)
- `assets/film/`: hero film frames (desktop and phone sets, about 8 MB and 4 MB, loaded progressively)
- `assets/editorial/`: inspection, studio, key handover, mountain road and arrival photos
- `assets/og.jpg`: social share image
- `assets/fonts/`: Anybody, Mona Sans, Martian Mono (SIL OFL) and a Phosphor icon subset (MIT)
- `assets/vendor/lenis/`: Lenis 1.3.27 smooth scroll (MIT)
- `assets/vendor/leaflet/`: Leaflet 1.9.4 (BSD-2-Clause)
- `DESIGN.md`: the design system (palette, type, motion, components)

## Credits

- Photography and hero film: generated with Higgsfield AI for this template (GPT Image 2.5 stills, Kling 4.0 video). The vehicles shown are illustrations, not real stock.
- Type: [Anybody](https://fonts.google.com/specimen/Anybody), [Mona Sans](https://fonts.google.com/specimen/Mona+Sans), [Martian Mono](https://fonts.google.com/specimen/Martian+Mono), SIL Open Font License.
- Icons: [Phosphor](https://phosphoricons.com), MIT. Smooth scroll: [Lenis](https://github.com/darkroomengineering/lenis), MIT. Map: [Leaflet](https://leafletjs.com), BSD-2-Clause; tiles © OpenStreetMap contributors and Esri.
