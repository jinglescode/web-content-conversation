import { Switch } from "@radix-ui/themes";
import { usePopupStore } from "~lib/zustand/popup";
import Row from "../common/Row";
import { HIGHLIGHT_COLOR } from "~constants/radix";

export default function ShortenUrl() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Shorten Page URL - attached a shortened URL when posting new notes">
      <Switch
        checked={settings.notes.shorten}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            notes: {
              ...settings.notes,
              shorten: boolean,
            },
          })
        }
        color={HIGHLIGHT_COLOR}
      />
    </Row>
  );
}
