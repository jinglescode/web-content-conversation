import {
  sendToBackground,
  sendToBackgroundViaRelay,
  type MessagesMetadata,
} from "@plasmohq/messaging";

export async function messageBackgroundRelay(
  request: keyof MessagesMetadata,
  data = {}
) {
  return await sendToBackgroundViaRelay({
    name: request,
    body: data,
  });
}

export async function messageBackground(
  request: keyof MessagesMetadata,
  data = {}
) {
  return await sendToBackground({
    name: request,
    body: data,
  });
}
