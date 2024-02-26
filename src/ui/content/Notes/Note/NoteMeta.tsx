import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex, Text, Box } from "@radix-ui/themes";
import getDateTimeSince from "~lib/utils/getDateTimeSince";
import { useAppStore } from "~lib/zustand/app";
import { NotesView } from "~types/app/NotesView";
import UserName from "~ui/common/UserName";
import { Link1Icon } from "@radix-ui/react-icons";
import Link from "~ui/common/Link";
import { NOSTR_REDIRECT_URL } from "~constants/nostr";

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
        <Text
          size="1"
          color="gray"
          className="break-normal"
          onClick={() => {
            window.open(`${NOSTR_REDIRECT_URL}${event.id}`, "_blank");
          }}
        >
          {getDateTimeSince(event.created_at)}
        </Text>
      </Flex>
      {notesView == NotesView.Global && getPageUrlFromTag() && (
        <Flex gap="1" align="center">
          <Box>
            <Link1Icon width="16" height="16" />
          </Box>
          <Link href={getPageUrlFromTag()}>
            <div
              className="text-ellipsis overflow-hidden break-all"
              style={{
                fontSize: "12px",
                maxHeight: "20px",
              }}
            >
              {getPageUrlFromTag()}
            </div>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
