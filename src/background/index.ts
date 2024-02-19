import { EXTENSION_KEY } from "~constants/chrome";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.title) {
    chrome.tabs.sendMessage(tabId, {
      ext: EXTENSION_KEY,
      type: "urlChanged",
      params: { url: tab.url, title: tab.title },
    });
  }
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
