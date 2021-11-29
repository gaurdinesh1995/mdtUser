import {combineReducers} from 'redux';
import authConstants from './AuthConstants';

export const userInfoReducer = (
  state = {
    user: undefined,
    dashData: {},
    loading: false,
    toast: {title: '', status: 'error', loading: false},
    token: null,
    location_address: null,
    categoryList: null,
  },
  action,
) => {
  switch (action.type) {
    case authConstants.USER_INFO_RECEIVED:
      return {
        ...state,
        user: action.user,
      };
    case authConstants.SELECTED_USER_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case authConstants.DASHBOARD:
      return {
        ...state,
        dashData: action.dashData,
      };
    case authConstants.GET_PROFILE_STATUS:
      return {
        ...state,
        getStatus: action.dashData,
      };
    case authConstants.LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case authConstants.TOAST:
      return {
        ...state,
        toast: action.toast,
      };
    case authConstants.TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case authConstants.LOCATION_ADDRESS:
      return {
        ...state,
        location_address: action.location_address,
      };
    case authConstants.CATEGORIES_LIST:
      return {
        ...state,
        categoryList: action.categoryList,
      };
    default:
      return state;
  }
};

export const authReducers = combineReducers({
  user: userInfoReducer,
});
