import * as React from "react"
import { UseSliderProps } from "@chakra-ui/slider"
import { useBoolean, useControllableState } from "@chakra-ui/hooks"
import { valueToPercent, Dict, merge } from "@chakra-ui/utils"

export type NumberTuple = [number, number]

export type UseRangeSliderProps = Omit<
  UseSliderProps,
  "value" | "defaultValue" | "onChangeStart" | "onChangeEnd" | "onChange"
> & {
  values?: NumberTuple
  defaultValues?: NumberTuple
  onChange?: (values: NumberTuple) => void
  onChangeStart?: (values: NumberTuple) => void
  onChangeEnd?: (values: NumberTuple) => void
}

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const {
    values: valuesProp,
    defaultValues,
    isDisabled,
    isReadOnly,
    onChange,
    min = 0,
    max = 100,
  } = props

  const [isDragging, setDragging] = useBoolean()
  const [eventSource, setEventSource] = React.useState<EventSource>()

  const isInteractive = !(isDisabled || isReadOnly)

  const [computedValue, setValue] = useControllableState({
    value: valuesProp,
    defaultValue: defaultValues ?? getDefaultValues(min, max),
    onChange,
    shouldUpdate: (prev, next) => prev[0] === next[0] && prev[1] === next[1],
  })

  const trackValues = [
    valueToPercent(computedValue[0], min, max),
    valueToPercent(computedValue[1], min, max),
  ]
  const filledTrackStyles: React.CSSProperties =
    trackValues[0] < trackValues[1]
      ? {
          left: `${trackValues[0]}%`,
          width: `${trackValues[1] - trackValues[0]}%`,
        }
      : {
          left: `${trackValues[1]}%`,
          width: `${trackValues[0] - trackValues[1]}%`,
        }

  return {
    getFilledTrackProps: (props: Dict = {}) => ({
      style: merge<React.CSSProperties>(props.style, filledTrackStyles),
    }),
  }
}

export type ReturnUseRangeType = ReturnType<typeof useRangeSlider>

export const getDefaultValues = (min: number, max: number): NumberTuple => {
  if (min >= max) {
    throw new Error("The max value should be bigger than the min value")
  }
  const centerDiff = (max - min) / 2
  const lowValue = min + centerDiff / 2
  const hiValue = min + centerDiff + centerDiff / 2
  return [lowValue, hiValue]
}
