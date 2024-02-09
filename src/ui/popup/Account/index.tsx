import { Table } from "@radix-ui/themes";

import Npub from "./Npub";
import Nsec from "./Nsec";
import Signout from "./Signout";
import { useNostrStore } from "~lib/zustand/nostr";
import Welcome from "./Welcome";
import { useState } from "react";
import UserCreate from "./UserCreate";

export default function Account() {
  const user = useNostrStore((state) => state.user);
  const [createScreen, setCreateScreen] = useState<boolean>(false);

  return (
    <>
      {user ? (
        <Table.Root>
          <Table.Body style={{ verticalAlign: "middle" }}>
            {/* <DisplayName /> */} {/* todo: removed until we can fetch */}
            <Npub />
            <Nsec />
            {/* <Relay /> */} {/* todo: future */}
            <Signout />
          </Table.Body>
        </Table.Root>
      ) : createScreen ? (
        <UserCreate setCreateScreen={setCreateScreen} />
      ) : (
        <Welcome setCreateScreen={setCreateScreen} />
      )}
    </>
  );
}
