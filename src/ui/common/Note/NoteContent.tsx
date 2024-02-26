import type { NDKEvent } from "@nostr-dev-kit/ndk";
import { Flex, Text } from "@radix-ui/themes";
import { useMemo, type ReactNode } from "react";
import { stripHtml } from "string-strip-html";
import {
  NOSTR_MENTIONS,
  NOSTR_EVENTS,
  NOSTR_REDIRECT_URL,
} from "~constants/nostr";
import { IMAGES, AUDIOS, VIDEOS } from "~constants/files";
import reactStringReplace from "react-string-replace";
import { nanoid } from "nanoid";
import NoteLink from "./NoteLink";
import { useAppStore } from "~lib/zustand/app";
import { FileIcon, PersonIcon } from "@radix-ui/react-icons";
import NoteImage from "./NoteImage";
import { nip19 } from "nostr-tools";
import UserName from "~ui/common/UserName";
import { APP_CREDIT } from "~constants/global";

export default function NoteContent({ event }: { event: NDKEvent }) {
  const pageUrl = useAppStore((state) => state.pageUrl);
  const settings = useAppStore((state) => state.settings);

  function getLastIndexOfChar(content: string, char: string) {
    return content.lastIndexOf(char);
  }

  function removeLinkLastLine(content: string) {
    // remove credit attached by app if present
    content = content.replace(`\n\n${APP_CREDIT}`, "");

    const lastDoubleNewLine = getLastIndexOfChar(content, "\n\n");

    // remove shorten url attached by app
    const lastLineIsW3 = getLastIndexOfChar(content, "https://w3.do/");
    if (lastDoubleNewLine > 0 && lastLineIsW3 - lastDoubleNewLine <= 2) {
      return content.substring(0, lastDoubleNewLine);
    }

    // remove url of this page attached by app
    const lastLineIsUrl = getLastIndexOfChar(content, pageUrl);
    if (lastDoubleNewLine > 0 && lastLineIsUrl - lastDoubleNewLine <= 2) {
      return content.substring(0, lastDoubleNewLine);
    }

    // remove if last line is pageUrl
    if (content.endsWith(pageUrl)) {
      return content.substring(0, content.length - pageUrl.length);
    }

    return content;
  }

  function removePageUrl(content: string) {
    // todo: how to make it more fuzzy search?
    content = removeLinkLastLine(content);
    return content;
  }

  const richContent = useMemo(() => {
    let content = event.content;

    content = removePageUrl(content);

    let parsedContent: string | ReactNode[] = stripHtml(
      content.replace(/\n{2,}\s*/g, "\n")
    ).result;

    let images: string[] = [];
    let videos: string[] = [];
    let audios: string[] = [];
    let events: string[] = [];

    const text = parsedContent;

    // split `text` by space, breakline, comma and dot etc
    const words = text.split(/[\s,]+/);

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
            (match, i) => <NoteImage src={match} key={match + i} />
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
              <NoteLink key={nanoid()} url={`${NOSTR_REDIRECT_URL}${event}`}>
                {settings.notes.nostrIcons ? (
                  <FileIcon
                    width="16"
                    height="16"
                    style={{ display: "inline-block" }}
                  />
                ) : (
                  event
                )}
              </NoteLink>
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
              <NoteLink key={nanoid()} url={`${NOSTR_REDIRECT_URL}${mention}`}>
                <Flex justify="center" align="center" gap="1" key={nanoid()}>
                  <PersonIcon
                    width="12"
                    height="12"
                    style={{ display: "inline-block" }}
                  />
                  <UserName
                    pubkey={cleanMentionToPubkey(mention)}
                    isLink={false}
                  />
                </Flex>
              </NoteLink>
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
            <NoteLink key={nanoid()} url={url.toString()}>
              {url.toString()}
            </NoteLink>
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
      // console.error(`[NoteContent] richContent - ${e}`);
      return parsedContent;
    }
  }, [event.content]);

  return (
    <Text
      as="div"
      size="2"
      style={{
        fontSize: "14px",
        overflowWrap: "anywhere",
        whiteSpace: "pre-line",
        wordBreak: "break-word",
      }}
    >
      {richContent}
    </Text>
  );
}

function cleanMentionToPubkey(str: string): string {
  if (str.includes("@")) {
    str = str.replace("@", "");
  }
  if (str.includes(":")) {
    str = str.split(":")[1];
  }

  let { type, data } = nip19.decode(str);

  return data.toString();
}
