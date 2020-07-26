import { merge, Dict } from "@chakra-ui/utils"

export const addComponentTheme = (theme: Dict, componentTheme: Dict) => {
  const newComponentTheme = merge(theme.components, componentTheme)
  return { ...theme, components: newComponentTheme }
}
