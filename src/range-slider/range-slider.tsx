import * as React from "react"
import {
  chakra,
  useStyles,
  useStyleConfig,
  PropsOf,
  StylesProvider,
  omitThemingProps,
} from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
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

type RangeSliderProps = UseRangeSliderProps &
  StrictOmit<PropsOf<typeof chakra.div>, "onChange">

const RangeSliderComponent = React.forwardRef(function RangeSlider(
  props: RangeSliderProps,
  ref: React.Ref<any>,
) {
  const realProps = omitThemingProps(props)
  const { getInputProps, getRootProps, getValues, ...context } = useRangeSlider(
    realProps,
  )
  const styles = useStyleConfig("RangeSlider", props)

  return (
    <RangeSliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          className="chakra-range-slider"
          {...getRootProps()}
          __css={styles.root}
        >
          {props.children}
        </chakra.div>
      </StylesProvider>
    </RangeSliderProvider>
  )
})

export type RangeSliderTrackProps = PropsOf<typeof chakra.div>

export const RangeSliderTrack = (props: RangeSliderTrackProps) => {
  const { getTrackProps } = useRangeSliderContext()
  const styles = useStyles()

  return (
    <chakra.div
      className="chakra-rangeslider__track"
      {...getTrackProps(props)}
      __css={{
        overflow: "hidden",
        ...styles.rangeSliderTrack,
      }}
    />
  )
}

export const RangeSliderFilledTrack = (props: PropsOf<typeof chakra.div>) => {
  const { getFilledTrackProps } = useRangeSliderContext()
  const styles = useStyles()
  return (
    <chakra.div
      className="chakra-rangeslider__filled-track"
      {...getFilledTrackProps(props)}
      __css={{
        overflow: "hidden",
        ...styles.rangeSliderFilledTrack,
      }}
    />
  )
}

const StyledRangeSliderThumb = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    outline: 0,
  },
})

export type StyledRangeSliderThubProps = PropsOf<typeof StyledRangeSliderThumb>

export const RangeSliderThumbs = (props: StyledRangeSliderThubProps) => {
  const { getThumbProps } = useRangeSliderContext()
  const [thumbProps1, thumbProps2] = getThumbProps(props)
  const styles = useStyles()

  return (
    <React.Fragment>
      <StyledRangeSliderThumb __css={styles.rangeSliderThumb} {...thumbProps1} />
      <StyledRangeSliderThumb __css={styles.rangeSliderThumb} {...thumbProps2} />
    </React.Fragment>
  )
}

export const RangeSlider = RangeSliderComponent
