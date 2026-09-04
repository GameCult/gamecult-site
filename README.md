# GameCult Site

`gamecult-site` is the public `gamecult.org` root site: studio pitch, projects, docs, blog, and the usual pile of ambitions trying to look organized in public.

The site builds against the shared `GameCult-Quartz` engine. This repo owns published content and the GameCult overlay.

## Repo Shape

- `GameCult/`: published Markdown content
- `site/`: GameCult-specific Quartz overlay
  - `quartz.config.ts`
  - `quartz.layout.ts`
  - custom components
  - custom styles in `site/quartz/styles/custom.scss`
  - static assets
- `quartz-site/public/`: generated static output
- `scripts/quartz/quartz.ps1`: local build/dev launcher
- `.github/workflows/deploy-quartz.yml`: Pages deploy workflow, delegated to `GameCult-Quartz`

## Shared Engine Dependency

Local builds expect the shared engine repo to exist either:

- as a sibling checkout named `GameCult-Quartz`, or
- at the path provided through `GAMECULT_QUARTZ_ROOT`

Install dependencies in `GameCult-Quartz` first:

```powershell
cd ..\GameCult-Quartz
npm ci
```

## Local Development

From this repo root:

```powershell
.\scripts\quartz\quartz.ps1 dev
```

For a one-off production build:

```powershell
.\scripts\quartz\quartz.ps1 build
```

The shared engine stages a runtime under `.quartz-build/engine` and writes the final static site to `quartz-site/public`.

## Content Map

- `GameCult/index.md`: root landing page and manifesto
- `GameCult/Projects/`: public project pages
- `GameCult/Blog/`: posts, fiction, and announcements
- `GameCult/Docs/`: documentation and infrastructure-facing pages

`Aetheria` lives on its own site at `https://aetheria.gamecult.org`; this repo links outward instead of pretending to be both things at once.
