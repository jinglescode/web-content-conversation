import { Button, TextField, Flex } from "@radix-ui/themes";

import { useNostrStore } from "~lib/zustand/nostr";

import Row from "../common/Row";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import { useEffect, useState } from "react";
import { useNostr } from "~lib/nostr/NostrProvider";
import { CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";

export default function DisplayName() {
  const queryClient = useQueryClient();

  const { nostr } = useNostr();
  const user = useNostrStore((state) => state.user);
  const { data: profile } = useUserProfile(user.pubkey);
  const [userInput, setUserInput] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile !== undefined && profile.name) {
      setUserInput(profile.name);
    }
  }, [profile]);

  async function updateName() {
    setLoading(true);
    await nostr.updateUserName(user.pubkey, userInput);

    queryClient.invalidateQueries({
      queryKey: ["user", user.pubkey],
    });

    setUpdated(true);
    setLoading(false);
  }

  return (
    <Row label="Update display name">
      <Flex gap="2">
        <TextField.Input
          placeholder="Display name"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ marginRight: "4px" }}
        />
        <Button
          onClick={() => updateName()}
          disabled={
            loading ||
            userInput.length == 0 ||
            (profile ? userInput == profile.name : false)
          }
        >
          {loading ? (
            "..."
          ) : updated ? (
            <CheckIcon width="18" height="18" />
          ) : (
            "Update"
          )}
        </Button>
      </Flex>
    </Row>
  );
}
