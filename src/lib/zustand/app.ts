import { create } from "zustand";
import { DEFAULT_SETTINGS } from "~constants/settings";

import { AppScreens } from "~types/app/AppScreens";
import { NotesView } from "~types/app/NotesView";
import { type Settings } from "~types/Settings";

interface AppState {
  isDrawerShowing: boolean;
  setDrawerShowing: (state: boolean) => void;
  page: AppScreens;
  setPage: (page: AppScreens) => void;
  pageTitle: string;
  setPageTitle: (pageTitle: string) => void;
  pageUrl: string;
  setPageUrl: (pageUrl: string) => void;
  domain: string;
  setDomain: (pageUrl: string) => void;
  notesView: NotesView;
  setNotesView: (view: NotesView) => void;
  settings: Settings;
  setSettings: (page: Settings) => void;
  toast: string | undefined;
  setToast: (toast: string | undefined) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  isDrawerShowing: false,
  setDrawerShowing: (state: boolean) => set({ isDrawerShowing: state }),
  page: AppScreens.Feed,
  setPage: (page: AppScreens) => set({ page }),
  pageTitle: "",
  setPageTitle: (pageTitle: string) => set({ pageTitle }),
  pageUrl: "",
  setPageUrl: (pageUrl: string) => set({ pageUrl }),
  domain: "",
  setDomain: (domain: string) => set({ domain }),
  notesView: NotesView.Page,
  setNotesView: (view: NotesView) => set({ notesView: view }),
  settings: DEFAULT_SETTINGS,
  setSettings: (settings) => {
    set({ settings });
  },
  toast: undefined,
  setToast: (toast) => set({ toast }),
}));
