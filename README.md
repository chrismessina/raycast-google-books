# Google Books Search for Raycast

Extension for Raycast to search [Google Books](https://books.google.com).

## Features

- **Search** Google Books by keywords with debounced queries and result caching
- **Detail Sidebar** — toggleable metadata panel in List view showing type, author, publisher, published date, pages, rating, language, maturity, price, eBook status, ISBN, categories, and links
- **Multiple Views** — switch between List, Grid, and Categorized Grid views (persisted across sessions)
- **Category Filter** — filter results by category in all views
- **View Book Description** — full-page markdown view with title, subtitle, authors, and description
- **View Book Cover** — full-page cover image with actions to download, copy image, or copy URL
- **Clipboard Actions** — copy book link, author, or ISBN to clipboard
- **Clear Search** — reset query, filter, and view mode in one action

## Keyboard Shortcuts

| Shortcut | Action                    |
| -------- | ------------------------- |
| `⌘ ⇧ ↩`  | Toggle Detail Sidebar     |
| `⌘ ⇧ L`  | View Book List            |
| `⌘ ⇧ G`  | Show Book Covers (Sorted) |
| `⌘ ⇧ F`  | Show Book Covers          |
| `⌘ ⇧ C`  | View / Copy Book Cover    |
| `⌘ ⇧ A`  | Copy Author               |
| `⌘ ⇧ I`  | Copy ISBN                 |
| `⌘ ⇧ X`  | Clear Search              |
| `⌘ C`    | Copy Link                 |

## Setup (Optional)

This extension works out of the box, but without an API key requests share a global quota and may be rate-limited. To avoid this, you can provide your own **free** Google Books API key.

### Getting a Google Books API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services → Library**, search for **Books API**, and click **Enable**
4. Go to **APIs & Services → Credentials** and click **Create Credentials**
5. Under **Credential Type**:
   - Set **Select an API** to **Books API**
   - Select **Public data**
   - Click **Next**
6. Copy the generated API key

### Adding the Key to Raycast

1. Open Raycast and search for **Google Books**
2. Press `⌘ ,` to open the extension preferences (or right-click → **Configure Extension**)
3. Paste your API key into the **Google Books API Key** field
