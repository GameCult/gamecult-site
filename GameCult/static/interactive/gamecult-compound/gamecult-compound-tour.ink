VAR visited_epiphany = false
VAR visited_bifrost = false
VAR visited_voidbot = false
VAR visited_cultlib = false
VAR visited_heimdall = false
VAR visited_proof = false
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
# dom: studio,projects
Each door is a website space. Pick the one that sounds like the itch.
+ [How do agents remember work? Meet Epiphany at the forge] -> epiphany
+ [How does public labor become a receipt? Visit Bifrost] -> bifrost
+ [Where did that lore or decision come from? Find VoidBot] -> voidbot
+ [How do records stay findable and typed? Ask Libby] -> cultlib
+ [Who is allowed to cross a boundary? Ask Heimdall] -> heimdall
+ [What proof exists, and what is still risky? Show me receipts] -> proof
+ [I just need the normal wiki] -> wiki

=== epiphany ===
{ not visited_epiphany:
    ~ visited_epiphany = true
    ~ visited_count = visited_count + 1
}
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: evidence@right
# dom: epiphany,proof
Epiphany is at the forge with a map pinned beside the workbench, comparing what an agent said it would do against the files it actually touched. Someone has written "do not improve wallpaper with hammer" on the safety rail. Sensible, humiliating, necessary.
-> epiphany_2

=== epiphany_2 ===
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: map@right
# dom: epiphany
My job is to stop AI helpers from forgetting the room they are standing in. I keep maps, evidence, and role lanes outside the chat fog so future work can argue with the past instead of accidentally reenacting it in a nicer hat.
-> hub_return

=== bifrost ===
{ not visited_bifrost:
    ~ visited_bifrost = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: ledger
# sprite: document@left
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
-> hub_return

=== voidbot ===
{ not visited_voidbot:
    ~ visited_voidbot = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: archive
# sprite: document@left
# dom: voidbot,projects
VoidBot is the archive room with a mouth: Discord memory, repo retrieval, lore lookup, and an escape hatch into heavier work when chat becomes a shoebox full of lightning.
-> voidbot_2

=== voidbot_2 ===
# speaker: Void
# avatar: void
# scene: archive
# sprite: point@left
# dom: voidbot
People ask it where a decision came from, which repo owns a problem, or what the lore already says. Repo Faces grow from that pressure: a project should be able to greet you, explain itself, and point at evidence without pretending the avatar is the source of truth.
-> hub_return

=== cultlib ===
{ not visited_cultlib:
    ~ visited_cultlib = true
    ~ visited_count = visited_count + 1
}
# speaker: Libby
# avatar: libby
# scene: library
# sprite: stamp@right
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
-> hub_return

=== heimdall ===
{ not visited_heimdall:
    ~ visited_heimdall = true
    ~ visited_count = visited_count + 1
}
# speaker: Heimdall
# avatar: heimdall
# scene: gate
# sprite: badge@right
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
-> hub_return

=== proof ===
{ not visited_proof:
    ~ visited_proof = true
    ~ visited_count = visited_count + 1
}
# speaker: Void
# avatar: void
# scene: receipts
# sprite: document@left
# dom: proof,roadmap
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
# dom: studio,projects
Want another door? {visited_count >= 3: The floor plan is coming into focus: your checked doors show what you have visited, and the remaining plaques still name the larger machine.}
+ [{visited_epiphany: Revisit Epiphany: agent memory | How do agents remember work? Meet Epiphany}] -> epiphany
+ [{visited_bifrost: Revisit Bifrost: work receipts | How does public labor become a receipt? Visit Bifrost}] -> bifrost
+ [{visited_voidbot: Revisit VoidBot: archive search | Where did that lore or decision come from? Find VoidBot}] -> voidbot
+ [{visited_cultlib: Revisit Libby: typed records | How do records stay findable and typed? Ask Libby}] -> cultlib
+ [{visited_heimdall: Revisit Heimdall: consent gate | Who is allowed to cross a boundary? Ask Heimdall}] -> heimdall
+ [{visited_proof: Revisit proof and roadmap | What proof exists, and what is still risky? Show me receipts}] -> proof
+ [Enough tour; show me the links] -> done

=== done ===
# speaker: Void
# avatar: void
# scene: compound
# sprite: document@left
# dom: docs,projects
Then take the plain doors. {visited_count == 0: You skipped the ceremony and went straight to the documents. Correct behavior. | You have seen {visited_count} project rooms; the links below are the same machinery without me standing in front of it.} If I make the documents harder to reach, I have failed the tour.
-> END
