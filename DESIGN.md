# Design — CLUB 2000

<!-- impeccable:design-schema 1 -->

Visual world established 2026-08-29, replacing the earlier synthwave/logo-led
version (rejected by the user). Mode: **Persuade** — the visitor decides and buys.

## Concept

**Y2K / throwback-2000s techno.** A modern, high-gloss revival of turn-of-the-
millennium rave culture — liquid chrome, holographic iridescence, glassy
translucency, gradient-mesh light. Executed with 2025 restraint and heavy,
purposeful motion. It must read in the first viewport as (1) techno-event
promotion and (2) a 2000s throwback — never 80s synthwave, never generic retro.

**Palette re-keyed to the event poster (2026-08-29, `examplejpg.jpg`):** the
poster is fully monochrome **electric blue on deep navy** — zero pink/warmth.
The site follows: the single signal colour is cobalt blue, the ground is navy-
black. Only colours and the display font changed; layout, motion, and structure
are untouched.

## Tokens (`style.css` `:root`)

| Token | Value | Use |
|---|---|---|
| `--ink` / `--ink-2` | `#04050e` / `#090d24` | near-black ground. Darkened 2026-08-30 with the living-haze rework ("darker & smokier" per the client) — blue now reads as a cold tint on the moving haze, not a fill. Was `#05081f` / `#0a0f30`. |
| `--text` / `--text-dim` | `#eaf0ff` / `#838fc6` | copy; dim is blue-tinted, never gray |
| `--volt` | `#3d7bff` | the one signal spark — CTA, kicker badge, ONE word per title, hairlines. Electric cobalt. **Was `--pink` `#ff2ea6`; renamed + revalued in the poster re-key.** Used sparingly. |
| `--cyan` | `#5eb0ff` | secondary accent, focus ring, LED (bright azure) |
| `--violet` | `#5a6bff` | third light only (scroll bar, scrollbar thumb) — a blue indigo |
| `--chrome` | blue-tinted steel gradient | liquid-metal wordmark + footer mark |
| `--holo` | electric-blue chrome gradient | the big date; echoes the poster's blue "marble" panel |
| `--r-sm/md/pill` | 10 / 18 / 999px | radius scale |

See **Living haze** under Materials for the full background layer stack.

## Type

- **Display** — `Chakra Petch` (Y2K techno face, cut corners; weights 600, and
  700 for the wordmark + footer mark). Wordmark, section titles, act names, FAQ
  summaries, footer mark, ticker. **Was `Michroma` (single weight); swapped in
  the poster re-key for a bolder, more condensed match to the poster lettering.**
- **Body** — `Instrument Sans` 400–700.
- **Data** — `Space Mono`. Kickers, countdown labels, tags, metadata, fine print,
  footer lines — anything that reads as a readout.

## Materials

- **`.chrome`** — `background-clip: text` over `--chrome`, slow `chromeShift`
  animation, faint stroke + drop-shadow. Reserved for the CLUB 2000 wordmark and
  footer mark. (Gradient-on-text is a deliberate Y2K material here, not emphasis
  styling — the exception the brief earns.)
- **`.glass`** — translucent panel, `backdrop-filter: blur(14px) saturate(1.3)`,
  1px cool border, inner top highlight. Info cards, ticket card.
- **Holo sheen** — `--holo` at low opacity with `mix-blend-mode: color-dodge`,
  intensifies + shifts position on hover (edition tiles).
- **Living haze** (`.bg`, rebuilt 2026-08-30 — the previous composite "read as
  AI / too simple", client wanted the background to *feel alive*; reference:
  santionispirits.com's flowing ink-current canvas). The room's air moving under
  a sound system. Layers, bottom to top:
  1. `.bg-grad` — static depth gradient: cool halo top, the room darkening and
     vignetting to `#020207` at the edges. Never a flat fill.
  2. `canvas#bgHaze` — **the live layer.** `bgHaze()` in `main.js` renders
     domain-warped fractal noise (hand-rolled fbm, no library) into a tiny
     backing store (≤ 190×140 px), CSS-stretched to the viewport and blurred
     `22px`; `mix-blend: screen` so only the blue crests lift off the black
     ground and drift — troughs stay invisible. Slow horizontal flow + a ~15s
     breathing swell. ~30fps. Colour ramp near-black → cobalt.
  3. `.bg-mesh` — barely-there triangular wireframe, masked to two corner
     patches (a faint flyer echo; dialled down in this rework).
  4. `.bg-dots` — screen-print halftone dot field, radially masked dense at
     lower-left (the flyer's dot wave).
  5. `.scanlines` + a strong fine `.grain` (overlay, ~0.58) — kills the "too
     clean" look, per the Santioni lesson.
  6. `.bg-mark` — a huge ghost wordmark down the right edge, outlined at ~7%.
     Hidden ≤ 1180px.
  **Budget:** backing store scales with viewport (≈ 9–13k px), a few ms/frame.
  `bgHaze()` times its first 80 rendered frames; if the mean render cost is too
  high it freezes on the last frame (`.is-frozen`, opacity drops) — a weak phone
  gets a static smoky texture, never a stuttering loop. Pauses on tab-hide.
  Verified: freezes under 6× CPU throttle, animates clean at 1×.

## Motion (all gated by `prefers-reduced-motion`)

| Where | Behaviour |
|---|---|
| Intro | `#intro` full-screen `--ink` curtain: `.intro__fill` bar fills (`scaleX`), then the panel lifts (`translateY(-100%)`, 0.85s). Min ~700ms, 2.6s JS safety cap + a 4s pure-CSS `introFail` fallback if the script never runs. Fires `document` event `club2000:ready`, which gates Lenis construction, the motion `rAF` loop, and the hero rise — nothing is computed under the curtain. Removed instantly under reduced-motion (`.intro { display:none }`). Shown every load (no session gate). Inspired by hobro.digital's loader. |
| Scroll progress | volt→azure→indigo bar, `scaleX` to scroll ratio, `rAF` loop |
| Scroll feel | **Lenis** inertia/smooth scroll (CDN, `lerp 0.09`); native on touch and under reduced-motion. Anchor clicks routed through `lenis.scrollTo` (native `scrollIntoView` fallback). One shared `rAF` loop drives everything below. |
| Nav | retracts (`translateY(-100%)`) when scrolling down past 260px, returns on any upward scroll; never hides while the mobile drawer is open. |
| Ticker | 6 identical sets in the HTML → the pure-CSS `translateX(-50%)` loop is already seamless to ~2800px with **zero JS**. `ticker()` then measures one set **off-flow** (a throwaway probe — a failed resize never leaves the visible track half-built), rebuilds to the exact copy count for the width (`perHalf*2` sets, `halfW` tracked), and skips rebuilds when the width is unchanged. **In motion: JS-driven** — `offset` accumulates, wrapped into `[0, halfW)` every frame (verified gap-free across the whole cycle at 414–2560px); speed and direction follow scroll momentum (`window.__lenis.velocity`, `BASE 46` → `+BOOST 640` px/s; upward scroll eases the ribbon into reverse); pauses on real hover (`mouseenter`, not touch), stops off-screen (IO). Reduced-motion / no-Lenis: the CSS marquee (`--ticker-dur` ∝ copy count). Inspired by hobro.digital's momentum ribbons. |
| Hero wordmark | `[data-lines]` — each line rises out of an `overflow:hidden` mask, staggered; starts after `club2000:ready` |
| Hero scroll-out | as the hero leaves, `.hero-content` lifts (`translateY` to 64px) and fades to 0, the background video scales to `1.12` — lerped (0.12), only computed in the top-viewport band. Wrapper transform so `[data-rise]` entrance is untouched. |
| Section titles | `[data-split]` — JS word-wrap, each word rises from an `overflow:hidden` mask, 55ms stagger, fires at 40% in view |
| Sections / DJ cards | `.reveal`→`.in` and `[data-reveal]`→`.shown`, translate/fade stagger. The DJ **main** photo also clip-wipes open (`clip-path: inset(0 0 100% 0)` → `0`) with the inner image easing from `scale(1.14)`; the 3:2 secondary shot rides the card fade only; info cards stagger 80ms. |
| Parallax | `[data-speed]` on the big date + the four section titles (`-0.04/-0.05`); **lerped** (0.085) toward a viewport-relative target, clamped ±160px. Independent `translate` property, composes with the reveal `transform`. |
| Background haze | `canvas#bgHaze` — domain-warped fbm noise, ~30fps, slow horizontal flow + breathing swell, `screen`-blended over the near-black grad. Self-freezes on weak devices; one static frame under reduced-motion. Mesh/dots/scanlines/grain/mark are static. (Replaced the 3 CSS `.blob`s + `drift`.) Reference: santionispirits.com. |
| Reveals | translateY(32–56px) + slight `scale`, 0.7–0.9s exponential ease, nth-child stagger. No blur. |
| Cursor | native system cursor. A custom cursor was tried and **removed** — repeated "invisible mouse" bugs. Do not reintroduce. |
| Techno signals | hero eyebrow "NUIT TECHNO"; animated CSS equalizer (`.eq`, `scaleY`); "130-142 BPM · mur de son" tag |
| Hero video | `#heroVideo` (wired to `test.mp4` via `data-src-mp4`) plays muted/looped behind the wordmark. Treatment: `filter: grayscale(0.5) brightness(0.62) contrast(1.12)`, `opacity 0.72`, then a `::after` voile — radial vignette + linear fade to `--ink` at the bottom — plus a subtle grain `::before`. Content sits at `z-index: 2` above it. Pauses off-screen / tab-hidden; off under reduced-motion. |

**Removed 2026-08-29** (user: "site super lent, flashs agressants"): the strobe
layer, the sweeping light rig, per-section entry flashes, and the FX toggle.
Also cut for performance: per-frame section `skewY`, per-frame blob `scale`,
`filter: blur()` on all scroll reveals, one of three blobs, `will-change` on
every section. Scroll is back to ~9 ms/frame.
| Magnetic | `[data-magnetic]` CTAs lerp toward the pointer within ~40px of their bounds (strength 0.2), spring back on leave. Fine pointers only. |
| DJ photo hover | `scale(1.025)` + holo `::before` opacity bump |
| Flyer hover | `.ticket-poster` lifts `translateY(-5px)`, volt border + glow, bottom scrim fades in |
| Countdown | digits `tick` (slide + deblur) on change; seconds never animate |
| Buttons | diagonal `sheen` sweep on hover |

Reduced-motion: intro skipped, background haze renders one static frame, chrome frozen mid-gradient, all
reveals shown, ticker on the plain CSS loop, nav never retracts, hero scroll-out
and DJ-photo clip disabled, scroll bar updates on `scroll` without a loop.

**Added 2026-08-29** (user: "animations plus modernes, inspire-toi de hobro.digital"):
the intro curtain, scroll-momentum ticker, directional nav retract, hero
scroll-out (video Ken-Burns + content lift/fade), DJ-photo clip-wipe, and
title-layer parallax. All ride the existing shared `rAF` loop; measured
~8 ms/frame during scroll (unchanged from baseline).

## Layout

- Container `--maxw: 1180px`, gutter `clamp(1.15rem, 5vw, 3rem)`.
- Section rhythm `clamp(3.5rem, 8vw, 6rem)` vertical.
- Left-aligned content blocks; kicker (`NN` + label) → title (one word in `--volt`
  via `em`) → content.
- Sections: hero (event title **Y2K RAVE** in chrome) · ticker (seamless loop,
  scroll-momentum reactive) · la soirée (date + countdown + facts + CTA)
  · line-up (2 DJ profile cards: 4:5 portrait with outlined index numeral, role,
    name + hairline, style-tag chips, bio, a 3:2 live/mood shot, then artist links
    or recent-sets line — Azathø / DJoJo) · infos (glass
  grid) · billets (two-up on desktop: the framed **AFTER HOURS flyer**
  `after-hours.jpg` on the left; on the right a glass card with the 2-tier
  summary (10 $ online / 12 $ door) stacked above the **embedded Hi.Events
  ticketing widget** (`#ticketWidget`, event 10580, dark-themed, kept outside the
  `backdrop-filter` card on purpose)) · faq (`<details>`) · footer.
- **Bilingual FR / EN**: `data-i18n` keys on every text node, `data-i18n-attr`
  for attributes; `I18N` dict + `applyLang()` in main.js; `.lang-toggle` in nav;
  `langListeners` re-render JS-generated copy (countdown note, ticket fallback).
  Persisted in `localStorage` (`club2000:lang`), first visit follows
  `navigator.language`.

## Accessibility

- `:focus-visible` cyan ring on every control; `:focus:not(:focus-visible)` clears.
- Mobile drawer: `height: 100dvh` (survives `<nav>`'s scrolled `backdrop-filter`
  becoming its containing block), `visibility: hidden` while closed, scrim +
  Escape + toggle-refocus close it, toggle `z-index` keeps ✕ tappable.
- `scroll-padding-top: 5.5rem` for anchor jumps under the fixed nav.
- Contrast: text on `--ink` well above AA; `--volt` on `--ink` ≈ 5:1.
- Themed browser surfaces: selection, scrollbar (volt→indigo), focus ring.

## Anti-references (do not reintroduce)

Perspective neon-grid floor · Fredoka / rounded friendly type · synthwave sky
gradient · soft bloom glows · pink / warm accents (the poster is monochrome
blue) · the `club2000.png` logo as a required asset.
