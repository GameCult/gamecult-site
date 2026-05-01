---
title: Site Architecture
description: "How the root site is laid out now: content in `GameCult/`, shared Quartz machinery underneath, and a cleaner split between the studio front door and the denser Aetheria subsite."
---

# Site Architecture

The new root site is split in two:

- `GameCult/` holds the content
- `quartz-site/` holds the vendored Quartz implementation and site-specific code

That mirrors what already works in `AetheriaLore`, where the content and the presentation layer are clearly separated.

The root site is intentionally not the same thing as `aetheria.gamecult.org`. The root should explain the studio and point readers toward projects. The Aetheria subsite should remain the denser home for lore, stories, and Aetheria-specific publishing as its structure evolves.
