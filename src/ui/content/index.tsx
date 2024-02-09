import { useEffect, useState } from "react";
import { EXTENSION_KEY } from "~constants/chrome";

import { messageBackgroundRelay } from "~lib/chrome";
import { useAppStore } from "~lib/zustand/app";
import UI from "~ui/common/UI";
import Drawer from "~ui/content/Drawer";
import PageCard from "~ui/content/PageCard";
import { merge } from "lodash";
import { DEFAULT_SETTINGS } from "~constants/settings";

export default function UiContent() {
  const setPageTitle = useAppStore((state) => state.setPageTitle);
  const setPageUrl = useAppStore((state) => state.setPageUrl);
  const setDomain = useAppStore((state) => state.setDomain);
  const settings = useAppStore((state) => state.settings);
  const setSettings = useAppStore((state) => state.setSettings);
  const [loaded, setLoaded] = useState<boolean>(false);

  function handlePageUpdate(title, url, domain) {
    setPageUrl(url);
    setPageTitle(title);
    setDomain(domain);
  }

  useEffect(() => {
    async function getOnloadTab() {
      //@ts-ignore
      const tab = await messageBackgroundRelay("tabs/query-active");
      handlePageUpdate(tab.title, tab.url, window.location.hostname);
      //@ts-ignore
      let settings = await messageBackgroundRelay("storage/get-settings");
      if (settings === undefined) {
        settings = DEFAULT_SETTINGS;
      } else {
        settings = merge(DEFAULT_SETTINGS, settings);
      }
      setSettings(settings);
      setLoaded(true);
    }
    getOnloadTab();
  }, []);

  useEffect(() => {
    try {
      if (chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(
          function (request, sender, sendResponse) {
            if (request.ext === EXTENSION_KEY) {
              handlePageUpdate(
                request.params.title,
                request.params.url,
                window.location.hostname
              );
            }
          }
        );
      }
    } catch (error) {}
  }, []);

  if (!loaded) return <></>;

  if (settings.appearance.iconDisplay === false) return <></>;

  return (
    <UI>
      <div
        style={
          settings.appearance.iconPlacement === "top"
            ? {
                position: "fixed",
                top: settings.appearance.iconOffset,
                right: 0,
              }
            : {
                position: "fixed",
                bottom: settings.appearance.iconOffset,
                right: 0,
              }
        }
      >
        <Drawer>
          <PageCard />
        </Drawer>
      </div>
    </UI>
  );
}
