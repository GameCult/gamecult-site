import { QuartzComponent, QuartzComponentConstructor } from "./types"

const themeLockScript = `
document.documentElement.setAttribute("saved-theme", "dark")
document.documentElement.style.colorScheme = "dark"
try {
  localStorage.setItem("theme", "dark")
} catch {}
`

export default (() => {
  const GameCultThemeLock: QuartzComponent = () => null
  GameCultThemeLock.beforeDOMLoaded = themeLockScript
  return GameCultThemeLock
}) satisfies QuartzComponentConstructor
