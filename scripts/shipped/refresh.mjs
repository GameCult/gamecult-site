// Refresh the Shipped snapshot from the Forge, then regenerate the page and feed.
//   node scripts/shipped/refresh.mjs              fetch, write data/shipped.json, render
//   node scripts/shipped/refresh.mjs --render-only  render from the committed snapshot
// Reads only public repos, anonymously. A repo that fails to fetch keeps its
// previous entries; if nothing can be fetched the snapshot is left untouched.
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { groupByWeek, pullEntry, releaseEntry, renderAtom, renderPage } from "./ledger.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..")
const snapshotPath = join(root, "data", "shipped.json")
const pagePath = join(root, "GameCult", "Shipped.md")
const feedPath = join(root, "site", "quartz", "static", "shipped.xml")
const API = "https://eureka.gamecult.org/forge/api/v1"

async function getAll(path) {
  const rows = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}${path}${path.includes("?") ? "&" : "?"}limit=50&page=${page}`)
    if (!res.ok) throw new Error(`${res.status} ${path}`)
    const batch = await res.json()
    rows.push(...batch)
    if (batch.length < 50) return rows
  }
}

async function repoEntries(name) {
  const pulls = await getAll(`/repos/GameCult/${name}/pulls?state=closed`)
  const releases = await getAll(`/repos/GameCult/${name}/releases`)
  return [
    ...pulls.filter((p) => p.merged && p.merged_at).map((p) => pullEntry(name, p)),
    ...releases.filter((r) => !r.draft && !r.prerelease && r.published_at).map((r) => releaseEntry(name, r)),
  ]
}

async function fetchSnapshot(previous) {
  const repos = (await getAll("/orgs/GameCult/repos")).filter((r) => !r.private && !r.empty)
  const entries = []
  let failed = 0
  for (const { name } of repos) {
    try {
      entries.push(...(await repoEntries(name)))
    } catch (err) {
      failed++
      console.error(`keeping previous entries for ${name}: ${err.message}`)
      entries.push(...previous.entries.filter((e) => e.repo === name))
    }
  }
  if (failed === repos.length) throw new Error("every repo failed")
  return { generated: new Date().toISOString(), entries }
}

const previous = existsSync(snapshotPath) ? JSON.parse(readFileSync(snapshotPath, "utf8")) : { generated: "", entries: [] }
let snapshot = previous
if (!process.argv.includes("--render-only")) {
  try {
    snapshot = await fetchSnapshot(previous)
    writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 1) + "\n")
  } catch (err) {
    console.error(`fetch failed, rendering from the committed snapshot: ${err.message}`)
    process.exitCode = 1
  }
}
if (snapshot.entries.length === 0) throw new Error("no snapshot to render")
writeFileSync(pagePath, renderPage(groupByWeek(snapshot.entries), snapshot.generated) + "\n")
writeFileSync(feedPath, renderAtom(snapshot.entries, snapshot.generated))
console.log(`${snapshot.entries.length} entries rendered`)
