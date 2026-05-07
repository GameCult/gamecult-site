---
title: CultLib
description: "Shared runtime and protocol family for GameCult code: CultLib itself plus the CultCache and CultNet ports spreading across C#, TypeScript, Rust, and Python."
socialDeck: "Shared code for the studio's persistence and protocol mess."
---

# CultLib

*"All the reusable parts that were tired of being copy-pasted between larger disasters."*

CultLib is the shared runtime and protocol family for GameCult code. The C# repo is the anchor, but the public shape is now larger than one language: `cultcache-ts`, `cultcache-rs`, `cultcache-py`, `cultnet-ts`, and `cultnet-rs` are all part of the same push to stop persistence and wire contracts from being rewritten as local folklore every time a new tool appears.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/CultLib">GitHub Repo</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultcache-ts">cultcache-ts</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultcache-rs">cultcache-rs</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultcache-py">cultcache-py</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultnet-ts">cultnet-ts</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultnet-rs">cultnet-rs</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">18 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">06 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">C# / TypeScript / Rust / Python</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active repo family</p>
  </div>
</div>

## Founding Idea

The founding idea was not glamorous. It was correct. Shared runtime machinery should live in a shared home instead of being smeared across project codebases until nobody can tell which copy is the cursed one.

## Trajectory

CultLib starts with dependency updates, JSON backing store work, I/O fixes, security cleanup, and a full CultUI port away from legacy prefab residue. Then the focus hardens around schema, persistence, and wire contracts. On 06 May 2026 the family abruptly flowers outward: `cultcache-ts` ships the TypeScript port, `cultcache-rs` lands the Rust cache crate, `cultcache-py` appears as the Python control-plane sibling, `cultnet-ts` becomes the TypeScript client, and `cultnet-rs` becomes the Rust peer. All of them are one day old and already clearly related, which is either encouraging or a warning sign depending on how much sleep anyone got.

The point is that CultLib stopped being "some useful C# libraries" and started becoming the canonical home for the studio's persistence and messaging vocabulary. The separate language repos are real, but they are satellites around the same core idea.

## Ambition

The ambition is to become the boring center of gravity other repos can lean on: storage that behaves, schemas that survive, message formats that stay compatible, and runtime helpers that do not need to be reinvented whenever somebody opens a new runtime with fresh ideas and insufficient restraint.

## Repo Family

- [CultLib](https://github.com/GameCult/CultLib): the C# anchor repo where the schema and interop story first hardened.
- [cultcache-ts](https://github.com/GameCult/cultcache-ts): TypeScript CultCache port with schema-backed MessagePack storage.
- [cultcache-rs](https://github.com/GameCult/cultcache-rs): Rust CultCache crate for typed envelopes and slot-safe persistence.
- [cultcache-py](https://github.com/GameCult/cultcache-py): Python CultCache port aimed at control-plane and bootstrap surfaces.
- [cultnet-ts](https://github.com/GameCult/cultnet-ts): TypeScript CultNet client and cross-runtime contract surface.
- [cultnet-rs](https://github.com/GameCult/cultnet-rs): Rust CultNet peer with schema discovery and raw replication lanes.

## History Tells On Itself

- `2026-04-18` `JSON backing store, I/O fixes, Networking Security`
- `2026-04-18` `Complete CultUI Port and remove legacy UI prefabs and scripts`
- `2026-05-06` `Initial CultCacheTS port`
- `2026-05-06` `Create Rust CultCache crate`
- `2026-05-06` `Scaffold cultcache-py`
- `2026-05-06` `Add schema discovery messages to CultNet`
- `2026-05-06` `Build the first CultNet TypeScript client`
- `2026-05-06` `Create CultNet Rust core`
- `2026-05-06` `Bring legacy CultNet into the schema-v0 fold`
- `2026-05-06` `Add CultNet C# interop peer harness`
