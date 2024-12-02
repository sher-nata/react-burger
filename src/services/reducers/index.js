import { combineReducers } from 'redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { ingridientsReducer } from './burger-ingridients';
import { modalReducer } from './modal';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const InitialState = {
  ingridients: {ingridients: [], isLoading: false, isFailed: false},
  constructor: {bun: null, ingridients: []},
  order: { orderDetails: {}, isLoading: false, isFailed: false},
  modal: {selectedIngridient: null, isModalOpen: false, isOrder: false}
}


export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    order: orderReducer
  });

export  const store = createStore(rootReducer, InitialState, composeEnhancers(applyMiddleware(thunk)));