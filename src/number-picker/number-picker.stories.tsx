import * as React from "react"
import { Box } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import {
  NumberPicker,
  NumberPickerList,
  NumberPickerItem,
  NumberPickerIncrementStepper,
  NumberPickerDecrementStepper,
} from "./number-picker"

export const numberPicker = () => {
  return (
    <Box p={4} m={4} borderWidth="1px">
      <NumberPicker>
        <NumberPickerIncrementStepper />
        <NumberPickerList>
          {Array.from(Array(10)).map((_, i) => (
            <NumberPickerItem key={i} optionValue={i + 1} />
          ))}
        </NumberPickerList>
        <NumberPickerDecrementStepper />
      </NumberPicker>
    </Box>
  )
}

export default {
  title: "ScrollNumberIput",
}
