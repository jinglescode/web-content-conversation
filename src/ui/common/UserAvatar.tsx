import { Avatar } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import Link from "./Link";
import { pubkeyToNpub } from "~lib/nostr/resolvers";

export default function UserAvatar({
  pubkey,
  size = "3",
  isLink = true,
}: {
  pubkey: string | undefined;
  size?: "3" | "9";
  isLink?: boolean;
}) {
  const queryClient = useQueryClient();

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
      {isLink ? (
        <Link href={`${NOSTR_REDIRECT_URL}${npub}`}>
          <UserImage pubkey={pubkey} size={size} />
        </Link>
      ) : (
        <UserImage pubkey={pubkey} size={size} />
      )}
    </div>
  );
}

function UserImage({ pubkey, size }: { pubkey: string; size?: "3" | "9" }) {
  const { data: profile } = useUserProfile(pubkey);

  return (
    <Avatar
      size={size}
      src={
        profile !== undefined
          ? profile.image
            ? profile.image
            : chrome.runtime.getURL("assets/icon.svg")
          : chrome.runtime.getURL("assets/icon.svg")
      }
      style={{ borderRadius: "initial" }}
      radius="full"
      fallback={
        profile ? (profile.name ? profile.name.substring(0, 1) : "?") : "?"
      }
    />
  );
}
