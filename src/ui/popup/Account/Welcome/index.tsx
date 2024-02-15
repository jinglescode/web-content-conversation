import { Box, Flex, Heading, Tabs } from "@radix-ui/themes";
import { usePopupStore } from "~lib/zustand/popup";
import { WelcomeScreens } from "~types/app/PopupScreens";
import NsecSignIn from "./NsecSignIn";
import NsecCreate from "./NsecCreate";
import { LockClosedIcon, MagicWandIcon } from "@radix-ui/react-icons";
import NostrLogin from "./NostrLogin";

export default function Welcome() {
  const welcomeScreen = usePopupStore((state) => state.welcomeScreen);

  return (
    <Box p="4">
      <Flex direction="column" align="center" gap="4">
        <Heading size="7">Sign In</Heading>

        <Tabs.Root defaultValue="nostr-login" style={{ width: "100%" }}>
          <Tabs.List>
            <Tabs.Trigger value="nostr-login">
              <Flex gap="2">
                <MagicWandIcon height="24" width="24" />
                NOSTR Login
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="private-key">
              <Flex gap="2">
                <LockClosedIcon height="24" width="24" />
                Private Key
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="nostr-login">
              <NostrLogin />
            </Tabs.Content>

            <Tabs.Content value="private-key">
              {welcomeScreen === WelcomeScreens.SignInNsec ? (
                <NsecSignIn />
              ) : (
                <NsecCreate />
              )}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Box>
  );
}
