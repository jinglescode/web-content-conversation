import type { NDKEvent } from "@nostr-dev-kit/ndk";

export type Note = {
  event: NDKEvent;
  reactions: { "+": number; "-": number };
  replies: number;
};
