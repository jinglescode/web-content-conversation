import { Card, Flex, Inset } from "@radix-ui/themes";

import { useAppStore } from "~lib/zustand/app";
import { AppScreens } from "~types/app/AppScreens";
import Toast from "~ui/common/Toast";
import NewNote from "~ui/content/Notes/NewNote";
import NotesList from "~ui/content/Notes/NotesList";

import TopBar from "./TopBar";

export default function PageCard() {
  const page = useAppStore((state) => state.page);

  return (
    <Card
      style={{
        margin: "4px",
        width: "400px",
        backgroundColor: "rgba(40, 40, 43, 0.90)",
      }}
    >
      <Inset clip="padding-box" side="top" pb="current">
        <TopBar />
      </Inset>

      <Flex gap="4" direction="column">
        {page == AppScreens.Feed && <NotesList />}
        {page == AppScreens.NewNote && <NewNote />}
      </Flex>

      <Toast />
    </Card>
  );
}
