import * as React from "react"
import { UseSliderProps } from "@chakra-ui/slider"
import { Dict, merge, mergeRefs } from "@chakra-ui/utils"
import { useSliderValue } from "./use-slider-value"
import { useDomEvents } from "./use-dom-events"

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
    step = 1,
  } = props

  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const trackRef = React.useRef<HTMLDivElement | null>(null)

  const defaultValues = defaultValuesProp ?? getDefaultValues(min, max)
  const valuesState = [
    useSliderValue({
      value: valuesProp ? valuesProp[0] : valuesProp,
      defaultValue: defaultValues[0],
      min,
      max,
      onChange: () => {},
    }),
    useSliderValue({
      value: valuesProp ? valuesProp[1] : valuesProp,
      defaultValue: defaultValues[1],
      min,
      max,
      onChange: () => {},
    }),
  ]

  const trackValues = [valuesState[0].value, valuesState[1].value] as const

  const { rootDomRef, trackDomRef } = useDomEvents({
    min,
    max,
    step,
    valueStateTuple: [
      { value: valuesState[0].value, updateValue: valuesState[0].updateValue },
      { value: valuesState[1].value, updateValue: valuesState[1].updateValue },
    ],
    isInteractive: true,
    value0: valuesState[0].value,
  })

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
    getRootProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, rootDomRef),
    }),
    getTrackProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, trackDomRef),
    }),
    getFilledTrackProps: (props: Dict = {}) => ({
      ...props,
      style: merge<React.CSSProperties>(props.style, filledTrackStyles),
    }),
    getThumbProps: (props: Dict = {}) =>
      valuesState.map((s) => ({
        ...props,
        ref: s.thumbRef,
        style: merge<React.CSSProperties>(props.style, s.thumbStyle),
      })),
    getInputProps: (props: Dict = {}) => ({
      ...props,
      type: "hidden",
    }),
    getValues: () => [valuesState[0].value, valuesState[1].value],
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
