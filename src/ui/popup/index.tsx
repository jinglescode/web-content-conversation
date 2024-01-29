import { Box, ScrollArea, Tabs } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { Storage } from "@plasmohq/storage";

import { POPUP_HEIGHT } from "~constants/popup";
import { useNostrStore } from "~lib/zustand/nostr";
import { usePopupStore } from "~lib/zustand/popup";
import { PopupScreens } from "~types/app/PopupScreens";
import { type Settings } from "~types/Settings";
import Loading from "~ui/common/Loading";
import UI from "~ui/common/UI";

import Appearance from "./Appearance";
import Account from "./Account";
import Posts from "./Posts";
import UserCreate from "./UserCreate";
import Welcome from "./Welcome";
import { DEFAULT_SETTINGS } from "~constants/settings";
import { merge } from "lodash";

export default function UiPopup() {
  const user = useNostrStore((state) => state.user);

  return (
    <div className="popup_container">
      <UI>
        {user === undefined ? (
          <div style={{ height: POPUP_HEIGHT }}>
            <Loading />
          </div>
        ) : user ? (
          <IsLoggedIn />
        ) : (
          <NotLoggedIn />
        )}
      </UI>
    </div>
  );
}

function IsLoggedIn() {
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
    <Tabs.Root defaultValue="appearance">
      <Tabs.List>
        <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
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
        </Box>
      </ScrollArea>
    </Tabs.Root>
  );
}

function NotLoggedIn() {
  const page = usePopupStore((state) => state.page);
  const setPage = usePopupStore((state) => state.setPage);

  useEffect(() => {
    setPage(PopupScreens.Welcome);
  }, []);

  return (
    <>
      {page === PopupScreens.Welcome && <Welcome />}
      {page === PopupScreens.UserCreate && <UserCreate />}
    </>
  );
}
