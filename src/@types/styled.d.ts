import 'styled-components'

import { defaultTheme } from '../styles/themes/default'
// import { lightTheme } from "../styles/themes/light"

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
