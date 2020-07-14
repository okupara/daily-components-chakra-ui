import * as React from "react"
import { chakra, useThemeDefaultProps, ThemingProvider } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import { PropsOf, useThemingContext } from "@chakra-ui/system"
import {
  UseRangeSliderProps,
  ReturnUseRangeType,
  useRangeSlider,
} from "./use-range-slider"

type RangeSliderContextType = StrictOmit<
  ReturnUseRangeType,
  "getInputProps" | "getRootProps" | "getValues"
>

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
  const { getInputProps, getRootProps, getValues, ...context } = useRangeSlider({
    ...sliderProps,
    orientation,
  })

  return (
    <RangeSliderProvider value={context}>
      <ThemingProvider value={themingProps}>
        <StyledRangeSlider
          className="chakra-range-slider"
          {...getRootProps()}
          {...themingProps}
        >
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
  const { getTrackProps } = useRangeSliderContext()
  const themingProps = useThemingContext()

  return (
    <StyledRangeSliderTrack
      className="chakra-rangeslider__track"
      {...themingProps}
      {...getTrackProps(props)}
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

const StyledRangeSliderThumb = chakra("div", {
  themeKey: "RangeSlider.Thumb",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
  },
})

export type StyledRangeSliderThubProps = PropsOf<typeof StyledRangeSliderThumb>

export const RangeSliderThumbs = (props: StyledRangeSliderThubProps) => {
  const themingProps = useThemingContext()
  const { getThumbProps } = useRangeSliderContext()
  const [thumbProps1, thumbProps2] = getThumbProps(props)

  return (
    <React.Fragment>
      <StyledRangeSliderThumb {...themingProps} {...thumbProps1} />
      <StyledRangeSliderThumb {...themingProps} {...thumbProps2} />
    </React.Fragment>
  )
}

export const RangeSlider = RangeSliderComponent
