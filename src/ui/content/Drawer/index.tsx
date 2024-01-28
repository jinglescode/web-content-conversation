import { Flex } from "@radix-ui/themes"

import { useAppStore } from "~lib/zustand/app"

import Controls from "./Controls"

export default function Drawer({ children }) {
  const isDrawerShowing = useAppStore((state) => state.isDrawerShowing)

  return (
    <Flex direction="row" justify="end">
      <Controls />
      {isDrawerShowing && children}
    </Flex>
  )
}
