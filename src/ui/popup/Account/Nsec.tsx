import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { TextField } from "@radix-ui/themes"
import { useState } from "react"

import { useNostrStore } from "~lib/zustand/nostr"

import Row from "../common/Row"

export default function Nsec() {
  const [show, setShow] = useState(false)
  const user = useNostrStore((state) => state.user)

  return (
    <Row label="Private Key">
      <TextField.Root>
        <TextField.Slot onClick={() => setShow(!show)}>
          {show ? (
            <EyeOpenIcon width="16" height="16" />
          ) : (
            <EyeClosedIcon width="16" height="16" />
          )}
        </TextField.Slot>
        <TextField.Input
          value={user.nsec}
          type={show ? "text" : "password"}
          readOnly
        />
      </TextField.Root>
    </Row>
  )
}
