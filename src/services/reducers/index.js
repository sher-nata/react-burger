import { combineReducers } from 'redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './burger-ingredients';
import { modalReducer } from './modal';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { userReducer } from './user';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const InitialState = {
  ingredients: {ingredients: [], isLoading: false, isFailed: false},
  constructor: {bun: null, ingredients: []},
  order: { orderDetails: {}, isLoading: false, isFailed: false},
  modal: {selectedIngredient: null, isModalOpen: false, isOrder: false},
  user: {user: null,
    loginError: "",
    isLoginLoading: false, 
    isLoginFailed: false,
    registerError: "",
    isRegisterLoading: false, 
    isRegisterFailed: false,
    userError: "",
    isUserLoading: false, 
    isUserFailed: false}
}


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    order: orderReducer,
    user: userReducer
  });

export  const store = createStore(rootReducer, InitialState, composeEnhancers(applyMiddleware(thunk)));