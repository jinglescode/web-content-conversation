export async function wineSearch(keywords: string) {
  keywords = keywords.split(" ").join("*");

  const res = await fetch(
    `https://api.nostr.wine/search?query=${keywords}&kind=1&sort=time&limit=100`
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();
  return data.data;
}