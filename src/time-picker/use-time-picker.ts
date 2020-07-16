import * as React from "react"
import { useDisclosure } from "@chakra-ui/core"
import { createContext } from "@chakra-ui/utils"

const [TimerPickerContextProvider, useTimePickerContext] = createContext<
  ReturnUseTimePicker
>({
  strict: false,
  name: "TimpePicker",
})

export { TimerPickerContextProvider, useTimePickerContext }

export type UseTimePickerProps = {
  id?: string
  closeOnSelect?: boolean
  closeOnBlur?: boolean
  autoSelect?: boolean
}
export const useTimePicker = (props: UseTimePickerProps) => {
  const { autoSelect } = props
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  React.useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
    }
  }, [])

  return {
    autoSelect,
    isOpen,
    focusedIndex,
    onOpen,
    onClose,
    onToggle,
    setFocusedIndex,
  }
}

export type ReturnUseTimePicker = ReturnType<typeof useTimePicker>
