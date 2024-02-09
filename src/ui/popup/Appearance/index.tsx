import { Table } from "@radix-ui/themes";

import IconDisplay from "./IconDisplay";
import IconPlacement from "./IconPlacement";
import WindowSize from "./WindowSize";
import IconOffset from "./IconOffset";

export default function Appearance() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        <IconDisplay />
        <IconPlacement />
        <IconOffset />
        <WindowSize />
      </Table.Body>
    </Table.Root>
  );
}
