import { TextField } from "@radix-ui/themes"

import { useNostrStore } from "~lib/zustand/nostr"

import Row from "../common/Row"

export default function Npub() {
  const user = useNostrStore((state) => state.user)

  return (
    <Row label="Public Key">
      <TextField.Input value={user.npub} readOnly />
    </Row>
  )
}
