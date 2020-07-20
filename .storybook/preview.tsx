import * as React from "react"
import { addDecorator } from "@storybook/react"
import { CSSReset, ChakraProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import { addComponentTheme } from "../src/utils/add-theme"
import NumberPickerTheme from "../src/number-picker/theme"
import RangeSliderTheme from "../src/range-slider/theme"
const combinedTheme = addComponentTheme(theme, {
  NumberPicker: NumberPickerTheme,
  RangeSlider: RangeSliderTheme,
})

addDecorator((storyFn) => (
  <ChakraProvider theme={combinedTheme}>
    <CSSReset />
    {storyFn()}
  </ChakraProvider>
))
