# GenarApps Brand Guidelines v1.0

> Last updated: 2026-10-06
> Status: Approved
> Code source of truth: `src/index.css` (tokens) and `src/components/` (Panel, Button, Tag, Bubble, Sticker, Mark, Wordmark)

## Quick reference

| Element | Value |
| --- | --- |
| Look | Retro comic panels: square corners, 3 px ink outlines, hard offset shadows, flat color, halftone dots as the only texture |
| Primary color | Mint `#9ED9B4` |
| Secondary color | Sky `#9CC8F0` |
| Display font | Bungee (uppercase only) |
| Body font | Archivo 400–800 |
| Utility font | DM Mono |
| Voice | Plain, exact, human, written in the first person ("I") |

Never use gradients, rounded corners, blurred shadows or glows.

## Logo

- **Mark:** a blocky G drawn on a 5 × 5 grid of 8-unit cells, on a 60-unit Mint tile with a 4-unit Ink outline and a hard shadow. A Sky badge sits in the top-right corner.
- **Wordmark:** "GENAR" in Bungee, followed by "APPS" in a Sky box with an Ink outline and a hard shadow.
- **Clear space:** one grid cell, which is the width of the G's stroke.
- **Minimum size:** 24 px. Below that, drop the badge (this is the favicon).
- **On Mint backgrounds:** use the one-color version, which has a Panel-colored tile and badge and an Ink G.
- **Don't:** round the corners, add gradients or glows, rotate the G, or change its color.

## Color

| Name | Light | Dark | Use |
| --- | --- | --- | --- |
| Mint | `#9ED9B4` | `#93D1AB` | Primary fill: logo tile, main buttons, caption boxes, app bands |
| Sky | `#9CC8F0` | `#93BFE6` | Secondary fill: badge, APPS box, second buttons |
| Fern | `#2F7A55` | `#8FD6AC` | Green text on paper: status messages |
| Harbor | `#2D5F9A` | `#9CC5F2` | Links and focus rings |
| Ink | `#1B2430` | `#E6ECE7` | Text, every outline. Shadows are Ink in light mode and `#000000` in dark mode |
| Graphite | `#56616E` | `#9AA6B2` | Secondary text |
| Newsprint | `#F2F4EE` | `#17202A` | Page background |
| Panel | `#FBFCF8` | `#202B37` | Card and panel surface |

Rules:

- Text on Mint or Sky is always Ink `#1B2430` in both themes, and secondary text on those fills is `#334052`. Components handle this with the `surface-fill` class.
- Mint leads and Sky supports. Each app picks one accent in `apps.json`.
- Approximate share of a screen: Newsprint 55%, Panel 20%, Ink 10%, Mint 10%, Sky 5%.

Contrast (WCAG 2.1):

| Pair | Ratio |
| --- | --- |
| Ink on Newsprint | 14.1:1 |
| Ink on Mint | 9.7:1 |
| Ink on Sky | 8.9:1 |
| Harbor on Newsprint | 5.9:1 |
| Fern on Newsprint | 4.7:1 |
| Graphite on Newsprint | 5.7:1 |
| `#334052` on Mint | 6.5:1 |
| `#334052` on Sky | 6.0:1 |

## Typography

| Role | Font | Size and line height | Use |
| --- | --- | --- | --- |
| Display 1 | Bungee | 48 / 1.0 | Page titles |
| Display 2 | Bungee | 30 / 1.05 | Section titles |
| Heading | Archivo 800 | 22 / 1.2 | Policy sections, card titles |
| Body | Archivo 400 | 16 / 1.55 | Running text, kept to 68 characters wide |
| Caption | DM Mono 500 | 11–12, uppercase, tracking 0.1–0.12em | Caption boxes, tags, dates, versions, emails |

- Bungee is never used for running text and never below 18 px.
- All three fonts are self-hosted through Fontsource, so the site makes no third-party font requests.

## Shape

| Element | Border | Hard shadow |
| --- | --- | --- |
| Chips and small icons | 2 px | 3 / 3 |
| Buttons | 3 px | 4 / 4, rising to 6 / 6 on hover |
| Panels and cards | 3 px | 6 / 6 |
| Cover elements | 4 px | 8 / 8 |

- Gutters between panels are 22 px, so shadows never touch.
- Buttons lift on hover and press flat into their shadow when clicked.
- Halftone texture is a 10 px dot grid. Use it on at most one or two panels per screen, and only behind art or short text.

## Components

- **Caption box:** a mono uppercase label pinned to the top-left corner of a panel.
- **Speech bubble:** square, with a straight tail. Use it for short notes from the developer.
- **Starburst sticker:** marks a new release. Use at most one per page.
- **Tags:** platform, version and status.
- **Copy field:** an email shown as selectable text with a Copy button. Mail links are a convenience and are never the only way to get the address.

## Voice

| Trait | Means | Write | Not |
| --- | --- | --- | --- |
| Plain | Say what the app does in one sentence | "Read, search and study the Bible, all offline." | "A next-generation scripture experience." |
| Exact | Name the data, the version and the date | "Frible saves your highlights on this device." | "We take your privacy seriously." |
| Human | One developer writing to the people who use the apps | "I reply within a few days." | "Our dedicated support team will assist you." |

Privacy policies use plain language, list every permission with its reason, and say clearly how to delete data. Don't joke in policies.
