import * as React from "react"
import { PropsOf, chakra, useStyles } from "@chakra-ui/system"
import { useRangeSliderContext } from "./use-range-slider"
import {
  UseRangeSliderThumbProps,
  useRangeSliderThumb,
} from "./use-range-slider-thumb"

export function RangeSliderThumbs() {
  const { values, percents, setThumbRadius } = useRangeSliderContext()
  return (
    <>
      <RangeSliderThumb
        setThumbRadius={setThumbRadius}
        value={values[0]}
        percentValue={percents[0]}
      />
      <RangeSliderThumb
        setThumbRadius={setThumbRadius}
        value={values[1]}
        percentValue={percents[1]}
      />
    </>
  )
}

const StyledRangeSliderThumb = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    outline: 0,
  },
})

export type RangeSliderThumbProps = UseRangeSliderThumbProps &
  PropsOf<typeof StyledRangeSliderThumb>

export function RangeSliderThumb(props: RangeSliderThumbProps) {
  const { value, percentValue, setThumbRadius } = props
  const styles = useStyles()
  const { style: thumbStyle, ...thumbProps } = useRangeSliderThumb({
    value,
    percentValue,
    setThumbRadius,
  })

  return (
    <>
      <StyledRangeSliderThumb
        {...thumbProps}
        __css={{ ...styles.rangeSliderThumb, ...thumbStyle }}
      />
    </>
  )
}
