import * as React from "react"
import { addDecorator } from "@storybook/react"
import { CSSReset, ChakraProvider } from "@chakra-ui/core"
import theme from "../src/chakra-theme"

addDecorator((storyFn) => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {storyFn()}
  </ChakraProvider>
))
