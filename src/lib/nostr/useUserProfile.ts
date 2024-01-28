import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "~constants/nostr";

import { useNostr } from "./NostrProvider";

export function useUserProfile(hexpubkey: string | undefined) {
  const { nostr } = useNostr();
  const { status, data, error, isFetching } = useQuery({
    enabled: hexpubkey !== undefined && !!nostr,
    queryKey: ["user", hexpubkey],
    queryFn: async () => {
      const user = nostr.ndk.getUser({
        hexpubkey: hexpubkey,
      });
      await user.fetchProfile();
      return user.profile;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: STALE_TIME,
  });

  return { status, data, error, isFetching };
}
