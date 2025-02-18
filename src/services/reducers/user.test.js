import { userReducer, initialState } from "./user"
import { SET_LOGIN_REQUEST, 
    SET_LOGIN_SUCCESS, 
    SET_LOGIN_FAILED, 
    SET_REGISTER_REQUEST,
    SET_REGISTER_SUCCESS,
    SET_REGISTER_FAILED,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_LOGOUT_SUCCESS
} from '../actions/user'

const user = {
    email: "mail@mail.ru",
    name: "name"
}

const state = initialState


describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle SET_LOGIN_REQUEST', () => {
        let action = {
            type: SET_LOGIN_REQUEST,
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isLoginLoading: true, isLoginFailed: false, loginError: ""
            }
        )
    })

    it('should handle SET_LOGIN_SUCCESS', () => {
        let action = {
            type: SET_LOGIN_SUCCESS,
            payload: { user: user }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isLoginFailed: false, user: action.payload.user, isLoginLoading: false, loginError: ""
            }
        )
    })

    it('should handle SET_LOGIN_FAILED', () => {
        let action = {
            type: SET_LOGIN_FAILED,
            payload: { error: 'error' }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, user: null, isLoginFailed: true, isLoginLoading: false, loginError: action.payload.error
            }
        )
    })

    it('should handle SET_REGISTER_REQUEST', () => {
        let action = {
            type: SET_REGISTER_REQUEST,
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isRegisterLoading: true, registerError: ""
            }
        )
    })

    it('should handle SET_REGISTER_SUCCESS', () => {
        let action = {
            type: SET_REGISTER_SUCCESS,
            payload: { user: user }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isRegisterFailed: false, user: action.payload.user, isRegisterLoading: false, registerError: ""
            }
        )
    })
    
    it('should handle SET_REGISTER_FAILED', () => {
        let action = {
            type: SET_REGISTER_FAILED,
            payload: { error: 'error' }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, user: null, isRegisterFailed: true, isRegisterLoading: false, registerError: action.payload.error
            }
        )
    })

    it('should handle SET_USER_REQUEST', () => {
        let action = {
            type: SET_USER_REQUEST,
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isUserLoading: true, userError: ""
            }
        )
    })

    it('should handle SET_USER_SUCCESS', () => {
        let action = {
            type: SET_USER_SUCCESS,
            payload: { user: user }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, isUserFailed: false, user: action.payload.user, isUserLoading: false, userError: ""
            }
        )
    })

    it('should handle SET_USER_FAILED', () => {
        let action = {
            type: SET_USER_FAILED,
            payload: { error: 'error' }
            }
        
        expect(userReducer(state, action)).toEqual(
            {
                ...state, user: null, isUserFailed: true, isUserLoading: false, userError: action.payload.error
            }
        )
    })

    it('should handle SET_LOGOUT_SUCCESS', () => {
        let action = {
            type: SET_LOGOUT_SUCCESS,
            }
        
        expect(userReducer(state, action)).toEqual(initialState)
    })
})