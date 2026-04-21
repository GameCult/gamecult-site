---
title: Labor Platform
aliases:
  - labor-platform
---

# Labor Platform

The Labor Platform is the application layer of the GameCult model: the place where public projects, contributor history, patronage, and governance stop living in private memory, heroic effort, and random third-party tools.

## Architecture

The platform is conceived as a website-integrated app. Users sign in with GitHub or a GameCult account, interact with pages on the public site, and trigger actions backed by an application and database layer on the server. That backend talks to GitHub for issue creation, task assignment, and related contribution data.

## Core Areas

### Contribute

Members browse outstanding issues, volunteer for tasks, and understand the status of the work without spelunking through five systems and three half-remembered conversations.

Each task entry should expose:

- project
- task name
- category
- status
- assigned members or volunteers
- estimated man-hours
- skill level
- contribution points

### Vote

Members help determine the future direction of GameCult by creating motions and voting on them instead of leaving direction to whoever happened to be awake in chat.

### Profile

Profiles capture the context that makes task assignment and compensation legible instead of a vibes-based art:

- nickname
- member tier
- portfolio link
- skills
- availability
- task history
- payout information
- point balance

## Motions

Motions split into two broad classes.

### Management

Management motions affect the organization itself, including thresholds, roles, and internal policy. They are time-limited and pass or fail based on vote distribution when the clock expires.

### Projects

Project motions result in new issues or bounties. These are the route for bug reports, feature requests, balance ideas, and new content proposals. Positive-vote thresholds vary by category:

- bugs: 15%
- cosmetics: 30%
- balance changes: 40%
- features: 50%
- new content: 50%
- fundamental design changes: 66%

## Tiers

The platform uses two overlapping point systems: patrons and contributors. Both affect a member's tier and therefore the weight of their vote.

### Decay

To avoid permanent historical lock-in, old point balances decay over time. The rule is 1% weekly decay on historical balances, rounded down. Project-specific contribution points do not decay.

### Patrons

Patron tier combines current recurring support with historical donations. Historical donations are halved after a month and then subject to decay.

The patron ladder is:

- Bronze: 10 points
- Silver: 100 points
- Gold: 1,000 points
- Platinum: 10,000 points
- Unobtanium: 100,000 points

### Contributors

Contributor points come from completed work, scaled by things like estimated labor and skill level. New contributors start with a small automatic allotment.

The contributor ladder is:

- Postulate: 10 points
- Initiate: 100 points
- Novice: 1,000 points
- Adept: 10,000 points
- Master: 100,000 points

Those tiers also gate things like revenue sharing eligibility and applications for maintainer or producer roles.

## Revenue Sharing

Revenue is divided into three equal portions:

- one distributed by total contribution points
- one distributed by contribution points specific to the project that earned the revenue
- one reserved for budget, expenses, and future development

## Roles

Some ongoing roles do not fit neatly into one-off task bounties, because human work stubbornly refuses to become tickets on command:

- social media
- community manager
- maintainer
- producer

The key idea is that some forms of labor are continuous care work, not discrete issue tickets, and the platform should account for that instead of pretending only ticket-shaped work matters.

## Workflow

The workflow is straightforward on paper:

1. a proposal becomes an issue
2. members volunteer
3. a producer assigns the work
4. the assignee submits a pull request by the deadline
5. a maintainer reviews the work
6. points and payout are awarded on successful completion

This remains a concept document rather than a deployed production system, but it shows the shape of the contributor platform GameCult wants to build.
