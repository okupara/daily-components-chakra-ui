import { useSafeLayoutEffect } from "@chakra-ui/hooks"

export function useDomOnMount(callback: () => void) {
  useSafeLayoutEffect(() => {
    callback()
  }, [])
}
