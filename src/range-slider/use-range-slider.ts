import * as React from "react"
import { UseSliderProps } from "@chakra-ui/slider"
import {
  Dict,
  createContext,
  getBox,
  percentToValue,
  valueToPercent,
  mergeRefs,
} from "@chakra-ui/utils"
import { NumberTuple } from "./types"
import { getDefaultValues, findClosestIndex } from "./utils"
import {
  useBoolean,
  useEventListener,
  useEventCallback,
  useControllableState,
} from "@chakra-ui/hooks"

type RangeSliderContextType = StrictOmit<ReturnUseRangeType, "rootRef" | "props">

const [RangeSliderProvider, useRangeSliderContext] = createContext<
  RangeSliderContextType
>({
  name: "RangeSliderContext",
  errorMessage: "useRangeSlider can only be used within RangeSlideProvider",
})
export { RangeSliderProvider, useRangeSliderContext }

export type UseRangeSliderProps = Omit<
  UseSliderProps,
  "value" | "defaultValue" | "onChangeStart" | "onChangeEnd" | "onChange"
> & {
  values?: NumberTuple
  defaultValues?: NumberTuple
  onChange?: (values: NumberTuple) => void
  onChangeStart?: (values: NumberTuple) => void
  onChangeEnd?: (values: NumberTuple) => void
}

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const {
    values: valuesProp,
    defaultValues: defaultValuesProp,
    isDisabled,
    isReadOnly,
    onChange,
    min = 0,
    max = 100,
    step = 1,
  } = props

  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const cleanupRef = React.useRef<Dict<Function>>({})
  const prevValuesRef = React.useRef<NumberTuple>([0, 0])
  const [isDragging, draggingDispatch] = useBoolean()
  const isInteractive = !!(isDisabled || isReadOnly) === false
  const [thumbRadius, setThumbRadius] = React.useState(0)

  const defaultValues = defaultValuesProp ?? getDefaultValues(min, max)
  const [computedValue, setValue] = useControllableState({
    value: valuesProp,
    defaultValue: defaultValues,
    onChange: () => {},
    shouldUpdate: (numTuple, prevTuple) =>
      numTuple.some((v, i) => v !== prevTuple[i]),
  })

  const getValueFromPointer = React.useCallback(
    (event) => {
      if (!trackRef.current) return
      const trackRect = getBox(trackRef.current).borderBox
      const { clientX, clientY } = event.touches?.[0] ?? event
      const diff = clientX - trackRect.left
      const length = trackRect.width
      const percent = diff / length
      const nextValue = percentToValue(percent, min, max)
      return nextValue
    },
    [min, max, step],
  )

  prevValuesRef.current = computedValue // might be unnecessary?

  const onMouseDown = useEventCallback((event: MouseEvent) => {
    if (!isInteractive || !rootRef.current) return
    draggingDispatch.on()

    const run = (event: MouseEvent) => {
      const nextValue = getValueFromPointer(event)
      if (nextValue && !prevValuesRef.current?.includes(nextValue)) {
        const index = findClosestIndex(nextValue, prevValuesRef.current)
        setValue(
          prevValuesRef.current.map((v, i) =>
            i === index ? nextValue : v,
          ) as NumberTuple,
        )
      }
    }

    run(event)
    const doc = rootRef.current.ownerDocument

    doc.addEventListener("mousemove", run)

    const detachMousemmove = () => {
      doc.removeEventListener("mousemove", run)
      draggingDispatch.off()
    }

    doc.addEventListener("mouseup", detachMousemmove)
    cleanupRef.current.mouseup = () => {
      doc.removeEventListener("mouseup", detachMousemmove)
    }
  })

  cleanupRef.current.mouseDown = useEventListener(
    "mousedown",
    onMouseDown,
    rootRef.current as Document | null,
  )

  const percents = React.useMemo(
    () => computedValue.map((v) => valueToPercent(v, min, max)),
    computedValue,
  )
  const computedStyle: React.CSSProperties = {
    paddingTop: `${thumbRadius}px`,
    paddingBottom: `${thumbRadius}px`,
  }

  return {
    values: computedValue,
    percents,
    trackRef,
    isDragging,
    rootRef,
    setThumbRadius,
    props: {
      ref: mergeRefs(rootRef),
      style: computedStyle,
    },
  }
}

export type ReturnUseRangeType = ReturnType<typeof useRangeSlider>
