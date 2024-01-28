import { Table } from "@radix-ui/themes";

import Npub from "./Npub";
import Nsec from "./Nsec";
import Signout from "./Signout";
import DisplayName from "./DisplayName";

export default function Account() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        {/* <DisplayName /> */} {/* todo: removed until we can fetch */}
        <Npub />
        <Nsec />
        {/* <Relay /> */} {/* todo: future */}
        <Signout />
      </Table.Body>
    </Table.Root>
  );
}
