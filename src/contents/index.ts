import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";
import { relay } from "@plasmohq/messaging/relay";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

relay(
  {
    name: "tabs/query-active" as const,
  },
  async (req) => {
    return await sendToBackground(req);
  }
);

relay(
  {
    name: "storage/set-user" as const,
  },
  async (req) => {
    return await sendToBackground(req);
  }
);

relay(
  {
    name: "storage/get-user" as const,
  },
  async (req) => {
    return await sendToBackground(req);
  }
);

relay(
  {
    name: "storage/set-settings" as const,
  },
  async (req) => {
    return await sendToBackground(req);
  }
);

relay(
  {
    name: "storage/get-settings" as const,
  },
  async (req) => {
    return await sendToBackground(req);
  }
);
