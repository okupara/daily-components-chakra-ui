import * as React from "react"
import { useTimePickerContext, UseTimePickerProps } from "./use-time-picker"

export interface UseTimePickerButtonProps {
  onMouseEnter?: React.MouseEventHandler
  onClick?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onKeyDown?: React.KeyboardEventHandler
  className?: string
}

export const useTimePickerButton = (props: UseTimePickerProps) => {
  const timePicker = useTimePickerContext()
  const { onOpen, onClose, isOpen, autoSelect, setFocusedIndex } = timePicker

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (isOpen) {
        onClose()
      }

      if (!isOpen) {
        onOpen()
      }
    },
    [isOpen, onClose, onOpen],
  )

  return {
    onClick,
  }
}
