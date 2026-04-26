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
  variant?: "icon" | "wordmark"
  icon: {
    path: string
    viewBox: string
    paths?: string[]
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
    label: "Bifrost",
    slug: "Docs/Bifrost" as FullSlug,
    matches: ["Docs/Bifrost"],
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
    label: "Patreon",
    href: "https://www.patreon.com/GameCult",
    variant: "wordmark",
    icon: {
      viewBox: "0 0 2563 357",
      paths: [
        "M 186.320312 131.96875 C 186.320312 100.511719 165.019531 73.40625 132.113281 73.40625 L 78.398438 73.40625 L 78.398438 190.515625 L 132.113281 190.515625 C 165.019531 190.515625 186.320312 163.429688 186.320312 131.96875 Z M 0 9.527344 L 141.789062 9.527344 C 216.804688 9.527344 265.203125 66.15625 265.203125 131.96875 C 265.203125 197.78125 216.804688 254.394531 141.789062 254.394531 L 78.398438 254.394531 L 78.398438 348.285156 L 0 348.285156 L 0 9.527344",
        "M 492.171875 106.3125 L 450.550781 245.695312 L 532.816406 245.695312 Z M 565.25 348.285156 L 552.195312 307.152344 L 431.691406 307.152344 L 418.617188 348.285156 L 334.886719 348.285156 L 455.882812 9.527344 L 527.988281 9.527344 L 650.429688 348.285156 L 565.25 348.285156",
        "M 782.054688 77.277344 L 705.609375 77.277344 L 705.609375 9.527344 L 937.402344 9.527344 L 937.402344 77.277344 L 860.453125 77.277344 L 860.453125 348.285156 L 782.054688 348.285156 L 782.054688 77.277344",
        "M 1245.679688 131.96875 C 1245.679688 100.511719 1224.378906 73.40625 1191.46875 73.40625 L 1137.75 73.40625 L 1137.75 190.515625 L 1191.46875 190.515625 C 1224.378906 190.515625 1245.679688 163.429688 1245.679688 131.96875 Z M 1059.359375 9.527344 L 1201.648438 9.527344 C 1276.648438 9.527344 1325.050781 66.15625 1325.050781 131.96875 C 1325.050781 179.394531 1299.878906 221.488281 1257.769531 241.339844 L 1325.539062 348.285156 L 1234.558594 348.285156 L 1174.53125 254.394531 L 1137.75 254.394531 L 1137.75 348.285156 L 1059.359375 348.285156 L 1059.359375 9.527344",
        "M 1536.539062 72.449219 L 1536.539062 149.382812 L 1664.78125 149.382812 L 1664.78125 210.855469 L 1536.539062 210.855469 L 1536.539062 285.363281 L 1664.78125 285.363281 L 1664.78125 348.285156 L 1458.140625 348.285156 L 1458.140625 9.527344 L 1664.78125 9.527344 L 1664.78125 72.449219 L 1536.539062 72.449219",
        "M 2070.820312 178.90625 C 2070.820312 123.253906 2033.058594 71.472656 1971.609375 71.472656 C 1909.660156 71.472656 1872.398438 123.253906 1872.398438 178.90625 C 1872.398438 234.558594 1909.660156 286.34375 1971.609375 286.34375 C 2033.058594 286.34375 2070.820312 234.558594 2070.820312 178.90625 Z M 1792.050781 178.90625 C 1792.050781 85.992188 1858.839844 0.8125 1971.609375 0.8125 C 2083.871094 0.8125 2150.660156 85.992188 2150.660156 178.90625 C 2150.660156 271.824219 2083.871094 357 1971.609375 357 C 1858.839844 357 1792.050781 271.824219 1792.050781 178.90625",
        "M 2485.078125 230.203125 L 2485.078125 9.527344 L 2562.988281 9.527344 L 2562.988281 348.285156 L 2481.210938 348.285156 L 2359.238281 130.507812 L 2359.238281 348.285156 L 2280.839844 348.285156 L 2280.839844 9.527344 L 2362.621094 9.527344 L 2485.078125 230.203125",
      ],
      path: "",
    },
  },
  {
    label: "GitHub",
    href: "https://github.com/GameCult",
    icon: {
      viewBox: "0 0 98 96",
      path: "M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z",
    },
  },
  {
    label: "Discord",
    href: "https://discord.gg/SwaNeVJRSq",
    icon: {
      viewBox: "0 0 64 48",
      path: "M40.575 0C39.9562 1.09866 39.4006 2.2352 38.8954 3.397C34.0967 2.67719 29.2096 2.67719 24.3982 3.397C23.9057 2.2352 23.3374 1.09866 22.7186 0C18.2104 0.770324 13.8157 2.12155 9.64839 4.02841C1.38951 16.2652 -0.845688 28.1863 0.265599 39.9432C5.10222 43.517 10.5197 46.2447 16.2909 47.9874C17.5916 46.2447 18.7407 44.3883 19.7257 42.4562C17.8568 41.7616 16.0509 40.8903 14.3208 39.88C14.7755 39.5517 15.2175 39.2107 15.6468 38.8824C25.7873 43.6559 37.5316 43.6559 47.6847 38.8824C48.1141 39.236 48.5561 39.577 49.0107 39.88C47.2806 40.9029 45.4748 41.7616 43.5931 42.4688C44.5781 44.4009 45.7273 46.2573 47.028 48C52.7991 46.2573 58.2167 43.5422 63.0533 39.9684C64.3666 26.3299 60.8055 14.5099 53.6452 4.04104C49.4905 2.13418 45.0959 0.782952 40.5876 0.0252565L40.575 0ZM21.1401 32.7072C18.0209 32.7072 15.4321 29.8785 15.4321 26.3804C15.4321 22.8824 17.9199 20.041 21.1275 20.041C24.3351 20.041 26.886 22.895 26.8354 26.3804C26.7849 29.8658 24.3224 32.7072 21.1401 32.7072ZM42.1788 32.7072C39.047 32.7072 36.4834 29.8785 36.4834 26.3804C36.4834 22.8824 38.9712 20.041 42.1788 20.041C45.3864 20.041 47.9246 22.895 47.8741 26.3804C47.8236 29.8658 45.3611 32.7072 42.1788 32.7072Z",
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
        <div class="gamecult-titlebar-top">
          <div class="gamecult-titlebar-copy">
            <p class="gamecult-titlebar-title">
              <a href={resolveRelative(currentSlug, "index" as FullSlug)}>GameCult</a>
            </p>
            {tagline && <p class="gamecult-titlebar-tagline">{tagline}</p>}
          </div>
          <div class="gamecult-titlebar-community" aria-label="GameCult community links">
            {externalLinks.map((link) => (
              <a
                href={link.href}
                class={link.variant === "wordmark" ? "gamecult-nav-wordmark" : "gamecult-nav-icon"}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                title={link.label}
              >
                <svg viewBox={link.icon.viewBox} aria-hidden="true">
                  {(link.icon.paths ?? [link.icon.path]).map((path) => (
                    <path d={path} />
                  ))}
                </svg>
              </a>
            ))}
          </div>
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
        </nav>
      </section>
    )
  }

  return GameCultMasthead
}) satisfies QuartzComponentConstructor
