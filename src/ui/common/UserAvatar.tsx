import { Avatar } from "@radix-ui/themes";

import { useUserProfile } from "~lib/nostr/useUserProfile";

export default function UserAvatar({
  pubkey,
  size = "3",
}: {
  pubkey: string | undefined;
  size?: "3" | "9";
}) {
  const { data: profile } = useUserProfile(pubkey);
  return (
    <Avatar
      size={size}
      src={
        profile !== undefined
          ? profile.image
            ? profile.image
            : undefined
          : chrome.runtime.getURL("assets/nostr-icon-white-on-purple.svg")
      }
      radius="full"
      fallback={
        profile ? (profile.name ? profile.name.substring(0, 1) : "") : ""
      }
    />
  );
}
