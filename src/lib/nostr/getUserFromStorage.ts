import { messageBackground } from "~lib/chrome";
import {
  UserIdentifierType,
  type UserIdentifier,
} from "~types/nostr/UserIdentifier";

import type NostrClass from "./NostrClass";
import { nip19 } from "nostr-tools";

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
      sk: storageUser.sk,
      type: storageUser.type,
    };

    let updateProfile = false;

    // backward: nsec to sk
    if (user.sk == undefined) {
      const decodedPrivkey = nip19.decode(user.nsec);
      //@ts-ignore
      const privkey = bytesToHex(decodedPrivkey.data);
      user.sk = privkey;
      updateProfile = true;
    }

    if (user.type == undefined) {
      user.type = UserIdentifierType.PrivateKey;
      updateProfile = true;
    }

    if (updateProfile) {
      const _user: UserIdentifier = {
        pubkey: user.pubkey,
        sk: user.sk,
        npub: user.npub,
        type: user.type,
      };
      //@ts-ignore
      await messageBackground("storage/set-user", _user);
    }

    return user;
  }

  return null;
}
