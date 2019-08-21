import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // * возможность дебажить

const middleWares = [thunkMiddleware];

const enchancer = composeEnchancers(applyMiddleware(...middleWares));

// function rootReducer(state, action) {
//   console.log('reducer', state, action);
//   return state;
// }

const store = createStore(
  combineReducers({ fixtureDetails: reducer }),
  enchancer
);

export default store;
