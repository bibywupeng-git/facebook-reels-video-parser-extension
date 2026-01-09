# Facebook Reels Video Parser Extension

A lightweight browser extension designed to parse and work with Facebook Reels video pages.

This extension focuses on extracting structured information from Facebook Reels videos when the user actively interacts with the extension. It runs locally in the browser and does not require user accounts or background processing.

---

## ✨ Features

- Parses Facebook Reels video page URLs
- Works only on **Reels video pages**
- Adds an action button next to Reels videos
- Extracts video-related information from the current page
- Opens an external page for further processing options

---

## 🛠 How It Works

1. Open a Facebook Reels video page.
2. Click the button added by the extension next to the video  
   or use the extension icon in the browser toolbar.
3. The extension copies the current Reels video link.
4. A new tab opens and passes the link to an external parsing page.
5. The external page processes the video and provides available options.

---

## 🌐 External Processing

For additional processing options, the parsed Reels video link can be continued on:

- https://www.grabclip.com/facebook

The external page supports:
- Video parsing and preview
- Optional selection between video and audio formats
- No login or account required

---

## 🔐 Permissions & Privacy

This extension uses only the minimum permissions required to function.

- No `webRequest` permission required
- No access to user session data
- No personal data collection
- No background tracking or analytics

All parsing actions are triggered explicitly by the user.

---

## 📁 Project Structure

```text
facebook-reels-video-parser-extension/
├── icons/
├── _locales/
├── content-script.js
├── background.js
├── manifest.json
└── README.md
```
## 📦 Installation (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/facebook-reels-video-parser-extension.git
   ```
2. Open Chrome and navigate to chrome://extensions

3. Enable Developer mode in the top right corner

4. Click Load unpacked

5. Select the project directory

## ⚠️ Disclaimer

This project is intended for educational and personal use only.

The extension does not host, store, or distribute any media content.  
All media processing is handled externally and relies on publicly available information.

Users are responsible for ensuring that their usage complies with applicable laws and the terms of service of the platforms they access.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you have ideas for enhancements or find an issue, feel free to open an issue or submit a pull request.
