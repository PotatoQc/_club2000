# CLUB 2000 — HALLOWEEN PARTY

One-page site for **HALLOWEEN PARTY** (Fri. Oct 23 2026, 22:00 → 03:00, Red Room,
2037 Saint-Denis, Montréal) presented by CLUB 2000. DJs: **Jason & Michael Mayers**.
Previous edition (Y2K RAVE, 12.09.26): flyers in `_archives/2026-09-12_y2k-rave/`,
blue Y2K theme in git history before 2026-10-12.

Static site — **no build, no framework**. Open `index.html` in a browser, or host
the folder as-is (GitHub Pages, Netlify, Vercel, any static server).

Runtime dependencies are `<script>` / `<link>` tags only: Google Fonts (Anton,
Archivo, VT323), [Lenis](https://github.com/darkroomengineering/lenis)
(smooth scroll) from a CDN, and the [Hi.Events](https://hi.events) ticketing
widget (`app.hi.events/widget.js`) in `#billets`. Fonts / Lenis degrade
gracefully if unreachable; without the widget script the ticket area is empty.

## Files

| File | Role |
|---|---|
| `index.html` | markup + `data-i18n` keys |
| `style.css` | all styling, tokens in `:root` |
| `main.js` | i18n, countdown, nav, scroll motion, hero video |
| `hero-mask.jpg` | hero background (mask cropped from `flyer.png`) |
| `flyer-halloween.jpg` · `flyer-dj.jpg` | web versions of the two flyers (sources `flyer.png` / `DJ.png`, gitignored) |
| `dj-duo.jpg` | Jason & Michael photo, cropped from `DJ.png` |
| `og-image.jpg` | link preview (1200×630, from `DJ.png`) |
| `favicon.ico` · `icon-192/512.png` · `apple-touch-icon.png` | site icon, generated from `hero.jpg` (gitignored source) |
| `club-hero.mp4` / `.jpg` | old blue hero video — currently unused (see §4) |
| `PRODUCT.md` | product truth (audience, event facts, constraints) |
| `DESIGN.md` | the visual system + motion spec |

## Look

**« Cassette VHS »**: an 80s slasher tape rented from the video store, keyed to
the Halloween flyer. Pumpkin orange on black, on-screen display (`PLAY ▶`,
blinking `REC`, `CH 03`) in VT323, heavy scanlines, an RGB colour bleed
(`--rgb-split`) on the big Anton titles with an occasional tracking jitter, and a
slow tracking line rolling down the page. Square corners everywhere. The
post-hero **living haze** (`.bg` in `style.css`, `bgHaze()` in `main.js`) is kept,
re-tinted orange. Tokens live under `/* Tokens */`.

| Token | Value |
|---|---|
| `--ink` | `#070605` |
| `--volt` | `#ff7a1a` pumpkin orange (signal colour; the name is historical) |
| `--cyan` | `#9fb35a` VHS screen green (OSD labels, focus ring) |
| Display / body / data fonts | Anton / Archivo / VT323 |

Motion: Lenis inertia scroll, magnetic CTAs, masked word-by-word heading reveals,
scroll parallax on the date. **Everything stops under `prefers-reduced-motion`.**

## What to edit per edition

### 1. Date + ticket link — top of `main.js`

```js
const CONFIG = {
  eventDate: '2026-10-23T22:00:00-04:00', // ISO 8601, -04:00 = Eastern (summer)
  ticketUrl: '',                          // paste the link; empty = "Billetterie bientôt"
};
```

The countdown and every ticket button wire up automatically.

### 2. Copy — `main.js` `I18N` object

Every visible string has a key with **both `fr` and `en`**. Edit there, not in
the HTML — `applyLang()` overwrites the HTML on load. Look for `data-i18n` in
`index.html` to find which key drives which element.

### 3. Content marked `À MODIFIER` in `index.html`

- **DJ** (`#dj`) — one featured duo. Names are literal in `.dj-names`; the hero
  line is `hero_dj` in `I18N`, the rest is `dj_*` (FR + EN). Photo: `dj-duo.jpg`.
- **Tickets** — tier summary text in `<ul class="tiers">` (literal, not i18n).
  The real sale is the **Hi.Events widget** (`#ticketWidget`, event `11700`) —
  edit the `data-hievents-*` attributes to re-theme / re-point it; `widget.js`
  loads at the bottom of `index.html`. Set `CONFIG.ticketUrl` in `main.js` only
  to override with an external ticketing link.
- **Flyer** — `#billets` shows `flyer-halloween.jpg` (source `flyer.png`,
  gitignored). Swap by re-exporting to the same filename; keep it portrait.
  When an edition ends, move its flyers to `_archives/<date>_<name>/`.
- **Footer** — real Instagram / SoundCloud / email

### 4. Hero background

The hero currently shows a still image (`hero-mask.jpg`, filtered in CSS). To go
back to a video, replace the `<img>` in `.hero-video` with the old
`<video id="heroVideo" data-src-mp4="…">` block (git history); `heroVideo()` in
`main.js` still handles it, as described below.

`club-hero.mp4` (900 px, H.264, no audio) is set via `data-src-mp4` on
`#heroVideo`. The dark look is **baked into the file** — there is no CSS
`filter:` on the video (it stutters weak GPUs). To swap it, re-encode to the
same filename *with the treatment re-applied*:

```
ffmpeg -i new.mp4 -vf "hue=s=0.5,colorlevels=romax=0.62:gomax=0.62:bomax=0.62,eq=contrast=1.12,scale=900:-2" \
  -an -r 24 -g 72 -sc_threshold 0 -crf 26 -preset slow -movflags +faststart club-hero.mp4
```

Then refresh `club-hero.jpg` (a mid-clip frame) as the poster. The video is
skipped entirely on Save-Data / 2G connections and while `prefers-reduced-motion`
is set — the poster and gradient stand in.

## Notes

- `club2000.png` (4.7 MB) is the old logo — **unused**, kept only as an asset.
  Safe to delete.
- The source video `test.mp4` is `.gitignore`d.
- Agent tooling (`.claude/`, `.agents/`) is `.gitignore`d — restore with
  `npx impeccable install` if you use it.
