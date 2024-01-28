import { SymbolIcon } from "@radix-ui/react-icons"
import { Flex, IconButton } from "@radix-ui/themes"

export default function Loading() {
  return (
    <Flex align="center" justify="center" style={{height:"100%"}}>
      <IconButton style={{animation: "spin 1s linear infinite"}}>
        <SymbolIcon width="18" height="18" />
      </IconButton>
    </Flex>
  )
}
