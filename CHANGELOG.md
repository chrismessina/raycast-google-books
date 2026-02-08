# Google Books Changelog

## [Detail Sidebar, Grid Views & Code Reorg] - {PR_MERGE_DATE}

- feat: toggleable detail sidebar in List view showing book metadata (type, author, publisher, date, pages, rating, language, price, eBook, ISBN, categories, links)
- feat: switchable views — List, Grid, and Categorized Grid — persisted across sessions
- feat: "View Book Description" action pushes a full-page markdown detail view
- feat: "View Book Cover" action with Download Cover (saves to ~/Downloads with Reveal in Finder), Copy Cover (image to clipboard), and Copy Cover URL
- feat: Copy Author and Copy ISBN clipboard actions
- feat: Clear Search action resets query, filter, and view mode
- feat: category filter dropdown in Grid views
- feat: empty view prompts when no search query is entered
- feat: sorted category dropdowns
- fix: correct singular/plural in section subtitles ("1 book" vs "2 books")
- refactor: reorganize code into `views/`, `actions/`, and `utils/` directories
- refactor: replace all emojis with Raycast Icon equivalents
- refactor: extract shared `BookActionSections` component for consistent actions across views
- deps: update dependencies to latest versions
- fix: rate limiting due to API changes

## [Modernize + Filter + Add CHANGELOG] - 2025-05-26

- modernize: use latest Raycast config
- feat: filter results by category
- feat: use Raycast's `useFetch` hook to benefit from some caching
- docs: add this CHANGELOG

## [Initial Version] - 2022-01-24
