import { generateSecretKey, getPublicKey, nip19 } from "nostr-tools"

import type NostrClass from "./NostrClass"

export async function _createNostrKey(nostr: NostrClass) {
  let sk = generateSecretKey()
  let pk = getPublicKey(sk)
  let npub = nip19.npubEncode(pk)
  let nsec = nip19.nsecEncode(sk)
  return { sk, pk, nsec, npub }
}
