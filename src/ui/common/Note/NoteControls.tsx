import type { NDKEvent } from "@nostr-dev-kit/ndk";
import {
  ChatBubbleIcon,
  Share2Icon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { ACCENT_COLOR, HIGHLIGHT_COLOR } from "~constants/radix";
import { useNotesReactions } from "~lib/nostr/useNotesReactions";
import { useNotesReactionsMutation } from "~lib/nostr/useNotesReactionsMutation";
import { useNostrStore } from "~lib/zustand/nostr";

import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import { useAppStore } from "~lib/zustand/app";
import ReplyBox from "./ReplyBox";

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
  const { data: reactions } = useNotesReactions({ eventId: event.id });
  const { mutate: mutateReaction, isSuccess: reactionMutateSuccess } =
    useNotesReactionsMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const setToast = useAppStore((state) => state.setToast);

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
      setToast("Reacted!");
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
      return parseInt(reactions[reaction].count);
    }
    return 0;
  }

  return (
    showControls && (
      <>
        <Flex gap="2">
          {reactions && (
            <>
              <Button
                variant="ghost"
                color={
                  checkIfUserHasReacted("+") ? HIGHLIGHT_COLOR : ACCENT_COLOR
                }
                onClick={() => reactToNote("+")}
                disabled={loading}
                className="h-5 w-auto min-w-8"
              >
                <ThickArrowUpIcon width="14" height="14" />
                {getReactionCount("+") > 0 && getReactionCount("+")}
              </Button>
              <Button
                variant="ghost"
                color={
                  checkIfUserHasReacted("-") ? HIGHLIGHT_COLOR : ACCENT_COLOR
                }
                onClick={() => reactToNote("-")}
                disabled={loading}
                className="h-5 w-auto min-w-8"
              >
                <ThickArrowDownIcon width="14" height="14" />
                {getReactionCount("-") > 0 && getReactionCount("-")}
              </Button>
            </>
          )}
          {replies && (
            <Button
              variant="ghost"
              onClick={() => {
                setShowReplies(!showReplies);
              }}
              color={showReplies ? HIGHLIGHT_COLOR : ACCENT_COLOR}
              className="h-5 w-auto min-w-8"
            >
              <ChatBubbleIcon width="14" height="14" />
              {replies.length > 0 && replies.length}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              window.open(`${NOSTR_REDIRECT_URL}${event.id}`, "_blank");
            }}
            className="h-5 w-auto min-w-8"
          >
            <Share2Icon width="14" height="14" />
          </Button>
        </Flex>
        {showReplies && user && <ReplyBox event={event} />}
      </>
    )
  );
}
