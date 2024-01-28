import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { useNotes } from "~lib/nostr/useNotes";
import { useAppStore } from "~lib/zustand/app";
import { NotesView } from "~types/app/NotesView";
import Loading from "~ui/common/Loading";

import Note from "./Note";
import { AppScreens } from "~types/app/AppScreens";
import { useNotesReactions } from "~lib/nostr/useNotesReactions";

export default function NotesList({}: {}) {
  const pageUrl = useAppStore((state) => state.pageUrl);
  const domain = useAppStore((state) => state.domain);
  const notesView = useAppStore((state) => state.notesView);
  const [query, setQuery] = useState<boolean>(false);
  const settings = useAppStore((state) => state.settings);
  const setPage = useAppStore((state) => state.setPage);

  const { data: notes, isFetching } = useNotes({
    key: notesView == NotesView.Page ? pageUrl : domain,
    query,
  });

  useEffect(() => {
    if (pageUrl) {
      setQuery(true);
    }
  }, [pageUrl]);

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
                <Button onClick={() => setPage(AppScreens.NewNote)}>
                  <Pencil1Icon width="16" height="16" /> Write something?
                </Button>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </ScrollArea>
  );
}
