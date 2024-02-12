import { Box, Flex, Table } from "@radix-ui/themes";

import Npub from "./Npub";
import Nsec from "./Nsec";
import Signout from "./Signout";
import { useNostrStore } from "~lib/zustand/nostr";
import Welcome from "./Welcome";
import { useState } from "react";
import UserCreate from "./UserCreate";
import { NostrProvider } from "~lib/nostr/NostrProvider";
import Loading from "~ui/common/Loading";

export default function Account() {
  const user = useNostrStore((state) => state.user);
  const [createScreen, setCreateScreen] = useState<boolean>(false);
  
  return (
    <>
      <NostrProvider>
        {user === null ? (
          <Box p="9">
            <Flex align="center" justify="center">
              <Loading />
            </Flex>
          </Box>
        ) : user ? (
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
      </NostrProvider>
    </>
  );
}
