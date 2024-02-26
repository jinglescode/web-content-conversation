import type { NDKEvent } from "@nostr-dev-kit/ndk"
import { Flex } from "@radix-ui/themes"

import Note from "."

export default function Replies({
  replies = [],
  showReplies = false
}: {
  replies: NDKEvent[]
  showReplies: boolean
}) {
  return (
    showReplies && (
      <Flex direction="column" gap="2">
        {replies.map((note, i) => {
          return <Note event={note} key={i} />
        })}
      </Flex>
    )
  )
}
