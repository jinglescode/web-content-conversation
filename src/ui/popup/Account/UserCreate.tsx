import { PersonIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

import { useNostr } from "~lib/nostr/NostrProvider";
import { usePopupStore } from "~lib/zustand/popup";
import { PopupScreens } from "~types/app/PopupScreens";

export default function UserCreate({
  setCreateScreen,
}: {
  setCreateScreen: (val: boolean) => void;
}) {
  const setPage = usePopupStore((state) => state.setPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const { createNostrUser } = useNostr();

  async function createUser() {
    setLoading(true);
    await createNostrUser(userName);
    setLoading(false);
  }

  return (
    <Box p="4">
      <Flex direction="column" align="center" gap="4">
        <Heading size="7">Create User</Heading>
        <Text align="center">What's your name / nickname?</Text>

        <Flex gap="1" style={{ width: "100%" }}>
          <TextField.Root style={{ width: "100%" }}>
            <TextField.Slot>
              <PersonIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="Enter your display name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
              style={{ marginRight: "4px" }}
            />
          </TextField.Root>
          <Button onClick={() => createUser()} disabled={loading}>
            {loading ? "..." : "Let's go"}
          </Button>
        </Flex>

        <Button variant="ghost" onClick={() => setCreateScreen(false)}>
          Log in with nsec instead
        </Button>
      </Flex>
    </Box>
  );
}
