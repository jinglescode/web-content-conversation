import { ExitIcon } from "@radix-ui/react-icons"
import { Box, Button, Flex, Separator } from "@radix-ui/themes"

import { useNostrStore } from "~lib/zustand/nostr"
import UserAvatar from "~ui/common/UserAvatar"
import UserName from "~ui/common/UserName"

export default function UserProfile() {
  const user = useNostrStore((state) => state.user)

  return (
    <Box p="4">
      <Flex direction="column" align="center" gap="4">
        <Flex direction="column" align="center" gap="2">
          <UserAvatar pubkey={user ? user.pubkey : undefined} size="9" />
          <UserName pubkey={user ? user.pubkey : undefined} size="7" />
        </Flex>
      </Flex>
    </Box>
  )
}
