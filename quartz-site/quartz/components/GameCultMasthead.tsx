import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { GameCultPageContext } from "./gamecult"

type Route = {
  label: string
  slug: FullSlug
  matches: string[]
}

type ExternalLink = {
  label: string
  href: string
  icon: {
    path: string
    viewBox: string
  }
}

const routes: Route[] = [
  {
    label: "Studio",
    slug: "index" as FullSlug,
    matches: [
      "index",
      "Open-Source-Model",
      "Contributing",
      "democratizing-gamedev",
      "a-place-for-everyone",
      "games-as-a-service",
      "the-new-hotness",
    ],
  },
  {
    label: "Projects",
    slug: "Projects/index" as FullSlug,
    matches: ["Projects"],
  },
  {
    label: "Blog",
    slug: "Blog/index" as FullSlug,
    matches: ["Blog"],
  },
  {
    label: "Docs",
    slug: "Docs/index" as FullSlug,
    matches: ["Docs"],
  },
  {
    label: "Aetheria",
    slug: "Aetheria/index" as FullSlug,
    matches: ["Aetheria"],
  },
]

const externalLinks: ExternalLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/GameCult",
    icon: {
      viewBox: "0 0 16 16",
      path: "M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z",
    },
  },
  {
    label: "Discord",
    href: "https://discord.gg/SwaNeVJRSq",
    icon: {
      viewBox: "0 0 24 24",
      path: "M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.191.336-.403.79-.551 1.146a18.27 18.27 0 0 0-5.667 0A11.64 11.64 0 0 0 9.115 3a19.736 19.736 0 0 0-4.432 1.369C1.882 8.553 1.123 12.636 1.503 16.662A19.91 19.91 0 0 0 6.327 19c.39-.53.739-1.09 1.04-1.675a12.62 12.62 0 0 1-1.636-.788c.138-.102.272-.208.402-.317 3.158 1.48 6.584 1.48 9.705 0 .131.109.265.215.402.317-.521.307-1.07.571-1.637.788.301.585.649 1.145 1.04 1.675a19.867 19.867 0 0 0 4.825-2.338c.446-4.667-.762-8.713-3.151-12.293ZM8.52 14.573c-.955 0-1.736-.87-1.736-1.939 0-1.069.762-1.939 1.736-1.939.983 0 1.755.879 1.736 1.939 0 1.069-.772 1.939-1.736 1.939Zm6.96 0c-.955 0-1.736-.87-1.736-1.939 0-1.069.762-1.939 1.736-1.939.983 0 1.755.879 1.736 1.939 0 1.069-.772 1.939-1.736 1.939Z",
    },
  },
]

function isMatch(currentSlug: string, prefix: string) {
  return currentSlug === prefix || currentSlug.startsWith(`${prefix}/`)
}

function pickActiveRoute(currentSlug: string) {
  return routes
    .flatMap((route) =>
      route.matches
        .filter((prefix) => isMatch(currentSlug, prefix))
        .map((prefix) => ({
          route,
          prefixLength: prefix.length,
        })),
    )
    .sort((a, b) => b.prefixLength - a.prefixLength)[0]?.route
}

export default (() => {
  const GameCultMasthead: QuartzComponent = ({
    fileData,
    gamecult,
  }: QuartzComponentProps & { gamecult?: GameCultPageContext }) => {
    const currentSlug = fileData.slug ?? ("index" as FullSlug)
    const tagline = gamecult?.headerTagline
    const activeRoute = pickActiveRoute(currentSlug)

    return (
      <section class="gamecult-titlebar">
        <div class="gamecult-titlebar-copy">
          <p class="gamecult-titlebar-title">
            <a href={resolveRelative(currentSlug, "index" as FullSlug)}>GameCult</a>
          </p>
          {tagline && <p class="gamecult-titlebar-tagline">{tagline}</p>}
        </div>
        <nav class="gamecult-titlebar-nav" aria-label="GameCult navigation">
          <div class="gamecult-titlebar-links">
            {routes.map((route) => {
              const active = activeRoute?.slug === route.slug
              return (
                <a
                  href={resolveRelative(currentSlug, route.slug)}
                  class={active ? "gamecult-nav-chip active" : "gamecult-nav-chip"}
                >
                  {route.label}
                </a>
              )
            })}
          </div>
          <div class="gamecult-titlebar-community" aria-label="GameCult community links">
            {externalLinks.map((link) => (
              <a
                href={link.href}
                class="gamecult-nav-icon"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                title={link.label}
              >
                <svg viewBox={link.icon.viewBox} aria-hidden="true">
                  <path d={link.icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </nav>
      </section>
    )
  }

  return GameCultMasthead
}) satisfies QuartzComponentConstructor
