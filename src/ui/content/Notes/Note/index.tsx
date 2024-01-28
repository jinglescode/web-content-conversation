import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { useNotes } from "~lib/nostr/useNotes";
import { useAppStore } from "~lib/zustand/app";
import UserAvatar from "~ui/common/UserAvatar";

import NoteControls from "./NoteControls";
import NoteMeta from "./NoteMeta";
import Replies from "./Replies";
import NoteContent from "./NoteContent";

export default function Note({
  event,
  showControls = false,
  fetchReplies = false,
}: {
  event: NDKEvent;
  showControls?: boolean;
  fetchReplies?: boolean;
}) {
  const pageUrl = useAppStore((state) => state.pageUrl);
  const [query, setQuery] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  // replies
  const { data: replies } = useNotes({
    key: pageUrl,
    replyToEventId: event.id,
    query: query,
  });

  useEffect(() => {
    if (event.id) {
      setQuery(true);
    }
  }, [replies]);

  if (!event) return null;

  return (
    <Flex gap="2" pr="4" style={{ minHeight: "48px" }}>
      <UserAvatar pubkey={event.pubkey} />

      <Flex direction="column" align="start" gap="2" style={{ width: "100%" }}>
        <NoteMeta event={event} />

        <NoteContent event={event} />

        <NoteControls
          showControls={showControls}
          event={event}
          replies={replies}
          showReplies={showReplies}
          setShowReplies={setShowReplies}
        />

        {fetchReplies && (
          <Replies replies={replies} showReplies={showReplies} />
        )}
      </Flex>
    </Flex>
  );
}
