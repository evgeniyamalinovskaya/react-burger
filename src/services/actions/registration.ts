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
import { AppThunk, AppDispatch } from '../../utils/types';
import { TUser } from '../../utils/types';

export const AUTHORIZATION_REQUEST: "AUTHORIZATION_REQUEST" = "AUTHORIZATION_REQUEST";  //авторизация
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED: "AUTHORIZATION_FAILED" = "AUTHORIZATION_FAILED";

export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";  //регистрация
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";

export const GET_USER_INFO_REQUEST: "GET_USER_INFO_REQUEST" = "GET_USER_INFO_REQUEST";  //получение данных пользователя
export const GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS" = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED: "GET_USER_INFO_FAILED" = "GET_USER_INFO_FAILED";

export const UPDATE_USER_INFO_REQUEST: "UPDATE_USER_INFO_REQUEST" = "UPDATE_USER_INFO_REQUEST";  //обновление данных пользователя
export const UPDATE_USER_INFO_SUCCESS: "UPDATE_USER_INFO_SUCCESS" = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILED: "UPDATE_USER_INFO_FAILED" = "UPDATE_USER_INFO_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";  //выход
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const RESTORE_PASSWORD_REQUEST: "RESTORE_PASSWORD_REQUEST" = "RESTORE_PASSWORD_REQUEST"; //восстановить пароль
export const RESTORE_PASSWORD_SUCCESS: "RESTORE_PASSWORD_SUCCESS" = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED: "RESTORE_PASSWORD_FAILED" = "RESTORE_PASSWORD_FAILED";

export const NEW_PASSWORD_REQUEST: "NEW_PASSWORD_REQUEST" = "NEW_PASSWORD_REQUEST";   //новый пароль
export const NEW_PASSWORD_SUCCESS: "NEW_PASSWORD_SUCCESS" = "NEW_PASSWORD_SUCCESS";
export const NEW_PASSWORD_FAILED: "NEW_PASSWORD_FAILED" = "NEW_PASSWORD_FAILED";

export const TOKEN_REQUEST: "TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS: "TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN_FAILED: "TOKEN_FAILED" = "TOKEN_FAILED";

// Объединяем в Union
export type TUserActions =
    IAuthorizationRequestAction
    | IAuthorizationSuccessAction
    | IAuthorizationFailedAction
    | IRegistrationRequestAction
    | IRegistrationSuccessAction
    | IRegistrationFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IRestorePasswordRequestAction
    | IRestorePasswordSuccessAction
    | IRestorePasswordFailedAction
    | INewPasswordRequestAction
    | INewPasswordSuccessAction
    | INewPasswordFailedAction
    | ITokenRequestAction
    | ITokenSuccessAction
    | ITokenFailedAction;

//Авторизации пользователя
export interface IAuthorizationRequestAction {
    readonly type: typeof AUTHORIZATION_REQUEST;
}
export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IAuthorizationFailedAction {
    readonly type: typeof AUTHORIZATION_FAILED;
}

export const authorizationUser: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
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
                    payload: res.user,
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
export interface IRegistrationRequestAction {
    readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_FAILED;
}

export const registrationUser: AppThunk = (name: string, email: string, password: string) => {
    return function (dispatch: AppDispatch) {
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
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_INFO_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_INFO_FAILED;
}

export const getUserInfo: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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
export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    readonly payload: TUser['user'];
}
export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export function updateUserInfo(name: string, email: string, password: string) {
    return function (dispatch: AppDispatch) {
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
export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly payload: TUser['user'] | null;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}
export const logOut: AppThunk = (refreshToken: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        logout(refreshToken)
            .then(() => {
                deleteCookie('token');
                localStorage.removeItem('token');
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: null
                });
            })
            .catch(() => {
                console.log('logoutFail')
                dispatch({
                    type: LOGOUT_FAILED,
                });
            });
    };
}

//Восстановление пароля пользователя
export interface IRestorePasswordRequestAction {
    readonly type: typeof RESTORE_PASSWORD_REQUEST;
}
export interface IRestorePasswordSuccessAction {
    readonly type: typeof RESTORE_PASSWORD_SUCCESS;
}
export interface IRestorePasswordFailedAction {
    readonly type: typeof RESTORE_PASSWORD_FAILED;
}

export const resetPassword: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
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
export interface INewPasswordRequestAction {
    readonly type: typeof NEW_PASSWORD_REQUEST;
}
export interface INewPasswordSuccessAction {
    readonly type: typeof NEW_PASSWORD_SUCCESS;
    success: boolean;
    message: string;
}
export interface INewPasswordFailedAction {
    readonly type: typeof NEW_PASSWORD_FAILED;
}

export const newPassword: AppThunk = (password: string, token: string) => {
    return function(dispatch: AppDispatch) {
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
export interface ITokenRequestAction {
    readonly type: typeof TOKEN_REQUEST;
}
export interface ITokenSuccessAction {
    readonly type: typeof TOKEN_SUCCESS;
}
export interface ITokenFailedAction {
    readonly type: typeof TOKEN_FAILED;
}

export const token: AppThunk = () => {
    return function(dispatch: AppDispatch) {
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







