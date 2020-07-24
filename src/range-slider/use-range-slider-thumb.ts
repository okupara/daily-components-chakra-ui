import * as React from "react"
import { useId, useDimensions, useUpdateEffect } from "@chakra-ui/hooks"
import { getArrowStyles } from "./popper.util"

export type UseRangeSliderThumbProps = {
  value: number
  percentValue: number
  setThumbRadius: (radius: number) => void
}

// Users usually don't use this component directly.
export const useRangeSliderThumb = (props: UseRangeSliderThumbProps) => {
  const { percentValue, value, setThumbRadius } = props
  const thumbRef = React.useRef<HTMLDivElement>(null)

  const thumbBoxModel = useDimensions(thumbRef)
  const thumbRect = thumbBoxModel?.borderBox ?? {
    width: 0,
    height: 0,
  }
  const thumbRadius = thumbRect.width / 2

  useUpdateEffect(() => setThumbRadius(thumbRadius), [thumbRadius])

  // useDomOnMount(() => console.log("ddd", thumbRadius))

  const style: React.CSSProperties = {
    position: "absolute",
    userSelect: "none",
    touchAction: "none",
    left: `calc(${percentValue}% - ${thumbRadius}px)`,
  }

  const id = useId("range-slider-thumb")

  return {
    id,
    ref: thumbRef,
    style,
  }
}

export type UseThumbTooltipProps = {
  percentValue: number
}

export const useRangeSliderThumbTip = (props: UseThumbTooltipProps) => {
  const { percentValue } = props
  const ref = React.useRef<HTMLDivElement | null>(null)

  const refBox = useDimensions(ref)

  const boxCenter = refBox ? Math.floor(refBox.borderBox.width / 2) : 0
  const boxYPos = refBox ? refBox.borderBox.height + 12 : 0
  const style: React.CSSProperties = {
    left: `calc(${percentValue}% - ${boxCenter}px)`,
    top: `-${boxYPos}px`,
  }
  const arrowStyle = { style: getArrowStyles("top", 10) }

  return {
    tooltipBodyProps: {
      ref,
      style,
    },
    tooltipArrowProps: {
      style: getArrowStyles("top", 10),
    },
  }
}
