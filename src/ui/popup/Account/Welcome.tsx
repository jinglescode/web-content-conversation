import { LockClosedIcon } from "@radix-ui/react-icons";
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
import { APP_DESC, APP_NAME } from "~constants/global";

import { useNostr } from "~lib/nostr/NostrProvider";
import { usePopupStore } from "~lib/zustand/popup";
import { PopupScreens } from "~types/app/PopupScreens";

export default function Welcome({
  setCreateScreen,
}: {
  setCreateScreen: (val: boolean) => void;
}) {
  const setPage = usePopupStore((state) => state.setPage);
  const { signInNsec } = useNostr();
  const [nsec, setNsec] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        <Heading size="7">Sign In</Heading>
        <Text align="center">Enter your nsec to get started.</Text>

        <Flex gap="1" style={{ width: "100%" }}>
          <TextField.Root style={{ width: "100%" }}>
            <TextField.Slot>
              <LockClosedIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="Enter your nsec"
              type="password"
              value={nsec}
              onChange={(e) => setNsec(e.target.value)}
            />
          </TextField.Root>
          <Button onClick={() => handleSignIn()} disabled={loading}>
            {loading ? "..." : "Connect"}
          </Button>
        </Flex>

        <Button variant="ghost" onClick={() => setCreateScreen(true)}>
          Dont have nsec, create one
        </Button>
      </Flex>
    </Box>
  );
}
