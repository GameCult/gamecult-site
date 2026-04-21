import { ComponentChildren } from "preact"
import { Element, ElementContent, Root } from "hast"
import { htmlToJsx } from "../util/jsx"
import { QuartzPluginData } from "../plugins/vfile"
import { clone } from "../util/clone"
import {
  isRelativeURL,
  normalizeHastElement,
  resolveRelative,
  simplifySlug,
  stripSlashes,
  type FullSlug,
} from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import FolderContent from "./pages/FolderContent"
import { resolveGameCultReferenceSlug, resolveGameCultSourceFile, stripTopTagline } from "./gamecult"

interface Options {
  fallback: "content" | "folder"
}

const defaultOptions: Options = {
  fallback: "content",
}

type CompositeSection = {
  content: ComponentChildren
  leadFigure?: ComponentChildren
  sectionId: string
  slug: FullSlug
  title: string
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

function buildSectionContent(parentSlug: FullSlug, file: QuartzPluginData): CompositeSection | undefined {
  if (!file.slug || !file.htmlAst || !file.filePath) {
    return undefined
  }

  const root = clone(file.htmlAst) as Root
  const children = [...root.children]

  let firstMeaningfulIndex = -1
  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (node.type === "text" && node.value.trim().length === 0) {
      continue
    }

    firstMeaningfulIndex = i
    break
  }

  if (firstMeaningfulIndex >= 0) {
    const node = children[firstMeaningfulIndex]
    if (isElement(node) && node.tagName === "h1") {
      children.splice(firstMeaningfulIndex, 1)
    }
  }

  let leadFigure: Element | undefined
  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (node.type === "text" && node.value.trim().length === 0) {
      continue
    }

    if (isElement(node) && node.tagName === "figure") {
      leadFigure = node
      children.splice(i, 1)
    }
    break
  }

  const normalizedChildren = children.map((child) =>
    normalizeHastElement(child as Element, parentSlug, file.slug as FullSlug),
  ) as ElementContent[]

  const sectionRoot: Root = {
    type: "root",
    children: normalizedChildren,
  }

  const normalizedFigure = leadFigure
    ? normalizeHastElement(leadFigure, parentSlug, file.slug as FullSlug)
    : undefined

  const figureRoot: Root | undefined = normalizedFigure
    ? {
        type: "root",
        children: [normalizedFigure],
      }
    : undefined

  return {
    content: htmlToJsx(file.filePath, sectionRoot) as ComponentChildren,
    leadFigure: figureRoot ? (htmlToJsx(file.filePath, figureRoot) as ComponentChildren) : undefined,
    sectionId: file.slug.split("/").at(-1)?.toLowerCase() ?? "section",
    slug: file.slug as FullSlug,
    title: file.frontmatter?.title ?? file.slug.split("/").at(-1) ?? "Section",
  }
}

function getCompositeSections(
  renderSlug: FullSlug,
  sourceFile: QuartzPluginData,
  allFiles: QuartzPluginData[],
): CompositeSection[] {
  const sourceSlug = sourceFile.slug as FullSlug | undefined
  const configured = sourceFile.frontmatter?.compositeSections

  if (!renderSlug || !sourceSlug || !Array.isArray(configured) || configured.length === 0) {
    return []
  }

  const bySlug = new Map(
    allFiles
      .filter((file) => typeof file.slug === "string")
      .map((file) => [file.slug as FullSlug, file]),
  )

  return configured
    .map((entry) =>
      typeof entry === "string" ? resolveGameCultReferenceSlug(sourceSlug, entry) : undefined,
    )
    .filter((entry): entry is FullSlug => entry !== undefined)
    .map((slug) => bySlug.get(slug))
    .filter((file): file is QuartzPluginData => file !== undefined)
    .map((file) => buildSectionContent(renderSlug, file))
    .filter((section): section is CompositeSection => section !== undefined)
}

export default ((opts?: Partial<Options>) => {
  const options: Options = { ...defaultOptions, ...opts }
  const DefaultFolderContent = FolderContent()

  const GameCultCompositeContent: QuartzComponent = (props: QuartzComponentProps) => {
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
    const sections = renderSlug ? getCompositeSections(renderSlug, sourceFile, allFiles) : []

    if (sections.length === 0) {
      if (options.fallback === "folder") {
        return <DefaultFolderContent {...props} />
      }

      return <article class={articleClass}>{baseContent}</article>
    }

    return (
      <div class="popover-hint gamecult-composite-page">
        <article class={articleClass}>{baseContent}</article>
        <nav
          class="gamecult-composite-jump"
          aria-label={`${fileData.frontmatter?.title ?? "Page"} sections`}
        >
          {sections.map((section) => (
            <a href={`#${section.sectionId}`} class="gamecult-nav-chip">
              {section.title}
            </a>
          ))}
        </nav>
        <div class="gamecult-composite-sections">
          {sections.map((section) => (
            <section id={section.sectionId} class="gamecult-composite-section">
              <div class="gamecult-composite-divider" aria-hidden="true" />
              <div
                class={`gamecult-composite-shell${section.leadFigure ? " has-media" : ""}`}
                data-section-slug={section.slug}
              >
                {section.leadFigure && <div class="gamecult-composite-media">{section.leadFigure}</div>}
                <article class="gamecult-composite-copy">
                  <header class="gamecult-composite-header">
                    <h2>{section.title}</h2>
                  </header>
                  <div class="gamecult-composite-body">{section.content}</div>
                </article>
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }

  return GameCultCompositeContent
}) satisfies QuartzComponentConstructor<Partial<Options>>
