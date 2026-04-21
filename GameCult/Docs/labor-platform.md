---
title: Labor Platform
aliases:
  - labor-platform
  - docs/labor-platform
---

# Labor Platform

The Labor Platform was one of the more concrete systems proposed on the legacy site: a web application that would connect GameCult's public projects, contributor workflow, patron history, and internal governance instead of leaving all of that scattered across private memory and third-party tools.

## Architecture

The original concept was a website-integrated app. Users would sign in with GitHub or a GameCult account, interact with pages on the public site, and trigger actions backed by an application and database layer on the server. That backend would talk to GitHub for issue creation, task assignment, and related contribution data.

## Core Areas

### Contribute

Members were meant to be able to browse outstanding issues, volunteer for tasks, and understand the status of the work without spelunking through multiple systems.

The old platform description expected each task entry to expose:

- project
- task name
- category
- status
- assigned members or volunteers
- estimated man-hours
- skill level
- contribution points

### Vote

Members were also supposed to be able to help determine the future direction of GameCult by creating motions and voting on them.

### Profile

Profiles were meant to capture the context that makes task assignment and compensation legible:

- nickname
- member tier
- portfolio link
- skills
- availability
- task history
- payout information
- point balance

## Motions

The legacy platform split motions into two broad classes.

### Management

Management motions would affect the organization itself, including thresholds, roles, and internal policy. They were time-limited and would pass or fail based on vote distribution when the clock expired.

### Projects

Project motions would result in new issues or bounties. These were the route for bug reports, feature requests, balance ideas, and new content proposals. The original concept used positive-vote thresholds by category:

- bugs: 15%
- cosmetics: 30%
- balance changes: 40%
- features: 50%
- new content: 50%
- fundamental design changes: 66%

## Tiers

The platform described two overlapping point systems: patrons and contributors. Both affected a member's tier and therefore the weight of their vote.

### Decay

To avoid permanent historical lock-in, old point balances were meant to decay over time. The original rule was 1% weekly decay on historical balances, rounded down. Project-specific contribution points would not decay.

### Patrons

Patron tier combined current recurring support with historical donations. Historical donations would be halved after a month and then subject to decay.

The original patron ladder was:

- Bronze: 10 points
- Silver: 100 points
- Gold: 1,000 points
- Platinum: 10,000 points
- Unobtanium: 100,000 points

### Contributors

Contributor points were supposed to come from completed work, scaled by things like estimated labor and skill level. New contributors would start with a small automatic allotment.

The original contributor ladder was:

- Postulate: 10 points
- Initiate: 100 points
- Novice: 1,000 points
- Adept: 10,000 points
- Master: 100,000 points

Those tiers were also meant to gate things like revenue sharing eligibility and applications for maintainer or producer roles.

## Revenue Sharing

The legacy proposal divided revenue into three equal portions:

- one distributed by total contribution points
- one distributed by contribution points specific to the project that earned the revenue
- one reserved for budget, expenses, and future development

## Roles

The site also identified some ongoing roles that did not fit neatly into one-off task bounties:

- social media
- community manager
- maintainer
- producer

The key idea was that some forms of labor are continuous care work, not discrete issue tickets, and the platform should account for that instead of pretending only ticket-shaped work matters.

## Workflow

The old workflow was straightforward on paper:

1. a proposal becomes an issue
2. members volunteer
3. a producer assigns the work
4. the assignee submits a pull request by the deadline
5. a maintainer reviews the work
6. points and payout are awarded on successful completion

This page is here as a preserved concept document, not as proof that the system already exists in production. But it remains a useful reference for the kind of contributor platform the studio once intended to build.
