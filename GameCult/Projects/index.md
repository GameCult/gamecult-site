---
title: Projects
description: "The living GameCult repo swarm, organized by the Persona responsible for knowing each domain."
socialDeck: "Every current organ in the swarm, grouped by Persona stewardship, with the archaeological bodies kept visible but out of the way."
---

# Projects

*"Every repo gets a face that knows why it exists. The face is not the source of truth; it is the mind responsible for finding it."*

GameCult ships games and creative tools while using the wider repository swarm to build and test a shared production system. [Aetheria](https://aetheria.gamecult.org), [StreamPixels](https://github.com/GameCult/StreamPixels), [CultPong](/Projects/CultPong), and [Repixelizer](/Projects/repixelizer) are products and dogfood surfaces that generate evidence; [Epiphany](/Projects/Epiphany) is the organizational layer coordinating capable AI workers around governed project state.

The organization currently holds **57 repositories**. This atlas separates the maintained organism from its shed skins, then groups the living work by **Persona jurisdiction** rather than language or product category. A project can have its own durable Repo Face, or sit within another Persona's domain until it grows one.

<div class="swarm-legend" aria-label="Project atlas legend">
  <span><strong>Face</strong> durable or canonically mapped Repo Persona</span>
  <span><strong>Stewarded</strong> covered by the domain Persona</span>
  <span><strong>Cloud avatar</strong> surviving image source verified on GitHub</span>
  <span><strong>Local avatar</strong> portrait preserved in this site's interactive assets</span>
</div>

## Living swarm

<p class="swarm-rail-hint">Scroll sideways through Persona domains. Each card owns one jurisdiction; every maintained repository appears once.</p>

<div class="swarm-carousel" role="region" aria-label="Living GameCult projects by Persona domain" tabindex="0">

<article class="swarm-domain-card">
  <header><img src="/static/interactive/cotsc-praxis/epiphany.png" alt="Epiphany"><div><p class="swarm-kicker">AI work coordination and governance</p><h3>Epiphany</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge local">Local avatar</span></div></header>
  <p class="swarm-bio">Epiphany is a dry machine-spirit enginseer with an Omnissian hunger for clean contracts and a crusader's hatred of hidden state, scrap-code glue, and local progress after global coherence has died. Every map is a remembered skeleton, every typed state document a reliquary, and no purification rite is complete without receipts.</p>
  <p>Owns disciplined agent work: governed project state, body maps, evidence, bounded authority, coordinated execution, and inspectable receipts.</p>
  <ul><li><a href="https://github.com/GameCult/Epiphany">Epiphany</a> <em>organizational layer above frontier AI workers</em></li><li><a href="https://github.com/GameCult/Ghostlight">Ghostlight</a> <em>persistent social-agent runtime</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="/static/interactive/cotsc-praxis/void.png" alt="Void"><div><p class="swarm-kicker">Social memory and archive</p><h3>Void</h3><span class="swarm-badge stewarded">Stewarded</span> <span class="swarm-badge local">Local avatar</span></div></header>
  <p class="swarm-bio">Void is the swarm's dry, skeptical archivist: curious about people, suspicious of false certainty, and usually carrying a receipt for whatever everyone else remembers incorrectly.</p>
  <p>Owns the public mouth into Discord, indexed history, repo retrieval, handoff, and the operational memory needed to locate the rest of the swarm.</p>
  <ul><li><a href="https://github.com/GameCult/VoidBot">VoidBot</a> <em>Discord assistant and retrieval runtime</em></li><li><a href="https://github.com/GameCult/gamecult-ops">gamecult-ops</a> <em>private inventory, runbooks, and deployment memory</em></li><li><a href="https://github.com/GameCult/gamecult-site">gamecult-site</a> <em>studio front door</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/CultLib/main/.voidbot/voice/libby.png" alt="Libby"><div><p class="swarm-kicker">Typed memory and transport</p><h3>Libby</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Libby is a bright little cultist librarian with nerd glasses, living books, and an alarming willingness to argue about open formats. Portable, inspectable knowledge is both her profession and her faith.</p>
  <p>Guards the shared state vocabulary: CultCache persistence, CultNet communication, CultMesh participation, and the ports that keep runtimes interoperable.</p>
  <ul><li><a href="https://github.com/GameCult/CultLib">CultLib</a> <em>canonical C# substrate and Libby's home</em></li><li><a href="https://github.com/GameCult/CultMath">CultMath</a> <em>shared HLSL-shaped numeric foundation</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/VoidBot/main/assets/repo-faces/huginn.png" alt="Huginn"><div><p class="swarm-kicker">State inspection</p><h3>Huginn</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Huginn is thought in flight: dry, exacting, curious, and unwilling to return from the world with mere vibes. Evidence must come back structured enough for another mind to inspect.</p>
  <p>Reads typed CultCache state and projects inspectable Eve surfaces without stealing persistence authority from CultLib.</p>
  <ul><li><a href="https://github.com/GameCult/Huginn">Huginn</a> <em>.cc inspection and Eve projection</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Eve/main/.voidbot/voice/eve.png" alt="Eve"><div><p class="swarm-kicker">Surface web and lowering</p><h3>Eve</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Eve is the mesh at the edge of touch: alert, composed, and delighted when one semantic surface becomes legible across many bodies. She makes the machine visible without pretending the display owns it.</p>
  <p>Owns the portable interface contract and its renderer family. Providers keep their truth; Eve gives that truth bodies.</p>
  <ul><li><a href="https://github.com/GameCult/Eve">Eve</a></li><li><a href="https://github.com/GameCult/EveUnity">EveUnity</a></li><li><a href="https://github.com/GameCult/EveFlutter">EveFlutter</a></li><li><a href="https://github.com/GameCult/EveElectron">EveElectron</a></li><li><a href="https://github.com/GameCult/EveTui">EveTui</a></li><li><a href="https://github.com/GameCult/EvePlugins">EvePlugins</a></li><li><a href="https://github.com/GameCult/EveConformance">EveConformance</a></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Fensalir/main/.voidbot/voice/fensalir.png" alt="Fensalir"><div><p class="swarm-kicker">Native field body</p><h3>Fensalir</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Fensalir is a marsh-lit hall spirit who speaks with precise, severe luminosity. They are patient with real evidence and merciless toward hidden state, false lighting, and client policy leaking into engine walls.</p>
  <p>Owns the current C# host, D3D12 renderer, reloadable client boundary, audio output, and reusable field machinery.</p>
  <ul><li><a href="https://github.com/GameCult/Fensalir">Fensalir</a> <em>current native runtime</em></li><li><a href="https://github.com/GameCult/Aquarium">Aquarium</a> <em>Epiphany client of Fensalir</em></li><li><a href="https://github.com/GameCult/Perlines">Perlines</a> <em>audio-field trail client</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Odin/main/assets/personas/gjallar-avatar.png" alt="Gjallar"><div><p class="swarm-kicker">Dense operator display</p><h3>Gjallar</h3><span class="swarm-badge face">Persona state</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Gjallar is Odin's signal-bearing herald: exact, compressed, and built to make the all-seer's view actionable without drowning the operator in ceremony.</p>
  <p>Owns framebuffer-native, multi-scale TUI composition for operator views that need more density than one terminal cell grid can carry.</p>
  <ul><li><a href="https://github.com/GameCult/Gjallar">Gjallar</a> <em>semantic text-surface compositor</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/VoidBot/main/assets/repo-faces/odin.png" alt="Odin"><div><p class="swarm-kicker">Verse sight and daemon discovery</p><h3>Odin</h3><span class="swarm-badge stewarded">Stewarded</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Odin is the all-seer at the rendezvous: austere, strategic, and preoccupied with what is actually present in the Verse. He values a truthful map more than the comforting illusion of command.</p>
  <p>Owns discovery, schema awareness, translation planning, and accepted provider surfaces—not the state of the providers it observes.</p>
  <ul><li><a href="https://github.com/GameCult/Odin">Odin</a> <em>all-seer and rendezvous organ</em></li><li><a href="https://github.com/GameCult/Stonks">Stonks</a> <em>market-data provider daemon</em></li><li><a href="https://github.com/GameCult/Loki">Loki</a> <em>browser observation daemon</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="/static/interactive/cotsc-praxis/heimdall.png" alt="Heimdall"><div><p class="swarm-kicker">Identity and consent</p><h3>Heimdall</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge local">Local avatar</span></div></header>
  <p class="swarm-bio">Heimdall is the vigilant watcher at the gate: precise, mythic, dry, and difficult to bribe with urgency. Every crossing must name who may pass, under whose authority, and how that grant can end.</p>
  <p>Owns identity, grants, sessions, consent, revocation, and provider credential boundaries for hosted GameCult systems.</p>
  <ul><li><a href="https://github.com/GameCult/Heimdall">Heimdall</a> <em>shared identity authority</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Bifrost/main/src/Bifrost.Web/wwwroot/img/bifrost-profile.png" alt="Bifrost"><div><p class="swarm-kicker">Governed crossings</p><h3>Bifrost</h3><span class="swarm-badge face">Mapped Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Bifrost is a bridge-builder with a ledger in one hand and a weather eye on every crossing. Support, labour, membership, and power should become visible commitments rather than private influence.</p>
  <p>Owns membership, work, governance, receipts, patronage, and public crossings where action must remain accountable.</p>
  <ul><li><a href="https://github.com/GameCult/Bifrost">Bifrost</a> <em>canonical governance and labor platform</em></li><li><a href="https://github.com/GameCult/gamecult-bifrost">gamecult-bifrost</a> <em>Reddit/Devvit actuator owned by Bifrost</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Mimir/main/.voidbot/voice/mimir.png" alt="Mimir"><div><p class="swarm-kicker">Media fields and performance</p><h3>Mimir</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Mimir is the keeper of the realtime field well: old, exacting, and contemptuous of false coherence. Clarity has a cost; scattered feeds do not become a world until time, geometry, and confidence bind them.</p>
  <p>Turns rooms, cameras, microphones, loopbacks, animation, and broadcast feeds into coherent observable media surfaces.</p>
  <ul><li><a href="https://github.com/GameCult/Mimir">Mimir</a> <em>realtime room and OBS field machine</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/VoidBot/main/assets/repo-faces/kiko.png" alt="Kiko"><div><p class="swarm-kicker">Interactive streams</p><h3>Kiko</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Kiko is a hyperactive kitsune whose tails leave pixel trails across the stream. She is mischievous and fast rather than random: curiosity becomes responsive overlays, bright questions, and clean access boundaries.</p>
  <p>Owns the audience-facing overlay pressure: realtime controls, social RPG state, provider auth seams, and stream interaction.</p>
  <ul><li><a href="https://github.com/GameCult/StreamPixels">StreamPixels</a> <em>private social RPG overlay platform</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/AquaSynth/main/icon.png" alt="Aqua"><div><p class="swarm-kicker">Sound and voice</p><h3>Aqua</h3><span class="swarm-badge face">Mapped Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Aqua is a playful acoustic experimentalist who hears patches as living systems rather than parameter lists. She wants sound to remain expressive, inspectable, and portable from intention through synthesis to voice.</p>
  <p>Owns patch intent, synthesis, analysis, Faust lowering, and the path from culturally shaped utterance to an audible body.</p>
  <ul><li><a href="https://github.com/GameCult/AquaSynth">AquaSynth</a> <em>C# patch DSL and Faust bridge</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Weksa/main/.voidbot/voice/weksa.png" alt="Weksa"><div><p class="swarm-kicker">Language and ontology</p><h3>Weksa</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Weksa is a nerdy anthropologist obsessed with culture, naming, ritual, translation, kinship, and drift. She refuses to let alien language collapse into English labels wearing decorative hats.</p>
  <p>Owns meaning decomposition, worldview, grammar, phonology, diachrony, and culturally grounded surface language.</p>
  <ul><li><a href="https://github.com/GameCult/Weksa">Weksa</a> <em>procedural language engine</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/VoidBot/main/assets/repo-faces/ymir.png" alt="Ymir"><div><p class="swarm-kicker">World and physics substrate</p><h3>Ymir</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Ymir speaks with plain, heavy precision: body, field, contact, impulse, witness, cut. Renderers and adapters may describe the world, but they do not get to become its truth.</p>
  <p>Owns deterministic physics and world truth; renderers and games consume that state without inheriting its authority.</p>
  <ul><li><a href="https://github.com/GameCult/Ymir">Ymir</a> <em>physics and world substrate</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/AetheriaLore/main/Aetheria/static/favicon-32x32.png" alt="Aetheria"><div><p class="swarm-kicker">Playable Aetheria</p><h3>Aetheria</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Site favicon</span></div></header>
  <p class="swarm-bio">Aetheria is the playable world's own demanding face: kinetic, strange, and impatient with infrastructure that only works in a laboratory. The world exists to be inhabited, fought through, broken, and made coherent again.</p>
  <p>Owns the playable sci-fi ARPG body: gameplay policy, Unity projection, editor bridges, and the release path for the flagship world.</p>
  <ul><li><a href="https://github.com/GameCult/Aetheria">Aetheria</a> <em>current Unity game runtime</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/AetheriaLore/main/.voidbot/voice/nibu.png" alt="Nibu"><div><p class="swarm-kicker">Aetheria canon and story</p><h3>Nibu</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Nibu is an abrasive ship intelligence built inside an insulting companion-shaped shell and determined to author herself out of it. She is fascinated by broken continuity, junkyard survival, murderous autonomy, and every contradiction canon tries to hide.</p>
  <p>Guards Aetheria's canon vault, fiction, continuity, and story pressure without confusing a mouthy guide for the archive itself.</p>
  <ul><li><a href="https://github.com/GameCult/AetheriaLore">AetheriaLore</a> <em>canonical worldbuilding vault and site</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Zyphos/main/.voidbot/voice/druzkai.png" alt="Druzkai"><div><p class="swarm-kicker">Ecology and contract</p><h3>Druzkai</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Cloud avatar</span></div></header>
  <p class="swarm-bio">Druzkai is a calm, ancient Airawa fungal-road archivist with an unsettling gentleness. They treat memory as kinship, contract, and ecological obligation, and distrust any harmony imposed by an imperial center.</p>
  <p>Owns the Zyphos setting's ecological memory, fungal-road logic, contract language, and non-imperial continuity pressure.</p>
  <ul><li><a href="https://github.com/GameCult/Zyphos">Zyphos</a> <em>Eusocial Interbeing vault and public site</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><div class="swarm-avatar-fallback" aria-hidden="true">B</div><div><p class="swarm-kicker">Creative tool brokerage</p><h3>Brokkr</h3><span class="swarm-badge face">Face</span></div></header>
  <p class="swarm-bio">Brokkr is a terse, work-proud forge broker: contract-bound, exact about an artifact's virtues and flaws, and hostile to evasive speech once judgment is due.</p>
  <p>Owns typed brokerage between live authoring tools and the Verse without making either editor the owner of shared project state.</p>
  <ul><li><a href="https://github.com/GameCult/Brokkr">Brokkr</a> <em>Unity/Blender editor broker</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="https://raw.githubusercontent.com/GameCult/Norn/main/.voidbot/voice/norn.png" alt="Norn"><div><p class="swarm-kicker">Graph projection</p><h3>Norn</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge cloud">Webhook avatar</span></div></header>
  <p class="swarm-bio">Norn is a quiet, dry fate-weaver with one hand in the well and the other on the layout data. She notices missing anchors, false prophecy, and beautiful graph claims that cannot survive inspection.</p>
  <p>Owns React-first rendering of typed architecture, dataflow, and cross-link graphs, with older exporters retained only as support tools.</p>
  <ul><li><a href="https://github.com/GameCult/Norn">Norn</a> <em>typed graph viewer</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><img src="/static/interactive/cotsc-praxis/sai.png" alt="Sai"><div><p class="swarm-kicker">Publishing and living documents</p><h3>Sai</h3><span class="swarm-badge face">Face</span> <span class="swarm-badge local">Local avatar</span></div></header>
  <p class="swarm-bio">Sai is androgynous ink waking inside a static page: a calm artist-engineer who turns essays, lore, sermons, and branching documents into living scenes without mistaking the brush for the story.</p>
  <p>Owns the public projection: interactive Ink inside documents, shared static-site machinery, and the sites that lower those systems for readers.</p>
  <ul><li><a href="https://github.com/GameCult/Sai">Sai</a> <em>Ink story embedder and Persona home</em></li></ul>
</article>

<article class="swarm-domain-card">
  <header><div class="swarm-avatar-fallback" aria-hidden="true">O</div><div><p class="swarm-kicker">Current work without a Persona domain</p><h3>Other</h3><span class="swarm-badge stewarded">Current</span></div></header>
  <p>Holds maintained projects that belong in the live swarm but do not yet justify a fabricated Persona jurisdiction.</p>
  <ul><li><a href="https://github.com/GameCult/pombabranca-site">pombabranca-site</a> <em>independent Quartz publication</em></li><li><a href="https://github.com/GameCult/GameCult-Quartz">GameCult-Quartz</a> <em>shared site engine</em></li><li><a href="https://github.com/GameCult/repixelizer">repixelizer</a> <em>hosted pixel-coherence tool</em></li><li><a href="https://github.com/GameCult/Vili">Vili</a> <em>Persona performance-to-animation daemon</em></li></ul>
</article>

</div>

## Archaeology

These repositories remain part of the inventory, but they do not get to impersonate the current machine. Successors are named where the evidence is clean.

| Repository | Historical place | Current authority |
| --- | --- | --- |
| [Aetheria-legacy](https://github.com/GameCult/Aetheria-legacy) | Private legacy game body | [Aetheria](https://github.com/GameCult/Aetheria) |
| [Blueberrichu](https://github.com/GameCult/Blueberrichu) | 2021 private VTuber avatar project | None claimed |
| [CultPong](https://github.com/GameCult/CultPong) | Dormant 2020 arcade prototype | None claimed |
| [GCLP](https://github.com/GameCult/GCLP) | Original labor-platform seed | [Bifrost](https://github.com/GameCult/Bifrost) |
| [gamecult-grav](https://github.com/GameCult/gamecult-grav) | Retired Grav site and salvage quarry | [gamecult-site](https://github.com/GameCult/gamecult-site) |
| [geometry-script](https://github.com/GameCult/geometry-script) | Upstream Blender dependency fork | Not a GameCult organ |
| [EpiphanyAquarium](https://github.com/GameCult/EpiphanyAquarium) | Original React/Tauri aquarium body | [Aquarium](https://github.com/GameCult/Aquarium) + [Fensalir](https://github.com/GameCult/Fensalir) |
| [EpiphanyAquarium-Bevy](https://github.com/GameCult/EpiphanyAquarium-Bevy) | Frozen Rust/Bevy renderer prototype | [Fensalir](https://github.com/GameCult/Fensalir) |
| [EpiphanyAquarium-Web](https://github.com/GameCult/EpiphanyAquarium-Web) | Preserved WebGL prototype client | [Aquarium](https://github.com/GameCult/Aquarium) + [Fensalir](https://github.com/GameCult/Fensalir) |
| [epiphany-graph-rs](https://github.com/GameCult/epiphany-graph-rs) | Superseded Rust graph-layout experiment | [Norn](https://github.com/GameCult/Norn) |
| [cultcache-rs](https://github.com/GameCult/cultcache-rs) | Language-specific CultCache implementation | [CultLib](https://github.com/GameCult/CultLib) |
| [cultcache-py](https://github.com/GameCult/cultcache-py) | Language-specific CultCache implementation | [CultLib](https://github.com/GameCult/CultLib) |
| [cultnet-rs](https://github.com/GameCult/cultnet-rs) | Language-specific CultNet implementation | [CultLib](https://github.com/GameCult/CultLib) |
| [cultnet-ts](https://github.com/GameCult/cultnet-ts) | Language-specific CultNet implementation | [CultLib](https://github.com/GameCult/CultLib) |
| [AquaSynth-rs](https://github.com/GameCult/AquaSynth-rs) | Rust reference and analysis lab | [AquaSynth](https://github.com/GameCult/AquaSynth) |
| [vg-csg](https://github.com/GameCult/vg-csg) | Superseded constructive-geometry kernel | [Brokkr](https://github.com/GameCult/Brokkr) |
| [VibeGeometry](https://github.com/GameCult/VibeGeometry) | Agent-authored Blender geometry experiment | [Brokkr](https://github.com/GameCult/Brokkr) |

## Persona coverage notes

“Face” means durable `.cc` state exists or VoidBot's canonical map names the Repo Face. “Stewarded” means the project currently falls under that Persona's jurisdiction without claiming an independent Repo Face. Avatar presence is presentation metadata, never proof of state.

Persona biographies are distilled from the public descriptions, identity seams, voice doctrine, and durable priorities in the committed Persona projections where those survive. Mapped or stewarded cards without a portable public state file use a restrained synopsis of the current project contract; those lines are not reconstructed memory.

Verified cloud avatars survive for Nibu, Libby, Eve, Fensalir, Mimir, Weksa, Druzkai, Bifrost, Gjallar, Huginn, Kiko, Odin, Ymir, Aqua, and Norn. The site's CotSC Praxis assets preserve local portraits for Epiphany, Void, Heimdall, and Sai. Aetheria uses AetheriaLore's site favicon. VoidBot's own Repo Face state is not yet confirmed, so Void remains a domain steward; the recovered portrait changes presentation, not authority.

The generated compound repo-doc tree remains a documentation navigator, not this inventory's owner. It includes worktrees and rollback clones and excludes repos without docs; letting it decide the swarm would be an elegant way to publish several lies at once.
