import {
    AUTHORIZATION_FAILED,
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    NEW_PASSWORD_FAILED,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESTORE_PASSWORD_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILED,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED, TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILED
} from "../actions/registration";

const initialState = {
    user: null,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,

    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,

    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: false,
}

export const registration = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION_REQUEST:
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                loginFailed: false,
                user: action.payload,
                loginRequest: false
            }
        case AUTHORIZATION_FAILED:
            return {
                ...state,
                loginFailed: true,
                loginRequest: false
            }
        case REGISTRATION_REQUEST:
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                registerFailed: false,
                user: action.payload,
                registerRequest: false
            }
        case REGISTRATION_FAILED:
            return {
                ...state,
                registerFailed: true,
                registerRequest: false
            }

        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false
        }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                getUserFailed: false,
                user: action.payload,
                getUserRequest: false
        }
        case GET_USER_INFO_FAILED:
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false
        }
        case UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false
            }
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                updateUserFailed: false,
                user: action.payload,
                updateUserRequest: false
            }
        case UPDATE_USER_INFO_FAILED:
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                logoutFailed: false,
                logoutRequest: true
        }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                logoutFailed: false,
                user: action.payload,
                logoutRequest: false
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false
        }
        case RESTORE_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        case RESTORE_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordFailed: false,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false
            }
        case RESTORE_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false
            }
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordFailed: false,
                resetPasswordSuccess: true,
                resetPasswordRequest: false
            }
        case NEW_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false
            }
        case TOKEN_REQUEST:
            return {
                ...state,
                tokenRequest: true,
                tokenSuccess: false,
                tokenFailed: false,
            }
        case TOKEN_SUCCESS:
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: true,
                tokenFailed: false,
        }
        case TOKEN_FAILED:
            return {
                ...state,
                tokenRequest: false,
                tokenSuccess: false,
                tokenFailed: true,
        }
        default: {
            return state;
        }
    }
}
