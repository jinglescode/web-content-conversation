import { Table } from "@radix-ui/themes";

import IconDisplay from "./IconDisplay";
import IconPlacement from "./IconPlacement";
import WindowSize from "./WindowSize";
import IconOffset from "./IconOffset";
import WindowTransparency from "./WindowTransparency";

export default function Appearance() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        <IconDisplay />
        <IconPlacement />
        <IconOffset />
        <WindowSize />
        <WindowTransparency />
      </Table.Body>
    </Table.Root>
  );
}
