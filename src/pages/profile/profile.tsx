import React, {useEffect, useState, FC, ChangeEvent, FormEvent, SyntheticEvent} from "react";
import { NavLink } from "react-router-dom";
import profileStyles from './profile.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logOut, updateUserInfo} from '../../services/actions/registration';
import {wsUserConnectionClosed, wsUserConnectionStart} from "../../services/actions/wsUser";
import {useAppDispatch, useAppSelector} from "../../utils/types";

export const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user.user);

    //Инициализируем хук useRef начальное значение
    const nameRef = React.useRef<HTMLInputElement>(null);
    const loginRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const nameClick  = () => {
        setTimeout(() => nameRef.current && nameRef.current.focus(), 0)
    }
    const loginClick = () => {
        setTimeout(() => loginRef.current && loginRef.current.focus(), 0)
    }
    const passwordClick = () => {
        setTimeout(() => passwordRef.current && passwordRef.current.focus(), 0)
    }
    //Состояния (текущее и обновленное)
    const [nameForm, setNameForm] = useState('');
    const [loginForm, setLoginForm] = useState('');
    const [passwordForm, setPasswordForm] = useState('');

    const inputName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameForm(e.target.value)
    }
    const inputLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm(e.target.value)
    }
    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(e.target.value)
    }

    //Выход
    const logoutCancel = () => {
        const refreshToken = localStorage.getItem('token');
        refreshToken && dispatch(logOut(refreshToken));
    };

    //Сохранение
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            dispatch(updateUserInfo(nameForm, loginForm, passwordForm));
        }

    //Отмена
    const reset = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault()
        user && setNameForm(user.name)
        user && setLoginForm(user.email)
        setPasswordForm('')
    }

    useEffect(() => {
        dispatch(wsUserConnectionStart())
        return () => {
            dispatch(wsUserConnectionClosed())
        }
    }, [dispatch])


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
                        className={`${profileStyles.link} text text_type_main-medium`} exact to='/login'
                        onClick={logoutCancel}>
                        <span className="text text_type_main-medium">Выход</span>
                    </NavLink>
                </li>
            </ul>
                <p className={`${profileStyles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
        </nav>
        <form className={profileStyles.form} name="register" onSubmit={submitHandler}>
            <Input
                type="text"
                placeholder="Имя"
                name="name"
                value={nameForm}
                onChange={inputName}
                ref={nameRef}
                onFocus={nameClick}
                size="default"
                error={false}
                errorText="Ошибка"
            />
            <Input
                type="email"
                placeholder="Логин"
                name="login"
                value={loginForm}
                onChange={inputLogin}
                ref={loginRef}
                onFocus={loginClick}
                icon="EditIcon"
                size="default"
                error={false}
                errorText="Ошибка"
            />
            <Input
                type="password"
                placeholder="Пароль"
                name="password"
                value={passwordForm}
                onChange={inputPassword}
                ref={passwordRef}
                onFocus={passwordClick}
                icon="EditIcon"
                size="default"
                error={false}
                errorText="Ошибка"
            />
            <div className={profileStyles.button}>
                <Button type="secondary" size="medium" onClick={reset}>Отмена</Button>
                <Button disabled={!(nameForm && loginForm && passwordForm)} type="primary" size="medium">Сохранить</Button>
            </div>
        </form>
    </main>
    )
}

