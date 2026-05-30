# ERC Rover Panels

A standalone SvelteKit dashboard starter extracted from FTC Panels. It keeps the Panels-style grid, presets, top-bar navlets, notifications, and local widgets, but removes the FTC SDK, Kotlin/Java code, Gradle projects, plugin runtime, plugin docs, and robot websocket backend.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/lib/grid` contains the draggable/resizable dashboard layout.
- `src/lib/widgets` contains local Svelte widgets and navlets.
- `src/lib/widgets/registry.ts` is where widgets, navlets, and starter templates are registered.
- `src/lib/ui` contains small local UI primitives that replace the old package-provided components.

To add a widget, create a Svelte component in `src/lib/widgets`, import it in `src/lib/widgets/registry.ts`, and add it to the `components` list with `type: "widget"`. Navlets work the same way with `type: "navlet"`.
