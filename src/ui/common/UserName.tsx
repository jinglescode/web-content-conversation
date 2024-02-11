import { Text } from "@radix-ui/themes";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { nip19 } from "nostr-tools";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import Link from "./Link";

export default function UserName({
  pubkey,
  size = "2",
}: {
  pubkey: string | undefined;
  size?: "2" | "7";
}) {
  const { data: profile } = useUserProfile(pubkey);
  let npub = nip19.npubEncode(pubkey);

  return (
    <Link href={`${NOSTR_REDIRECT_URL}${npub}`}>
      <Text
        as="div"
        size={size}
        weight="bold"
        className="h-5 overflow-hidden text-ellipsis"
      >
        {profile !== undefined ? profile.name : ""}
      </Text>
    </Link>
  );
}
