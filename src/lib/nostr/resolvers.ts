import { nip19 } from "nostr-tools";

export function pubkeyToNpub(pubkey: string | undefined): string {
  if (pubkey === undefined) return undefined;
  try {
    return nip19.npubEncode(pubkey);
  } catch (e) {}
  return undefined;
}
