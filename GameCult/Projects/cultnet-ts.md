---
title: cultnet-ts
description: "TypeScript CultNet client and interop layer for schema discovery, local replication, and cross-runtime communication."
socialDeck: "Cross-runtime message traffic without bespoke wire misery."
---

# cultnet-ts

*"The TypeScript side of the wire: contracts, discovery, replication, and fewer excuses for every runtime to speak its own private dialect."*

`cultnet-ts` is the TypeScript CultNet client and interop layer. It exists so the TypeScript tools in the studio stack can exchange messages, discover schemas, replicate locally, and stay compatible with the C# side without treating cross-runtime communication as an artisanal craft.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultnet-ts">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/CultLib">CultLib</a>
  <a class="gamecult-repo-link" href="/Projects/cultcache-ts">cultcache-ts</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">06 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">06 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">TypeScript</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Fresh active protocol client</p>
  </div>
</div>

## Founding Idea

The founding idea is straightforward and overdue: if GameCult's newer tooling is going to span languages and runtimes, it needs a shared network vocabulary instead of a pile of ad hoc bridges that work until the second you care about reliability.

## Trajectory

The entire public history happens on one day and still manages to look like a miniature roadmap. First client. Then explicit CultLib wire compatibility. Then generated shared contracts. Then schema discovery. Then a raw local replication lane. Then a cross-runtime interop harness. Then GitHub Actions coverage to stop the whole thing from quietly drifting into fiction.

## Ambition

The ambition is bigger than this tiny initial burst suggests. `cultnet-ts` wants to be one of the wires holding the studio's tool ecology together: agent systems, site-adjacent tooling, local services, and whatever other little machines start trying to talk to each other once the architecture stops being private folklore.

## History Tells On Itself

- `2026-05-06` `Build the first CultNet TypeScript client`
- `2026-05-06` `Add explicit CultLib wire-contract compatibility`
- `2026-05-06` `Generate shared swarm contracts from schemas`
- `2026-05-06` `Add CultNet schema discovery catalog`
- `2026-05-06` `Add cross-runtime CultNet interop harness`
