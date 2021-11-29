import {combineReducers} from 'redux';
import addressConstants from './AddressConstants';

export const addressInfoReducer = (
  state = {
    address: null,
    type: null,
  },
  action,
) => {
  switch (action.type) {
    case addressConstants.ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    default:
      return state;
  }
};

export const addressReducer = combineReducers({
  address: addressInfoReducer,
});
