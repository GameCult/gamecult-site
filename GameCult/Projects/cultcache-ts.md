---
title: cultcache-ts
description: "TypeScript port of CultCache: typed schema-backed persistence for the growing swarm of studio-side tools."
socialDeck: "Typed persistence for the studio's TypeScript swarm."
---

# cultcache-ts

*"A one-day TypeScript sprint to stop every new tool from inventing storage badly and from scratch."*

`cultcache-ts` is the TypeScript port of the CultCache persistence model: schema-backed, typed, polymorphic storage intended to give the studio's TypeScript tools a sane data spine instead of a growing pile of improvised JSON sorrow.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/cultcache-ts">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/CultLib">CultLib</a>
  <a class="gamecult-repo-link" href="/Projects/cultnet-ts">cultnet-ts</a>
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
    <p class="gamecult-repo-fact-value">Fresh active port</p>
  </div>
</div>

## Founding Idea

The founding idea was brutally practical: if the studio is going to keep growing TypeScript-side tooling, it needs the CultCache model there too. Same schema discipline. Same typed persistence. Fewer excuses for bespoke storage nonsense.

## Trajectory

The public history is compact and extremely legible. First comes the port. Then built output for consumers. Then a broader ergonomics pass. Then schema compatibility, generic exports, and finally a raw-envelope fast path. It is the kind of repo history you get when someone knows exactly which abstraction they want and is just sprinting to make the TypeScript version stop being hypothetical.

## Ambition

The ambition is to become quiet infrastructure: reliable enough that other repos can lean on it without having to think about it much. That is the compliment, not the insult.

## History Tells On Itself

- `2026-05-06` `Initial CultCacheTS port`
- `2026-05-06` `Ship built output for consumers`
- `2026-05-06` `Expand CultCacheTS toward full CultCache ergonomics`
- `2026-05-06` `Accept generated parse-style schemas in CultCacheTS`
- `2026-05-06` `Add raw envelope fast path to CultCacheTS`
