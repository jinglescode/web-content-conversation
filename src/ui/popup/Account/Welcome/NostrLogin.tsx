import { Box, Button, Flex } from "@radix-ui/themes";
import { useNostr } from "~lib/nostr/NostrProvider";

export default function NostrLogin() {
  const { signInNostrLogin } = useNostr();

  async function login() {
    await signInNostrLogin();
  }

  return (
    <Box p="4">
      <Flex justify="center">
        <Button variant="classic" onClick={() => login()}>
          Log in with Nostr Login
        </Button>
      </Flex>
    </Box>
  );
}
