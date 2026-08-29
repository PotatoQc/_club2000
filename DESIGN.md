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

## Tokens (`style.css` `:root`)

| Token | Value | Use |
|---|---|---|
| `--ink` / `--ink-2` | `#020204` / `#050610` | near-pure-black ground — this is a dark warehouse, not a pink poster |
| `--text` / `--text-dim` | `#eef1ff` / `#8a90ad` | copy; dim is cool-tinted, never gray |
| `--pink` | `#ff2ea6` | the one signal spark — CTA, kicker badge, ONE word per title, hairlines. Used sparingly; ambient pink is dialed right down. |
| `--cyan` | `#3ddfff` | secondary accent, focus ring, LED |
| `--violet` | `#7b6cff` | third light only (blobs, scrollbar) |
| `--chrome` | cool steel gradient | liquid-metal wordmark |
| `--holo` | **cooled** ice/steel gradient (no pink candy) | the big date |
| `--r-sm/md/pill` | 10 / 18 / 999px | radius scale |

Blobs run at `opacity 0.12–0.18` (haze, not glow). The bright/candy version is
an anti-reference — the user's note: "just a pink Y2K site".

## Type

- **Display** — `Michroma` (squared techno grotesque, Y2K-adjacent). Wordmark,
  section titles, act names, FAQ summaries, footer mark.
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
- **Gradient-mesh blobs** — 3 fixed blurred radial blobs (pink/cyan/violet),
  `mix-blend-mode: screen`, slow independent `drift`. The whole background.

## Motion (all gated by `prefers-reduced-motion`)

| Where | Behaviour |
|---|---|
| Scroll progress | pink→cyan→violet bar, `scaleX` to scroll ratio, `rAF` loop |
| Scroll feel | **Lenis** inertia/smooth scroll (CDN, `lerp 0.09`); native on touch and under reduced-motion. Anchor clicks routed through `lenis.scrollTo`. One shared `rAF` loop drives everything below. |
| Ticker | seamless CSS marquee, `translateX(-50%)` over two identical sets, 34s linear infinite, pauses on hover — NOT coupled to scroll |
| Hero wordmark | `[data-lines]` — each line rises out of an `overflow:hidden` mask, staggered |
| Section titles | `[data-split]` — JS word-wrap, each word rises from a mask with `blur→sharp`, 55ms stagger, fires at 40% in view |
| Sections / DJ cards | `.reveal`→`.in` and `[data-reveal]`→`.shown`, translate/fade stagger |
| Parallax | `[data-speed]` on the big date only; **lerped** (0.085) toward a viewport-relative target, clamped ±160px. Independent `translate` property. |
| Blobs | 2 blurred radial blobs (`blur 64px`), slow `drift` keyframes only |
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
| Countdown | digits `tick` (slide + deblur) on change; seconds never animate |
| Buttons | diagonal `sheen` sweep on hover |

Reduced-motion: blobs static, chrome frozen mid-gradient, all reveals shown,
ticker static, cursor hidden, scroll bar updates on `scroll` without a loop.

## Layout

- Container `--maxw: 1180px`, gutter `clamp(1.15rem, 5vw, 3rem)`.
- Section rhythm `clamp(3.5rem, 8vw, 6rem)` vertical.
- Left-aligned content blocks; kicker (`NN` + label) → title (one word in `--pink`
  via `em`) → content.
- Sections: hero (event title **Y2K RAVE** in chrome) · ticker (seamless CSS
  infinite loop, not scroll-coupled) · la soirée (date + countdown + facts + CTA)
  · line-up (2 DJ cards: 5:4 photo, role, name, bio, track links) · infos (glass
  grid) · billets (glass card, 2 tiers: 10 $ / 15 $) · faq (`<details>`) · footer.
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
- Contrast: text on `--ink` well above AA; `--pink` on `--ink` ≈ 5:1.
- Themed browser surfaces: selection, scrollbar (pink→violet), focus ring.

## Anti-references (do not reintroduce)

Perspective neon-grid floor · Fredoka / rounded friendly type · synthwave sky
gradient · soft pink bloom glows · the `club2000.png` logo as a required asset.
