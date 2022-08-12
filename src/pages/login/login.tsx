import React, { useState, FC, ChangeEvent, FormEvent } from 'react';
import {Link, Redirect, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';
import { authorizationUser } from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

//Авторизация пользователя
export const Login: FC = () => {
    const user = useAppSelector((store) => store.user.user);
    const dispatch = useAppDispatch();
    const location = useLocation<{ from: string }>();

    //Состояния (текущее и обновленное)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    //Войти
    const submitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authorizationUser(email, password));
    };

    //Проверяем, авторизован ли пользователь
    if (user) {
        return (
            <Redirect to={ location?.state?.from || '/'} />
        );
    }

return (
        <div className={loginStyles.container}>
            <h2 className={`${loginStyles.title} text text_type_main-medium`}>Вход</h2>
            <form className={loginStyles.form} onSubmit={submitLogin}>
                <div className="mt-6 mb-6">
                    <EmailInput
                        // placeholder="email"
                        name="email"
                        // type="email"
                        onChange={inputEmail}
                        value={email}
                        // error={false}
                        // errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className="mb-6">
                    <PasswordInput
                        // placeholder={"Пароль"}
                        name="password"
                        // type="password"
                        onChange={inputPassword}
                        value={password}
                        // icon="EditIcon"
                        size="default"
                        // error={false}
                        // errorText="Ошибка"
                    />
                </div>
                <Button disabled={!(email && password)} type="primary" size="medium">Войти</Button>
            </form>
            <span className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь?
               <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link>
            </span>
            <span className="text text_type_main-default text_color_inactive mt-4">Забыли пароль?
                <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link>
            </span>
        </div>
    )
}
