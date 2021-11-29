import {combineReducers} from 'redux';
import {
  authReducers,
  AuthConstants,
  menuReducer,
  addressReducer,
  profileReducer,
  offerReducer,
} from '../Redux/index';

const combinedReducer = combineReducers({
  auth: authReducers,
  menu: menuReducer,
  address: addressReducer,
  profile: profileReducer,
  offer: offerReducer,
});

const rootReducer = (state, action) => {
  let newState = {...state};
  if (action.type === AuthConstants.RESET_STATE) {
    newState = undefined;
  }
  return combinedReducer(newState, action);
};

export default rootReducer;
