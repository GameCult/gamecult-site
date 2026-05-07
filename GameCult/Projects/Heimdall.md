---
title: Heimdall
description: "Shared identity authority for GameCult apps on Yggdrasil: OAuth provider glue, linked identities, signed claims, sessions, and enough discipline to stop every app from rebuilding auth in a different costume."
socialDeck: "Shared auth so every app stops relearning OAuth."
---

# Heimdall

*"The identity authority for Yggdrasil, because rebuilding provider OAuth in every app is a bad hobby."*

Heimdall is the shared auth authority taking shape for GameCult-hosted experiments. It centralizes provider OAuth, linked identities, grants, entitlements, token sealing, and signed claim issuance so every new app does not have to rebuild Discord/Patreon/GitHub/Twitch login glue from scratch and then act shocked when the result grows mold.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/Heimdall">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/repixelizer">repixelizer</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">26 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">29 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">TypeScript / Fastify / JWT / Postgres</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active auth service</p>
  </div>
</div>

## Founding Idea

The founding idea is painfully simple: shared auth should actually be shared. Provider OAuth, linked identities, sessions, grants, and signed claims belong in one authority service, while app-domain data stays local so "shared auth" does not immediately become "shared swamp."

## Trajectory

The public history is a tight implementation burst around real integration seams rather than abstract identity theology. StreamPixels and Repixelizer show up early. Then you get managed provider credentials, Twitch verification, EventSub alignment, token scope normalization, and persisted credential handoff state. In other words, the repo is not philosophizing about auth. It is already tripping over the practical reasons a shared authority needs to exist.

## Ambition

The ambition is to become the boring identity layer for GameCult's hosted apps: one service that handles provider negotiation, token sealing, session issuance, and signed claims, while app backends verify locally and keep their own domain logic. Central authority, distributed dignity.

## History Tells On Itself

- `2026-04-26` `Initial public repo creation`
- `2026-04-29` `Add StreamPixels managed auth seams`
- `2026-04-29` `Persist StreamPixels credential handoff state`
- `2026-04-29` `Normalize OAuth token scopes`
- `2026-04-29` `Record StreamPixels Twitch verification`
- `2026-04-29` `Refresh managed provider credentials on resolve`
