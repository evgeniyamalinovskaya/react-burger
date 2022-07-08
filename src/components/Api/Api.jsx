import {getCookie} from '../../utils/cookie'
//ссылка
const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

//Вспомогательная функция ответа
const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
}

//Запрос данных с сервера
const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET',
    })
        .then(res => parseResponse(res))
};

//Отправка данных заказа
const setData = (productsIds) => {
    return fetch(`${api.url}/orders`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({ingredients: productsIds})
    })
        .then(res => parseResponse(res))
};

//Запрос для авторизации пользователя ()
const authorization = (email, password) => {
    return fetch(`${api.url}/auth/login`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(res => parseResponse(res))
}

//Запрос для регистрацию пользователя ()
const registerUser = (name, email, password) => {
    return fetch(`${api.url}/auth/register`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            'name': name,
            'email': email,
            'password': password
        })
    })
        .then(res => parseResponse(res))
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
        .then(res => parseResponse(res))
}

//Запрос обновления данных о пользователе ()
const userUpdate = (name, email, password) => {
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
        .then(res => parseResponse(res))
}

//Запрос для выхода из системы ()
const logout = () => {
    return fetch(`${api.url}/auth/logout`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
        .then(res => parseResponse(res))
}

//Запрос обновления токена ()
const freshToken = () => {
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
        .then(res => parseResponse(res))
}


//Запрос на восстановление пароля пользователя (готово)
const recoveryPassword = (email) => {
    return fetch(`${api.url}/password-reset`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            email: email
        })
    })
        .then(res => parseResponse(res))
}

//Запрос сброса пароля пользователя ()
const updatePassword = (token, password) => {
    return fetch(`${api.url}/password-reset/reset`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
            token: token,
            password: password,
        })
    })
        .then(res => parseResponse(res))
}

//

export { getData, setData, authorization, registerUser, userData, userUpdate, logout, freshToken, recoveryPassword, updatePassword }
