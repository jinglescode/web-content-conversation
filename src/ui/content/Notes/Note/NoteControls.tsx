import type { NDKEvent } from "@nostr-dev-kit/ndk";
import {
  CaretDownIcon,
  CaretUpIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { ACCENT_COLOR, HIGHLIGHT_COLOR } from "~constants/radix";
import { useNotesReactions } from "~lib/nostr/useNotesReactions";
import { useNotesReactionsMutation } from "~lib/nostr/useNotesReactionsMutation";
import { useAppStore } from "~lib/zustand/app";
import { useNostrStore } from "~lib/zustand/nostr";

import ReplyBox from "../ReplyBox";

export default function NoteControls({
  showControls,
  event,
  replies,
  showReplies,
  setShowReplies,
}: {
  showControls: boolean;
  event: NDKEvent;
  replies: NDKEvent[];
  showReplies: boolean;
  setShowReplies: (boolean) => void;
}) {
  const user = useNostrStore((state) => state.user);
  // const setToast = useAppStore((state) => state.setToast)
  const { data: reactions } = useNotesReactions({ eventId: event.id });
  const { mutate: mutateReaction, isSuccess: reactionMutateSuccess } =
    useNotesReactionsMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [showReplySection, setShowReplySection] = useState<boolean>(false);

  async function reactToNote(reaction: string) {
    if (user) {
      if (
        reactions &&
        reactions[reaction] &&
        reactions[reaction].users.includes(user.pubkey)
      ) {
        return;
      }
      setLoading(true);
      await mutateReaction({ event: event, reaction: reaction });
    }
  }

  useEffect(() => {
    if (reactionMutateSuccess) {
      setLoading(false);
      // setToast("You have reacted to this post")
    }
  }, [reactionMutateSuccess]);

  function checkIfUserHasReacted(reaction: string) {
    if (
      reactions[reaction] &&
      user &&
      reactions[reaction].users.includes(user.pubkey)
    ) {
      return true;
    }
    return false;
  }

  function getReactionCount(reaction: string) {
    if (reactions[reaction] && reactions[reaction].count) {
      return reactions[reaction].count;
    }
    return 0;
  }

  return (
    showControls && (
      <>
        <Flex gap="4">
          {reactions && (
            <>
              <Button
                variant="ghost"
                color={
                  checkIfUserHasReacted("+") ? HIGHLIGHT_COLOR : ACCENT_COLOR
                }
                onClick={() => reactToNote("+")}
                disabled={loading}
              >
                <ThickArrowUpIcon width="16" height="16" />
                {getReactionCount("+")}
              </Button>
              <Button
                variant="ghost"
                color={
                  checkIfUserHasReacted("-") ? HIGHLIGHT_COLOR : ACCENT_COLOR
                }
                onClick={() => reactToNote("-")}
                disabled={loading}
              >
                <ThickArrowDownIcon width="16" height="16" />
                {getReactionCount("-")}
              </Button>
            </>
          )}
          {replies && (
            <Button
              variant="ghost"
              onClick={() => {
                if (replies.length) setShowReplies(!showReplies);
              }}
              color={showReplies ? HIGHLIGHT_COLOR : ACCENT_COLOR}
            >
              {showReplies ? (
                <CaretUpIcon width="16" height="16" />
              ) : (
                <CaretDownIcon width="16" height="16" />
              )}
              {replies.length} replies
            </Button>
          )}
          {user && (
            <Button
              variant="ghost"
              onClick={() => setShowReplySection(!showReplySection)}
              color={showReplySection ? HIGHLIGHT_COLOR : ACCENT_COLOR}
            >
              Reply
            </Button>
          )}
        </Flex>
        {showReplySection && (
          <ReplyBox event={event} setShowReplySection={setShowReplySection} />
        )}
      </>
    )
  );
}
