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
} from "../"
import { Progress, ProgressLabel } from "@chakra-ui/progress"
import { Box } from "@chakra-ui/core"
import { Tooltip } from "@chakra-ui/tooltip"
import { Button } from "@chakra-ui/button"

export const rangeSlider = () => (
  <Box mt={20}>
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
    <Box mt={20}>
      <Slider defaultValue={30}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

export const tooltip = () => {
  return (
    <Box m={20}>
      <Tooltip label="hey im here" isOpen hasArrow>
        <Button>aaaa</Button>
      </Tooltip>
    </Box>
  )
}

export const progress = () => {
  return (
    <React.Fragment>
      <Box p={10}>
        <Progress>
          <ProgressLabel />
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
