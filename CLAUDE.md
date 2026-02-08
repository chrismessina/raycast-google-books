# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Raycast extension for searching Google Books. Uses the Google Books Volumes API with an optional user-provided API key (stored in Raycast preferences). Without a key, requests use a shared global quota and may be rate-limited.

## Commands

```bash
npm run dev       # Start Raycast development server (hot-reload)
npm run build     # Build for production to dist/
npm run lint      # Run ESLint with @raycast/eslint-config
npm run fix-lint  # Auto-fix lint issues
```

There are no tests in this project. Linting uses the Raycast ESLint config (`@raycast/eslint-config`) via flat config in `eslint.config.js`.

## Architecture

Single-command extension (`"Search Books"` → `src/index.tsx`) with three view modes:

- **List** (default) — `List` with toggleable metadata sidebar, items grouped by category
- **Categorized Grid** — `Grid` with sections per category
- **Flat Grid** — `Grid` without sections

State is managed in `src/index.tsx` which owns search text, view mode, category filter, and detail panel toggle. Last search query and filter persist via `useLocalStorage`; view mode persists via `useCachedState`.

### Key modules

- **`src/hooks/useSearch.ts`** — Debounced search via `useFetch` against `googleapis.com/books/v1/volumes`. Results cached with `useCachedState`. Handles rate-limit errors with toast + link to get API key.
- **`src/utils/books.ts`** — Pure helpers for cover URL manipulation (zoom levels, HTTPS upgrade), markdown conversion, price formatting, ISBN extraction.
- **`src/actions/BookActions.tsx`** — Shared `ActionPanel` sections used by both List and Grid views. Includes open in browser, push to detail/cover views, copy actions, and view-switching actions.
- **`src/views/`** — `BookListItem` (metadata detail panel), `BookGrid` (two grid variants + `ViewMode` type), `BookDetail` (markdown description), `BookCover` (large cover with download/copy).
- **`src/types/google-books.dt.ts`** — TypeScript interfaces matching the Google Books API response shape.

### Data flow

`index.tsx` → `useSearch(query)` → Google Books API → items categorized by first category → filtered by dropdown → rendered as List or Grid items with shared `BookActionSections`.

## Raycast-Specific Notes

- Extension preferences are defined in `package.json` under `preferences` (currently just `apiKey`).
- The Raycast ESLint rule `@raycast/prefer-title-case` is enforced; disable per-line where needed (e.g., "Copy ISBN").
- Cover images from the API use `http://` — always convert to `https://` via the helpers in `utils/books.ts`.
- Grid views use 5 columns with 2/3 aspect ratio; a placeholder image (`assets/book-cover-placeholder.png`) is used when no cover is available.
