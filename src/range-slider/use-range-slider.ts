import * as React from "react"
import { UseSliderProps } from "@chakra-ui/slider"
import { Dict, merge } from "@chakra-ui/utils"
import { useSliderValue } from "./use-slider-value"

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
    defaultValues: defaultValuesProp,
    isDisabled,
    isReadOnly,
    onChange,
    min = 0,
    max = 100,
  } = props

  const defaultValues = defaultValuesProp ?? getDefaultValues(min, max)

  const valuesState = [
    useSliderValue({
      value: valuesProp ? valuesProp[0] : valuesProp,
      defaultValue: defaultValues[0],
      min,
      max,
    }),
    useSliderValue({
      value: valuesProp ? valuesProp[1] : valuesProp,
      defaultValue: defaultValues[1],
      min,
      max,
    }),
  ]

  const trackValues = [
    valuesState[0].percentForValue,
    valuesState[1].percentForValue,
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
    getThumbProps: (props: Dict = {}) =>
      valuesState.map((s) => ({
        ref: s.thumbRef,
        style: merge<React.CSSProperties>(props.style, s.thumbStyle),
      })),
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
