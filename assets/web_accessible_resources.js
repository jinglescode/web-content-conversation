window.postMessage(
  { type: "FROM_PAGE", text: JSON.stringify(window.nostr) },
  "*"
);
