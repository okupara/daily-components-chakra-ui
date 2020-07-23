import * as React from "react"
import {
  chakra,
  useStyleConfig,
  PropsOf,
  StylesProvider,
  omitThemingProps,
} from "@chakra-ui/system"
import {
  UseRangeSliderProps,
  useRangeSlider,
  RangeSliderProvider,
} from "./use-range-slider"

type RangeSliderProps = UseRangeSliderProps &
  StrictOmit<PropsOf<typeof chakra.div>, "onChange">

const RangeSliderComponent = React.forwardRef(function RangeSlider(
  props: RangeSliderProps,
  ref: React.Ref<any>,
) {
  const realProps = omitThemingProps(props)
  const { rootRef, props: rootProps, ...context } = useRangeSlider(realProps)
  const styles = useStyleConfig("RangeSlider", props)

  return (
    <RangeSliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          {...rootProps}
          className="chakra-range-slider"
          __css={{
            display: "inline-block",
            position: "relative",
            cursor: "pointer",
            ...styles.root,
            ...rootProps.style,
          }}
        >
          {props.children}
        </chakra.div>
      </StylesProvider>
    </RangeSliderProvider>
  )
})

export const RangeSlider = RangeSliderComponent
