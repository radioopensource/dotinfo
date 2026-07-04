# Design & UX Audit — publicradio.info (`dotinfo`)

**Branch:** `refactor-2026` · **Date:** 2026-07-04
**Mandate:** additive polish only — accessibility, responsiveness, performance. **No redesign.**

## The aesthetic (protected — do not "fix")

This is a deliberate, playful Web-1.0 throwback and it works: coral fixed navbar, hot
color-blocked sections (cyan newscasts / periwinkle radio / orange podcasts / magenta
request / near-black about), yellow & green & lightblue item cards with **outset borders
that press inset on click** like real buttons, a spinning `?` while feeds load, dog-radio
and woman-radio placeholder gifs, a wireframe globe in the footer, custom `.cur` cursors
and ZXX fonts in the repo, Tinos (Times-alike) headings, and the `fontcraze` hover
animation. Every finding below is judged against one rule: **the site should look
exactly the same, just work for more people, on more devices, faster.**

There is **no build system** — plain static HTML/CSS/JS (GitHub Pages, Skeleton grid).
"Build" = serve the directory. Verified with a local HTTP server (see bottom).

---

## P0 — Broken in production (fixed on this branch)

1. **jQuery loaded over plain `http://` → all site JS dead on HTTPS.**
   `index.html` loaded `http://code.jquery.com/jquery-2.1.4.min.js`. On the HTTPS
   production site browsers block that as active mixed content, so jQuery never loads
   and *every* feature (newscasts, podcasts, streams, player, visitor count) dies.
   **Fixed:** self-hosted as `js/jquery-2.1.4.min.js` (also removes the third-party
   CDN dependency). ✅
2. **Loading spinner never spun.** `style-resp.css` animates `spin` but the keyframes
   were named `disabled`. Renamed keyframes to `spin` — the playful spinning `?`
   loading state now actually works as designed. ✅
3. **Malformed attribute** on the ad-policy link (`"target="_blank"` — stray quote).
   **Fixed.** ✅

## P1 — Accessibility (fixed on this branch)

4. **Playable items unreachable by keyboard.** Every newscast/stream/podcast card is a
   click-only `<li>`. Added `tabindex="0"` + `role="button"` and an Enter-to-play
   handler in `addEventHandlers` (Space is left alone — it's the site's global
   play/pause key). Disabled items are guarded. ✅
5. **No visible focus style.** Added `li:focus-visible` — a 3px dashed blue outline,
   the most Web-1.0 focus ring there is. ✅
6. **Missing `alt` text** on placeholder images and the footer globe. Added (first
   placeholder per section describes the loading state; duplicates get `alt=""` so
   screen readers skip them). ✅
7. **`prefers-reduced-motion`** now disables CSS animations (spinner, fontcraze) for
   users who opt out. Gifs still animate — acceptable; they're content here. ✅
8. **Tab-nabbing:** `target="_blank"` links got `rel="noopener"`. ✅
9. **Invalid `controls="controls"`** on `<source>` removed; `aria-label` on the player. ✅

## P2 — Performance (fixed on this branch)

10. **Footer globe hotlinked from Wikimedia** (~273 KB, third-party). Self-hosted as
    `assets/globe.gif` (CC-licensed, already credited). ✅
11. **Font loading:** added `&display=swap` to the Google Fonts URL — text renders
    immediately in fallback while Tinos loads. ✅
12. **`loading="lazy"`** on below-the-fold images. ✅

## Deferred — needs a decision or a later phase (NOT done)

- **API base URL** (`js/main.js:3`): `http://www.publicradioservices.info` — plain
  http (mixed-content-blocked on HTTPS, same failure mode as P0-1) *and* the old
  backend. **Deliberately untouched:** it gets pointed at the new AWS invoke URL
  after backend Phase 4, per plan. One-variable change.
- **jQuery 2.1.4 is EOL (2015)** with known XSS advisories in `$.parseHTML` paths.
  Upgrading to 3.x is low-effort but needs a behavior pass (deprecated APIs);
  do it when the backend rewire forces a full manual test anyway.
- **No `<h1>`** — page title is an `<h3>`, sections are `<h4>`. Correcting the
  hierarchy changes rendered sizes (Skeleton styles by element), so it's not a
  zero-risk change; revisit with explicit font-sizes if desired.
- **Contrast**: `#424242` body text on `#00ffff`/`orange`/`yellow` passes AA for
  normal text; hover white-on-blue passes. The magenta request section's
  `lightgrey` inputs are the weakest spot. No color changes without the owner —
  the palette *is* the brand.
- **`e.keyCode`** in the global key handler is deprecated but universally supported;
  swap for `e.key` opportunistically.
- **Unused ZXX font files** (~6 files in `fonts/`, never referenced by CSS) — ship
  weight only; harmless on a static host. Leave unless repo size matters.
- **Old-backend leftovers**: the request form posts to `/requests`, which the v2
  backend does not implement (v1 contract is newscasts/podcasts/visitor-count).
  Decide post-Phase-4: port the endpoint or retire the form.

## Build verification

No build step exists by design. Served locally
(`python3 -m http.server`) and verified `index.html`, all three stylesheets, all three
scripts, self-hosted jQuery, and both self-hosted assets return HTTP 200.
