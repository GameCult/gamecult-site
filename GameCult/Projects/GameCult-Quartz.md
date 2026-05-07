---
title: GameCult-Quartz
description: "Shared Quartz engine for GameCult static sites, extracted so the websites can diverge where it matters without duplicating the plumbing."
socialDeck: "Shared site engine, fewer fake forks, less suffering."
---

# GameCult-Quartz

*"The extracted shared site engine: because maintaining two Quartz forks in parallel is a lovely way to waste a week."*

`GameCult-Quartz` is the shared engine repo for the GameCult static sites. It holds the common Quartz runtime, components, styling primitives, OG card logic, deploy workflow pieces, and the site-agnostic machinery that `gamecult-site` and `AetheriaLore` now ride through overlays instead of duplicated forks.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/GameCult-Quartz">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/gamecult-site">gamecult-site</a>
  <a class="gamecult-repo-link" href="/Projects/AetheriaLore">AetheriaLore</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">01 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">07 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">TypeScript / Quartz</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active shared engine</p>
  </div>
</div>

## Founding Idea

The founding idea was an intervention. Once `gamecult-site` and `AetheriaLore` were clearly sharing most of their infrastructure, styling, and components, keeping two near-identical Quartz copies alive stopped being flexibility and started being a maintenance tax with a fake moustache.

## Trajectory

The whole public history happens in one tight burst: extract the shared engine, fix preview description extraction, improve preview title logic, refine social metadata, switch to art-forward OG cards, then simplify the chrome once it starts getting too proud of itself. The repo is young, but it already has a very clear job.

## Ambition

The ambition is not just code reuse. It is shared infrastructure with enough discipline to let the sites diverge where they should: different mastheads, different art surfaces, different lore/public copy needs, one engine. In other words, less duplication without flattening everything into the same damp rectangle.

## History Tells On Itself

- `2026-05-01` `Extract shared GameCult-Quartz engine`
- `2026-05-01` `Improve preview title and description extraction`
- `2026-05-01` `Tighten social metadata generation`
- `2026-05-01` `Add image-forward social card generation`
- `2026-05-07` `Simplify social card chrome`
