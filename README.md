# Satcom 

Introducing a collaborative layer to internet, enhances online discussions and redefines the browsing experience.

By integrating web content with online discussions, it enables collaborative knowledge sharing, revolutionizing how we engage with information online.

| Explore a new dimension of interaction |   |
|---|---|
| ![](https://raw.githubusercontent.com/jinglescode/web-content-conversation/main/assets/screenshot-arxiv.png) | Effortlessly share ideas directly within the context of the web content you're exploring. |
| ![](https://raw.githubusercontent.com/jinglescode/web-content-conversation/main/assets/screenshot-gemini.png) | Start a discussion on any web page, and invite others to join in. |
| ![](https://raw.githubusercontent.com/jinglescode/web-content-conversation/main/assets/screenshot-github.png) | Pose questions directly to any projects or articles. |

## Getting Started

Satcom is a Chrome extension that integrates web content and online discussions. It is currently on the Chrome Web Store.

[![](https://raw.githubusercontent.com/jinglescode/web-content-conversation/main/assets/chrome-web-store.png)](https://chromewebstore.google.com/detail/satcom/lhoejonhkpkgnhaamjcplefkkomlldgi)

## Developer

You can load the extension locally on your browser to try it out. These steps will load the extension locally on your browser.

1. Download latest release from [GitHub](https://github.com/jinglescode/web-content-conversation/raw/main/releases/web-content-conversation.zip)
2. Unzip the zip file
3. From Chrome browser, go to `chrome://extensions/`
4. Enable Developer mode
5. Click on `Load unpacked` and select the unzipped folder
6. Go to any website and you will see an icon on the bottom right corner of the browser

### Folder structure

Here is the folder structure of the source code. It may be helpful to understand the source code, and maybe outdated as the project is actively developed.

```
. 
├── assets # stores images and other assets
├── build # build:plasmo will output the build files here
├── releases # stores the latest release
├── src # source code
│   ├── background # extension background scripts, handle browser tasks
│   ├── constants # variables used throughout the extension
│   ├── contents # extension content scripts, injects into web pages
│   ├── lib # libraries and common functions
│   │   ├── chrome # chrome functions
│   │   ├── nostr # nostr react hooks, utils functions and ndk
│   │   ├── utils # common functions
│   │   ├── w3 # url shorten integration
│   │   ├── zustand # state management
│   ├── pages # satcom.app, not used in extension
│   ├── popup # extension popup, for settings
│   ├── types # define typescript types
│   ├── ui # all ui components
│   │   ├── common # ui components used in content and popup
│   │   ├── content # ui for content (injects into web pages)
│   │   ├── landing # ui for landing (satcom.app)
│   │   ├── popup # ui for popup (settings)
```
