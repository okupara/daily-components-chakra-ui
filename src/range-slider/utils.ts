import type { NumberTuple } from "./types"
import type { Placement } from "@chakra-ui/popper"

export function getDefaultValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2
}

export const getDefaultValues = (min: number, max: number): NumberTuple => {
  if (min >= max) {
    throw new Error("The max value should be bigger than the min value")
  }
  const centerDiff = (max - min) / 2
  const lowValue = min + centerDiff / 2
  const hiValue = min + centerDiff + centerDiff / 2
  return [lowValue, hiValue]
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
