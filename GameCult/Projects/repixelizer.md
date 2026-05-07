---
title: repixelizer
description: "Solver-heavy attempt to turn fake pixel art into the real thing without smearing the problem under nostalgia and wishful thinking."
socialDeck: "Making fake pixel art stop lying."
---

# repixelizer

*"A machine for taking AI-ish pixel sludge by the shoulders and asking it to be serious for once."*

repixelizer is a solver-heavy attempt to take art that merely looks pixelated and make it behave like real pixel art. Not just smaller. Not just blurrier. Not just filtered until the crimes become harder to prosecute. The repo is a long, public knife fight with lattice inference, adjacency, edge metrics, tile graphs, relaxation, refinement, and the small matter of whether the whole approach actually deserves to exist.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/repixelizer">GitHub Repo</a>
  <a class="gamecult-repo-link" href="https://repixelizer.gamecult.org">Live Landing Page</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">21 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">01 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">Python / optimization tooling</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active experiment</p>
  </div>
</div>

## Founding Idea

The founding idea is one of those sentences that sounds deranged until you look at the output and realize the repo has a point: what if you could fit source pixels onto something that actually behaves like hand-authored pixel art instead of settling for diffusion, blur, and vibes?

## Trajectory

The history reads like an optimization binge with a conscience. It starts cleanly enough with CLI scaffolding and documentation, then barrels through corpus benchmarks, lattice refinement, edge concentration metrics, phase reranking, line-aware energy, relaxation tuning, source guidance, benchmark corruption, and finally a full detour into tile-graph reconstruction modes. By late April the repo also has hosted queue work, GUI error handling, queue pressure logging, and the operational signs of a thing that escaped the lab and demanded a service wrapper.

That arc is part breakthrough, part cautionary tale, which frankly makes it more useful. The repo does not just record what worked. It records what obsessive iteration looks like when the underlying problem keeps refusing to become polite.

## Ambition

The ambition is still excellent: restore coherence to pseudo-pixel art instead of just preserving its jaggies. But the public history also makes one other ambition visible by accident: figure out which parts of the machine actually deserve to survive. That is the healthier question, and the repo has started asking it.

## History Tells On Itself

- `2026-04-21` `Bootstrap the repixelizer CLI project`
- `2026-04-22` `Improve lattice inference with source evidence`
- `2026-04-22` `Add line-aware refinement energy`
- `2026-04-22` `Add experimental tile graph reconstruction mode`
- `2026-04-23` `Document tile-graph algorithm map`
- `2026-04-29` `Log hosted queue and job pressure`
- `2026-05-01` `Log Repixelizer job actors for ops summaries`
