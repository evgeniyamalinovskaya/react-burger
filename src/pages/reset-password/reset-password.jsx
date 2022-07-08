import React, { useState, useRef  } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {newPassword} from "../../services/actions/registration";

export const ResetPassword = () => {
    const user = useSelector(store => store.user.user);

    const dispatch = useDispatch();
    const passwordRef = useRef(null);
    const tokenRef = useRef(null);

    const [passwordForm, setPasswordForm] = useState('');
    const [token, setToken] = React.useState('');

    const emailInput = (e) => {
        setPasswordForm(e.target.value)
    }

    const tokenInput = (e) => {
        setToken(e.target.value)
    }
    //Сохранить
    const saveNewPassword = (evt) => {
        evt.preventDefault();
        dispatch(newPassword(passwordForm, token))
    }

    //Проверяем, авторизован ли пользователь
    if (user) {
        return (
            <Redirect to={ '/'} />
        );
    }
    return (
        <main className={resetPasswordStyles.container}>
            <h2 className={`${resetPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
            <form className={resetPasswordStyles.form} onSubmit={saveNewPassword}>
                <PasswordInput
                    placeholder='Введите новый пароль'
                    name='password'
                    onChange={emailInput}
                    value={passwordForm}
                    ref={passwordRef}
                    icon="EditIcon"
                    size="default"
                    error={false}
                    errorText="Ошибка"
                />
                <Input
                    placeholder='Введите код из письма'
                    name='token'
                    onChange={tokenInput}
                    value={token}
                    ref={tokenRef}
                    type="text"
                    icon="EditIcon"
                    size="default"
                    error={false}
                    errorText="Ошибка"
                />
                <Button disabled={!(passwordForm)} type="primary" size="medium">Сохранить</Button>
            </form>
            <div className={resetPasswordStyles.span}>
                <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
                <Link className={resetPasswordStyles.text} to='/login'>Войти</Link>
            </div>
        </main>
    );
}
