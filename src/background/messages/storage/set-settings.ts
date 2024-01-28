import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = new Storage()
  await storage.set("settings", req.body)
  res.send(true)
}

export default handler
