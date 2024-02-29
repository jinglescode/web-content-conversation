import { Flex, Inset } from "@radix-ui/themes";
import { useEffect } from "react";
import { NostrProvider } from "~lib/nostr/NostrProvider";
import { useSidePanelStore } from "~lib/zustand/sidepanel";
import UI from "~ui/common/UI";
import parseUrl from "~lib/parse-url";
import { messageBackground } from "~lib/chrome";
import TopBar from "./TopBar";
import { SidePanelScreens } from "~types/sidepanel/SidePanelScreens";
import Menu from "./Menu";
import FeedTabContainer from "./Feed/FeedTabContainer";

export default function UiSidebar() {
  const currentScreen = useSidePanelStore((state) => state.currentScreen);
  const setCurrentTab = useSidePanelStore((state) => state.setCurrentTab);

  function handlePageUpdate(title, tabUrl) {
    const _url = parseUrl(tabUrl);

    const queries = Object.keys(_url.query).map((key) => {
      return `${key}=${_url.query[key]}`;
    });
    let pageUrl = `${_url.protocol}://${_url.host}${_url.pathname}`;
    if (queries.length > 0) {
      pageUrl = `${pageUrl}?${queries.join("&")}`;
    }

    setCurrentTab({
      url: pageUrl,
      title: title,
      domain: _url.host,
    });
  }

  useEffect(() => {
    async function load() {
      const tab = await messageBackground("tabs/query-active");
      handlePageUpdate(tab.title, tab.url);
    }
    load();
    try {
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.title) {
          if (tab.active && tab.url && tab.title) {
            handlePageUpdate(tab.title, tab.url);
          }
        }
      });
      chrome.tabs.onActivated.addListener(function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function (tab) {
          if (tab.active && tab.url && tab.title) {
            handlePageUpdate(tab.title, tab.url);
          }
        });
      });
    } catch (error) {}
  }, []);

  return (
    <UI>
      <NostrProvider>
        <div className="h-screen w-screen fixed bg-neutral-800">
          <Inset
            clip="padding-box"
            side="top"
            style={{ height: "73px" }}
            className="border-b border-neutral-400 bg-neutral-900 p-4"
          >
            <TopBar />
          </Inset>

          <Flex
            className="overflow-y-auto h-[calc(100vh-73px)]"
            direction="column"
          >
            {(currentScreen == SidePanelScreens.Feed ||
              currentScreen == SidePanelScreens.GlobalFeed) && (
              <FeedTabContainer />
            )}
            {currentScreen == SidePanelScreens.Menu && <Menu />}
          </Flex>
        </div>
      </NostrProvider>
    </UI>
  );
}
