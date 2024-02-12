import { Switch } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";
import { HIGHLIGHT_COLOR } from "~constants/radix";

export default function WindowTransparency() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Window Transparency">
      <Switch
        checked={settings.appearance.windowTransparency}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            appearance: {
              ...settings.appearance,
              windowTransparency: boolean,
            },
          })
        }
        color={HIGHLIGHT_COLOR}
      />
    </Row>
  );
}
