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
  },
  {
    label: "Discord",
    href: "https://discord.gg/SwaNeVJRSq",
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
          {externalLinks.map((link) => (
            <a
              href={link.href}
              class="gamecult-nav-chip"
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    )
  }

  return GameCultMasthead
}) satisfies QuartzComponentConstructor
