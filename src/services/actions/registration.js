import {
    authorization,
    freshToken,
    logout,
    recoveryPassword,
    registerUser, updatePassword,
    userData,
    userUpdate
} from '../../components/Api/Api'
import {deleteCookie, setCookie} from '../../utils/cookie';

export const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST";  //авторизация
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";  //регистрация
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";  //получение данных пользователя
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";  //обновление данных пользователя
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILED = "UPDATE_USER_INFO_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";  //выход
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const RESTORE_PASSWORD_REQUEST = "RESTORE_PASSWORD_REQUEST"; //восстановить пароль
export const RESTORE_PASSWORD_SUCCESS = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED = "RESTORE_PASSWORD_FAILED";

export const NEW_PASSWORD_REQUEST = "NEW_PASSWORD_REQUEST";   //новый пароль
export const NEW_PASSWORD_SUCCESS = "NEW_PASSWORD_SUCCESS";
export const NEW_PASSWORD_FAILED = "NEW_PASSWORD_FAILED";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILED = "TOKEN_FAILED";

//Авторизации пользователя
export function authorizationUser(email, password) {
    return function (dispatch) {
        dispatch({
            type: AUTHORIZATION_REQUEST,
        });
        authorization(email, password)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: AUTHORIZATION_SUCCESS,
                });
            })
            .catch((err) => {
                dispatch({
                    type: AUTHORIZATION_FAILED,
                });
            });
    };
}

//Регистрация пользователя
export function registrationUser (name, email, password ) {
    return function (dispatch) {
        dispatch({
            type: REGISTRATION_REQUEST,
        });
        registerUser(name, email, password)
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    payload: res.user,
                });
            })
            .catch((err) => {
                dispatch({
                    type: REGISTRATION_FAILED,
                });
            });
    };
}

//Получение данных о пользователе
export function getUserInfo() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_INFO_REQUEST,
        });
        userData()
            .then((res) => {
                dispatch({
                    type: GET_USER_INFO_SUCCESS,
                    payload: res.user
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_USER_INFO_FAILED,
                });
            })
    }
}

//Обновление данных пользователя
export function updateUserInfo(name, email, password) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST,
        });
        userUpdate(name, email, password)
            .then((res) => {
                dispatch({
                    type: UPDATE_USER_INFO_SUCCESS,
                    payload: res.user
                });
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_USER_INFO_FAILED,
                });
            })
    }
}

//Выход из системы
export function logOut () {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        logout()
            .then(() => {
                deleteCookie('token')
                localStorage.removeItem('token');
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: null
                });
            })
            .catch((err) => {
                dispatch({
                    type: LOGOUT_FAILED,
                });
            });
    };
}

//Восстановление пароля пользователя
export function resetPassword (email) {
    return function (dispatch) {
        dispatch({
            type: RESTORE_PASSWORD_REQUEST
        })
        recoveryPassword(email)
        .then((res) => {
            dispatch({
                type: RESTORE_PASSWORD_SUCCESS,
            })
        })
        .catch((err) => {
            dispatch({
                type: RESTORE_PASSWORD_FAILED,
            })
        });
    };
}

//Сброс пароля пользователя
export function newPassword(password, token) {
    return function(dispatch) {
        dispatch({ type: NEW_PASSWORD_REQUEST })
        updatePassword(password, token)
            .then((res) => {
                dispatch({
                    type: NEW_PASSWORD_SUCCESS,
                    success: res.success,
                    message: res.message
                })
            })
            .catch((err) => {
                dispatch({
                    type: NEW_PASSWORD_FAILED,
                });
            });
    }
}

//Токен
export function token () {
    return function(dispatch) {
        dispatch({ type: TOKEN_REQUEST})
        freshToken()
            .then((res) => {
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                localStorage.setItem('token', res.refreshToken);
                dispatch({
                    type: TOKEN_SUCCESS,
                })
            })
            .catch((err) => {
                dispatch({
                    type: TOKEN_FAILED,
                });
            });
    }
}







