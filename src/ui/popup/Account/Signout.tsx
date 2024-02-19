import { ExitIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Storage } from "@plasmohq/storage";
import { useNostrStore } from "~lib/zustand/nostr";
import Row from "../common/Row";

export default function Signout() {
  const setUser = useNostrStore((state) => state.setUser);

  async function signout() {
    const storage = new Storage();
    storage.clear();
    setUser(undefined);
    window.localStorage.clear();
  }

  return (
    <Row label="">
      <Flex direction="column" gap="2">
        <Button onClick={() => signout()}>
          <ExitIcon width="16" height="16" /> Log Out
        </Button>
        <Text size="1">
          Important: Copy and save your private key before logging out.
        </Text>
      </Flex>
    </Row>
  );
}
