---
title: CultLib
description: "GameCult's typed persistence, transport, and mesh substrate, with cross-runtime wire compatibility proven only for the named schema-v0 lanes."
socialDeck: "Typed state across runtimes, with the scope and receipts kept attached."
---

# CultLib

*"The very large hammer hiding under the studio floorboards."*

CultLib is the glue holding the GameCult swarm together. CultCache preserves
typed state, CultNet carries shared wire contracts, and CultMesh exposes live
state, capabilities, discovery, and relationships. Runtime ports let daemons
participate without translating the organization into a fresh pile of local
glue every time a service boundary changes language.

The proven claim is deliberately narrower than the ambition: CultLib's hosted
interoperability harness exercises shared schema-v0 wire and RUDP lanes across
C#, TypeScript, Rust, Python, and Kotlin. That does **not** establish identical
APIs, feature ownership, performance, hot-loop memory layout, or production
server responsibility in every runtime. Service adoption remains uneven.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/CultLib">GitHub Repo</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/CultLib/blob/main/docs/runtime-parity-scope.md">Runtime Parity Scope</a>
  <a class="gamecult-repo-link" href="https://github.com/GameCult/CultLib/actions/workflows/cultnet-interop.yml">Interop Runs</a>
  <a class="gamecult-repo-link" href="/Docs/Architecture-and-Evidence#cultlib-the-cross-runtime-glue">Architecture and Evidence</a>
</div>

## The live boundaries

- **CultCache** owns the shared typed document and persistence vocabulary.
- **CultNet** owns transport contracts for those documents, including the named
  cross-runtime RUDP lanes.
- **CultMesh** owns live distributed state, discovery, capabilities, leases,
  subscriptions, and relationships built on that vocabulary.
- **Runtime ports** implement the portion their consumers require. A port does
  not inherit every authority or performance claim from the C# anchor.
- **Eve** consumes provider-owned CultMesh surfaces and lowers them for humans
  and agents. CultLib carries the state; Eve does not become its owner.

## Why it matters

When compatible daemons share a typed wire contract, evidence and capabilities
can cross runtime boundaries without a bespoke translation service quietly
becoming the new source of truth. That is what lets a project Epiphany inspect
the living state of its deployed Body through Eve and act through the same
provider-owned command surface.

The target is broader: portable state and native communication across the
whole fleet, with mesh participation suited to each runtime. The current proof
is the named interoperability harness. The distinction stays attached because
software has enough priests already.

Return to the [Persona-first Project Atlas](/Projects/) for stewardship, or
inspect the full [authority and proof ledger](/Docs/Architecture-and-Evidence).
