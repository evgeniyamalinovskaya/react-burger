import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from './register.module.css';
import { useDispatch, useSelector } from 'react-redux'
import {registrationUser} from "../../services/actions/registration";

//Регистрация пользователя
export const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    //Инициализируем хук useRef начальное значение
    const inputNameRef = React.useRef(null);
    const inputEmailRef = React.useRef(null);

    const [userNameForm, setUserNameForm] = React.useState('');
    const [emailForm, setEmailForm] = React.useState('');
    const [passwordForm, setPasswordForm] = React.useState('');

    const inputName = (e) => {
        setUserNameForm(e.target.value)
    }
    const inputEmail = (e) => {
        setEmailForm(e.target.value)
    }
    const inputPassword = (e) => {
        setPasswordForm(e.target.value)
    }

    //Зарегистрироваться
    const onRegisterUser = (e) => {
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
                <form className={registerStyles.form}  onClick={onRegisterUser}>
                    <div className={registerStyles.list}>
                        <Input
                            placeholder='Имя'
                            name='name'
                            type='text'
                            value={userNameForm}
                            onChange={inputName}
                            ref={inputNameRef}
                            size="default"
                            error={false}
                            errorText="Ошибка"
                             />
                        <EmailInput
                            placeholder="email"
                            name='email'
                            type='email'
                            value={emailForm}
                            onChange={inputEmail}
                            ref={inputEmailRef}
                            size="default"
                            error={false}
                            errorText="Ошибка"
                             />
                        <PasswordInput
                            name='password'
                            value={passwordForm}
                            onChange={inputPassword}
                            icon="EditIcon"
                            size="default"
                            error={false}
                            errorText="Ошибка"
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
