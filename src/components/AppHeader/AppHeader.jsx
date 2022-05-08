import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import {  BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return(
        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <nav className={appHeaderStyles.content}>
                <div className={appHeaderStyles.container}>
                    <menu className={appHeaderStyles.list}>
                        <li className={`${appHeaderStyles.listItem}  pr-5 pl-5`}>
                            <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
                                <BurgerIcon type="primary" />
                                <span className='ml-2'>Конструктор</span>
                            </a>
                        </li>
                        <li className={`${appHeaderStyles.listItem}  pr-5 pl-5 ml-2`}>
                            <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
                                <ListIcon type="primary" />
                                <span className='ml-2'>Лента заказов</span>
                            </a>
                        </li>
                    </menu>
                    <Logo />
                </div>
                <div className='pr-5 pl-5'>
                    <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
                        <ProfileIcon type="primary" />
                        <span className='ml-2'>Личный кабинет</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;