import { Element, ElementContent, Root } from "hast"
import { toString } from "hast-util-to-string"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, simplifySlug, splitAnchor, stripSlashes } from "../util/path"
import { clone } from "../util/clone"

export type GameCultSidebarLink = {
  label: string
  slug: FullSlug
}

export type GameCultSidebarGroup = {
  title: string
  links: GameCultSidebarLink[]
}

export type GameCultSidebarData = {
  title: string
  slug: FullSlug
  tagline?: string
  summary?: string
  groups: GameCultSidebarGroup[]
}

export type GameCultPageContext = {
  headerTagline?: string
  sidebar?: GameCultSidebarData
}

type FrontmatterSidebarLink = {
  label?: unknown
  slug?: unknown
}

type FrontmatterSidebarGroup = {
  title?: unknown
  links?: unknown
}

type ExtractedTagline = {
  text: string
  nodeIndex: number
}

const taglinePattern = /^["'“‘].+["'”’]$/u

function stripSurroundingQuotes(value: string) {
  return value
    .replace(/^["'“‘]+/u, "")
    .replace(/["'”’]+$/u, "")
    .trim()
}

function isElement(node: ElementContent): node is Element {
  return node.type === "element"
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function topLevelElements(root: Root) {
  return root.children
    .map((node, index) => ({ node, index }))
    .filter((entry): entry is { node: Element; index: number } => {
      return entry.node.type === "element"
    })
}

function isWhitespaceText(node: ElementContent) {
  return node.type === "text" && node.value.trim().length === 0
}

function isStandaloneTagline(node: Element) {
  if (node.tagName !== "p") {
    return false
  }

  const meaningfulChildren = node.children.filter((child) => !isWhitespaceText(child))
  if (meaningfulChildren.length !== 1) {
    return false
  }

  const child = meaningfulChildren[0]
  if (!isElement(child) || !["em", "strong"].includes(child.tagName)) {
    return false
  }

  const text = normalizeText(toString(child))
  return taglinePattern.test(text)
}

export function normalizeGameCultSlug(slug: string) {
  if (slug === "index") {
    return slug
  }

  return slug.replace(/\/index$/, "")
}

export function resolveGameCultReferenceSlug(currentSlug: FullSlug, value: string) {
  const normalized = value.trim().replace(/\.md$/i, "")
  if (normalized.length === 0) {
    return undefined
  }

  const sourceDir = stripSlashes(simplifySlug(currentSlug), true)
  const url = new URL(normalized, `https://base.com/${sourceDir}`)
  let [targetPath] = splitAnchor(decodeURIComponent(url.pathname))
  if (targetPath.endsWith("/")) {
    targetPath += "index"
  }

  const full = stripSlashes(targetPath, true)
  return (full.length > 0 ? full : "index") as FullSlug
}

function fileBySlug(allFiles: QuartzPluginData[]) {
  return new Map(
    allFiles
      .filter((file) => typeof file.slug === "string")
      .map((file) => [file.slug as FullSlug, file]),
  )
}

export function resolveGameCultSourceFile(
  currentFile: QuartzPluginData,
  allFiles: QuartzPluginData[],
  field: "contentSource" | "sidebarSource" = "contentSource",
) {
  const currentSlug = currentFile.slug as FullSlug | undefined
  const rawValue = currentFile.frontmatter?.[field]
  if (!currentSlug || typeof rawValue !== "string") {
    return undefined
  }

  const resolvedSlug = resolveGameCultReferenceSlug(currentSlug, rawValue)
  if (!resolvedSlug) {
    return undefined
  }

  return fileBySlug(allFiles).get(resolvedSlug)
}

function isOverviewSlug(slug: string) {
  return slug === "index" || slug.endsWith("/index")
}

export function isSidebarLinkActive(currentSlug: FullSlug, targetSlug: FullSlug) {
  const normalizedCurrent = normalizeGameCultSlug(currentSlug)
  const normalizedTarget = normalizeGameCultSlug(targetSlug)

  if (targetSlug === "index") {
    return normalizedCurrent === "index"
  }

  if (isOverviewSlug(targetSlug)) {
    return (
      normalizedCurrent === normalizedTarget || normalizedCurrent.startsWith(`${normalizedTarget}/`)
    )
  }

  return normalizedCurrent === normalizedTarget
}

export function extractTopTagline(root?: Root): ExtractedTagline | undefined {
  if (!root) {
    return undefined
  }

  let titleSkipped = false

  for (const { node, index } of topLevelElements(root)) {
    if (!titleSkipped && node.tagName === "h1") {
      titleSkipped = true
      continue
    }

    const text = normalizeText(toString(node))
    if (text.length === 0) {
      continue
    }

    if (isStandaloneTagline(node)) {
      return {
        text: stripSurroundingQuotes(text),
        nodeIndex: index,
      }
    }

    return undefined
  }

  return undefined
}

export function stripTopTagline(root?: Root) {
  const tagline = extractTopTagline(root)
  if (tagline && root) {
    root.children.splice(tagline.nodeIndex, 1)
  }

  return tagline?.text
}

export function stripTopHeading(root?: Root) {
  if (!root) {
    return undefined
  }

  const firstHeadingIndex = root.children.findIndex(
    (node): node is Element => node.type === "element" && node.tagName === "h1",
  )

  if (firstHeadingIndex >= 0) {
    const heading = root.children[firstHeadingIndex]
    root.children.splice(firstHeadingIndex, 1)
    return normalizeText(toString(heading))
  }

  return undefined
}

function resolveLinkTarget(sourceSlug: FullSlug, node: Element) {
  const href = node.properties?.href
  if (typeof href === "string" && !href.startsWith("#") && !href.startsWith("http")) {
    const sourceDir = stripSlashes(simplifySlug(sourceSlug), true)
    const url = new URL(href, `https://base.com/${sourceDir}`)
    let [targetPath] = splitAnchor(decodeURIComponent(url.pathname))
    if (targetPath.endsWith("/")) {
      targetPath += "index"
    }

    const full = stripSlashes(targetPath, true)
    if (full.length > 0) {
      return full as FullSlug
    }
  }

  const slug = node.properties?.["data-slug"]
  if (typeof slug === "string") {
    return slug as FullSlug
  }

  return undefined
}

function collectLinks(
  sourceSlug: FullSlug,
  node: Element,
  dedupe: Set<string>,
  links: GameCultSidebarLink[],
) {
  if (node.tagName === "a") {
    const slug = resolveLinkTarget(sourceSlug, node)
    const label = normalizeText(toString(node))

    if (slug && label.length > 0 && !dedupe.has(slug)) {
      dedupe.add(slug)
      links.push({
        label,
        slug,
      })
    }
  }

  for (const child of node.children) {
    if (isElement(child)) {
      collectLinks(sourceSlug, child, dedupe, links)
    }
  }
}

function extractOverviewSummary(root: Root, tagline?: ExtractedTagline) {
  let titleSkipped = false

  for (const { node, index } of topLevelElements(root)) {
    if (!titleSkipped && node.tagName === "h1") {
      titleSkipped = true
      continue
    }

    if (tagline && index === tagline.nodeIndex) {
      continue
    }

    if (node.tagName === "h2") {
      return undefined
    }

    if (node.tagName === "p") {
      const summary = normalizeText(toString(node))
      if (summary.length > 0) {
        return summary
      }
    }
  }

  return undefined
}

function extractOverviewGroups(root: Root, sourceSlug: FullSlug): GameCultSidebarGroup[] {
  const groups: GameCultSidebarGroup[] = []
  const entries = topLevelElements(root)

  for (let i = 0; i < entries.length; i++) {
    const current = entries[i].node
    if (current.tagName !== "h2") {
      continue
    }

    const title = normalizeText(toString(current))
    if (title.length === 0) {
      continue
    }

    const dedupe = new Set<string>()
    const links: GameCultSidebarLink[] = []

    for (let j = i + 1; j < entries.length; j++) {
      const next = entries[j].node
      if (next.tagName === "h1" || next.tagName === "h2") {
        break
      }

      if (next.tagName === "ul" || next.tagName === "ol") {
        collectLinks(sourceSlug, next, dedupe, links)
      }
    }

    if (links.length > 0) {
      groups.push({ title, links })
    }
  }

  return groups
}

function extractFrontmatterOverviewGroups(file: QuartzPluginData): GameCultSidebarGroup[] | undefined {
  if (!file.slug || !Array.isArray(file.frontmatter?.sidebarGroups)) {
    return undefined
  }

  const groups = (file.frontmatter.sidebarGroups as FrontmatterSidebarGroup[])
    .map((rawGroup) => {
      if (
        typeof rawGroup !== "object" ||
        rawGroup === null ||
        typeof rawGroup.title !== "string" ||
        !Array.isArray(rawGroup.links)
      ) {
        return undefined
      }

      const links = (rawGroup.links as FrontmatterSidebarLink[])
        .map((rawLink) => {
          if (
            typeof rawLink !== "object" ||
            rawLink === null ||
            typeof rawLink.label !== "string" ||
            typeof rawLink.slug !== "string"
          ) {
            return undefined
          }

          const slug = resolveGameCultReferenceSlug(file.slug as FullSlug, rawLink.slug)
          if (!slug) {
            return undefined
          }

          return {
            label: rawLink.label,
            slug,
          }
        })
        .filter((link): link is GameCultSidebarLink => link !== undefined)

      if (links.length === 0) {
        return undefined
      }

      return {
        title: rawGroup.title,
        links,
      }
    })
    .filter((group): group is GameCultSidebarGroup => group !== undefined)

  return groups.length > 0 ? groups : undefined
}

function overviewCandidates(currentSlug: FullSlug, includeCurrent = true) {
  if (currentSlug === "index") {
    return includeCurrent ? (["index"] as FullSlug[]) : []
  }

  const normalized = normalizeGameCultSlug(currentSlug)
  const segments = normalized.split("/").filter((segment) => segment.length > 0)
  const candidates: FullSlug[] = []

  if (includeCurrent && isOverviewSlug(currentSlug)) {
    candidates.push(currentSlug)
  } else {
    segments.pop()
  }

  while (segments.length > 0) {
    candidates.push(`${segments.join("/")}/index` as FullSlug)
    segments.pop()
  }

  candidates.push("index" as FullSlug)
  return [...new Set(candidates)]
}

export function findSidebarOverviewNote(currentSlug: FullSlug, allFiles: QuartzPluginData[]) {
  const filesBySlug = fileBySlug(allFiles)

  const includeCurrent = isOverviewSlug(currentSlug) && currentSlug !== "index"
  for (const candidate of overviewCandidates(currentSlug, includeCurrent)) {
    const match = filesBySlug.get(candidate)
    if (match?.htmlAst) {
      return resolveGameCultSourceFile(match, allFiles, "sidebarSource") ??
        resolveGameCultSourceFile(match, allFiles, "contentSource") ??
        match
    }
  }

  return undefined
}

function extractOverviewData(file: QuartzPluginData): GameCultSidebarData | undefined {
  if (!file.slug || !file.htmlAst) {
    return undefined
  }

  const tagline = extractTopTagline(file.htmlAst)
  const frontmatterGroups = extractFrontmatterOverviewGroups(file)

  return {
    title: file.frontmatter?.title ?? "GameCult",
    slug: file.slug,
    tagline: tagline?.text,
    summary: extractOverviewSummary(file.htmlAst, tagline),
    groups: frontmatterGroups ?? extractOverviewGroups(file.htmlAst, file.slug),
  }
}

export function buildGameCultPageContext(
  currentRoot: Root,
  currentFile: QuartzPluginData,
  allFiles: QuartzPluginData[],
): GameCultPageContext {
  if (!currentFile.slug) {
    return {}
  }

  const sourceFile = resolveGameCultSourceFile(currentFile, allFiles)
  const sourceRoot =
    sourceFile?.htmlAst && sourceFile.slug !== currentFile.slug
      ? (clone(sourceFile.htmlAst) as Root)
      : currentRoot
  const currentTaglineText = stripTopTagline(sourceRoot)
  if (sourceRoot !== currentRoot) {
    stripTopTagline(currentRoot)
  }

  stripTopHeading(sourceRoot)
  if (sourceRoot !== currentRoot) {
    stripTopHeading(currentRoot)
  }

  const overviewNote = findSidebarOverviewNote(currentFile.slug, allFiles)
  const sidebar = overviewNote ? extractOverviewData(overviewNote) : undefined

  return {
    headerTagline: currentTaglineText ?? sidebar?.tagline,
    sidebar,
  }
}
