import { merge, Dict } from "@chakra-ui/utils"
import { BaseStyle } from "@chakra-ui/theme-tools"

export const addComponentTheme = (theme: Dict, componentTheme: Dict) => {
  const newComponentTheme = merge(theme.components, componentTheme)
  return { ...theme, components: newComponentTheme }
}
