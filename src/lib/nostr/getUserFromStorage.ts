import { messageBackground } from "~lib/chrome";
import {
  UserIdentifierType,
  type UserIdentifier,
} from "~types/nostr/UserIdentifier";

import type NostrClass from "./NostrClass";

export async function _getUserFromStorage(nostr: NostrClass) {
  //@ts-ignore
  const storageUser = await messageBackground("storage/get-user");

  if (storageUser) {
    const nostrUser = nostr.ndk.getUser({
      hexpubkey: storageUser.pubkey,
    });
    await nostrUser.fetchProfile();

    const user: UserIdentifier = {
      pubkey: storageUser.pubkey,
      npub: storageUser.npub,
      nsec: storageUser.nsec,
      type: UserIdentifierType.PrivateKey,
    };

    return user;
  }

  return null;
}
