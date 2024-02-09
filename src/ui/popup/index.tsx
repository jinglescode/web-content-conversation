import { Box, ScrollArea, Tabs } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { Storage } from "@plasmohq/storage";

import { POPUP_HEIGHT } from "~constants/popup";
import { useNostrStore } from "~lib/zustand/nostr";
import { usePopupStore } from "~lib/zustand/popup";
import { type Settings } from "~types/Settings";
import UI from "~ui/common/UI";

import Appearance from "./Appearance";
import Account from "./Account";
import Posts from "./Posts";
import { DEFAULT_SETTINGS } from "~constants/settings";
import { merge } from "lodash";
import About from "./About";

export default function UiPopup() {
  const user = useNostrStore((state) => state.user);

  return (
    <div className="popup_container">
      <UI>
        {user === undefined ? (
          <div style={{ height: POPUP_HEIGHT }}>
            <About />
          </div>
        ) : (
          <Loaded />
        )}
      </UI>
    </div>
  );
}

function Loaded() {
  const setSettings = usePopupStore((state) => state.setSettings);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      const storage = new Storage();
      let settings = (await storage.get("settings")) as Settings | undefined;
      if (settings === undefined) {
        settings = DEFAULT_SETTINGS;
      } else {
        settings = merge(DEFAULT_SETTINGS, settings);
      }
      setSettings(settings);
      setLoaded(true);
    }
    init();
  }, []);

  if (!loaded) return <></>;

  return (
    <Tabs.Root defaultValue="about">
      <Tabs.List>
        <Tabs.Trigger value="about">About</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
        <Tabs.Trigger value="posts">Posts</Tabs.Trigger>
      </Tabs.List>

      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={{ height: POPUP_HEIGHT }}
      >
        <Box>
          <Tabs.Content value="appearance">
            <Appearance />
          </Tabs.Content>
          <Tabs.Content value="account">
            <Account />
          </Tabs.Content>
          <Tabs.Content value="posts">
            <Posts />
          </Tabs.Content>
          <Tabs.Content value="about">
            <About />
          </Tabs.Content>
        </Box>
      </ScrollArea>
    </Tabs.Root>
  );
}
