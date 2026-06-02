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

## Architecture Writing

Longer architecture notes belong in `GameCult/Blog/` when they are public-facing
essays, and in `GameCult/Docs/` when they are operational documentation. Current
service architecture doctrine is published as [The Eve MultiVerse And The
Service Architecture That Refuses To Lie](/Blog/eve-multiverse-service-architecture):
CultCache `.cc` state, CultMesh Verse visibility, Eve GUI/TUI DSL, and Odin
discovery as the shared GameCult service contract.
