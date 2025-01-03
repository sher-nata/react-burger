import React from 'react';
import { NavLink } from 'react-router-dom';
import headerStyles from './app-header.module.css';
import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { profilePage } from '../../utils/global_const';

function AppHeader(props) {
    return (
        <header className={headerStyles.menu}>
            <div className={headerStyles.menu__content}>
                <nav className={headerStyles.menu__nav}>
                    {props.children}
                </nav>
                <Logo className={headerStyles.menu__logo} />
                <nav className={headerStyles.menu__profile}>
                    <NavLink to={profilePage} style={({ isActive }) => { return isActive ? { color: "white" } : {}; }}>
                        {({ isActive }) => {
                            return (
                                <span className={headerStyles.menu__elem}>
                                    <ProfileIcon type={isActive ? "primary" : "secondary"} />Личный кабинет
                                </span>)
                        }}
                    </NavLink>
                </nav>
            </div>
        </header>);
}

export default AppHeader;