# CLUB 2000 — Y2K RAVE

One-page site for **Y2K RAVE**, a techno night in Montréal presented by CLUB 2000.

Static site — **no build, no framework**. Open `index.html` in a browser, or host
the folder as-is (GitHub Pages, Netlify, Vercel, any static server).

Runtime dependencies are `<script>` / `<link>` tags only: Google Fonts (Chakra
Petch, Instrument Sans, Space Mono), [Lenis](https://github.com/darkroomengineering/lenis)
(smooth scroll) from a CDN, and the [Hi.Events](https://hi.events) ticketing
widget (`app.hi.events/widget.js`) in `#billets`. Fonts / Lenis degrade
gracefully if unreachable; without the widget script the ticket area is empty.

## Files

| File | Role |
|---|---|
| `index.html` | markup + `data-i18n` keys |
| `style.css` | all styling, tokens in `:root` |
| `main.js` | i18n, countdown, nav, scroll motion, hero video |
| `club-hero.mp4` / `.jpg` | hero background video (2.8 MB) + poster |
| `favicon.ico` · `icon-192/512.png` · `apple-touch-icon.png` · `og-image.jpg` | site icon + link preview, generated from `hero.jpg` (gitignored source) |
| `after-hours.jpg` · `dj-*.jpg` | flyer + DJ photos |
| `PRODUCT.md` | product truth (audience, event facts, constraints) |
| `DESIGN.md` | the visual system + motion spec |

## Look

Deep-navy Y2K-revival techno, keyed to the **AFTER HOURS flyer** (`after-hours.jpg`):
liquid-chrome wordmark, electric-blue accents, one cobalt signal colour used
sparingly, a dark-filtered background video, animated equalizer. Fully monochrome
blue — no pink/warmth. The post-hero background is a composite (`.bg` in
`style.css`): depth gradient + 3 blurred colour fields + wireframe mesh +
halftone dots + scanlines + grain + a ghost wordmark down the right edge.
Tokens live in `style.css` under `/* Tokens */`.

| Token | Value |
|---|---|
| `--ink` | `#05081f` |
| `--volt` | `#3d7bff` (signal only; was `--pink`) |
| `--cyan` | `#5eb0ff` |
| Display / body / data fonts | Chakra Petch / Instrument Sans / Space Mono |

Motion: Lenis inertia scroll, magnetic CTAs, masked word-by-word heading reveals,
scroll parallax on the date. **Everything stops under `prefers-reduced-motion`.**

## What to edit per edition

### 1. Date + ticket link — top of `main.js`

```js
const CONFIG = {
  eventDate: '2026-09-12T22:00:00-04:00', // ISO 8601, -04:00 = Eastern (summer)
  ticketUrl: '',                          // paste the link; empty = "Billetterie bientôt"
};
```

The countdown and every ticket button wire up automatically.

### 2. Copy — `main.js` `I18N` object

Every visible string has a key with **both `fr` and `en`**. Edit there, not in
the HTML — `applyLang()` overwrites the HTML on load. Look for `data-i18n` in
`index.html` to find which key drives which element.

### 3. Content marked `À MODIFIER` in `index.html`

- **Line-up** — 2 DJ profile cards (Azathø, DJoJo). Names, roles, style tags and
  bios live in `I18N` (`dj1_*` / `dj2_*`, FR + EN); the artist links are hard-coded
  `<a>` in the two `.dj` articles. Photos: `dj-<name>.jpg` (4:5 portrait) +
  `dj-<name>-live.jpg` (3:2). Raw source material is under `DJ/` (gitignored).
- **Tickets** — tier summary text in `<ul class="tiers">` (literal, not i18n).
  The real sale is the **Hi.Events widget** (`#ticketWidget`, event `10580`) —
  edit the `data-hievents-*` attributes to re-theme / re-point it; `widget.js`
  loads at the bottom of `index.html`. Set `CONFIG.ticketUrl` in `main.js` only
  to override with an external ticketing link.
- **Flyer** — `#billets` shows `after-hours.jpg` (source `After Hours.png`,
  gitignored). Swap by re-exporting to the same filename; keep it portrait.
- **Footer** — real Instagram / SoundCloud / email

### 4. Hero background video

`club-hero.mp4` is set via `data-src-mp4` on `#heroVideo`. To swap it, re-encode
to the same filename (H.264, ~1150 px wide, no audio, `+faststart`, under ~5 MB)
and refresh `club-hero.jpg` as the poster frame.

## Notes

- `club2000.png` (4.7 MB) is the old logo — **unused**, kept only as an asset.
  Safe to delete.
- The source video `test.mp4` is `.gitignore`d.
- Agent tooling (`.claude/`, `.agents/`) is `.gitignore`d — restore with
  `npx impeccable install` if you use it.
