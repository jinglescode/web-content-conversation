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
    nostrIcons: boolean;
  };
};
