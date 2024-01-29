import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex, Link, Text, Box } from "@radix-ui/themes";

import getDateTimeSince from "~lib/utils/getDateTimeSince";
import { useAppStore } from "~lib/zustand/app";
import { NotesView } from "~types/app/NotesView";
import UserName from "~ui/common/UserName";

import { Link1Icon } from "@radix-ui/react-icons";

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
        <Flex gap="1">
          <Box>
            <Link1Icon width="16" height="16" />
          </Box>
          <Link
            size="1"
            href={getPageUrlFromTag()}
            className="text-ellipsis overflow-hidden max-h-8"
          >
            {getPageUrlFromTag()}
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
