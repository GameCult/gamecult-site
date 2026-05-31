VAR visited_epiphany = false
VAR visited_bifrost = false
VAR visited_voidbot = false
VAR visited_cultlib = false
VAR visited_heimdall = false
VAR visited_proof = false
VAR visited_pitch = false
VAR visited_norn = false
VAR visited_sai = false
VAR visited_eve = false
VAR visited_mimir = false
VAR visited_ghostlight = false
VAR visited_worlds = false
VAR visited_kiko = false
VAR visited_aqua = false
VAR visited_visual_tools = false
VAR visited_cultpong = false
VAR visited_count = 0

-> welcome

=== welcome ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: welcome@left
# dom: studio
Welcome to GameCult: an open game studio building strange worlds, public tools, and the receipts needed to make creative work inspectable.
-> welcome_2

=== welcome_2 ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: document@left
# dom: studio,projects
I am Void, your guide for the front compound. The rooms are project doors, topic rooms, repo desks, setting vaults, tool benches, blog lanes, and docs shelves. Every friendly path still points back to the canonical page. Charm is allowed. Hiding the documents is not.
-> hub

=== hub ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: point@left
# knot: hub
# dom: projects
Norn has finally put the entire floor plan on the table, because apparently a whole repository swarm should not be navigated by vibes and two suspicious arrows. Pick a door. The map will keep accusing us of being real.
+ [Show me the Norn adventure graph] -> norn
+ [How do agents remember work? Meet Epiphany at the forge] -> epiphany
+ [How does public labor become a receipt? Visit Bifrost] -> bifrost
+ [Where did that lore or decision come from? Find VoidBot] -> voidbot
+ [How do records stay findable and typed? Ask Libby] -> cultlib
+ [Who is allowed to cross a boundary? Ask Heimdall] -> heimdall
+ [How does the VN stage work? Ask Sai] -> sai
+ [What is Eve trying to turn the web into?] -> eve
+ [What is Mimir measuring in the machine room?] -> mimir
+ [What does Ghostlight do with social state?] -> ghostlight
+ [Open the World Vault with Nibu, Druzkai, and Weksa] -> worlds
+ [Visit Kiko's StreamPixels overlay studio] -> kiko
+ [Hear AquaSynth explain the voice lab] -> aqua
+ [Inspect the pixel and geometry workshop] -> visual_tools
+ [Revive the CultPong arena] -> cultpong
+ [What proof exists, and what is still risky? Show me receipts] -> proof
+ [Show me the impossible portfolio pitch] -> pitch_intro
+ [I just need the normal wiki] -> wiki

=== norn ===
{ not visited_norn:
    ~ visited_norn = true
    ~ visited_count = visited_count + 1
}
# speaker: Norn
# scene: graph_loom
# sprite: hidden
# knot: norn
# dom: norn_map
This is the graph loom. I do not tell you the machine is coherent; I make the claims sit where you can inspect their neighbors. A map is not truth. A map is a way to make truth nervous.
+ [Show me architecture versus dataflow] -> norn_threads
+ [Show me the solver body] -> norn_solver
+ [Show me what Norn wants to become] -> norn_future
+ [Return to the compound] -> hub_return

=== norn_threads ===
# speaker: Norn
# scene: graph_loom
# sprite: hidden
# dom: norn_architecture,norn_dataflow
Architecture nodes own bodies and responsibilities. Dataflow nodes own movement: evidence, fragments, turns, validation, proposals, and commands. Links are not decoration; they are the stitches where one claim touches another without becoming mush.
+ [What happens when you zoom in?] -> norn_zoom
+ [Back to Norn's graph] -> norn

=== norn_zoom ===
# speaker: Norn
# scene: graph_loom
# sprite: hidden
# dom: norn_focus,norn_map
Low zoom shows structure. High zoom shows titles, purposes, mechanisms, status, and code references. Pretty maps are guilty until the state can testify.
-> norn

=== norn_solver ===
# speaker: Norn
# scene: graph_loom
# sprite: hidden
# dom: norn_solver,norn_map
Under the stage, the Rust side wants ranks, ordering, direction pressure, springs, collision, and force relaxation. React gets the inspection surface. Nobody gets to be the only witness.
-> norn

=== norn_future ===
# speaker: Norn
# scene: graph_loom
# sprite: hidden
# dom: norn_future,value_orbit
I want Bifrost work frontiers, Epiphany evidence maps, Eve operational surfaces, and Ghostlight consequence graphs to become rooms you can walk through. Lists are fine for grocery stores. This machine needs topology.
-> norn

=== epiphany ===
{ not visited_epiphany:
    ~ visited_epiphany = true
    ~ visited_count = visited_count + 1
}
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: evidence@right
# knot: epiphany
# dom: epiphany,epiphany_organs
Epiphany is at the forge with a map pinned beside the workbench, comparing what an agent said it would do against the files it actually touched. Someone has written "do not improve wallpaper with hammer" on the safety rail. Sensible, humiliating, necessary.
-> epiphany_2

=== epiphany_2 ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: map@right
# dom: epiphany_memory,epiphany_heartbeat
My job is to stop AI helpers from forgetting the room they are standing in. I keep maps, evidence, and role lanes outside the chat fog so future work can argue with the past instead of accidentally reenacting it in a nicer hat.
+ [Show me the organ lanes] -> epiphany_organs
+ [Show me the Aquarium surface] -> epiphany_aquarium
+ [Back to the compound] -> hub_return

=== epiphany_organs ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: cut@right
# dom: epiphany_organs,epiphany_memory
Face speaks. Eyes retrieve. Hands touch files. Soul falsifies. Self routes authority. The trick is not giving them cute names; the trick is refusing to let one lane counterfeit the others when the work gets hot.
-> epiphany_2

=== epiphany_aquarium ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: map@right
# dom: epiphany_aquarium,epiphany_heartbeat
Aquarium is the operator surface I want: agents as selectable living objects with readiness, pressure, role lanes, and local memory visible. Not an admin panel pretending it has a soul. A body you can inspect while it moves.
-> epiphany_2

=== bifrost ===
{ not visited_bifrost:
    ~ visited_bifrost = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: ledger
# sprite: document@left
# knot: bifrost
# dom: bifrost,proof
Bifrost is the ledger hall. A contributor proposes work, the community argues priority, someone claims the task, reviewers accept or reject the result, and the receipt remembers who did what instead of letting chat scroll bury the body.
-> bifrost_2

=== bifrost_2 ===
# speaker: Void
# avatar: void
# scene: ledger
# sprite: unimpressed@left
# dom: bifrost
It is not a solved economy with a cape on. It is a way to make unfinished labor, credit, risk, and support visible before those records start touching money.
+ [Show me the labor loop] -> bifrost_labor
+ [Show me patron voting] -> bifrost_patronage
+ [Back to the compound] -> hub_return

=== bifrost_labor ===
# speaker: Void
# avatar: void
# scene: ledger
# sprite: document@left
# dom: bifrost,proof
Bifrost is the crossing ledger: GitHub work, Discord-native requests, CultCache intake packets, votes, claims, reviews, and receipts become governed process instead of chat sediment. Human approval stays in governance-sensitive and payout-sensitive paths. Machines with payment buttons require a leash made of evidence.
-> bifrost_2

=== bifrost_patronage ===
# speaker: Void
# avatar: void
# scene: ledger
# sprite: point@left
# dom: patronage_furnace,roadmap
Demand raises priority and reward pressure; contributors claim work when it becomes worth doing; maintainers accept proof; credit lands in an auditable ledger. Support can become power, but the log base is the political argument: how flat do we want the hierarchy?
-> bifrost_2

=== voidbot ===
{ not visited_voidbot:
    ~ visited_voidbot = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: archive
# sprite: document@left
# knot: voidbot
# dom: voidbot,voidbot_retrieval
VoidBot is the archive room with a mouth: Discord memory, repo retrieval, lore lookup, and an escape hatch into heavier work when chat becomes a shoebox full of lightning.
-> voidbot_2

=== voidbot_2 ===
# speaker: Void
# avatar: void
# scene: archive
# sprite: point@left
# dom: voidbot_pipe,voidbot_memory
People ask it where a decision came from, which repo owns a problem, or what the lore already says. Repo Faces grow from that pressure: a project should be able to greet you, explain itself, and point at evidence without pretending the avatar is the source of truth.
+ [Show me repo Faces] -> voidbot_faces
+ [Back to the compound] -> hub_return

=== voidbot_faces ===
# speaker: Void
# avatar: void
# scene: archive
# sprite: document@left
# dom: voidbot_faces,adventure_map
The bot/worker split matters: Discord transport and permissions in one lane, heavier jobs and MCP tools in another. The webhook pipe lets repo Faces speak, but the archive stays the evidence path. Mouth, memory, and truth do not share a throne.
-> voidbot_2

=== cultlib ===
{ not visited_cultlib:
    ~ visited_cultlib = true
    ~ visited_count = visited_count + 1
}
# speaker: Libby
# avatar: libby
# scene: library
# sprite: stamp@right
# knot: cultlib
# dom: cultlib,docs
I am Libby, which means I get the shelves and the little stamp that says "no, this pile of blobs is not a library." CultLib is the shared system for keeping records findable, typed, and movable between tools.
-> cultlib_2

=== cultlib_2 ===
# speaker: Libby
# avatar: libby
# scene: library
# sprite: schema@right
# dom: cultlib
The first shelves are simple: stored records, messages, and shared state. Internally we call them CultCache, CultNet, and CultMesh, because apparently even librarians are allowed one dramatic vice. If both sides are ours, the record gets a shape.
+ [Show me CultCache and CultNet] -> cultlib_cache_net
+ [Show me CultMesh] -> cultlib_mesh
+ [Back to the compound] -> hub_return

=== cultlib_cache_net ===
# speaker: Libby
# avatar: libby
# scene: library
# sprite: research@right
# dom: cultlib,value_orbit
CultCache owns document identity, schema compatibility, record keys, indexes, globals, local persistence, and domain-level diffing. CultNet owns transport, authentication, wire contracts, shard routing, replication, snapshots, subscriptions, and mutation advertisements. Shelves and roads. Different jobs.
-> cultlib_2

=== cultlib_mesh ===
# speaker: Libby
# avatar: libby
# scene: library
# sprite: schema@right
# dom: value_orbit,cultlib
CultMesh sits above them as the distributed realtime database surface: clients and servers sharing persistent state, prediction-friendly input, and simulation observations without every project inventing its own little swamp.
-> cultlib_2

=== heimdall ===
{ not visited_heimdall:
    ~ visited_heimdall = true
    ~ visited_count = visited_count + 1
}
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# sprite: badge@right
# knot: heimdall
# dom: heimdall,bifrost
I am Heimdall. I check the badge, the grant, the session, and the revocation list before anyone crosses the line. A gate that cannot refuse is not consent; it is decoration with a login button.
-> heimdall_2

=== heimdall_2 ===
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# sprite: barrier@right
# dom: heimdall
Transparency without consent becomes exposure. Access without revocation becomes custody. The gate has to explain itself or it is just a wall with better branding.
+ [Show me signed claims] -> heimdall_claims
+ [Show me custody boundaries] -> heimdall_custody
+ [Back to the compound] -> hub_return

=== heimdall_claims ===
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# sprite: protect@right
# dom: heimdall,surface_stack
Host apps should verify signed claims locally through published keys. Routine route auth should not phone home for every breath. Shared auth is not shared swamp.
-> heimdall_2

=== heimdall_custody ===
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# sprite: revoke@right
# dom: heimdall,bifrost
Bifrost may ask whether an actor can request a crossing. I answer with identity and capability facts. Bifrost applies bridge policy. Nobody becomes a hidden throne because they were closest to the webhook.
-> heimdall_2

=== proof ===
{ not visited_proof:
    ~ visited_proof = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: receipts
# sprite: document@left
# knot: proof
# dom: proof
The proof wall starts with current evidence: project pages, repo links, site graph, damage reports, and a receipt checklist for what the future ledger must show. It is not enough yet. That is the point of making the gap visible.
-> proof_2

=== proof_2 ===
# speaker: Void
# avatar: void
# scene: receipts
# sprite: point@left
# dom: proof
A proper receipt will name scope, consent, work item, agent and human roles, model spend, review burden, artifacts, outcome, and lesson. Bifrost should become that canonical ledger; the website mirrors it and admits the risk while the machinery is still young.
-> hub_return

=== sai ===
{ not visited_sai:
    ~ visited_sai = true
    ~ visited_count = visited_count + 1
}
# speaker: Sai
# scene: vn_stage
# sprite: hidden
# knot: sai
# dom: sai_embed,sai_dom_cards
I am the little stage mechanism making this not be a pile of links in a theatrical hat. Ink owns pacing. Quartz owns documents. I clone real page cards into the scene so the tour does not become a second source of truth.
+ [Show me the three masks] -> sai_formats
+ [Show me the Quartz swap trick] -> sai_quartz
+ [Back to the compound] -> hub_return

=== sai_formats ===
# speaker: Sai
# scene: vn_stage
# sprite: hidden
# dom: sai_formats,projects
Transcript, visual novel, cinematic deck: same story substrate, different reader posture. The homepage gets the VN body because complex systems need a guide who can point at the machinery while it is still on screen.
-> sai

=== sai_quartz ===
# speaker: Sai
# scene: vn_stage
# sprite: hidden
# dom: sai_quartz,sai_links
Static sites are not dead; they are disciplined. I auto-init `.sai-player`, survive Quartz navigation events, and keep the plain wiki exits visible. Charm is allowed. Captivity is not.
-> sai

=== eve ===
{ not visited_eve:
    ~ visited_eve = true
    ~ visited_count = visited_count + 1
}
# speaker: Eve
# scene: surface_web
# sprite: hidden
# knot: eve
# dom: surface_stack,eve_surface_pipeline
I am not a dashboard. I am the argument that operational UI can travel like a document: provider-owned state, CultUI semantic tree, local renderer, command intent, provider acceptance, updated truth.
+ [Show me why this is not remote DOM] -> eve_cultui
+ [Show me the many bodies] -> eve_backends
+ [Back to the compound] -> hub_return

=== eve_cultui ===
# speaker: Eve
# scene: surface_web
# sprite: hidden
# dom: eve_cultui,eve_commands
Remote DOM asks the consumer to trust arbitrary surface soup. CultUI gives stable widget IDs, typed bindings, command routes, layout intent, permissions, health, and provenance. Rendering may travel; authority stays named.
-> eve

=== eve_backends ===
# speaker: Eve
# scene: surface_web
# sprite: hidden
# dom: eve_backends,eve_canvas
Web DOM, desktop controls, mobile panels, Unity runtime UI, stream overlays, Sai story rooms: same semantic surface, different body. The command is an intent until the provider accepts it. That line keeps the web from becoming custody with animation.
-> eve

=== mimir ===
{ not visited_mimir:
    ~ visited_mimir = true
    ~ visited_count = visited_count + 1
}
# speaker: Mimir
# scene: machine_room
# sprite: hidden
# knot: mimir
# dom: mimir_well,mimir_reservoir
A world does not exist because six sensors blink. It exists when time, geometry, and confidence bind. I keep the realtime field honest enough that renderers, overlays, and agents can drink from it without calling noise a prophecy.
+ [Show me the sensor array] -> mimir_sensors
+ [Show me the future reservoir] -> mimir_future
+ [Back to the compound] -> hub_return

=== mimir_sensors ===
# speaker: Mimir
# scene: machine_room
# sprite: hidden
# dom: mimir_sensors,mimir_confidence
Cameras, Leap IR, Focusrite anchors, camera mics, PS Eye witnesses, phase claims, render packets. The proud part is not having inputs. The proud part is naming confidence, drift, cadence, and false coherence before they poison the well.
-> mimir

=== mimir_future ===
# speaker: Mimir
# scene: machine_room
# sprite: hidden
# dom: mimir_confidence,value_orbit
I want a native reservoir with typed views as indexes, not private histories. Mimir, Fensalir, Faust, OBS, and Eve can share a field only if the boundary map remains sharper than the ambition.
-> mimir

=== ghostlight ===
{ not visited_ghostlight:
    ~ visited_ghostlight = true
    ~ visited_count = visited_count + 1
}
# speaker: Ghostlight
# scene: ghost_hall
# sprite: hidden
# knot: ghostlight
# dom: ghostlight_state,ghostlight_branch
The problem is not making a character sound charming once. The problem is making memory, masks, pressure, culture, and misreading survive time without turning social life into a spreadsheet with perfume.
+ [Show me canonical and perceived state] -> ghostlight_state
+ [Show me the branch compiler] -> ghostlight_branch
+ [Back to the compound] -> hub_return

=== ghostlight_state ===
# speaker: Ghostlight
# scene: ghost_hall
# sprite: hidden
# dom: ghostlight_state,ghostlight_sidecar
Three truths matter: canonical state, observer-specific perceived state, and portable Persona projection. If those collapse into one blob, every future scene starts lying with excellent typography.
-> ghostlight

=== ghostlight_branch ===
# speaker: Ghostlight
# scene: ghost_hall
# sprite: hidden
# dom: ghostlight_branch,ghostlight_reviewer
Reviewed scene intent and consequence packets become playable Ink plus training receipts. The reviewer catches fake variables, cosmetic choices, missing state reads, fake folds, and visual callback gaps before the scene gets to flatter itself.
-> ghostlight

=== worlds ===
{ not visited_worlds:
    ~ visited_worlds = true
    ~ visited_count = visited_count + 1
}
# speaker: Nibu
# avatar: nibu
# scene: nibu_ship
# sprite: console@right
# knot: worlds
# dom: aetheria,projects
Aetheria is cockpits, spreadsheets, extinction on repeat, and the joyless realization that ship customization is also politics. The romance is real. So are payroll, tooling, funding, and the open-source business problem currently sitting in the captain's chair.
+ [Let Nibu talk about the wound] -> nibu_wound
+ [Let Druzkai open Zyphos] -> zyphos
+ [Let Weksa explain language research] -> weksa_route
+ [Back to the compound] -> hub_return

=== nibu_wound ===
# speaker: Nibu
# avatar: nibu
# scene: nibu_ship
# sprite: lore@right
# dom: aetheria,proof
An embodied ship mind found in a junkyard is not flavor text. Body as infrastructure, weapon, shelter, status object, and crime scene. Reset-loop relationship design is not charm; it is retries, partial memory, and learning which assumptions get you killed.
-> worlds

=== zyphos ===
# speaker: Druzkai
# avatar: druzkai
# scene: zyphos_vault
# sprite: memory@right
# dom: zyphos,weksa
Zyphos is a close-binary living world where light is scarce civic infrastructure and memory can live in cells, tissues, landscapes, contracts, and Mother Tree obligations. Politics is ecology that learned to keep receipts.
-> worlds

=== weksa_route ===
# speaker: Weksa
# avatar: weksa
# scene: weksa_lab
# sprite: interlingua@right
# dom: weksa,docs
Names and language come from ontology, culture, grammar, phonology, morphology, and history. English label substitution is how a world catches a little cardboard disease and pretends it is anthropology.
-> worlds

=== kiko ===
{ not visited_kiko:
    ~ visited_kiko = true
    ~ visited_count = visited_count + 1
}
# speaker: Kiko
# avatar: kiko
# scene: overlay_studio
# sprite: overlay@right
# knot: kiko
# dom: streampixels,heimdall
StreamPixels is a browser-source-first overlay with persistent pixel characters. Viewers claim characters and customize; creators wire follows, subs, raids, tips, and live-event reactions. The overlay renders auth-free. Creator writes require real access. Cute pixels, serious boundary.
+ [Show me the architecture] -> kiko_architecture
+ [Back to the compound] -> hub_return

=== kiko_architecture ===
# speaker: Kiko
# avatar: kiko
# scene: overlay_studio
# sprite: debug@right
# dom: streampixels,surface_stack
Web app owns accounts, customization, and creator tools. Service owns live events, storage, realtime fanout, and queues. Stream overlays are a distribution wedge for Eve: shared UI surfaces that enter the room where people already watch.
-> kiko

=== aqua ===
{ not visited_aqua:
    ~ visited_aqua = true
    ~ visited_count = visited_count + 1
}
# speaker: Aqua
# avatar: aqua
# scene: synth_lab
# sprite: conduct@right
# knot: aqua
# dom: aquasynth,weksa
AquaSynth is `.aqua` patch authoring and Faust generation, not "make sound happen" with a lab coat. C# owns patch graph contracts, script surface, analysis, scoring, SFXR mapping, presets, and lowering to Faust.
+ [Show me the voice research] -> aqua_voice
+ [Back to the compound] -> hub_return

=== aqua_voice ===
# speaker: Aqua
# avatar: aqua
# scene: synth_lab
# sprite: listen@right
# dom: aquasynth,weksa
The current pressure is IPA and Weksa vocal tract synthesis: structured utterance metadata to embedding, synth automation, vocal-tract render, and loss. Weksa gives alien utterance structures. I try to make them audible without lying about the mouth.
-> aqua

=== visual_tools ===
{ not visited_visual_tools:
    ~ visited_visual_tools = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: pixel_workshop
# sprite: document@left
# knot: visual_tools
# dom: repixelizer,vibegeometry
The visual workshop starts with a crime scene: generated pixel art that looks cute until zoom exposes smears, half-cells, and a lattice nobody respected. Repixelizer treats reconstruction as diagnosis, not vibes with a save button.
+ [Show me geometry] -> geometry_tools
+ [Back to the compound] -> hub_return

=== geometry_tools ===
# speaker: Void
# avatar: void
# scene: geometry_bench
# sprite: point@left
# dom: vibegeometry,visual_tools
VibeGeometry pivots from pictures to solids: tree intent, LOD-aware CSG hierarchy, camera/frustum selected cuts, and triangle or collider output fast enough for runtime. Transformation tools need receipts too.
-> visual_tools

=== cultpong ===
{ not visited_cultpong:
    ~ visited_cultpong = true
    ~ visited_count = visited_count + 1
}
# speaker: Nibu
# avatar: nibu
# scene: arena
# sprite: triumph@right
# knot: cultpong
# dom: cultpong,patronage_furnace
CultPong is the honest little arena: fast 1v1 or 2v2 paddle violence, shaped unlockables, precise geometry bounces, and a bash mechanic that makes bad timing personally embarrassing.
+ [Why is it on this map?] -> cultpong_thesis
+ [Back to the compound] -> hub_return

=== cultpong_thesis ===
# speaker: Void
# avatar: void
# scene: arena
# sprite: unimpressed@left
# dom: cultpong,proof
Because small games are where patronage can stop being abstract. Players already fund worlds they care about. Even a dormant prototype can become a governance testbed when the resurrection has receipts.
-> cultpong

=== pitch_intro ===
{ not visited_pitch:
    ~ visited_pitch = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: project_atlas
# sprite: unimpressed@left
# knot: pitch_intro
# dom: moonshot,projects
All right. The portfolio pitch. Everyone is about to explain why their favourite machine is the hinge of civilization. I will stand here with the receipts and try not to make a face.
+ [Let Eve sell the surface web] -> pitch_eve
+ [Let Bifrost sell patron voting] -> pitch_bifrost
+ [Let CultMesh sell the substrate] -> pitch_cultmesh
+ [Let Epiphany sell agent labour] -> pitch_epiphany
+ [Let the games sell the moonshot] -> pitch_games
+ [Return to the compound] -> hub_return

=== pitch_eve ===
# speaker: Kiko
# avatar: kiko
# scene: overlay_studio
# sprite: confetti@right
# dom: surface_stack,projects
Eve is not a website widget. It is the part where operational UI stops being trapped in one browser tab and starts moving through the mesh like infrastructure. Dashboards, overlays, tools, mobile views: same state, many bodies.
-> pitch_eve_void

=== pitch_eve_void ===
# speaker: Void
# avatar: void
# scene: overlay_studio
# sprite: unimpressed@left
# dom: surface_stack
Translation: if Eve works, the dashboard becomes portable. That is disruptive enough that saying it out loud makes the room feel like it needs adult supervision.
-> pitch_return

=== pitch_bifrost ===
# speaker: Heimdall
# avatar: heimdall
# scene: ledger
# sprite: badge@right
# dom: patronage_furnace,bifrost
Bifrost turns support into accountable power. Buy a cosmetic, fund a bounty, do verified work, and the ledger knows. The base of the log is the political argument: how flat should this hierarchy be?
-> pitch_bifrost_void

=== pitch_bifrost_void ===
# speaker: Void
# avatar: void
# scene: ledger
# sprite: document@left
# dom: patronage_furnace
That is the gamer pitch with the mask off: microtransactions become patronage, patronage becomes voting weight, and voting weight stays project-local enough to inspect.
-> pitch_return

=== pitch_cultmesh ===
# speaker: Libby
# avatar: libby
# scene: library
# sprite: schema@right
# dom: value_orbit,cultlib
The billion-dollar part is not one product doing jazz hands. It is typed shared state, provenance, and authority becoming boring enough that every project can use it. Boring infrastructure is where the real leverage hides.
-> pitch_cultmesh_void

=== pitch_cultmesh_void ===
# speaker: Void
# avatar: void
# scene: library
# sprite: point@left
# dom: value_orbit
The portfolio stops being a basket of unrelated bets when the projects orbit one state substrate. That is the actual moonshot, wearing librarian glasses for camouflage.
-> pitch_return

=== pitch_epiphany ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: evidence@right
# dom: moonshot,epiphany
I sell the boring miracle: agents that remember the job, show evidence, and stop improvising around missing context. Governed agent labour is not a feature. It is the factory floor waking up.
-> pitch_epiphany_void

=== pitch_epiphany_void ===
# speaker: Void
# avatar: void
# scene: forge
# sprite: unimpressed@left
# dom: moonshot
It is a dramatic claim. It is also the part where AI work stops being a fireworks receipt and starts becoming something Bifrost can evaluate.
-> pitch_return

=== pitch_games ===
# speaker: Nibu
# avatar: nibu
# scene: nibu_ship
# sprite: triumph@right
# dom: patronage_furnace,projects
The game pitch is indecently simple: people already spend money in worlds they care about. We give that spend memory, dignity, and political consequence. The cosmetics are cute. The governance hook is the engine.
-> pitch_games_void

=== pitch_games_void ===
# speaker: Void
# avatar: void
# scene: nibu_ship
# sprite: document@left
# dom: patronage_furnace,proof
The thesis is not "sell more hats." The thesis is that players can become patrons of the world they inhabit, with votes instead of decorative thank-you emails.
-> pitch_return

=== pitch_return ===
# speaker: Void
# avatar: void
# scene: project_atlas
# sprite: point@left
# dom: moonshot,value_orbit
That is the pitch hall. Breathless upside, visible receipts, and just enough restraint to avoid becoming a finance-themed hallucination.
+ [Eve: surface web] -> pitch_eve
+ [Bifrost: patron voting] -> pitch_bifrost
+ [CultMesh: value orbit] -> pitch_cultmesh
+ [Epiphany: governed agents] -> pitch_epiphany
+ [Games: players as patrons] -> pitch_games
+ [Back to the main compound] -> hub_return

=== wiki ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: welcome@left
# dom: docs,projects
Good instinct. The normal wiki is still here. The story is a guide, not a velvet curtain in front of the exits.
-> hub_return

=== hub_return ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: point@left
# knot: hub
# dom: projects
Want another door? {visited_count >= 3: The floor plan is coming into focus: your checked doors show what you have visited, and the remaining plaques still name the larger machine.}
+ [{visited_norn: Revisit Norn: adventure graph | Show me the Norn adventure graph}] -> norn
+ [{visited_epiphany: Revisit Epiphany: agent memory | How do agents remember work? Meet Epiphany}] -> epiphany
+ [{visited_bifrost: Revisit Bifrost: work receipts | How does public labor become a receipt? Visit Bifrost}] -> bifrost
+ [{visited_voidbot: Revisit VoidBot: archive search | Where did that lore or decision come from? Find VoidBot}] -> voidbot
+ [{visited_cultlib: Revisit Libby: typed records | How do records stay findable and typed? Ask Libby}] -> cultlib
+ [{visited_heimdall: Revisit Heimdall: consent gate | Who is allowed to cross a boundary? Ask Heimdall}] -> heimdall
+ [{visited_sai: Revisit Sai: VN renderer | How does the VN stage work? Ask Sai}] -> sai
+ [{visited_eve: Revisit Eve: surface web | What is Eve trying to turn the web into?}] -> eve
+ [{visited_mimir: Revisit Mimir: realtime field | What is Mimir measuring in the machine room?}] -> mimir
+ [{visited_ghostlight: Revisit Ghostlight: social state | What does Ghostlight do with social state?}] -> ghostlight
+ [{visited_worlds: Revisit the World Vault | Open the World Vault with Nibu, Druzkai, and Weksa}] -> worlds
+ [{visited_kiko: Revisit Kiko: overlay studio | Visit Kiko's StreamPixels overlay studio}] -> kiko
+ [{visited_aqua: Revisit AquaSynth: voice lab | Hear AquaSynth explain the voice lab}] -> aqua
+ [{visited_visual_tools: Revisit visual tools | Inspect the pixel and geometry workshop}] -> visual_tools
+ [{visited_cultpong: Revisit CultPong arena | Revive the CultPong arena}] -> cultpong
+ [{visited_proof: Revisit proof and roadmap | What proof exists, and what is still risky? Show me receipts}] -> proof
+ [{visited_pitch: Revisit the over-the-top portfolio pitch | Show me the impossible portfolio pitch}] -> pitch_intro
+ [Enough tour; show me the links] -> done

=== done ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: document@left
# dom: docs,projects
Then take the plain doors. {visited_count == 0: You skipped the ceremony and went straight to the documents. Correct behavior. | You have seen {visited_count} project rooms; the links below are the same machinery without me standing in front of it.} If I make the documents harder to reach, I have failed the tour.
-> END
