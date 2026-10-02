# Masthead campaign: the masthead on the ground, the pills gone

Imagination map, revision 1, written 2026-10-02 against `gamecult-site@e906f04`
and `GameCult-Quartz@ef43df0`. The Self admits the campaign, target, questions
and rulings; this file is the long form the cut specs point at.

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

Two rulings follow, for the Self to admit: **ground-behind-masthead** (the
masthead has no ground of its own; whatever the page paints runs up behind it,
and on `/Thing` that is the deck's hero) and **no-card-no-pills** (no masthead
card on any page; the nav is not pill buttons).

## Where the campaign lives (question `campaign-home`)

The masthead change is site-wide and has nothing to do with renaming Eve. The
`thing` campaign is homed in the Eve repo (`operator-home-eve-repo`) and its
target is the rename; folding a site redesign into it would make that target
lie about what the campaign protects.

Options:

- **new-campaign** (recommended): campaign `site-masthead`, homed in
  `GameCult/gamecult-site`, target doc this file. Target, short: the masthead
  sits directly on the page ground on every page; its nav is typeset, not
  buttons; `/Thing`'s hero runs up behind it. Two cuts at most.
- **fold-into-thing**: the masthead cut becomes a cut of `thing`. Cheaper to
  admit, but the Thing campaign's target and repo list then carry a site
  redesign, and its Soul passes verify the brand on pages Eve never touched.

The `/Thing` fixes stay in `thing` either way (cut `deck-page-fixes`, spec in
the Eve repo beside the Thing map).

## Body facts

**B1. The card.** `site/quartz/styles/custom.scss:646-665`,
`.page > #quartz-body .center > .page-header > header`: `display:block`,
`margin 0 0 1rem`, padding `1rem 1.15rem 1.05rem`, a 1px sky border at .12,
radius 22px, a gradient fill (orange radial at 82% 50% over a 135deg navy
gradient at .95-.98 alpha), a 20px/44px drop shadow and an inset hairline.
The mobile variant at `1439-1441` only changes the padding. Nothing else on the
site styles `.page-header > header`; the ritual-paper essays, the colossus post,
`Graph` and `Thing` all inherit this one rule. `tour` and `Pitch` hide the
header entirely (`1600-1603`) and are untouched by this campaign.

**B2. The pills.** `site/quartz/components/GameCultMasthead.tsx:321-329`
renders each route as `<a class="gamecult-nav-chip">` (`active` appended);
styles at `custom.scss:730-751`: 999px radius, 1px sky border at .16, sky fill
at .06, Montserrat 300 at .92rem, min-height 2.15rem; hover and active share
one state: orange fill .16, orange border .42, `#fff3e8` text. The nine routes
(Studio, Tour, Projects, Pitch, Blog, Graph, Docs, Aetheria, Zyphos) sit in
`.gamecult-titlebar-links` (`flex-wrap: wrap; gap .6rem`), so on phones they
wrap into three rows of pills. Active-route selection (`pickActiveRoute`,
longest matching slug prefix) is sound and is kept.

**B3. The same pill recipe elsewhere.** `.gamecult-repo-link`
(`custom.scss:960`, the per-repo links on project cards) and
`.gamecult-action` (`custom.scss:2168`, the home page's call-to-action row,
`GameCult/index.md:66-68, 105-107`) use the identical border, fill and radius.
The ritual-paper `PREPRINT` badge and page number (`225`, `525`) are mono
badges inside a scoped variant, not nav. See question `pill-scope`.

**B4. The brand doc.** `docs/brand-design-language.md` names neither the card
nor the pills as deliberate; it names Montserrat-thin-at-scale, Ubuntu 300, the
IBM Plex Mono uppercase tracked label as "a signature of the identity", the
wash, and one accent. It warns that Montserrat 100 at 18px "produces grey
mush" and says to drop to a heavier weight when a heading must be small. The
pills set Montserrat 300 at .92rem, on the wrong side of that warning.

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
  are question `pill-scope`.
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

### What replaces the pills (question `nav-treatment`)

Three options, each in the brand's own terms. All keep `pickActiveRoute` and
the route list; all rename the class `gamecult-nav-chip` to `gamecult-nav-link`
so no "chip" survives in the DOM; all keep `aria-current="page"` as the
accessible active mark (new; the pills had only a class).

**A. Mono labels** (recommended). The brand doc's signature device: IBM Plex
Mono, uppercase, tracked, as a row of structural labels.

```scss
.gamecult-titlebar-links { display: flex; flex-wrap: wrap; gap: 0.45rem 1.5rem; }
.gamecult-nav-link {
  padding: 0.35rem 0;
  border-bottom: 1px solid transparent;
  color: rgba(183, 199, 217, 0.84);
  font-family: var(--codeFont);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
}
.gamecult-nav-link:hover { color: var(--tertiary); }
.gamecult-nav-link.active { color: var(--secondary); border-bottom-color: var(--secondary); }
.gamecult-nav-link[target="_blank"]::after { content: " \2197"; }   // ↗ on Aetheria, Zyphos
```

Active page: orange text with a 1px orange rule under the label. Hover: sky.
External routes carry a small ↗ so leaving the site is honest. Mobile: the row
wraps as today, into two or three rows of labels with a .45rem row gap; at
375px roughly four labels fit a row. Nothing is hidden, no scroll affordance
is needed. Why it is recommended: it is the one device the brand doc calls a
signature; it reads at small size by design, which Montserrat thin does not;
and it separates the nav from the Montserrat title above it so the masthead
has two voices (display title, mono labels) instead of one voice at two sizes.

**B. Montserrat text links with an orange rule.** The pills' type kept,
the pill removed.

```scss
.gamecult-titlebar-links { display: flex; flex-wrap: wrap; gap: 0.3rem 1.4rem; }
.gamecult-nav-link {
  padding: 0.3rem 0;
  color: #dce7f6;
  font-family: var(--titleFont);
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  text-decoration: none;
}
.gamecult-nav-link:hover { color: var(--tertiary); }
.gamecult-nav-link.active { color: var(--dark); box-shadow: inset 0 -2px 0 var(--secondary); }
```

Active page: heading-white text over a 2px orange rule. Mobile: wraps. Risk:
Montserrat 300 at 16px is the size the brand doc says to avoid for the thin
face; the pills carried it at .92rem and the result was already soft.

**C. One typeset row under a hairline.** The nav becomes the masthead's bottom
edge, Montserrat 200 at 1.1rem on one line, with a 1px sky hairline above it
standing in for the card's edge.

```scss
.gamecult-titlebar-nav { border-top: 1px solid rgba(89, 183, 255, 0.12); padding-top: 0.6rem; }
.gamecult-titlebar-links { display: flex; flex-wrap: nowrap; gap: 0 1.25rem; overflow-x: auto; scrollbar-width: none; }
.gamecult-nav-link { flex: 0 0 auto; margin-top: -0.6rem; padding-top: 0.6rem; border-top: 2px solid transparent;
  color: #dce7f6; font-family: var(--titleFont); font-size: 1.1rem; font-weight: 200; text-decoration: none; }
.gamecult-nav-link.active { color: var(--secondary); border-top-color: var(--secondary); }
```

Active page: a 2px orange rule sitting on the hairline above the label. Mobile:
no wrap; the row scrolls sideways, so Docs, Aetheria and Zyphos are off-screen
at 375px until the user drags, and a fade or chevron is needed to say so. Risk:
hidden routes on phones, and a hairline is a quiet return of "its own
background".

### `/Thing`: the hero runs up behind the masthead

Mechanism, all inside the existing `body[data-slug="Thing"]` block and the
deck's own files; the engine is not edited:

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
- `body-under-scrollbar` is question `scrollbar-fix-home` below; it is not
  in the `deck-page-fixes` file changes unless ruled `site-override`.

## The authority map

- **Owner.** `custom.scss` owns the masthead's look (one `header` rule, the
  `.gamecult-titlebar*` rules, the `.gamecult-nav-link` rules);
  `GameCultMasthead.tsx` owns the masthead's content and the active route;
  the page's own ground (the body wash, a scoped variant's wash, or the Thing
  hero) owns what is behind the masthead. On `/Thing`, the slug block owns the
  stacking and the inset, and `deck.css`/`deck.js` own the hero's clearance.
- **Inputs.** The route list and current slug; the page's tagline; the
  brand tokens in `quartz.config.ts`; on `/Thing`, the measured masthead
  height.
- **Outputs.** One masthead DOM on every page; `aria-current="page"` on the
  active route.
- **Derived state.** The active route is derived from the slug (unchanged).
  `--masthead-h` is display-only, derived from layout by `deck.js`.
  `--thing-inset` is derived from the breakpoint and mirrors the site's
  gutters; it decides nothing on other pages.
- **Forbidden writers.** No rule paints a ground, border, radius or shadow on
  `.page-header > header` or `.gamecult-titlebar`; no `.gamecult-nav-chip`
  class or `999px` radius in the masthead; no slug-scoped masthead variant
  (the ritual-paper essays, colossus post, Graph and Thing all get the one
  masthead); no engine edit for the stacking (`renderPage.tsx`, `Header.tsx`
  untouched); no site rule inside `.thing-deck`.
- **Shared paths.** Every page renders the one `GameCultMasthead` through
  the engine's `Header`; `/Thing` uses the same slug-block mechanism as the
  Graph and colossus pages; deploy is the same `Deploy Quartz` workflow.
- **Deletion line.** The card rule (`646-665`), the mobile card padding
  (`1439-1441`) and the chip rules (`730-751`) are deleted before any nav
  rule is written; the `gamecult-nav-chip` class is renamed in the component
  in the same commit.

## Questions (one fork each; the Self admits them)

### `campaign-home`
Options: **new-campaign** (`site-masthead`, homed in gamecult-site) or
**fold-into-thing**. Recommended: new-campaign (reasons above).

### `nav-treatment`
Options: **mono-labels** (A), **montserrat-rule** (B), **typeset-row** (C).
Recommended: mono-labels. The spec `docs/masthead-cut-flat-nav.spec.json`
assumes A; under B or C the same deletions apply and the `adds` entry for the
nav rules is replaced by that option's block above.

### `pill-scope`
The operator pointed at the masthead. The same pill recipe also dresses
`.gamecult-repo-link` (project cards) and `.gamecult-action` (home CTAs).
Options: **masthead-only** (this cut) or **all-pill-recipe** (repo links
become mono labels in the card's own row; the CTAs become Montserrat 300 text
links with an orange rule, the primary one orange-filled square-cornered).
Recommended: masthead-only now, and `all-pill-recipe` as a second cut of the
same campaign once the masthead is seen live, since "overused" is a judgment
best made against the new masthead rather than the old one.

### `scrollbar-fix-home`
`html { width: 100vw }` is the engine's. Options: **engine** (delete the line
in `GameCult-Quartz/quartz/styles/base.scss:11`; one commit; ships to nine
sites on their next deploy) or **site-override** (`html { width: auto }` in
`custom.scss`; gamecult-site only; the other eight keep the bug). Recommended:
engine; the owner of the rule is the right place to fix it and the fix is a
deletion. Under `engine` the fix is its own one-line cut on the engine repo,
not part of `deck-page-fixes`.

## Cut order

1. `thing` / `deck-page-fixes` (`F:\Projects\Eve\docs\thing-cut-deck-page-fixes.spec.json`):
   the stacking, the inset, the header-leak guard. Independent of the masthead.
2. `site-masthead` / `flat-nav` (`docs/masthead-cut-flat-nav.spec.json`): card
   and pills deleted, mono labels in, brand doc amended. Lands after 1 so the
   two edits to the Thing block in `custom.scss` do not collide.
3. Optional, after the operator has seen 2 live: `all-pill-recipe` if so ruled;
   the engine `width: 100vw` cut if ruled `engine`.
