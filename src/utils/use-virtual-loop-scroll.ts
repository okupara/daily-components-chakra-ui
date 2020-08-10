import * as React from "react"
import { useDimensions, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { BoxModel } from "@chakra-ui/utils"

export type UseVirtualLoopScrollProps = {
  parentRef: React.RefObject<HTMLDivElement>
}
export function useVirtualLoopScroll(props: UseVirtualLoopScrollProps) {
  //   const { parentRef } = props
  //   const { scrollOffset, setScrollOffset } = React.useState<number>(0)
  //   const box = useDimensions(parentRef)
  // }
  // export type UseParentScrollSpaceProps = {
  //   scrollOffset: number
  //   box: BoxModel | null
  // }
  // export function useParentScrollSpace(props: UseParentScrollSpaceProps) {
  //   useSafeLayoutEffect(() => {
  //   }, [props.box, props.scrollOffset])
}
