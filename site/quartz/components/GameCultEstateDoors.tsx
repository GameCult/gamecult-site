import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Without scripts all three doors stay visible. With scripts the page grows a
// tab row and shows one door at a time.
const estateDoorsScript = `
document.addEventListener("nav", () => {
  const root = document.querySelector("[data-estate-doors]")
  if (!root || root.dataset.ready) return
  root.dataset.ready = "1"
  const doors = Array.from(root.querySelectorAll(".estate-door"))
  const bar = document.createElement("div")
  bar.className = "estate-switch"
  bar.setAttribute("role", "tablist")
  const tabs = doors.map((door) => {
    const tab = document.createElement("button")
    tab.type = "button"
    tab.className = "estate-tab"
    tab.id = "tab-" + door.id
    tab.setAttribute("role", "tab")
    tab.setAttribute("aria-controls", door.id)
    tab.textContent = door.dataset.estate
    door.setAttribute("role", "tabpanel")
    door.setAttribute("aria-labelledby", tab.id)
    bar.appendChild(tab)
    return tab
  })
  const show = (i, focus) => {
    doors.forEach((d, j) => {
      d.hidden = j !== i
      tabs[j].setAttribute("aria-selected", String(j === i))
      tabs[j].tabIndex = j === i ? 0 : -1
    })
    if (focus) tabs[i].focus()
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => show(i, false))
    tab.addEventListener("keydown", (e) => {
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
      if (step) {
        e.preventDefault()
        show((i + step + tabs.length) % tabs.length, true)
      }
    })
  })
  root.insertBefore(bar, root.firstChild)
  const hashed = doors.findIndex((d) => "#" + d.id === location.hash)
  show(Math.max(hashed, 0), false)
})
`

export default (() => {
  const GameCultEstateDoors: QuartzComponent = () => null
  GameCultEstateDoors.afterDOMLoaded = estateDoorsScript
  return GameCultEstateDoors
}) satisfies QuartzComponentConstructor
