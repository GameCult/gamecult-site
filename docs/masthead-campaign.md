# Masthead campaign: the masthead on the ground, the pills gone, no cards, one column

Imagination map, revision 2, written 2026-10-02 against `gamecult-site@90c2d94`
and `GameCult-Quartz@ef43df0`. Revision 1 put three options to the operator;
the operator dismissed the questions and ruled the nav direction, so this
revision carries rulings, not forks. The Self admits the campaign, target and
rulings; this file is the long form the cut specs point at. Revision 3
(2026-10-02, against `410485e`, after `lean-masthead`) is the section
"Cards: inventory and cuts" at the end: the campaign's scope grew from the
masthead to every card surface on the site.
Revision 4 (2026-10-02, against `535d170`) is the section "One column" at the
end: the sidebars go, the masthead aligns to one column, the wash dims off the
home page and the composite branch is deleted.

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

## Soul's findings after flat-nav (2026-10-02, against `87f2942`)

Soul's passes `thing:verdict:cut-deck-page-fixes.s1` and
`site-masthead:verdict:cut-flat-nav.s1` hold every promise and file three
findings. Two cuts resolve them; both specs sit in this folder. Each was
re-measured live on `87f2942` before the mechanism was chosen, and in one case
the measurement overturned the finding's stated cause.

### Cut `deck-page-edges` (`thing`, `docs/thing-cut-deck-page-edges.spec.json`)

**`chrome-edges-wide`** (Low). `/Projects` is `.page` content-box 1680px plus
19.2px gutters, outer 1718.4px, so at 1920 its masthead and footer text start
at x 120. The Thing block gives `.page-header` `max-width: 1680px` with the
gutter inside the box (text at 139.2), and gives the footer a `max-width` and
`margin-inline` that the engine's `footer { min-width: 100% }` nullifies (text
at 19.2). Mechanism: one variable, `--thing-frame: calc(1680px + 2 *
var(--thing-inset))`, is the outer width of `.page` everywhere else; the
header and footer take it as `max-width`, and the footer adds `min-width: 0`
so the engine's declaration decides nothing. The literal `1680px` leaves the
two rules.

**`phone-ticker-short`** (Medium). Measured at 375x667: masthead footprint
219.8px, `.hero-in` 375px tall and flex-centred in the 447px below it
(256-631), the ticker band absolute at `bottom: 56px` (565-618). At 360x740
the subtitle wraps to four lines and the band lands 639-691 under a cue at
674-694. Two owners place the hero's parts, flex centring for `.hero-in` and
absolute offsets for the band and the confidentiality line, and nothing
reconciles them. Mechanism: the stage's flow owns all of it. `.ticker-w` and
`.conf` lose `position: absolute` and their offsets and become flow siblings
after `.hero-in` (the markup order in `Thing.md` already matches); `.hero-in`
is centred in the remaining space by `margin-block: auto`; the stage's
`height` becomes `min-height`, so where the content fits (every desktop
size, 375x812, 390x844) the hero is still one screen, and where it does not
(375x667 by about 35px, 360x740 by about 15px) the stage grows and the band
sits just under the fold instead of over the subtitle. Overlap is impossible
by construction. Allowed by `thing:ruling:operator-deck-polish`; the
re-measure `thing:ruling:self-phone-hero-waits` asked for is Soul's finding.
Not a fork: whether the hero type should also tighten on short phones so the
band stays above the fold is a taste call the operator makes after seeing it,
listed as the spec's operator check, and is a separate two-line cut if wanted.

### Cut `ritual-phone-width` (`site-masthead`, `docs/masthead-cut-ritual-phone-width.spec.json`)

**`ritual-nav-offscreen`** (Medium, pre-existing; subsumes the follow-up
`ritual-essay-phone-overflow`). The finding names the long `h1` as the cause.
It is not: with the `h1` hidden, `.center`'s min-content on
witness-authoritative-networking is still 709px. The culprits are the cover
page's `figure > pre > code` blocks (`white-space: pre`, longest line about
660px). Those exist on every content page and scroll inside their box
everywhere else, because the engine sizes `.center` to its grid area
(`max-width: 100%; min-width: 100%`). The ritual block's
`.page > #quartz-body .center { max-width: 1120px; margin: 0 auto }`
(`custom.scss:142-145`) replaces the `100%` cap and turns the grid item into
shrink-to-fit, which is `max(min-content, available)`: 709 on witness, 452 on
week-of-nonconsensual, 383 on small-ritual, in a 320px column. The masthead,
a `.center` child, wraps to that width. The same rule is dead on desktop: at
1920 `.center` is 1395px because the engine's `min-width: 100%` beats the
1120px cap, and the paper is centred by `article { max-width: 980px }`, not
by `.center`. Mechanism: delete the rule. Nothing is added; the masthead is
not clipped, capped or scrolled; the `h1` is untouched.

### Cut order

4. `thing` / `deck-page-edges` and `site-masthead` / `ritual-phone-width`:
   independent of each other and of the other-pills cut; either order. Both
   are based on `87f2942`; they touch disjoint lines of `custom.scss`.

## Cards: inventory and cuts (map revision 3, 2026-10-02, against `410485e`)

Written after `lean-masthead` landed (`site-masthead:cut_report:cut-lean-masthead.h1`,
`77ecff0..410485e`). Line numbers below are from `custom.scss` at `410485e`;
every spec says to re-read by selector, since each cut shifts the file.

### The operator's words, verbatim

With a phone screenshot of `/` showing the intro text in a card nested inside
another card, alongside the nav and icon cut:

> Looks a bit disjointed on mobile.

Asked about the nested cards on the home page:

> I would indeed prefer to get rid of cards, unless they're containing
> something that floats, like a captioned image

Admitted as `site-masthead:ruling:operator-no-cards-except-floats`. Also in
force: `operator-no-card-no-pills`, `self-masthead-pills-first` (the
`.gamecult-repo-link` and `.gamecult-action` pills wait for their own cut), and
the follow-up `full-width-content` ("the content should do the same, where
reasonable").

### What the operator saw

On `/` at phone width the DOM is `article` (card: 24px radius, gradient fill,
sky border, 52px shadow, `1057-1067`) containing `.gamecult-home-hero`
containing `section.gamecult-hero-panel` (card: 20px radius, same recipe,
`2084-2113`) containing the intro copy. Beside it, `figure.gamecult-media-card`
(card) containing `img` (its own 16px radius and border). Three nested boxes
before the first word, four around the mascot. The masthead above them is
already on the ground, so the first card edge is the first thing that looks
like chrome.

### Inventory

A card is any rule that gives a content box its own fill, border, radius or
shadow. Classes: **flatten** (a layout box with no floating content),
**keep** (it holds something that floats: a captioned image, a figure, an
embed's own edge, a floating overlay), **dead** (no element on the built site
carries the class), **pill** (deferred to the pills cut), **question** (a real
fork, below), **not a card** (listed because the brief asked).

| # | Selector | Lines | Pages | Class |
|---|---|---|---|---|
| 1 | `.page > #quartz-body .center > article` (+ mobile `1462-1465`; undone by ritual `150-154`, Thing `1169-1173`, tour/Pitch `1595-1599`, colossus padding `1206`) | 1057-1067 | every page but Thing, tour, Pitch, the ritual essays | flatten |
| 2 | `.gamecult-hero-panel` (shared card `2084-2098`, home radial `2100-2109`, paddings `2111`, `2293`, `2486`) | 2084-2113 | `/`, `/Projects` | flatten |
| 3 | `.gamecult-feature-card` (base card `2084`; studio override already a hairline `2350-2357`) | 2233-2253 | `/` | flatten (collapse: the hairline becomes the base) |
| 4 | `.gamecult-evidence-note` fill (left rule stays) | 2175-2183, 2324-2332 | `/`, `/Projects` | flatten |
| 5 | `figure.gamecult-media-card` (+ `img` edge `2384-2391`; ritual variant `455-474`) | 2084, 2375-2391 | `/`, four studio pages, small-ritual-of-reach | **keep** (the operator's example) |
| 6 | `.gamecult-embed-frame` outer box; the `iframe` inside keeps its 14px edge | 2084, 2393-2405 | CultPong, cat-and-the-chocolate-factory | flatten outer, keep inner |
| 7 | `.gamecult-repo-fact` tiles | 956-965 | nine project pages | flatten |
| 8 | `.gamecult-repo-link` | 928-947 | ten project pages | pill (pending) |
| 9 | `.gamecult-action` | 2148-2173, 2315-2322 | `/`, `/Projects`, Site-Architecture | pill (pending) |
| 10 | `.gamecult-outtake` pull quote (box, tilt, second bar `::before`) | 1073-1114, 1467-1478 | four blog posts | flatten (keep the hang and one orange rule) |
| 11 | `.toc, .backlinks` | 1225-1238 (ritual undo `166-169`) | standard content pages | flatten |
| 12 | `.gamecult-overview-sidebar-inner` | 1257-1272, 1489-1491 | `/`, `/Projects`, pages with `sidebarGroups` | flatten |
| 13 | `.page-listing .section-li > .section` (engine folder listing) | 1364-1380 | `/Docs`, tag pages | flatten |
| 14 | `.gamecult-blog-index-intro`, `.gamecult-blog-card` (+ hover fill, engine `AutoIndexFolder`) | 827-873 | `/Blog` | flatten |
| 15 | `.integrated-dossier-hero`; `dl div`, `-note`, `-table`, `-glossary` | 2779-2906 | `/dossier`, `/stichting` | flatten |
| 16 | `.ritual-paper-page` sheet, badges, `blockquote`, `-abstract`, `-method-card`, `-results-strip`, `-page-number` | 198-240, 360-424, 523-538 | three ritual essays | **question** `ritual-sheet` |
| 17 | `.katex-display` (ritual) | 483-491 | ritual essays | question `code-blocks` (same answer) |
| 18 | engine `pre` (border, 5px radius), inline `code` fill | GameCult-Quartz `base.scss` 445-510 | fifteen pages with fences | **question** `code-blocks` |
| 19 | engine `.callout` | GameCult-Quartz `callouts.scss` | none (no content uses `> [!`) | not a card on this site; nothing to cut |
| 20 | tables | engine `th`/`tr` hairlines only | 99 pages | not a card (already the mechanism) |
| 21 | `footer` | engine `footer.scss`: text at .7 opacity | every page | not a card |
| 22 | Graph page | `GameCultGraphSpaShell` paints no box; engine `.graph-outer` unused | `/Graph` | not a card |
| 23 | Sai player on tour/Pitch: `.sai-speaker-stage` (the 100svh page itself, border 0), `.sai-dom-card`, `.sai-speaker-card`, avatar shell | 1633-1799 | `/tour`, `/Pitch` | keep: Sai's player chrome tinted by the site; the DOM cards float over a scene, like the Thing deck's own design |
| 24 | `.swarm-domain-card > header img`, `.swarm-avatar-fallback` (4.5rem portrait edge) | 2943-2953 | `/Projects` | keep (an image's own edge, like `img` in a media card) |
| 25 | `.swarm-badge` (bordered label, .4rem radius; `forming` dashed) | 2980-2991 | `/Projects` | pill-shaped: add to the pills cut's scope |
| 26 | `.gamecult-project-group`, `.gamecult-link-card`/`-grid` (+ tour/Pitch hiders), `.gamecult-flow-step`, the composite shell/header (`compositeSections` is set by no page), `.portfolio-dossier-*` block, `.gamecult-vn-source-card`/`doc-tree` (clipped to 1px on their only pages) | 782-819, 1494-1549, 1801-1925, 1931-2074, 2185-2224, 2458-2508, 2515-2725 | none visible | dead |
| 27 | engine `.popover` (link previews), search modal | GameCult-Quartz | floating UI | keep (floats) |

Counts: flatten 12 (rows 1-4, 6, 7, 10-15), keep 5 (5, 23, 24, 27, and the
embed's inner edge), dead 1 group of about 640 lines (26), pill 3 (8, 9, 25),
question 2 (16/17, 18), not a card 4 (19-22).

### What replaces the card: one mechanism

Whitespace, typographic hierarchy, and **the hairline rule**: `1px solid
var(--gamecult-rule)` on the top edge of a section or row, named by the mono
uppercase tracked label the brand doc already calls the signature. Asides
(evidence note, pull quote, dossier notes, ritual blockquote) keep a left rule
in the accent, which is the engine's own `blockquote` treatment. Hover is a
colour change to `--secondary`, never a fill.

The site already does this in three places with two literal colours:
`.gamecult-studio-page .gamecult-feature-card` (`2353`) and
`.swarm-domain-card` (`2932`) use `rgba(148,163,184,.22)`;
`.gamecult-overview-group` (`1313`) uses sky `.08`. `home-flat` names the grey
as `--gamecult-rule` on `body`, and the later cuts replace both literals. The
ritual variant uses its own `--ritual-paper-rule` and the amber its boxes
already carried, so the paper stays in its own colours.

The deleted cards' inner padding is not replaced. Content runs to the column's
edge, which is what `full-width-content` asks for; the width caps themselves
(`1680px`, `980px`, `760px`, `68ch`) remain that follow-up's audit.

### Questions

Two real forks. Everything else is a classification, not a choice.

**`ritual-sheet`.** The brand doc names Ritual Paper as a deliberate scoped
variant with `--ritual-paper-sheet` and `--ritual-paper-panel` tokens. The
sheet is a layout card holding the whole essay; it already drops its radius
on phones (`594`). Options:

- `keep-sheet`: the variant is the brand doc's named exception; the sheet,
  abstract box, method card, results strip, blockquote box and the two badge
  pills all stay.
- `flatten-sheet-keep-paper` (**recommended**): the sheet and the boxes
  become cobalt and amber rules; PREPRINT, WORKING PAPER and the page number
  become mono labels; the Georgia body, two-column rule, keyline, h2 top
  rules, footer rule and captioned figures stay. The paper's identity is its
  type, columns, rules and accents, not its drop shadow, and the essays'
  ground (`119-123`) is already the near-black-violet the doc names, so there
  is no seam the sheet hides.
- `flatten-all`: as above, and the keyline, column rule and h2 rules go too.

Spec `docs/masthead-cut-ritual-sheet.spec.json` is written for the
recommendation and waits.

**`code-blocks`.** Fenced code (fifteen pages) is framed by the engine: `pre`
has a 1px `--lightgray` border and 5px radius; inline `code` has a fill. The
ritual `.katex-display` follows the same answer. Options:

- `keep-engine-frame` (**recommended**): a code block is a scrolling
  container, not a card; its border marks the scroll region. The rule is the
  engine's and ships to nine sites; the brand doc's Surfaces section names it
  as "containing", not "card".
- `site-unframe`: a site override, `pre { border: 0; border-radius: 0 }` with
  a left rule or fill only; gamecult-site only.
- `engine-unframe`: the same in GameCult-Quartz `base.scss`; nine sites on
  their next deploy.

### Cut order (smallest risk first; all based on `410485e`)

1. `home-flat` (`docs/masthead-cut-home-flat.spec.json`): the article card
   on every page, the hero panels, feature cards and evidence fills on `/` and
   `/Projects`; names `--gamecult-rule`; brand doc gains `## Surfaces`. What
   the operator saw is gone after this one.
2. `dead-card-css` (`docs/masthead-cut-dead-card-css.spec.json`): about 640
   lines with no element, each proven absent from the built site first; the
   VN source cards are checked in the live DOM of `/tour` because Sai clones
   `[data-sai-dom-source]` nodes into its overlay.
3. `sidebars-lists` (`docs/masthead-cut-sidebars-lists.spec.json`): TOC,
   backlinks, overview sidebar, folder listing rows, Blog index.
4. `project-pages` (`docs/masthead-cut-project-pages.spec.json`): fact tiles,
   embed frame.
5. `blog-asides` (`docs/masthead-cut-blog-asides.spec.json`): the pull quote.
6. `dossier-flat` (`docs/masthead-cut-dossier-flat.spec.json`): `/dossier`,
   `/stichting`.
7. `ritual-sheet` (`docs/masthead-cut-ritual-sheet.spec.json`): after the two
   questions are ruled.

Cuts 3-6 depend only on `home-flat` (the token) and touch disjoint lines;
any order among them. The pills cut (`self-masthead-pills-first`) is mapped
separately once the operator has seen `home-flat`; `.swarm-badge` joins its
scope. Follow-up for the Self, not a cut here: the `compositeSections` branch
of `GameCultCompositeContent.tsx` is reached by no page after its CSS goes.

### Target r2 proposal

Invariants r1 keeps: `masthead-on-ground`, `nav-text-links`,
`brand-doc-agrees`, `site-green`. r2 adds:

- `no-cards`: no content box on the site carries its own fill, border, radius
  or shadow unless it holds something that floats in the flow (a captioned
  image or figure, an embed's own edge, a floating overlay). Grouping is
  whitespace, type hierarchy and the hairline rule `--gamecult-rule`; asides
  carry one left rule; hover is a colour, not a fill.
- `one-rule-token`: every site-owned hairline separator resolves from
  `--gamecult-rule` (the ritual variant from `--ritual-paper-rule`); no
  literal hairline colour survives in `custom.scss`.

`not_in_scope` r2: the pills (`.gamecult-repo-link`, `.gamecult-action`,
`.swarm-badge`) until their cut; the engine's `pre`/`code` frame until
`code-blocks` is ruled; the Thing deck's and Sai player's own chrome; the
width caps (`full-width-content`); `scrollbar-fix-home`.

`canonical_implementations` r2 adds `docs/brand-design-language.md ##
Surfaces` and the `--gamecult-rule` token on `body` in `custom.scss`.

Rename: recommend **keeping the slug `site-masthead`**. Fifteen admitted
documents cite it as their key prefix; a rename is a new campaign plus a
resolution closing this one, and buys only a nicer name. Retitle instead: the
campaign and target r2 titles become "Site chrome: the masthead on the ground,
the pills gone, no cards", and this file's heading already reads so. If the
Self prefers a clean slug, the cuts above are unchanged and move to it.

## One column: sidebars gone, masthead aligned, wash dimmed, composite deleted (map revision 4, 2026-10-02, against `535d170`)

Written after `home-flat`, `dead-card-css`, `sidebars-lists` (narrowed),
`project-pages` and `blog-asides` landed; `dossier-flat` and `ritual-sheet` are
admitted and may land beside these cuts. Line numbers are from `custom.scss` at
`535d170` (2559 lines); every spec says to re-read by selector.

### The operator's words, verbatim

With screenshots of `/`, `/Blog` and `/Docs/Architecture-and-Evidence`:

> nix the unused composite component. The masthead now feels misaligned on the
> homepage and project page. I'd rather it be aligned like it is on the pages
> with sidecars, except I also want those sidecars all gone, they're cramping
> the style. Blog page elements should also be chromeless. Also that background
> wash gets too bright on pages that aren't the homepage.

Admitted as `site-masthead:ruling:operator-chromeless-column`. Also in force:
`operator-no-cards-except-floats`, `operator-no-card-no-pills`,
`self-masthead-pills-first`, and the follow-up `full-width-content` ("the
masthead always fills the screen, and the content should do the same, where
reasonable").

The Self adds a heads-up, not a ruling: the operator is weighing a cheap WebGL
shader (a subset of Aetheria's volumetric cloud shader) in place of the CSS
wash. So the home-versus-elsewhere difference is one intensity value a shader
could read as a uniform, no per-page wash rule is added, and the CSS wash stays
as the no-WebGL and reduced-motion fallback.

### Body facts

**C1. Why the masthead is misaligned on `/` and `/Projects`.** Both pages carry
`cssclasses: gamecult-studio-page`, and `.gamecult-studio-page { max-width:
72rem; margin-inline: auto }` (`2013-2017`) centres the article inside
`.center`, while `.page-header` (the masthead) spans `.center` whole. `.page`
is `max-width: 1680px` (`33-37`), so at 1660 wide the article starts 240px in
from the masthead. On pages with sidebars `.center` is a 300px-narrower grid
column and the article has no cap of its own, so masthead and article share
edges. The operator's "aligned like the pages with sidecars" is that: one
column, nothing centred inside it.

**C2. The sidebars.** `quartz.layout.ts` places, on content pages, left:
`DesktopOnly(TableOfContents)`; right: `GameCultOverviewSidebar` and
`Backlinks` under per-slug conditions; on folder pages, left:
`GameCultOverviewSidebar`. The engine renders `<div class="left sidebar">` and
`<div class="right sidebar">` regardless (`renderPage.tsx:247-262`), so with
empty lists both divs are empty. The site already handles that with
`:empty { display: none }` (`52-55`) and two `:has(... :empty)` grid blocks
(`57-87`) that collapse the engine's three-column grid. After the cut every
sidebar is empty on every page, so the conditional grid becomes one
unconditional rule and the `:has` machinery is dead.

**C3. What the sidebars carry.** The TOC: three pages set `enableToc: true`
(Architecture-and-Evidence, dossier, stichting); the engine hid it below
`$desktop` anyway. Backlinks: the engine's list of inbound links on standard
content pages. The overview sidebar: `sidebarGroups` frontmatter on `index.md`
(Studio, Praxis, Participate), `Docs/Architecture-and-Evidence.md`
(Architecture, Proof), `Pitch.md`, `tour.md`; on `/Blog` a post list built by
the engine's `buildAutoIndexSidebarData`. Everything the groups link is
reachable from the masthead nav (Projects, Blog, Aetheria), the home page's
action row and body links, and the Projects atlas. The `/Blog` post list is the
blog index itself. Nothing moves inline; all of it drops.

**C4. The masthead tagline rides on the sidebar code.** `gamecult.ts:467-508`
builds `headerTagline: currentTaglineText ?? sidebar?.tagline`. Pages with
their own quoted first line (19 of 67: home, Docs/index, Graph, Thing, ten
project pages, Architecture-and-Evidence, Bifrost, two posts) show it; every
other page shows the nearest section index's tagline through
`findSidebarOverviewNote` (page, then `Section/index`, then `index`). Blog
pages get the literal `"Recent notes, fiction, experiments, and other escaped
materials."` from `buildAutoIndexSidebarData`'s `sidebarTagline` option,
duplicated in `GameCultCompositeContent.tsx:177`. The tagline chain is masthead
content and stays; only its carrier is renamed. The Blog literal becomes the
quoted first line of `Blog/index.md`, so content owns it and both copies go.

**C5. The composite branch.** `GameCultCompositeContent.tsx` is the page body
for every content and folder page (`quartz.config.ts:85-90`); only its
`compositeSections` branch (`buildSectionContent`, `getCompositeSections`, the
`sections.length > 0` render, `showCompositeJump`) is dead: no content file sets
`compositeSections`. Its CSS is `1744-1891` and the mobile block `2202-2223`.
`.gamecult-composite-overview > h2, > ul { display: none }` (`1754-1757`) is
also dead: `tour.md` carries the class, but its `<h2>`s are inside
`.gamecult-vn-source-card` divs, never direct children of the article, and the
file has no top-level `##` or list. `showCompositeJump: false` sits in
`index.md`, `Pitch.md`, `tour.md`. `rebaseSharedSourceElement` is not
composite: it serves `contentSource` pages and stays.

**C6. The wash.** `body` (`10-29`) layers three radials, orange .18, violet
.16, sky .14, over the navy gradient. The ritual essays paint their own ground
(`119-124`): yellow .15, cobalt .22, violet .19, brighter than the site's.
tour/Pitch cover the body with the VN and hide `.page::before`; `/Thing`'s hero
paints its own `.hero-bg` in `deck.css` (Eve) and is not the site's wash.
Removing the article card exposed more of the body wash on every page.

**C7. `/Thing`'s frame.** `--thing-frame: calc(1680px + 2 * var(--thing-inset))`
(`1045`) is the outer width of `.page` elsewhere, so the masthead and footer on
`/Thing` are the same box as everywhere else while the deck is full-bleed
(`.page { max-width: none; padding: 0 }`). The literal `1680px` is the only
other copy of the page width.

**C8. Other width caps.** Ritual essays: `article { max-width: 980px; margin:
2rem auto 4rem }` (`148-156`), a second centred-inside-the-column cap of the
C1 kind. `article h1` and `.ritual-paper-titleblock` 760px (`241`, `253`) and
the tagline's `68ch` (`690`) are type measures on a heading and a one-liner,
not body chrome. `.integrated-dossier-page` sets no width.

### The shape

**One column.** `body { --gamecult-column: 72rem }`, the studio pages' current
measure (1152px), becomes `.page`'s `max-width`; `.page`'s gutters stay
outside it. `#quartz-body` is one column at every width:

```scss
.page > #quartz-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "grid-header" "grid-center" "grid-footer";
}
.page > #quartz-body > .sidebar { display: none; }
```

The masthead (`.page-header`), the article and the site `footer` are each the
column's full width on every page, so their edges meet at the column's edges
with no centring inside it. `.gamecult-studio-page`'s cap and the ritual
`980px` are deleted; the ritual paper takes the column (its two text columns
are its measure). `/Thing` keeps the deck full-bleed and takes
`--thing-frame: calc(var(--gamecult-column) + 2 * var(--thing-inset))` for its
masthead and footer; tour/Pitch keep their full-screen block minus the two
sidebar-hider lines. `full-width-content`: the column is the site's one width,
content runs to its edges, and the brand doc gains `## Layout` naming the
token; the remaining 760px and 68ch caps are type measures and are named there
as such. Changing the site's width is then one number.

**No sidebar.** `quartz.layout.ts` places nothing left or right;
`GameCultOverviewSidebar.tsx` is deleted; `Plugin.TableOfContents()` leaves
the transformers with the nine `enableToc` frontmatter lines; `sidebarGroups`
blocks are deleted from the four files; the sidebar data model in
`gamecult.ts` (link, group, data types, the group extractors, summary, active
link, `sidebarSource`, `buildAutoIndexSidebarData`) is deleted and
`findSidebarOverviewNote` becomes `findSectionNote`, feeding only the tagline.
All sidebar, TOC, backlinks and overview CSS goes, including the slug blocks'
grid overrides (ritual `127-141`, `570-583`; colossus `1100-1111`) that exist
only to beat the engine's three-column grid.

**Wash.** One token, `body { --gamecult-wash: 0.5 }` and
`body[data-slug="index"] { --gamecult-wash: 1 }`; every radial alpha in the
body ground and in the ritual ground is `calc(<its alpha> * var(--gamecult-wash))`
(`rgb(255 138 42 / calc(0.18 * var(--gamecult-wash)))`). Sass emits a colour
function whose argument is a `var()` as plain CSS; Hands confirms the calc
survives in the built stylesheet. No other page rule touches the wash. The CSS
wash is the fallback if a shader ever paints the ground; the shader would read
`--gamecult-wash` as its intensity uniform. 0.5 is a first number for the
operator to tune.

**Composite.** The branch, its CSS, the dead overview hider and the
`showCompositeJump` lines go; the file is renamed `GameCultContent.tsx` so its
name stops claiming what it no longer does; `quartz.config.ts` imports the new
name.

### The authority map

- **Owner.** `custom.scss` `body` owns the site's two layout tokens,
  `--gamecult-column` and `--gamecult-wash`, and the one grid rule;
  `quartz.layout.ts` owns what is placed on a page (nothing beside the
  centre); `gamecult.ts` owns the tagline chain; content frontmatter owns a
  page's own tagline (`Blog/index.md` now owns the blog's); `GameCultContent.tsx`
  owns the article body.
- **Inputs.** The slug (home or not, for the wash); the page's and its
  section index's first quoted line (tagline); the two tokens.
- **Outputs.** One centred column of `--gamecult-column` on every page, the
  masthead, article and footer at its edges; the ground at full intensity on
  `/` and half elsewhere.
- **Derived state.** The masthead's width, the footer's width and the Thing
  frame are derived from `--gamecult-column`; no rule centres content inside
  the column (`.gamecult-studio-page` and the ritual `980px` are no longer
  owners). The grid is no longer derived from sidebar emptiness (`:has`,
  `:empty`); it is one rule. Every ground radial's alpha is derived from
  `--gamecult-wash`. The tagline is derived from content, not from sidebar
  data. `enableToc`, `sidebarGroups`, `sidebarSource`, `showCompositeJump`,
  `compositeSections` are read by nothing and are deleted, not left inert.
- **Forbidden writers.** No `left`/`right` entry in either layout; no
  `max-width` with `margin: auto` on an article or page class; no literal
  page width (`1680px`, `72rem`) outside the token; no `grid-template-*` for
  `#quartz-body` outside the one rule and the tour/Pitch full-screen block;
  no `:has(... sidebar ...)` or `:empty` grid rule; no radial alpha outside the
  token's multiplication; no `data-slug` wash rule beyond the home line; no
  `composite` string in the site source; no engine edit.
- **Shared paths.** Every page type (home, Projects, posts, Docs, folder
  listings, ritual essays, colossus post, dossier, Graph, Thing, tour/Pitch)
  renders through the one grid rule and the same Deploy Quartz workflow;
  `/Thing`'s masthead and footer use the same token through `--thing-frame`.
- **Deletion line.** Per cut, the deletes land before any add: the composite
  branch and its CSS; the sidebar placements, component, data model and CSS
  with the slug-block grid overrides; the `:has`/`:empty` grid rules; the
  studio-page and ritual caps and the literal page widths; the literal radial
  alphas.

### Questions

None are forks. Two decisions the operator should see live rather than rule
on: the column at 72rem (one token; the follow-up's "where reasonable" is
answered by the studio pages' own measure) and the wash at 0.5 (one number).
The information the sidebars carried drops (C3); nothing is moved inline.

### Cut order (smallest risk first; all based on `535d170`)

0. `community-hit-gap` and `doc-tree-flat` (below, Soul's findings): one rule
   each, independent of everything; either order, any time.
1. `wash-home-only` (`docs/masthead-cut-wash-home-only.spec.json`): the token
   and the two grounds. Independent. Its ritual lines (`119-124`) sit beside
   `ritual-sheet`'s token deletes (`104-117`); whichever lands second rebases
   a few lines.
2. `composite-delete` (`docs/masthead-cut-composite-delete.spec.json`): the
   branch, rename, CSS, hider, frontmatter. Independent.
3. `sidebars-gone` (`docs/masthead-cut-sidebars-gone.spec.json`): layouts,
   component, data model, TOC transformer, frontmatter, all sidebar CSS and the
   slug-block grid overrides, the one grid rule. After `composite-delete`
   (same frontmatter blocks, same component file).
4. `column-align` (`docs/masthead-cut-column-align.spec.json`): the column
   token, `.page`, the two caps, `--thing-frame`, the brand doc's `## Layout`.
   After `sidebars-gone` (the column only makes sense once nothing sits beside
   it). Resolves `full-width-content`.

### Target r3 proposal

Keep r2's six invariants. Add:

- `one-column`: every page is one centred column of `--gamecult-column`; the
  masthead, article and site footer share its edges; no layout places a
  sidebar and no rule centres a narrower box inside the column. A full-bleed
  surface (the Thing deck, the VN on tour/Pitch) may escape the column; its
  masthead and footer do not.
- `wash-home-only`: the ground's radial intensity is one token,
  `--gamecult-wash`, 1 on `/` and lower elsewhere; no page rule sets a radial
  alpha of its own. The CSS wash is the fallback ground if a shader ever
  paints it.

`not_in_scope` r3: the pills (unchanged); the engine `pre`/`code` frame
(unchanged); the Thing deck's and Sai player's own chrome (unchanged); the
shader (a separate campaign if ruled); `scrollbar-fix-home`. The width-caps
entry leaves `not_in_scope`: `column-align` resolves `full-width-content`.

`canonical_implementations` r3 adds: the tokens `--gamecult-column` and
`--gamecult-wash` on `body` in `custom.scss`; the one `#quartz-body` grid
rule; `quartz.layout.ts` with empty `left`/`right`; `GameCultContent.tsx`;
`docs/brand-design-language.md ## Layout`.

### Soul's findings after home-flat and dead-card-css (two more cuts)

**`github-hit-overlap`** (`site-masthead:finding:cut-home-flat.s1.github-hit-overlap`,
Low). At 360 and 375 the title is 1.9rem, so each community box is 0.92em
(27.97px) and the row gap 0.35em (10.64px): neighbour centres are 38.6px apart
while each `::after` hit area is 44px wide, so Discord's hit area covers the
right 5.4px of GitHub's (22 of 121 sampled taps on GitHub opened Discord).
Cut `community-hit-gap` (`docs/masthead-cut-community-hit-gap.spec.json`):
a gap floor, not clipped hit areas. Clipping to the midpoint would keep the
row tight but shrink the target below 44px exactly where fingers are, and it
needs a second geometry (half-gap offsets) that must agree with the first.
The floor states the invariant once: `--gamecult-hit: 44px` on the row, read
by the `::after` box and by `gap: max(0.35em, calc(var(--gamecult-hit) + 1px
- 0.92em))`. At desktop sizes the calc is negative and the em gap wins
unchanged; at 1.9rem the gap is 17px and centres are 45px apart. One line.

**`doc-tree-cards-unowned`**
(`site-masthead:finding:cut-dead-card-css.s1.doc-tree-cards-unowned`, Medium,
pre-existing). Map r3 row 26 listed `.gamecult-doc-tree-*` as dead because no
built page carries the classes; `repo-doc-tree.js` builds them at runtime into
the tour's Sai card after the doc-tree choice: a filled, bordered pitch box and
a grid of filled, bordered repo boxes. The map was wrong; they are live. Cut
`doc-tree-flat` (`docs/masthead-cut-doc-tree-flat.spec.json`): under
`no-cards` the pitch is an aside and takes a left rule in its own amber with no
fill; the repo boxes are rows and each takes `border-top: 1px solid
var(--gamecult-rule)`. The Sai card they sit in is the player's float chrome
(row 23) and is untouched; a card inside a float is still a card. The one-rule
and no-cards invariants are unchanged; this is the inventory corrected.
