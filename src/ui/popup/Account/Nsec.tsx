import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { TextField, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useNostrStore } from "~lib/zustand/nostr";
import Row from "../common/Row";
import { UserIdentifierType } from "~types/nostr/UserIdentifier";

export default function Nsec() {
  const [show, setShow] = useState(false);
  const user = useNostrStore((state) => state.user);
  const [copied, setCopied] = useState<boolean>(false);

  function copy() {
    navigator.clipboard.writeText(user.nsec);
    setCopied(true);
  }

  return (
    <Row label="Private Key">
      {user.type == UserIdentifierType.PrivateKey && (
        <Flex gap="2">
          <TextField.Root>
            <TextField.Slot onClick={() => setShow(!show)}>
              {show ? (
                <EyeOpenIcon width="16" height="16" />
              ) : (
                <EyeClosedIcon width="16" height="16" />
              )}
            </TextField.Slot>
            <TextField.Input
              value={user.nsec}
              type={show ? "text" : "password"}
              style={{ marginRight: "4px" }}
              readOnly
            />
          </TextField.Root>

          <Button onClick={() => copy()}>{copied ? "Copied!" : "Copy"}</Button>
        </Flex>
      )}
      {user.type == UserIdentifierType.Nip46 && <Text>No private key</Text>}
    </Row>
  );
}
