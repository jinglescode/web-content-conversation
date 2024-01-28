import { Select } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";

export default function IconPlacement() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Icon Position">
      <Select.Root
        defaultValue="bottom"
        value={settings.appearance.iconPlacement}
        onValueChange={(value) =>
          setSettings({
            ...settings,
            appearance: {
              ...settings.appearance,
              iconPlacement: value,
            },
          })
        }
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="bottom">Bottom</Select.Item>
            <Select.Item value="top">Top</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Row>
  );
}
