import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyles,
  useMultiStyleConfig,
  StylesProvider,
} from "@chakra-ui/system"
import { VStack } from "@chakra-ui/layout"
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/button"
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
  const { value, defaultValue, children, ...rest } = props

  const context = useNumberPicker({ value, defaultValue })
  const styles = useMultiStyleConfig("NumberPicker", props)

  return (
    <chakra.div className="NumberPicker__root" __css={styles.root}>
      <NumberPickerProvider value={context}>
        <StylesProvider value={styles}>{children}</StylesProvider>
      </NumberPickerProvider>
    </chakra.div>
  )
}

export type NumberPickerListProps = PropsOf<typeof VStack>
export function NumberPickerList(props: NumberPickerListProps) {
  // return <VStack display="inline-flex">{props.children}</VStack>
  return <chakra.div></chakra.div>
}

const StyledNumberPickerItem = chakra("button", {
  baseStyle: {
    color: "inherit",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "left",
    flex: "0 0 auto",
  },
})

export type NumberPickerItemProps = {
  optionValue: number
}

export const NumberPickerItem = (props: NumberPickerItemProps) => {
  const { optionValue } = props
  const strOptionValue = optionValue.toString().padStart(2, "0")
  const styles = useStyles()

  return (
    <chakra.button
      __css={{
        color: "inherit",
        userSelect: "none",
        display: "flex",
        width: "100%",
        alignItems: "center",
        textAlign: "left",
        flex: "0 0 auto",
        outline: 0,
        ...styles.numberPickerItem,
      }}
    >
      {strOptionValue}
    </chakra.button>
  )
}

export const NumberPickerIncrementStepper = () => {
  return <IconButton aria-label="button" icon={<TriangleUpIcon />} />
}

export const NumberPickerDecrementStepper = () => {
  return <IconButton aria-label="button" icon={<TriangleDownIcon />} />
}
