import * as React from "react"
import { Box } from "@chakra-ui/core"
import { NumberPicker, NumberPickerList, NumberPickerItem } from "./number-picker"

export const numberPicker = () => {
  return (
    <Box p={4} m={4} borderWidth="1px">
      <NumberPicker>
        <NumberPickerList>
          <NumberPickerItem optionValue={1} />
          <NumberPickerItem optionValue={2} />
        </NumberPickerList>
      </NumberPicker>
    </Box>
  )
}

export default {
  title: "ScrollNumberIput",
}
