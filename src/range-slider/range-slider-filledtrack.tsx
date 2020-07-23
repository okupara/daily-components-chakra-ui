import * as React from "react"
import { PropsOf, chakra, useStyles } from "@chakra-ui/system"
import { useRangeSliderFilledTrack } from "./use-range-slider-filledtrack"

export const RangeSliderFilledTrack = (props: PropsOf<typeof chakra.div>) => {
  const { style: computedStyle } = useRangeSliderFilledTrack()
  const styles = useStyles()
  return (
    <chakra.div
      className="chakra-rangeslider__filled-track"
      __css={{
        overflow: "hidden",
        ...styles.rangeSliderFilledTrack,
        ...computedStyle,
      }}
    />
  )
}
