# GameCult-Quartz Extraction Plan

## Summary

`gamecult-site` and `AetheriaLore` are already maintaining two slightly different copies of the same Quartz fork, build workflow, page chrome, and design system. That is not a strategy. It is a slowly growing cleanup bill.

The fix is to extract the shared engine into a separate repository named `GameCult-Quartz`, keep `gamecult-site` and `AetheriaLore` as separate content-and-brand repositories, and let each site consume the shared engine through a pinned reference. The key idea is shared engine, separate sites, deliberate override points.

The recommended first delivery model is **not** a submodule. Start with a second checkout in CI plus a local bootstrap script. That keeps GitHub Pages compatibility, reduces duplication immediately, and avoids submodule nonsense during the first extraction. If the shared engine stabilizes and the local ergonomics are still worth it, a submodule can be added later as a pinning mechanism rather than as the architecture itself.

## Goals

- Remove duplicated Quartz infrastructure from `gamecult-site` and `AetheriaLore`.
- Keep one shared source of truth for:
  - vendored Quartz fork and patches
  - build tooling
  - deploy workflow logic
  - shared page chrome
  - shared typography, color tokens, spacing, and component primitives
- Preserve separate repositories for separate domains and GitHub Pages deployments.
- Allow each site to diverge where it matters:
  - content model
  - masthead navigation
  - sidebars
  - page-specific components
  - site-specific prose and media
- Keep the migration reversible until both sites are successfully cut over.

## Non-Goals

- Do not merge `gamecult-site` and `AetheriaLore` into one monorepo.
- Do not try to perfectly genericize every site-specific component during extraction.
- Do not rebuild Quartz from scratch or replace it with a different static-site stack.
- Do not introduce a private package registry or a complicated publish/install pipeline just to share a few directories.

## Recommended Architecture

### Repository split

`GameCult-Quartz`

- Owns the shared Quartz engine and all code that should behave the same across sites.
- Tracks upstream Quartz changes in one place.
- Exposes stable override points for site-specific layout, styles, and components.

`gamecult-site`

- Owns GameCult content, GameCult media, GameCult-specific components, and GameCult-specific config.
- Builds `gamecult.org` using `GameCult-Quartz`.

`AetheriaLore`

- Owns Aetheria vault content, Aetheria media, Aetheria-specific components, and Aetheria-specific config.
- Builds `aetheria.gamecult.org` using `GameCult-Quartz`.

### Shared vs site-specific responsibility

Shared in `GameCult-Quartz`

- `quartz/` fork and upstream patches
- `package.json`, lockfile, and Node build tooling
- common build scripts
- reusable GitHub Pages workflow
- shared `Breadcrumbs`, `Head`, page-header wiring, and similar infra components
- shared style foundation:
  - fonts
  - color tokens
  - panel/card primitives
  - page chrome
  - common responsive behavior
- generic composite/page helpers where they truly are generic

Site-specific in each consumer repo

- content directories such as `GameCult/` or `Aetheria/`
- media and static assets specific to the site
- site config values:
  - `pageTitle`
  - `baseUrl`
  - nav model
  - footer links
  - ignore patterns
- site-only components:
  - `GameCultMasthead`
  - `AetheriaMasthead`
  - overview sidebars
  - author metadata components
  - custom landing-page composites when they are meaningfully different
- small site override stylesheet layered on top of the shared base

## Recommended Delivery Model

### Phase 1 recommendation: shared repo checkout, not submodule

Each site repo keeps its own content and a thin site adapter layer. GitHub Actions checks out:

1. the site repo
2. the `GameCult-Quartz` repo at a pinned ref

The site build then runs against the shared engine checkout and emits `public/` as usual for GitHub Pages.

Local development uses a small bootstrap script that expects `GameCult-Quartz` as a sibling checkout or clones it automatically to a cache/worktree path.

Why this first:

- easiest extraction path
- minimal Git friction
- easy to roll back
- keeps Pages deployment clean because both sites already use custom Actions workflows
- lets the shared-engine API settle before introducing submodule bookkeeping

### Phase 2 option: add a submodule if it still earns its keep

If the engine layout stabilizes and the team wants repo-local pinning visible in Git history, each site repo can add `GameCult-Quartz` as a submodule.

This should be treated as an optional optimization, not the core plan.

Why not start there:

- submodules add contributor friction immediately
- they create another class of failure during the extraction itself
- they solve pinning, not architecture

## Target Layout

### `GameCult-Quartz`

```text
GameCult-Quartz/
  .github/
    workflows/
      quartz-pages.yml
  quartz/
  scripts/
    quartz/
  shared/
    components/
    styles/
    presets/
  templates/
    site-config/
  package.json
  package-lock.json
  README.md
```

### `gamecult-site`

```text
gamecult-site/
  .github/
    workflows/
      deploy-quartz.yml
  GameCult/
  media/ (if needed later)
  site/
    quartz.config.ts
    quartz.layout.ts
    components/
      GameCultMasthead.tsx
      GameCultOverviewSidebar.tsx
      ...
    styles/
      site.scss
  scripts/
    quartz/
      quartz.ps1
  README.md
```

### `AetheriaLore`

```text
AetheriaLore/
  .github/
    workflows/
      deploy-quartz.yml
  Aetheria/
  site/
    quartz.config.ts
    quartz.layout.ts
    components/
      AetheriaMasthead.tsx
      AetheriaOverviewSidebar.tsx
      AetheriaAuthorMeta.tsx
      ...
    styles/
      site.scss
  scripts/
    quartz/
      quartz.ps1
  README.md
```

## Migration Phases

### 0. Freeze the shape

- Stop doing opportunistic structural edits inside both vendored `quartz-site/` trees.
- Keep feature work moving, but avoid large new framework changes until the extraction branch exists.
- Document the current deltas between the two sites:
  - shared components
  - clearly site-specific components
  - style rules that should become shared tokens/primitives

### 1. Extract the deploy workflow first

- Move the duplicated GitHub Pages workflow logic into a reusable workflow in `GameCult-Quartz`.
- Update both site repos to call that workflow.
- Keep this step narrow. It proves cross-repo workflow reuse before touching the engine layout.

Expected win:

- immediate removal of duplicated CI logic
- one place to change Node version, Pages artifact behavior, and common build steps

### 2. Create `GameCult-Quartz`

- Seed the new repo from one current `quartz-site/` tree, preferably `gamecult-site` because it already has:
  - trimmed breadcrumbs
  - SPA disabled where needed
  - broader GameCult-side component cleanup
- Strip site content out of it.
- Keep only the shared engine, build tooling, and shared styles/components.

### 3. Define the site adapter boundary

- Introduce a stable folder contract for consumer repos:
  - `site/quartz.config.ts`
  - `site/quartz.layout.ts`
  - `site/components/*`
  - `site/styles/site.scss`
- Update the shared engine so it imports site config and site overrides from the consumer repo rather than assuming everything lives inside one vendored tree.
- Keep this contract boring and explicit.

### 4. Move shared components and styles into the engine

- Consolidate the genuinely shared pieces:
  - `Breadcrumbs`
  - shared page-header layout behavior
  - shared page shell
  - shared card/panel primitives
  - common typography/color treatment
- Leave site identity components in place for now.
- Rename anything misleadingly site-prefixed if it is becoming shared.

### 5. Convert `gamecult-site`

- Replace the vendored `quartz-site/` usage with the shared engine.
- Keep GameCult-only files in the site adapter layer.
- Build locally and in CI until output matches current site behavior closely enough to trust.

### 6. Convert `AetheriaLore`

- Point the Aetheria repo at the shared engine.
- Port only the site-specific Aetheria components and style overrides that remain necessary.
- Rebuild and compare against current output, especially:
  - masthead
  - breadcrumbs
  - author metadata
  - landing page sections
  - sidebar behavior

### 7. Decide whether submodules are still worth it

- If the shared-engine checkout model is working well, stop there.
- If local version pinning and repo-contained engine references are still desirable, add `GameCult-Quartz` as a submodule in both site repos.
- Do this only after the architecture has settled.

## GitHub Pages Compatibility

This plan stays GitHub Pages compatible because each site continues to:

- build in its own repository
- upload its own `public/` artifact
- deploy to its own Pages environment

The only change is where the build logic and shared Quartz code come from.

With custom Actions workflows, GitHub Pages does not care whether the build engine came from:

- the same repo
- a second checkout
- a submodule

It only cares that the workflow uploads the final static artifact.

## Risks and Mitigations

### Risk: extracting too much at once

Mitigation:

- do the workflow extraction first
- migrate one site at a time
- keep site-specific components local until a shared abstraction is obviously justified

### Risk: inventing a fake abstraction layer

Mitigation:

- only move code into `GameCult-Quartz` when both sites clearly need it
- prefer duplication for genuinely different branding and navigation concerns
- do not genericize mastheads, sidebars, or landing-page composites beyond reason

### Risk: upstream Quartz updates become harder

Mitigation:

- keep the shared engine repo cleanly separated from site content
- document local patches
- keep upstream sync work in one repo instead of two

### Risk: local dev becomes awkward

Mitigation:

- provide one bootstrap script in each consumer repo
- make the script print exactly where the shared engine checkout lives
- support both sibling checkout and cached checkout paths

## Success Criteria

- both sites deploy from separate repos to separate Pages domains
- shared workflow logic exists in one place
- shared Quartz engine changes land once instead of twice
- site-specific changes stay site-specific
- local preview remains one obvious command per repo
- deleting one vendored Quartz copy does not feel like open-heart surgery anymore

## Recommended First Implementation Slice

1. Create `GameCult-Quartz`.
2. Move the shared deploy workflow there and switch both sites to reusable workflow calls.
3. Define the consumer repo contract for `site/` config, layout, components, and styles.
4. Convert `gamecult-site` first.
5. Convert `AetheriaLore` second.
6. Revisit submodules only after both sites are stable on the shared engine.

That order cuts duplication early, keeps rollback paths open, and avoids introducing Git ceremony before the real architectural line has even been drawn.
