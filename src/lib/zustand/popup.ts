import { create } from "zustand"

import { Storage } from "@plasmohq/storage"

import { PopupScreens } from "~types/app/PopupScreens"
import { DEFAULT_SETTINGS, type Settings } from "~types/Settings"

interface PopupState {
  page: PopupScreens
  setPage: (page: PopupScreens) => void
  settings: Settings
  setSettings: (page: Settings) => void
}

export const usePopupStore = create<PopupState>()((set, get) => ({
  page: PopupScreens.Loading,
  setPage: (page: PopupScreens) => set({ page }),
  settings: DEFAULT_SETTINGS,
  setSettings: async (settings) => {
    set({ settings })
    const storage = new Storage()
    await storage.set("settings", settings)
  }
}))
