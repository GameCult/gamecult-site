# AGENTS.md

## Deployment Branch Discipline

- If this repo has deployment actions wired to `main`, do not create or stay on a feature branch for deployment-facing site work unless the user explicitly asks for branch-only work.
- Before telling the user a site change is live or ready to verify on the deployed site, confirm the change is on the branch the deployment action actually watches.
- Treat "works locally but the deployed page is empty/stale" as a possible branch/deployment ownership failure before continuing CSS or runtime debugging.

## Layout Debugging

- When a CSS/layout fix is not behaving as expected, inspect the live DOM before guessing again.
- Check `getBoundingClientRect()`, computed styles, box sizing, and actual grid/flex track sizes on the elements involved.
- Do not rely on screenshots or Sass intent alone when rendered layout disagrees.
- For overlapping columns/cards, verify whether the text column is escaping or whether a padded child is overflowing its own track.
