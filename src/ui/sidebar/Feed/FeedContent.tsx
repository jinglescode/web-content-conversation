import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, ScrollArea, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNotes } from "~lib/nostr/useNotes";
import { useNostrStore } from "~lib/zustand/nostr";
import { useSidePanelStore } from "~lib/zustand/sidepanel";
import { SidePanelScreens } from "~types/sidepanel/SidePanelScreens";
import Loading from "~ui/common/Loading";
import Note from "~ui/common/Note";
import NoteEditor from "~ui/common/Note/NoteEditor";

export default function FeedContent({ isGlobal }: { isGlobal: boolean }) {
  const user = useNostrStore((state) => state.user);

  const showNoteEditor = useSidePanelStore((state) => state.showNoteEditor);
  const setShowNoteEditor = useSidePanelStore(
    (state) => state.setShowNoteEditor
  );

  const [query, setQuery] = useState<undefined | string>(undefined);

  const currentTab = useSidePanelStore((state) => state.currentTab);
  const setCurrentScreen = useSidePanelStore((state) => state.setCurrentScreen);

  const queryClient = useQueryClient();

  const { data: notes, isFetching } = useNotes({
    key: query,
    query: query != undefined ? true : false,
  });

  function sortNotes(a, b) {
    // todo future features: sort by time and reactions counts
    return b.created_at - a.created_at;
  }

  useEffect(() => {
    if (currentTab) {
      if (isGlobal) {
        setQuery(currentTab.domain);
        setCurrentScreen(SidePanelScreens.GlobalFeed);
      } else {
        setQuery(currentTab.url);
        setCurrentScreen(SidePanelScreens.Feed);
      }
    } else {
      setQuery(undefined);
    }
  }, [isGlobal, currentTab]);

  if (isFetching)
    return (
      <div
        className="h-[calc(100vh-113px)]"
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["note", currentTab.url],
          });
        }}
      >
        <Loading />
      </div>
    );

  return (
    <Flex className="h-[calc(100vh-113px)] pt-2" direction="column">
      <ScrollArea type="hover" scrollbars="vertical" className="px-4 pt-2">
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
                    <></>
                    // <Button onClick={() => setShowNoteEditor(true)}>
                    //   <Pencil1Icon width="16" height="16" /> Write something?
                    // </Button>
                  ) : (
                    <Text size="2">
                      <a
                        onClick={() => setCurrentScreen(SidePanelScreens.Menu)}
                        className={`cursor-pointer`}
                      >
                        Sign in to post something
                      </a>
                    </Text>
                  )}
                </Flex>
              )}
            </>
          )}
        </Flex>
      </ScrollArea>

      {user && (
        <>
          {showNoteEditor ? (
            <div className="p-2">
              <NoteEditor />
            </div>
          ) : (
            <IconButton
              className="fixed bottom-2 right-4"
              highContrast={true}
              size="3"
              onClick={() => {
                setShowNoteEditor(true);
              }}
            >
              <Pencil1Icon width="24" height="24" />
            </IconButton>
          )}
        </>
      )}
    </Flex>
  );
}
