import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = new Storage()
  const data = await storage.get("settings")
  res.send(data)
}

export default handler
