import { useState, useCallback } from "react"
import { Dict } from "@chakra-ui/utils"

export const useDescendantsDict = (props: Dict = {}) => {
  const [state, setState] = useState(props)

  const save = useCallback(
    (key, value) => {
      setState((s) => ({ ...s, [key]: value }))
    },
    [state],
  )

  return [state, save] as const
}
