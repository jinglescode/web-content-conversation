import { LockClosedIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNostr } from "~lib/nostr/NostrProvider";
import { usePopupStore } from "~lib/zustand/popup";
import { WelcomeScreens } from "~types/app/PopupScreens";

export default function NsecSignIn() {
  const { signInNsec } = useNostr();
  const [nsec, setNsec] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setWelcomeScreen = usePopupStore((state) => state.setWelcomeScreen);

  async function handleSignIn() {
    if (nsec) {
      setLoading(true);
      await signInNsec(nsec);
      setLoading(false);
    }
  }

  return (
    <Box p="4">
      <Flex direction="column" align="center" gap="4">
        <Text align="center">Enter your private key to get started.</Text>

        <Flex gap="1" style={{ width: "100%" }}>
          <TextField.Root style={{ width: "100%" }}>
            <TextField.Slot>
              <LockClosedIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="nsec1..."
              type="password"
              value={nsec}
              onChange={(e) => setNsec(e.target.value)}
              style={{ marginRight: "4px" }}
            />
          </TextField.Root>
          <Button onClick={() => handleSignIn()} disabled={loading}>
            {loading ? "..." : "Connect"}
          </Button>
        </Flex>

        <Button
          variant="ghost"
          onClick={() => setWelcomeScreen(WelcomeScreens.CreateNsec)}
        >
          Dont have private key, create one
        </Button>
      </Flex>
    </Box>
  );
}
