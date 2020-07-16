import * as React from "react"
import { chakra, PropsOf } from "@chakra-ui/system"
import { VStack } from "@chakra-ui/layout"
import {
  useNumberPicker,
  NumberPickerProvider,
  UseNumberPickerProps,
  UseNumberPickerListProps,
  useNumberPickerContext,
} from "./use-number-picker"

export type NumberPickerProps = UseNumberPickerProps & {
  children: React.ReactNode
}

export const NumberPicker = (props: NumberPickerProps) => {
  const context = useNumberPicker(props)

  return (
    <NumberPickerProvider value={context}>{props.children}</NumberPickerProvider>
  )
}

// const StyledNumberPickerList = chakra("div", {
//   themeKey: "NumberPicker.NumberPickerList",
// })

// export type NumberPickerListProps = PropsOf<typeof StyledNumberPickerList> &
//   UseNumberPickerProps
export type NumberPickerListProps = PropsOf<typeof VStack>
export const NumberPickerList = (props: NumberPickerListProps) => {
  return <VStack>{props.children}</VStack>
}

const StyledNumberPickerItem = chakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    color: "inherit",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    flex: "0 0 auto",
  },
  pure: true,
})

export type NumberPickerItemProps = PropsOf<typeof StyledNumberPickerItem> & {
  optionValue: number
}

export const NumberPickerItem = (props: NumberPickerItemProps) => {
  const { optionValue } = props
  const strOptionValue = optionValue.toString().padStart(2, "0")
  return <StyledNumberPickerItem>{strOptionValue}</StyledNumberPickerItem>
}
