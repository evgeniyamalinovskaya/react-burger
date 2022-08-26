import {getCookie} from '../../utils/cookie';
import {
    TIngredientsParseResponse,
    TLogoutParseResponse,
    TOrdersParseResponse,
    TPasswordParseResponse,
    TUser
} from '../../utils/types';
//ссылка
const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

//Вспомогательная функция ответа
const parseResponse = <T>(res: Response): Promise<T> => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));

//Запрос данных с сервера
const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET',
    })
        .then(res => parseResponse<TIngredientsParseResponse>(res))
};

//Отправка данных заказа
const setData = (order: Array<string>) => {
    return fetch(`${api.url}/orders`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: 'POST',
        body: JSON.stringify({ingredients: order})
    })
        .then(res => parseResponse<TOrdersParseResponse>(res))
};

//Запрос для авторизации пользователя ()
const authorization = (email: string, password: string) => {
    return fetch(`${api.url}/auth/login`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(res => parseResponse<TUser>(res))
}

//Запрос для регистрацию пользователя ()
const registerUser = (name: string, email: string, password: string) => {
    return fetch(`${api.url}/auth/register`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        })
    })
        .then(res => parseResponse<TUser>(res))
}

//Запрос получения данных о пользователе ()
const userData = () => {
    return fetch(`${api.url}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // Отправляем токен и схему авторизации в заголовке при запросе данных
            Authorization: 'Bearer ' + getCookie('token')
        },
    })
        .then(res => parseResponse<TUser>(res))
}

//Запрос обновления данных о пользователе ()
const userUpdate = (name: string, email: string, password: string) => {
    return fetch(`${api.url}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // Отправляем токен и схему авторизации в заголовке при запросе данных
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
        .then(res => parseResponse<TUser>(res))
}

//Запрос для выхода из системы ()
const logout = (refreshToken: string) => {
    return fetch(`${api.url}/auth/logout`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            token: refreshToken
        })
    })
        .then(res => parseResponse<TLogoutParseResponse>(res))
}

//Запрос обновления токена ()
const freshToken = () => {
    console.log('freshToken')
    return fetch(`${api.url}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Отправляем токен и схему авторизации в заголовке при запросе данных
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
        .then(res => parseResponse<TUser>(res))
}

//Запрос на восстановление пароля пользователя (готово)
const recoveryPassword = (email: string) => {
    return fetch(`${api.url}/password-reset`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            email: email
        })
    })
        .then(res => parseResponse<TPasswordParseResponse>(res))
}

//Запрос сброса пароля пользователя ()
const updatePassword = (token: string, password: string) => {
    return fetch(`${api.url}/password-reset/reset`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            token: token,
            password: password,
        })
    })
        .then(res => parseResponse<TPasswordParseResponse>(res))
}


export { getData, setData, authorization, registerUser, userData, userUpdate, logout, freshToken, recoveryPassword, updatePassword }
