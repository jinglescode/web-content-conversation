import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        res.send(tabs[0]);
      }
      res.send(undefined);
    });
  } catch (e) {
    res.send(undefined);
  }
};

export default handler;
