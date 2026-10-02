import { Element, ElementContent, Root } from "hast"
import { toString } from "hast-util-to-string"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, simplifySlug, splitAnchor, stripSlashes } from "../util/path"
import { clone } from "../util/clone"

export type GameCultPageContext = {
  headerTagline?: string
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
) {
  const currentSlug = currentFile.slug as FullSlug | undefined
  const rawValue = currentFile.frontmatter?.contentSource
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

export function findSectionNote(currentSlug: FullSlug, allFiles: QuartzPluginData[]) {
  const filesBySlug = fileBySlug(allFiles)

  const includeCurrent = isOverviewSlug(currentSlug) && currentSlug !== "index"
  for (const candidate of overviewCandidates(currentSlug, includeCurrent)) {
    const match = filesBySlug.get(candidate)
    if (match?.htmlAst) {
      return resolveGameCultSourceFile(match, allFiles) ?? match
    }
  }

  return undefined
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

  const sectionNote = findSectionNote(currentFile.slug, allFiles)

  return {
    headerTagline: currentTaglineText ?? extractTopTagline(sectionNote?.htmlAst)?.text,
  }
}
