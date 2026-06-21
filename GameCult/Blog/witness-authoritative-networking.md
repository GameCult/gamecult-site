---
title: Witness-Authoritative Networking
description: "A CultMesh whitepaper on peer consensus, server-authoritative limits, and why MMO-scale realtime state should be witnessed by the players already present."
author: Metacrat
date: 2026-06-21
tags:
  - gamecult
  - cultlib
  - cultmesh
  - networking
  - multiplayer
  - mmo
  - whitepaper
socialDeck: "Server-authoritative networking made games honest. Witness-authoritative networking makes honesty distributable."
---

<section class="ritual-paper-page ritual-paper-page-cover">

# Witness-Authoritative Networking

<div class="ritual-paper-titleblock">
  <p class="ritual-paper-series">GameCult Working Paper GC-NET-2026-06-21</p>
  <p class="ritual-paper-subtitle">CultMesh, Peer Consensus, And The End Of Treating One Server As The Only Possible Witness</p>
  <p class="ritual-paper-author">Metacrat - Department of Distributed State, Expensive Packets, and The Usual Refusal To Let A Useful Machine Stay Small</p>
  <p class="ritual-paper-note">Preprint. Not peer reviewed, unless the peer is a client that re-simulated the frame and brought receipts.</p>
</div>

<div class="ritual-paper-keyline" aria-hidden="true"></div>

## Abstract

<div class="ritual-paper-abstract">

Server-authoritative networking is the modern gold standard for serious online games because it makes one machine responsible for truth. The client sends intent. The server validates, simulates, resolves conflicts, and distributes canonical state. That model is legible, secure, debuggable, and extremely good at stopping the client from becoming a tiny fraud engine with shaders.

It is also expensive when the world gets large, fast, and crowded.

If every relevant fact must cross a central authority before it can become real, then every densely populated battle, city, market, raid, convoy, dogfight, and player-made disaster becomes an infrastructure bill. Implemented naively at MMO scale, server authority turns concurrency into a tax on imagination.

CultMesh proposes a different authority shape:

> The server is not the only witness.
>
> Everyone present can testify.
>
> Canonical state is the result of bounded, typed, replayable consensus over the witnesses who could actually observe the event.

I call this witness-authoritative networking.

It is not ordinary peer-to-peer lockstep. It is not "trust the client." It is not a blockchain wearing a cape. It is a distributed realtime database and simulation-consensus layer built on CultCache documents, CultNet reliable UDP, Verse policy, peer discovery, authority leases, shard logs, prediction scopes, immutable simulation observations, quorum candidates, and committed facts.

The claim is practical: if a game is implemented in terms of CultMesh state, then the work of observation, resimulation, and local agreement can move to the players already present. The operator no longer has to provision a central machine for every hot fact in the universe. Infrastructure becomes a coordination spine rather than the only body allowed to move.

</div>

## 1. Problem Statement

MMO scale is not just "more players."

It is more simultaneously relevant players.

That word, relevant, is where the whole monster lives. Ten thousand players logged into a world are cheap if nine thousand nine hundred of them are staring at different walls. One thousand players trying to update the same fight at 60Hz are a very different animal. If the architecture says that one server must receive, validate, simulate, arbitrate, and broadcast every important fact, then the fight has a central nervous system with a credit card attached.

Server-authoritative networking earned its crown honestly. Valve's Source networking model, for example, uses a server as the authoritative simulation while clients predict locally and receive corrections through snapshots and lag compensation.[^1] Gabriel Gambetta's classic explanation phrases the same basic architecture cleanly: clients send inputs, the server runs the game, and clients receive the resulting state.[^2]

This is correct.

It is also a bottleneck by design.

The server-authoritative model says:

```text
client intent
-> server validates
-> server simulates
-> server resolves
-> server publishes canonical state
-> client reconciles
```

Witness-authoritative networking says:

```text
client intent
-> local prediction
-> nearby witnesses re-simulate
-> witnesses publish observations
-> mesh builds quorum candidates
-> authority commits canonical facts
-> replicas catch up
```

The difference is not that CultMesh abolishes authority.

The difference is that authority no longer has to do all the seeing.

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>1</sup> Server-authoritative networking is treated here as the baseline to respect, not the straw target to defeat.</p>
    <p><sup>2</sup> "Witness" means a runtime with admissible local observation of a fact, not a random peer allowed to vote on any state it likes.</p>
  </div>
  <span class="ritual-paper-page-number">1</span>
</footer>

</section>

<section class="ritual-paper-page">

## 2. Prior Work

The useful prior work comes from several tribes that do not always invite each other to the same conference dinner.

### 2.1 Authoritative Client-Server

The authoritative server model solves the most obvious trust problem: never let the client decide what happened. The client can predict, interpolate, and present. The server decides. This is why serious competitive games still orbit dedicated servers, reconciliation, snapshots, tick rates, and lag compensation.[^1][^2]

The price is central load. You buy trust by concentrating simulation and arbitration.

### 2.2 Deterministic Lockstep

Deterministic lockstep is the old peer-friendly trick: everyone exchanges inputs, everyone simulates the same frame, and if determinism holds, everyone arrives at the same state. Glenn Fiedler's game networking overview describes why this worked for RTS-style games and why fast action games exposed its limitations over the internet.[^3] Deterministic lockstep minimizes bandwidth because input is smaller than state. It also demands strict determinism and makes latency everyone else's problem.

The lesson CultMesh keeps:

> Simulation can be cheaper than state replication when the witnesses agree on rules.

The lesson CultMesh refuses:

> Every participant in the whole game must wait for every other participant before time may move.

### 2.3 Rollback

Rollback networking, popularized by GGPO, lets clients predict remote input, advance immediately, then roll back and replay if later input disagrees.[^4] It is beautiful because it preserves local responsiveness while still converging on the correct input history.

The lesson CultMesh keeps:

> Prediction is not a sin if correction is explicit and replayable.

The lesson CultMesh refuses:

> The whole architecture must be shaped around a tiny fixed peer set.

### 2.4 Interest Management

Massive games already know that broadcasting everything to everyone does not scale. Area-of-interest and interest-management work exists because players only need state relevant to their location, senses, subscriptions, role, and gameplay context. Research on MMOG interest management states the core fact plainly: broadcasting all changes to all players is not viable at massive scale.[^5]

Donnybrook made an adjacent, sharper claim for peer-to-peer games: human attention is bounded, so each peer should send frequent updates only to the players focusing attention on its objects.[^6]

The lesson CultMesh keeps:

> Relevance is the unit of scale.

The lesson CultMesh adds:

> Relevance should govern not only who receives state, but who is allowed to witness and help canonicalize it.

### 2.5 Replicated State And Consensus

State-machine replication says that replicas can remain consistent if they process the same deterministic operations in the same order.[^7] Byzantine fault tolerance work, especially Castro and Liskov's PBFT, shows how systems can tolerate arbitrary faulty or malicious nodes, at a cost.[^8]

CRDTs show another side of the space: some data types can be updated independently and still converge because their merge laws are mathematically disciplined.[^9]

The lesson CultMesh keeps:

> Some state needs ordered authority.
>
> Some state can merge.
>
> Some state requires adversarial quorum.
>
> These are different laws and should not be laundered into one cheerful sync primitive.

That is the prior-work map. CultMesh is not pretending the world lacked ideas. It is composing the useful ones around game-state authority:

```text
authoritative server trust
+ lockstep resimulation
+ rollback prediction
+ area-of-interest locality
+ replicated logs
+ explicit merge laws
+ bounded consensus
= witness-authoritative networking
```

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>3</sup> This is a synthesis claim, not a novelty claim. The novelty is the productized composition around CultCache/CultNet/CultMesh primitives.</p>
    <p><sup>4</sup> CRDTs are only safe for state with declared deterministic merge laws. They are not magic conflict soap.</p>
  </div>
  <span class="ritual-paper-page-number">2</span>
</footer>

</section>

<section class="ritual-paper-page">

## 3. Definition

Witness-authoritative networking is a multiplayer authority model in which canonical state is derived from observations submitted by the peers that were present, eligible, and able to re-simulate or observe the relevant event, then committed through a typed authority path.

In server-authoritative networking:

> The server decides whether Alice shot Bob before Bob shot Alice.

In witness-authoritative networking:

> Alice, Bob, and the other peers whose local simulations had admissible visibility of the event publish what they observed. The mesh aggregates those observations into a candidate. Once quorum and policy are satisfied, the candidate becomes canonical state.

This is not democracy over reality. Votes do not get to outvote physics.

The witnesses must answer:

- which Verse rules were used;
- which shard and epoch they observed;
- which frame or time window the claim belongs to;
- which subject and claim kind are being asserted;
- which deterministic claim hash they computed;
- what weight, role, or authority scope their observation carries;
- whether their runtime and schema are compatible with the Verse.

In CultMesh terms, the observation is not a paragraph of vibes. It is typed state.

```text
CultNetSimulationObservation
  WitnessRuntimeId
  ShardId
  ShardEpoch
  Frame
  SubjectId
  ClaimKind
  ClaimHash
```

The aggregate is not committed world state yet. It is a candidate.

```text
CultNetSimulationConsensusCandidate
  Claim
  SupportWeight
  TotalObservedWeight
  Confidence
  QuorumStatus
```

The commit is a separate act.

```text
CultMeshSimulationFact
  Candidate accepted by policy
  Written through CultNetDatabase
  Recorded in the authoritative shard log
  Replicated to followers
```

That separation is the moral center of the machine.

Observation is not authority.

Consensus candidate is not authority.

Commit is authority.

## 4. CultMesh Primitives

CultMesh exists because "just use peer-to-peer" is how architecture gets teeth marks on it.

The primitives are deliberately named.

### 4.1 CultCache Documents

CultCache owns typed documents, `.cc` persistence, record keys, schema compatibility, local indexes, managed documents, and SoA-friendly memory shape. A player transform, inventory item, simulation fact, shard cursor, Verse descriptor, peer card, stream descriptor, or authority lease is not an ad hoc packet. It is a typed object with a stable persistence and wire story.

### 4.2 CultNet RUDP

CultNet owns schema-v0 messages and transport. The native RUDP pipe gives GameCult runtimes a shared reliable UDP substrate across C#, Rust, Kotlin, Python, and TypeScript. LiteNetLib can remain an adapter. TCP and WebSocket can remain useful lanes. But the portable transport semantics belong to CultNet, not to one runtime's favorite socket wrapper.

### 4.3 Verses

A Verse is a rule-bearing consensus graph.

That dry phrase is doing work.

A Verse declares the rules hash, transport compatibility, authority model, plugin requirements, discovery endpoints, parent Verse, and compatible branches. Aetheria Main, a modded Skylands branch, a peer-hosted arena, and a subscribed overlay can share transport without pretending they share law.

### 4.4 Peer Cards

Peer exchange tells the mesh who can currently serve, observe, replicate, or discover parts of a Verse. A peer card is a contact hint. It is not authority.

This matters because gossip is fast and trust is expensive.

### 4.5 Authority Leases

Authority leases bind a peer to a Verse, role, shard scope, issuer, validity window, and signature. They are the bridge between discovery and trust. A peer can be known without being allowed to commit. A peer can observe without being allowed to author. A peer can help route without being allowed to decide.

### 4.6 Shard Logs

Current CultMesh uses primary-shard authority for committed state. Writes are ordered. Followers pull logs. Replicas keep cursors. Durable shard logs survive restart. Compaction returns explicit resync requirements instead of letting a replica mistake a partial history for truth.

This is the part where the machine stays boring on purpose.

### 4.7 Prediction Scopes

Players can predict their own input documents inside explicit authority scopes. Prediction emits local state now. Reconciliation arrives later through the committed log. That is the old rollback/prediction wisdom, expressed as typed database behavior instead of one more gameplay special case.

### 4.8 Witness Observations

Witnesses publish immutable observations about simulation facts. The hub aggregates observations into deterministic candidates. Candidates become facts only when policy commits them.

This is where the name comes from.

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>5</sup> CultMesh's current implementation still uses primary shard commits. Witness authority moves observation and candidate formation into the mesh before commit.</p>
    <p><sup>6</sup> "Verse" is the boundary that keeps a modded rule branch from silently claiming compatibility with the main world.</p>
  </div>
  <span class="ritual-paper-page-number">3</span>
</footer>

</section>

<section class="ritual-paper-page">

## 5. The Frame

A witness-authoritative frame looks like this:

```text
1. Player writes an input document inside an authority scope.
2. Local runtime predicts immediately.
3. CultNet RUDP carries input and state deltas to relevant peers.
4. Verse policy identifies eligible witnesses.
5. Witnesses re-simulate or observe the event.
6. Witnesses publish immutable simulation observations.
7. The observation hub aggregates consensus candidates.
8. Quorum policy selects an admissible candidate.
9. A shard-authoritative path commits the fact.
10. Replicas catch up through shard logs or snapshots.
11. Clients reconcile predicted documents against committed state.
```

The server-authoritative version of this frame makes the central server do most of the expensive seeing.

The witness-authoritative version makes the present peers do most of the seeing, then makes authority decide what kind of seeing is admissible.

This is how the infrastructure bill changes shape.

In a naive authoritative MMO, the hot spot says:

```text
more players
-> more inputs to server
-> more simulation on server
-> more arbitration on server
-> more outbound state from server
-> more infrastructure
```

In a CultMesh-shaped MMO, the hot spot can say:

```text
more players
-> more local witnesses
-> more available simulation capacity
-> more observation redundancy
-> more quorum confidence
-> operator spine commits less raw work
```

That is the inversion.

More players are not only more load.

More players are more witnesses.

## 6. Why This Scales

CultMesh scales because it refuses to make global consensus the default answer.

Global consensus is expensive. Global consensus over every simulation fact in a fast game is a lovely way to recreate a central server with more messages and worse debugging.

Witness authority is local by construction:

- only relevant peers receive hot state;
- only eligible peers witness a claim;
- only compatible Verse rules count;
- only scoped authority can author;
- only quorum candidates proceed;
- only committed facts enter shard logs;
- only replicas needing the shard catch up.

The unit is not "the world."

The unit is:

```text
Verse + shard + epoch + frame/window + subject + claim kind
```

That tuple is small enough to reason about.

Small enough to route.

Small enough to test.

Small enough to let the players standing near the fire help prove what burned.

## 7. Why This Is Not "Trust The Client"

"Trust the client" means the client sends a claim and the game accepts it.

Witness authority says the opposite:

> A client claim is suspicious until enough admissible witnesses produce compatible observations under the same rules.

The system still needs adversarial policy:

- identity and session control;
- signed authority leases;
- runtime compatibility and rules hashes;
- observation weighting;
- rate limits;
- collusion detection;
- audit logs;
- challenge/resimulation paths;
- operator overrides for contested or valuable state;
- stricter policy for markets, ownership, ranked play, and irreversible assets.

Witness-authoritative networking does not make cheating impossible.

It changes the fraud surface from "one client lies to the server" to "a claim must survive witnesses, replay, quorum, and logs."

That is a better fight.

## 8. Cost Model

Server authority makes trust operationally expensive:

```text
operator pays for simulation
operator pays for bandwidth fanout
operator pays for hot-region scaling
operator pays for every disputed fact
```

Witness authority lets the mesh borrow the resources already present:

```text
players simulate what they can see
players send observations, not whole worlds
nearby peers form local quorum
operator commits final facts and audits contested cases
replicas catch up through typed logs
```

The operator still matters.

The operator owns bootstrap, discovery, identity, high-value authority, moderation, market law, archival history, and final policy. But the operator does not have to be the only machine allowed to notice that Alice shot Bob first.

This is the line that makes the model economically interesting:

> The denser the world gets, the more witnesses the world has.

Server authority treats density as load.

Witness authority treats density as evidence.

## 9. Offering Compared

Most multiplayer vendors improve the conventional shape:

```text
game server binary
-> orchestration layer
-> hosted dashboard
-> backend services
-> web admin panel
```

That is useful. It is also not the same offering.

Dedicated-server platforms help place and scale authoritative servers. Backend platforms help with accounts, matchmaking, economies, player data, social graphs, and live operations. Engine netcode helps replicate objects, inputs, snapshots, and RPCs inside a chosen runtime. P2P services help peers find and reach each other through hostile network plumbing.

CultMesh is aiming at the layer underneath the usual purchasing category:

```text
daemon
-> CultCache/CultMesh state
-> Eve/CultUI surface contract
-> GUI, TUI, web, native, overlay, or agent view
```

The dashboard is not missing.

The dashboard is demoted from product center to one possible lowering.

Every daemon in the MultiVerse can publish its own typed UI surface. A frontend is just a CultMesh client in any supported runtime, including the web, consuming the daemon's published state and interface contract. The same daemon can expose a native GUI, a terminal UI, an Eve operator surface, a web view, or an agent-readable control plane without inventing a separate SaaS console for each one.

This is the sharper product claim:

> Competitors sell hosted dashboards for their backend.
>
> CultMesh lets every daemon carry its own interface and publish it into the MultiVerse.

That matters because observability, admin, gameplay tooling, moderation, simulation inspection, stream control, agent operation, and user-facing panels stop being separate vertical products. They become surfaces over typed state.

The current work, then, is not "build a dashboard."

The current work is packaging the proof:

- web, native, and TUI clients consuming the same daemon-published Eve/CultUI surface;
- recipes for exposing a CultMesh daemon's state safely;
- examples where an operator view, an agent view, and a player-facing view all lower from the same typed surface;
- deployment paths where the central service coordinates discovery and authority while the daemons carry their own bodies.

That is why CultMesh belongs beside Eve and CultUI, not merely beside netcode and hosting. The mesh owns state and authority. Eve and CultUI make that state visible and operable wherever a compatible runtime can stand.

## 10. Failure Modes

The architecture is not magic. Good. Magic has terrible incident response.

### 10.1 Colluding Witnesses

If a shard's witnesses are all malicious, quorum can lie. The answer is not prayer. The answer is policy: authority leases, identity cost, operator witnesses, reputation, challenge simulation, random audits, stake or consequence for high-value claims, and different rules for casual physics versus durable ownership.

### 10.2 Nondeterministic Simulation

If peers cannot reproduce the claim under the same rules, their observations cannot mean the same thing. Verse rules hashes, deterministic claim construction, fixed-step simulation, stable codecs, and test fixtures are not optional decoration. They are the ceremony that stops the mesh from becoming gossip.

### 10.3 Network Partitions

A partition can produce local candidate facts that cannot safely commit globally. CultMesh already separates candidates from committed facts. Partitioned candidates can remain local, provisional, or rejected according to Verse policy.

### 10.4 Hot Spot Capture

A dense region can be captured by a coordinated group. This is an old MMO problem wearing new clothes. The defense is layered: outside observers, operator-cluster witnesses, random challenge windows, delayed finality for valuable state, and rollbackable provisional facts.

### 10.5 Over-Broad Witness Sets

Too many witnesses recreate broadcast. Witness eligibility must be interest-managed: location, visibility, sensory range, subscription, role, and shard scope.

### 10.6 Under-Broad Witness Sets

Too few witnesses turn the system back into host authority. The machine needs minimum witness thresholds, fallback operator arbitration, and explicit "not enough evidence" states.

## 11. Field Manual

If you want a game to benefit from CultMesh, do not start by writing a bespoke networking layer and then asking the mesh to bless it afterward.

Start with state.

1. Put durable game state in CultCache documents.
2. Put high-frequency input state in scoped documents that can be predicted.
3. Define Verse rules and compatibility.
4. Define shards and epochs.
5. Define claim kinds for simulation facts.
6. Make claim hashes deterministic and boring.
7. Declare who can witness each claim.
8. Declare quorum policy.
9. Commit facts through CultMesh, not side channels.
10. Let replicas catch up through shard logs and snapshots.

The important design move is to stop treating networking as a pipe bolted to the game.

In CultMesh, networking is state law.

```text
document shape
-> transport contract
-> witness eligibility
-> consensus candidate
-> committed fact
-> replica catch-up
-> operator surface
```

This is why Aetheria could move toward co-op quickly. The machine already had a place for durable state, prediction, transport, observation, and canonicalization. The instruction could be short because the substrate had names.

## 12. What CultMesh Is Not

CultMesh is not a claim that every MMO should be anarchic peer-to-peer soup.

CultMesh is not a claim that dedicated servers are obsolete.

CultMesh is not a claim that consensus is free.

CultMesh is not a blockchain, though it respects the old distributed-systems wounds that blockchains commercialized into a theater district.

CultMesh is not CRDT-everything.

CultMesh is not rollback-everything.

CultMesh is not "the crowd decides truth."

CultMesh is a typed substrate for asking:

> Who could see this?
>
> Under which rules?
>
> With which authority?
>
> Can enough admissible witnesses reproduce the claim?
>
> Has the candidate earned commitment?

That is a smaller claim than "replace servers."

It is also a larger one.

It says the server was never the only possible witness. It was the only witness the architecture knew how to trust.

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>7</sup> Most failure modes here are old distributed-systems and MMO problems. CultMesh makes them typed and policy-visible rather than pretending sync erased them.</p>
    <p><sup>8</sup> The phrase "networking is state law" is the actual product thesis. Packets matter because they move admissible state.</p>
  </div>
  <span class="ritual-paper-page-number">4</span>
</footer>

</section>

<section class="ritual-paper-page">

## 13. Implementation Spine

The current CultMesh implementation is already shaped for this:

```text
CultCache
  typed documents, .cc persistence, SoA memory

CultNet
  schema-v0 messages, native RUDP, transport profiles

CultMeshNode
  cache + database + server + bridge

VerseCatalog
  rule-bearing consensus graphs

PeerCatalog
  current peer contact hints and roles

AuthorityLeaseCatalog
  scoped trust over peer cards

CultNetDatabase
  reactive document facade, writes, watches, prediction

ShardLog
  ordered committed history and replica catch-up

ObservationHub
  immutable simulation observations and candidates

SimulationFactCommitter
  candidate -> committed fact

GameSession
  gameplay-facing composition
```

That spine is why the concept belongs in CultLib instead of in a single game.

The same architecture that lets a co-op Aetheria session reconcile combat can also let a simulator Verse reconcile vehicle facts, a media Verse coordinate stream descriptors, an operator Verse track daemon health, or a modded community Verse declare different rules while staying transport-compatible.

CultMesh is the reusable part:

```text
typed state
+ reliable transport
+ discovery
+ peer roles
+ scoped authority
+ prediction
+ observation
+ quorum
+ committed logs
```

Games provide the rules.

CultMesh provides the nervous system that lets the rules travel.

Eve and CultUI provide the body language that lets the nervous system be touched.

```text
daemon state
-> typed surface
-> runtime lowering
-> human or agent operation
```

That is not cosmetic. A distributed system without inspection surfaces is a distributed superstition. CultMesh makes state and authority travel; Eve and CultUI make the traveling state legible where it arrives.

## 14. Conclusion

Server-authoritative networking made online games honest by putting truth in one place.

Witness-authoritative networking makes honesty distributable by asking the machines already present to testify under typed law.

That is the real contrast.

Not:

> server bad, peers good

But:

> one server should not have to be the only admissible observer of a world full of observers.

When the game is small, server authority is clean.

When the game is competitive, server authority is still essential.

When the world becomes enormous, dense, persistent, and fast, server authority should become policy spine, audit body, and final commit path, not the only pair of eyes in the room.

CultMesh turns every compatible runtime into a potential witness. CultCache gives the witness a typed memory. CultNet gives the witness a reliable pipe. Verses give the witness law. Authority leases give the witness scope. Observations give the witness a statement. Quorum candidates give the mesh an opinion. Shard logs give the world a canonical past.

That is witness-authoritative networking.

The world does not scale because the server got bigger.

The world scales because everyone present helps carry reality.

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>9</sup> "Everyone present helps carry reality" is not a trust policy. It is the poetic version of a typed, scoped, quorum-gated state pipeline. Please do not implement the poetic version.</p>
  </div>
  <span class="ritual-paper-page-number">5</span>
</footer>

</section>

<section class="ritual-paper-page ritual-paper-page-references">

## References

1. Valve Developer Community, ["Source Multiplayer Networking"](https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking).
2. Gabriel Gambetta, ["Fast-Paced Multiplayer: Client-Server Game Architecture"](https://www.gabrielgambetta.com/client-server-game-architecture.html).
3. Glenn Fiedler, ["What Every Programmer Needs To Know About Game Networking"](https://gafferongames.com/post/what_every_programmer_needs_to_know_about_game_networking/).
4. GGPO, ["Rollback Networking SDK for Peer-to-Peer Games"](https://www.ggpo.net/).
5. Jean-Sebastien Boulanger, Jorg Kienzle, and Clark Verbrugge, ["Comparing Interest Management Algorithms for Massively Multiplayer Games"](https://www.comp.nus.edu.sg/~cs4344/0607s1/netgames06/s01Conf96_a32.pdf), cited here for the interest-management premise that broadcast-all state is not viable at MMO scale.
6. Ashwin Bharambe, John Douceur, Jacob Lorch, Thomas Moscibroda, Jeffrey Pang, Srinivasan Seshan, and Xinyu Zhuang, ["Donnybrook: Enabling Large-Scale, High-Speed, Peer-to-Peer Games"](https://pages.cs.wisc.edu/~akella/CS838/F09/838-Papers/p389-bharambe.pdf), SIGCOMM 2008.
7. Fred B. Schneider, ["Implementing Fault-Tolerant Services Using the State Machine Approach: A Tutorial"](https://www.cs.cornell.edu/fbs/publications/SMSurvey.pdf), ACM Computing Surveys, 1990.
8. Miguel Castro and Barbara Liskov, ["Practical Byzantine Fault Tolerance"](https://www.usenix.org/conference/osdi-99/practical-byzantine-fault-tolerance), OSDI 1999.
9. Nuno Preguica, Carlos Baquero, and Marc Shapiro, ["Conflict-Free Replicated Data Types"](https://arxiv.org/abs/1805.06358), 2018 survey.
10. GameCult, [CultMesh Public API](https://github.com/GameCult/CultLib/blob/main/src/GameCult.Mesh/docs/public-api.md).
11. GameCult, [CultMesh Verse Model](https://github.com/GameCult/CultLib/blob/main/src/GameCult.Mesh/docs/verses.md).
12. GameCult, [CultMesh Research Notes](https://github.com/GameCult/CultLib/blob/main/src/GameCult.Mesh/docs/research.md).

<footer class="ritual-paper-page-footer">
  <div class="ritual-paper-footnotes">
    <p><sup>10</sup> Prior work is cited as lineage, not decoration. CultMesh is a synthesis machine with receipts.</p>
  </div>
  <span class="ritual-paper-page-number">6</span>
</footer>

</section>
