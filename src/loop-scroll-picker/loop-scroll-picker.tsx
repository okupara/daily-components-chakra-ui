import * as React from "react"
import { PropsOf, chakra } from "@chakra-ui/system"
import { UseScrollPickerProps, useLoopScrollPicker } from "./use-loop-scroll-picker"

export type LoopScrollPickerProps = PropsOf<typeof chakra.div> &
  UseScrollPickerProps & {
    renderItem: () => React.ReactNode
  }
function LoopScrollPickerComponent(props: LoopScrollPickerProps) {
  const ref = React.useRef<any>()
  const ref2 = React.useRef<any>()
  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", (e: any) => {
        if (ref.current.scrollTop === 0) {
          ref.current.scrollTop = 100
          ref2.current.style.top = "100px"
        }
      })
    }
  }, [])
  return (
    <chakra.div ref={ref} id="four" h="200px" overflow="auto">
      <chakra.div h="1400px" width="100vh" position="relative">
        <chakra.div ref={ref2} position="absolute" top="0px" left="0px">
          aaaaa
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}
export const LoopScrollPicker = React.memo(LoopScrollPickerComponent)
