---
title: GameCult Labor Platform
aliases:
  - labor-platform
  - gclp
---

# GameCult Labor Platform

*"Game development is hard enough without running the studio on folklore, spreadsheets, and whoever still remembers what happened in Discord."*

The GameCult Labor Platform, or `GCLP` if we are pretending to be concise, is the internal operating layer for the studio. It is where work, governance, patronage, contributor history, and payout logic stop living in private memory and start becoming legible enough to inspect, argue with, and improve.

The concrete buildout for that system is now called **Bifrost**. That part matters, because this page is no longer describing a cool idea we keep menacing the future with. There is a neighboring application repo, a real stack choice, a real deployment target, and the first implementation slice already standing there looking nervous.

## What Bifrost Is

Bifrost is the planned member-facing application for GameCult, intended to run at `bifrost.gamecult.org` on Yggdrasil.

The current implementation direction is pleasantly boring:

- ASP.NET Core 8
- Razor Pages plus HTMX
- PostgreSQL
- GitHub OAuth for sign-in
- GitHub App integration for issue and pull request sync
- nginx plus systemd on Yggdrasil

No Ethereum. No wallets. No DAO cologne. No attempt to make accounting feel like a hostage situation for normal people.

## What Exists Already

The Bifrost repo is past napkin stage and into first-slice territory.

Right now it already has:

- an ASP.NET Core web app scaffold
- a PostgreSQL-backed EF Core domain model
- GitHub sign-in wiring
- invite and approval-based membership gating
- UI for members, projects, work items, motions, and ledgers
- integration tests

That is not the same thing as "ready to inflict on the public internet," but it does mean the platform has graduated from pure manifesto into software with opinions.

## What The Platform Actually Does

### Membership

Members sign in with GitHub, then pass through the invite and approval gate before they become active participants. Authentication and membership are separate on purpose. Logging in is not the same thing as earning the keys to the machine.

Profiles should make contribution context visible instead of turning assignment into a vibes-based art project:

- nickname
- skills
- availability
- portfolio or links
- task history
- point balances
- internal payout metadata

### Work

The platform should hold both GitHub-backed work items and internal tasks in one place, because not every useful thing in a studio becomes an issue by divine revelation.

Each work item needs enough context to be assigned and reviewed without séance work:

- project
- category
- status
- volunteers and assignees
- estimated hours
- skill level
- deadline
- review state
- contribution outcome

This also means accounting for continuous care work like maintaining repos, producing releases, tending community, and doing the boring connective labor that keeps the larger machine from making a strange grinding noise and catching fire.

### Governance

Motions still split into two broad classes:

- `Management` motions for roles, thresholds, policy, and internal structure
- `Project` motions for scoped changes, proposals, and work creation

Project-motion thresholds remain:

- bugs: 15%
- cosmetics: 30%
- balance changes: 40%
- features: 50%
- new content: 50%
- fundamental design changes: 66%

The important part is not that these numbers are holy. It is that the decision path is visible, contestable, and not purely controlled by whoever happened to be loudest in the room that day.

### Ledgers, Tiers, And Revenue Share

The platform uses two overlapping point systems: patrons and contributors. Both matter. Both affect tiering. Both eventually affect governance weight and payout eligibility.

Patron tiers:

- Bronze: 10 points
- Silver: 100 points
- Gold: 1,000 points
- Platinum: 10,000 points
- Unobtanium: 100,000 points

Contributor tiers:

- Postulate: 10 points
- Initiate: 100 points
- Novice: 1,000 points
- Adept: 10,000 points
- Master: 100,000 points

Historical balances decay at 1% per week, rounded down, to keep the system from becoming a permanent aristocracy of whoever showed up first. Project-specific contributor points do not decay.

Revenue share still follows the same split:

- one third by total contribution points
- one third by contribution points for the project that earned the revenue
- one third reserved for budget, expenses, and future development

In Bifrost v1, that logic stays internal and reviewable. The app can calculate, explain, and batch payout proposals. It does not send money on its own, because the cleanest way to ruin a decent system is to let the unfinished version start pulling financial levers unsupervised.

## What Is Still Missing

The current build is a strong first slice, not a public alpha.

Before Bifrost is ready for a real rollout, it still needs:

- initial EF Core migrations and repeatable database bootstrap
- GitHub App webhook ingestion and issue or pull request sync
- stronger role and permission hardening
- health checks, logging, and deployment smoke tests
- nginx or systemd deployment artifacts and matching ops runbooks
- backup and restore instructions
- full point-ledger rules for patron credit, contributor credit, decay, and adjustments
- revenue share batch generation and approval flow

So yes, the platform is real now. It is just still in the phase where honesty matters more than pretending the scaffolding is a cathedral.

## Rollout Shape

The least cursed rollout path still looks like this:

1. deploy a private staging environment on Yggdrasil
2. complete the member-alpha core for invites, work, motions, and ledgers
3. implement the actual points and decay engine
4. add governance thresholds, revenue events, and payout proposal batches
5. only then consider broader member-facing rollout

That sequence is slower than slapping together a dashboard and announcing The Future Of Cooperative Production, but it has the minor advantage of not being nonsense.
