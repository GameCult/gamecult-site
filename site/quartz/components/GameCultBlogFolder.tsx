import { QuartzPluginData } from "../plugins/vfile"
import { Date } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { collectGameCultBlogPosts, getGameCultAuthorLabel } from "./gamecult"

function getBlogCardDescription(page: QuartzPluginData) {
  const frontmatterDescription = page.frontmatter?.description
  if (typeof frontmatterDescription === "string" && frontmatterDescription.trim().length > 0) {
    return frontmatterDescription.trim()
  }

  const pageDescription = page.description
  if (typeof pageDescription === "string" && pageDescription.trim().length > 0) {
    return pageDescription.trim()
  }

  const socialDeck = page.frontmatter?.socialDeck
  if (typeof socialDeck === "string" && socialDeck.trim().length > 0) {
    return socialDeck.trim()
  }

  return "This post exists, which is already more than many ideas manage."
}

export default (() => {
  const GameCultBlogFolder: QuartzComponent = ({ cfg, fileData, allFiles }: QuartzComponentProps) => {
    const posts = collectGameCultBlogPosts(allFiles)
    const intro = fileData.description

    return (
      <div class="popover-hint gamecult-blog-index">
        {intro && (
          <section class="gamecult-blog-index-intro">
            <p>{intro}</p>
          </section>
        )}
        <div class="gamecult-blog-card-list">
          {posts.map((post) => {
            const title = post.frontmatter?.title ?? post.slug ?? "Untitled post"
            const href = resolveRelative(fileData.slug!, post.slug!)
            const author = getGameCultAuthorLabel(post)
            const date = post.dates?.published ?? post.dates?.created ?? post.dates?.modified

            return (
              <article class="gamecult-blog-card">
                <a href={href} class="gamecult-blog-card-link">
                  <div class="gamecult-blog-card-head">
                    <h2>{title}</h2>
                    <p class="gamecult-blog-card-meta">
                      <span class="gamecult-blog-card-author">{author}</span>
                      {date && (
                        <>
                          <span class="gamecult-blog-card-meta-separator">/</span>
                          <span class="gamecult-blog-card-date">
                            <Date date={date} locale={cfg.locale} />
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <p class="gamecult-blog-card-description">{getBlogCardDescription(post)}</p>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    )
  }

  return GameCultBlogFolder
}) satisfies QuartzComponentConstructor
