---
title: GameCult
description: "Open game studio for science-fantasy worlds, competitive experiments, fiction, and the public machinery required to build them without the usual private-cabal nonsense."
enableToc: false
showCompositeJump: false
sidebarGroups:
  - title: Studio
    links:
      - label: Graph
        slug: Graph
      - label: Open Source Model
        slug: Open-Source-Model
      - label: Contributing
        slug: Contributing
      - label: Democratizing Gamedev
        slug: democratizing-gamedev
      - label: A Place for Everyone
        slug: a-place-for-everyone
      - label: Games as a Service
        slug: games-as-a-service
      - label: The New Hotness
        slug: the-new-hotness
      - label: Bifrost
        slug: Docs/Bifrost
      - label: Portfolio Pitch
        slug: Pitch
      - label: Integrated Dossier
        slug: dossier
  - title: Projects
    links:
      - label: Aetheria
        href: https://aetheria.gamecult.org
        external: true
      - label: Zyphos
        href: https://zyphos.gamecult.org
        external: true
      - label: CultPong
        slug: Projects/CultPong
  - title: Writing
    links:
      - label: Hello, World!
        slug: Blog/hello-world
      - label: Rain
        slug: Blog/rain
      - label: When We Get Home
        slug: Blog/when-we-get-home
      - label: Cat and the Chocolate Factory
        slug: Blog/cat-and-the-chocolate-factory/
  - title: Docs
    links:
      - label: Publishing Workflow
        slug: Docs/Publishing-Workflow
      - label: Site Architecture
        slug: Docs/Site-Architecture
      - label: Bifrost
        slug: Docs/Bifrost
cssclasses:
  - gamecult-composite-overview
---

<div
  class="sai-player gamecult-compound-vn"
  data-ink-format="visual-novel"
  data-ink-title="GameCult Compound Tour"
  data-ink-story="/static/interactive/gamecult-compound/gamecult-compound-tour.ink.json"
  data-visual-manifest="/static/interactive/gamecult-compound/gamecult-compound.visual-manifest.json"
></div>

<script src="/static/interactive/gamecult-compound/repo-doc-tree.js" defer></script>

<section class="gamecult-vn-source" aria-label="GameCult public wiki doors">
  <div id="gamecult-vn-studio" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>GameCult</h2>
    <p>GameCult is a distributed game studio building open worlds, experiments, fiction, and the public machinery required to make creative work inspectable instead of hidden in private chat sludge.</p>
    <p>This page gives new readers a guided path through the public wiki. It should make the place easier to enter while keeping every document door plainly reachable.</p>
    <p><a href="/Open-Source-Model">Open Source Model</a> | <a href="/Contributing">Contributing</a> | <a href="/a-place-for-everyone">A Place for Everyone</a></p>
  </div>

  <div id="gamecult-vn-projects" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Project Atlas</h2>
    <p>The curated repo atlas groups the public work by actual function: games and worlds, shared code, agent interfaces, visual labs, and studio systems.</p>
    <p><a href="/Pitch">Play the over-the-top portfolio pitch</a> | <a href="/Projects/">Visit the repo atlas</a></p>
  </div>

  <div id="gamecult-vn-norn-map" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Norn</h2>
    <p>Norn makes architecture and dataflow readable as linked graphs. The job is not to beautify complexity, but to show ownership, movement, neighbors, and evidence without flattening the system into a list.</p>
    <p><a href="https://github.com/GameCult/Norn">Norn repo</a> | <a href="https://github.com/GameCult/norn-rs">norn-rs</a></p>
  </div>

  <div id="gamecult-vn-norn-architecture" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Architecture Thread</h2>
    <p>Architecture nodes own bodies and responsibilities: repos, services, runtimes, stores, surfaces, and the authority they are allowed to exercise.</p>
  </div>

  <div id="gamecult-vn-norn-dataflow" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Dataflow Thread</h2>
    <p>Dataflow nodes own movement: evidence, fragments, turns, validation, proposals, command intent, accepted state, and published receipts.</p>
  </div>

  <div id="gamecult-vn-norn-focus" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Focus Trial</h2>
    <p>Low zoom shows shape; high zoom shows title, purpose, mechanism, status, and code references. The selected node has to commit geometry instead of being repaired after the fact.</p>
  </div>

  <div id="gamecult-vn-norn-solver" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Solver Body</h2>
    <p>The Rust side aims at hybrid graph layout: ranking, ordering, direction pressure, springs, collision, and force relaxation. React owns inspection, not the underlying truth.</p>
  </div>

  <div id="gamecult-vn-norn-future" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Norn Wants</h2>
    <p>Live Bifrost work frontiers, Epiphany evidence maps, Eve operational surfaces, Ghostlight consequence graphs, and direct graph rooms for every repo in the swarm.</p>
  </div>

  <div id="gamecult-vn-sai-embed" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Sai</h2>
    <p>Sai renders Ink stories inside public pages. It lets a Persona guide stand beside real Quartz documents, so onboarding can be narrative without becoming a parallel wiki.</p>
  </div>

  <div id="gamecult-vn-sai-formats" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Three Masks</h2>
    <p>Transcript, visual novel, and cinematic deck are different reader postures over one story substrate. The homepage uses VN because it can point at the machine while speaking.</p>
  </div>

  <div id="gamecult-vn-sai-dom-cards" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>DOM Cards</h2>
    <p>The `# dom:` tag clones canonical page cards into the stage. Quartz remains the source of truth; Ink controls pacing; Sai controls rendering.</p>
  </div>

  <div id="gamecult-vn-sai-quartz" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Quartz Swap</h2>
    <p>Sai auto-initializes `.sai-player`, survives client-side navigation, and keeps plain links visible. A guided tour must never become a locked door.</p>
  </div>

  <div id="gamecult-vn-sai-links" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Honest Exits</h2>
    <p>The VN is a spatial navigation layer, not a curtain. Every room keeps a route back to the public wiki, project page, repo, or receipt surface.</p>
  </div>

  <div id="gamecult-vn-eve-surface-pipeline" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Eve Pipeline</h2>
    <p>Provider-owned state becomes a CultUI semantic tree; Eve projects it into local renderers; user action becomes command intent; the provider accepts or refuses and publishes updated truth.</p>
    <p><a href="https://github.com/GameCult/Eve">Eve repo</a></p>
  </div>

  <div id="gamecult-vn-eve-cultui" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Not Remote DOM</h2>
    <p>CultUI surfaces carry stable widget IDs, typed bindings, command routes, layout intent, permissions, health, and provenance. Arbitrary DOM soup does not get to be infrastructure.</p>
  </div>

  <div id="gamecult-vn-eve-backends" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Many Bodies</h2>
    <p>Web DOM, desktop controls, mobile panels, Unity UI, stream overlays, and Sai rooms can render the same semantic surface without each becoming its own little kingdom.</p>
  </div>

  <div id="gamecult-vn-eve-commands" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Command Trial</h2>
    <p>Eve owns projection, hit-testing, and command intent. Providers own truth and command acceptance. That split is the spine.</p>
  </div>

  <div id="gamecult-vn-eve-canvas" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Native Proof</h2>
    <p>EveCanvas is the current native shell: UIKit lifecycle and crisp text, OpenGL ES pixels, CADisplayLink frames, CoreMotion telemetry, and no premature claim that telemetry is authority.</p>
  </div>

  <div id="gamecult-vn-docs" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Docs</h2>
    <p>The docs hold the operating side of the site: publishing workflow, site architecture, and Bifrost as it becomes the public work/governance layer.</p>
    <p><a href="/Docs/">Open the docs index</a></p>
  </div>

  <div id="gamecult-vn-epiphany" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Epiphany</h2>
    <p>Epiphany helps coding agents remember the job outside the chat transcript: explicit maps, evidence, role lanes, and verification before the next tool swing.</p>
    <p><a href="/Projects/Epiphany">Project page</a> | <a href="https://github.com/GameCult/Epiphany">GitHub repo</a></p>
  </div>

  <div id="gamecult-vn-epiphany-organs" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Organ Lanes</h2>
    <p>Self routes, Face speaks, Eyes retrieve, Proprioception maps, Hands edit, Soul verifies, and Imagination shapes futures. The point is authority boundaries, not costume names.</p>
  </div>

  <div id="gamecult-vn-epiphany-memory" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Memory Split</h2>
    <p>Local organ memory lives as durable agent state; portable public Persona projection uses a typed persona-state shape. Memory, speech, scheduler, and evidence do not get to counterfeit each other.</p>
  </div>

  <div id="gamecult-vn-epiphany-heartbeat" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Heartbeat</h2>
    <p>Initiative, readiness, speed, reaction bias, load, constraints, and pending turns make agent pressure inspectable before the Face starts talking.</p>
  </div>

  <div id="gamecult-vn-epiphany-aquarium" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Aquarium Surface</h2>
    <p>EpiphanyAquarium wants agents to be selectable living objects: role lanes, memory, pressure, and readiness visible without drowning the operator in admin chrome.</p>
  </div>

  <div id="gamecult-vn-bifrost" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Bifrost</h2>
    <p>Bifrost turns public work into inspectable records: proposed tasks, claims, reviews, receipts, contributor history, and the reward/support pressure that must not hide in private chat.</p>
    <p><a href="/Docs/Bifrost">Bifrost docs</a> | <a href="https://github.com/GameCult/Bifrost">GitHub repo</a></p>
  </div>

  <div id="gamecult-vn-voidbot" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>VoidBot</h2>
    <p>VoidBot makes project memory askable: archived Discord history, indexed repos, lore lookup, semantic search, and Codex handoff when chat stops being a sane workspace.</p>
    <p><a href="/Projects/VoidBot">Project page</a> | <a href="https://github.com/GameCult/VoidBot">GitHub repo</a></p>
  </div>

  <div id="gamecult-vn-voidbot-retrieval" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Retrieval Body</h2>
    <p>VoidBot searches archived Discord history, indexed source trees, Aetheria lore, and local vector stores, then hands deeper work to Codex when chat stops being the right tool.</p>
  </div>

  <div id="gamecult-vn-voidbot-pipe" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Bot / Worker Split</h2>
    <p>The Discord gateway and permissions stay in the bot lane; heavier jobs and MCP tools live in the worker lane. Transport is not truth.</p>
  </div>

  <div id="gamecult-vn-voidbot-memory" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Social Memory</h2>
    <p>Interaction memory, audit events, self-state projection, speech receipts, and candidate interventions let the bot remember without pretending a read is a verdict.</p>
  </div>

  <div id="gamecult-vn-voidbot-faces" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Repo Faces</h2>
    <p>Repo Faces grow from indexed bodies and webhook speech. A project should greet you, explain itself, and point at evidence without pretending the avatar is the source of truth.</p>
  </div>

  <div id="gamecult-vn-cultlib" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>CultLib</h2>
    <p>CultLib is the shared record shelf: typed documents first, protocol names second, and no convenient blob crowned as truth just because it was nearby.</p>
    <p><a href="/Projects/CultLib">Project page</a> | <a href="https://github.com/GameCult/CultLib">GitHub repo</a></p>
  </div>

  <div id="gamecult-vn-heimdall" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Heimdall</h2>
    <p>The identity and capability authority taking shape for GameCult apps: OAuth, linked identities, grants, consent, revocation, and signed claims.</p>
    <p><a href="/Projects/Heimdall">Project page</a> | <a href="https://github.com/GameCult/Heimdall">GitHub repo</a></p>
  </div>

  <div id="gamecult-vn-proof" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Public Proof</h2>
    <p>The proof surface is still young. Today it starts with repo links, damage reports, graph visibility, and a receipt checklist for future Bifrost work records.</p>
    <p><a href="/Blog/daily-damage-report/">Daily Damage Report</a> | <a href="/Graph">Site graph</a></p>
  </div>

  <div id="gamecult-vn-roadmap" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Roadmap Shape</h2>
    <p>The public path is Bifrost-first private alpha, proof sprint, design partners, fellows/support pilots, and only then larger social-support machinery under legal review.</p>
    <p><a href="/Docs/Bifrost">Current Bifrost rollout</a></p>
  </div>

  <div id="gamecult-vn-mimir-well" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Mimir Field Well</h2>
    <p>Mimir owns configuration, calibration truth, runtime contracts, launch, status, persistence, and continuity pressure for realtime room intelligence.</p>
  </div>

  <div id="gamecult-vn-mimir-reservoir" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Native Reservoir</h2>
    <p>The future body is one rolling time-ordered reservoir. Typed views are indexes, not private histories. Camera frames, scene rays, material claims, audio blocks, phase claims, and render packets share a field.</p>
  </div>

  <div id="gamecult-vn-mimir-sensors" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Sensor Array</h2>
    <p>Cameras, Leap IR, Focusrite anchors, camera mics, PS Eye witnesses, visual fusion, audio field models, and clock drift all need visible confidence before they can feed the surface web.</p>
  </div>

  <div id="gamecult-vn-mimir-confidence" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Confidence</h2>
    <p>Mimir wants drift named, cadence proven, false coherence rejected, and no feed called truth before it earns the oath.</p>
  </div>

  <div id="gamecult-vn-ghostlight-state" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Ghostlight State</h2>
    <p>Ghostlight keeps three truths apart: canonical state, observer-specific perceived state, and portable Persona projection.</p>
  </div>

  <div id="gamecult-vn-ghostlight-branch" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Branch Compiler</h2>
    <p>Reviewed scene intent and consequence packets become playable Ink plus training receipts. The compiler cares about state reads, consequences, and branch folding.</p>
  </div>

  <div id="gamecult-vn-ghostlight-sidecar" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Sidecars</h2>
    <p>`.training.json` and visual sidecars make scene consequences reusable for future specialized models and visual surfaces.</p>
  </div>

  <div id="gamecult-vn-ghostlight-reviewer" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Reviewer</h2>
    <p>The reviewer catches fake variables, cosmetic choices, missing state reads, fake folds, and visual callback gaps before a scene calls itself meaningful.</p>
  </div>

  <div id="gamecult-vn-aetheria" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Aetheria</h2>
    <p>Science-fantasy ships, faction pressure, generated routes, action-RPG ambitions, and a setting archive waiting for recovery work instead of another heroic restart.</p>
    <p><a href="https://aetheria.gamecult.org">Aetheria site</a></p>
  </div>

  <div id="gamecult-vn-zyphos" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Zyphos</h2>
    <p>A close-binary living world with dim-star ecology, Mother Tree contracts, memory-bearing cells and landscapes, and politics that behaves like biology with obligations.</p>
    <p><a href="https://zyphos.gamecult.org">Zyphos site</a></p>
  </div>

  <div id="gamecult-vn-weksa" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Weksa</h2>
    <p>Ontology-first language work: source text to interlingua, alien ontology, grammar, morphology, phonology, diachrony, renderer, gloss, and trace.</p>
    <p><a href="https://github.com/GameCult/weksa">Weksa repo</a></p>
  </div>

  <div id="gamecult-vn-streampixels" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>StreamPixels</h2>
    <p>Persistent pixel characters for livestream overlays: account linking, customization, creator event rules, realtime fanout, and overlay rendering that does not own authorization.</p>
    <p><a href="https://github.com/GameCult/StreamPixels">StreamPixels repo</a></p>
  </div>

  <div id="gamecult-vn-aquasynth" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>AquaSynth</h2>
    <p>Patch graph contracts, `.aqua` authoring, SFXR mapping, Faust generation, and the research path toward alien vocal-tract synthesis with Weksa utterance structures.</p>
    <p><a href="https://github.com/GameCult/AquaSynth">AquaSynth repo</a></p>
  </div>

  <div id="gamecult-vn-repixelizer" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Repixelizer</h2>
    <p>Pixel-art reconstruction as diagnosis: infer the grid, expose lattice mistakes, rebuild phase fields, sample source pixels, snap alpha, and optionally quantize palette.</p>
    <p><a href="/Projects/repixelizer">Project page</a> | <a href="https://github.com/GameCult/repixelizer">Repo</a></p>
  </div>

  <div id="gamecult-vn-vibegeometry" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>VibeGeometry</h2>
    <p>Runtime shape work around Rust CSG: tree intent, LOD-aware hierarchy, selected cuts, and generated geometry outputs with inspectable transformation receipts.</p>
    <p><a href="/Projects/VibeGeometry">Project page</a> | <a href="https://github.com/GameCult/VibeGeometry">Repo</a></p>
  </div>

  <div id="gamecult-vn-visual-tools" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>Visual Tools</h2>
    <p>Repixelizer and VibeGeometry share a thesis: creative tools should make constrained reconstruction inspectable, not hide transformations behind a pretty export.</p>
  </div>

  <div id="gamecult-vn-cultpong" class="gamecult-vn-source-card" data-sai-dom-source="true">
    <h2>CultPong</h2>
    <p>A fast paddle-arena prototype with shaped unlockables, geometry-driven bounces, a bash mechanic, and an obvious path toward tiny-game patronage experiments.</p>
    <p><a href="/Projects/CultPong">Project page</a></p>
  </div>

  <div id="gamecult-vn-moonshot" class="gamecult-vn-source-card gamecult-vn-graphic-card" data-sai-dom-source="true">
    <h2>Moonshot Trajectory</h2>
    <img src="/static/interactive/portfolio-pitch/figures/moonshot-trajectory.svg" alt="GameCult moonshot trajectory graphic" />
    <p>Bifrost, Eve, CultMesh, and Sai form the launch path from worker-owned production into the cooperative surface web.</p>
  </div>

  <div id="gamecult-vn-surface-stack" class="gamecult-vn-source-card gamecult-vn-graphic-card" data-sai-dom-source="true">
    <h2>Eve Surface Web Stack</h2>
    <img src="/static/interactive/portfolio-pitch/figures/surface-web-stack.svg" alt="Eve surface web stack graphic" />
    <p>Eve streams CultUI semantics across web, desktop, mobile, game UI, and creator overlays without splitting truth into dashboard islands.</p>
  </div>

  <div id="gamecult-vn-patronage-furnace" class="gamecult-vn-source-card gamecult-vn-graphic-card" data-sai-dom-source="true">
    <h2>Patronage Furnace</h2>
    <img src="/static/interactive/portfolio-pitch/figures/patronage-furnace.svg" alt="Bifrost patronage furnace graphic" />
    <p>Game spend, patronage, and verified work enter Bifrost; log-power voting and project-local governance come out.</p>
  </div>

  <div id="gamecult-vn-value-orbit" class="gamecult-vn-source-card gamecult-vn-graphic-card" data-sai-dom-source="true">
    <h2>Value Orbit Map</h2>
    <img src="/static/interactive/portfolio-pitch/figures/value-orbit-map.svg" alt="GameCult portfolio value orbit map" />
    <p>The portfolio becomes dangerous when projects orbit one shared governance, state, and interface substrate.</p>
  </div>

  <div id="gamecult-vn-repo-doc-tree" class="gamecult-vn-source-card gamecult-vn-doc-tree-card" data-sai-dom-source="true">
    <div data-gamecult-doc-tree>
      <h2>Repository Swarm Documentation</h2>
      <p>Loading the generated repo documentation tree.</p>
    </div>
  </div>
</section>
