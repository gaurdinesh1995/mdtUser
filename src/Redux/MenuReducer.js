import {combineReducers} from 'redux';
import menuConstants from './MenuConstant';

export const menuInfoReducer = (
  state = {
    Menu: [],
  },
  action,
) => {
  switch (action.type) {
    case menuConstants.ADD_MENU_ITEMS:
      return {
        ...state,
        Menu: action.menu,
      };
    default:
      return state;
  }
};

export const menuReducer = combineReducers({
  menu: menuInfoReducer,
});
