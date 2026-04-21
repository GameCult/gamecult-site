import { ComponentChildren } from "preact"
import { Element, ElementContent, Root } from "hast"
import { htmlToJsx } from "../util/jsx"
import { QuartzPluginData } from "../plugins/vfile"
import { clone } from "../util/clone"
import { normalizeHastElement, resolveRelative, type FullSlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import FolderContent from "./pages/FolderContent"

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

function folderSlug(slug: FullSlug) {
  return slug === "index" ? "" : slug.replace(/\/index$/, "")
}

function resolveCompositeSlug(currentSlug: FullSlug, value: string) {
  const normalized = value
    .trim()
    .replace(/^\//, "")
    .replace(/\.md$/i, "")
    .replace(/\/$/, "")

  if (normalized.length === 0) {
    return undefined
  }

  if (normalized.includes("/")) {
    return normalized as FullSlug
  }

  const folder = folderSlug(currentSlug)
  return (folder.length > 0 ? `${folder}/${normalized}` : normalized) as FullSlug
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
  fileData: QuartzPluginData,
  allFiles: QuartzPluginData[],
): CompositeSection[] {
  const currentSlug = fileData.slug as FullSlug | undefined
  const configured = fileData.frontmatter?.compositeSections

  if (!currentSlug || !Array.isArray(configured) || configured.length === 0) {
    return []
  }

  const bySlug = new Map(
    allFiles
      .filter((file) => typeof file.slug === "string")
      .map((file) => [file.slug as FullSlug, file]),
  )

  return configured
    .map((entry) => (typeof entry === "string" ? resolveCompositeSlug(currentSlug, entry) : undefined))
    .filter((entry): entry is FullSlug => entry !== undefined)
    .map((slug) => bySlug.get(slug))
    .filter((file): file is QuartzPluginData => file !== undefined)
    .map((file) => buildSectionContent(currentSlug, file))
    .filter((section): section is CompositeSection => section !== undefined)
}

export default ((opts?: Partial<Options>) => {
  const options: Options = { ...defaultOptions, ...opts }
  const DefaultFolderContent = FolderContent()

  const GameCultCompositeContent: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree, allFiles } = props
  const baseContent = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const articleClass = ["popover-hint", ...classes].join(" ")
  const sections = getCompositeSections(fileData, allFiles)

  if (sections.length === 0) {
    if (options.fallback === "folder") {
      return <DefaultFolderContent {...props} />
    }

    return <article class={articleClass}>{baseContent}</article>
  }

  return (
    <div class="popover-hint gamecult-composite-page">
      <article class={articleClass}>{baseContent}</article>
      <nav class="gamecult-composite-jump" aria-label={`${fileData.frontmatter?.title ?? "Page"} sections`}>
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
              {section.leadFigure && (
                <div class="gamecult-composite-media">
                  {section.leadFigure}
                </div>
              )}
              <article class="gamecult-composite-copy">
                <header class="gamecult-composite-header">
                  <h2>{section.title}</h2>
                  <p class="gamecult-composite-standalone">
                    <a href={resolveRelative(fileData.slug as FullSlug, section.slug)}>
                      Open standalone note
                    </a>
                  </p>
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
