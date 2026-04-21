import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { GameCultPageContext, isSidebarLinkActive } from "./gamecult"
import { FullSlug, resolveRelative } from "../util/path"

export default (() => {
  const GameCultOverviewSidebar: QuartzComponent = ({
    fileData,
    gamecult,
  }: QuartzComponentProps & { gamecult?: GameCultPageContext }) => {
    const currentSlug = fileData.slug ?? ("index" as FullSlug)
    const sidebar = gamecult?.sidebar

    if (!sidebar || sidebar.groups.length === 0) {
      return null
    }

    return (
      <section class="gamecult-overview-sidebar">
        <div class="gamecult-overview-sidebar-inner">
          <p class="gamecult-overview-branch">
            <a href={resolveRelative(currentSlug, sidebar.slug)}>{sidebar.title}</a>
          </p>
          {sidebar.tagline && <p class="gamecult-overview-tagline">{sidebar.tagline}</p>}
          {sidebar.summary && <p class="gamecult-overview-summary">{sidebar.summary}</p>}
          <nav class="gamecult-overview-nav" aria-label={`${sidebar.title} navigation`}>
            {sidebar.groups.map((group) => (
              <section class="gamecult-overview-group">
                <p class="gamecult-overview-group-title">{group.title}</p>
                <ul class="gamecult-overview-links">
                  {group.links.map((link) => {
                    const active = isSidebarLinkActive(currentSlug, link.slug)
                    return (
                      <li class={active ? "active" : undefined}>
                        <a
                          href={resolveRelative(currentSlug, link.slug)}
                          class={active ? "active" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      </section>
    )
  }

  return GameCultOverviewSidebar
}) satisfies QuartzComponentConstructor
