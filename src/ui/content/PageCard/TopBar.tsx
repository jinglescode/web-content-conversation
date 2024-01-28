import { Box, Flex, Text } from "@radix-ui/themes";

import { useAppStore } from "~lib/zustand/app";
import { useNostrStore } from "~lib/zustand/nostr";
import { NotesView } from "~types/app/NotesView";
import UserAvatar from "~ui/common/UserAvatar";

export default function TopBar() {
  const user = useNostrStore((state) => state.user);
  const pageTitle = useAppStore((state) => state.pageTitle);
  const notesView = useAppStore((state) => state.notesView);
  const domain = useAppStore((state) => state.domain);

  return (
    <Flex
      gap="2"
      justify="between"
      style={{
        backgroundColor: "rgba(40, 40, 43, 0.8)",
        padding: "16px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box>
        <Text as="div" size="2" weight="bold">
          {notesView == NotesView.Page ? pageTitle : `Global Feed - ${domain}`}
        </Text>
      </Box>
      <UserAvatar pubkey={user ? user.pubkey : undefined} />
    </Flex>
  );
}
