import React, { useState, useRef  } from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyles from './forgot-password.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from "../../services/actions/registration";

//Восстановление пароля пользователя
export const ForgotPassword = () => {
    const user  = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const inputEmailRef = useRef(null)
    const [email, setEmail] = useState('');

    const emailInput = (e) => {
        setEmail(e.target.value)
    }

    //Восстановить
    const forgotPasswordSubmit  = (e) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        dispatch(resetPassword(email));
            setEmail('')
    };

    //Проверяем, авторизован ли пользователь
    if (user) {
        return (
            //Для переадресации используется компонент Redirect, он перенаправляет пользователя на другую страницу
            <Redirect to= '/' />
        );
    }

    return (
            <main className={forgotPasswordStyles.container}>
                <h2 className={`${forgotPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
                <form className={forgotPasswordStyles.form}  onSubmit={forgotPasswordSubmit}>
                    <Input
                        placeholder='Укажите email'
                        name='email'
                        type="text"
                        onChange={emailInput}
                        value={email}
                        ref={inputEmailRef}
                        icon="EditIcon"
                        size="default"
                        error={false}
                        errorText="Ошибка"
                         />
                    <Button disabled={!(email)} type="primary" size="medium" to= '/reset-password'>Восстановить</Button>
                </form>
                <div className={forgotPasswordStyles.span}>
                    <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
                    <Link className={forgotPasswordStyles.text} to='/login'>Войти</Link>
                </div>
            </main>
    );
}
