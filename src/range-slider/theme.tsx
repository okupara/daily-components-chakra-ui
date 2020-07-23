import { BaseStyle, mode, DefaultProps, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["root", "rangeSliderTrack", "rangeSliderFilledTrack", "rangeSliderThumb"],
  sizes: ["sm", "md", "lg"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    root: {
      width: "100%",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      touchAction: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      userSelect: "none",
      outline: 0,
    },
    rangeSliderTrack: {
      position: "absolute",
      borderRadius: "sm",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      bg: mode("gray.200", "whiteAlpha.200")(props),
    },
    rangeSliderFilledTrack: {
      position: "absolute",
      height: "inherit",
      bg: mode(`${props.colorScheme}.500`, `${props.colorScheme}.200`)(props),
    },
    rangeSliderThumb: {
      zIndex: 1,
      borderRadius: "full",
      bg: "white",
      boxShadow: "sm",
      border: "1px solid",
      borderColor: "transparent",
      transition: "transform 0.2s",
      _focus: {
        boxShadow: "outline",
      },
      left: "50%",
      transform: `translateY(-50%)`,
      _active: {
        transform: `translateY(-50%) scale(1.15)`,
      },
    },
  }
}
const sizes: Sizes<typeof register> = {
  lg: function (props) {
    return {
      rangeSliderThumb: { width: "16px", height: "16px" },
      rangeSliderTrack: {
        height: "4px",
      },
    }
  },
  md: function (props) {
    return {
      rangeSliderThumb: { width: "14px", height: "14px" },
      rangeSliderTrack: {
        height: "4px",
      },
    }
  },
  sm: function (props) {
    return {
      rangeSliderThumb: { width: "10px", height: "10px" },
      rangeSliderTrack: {
        height: "4px",
      },
    }
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
  colorScheme: "blue",
}

export default {
  register,
  defaultProps,
  sizes,
  baseStyle,
}
