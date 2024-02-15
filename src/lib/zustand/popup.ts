import { create } from "zustand";

import { Storage } from "@plasmohq/storage";

import { PopupScreens, WelcomeScreens } from "~types/app/PopupScreens";
import { type Settings } from "~types/Settings";
import { DEFAULT_SETTINGS } from "~constants/settings";

interface PopupState {
  page: PopupScreens;
  setPage: (page: PopupScreens) => void;
  settings: Settings;
  setSettings: (page: Settings) => void;
  welcomeScreen: WelcomeScreens;
  setWelcomeScreen: (page: WelcomeScreens) => void;
}

export const usePopupStore = create<PopupState>()((set, get) => ({
  page: PopupScreens.Loading,
  setPage: (page: PopupScreens) => set({ page }),
  settings: DEFAULT_SETTINGS,
  setSettings: async (settings) => {
    set({ settings });
    const storage = new Storage();
    await storage.set("settings", settings);
  },
  welcomeScreen: WelcomeScreens.Welcome,
  setWelcomeScreen: (welcomeScreen: WelcomeScreens) => set({ welcomeScreen }),
}));
