import { SET_DETAILS_ITEM } from './actions';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DETAILS_ITEM:
      return { ...state, details: action.details };
    default:
      return state;
  }
}
