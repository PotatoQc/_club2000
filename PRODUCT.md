# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: hand-written static site — one `index.html`, one `style.css`,
one `main.js`. No build step, no framework. Deployable as a plain folder on any
static host (GitHub Pages, Netlify, Vercel). Keep it buildless unless the user
decides otherwise.

Runtime deps (script tags, no toolchain): Google Fonts (Michroma / Instrument
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
- Ambient motion (starfield, perspective grid, cursor glow, scroll reveals) must
  fully stop under `prefers-reduced-motion`.
- Current event is titled **Y2K RAVE**, presented by CLUB 2000. Confirmed:
  Saturday 12 September 2026, 22 h–04 h (six hours), at 2037 rue Saint-Denis,
  Montréal (Quartier latin, métro Sherbrooke).
- Door policy: 18+, photo ID. **Re-entry is allowed all night** (this reverses
  the earlier no-re-entry rule).
- **A free gift goes to the first 30 people to arrive** at the door.
- Line-up is **2 DJs**; each needs a profile photo, a short bio, and a few track
  links. Names/photos/bios/links are still placeholder.
- Tickets: **10 $ en ligne, 15 $ à la porte**. The online ticketing URL
  (`CONFIG.ticketUrl`) is not set yet — buttons show "Billetterie bientôt".
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
- Still placeholder: DJ names/photos/bios/track links, ticketing URL, real
  Instagram/SoundCloud handles, contact email. Do not invent these.
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
- Not yet available (do not fabricate): artist names, ticketing link, prices,
  Instagram/SoundCloud URLs, contact email (`hello@club2000.example` is a
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
