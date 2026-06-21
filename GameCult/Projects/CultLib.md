---
title: CultLib
description: "GameCult's shared state, transport, and runtime substrate: CultCache persistence, CultNet reliable UDP, CultMesh distributed sync, and cross-runtime parity across C#, Rust, Kotlin, Python, and TypeScript."
socialDeck: "Typed persistence, reliable UDP, distributed state, and runtime parity for the rest of the machine."
---

# CultLib

*"The very large hammer hiding under the studio floorboards."*

CultLib is GameCult's shared state, transport, and runtime substrate. The C# repo is the anchor, but the real promise is parity: C#, Rust, Kotlin, Python, and TypeScript can read the same `.cc` documents, speak the same schema-v0 wire formats, discover compatible peers, and build native surfaces around the same state instead of translating through a new pile of glue every time a project crosses a runtime boundary.

The three big pieces are CultCache, CultNet, and CultMesh. CultCache owns typed persistence and SoA memory shape. CultNet owns ergonomic networking over reliable UDP using CultCache document contracts, with LiteNetLib now treated as an adapter rather than the spec. CultMesh sits above them as the distributed database and simulation-consensus layer: peers publish facts, witnesses re-simulate disputed events, and the mesh gathers consensus before canonical state is committed.

That is the practical reason Aetheria could move from single-player toward co-op in days. CultLib turns "make this a distributed MMO" from an open-ended networking rewrite into a question the stack already knows how to answer: persist the world, move the documents, discover the Verse, gather witness observations, reconcile state, and let the UI/runtime surface follow.

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
    <p class="gamecult-repo-fact-value">C# / Rust / Kotlin / Python / TypeScript</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active repo family</p>
  </div>
</div>

## What It Enables

CultLib is not just a package. It is a capability layer for projects that need typed state to survive process boundaries, machine boundaries, and language boundaries.

- CultCache gives every runtime a shared document and persistence model.
- CultNet moves those documents through authenticated schema-aware transports, including GameCult's native cross-runtime RUDP pipe.
- CultMesh turns the document stream into distributed state: shard replication, peer exchange, Verse discovery, authority leases, prediction, and witness-authoritative consensus.
- CultUI and Eve-facing surfaces let the same state become inspectable native GUI or operator UI instead of another debug-only side channel.

This is the nervous system behind the "Perfect Machine" instruction: spin up a multiplatform app, keep the data typed, keep the wire format honest, let the mesh decide where authority lives, and make the state visible to humans and agents.

## Founding Idea

The founding idea was not glamorous. It was correct. Shared runtime machinery should live in a shared home instead of being smeared across project codebases until nobody can tell which copy is the cursed one.

## Trajectory

CultLib starts with dependency updates, JSON backing store work, I/O fixes, security cleanup, and a full CultUI port away from legacy prefab residue. Then the focus hardens around schema, persistence, and wire contracts. On 06 May 2026 the family abruptly flowers outward: `cultcache-ts` ships the TypeScript port, `cultcache-rs` lands the Rust cache crate, `cultcache-py` appears as the Python control-plane sibling, `cultnet-ts` becomes the TypeScript client, and `cultnet-rs` becomes the Rust peer. Kotlin joins the surface as CultMesh and Eve work reaches Android-adjacent runtimes.

The point is that CultLib stopped being "some useful C# libraries" and became the canonical home for the studio's persistence, transport, and distributed-state vocabulary. The separate language packages are real, but they orbit one core promise: if a GameCult runtime can read the document and speak the schema, it can participate in the mesh.

## Ambition

The ambition is to become the boring center of gravity other repos can lean on: storage that behaves, schemas that survive, message formats that stay compatible, native RUDP that does not belong to one runtime, and mesh authority that can scale from a co-op session to a Verse full of thousands of witnesses without rewriting the game around a single central server's opinion.

## Repo Family

- [CultLib](https://github.com/GameCult/CultLib): the C# anchor repo where the schema and interop story first hardened.
- [cultcache-ts](https://github.com/GameCult/cultcache-ts): TypeScript CultCache port with schema-backed MessagePack storage.
- [cultcache-rs](https://github.com/GameCult/cultcache-rs): Rust CultCache crate for typed envelopes and slot-safe persistence.
- [cultcache-py](https://github.com/GameCult/cultcache-py): Python CultCache port aimed at control-plane and bootstrap surfaces.
- [cultnet-ts](https://github.com/GameCult/cultnet-ts): TypeScript CultNet client and cross-runtime contract surface.
- [cultnet-rs](https://github.com/GameCult/cultnet-rs): Rust CultNet peer with schema discovery and raw replication lanes.
- `cultmesh-kotlin`: Kotlin/JVM CultMesh and Eve surface for Android-adjacent runtimes, currently living inside the CultLib monorepo.

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
