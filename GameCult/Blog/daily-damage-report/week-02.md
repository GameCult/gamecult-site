---
title: Daily Damage Report · Week 02
description: "25 Apr to 01 May 2026: auth seams, queue pressure, Aetheria tooling, and the great admission that several site repos were really one engine in bad disguise."
socialDeck: "Auth, pixels, site extraction, and multiple repos finally admitting they were one machine in different coats."
date: 2026-05-01
author: GameCult
---

*"25 Apr 2026 to 01 May 2026. Fewer births this week, more systems deciding whether to harden or molt."*

This was the week of shared auth, hosted pressure, Aetheria editor bridges, and the point where several supposedly separate site repos finally stopped lying about their relationship.

## 01 May 2026

Several threads that had been circling each other finally admitted they were the same machine.

- [AetheriaLore](https://aetheria.gamecult.org) restored its visual front page and expanded the game-design hierarchy, which is a polite way of saying the setting stopped living in scattered vault residue and started behaving like an actual public home again.
- `gamecult-site` switched onto the shared [GameCult-Quartz](https://github.com/GameCult/GameCult-Quartz) engine instead of lugging around its own private Quartz fork like a guilty little duplicate organ.
- [GameCult-Quartz](https://github.com/GameCult/GameCult-Quartz) itself was extracted as the shared engine and immediately got dragged into title extraction, description cleanup, and image-forward social preview work. As usual, shared infrastructure got born into responsibility instead of leisure.
- [Ghostlight](/Projects/Ghostlight) scaffolded its persistence spine, then retargeted itself toward `Call of the Void` authoring and prompt projection. The repo stopped pretending it was only a vague agent experiment and started choosing a scene.

## 30 Apr 2026

The flagship universe stuck a new cable into the wall.

- [Aetheria-Economy](https://aetheria.gamecult.org) added an Epiphany Unity editor bridge, which matters because the Aetheria runtime keeps trying to become more inspectable, more connected, and less trapped inside one editor-shaped kingdom at a time.

## 29 Apr 2026

Auth and pixel work both got more adult, which is not glamorous but does keep the floor from collapsing.

- [Heimdall](/Projects/Heimdall) pushed deeper into managed-auth seams for StreamPixels: credential handoff state, normalized OAuth scopes, and provider credential refresh on resolve. The shared auth authority kept doing the thankless work of making multiple apps not behave like feral strangers.
- [repixelizer](/Projects/repixelizer) logged hosted queue and job pressure, which is one of those sober infrastructure moves that quietly separates an actual service from a demo that only behaves when nobody is looking.

## 26 Apr 2026

A gatekeeper arrived, hopefully the useful kind.

- [Heimdall](/Projects/Heimdall) became public as the shared auth authority for the Yggdrasil stack: one place to handle identity, grants, entitlements, and signed claims so every GameCult app does not have to re-enact OAuth from first principles like a cursed school project.
