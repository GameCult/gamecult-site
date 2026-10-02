import { ComponentChildren } from "preact"
import { Element, ElementContent, Root } from "hast"
import { htmlToJsx } from "../util/jsx"
import { clone } from "../util/clone"
import {
  isRelativeURL,
  resolveRelative,
  simplifySlug,
  stripSlashes,
  type FullSlug,
} from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import FolderContent from "./pages/FolderContent"
import AutoIndexFolder from "./AutoIndexFolder"
import { resolveGameCultSourceFile, stripTopTagline } from "./gamecult"

interface Options {
  fallback: "content" | "folder"
}

const defaultOptions: Options = {
  fallback: "content",
}

function isElement(node: ElementContent): node is Element {
  return node.type === "element"
}

function rebaseSharedSourceElement(
  rawEl: Element,
  renderSlug: FullSlug,
  sourceSlug: FullSlug,
): Element {
  const el = clone(rawEl)
  const sourceBase = `https://base.com/${stripSlashes(simplifySlug(sourceSlug), true)}`

  for (const attr of ["href", "src"] as const) {
    const rawValue = el.properties?.[attr]
    if (typeof rawValue !== "string" || !isRelativeURL(rawValue)) {
      continue
    }

    if (attr === "href" && typeof el.properties?.["data-slug"] === "string") {
      el.properties[attr] = resolveRelative(renderSlug, el.properties["data-slug"] as FullSlug)
      continue
    }

    const resolved = new URL(rawValue, sourceBase)
    const targetPath = stripSlashes(decodeURIComponent(resolved.pathname), true) as FullSlug
    el.properties[attr] = `${resolveRelative(renderSlug, targetPath)}${resolved.hash}`
  }

  if (el.children) {
    el.children = el.children.map((child) =>
      isElement(child) ? rebaseSharedSourceElement(child, renderSlug, sourceSlug) : child,
    )
  }

  return el
}

export default ((opts?: Partial<Options>) => {
  const options: Options = { ...defaultOptions, ...opts }
  const DefaultFolderContent = FolderContent()
  const BlogFolderContent = AutoIndexFolder({
    rootSlug: "Blog",
    classPrefix: "gamecult-blog",
    hideFrontmatterKey: "hideFromBlogIndex",
    defaultAuthor: "GameCult",
    emptyDescription: "This post exists, which is already more than many ideas manage.",
    showDescriptionIntro: true,
    sidebarTagline: "Recent notes, fiction, experiments, and other escaped materials.",
    sidebarSummary: (count) => `${count} public posts, newest trouble first.`,
  })

  const GameCultContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, tree, allFiles } = props
    const renderSlug = fileData.slug as FullSlug | undefined
    const sourceFile = resolveGameCultSourceFile(fileData, allFiles) ?? fileData
    const articleRoot =
      sourceFile.slug && renderSlug && sourceFile.slug !== renderSlug && sourceFile.htmlAst
        ? (clone(sourceFile.htmlAst) as Root)
        : (clone(tree as Root) as Root)
    if (sourceFile.slug && renderSlug && sourceFile.slug !== renderSlug) {
      articleRoot.children = articleRoot.children.map((child) =>
        isElement(child)
          ? rebaseSharedSourceElement(child, renderSlug, sourceFile.slug as FullSlug)
          : child,
      ) as ElementContent[]
    }
    stripTopTagline(articleRoot)

    const baseContent = htmlToJsx(
      sourceFile.filePath ?? fileData.filePath!,
      articleRoot,
    ) as ComponentChildren
    const classes: string[] =
      sourceFile.frontmatter?.cssclasses ?? fileData.frontmatter?.cssclasses ?? []
    const articleClass = ["popover-hint", ...classes].join(" ")

    if (options.fallback === "folder" && renderSlug === ("Blog/index" as FullSlug)) {
      return <BlogFolderContent {...props} />
    }

    if (options.fallback === "folder" && sourceFile.frontmatter?.showFolderListing === false) {
      return <article class={articleClass}>{baseContent}</article>
    }

    if (options.fallback === "folder") {
      return <DefaultFolderContent {...props} />
    }

    return <article class={articleClass}>{baseContent}</article>
  }

  return GameCultContent
}) satisfies QuartzComponentConstructor<Partial<Options>>
