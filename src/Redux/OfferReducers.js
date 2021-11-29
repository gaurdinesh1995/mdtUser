import {combineReducers} from 'redux';
import OfferConstants from './OfferConstants';
export const offerInfoReducer = (
  state = {
    vouchers: null,
    coupons: null,
  },
  action,
) => {
  switch (action.type) {
    case OfferConstants.VOUCHERS:
      return {
        ...state,
        vouchers: action.vouchers,
      };
    default:
      return state;
  }
};

export const offerReducer = combineReducers({
  offer: offerInfoReducer,
});
