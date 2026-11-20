# Cortex Midnight

Dark violet mobile theme concept with a custom anime wallpaper and an interactive browser preview.

- Theme JSON: `Cortex_Midnight.json` (Bunny/Kettu-style spec 2).
- Wallpaper: `cortex_anime_background.jpg`.
- Website: `index.html`. The preview is illustrative and does not connect to Discord.

Theme support, available color tokens, wallpaper opacity, and the appearance of the theme depend on the client and version. This theme has not been tested in a real Discord mobile client. The JSON adjusts colors and references a wallpaper; it does not install custom icon shapes, animations, or a plugin loader.

This is an independent fan project, not affiliated with or endorsed by Discord. Client modifications may violate Discord's terms and carry account/security risks.

The theme uses experimental near-black background tokens, selected accents, and a chat wallpaper. The preview is illustrative; actual wallpaper support and opacity depend on the client. A home-screen wallpaper is not implemented.

The studio displays a separate anime background in its messages/server lists, but the theme manifest contains only one background URL. Kettu's inspected background patch targets the chat Messages component; a separate inbox image is not implemented by this theme. The inspected Kettu code uses its `darker` or `light` reference for custom colors, so choosing Discord Midnight does not establish that the custom theme will preserve the native Midnight base. Behavior varies by mod/version and has not been tested on an iPhone.
