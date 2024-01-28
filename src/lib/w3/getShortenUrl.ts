export async function getShortenUrl(url: string) {
  const res = await fetch(`https://w3.do/get?url=${url}`)
  if (!res.ok) {
    return undefined
  }

  const data = await res.json()
  return data
}
