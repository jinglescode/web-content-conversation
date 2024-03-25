import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useEffect } from "react";
import "styles.css";
import { messageBackground, messageBackgroundRelay } from "~lib/chrome";
import UI from "~ui/common/UI";
import About from "~ui/popup/About";

// import UiPopup from "~ui/popup";

export default function IndexPopup() {
  function open() {
    //@ts-ignore
    messageBackground("sidepanel/open-panel", {});
    // chrome.sidePanel.setOptions({ path: "sidepanel.html", enabled: true });
  }
  return (
    <div className="popup_container">
      <UI>
        <About />
        <Button onClick={() => open()}>Open</Button>
      </UI>
    </div>
  );
}
