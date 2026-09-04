# GameCult brand design language

**This document is not the source of truth.** The brand is defined in code:

| What | Canonical source |
|---|---|
| Typefaces, weights, palette tokens | `site/quartz.config.ts` → `configuration.theme` |
| Ground wash, layout, scoped variants | `site/quartz/styles/custom.scss` |
| Quartz token plumbing | `site/quartz/styles/variables.scss` |

If this note and those files disagree, the files win and this note is stale. What
follows is the part the config cannot express: which decisions were deliberate,
what the Quartz token names actually mean, and where the exceptions live.

Written 2026-09-04, from `gamecult-site@main`.

## Typography

```
header   Montserrat   100 200 300 400 600
title    Montserrat   100 200 300
body     Ubuntu       300 400 500 700   + italic
code     IBM Plex Mono
```

**Montserrat is carried thin.** Titles are restricted to weights 100–300 —
there is no bold title weight in the brand. Thin only reads at scale, so
headings need real size and generous line-height; setting Montserrat 100 at
18px produces grey mush. When a heading must be small, drop to a heavier
Montserrat weight rather than shrinking the thin one.

**Ubuntu carries running text at 300.** Not 400. The body voice is light, and
`font-weight: 500` is the emphasis step rather than 700 in prose.

**IBM Plex Mono is a display face here, not only a code face.** Across
`custom.scss` it is used for eyebrows, section labels, table headers and
metadata — uppercase, letter-spaced between `0.06em` and `0.18em`. That
mono-uppercase-tracked label is a signature of the identity; reach for it
wherever a small structural label is needed.

## Palette

Quartz's token names are counter-intuitive: **`light` is the background and
`dark` is the text.** Read them as positions in a scale, not as themes.

| Quartz token | Value | Role |
|---|---|---|
| `light` | `#07111a` | page ground |
| `lightgray` | `#16212c` | panels, borders, code fill |
| `gray` | `#63758a` | muted text, captions |
| `darkgray` | `#b7c7d9` | body text |
| `dark` | `#eef5ff` | headings, emphasis |
| `secondary` | `#ff8a2a` | accent — orange |
| `tertiary` | `#59b7ff` | links, info — sky blue |
| `highlight` | `rgba(89,183,255,.14)` | selection / hover wash |
| `textHighlight` | `#ff8a2a55` | inline mark |

### The identity is single-theme by decision

`lightMode` and `darkMode` in `quartz.config.ts` are **byte-identical**, and
`custom.scss` forces `color-scheme: dark` at `:root` across all three
`saved-theme` states. There is no light mode. This is a commitment, not an
oversight.

Anything built in this identity should therefore paint every colour explicitly
and skip `prefers-color-scheme` entirely — but must still set an explicit
background, so it does not borrow a host page's ground.

### The ground is a wash, not a flat fill

`#07111a` is the midpoint, not the whole story. `body` in `custom.scss` layers
three coloured radials over a vertical gradient:

```scss
radial-gradient(circle at 78% 14%, rgba(255,138,42,.18), transparent 18%)  // orange
radial-gradient(circle at 18% 10%, rgba(109,96,255,.16), transparent 24%)  // violet
radial-gradient(circle at 52%  0%, rgba( 89,183,255,.14), transparent 28%) // blue
linear-gradient(180deg, #03070d 0%, #07111a 44%, #09141f 100%)
```

Note the violet `#6d60ff` appears **only** here — it is not a config token, and
it is the reason the top of the page reads warmer and more atmospheric than a
flat navy would. Reproducing the brand with a flat `#07111a` background loses
the thing that makes it recognisable.

## Ritual Paper — a scoped variant

Three long-form essays carry a distinct treatment, scoped by slug in
`custom.scss`:

```
body[data-slug="Blog/small-ritual-of-reach"]
body[data-slug="Blog/week-of-nonconsensual-access"]
body[data-slug="Blog/witness-authoritative-networking"]
```

Inside that scope the identity changes deliberately: **Georgia serif** for
article body at `1.04rem / 1.72`, a near-black-violet ground, and its own
cobalt-and-amber accent set.

| Token | Value |
|---|---|
| `--ritual-paper-bg` | `#050614` |
| `--ritual-paper-sheet` | `#06091d` |
| `--ritual-paper-panel` | `#111a49` |
| `--ritual-paper-ink` | `#f1f4ff` |
| `--ritual-paper-muted` | `#bac4ff` |
| `--ritual-paper-faint` | `#7a84c5` |
| `--ritual-paper-rule` | `rgba(96,119,255,.26)` |
| `--ritual-paper-cobalt` | `#3158ff` |
| `--ritual-paper-violet` | `#5b36b8` |
| `--ritual-paper-orange` | `#dc5524` |
| `--ritual-paper-yellow` | `#ffb21e` |
| `--ritual-paper-glow` | `#e9f5ff` |

IBM Plex Mono still carries the labels here — the mono-uppercase-tracked
device survives the variant, which is what keeps it recognisably GameCult
rather than a different site.

**This is a page-type variant, not a second brand.** It applies to typeset
essays. Do not reach for Georgia or the cobalt palette for ordinary pages,
dashboards, or documents.

## Applying this outside the site

For artifacts, dashboards, decks, and documents that should read as GameCult:

- Montserrat 100–200 for titles, carried large. Ubuntu 300 for prose.
- IBM Plex Mono, uppercase, tracked, for every small structural label.
- Ground `#07111a`; add the radial wash when the surface is large enough to
  show it. Panels `#16212c`. Body `#b7c7d9`. Headings `#eef5ff`.
- One accent: `#ff8a2a`. `#59b7ff` for links and informational state.
- Single dark theme. Paint every colour; set the background explicitly.

**The brand has no semantic colour set.** There is no defined success, warning,
or error colour — `secondary` and `tertiary` are brand accents, not status
channels. Anything needing status colour is inventing it; say so, and keep it
distinct from `#ff8a2a` so accent and warning do not collide.
