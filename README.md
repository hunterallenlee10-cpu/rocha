# Rocha Family Auto Sales: Dealership Website Template

A polished, single-page dealership website built as a showcase template. It keeps the Rocha Family Auto Sales name, logo, inventory and copy, but the **phone number, street address and hours are fictional placeholders** (see "Placeholder business info" below).

Open `index.html` in a browser. No build step, no frameworks, no third-party CDNs (fonts and icons are self-hosted). The only external request is the Google Maps embed in the contact section.

## Design direction

Researched against award-recognized automotive and dealer sites (Rivian, Polestar, Porsche, Carvana, Clutch, Fletcher Jones) and current dealer UX guidance:

- **Cinematic video hero**: a looping montage of cars on open roads plays behind a cut-out F-250, which is the featured vehicle.
- **Inventory-first** (Carvana / Clutch): a glass quick-search bar sits on the hero, and the inventory grid has body-style and "Search by price" filters with live counts and an empty state.
- **Studio photography**: every vehicle is cut out and placed on the same lit "virtual studio" backdrop, so mismatched lot photos look like a consistent catalog.
- **Payment next to price** (Fletcher Jones): each card shows an estimated monthly payment, and an interactive payment calculator sits beside the credit application.
- **Restraint** (Polestar): dark off-black palette, one amber accent, Archivo + Geist type, generous spacing.

## Features

- Transparent header that turns to frosted glass on scroll; full-screen mobile menu
- Hero with a muted, looping background video (it shows a still poster frame when `prefers-reduced-motion` is on) and load choreography (slow zoom, truck slides in) and CSS scroll-driven parallax where supported
- Quick search (body style + max price) that filters the inventory and scrolls to it
- Inventory filters with View Transitions animation, live result count and empty state
- Vehicle quick-view dialog (price, mileage, estimated payment, body style) with "Apply Online" (pre-fills the form and calculator) and "Estimate payment"
- Payment calculator: price, down payment, APR sliders and 36/48/60/72-month terms
- Credit application form with inline validation, loading and success states (front-end only)
- Bento "About Us" section, map contact section with live "Open now / Closed now" status
- Sticky Call / Apply Online bar on phones
- Respects `prefers-reduced-motion`; keyboard and screen-reader friendly; no horizontal scroll at 390px

## Placeholder business info

| Field   | Value used in the template              |
|---------|-----------------------------------------|
| Phone   | (360) 555-0148 (555-01xx is reserved for fictional use) |
| Address | 2150 Evergreen Motor Way, Sequim, WA 98382 |
| Hours   | Mon to Fri 9am - 6pm, Sat 10am - 5pm, Sun closed |

Search `index.html` for `555-0148`, `Evergreen Motor Way` and the hours text to swap in a real dealership's details. The map embed and "Get Directions" link point at Sequim, WA.

## Customizing for another dealership

- **Brand**: replace `assets/logo.webp` (white-on-transparent works best) and the name in the copy. Colors are CSS variables in `:root`; change `--accent` to re-theme.
- **Inventory**: each vehicle is an `<article class="car">` with `data-price`, `data-body` (`truck` or `sedan`), `data-miles`, `data-name` and `data-img`. Add the same name to the form's "Vehicle of interest" list.
- **Photos**: cut-out PNG/WebP vehicles on a transparent background look best on the studio backdrop.
- **Form**: the submit handler in the `<script>` only shows a success state. Connect it to a CRM or form service to receive leads.
- **Payment estimates**: card estimates assume 10% down, 60 months at 8.9% APR (`estFor()` in the script).

## Files

- `index.html`: the whole site (HTML, CSS, JS)
- `assets/logo.webp`: dealership logo
- `assets/hero-drive.webm` / `.mp4` / `-poster.jpg`: hero background video. It is a 21-second montage of six clips with crossfades and a seamless loop point, at 720p (about 2 MB as WebM, 3 MB as MP4).
- `assets/hero-olympic-range.webp`: social share image (`og:image`)
- `assets/vehicles/*.webp`: background-removed vehicle photos
- `assets/fonts/`: Archivo, Geist (SIL OFL) and Phosphor icon fonts (MIT)
- `assets/icons.css`: Phosphor icon subset used by the page

## Photo credits

All photos are from Wikimedia Commons, and the hero video is from Mixkit. The vehicle photos show the same make, model and generation as the listings; they are not photos of the specific units for sale.

- Hero video: Mixkit clips 50267, 52427, 41393, 41537, 506 and 52452, under the [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree). Commercial use is allowed and attribution is not required.
- Hurricane Ridge, Olympic Mountains: [Nick Mealey](https://commons.wikimedia.org/wiki/File:Hurricane_Ridge_(15189120833).jpg), CC BY 2.0 (converted to black and white)
- Ford F-250 Super Duty: [Cutlass](https://commons.wikimedia.org/wiki/File:1999_Ford_F-250_Super_Duty_in_Black_Clearcoat,_front_left,_07-22-2022.jpg), CC0
- Chrysler 300M: [SsmIntrigue](https://commons.wikimedia.org/wiki/File:300M_Special_06-25-2019_1.jpg), CC BY-SA 4.0 (background removed)
- Dodge Ram 3500 Quad Cab: [Mr.choppers](https://commons.wikimedia.org/wiki/File:2000_Dodge_Ram_3500_Sport_Quad_Cab_Long_Bed_2WD_in_White,_front_left.jpg), CC BY-SA 3.0 (background removed)
- Mazda 626: [Elise240SX](https://commons.wikimedia.org/wiki/File:1999_Mazda_626_LX_in_Mojave_Beige_Mica,_Front_Right,_05-08-2023.jpg), CC BY-SA 4.0 (background removed)

The same credits appear in the site footer under "Photo credits". Keep them if you reuse these images.
