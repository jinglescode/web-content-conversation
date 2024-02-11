import { Switch } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";
import { HIGHLIGHT_COLOR } from "~constants/radix";

export default function CreditApp() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Credit satcom.app">
      <Switch
        checked={settings.notes.credit}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            notes: {
              ...settings.notes,
              credit: boolean,
            },
          })
        }
        color={HIGHLIGHT_COLOR}
      />
    </Row>
  );
}
