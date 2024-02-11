import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useEffect, useState } from "react";

import { useNotesMutation } from "~lib/nostr/useNotesMutation";
import { getShortenUrl } from "~lib/w3/getShortenUrl";
import { useAppStore } from "~lib/zustand/app";
import { AppScreens } from "~types/app/AppScreens";

import NoteTextarea from "./NoteTextarea";
import { useNostrStore } from "~lib/zustand/nostr";
import { APP_CREDIT } from "~constants/global";

export default function NewNote() {
  const setPage = useAppStore((state) => state.setPage);
  const pageUrl = useAppStore((state) => state.pageUrl);
  const domain = useAppStore((state) => state.domain);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate, isSuccess } = useNotesMutation();
  const settings = useAppStore((state) => state.settings);
  const setToast = useAppStore((state) => state.setToast);
  const user = useNostrStore((state) => state.user);

  async function publishNote() {
    if (user && userInput && userInput.length > 0) {
      setLoading(true);

      let noteContent = userInput;

      // attached page URL
      let noteUrl = pageUrl;
      if (settings.notes.shorten) {
        const shortenUrl = await getShortenUrl(pageUrl);
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
        ["r", pageUrl, "page"],
        ["r", domain, "host"],
      ];
      await mutate({ event: _event, pageUrl: pageUrl });
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setUserInput("");
      setPage(AppScreens.Feed);
      setLoading(false);
      setToast("Your post has been published");
    }
  }, [isSuccess]);

  return (
    <>
      <NoteTextarea
        placeholder="Type your new post here..."
        value={userInput}
        onChange={setUserInput}
        buttonLabel="Post"
        buttonOnClick={() => publishNote()}
        disabledTextarea={loading}
        disabledButton={user == undefined || loading || userInput.length === 0}
      />
    </>
  );
}
