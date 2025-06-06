import { ThemeProvider } from 'styled-components'

import { CyclesContextProvider } from './contexts/CyclesContext'
import { Router } from './router'
import { GlobalStyled } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CyclesContextProvider>
				<Router />
			</CyclesContextProvider>
			<GlobalStyled />
		</ThemeProvider>
	)
}
