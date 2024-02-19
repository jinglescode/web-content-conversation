import { Box, Flex, Table } from "@radix-ui/themes";
import Npub from "./Npub";
import Nsec from "./Nsec";
import Signout from "./Signout";
import { useNostrStore } from "~lib/zustand/nostr";
import { NostrProvider } from "~lib/nostr/NostrProvider";
import Loading from "~ui/common/Loading";
import Welcome from "./Welcome";
import DisplayName from "./DisplayName";
import ProfileImage from "./ProfileImage";

export default function Account() {
  const user = useNostrStore((state) => state.user);

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
              <DisplayName />
              <ProfileImage />
              <Npub />
              <Nsec />
              {/* <Relay /> */} {/* todo: future */}
              <Signout />
            </Table.Body>
          </Table.Root>
        ) : (
          <Welcome />
        )}
      </NostrProvider>
    </>
  );
}
