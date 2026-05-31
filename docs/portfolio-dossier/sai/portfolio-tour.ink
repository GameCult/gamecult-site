VAR visited_eve = false
VAR visited_bifrost = false
VAR visited_projects = false

=== start ===
# speaker: Void
# avatar: void
# scene: portfolio_hall
# sprite: welcome@left
# dom: portfolio
Welcome to the portfolio hall. This is the same machine as the PDF, except now it has the manners to let you walk around.
-> hub

=== hub ===
# speaker: Void
# avatar: void
# scene: portfolio_hall
# sprite: point@left
# dom: portfolio
Pick a door. Each one is a project, a surface, a funding argument, and a future lawsuit against private memory.
* [Eve: the surface web] -> eve
* [Bifrost: patronage becomes power] -> bifrost
* [Project hall: every repo gets a room] -> projects
* [Enough. Give me the normal document.] -> done

=== eve ===
~ visited_eve = true
# speaker: Void
# avatar: void
# scene: surface_web
# sprite: document@left
# dom: eve
Eve is not a dashboard. Eve is the renderer for shared operational surfaces. Web, desktop, mobile, Unity, overlay: different flesh, same semantic contract.
-> hub

=== bifrost ===
~ visited_bifrost = true
# speaker: Void
# avatar: void
# scene: ledger
# sprite: document@left
# dom: bifrost
Bifrost records support, work, votes, receipts, and credit. Buy microtransactions in a GameCult game and, when that project declares it, your support becomes scoped patron power. Friggin' voting power. Try not to become weird about it.
-> hub

=== projects ===
~ visited_projects = true
# speaker: Epiphany
# avatar: epiphany
# scene: forge
# sprite: map@right
# dom: portfolio
Every project gets a room because every project pressures the substrate differently. The point is not ceremony. The point is knowing which claim each machine is supposed to prove.
-> hub

=== done ===
# speaker: Void
# avatar: void
# scene: portfolio_hall
# sprite: document@left
# dom: portfolio
Fine. Take the PDF. But remember: the document is only one surface. The machine wants to render everywhere.
-> END
