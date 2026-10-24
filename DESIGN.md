# Design system: Marque & Mile

## World

**The Light Room.** A dark studio, one suspended light ceiling of eight panels (4 x 2), a round black turntable and a polished floor that mirrors everything. Light is the accent. The page is studio black with chalk-white type, racing green is the one brand colour, and the cars' paint supplies the rest of the colour.

Motifs that come from the room:

- The **eight panels**: the intro (panels switch on one by one), the logo mark (2 x 2 panels), the map pin, the step indicator in "The standard", the separators in the makes marquee.
- **Being lit**: in the Spectrum, the car in focus is lit and the rest sit in shadow; the car sheet photo fades up from dark; card photos get a band of light that sweeps across on hover.

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b0c0b` | Page (studio black) |
| `--bg-2` / `--surface` / `--surface-2` | `#101211` / `#151716` / `#1c1f1d` | Dialogs, cards, panels |
| `--text` / `--accent` | `#edece6` | Type, primary buttons, slider fill, active states |
| `--muted` / `--dim` | `#a9aba4` / `#858882` | Secondary and fine print (both pass 4.5:1 on `--bg`) |
| `--green` | `#0f3b2d` | Racing green: "The standard" and the footer, the "Price drop" tag |
| `--green-text` | `#b6dcc6` | Secondary text on green |
| `--signal` / `--ok` | `#86d9aa` | Open now, in-stock dot, tier label in the Spectrum |
| `--danger` | `#f2917f` | Form errors |

Strategy: restrained UI (chalk on black) plus one committed field colour (green owns whole sections). Never gradient text, never coloured glows on cards.

## Type

- **Anybody** (variable width 50-150%, weight 100-900) is the display face and does two jobs:
  - **Wide** (115-150%) for names: the wordmark, headings, model names, the MARQUE and MILE chapter words.
  - **Condensed** (58-62%) for numbers: prices, the Spectrum odometer, "$229,900 to $12,900".
  The footer wordmark animates between the two extremes.
- **Mona Sans** for reading and UI (body 16.5px, leads 1.1rem).
- **Martian Mono** only for data: stock numbers, VINs, years, tier labels, spec labels. Uppercase, 0.7-0.72rem, tracked 0.05-0.08em.
- Headings: weight 760-820, tracking -0.02 to -0.04em, `text-wrap: balance`. Display size tops out at 6rem.

## Shape and space

- Buttons, chips and segmented controls are full pills. Surfaces 18px radius, inputs 12px.
- Content width 1360px with a 16px minimum gutter (`--gutter`).
- Sections breathe: `clamp(88px, 11vw, 150px)` vertical padding.

## Motion

- One authored moment: the scroll film. Everything else supports it quietly.
- Easing: `cubic-bezier(.16,1,.3,1)` for entrances, `cubic-bezier(.65,0,.35,1)` for wipes.
- Headings rise word by word from a mask; blocks fade up 28px; captions in the film fade in with a short blur.
- Numbers roll like a mechanical odometer (`Odo` in `site.js`).
- `prefers-reduced-motion`: no intro, no smooth scroll, no easing on the film, no transitions.

## Components

- **Car card**: 4:3 studio photo (zoomed 1.3x on the turntable), mono year and make, tier label, wide model name, trim, spec row (mileage, drivetrain, electric/hybrid/manual), condensed price with estimated payment.
- **Car sheet** (dialog): photo left, specs grid with mono labels, three actions.
- **Panels** (calculator and forms): `--surface` with a 1px line and 22px radius.
- **Tags**: chalk pill for "Just arrived"; green pill for "Price drop".

## Imagery

All stills share one setup: front three-quarter view facing right, camera at headlight height, long lens, car centred on the turntable under the light ceiling, mirror floor. New cars should be shot (or generated) the same way, or the grid stops reading as one floor.
