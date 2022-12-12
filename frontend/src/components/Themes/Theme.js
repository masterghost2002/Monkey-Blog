import { extendTheme } from '@chakra-ui/react';
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  fonts:{
    body:`'Sora', sans-serif`,
  },
  config
})

export default theme;