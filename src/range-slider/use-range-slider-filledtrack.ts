import { useRangeSliderContext } from "./use-range-slider"

export const useRangeSliderFilledTrack = () => {
  const { percents } = useRangeSliderContext()

  // now assumes the first one is always smaller than the second one.
  const filledTrackStyle = {
    left: `${percents[0]}%`,
    width: `${percents[1] - percents[0]}%`,
  }

  return {
    style: filledTrackStyle,
  }
}
