import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


function AppHeader(props) {
return(
<header className={headerStyles.menu}>
    <div className={headerStyles.menu__content}>
        <nav className={headerStyles.menu__nav}>
            {props.children}
        </nav>
        <Logo className={headerStyles.menu__logo}/>
        <span className={headerStyles.menu__profile}><ProfileIcon type="primary" />Личный кабинет</span>
    </div>
</header>);
}

export default AppHeader;