import { Text } from "@radix-ui/themes";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { nip19 } from "nostr-tools";
import { useUserProfile } from "~lib/nostr/useUserProfile";
import Link from "./Link";

export default function UserName({
  pubkey,
  size = "2",
  isLink = true,
}: {
  pubkey: string | undefined;
  size?: "2" | "7";
  isLink?: boolean;
}) {
  let npub = nip19.npubEncode(pubkey);

  return isLink ? (
    <Link href={`${NOSTR_REDIRECT_URL}${npub}`}>
      <Name pubkey={pubkey} size={size} />
    </Link>
  ) : (
    <Name pubkey={pubkey} size={size} />
  );
}

function Name({
  pubkey,
  size = "2",
  isLink = true,
}: {
  pubkey: string | undefined;
  size?: "2" | "7";
  isLink?: boolean;
}) {
  const { data: profile } = useUserProfile(pubkey);
  return (
    <Text
      as="div"
      size={size}
      weight="bold"
      className="overflow-hidden text-ellipsis"
    >
      {profile !== undefined ? profile.name : ""}
    </Text>
  );
}
