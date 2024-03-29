import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useEffect, useState } from "react";

import { RELAY } from "~constants/nostr";
import { useNotesMutation } from "~lib/nostr/useNotesMutation";
import { useAppStore } from "~lib/zustand/app";
import NoteTextarea from "./NoteTextarea";

export default function ReplyBox({ event }: { event: NDKEvent }) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const pageUrl = useAppStore((state) => state.pageUrl);
  const { mutate, isSuccess } = useNotesMutation();
  const setToast = useAppStore((state) => state.setToast);

  async function publishNote() {
    if (userInput && userInput.length > 0) {
      setLoading(true);
      let _event = new NDKEvent();
      _event.content = `${userInput}`;
      _event.kind = 1;
      _event.tags = [["e", event.id, RELAY, "root"]];
      await mutate({ event: _event, pageUrl: pageUrl });
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setUserInput("");
      setLoading(false);
      setToast("Reply published!");
    }
  }, [isSuccess]);

  return (
    <NoteTextarea
      placeholder="Type your reply here..."
      value={userInput}
      onChange={setUserInput}
      buttonLabel="Comment"
      buttonOnClick={() => publishNote()}
      disabledTextarea={loading}
      disabledButton={loading || userInput.length === 0}
    />
  );
}
