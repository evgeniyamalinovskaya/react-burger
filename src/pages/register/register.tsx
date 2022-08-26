import React, { FC, ChangeEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from './register.module.css';
import {registrationUser} from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

//Регистрация пользователя
export const Register: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user.user);

    const [userNameForm, setUserNameForm] = React.useState('');
    const [emailForm, setEmailForm] = React.useState('');
    const [passwordForm, setPasswordForm] = React.useState('');

    const inputName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserNameForm(e.target.value)
    }
    const inputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailForm(e.target.value)
    }
    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(e.target.value)
    }

    //Зарегистрироваться
    const onRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registrationUser(userNameForm, emailForm, passwordForm));
    }

    //Проверяем, авторизован ли пользователь
    if (user) {
        return (
            <Redirect to={ '/'} />
        );
    }

    return (
            <main className={registerStyles.container}>
                <h2 className={`${registerStyles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
                <form className={registerStyles.form} onSubmit={onRegisterUser}>
                    <div className={registerStyles.list}>
                        <Input
                            placeholder='Имя'
                            name='name'
                            type='text'
                            value={userNameForm}
                            onChange={inputName}
                            size="default"
                            error={false}
                            errorText="Ошибка"
                             />
                        <EmailInput
                            name='email'
                            value={emailForm}
                            onChange={inputEmail}
                            size="default"
                             />
                        <PasswordInput
                            name='password'
                            value={passwordForm}
                            onChange={inputPassword}
                            size="default"
                             />
                    </div>
                    <Button disabled={!(userNameForm && emailForm && passwordForm)} type="primary" size="medium">Зарегистрироваться</Button>
                </form>
                <div className={`${registerStyles.text} pt-20`}>
                    <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>
                    <Link className={registerStyles.button} to='/login'>Войти</Link>
                </div>
            </main>
    );
}
