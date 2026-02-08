# Google Books Search for Raycast

<p align="center">
    <img src="./assets/google-books.png" width="150" height="150" />
</p>

Extension for Raycast to search [Google Books](https://books.google.com).

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
