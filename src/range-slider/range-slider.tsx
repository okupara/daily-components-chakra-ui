import * as React from "react"
import { chakra, useThemeDefaultProps, ThemingProvider } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import { PropsOf, useThemingContext } from "@chakra-ui/system"
import {
  UseRangeSliderProps,
  ReturnUseRangeType,
  useRangeSlider,
} from "./use-range-slider"

type RangeSliderContextType = ReturnUseRangeType

const [RangeSliderProvider, useRangeSliderContext] = createContext<
  RangeSliderContextType
>({
  name: "RangeSliderContext",
  errorMessage: "useRangeSlider can only be used within RangeSlideProvider",
})
export { RangeSliderProvider, useRangeSliderContext }

const StyledRangeSlider = chakra("div", {
  themeKey: "RangeSlider.Root",
  baseStyle: {
    overflow: "hidden",
    position: "relative",
  },
})

type RangeSliderProps = UseRangeSliderProps & PropsOf<typeof StyledRangeSlider>

const RangeSliderComponent = React.forwardRef(function RangeSlider(
  props: RangeSliderProps,
  ref: React.Ref<any>,
) {
  const defaults = useThemeDefaultProps("RangeSlider")

  const {
    variant = defaults?.variant,
    size = defaults?.size,
    orientation = "horizontal",
    colorScheme,
    ...sliderProps
  } = props
  const themingProps = { variant, colorScheme, size, orientation }
  const { ...context } = useRangeSlider({ ...sliderProps, orientation })

  return (
    <RangeSliderProvider value={context}>
      <ThemingProvider value={themingProps}>
        <StyledRangeSlider className="chakra-range-slider" {...themingProps}>
          {props.children}
        </StyledRangeSlider>
      </ThemingProvider>
    </RangeSliderProvider>
  )
})

const StyledRangeSliderTrack = chakra("div", {
  themeKey: "RangeSlider.Track",
  baseStyle: {
    overflow: "hidden",
  },
})

export type RangeSliderTrackProps = PropsOf<typeof StyledRangeSliderTrack>

export const RangeSliderTrack = (props: RangeSliderTrackProps) => {
  console.log(props)
  const {} = useRangeSliderContext()
  const themingProps = useThemingContext()

  return (
    <StyledRangeSliderTrack
      className="chakra-rangeslider__track"
      {...themingProps}
      {...props}
    />
  )
}

const StyledRangeSliderFilledTrack = chakra("div", {
  themeKey: "RangeSlider.FilledTrack",
  baseStyle: {
    width: "inherit",
    height: "inherit",
  },
})

export const RangeSliderFilledTrack = (
  props: PropsOf<typeof StyledRangeSliderFilledTrack>,
) => {
  const { getFilledTrackProps } = useRangeSliderContext()
  const themingProps = useThemingContext()
  return (
    <StyledRangeSliderFilledTrack
      className="chakra-rangeslider__filled-track"
      {...themingProps}
      {...getFilledTrackProps(props)}
    />
  )
}

export const RangeSlider = RangeSliderComponent
