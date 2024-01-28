import type { NDKFilter } from "@nostr-dev-kit/ndk"
import { useQuery } from "@tanstack/react-query"

import { STALE_TIME } from "~constants/nostr"

import { useNostr } from "./NostrProvider"

export function useNotesReactions({ eventId }: { eventId: string }) {
  const { nostr } = useNostr()
  const { status, data, error, isFetching } = useQuery({
    enabled: eventId !== undefined && !!nostr,
    queryKey: ["reactions", eventId],
    queryFn: async () => {
      let filter: NDKFilter = {
        kinds: [7],
        "#e": [eventId]
      }

      const events = await nostr.fetchEvents(filter)

      let reactions = {}
      events.forEach((e) => {
        const reaction = e.content
        if (!reactions[reaction]) {
          reactions[reaction] = { count: 0, users: [] }
        }
        reactions[reaction]["count"] += 1
        reactions[reaction]["users"].push(e.author.pubkey)
      })

      return reactions
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: STALE_TIME
  })

  return { status, data, error, isFetching }
}
