import { 
    SET_LOGIN_REQUEST,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAILED,
    SET_REGISTER_REQUEST,
    SET_REGISTER_SUCCESS,
    SET_REGISTER_FAILED,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_LOGOUT_SUCCESS,
 } from '../actions/user'

 const initialState = {
    user: null,
    loginError: "",
    isLoginLoading: false, 
    isLoginFailed: false,
    registerError: "",
    isRegisterLoading: false, 
    isRegisterFailed: false,
    userError: "",
    isUserLoading: false, 
    isUserFailed: false,
  }


export function userReducer(state = initialState, action){
    switch (action.type) {
        case SET_LOGIN_REQUEST: {
            return { ...state, isLoginLoading: true, isLoginFailed: false, loginError: "" };
        }
        case SET_LOGIN_SUCCESS: {
            return { ...state, isLoginFailed: false, user: action.payload.user, isLoginLoading: false, loginError: "" };
        }
        case SET_LOGIN_FAILED: {
            return { ...state, user: null, isLoginFailed: true, isLoginLoading: false, loginError: action.payload.error };
        }
        case SET_REGISTER_REQUEST: {
            return { ...state, isRegisterLoading: true, registerError: "" };
        }
        case SET_REGISTER_SUCCESS: {
            return { ...state, isRegisterFailed: false, user: action.payload.user, isRegisterLoading: false, registerError: "" };
        }
        case SET_REGISTER_FAILED: {
            return { ...state, user: null, isRegisterFailed: true, isRegisterLoading: false, registerError: action.payload.error };
        }
        case SET_USER_REQUEST: {
            return { ...state, isUserLoading: true, userError: "" };
        }
        case SET_USER_SUCCESS: {
            return { ...state, isUserFailed: false, user: action.payload.user, isUserLoading: false, userError: "" };
        }
        case SET_USER_FAILED: {
            return { ...state, user: null, isUserFailed: true, isUserLoading: false, userError: action.payload.error };
        }
        case SET_LOGOUT_SUCCESS: {
            return initialState;
        }
 
        default: {
          return state;
        }
    }
}