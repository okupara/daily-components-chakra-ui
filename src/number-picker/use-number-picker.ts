import * as React from "react"
import { StringOrNumber, createContext } from "@chakra-ui/utils"
import { useDescendant, useDescendants } from "@chakra-ui/descendant"

const [NumberPickerProvider, useNumberPickerContext] = createContext<
  ReturnUseNumberPicker
>()

export { NumberPickerProvider, useNumberPickerContext }

export type UseNumberPickerProps = {
  value?: StringOrNumber
  defaultValue?: StringOrNumber
}

export const useNumberPicker = (props: UseNumberPickerProps) => {
  const domContext = useDescendants<HTMLDivElement, {}>()
  return { domContext }
}

type ReturnUseNumberPicker = ReturnType<typeof useNumberPicker>

export const useNumberPickerInc = () => {}

export const useNumberPickerDec = () => {}

export type UseNumberPickerListProps = {}
export const useNumberPickerList = (props: UseNumberPickerListProps) => {
  const context = useNumberPickerContext()
}

export const useNumberPickerOption = (props: any) => {}
