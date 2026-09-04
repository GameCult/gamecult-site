---
title: Site Architecture
description: "How the root site is laid out now: content in `GameCult/`, shared Quartz machinery underneath, and a cleaner split between the studio front door and the denser Aetheria subsite."
---

# Site Architecture

The root site has three live layers:

- `GameCult/` holds the content
- `site/` holds the GameCult-specific Quartz configuration, components, and styles
- `.quartz-build/engine/` stages the shared `GameCult-Quartz` engine during a build;
  `quartz-site/public/` is generated output

Quartz is shared machinery, not a vendored authority inside this repository.
The local overlay owns this site's presentation decisions while the reusable
engine remains independently maintained.

The root site is intentionally not the same thing as `aetheria.gamecult.org`.
The homepage carries the philosophical thesis, the [Project Atlas](/Projects/)
makes the Persona-led organization legible, and [Architecture and
Evidence](/Docs/Architecture-and-Evidence) publishes the machinery and current
proof boundaries. The Aetheria subsite remains the denser home for lore,
stories, and Aetheria-specific publishing as its structure evolves.

## Studio Pages

The homepage introduces the studio, selected work, and the Sleeping Colossus.
Projects provides the stewardship directory. Architecture and Evidence owns
the detailed authority map and proof boundaries.

- `GameCult/index.md` and `GameCult/Projects/index.md` own copy and links.
  `site/quartz/styles/custom.scss` owns their shared presentation through
  `.gamecult-studio-page`; `site/quartz.layout.ts` places page metadata.
- Markdown, authored HTML, assets, and Quartz-generated link classes become
  static pages with shared typography, spacing, hero panels, and action links.
- `.gamecult-action` owns button padding and chrome for both internal and
  external links. The generic internal-link reset excludes these controls.
- Projects uses a two-column directory, becoming one column below 800px.
  Descriptions and links stay visible; native `details` owns biography disclosure.
  Portraits and coverage badges describe stewardship, not autonomous operation.
- Generated output and repository documentation are derived surfaces. They do
  not decide directory membership, ownership, or the source styles.

Verify changes in the rendered DOM: computed button padding, grid tracks,
horizontal overflow, disclosure, and keyboard focus at desktop and mobile
widths. Check the served revision when comparing deployed behavior. Both pages
publish through the existing `main` GitHub Pages workflow.

## Architecture Writing

Longer architecture notes belong in `GameCult/Blog/` when they are public-facing
essays, and in `GameCult/Docs/` when they are operational documentation. Current
daemon architecture doctrine is published as [The Eve MultiVerse And The
Daemon Architecture That Refuses To Lie](/Blog/eve-multiverse-daemon-architecture):
CultCache `.cc` state, CultMesh Verse visibility, Eve GUI/TUI DSL, and Odin
discovery as the shared GameCult daemon contract.
