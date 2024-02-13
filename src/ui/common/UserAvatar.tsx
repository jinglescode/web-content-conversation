import { Avatar } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { nip19 } from "nostr-tools";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import Link from "./Link";

export default function UserAvatar({
  pubkey,
  size = "3",
}: {
  pubkey: string | undefined;
  size?: "3" | "9";
}) {
  const queryClient = useQueryClient();

  if (pubkey === undefined) return null;

  const { data: profile } = useUserProfile(pubkey);
  let npub = nip19.npubEncode(pubkey);

  return (
    <div
      onClick={() => {
        queryClient.invalidateQueries({
          queryKey: ["user", pubkey],
        });
      }}
    >
      <Link href={`${NOSTR_REDIRECT_URL}${npub}`}>
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
            profile ? (profile.name ? profile.name.substring(0, 1) : "?") : "?"
          }
        />
      </Link>
    </div>
  );
}
