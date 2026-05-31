import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import GameCultMasthead from "./quartz/components/GameCultMasthead"
import GameCultOverviewSidebar from "./quartz/components/GameCultOverviewSidebar"
import GameCultThemeLock from "./quartz/components/GameCultThemeLock"

const isGraphPage = (page: any) => page.fileData.slug === "Graph"
const isPortfolioDossierPage = (page: any) => page.fileData.slug === "Portfolio-Dossier"
const isStandardContentPage = (page: any) => page.fileData.slug !== "index" && !isGraphPage(page)

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [GameCultThemeLock(), GameCultMasthead()],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/GameCult",
      Aetheria: "https://aetheria.gamecult.org",
      Zyphos: "https://zyphos.gamecult.org",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.GameCultGraphSpaShell({
        config: {
          title: "GameCult Site Graph",
          layoutMode: "layered",
          architectureDescription:
            "Public GameCult pages as nodes. Internal links are edges; incoming backlinks are counted into each page.",
        },
      }),
      condition: isGraphPage,
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ rootName: "GameCult", showCurrentPage: false, showRoot: false }),
      condition: isStandardContentPage,
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: isStandardContentPage,
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: isStandardContentPage,
    }),
  ],
  left: [
    Component.ConditionalRender({
      component: GameCultOverviewSidebar(),
      condition: (page) => !isGraphPage(page) && !isPortfolioDossierPage(page),
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TableOfContents()),
      condition: (page) => !isGraphPage(page),
    }),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => isStandardContentPage(page) && !isPortfolioDossierPage(page),
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({ rootName: "GameCult", showCurrentPage: false, showRoot: false }),
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
