import { create } from "zustand";
import { DEFAULT_SETTINGS } from "~constants/settings";
import type { Settings } from "~types/Settings";
import { SidePanelScreens } from "~types/sidepanel/SidePanelScreens";

interface SidePanelState {
  currentTab: { url: string; title: string; domain: string } | undefined;
  setCurrentTab: (tab: { url: string; title: string; domain: string }) => void;
  currentScreen: SidePanelScreens;
  setCurrentScreen: (screen: SidePanelScreens) => void;
  settings: Settings;
  setSettings: (page: Settings) => void;
  toast: string | undefined;
  setToast: (toast: string | undefined) => void;
  showNoteEditor: boolean;
  setShowNoteEditor: (show: boolean) => void;
}

export const useSidePanelStore = create<SidePanelState>()((set, get) => ({
  currentTab: undefined,
  setCurrentTab: (tab) => set({ currentTab: tab }),
  currentScreen: SidePanelScreens.Feed,
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  settings: DEFAULT_SETTINGS,
  setSettings: (settings) => {
    set({ settings });
  },
  toast: undefined,
  setToast: (toast) => set({ toast }),
  showNoteEditor: true,
  setShowNoteEditor: (show) => set({ showNoteEditor: show }),
}));
