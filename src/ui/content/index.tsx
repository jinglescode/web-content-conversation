import { useEffect, useState } from "react";
import { EXTENSION_KEY } from "~constants/chrome";

import { messageBackground } from "~lib/chrome";
import { useAppStore } from "~lib/zustand/app";
import UI from "~ui/common/UI";
import Drawer from "~ui/content/Drawer";
import PageCard from "~ui/content/PageCard";
import { merge } from "lodash";
import { DEFAULT_SETTINGS } from "~constants/settings";
import { NostrProvider } from "~lib/nostr/NostrProvider";
import { useNostrStore } from "~lib/zustand/nostr";
import parseUrl from "~lib/parse-url";

export default function UiContent() {
  const setPageTitle = useAppStore((state) => state.setPageTitle);
  const setPageUrl = useAppStore((state) => state.setPageUrl);
  const setDomain = useAppStore((state) => state.setDomain);
  const settings = useAppStore((state) => state.settings);
  const setSettings = useAppStore((state) => state.setSettings);
  const [loaded, setLoaded] = useState<boolean>(false);
  const user = useNostrStore((state) => state.user);

  function handlePageUpdate(title, tabUrl) {
    const _url = parseUrl(tabUrl);
    const pageUrl = `${_url.protocol}://${_url.host}${_url.pathname}`;

    setPageUrl(pageUrl);
    setPageTitle(title);
    setDomain(_url.host);
  }

  useEffect(() => {
    async function getOnloadTab() {
      //@ts-ignore
      const tab = await messageBackground("tabs/query-active");
      handlePageUpdate(tab.title, tab.url);
      //@ts-ignore
      let settings = await messageBackground("storage/get-settings");
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
              handlePageUpdate(request.params.title, request.params.url);
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
      <NostrProvider>
        <div
          className="shadow-sm"
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
      </NostrProvider>
    </UI>
  );
}

// to get window.nostr using web_accessible_resources.js

// const nostr = {
//   async getPublicKey() {
//     await ensureSigner();
//     return signer.remotePubkey;
//   },
//   async signEvent(event) {
//     await ensureSigner();
//     event.pubkey = signer.remotePubkey;
//     event.id = getEventHash(event);
//     event.sig = await signer.sign(event);
//     return event;
//   },
//   async getRelays() {
//     // FIXME implement!
//     return {};
//   },
//   nip04: {
//     async encrypt(pubkey, plaintext) {
//       await ensureSigner();
//       return signer.encrypt(pubkey, plaintext);
//     },
//     async decrypt(pubkey, ciphertext) {
//       await ensureSigner();
//       return signer.decrypt(pubkey, ciphertext);
//     },
//   },
// };

// function Inject() {
//   const handleFromWeb = async (event) => {
//     if (event.data.from) {
//       const data = event.data.data;
//       if (event.data.from == "web_accessible_resources.js") {
//         console.log(`process from ${event.data.from}`);
//         console.log(data);
//         window.nostr = data;
//       }
//     }
//   };
//   window.addEventListener("message", handleFromWeb);

//   function injectScript(file_path, tag) {
//     var node = document.getElementsByTagName(tag)[0];
//     var script = document.createElement("script");
//     script.setAttribute("type", "text/javascript");
//     script.setAttribute("src", file_path);
//     node.appendChild(script);
//   }
//   injectScript(
//     chrome.runtime.getURL("assets/web_accessible_resources.js"),
//     "body"
//   );
// }
