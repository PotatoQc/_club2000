/* ============================================================
   CLUB 2000 — HALLOWEEN PARTY · interactions
   Bilingue FR / EN, compte à rebours, nav, révélations,
   défilement cinétique. Tout ce qui bouge respecte
   prefers-reduced-motion.
   ============================================================ */

const CONFIG = {
  // ✏️ Format ISO 8601, -04:00 = heure de l'Est (été)
  eventDate: '2026-10-23T22:00:00-04:00',
  // ✏️ URL de billetterie externe. PRIORITAIRE si renseignée (ouvre un onglet).
  //    Sinon, le widget Hi.Events intégré dans #billets prend le relais et les
  //    boutons « billet » y renvoient. Vide + pas de widget = bouton désactivé.
  ticketUrl: '',
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────
   INTRO — rideau de chargement : une barre se remplit,
   puis le panneau se lève. Débloque le reste du site via
   l'événement `club2000:ready`. Filet de sécurité CSS +
   minuterie si le chargement traîne.
   ───────────────────────────────────────────── */
(function intro() {
  const el = document.getElementById('intro');
  if (!el) return;
  const fill = document.getElementById('introFill');
  const count = document.getElementById('introCount');

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.classList.add('is-out');
    document.body.classList.remove('intro-lock');
    document.dispatchEvent(new Event('club2000:ready'));
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    setTimeout(() => { if (el.isConnected) el.remove(); }, 1400);
  };

  if (reduceMotion) { el.remove(); return; }

  document.body.classList.add('intro-lock');
  const startedAt = performance.now();
  let p = 0;
  const step = () => {
    const elapsed = performance.now() - startedAt;
    const target = document.readyState === 'complete' ? 100 : 90;
    p += (target - p) * 0.07;
    if (fill) fill.style.transform = `scaleX(${(p / 100).toFixed(3)})`;
    if (count) count.textContent = String(Math.min(100, Math.round(p))).padStart(2, '0');
    if (p > 99 && elapsed > 700) return finish();
    if (elapsed > 2600) return finish(); // filet de sécurité
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
})();

/* ─────────────────────────────────────────────
   I18N — dictionnaire FR / EN
   ───────────────────────────────────────────── */
const I18N = {
  fr: {
    meta_title: 'CLUB 2000 — HALLOWEEN PARTY · Montréal',
    meta_desc: 'CLUB 2000 présente HALLOWEEN PARTY au Red Room : Jason & Michael Mayers aux platines. Vendredi 23 octobre 2026, de 22 h à 3 h, Montréal.',
    nav_night: 'Soirée', nav_dj: 'DJ', nav_info: 'Infos', nav_faq: 'FAQ', nav_tickets: 'Billets',
    nav_open: 'Ouvrir le menu', nav_close: 'Fermer le menu',
    lang_aria: 'Switch to English',
    hero_eyebrow: 'CLUB 2000 présente',
    hero_sub: 'Ven 23 oct · 22:00 → 03:00<br /><b>Red Room</b> · 2037 Saint-Denis',
    hero_dj: '<span>&gt; aux platines</span> Jason <em>&amp;</em> Michael Mayers',
    hero_cta_primary: 'Billets dès 10 $',
    hero_cta_secondary: 'Les DJ',
    next_kicker: 'La soirée',
    next_sub: 'présenté par CLUB 2000',
    cd_days: 'jours', cd_hours: 'heures', cd_min: 'min', cd_sec: 'sec',
    cd_note_days: 'Plus que {n} jours avant la nuit.',
    cd_note_1day: 'Plus qu’un jour.',
    cd_note_hours: 'Plus que quelques heures.',
    cd_note_live: "C'est ce soir. On se voit sur le dancefloor.",
    fact_venue: 'Lieu', fact_venue_sub: 'Quartier latin · métro Sherbrooke',
    fact_doors: 'Portes', fact_doors_val: '22 h — 03 h', fact_doors_sub: 'Système son grand format',
    fact_access: 'Accès', fact_access_val: '18 + · pièce d’identité', fact_access_sub: 'Entrées et sorties permises',
    perk_text: 'Cadeau garanti aux 30 premières personnes arrivées.',
    next_cta: 'Prendre un billet',
    dj_kicker: 'DJ',
    dj_title: 'Un seul duo, <em>toute la nuit</em>',
    dj_lab: '&gt; DJ de la soirée',
    dj_when: 'Aux platines de 22 h à 03 h. Personne d’autre.',
    dj_alt: 'Jason et Michael Mayers',
    dj_flyer: 'Voir le flyer DJ',
    dj_flyer_alt: 'Flyer DJ — Jason & Michael Mayers, 23 octobre, Red Room',
    info_kicker: 'Infos pratiques',
    info_title: "Tout ce qu'il <em>faut savoir</em>",
    info_1_h: 'Date & horaire', info_1_p: 'Vendredi 23 octobre 2026. Portes à 22 h, fin à 03 h.',
    info_2_h: 'Emplacement', info_2_p: 'Red Room, 2037 rue Saint-Denis, Montréal — Quartier latin, à 3 min du métro Sherbrooke.',
    info_3_h: 'Accès', info_3_p: 'Événement 18 +. Pièce d’identité avec photo obligatoire. Entrées et sorties permises toute la nuit.',
    info_4_h: 'Sur place', info_4_p: 'Vestiaire, bar, point d’eau gratuit. Système son grand format. Cadeau aux 30 premières personnes. Zéro jugement.',
    tickets_kicker: 'Billets',
    tickets_title: 'Entre au <em>Red Room</em>',
    poster_tag: 'Flyer',
    poster_alt: 'Flyer HALLOWEEN PARTY — CLUB 2000, 23 octobre, Red Room, 2037 rue Saint-Denis, Montréal',
    poster_aria: 'Ouvrir le flyer en plein écran',
    tier_online: '1re vague', tier_online_tag: 'En vente',
    tier_door: 'Vagues suivantes', tier_door_tag: 'Le prix monte',
    tickets_cta: 'Acheter un billet',
    tickets_soon: 'Billetterie bientôt',
    tickets_fine: 'Quantité limitée · 18 + · non remboursable · billet transférable',
    faq_kicker: 'FAQ',
    faq_title: 'Questions <em>fréquentes</em>',
    faq_1_q: "Où se passe l'événement ?",
    faq_1_a: "Au Red Room, 2037 rue Saint-Denis, à Montréal, dans le Quartier latin — à quelques pas du métro Sherbrooke. Les consignes d'accès sont envoyées par courriel aux détenteurs de billets la veille.",
    faq_2_q: "Quel est l'âge minimum ?",
    faq_2_a: "18 ans et plus. Une pièce d'identité avec photo est exigée à l'entrée, sans exception.",
    faq_3_q: 'Puis-je sortir et revenir ?',
    faq_3_a: 'Oui. Tu peux sortir et revenir librement pendant la nuit — garde ton billet ou ton bracelet sur toi.',
    faq_4_q: 'Comment je rentre chez moi à 3 h ?',
    faq_4_a: 'À 3 h le métro ne roule pas encore (premier passage vers 05 h 30). Les taxis et VTC couvrent le secteur toute la nuit, et le réseau de bus de nuit de la STM dessert le Quartier latin.',
    faq_5_q: "Le cadeau des 30 premiers, c'est quoi ?",
    faq_5_a: "Une surprise CLUB 2000 remise à l'entrée aux 30 premières personnes arrivées. Arrive tôt.",
    faq_6_q: 'Les billets sont-ils remboursables ?',
    faq_6_a: 'Non, mais ils sont transférables. Écris-nous pour changer le nom sur un billet.',
    foot_line: "Promoteur d'événements techno — Montréal · depuis l'an 2000",
    foot_email: 'Courriel',
    foot_rights: 'Tous droits réservés',
  },
  en: {
    meta_title: 'CLUB 2000 — HALLOWEEN PARTY · Montreal',
    meta_desc: 'CLUB 2000 presents HALLOWEEN PARTY at Red Room: Jason & Michael Mayers on the decks. Friday, October 23, 2026, 10 PM to 3 AM, Montreal.',
    nav_night: 'Night', nav_dj: 'DJs', nav_info: 'Info', nav_faq: 'FAQ', nav_tickets: 'Tickets',
    nav_open: 'Open menu', nav_close: 'Close menu',
    lang_aria: 'Passer en français',
    hero_eyebrow: 'CLUB 2000 presents',
    hero_sub: 'Fri Oct 23 · 10 PM → 3 AM<br /><b>Red Room</b> · 2037 Saint-Denis',
    hero_dj: '<span>&gt; on the decks</span> Jason <em>&amp;</em> Michael Mayers',
    hero_cta_primary: 'Tickets from $10',
    hero_cta_secondary: 'The DJs',
    next_kicker: 'The night',
    next_sub: 'presented by CLUB 2000',
    cd_days: 'days', cd_hours: 'hours', cd_min: 'min', cd_sec: 'sec',
    cd_note_days: '{n} days until the night.',
    cd_note_1day: 'One day left.',
    cd_note_hours: 'Just a few hours left.',
    cd_note_live: "It's tonight. See you on the floor.",
    fact_venue: 'Venue', fact_venue_sub: 'Latin Quarter · Sherbrooke station',
    fact_doors: 'Doors', fact_doors_val: '10 PM — 3 AM', fact_doors_sub: 'Large-format sound system',
    fact_access: 'Access', fact_access_val: '18+ · photo ID', fact_access_sub: 'Re-entry allowed',
    perk_text: 'Free gift for the first 30 people through the door.',
    next_cta: 'Get a ticket',
    dj_kicker: 'DJs',
    dj_title: 'One duo, <em>all night</em>',
    dj_lab: '&gt; Tonight’s DJs',
    dj_when: 'On the decks from 10 PM to 3 AM. Nobody else.',
    dj_alt: 'Jason and Michael Mayers',
    dj_flyer: 'See the DJ flyer',
    dj_flyer_alt: 'DJ flyer — Jason & Michael Mayers, October 23, Red Room',
    info_kicker: 'Practical info',
    info_title: 'Everything you <em>need to know</em>',
    info_1_h: 'Date & time', info_1_p: 'Friday, October 23, 2026. Doors at 10 PM, ends at 3 AM.',
    info_2_h: 'Location', info_2_p: 'Red Room, 2037 rue Saint-Denis, Montreal — Latin Quarter, 3 min from Sherbrooke station.',
    info_3_h: 'Access', info_3_p: '18+ event. Government photo ID required at the door. Re-entry allowed all night.',
    info_4_h: 'On site', info_4_p: 'Coat check, bar, free water station. Large-format sound system. Gift for the first 30 people. Zero judgement.',
    tickets_kicker: 'Tickets',
    tickets_title: 'Step into <em>Red Room</em>',
    poster_tag: 'Flyer',
    poster_alt: 'HALLOWEEN PARTY flyer — CLUB 2000, October 23, Red Room, 2037 rue Saint-Denis, Montréal',
    poster_aria: 'Open the flyer full screen',
    tier_online: 'Wave 1', tier_online_tag: 'On sale',
    tier_door: 'Next waves', tier_door_tag: 'Price goes up',
    tickets_cta: 'Buy a ticket',
    tickets_soon: 'Tickets coming soon',
    tickets_fine: 'Limited quantity · 18+ · non-refundable · transferable',
    faq_kicker: 'FAQ',
    faq_title: 'Frequent <em>questions</em>',
    faq_1_q: 'Where is the event?',
    faq_1_a: 'At Red Room, 2037 rue Saint-Denis, Montreal, in the Latin Quarter — steps from Sherbrooke station. Access instructions are emailed to ticket holders the day before.',
    faq_2_q: 'What is the minimum age?',
    faq_2_a: '18 and over. Government photo ID is required at the door, no exceptions.',
    faq_3_q: 'Can I leave and come back?',
    faq_3_a: 'Yes. You can come and go freely during the night — just keep your ticket or wristband on you.',
    faq_4_q: 'How do I get home at 3 AM?',
    faq_4_a: "At 3 AM the metro isn't running yet (first train around 5:30 AM). Taxis and rideshares cover the area all night, and the STM night bus network serves the Latin Quarter.",
    faq_5_q: "What's the gift for the first 30?",
    faq_5_a: 'A CLUB 2000 surprise handed out at the door to the first 30 people to arrive. Come early.',
    faq_6_q: 'Are tickets refundable?',
    faq_6_a: 'No, but they are transferable. Email us to change the name on a ticket.',
    foot_line: 'Techno event promoter — Montreal · since the year 2000',
    foot_email: 'Email',
    foot_rights: 'All rights reserved',
  },
};

const langListeners = [];
let currentLang = 'fr';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.fr[key] ?? key);
}

function applyLang(lang) {
  if (!I18N[lang]) lang = 'fr';
  currentLang = lang;
  try { localStorage.setItem('club2000:lang', lang); } catch (e) { /* private mode */ }

  document.documentElement.lang = lang;
  document.title = t('meta_title');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const val = I18N[lang][key];
    if (val == null) return;
    const attr = el.dataset.i18nAttr;
    if (attr) el.setAttribute(attr, val);
    else el.innerHTML = val; // chaînes de confiance (aucune saisie utilisateur)
  });

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.textContent = lang === 'fr' ? 'EN' : 'FR';
    toggle.setAttribute('aria-label', t('lang_aria'));
  }

  langListeners.forEach((fn) => fn(lang));
}

(function langSetup() {
  let stored;
  try { stored = localStorage.getItem('club2000:lang'); } catch (e) { /* ignore */ }
  const nav = (navigator.language || 'fr').toLowerCase();
  const initial = stored || (nav.startsWith('en') ? 'en' : 'fr');

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => applyLang(currentLang === 'fr' ? 'en' : 'fr'));
  }
  applyLang(initial);
})();

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */
(function nav() {
  const bar = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const scrim = document.getElementById('navScrim');
  if (!bar) return;

  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    bar.classList.toggle('scrolled', y > 12);
    // rétraction directionnelle — jamais quand le menu mobile est ouvert
    if (!links || !links.classList.contains('open')) {
      if (y > 260 && y > lastY + 3) bar.classList.add('nav-hidden');
      else if (y < lastY - 3 || y < 260) bar.classList.remove('nav-hidden');
    }
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('open', open);
      if (open) bar.classList.remove('nav-hidden');
      if (scrim) scrim.classList.toggle('on', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? t('nav_close') : t('nav_open'));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    if (scrim) scrim.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    // garde l'aria-label du bouton cohérent avec la langue
    langListeners.push(() => {
      const open = links.classList.contains('open');
      toggle.setAttribute('aria-label', open ? t('nav_close') : t('nav_open'));
    });
  }
})();

/* ─────────────────────────────────────────────
   MOTION ENGINE — défilement à inertie (Lenis),
   parallaxe. Inspiré de la sensation de lusion.co ; aucun WebGL.
   (Boutons « magnétiques » qui suivaient la souris : retirés le
   2026-10-12 à la demande du client.)
   Une seule boucle rAF, tout coupé sous reduced-motion.
   ───────────────────────────────────────────── */
(function motionEngine() {
  const bar = document.getElementById('scrollBar');

  const setProgress = () => {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${(max > 0 ? window.scrollY / max : 0).toFixed(4)})`;
  };

  /* ---- défilement natif si reduced-motion ---- */
  if (reduceMotion) {
    setProgress();
    let q = false;
    window.addEventListener('scroll', () => {
      if (q) return; q = true;
      requestAnimationFrame(() => { setProgress(); q = false; });
    }, { passive: true });
    window.addEventListener('resize', setProgress);
    return;
  }

  /* ---- Lenis : inertie + smooth scroll (instancié après l'intro) ---- */
  let lenis = null;
  // liens d'ancrage → scroll piloté (Lenis si présent, sinon natif)
  document.addEventListener('click', (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const tgt = document.querySelector(id);
    if (!tgt) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(tgt, { offset: -80 });
    else tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const lerp = (a, b, n) => a + (b - a) * n;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ---- parallaxe à inertie : chaque couche rattrape sa cible avec du lag ---- */
  const docTop = (el) => { let t = 0; while (el) { t += el.offsetTop; el = el.offsetParent; } return t; };
  const layers = [...document.querySelectorAll('[data-speed]')].map((el) => ({
    el, speed: parseFloat(el.dataset.speed) || 0, cur: 0, top: 0, h: 0,
  }));
  const measure = () => layers.forEach((l) => { l.top = docTop(l.el); l.h = l.el.offsetHeight; });
  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);

  /* ---- héro : sortie cinétique au scroll (le contenu s'élève et s'efface,
         le fond — image ou vidéo — zoome légèrement) ---- */
  const heroContent = document.querySelector('.hero-content');
  const heroVideoEl = document.querySelector('.hero-video > img, #heroVideo');
  let heroFade = 0;

  const raf = (time) => {
    if (lenis) lenis.raf(time);

    const y = window.scrollY;
    setProgress();
    const vh = window.innerHeight;

    // héro — actif seulement dans la zone de transition (haut de page)
    if (heroContent && (y < vh || heroFade > 0.003)) {
      const hp = clamp(y / (vh * 0.85), 0, 1);
      heroFade = lerp(heroFade, hp, 0.12);
      const on = heroFade > 0.003;
      heroContent.style.transform = on ? `translateY(${(heroFade * 64).toFixed(1)}px)` : '';
      heroContent.style.opacity = on ? Math.max(0, 1 - heroFade * 1.15).toFixed(3) : '';
      if (heroVideoEl) heroVideoEl.style.transform = on ? `scale(${(1 + heroFade * 0.12).toFixed(4)})` : '';
    }

    // parallaxe : cible = distance au centre du viewport × vitesse, rattrapée en douceur
    for (const l of layers) {
      const fromCenter = (l.top + l.h / 2 - y) - vh / 2;
      l.cur = lerp(l.cur, clamp(fromCenter * l.speed, -160, 160), 0.085);
      l.el.style.translate = `0 ${l.cur.toFixed(2)}px`;
    }

    requestAnimationFrame(raf);
  };

  const startLoop = () => {
    if (window.Lenis && !lenis) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.6 });
      window.__lenis = lenis;
    }
    measure();
    requestAnimationFrame(raf);
  };

  // attend la fin de l'intro pour ne rien calculer sous le rideau
  if (document.getElementById('intro')) document.addEventListener('club2000:ready', startLoop, { once: true });
  else startLoop();
})();

/* ─────────────────────────────────────────────
   HÉRO — montée à l'arrivée
   ───────────────────────────────────────────── */
(function heroRise() {
  const items = document.querySelectorAll('[data-rise]');
  if (!items.length) return;
  if (reduceMotion) { items.forEach((el) => el.classList.add('up')); return; }
  const run = () => items.forEach((el, i) => setTimeout(() => el.classList.add('up'), i * 100));
  // enchaîne après le lever du rideau ; sinon démarre tout de suite
  if (document.getElementById('intro')) document.addEventListener('club2000:ready', run, { once: true });
  else run();
})();

/* ─────────────────────────────────────────────
   RÉVÉLATIONS AU SCROLL
   ───────────────────────────────────────────── */
(function reveals() {
  const sections = document.querySelectorAll('.reveal');
  const items = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    sections.forEach((s) => s.classList.add('in'));
    items.forEach((i) => i.classList.add('shown'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  sections.forEach((s) => io.observe(s));

  const ioItems = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('shown');
      ioItems.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  items.forEach((i) => ioItems.observe(i));
})();

/* ─────────────────────────────────────────────
   TYPO CINÉTIQUE — révélation mot à mot / ligne à ligne
   (masque + montée + flou), déclenchée au scroll.
   ───────────────────────────────────────────── */
(function splitText() {
  const words = document.querySelectorAll('[data-split]');
  const lines = document.querySelectorAll('[data-lines]');

  const wrapWords = (root) => {
    const out = [];
    root.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((chunk) => {
          if (chunk.trim() === '') { out.push(document.createTextNode(chunk)); return; }
          const w = document.createElement('span');
          w.className = 'word';
          const inner = document.createElement('span');
          inner.textContent = chunk;
          w.appendChild(inner);
          out.push(w);
        });
      } else if (node.nodeType === 1) {
        // conserve <em> etc. comme un seul mot coloré
        const w = document.createElement('span');
        w.className = 'word';
        const inner = document.createElement('span');
        inner.appendChild(node.cloneNode(true));
        w.appendChild(inner);
        out.push(w);
      }
    });
    root.textContent = '';
    out.forEach((n) => root.appendChild(n));
    root.querySelectorAll('.word > span').forEach((s, i) => {
      s.style.transitionDelay = `${(i * 55)}ms`;
    });
  };

  const wrapLines = (root) => {
    root.querySelectorAll(':scope > span').forEach((span, i) => {
      const mask = document.createElement('span');
      mask.className = 'lmask';
      root.insertBefore(mask, span);
      mask.appendChild(span);
      span.style.transitionDelay = `${i * 90}ms`;
    });
  };

  words.forEach(wrapWords);
  lines.forEach(wrapLines);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    [...words, ...lines].forEach((el) => el.classList.add('shown'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('shown');
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  [...words, ...lines].forEach((el) => io.observe(el));

  // applyLang() réécrit innerHTML → on redécoupe et on révèle ce qui est déjà à l'écran
  langListeners.push(() => {
    words.forEach((el) => {
      if (el.querySelector('.word')) return;
      wrapWords(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('shown');
    });
  });
})();

/* ─────────────────────────────────────────────
   COMPTE À REBOURS
   ───────────────────────────────────────────── */
(function countdown() {
  const target = new Date(CONFIG.eventDate).getTime();
  if (Number.isNaN(target)) return;

  const grid = document.getElementById('countdown');
  const note = document.getElementById('cdNote');
  const cells = {
    d: document.getElementById('cdDays'),
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMin'),
    s: document.getElementById('cdSec'),
  };
  if (!cells.d) return;

  const pad = (n) => String(n).padStart(2, '0');
  const set = (el, val, animate) => {
    if (!el || el.textContent === val) return;
    el.textContent = val;
    if (animate && !reduceMotion) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
  };

  let lastDays = null;
  let done = false;

  const renderNote = () => {
    if (!note) return;
    if (done) { note.textContent = t('cd_note_live'); return; }
    if (lastDays == null) return;
    note.textContent = lastDays > 1
      ? t('cd_note_days').replace('{n}', lastDays)
      : lastDays === 1 ? t('cd_note_1day') : t('cd_note_hours');
  };
  langListeners.push(renderNote);

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(cells).forEach((c) => c && (c.textContent = '00'));
      grid && grid.classList.add('is-live');
      done = true;
      renderNote();
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    set(cells.d, pad(days), true);
    set(cells.h, pad(hours), true);
    set(cells.m, pad(mins), true);
    set(cells.s, pad(secs), false);

    lastDays = days;
    renderNote();
  };

  tick();
  const timer = setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────────
   FAQ — une seule réponse ouverte
   ───────────────────────────────────────────── */
(function faq() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.addEventListener('toggle', (e) => {
    if (e.target.open) {
      list.querySelectorAll('details[open]').forEach((d) => { if (d !== e.target) d.open = false; });
    }
  }, true);
})();

/* ─────────────────────────────────────────────
   BILLETTERIE
   ───────────────────────────────────────────── */
(function tickets() {
  const links = document.querySelectorAll('[data-ticket-link]');
  const url = CONFIG.ticketUrl.trim();
  const hasWidget = !!document.querySelector('.hievents-widget');

  const render = () => {
    links.forEach((a) => {
      if (url) {
        // billetterie externe → nouvel onglet
        a.href = url; a.target = '_blank'; a.rel = 'noopener';
        a.classList.remove('is-soon'); a.removeAttribute('aria-disabled');
        a.textContent = t(a.dataset.i18n || 'tickets_cta');
      } else if (hasWidget) {
        // billetterie intégrée → le bouton descend vers le widget (#billets)
        a.href = '#billets'; a.removeAttribute('target'); a.removeAttribute('rel');
        a.classList.remove('is-soon'); a.removeAttribute('aria-disabled');
        a.textContent = t(a.dataset.i18n || 'tickets_cta');
      } else {
        a.classList.add('is-soon');
        a.setAttribute('aria-disabled', 'true');
        a.textContent = t('tickets_soon');
      }
    });
  };
  render();
  langListeners.push(render);
})();

/* ─────────────────────────────────────────────
   VIDÉO D'AMBIANCE — lecture douce, coupée si reduced-motion
   ou onglet masqué ; silencieuse si le fichier est absent
   ───────────────────────────────────────────── */
(function heroVideo() {
  const v = document.getElementById('heroVideo');
  if (!v || reduceMotion) { v && v.removeAttribute('autoplay'); return; }

  const webm = v.dataset.srcWebm;
  const mp4 = v.dataset.srcMp4;
  if (!mp4 && !webm) return; // pas de vidéo configurée

  if (v.dataset.poster) v.poster = v.dataset.poster;

  // connexion lente / économie de données → on s'en tient au poster
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|\b)(slow-2g|2g)$/.test(conn.effectiveType || ''))) {
    v.removeAttribute('autoplay');
    return;
  }
  const add = (src, type) => { const s = document.createElement('source'); s.src = src; s.type = type; v.appendChild(s); };
  if (webm) add(webm, 'video/webm');
  if (mp4) add(mp4, 'video/mp4');
  v.preload = 'auto';
  v.load();

  let inView = true;
  const play = () => { if (inView && !document.hidden) v.play().catch(() => {}); };
  v.addEventListener('loadeddata', () => {
    if (v.videoWidth > 0) v.parentElement.classList.add('has-video');
  });
  v.addEventListener('error', () => { v.parentElement.classList.remove('has-video'); }, true);
  play();
  document.addEventListener('visibilitychange', () => { if (document.hidden) v.pause(); else play(); });

  // ne pas décoder la vidéo quand le hero n'est plus visible
  const hero = document.getElementById('top');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((e) => {
      inView = e[0].isIntersecting;
      if (inView) play(); else v.pause();
    }, { threshold: 0.01 }).observe(hero);
  }
})();

/* ─────────────────────────────────────────────
   TICKER — remplit la piste d'assez de copies pour boucler
   sans vide, quelle que soit la largeur ou la langue.
   En mouvement : la vitesse et le sens suivent l'élan du
   scroll (inspiré des rubans de hobro.digital). Sinon,
   simple boucle CSS.
   ───────────────────────────────────────────── */
(function ticker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const unit = track.querySelector('.ticker-set');
  if (!unit) return;
  const unitHTML = unit.outerHTML;
  let halfW = 0;

  const syncLang = () => {
    track.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = I18N[currentLang] && I18N[currentLang][el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
  };

  const container = () => track.parentElement || document.body;
  let lastCW = -1;

  // mesure une copie hors-flux : la piste en cours n'est jamais détruite
  // avant d'avoir un résultat valide (sinon un resize raté la laisse cassée).
  const measureSet = () => {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;left:-99999px;top:0;display:flex;visibility:hidden;pointer-events:none;white-space:nowrap';
    probe.innerHTML = unitHTML;
    container().appendChild(probe);
    const w = probe.firstElementChild ? probe.firstElementChild.getBoundingClientRect().width : 0;
    probe.remove();
    return w;
  };

  let offset = 0;   // position courante (partagée avec la boucle JS)
  let halfWReady = false;

  const build = (force) => {
    const cw = container().clientWidth || window.innerWidth;
    if (!force && cw === lastCW && track.children.length > 2) { syncLang(); return; }
    const setW = measureSet();
    if (setW < 40) { requestAnimationFrame(() => build(true)); return; } // mesure invalide → réessaie
    lastCW = cw;
    // assez de copies pour couvrir DEUX fois l'écran : marge large, jamais de vide
    const perHalf = Math.max(2, Math.ceil(cw / setW) + 1);
    track.innerHTML = unitHTML.repeat(perHalf * 2); // deux moitiés identiques → boucle invisible
    syncLang();
    halfW = setW * perHalf;
    halfWReady = true;
    offset = ((offset % halfW) + halfW) % halfW;
    // fallback CSS : durée ∝ nombre de copies → vitesse constante
    track.style.setProperty('--ticker-dur', (perHalf * 17) + 's');
  };

  build(true);
  langListeners.push(() => build());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => build(true));

  let rz = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(() => build());
  }, { passive: true });

  if (reduceMotion) return; // la boucle CSS suffit

  /* ---- prise en main JS : le ruban réagit à l'élan du scroll ---- */
  track.style.animation = 'none';   // build() ne retouche plus `animation` → tient
  const BASE = 46;       // px/s au repos
  const BOOST = 640;     // px/s ajoutés à pleine vitesse
  let speed = BASE, dir = 1, running = true, paused = false;
  let last = performance.now();
  let lastY = window.scrollY, fallbackVel = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    fallbackVel = y - lastY;
    lastY = y;
  }, { passive: true });

  const band = track.parentElement;
  // hover uniquement — `mouseenter` ne se déclenche pas sur un tap tactile
  band.addEventListener('mouseenter', () => { paused = true; });
  band.addEventListener('mouseleave', () => { paused = false; });

  const loop = (now) => {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    const lv = (window.__lenis && typeof window.__lenis.velocity === 'number')
      ? window.__lenis.velocity : fallbackVel;
    const mag = Math.min(1, Math.abs(lv) / 55);
    let target = paused ? 0 : BASE + BOOST * mag;
    speed += (target - speed) * 0.06;
    // sens normal = vers la gauche ; le scroll vers le haut l'inverse en douceur
    const targetDir = lv < -3 ? -1 : 1;
    dir += (targetDir - dir) * 0.05;

    if (halfWReady && halfW > 0) {
      offset = (((offset + speed * dt * dir) % halfW) + halfW) % halfW;
      track.style.transform = `translateX(${(-offset).toFixed(2)}px)`;
    }

    fallbackVel *= 0.82;
    requestAnimationFrame(loop);
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e) => {
      const vis = e[0].isIntersecting;
      if (vis && !running) {
        running = true; last = performance.now(); fallbackVel = 0;
        requestAnimationFrame(loop);
      } else {
        running = vis;
      }
    }, { threshold: 0 }).observe(band);
  }
  requestAnimationFrame(loop);
})();

/* ─────────────────────────────────────────────
   BRUME VIVANTE — nappe de bruit fractal déformé (fbm +
   déformation de domaine) rendue dans un <canvas> minuscule,
   puis étirée et floutée en CSS. On veut sentir l'air d'un
   sous-sol qui bouge sous le système son. Inspiré du canvas
   « courant d'encre » de santionispirits.com.
     • ~30 ips, backing store ≤ 190×140 px (le flou masque tout)
     • surveille son coût sur les 80 premières images rendues :
       si l'appareil ne suit pas, gèle sur la dernière (reste
       une texture crédible plutôt qu'un fond mort)
     • onglet caché : pause. Mouvement réduit : une seule image.
     • sans JS : le dégradé `.bg-grad` suffit.
   ───────────────────────────────────────────── */
(function bgHaze() {
  const cv = document.getElementById('bgHaze');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  if (!ctx) return;

  let W = 0, H = 0, img = null, buf = null;
  const resize = () => {
    const long = Math.max(window.innerWidth, window.innerHeight);
    const w = Math.round(Math.min(160, Math.max(64, long / 10)));
    const h = Math.min(120, Math.round(w * (window.innerHeight / Math.max(1, window.innerWidth))));
    if (w === W && h === H) return;
    W = w; H = h; cv.width = W; cv.height = H;
    img = ctx.createImageData(W, H);
    buf = img.data;
  };
  resize();

  /* bruit de valeur + fbm — hash entier, sans table mémoire */
  const hash = (x, y) => {
    let h = (x * 374761393 + y * 668265263) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  const vnoise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const u = smooth(x - xi), v = smooth(y - yi);
    const a = hash(xi, yi), b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const fbm = (x, y) => {
    let f = 0, amp = 0.5, freq = 1;
    for (let o = 0; o < 3; o++) { f += amp * vnoise(x * freq, y * freq); freq *= 2.03; amp *= 0.5; }
    return f;
  };

  // brume orange citrouille (thème Halloween) — l'ancien bleu : [4,6,14] [15,32,82] [96,142,232]
  const LO = [6, 4, 3], MID = [62, 24, 6], HI = [196, 90, 26];

  const render = (t) => {
    const flow = t * 0.000022;                        // dérive lente des courants
    const swell = 0.88 + 0.12 * Math.sin(t * 0.00042); // respiration très lente
    let i = 0;
    for (let y = 0; y < H; y++) {
      const ny = y / H;
      const vgrad = 1 - Math.pow(Math.abs(ny - 0.44) * 2, 1.7) * 0.52; // assombrit haut/bas
      for (let x = 0; x < W; x++) {
        const nx = x / W;
        const wx = fbm(nx * 2.6 + flow, ny * 2.6 + 11.3);
        const wy = fbm(nx * 2.6 + 5.1, ny * 2.6 - flow * 0.6 + 7.7);
        let n = fbm(nx * 2.7 + wx * 2.3 + flow, ny * 2.0 + wy * 2.3);
        n = (n - 0.46) * 2.7;
        n = n < 0 ? 0 : n > 1 ? 1 : n;
        n = n * n * (3 - 2 * n);
        const k = n * vgrad * swell;
        let r, g, b;
        if (k < 0.5) { const s = k * 2; r = LO[0] + (MID[0] - LO[0]) * s; g = LO[1] + (MID[1] - LO[1]) * s; b = LO[2] + (MID[2] - LO[2]) * s; }
        else { const s = (k - 0.5) * 2; r = MID[0] + (HI[0] - MID[0]) * s; g = MID[1] + (HI[1] - MID[1]) * s; b = MID[2] + (HI[2] - MID[2]) * s; }
        buf[i++] = r; buf[i++] = g; buf[i++] = b; buf[i++] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  };

  let raf = 0, last = 0, acc = 0, t0 = performance.now();
  let samples = 0, costSum = 0, frozen = false, paused = false, covered = true, rt = 0;
  const FRAME = 1000 / 24;
  // au repos tant que : onglet caché · survol du ruban · le hero couvre l'écran
  // (la brume est invisible derrière la vidéo — inutile de lui voler du CPU)
  const idle = () => paused || covered || document.hidden;

  const freeze = () => {
    if (frozen) return;
    frozen = true;
    cancelAnimationFrame(raf);
    cv.classList.add('is-frozen');
  };

  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    if (idle()) { last = now; acc = 0; return; }
    acc += Math.min(now - last, 100);
    last = now;
    if (acc < FRAME) return;
    acc = 0;
    const a = performance.now();
    render(now - t0);
    if (samples < 60) {
      samples++; costSum += performance.now() - a;
      if (samples === 60 && costSum / 60 > 10) freeze();
    }
  };

  const start = () => {
    if (frozen || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };

  // le hero (#top) couvre le fond ⇒ on ne calcule rien tant qu'il est visible
  const hero = document.getElementById('top');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((e) => {
      covered = e[0].isIntersecting && e[0].intersectionRatio > 0.2;
    }, { threshold: [0, 0.2, 0.5, 1] }).observe(hero);
  } else {
    covered = false;
  }

  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { resize(); if (idle() || frozen) render(performance.now() - t0); }, 200);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => { paused = document.hidden; });

  render(0); // une image tout de suite — jamais de trou noir
  if (reduceMotion) return;
  if (document.getElementById('intro')) document.addEventListener('club2000:ready', start, { once: true });
  else start();
})();

/* ─────────────────────────────────────────────
   ANNÉE
   ───────────────────────────────────────────── */
(function year() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
})();
