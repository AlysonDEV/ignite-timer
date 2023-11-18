import { HeaderContainer } from './style'
import { Timer, Scroll } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

import logoIgnite from '../../assets/logo-ignite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img
        src={logoIgnite}
        alt="Desenho de 2 triangulos verdes incliados para direita tentando imitar um desenho de foguete"
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
