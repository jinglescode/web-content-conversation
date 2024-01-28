import { useEffect } from "react";
import { EXTENSION_KEY } from "~constants/chrome";

import { messageBackgroundRelay } from "~lib/chrome";
import { useAppStore } from "~lib/zustand/app";
import { DEFAULT_SETTINGS } from "~types/Settings";
import UI from "~ui/common/UI";
import Drawer from "~ui/content/Drawer";
import PageCard from "~ui/content/PageCard";
import { merge } from "lodash";

export default function UiContent() {
  const setPageTitle = useAppStore((state) => state.setPageTitle);
  const setPageUrl = useAppStore((state) => state.setPageUrl);
  const setDomain = useAppStore((state) => state.setDomain);
  const settings = useAppStore((state) => state.settings);
  const setSettings = useAppStore((state) => state.setSettings);

  function handlePageUpdate(title, url, domain) {
    setPageUrl(url);
    setPageTitle(title);
    setDomain(domain);
  }

  useEffect(() => {
    async function getOnloadTab() {
      const tab = await messageBackgroundRelay("tabs/query-active");
      handlePageUpdate(tab.title, tab.url, window.location.hostname);
      let settings = await messageBackgroundRelay("storage/get-settings");
      if (settings) {
        settings = merge(settings, DEFAULT_SETTINGS);
      } else {
        settings = DEFAULT_SETTINGS;
      }
      setSettings(settings);
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

  if (settings.appearance.iconDisplay === false) return <></>;

  return (
    <UI>
      <div
        style={
          settings.appearance.iconPlacement === "top"
            ? {
                position: "fixed",
                top: 0,
                right: 0,
              }
            : {
                position: "fixed",
                bottom: 0,
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
