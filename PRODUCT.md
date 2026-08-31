# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: hand-written static site — one `index.html`, one `style.css`,
one `main.js`. No build step, no framework. Deployable as a plain folder on any
static host (GitHub Pages, Netlify, Vercel). Keep it buildless unless the user
decides otherwise.

Runtime deps (script tags, no toolchain): Google Fonts (Chakra Petch / Instrument
Sans / Space Mono) and **Lenis** (inertia scroll) from jsDelivr CDN. Both degrade
gracefully if unreachable — Lenis absence falls back to native smooth scroll and
the other motion still runs off `window.scrollY`.

## Users

Primary: prospective attendees of the Montréal techno scene, 18+, arriving mostly
from Instagram on a phone. They want to know who is playing, when it happens, and
buy a ticket with as little friction as possible.

Secondary: returning fans who already know CLUB 2000 and come back for line-up
drops and the venue reveal. The page is optimized for the ticket-buyer first.

## Product Purpose

One-page event site for CLUB 2000, a recurring techno night in Montréal. It exists
to convert interest into ticket sales for the current edition and to hold the
practical information attendees need (date, hours, access rules, venue-reveal
policy, ticket tiers, FAQ). Success = tickets sold and a well-briefed crowd that
shows up knowing the rules.

## Positioning

A single-night, single-sound techno event. The brand is built around numbered
editions ("Édition 001 — Sous-sol", "002 — Entrepôt", …), each in a different
raw space. Door: 18+, government photo ID. Re-entry is allowed all night. The
venue address is public on the site; detailed access instructions still go to
ticket holders by email the day before.

## Operating Context

- Discovery and promotion happen on Instagram / SoundCloud; the site is the
  destination those links point to.
- Tickets are sold through an external ticketing provider via a single link
  (`CONFIG.ticketUrl` in `main.js`); when empty, ticket buttons degrade to
  "Billetterie bientôt".
- Content is updated per edition by editing marked `A MODIFIER` blocks in
  `index.html` and the two `CONFIG` values in `main.js`.
- Venue address is public on the site; only the detailed access instructions are
  emailed to ticket holders the day before.

## Capabilities and Constraints

- Sections: hero + countdown, line-up, practical info, past-editions gallery,
  ticket tiers, FAQ, footer with social links.
- Countdown is driven by a single ISO date in `main.js` and self-updates; past
  the date it switches to a "c'est ce soir" state.
- FAQ is native `<details>`; only one answer open at a time.
- Ambient motion (living background haze, scroll reveals, ticker, parallax) must
  fully stop — or drop to a static frame — under `prefers-reduced-motion`.
- **Background** (rebuilt 2026-08-30): the old composite "read as AI / too
  simple". It is now a living haze — a low-res `<canvas>` (`#bgHaze`,
  `bgHaze()` in `main.js`) rendering slow-flowing blue fog over a darkened
  near-black ground, blurred and `screen`-blended, ~30fps, with a cost watchdog
  that freezes it on weak devices. Reference: santionispirits.com. Keep it
  buildless (hand-rolled noise, no library) and cheap. See DESIGN.md § Materials.
- Current event is titled **Y2K RAVE**, presented by CLUB 2000. Confirmed:
  Saturday 12 September 2026, 22 h–04 h (six hours), at 2037 rue Saint-Denis,
  Montréal (Quartier latin, métro Sherbrooke).
- Door policy: 18+, photo ID. **Re-entry is allowed all night** (this reverses
  the earlier no-re-entry rule).
- **A free gift goes to the first 30 people to arrive** at the door.
- Line-up is **2 DJs**, both confirmed (source: user's `DJ/` folder — `DJ/` is
  gitignored, shipped photos are `dj-*.jpg` in the repo root):
  - **Azathø** — DJ, Montréal. Hard techno + hypnotic groove. Links: SoundCloud
    (`on.soundcloud.com/KPeZy4rLyihnXblZi5`), Resident Advisor (`fr.ra.co/dj/azatho`).
    2 photos supplied (portrait + warehouse-booth live shot).
  - **DJoJo** — Johans Dos Santos. DJ / producer, Montpellier ⇄ Montréal.
    Hardgroove / Latin core / hypnotic; Brazilian roots. Recent sets: BoumBoum,
    RedRoom (IleSoniq), 212 Club, Shameless MTP, Polytechnique Montréal, Bar Les
    Torchés, and more. Link: Instagram (`@off.djojo_`). Booking email in the press
    kit is `djojomontreal@gmail.com` — **a personal Gmail, deliberately left OFF
    the public page**; add only if the artist confirms.
  - Bios are on `dj1_*` / `dj2_*` keys in `I18N` (FR + EN). SoundCloud/RA/IG URLs
    are hard-coded in the two `.dj` articles in `index.html`.
- Tickets: **10 $ en ligne, 12 $ à la porte** (door price changed 15 → 12 on
  2026-08-30 to match the official flyer — confirm if 15 was correct).
- **Ticketing is LIVE via Hi.Events** (2026-08-30): the inline widget for event
  **10580** (`app.hi.events`) is embedded in `#billets` (`#ticketWidget`), dark-
  themed to the site. `widget.js` loads `async` at the bottom of `index.html`.
  Every "billet" button (`[data-ticket-link]`, e.g. `#ticketBtn` in `#soiree`)
  now scrolls to `#billets`. `CONFIG.ticketUrl` still wins if ever set (opens a
  new tab instead). Notes: the hi.events ticket is named just "Ticket" — rename
  it in the hi.events dashboard for consistency; `locale=fr` but some widget
  chrome stays English (hi.events limitation); the widget adds a ~CA$0.64 fee and
  a small "Try Hi.Events Free" credit line. **`data-hievents-secondary-color`
  doubles as the +/- stepper icon colour — it MUST contrast with
  `background-color` (2026-08-30 bug: `#0e1533` ≈ the `#0a0f30` bg made the "+"
  invisible on the deployed site; fixed to `#5eb0ff`).**
- **Official flyer** — `After Hours.png` (user-supplied, gitignored); web version
  `after-hours.jpg` (1240 px, tracked) is shown in the `#billets` section beside
  the ticket card, click-to-open full size. It carries the "AFTER HOURS" tagline,
  the "TECHNO THROWBACK" strap, date, venue and prices. Source of truth for the
  visual identity and the door price.
- **Site icon / link preview** (2026-08-30): user supplied `hero.jpg`
  (2000×2000 "club 2000" wordmark on a starfield + pink perspective grid).
  Generated from it: `favicon.ico` (16/32/48/64), `icon-192.png`, `icon-512.png`,
  `apple-touch-icon.png`, and `og-image.jpg` (1200×630), all wired in the
  `<head>`. `hero.jpg` source is gitignored. NB: this asset leans on the
  synthwave grid / pink glow that DESIGN.md lists as anti-references for the page
  itself — kept because the client chose it as the brand icon; it does not appear
  in the page body.
- Techno-event cues in the hero: "NUIT TECHNO" eyebrow, an animated equalizer,
  and a "Techno — 130-142 BPM — mur de son" tag. **The BPM range is genre-generic,
  not a confirmed setlist fact** — adjust or drop if it should be specific.
- Hero **background video**: `club-hero.mp4` (2.8 MB, 1152×648, 24 fps, no audio,
  faststart) + `club-hero.jpg` poster (15 KB), both generated from the user's
  `test.mp4` (62 MB source — **safe to delete**). Wired via `data-src-mp4` /
  `data-poster` on `#heroVideo`. Plays muted/looped behind the wordmark under a
  dark filter (grayscale + brightness + vignette + bottom fade); pauses when the
  hero scrolls out of view or the tab is hidden; off under `prefers-reduced-motion`.
  To swap the video, re-encode to the same filename. Clearing `data-src-mp4`
  reverts to the gradient background with zero errors.
- **The site is bilingual FR / EN** with a toggle in the nav. FR is the default;
  first visit follows the browser language; the choice persists in localStorage
  (`club2000:lang`). Every visible string has a key in `I18N` (main.js) — new
  copy must be added in both languages.
- Still placeholder: ticketing URL, the CLUB 2000 brand's own Instagram /
  SoundCloud / contact email in the footer. Do not invent these. (The two DJs'
  own links are now real — see the line-up entry above.)
- The "éditions précédentes" section was removed at the user's request.
- `club2000.png` is ~4.7 MB and needs compression before launch.
- Language is Québécois French throughout.

## Brand Commitments

- Name and wordmark: **CLUB 2000** (rendered `CLUB` + bold `2000`).
- Language: Québécois French. Copy tone is direct and no-nonsense
  ("Zéro jugement.", "Prévois le coup avant de passer les portes.").
- **Theme: Y2K / throwback-2000s.** The site must immediately read as (a) the
  promotion of **techno events** and (b) a **2000s throwback** — a modern,
  high-gloss revival of early-2000s rave culture, not 80s synthwave.
- Modern execution with dynamic, animation-heavy interaction is a requirement,
  not a nice-to-have.
- **Poster / flyer** (clean version `After Hours.png` → web `after-hours.jpg`,
  2026-08-30; the earlier `examplejpg.jpg` was a photo of a screen). Fully
  **monochrome electric-blue on deep navy** — zero pink/warmth — with bold
  condensed techno lettering ("TECHNO THROWBACK", "AFTER HOURS"), a dot-halftone
  wave, wireframe hexes, liquid-chrome panel and stacked ghost type. The site's
  palette, display font, **composite background** and the door price were all
  keyed to it. The flyer itself is embedded in `#billets`. Still open: whether
  "AFTER HOURS" should also appear in the hero / nav copy (currently "Y2K RAVE").

### Superseded (2026-08-29) — anti-references, do not reinstate

- The `club2000.png` logo is **no longer a binding asset**; the user explicitly
  dropped it. It may be used or replaced freely.
- The current visual world is **rejected by the user** ("ce n'est pas la vision
  que j'avais", "on dirait quelque chose de rétro"): the neon perspective-grid
  floor, Fredoka, the synthwave gradient sky, soft pink glows, rounded pills.
  Treat all of it as what NOT to do.
- Earlier init answers that pinned the logo, the grid aesthetic, and
  Fredoka/Space Grotesk are withdrawn.

## Evidence on Hand

- Real: the logo (`club2000.png`), the numbered-edition concept, the door policy,
  the current edition's date/time/venue, the FAQ answers.
- Real: the two DJs' names, bios, styles, gig history and links (from `DJ/`).
- Not yet available (do not fabricate): ticketing link, the CLUB 2000 brand's own
  Instagram/SoundCloud URLs and contact email (`hello@club2000.example` is a
  placeholder), past-edition photography.

## Product Principles

1. The ticket is the goal — every section should move a phone visitor toward
   buying, and the ticket CTA is never more than a scroll away.
2. Keep the door rules unmissable: 18+, photo ID, non-refundable (re-entry is
   allowed). Under-briefed attendees at the door are a failure.
3. The venue address is public and easy to find; the day-before email adds
   access detail, it does not gate the location.
4. Stay buildless and portable; anyone should be able to update an edition by
   editing marked blocks, with no toolchain.
5. Motion is atmosphere, never a tax — it must degrade cleanly on reduced-motion
   and on low-power phones.

## Accessibility & Inclusion

No formal standard was set by the user. Existing baseline to preserve: full
`prefers-reduced-motion` support, semantic landmarks, `sr-only` H1, ARIA on the
nav toggle and live countdown note. Treat WCAG AA contrast as the working target
given the dark palette and pink accents.
