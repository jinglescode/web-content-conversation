import { TextField } from "@radix-ui/themes";

import Row from "../common/Row";
import { usePopupStore } from "~lib/zustand/popup";

export default function IconOffset() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Icon Offset From Edge">
      <TextField.Input
        type="number"
        value={settings.appearance.iconOffset}
        onChange={(e) =>
          setSettings({
            ...settings,
            appearance: {
              ...settings.appearance,
              iconOffset: parseInt(e.target.value),
            },
          })
        }
      />
    </Row>
  );
}
