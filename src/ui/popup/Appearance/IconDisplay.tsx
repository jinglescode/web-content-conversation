import { Switch } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";

export default function IconDisplay() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Show Icon">
      <Switch
        checked={settings.appearance.iconDisplay}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            appearance: {
              ...settings.appearance,
              iconDisplay: boolean,
            },
          })
        }
      />
    </Row>
  );
}
