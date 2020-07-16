import * as React from "react"
import { TimePicker, TimePickerButton } from "./time-picker"

export const timePicker = () => {
  return (
    <TimePicker>
      <TimePickerButton>buttonaaaa</TimePickerButton>
    </TimePicker>
  )
}
timePicker.story = {
  name: "timePicker",
}

export default {
  title: "TimePicker",
}
