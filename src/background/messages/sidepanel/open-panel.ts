import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  await chrome.sidePanel.open({ tabId: req.sender.tab.id });
  await chrome.sidePanel.setOptions({
    tabId: req.sender.tab.id,
    path: "sidepanel.html",
    enabled: true,
  });

  res.send(true);
};

export default handler;
