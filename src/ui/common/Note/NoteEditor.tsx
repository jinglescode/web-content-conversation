import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useEffect, useState } from "react";

import { useNotesMutation } from "~lib/nostr/useNotesMutation";
import { getShortenUrl } from "~lib/w3/getShortenUrl";

import NoteTextarea from "./NoteTextarea";
import { useNostrStore } from "~lib/zustand/nostr";
import { APP_CREDIT } from "~constants/global";
import { useSidePanelStore } from "~lib/zustand/sidepanel";
import { Box, Button, Flex, Text } from "@radix-ui/themes";

export default function NoteEditor() {
  const settings = useSidePanelStore((state) => state.settings);
  const currentTab = useSidePanelStore((state) => state.currentTab);

  const setShowNoteEditor = useSidePanelStore(
    (state) => state.setShowNoteEditor
  );

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate, isSuccess } = useNotesMutation();
  const user = useNostrStore((state) => state.user);

  async function publishNote() {
    if (user && userInput && userInput.length > 0) {
      setLoading(true);

      let noteContent = userInput;

      // attached page URL
      let noteUrl = currentTab.url;
      if (settings.notes.shorten) {
        const shortenUrl = await getShortenUrl(currentTab.url);
        if (shortenUrl && shortenUrl.url) {
          noteUrl = `https://${shortenUrl.url}`;
        }
      }
      noteContent += `\n\n${noteUrl}`;

      // attached app credit if enabled
      if (settings.notes.credit) {
        noteContent += `\n\n${APP_CREDIT}`;
      }

      let _event = new NDKEvent();
      _event.content = noteContent;
      _event.kind = 1;
      _event.tags = [
        ["r", currentTab.url, "page"],
        ["r", currentTab.domain, "host"],
      ];
      await mutate({ event: _event, pageUrl: currentTab.url });
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setUserInput("");
      setLoading(false);
      // setToast("Your post has been published");
    }
  }, [isSuccess]);

  return (
    <Box grow="1" style={{ width: "100%" }} className="pt-2">
      <Flex direction="column" gap="2" justify="between">
        {/* <Flex justify="between" px="2">
          <Box>
            <Text>Post</Text>
          </Box>
          <Button size="4" onClick={() => setShowNoteEditor(false)} color="red" variant="ghost">
            x
          </Button>
        </Flex> */}
        <NoteTextarea
          placeholder="Type your new post here..."
          value={userInput}
          onChange={setUserInput}
          buttonLabel="Post"
          buttonOnClick={() => publishNote()}
          disabledTextarea={loading}
          disabledButton={
            user == undefined || loading || userInput.length === 0
          }
          size="3"
        />
      </Flex>
    </Box>
  );
}
