import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Text } from "@radix-ui/themes";
import { useMemo, type ReactNode } from "react";
import { stripHtml } from "string-strip-html";
import { NOSTR_MENTIONS, NOSTR_EVENTS } from "~constants/nostr";
import { IMAGES, AUDIOS, VIDEOS } from "~constants/files";
import reactStringReplace from "react-string-replace";
import { nanoid } from "nanoid";
import NoteLink from "./NoteLink";

export default function NoteContent({ event }: { event: NDKEvent }) {
  function getLastIndexOfChar(content: string, char: string) {
    return content.lastIndexOf(char);
  }

  function prepareContent(content: string) {
    // remove url attached by app
    const lastDoubleNewLine = getLastIndexOfChar(content, "\n\n");
    const lastHttp = getLastIndexOfChar(content, "http");
    if (lastDoubleNewLine > 0 && lastHttp - lastDoubleNewLine == 2) {
      return content.substring(0, lastDoubleNewLine);
    }
    return content;
  }

  const richContent = useMemo(() => {
    let content = event.content;

    content = prepareContent(content);

    let parsedContent: string | ReactNode[] = stripHtml(
      content.replace(/\n{2,}\s*/g, "\n")
    ).result;

    let images: string[] = [];
    let videos: string[] = [];
    let audios: string[] = [];
    let events: string[] = [];

    const text = parsedContent;
    const words = text.split(/( |\n)/);
    const geturl = new RegExp(
      "((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
      "g"
    );
    let urls = [];
    try {
      urls = [...text.match(geturl)];
    } catch (e) {}

    images = urls.filter((word) =>
      IMAGES.some((el) => {
        const url = new URL(word);
        const extension = url.pathname.split(".")[1];
        if (extension === el) return true;
        return false;
      })
    );
    videos = urls.filter((word) =>
      VIDEOS.some((el) => {
        const url = new URL(word);
        const extension = url.pathname.split(".")[1];
        if (extension === el) return true;
        return false;
      })
    );
    audios = urls.filter((word) =>
      AUDIOS.some((el) => {
        const url = new URL(word);
        const extension = url.pathname.split(".")[1];
        if (extension === el) return true;
        return false;
      })
    );

    events = words.filter((word) =>
      NOSTR_EVENTS.some((el) => word.startsWith(el))
    );

    const hashtags = words.filter((word) => word.startsWith("#"));
    const mentions = words.filter((word) =>
      NOSTR_MENTIONS.some((el) => word.startsWith(el))
    );

    try {
      if (images.length) {
        for (const image of images) {
          parsedContent = reactStringReplace(
            parsedContent,
            image,
            (match, i) => (
              <img
                key={match + i}
                src={match}
                alt={match}
                loading="lazy"
                decoding="async"
                style={{ contentVisibility: "auto" }}
                className="object-cover w-full h-auto rounded-xl"
              />
            )
          );
        }
      }

      if (videos.length) {
        for (const video of videos) {
          parsedContent = reactStringReplace(
            parsedContent,
            video,
            (match, i) => (
              <video
                key={match + i}
                slot="media"
                src={match}
                preload="auto"
                muted
                className="w-full h-auto"
              />
            )
          );
        }
      }

      if (audios.length) {
        for (const audio of audios) {
          parsedContent = reactStringReplace(
            parsedContent,
            audio,
            (match, i) => (
              <video
                key={match + i}
                slot="media"
                src={match}
                preload="auto"
                muted
                className="w-full h-auto"
              />
            )
          );
        }
      }

      if (hashtags.length) {
        for (const hashtag of hashtags) {
          const regex = new RegExp(`(|^)${hashtag}\\b`, "g");
          parsedContent = reactStringReplace(parsedContent, regex, () => {
            return <span key={nanoid()}>{hashtag}</span>;
          });
        }
      }

      if (events.length) {
        for (const event of events) {
          parsedContent = reactStringReplace(
            parsedContent,
            event,
            (match, i) => (
              <NoteLink
                key={nanoid()}
                url={`https://njump.me/${event}`}
                label={event}
              />
            )
          );
        }
      }

      if (mentions.length) {
        for (const mention of mentions) {
          parsedContent = reactStringReplace(
            parsedContent,
            mention,
            (match, i) => (
              <NoteLink
                key={nanoid()}
                url={`https://njump.me/${mention}`}
                label={mention}
              />
            )
          );
        }
      }

      parsedContent = reactStringReplace(
        parsedContent,
        /(https?:\/\/\S+)/g,
        (match, i) => {
          const url = new URL(match);

          return (
            <NoteLink
              key={nanoid()}
              url={url.toString()}
              label={url.toString()}
            />
          );
        }
      );

      parsedContent = reactStringReplace(parsedContent, "\n", () => {
        return <div key={nanoid()} className="h-3" />;
      });

      if (typeof parsedContent[0] === "string") {
        parsedContent[0] = parsedContent[0].trimStart();
      }

      return parsedContent;
    } catch (e) {
      console.warn(event.id, `[parser] parse failed: ${e}`);
      return parsedContent;
    }
  }, [event.content]);

  return (
    <Text
      as="div"
      size="2"
      style={{
        overflowWrap: "anywhere",
        whiteSpace: "pre-line",
        wordBreak: "break-word",
      }}
    >
      {richContent}
    </Text>
  );
}
