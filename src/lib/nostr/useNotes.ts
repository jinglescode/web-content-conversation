import type { NDKFilter } from "@nostr-dev-kit/ndk"
import { useQuery } from "@tanstack/react-query"

import { STALE_TIME } from "~constants/nostr"

import { useNostr } from "./NostrProvider"

export function useNotes({
  key,
  replyToEventId,
  query = false
}: {
  key: string
  replyToEventId?: string
  query: boolean
}) {
  const { nostr } = useNostr()
  const { status, data, error, isFetching } = useQuery({
    enabled: query == true && !!nostr,
    queryKey: replyToEventId
      ? ["note", key, "replies", replyToEventId]
      : ["note", key],
    queryFn: async () => {
      let filter: NDKFilter = {
        kinds: [1]
      }

      if (replyToEventId) {
        filter["#e"] = [replyToEventId]
      } else {
        filter["#r"] = [key]
      }

      const events = await nostr.fetchEvents(filter)
      return events
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: STALE_TIME
  })

  return { status, data, error, isFetching }
}
