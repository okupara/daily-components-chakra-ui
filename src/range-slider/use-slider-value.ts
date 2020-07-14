import * as React from "react"
import { useId } from "@chakra-ui/hooks"
import { useControllableState } from "@chakra-ui/hooks"
import { valueToPercent, clampValue } from "@chakra-ui/utils"
import { useDimensions, useBoolean } from "@chakra-ui/hooks"

export type SliderValueProps = {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export const useSliderValue = (props: SliderValueProps) => {
  const { value: valueProp, defaultValue, min = 0, max = 100, onChange } = props
  const [isDragging, setDragging] = useBoolean()
  const [isFocused, setFocused] = useBoolean()
  const [eventSource, setEventSource] = React.useState<RangeSliderEventSource>()
  const prev = React.useRef<number>()

  const [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  })
  const value = clampValue(computedValue, min, max)

  const thumbRef = React.useRef<HTMLDivElement>(null)

  const percentForValue = valueToPercent(computedValue, min, max)

  // This could affect performance because useDimensions uses `getClientRect`
  // make sure if Thumb component is applied React.memo and the cache works
  const thumbBoxModel = useDimensions(thumbRef)
  const thumbRect = thumbBoxModel?.borderBox ?? {
    width: 0,
    height: 0,
  }
  const thumbStyle = {
    left: `calc(${percentForValue}% - ${thumbRect.width / 2}px)`,
  }

  const id = useId("range-slider-thumb")

  const updateValue = (newValue: number, eventSource: RangeSliderEventSource) => {
    if (newValue === value) return

    setValue(newValue)
    setEventSource(eventSource)
  }

  return {
    thumbRef,
    id,
    value: computedValue,
    percentForValue,
    thumbStyle,
    updateValue,
  }
}

function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2
}

export type ReturnUseValueType = ReturnType<typeof useSliderValue>
