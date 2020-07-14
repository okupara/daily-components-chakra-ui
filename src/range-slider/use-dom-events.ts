import * as React from "react"
import { ReturnUseValueType } from "./use-slider-value"
import { getBox, percentToValue, Dict } from "@chakra-ui/utils"
import { useBoolean, useEventListener } from "@chakra-ui/core"

type ValueState = Pick<ReturnUseValueType, "value" | "updateValue">
export type ValueStateTuple = [ValueState, ValueState]

export type UseDomEventsProps = {
  // min, max, and step are supposed to be set value here.
  min: number
  max: number
  step: number
  valueStateTuple: ValueStateTuple
  isInteractive: boolean
}

export const useDomEvents = (props: UseDomEventsProps) => {
  const { valueStateTuple, isInteractive, min, max, step } = props

  const rootDomRef = React.useRef<HTMLDivElement | null>(null)
  const trackDomRef = React.useRef<HTMLDivElement | null>(null)

  const cleanupRef = React.useRef<Dict<Function>>({})

  const [isDragging, setDragging] = useBoolean(false)
  const currentValuesRef = React.useRef<[number, number]>([
    valueStateTuple[0].value,
    valueStateTuple[1].value,
  ])

  const getValueFromPointer = React.useCallback(
    (event) => {
      if (!trackDomRef.current) return
      const trackRect = getBox(trackDomRef.current).borderBox
      const { clientX, clientY } = event.touches?.[0] ?? event
      const diff = clientX - trackRect.left
      const length = trackRect.width
      const percent = diff / length
      const nextValue = percentToValue(percent, min, max)
      return nextValue
    },
    [min, max, step],
  )

  const onMouseDown = (event: MouseEvent) => {
    if (!isInteractive || !rootDomRef.current) return
    setDragging.on()

    currentValuesRef.current = [valueStateTuple[0].value, valueStateTuple[1].value]

    const run = (event: MouseEvent) => {
      const nextValue = getValueFromPointer(event)
      if (nextValue && !currentValuesRef.current?.includes(nextValue)) {
        const index = findClosestIndex(nextValue, currentValuesRef.current)
        valueStateTuple[index].updateValue(nextValue, "mouse")
      }
    }

    run(event)
    const doc = rootDomRef.current.ownerDocument

    doc.addEventListener("mousemove", run)

    const detachMousemmove = () => {
      doc.removeEventListener("mousemove", run)
      setDragging.off()
    }

    doc.addEventListener("mouseup", detachMousemmove)
    cleanupRef.current.mouseup = () => {
      doc.removeEventListener("mouseup", detachMousemmove)
    }
  }

  cleanupRef.current.mouseDown = useEventListener("mousedown", onMouseDown)

  return {
    rootDomRef,
    trackDomRef,
  }
}

type AccRecord = {
  distance: number
  index: number
}
export const findClosestIndex = (value: number, currentValues: [number, number]) => {
  const result = currentValues.reduce<AccRecord | null>(
    (acc, currentValue, index) => {
      const distance = Math.abs(currentValue - value)
      if (acc === null || distance <= acc.distance) {
        return {
          distance,
          index,
        }
      }
      return acc
    },
    null,
  )
  // Sure not to be null
  return result!.index
}
