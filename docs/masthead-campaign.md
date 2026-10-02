# Masthead campaign: the masthead on the ground, the pills gone

Imagination map, revision 2, written 2026-10-02 against `gamecult-site@90c2d94`
and `GameCult-Quartz@ef43df0`. Revision 1 put three options to the operator;
the operator dismissed the questions and ruled the nav direction, so this
revision carries rulings, not forks. The Self admits the campaign, target and
rulings; this file is the long form the cut specs point at.

## The operator's words, verbatim

With a screenshot of `/Thing`, an arrow drawn from the masthead down into the
deck's hero:

> any reason the masthead has its own background separate from the page
> background? I feel like it could easily take up that same space (as indicated
> by this crude red arrow)

Asked what the masthead card does once the hero runs behind it (glass card, no
card on `/Thing`, no card site-wide, keep it):

> no card site-wide and let's get rid of those overused pill buttons while we're
> at it

Asked what replaces the pills (revision 1 offered mono labels, Montserrat links
with a rule, or one typeset row):

> Ubuntu text links with brand orange hover, we've already done this with the
> Delvehold site

## Rulings in force (`site-masthead`)

- **`operator-ground-behind-masthead`.** The masthead has no background
  separate from the page; on `/Thing` the hero's ground and rays run up behind
  it, masthead plus hero one screen.
- **`operator-no-card-no-pills`.** The masthead card is removed on every page
  and the pill buttons are retired.
- **`operator-nav-ubuntu-links`.** Nav links are Ubuntu text links with brand
  orange (`#ff8a2a`) hover and active state, following the Delvehold site's
  `.delvehold-nav` layout (Delvehold `c43d504`, `custom.scss:115-131`).
  Delvehold sets its links in the header font; the operator named Ubuntu, so
  Ubuntu it is.
- **`self-masthead-pills-first`** (Standing, reversible). The campaign is homed
  here, in `GameCult/gamecult-site`; the Thing target stays the rename. The
  first cut retires the masthead's pills only; `.gamecult-repo-link` and
  `.gamecult-action` follow in a later cut once the operator has seen the
  masthead live.

The `/Thing` fixes stay in `thing` (cut `deck-page-fixes`, spec in the Eve repo
beside the Thing map).

## Body facts

**B1. The card.** `site/quartz/styles/custom.scss:646-665`,
`.page > #quartz-body .center > .page-header > header`: `display:block`,
`margin 0 0 1rem`, padding `1rem 1.15rem 1.05rem`, a 1px sky border at .12,
radius 22px, a gradient fill (orange radial at 82% 50% over a 135deg navy
gradient at .95-.98 alpha), a 20px/44px drop shadow and an inset hairline.
The mobile variant at `1473-1475` only changes the padding. Nothing else on the
site styles `.page-header > header`; the ritual-paper essays, the colossus post,
`Graph` and `Thing` all inherit this one rule. `tour` and `Pitch` hide the
header entirely (`1600-1603`) and are untouched by this campaign.

**B2. The pills.** `site/quartz/components/GameCultMasthead.tsx:181-188`
renders each route as `<a class="gamecult-nav-chip">` (`active` appended at
`184`; external routes get `target="_blank"` and `rel` at `185-186`); styles at
`custom.scss:730-751`: 999px radius, 1px sky border at .16, sky fill at .06,
Montserrat 300 at .92rem, min-height 2.15rem; hover and active share one
state: orange fill .16, orange border .42, `#fff3e8` text. The nine routes
(Studio, Tour, Projects, Pitch, Blog, Graph, Docs, Aetheria, Zyphos) sit in
`.gamecult-titlebar-links` (`722-728`: `flex-wrap: wrap; gap .6rem`), so on
phones they wrap into three rows of pills. Active-route selection
(`pickActiveRoute`, longest matching slug prefix) is sound and is kept.

**B3. The same pill recipe elsewhere.** `.gamecult-repo-link`
(`custom.scss:960`, the per-repo links on project cards) and
`.gamecult-action` (`custom.scss:2206`, the home page's call-to-action row,
`GameCult/index.md:66-68, 105-107`) use the identical border, fill and radius.
The ritual-paper `PREPRINT` badge and page number (`225`, `525`) are mono
badges inside a scoped variant, not nav. Out of this cut under
`self-masthead-pills-first`.

**B4. The brand doc.** `docs/brand-design-language.md` names neither the card
nor the pills as deliberate; it names Montserrat-thin-at-scale, Ubuntu 300 for
prose with `font-weight: 500` as "the emphasis step", the IBM Plex Mono
uppercase tracked label, the wash, and one accent. It warns that Montserrat 100
at 18px "produces grey mush" and says to drop to a heavier weight when a
heading must be small. The pills set Montserrat 300 at .92rem, on the wrong
side of that warning. Ubuntu 500 at .92rem, the ruled nav, is on the right
side of it and is a weight the site already loads (`quartz.config.ts:36`:
Ubuntu 300 400 500 700).

**B5. The masthead's other parts.** Title `GameCult` (Montserrat 200,
`clamp(2.1rem,4vw,3.3rem)`, uppercase, tracked .08em), tagline (Montserrat
200, .88rem, lifted from the page's first italic line or the section's
sidebar tagline by `gamecult.ts:505`), and three community links (Patreon
wordmark, GitHub, Discord) as SVGs with a sky drop-shadow glow. All of these
already read as type on a ground; none depends on the card.

**B6. The frame.** `renderPage.tsx:271-290`: `.page > #quartz-body` is the
grid; `.center` is one grid item holding `.page-header` (the masthead and
`.popover-hint` with breadcrumbs, title, meta), `article`, `<hr>`,
`.page-footer`; the site `footer` is a sibling of `.center` in `grid-footer`.
The engine's `Header.css` sets a bare `header { display:flex; align-items:
center; margin: 2rem 0; gap: 1.5rem }`, which the site rule in B1 overrides for
the masthead and which also reaches every `<header class="xhead">` inside the
deck (Soul finding `engine-header-leak`).

**B7. The Thing page today.** `custom.scss:1148-1179` zeroes `.page` padding
and max-width, re-insets `.page-header` to 1680px / 1.2rem, strips the article
card, hides the `<hr>`. The deck hero `.thing-deck .stage` (`deck.css:479`) is
`100svh` tall with its own ground `var(--inv)` `#03070d` and `overflow:hidden`,
`.hero-bg` (orange radial) and `.rays` (sky conic, centred at 55%) absolutely
inside it; `.hero-in` is flex-centred. The stage starts below the masthead, so
a seam shows where `#03070d` begins under the wash. The site ground's top stop
is also `#03070d`, so with the masthead over the stage there is no seam left to
hide. `.stage` has `position:relative` and no `z-index`, so its children's
`z-index` (burst 3, flash 4) compete with anything laid over it. `deck.js`
already measures on resize (`sizeCanvas`, `sizeBurst`).

**B8. Soul findings on `/Thing`** (`thing:verdict:cut-deck-site-page.s1`):
`engine-header-leak` (Medium): eyebrows centred over left-aligned h2s and 32px
of extra top margin from the engine `header` rule; `base.scss h1 { font-size }`
reaches the hero h1, masked by its children. `chrome-edges` (Low): the site
footer's links start at x 0 on `/Thing` at 1440 and 375 (19 and 27 on
`/Projects`); the masthead sits at 19.2 instead of 27.2 at 375 because `.page`
.7rem plus `#quartz-body` 1rem are both zeroed and only 1.2rem is given back.
`body-under-scrollbar` (Low, pre-existing, every page): `GameCult-Quartz
base.scss:8-12` sets `html { overflow-x: hidden; width: 100vw }`; `100vw`
includes the scrollbar, so with a classic scrollbar the body is 15px wider than
the client area and centred content sits 7.5px off. The engine serves nine
sites through `quartz-pages.yml@main` (gamecult-site, AetheriaLore, Delvehold,
GhostlightDungeon-site, Kalsa, Mimir, Zyphos, pombabranca-site, the engine's
own); an engine fix ships to all of them on their next deploy.

**B9. The precedent.** Delvehold `c43d504`, `site/quartz/styles/custom.scss:
115-131`, `.delvehold-nav`: a flex row that wraps, `gap: 0.4rem 1.2rem`; links
`color: var(--darkgray)`, `font-family: var(--headerFont)` (Montserrat there),
`font-size: 0.92rem`, `font-weight: 500`, `white-space: nowrap`; `a:hover` and
`a.active` take the accent colour (`--hold-purple`) and nothing else: no rule,
no underline, no fill. `DelveholdMasthead.tsx:27-32` computes `active` per
route and sets `class="active"` and `aria-current="page"` on it. Delvehold does
not set `text-decoration`; the engine's base `a` rule already has it `none`.

## The shape

### The masthead without the card

The title, tagline, community links and nav sit directly on the page ground.
The card rule is deleted, not emptied: what remains of
`.page > #quartz-body .center > .page-header > header` is the two lines that
beat the engine's `header` rule, `display: block; margin: 0 0 1.2rem`. The
`.gamecult-titlebar*` flex rules are unchanged. The mobile padding rule goes
with the card. The sky glow on the community SVGs stays; it was never the
card's.

Page types this touches, and what each looks like after:

- **Home (`/`)**: masthead on the wash, then the home article card (24px
  radius, unchanged). The tagline is the home sidebar's.
- **Projects (`/Projects`)**: masthead on the wash above the breadcrumb-less
  title and the overview sidebar on the left. The repo-link pills on the cards
  stay for now (`self-masthead-pills-first`).
- **Essays and other content pages**: masthead on the wash, then breadcrumbs,
  title, meta, article card. The three ritual-paper essays paint their own
  ground (`custom.scss:101-124`) and the masthead now sits on that ground
  instead of on a navy card over it, which is the first time the variant reads
  whole from the top of the page.
- **Graph**: single column; masthead on the wash above the SPA shell.
- **The sleeping-colossus post**: single column, `.popover-hint` hidden;
  masthead on the wash above the article.
- **`/Thing`**: masthead over the hero (below).
- **`tour`, `Pitch`**: header hidden; nothing changes.

### The nav: Ubuntu text links, orange on hover and active (ruled)

The Delvehold recipe (B9) with two substitutions, both named by the ruling:
the face is Ubuntu (`var(--bodyFont)`) instead of the header font, and the
accent is GameCult's orange `var(--secondary)` instead of Delvehold's purple.
Everything else is carried as is: wrap, gaps, size, weight, nowrap, the
colour-only active mark. `gamecult-nav-chip` is renamed `gamecult-nav-link` so
no "chip" survives in the DOM, and the active anchor gains
`aria-current="page"` as Delvehold's does (new here; the pills had only a
class).

```scss
.gamecult-titlebar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  min-width: 0;
  align-items: flex-start;
}

.gamecult-nav-link {
  color: var(--darkgray);
  font-family: var(--bodyFont);
  font-size: 0.92rem;
  font-weight: 500;
  white-space: nowrap;
}

.gamecult-nav-link:hover,
.gamecult-nav-link:focus-visible,
.gamecult-nav-link.active {
  color: var(--secondary);
}
```

Weight: Ubuntu 500 is loaded (`quartz.config.ts:36`) and is the brand doc's
emphasis step, so Delvehold's 500 carries over unchanged. Active mark: colour
only, as Delvehold; `:focus-visible` is added so keyboard users see the same
orange that mouse users do. Mobile: the row wraps as today, with a .4rem row
gap; at 375px Ubuntu 500 at .92rem fits four to five labels a row, so the nine
routes take two or three rows. Nothing is hidden, no scroll affordance is
needed. Nothing marks external routes; Delvehold marks none and the ruling asks
for none.

### `/Thing`: the hero runs up behind the masthead

Mechanism, all inside the existing `body[data-slug="Thing"]` block and the
deck's own files; the engine is not edited. This is cut `deck-page-fixes` of
the `thing` campaign, not this campaign's cut; it is mapped here because the
masthead's target (ground-behind-masthead) is only met on `/Thing` once it
lands.

- `.center` becomes a two-row grid, `grid-template-areas: "stack" "foot"`.
  `.page-header` and `article` both take `grid-area: stack`; the header gets
  `z-index: 5` (above the stage's burst canvas at 3 and flash at 4),
  `align-self: start`, `justify-self: center`, `width: 100%`,
  `max-width: 1680px`, `box-sizing: border-box`; `.page-footer` takes `foot`.
  The stage therefore starts at the top of the page and the masthead is laid
  over it; masthead plus hero is one screen because the stage is still
  `100svh`.
- The hero content clears the masthead: `.thing-deck .stage { padding-top:
  var(--masthead-h, 9rem) }` (the stage is `box-sizing: border-box` and
  flex-centres `.hero-in` in the space that remains). `deck.js` sets
  `--masthead-h` on the deck root from `document.querySelector('.page-header')
  .offsetHeight` at init and on resize, next to `sizeCanvas`; the CSS fallback
  covers a script-less load. The reduced-motion stage
  (`deck.css:681`) takes `padding-top: calc(var(--masthead-h, 9rem) + 96px)`.
- The masthead's inset on this page is one variable, `--thing-inset`, equal
  to what every other page gets from `.page` plus `#quartz-body`: `1.2rem`
  on desktop, `2.2rem` below `$desktop` (1200px), `1.7rem` at `$mobile`
  (800px). `.page-header` and the site `footer` both take `padding-inline:
  var(--thing-inset)`, and the footer also takes `max-width: 1680px;
  margin-inline: auto; box-sizing: border-box`. This is the `chrome-edges`
  fix.
- `engine-header-leak`: `.thing-deck .xhead` adds `align-items: stretch;
  margin: 0` so the engine's `header` rule has nothing left to decide; the
  reach-in guards gain `.thing-deck h1 { font-size: inherit }`.
- The HUD pill on phones (top-right, fixed) overlaps the masthead's community
  icons until the first scroll; accepted in the Thing map r4 and unchanged.
- `body-under-scrollbar` is deferred (below); it is not in the
  `deck-page-fixes` file changes.

## The authority map

- **Owner.** `custom.scss` owns the masthead's look (one `header` rule, the
  `.gamecult-titlebar*` rules, the `.gamecult-nav-link` rules);
  `GameCultMasthead.tsx` owns the masthead's content and the active route;
  the page's own ground (the body wash, a scoped variant's wash, or the Thing
  hero) owns what is behind the masthead. On `/Thing`, the slug block owns the
  stacking and the inset, and `deck.css`/`deck.js` own the hero's clearance.
- **Inputs.** The route list and current slug; the page's tagline; the
  brand tokens in `quartz.config.ts` (`--bodyFont`, `--darkgray`,
  `--secondary`); on `/Thing`, the measured masthead height.
- **Outputs.** One masthead DOM on every page; `aria-current="page"` on the
  active route.
- **Derived state.** The active route is derived from the slug (unchanged).
  `--masthead-h` is display-only, derived from layout by `deck.js`.
  `--thing-inset` is derived from the breakpoint and mirrors the site's
  gutters; it decides nothing on other pages.
- **Forbidden writers.** No rule paints a ground, border, radius or shadow on
  `.page-header > header` or `.gamecult-titlebar`; no `.gamecult-nav-chip`
  class, `999px` radius, border or fill in the masthead nav; no slug-scoped
  masthead variant (the ritual-paper essays, colossus post, Graph and Thing all
  get the one masthead); no engine edit for the stacking (`renderPage.tsx`,
  `Header.tsx` untouched); no site rule inside `.thing-deck`; no change to
  `.gamecult-repo-link` or `.gamecult-action` in this cut.
- **Shared paths.** Every page renders the one `GameCultMasthead` through
  the engine's `Header`; `/Thing` uses the same slug-block mechanism as the
  Graph and colossus pages; deploy is the same `Deploy Quartz` workflow.
- **Deletion line.** The card rule (`646-665`), the mobile card padding
  (`1473-1475`) and the chip rules
  (`730-751`) are deleted before any nav rule is written; the
  `gamecult-nav-chip` class is renamed in the component in the same commit.

## Questions

Revision 1 put four forks to the operator. The operator dismissed them and
ruled the nav direction directly; the Self recorded the defaults as
`self-masthead-pills-first`. Their state:

- **`campaign-home`**: ruled, `self-masthead-pills-first`. The campaign is
  `site-masthead`, homed in `GameCult/gamecult-site`.
- **`nav-treatment`**: ruled, `operator-nav-ubuntu-links`. None of revision
  1's three options; Ubuntu text links on the Delvehold recipe (above).
- **`pill-scope`**: ruled, `self-masthead-pills-first`. Masthead only in this
  cut; `.gamecult-repo-link` and `.gamecult-action` in a later cut once the
  masthead is seen live.
- **`scrollbar-fix-home`**: deferred, unruled. `html { width: 100vw }` is the
  engine's (`GameCult-Quartz/quartz/styles/base.scss:11`). Options remain
  **engine** (delete the line; one commit; ships to nine sites on their next
  deploy) or **site-override** (`html { width: auto }` in `custom.scss`;
  gamecult-site only). Recommended: engine. Not in `flat-nav` and not in
  `deck-page-fixes`; it waits for a ruling.

## Cut order

1. `thing` / `deck-page-fixes` (`F:\Projects\Eve\docs\thing-cut-deck-page-fixes.spec.json`):
   the stacking, the inset, the header-leak guard. Independent of the masthead.
   Landed: `8fb3dff` and `90c2d94`.
2. `site-masthead` / `flat-nav` (`docs/masthead-cut-flat-nav.spec.json`, r2):
   card and pills deleted, Ubuntu links in, brand doc amended. Spec r2 is based on
   `90c2d94`, after 1, so the two edits to the Thing block in `custom.scss`
   do not collide; no dependency remains.
3. After the operator has seen 2 live: the other-pills cut
   (`.gamecult-repo-link`, `.gamecult-action`) under `self-masthead-pills-first`,
   mapped then; the engine `width: 100vw` cut if `scrollbar-fix-home` is ruled
   `engine`.
