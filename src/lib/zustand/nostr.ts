import { create } from "zustand"

import type { UserIdentifier } from "~types/nostr/UserIdentifier"

interface NostrState {
  user: UserIdentifier | undefined
  setUser: (user: UserIdentifier | undefined | null) => void
}

export const useNostrStore = create<NostrState>()((set, get) => ({
  user: undefined,
  setUser: (user: UserIdentifier | undefined) => set({ user: user })
}))
