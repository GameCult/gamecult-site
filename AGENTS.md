# AGENTS.md

## Layout Debugging

- When a CSS/layout fix is not behaving as expected, inspect the live DOM before guessing again.
- Check `getBoundingClientRect()`, computed styles, box sizing, and actual grid/flex track sizes on the elements involved.
- Do not rely on screenshots or Sass intent alone when rendered layout disagrees.
- For overlapping columns/cards, verify whether the text column is escaping or whether a padded child is overflowing its own track.
