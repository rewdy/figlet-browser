# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Figlet Browser is a Vite + React 18 single-page app for previewing and filtering [figlet.js](https://github.com/patorjk/figlet.js) fonts. Live site: figlet-browser.rewdy.lol. Hosted on S3 + CloudFront, infra defined in `tf/main.tf`.

## Tooling

- Bun (1.3.x) for dependency management — use `bun install`, not npm/yarn. Lockfile is `bun.lockb`.
- Vite for dev server and build.
- BiomeJS for formatting + linting (replaces ESLint/Prettier). Config in `biome.json`.
- TypeScript with project references (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`).

## Common commands

- `bun run dev` — start Vite dev server
- `bun run build` — typecheck (`tsc -b`) then build to `dist/`
- `bun run preview` — preview production build
- `bun run lint` — biome check (lint + format check)
- `bun run lint:fix` — biome check with `--write`
- `bun run format` / `format:check` — biome format only

There is no test runner configured in this repo.

## Deployment

`scripts/publish` syncs `dist/` to S3 and invalidates CloudFront. Requires `S3_BUCKET` and `CLOUDFRONT_ID` env vars and AWS credentials. Build first (`bun run build`), then run `./scripts/publish`.

## Architecture

### Font data pipeline

The app does not load figlet fonts at runtime by name from the figlet npm package. Instead:

1. Font definition files live in `src/assets/figlets/*.js` (~280 fonts, one per file).
2. `scripts/build-list.ts` is a one-off script that imports each font, renders sample text, measures height, merges in tags from `scripts/tags.json`, and emits `src/hooks/fontList.json`.
3. At runtime, `src/hooks/useFontList.ts` imports `fontList.json` as the master font catalog (name + height + tags) and `src/hooks/useFigletText.ts` dynamically imports the matching `src/assets/figlets/<name>.js` and calls `figlet.parseFont` + `figlet.text`.

If you add or remove fonts in `src/assets/figlets/`, regenerate `fontList.json` by running the build-list script (e.g. `bun run scripts/build-list.ts`). Tags come from `scripts/tags.json` keyed by font name; fonts without tags log a warning.

### State and filtering

- `useFontList` is the single source of truth for the visible font set. It owns the filter state (tags, min/max height, name search) persisted in sessionStorage, and computes `todaysRandom` — a deterministic 25-font subset seeded by today's date via `helpers/seededRandom.ts`. The home view shows that 25 unless the user filters or toggles "show all".
- Fonts tagged `broken` are excluded globally via `EXCLUDE_TAGS` in `useFontList.ts`.
- Persistence keys are centralized in `src/constants.ts` under the `figlet-browser:` namespace. User text and the lolcat toggle live in localStorage; filters and the show-all toggle live in sessionStorage.

### UI structure

- `App.tsx` → `Layout` → `FigletList`. `FigletList` renders the controls and maps the filtered list to `FigletDisplay` components.
- `FigletDisplay` calls `useFigletText` to render each font and optionally pipes the output through `@rewdy/react-lolcat`.
- Theme handling is in `contexts/ThemeContext.ts` + `components/ThemeProvider.tsx` + `hooks/useTheme.ts`, with `use-prefers-color-scheme` as the default.
- Styling: PicoCSS as the base, plus per-component SCSS files compiled via `sass-embedded`.

### Notable hooks

- `useFigletText` — async-renders a single font for given text.
- `useBackgroundText` — large background figlet text used in the header.
- `useAsImage` — uses `html2canvas` to capture a rendered figlet as an image (download/share).
- `useCopyToClipboard`, `useScrollOffset`, `useModalState` — small utilities.
