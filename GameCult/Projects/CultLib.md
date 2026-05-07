---
title: CultLib
description: "Shared C# substrate for GameCult code: data, UI, networking, persistence, and the parts that should stop being rewritten every week."
socialDeck: "Shared C# substrate for the studio's runtime mess."
---

# CultLib

*"All the reusable parts that were tired of being copy-pasted between larger disasters."*

CultLib is the shared C# substrate for GameCult runtime code. It is where persistence, UI remnants, networking layers, security fixes, schema work, and other reusable machinery get pulled into one place instead of being rediscovered in five separate projects like a cursed office supply drawer.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/CultLib">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/cultcache-ts">cultcache-ts</a>
  <a class="gamecult-repo-link" href="/Projects/cultnet-ts">cultnet-ts</a>
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
    <p class="gamecult-repo-fact-value">C# / Unity-adjacent libs</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active shared library</p>
  </div>
</div>

## Founding Idea

The founding idea was not glamorous. It was correct. Shared runtime machinery should live in a shared repo instead of being smeared across project codebases until no one can tell which copy is the cursed one.

## Trajectory

CultLib starts with dependency updates, JSON backing store work, I/O fixes, security cleanup, and a full CultUI port away from legacy prefab residue. Then, a couple of weeks later, the repo pivots harder toward protocol and persistence concerns: MessagePack key stability, CultNet schema discovery, wire compatibility, and an interop harness that makes it clear the library is no longer just local utility code. It is becoming the C# side of a broader studio protocol stack.

## Ambition

The ambition is to become the boring center of gravity other repos can lean on: storage that behaves, schemas that survive, message formats that stay compatible, and runtime helpers that do not need to be reinvented whenever somebody opens Unity with fresh ideas and insufficient restraint.

## History Tells On Itself

- `2026-04-18` `JSON backing store, I/O fixes, Networking Security`
- `2026-04-18` `Complete CultUI Port and remove legacy UI prefabs and scripts`
- `2026-05-06` `Add schema discovery messages to CultNet`
- `2026-05-06` `Bring legacy CultNet into the schema-v0 fold`
- `2026-05-06` `Add CultNet C# interop peer harness`
