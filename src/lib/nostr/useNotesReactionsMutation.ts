import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useNotesReactionsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      event,
      reaction,
    }: {
      event: NDKEvent;
      reaction: string;
    }) => {
      await event.react(reaction);
      return { event, reaction };
    },
    onSettled: async (props) => {
      queryClient.invalidateQueries({
        queryKey: ["reactions", props.event.id],
      });
    },
  });
}
