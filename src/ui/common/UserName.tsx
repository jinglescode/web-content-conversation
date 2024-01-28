import { Text } from "@radix-ui/themes";

import { useUserProfile } from "~lib/nostr/useUserProfile";

export default function UserName({
  pubkey,
  size = "2",
}: {
  pubkey: string | undefined;
  size?: "2" | "7";
}) {
  const { data: profile } = useUserProfile(pubkey);
  return (
    <Text as="div" size={size} weight="bold">
      {/* todo: future, onclick profile page */}
      {profile !== undefined ? profile.name : ""}
    </Text>
  );
}
