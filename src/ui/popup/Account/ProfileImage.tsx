import { Button, TextField, Flex } from "@radix-ui/themes";

import { useNostrStore } from "~lib/zustand/nostr";

import Row from "../common/Row";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import { useEffect, useState } from "react";
import { useNostr } from "~lib/nostr/NostrProvider";
import { CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileImage() {
  const queryClient = useQueryClient();

  const { nostr } = useNostr();
  const user = useNostrStore((state) => state.user);
  const { data: profile } = useUserProfile(user.pubkey);
  const [userInput, setUserInput] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile !== undefined && profile.image) {
      setUserInput(profile.image);
    }
  }, [profile]);

  async function updateImage() {
    setLoading(true);
    await nostr.updateProfileImage(user.pubkey, userInput);

    queryClient.invalidateQueries({
      queryKey: ["user", user.pubkey],
    });

    setUpdated(true);
    setLoading(false);
  }

  return (
    <Row label="Update profile image">
      <Flex gap="2">
        <TextField.Input
          placeholder="Image URL"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ marginRight: "4px" }}
        />
        <Button
          onClick={() => updateImage()}
          disabled={
            loading ||
            userInput.length == 0 ||
            (profile ? userInput == profile.image : false)
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
