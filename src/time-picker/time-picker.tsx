import * as React from "react"
import { forwardRef } from "@chakra-ui/system"
import { chakra, PropsOf } from "@chakra-ui/core"
import { ReactNodeOrRenderProp } from "@chakra-ui/utils"
import {
  useTimePicker,
  UseTimePickerProps,
  TimerPickerContextProvider,
} from "./use-time-picker"
import { useTimePickerButton } from "./use-time-picker-button"

export type TimePickerProps = UseTimePickerProps & {
  children: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}
const TimePickerComponent = (props: TimePickerProps) => {
  const context = useTimePicker(props)
  return (
    <TimerPickerContextProvider value={context}>
      {typeof props.children === "function"
        ? props.children({ isOpen: context.isOpen, onClose: context.onClose })
        : props.children}
    </TimerPickerContextProvider>
  )
}
export const TimePicker = React.memo(TimePickerComponent)

const StyledTimePickerButton = chakra("button", {
  themeKey: "Menu.MenuButton",
  baseStyle: {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    outline: 0,
    transition: "all 250ms",
  },
  pure: true,
})

type TimePickerButtonProps = PropsOf<typeof StyledTimePickerButton>

const TimePickerButtonComponent = forwardRef<TimePickerButtonProps>(
  function TimerPickerButonComponent(props, ref) {
    const { children, ...restProps } = props

    const buttonProps = useTimePickerButton(restProps)
    return (
      <StyledTimePickerButton {...buttonProps}>
        <chakra.span flex="1">{props.children}</chakra.span>
      </StyledTimePickerButton>
    )
  },
)
export const TimePickerButton = TimePickerButtonComponent
