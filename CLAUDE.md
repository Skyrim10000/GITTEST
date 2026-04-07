# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-file interactive phone UI mockup tool for Michael Lane Boldt's portfolio. Open `index.html` directly in a browser — no build step, no dependencies, no package manager.

## Architecture

Everything lives in `index.html` as inline `<style>`, HTML, and `<script>`. There are three logical sections:

**Left panel (controls)** — Sliders grouped by zone (safe zones, header, navigation, grain, data block) plus a drag-to-reorder checklist of data fields. All slider IDs are listed in `SLIDER_IDS`. Each slider has a paired `<span id="<id>-out">` that shows the live value.

**Phone preview (right)** — A 320×620px simulated phone with three rendering zones:
- `#namesvg` — header: SVG `<text>` element for the name, with an `feTurbulence`/`feDisplacementMap` grain filter (`#gn`)
- `#navsvg` — navigation: SVG-rendered nav rows (WORK / ABOUT / CV / CONTACT) with numbered labels, dash decorations, and grain filter (`#gnav`); rebuilt on every `renderAll()` call
- `#datacolumns` — data block: two-column key/value rows with dot-leader lines and grain filter (`#dgrain`)

**Data fields** — Defined in the `FIELDS` array. Each field has an `id`, `label`, and a `fn()` that returns the live value (date/time/geo/device info/static bio strings). `checked` (a `Set`) and `order` (an array) track which fields are visible and their sequence.

## Key functions

- `renderAll()` — reads all slider values, updates every visual element; called on every slider `input` event and on a 1-second interval
- `renderNav(...)` — rebuilds the nav SVG rows; called from `renderAll()`
- `buildList()` — rebuilds the drag-to-reorder sidebar checklist; called on page load and after drag-drop reorders
- `getLive()` — evaluates all `FIELDS[].fn()` and returns a `{id: value}` map
- `sendPrompt(msg)` — called by the export button; sends current slider values + field order as a message; this function is injected by the Claude Code harness (not defined in the file)

## Slider system

Every slider follows the same pattern: `<input type="range" id="<id>">` + `<span id="<id>-out">`. Values are read with `fv(id)` (parseFloat) or `iv(id)` (parseInt). The `out(id, val)` helper updates the display span. All slider IDs must also be listed in `SLIDER_IDS` for the export button to capture them.

## Images

`images/MODEL_PHOTO_01.png` — exists in the repo but is not currently referenced in `index.html`.
