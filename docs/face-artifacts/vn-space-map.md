# VN Space Map

The GameCult homepage VN is becoming the primary spatial navigation layer for the site, not a decorative prelude.

The authority split is:

- Quartz pages remain the canonical documents.
- The visual manifest owns the website-compound map: spaces, scenes, hosts, sprite assets, and DOM card bindings.
- Ink owns guided conversation, pacing, and temporary visited-state.
- Sai owns rendering: background, sprites, dialogue, choices, and DOM-card staging.

Current first-ring spaces:

| Space | Kind | Host | Scene | Canonical URL |
| --- | --- | --- | --- | --- |
| Front Gate | hub | Void | compound | `/` |
| Project Atlas | project atlas | Void | project_atlas | `/Projects/` |
| Docs Shelf | docs shelf | Void | docs_shelf | `/Docs/` |
| Blog Lane | blog lane | Void | blog_lane | `/Blog/` |
| EpiphanyAgent Forge | repo/tool | Epiphany | forge | `/Projects/EpiphanyAgent/` |
| Bifrost Ledger Hall | repo/tool | Void | ledger | `/Projects/Bifrost/` |
| VoidBot Archive Room | repo/tool | Void | archive | `/Projects/VoidBot/` |
| CultLib Library | repo/tool | Libby | library | `/Projects/CultLib/` |
| Heimdall Gatehouse | repo/tool | Heimdall | gate | `/Projects/Heimdall/` |
| Proof Walk | receipt surface | Void | receipts | `/Docs/` |
| Aetheria Setting Vault | setting | Nibu | nibu_ship | `/Aetheria/` |
| Zyphos / Eusocial Interbeing Vault | setting | Druzkai | zyphos_vault | `/Projects/Eusocial-Interbeing/` |
| Weksa Language Lab | tool | Weksa | weksa_lab | `/Projects/weksa/` |
| StreamPixels Overlay Studio | tool | Kiko | overlay_studio | `/Projects/StreamPixels/` |
| CultCacheTS Inspection Desk | repo/tool | Huginn | inspection_desk | `/Projects/CultCacheTS/` |

This is intentionally broader than the first Ink tour. The runtime can now stage sprites for every Face, and the manifest can name spaces the story has not visited yet. The background set now covers the first shared compound rooms directly: Project Atlas, Docs Shelf, Blog Lane, Nibu's Alakrita ship, Zyphos's fungal vault, Weksa's language lab, StreamPixels' overlay studio, and CultCacheTS's inspection desk. The next coherent expansion is to generate Ink branches from this space map so every project page, blog lane, repo doc shelf, setting vault, and tool bench can be reached by talking to the relevant host while still exposing the plain canonical links.
