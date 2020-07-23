import * as React from "react"
import { useRangeSliderContext } from "./use-range-slider"
import { mergeRefs } from "@chakra-ui/utils"

export const useRangeSliderTrack = () => {
  const { trackRef } = useRangeSliderContext()
  const ref = React.useRef<HTMLDivElement | null>(null)

  return {
    ref: mergeRefs(trackRef, ref),
    style: {},
  }
}
