import { Select } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";

export default function WindowSize() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Window Size">
      <Select.Root
        defaultValue="large"
        value={settings.appearance.windowSize}
        onValueChange={(value) =>
          setSettings({
            ...settings,
            appearance: {
              ...settings.appearance,
              windowSize: value,
            },
          })
        }
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="large">Large</Select.Item>
            <Select.Item value="small">Small</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Row>
  );
}
