import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import myOrdersStyles from './myorders.module.css';
import {OrdersInformation} from '../orderInformation/orderInformation';
import {wsUserConnectionClosed, wsUserConnectionStart} from "../../services/actions/wsUser";
import profileStyles from "../profile/profile.module.css";
import {logOut} from "../../services/actions/registration";
import {NavLink, Route, Switch, useLocation} from "react-router-dom";

export const MyOrders = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(wsUserConnectionStart())
        return () => {
            dispatch(wsUserConnectionClosed())
        }
    }, [dispatch])

    //Выход
    const logoutCancel = () => {
        const refreshToken = localStorage.getItem('token');
        dispatch(logOut(refreshToken));
    };

    return (
        <main className={profileStyles.wrapper}>
            <nav className={profileStyles.navigation}>
                <ul className={profileStyles.list}>
                    <li>
                        <NavLink
                            className={`${profileStyles.link} text text_type_main-medium`}
                            activeClassName={profileStyles.linkActive} exact to='/profile'>
                            <span className="text text_type_main-medium">Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={profileStyles.linkActive}
                            className={`${profileStyles.link} text text_type_main-medium`} exact to='/profile/orders'>
                            <span className="text text_type_main-medium">История заказов</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={profileStyles.linkActive}
                            className={`${profileStyles.link} text text_type_main-medium`} to='/login'
                            onClick={logoutCancel}>
                            <span className="text text_type_main-medium">Выход</span>
                        </NavLink>
                    </li>
                </ul>
                <p className={`${profileStyles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Switch location={background || location}>
                <Route exact path='/profile/orders'>
                    <div className={myOrdersStyles.container}>
                        <div className={`${myOrdersStyles.list} pl-2 pr-2`}>
                            <OrdersInformation/>
                        </div>
                    </div>
                </Route>
        </Switch>
        </main>


    )
}
