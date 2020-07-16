import { ComponentTheme } from "@chakra-ui/theme-tools"

const NumberPicker: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props) => ({
    NumberPickerList: {
      overflow: "hidden",
      align: "center",
    },
  }),
}

export default NumberPicker
