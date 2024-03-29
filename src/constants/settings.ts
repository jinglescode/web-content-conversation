import { EXPLICIT_RELAY_URLS } from "~constants/nostr";
import type { Settings } from "~types/Settings";

export const DEFAULT_SETTINGS: Settings = {
  appearance: {
    iconDisplay: true,
    iconPlacement: "bottom",
    windowSize: "large",
    iconOffset: 0,
    windowTransparency: true,
  },
  nostr: {
    relays: EXPLICIT_RELAY_URLS,
  },
  notes: {
    shorten: false,
    credit: true,
    sortBy: "time",
    nostrIcons: true,
    wineSearch: false,
  },
};
