import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex, Link, Text } from "@radix-ui/themes";

import getDateTimeSince from "~lib/utils/getDateTimeSince";
import { useAppStore } from "~lib/zustand/app";
import { NotesView } from "~types/app/NotesView";
import UserName from "~ui/common/UserName";

import NoteContent from "./NoteContent";

export default function NoteMeta({ event }: { event: NDKEvent }) {
  const notesView = useAppStore((state) => state.notesView);
  function getPageUrlFromTag() {
    const pageTag = event.tags.find((tag) => tag[2] == "page");
    return pageTag ? pageTag[1] : undefined;
  }
  return (
    <Flex direction="column" style={{ width: "100%" }} gap="1">
      <Flex align="center" gap="2">
        <UserName pubkey={event.pubkey} />
        <Text size="1" color="gray">
          {getDateTimeSince(event.created_at)}
        </Text>
      </Flex>
      {notesView == NotesView.Global && (
        <Link size="1" href={getPageUrlFromTag()}>
          {getPageUrlFromTag()}
        </Link>
      )}
    </Flex>
  );
}
