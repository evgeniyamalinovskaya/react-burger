import React, {useState, useRef, ChangeEvent, FC} from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';
import {newPassword} from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

export const ResetPassword: FC = () => {
    const user = useAppSelector(store => store.user.user);
    const location = useLocation<{ from: string }>();
    const dispatch = useAppDispatch();
    const passwordRef = useRef<HTMLInputElement>(null);
    const tokenRef = useRef<HTMLInputElement>(null);

    const [passwordForm, setPasswordForm] = useState('');
    const [token, setToken] = useState('');

    const emailInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(e.target.value)
    }

    const tokenInput = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }
    //Сохранить
    const saveNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(newPassword(passwordForm, token))
    }

    //Проверяем, авторизован ли пользователь
    if (user) {
        return (
            <Redirect to={location.state?.from || '/'} />
        );
    }
    return (
        <main className={resetPasswordStyles.container}>
            <h2 className={`${resetPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
            <form className={resetPasswordStyles.form} onSubmit={saveNewPassword}>
                <Input
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
