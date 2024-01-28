import { Select } from "@radix-ui/themes";

import { usePopupStore } from "~lib/zustand/popup";

import Row from "../common/Row";

export default function SortBy() {
  const settings = usePopupStore((state) => state.settings);
  const setSettings = usePopupStore((state) => state.setSettings);

  return (
    <Row label="Sort By">
      <Select.Root
        defaultValue="time"
        value={settings.notes.sortBy}
        onValueChange={(value) =>
          setSettings({
            ...settings,
            notes: {
              ...settings.notes,
              sortBy: value,
            },
          })
        }
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="time">Time</Select.Item>
            <Select.Item value="votes">Votes</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Row>
  );
}
