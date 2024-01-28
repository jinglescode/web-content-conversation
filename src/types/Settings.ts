import { EXPLICIT_RELAY_URLS } from "~constants/nostr";

export type Settings = {
  appearance: {
    iconDisplay: boolean;
    iconPlacement: string;
    windowSize: string;
  };
  nostr: {
    relays: string[];
  };
  notes: {
    shorten: boolean;
    credit: boolean;
    sortBy: string;
  };
};

export const DEFAULT_SETTINGS: Settings = {
  appearance: {
    iconDisplay: true,
    iconPlacement: "bottom",
    windowSize: "large",
  },
  nostr: {
    relays: EXPLICIT_RELAY_URLS,
  },
  notes: {
    shorten: true,
    credit: true,
    sortBy: "time",
  },
};
