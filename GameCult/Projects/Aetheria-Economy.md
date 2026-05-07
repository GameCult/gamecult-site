---
title: Aetheria-Economy
description: "Playable Aetheria code: Unity runtime, ships, galaxy systems, UI, networking, and the long attempt to make the flagship universe physically real."
socialDeck: "Where Aetheria stops being lore and becomes a ship."
---

# Aetheria-Economy

*"The flagship runtime: ships, systems, logistics, heat, UI, and all the other rude parts that turn setting notes into a game."*

Aetheria-Economy is the public codebase where Aetheria stops being cosmology and starts becoming a machine. It is the Unity repo for the playable side of the flagship universe: flight, map systems, UI, networking experiments, editors, rendering, data plumbing, and the ongoing effort to make a galaxy feel like more than a mood board with a ship pasted over it.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/Aetheria-Economy">GitHub Repo</a>
  <a class="gamecult-repo-link" href="https://aetheria.gamecult.org">Public Setting Site</a>
  <a class="gamecult-repo-link" href="/Projects/AetheriaLore">AetheriaLore</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">18 Feb 2020</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">30 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">C# / Unity</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active flagship runtime</p>
  </div>
</div>

## Founding Idea

The founding idea was never "make a tiny ship prototype and call it a day." Right out of the gate the public history shows client/server communication, a galaxy editor, database support, zone rendering tests, market work, title screens, and a networking stack swap. The repo was trying to host a whole world, not a tech toy.

That matters because Aetheria's ambitions are structurally rude. It wants cockpit action, economic systems, factional scale, and enough simulation to let logistics become gameplay instead of menu garnish. A repo like this exists because that kind of project needs an actual spine.

## Trajectory

The history breaks into visible eras. The 2020 phase is a land rush: core Unity scaffolding, networking, galaxy tooling, menus, market surfaces, server delivery, and all the early "can this even stand up" work that leaves commit messages looking half exhilarated and half sleep-deprived.

Then the public branch goes through later revitalization waves: playability passes in 2022, performance and nebula/rendering work, then a more recent 2025-2026 line full of Unity 6 upgrades, gravity surface work, map bugfixes, lore synchronization, and finally the Epiphany editor bridge. That last bit is especially telling. The repo is no longer just trying to run a game. It is starting to plug into a broader studio tooling ecosystem.

The public branch also does not capture the whole life of the project cleanly. There are clear signs of branch surgery, imported work, and rewritten emphasis. That is not a problem for the page. It is a clue. This is a living flagship repo, not a museum exhibit with perfect provenance labels.

## Ambition

The ambition here is still the dangerous one: a playable wedge of the broader Aetheria machine that can prove ships, routes, heat, stakes, and scale without pretending the whole galaxy has to ship at once. The repo wants to carry more than a vertical slice, but it also knows better now than to demand the moon before it can keep the hull together.

## History Tells On Itself

- `2020-02-26` `Initial Client/Server Communication`
- `2020-03-11` `Porting Galaxy Editor`
- `2020-03-22` `Database Support`
- `2020-03-24` `Out with MagicOnion, in with LiteNetLib`
- `2022-08-08` `Playability`
- `2025-07-10` `Unity 6 Upgrade + Solid Gravity Surface`
- `2026-04-30` `Add Epiphany Unity editor bridge`
