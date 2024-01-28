import { sendToBackground, sendToBackgroundViaRelay } from "@plasmohq/messaging"

export async function messageBackgroundRelay(request: any, data = {}) {
  return await sendToBackgroundViaRelay({
    name: request,
    body: data
  })
}

export async function messageBackground(request: any, data = {}) {
  return await sendToBackground({
    name: request,
    body: data
  })
}
