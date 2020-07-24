import * as React from "react"
import { PropsOf, chakra, useStyles, useStyleConfig } from "@chakra-ui/system"
import { useTransitionConfig, HiddenTransition } from "@chakra-ui/transition"
import { useRangeSliderContext } from "./use-range-slider"
import {
  UseRangeSliderThumbProps,
  useRangeSliderThumb,
  useRangeSliderThumbTip,
} from "./use-range-slider-thumb"
import { useDisclosure } from "@chakra-ui/hooks"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"

export function RangeSliderThumbs() {
  const { values, percents, setThumbRadius } = useRangeSliderContext()
  return (
    <>
      <RangeSliderThumb
        setThumbRadius={setThumbRadius}
        value={values[0]}
        percentValue={percents[0]}
      />
      <RangeSliderThumb
        setThumbRadius={setThumbRadius}
        value={values[1]}
        percentValue={percents[1]}
      />
    </>
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

export type RangeSliderThumbProps = UseRangeSliderThumbProps &
  PropsOf<typeof StyledRangeSliderThumb>

export function RangeSliderThumb(props: RangeSliderThumbProps) {
  const { value, percentValue, setThumbRadius, "aria-label": ariaLabel } = props
  const styles = useStyles()
  const { isOpen, ...openDispatch } = useDisclosure({ isOpen: true })
  const { style: thumbStyle, ...thumbProps } = useRangeSliderThumb({
    value,
    percentValue,
    setThumbRadius,
  })
  const { tooltipBodyProps, tooltipArrowProps } = useRangeSliderThumbTip({
    percentValue,
  })
  const tooltipStyles = useStyleConfig("Tooltip", props)
  const transitions = useTransitionConfig("Tooltip", props, {
    container: "chakra-tooltip",
  })
  const hasAriaLabel = !!ariaLabel

  return (
    <>
      <HiddenTransition
        classNames={transitions.container.className}
        timeout={transitions.container.timeout}
        appear
        unmountOnExit
        in={isOpen}
        nodeRef={tooltipBodyProps.ref}
      >
        <chakra.div
          className={transitions.container.className}
          {...tooltipBodyProps}
          __css={{
            position: "absolute",
            zIndex: 4,
            ...tooltipStyles.container,
            ...transitions.container.styles,
            // ...computedTooltipStyles,
          }}
        >
          {Math.floor(value)}
          {/* {hasAriaLabel && (
            <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
          )} */}

          <chakra.div
            className="chakra-tooltip__arrow"
            {...tooltipArrowProps}
            __css={{
              bg: "inherit",
              ...tooltipStyles.arrow,
            }}
          />
        </chakra.div>
      </HiddenTransition>

      <StyledRangeSliderThumb
        {...thumbProps}
        __css={{ ...styles.rangeSliderThumb, ...thumbStyle }}
      />
    </>
  )
}
