---
title: VibeGeometry
description: "Research home for agent-authored Blender scene generation: geometry nodes, Python builders, semantic graph contracts, render evidence, and the ongoing war against decorative node spaghetti."
socialDeck: "Geometry nodes, render evidence, less procedural spaghetti."
---

# VibeGeometry

*"Agent-authored Blender scene generation, or the long war against decorative node spaghetti."*

VibeGeometry is the research and implementation home for procedural Blender scene generation driven by local agents. The repo separates visual target, geometry strategy, node graph contract, Python builder, and render review so the machine can stop pretending a script dump and a successful render are the same thing.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/VibeGeometry">GitHub Repo</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">04 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">07 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">Python / Rust / Blender tooling</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active research repo</p>
  </div>
</div>

## Founding Idea

The founding idea is that procedural scene generation should be inspectable. The graph is the machine. The script is a builder. The render is evidence. Smearing those together is how you get a very confident mess and no way to tell which part lied.

## Trajectory

The public history is already deep in the CSG mines. Grammar work, parity fixtures, tree APIs, direct RealtimeCSG bridge probes, mesh generation, stable-build speedups, dirty perf modes, polygon category splitting, and kernel groundwork all arrive in rapid succession. Which is to say the repo is not sitting around writing manifestos about geometry nodes. It is trying to build a working procedural substrate before the whole thing calcifies into vibes and screenshots.

## Ambition

The ambition is an evidence-driven pipeline for local agents authoring Blender scenes: references in, strategy out, graphs and scripts generated, renders reviewed, revisions grounded in proof instead of swagger. If it works, it becomes a real visual lab. If it fails, at least the failure will be inspectable.

## History Tells On Itself

- `2026-05-04` `Initial public repo creation`
- `2026-05-07` `Expand grammar and add CSG parity fixtures`
- `2026-05-07` `Add CSG tree API surface`
- `2026-05-07` `Get RealtimeCSG native bridge generating meshes`
- `2026-05-07` `Add CSG perf fixtures and polygon category splitting`
- `2026-05-07` `Advance CSG category kernel groundwork`
