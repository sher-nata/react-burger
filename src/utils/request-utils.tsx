import { jwtDecode } from 'jwt-decode';
import { baseUrl, refreshTokenUrl, forgotPasswordUrl, resetPasswordUrl } from "./global_const";

const localStoragePrefix = 'react-burger/'


interface CustomResponse{
  readonly ok: boolean;
  readonly headers?: Headers;
  readonly redirected?: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type?: ResponseType;
  readonly url?: string;
  clone(): Response;
  json(): Promise<any>;

}

class AppError extends Error {
    constructor(message: string, public status: number) {
       super(message);
       this.status = status;
    }
}

export const checkResponse = async (response: CustomResponse) => {
    if (!response.ok) {
      let errorMessage = null
      try {
        const errorData = await response.json();
        errorMessage = errorData.message
      }
      catch (e) {}  
      throw new AppError(`Ошибка: ${errorMessage ? errorMessage : response.status}`, response.status);
    }
    return response;
}

export const protectedAppRequest = async (url: string, {...options}: Record<string, {}>={}) => {
    try{
        await refreshAccessToken()
    }
    catch(error){
        throw error;
    }

    const accessToken = getAccessToken() 
    const fetchOptions = {...options, headers: {...options.headers, 'Authorization': accessToken}}; 
    
    return await appRequest(url, fetchOptions)
  }


export const appRequest = async (url: string, {...options}={}) => {
    const controller = new AbortController();
    const fetchOptions = {...options, 'signal': controller.signal}; 
    
    return await fetch(baseUrl + url, fetchOptions)
            .then(checkResponse).then(response => response.json())

  }

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  export const refreshAccessToken = async() =>{
    
    let accessToken = getAccessToken()
    if (!accessToken || (accessToken && isTokenExpired(accessToken))){
        removeAccessToken()
    }   
    else {  
        return;
    }
    
    const token = getRefreshToken()
    if (!token) {
        return;
    }
    
    const options = { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token})
    }
    return await appRequest(refreshTokenUrl, options).then((data) => {
        setlocalStorageItem('accessToken', data['accessToken'])
      })
  }

  export const forgotPassword = async ( email: string ) => {

    const options = { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
    }
    return await appRequest(forgotPasswordUrl, options).then((data) => {
        setlocalStorageItem('forgotPasswordVisited', 'true')
      })
  };

  export const resetPassword = async ( form: {password: string; token: string} ) => {

    const options = { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    }
    return await appRequest(resetPasswordUrl, options).then((data) => {
        removelocalStorageItem('forgotPasswordVisited')
      })
  };

/**************************************/
/* local storage */

export const getRefreshToken = () => {
    return (localStorage.getItem(localStoragePrefix + 'refreshToken') || null)
}

export const getAccessToken = () => {
    return (localStorage.getItem(localStoragePrefix + 'accessToken') || null)
}

export const removeRefreshToken = () => {
  localStorage.removeItem(localStoragePrefix + 'refreshToken')
}

export const removeAccessToken = () => {
  localStorage.removeItem(localStoragePrefix + 'accessToken')
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const setlocalStorageItem = ( itemName: string, itemValue: string ) => {
    localStorage.setItem(localStoragePrefix + itemName, itemValue);  
}

export const getlocalStorageItem = ( itemName: string ) => {
    return (localStorage.getItem(localStoragePrefix + itemName) || null)
}

export const removelocalStorageItem = ( itemName: string ) => {
    localStorage.removeItem(localStoragePrefix + itemName);  
}

