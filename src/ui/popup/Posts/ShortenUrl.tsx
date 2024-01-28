import { Switch } from "@radix-ui/themes"

import { usePopupStore } from "~lib/zustand/popup"

import Row from "../common/Row"

export default function ShortenUrl() {
  const settings = usePopupStore((state) => state.settings)
  const setSettings = usePopupStore((state) => state.setSettings)

  return (
    <Row label="Shorten URL">
      <Switch
        checked={settings.notes.shorten}
        onCheckedChange={(boolean) =>
          setSettings({
            ...settings,
            notes: {
              ...settings.notes,
              shorten: boolean
            }
          })
        }
      />
    </Row>
  )
}
