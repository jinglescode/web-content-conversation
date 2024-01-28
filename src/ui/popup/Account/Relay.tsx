import { TextArea } from "@radix-ui/themes"

import { usePopupStore } from "~lib/zustand/popup"

import Row from "../common/Row"

export default function Relays() {
  const settings = usePopupStore((state) => state.settings)
  const setSettings = usePopupStore((state) => state.setSettings)

  return (
    <Row label="Relays">
      <TextArea
        placeholder="relay's url separate by comma"
        value={settings.nostr.relays}
      />
    </Row>
  )
}
