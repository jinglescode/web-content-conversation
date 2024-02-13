import { Avatar } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import Link from "./Link";
import { pubkeyToNpub } from "~lib/nostr/resolvers";

export default function UserAvatar({
  pubkey,
  size = "3",
}: {
  pubkey: string | undefined;
  size?: "3" | "9";
}) {
  const queryClient = useQueryClient();
  const { data: profile } = useUserProfile(pubkey);

  if (pubkey == undefined) return <></>;
  let npub = pubkeyToNpub(pubkey);
  if (npub == undefined) return <></>;

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
