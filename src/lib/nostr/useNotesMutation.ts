import type { NDKEvent } from "@nostr-dev-kit/ndk"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useNostr } from "./NostrProvider"

export function useNotesMutation() {
  const queryClient = useQueryClient()
  const { nostr } = useNostr()

  return useMutation({
    mutationFn: async ({
      event,
      pageUrl
    }: {
      event: NDKEvent
      pageUrl: string
    }) => {
      await nostr.signAndPublishEvent(event)
      return { event, pageUrl }
    },
    onSettled: async (props) => {
      queryClient.invalidateQueries({
        queryKey: ["note", props.pageUrl]
      })
    }
  })
}
