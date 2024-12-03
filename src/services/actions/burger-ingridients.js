export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const INCREASE_INGRIDIENTS = 'INCREASE_INGRIDIENTS';
export const DECREASE_INGRIDIENTS = 'DECREASE_INGRIDIENTS';
export const RESET_INGRIDIENTS = 'RESET_INGRIDIENTS';


export const getIngridients = (ingridientsUrl) => async (dispatch) => {
        
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({
        type: GET_INGRIDIENTS_REQUEST
    });
    try {
        const response = await fetch(ingridientsUrl, { signal });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        
        dispatch({
            type: GET_INGRIDIENTS_SUCCESS,
            payload: {ingridients: data['data']}
            });
    } catch (err) {
        if (err.name !== 'AbortError') {
            dispatch({
                type: GET_INGRIDIENTS_FAILED,
                message: err.message
                });
            console.log(err.message)
        }
    }

  };