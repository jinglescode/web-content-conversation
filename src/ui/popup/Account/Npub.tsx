import { Button, TextField, Flex } from "@radix-ui/themes";
import { useNostrStore } from "~lib/zustand/nostr";
import Row from "../common/Row";
import { useState } from "react";

export default function Npub() {
  const user = useNostrStore((state) => state.user);
  const [copied, setCopied] = useState<boolean>(false);

  function copy() {
    navigator.clipboard.writeText(user.npub);
    setCopied(true);
  }

  return (
    <Row label="Public Key">
      <Flex gap="2">
        <TextField.Input
          value={user.npub}
          readOnly
          style={{ marginRight: "4px" }}
        />
        <Button onClick={() => copy()}>{copied ? "Copied!" : "Copy"}</Button>
      </Flex>
    </Row>
  );
}
