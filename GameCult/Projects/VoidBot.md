---
title: VoidBot
description: "Discord-native assistant for GameCult: archived history, indexed repos, lore retrieval, semantic search, and Codex handoff once chat stops being a sane place to do real work."
socialDeck: "Discord memory, repo retrieval, Codex handoff."
---

# VoidBot

*"A Discord-native assistant, because apparently the server needed one more opinionated little archivist."*

VoidBot is the Discord-native assistant for GameCult. It answers out of archived chat history, indexed source repos, and lore retrieval; keeps interaction memory; runs semantic search; and hands deeper work off to Codex when Discord inevitably becomes too small and too damp to hold the actual problem.

<div class="gamecult-repo-links">
  <a class="gamecult-repo-link" href="https://github.com/GameCult/VoidBot">GitHub Repo</a>
  <a class="gamecult-repo-link" href="/Projects/Ghostlight">Ghostlight</a>
  <a class="gamecult-repo-link" href="/Projects/CultLib">CultLib</a>
</div>

<div class="gamecult-repo-facts">
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Started</p>
    <p class="gamecult-repo-fact-value">24 Apr 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Last Public Push</p>
    <p class="gamecult-repo-fact-value">06 May 2026</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Stack</p>
    <p class="gamecult-repo-fact-value">TypeScript / Discord / Qdrant / Ollama</p>
  </div>
  <div class="gamecult-repo-fact">
    <p class="gamecult-repo-fact-label">Status</p>
    <p class="gamecult-repo-fact-value">Active Discord assistant</p>
  </div>
</div>

## Founding Idea

The founding idea is not "put an LLM in Discord." That is the shallow version. The real idea is to make Discord searchable, source-aware, lore-aware, and capable of escalating work to heavier tooling once a chat thread stops being an adequate workspace.

## Trajectory

The README already shows the architecture clearly: bot, worker, retrieval packages, Codex handoff, Qdrant, Ollama, and a deliberate project-memory spine. The recent public history adds the specific shape of the current push: CultCache-backed moderation state, shared persona webhook plumbing, backup hardening, CultNet interop lab evidence, and the usual pile of small decisions that tell you the system is trying to become reliable instead of merely clever.

## Ambition

The ambition is a Discord-native assistant that remembers the room, knows the repos, knows the lore, and can stop pretending a chat box is enough once real work begins. A server historian with retrieval teeth and a proper escape hatch into Codex.

## History Tells On Itself

- `2026-04-24` `Initial public repo creation`
- `2026-05-06` `Move moderation state behind CultCacheTS`
- `2026-05-06` `Point CultCacheTS submodule at GameCult upstream`
- `2026-05-06` `Add shared Discord persona webhook pipe`
- `2026-05-06` `Harden backup handling after incomplete runs`
- `2026-05-06` `Record CultNet interop lab evidence`
