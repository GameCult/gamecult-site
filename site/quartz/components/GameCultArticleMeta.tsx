import readingTime from "reading-time"
import { i18n } from "../i18n"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/gameCultArticleMeta.scss"

function authorLabel(frontmatter: QuartzComponentProps["fileData"]["frontmatter"]) {
  const author = frontmatter?.author
  if (typeof author === "string" && author.trim().length > 0) {
    return author.trim()
  }

  const authors = frontmatter?.authors
  if (Array.isArray(authors)) {
    const labels = authors.filter(
      (candidate): candidate is string =>
        typeof candidate === "string" && candidate.trim().length > 0,
    )
    if (labels.length > 0) {
      return labels.map((candidate) => candidate.trim()).join(", ")
    }
  }

  return "GameCult"
}

export default (() => {
  const GameCultArticleMeta: QuartzComponent = ({ cfg, fileData, displayClass }) => {
    if (!fileData.text) {
      return null
    }

    const { minutes } = readingTime(fileData.text)
    const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
      minutes: Math.ceil(minutes),
    })

    return (
      <div class={`${displayClass ?? ""} gamecult-article-meta`}>
        <span class="gamecult-article-meta-author">{authorLabel(fileData.frontmatter)}</span>
        <p show-comma="true" class="content-meta gamecult-article-meta-details">
          {fileData.dates && <Date date={getDate(cfg, fileData)!} locale={cfg.locale} />}
          <span>{displayedTime}</span>
        </p>
      </div>
    )
  }

  GameCultArticleMeta.css = style
  return GameCultArticleMeta
}) satisfies QuartzComponentConstructor
