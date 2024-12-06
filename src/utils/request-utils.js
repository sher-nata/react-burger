
export const checkResponse = (response) => {
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    return response;
}

export const appRequest = (url, {...options}={}) => {
    const baseUrl = 'https://norma.nomoreparties.space/api/'
    const controller = new AbortController();
    const fetchOptions = {...options, 'signal': controller.signal}; 
    
    return fetch(baseUrl + url, fetchOptions)
            .then(checkResponse).then(response => response.json())

  }
