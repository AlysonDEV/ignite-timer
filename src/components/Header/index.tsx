import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router'

import logoIgnite from '../../assets/logo-ignite.svg'
import { HeaderContainer } from './styles'

export function Header() {
	return (
		<HeaderContainer>
			<img
				src={logoIgnite}
				alt="Dois triangulos verdes apontando para o canto supeior direito"
			/>
			<nav>
				<NavLink to="/" title="Timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	)
}
