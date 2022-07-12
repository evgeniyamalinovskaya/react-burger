import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import {  BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return(
        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <nav className={appHeaderStyles.content}>
                <div className={appHeaderStyles.container}>
                    <menu className={appHeaderStyles.list}>
                        <li className={`${appHeaderStyles.listItem} pr-5 pl-5`}>
                            <NavLink className={`${appHeaderStyles.link} text text_type_main-default`}
                                     activeClassName={appHeaderStyles.linkActive} to='/'>
                                <BurgerIcon type="primary" />
                                <span className='ml-2'>Конструктор</span>
                            </NavLink>
                        </li>
                        <li className={`${appHeaderStyles.listItem}  pr-5 pl-5 ml-2`}>
                            <NavLink className={`${appHeaderStyles.link} text text_type_main-default`}
                                     activeClassName={appHeaderStyles.linkActive} to='/feed'>
                                <ListIcon type="primary" />
                                <span className='ml-2'>Лента заказов</span>
                            </NavLink>
                        </li>
                    </menu>
                    <Logo />
                </div>
                <div className='pr-5 pl-5'>
                    <NavLink className={`${appHeaderStyles.link} text text_type_main-default`}
                             activeClassName={appHeaderStyles.linkActive} to='/profile'>
                        <ProfileIcon type="primary" />
                        <span className='ml-2'>Личный кабинет</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
