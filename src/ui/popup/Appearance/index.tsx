import { Table } from "@radix-ui/themes";

import IconDisplay from "./IconDisplay";
import IconPlacement from "./IconPlacement";
import WindowSize from "./WindowSize";

export default function Appearance() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        <IconDisplay />
        <IconPlacement />
        <WindowSize />
      </Table.Body>
    </Table.Root>
  );
}
