import * as React from "react"
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/slider"
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumbs,
} from "./range-slider"
import { Progress, ProgressLabel } from "@chakra-ui/progress"
import { Box } from "@chakra-ui/core"

export const rangeSlider = () => (
  <Box mt={8}>
    <RangeSlider onChange={(a) => console.log(a)}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumbs />
    </RangeSlider>
  </Box>
)
rangeSlider.story = {
  name: "rangeSlider",
}

export const slider = () => {
  return (
    <Slider defaultValue={30}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  )
}

export const progress = () => {
  return (
    <React.Fragment>
      <Box p={10}>
        <Progress>
          <ProgressLabel size="lg">hello</ProgressLabel>
        </Progress>
      </Box>
      <Box p={10}>
        <Progress value={90} />
      </Box>
    </React.Fragment>
  )
}
export default {
  title: "RangeSlider",
}
