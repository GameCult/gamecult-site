import test from "node:test"
import assert from "node:assert/strict"
import { groupByWeek, herald, pullEntry, releaseEntry, renderAtom, renderPage, weekStart } from "./ledger.mjs"

const pr = (repo, date, n = 1) => pullEntry(repo, { title: `t${n}`, merged_at: date, html_url: `https://x/${repo}/pulls/${n}` })

test("weeks start on Monday UTC, Sunday night belongs to the week ending", () => {
  assert.equal(weekStart("2026-11-02T00:00:00Z"), "2026-11-02")
  assert.equal(weekStart("2026-11-08T23:59:59Z"), "2026-11-02")
  assert.equal(weekStart("2026-11-09T00:00:01Z"), "2026-11-09")
})

test("groups newest week first, entries newest first within a week", () => {
  const weeks = groupByWeek([pr("a", "2026-10-27T10:00:00Z", 1), pr("a", "2026-11-03T10:00:00Z", 2), pr("b", "2026-11-05T10:00:00Z", 3)])
  assert.deepEqual(weeks.map((w) => w.start), ["2026-11-02", "2026-10-26"])
  assert.deepEqual(weeks[0].entries.map((e) => e.url), ["https://x/b/pulls/3", "https://x/a/pulls/2"])
})

test("a week with nothing merged between two busy ones shows as an empty week", () => {
  const weeks = groupByWeek([pr("a", "2026-10-13T10:00:00Z"), pr("a", "2026-10-30T10:00:00Z", 2)])
  assert.deepEqual(weeks.map((w) => [w.start, w.entries.length]), [["2026-10-26", 1], ["2026-10-19", 0], ["2026-10-12", 1]])
  assert.match(weeks[1].herald, /Nothing merged/)
})

test("no entries, no weeks", () => assert.deepEqual(groupByWeek([]), []))

test("heralds exist only when a computed fact backs them", () => {
  const plain = { entries: [pr("a", "2026-11-03T00:00:00Z"), pr("b", "2026-11-04T00:00:00Z", 2)] }
  assert.equal(herald(plain, 50), null)
  const many = { entries: ["a", "b", "c", "d", "e"].map((r, i) => pr(r, "2026-11-03T00:00:00Z", i)) }
  assert.match(herald(many, 50), /5 repos/)
  const one = { entries: Array.from({ length: 6 }, (_, i) => pr("a", "2026-11-03T00:00:00Z", i)) }
  assert.match(herald(one, 50), /Mostly a\./)
  const rel = { entries: [releaseEntry("a", { tag_name: "v1", published_at: "2026-11-03T00:00:00Z", html_url: "https://x/r" }), pr("b", "2026-11-03T00:00:00Z")] }
  assert.equal(herald(rel, 50), "A release went out.")
})

test("busiest-week claim needs the week to be the maximum", () => {
  const ten = { entries: Array.from({ length: 10 }, (_, i) => pr(["a", "b"][i % 2], "2026-11-03T00:00:00Z", i)) }
  assert.match(herald(ten, 10), /busiest/)
  assert.doesNotMatch(herald(ten, 11) ?? "", /busiest/)
})

test("page and feed carry a receipt link for every entry; markdown in titles is inert", () => {
  const entries = [pullEntry("a", { title: "fix [x](y) <b> & *z*", merged_at: "2026-11-03T00:00:00Z", html_url: "https://x/a/pulls/1" })]
  const page = renderPage(groupByWeek(entries), "2026-11-07T00:00:00Z")
  assert.match(page, /\[receipt\]\(https:\/\/x\/a\/pulls\/1\)/)
  assert.doesNotMatch(page, /fix \[x\]/)
  const feed = renderAtom(entries, "2026-11-07T00:00:00Z")
  assert.match(feed, /<link href="https:\/\/x\/a\/pulls\/1"\/>/)
  assert.match(feed, /fix \[x\]\(y\) &lt;b&gt; &amp; \*z\*/)
})
