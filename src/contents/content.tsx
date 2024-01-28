import cssText from "data-text:@radix-ui/themes/styles.css"
import cssText2 from "data-text:styles.css"

import UiContent from "~ui/content"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  style.textContent += cssText2
  return style
}

export default function ContentPage() {
  return <UiContent />
}
