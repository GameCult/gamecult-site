// Target invariant site-masthead:one-rule-token: no literal hairline colour in custom.scss;
// every grouping rule (1px single-side border, column-rule) reads --gamecult-rule.
// The VN speaker card is game UI, not grouping, and keeps its own edge colours.
import { readFileSync } from "node:fs"

const path = process.argv[2] ?? "site/quartz/styles/custom.scss"
const hairline = /^\s*(border-(top|bottom|left|right)|column-rule):\s*1px solid\s+(rgba?\(|#)/
let selector = ""
const bad = []
readFileSync(path, "utf8").split("\n").forEach((line, i) => {
  if (line.trimEnd().endsWith("{")) selector = line
  if (hairline.test(line) && !selector.includes("sai-speaker")) bad.push(`${path}:${i + 1}: ${line.trim()}`)
})
if (bad.length) {
  console.error(`literal hairlines (use var(--gamecult-rule)):\n${bad.join("\n")}`)
  process.exit(1)
}
console.log("one-rule-token: ok")
