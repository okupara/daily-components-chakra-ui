import * as React from "react"
import { useId } from "@chakra-ui/hooks"
import { useControllableState } from "@chakra-ui/hooks"
import { valueToPercent, Dict, merge } from "@chakra-ui/utils"
import { useDimensions, useBoolean } from "@chakra-ui/hooks"

export type SliderValueProps = {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

export const useSliderValue = (props: SliderValueProps) => {
  const { value: valueProp, defaultValue, min = 0, max = 100, onChange } = props

  const [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? getDefaultValue(min, max),
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  })
  // const [isDragging, setDragging] = useBoolean()

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

  return {
    thumbRef,
    id,
    value: computedValue,
    percentForValue,
    thumbStyle,
  }
}

function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2
}
