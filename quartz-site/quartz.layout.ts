import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import GameCultMasthead from "./quartz/components/GameCultMasthead"
import GameCultOverviewSidebar from "./quartz/components/GameCultOverviewSidebar"
import GameCultThemeLock from "./quartz/components/GameCultThemeLock"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [GameCultThemeLock(), GameCultMasthead()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/GameCult",
      Aetheria: "https://aetheria.gamecult.org",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ rootName: "GameCult", showCurrentPage: false }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [GameCultOverviewSidebar()],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ rootName: "GameCult", showCurrentPage: false }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [GameCultOverviewSidebar()],
  right: [],
}
