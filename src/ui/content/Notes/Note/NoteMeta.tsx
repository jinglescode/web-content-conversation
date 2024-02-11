import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex, Text, Box } from "@radix-ui/themes";
import getDateTimeSince from "~lib/utils/getDateTimeSince";
import { useAppStore } from "~lib/zustand/app";
import { NotesView } from "~types/app/NotesView";
import UserName from "~ui/common/UserName";
import { Link1Icon } from "@radix-ui/react-icons";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";
import Link from "~ui/common/Link";

export default function NoteMeta({ event }: { event: NDKEvent }) {
  const notesView = useAppStore((state) => state.notesView);
  function getPageUrlFromTag() {
    const pageTag = event.tags.find((tag) => tag[2] == "page");
    return pageTag ? pageTag[1] : undefined;
  }

  return (
    <Flex direction="column" gap="1" className="w-full">
      <Flex align="center" gap="2">
        <UserName pubkey={event.pubkey} />
        <Link href={`${NOSTR_REDIRECT_URL}${event.id}`}>
          <Text size="1" color="gray" className="break-normal">
            {getDateTimeSince(event.created_at)}
          </Text>
        </Link>
      </Flex>
      {notesView == NotesView.Global && (
        <Flex gap="1">
          <Box>
            <Link1Icon width="16" height="16" />
          </Box>
          <Link href={getPageUrlFromTag()}>
            <span className="text-ellipsis overflow-hidden max-h-8 text-xs">
              {getPageUrlFromTag()}
            </span>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
