import type { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "~constants/nostr";

import { useNostr } from "./NostrProvider";
import { wineSearch } from "~lib/nostr.wine";

export function useNotes({
  key,
  query = false,
}: {
  key: string;
  query: boolean;
}) {
  const { nostr } = useNostr();
  const { status, data, error, isFetching } = useQuery({
    enabled: query == true && !!nostr,
    queryKey: ["note", key],
    queryFn: async () => {
      // get by "r" tags
      let filter: NDKFilter = {
        kinds: [1],
        "#r": [key],
      };
      let events = await nostr.fetchEvents(filter);

      // get notes by wine
      let _events = await wineSearch(key);
      events = [...events, ..._events];

      // get unique
      events = [...new Map(events.map((item) => [item.id, item])).values()];

      // events.sort((a, b) => {
      //   return b.created_at - a.created_at;
      // });

      return events;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: STALE_TIME,
  });

  return { status, data, error, isFetching };
}
