import {
  ActivityLogIcon,
  DoubleArrowRightIcon,
  GlobeIcon,
  PlusIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Avatar, Button, Flex } from "@radix-ui/themes";
import { useAppStore } from "~lib/zustand/app";
import { useNostrStore } from "~lib/zustand/nostr";
import { AppScreens } from "~types/app/AppScreens";
import { NotesView } from "~types/app/NotesView";
import icon from "../../../../assets/icon.svg";
import { messageBackground } from "~lib/chrome";

export default function Controls() {
  const isDrawerShowing = useAppStore((state) => state.isDrawerShowing);
  const setDrawerShowing = useAppStore((state) => state.setDrawerShowing);
  const page = useAppStore((state) => state.page);
  const setPage = useAppStore((state) => state.setPage);
  const user = useNostrStore((state) => state.user);
  const notesView = useAppStore((state) => state.notesView);
  const setNotesView = useAppStore((state) => state.setNotesView);

  async function openSidePanel() {
    //@ts-ignore
    await messageBackground("sidepanel/open-panel");
  }

  return (
    <Flex gap="2" direction="column" style={{ margin: "8px" }}>
      <Button
        variant={isDrawerShowing ? "classic" : "ghost"}
        // onClick={() => setDrawerShowing(!isDrawerShowing)}
        onClick={() => openSidePanel()}
      >
        {isDrawerShowing ? (
          <DoubleArrowRightIcon width="16" height="16" />
        ) : (
          <Avatar src={icon} fallback="" style={{ borderRadius: "initial" }} />
        )}
      </Button>

      {isDrawerShowing && (
        <>
          {page == AppScreens.Feed && (
            <>
              {notesView == NotesView.Page && (
                <Button onClick={() => setNotesView(NotesView.Global)}>
                  <ReaderIcon width="16" height="16" />
                </Button>
              )}
              {notesView == NotesView.Global && (
                <Button onClick={() => setNotesView(NotesView.Page)}>
                  <GlobeIcon width="16" height="16" />
                </Button>
              )}
            </>
          )}

          {user && page == AppScreens.Feed && (
            <Button onClick={() => setPage(AppScreens.NewNote)}>
              <PlusIcon width="16" height="16" />
            </Button>
          )}
          {page == AppScreens.NewNote && (
            <Button onClick={() => setPage(AppScreens.Feed)}>
              <ActivityLogIcon width="16" height="16" />
            </Button>
          )}
        </>
      )}
    </Flex>
  );
}
