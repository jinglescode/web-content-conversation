import { PersonIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNostr } from "~lib/nostr/NostrProvider";
import { usePopupStore } from "~lib/zustand/popup";
import { WelcomeScreens } from "~types/app/PopupScreens";

export default function NsecCreate() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const { createNostrUser } = useNostr();
  const setWelcomeScreen = usePopupStore((state) => state.setWelcomeScreen);

  async function createUser() {
    setLoading(true);
    await createNostrUser(userName);
    setLoading(false);
  }

  return (
    <Box p="4">
      <Flex direction="column" align="center" gap="4">
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

        <Button
          variant="ghost"
          onClick={() => setWelcomeScreen(WelcomeScreens.SignInNsec)}
        >
          Log in with private key
        </Button>
      </Flex>
    </Box>
  );
}
