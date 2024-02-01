import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Flex, ScrollArea, Text } from "@radix-ui/themes";

import { useAppStore } from "~lib/zustand/app";
import Loading from "~ui/common/Loading";

import Note from "./Note";
import { AppScreens } from "~types/app/AppScreens";
import { useNostrStore } from "~lib/zustand/nostr";
import type { NDKEvent } from "@nostr-dev-kit/ndk";

export default function NotesList({ notes }: { notes: NDKEvent[] }) {
  const settings = useAppStore((state) => state.settings);
  const setPage = useAppStore((state) => state.setPage);
  const user = useNostrStore((state) => state.user);

  function sortNotes(a, b) {
    // todo future features: sort by time and reactions counts
    return 1;
  }

  if (notes == undefined) return <Loading />;

  return (
    <ScrollArea
      type="hover"
      scrollbars="vertical"
      style={{
        maxHeight: settings.appearance.windowSize == "small" ? "40vh" : "80vh",
        minHeight: notes && notes.length ? "200px" : "0px",
        width: "100%",
      }}
    >
      <Flex direction="column" gap="4">
        {notes && (
          <>
            {notes.length > 0 ? (
              notes
                .sort((a, b) => sortNotes(a, b))
                .map((note, i) => {
                  return (
                    <Note
                      event={note}
                      showControls={true}
                      fetchReplies={true}
                      key={i}
                    />
                  );
                })
            ) : (
              <Flex direction="column" align="center" gap="4">
                <Text>No posts yet</Text>
                {user ? (
                  <Button onClick={() => setPage(AppScreens.NewNote)}>
                    <Pencil1Icon width="16" height="16" /> Write something?
                  </Button>
                ) : (
                  <Text size="2">
                    Sign in via the extension to post something
                  </Text>
                )}
              </Flex>
            )}
          </>
        )}
      </Flex>
    </ScrollArea>
  );
}
