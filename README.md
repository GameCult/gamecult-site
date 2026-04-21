# GameCult Site

`gamecult-site` is the new Quartz-based source for the public `gamecult.org` root site.

It follows the same general split that worked well for `AetheriaLore`:

- `GameCult/` contains the actual site content in Markdown
- `quartz-site/` contains the vendored Quartz implementation and custom UI
- `scripts/quartz/quartz.ps1` is the beginner-friendly helper for local build and dev runs
- `.github/workflows/deploy-quartz.yml` deploys the static site to GitHub Pages

## Goals

- replace the legacy Grav site with a static workflow that edits well outside a CMS
- keep developer ergonomics close to the Aetheria site
- provide a natural home for studio pages, blog posts, docs, and project hubs
- link to `aetheria.gamecult.org` as the deeper Aetheria-specific vault and publishing surface

## Local Development

From the repo root:

```powershell
.\scripts\quartz\quartz.ps1 dev
```

For a one-off production build:

```powershell
.\scripts\quartz\quartz.ps1 build
```

The generated static output goes to `quartz-site/public`.

## Repo Map

- `GameCult/index.md`: root landing page and top-level navigation hub
- `GameCult/Studio/`: studio model, process, and participation pages
- `GameCult/Projects/`: project overview pages
- `GameCult/Blog/`: public-facing updates and essays
- `GameCult/Docs/`: contributor-facing or audience-facing documentation
- `GameCult/Aetheria/`: Aetheria hub pages that point toward the larger subsite

## Design Direction

This site intentionally reuses parts of the Aetheria Quartz shell:

- dark-first visual treatment
- bold masthead and section chips
- overview-note-driven sidebar navigation

But it is not a copy of the Aetheria lore site. The structure here is broader and aimed at the studio root.
