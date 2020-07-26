import { multiStyleConfig, mode } from "@chakra-ui/theme-tools"

export default multiStyleConfig({
  parts: {
    root: "root",
    numberPickerItem: "items",
  },
  baseStyle: (props) => ({
    root: {
      display: "inline-flex",
      flexDirection: "column",
    },
    numberPickerItem: {
      paddingY: "0.4rem",
      paddingX: "0.8rem",
      transition: "background 50ms ease-in 0s",
      _focus: {
        bg: mode(`gray.100`, `whiteAlpha.100`)(props),
      },
      _active: {
        bg: mode(`gray.200`, `whiteAlpha.200`)(props),
      },
      _expanded: {
        bg: mode(`gray.100`, `whiteAlpha.100`)(props),
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }),
})

// const register = {
//   parts: ["root", "numberPickerItem"],
// }

// const baseStyle: BaseStyle<typeof register> = (props) => {
//   return {
//     root: {
//       display: "inline-flex",
//       flexDirection: "column",
//     },
//     numberPickerItem: {
//       paddingY: "0.4rem",
//       paddingX: "0.8rem",
//       transition: "background 50ms ease-in 0s",
//       _focus: {
//         bg: mode(`gray.100`, `whiteAlpha.100`)(props),
//       },
//       _active: {
//         bg: mode(`gray.200`, `whiteAlpha.200`)(props),
//       },
//       _expanded: {
//         bg: mode(`gray.100`, `whiteAlpha.100`)(props),
//       },
//       _disabled: {
//         opacity: 0.4,
//         cursor: "not-allowed",
//       },
//     },
//   }
// }

// export default {
//   register,
//   baseStyle,
// }
