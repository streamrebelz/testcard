# Project overview

This repository is a simple testcard generator. There are two main pages: a homepage where users can customize their testcard and see a preview, and a testcard page that renders the testcard based on URL parameters.

Create reusable components for the testcard renderer, so we can show a preview on the homepage and render the testcard on the testcard page.

# Testcard

Use contrasting colors and avoid using transparency.

If text is provided, center it both vertically and horizontally. Time should be centered vertically on the bottom half of the card.

## Testcard parameters

- `Aspect ratio`: 16:9 or 4:3
- `Text`: If provided, custom text to display on the card
- `Text color`: Hex color code for the text, default white
- `Time`: Boolean, Displays current time on card in hh:mm:ss format
- `Box`: Boolean, Displays a box around the text, default true

## Testcard patterns

Standardized patterns are available: SMPTE (SMPTE RP 219:2002).

## Testcard rendering

Render the testcard using HTML5 Canvas API.
