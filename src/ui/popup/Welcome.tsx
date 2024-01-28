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

import { useNostr } from "~lib/nostr/NostrProvider";
import { usePopupStore } from "~lib/zustand/popup";
import { PopupScreens } from "~types/app/PopupScreens";

export default function Welcome() {
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
        <Avatar
          size="9"
          src={chrome.runtime.getURL("assets/nostr-icon-white-on-purple.svg")}
          radius="full"
          fallback=""
        />
        <Heading size="7">
          [App Name]
        </Heading>
        <Text align="center">
          Empowering collaborative knowledge sharing by bringing content and
          conversation together.
        </Text>
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
            {loading ? "..." : "Let's go"}
          </Button>
        </Flex>

        <Button
          variant="ghost"
          onClick={() => setPage(PopupScreens.UserCreate)}
        >
          Dont have nsec, create one
        </Button>
      </Flex>
    </Box>
  );
}
