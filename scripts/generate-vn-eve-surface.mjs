import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const surfaces = [
  {
    providerId: "gamecult.site.sai.compound",
    title: "GameCult Compound Sai VN",
    storyPath: "GameCult/static/interactive/gamecult-compound/gamecult-compound-tour.ink",
    storyJson: "/static/interactive/gamecult-compound/gamecult-compound-tour.ink.json",
    manifestPath: "GameCult/static/interactive/gamecult-compound/gamecult-compound.visual-manifest.json",
    manifestUrl: "/static/interactive/gamecult-compound/gamecult-compound.visual-manifest.json",
    outputPath: "GameCult/static/interactive/gamecult-compound/gamecult-compound.eve-gui.json",
    defaultStartPath: "welcome",
  },
]

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"))
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8")
}

function component(id, kind, props = {}, children = []) {
  return { id, kind, props, children }
}

function normalizeId(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_./:-]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

function parseInk(source) {
  const knots = []
  let current

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim()
    const knotMatch = line.match(/^===\s+([A-Za-z0-9_./:-]+)\s+===/)
    if (knotMatch) {
      current = {
        id: knotMatch[1],
        tags: {},
        choices: [],
        redirects: [],
        lines: [],
      }
      knots.push(current)
      continue
    }

    if (!current || line.length === 0 || line.startsWith("VAR ") || line.startsWith("~ ")) {
      continue
    }

    const tagMatch = line.match(/^#\s*([A-Za-z0-9_./:-]+)\s*:\s*(.+)$/)
    if (tagMatch) {
      current.tags[tagMatch[1]] = tagMatch[2].trim()
      continue
    }

    const choiceMatch = line.match(/^\+\s*\[(.+?)\]\s*->\s*([A-Za-z0-9_./:-]+)/)
    if (choiceMatch) {
      current.choices.push({
        label: choiceMatch[1].trim(),
        target: choiceMatch[2].trim(),
      })
      continue
    }

    const redirectMatch = line.match(/^->\s*([A-Za-z0-9_./:-]+)/)
    if (redirectMatch) {
      current.redirects.push(redirectMatch[1].trim())
      continue
    }

    if (!line.startsWith("{") && !line.startsWith("}") && !line.startsWith("-")) {
      current.lines.push(line)
    }
  }

  return knots
}

function domCardChildren(manifest, cardIds) {
  return cardIds
    .map((rawId) => rawId.trim())
    .filter(Boolean)
    .map((cardId) => {
      const card = manifest.dom_cards?.[cardId] ?? {}
      return component(`dom_card.${normalizeId(cardId)}`, "card.dom", {
        sourceId: cardId,
        title: card.title ?? cardId,
        selector: card.selector ?? null,
        role: card.role ?? "dom source card",
        binding: {
          source: "visual_manifest.dom_cards",
          path: `dom_cards.${cardId}`,
        },
      })
    })
}

function graphChildren(manifest) {
  const graph = manifest.adventure_graph ?? {}
  return [
    component("graph.adventure", "embed.norn", {
      engine: {
        id: graph.solver ?? "norn",
        contract: "gamecult.norn.surface.v1",
        web: {
          wasm: graph.solver_wasm ?? null,
        },
      },
      graph: {
        nodes: graph.nodes ?? [],
        edges: graph.edges ?? [],
      },
      layout: {
        iterations: graph.iterations ?? null,
        rankGap: graph.rank_gap ?? null,
        nodeGap: graph.node_gap ?? null,
        edgeLength: graph.edge_length ?? null,
      },
      interaction: {
        nodeAction: "vn.goto",
      },
      binding: {
        source: "visual_manifest.adventure_graph",
        path: "adventure_graph",
      },
    }),
  ]
}

function buildSurface(config) {
  const sourceUpdatedAt = new Date(
    Math.max(
      fs.statSync(path.join(repoRoot, config.storyPath)).mtimeMs,
      fs.statSync(path.join(repoRoot, config.manifestPath)).mtimeMs,
    ),
  ).toISOString()
  const manifest = readJson(config.manifestPath)
  const knots = parseInk(readText(config.storyPath))
  const knotById = new Map(knots.map((knot) => [knot.id, knot]))
  const defaultKnot = knotById.get(config.defaultStartPath) ?? knots[0]
  const sceneOptions = Object.entries(manifest.scenes ?? {}).map(([id, scene]) => ({
    id,
    label: scene.caption ?? scene.title ?? id,
  }))

  const routeItems = knots.map((knot) =>
    component(`route.${normalizeId(knot.id)}`, "card.route", {
      title: knot.id,
      speaker: knot.tags.speaker ?? null,
      scene: knot.tags.scene ?? null,
      domCards: (knot.tags.dom ?? "").split(",").map((entry) => entry.trim()).filter(Boolean),
      choices: knot.choices.map((choice) => choice.label),
      command: {
        id: "vn.goto",
        payload: {
          knot: knot.id,
        },
      },
    }),
  )

  const defaultCards = (defaultKnot?.tags.dom ?? "").split(",").filter(Boolean)
  const defaultScene = defaultKnot?.tags.scene ?? "compound"
  const scene = manifest.scenes?.[defaultScene] ?? {}

  const root = component("sai.vn.surface", "surface", {
    domain: "sai.visual_novel",
    title: config.title,
    authority: {
      story: "Ink owns story flow and choices.",
      manifest: "Visual manifest owns scene, actor, DOM-card, graph, and space metadata.",
      provider: "Sai publishes accepted state and command effects.",
      eve: "Eve lowers this retained CultUI tree and emits command intent.",
    },
  }, [
    component("layout.main", "partition", {
      orientation: "horizontal",
      ratio: [0.68, 0.32],
    }, [
      component("stage", "vn.stage", {
        bind: "state.currentScene",
        story: config.storyJson,
        manifest: config.manifestUrl,
        startPath: config.defaultStartPath,
        scene: defaultScene,
        background: scene.background ? `${manifest.asset_base ?? ""}${scene.background}` : null,
        capabilities: [
          "background",
          "sprite",
          "avatar",
          "dialogue",
          "choices",
          "dom_cards",
          "adventure_graph",
          "embedded_surfaces",
          "wiki_exits",
          "transcript",
        ],
      }, [
        component("stage.background", "image.background", {
          bind: "state.currentScene.background",
          assetBase: manifest.asset_base ?? null,
        }),
        component("stage.sprites", "layer.sprites", {
          bind: "state.actors",
          actorCatalog: manifest.actors ?? {},
        }),
        component("stage.embedded_surfaces", "layer.embedded-surfaces", {
          bind: "state.currentScene.embeddedSurfaces",
          placementContract: "scene placement, perspective, skew, keystone, and chromakey belong to the manifest/style state",
        }),
        component("stage.dom_cards", "grid.dom_cards", {
          bind: "state.currentScene.domCards",
        }, domCardChildren(manifest, defaultCards)),
      ]),
      component("side.rail", "stack", {
        gap: "sm",
      }, [
        component("dialogue", "panel.dialogue", {
          speaker: defaultKnot?.tags.speaker ?? manifest.default_caption ?? "Sai",
          avatar: defaultKnot?.tags.avatar ?? null,
          bind: "state.currentLine",
        }, [
          component("dialogue.speaker", "text", {
            role: "speaker",
            text: defaultKnot?.tags.speaker ?? "Sai",
          }),
          component("dialogue.line", "text.dialogue", {
            text: defaultKnot?.lines[0] ?? "",
          }),
        ]),
        component("choices", "rail.actions", {
          bind: "state.availableChoices",
          command: "vn.choose",
        }, (defaultKnot?.choices ?? []).map((choice, index) =>
          component(`choice.${index}`, "control.button", {
            label: choice.label,
            command: {
              id: "vn.choose",
              payload: {
                index,
                target: choice.target,
              },
            },
          }),
        )),
        component("navigation", "toolbar", {}, [
          component("nav.back", "control.button", { label: "Back", command: { id: "vn.back" } }),
          component("nav.restart", "control.button", { label: "Restart", command: { id: "vn.restart" } }),
          component("nav.transcript", "control.button", { label: "Transcript", command: { id: "vn.toggle_transcript" } }),
          component("nav.wiki", "control.button", { label: "Open canonical page", command: { id: "vn.open_exit" } }),
        ]),
        component("scene.select", "control.select", {
          label: "Scene",
          bind: "state.currentScene.id",
          options: sceneOptions,
          command: "vn.set_scene",
        }),
      ]),
    ]),
    component("knowledge", "partition", {
      orientation: "horizontal",
      ratio: [0.5, 0.5],
    }, [
      component("route.map", "panel", {
        title: "Adventure Graph",
      }, graphChildren(manifest)),
      component("route.tree", "tree", {
        title: "Ink Routes",
        bind: "story.knots",
      }, routeItems),
    ]),
  ])

  return {
    type: "surface-state",
    schema: "gamecult.eve.surface.v1",
    providerId: config.providerId,
    providerKind: "sai.visual_novel",
    title: config.title,
    version: 1,
    updatedAt: sourceUpdatedAt,
    provenance: {
      generatedBy: "scripts/generate-vn-eve-surface.mjs",
      story: config.storyPath,
      storyJson: config.storyJson,
      visualManifest: config.manifestPath,
    },
    surface: {
      root,
      styles: {
        tokens: {
          colorBackground: "#07111a",
          colorPanel: "rgba(7, 17, 26, 0.82)",
          colorAccent: "#ffb63f",
          colorSignal: "#59b7ff",
          radius: 8,
        },
      },
    },
    commands: [
      { id: "vn.choose", payload: { index: "number", target: "string" } },
      { id: "vn.goto", payload: { knot: "string" } },
      { id: "vn.back", payload: {} },
      { id: "vn.restart", payload: {} },
      { id: "vn.set_scene", payload: { scene: "string" } },
      { id: "vn.toggle_transcript", payload: {} },
      { id: "vn.open_exit", payload: { href: "string?" } },
      { id: "vn.open_dom_card", payload: { cardId: "string" } },
    ],
    stateSchema: {
      currentKnot: "string",
      currentScene: "scene derived from Ink tags and manifest.scenes",
      currentLine: "dialogue line emitted by Ink",
      availableChoices: "Ink choice list",
      actors: "manifest actors plus Ink sprite/avatar tags",
      domCards: "manifest dom_cards selected by Ink # dom tag",
      transcript: "ordered emitted lines and choices",
    },
  }
}

for (const config of surfaces) {
  const surface = buildSurface(config)
  const outputPath = path.join(repoRoot, config.outputPath)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(surface, null, 2)}\n`, "utf8")
  console.log(`Generated ${config.outputPath}`)
}
