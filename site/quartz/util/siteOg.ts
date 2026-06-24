import { QuartzPluginData } from "../plugins/vfile"
import { mergeHierarchicalSocialMetadata, socialMetadataSlug } from "./siteSocialOverrides"

export type SocialImageRef =
  | {
      kind: "static"
      path: string
      alt?: string
    }
  | {
      kind: "relative"
      path: string
      alt?: string
    }
  | {
      kind: "absolute"
      path: string
      alt?: string
    }

export type SiteSocialMetadata = {
  section?: string
  deck?: string
  image?: SocialImageRef
}

type SectionKey = "studio" | "projects" | "blog" | "docs"

const socialMetadataOverrides: Record<string, SiteSocialMetadata> = {
  "Blog/aetheria-starbridge-cultmesh-demo": {
    section: "Aetheria",
    image: {
      kind: "static",
      path: "social/starbridge-promo-outward-panorama.png",
      alt: "Aetheria Starbridge panorama.",
    },
  },
}

const sectionMetadata: Record<SectionKey, SiteSocialMetadata> = {
  studio: {
    section: "Studio",
    deck: "Open source game dev, strange by design.",
    image: {
      kind: "static",
      path: "social/studio-stonks.jpg",
      alt: "The hooded GameCult mascot in front of a rising chart.",
    },
  },
  projects: {
    section: "Projects",
    deck: "Flagships, experiments, and durable bad ideas.",
    image: {
      kind: "static",
      path: "social/projects-debris.jpg",
      alt: "GameCult concept art showing wreckage and a debris field.",
    },
  },
  blog: {
    section: "Blog",
    deck: "Fiction, announcements, and the good bits rescued from chat.",
    image: {
      kind: "static",
      path: "social/blog-lavacave.jpg",
      alt: "GameCult concept art showing a glowing lava cave.",
    },
  },
  docs: {
    section: "Docs",
    deck: "Infrastructure, publishing notes, backstage machinery.",
    image: {
      kind: "static",
      path: "social/docs-bounty.jpg",
      alt: "GameCult concept art showing a figure approaching a bounty scene.",
    },
  },
}

function sectionForSlug(slug: string): SectionKey {
  if (slug.startsWith("Projects/")) {
    return "projects"
  }

  if (slug.startsWith("Blog/")) {
    return "blog"
  }

  if (slug.startsWith("Docs/")) {
    return "docs"
  }

  return "studio"
}

export function resolveSiteSocialMetadata(fileData: QuartzPluginData): SiteSocialMetadata {
  const slug = socialMetadataSlug(fileData)
  const baseMetadata = sectionMetadata[sectionForSlug(slug)]

  if (slug === "Projects/CultPong") {
    return {
      ...baseMetadata,
      image: {
        kind: "static",
        path: "social/cultpong-cover.png",
        alt: "CultPong cover art.",
      },
    }
  }

  return mergeHierarchicalSocialMetadata(baseMetadata, slug, socialMetadataOverrides)
}
