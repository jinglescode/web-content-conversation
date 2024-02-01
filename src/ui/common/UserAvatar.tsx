import { Avatar } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";

import { useUserProfile } from "~lib/nostr/useUserProfile";

export default function UserAvatar({
  pubkey,
  size = "3",
}: {
  pubkey: string | undefined;
  size?: "3" | "9";
}) {
  const queryClient = useQueryClient();
  const { data: profile } = useUserProfile(pubkey);
  return (
    <div
      onClick={() => {
        queryClient.invalidateQueries({
          queryKey: ["user", pubkey],
        });
      }}
    >
      <Avatar
        size={size}
        src={
          profile !== undefined
            ? profile.image
              ? profile.image
              : undefined
            : chrome.runtime.getURL("assets/icon.svg")
        }
        radius="full"
        fallback={
          profile ? (profile.name ? profile.name.substring(0, 1) : "") : ""
        }
      />
    </div>
  );
}
