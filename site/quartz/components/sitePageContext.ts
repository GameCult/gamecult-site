import { Root } from "hast"
import { QuartzComponentProps } from "./types"
import { buildGameCultPageContext } from "./gamecult"

export function injectSitePageContext(componentData: QuartzComponentProps, root: Root) {
  componentData.gamecult = buildGameCultPageContext(
    root,
    componentData.fileData,
    componentData.allFiles,
  )
}
