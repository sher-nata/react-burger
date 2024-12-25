import { appRequest, protectedAppRequest, getRefreshToken, 
    setlocalStorageItem, clearLocalStorage } from '../../utils/request-utils';
import { registerUrl, loginUrl, userDataUrl, logoutUrl } from '../../utils/global_const';
    

export const SET_LOGIN_REQUEST = 'SET_LOGIN_REQUEST';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_FAILED = 'SET_LOGIN_FAILED';

export const SET_REGISTER_REQUEST = 'SET_REGISTER_REQUEST';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_FAILED = 'SET_REGISTER_FAILED';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const SET_LOGOUT_SUCCESS = 'SET_LOGOUT_SUCCESS';


export function setLoginRequest() {
  return { type: SET_LOGIN_REQUEST }
}

export function setLoginSuccess(data) {
  return {
    type: SET_LOGIN_SUCCESS,
    payload: { user: data }
  }
}

export function setLoginFailed(message) {
  return {
    type: SET_LOGIN_FAILED,
    payload: { error: message }
  }
}


export function setRegisterRequest() {
  return { type: SET_REGISTER_REQUEST }
}

export function setRegisterSuccess(data) {
  return {
    type: SET_REGISTER_SUCCESS,
    payload: { user: data }
  }
}

export function setRegisterFailed(message) {
  return {
    type: SET_REGISTER_FAILED,
    payload: { error: message }
  }
}


export function setUserRequest() {
  return { type: SET_USER_REQUEST }
}

export function setUserSuccess(data) {
  return {
    type: SET_USER_SUCCESS,
    payload: { user: data }
  }
}

export function setUserFailed(message) {
  return {
    type: SET_USER_FAILED,
    payload: { error: message }
  }
}


export function setLogoutSuccess(data) {
  return { type: SET_LOGOUT_SUCCESS }
}


export const setRegister = (form) => async (dispatch) => {

  dispatch(setRegisterRequest());
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  }
  await appRequest(registerUrl, options).then((data) => {
    dispatch(setRegisterSuccess(data['user']));
    setlocalStorageItem('accessToken', data['accessToken'])
    setlocalStorageItem('refreshToken', data['refreshToken'])
  })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        dispatch(setRegisterFailed(error.message));
        console.log(error.message)
      }
    });

};

export const signIn = (form) => async (dispatch) => {

  dispatch(setLoginRequest());
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  }
  await appRequest(loginUrl, options).then((data) => {
    dispatch(setLoginSuccess(data['user']));
    setlocalStorageItem('accessToken', data['accessToken'])
    setlocalStorageItem('refreshToken', data['refreshToken'])
  })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        dispatch(setLoginFailed(error.status === 401 ? 'Неверный логин или пароль' : error.message));
        console.log(error.message)
      }
    });

};

export const signOut = () => async (dispatch) => {

  const token = getRefreshToken()

  dispatch(setUserRequest());
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  }
  await appRequest(logoutUrl, options).then((data) => {
    dispatch(setLogoutSuccess());
    clearLocalStorage()
  })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        dispatch(setUserFailed(error.message));
        console.log(error.message)
      }
    });

};

export const getUserData = () => async (dispatch) => {

  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    dispatch(setUserFailed('Ошибка: не авторизован'));
    return;
  }

  dispatch(setUserRequest());
  const options = {
    method: 'GET',
  }
  await protectedAppRequest(userDataUrl, options).then((data) => {
    dispatch(setUserSuccess(data['user']));
  })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        dispatch(setUserFailed(error.message));
      }
    });
};

export const setUserData = (form) => async (dispatch) => {

  dispatch(setUserRequest());
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  }
  await protectedAppRequest(userDataUrl, options).then((data) => {
    dispatch(setUserSuccess(data['user']));
  })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        dispatch(setUserFailed(error.message));
        console.log(error.message)
      }
    });

};


  