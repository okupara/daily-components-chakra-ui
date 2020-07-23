import * as React from "react"
import { chakra, PropsOf, useStyles } from "@chakra-ui/system"
import { useRangeSliderTrack } from "./use-range-slider-track"

export type RangeSliderTrackProps = PropsOf<typeof chakra.div>

export const RangeSliderTrack = (props: RangeSliderTrackProps) => {
  const rangeSliderProps = useRangeSliderTrack()
  const styles = useStyles()

  return (
    <chakra.div
      className="chakra-rangeslider__track"
      {...rangeSliderProps}
      __css={{
        overflow: "hidden",
        ...styles.rangeSliderTrack,
      }}
    >
      {props.children}
    </chakra.div>
  )
}
