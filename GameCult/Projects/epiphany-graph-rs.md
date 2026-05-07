---
title: epiphany-graph-rs
description: "Rust graph-layout research repo for hybrid force, structural, and quality-constrained layouts aimed at keeping complex agent worlds legible."
socialDeck: "Graph layout research for systems too tangled to excuse themselves."
---

# epiphany-graph-rs

*"A fresh Rust crate for forcing sprawling graph worlds to hold still long enough to be understood."*

`epiphany-graph-rs` is a graph-layout research repo in Rust. Its job is not just drawing nodes somewhere plausible. It is trying to combine force-directed behavior, Sugiyama-ish structural constraints, clustering, and quality metrics into layouts that make large relational systems feel legible instead of like someone dropped spaghetti on a star chart.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/epiphany-graph-rs">GitHub Repo</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">07 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">07 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">Rust</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Brand-new research repo</p>
  </div>
</div>

## Founding Idea

The founding idea is that graph layout should respect more than pure repulsion and hope. If the system has structure, folds, clusters, tiers, or narrative importance, the layout should be able to express that instead of flattening everything into democratic confusion.

## Trajectory

The repo's whole public life currently fits inside one feverish day. It starts as a hybrid graph-layout crate and immediately grows 3D layout, structural analysis, fold groups, a realtime solver, Barnes-Hut repulsion, tuning sweeps, force-body taxonomy, and layout quality metrics. That is not a slow "maybe one day" repo. That is a research thread being externalized while the ink is still wet.

## Ambition

The ambition is to support the broader Epiphany/agent-world work with layouts that are computationally tractable, structurally meaningful, and visually interpretable. In plain English: make large social or semantic systems easier to read before the humans in the room start lying to themselves about having understood them.

## History Tells On Itself

- `2026-05-07` `Initial hybrid graph layout crate`
- `2026-05-07` `Add structural graph analysis and fold groups`
- `2026-05-07` `Add realtime 3D layout solver`
- `2026-05-07` `Add Barnes-Hut 3D repulsion`
- `2026-05-07` `Add layout structure quality metrics`
