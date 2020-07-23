import { useRangeSliderContext } from "./use-range-slider"

export const useThumbs = () => {
  const { values } = useRangeSliderContext()

  return {
    getThumbsProps: values?.map((v) => ({
      value: v,
    })),
  }
}
