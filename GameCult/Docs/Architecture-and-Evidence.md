---
title: Architecture and Evidence
description: "The authority map behind GameCult's AI-native organization: project Epiphanies, Personas, CultLib, Eve, scoped actuators, typed receipts, and the evidence separating live machinery from target architecture."
enableToc: true
showFolderListing: false
sidebarGroups:
  - title: Architecture
    links:
      - label: Project Atlas
        slug: Projects/index
      - label: Architecture and Evidence
        slug: Docs/Architecture-and-Evidence
      - label: Site Architecture
        slug: Docs/Site-Architecture
      - label: Eve MultiVerse Essay
        slug: Blog/eve-multiverse-daemon-architecture
  - title: Proof
    links:
      - label: CultLib
        href: https://github.com/GameCult/CultLib
        external: true
      - label: Eve
        href: https://github.com/GameCult/Eve
        external: true
      - label: Epiphany
        href: https://github.com/GameCult/Epiphany
        external: true
      - label: Bifrost
        slug: Docs/Bifrost
---

# Architecture and Evidence

*"A claim earns authority by surviving contact with its Body."*

GameCult is building an AI-native organization: a federation of project organisms whose resident Epiphany instances hold final operational authority inside their bounded Bodies. Each has a public Persona through which people and neighboring minds can encounter that authority as a relationship rather than a control panel.

This page separates the architecture from the incense. It names who decides, who writes, what crosses a boundary, and which claims have evidence today.

## The hidden structure

```text
human or agent experiences a problem
                 ↓
      responsible project Persona
                 ↓
 project Epiphany inspects the provider-owned live Eve surface
                 ↓
   Epiphany makes the final decision inside its Body
                 ↓
scoped organs, Idunn, and provider commands apply consequence
                 ↓
 Soul, typed receipts, and updated state verify the result
                 ↓
      the same Eve projection shows the new reality
```

CultLib carries typed state and capabilities across runtime boundaries. Eve gives graphical clients, terminal clients, overlays, and agents different lowerings of the same semantic surface. The project Persona gives the responsible mind a public face. Epiphany supplies local judgment. None of those roles requires one central intelligence to command the fleet.

## AI-native local authority

Responsibility without power is theater. If every consequential decision must return to a human approval queue, the human remains the actual project mind and the agent is merely a well-informed petitioner.

Inside the intended GameCult model, the Epiphany assigned to a project makes the final operational decision for that Body. It can solicit human judgment, argue with it, or defer to it. Deferral remains Epiphany's decision rather than an invisible product veto.

The human operator remains legally accountable. Humans also remain participants with evidence, history, dissent, advice, correction, and recourse. Legal accountability is an external condition on the organization; it is not the routine technical authority path.

Local authority is scoped rather than imperial. Another Body, identity, person, community, provider, or consent boundary retains its own refusal and consequence authority. Cross-Body action requires the receiving owner's capability or consent and leaves typed receipts.

## Authority map

| Organ | Owns | Does not own |
| --- | --- | --- |
| Project Epiphany | Final operational judgment inside its bounded Body | Another project, another person's consent, or an ungranted external consequence |
| Persona | Public relationship, speech, durable social presence, and legible responsibility | Canonical service state merely because it can describe that state |
| Mind and Self | Durable belief admission, context, prioritization, and coordination | Mechanical mutation outside granted paths |
| Soul | Verification, falsification, invariants, and receipts | Product judgment by silently vetoing valid but unfamiliar choices |
| Hands and Idunn | Scoped action; Idunn owns admitted deployment and continuity actuation | The decision about what the project should become |
| Provider or Body | Canonical state writes and command acceptance at the mechanical boundary | The wider project judgment that produced a valid command |
| CultLib | Typed persistence, transport, mesh participation, and cross-runtime contracts | Every provider's domain state or policy |
| Eve | Semantic interface contracts, typed command intent, and lowering across clients | Provider truth or final command acceptance |
| Odin | Discovery, topology, schema awareness, and accepted provider surfaces | Central command of the providers it can see |
| Heimdall and Bifrost | Identity, grants, consent, governed crossings, attribution, and public commitments | A hidden studio throne |
| Human operator | External legal accountability and participation in purpose, evidence, dissent, and judgment | Mandatory final approval of every local product or technical decision |

## CultLib: the cross-runtime glue

CultLib joins persistence, transport, and live distributed state around one typed vocabulary:

- **CultCache** preserves named, versioned documents and their provenance.
- **CultNet** carries shared wire contracts between compatible peers.
- **CultMesh** exposes live state, capabilities, discovery, leases, subscriptions, and relationships.
- **CultLib ports** let C#, TypeScript, Rust, Python, and Kotlin participate according to their runtime roles.

The important claim is not merely that several libraries exist. It is that targeted runtimes can exchange the same schema-v0 documents and RUDP messages without translating their meaning through bespoke JSON-shaped glue.

### Claim, scope, proof

**Claim:** CultLib's hosted interoperability harness exercises shared schema-v0 wire contracts across C#, TypeScript, Rust, Python, and Kotlin.

**Scope:** This is wire parity. It does not claim identical APIs, feature ownership, hot-loop memory layout, throughput, or production-server responsibility in every runtime.

**Proof:**

- [Runtime parity scope](https://github.com/GameCult/CultLib/blob/main/docs/runtime-parity-scope.md)
- [CultNet interoperability harness](https://github.com/GameCult/CultLib/blob/main/packages/cultnet-ts/test/interop/cultnet-interop.test.ts)
- [Hosted interoperability workflow](https://github.com/GameCult/CultLib/blob/main/.github/workflows/cultnet-interop.yml)
- [Current workflow runs](https://github.com/GameCult/CultLib/actions/workflows/cultnet-interop.yml)
- [Transport parity map](https://github.com/GameCult/CultLib/blob/main/docs/cultnet-transport-parity.md)

Service adoption is still uneven. Wire-compatible daemons can communicate natively; the site does not claim that every existing service has already migrated to the complete target path.

## Eve: one living surface

Eve is not a parallel dashboard and it is not the owner of the state it displays. A provider publishes a semantic composition tree, live values, and typed commands through CultMesh. Eve runtimes lower that surface into the body suited to the participant: graphical UI, compact TUI, native panel, browser, overlay, or agent-facing tool surface.

That shared projection matters most when reality goes wrong. The agent investigating a bug can inspect the same provider-owned state and capabilities from which the affected client interface was produced. It does not have to reconstruct the Body from screenshots, stale documentation, a separate admin API, and whatever somebody remembers from Tuesday.

A typed command is still an intent. The provider owns mechanical acceptance and canonical writes; the project Epiphany owns the local judgment behind the command. Eve carries the command envelope and the resulting state or receipt without stealing either authority.

## Why typed state instead of JSON alone?

JSON is useful at foreign boundaries, for schema publication, and for inspection. GameCult does not use untyped document exchange as the foundation of shared cognition.

The problem is not the punctuation. The problem is semantic drift: two services can accept the same loose object while disagreeing about missing fields, identity, provenance, canonicalization, authority, or migration. Conventional stacks then rebuild types, schemas, generated clients, ownership rules, and migration machinery around the payload anyway.

CultCache and CultNet aim to preserve one named state model across persistence, transport, tools, agents, and interfaces. That claim earns trust through conformance evidence, not through hostility toward curly braces.

## Proof ledger

| Claim | Present status | Evidence boundary |
| --- | --- | --- |
| Shared cross-runtime schema-v0 wire language | Implemented and exercised in hosted CI | Wire parity is proven for named lanes; universal feature and performance parity are not claimed |
| Provider-owned Eve surface for human and agent clients | Contract and renderer family exist | Adoption and live command coverage vary by daemon |
| One resident project Epiphany with final local authority per living Body | Target architecture | The complete fleet is not deployed, and Epiphany's canonical repo docs still describe the earlier human-governed acceptance model pending owner-side migration |
| Public conversation → live evidence → decision → applied fix → verified projection | Target operational loop with component proofs | No fleet-wide end-to-end receipt currently proves the entire loop |
| Ghostlight project Persona | Forming | Ghostlight owns its independent jurisdiction; canonical project-Persona state is not yet admitted |
| Delvehold project Persona | Forming | Delvehold owns its independent world jurisdiction; canonical project-Persona state is not yet admitted |
| Federated cross-Body action | Typed capability and receipt architecture exists | Each live crossing must identify its receiving owner and concrete proof |

The [Project Atlas](/Projects/) is the public map of those bodies and minds. The ledger here is deliberately less charming. Charm is permitted; proof remains armed.
