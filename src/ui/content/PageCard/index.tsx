import { Card, Flex, Inset } from "@radix-ui/themes";

import { useAppStore } from "~lib/zustand/app";
import { AppScreens } from "~types/app/AppScreens";
import Toast from "~ui/common/Toast";
import NewNote from "~ui/content/Notes/NewNote";
import NotesList from "~ui/content/Notes/NotesList";

import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { useNotes } from "~lib/nostr/useNotes";
import { NotesView } from "~types/app/NotesView";

export default function PageCard() {
  const page = useAppStore((state) => state.page);
  const pageUrl = useAppStore((state) => state.pageUrl);
  const settings = useAppStore((state) => state.settings);
  const domain = useAppStore((state) => state.domain);
  const setPage = useAppStore((state) => state.setPage);
  const notesView = useAppStore((state) => state.notesView);
  const setNotesView = useAppStore((state) => state.setNotesView);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [query, setQuery] = useState<boolean>(false);

  const { data: notes } = useNotes({
    key: notesView == NotesView.Page ? pageUrl : domain,
    query,
  });

  useEffect(() => {
    if (pageUrl) {
      setPage(AppScreens.Feed);
      setNotesView(NotesView.Page);
      setQuery(true);
    }
  }, [pageUrl]);

  useEffect(() => {
    if (currentUrl != pageUrl && notes !== undefined && notes.length == 0) {
      setPage(AppScreens.NewNote);
      setCurrentUrl(pageUrl);
      setNotesView(NotesView.Global);
    }
  }, [notes]);

  return (
    <Card
      style={{
        margin: "4px",
        width: "400px",
        backgroundColor: `rgba(40, 40, 43, ${
          settings.appearance.windowTransparency ? "0.9" : "1"
        })`,
      }}
    >
      <Inset clip="padding-box" side="top" pb="current">
        <TopBar />
      </Inset>

      <Flex gap="4" direction="column">
        {page == AppScreens.Feed && <NotesList notes={notes} />}
        {page == AppScreens.NewNote && <NewNote />}
      </Flex>

      <Toast />
    </Card>
  );
}
