import type { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "~constants/nostr";

import { useNostr } from "./NostrProvider";

export function useNotesReplies({
  key,
  replyToEventId,
  query = false,
}: {
  key: string;
  replyToEventId?: string;
  query: boolean;
}) {
  const { nostr } = useNostr();
  const { status, data, error, isFetching } = useQuery({
    enabled: query == true && !!nostr,
    queryKey: ["note", key, "replies", replyToEventId],
    queryFn: async () => {
      let filter: NDKFilter = {
        kinds: [1],
        ["#e"]: [replyToEventId],
      };

      return await nostr.fetchEvents(filter);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: STALE_TIME,
  });

  return { status, data, error, isFetching };
}
