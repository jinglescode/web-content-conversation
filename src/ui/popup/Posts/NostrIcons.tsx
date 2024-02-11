import { Switch } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";
import { HIGHLIGHT_COLOR } from "~constants/radix";

export default function NostrIcons() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Mentions and Events as Icons">
      <Switch
        checked={settings.notes.nostrIcons}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            notes: {
              ...settings.notes,
              nostrIcons: boolean,
            },
          })
        }
        color={HIGHLIGHT_COLOR}
      />
    </Row>
  );
}
